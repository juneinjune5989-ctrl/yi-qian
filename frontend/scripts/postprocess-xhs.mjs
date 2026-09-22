import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const distDir = process.argv[2];

if (!distDir) {
  throw new Error('Usage: node scripts/postprocess-xhs.mjs <dist-dir>');
}

const indexPath = join(distDir, 'index.html');
let html = readFileSync(indexPath, 'utf8');

html = html
  .replace('maximum-scale=1.0, user-scalable=no"', 'maximum-scale=1.0, user-scalable=no, viewport-fit=cover"')
  .replace(/\s+type="module"/g, '')
  .replace(/\s+crossorigin(?:="[^"]*")?/g, '');

const scriptTags = html.match(/<script\b[^>]*\bsrc=["'][^"']+["'][^>]*><\/script>/gi) ?? [];
if (scriptTags.length > 0) {
  html = html.replace(/<script\b[^>]*\bsrc=["'][^"']+["'][^>]*><\/script>\s*/gi, '');
  html = html.replace('</body>', `    ${scriptTags.join('\n    ')}\n  </body>`);
}

writeFileSync(indexPath, html);

const forbiddenPatterns = [
  /\btype=["']module["']/i,
  /\bimport\s*[\(\{]/,
  /\bimport\.meta\b/,
  /\bexport\s+(?:default|const|let|var|function|class|\{)/,
  /\bfetch\s*\(/,
  /\bXMLHttpRequest\b/,
  /\bnavigator\.clipboard\b/,
  /\bexecCommand\s*\(\s*['"](?:copy|cut|paste)['"]/,
  /\beval\s*\(/,
  /\bnew\s+Function\s*\(/,
  /\bWebAssembly\b/,
  /<iframe\b/i,
  /<object\b/i,
];

const htmlForbiddenPatterns = [
  /<script(?![^>]*\bsrc=)[^>]*>/i,
];

function walk(dir) {
  const files = [];
  for (const entry of readdirSync(dir)) {
    if (entry === '.DS_Store') continue;
    const path = join(dir, entry);
    const stat = statSync(path);
    if (stat.isDirectory()) {
      files.push(...walk(path));
    } else {
      files.push(path);
    }
  }
  return files;
}

const textExts = new Set(['.html', '.js', '.css', '.json', '.svg']);
const violations = [];

for (const file of walk(distDir)) {
  if (!textExts.has(extname(file))) continue;
  let source = readFileSync(file, 'utf8');
  if (extname(file) === '.js') {
    source = source.replace(/https:\/\/react\.dev\/errors\//g, 'react-error-');
    writeFileSync(file, source);
  }
  if (extname(file) === '.html') {
    for (const pattern of htmlForbiddenPatterns) {
      if (pattern.test(source)) {
        violations.push(`${file}: ${pattern}`);
      }
    }
  }
  for (const pattern of forbiddenPatterns) {
    if (pattern.test(source)) {
      violations.push(`${file}: ${pattern}`);
    }
  }
}

if (violations.length > 0) {
  throw new Error(`XHS artifact contains forbidden patterns:\n${violations.join('\n')}`);
}

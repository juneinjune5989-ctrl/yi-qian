import { useState } from 'react';
import { ChevronDown, Compass, Home as HomeIcon, ScrollText, Share2, Sparkles } from 'lucide-react';
import { LEVEL_TONE, type Fortune } from '../data/fortunes.ts';

interface FortuneResultProps {
  fortune: Fortune;
  onViewRecords: () => void;
  onBackHome: () => void;
}

async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* 降级到 execCommand */
  }
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.top = '0';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    ta.setSelectionRange(0, text.length);
    const ok = document.execCommand('copy');
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}

function Stars({ n }: { n: number }) {
  return (
    <span className="font-song text-base tracking-tight" style={{ color: 'hsl(var(--seal))' }} aria-label={`${n}星`}>
      {'●'.repeat(n)}
      <span style={{ color: 'hsl(var(--border))' }}>{'●'.repeat(5 - n)}</span>
    </span>
  );
}

function AspectRow({ label, stars, text }: { label: string; stars: number; text: string }) {
  return (
    <div className="flex items-start gap-3 py-2.5">
      <span className="font-song mt-0.5 w-8 shrink-0 text-base font-semibold" style={{ color: 'hsl(var(--foreground))' }}>
        {label}
      </span>
      <div className="min-w-0 flex-1">
        <Stars n={stars} />
        <p className="mt-0.5 text-xs leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
          {text}
        </p>
      </div>
    </div>
  );
}

export default function FortuneResult({ fortune, onViewRecords, onBackHome }: FortuneResultProps) {
  const tone = LEVEL_TONE[fortune.levelType];
  const a = fortune.aspects;

  const isPositive = fortune.levelType === 'great' || fortune.levelType === 'good';
  const guideTitle = isPositive ? '锦 上 添 花' : '化 解 之 道';
  const guideHint = isPositive ? '好签当乘势，助你运上加运' : '签有波折，指你破局转运';

  const [showGuide, setShowGuide] = useState(false);
  const [shareTip, setShareTip] = useState('');

  const handleShare = async () => {
    const text = [
      `【今日运势 · ${fortune.no}】${fortune.title}（${fortune.level}）`,
      `${fortune.poem.join('，')}。`,
      `「${fortune.motto}」`,
      '—— 每日一签 · 诚心求签 · 顺势而为',
    ].join('\n');
    const ok = await copyText(text);
    setShareTip(ok ? '签文已复制，可粘贴分享给有缘人' : '复制未成功，请长按选中签文');
    window.setTimeout(() => setShareTip(''), 2800);
  };

  return (
    <div className="fade-up mx-auto w-full max-w-md px-6 pb-16 pt-10">
      {/* 签号 + 印章式等级 */}
      <div className="relative flex flex-col items-center text-center">
        <span className="font-song text-sm tracking-[0.35em]" style={{ color: 'hsl(var(--muted-foreground))' }}>
          {fortune.no}
        </span>
        <h1 className="font-song mt-2 text-4xl font-bold tracking-widest" style={{ color: 'hsl(var(--foreground))' }}>
          {fortune.title}
        </h1>
        <div
          className="seal-in mt-5 flex h-20 w-20 flex-col items-center justify-center rounded-md"
          style={{ background: tone, boxShadow: '0 4px 14px hsl(var(--wood-dark) / 0.3)' }}
        >
          <span
            className="writing-vertical font-song text-2xl font-bold tracking-tight"
            style={{ color: 'hsl(var(--primary-foreground))', lineHeight: 1.1 }}
          >
            {fortune.level}
          </span>
        </div>
      </div>

      {/* 签诗 */}
      <div
        className="mt-8 rounded-lg px-6 py-7"
        style={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', boxShadow: '0 6px 20px hsl(var(--wood-dark) / 0.08)' }}
      >
        <div className="flex justify-center gap-5">
          {fortune.poem.map((line, i) => (
            <p
              key={i}
              className="writing-vertical font-song text-xl font-medium tracking-[0.25em]"
              style={{ color: 'hsl(var(--foreground))', lineHeight: 1.9 }}
            >
              {line}
            </p>
          ))}
        </div>
      </div>

      {/* 解签 */}
      <div className="mt-6">
        <SectionTitle text="解 签" />
        <p className="font-song mt-3 text-[15px] leading-loose" style={{ color: 'hsl(var(--ink-soft))' }}>
          {fortune.interpret}
        </p>
      </div>

      {/* 分项运势 */}
      <div className="mt-6">
        <SectionTitle text="今 日 运 势" />
        <div className="mt-2 divide-y" style={{ borderColor: 'hsl(var(--border))' }}>
          <AspectRow label="事业" stars={a.career.stars} text={a.career.text} />
          <AspectRow label="财运" stars={a.wealth.stars} text={a.wealth.text} />
          <AspectRow label="姻缘" stars={a.love.stars} text={a.love.text} />
          <AspectRow label="健康" stars={a.health.stars} text={a.health.text} />
        </div>
      </div>

      {/* 宜忌 */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <YiJi type="yi" items={fortune.goodTo} />
        <YiJi type="ji" items={fortune.badTo} />
      </div>

      {/* 幸运指引 */}
      <div className="mt-6">
        <SectionTitle text="今 日 指 引" />
        <div className="mt-3 grid grid-cols-3 gap-3 text-center">
          <LuckyCell label="幸运色" value={fortune.luckyColor} />
          <LuckyCell label="幸运数" value={fortune.luckyNumber} />
          <LuckyCell label="吉方位" value={fortune.luckyDirection} />
        </div>
      </div>

      {/* 箴言 */}
      <p
        className="font-song mt-8 text-center text-lg tracking-[0.15em]"
        style={{ color: 'hsl(var(--seal))' }}
      >
        「 {fortune.motto} 」
      </p>

      <div className="mt-8 grid grid-cols-3 gap-2">
        <button
          onClick={handleShare}
          className="font-song flex items-center justify-center gap-1 whitespace-nowrap rounded-md px-0.5 py-3.5 text-[13px] font-semibold transition-transform active:scale-[0.98]"
          style={{
            color: 'hsl(var(--seal))',
            background: 'hsl(var(--card))',
            border: '1px solid hsl(var(--seal) / 0.45)',
          }}
        >
          <Share2 size={14} aria-hidden="true" className="shrink-0" />
          赠签结缘
        </button>
        <button
          onClick={() => setShowGuide((v) => !v)}
          className="font-song flex items-center justify-center gap-0.5 whitespace-nowrap rounded-md px-0.5 py-3.5 text-[13px] font-semibold transition-transform active:scale-[0.98]"
          style={{ background: 'hsl(var(--seal))', color: 'hsl(var(--primary-foreground))' }}
        >
          <Compass size={14} aria-hidden="true" className="shrink-0" />
          顺势指点
          <ChevronDown
            size={13}
            aria-hidden="true"
            className="shrink-0"
            style={{ transition: 'transform 0.3s', transform: showGuide ? 'rotate(180deg)' : 'none' }}
          />
        </button>
        <button
          onClick={onBackHome}
          className="font-song flex items-center justify-center gap-1 whitespace-nowrap rounded-md px-0.5 py-3.5 text-[13px] font-semibold transition-transform active:scale-[0.98]"
          style={{
            color: 'hsl(var(--seal))',
            background: 'hsl(var(--card))',
            border: '1px solid hsl(var(--seal) / 0.45)',
          }}
        >
          <HomeIcon size={14} aria-hidden="true" className="shrink-0" />
          回到首页
        </button>
      </div>

      {shareTip && (
        <p className="fade-up mt-3 text-center text-xs tracking-widest" style={{ color: 'hsl(var(--muted-foreground))' }}>
          {shareTip}
        </p>
      )}

      {showGuide && (
        <div
          className="fade-up mt-4 rounded-lg px-5 py-5"
          style={{
            background: 'hsl(var(--card))',
            border: `1px solid ${isPositive ? 'hsl(var(--seal) / 0.4)' : 'hsl(210 12% 34% / 0.35)'}`,
            boxShadow: '0 6px 20px hsl(var(--wood-dark) / 0.08)',
          }}
        >
          <div className="flex items-center justify-center gap-2">
            <Sparkles size={15} aria-hidden="true" style={{ color: isPositive ? 'hsl(var(--seal))' : 'hsl(var(--wood))' }} />
            <span
              className="font-song text-base font-bold tracking-[0.3em]"
              style={{ color: isPositive ? 'hsl(var(--seal))' : 'hsl(var(--foreground))' }}
            >
              {guideTitle}
            </span>
          </div>
          <p className="mt-1.5 text-center text-xs tracking-wide" style={{ color: 'hsl(var(--muted-foreground))' }}>
            {guideHint}
          </p>
          <ul className="mt-4 space-y-3">
            {fortune.guidance.map((tip, i) => (
              <li key={i} className="flex items-start gap-3">
                <span
                  className="font-song mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                  style={{
                    background: isPositive ? 'hsl(var(--seal))' : 'hsl(var(--wood))',
                    color: 'hsl(var(--primary-foreground))',
                  }}
                >
                  {i + 1}
                </span>
                <span className="font-song text-sm leading-relaxed" style={{ color: 'hsl(var(--ink-soft))' }}>
                  {tip}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <button
        onClick={onViewRecords}
        className="font-song mx-auto mt-7 flex w-fit items-center gap-1.5 text-xs tracking-[0.25em] transition-colors active:scale-95"
        style={{ color: 'hsl(var(--muted-foreground))' }}
      >
        <ScrollText size={13} aria-hidden="true" />
        查看求签记录
      </button>

      <p className="mt-4 text-center text-xs tracking-widest" style={{ color: 'hsl(var(--muted-foreground) / 0.8)' }}>
        每日一签 · 明日可再求
      </p>
    </div>
  );
}

function SectionTitle({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-px flex-1" style={{ background: 'hsl(var(--border))' }} />
      <span className="font-song text-sm font-semibold tracking-[0.3em]" style={{ color: 'hsl(var(--seal))' }}>
        {text}
      </span>
      <span className="h-px flex-1" style={{ background: 'hsl(var(--border))' }} />
    </div>
  );
}

function YiJi({ type, items }: { type: 'yi' | 'ji'; items: string[] }) {
  const isYi = type === 'yi';
  return (
    <div
      className="rounded-lg p-4"
      style={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
    >
      <div className="mb-2 flex items-center gap-2">
        <span
          className="font-song flex h-7 w-7 items-center justify-center rounded-sm text-base font-bold"
          style={{
            background: isYi ? 'hsl(var(--seal))' : 'hsl(210 12% 34%)',
            color: 'hsl(var(--primary-foreground))',
          }}
        >
          {isYi ? '宜' : '忌'}
        </span>
      </div>
      <ul className="space-y-1.5">
        {items.map((it) => (
          <li key={it} className="font-song text-sm" style={{ color: 'hsl(var(--ink-soft))' }}>
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}

function LuckyCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg py-3" style={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}>
      <p className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
        {label}
      </p>
      <p className="font-song mt-1 text-base font-semibold" style={{ color: 'hsl(var(--foreground))' }}>
        {value}
      </p>
    </div>
  );
}

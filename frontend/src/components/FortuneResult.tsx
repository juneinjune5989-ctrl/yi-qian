import type { Fortune, LuckLevel } from '../data/fortunes.ts';

interface FortuneResultProps {
  fortune: Fortune;
  onReset: () => void;
}

const LEVEL_TONE: Record<LuckLevel, string> = {
  great: 'hsl(var(--seal))',
  good: 'hsl(6 52% 48%)',
  mid: 'hsl(var(--gold))',
  plain: 'hsl(var(--wood))',
  low: 'hsl(210 12% 34%)',
};

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

export default function FortuneResult({ fortune, onReset }: FortuneResultProps) {
  const tone = LEVEL_TONE[fortune.levelType];
  const a = fortune.aspects;

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

      <button
        onClick={onReset}
        className="font-song mt-8 w-full rounded-md py-3.5 text-base font-semibold tracking-[0.3em] transition-transform active:scale-[0.98]"
        style={{ background: 'hsl(var(--seal))', color: 'hsl(var(--primary-foreground))' }}
      >
        再 求 一 签
      </button>
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

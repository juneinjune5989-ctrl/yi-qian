import { useState } from 'react';
import DrawBox from '../components/DrawBox.tsx';
import FortuneResult from '../components/FortuneResult.tsx';
import { pickTodayFortune, type Fortune } from '../data/fortunes.ts';

const WEEKDAYS = ['日', '一', '二', '三', '四', '五', '六'];

function todayLabel(): string {
  const d = new Date();
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日 · 星期${WEEKDAYS[d.getDay()]}`;
}

export default function Home() {
  const [fortune, setFortune] = useState<Fortune | null>(null);

  const handleDraw = () => setFortune(pickTodayFortune());
  const handleReset = () => setFortune(null);

  return (
    <div className="paper-grain relative min-h-screen w-full overflow-hidden">
      <Corner className="left-4 top-4" />
      <Corner className="right-4 top-4 rotate-90" />
      <Corner className="bottom-4 left-4 -rotate-90" />
      <Corner className="bottom-4 right-4 rotate-180" />

      {!fortune ? (
        <div className="flex min-h-screen flex-col items-center justify-center px-6 py-12">
          <header className="mb-2 text-center">
            <div className="flex items-center justify-center gap-4">
              <span className="h-px w-10" style={{ background: 'hsl(var(--border))' }} />
              <h1
                className="font-song text-3xl font-bold tracking-[0.4em]"
                style={{ color: 'hsl(var(--foreground))' }}
              >
                今日运势
              </h1>
              <span className="h-px w-10" style={{ background: 'hsl(var(--border))' }} />
            </div>
            <p className="mt-3 text-xs tracking-[0.25em]" style={{ color: 'hsl(var(--muted-foreground))' }}>
              {todayLabel()}
            </p>
          </header>

          <div className="mt-6 breathe">
            <DrawBox onDraw={handleDraw} />
          </div>

          <p
            className="font-song mt-12 max-w-xs text-center text-xs leading-relaxed tracking-wide"
            style={{ color: 'hsl(var(--muted-foreground))' }}
          >
            静心默念所问之事，长按签筒摇一摇，轻点求得今日一签。
          </p>
        </div>
      ) : (
        <FortuneResult fortune={fortune} onReset={handleReset} />
      )}
    </div>
  );
}

function Corner({ className }: { className: string }) {
  return (
    <div
      className={`pointer-events-none absolute h-8 w-8 ${className}`}
      style={{
        borderTop: '2px solid hsl(var(--seal) / 0.5)',
        borderLeft: '2px solid hsl(var(--seal) / 0.5)',
      }}
      aria-hidden="true"
    />
  );
}

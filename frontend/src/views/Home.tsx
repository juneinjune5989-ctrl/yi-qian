import { useState } from 'react';
import { ScrollText } from 'lucide-react';
import DrawBox from '../components/DrawBox.tsx';
import FortuneResult from '../components/FortuneResult.tsx';
import { pickTodayFortune, getFortuneById, type Fortune } from '../data/fortunes.ts';
import { addRecord, getTodayFortuneId, setTodayFortuneId } from '../lib/history.ts';

const WEEKDAYS = ['日', '一', '二', '三', '四', '五', '六'];

function todayLabel(): string {
  const d = new Date();
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日 · 星期${WEEKDAYS[d.getDay()]}`;
}

interface HomeProps {
  onViewRecords?: () => void;
}

export default function Home({ onViewRecords }: HomeProps) {
  const [fortune, setFortune] = useState<Fortune | null>(() => {
    const todayId = getTodayFortuneId();
    return todayId != null ? getFortuneById(todayId) ?? null : null;
  });
  const [view, setView] = useState<'entry' | 'result'>('entry');

  const goRecords = onViewRecords ?? (() => {
    window.location.hash = '#/records';
  });

  const drawnToday = fortune != null;

  const handleDraw = () => {
    const f = pickTodayFortune();
    setTodayFortuneId(f.id);
    addRecord({ id: f.id, no: f.no, title: f.title, level: f.level, levelType: f.levelType, motto: f.motto });
    setFortune(f);
    setView('result');
  };

  return (
    <div className="paper-grain relative min-h-screen w-full overflow-hidden">
      <Corner className="left-4 top-4" />
      <Corner className="right-4 top-4 rotate-90" />
      <Corner className="bottom-4 left-4 -rotate-90" />
      <Corner className="bottom-4 right-4 rotate-180" />

      {view === 'result' && fortune ? (
        <FortuneResult
          fortune={fortune}
          onViewRecords={goRecords}
          onBackHome={() => setView('entry')}
        />
      ) : (
        <div className="flex min-h-screen flex-col items-center justify-center px-6 py-12">
          <button
            onClick={goRecords}
            className="font-song absolute right-7 top-7 flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs tracking-widest transition-colors active:scale-95"
            style={{
              color: 'hsl(var(--seal))',
              border: '1px solid hsl(var(--seal) / 0.4)',
              background: 'hsl(var(--card) / 0.6)',
            }}
          >
            <ScrollText size={14} aria-hidden="true" />
            求签记录
          </button>

          <header className="mb-2 text-center">
            <p className="mb-3 text-xs tracking-[0.25em]" style={{ color: 'hsl(var(--muted-foreground))' }}>
              {todayLabel()}
            </p>
            <div className="flex items-center justify-center gap-4">
              <span className="h-px w-10" style={{ background: 'hsl(var(--border))' }} />
              <h1
                className="font-song text-3xl font-bold tracking-[0.4em]"
                style={{ color: 'hsl(var(--foreground))' }}
              >
                每日一签
              </h1>
              <span className="h-px w-10" style={{ background: 'hsl(var(--border))' }} />
            </div>
          </header>

          {drawnToday ? (
            <DrawnPanel fortune={fortune} onView={() => setView('result')} />
          ) : (
            <>
              <div className="mt-6 breathe">
                <DrawBox onDraw={handleDraw} />
              </div>
              <p
                className="font-song mt-12 max-w-xs text-center text-xs leading-relaxed tracking-wide"
                style={{ color: 'hsl(var(--muted-foreground))' }}
              >
                静心默念所问之事，长按签筒摇一摇，轻点求得今日一签。
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}

function DrawnPanel({ fortune, onView }: { fortune: Fortune; onView: () => void }) {
  return (
    <div className="mt-10 flex flex-col items-center">
      <div
        className="flex h-36 w-28 flex-col items-center justify-center rounded-md"
        style={{
          background: 'hsl(var(--card))',
          border: '1px solid hsl(var(--seal) / 0.4)',
          boxShadow: '0 8px 24px hsl(var(--wood-dark) / 0.12)',
        }}
      >
        <span className="text-xs tracking-widest" style={{ color: 'hsl(var(--muted-foreground))' }}>
          {fortune.no}
        </span>
        <span
          className="writing-vertical font-song mt-2 text-2xl font-bold tracking-widest"
          style={{ color: 'hsl(var(--seal))' }}
        >
          {fortune.level}
        </span>
      </div>
      <p className="font-song mt-6 text-sm tracking-widest" style={{ color: 'hsl(var(--foreground))' }}>
        今日已求得此签
      </p>
      <p className="mt-1.5 text-xs tracking-wide" style={{ color: 'hsl(var(--muted-foreground))' }}>
        每日一签 · 明日可再求
      </p>
      <button
        onClick={onView}
        className="font-song mt-6 rounded-md px-8 py-3 text-sm font-semibold tracking-[0.25em] transition-transform active:scale-[0.98]"
        style={{ background: 'hsl(var(--seal))', color: 'hsl(var(--primary-foreground))' }}
      >
        查看今日运势
      </button>
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

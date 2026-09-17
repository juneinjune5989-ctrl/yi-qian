import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Trash2 } from 'lucide-react';
import { LEVEL_TONE } from '../data/fortunes.ts';
import { loadHistory, clearHistory, type FortuneRecord } from '../lib/history.ts';

function formatTime(iso: string): string {
  const d = new Date(iso);
  const p = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}.${p(d.getMonth() + 1)}.${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`;
}

export default function Records() {
  const navigate = useNavigate();
  const [records, setRecords] = useState<FortuneRecord[]>(() => loadHistory());
  const [confirming, setConfirming] = useState(false);

  const handleClear = () => {
    if (!confirming) {
      setConfirming(true);
      return;
    }
    clearHistory();
    setRecords([]);
    setConfirming(false);
  };

  return (
    <div className="paper-grain relative min-h-screen w-full">
      <Corner className="left-4 top-4" />
      <Corner className="right-4 top-4 rotate-90" />
      <Corner className="bottom-4 left-4 -rotate-90" />
      <Corner className="bottom-4 right-4 rotate-180" />

      <div className="mx-auto w-full max-w-md px-6 pb-16 pt-8">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="font-song flex items-center gap-1 text-sm tracking-widest active:scale-95"
            style={{ color: 'hsl(var(--muted-foreground))' }}
            aria-label="返回"
          >
            <ChevronLeft size={18} aria-hidden="true" />
            返回
          </button>
          {records.length > 0 && (
            <button
              onClick={handleClear}
              className="font-song flex items-center gap-1 rounded-full px-3 py-1 text-xs tracking-widest active:scale-95"
              style={{
                color: confirming ? 'hsl(var(--primary-foreground))' : 'hsl(var(--seal))',
                background: confirming ? 'hsl(var(--seal))' : 'transparent',
                border: '1px solid hsl(var(--seal) / 0.4)',
              }}
            >
              <Trash2 size={13} aria-hidden="true" />
              {confirming ? '确认清空' : '清空记录'}
            </button>
          )}
        </div>

        <header className="mb-6 mt-6 text-center">
          <div className="flex items-center justify-center gap-4">
            <span className="h-px w-8" style={{ background: 'hsl(var(--border))' }} />
            <h1 className="font-song text-2xl font-bold tracking-[0.4em]" style={{ color: 'hsl(var(--foreground))' }}>
              求签记录
            </h1>
            <span className="h-px w-8" style={{ background: 'hsl(var(--border))' }} />
          </div>
          <p className="mt-2 text-xs tracking-[0.25em]" style={{ color: 'hsl(var(--muted-foreground))' }}>
            共 {records.length} 次求签
          </p>
        </header>

        {records.length === 0 ? (
          <EmptyState onGo={() => navigate('/')} />
        ) : (
          <ul className="space-y-3">
            {records.map((r) => (
              <RecordItem key={r.recordId} record={r} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function RecordItem({ record }: { record: FortuneRecord }) {
  const tone = LEVEL_TONE[record.levelType];
  return (
    <li
      className="fade-up flex items-center gap-4 rounded-lg px-4 py-3.5"
      style={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
    >
      <div
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md"
        style={{ background: tone }}
      >
        <span
          className="writing-vertical font-song text-base font-bold"
          style={{ color: 'hsl(var(--primary-foreground))', lineHeight: 1.05 }}
        >
          {record.level.replace('签', '')}
        </span>
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-2">
          <span className="font-song text-lg font-bold tracking-wide" style={{ color: 'hsl(var(--foreground))' }}>
            {record.title}
          </span>
          <span className="font-song text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
            {record.no}
          </span>
        </div>
        <p className="font-song mt-1 truncate text-xs" style={{ color: 'hsl(var(--ink-soft))' }}>
          {record.motto}
        </p>
      </div>
      <span className="shrink-0 text-[11px] tracking-wide" style={{ color: 'hsl(var(--muted-foreground))' }}>
        {formatTime(record.drawnAt)}
      </span>
    </li>
  );
}

function EmptyState({ onGo }: { onGo: () => void }) {
  return (
    <div className="mt-20 flex flex-col items-center text-center">
      <div
        className="flex h-20 w-20 items-center justify-center rounded-full"
        style={{ border: '1.5px dashed hsl(var(--seal) / 0.4)' }}
      >
        <span className="font-song text-3xl" style={{ color: 'hsl(var(--seal) / 0.6)' }}>
          签
        </span>
      </div>
      <p className="font-song mt-5 text-sm tracking-widest" style={{ color: 'hsl(var(--muted-foreground))' }}>
        尚无求签记录
      </p>
      <button
        onClick={onGo}
        className="font-song mt-6 rounded-md px-6 py-2.5 text-sm font-semibold tracking-[0.3em] active:scale-95"
        style={{ background: 'hsl(var(--seal))', color: 'hsl(var(--primary-foreground))' }}
      >
        去 求 一 签
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

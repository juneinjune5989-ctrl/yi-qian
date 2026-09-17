import { useRef, useState } from 'react';

interface DrawBoxProps {
  onDraw: () => void;
}

const STICK_COUNT = 11;
const BOX_ORIGIN = '50% 92%';
const REST_EASE = 'cubic-bezier(0.34, 1.4, 0.64, 1)';

export default function DrawBox({ onDraw }: DrawBoxProps) {
  const boxRef = useRef<HTMLDivElement>(null);
  const holdTimer = useRef<number | null>(null);
  const cleanupTimer = useRef<number | null>(null);
  const shaking = useRef(false);
  const [phase, setPhase] = useState<'idle' | 'shaking' | 'drawing'>('idle');

  const clearHold = () => {
    if (holdTimer.current !== null) {
      window.clearTimeout(holdTimer.current);
      holdTimer.current = null;
    }
  };

  const eachStick = (fn: (el: HTMLElement) => void) => {
    boxRef.current?.querySelectorAll<HTMLElement>('.stick-inner').forEach(fn);
  };

  const startShake = () => {
    const el = boxRef.current;
    if (!el) return;
    if (cleanupTimer.current !== null) {
      window.clearTimeout(cleanupTimer.current);
      cleanupTimer.current = null;
    }
    el.style.transition = '';
    el.style.transform = '';
    el.classList.add('shake-box');
    eachStick((s) => {
      s.style.transition = '';
      s.style.transform = '';
      s.classList.add('rattle-stick');
    });
    shaking.current = true;
    setPhase('shaking');
  };

  // 从当前实际角度用带阻尼的过渡自然回正，避免任何跳变
  const settleToRest = () => {
    const el = boxRef.current;
    if (!el || !shaking.current) return;
    shaking.current = false;

    const freeze = (node: HTMLElement) => {
      const cur = getComputedStyle(node).transform;
      node.classList.remove('shake-box', 'rattle-stick');
      node.style.transition = 'none';
      node.style.transform = cur && cur !== 'none' ? cur : 'none';
    };
    freeze(el);
    eachStick(freeze);

    // 强制回流，让冻结的当前姿态生效，再启动回正过渡
    void el.offsetHeight;

    el.style.transition = `transform 0.6s ${REST_EASE}`;
    el.style.transform = 'rotate(0deg) translateX(0)';
    eachStick((s) => {
      s.style.transition = `transform 0.5s ${REST_EASE}`;
      s.style.transform = 'translateY(0) rotate(0deg)';
    });
    setPhase('idle');

    cleanupTimer.current = window.setTimeout(() => {
      el.style.transition = '';
      el.style.transform = '';
      eachStick((s) => {
        s.style.transition = '';
        s.style.transform = '';
      });
    }, 640);
  };

  const triggerDraw = () => {
    const el = boxRef.current;
    shaking.current = false;
    if (cleanupTimer.current !== null) {
      window.clearTimeout(cleanupTimer.current);
      cleanupTimer.current = null;
    }
    if (el) {
      el.classList.remove('shake-box');
      el.style.transition = '';
      el.style.transform = '';
    }
    eachStick((s) => {
      s.classList.remove('rattle-stick');
      s.style.transition = '';
      s.style.transform = '';
    });
    setPhase('drawing');
    window.setTimeout(() => onDraw(), 1150);
  };

  const startPress = () => {
    if (phase === 'drawing') return;
    holdTimer.current = window.setTimeout(startShake, 220);
  };

  const endPress = () => {
    if (phase === 'drawing') return;
    clearHold();
    if (shaking.current) settleToRest();
    else triggerDraw();
  };

  const cancelPress = () => {
    clearHold();
    if (shaking.current) settleToRest();
  };

  const sticks = Array.from({ length: STICK_COUNT });

  return (
    <div className="flex select-none flex-col items-center">
      <div
        className="relative cursor-pointer touch-none"
        style={{ width: 200, height: 300 }}
        onPointerDown={startPress}
        onPointerUp={endPress}
        onPointerLeave={cancelPress}
        onContextMenu={(e) => e.preventDefault()}
        role="button"
        aria-label="抽签盒：长按摇签，轻点抽签"
      >
        <div ref={boxRef} className="h-full w-full" style={{ transformOrigin: BOX_ORIGIN }}>
          {/* 签筒内探出的签枝 */}
          <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2" style={{ width: 150, height: 130 }}>
            {sticks.map((_, i) => {
              const spread = (i - (STICK_COUNT - 1) / 2) * 12;
              const lift = 60 - Math.abs(i - (STICK_COUNT - 1) / 2) * 7;
              return (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    left: '50%',
                    bottom: 24,
                    marginLeft: -3.5,
                    transform: `translateX(${spread}px) rotate(${spread * 0.28}deg)`,
                    transformOrigin: '50% 100%',
                  }}
                >
                  <div
                    className="stick-inner"
                    style={{
                      width: 7,
                      height: 92 + lift,
                      borderRadius: 3,
                      transformOrigin: '50% 100%',
                      background:
                        'linear-gradient(90deg, hsl(var(--bamboo)) 0%, hsl(38 40% 88%) 45%, hsl(var(--wood) / 0.55) 100%)',
                      boxShadow: 'inset -1px 0 1px hsl(var(--wood-dark) / 0.3)',
                      animationDelay: `${(i % 4) * 0.05}s`,
                    }}
                  >
                    <div style={{ height: 12, borderRadius: '3px 3px 0 0', background: 'hsl(var(--seal))' }} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* 抽出的那支签 */}
          {phase === 'drawing' && (
            <div
              className="rise-stick absolute left-1/2 z-20"
              style={{ bottom: 150, width: 11, height: 150, marginLeft: -5.5 }}
            >
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 4,
                  background: 'linear-gradient(90deg, hsl(38 44% 90%), hsl(var(--bamboo)))',
                  boxShadow: '0 6px 14px hsl(var(--wood-dark) / 0.35)',
                }}
              >
                <div style={{ height: 18, borderRadius: '4px 4px 0 0', background: 'hsl(var(--seal))' }} />
              </div>
            </div>
          )}

          {/* 筒身 */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 overflow-hidden"
            style={{
              width: 150,
              height: 190,
              borderRadius: '10px 10px 14px 14px',
              background:
                'linear-gradient(90deg, hsl(var(--wood-dark)) 0%, hsl(var(--wood)) 22%, hsl(30 36% 52%) 50%, hsl(var(--wood)) 78%, hsl(var(--wood-dark)) 100%)',
              boxShadow: '0 18px 30px hsl(var(--wood-dark) / 0.35), inset 0 2px 4px hsl(38 40% 80% / 0.25)',
            }}
          >
            {/* 竹节纹 */}
            <div className="absolute inset-x-0 top-6 h-[3px]" style={{ background: 'hsl(var(--wood-dark) / 0.5)' }} />
            <div className="absolute inset-x-0 bottom-8 h-[3px]" style={{ background: 'hsl(var(--wood-dark) / 0.5)' }} />
            {/* 顶口 */}
            <div
              className="absolute inset-x-0 top-0 h-5"
              style={{ background: 'linear-gradient(180deg, hsl(var(--wood-dark)), hsl(var(--wood) / 0))' }}
            />
            {/* 朱砂题字带 */}
            <div
              className="absolute left-1/2 top-9 flex -translate-x-1/2 flex-col items-center justify-center gap-1 rounded-sm px-3 py-3"
              style={{ background: 'hsl(var(--seal))', boxShadow: '0 2px 6px hsl(var(--wood-dark) / 0.4)' }}
            >
              <span
                className="writing-vertical font-song text-2xl font-bold tracking-widest"
                style={{ color: 'hsl(var(--primary-foreground))', lineHeight: 1.15 }}
              >
                求籤問運
              </span>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-8 font-song text-sm tracking-[0.3em]" style={{ color: 'hsl(var(--muted-foreground))' }}>
        {phase === 'drawing' ? '　签　已　出　' : phase === 'shaking' ? '　诚　心　摇　签　' : '长按摇一摇 · 轻点求签'}
      </p>
    </div>
  );
}

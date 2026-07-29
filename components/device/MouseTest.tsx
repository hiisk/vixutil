'use client';
import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * 마우스 클릭 테스트 — 버튼 인식과 채터링을 본다.
 *
 * 채터링은 스위치가 닳아 한 번 누른 것이 두 번 입력되는 고장이다. 사람이
 * 의도해서 그렇게 빨리 두 번 누르기는 어려우므로, 같은 버튼의 눌림 간격이
 * 아주 짧으면(기본 60ms) 의심 신호로 본다. 더블클릭은 보통 100ms 이상이라
 * 정상 더블클릭까지 싸잡지는 않는다.
 */
const CHATTER_MS = 60;

const BUTTONS = [
  { id: 0, label: '왼쪽 클릭', hint: 'L' },
  { id: 1, label: '휠 클릭', hint: 'M' },
  { id: 2, label: '오른쪽 클릭', hint: 'R' },
  { id: 3, label: '뒤로 (사이드)', hint: '4' },
  { id: 4, label: '앞으로 (사이드)', hint: '5' },
] as const;

type Stat = { count: number; lastGap: number | null; chatter: number };
const EMPTY: Record<number, Stat> = {};

export default function MouseTest() {
  const [stats, setStats] = useState<Record<number, Stat>>(EMPTY);
  const [active, setActive] = useState<number | null>(null);
  const [wheel, setWheel] = useState<{ dir: string; delta: number; count: number } | null>(null);
  const [rate, setRate] = useState(0);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  const lastDown = useRef<Record<number, number>>({});
  const moveCount = useRef(0);
  const zone = useRef<HTMLDivElement | null>(null);

  // 커서 이동 이벤트가 초당 몇 번 오는지 — 고폴링 마우스일수록 높게 나온다.
  useEffect(() => {
    const id = window.setInterval(() => {
      setRate(moveCount.current);
      moveCount.current = 0;
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  const press = useCallback((button: number, at: number) => {
    setActive(button);
    setStats(prev => {
      const prevAt = lastDown.current[button];
      const gap = prevAt === undefined ? null : Math.round(at - prevAt);
      lastDown.current[button] = at;
      const cur = prev[button] ?? { count: 0, lastGap: null, chatter: 0 };
      return {
        ...prev,
        [button]: {
          count: cur.count + 1,
          lastGap: gap,
          chatter: cur.chatter + (gap !== null && gap < CHATTER_MS ? 1 : 0),
        },
      };
    });
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    press(e.button, e.timeStamp);
  };

  const onMove = (e: React.PointerEvent) => {
    moveCount.current += 1;
    const box = zone.current?.getBoundingClientRect();
    if (box) setPos({ x: Math.round(e.clientX - box.left), y: Math.round(e.clientY - box.top) });
  };

  const onWheel = (e: React.WheelEvent) => {
    setWheel(prev => ({
      dir: e.deltaY < 0 ? '위로' : e.deltaY > 0 ? '아래로' : e.deltaX < 0 ? '왼쪽' : '오른쪽',
      delta: Math.round(Math.abs(e.deltaY || e.deltaX)),
      count: (prev?.count ?? 0) + 1,
    }));
  };

  const reset = () => {
    setStats(EMPTY);
    setWheel(null);
    setActive(null);
    lastDown.current = {};
  };

  const totalChatter = Object.values(stats).reduce((a, s) => a + s.chatter, 0);
  const totalClicks = Object.values(stats).reduce((a, s) => a + s.count, 0);

  return (
    <div>
      <div
        ref={zone}
        onPointerDown={onPointerDown}
        onPointerUp={() => setActive(null)}
        onPointerLeave={() => { setActive(null); setPos(null); }}
        onPointerMove={onMove}
        onWheel={onWheel}
        onContextMenu={e => e.preventDefault()}
        className="relative select-none touch-none rounded-2xl border-2 border-dashed border-sky-200 dark:border-sky-900 bg-slate-50 dark:bg-slate-950 h-52 sm:h-60 flex flex-col items-center justify-center cursor-crosshair overflow-hidden"
      >
        <div className={`text-4xl mb-2 transition-transform ${active !== null ? 'scale-90' : ''}`}>🖱️</div>
        <p className="text-sm font-bold text-slate-600 dark:text-slate-300">
          {active !== null
            ? `${BUTTONS.find(b => b.id === active)?.label ?? `버튼 ${active}`} 눌림`
            : '이 영역에서 클릭·스크롤해 보세요'}
        </p>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
          {pos ? `커서 ${pos.x}, ${pos.y}` : '오른쪽 클릭 메뉴는 이 영역에서만 잠시 꺼둡니다'}
        </p>
        <p className="absolute bottom-2.5 right-3 text-[11px] font-mono text-slate-300 dark:text-slate-600">
          이동 이벤트 {rate}/초
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-2 mt-4">
        {BUTTONS.map(b => {
          const s = stats[b.id];
          const hit = (s?.count ?? 0) > 0;
          return (
            <div
              key={b.id}
              className={`rounded-xl border px-4 py-3 transition-colors ${
                active === b.id
                  ? 'border-sky-400 bg-sky-50 dark:bg-sky-950/40'
                  : hit
                    ? 'border-emerald-200 dark:border-emerald-900/60 bg-white dark:bg-slate-900'
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
                  {hit ? '✅' : '⬜'} {b.label}
                </span>
                <span className="text-xs font-mono text-slate-400 dark:text-slate-500">{s?.count ?? 0}회</span>
              </div>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">
                {s?.lastGap != null ? `직전 클릭과 간격 ${s.lastGap}ms` : '아직 입력 없음'}
                {s && s.chatter > 0 && (
                  <span className="text-rose-500 font-bold"> · 채터링 의심 {s.chatter}회</span>
                )}
              </p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-3 gap-2 mt-4">
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-3 text-center">
          <p className="text-lg font-black text-sky-600">{totalClicks}</p>
          <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">전체 클릭</p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-3 text-center">
          <p className={`text-lg font-black ${totalChatter > 0 ? 'text-rose-500' : 'text-emerald-600'}`}>{totalChatter}</p>
          <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">채터링 의심</p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-3 text-center">
          <p className="text-lg font-black text-indigo-600">{wheel?.count ?? 0}</p>
          <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
            휠 {wheel ? `${wheel.dir} ${wheel.delta}` : '스크롤'}
          </p>
        </div>
      </div>

      {totalChatter > 0 && (
        <p className="mt-3 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/50 px-4 py-3 text-xs text-rose-700 dark:text-rose-300 leading-relaxed">
          같은 버튼이 {CHATTER_MS}ms 안에 다시 눌린 적이 {totalChatter}번 있습니다. 일부러 빠르게 두 번 누른 게 아니라면
          스위치 채터링일 수 있어요. 천천히 한 번씩만 눌러 다시 확인해 보세요.
        </p>
      )}

      <button
        onClick={reset}
        className="mt-4 w-full rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold py-3 text-sm hover:opacity-90 transition-opacity"
      >
        기록 지우기
      </button>
    </div>
  );
}

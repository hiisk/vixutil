'use client';
import { useEffect, useState } from 'react';

/**
 * 게임패드 테스트 — 버튼·스틱·트리거 입력을 실시간으로 비춘다.
 *
 * Gamepad API는 이벤트를 거의 주지 않는다. 연결/해제만 알려주고 입력 상태는
 * 매 프레임 navigator.getGamepads()로 다시 읽어야 한다. 그래서 rAF로 돈다.
 *
 * 브라우저는 아무 버튼이나 한 번 눌러야 패드를 인정한다(지문 방지). 연결했는데
 * 안 잡힌다는 문의가 대부분 이것이라 화면에도 그렇게 안내한다.
 */
const XBOX_LABELS = [
  'A', 'B', 'X', 'Y', 'LB', 'RB', 'LT', 'RT', 'Back', 'Start',
  'L스틱', 'R스틱', '↑', '↓', '←', '→', 'Home',
];

const DRIFT = 0.08;

type Snapshot = {
  id: string;
  index: number;
  buttons: { pressed: boolean; value: number }[];
  axes: number[];
  mapping: string;
};

export default function GamepadTest() {
  const [pads, setPads] = useState<Snapshot[]>([]);
  const [supported, setSupported] = useState(true);
  const [pressedEver, setPressedEver] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (typeof navigator.getGamepads !== 'function') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSupported(false);
      return;
    }

    let raf = 0;
    const poll = () => {
      const snaps: Snapshot[] = [];
      for (const g of navigator.getGamepads()) {
        if (!g) continue;
        snaps.push({
          id: g.id,
          index: g.index,
          mapping: g.mapping,
          buttons: g.buttons.map(b => ({ pressed: b.pressed, value: Number(b.value.toFixed(2)) })),
          axes: g.axes.map(a => Number(a.toFixed(3))),
        });
      }
      setPads(snaps);
      // 한 번이라도 눌린 버튼을 기억한다. 바뀐 게 없으면 같은 객체를 돌려줘
      // 매 프레임 리렌더가 도는 것을 막는다.
      setPressedEver(prev => {
        let changed = false;
        const next = { ...prev };
        for (const s of snaps) {
          s.buttons.forEach((b, i) => {
            const key = `${s.index}-${i}`;
            if (b.pressed && !next[key]) { next[key] = true; changed = true; }
          });
        }
        return changed ? next : prev;
      });
      raf = requestAnimationFrame(poll);
    };

    raf = requestAnimationFrame(poll);
    return () => cancelAnimationFrame(raf);
  }, []);

  const vibrate = (index: number) => {
    const pad = (navigator.getGamepads?.() ?? [])[index] as (Gamepad & {
      vibrationActuator?: { playEffect: (t: string, o: Record<string, number>) => Promise<string> };
    }) | null;
    void pad?.vibrationActuator?.playEffect('dual-rumble', {
      duration: 500,
      strongMagnitude: 0.8,
      weakMagnitude: 0.5,
    }).catch(() => {});
  };

  if (!supported) {
    return (
      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-5 py-10 text-center">
        <div className="text-5xl mb-3">🎮</div>
        <p className="text-sm text-slate-500 dark:text-slate-400">이 브라우저는 게임패드 API를 지원하지 않습니다. 크롬·엣지·파이어폭스에서 열어 주세요.</p>
      </div>
    );
  }

  if (pads.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-5 py-12 text-center">
        <div className="text-5xl mb-3 animate-pulse">🎮</div>
        <p className="text-sm font-bold text-slate-600 dark:text-slate-300 mb-2">컨트롤러를 기다리는 중…</p>
        <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed max-w-sm mx-auto">
          USB로 꽂거나 블루투스로 연결한 뒤, <b className="text-slate-600 dark:text-slate-300">아무 버튼이나 한 번 눌러 주세요.</b>
          <br />
          브라우저는 입력이 한 번 있어야 패드를 인식합니다.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      {pads.map(pad => {
        const drifting = pad.axes.some(a => Math.abs(a) > DRIFT);
        return (
          <div key={pad.index} className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="min-w-0">
                <p className="text-sm font-black text-slate-800 dark:text-slate-100 truncate">🎮 {pad.id}</p>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
                  {pad.index}번 · 버튼 {pad.buttons.length}개 · 축 {pad.axes.length}개
                  {pad.mapping === 'standard' && ' · 표준 배열'}
                </p>
              </div>
              <button
                onClick={() => vibrate(pad.index)}
                className="shrink-0 rounded-lg border border-slate-200 dark:border-slate-700 px-3 py-1.5 text-[11px] font-bold text-slate-600 dark:text-slate-300 hover:border-indigo-300 transition-colors"
              >
                진동 테스트
              </button>
            </div>

            {/* 아날로그 스틱 — 놓았을 때 가운데에 있어야 정상이다 */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              {[0, 2].map(base => {
                const x = pad.axes[base] ?? 0;
                const y = pad.axes[base + 1] ?? 0;
                const off = Math.hypot(x, y) > DRIFT;
                return (
                  <div key={base} className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 p-3">
                    <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 mb-2 text-center">
                      {base === 0 ? '왼쪽 스틱' : '오른쪽 스틱'}
                    </p>
                    <div className="relative mx-auto w-24 h-24 rounded-full border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
                      <div className="absolute left-1/2 top-1/2 w-px h-full -translate-x-1/2 bg-slate-100 dark:bg-slate-800" />
                      <div className="absolute top-1/2 left-1/2 h-px w-full -translate-y-1/2 bg-slate-100 dark:bg-slate-800" />
                      <div
                        className={`absolute w-5 h-5 rounded-full -translate-x-1/2 -translate-y-1/2 transition-none ${off ? 'bg-indigo-500' : 'bg-slate-300 dark:bg-slate-600'}`}
                        style={{ left: `${50 + x * 42}%`, top: `${50 + y * 42}%` }}
                      />
                    </div>
                    <p className="mt-2 text-center text-[11px] font-mono text-slate-400 dark:text-slate-500 tabular-nums">
                      {x.toFixed(2)}, {y.toFixed(2)}
                    </p>
                  </div>
                );
              })}
            </div>

            {drifting && (
              <p className="mb-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/50 px-4 py-3 text-xs text-amber-800 dark:text-amber-200 leading-relaxed">
                스틱에서 손을 뗐는데도 값이 0에서 벗어나 있다면 스틱 드리프트입니다. 손을 완전히 뗀 상태에서 위 숫자가
                0.00에 가까운지 확인하세요.
              </p>
            )}

            {/* 버튼 — 누른 적 있는 버튼은 색을 남겨 "안 눌리는 버튼"이 드러나게 한다 */}
            <div className="grid grid-cols-5 sm:grid-cols-9 gap-1.5">
              {pad.buttons.map((b, i) => {
                const ever = pressedEver[`${pad.index}-${i}`];
                return (
                  <div
                    key={i}
                    className={`rounded-lg border px-1 py-2 text-center transition-colors ${
                      b.pressed
                        ? 'bg-indigo-500 border-indigo-600 text-white'
                        : ever
                          ? 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-900 text-indigo-700 dark:text-indigo-300'
                          : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500'
                    }`}
                  >
                    <p className="text-[10px] font-bold truncate">
                      {pad.mapping === 'standard' ? (XBOX_LABELS[i] ?? i) : i}
                    </p>
                    <p className="text-[9px] font-mono opacity-70 tabular-nums">{b.value.toFixed(2)}</p>
                  </div>
                );
              })}
            </div>

            <p className="mt-3 text-[11px] text-slate-400 dark:text-slate-500 text-center">
              모든 버튼을 한 번씩 눌러 보세요. 색이 안 바뀌는 버튼이 인식되지 않는 버튼입니다.
            </p>
          </div>
        );
      })}
    </div>
  );
}

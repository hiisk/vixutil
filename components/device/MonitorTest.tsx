'use client';
import { MONITOR_UI, type DeviceLang } from '@/lib/device-ui-intl';
import { useCallback, useEffect, useState } from 'react';

/**
 * 모니터 불량화소 테스트 — 단색을 전체화면으로 덮는다.
 *
 * 화면 전체가 한 색이어야 죽은 점이 눈에 띈다. 브라우저 UI나 이 사이트의
 * 카드가 조금이라도 보이면 시선이 그리로 가서 못 찾는다. 그래서 전체화면
 * API를 시도하고, 거부되더라도 fixed 오버레이로 최소한 화면은 다 덮는다.
 *
 * 화면을 덮은 동안에는 클릭·방향키로 색을 넘기고 Esc로 빠져나온다.
 */
const PATTERNS = [
  { key: 'red', css: '#ff0000' },
  { key: 'green', css: '#00ff00' },
  { key: 'blue', css: '#0000ff' },
  { key: 'white', css: '#ffffff' },
  { key: 'black', css: '#000000' },
  { key: 'gray', css: '#808080' },
  { key: 'grad', css: 'linear-gradient(90deg,#000,#fff)' },
  { key: 'rgb', css: 'linear-gradient(90deg,#f00 0 33.3%,#0f0 33.3% 66.6%,#00f 66.6%)' },
] as const;

export default function MonitorTest({ lang = 'ko' }: { lang?: DeviceLang } = {}) {
  const ui = MONITOR_UI[lang];
  const [idx, setIdx] = useState<number | null>(null);
  const [auto, setAuto] = useState(false);
  const [hint, setHint] = useState(true);

  const exit = useCallback(() => {
    setIdx(null);
    setAuto(false);
    if (document.fullscreenElement) void document.exitFullscreen().catch(() => {});
  }, []);

  const open = useCallback((i: number) => {
    setIdx(i);
    setHint(true);
    // 문서 전체를 전체화면으로 올린다. 오버레이만 올리면 아직 렌더 전이라 잡히지 않는다.
    // 거부돼도 오버레이가 화면을 덮으므로 실패는 삼킨다.
    void document.documentElement.requestFullscreen?.().catch(() => {});
  }, []);

  const next = useCallback((step: number) => {
    setIdx(i => (i === null ? null : (i + step + PATTERNS.length) % PATTERNS.length));
    setHint(false);
  }, []);

  useEffect(() => {
    if (idx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') exit();
      else if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); next(1); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); next(-1); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [idx, exit, next]);

  // 자동 순환 — 손을 안 대고 눈으로만 훑고 싶을 때
  useEffect(() => {
    if (idx === null || !auto) return;
    const id = window.setInterval(() => next(1), 2500);
    return () => window.clearInterval(id);
  }, [idx, auto, next]);

  // 사용자가 F11이나 Esc로 전체화면을 직접 빠져나간 경우 오버레이도 같이 닫는다
  useEffect(() => {
    const onFs = () => {
      if (!document.fullscreenElement) {
        setIdx(null);
        setAuto(false);
      }
    };
    document.addEventListener('fullscreenchange', onFs);
    return () => document.removeEventListener('fullscreenchange', onFs);
  }, []);

  // 힌트는 3초 뒤 사라진다 — 흰 화면 위의 검은 글씨가 점 찾기를 방해한다
  useEffect(() => {
    if (idx === null || !hint) return;
    const id = window.setTimeout(() => setHint(false), 3000);
    return () => window.clearTimeout(id);
  }, [idx, hint]);

  const current = idx === null ? null : PATTERNS[idx];

  return (
    <div>
      {current && idx !== null && (
        <div className="fixed inset-0 z-50" style={{ background: current.css }}>
          {/* 화면 전체가 "다음 색" 버튼이다 — 색 위에 다른 것이 겹치면 점을 못 찾는다 */}
          <button
            type="button"
            aria-label={ui.screenAria(ui.colors[PATTERNS.indexOf(current)])}
            onClick={() => next(1)}
            className="absolute inset-0 w-full h-full cursor-pointer"
          />
          {hint && (
            <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-black/65 px-6 py-4 text-center text-sm text-white leading-relaxed">
              <span className="block font-bold mb-1">{ui.colors[PATTERNS.indexOf(current)]} ({idx + 1}/{PATTERNS.length})</span>
              {ui.tips[PATTERNS.indexOf(current)]}
              <span className="block mt-2 text-[11px] text-white/70">
                {ui.fullscreenHint}
              </span>
            </div>
          )}
          <button
            type="button"
            onClick={exit}
            className="absolute top-4 right-4 rounded-xl bg-black/55 px-4 py-2 text-xs font-bold text-white hover:bg-black/75 transition-colors"
          >
            {ui.exit}
          </button>
        </div>
      )}

      <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 p-5">
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
          {ui.how}
          <br />
          <span className="text-slate-400 dark:text-slate-500 text-xs">
            {ui.keysHint}
          </span>
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {PATTERNS.map((p, i) => (
            <button
              key={p.key}
              onClick={() => open(i)}
              className="group rounded-xl border chip-off p-2.5 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-sm transition-all"
            >
              <span
                className="block w-full h-12 rounded-lg border border-slate-200 dark:border-slate-700"
                style={{ background: p.css }}
              />
              <span className="block mt-2 text-xs font-bold text-slate-600 dark:text-slate-300 group-hover:text-sec transition-colors">
                {ui.colors[i]}
              </span>
            </button>
          ))}
        </div>

        <button
          onClick={() => { setAuto(true); open(0); }}
          className="mt-4 w-full rounded-xl bg-sec font-bold py-3 text-sm shadow hover:opacity-90 transition-opacity"
        >
          {ui.autoCycle}
        </button>
      </div>

      <div className="mt-4 rounded-lg border chip-off p-5">
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-3">{ui.judgeTitle}</p>
        <ul className="flex flex-col gap-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <li>
            <b className="text-slate-800 dark:text-slate-100">{ui.deadTerm}</b>{ui.deadNote}
          </li>
          <li>
            <b className="text-slate-800 dark:text-slate-100">{ui.stuckTerm}</b>{ui.stuckNote}
          </li>
          <li>
            <b className="text-slate-800 dark:text-slate-100">{ui.bleedTerm}</b>{ui.bleedNote}
          </li>
          <li>
            <b className="text-slate-800 dark:text-slate-100">{ui.patchTerm}</b>{ui.patchNote}
          </li>
        </ul>
        <p className="mt-3 text-[11px] text-slate-400 dark:text-slate-500 leading-relaxed">
          {ui.warrantyNote}
        </p>
      </div>
    </div>
  );
}

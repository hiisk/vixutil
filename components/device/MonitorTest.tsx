'use client';
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
  { key: 'red', label: '빨강', css: '#ff0000', tip: '빨간 화면에서 검은 점 = 죽은 픽셀' },
  { key: 'green', label: '초록', css: '#00ff00', tip: '초록에서 안 보이면 초록 서브픽셀 문제' },
  { key: 'blue', label: '파랑', css: '#0000ff', tip: '파랑에서 얼룩지면 백라이트 불균일' },
  { key: 'white', label: '흰색', css: '#ffffff', tip: '흰 화면의 검은 점·먼지 확인' },
  { key: 'black', label: '검정', css: '#000000', tip: '가장자리 빛샘과 밝은 점 확인' },
  { key: 'gray', label: '회색', css: '#808080', tip: '얼룩(멍)과 색 치우침 확인' },
  { key: 'grad', label: '그라디언트', css: 'linear-gradient(90deg,#000,#fff)', tip: '계단처럼 끊기면 색 밴딩' },
  { key: 'rgb', label: 'RGB 3분할', css: 'linear-gradient(90deg,#f00 0 33.3%,#0f0 33.3% 66.6%,#00f 66.6%)', tip: '세 색의 경계가 또렷한지' },
] as const;

export default function MonitorTest() {
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
            aria-label={`${current.label} 화면 — 누르면 다음 색으로`}
            onClick={() => next(1)}
            className="absolute inset-0 w-full h-full cursor-pointer"
          />
          {hint && (
            <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-black/65 px-6 py-4 text-center text-sm text-white leading-relaxed">
              <span className="block font-black mb-1">{current.label} ({idx + 1}/{PATTERNS.length})</span>
              {current.tip}
              <span className="block mt-2 text-[11px] text-white/70">
                클릭 · → 다음 색 &nbsp;|&nbsp; Esc 나가기
              </span>
            </div>
          )}
          <button
            type="button"
            onClick={exit}
            className="absolute top-4 right-4 rounded-xl bg-black/55 px-4 py-2 text-xs font-bold text-white hover:bg-black/75 transition-colors"
          >
            ✕ 나가기 (Esc)
          </button>
        </div>
      )}

      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 p-5">
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
          색을 하나 고르면 화면 전체가 그 색으로 덮입니다. 화면에 코를 가까이 대고 다른 색의 점이 있는지 훑어보세요.
          <br />
          <span className="text-slate-400 dark:text-slate-500 text-xs">
            클릭 또는 → 키로 다음 색, Esc로 나가기. 밝기는 최대로 올리고 보는 편이 잘 보입니다.
          </span>
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {PATTERNS.map((p, i) => (
            <button
              key={p.key}
              onClick={() => open(i)}
              className="group rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-2.5 hover:border-indigo-300 hover:shadow-sm transition-all"
            >
              <span
                className="block w-full h-12 rounded-lg border border-slate-200 dark:border-slate-700"
                style={{ background: p.css }}
              />
              <span className="block mt-2 text-xs font-bold text-slate-600 dark:text-slate-300 group-hover:text-indigo-600 transition-colors">
                {p.label}
              </span>
            </button>
          ))}
        </div>

        <button
          onClick={() => { setAuto(true); open(0); }}
          className="mt-4 w-full rounded-xl bg-gradient-to-r from-slate-600 to-indigo-700 text-white font-bold py-3 text-sm shadow hover:opacity-90 transition-opacity"
        >
          ▶ 2.5초마다 자동으로 전부 순환
        </button>
      </div>

      <div className="mt-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5">
        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-3">이렇게 판단하세요</p>
        <ul className="flex flex-col gap-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <li>
            <b className="text-slate-800 dark:text-slate-100">데드 픽셀</b> — 모든 색에서 계속 까맣다면 그 픽셀이 죽은 겁니다.
          </li>
          <li>
            <b className="text-slate-800 dark:text-slate-100">스턱 픽셀</b> — 검정 화면인데 빨강·초록·파랑 점 하나가 켜져 있다면
            서브픽셀이 굳은 겁니다. 며칠 쓰면 풀리기도 합니다.
          </li>
          <li>
            <b className="text-slate-800 dark:text-slate-100">빛샘</b> — 검정 화면의 가장자리가 희끄무레하면 백라이트가 새는 것으로,
            LCD에서는 어느 정도 정상 범위입니다.
          </li>
          <li>
            <b className="text-slate-800 dark:text-slate-100">얼룩(멍)</b> — 회색 화면에서 넓게 어두운 부분이 보이면 패널 눌림일 수 있습니다.
          </li>
        </ul>
        <p className="mt-3 text-[11px] text-slate-400 dark:text-slate-500 leading-relaxed">
          제조사마다 교환 기준(불량화소 개수)이 다릅니다. 개통·구매 직후에 확인하고 사진을 남겨 두세요.
        </p>
      </div>
    </div>
  );
}

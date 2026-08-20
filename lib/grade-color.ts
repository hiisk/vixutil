import type { CSSProperties } from 'react';

/**
 * 「from-rose-500 to-pink-600」 같은 등급 색 문자열에서 색 하나를 뽑는다.
 *
 * ── 왜 이렇게 하나 (2026-08-20) ─────────────────────────────
 * 결과 화면 열다섯 곳이 그라디언트 판이었고, 그 색은 데이터 표에 Tailwind
 * 클래스 문자열로 적혀 있다 — 퀴즈 등급, 궁합 점수, 관상, 타로, 한자 급수…
 * lib 안에 그런 문자열이 1,400개가 넘는다.
 *
 * 판을 흰 종이로 바꾸면서 **색 자체를 버릴 수는 없다.** 등급 색은 정보다
 * (좋음/보통/나쁨을 색이 나른다). 그래서 표는 그대로 두고, 첫 색만 뽑아
 * 카드 위쪽 4px 띠에 쓴다. 표 1,400줄을 고치지 않고 화면만 바뀐다.
 *
 * 색 값은 Tailwind 기본 팔레트의 500단계다. 정확히 같을 필요는 없다 —
 * 4px 띠 하나를 칠하는 값이라 눈으로 구분되기만 하면 된다.
 */
const HUE: Record<string, string> = {
  rose: '#e11d48', pink: '#db2777', red: '#dc2626', orange: '#ea580c',
  amber: '#d97706', yellow: '#ca8a04', lime: '#65a30d', green: '#16a34a',
  emerald: '#059669', teal: '#0d9488', cyan: '#0891b2', sky: '#0284c7',
  blue: '#2563eb', indigo: '#4f46e5', violet: '#7c3aed', purple: '#9333ea',
  fuchsia: '#c026d3', slate: '#475569',
};

/** 「from-<색>-<숫자>」에서 <색>을 찾는다. 못 찾으면 null — 그러면 갈래 색이 쓰인다. */
export function gradeColor(cls: string | undefined | null): string | null {
  if (!cls) return null;
  const m = /from-([a-z]+)-\d{2,3}/.exec(cls);
  return m ? HUE[m[1]] ?? null : null;
}

/**
 * .result-card에 그대로 넘기는 style 객체.
 *
 * 색을 못 알아보면 빈 객체를 준다 — CSS에서 var(--grade, var(--c-sec))로
 * 받으므로 그때는 페이지의 갈래 색이 나온다.
 */
export function gradeVar(cls: string | undefined | null): CSSProperties {
  const c = gradeColor(cls);
  return c ? ({ ['--grade']: c } as CSSProperties) : {};
}

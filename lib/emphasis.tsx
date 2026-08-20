import { Fragment, type ReactNode } from 'react';

/**
 * 본문의 `**강조**`를 실제 굵은 글씨로 바꾼다.
 *
 * ── 왜 (2026-08-20) ─────────────────────────────────────────
 * 테스트 결과 설명에 `**자주 일어난다는 것**`처럼 적어 둔 곳이 일흔두 군데
 * 있는데, 그리는 쪽이 마크다운을 모르니 **화면에 별표가 그대로 나왔다.**
 * 다섯 묶음(af·ag·ah·ai·aj)이 그랬다.
 *
 * 별표를 지우는 대신 강조를 살린다 — 그 자리는 글쓴이가 「여기가 요점」이라고
 * 표시한 곳이고, 결과 설명은 대여섯 줄이라 강조 하나가 실제로 읽기를 돕는다.
 *
 * 마크다운 파서를 붙이지 않는다. 쓰이는 문법이 `**` 하나뿐이라 나누기 한 번이면
 * 끝나고, HTML을 만들지 않으므로(React 노드다) 주입 걱정도 없다.
 */
export function renderEmphasis(text: string): ReactNode {
  const parts = text.split('**');
  if (parts.length < 3) return text;   // 짝이 안 맞으면 건드리지 않는다
  return parts.map((p, i) =>
    i % 2 === 1
      ? <strong key={i} className="font-bold">{p}</strong>
      : <Fragment key={i}>{p}</Fragment>,
  );
}

/** 그림·공유 문구처럼 서식이 못 들어가는 자리 — 별표만 뗀다 */
export function stripEmphasis(text: string): string {
  return text.replace(/\*\*/g, '');
}

/**
 * 배경에 깔리는 은은한 컬러 글로우.
 *
 * 계산기(CalcShell)에서 먼저 쓴 것을 다른 섹션도 쓸 수 있게 뺐다. 섹션마다
 * 고유색이 있어 accent로 받는다. 이게 있어야 반투명 카드가 "유리"처럼 보인다 —
 * 뒤에 아무것도 없으면 그냥 흐린 흰 판이다.
 *
 * fixed라 스크롤과 무관하게 고정되고, pointer-events-none이라 클릭을 막지 않는다.
 */
/*
 * ── 파스텔 얼룩을 걷었다 (2026-08-19) ────────────────────────────
 * 예전에는 화면 구석에 지름 28rem짜리 컬러 원 두 개를 blur로 깔았다. 반투명
 * 유리 카드가 «유리»로 보이게 하려던 장치인데, 판이 전부 단색으로 바뀌면서
 * 받쳐 줄 대상이 없어졌다. 남은 것은 어느 AI가 만든 화면에나 있는 그 배경뿐이다.
 *
 * 대신 위쪽에 갈래 색을 아주 옅게 한 겹 깐다. 지면이 흰 판과 붙어 보이지 않게
 * 하는 최소한이고, 원이 아니라 화면 폭을 가로지르는 띠라 «얼룩»으로 안 읽힌다.
 *
 * acc-* 클래스는 그대로 둔다 — globals.css가 :has(> .acc-*)로 그 부모에
 * --c-sec를 얹고, 페이지 전체의 색이 거기서 나온다. 이 파일이 색을 정하는
 * 유일한 자리라는 성질은 안 바뀐다. tests/design-consistency.test.ts가
 * 이 목록을 읽어 지원하는 accent를 센다.
 */
const ACCENT = {
  blue:    ['blue'],
  violet:  ['violet'],
  amber:   ['amber'],
  emerald: ['emerald'],
  sky:     ['sky'],
  indigo:  ['indigo'],
  rose:    ['rose'],
} as const;

export default function PageGlow({ accent = 'blue' }: { accent?: keyof typeof ACCENT }) {
  return (
    <div aria-hidden className={`acc-${accent} page-wash pointer-events-none fixed inset-x-0 top-0 h-72`} />
  );
}

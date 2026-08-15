/**
 * 배경에 깔리는 은은한 컬러 글로우.
 *
 * 계산기(CalcShell)에서 먼저 쓴 것을 다른 섹션도 쓸 수 있게 뺐다. 섹션마다
 * 고유색이 있어 accent로 받는다. 이게 있어야 반투명 카드가 "유리"처럼 보인다 —
 * 뒤에 아무것도 없으면 그냥 흐린 흰 판이다.
 *
 * fixed라 스크롤과 무관하게 고정되고, pointer-events-none이라 클릭을 막지 않는다.
 */
const ACCENT = {
  blue:    ['bg-blue-400/10',    'bg-emerald-400/10'],
  violet:  ['bg-violet-400/12',  'bg-pink-400/10'],
  amber:   ['bg-amber-400/12',   'bg-orange-400/10'],
  emerald: ['bg-emerald-400/12', 'bg-teal-400/10'],
  sky:     ['bg-sky-400/12',     'bg-cyan-400/10'],
  indigo:  ['bg-indigo-400/12',  'bg-violet-400/10'],
  rose:    ['bg-rose-400/12',    'bg-pink-400/10'],
} as const;

export default function PageGlow({ accent = 'blue' }: { accent?: keyof typeof ACCENT }) {
  const [a, b] = ACCENT[accent];
  /*
    acc-*는 그리는 것이 없다. globals.css가 `:has(> .acc-*)`로 이 div의 **부모**를
    골라 --c-sec를 얹고, 그 아래 본문 전체(제목 막대·표 줄무늬·칩·초점 테두리)가
    같은 색을 물려받는다. 낱장마다 style=을 박으면 십사만 장 × 세 벌
    (HTML·.rsc·.segments)이 되므로 클래스 한 낱말로 끝낸다.
  */
  return (
    <div aria-hidden className={`acc-${accent} pointer-events-none fixed inset-0 overflow-hidden`}>
      <div className={`absolute -top-32 -left-24 w-[28rem] h-[28rem] rounded-full blur-3xl ${a}`} />
      <div className={`absolute top-1/3 -right-32 w-[26rem] h-[26rem] rounded-full blur-3xl ${b}`} />
    </div>
  );
}

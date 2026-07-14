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
} as const;

export default function PageGlow({ accent = 'blue' }: { accent?: keyof typeof ACCENT }) {
  const [a, b] = ACCENT[accent];
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className={`absolute -top-32 -left-24 w-[28rem] h-[28rem] rounded-full blur-3xl ${a}`} />
      <div className={`absolute top-1/3 -right-32 w-[26rem] h-[26rem] rounded-full blur-3xl ${b}`} />
    </div>
  );
}

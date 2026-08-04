import type { Fraction } from '@/lib/fraction/list';

/**
 * 분수를 길이로 — 전체를 분모만큼 자르고 분자만큼 칠한다.
 *
 * 눈금을 한가운데에 둔 것은 "이 분수가 반보다 큰가"가 가장 자주 하는 비교이기
 * 때문이다. 숫자만 보면 7/13과 6/13 중 어느 쪽이 반을 넘는지 한 번 더 생각해야
 * 하는데, 눈금이 있으면 볼 것도 없다.
 */
export default function FractionBar({ f }: { f: Fraction }) {
  return (
    <div className="relative flex h-9 w-full overflow-hidden rounded-xl border border-lime-300 dark:border-lime-800" aria-hidden>
      {Array.from({ length: f.d }, (_, i) => (
        <span
          key={i}
          className={`h-full flex-1 ${i < f.n ? 'bg-lime-500 dark:bg-lime-600' : 'bg-lime-50 dark:bg-lime-950/40'} ${
            i > 0 ? 'border-l border-lime-200/70 dark:border-lime-800/70' : ''
          }`}
        />
      ))}
      <span className="absolute inset-y-0 left-1/2 w-px bg-slate-900/40 dark:bg-white/50" />
    </div>
  );
}

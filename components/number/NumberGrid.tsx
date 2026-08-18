import { GRID_COLS, GRID_MAX } from '@/lib/number/list';
import { isPrime } from '@/lib/number/facts';

/**
 * 1부터 200까지의 격자 — 목차이자 그림이다.
 *
 * 열 칸씩 끊으면 2와 5의 배수가 세로줄로 서고, 소수가 그 사이 좁은 자리에만
 * 남는 모양이 눈에 들어온다. 목록으로 늘어놓으면 보이지 않는 것이다.
 *
 * 칸의 색은 소수인지만 따진다. 갈래를 다 칠하면(제곱수·삼각수·피보나치가
 * 서로 겹친다) 한 칸이 여러 색을 가져야 해서 그림이 무너진다.
 */
export default function NumberGrid({ current }: { current?: number }) {
  return (
    <div className="grid gap-[3px]" style={{ gridTemplateColumns: `repeat(${GRID_COLS}, minmax(0, 1fr))` }}>
      {Array.from({ length: GRID_MAX }, (_, i) => i + 1).map(n => {
        const prime = isPrime(n);
        const on = n === current;
        return (
          <span
            key={n}
           
            aria-current={on ? 'page' : undefined}
            className={`rounded-[4px] border py-[3px] text-center text-[10px] font-bold tabular-nums leading-none transition-transform hover:scale-110 hover:z-10 ${
              prime
                ? 'bg-indigo-100 dark:bg-indigo-900/60 border-indigo-300 dark:border-indigo-700 text-indigo-800 dark:text-indigo-200'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400'
            } ${on ? 'ring-2 ring-slate-900 dark:ring-white' : ''}`}>
            {n}
          </span>
        );
      })}
    </div>
  );
}

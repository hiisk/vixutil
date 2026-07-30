import Link from 'next/link';
import { ELEMENTS } from '@/lib/element/list';
import { categoryOf, elementFacts, type Category } from '@/lib/element/facts';

/**
 * 주기율표 — 자리를 적어 두지 않고 원자번호에서 계산해 놓는다.
 *
 * 가로 열여덟 칸, 세로 일곱 줄에 란타넘·악티늄 두 줄을 아래에 덧댄다.
 * 좁은 화면에서는 표가 열여덟 칸을 감당하지 못하므로 가로로 밀어 볼 수 있게 한다.
 */
const COLOUR: Record<Category, string> = {
  nonmetal: 'bg-emerald-100 dark:bg-emerald-900/50 border-emerald-300 dark:border-emerald-700',
  noble: 'bg-violet-100 dark:bg-violet-900/50 border-violet-300 dark:border-violet-700',
  halogen: 'bg-teal-100 dark:bg-teal-900/50 border-teal-300 dark:border-teal-700',
  alkali: 'bg-rose-100 dark:bg-rose-900/50 border-rose-300 dark:border-rose-700',
  alkaline: 'bg-orange-100 dark:bg-orange-900/50 border-orange-300 dark:border-orange-700',
  transition: 'bg-amber-100 dark:bg-amber-900/50 border-amber-300 dark:border-amber-700',
  'post-transition': 'bg-sky-100 dark:bg-sky-900/50 border-sky-300 dark:border-sky-700',
  metalloid: 'bg-lime-100 dark:bg-lime-900/50 border-lime-300 dark:border-lime-700',
  lanthanide: 'bg-indigo-100 dark:bg-indigo-900/50 border-indigo-300 dark:border-indigo-700',
  actinide: 'bg-fuchsia-100 dark:bg-fuchsia-900/50 border-fuchsia-300 dark:border-fuchsia-700',
};

export default function PeriodicTable({ path, current }: { path: string; current?: number }) {
  return (
    <div className="overflow-x-auto -mx-1 px-1 pb-2">
      <div
        className="grid gap-[3px] min-w-[620px]"
        style={{ gridTemplateColumns: 'repeat(18, minmax(0, 1fr))', gridTemplateRows: 'repeat(10, auto)' }}
      >
        {ELEMENTS.map(x => {
          const { cell } = elementFacts(x);
          const on = x.z === current;
          return (
            <Link
              key={x.z}
              href={`${path}/${x.z}`}
              style={{ gridColumn: cell.col, gridRow: cell.row }}
              className={`rounded-[4px] border px-0.5 py-[3px] text-center leading-none transition-transform hover:scale-110 hover:z-10 ${COLOUR[categoryOf(x.z)]} ${on ? 'ring-2 ring-slate-900 dark:ring-white' : ''}`}
              aria-current={on ? 'page' : undefined}
            >
              <span className="block text-[7px] text-slate-500 dark:text-slate-400 tabular-nums">{x.z}</span>
              <span className="block text-[11px] font-black text-slate-800 dark:text-slate-100">{x.symbol}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

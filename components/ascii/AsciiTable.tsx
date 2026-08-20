import { CODES, TABLE_COLS, TABLE_ROWS } from '@/lib/ascii/list';
import { asciiFacts, kindOf, type Kind } from '@/lib/ascii/facts';

/**
 * ASCII 코드표 — 가로 여덟 칸이 위 세 비트, 세로 열여섯 줄이 아래 네 비트.
 *
 * 예부터 이 모양으로 그린다. 그렇게 그려야 대문자 열(4·5) 바로 옆에 소문자
 * 열(6·7)이 서서, 두 칸이 정확히 32 떨어져 있다는 것이 눈에 보인다. 세로로
 * 늘어놓은 목록에서는 절대 보이지 않는 것이다.
 *
 * 좁은 화면에서는 여덟 칸이 감당되지 않으므로 가로로 밀어 볼 수 있게 한다.
 */
const COLOUR: Record<Kind, string> = {
  control: 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300',
  space: 'bg-amber-100 dark:bg-amber-900/50 border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-200',
  digit: 'bg-emerald-100 dark:bg-emerald-900/50 border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-200',
  upper: 'bg-teal-100 dark:bg-teal-900/50 border-teal-300 dark:border-teal-700 text-teal-800 dark:text-teal-200',
  lower: 'bg-sky-100 dark:bg-sky-900/50 border-sky-300 dark:border-sky-700 text-sky-800 dark:text-sky-200',
  punct: 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300',
};

export default function AsciiTable({ current }: { current?: number }) {
  return (
    <div className="overflow-x-auto -mx-1 px-1 pb-2">
      <div
        className="grid gap-[3px] min-w-[420px]"
        style={{ gridTemplateColumns: `repeat(${TABLE_COLS}, minmax(0, 1fr))`, gridTemplateRows: `repeat(${TABLE_ROWS}, auto)` }}
      >
        {CODES.map(code => {
          const f = asciiFacts(code);
          const on = code === current;
          return (
            <span
              key={code}
             
              style={{ gridColumn: f.cell.col + 1, gridRow: f.cell.row + 1 }}
              aria-current={on ? 'page' : undefined}
              className={`rounded-[4px] border px-0.5 py-[3px] text-center leading-none transition-transform hover:scale-110 hover:z-10 ${COLOUR[kindOf(code)]} ${on ? 'ring-2 ring-slate-900 dark:ring-white' : ''}`}>
              <span className="block text-[7px] tabular-nums opacity-70">{code}</span>
              <span className="block text-[11px] font-bold">{f.label}</span>
            </span>
          );
        })}
      </div>
    </div>
  );
}

import type { SpecResult } from '@/lib/cable/facts';
import type { Verdict } from '@/lib/cable/facts';

/**
 * 규격별 판정 — 지나감·아슬아슬·안 됨을 색으로도 갈라 둔다.
 */
const TONE: Record<Verdict, string> = {
  pass: 'text-emerald-700 dark:text-emerald-300',
  tight: 'text-amber-700 dark:text-amber-300',
  fail: 'text-rose-700 dark:text-rose-300',
};

export default function CableSpecTable({
  specs,
  name,
  verdictName,
}: {
  specs: SpecResult[];
  name: (key: string) => string;
  verdictName: (v: Verdict) => string;
}) {
  return (
    <ul className="list-card">
      {specs.map(s => (
        <li key={s.key} className="flex items-baseline justify-between gap-3 px-4 py-2.5">
          <span className="text-sm text-slate-600 dark:text-slate-300">{name(s.key)}</span>
          <span className="flex items-baseline gap-2 shrink-0">
            <span className="text-xs text-slate-400 dark:text-slate-500 tabular-nums">{s.video} Gbps · {s.used}%</span>
            <span className={`text-sm font-bold tabular-nums ${TONE[s.verdict]}`}>{verdictName(s.verdict)}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}

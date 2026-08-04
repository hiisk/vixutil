import Link from 'next/link';
import { PACES, labelOf, slugOf } from '@/lib/pace/list';
import { paceFacts } from '@/lib/pace/facts';

/**
 * 페이스와 완주 시간을 나란히 — 표가 곧 목차다.
 *
 * 241줄을 다 늘어놓으면 자기 자리를 못 찾는다. 30초 간격으로 굵은 눈금을
 * 세우고, 낱장에서 초 단위로 좁히게 한다.
 */
export default function PaceTable({
  path,
  paces,
  current,
  head,
}: {
  path: string;
  paces: number[];
  current?: number;
  head: [string, string, string];
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700">
      <table className="w-full text-sm tabular-nums">
        <thead>
          <tr className="bg-slate-50 dark:bg-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
            <th className="px-3 py-2 text-left font-bold">{head[0]}</th>
            <th className="px-3 py-2 text-right font-bold">{head[1]}</th>
            <th className="px-3 py-2 text-right font-bold">{head[2]}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
          {paces.filter(p => PACES.includes(p)).map(p => {
            const f = paceFacts(p);
            const here = p === current;
            return (
              <tr key={p} className={here ? 'bg-teal-50 dark:bg-teal-950/40' : 'bg-white dark:bg-slate-900'}>
                <td className="px-3 py-2 font-bold">
                  <Link href={`${path}/${slugOf(p)}`} className="text-teal-700 dark:text-teal-400 hover:underline">
                    {labelOf(p)}
                  </Link>
                </td>
                <td className="px-3 py-2 text-right text-slate-700 dark:text-slate-200">{f.finishes[2].text}</td>
                <td className="px-3 py-2 text-right text-slate-700 dark:text-slate-200">{f.finishes[3].text}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

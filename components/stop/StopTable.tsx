import Link from 'next/link';
import { stopFacts } from '@/lib/stop/facts';

/**
 * 속도별 정지거리를 한 줄에 — 마른 노면과 젖은 노면을 나란히.
 *
 * 노면 넷을 다 늘어놓으면 표가 옆으로 넘친다. 가장 많이 겪는 둘만 세우고
 * 나머지는 낱장에서 본다.
 */
export default function StopTable({
  path,
  speeds,
  current,
  head,
}: {
  path: string;
  speeds: number[];
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
          {speeds.map(v => {
            const f = stopFacts(v);
            const here = v === current;
            return (
              <tr key={v} className={here ? 'bg-red-50 dark:bg-red-950/40' : 'bg-white dark:bg-slate-900'}>
                <td className="px-3 py-2 font-bold">
                  <Link href={`${path}/${v}`} className="text-red-700 dark:text-red-400 hover:underline">
                    {v} km/h
                  </Link>
                </td>
                <td className="px-3 py-2 text-right text-slate-700 dark:text-slate-200">{f.surfaces[0].total} m</td>
                <td className="px-3 py-2 text-right text-slate-700 dark:text-slate-200">{f.surfaces[1].total} m</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

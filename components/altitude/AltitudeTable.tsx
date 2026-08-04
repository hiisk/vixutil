import Link from 'next/link';
import { altitudeFacts } from '@/lib/altitude/facts';

/**
 * 높이·기압·끓는점을 한 줄에 — 끓는점이 이 표의 얼굴이다.
 *
 * 기압만 적으면 hPa가 얼마나 큰 값인지 감이 오지 않는다. 옆에 끓는점이 있으면
 * "여기서는 물이 92도에 끓는다"로 곧장 읽힌다.
 */
export default function AltitudeTable({
  path,
  altitudes,
  current,
  head,
}: {
  path: string;
  altitudes: number[];
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
          {altitudes.map(m => {
            const f = altitudeFacts(m);
            const here = m === current;
            return (
              <tr key={m} className={here ? 'bg-cyan-50 dark:bg-cyan-950/40' : 'bg-white dark:bg-slate-900'}>
                <td className="px-3 py-2 font-bold">
                  <Link href={`${path}/${m}`} className="text-cyan-700 dark:text-cyan-400 hover:underline">
                    {m} m
                  </Link>
                </td>
                <td className="px-3 py-2 text-right text-slate-700 dark:text-slate-200">{f.hpa} hPa</td>
                <td className="px-3 py-2 text-right text-slate-700 dark:text-slate-200">{f.boilC} °C</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

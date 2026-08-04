import { EARTH_G } from '@/lib/gravity/list';
import type { OnBody } from '@/lib/gravity/facts';

/**
 * 천체별 저울 값 — 지구 줄을 진하게 둔다.
 *
 * 기준이 어디인지가 보여야 나머지 줄이 읽힌다. 지구보다 무거운 곳은 색으로
 * 갈라 두면 넷뿐이라는 것도 한눈에 들어온다.
 */
export default function GravityTable({
  bodies,
  name,
  head,
}: {
  bodies: OnBody[];
  name: (key: string) => string;
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
          {bodies.map(b => {
            const isEarth = b.key === 'earth';
            return (
              <tr
                key={b.key}
                className={
                  isEarth
                    ? 'bg-indigo-50 dark:bg-indigo-950/40 font-bold'
                    : b.g > EARTH_G
                      ? 'bg-white dark:bg-slate-900 text-indigo-800 dark:text-indigo-300'
                      : 'bg-white dark:bg-slate-900'
                }
              >
                <td className="px-3 py-2 font-bold text-slate-800 dark:text-slate-100">{name(b.key)}</td>
                <td className="px-3 py-2 text-right text-slate-700 dark:text-slate-200">{b.kg} kg</td>
                <td className="px-3 py-2 text-right text-slate-500 dark:text-slate-400">×{b.ratio}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

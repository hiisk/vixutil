import Link from 'next/link';
import { HUMIDS, TEMPS, slugOf } from '@/lib/dew/list';
import { comfortOf, dewOf } from '@/lib/dew/facts';

/**
 * 기온 × 습도 격자 — 눅눅한 칸이 오른쪽 위로 번진다.
 *
 * 같은 습도를 세로로 훑으면 기온이 오를수록 색이 짙어진다. 습도만으로는 눅눅함을
 * 알 수 없다는 이 표의 요점이 그 모양에 그대로 있다.
 */
export default function DewGrid({ path, current }: { path: string; current?: string }) {
  return (
    <div className="overflow-x-auto rounded-2xl border chip-off p-2">
      <table className="w-full text-[11px] tabular-nums">
        <thead>
          <tr className="text-slate-400 dark:text-slate-500">
            <th className="px-1 py-1 text-left">℃\%</th>
            {HUMIDS.map(rh => (
              <th key={rh} className="px-1 py-1 text-center font-bold">{rh}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...TEMPS].reverse().map(t => (
            <tr key={t}>
              <th className="px-1 py-1 text-left font-bold text-slate-500 dark:text-slate-400">{t}</th>
              {HUMIDS.map(rh => {
                const dew = dewOf(t, rh);
                const comfort = comfortOf(dew);
                const slug = slugOf({ t, rh });
                const here = slug === current;
                return (
                  <td key={rh} className="p-0.5">
                    <Link
                      href={`${path}/${slug}`}
                      aria-current={here ? 'page' : undefined}
                      className={[
                        'block rounded px-1 py-1 text-center font-bold transition-colors',
                        here
                          ? 'bg-cyan-700 text-white'
                          : comfort === 'oppressive'
                            ? 'bg-rose-200 dark:bg-rose-900/60 text-rose-900 dark:text-rose-100'
                            : comfort === 'muggy'
                              ? 'bg-orange-100 dark:bg-orange-950/50 text-orange-900 dark:text-orange-200'
                              : comfort === 'sticky'
                                ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200'
                                : 'text-slate-600 dark:text-slate-300 hover:bg-cyan-50 dark:hover:bg-cyan-950/40',
                      ].join(' ')}
                    >
                      {dew}
                    </Link>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

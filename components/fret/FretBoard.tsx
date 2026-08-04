import Link from 'next/link';
import type { Lang } from '@/lib/i18n/lang';
import { DOTS, MAX_FRET, STRINGS, slugOf } from '@/lib/fret/list';
import { nameOf } from '@/lib/fret/facts';

/**
 * 지판을 그대로 그린다 — 1번 줄이 위로 온다.
 *
 * 목록을 세로로 늘어놓으면 지판이 사라진다. 실제 배열대로 두어야 "3번 줄 5프렛"이
 * 손이 가는 자리와 같은 그림에서 읽힌다. 점이 찍히는 프렛은 아래에 표시한다.
 */
export default function FretBoard({
  path,
  lang,
  current,
  upto = 12,
}: {
  path: string;
  lang: Lang;
  current?: string;
  upto?: number;
}) {
  const frets = Array.from({ length: Math.min(upto, MAX_FRET) + 1 }, (_, i) => i);

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-2">
      <table className="w-full text-[11px] tabular-nums">
        <tbody>
          {Array.from({ length: STRINGS }, (_, i) => i + 1).map(string => (
            <tr key={string}>
              <th className="pr-2 text-right font-bold text-slate-400 dark:text-slate-500">{string}</th>
              {frets.map(fret => {
                const slug = slugOf({ string, fret });
                const here = slug === current;
                return (
                  <td key={fret} className="p-0.5">
                    <Link
                      href={`${path}/${slug}`}
                      aria-current={here ? 'page' : undefined}
                      className={[
                        'block rounded px-1 py-1 text-center font-bold transition-colors',
                        here
                          ? 'bg-amber-600 text-white'
                          : fret === 0
                            ? 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-amber-700'
                            : 'text-slate-600 dark:text-slate-300 hover:bg-amber-50 dark:hover:bg-amber-950/40 hover:text-amber-700 dark:hover:text-amber-400',
                      ].join(' ')}
                    >
                      {nameOf({ string, fret }, lang)}
                    </Link>
                  </td>
                );
              })}
            </tr>
          ))}
          <tr>
            <th />
            {frets.map(fret => (
              <td key={fret} className="pt-1 text-center text-[10px] text-slate-400 dark:text-slate-500">
                {DOTS.includes(fret) ? (fret === 12 ? '••' : '•') : fret === 0 ? '' : fret}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

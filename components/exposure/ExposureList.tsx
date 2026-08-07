import Link from 'next/link';
import { SHUTTERS, apertureLabel, shutterLabel, slugOf, type Cell } from '@/lib/exposure/list';
import { exposureFacts } from '@/lib/exposure/facts';

/**
 * 칸 목록 — 조리개·셔터 옆에 그 칸의 EV를 미리 적는다.
 */
export default function ExposureList({
  cells,
  path,
  evLabel,
  current,
}: {
  cells: Cell[];
  path: string;
  evLabel: string;
  current?: string;
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
      {cells.map(c => {
        const slug = slugOf(c);
        const f = exposureFacts(c);
        const here = slug === current;
        return (
          <Link
            key={slug}
            href={`${path}/${slug}`}
            aria-current={here ? 'page' : undefined}
            className={`rounded-xl border px-3 py-2 transition-colors ${
              here
                ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/40'
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-sky-400'
            }`}
          >
            <div className="cell-sub-cut">{apertureLabel(c.aperture)} · {shutterLabel(SHUTTERS[c.shutter])}</div>
            <div className="cell-num">{evLabel} {f.ev}</div>
          </Link>
        );
      })}
    </div>
  );
}

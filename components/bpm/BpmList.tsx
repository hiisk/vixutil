import Link from 'next/link';
import { slugOf, type Cell } from '@/lib/bpm/list';
import { BPM_UI } from '@/lib/bpm/ui';
import type { Lang } from '@/lib/i18n/lang';
import { bpmFacts } from '@/lib/bpm/facts';

/**
 * 칸 목록 — 템포·음표와 함께 밀리초를 미리 적는다.
 *
 * 목록에서 밀리초가 바로 보여야 표를 펼쳐 둔 보람이 있다.
 */
export default function BpmList({
  cells,
  path,
  by,
  lang,
  current,
}: {
  cells: Cell[];
  path: string;
  /** 칸 이름을 무엇으로 적을지 — 같은 템포 줄이면 음표로, 반대면 템포로 */
  by: 'note' | 'bpm';
  lang: Lang;
  current?: string;
}) {
  const ui = BPM_UI[lang];
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
      {cells.map(c => {
        const slug = slugOf(c);
        const f = bpmFacts(c);
        const here = slug === current;
        return (
          <Link
            key={slug}
            href={`${path}/${slug}`}
            aria-current={here ? 'page' : undefined}
            className={`rounded-xl border px-3 py-2 transition-colors ${
              here
                ? 'border-rose-500 bg-rose-50 dark:bg-rose-950/40'
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-rose-400'
            }`}
          >
            <div className="cell-cut">{by === 'note' ? ui.noteName(c.note) : `${c.bpm} BPM`}</div>
            <div className="text-sm font-bold tabular-nums text-slate-800 dark:text-slate-100">
              {f.ms} ms
              <span className="ml-1.5 text-xs font-normal text-slate-400 dark:text-slate-500">
                {f.hz} Hz
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

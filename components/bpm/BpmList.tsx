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
          <Link prefetch={false}
            key={slug}
            href={`${path}/${slug}`}
            aria-current={here ? 'page' : undefined}
            className={`chip ${
              here
                ? 'border-rose-500 bg-rose-50 dark:bg-rose-950/40'
                : 'chip-off hover:border-rose-400'
            }`}
          >
            <div className="cell-cut">{by === 'note' ? ui.noteName(c.note) : `${c.bpm} BPM`}</div>
            <div className="val">
              {f.ms} ms
              <span className="val-unit">
                {f.hz} Hz
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

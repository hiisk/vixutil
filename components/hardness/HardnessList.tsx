import Link from 'next/link';
import { slugOf } from '@/lib/hardness/list';
import { hardnessFacts, valueOf } from '@/lib/hardness/facts';
import { HARDNESS_UI, fmtNum } from '@/lib/hardness/ui';
import type { Lang } from '@/lib/i18n/lang';

/**
 * 칸 목록 — ppm과 함께 °dH·gpg를 미리 적는다.
 *
 * 목록에서 다른 단위가 바로 보여야 "내 단위로는 어디쯤인가"를 안 헤맨다.
 * 숫자는 fmtNum으로 찍는다 — 본문과 소수점 기호가 어긋나면 같은 값이 두 얼굴이 된다.
 */
export default function HardnessList({
  ppms,
  path,
  lang,
  current,
}: {
  ppms: number[];
  path: string;
  lang: Lang;
  current?: string;
}) {
  const ui = HARDNESS_UI[lang];
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
      {ppms.map(ppm => {
        const slug = slugOf(ppm);
        const f = hardnessFacts(ppm);
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
            <div className="cell-cut">{ui.bandNames[f.band]}</div>
            <div className="text-sm font-bold tabular-nums text-slate-800 dark:text-slate-100">
              {ppm} ppm
              <span className="ml-1.5 text-xs font-normal text-slate-400 dark:text-slate-500">
                {fmtNum(lang, valueOf(f, 'dh'))} °dH · {fmtNum(lang, valueOf(f, 'gpg'))} gpg
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

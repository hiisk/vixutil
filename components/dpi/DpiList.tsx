import Link from 'next/link';
import type { Cell } from '@/lib/dpi/list';
import { REF_CM, dpiFacts } from '@/lib/dpi/facts';
import { DPI_UI, cellName, factorText, fmtNum } from '@/lib/dpi/ui';
import type { Lang } from '@/lib/i18n/lang';

/**
 * 칸 목록 — 이름과 함께 그 칸의 답을 미리 적는다.
 *
 * 쌍 칸은 곱수(같은 계열이면 "그대로"), 낱점 칸은 대표 거리의 감도다. 목록에서
 * 그것이 바로 보여야 "DPI가 오르면 감도가 내려간다"가 눈에 든다. 숫자는 fmtNum으로
 * 찍는다 — 본문과 소수점 기호가 어긋나면 같은 값이 두 얼굴이 된다.
 */
export default function DpiList({
  cells,
  path,
  lang,
  by,
  current,
}: {
  cells: Cell[];
  path: string;
  lang: Lang;
  /** 칸 이름을 무엇으로 적을지 — 한 줄에서 달라지는 축만 적는다 */
  by: 'full' | 'to' | 'from' | 'dpi' | 'game';
  current?: string;
}) {
  const ui = DPI_UI[lang];
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
      {cells.map(c => {
        const f = dpiFacts(c);
        const here = f.slug === current;
        const name =
          by === 'full' ? cellName(lang, f)
            : f.kind === 'pair'
              ? (by === 'from' ? f.from.short : f.to.short)
              : (by === 'game' ? f.game.short : `${f.dpi} DPI`);
        return (
          <Link prefetch={false}
            key={f.slug}
            href={`${path}/${f.slug}`}
            aria-current={here ? 'page' : undefined}
            className={`chip ${
              here
                ? 'border-violet-500 bg-violet-50 dark:bg-violet-950/40'
                : 'chip-off hover:border-violet-400'
            }`}
          >
            <div className="cell-cut">{name}</div>
            {f.kind === 'pair' ? (
              <div className="val">
                {factorText(lang, f)}
              </div>
            ) : (
              <div className="val">
                {fmtNum(lang, f.pick.sens)}
                <span className="val-unit">
                  {REF_CM} cm · {ui.edpiLabel} {f.pick.edpi}
                </span>
              </div>
            )}
          </Link>
        );
      })}
    </div>
  );
}

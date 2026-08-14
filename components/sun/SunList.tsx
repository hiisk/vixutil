import { slugOf, type Cell } from '@/lib/sun/list';
import { sunFacts } from '@/lib/sun/facts';
import { dateName, dayLengthText, fmtNum, latName } from '@/lib/sun/ui';
import type { Lang } from '@/lib/i18n/lang';

/**
 * 칸 목록 — 이름과 함께 낮 길이와 정오 고도를 미리 적는다.
 *
 * 목록에서 두 값이 바로 보여야 "위도가 오르면 여름 낮이 길어진다"가 눈에 든다.
 * 숫자는 fmtNum으로 찍는다 — 본문과 소수점 기호가 어긋나면 같은 값이 두 얼굴이 된다.
 *
 * 낱장을 없앴으므로 칸은 더 이상 링크가 아니다 — 값은 그대로 여기서 다 읽힌다.
 */
export default function SunList({
  cells,
  lang,
  by,
}: {
  cells: Cell[];
  lang: Lang;
  /** 칸 이름을 무엇으로 적을지 — 같은 위도 줄이면 날짜만, 같은 날짜 줄이면 위도만 */
  by: 'date' | 'lat' | 'both';
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
      {cells.map(c => {
        const f = sunFacts(c);
        const name =
          by === 'date' ? dateName(lang, f.day)
            : by === 'lat' ? latName(lang, c.lat)
              : `${latName(lang, c.lat)} · ${dateName(lang, f.day)}`;
        return (
          <div key={slugOf(c)} className="chip chip-off">
            <div className="cell-cut">{name}</div>
            <div className="val">
              {dayLengthText(lang, f)}
              <span className="val-unit">
                {fmtNum(lang, f.noonAltitude)}°
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

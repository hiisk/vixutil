import { ogGlyph } from '@/lib/og-icons';
import { ICON_FOR } from '@/lib/og-icon-map';

/**
 * 같은 아이콘이 여러 번 나오는 목록용 — 도형은 한 번만 싣고 참조만 반복한다.
 *
 * ToolIcon은 부르는 자리마다 path를 통째로 그린다. 카드 하나면 문제가 없지만
 * /test처럼 228장이 같은 아이콘(🧠)을 쓰는 목록에서는 같은 path가 228번 실려
 * HTML이 60KB 넘게 불어난다. 실제로 허브 크기 상한(400KB)을 넘겼다.
 *
 * 그래서 도형은 <symbol>로 한 번 정의하고 카드에서는 <use>로 가리킨다. 참조는
 * 100바이트 이하라 장수가 늘어도 거의 안 커진다.
 *
 * accent는 symbol에 박히므로 한 목록 안에서 같은 accent를 쓸 때만 맞다. 카드마다
 * accent가 다르면 ToolIcon을 쓰는 편이 낫다.
 */

const idOf = (name: string) => `ti-${name}`;

/** 목록 위쪽에 한 번 놓는다 — 화면에는 안 보인다 */
export function ToolIconDefs({ emojis, accent = 'currentColor' }: { emojis: string[]; accent?: string }) {
  const names = [...new Set(emojis.map(e => ICON_FOR[e]).filter(Boolean))];
  if (names.length === 0) return null;
  return (
    <svg width={0} height={0} aria-hidden="true" style={{ position: 'absolute' }}>
      <defs>
        {names.map(name => {
          const glyph = ogGlyph(Object.keys(ICON_FOR).find(e => ICON_FOR[e] === name)!, accent);
          if (!glyph) return null;
          return (
            <symbol
              key={name}
              id={idOf(name)}
              viewBox="0 0 100 100"
              fill="none"
              stroke="currentColor"
              strokeWidth={5}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {glyph}
            </symbol>
          );
        })}
      </defs>
    </svg>
  );
}

/**
 * 정의해 둔 도형을 가리킨다. stroke·fill은 여기서 주고 <use> 안쪽이 물려받는다.
 * 매핑이 없는 이모지는 이모지를 그대로 보여준다 — ToolIcon과 같은 규칙이다.
 */
export function ToolIconRef({
  emoji,
  className,
  title,
}: {
  emoji: string;
  className?: string;
  title?: string;
}) {
  const name = ICON_FOR[emoji];
  if (!name) {
    return (
      <span className={className} role="img" aria-label={title}>
        {emoji}
      </span>
    );
  }
  return (
    // 선 굵기·끝 모양은 symbol에 있다 — 카드마다 되풀이하면 목록에서 수십 KB가 된다
    <svg className={className} aria-label={title} aria-hidden={title ? undefined : true}>
      <use href={`#${idOf(name)}`} />
    </svg>
  );
}

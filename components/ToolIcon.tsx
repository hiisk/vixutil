import { ogGlyph } from '@/lib/og-icons';

/**
 * 도구 아이콘 — 공유 카드와 같은 그림을 화면에도 쓴다.
 *
 * 데이터에는 도구마다 이모지가 들어 있고, 공유 카드는 그 이모지를 열쇠로
 * 직접 그린 선 아이콘을 얹는다. 화면에서 이모지를 그대로 보여주면 같은 도구가
 * 목록에서는 컬러 이모지, 공유 카드에서는 흑백 선으로 나와 두 얼굴이 된다.
 *
 * 색은 두 가지만 쓴다.
 *  - 선: currentColor. 그라데이션 타일 위에서는 부모가 text-white를 주면 된다.
 *  - accent: 아이콘마다 한 군데 강조하는 색. 기본은 선과 같은 색(단색)이고,
 *    타일 위에서는 반투명 흰색을 넘겨 두 톤으로 만드는 쪽이 잘 읽힌다.
 *
 * 매핑에 없는 이모지는 이모지를 그대로 보여준다 — 새 도구를 추가한 사람이
 * 아이콘을 그릴 때까지 화면이 비지 않아야 한다. 어떤 이모지가 아직 아이콘이
 * 없는지는 tests/og-coverage.test.ts가 알려준다.
 */
export default function ToolIcon({
  emoji,
  className,
  color,
  accent = 'currentColor',
  title,
}: {
  emoji: string;
  /** 크기는 클래스로 준다 — w-7 h-7 처럼 */
  className?: string;
  /** 선 색을 값으로 줄 때. 클래스로 줄 수 있으면 className 쪽이 낫다 */
  color?: string;
  accent?: string;
  /** 이모지로 폴백될 때 스크린리더가 읽을 이름 */
  title?: string;
}) {
  const glyph = ogGlyph(emoji, accent);
  if (!glyph) {
    return (
      <span className={className} style={color ? { color } : undefined} role="img" aria-label={title}>
        {emoji}
      </span>
    );
  }
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      style={color ? { color } : undefined}
      fill="none"
      stroke="currentColor"
      strokeWidth={5}
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      {glyph}
    </svg>
  );
}

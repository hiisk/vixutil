/**
 * 텍사스 홀덤 시작 핸드 169가지 — 한 줄도 적지 않는다.
 *
 * 두 장을 받는 경우의 수는 1,326가지지만, 무늬 이름이 달라도 세기는 같으므로
 * 서로 다른 핸드는 169가지다(포켓 페어 13 + 수티드 78 + 오프수트 78). 그 169가지는
 * 순위 두 개와 무늬가 같은지 아닌지로 정해지므로 두 겹 반복문이면 나온다.
 *
 * 목록을 손으로 적으면 169줄이고, 한 줄을 빠뜨려도 눈에 띄지 않는다. 반복문으로
 * 만들면 개수와 조합 수의 합(1,326)이 검사에서 곧바로 어긋난다.
 */

/** 낮은 순위부터 — 인덱스가 곧 세기다 */
export const RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'] as const;

export type HandKind = 'pair' | 'suited' | 'offsuit';

export interface Hand {
  slug: string;
  /** 높은 쪽 순위 인덱스(12가 A) */
  high: number;
  /** 낮은 쪽 순위 인덱스. 포켓 페어는 high와 같다 */
  low: number;
  kind: HandKind;
}

/** "AKs" 처럼 포커 판에서 쓰는 표기 */
export const labelOf = (h: Hand): string =>
  `${RANKS[h.high]}${RANKS[h.low]}${h.kind === 'pair' ? '' : h.kind === 'suited' ? 's' : 'o'}`;

function build(): Hand[] {
  const out: Hand[] = [];
  for (let high = 12; high >= 0; high--) {
    for (let low = high; low >= 0; low--) {
      if (high === low) {
        out.push({ slug: `${RANKS[high]}${RANKS[low]}`.toLowerCase(), high, low, kind: 'pair' });
        continue;
      }
      const pair = `${RANKS[high]}${RANKS[low]}`.toLowerCase();
      out.push({ slug: `${pair}s`, high, low, kind: 'suited' });
      out.push({ slug: `${pair}o`, high, low, kind: 'offsuit' });
    }
  }
  return out;
}

export const HANDS: Hand[] = build();

export const handOf = (slug: string): Hand | undefined => HANDS.find(h => h.slug === slug);

/** 목록과 공유 카드가 같은 그림을 쓴다 */
export const POKER_ICON = '🃏';

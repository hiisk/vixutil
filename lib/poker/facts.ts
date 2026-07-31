/**
 * 시작 핸드 하나에서 나오는 숫자 — 전부 조합으로 센다.
 *
 * 확률표를 옮겨 적지 않는다. 옮겨 적으면 11.8%가 18.1%로 적혀도 아무도 못 잡지만,
 * 조합으로 세면 합이 1이 되는지, 조합 수를 다 더하면 1,326이 되는지가 검사에서
 * 곧바로 어긋난다.
 *
 * 플롭 확률은 남은 50장에서 석 장을 뽑는 C(50,3)=19,600가지를 바닥에 두고 센다.
 */
import { HANDS, RANKS, labelOf, type Hand } from './list.ts';

/** 조합 — n개에서 k개를 고르는 가짓수 */
export function choose(n: number, k: number): number {
  if (k < 0 || k > n) return 0;
  let out = 1;
  for (let i = 1; i <= k; i++) out = (out * (n - k + i)) / i;
  return Math.round(out);
}

/** 두 장을 받는 모든 경우의 수 */
export const TOTAL_DEALS = choose(52, 2);
/** 플롭 석 장의 모든 경우의 수 */
export const FLOPS = choose(50, 3);

/** 무늬까지 세면 그 핸드가 몇 가지인가 */
export const combosOf = (h: Hand): number => (h.kind === 'pair' ? 6 : h.kind === 'suited' ? 4 : 12);

/**
 * 첸 공식 점수 — 시작 핸드의 세기를 한 숫자로 재는 오래된 방법.
 *
 * 1) 높은 쪽 카드에 값을 준다: A 10, K 8, Q 7, J 6, 나머지는 숫자의 절반.
 * 2) 페어면 두 배(최소 5), 3) 무늬가 같으면 +2,
 * 4) 사이가 벌어진 만큼 뺀다, 5) 붙어 있고 둘 다 Q보다 낮으면 +1, 6) 올림.
 *
 * 값을 적지 않고 규칙을 적는 이유는 같다 — 169줄을 옮겨 적으면 한 줄이 틀려도 모른다.
 */
export function chenScore(h: Hand): number {
  const face = (rank: number): number => {
    if (rank === 12) return 10; // A
    if (rank === 11) return 8;  // K
    if (rank === 10) return 7;  // Q
    if (rank === 9) return 6;   // J
    return (rank + 2) / 2;      // T 이하는 숫자의 절반
  };

  let score = face(h.high);
  if (h.kind === 'pair') score = Math.max(score * 2, 5);
  if (h.kind === 'suited') score += 2;

  const gap = h.kind === 'pair' ? 0 : h.high - h.low - 1;
  score -= gap === 0 ? 0 : gap === 1 ? 1 : gap === 2 ? 2 : gap === 3 ? 4 : 5;
  // 붙어 있는 낮은 카드는 스트레이트가 잘 나와서 한 점 얹는다
  if (h.kind !== 'pair' && gap <= 1 && h.high < 10) score += 1;

  return Math.ceil(score);
}

export type Tier = 'premium' | 'strong' | 'playable' | 'marginal' | 'weak';

export const tierOf = (score: number): Tier =>
  score >= 10 ? 'premium' : score >= 8 ? 'strong' : score >= 6 ? 'playable' : score >= 4 ? 'marginal' : 'weak';

export interface HandFacts {
  slug: string;
  label: string;
  kind: Hand['kind'];
  /** 화면에 그대로 쓰는 순위 글자 */
  cards: [string, string];
  /** 무늬까지 센 가짓수 */
  combos: number;
  /** 받을 확률(%) */
  dealtPct: number;
  /** 몇 번에 한 번 들어오는가 */
  oneIn: number;
  score: number;
  tier: Tier;
  /** 169가지를 점수로 줄 세웠을 때의 자리 */
  rank: number;
  /** 두 순위 사이에 빈 칸이 몇 개인가 */
  gap: number;
  connected: boolean;
  /** 둘 다 10 이상인가 */
  broadway: boolean;
  /** 플롭에서 무엇이 얼마나 나오는가(%) */
  flop: { key: string; pct: number }[];
  /** 가까운 핸드 */
  siblings: string[];
}

/** 플롭 확률 — 남은 50장에서 석 장. 분모는 모두 C(50,3)이다 */
function flopOdds(h: Hand): { key: string; pct: number }[] {
  const pct = (ways: number) => (ways / FLOPS) * 100;
  const out: { key: string; pct: number }[] = [];

  if (h.kind === 'pair') {
    // 셋 이상 — 같은 순위 두 장 중 하나라도 나오면 된다
    out.push({ key: 'set', pct: pct(FLOPS - choose(48, 3)) });
    // 포카드 — 남은 두 장이 다 나온다
    out.push({ key: 'quads', pct: pct(choose(2, 2) * 48) });
    // 오버카드 없는 플롭 — 내 페어보다 높은 순위가 하나도 안 깔린다
    const higher = (12 - h.high) * 4;
    out.push({ key: 'noOver', pct: pct(choose(48 - higher, 3)) });
  } else {
    // 한 장이라도 짝이 맞는다 — 짝이 될 카드는 여섯 장
    out.push({ key: 'pair', pct: pct(FLOPS - choose(44, 3)) });
    // 투 페어 — 양쪽이 하나씩 맞고 나머지 한 장은 다른 순위
    out.push({ key: 'twoPair', pct: pct(3 * 3 * 44) });
    // 트립스 — 한쪽 순위가 두 장 깔린다
    out.push({ key: 'trips', pct: pct(2 * choose(3, 2) * 44) });
  }

  if (h.kind === 'suited') {
    // 플러시 드로 — 같은 무늬가 딱 두 장 더
    out.push({ key: 'flushDraw', pct: pct(choose(11, 2) * 39) });
    // 플롭에서 바로 플러시
    out.push({ key: 'flush', pct: pct(choose(11, 3)) });
  }
  return out;
}

const ORDER: string[] = [...HANDS]
  .map(h => ({ slug: h.slug, score: chenScore(h), combos: combosOf(h) }))
  // 점수가 같으면 조합이 많은 쪽(잘 들어오는 쪽)을 앞에 둔다. 그것도 같으면 이름순이라
  // 어느 기계에서 돌려도 같은 자리가 나온다
  .sort((a, b) => b.score - a.score || b.combos - a.combos || a.slug.localeCompare(b.slug))
  .map(x => x.slug);

const CACHE = new Map<string, HandFacts>();

export function handFacts(h: Hand): HandFacts {
  const cached = CACHE.get(h.slug);
  if (cached) return cached;

  const combos = combosOf(h);
  const score = chenScore(h);
  const gap = h.kind === 'pair' ? 0 : h.high - h.low - 1;

  // 가까운 핸드 — 같은 두 장의 다른 무늬, 그리고 순위 하나 위아래
  const kin = new Set<string>();
  const name = `${RANKS[h.high]}${RANKS[h.low]}`.toLowerCase();
  if (h.kind === 'suited') kin.add(`${name}o`);
  if (h.kind === 'offsuit') kin.add(`${name}s`);
  for (const other of HANDS) {
    if (other.slug === h.slug || kin.size >= 6) continue;
    const sameKind = other.kind === h.kind;
    const near = Math.abs(other.high - h.high) + Math.abs(other.low - h.low) === 1;
    if (sameKind && near) kin.add(other.slug);
  }

  const facts: HandFacts = {
    slug: h.slug,
    label: labelOf(h),
    kind: h.kind,
    cards: [RANKS[h.high], RANKS[h.low]],
    combos,
    dealtPct: (combos / TOTAL_DEALS) * 100,
    oneIn: TOTAL_DEALS / combos,
    score,
    tier: tierOf(score),
    rank: ORDER.indexOf(h.slug) + 1,
    gap,
    connected: h.kind !== 'pair' && gap === 0,
    broadway: h.low >= 8,
    flop: flopOdds(h),
    siblings: [...kin].slice(0, 6),
  };
  CACHE.set(h.slug, facts);
  return facts;
}

/** 갈래별 개수 — 허브에서 쓴다 */
export function kindCounts(): Record<Hand['kind'], number> {
  return {
    pair: HANDS.filter(h => h.kind === 'pair').length,
    suited: HANDS.filter(h => h.kind === 'suited').length,
    offsuit: HANDS.filter(h => h.kind === 'offsuit').length,
  };
}

/** 등급별 개수 */
export function tierCounts(): Record<Tier, number> {
  const out: Record<Tier, number> = { premium: 0, strong: 0, playable: 0, marginal: 0, weak: 0 };
  for (const h of HANDS) out[tierOf(chenScore(h))]++;
  return out;
}

/** 점수가 높은 순서 */
export const rankedSlugs = (): string[] => ORDER;

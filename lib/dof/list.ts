/**
 * 피사계 심도 120칸 — 초점거리 12가지 × 조리개 10가지.
 *
 * "어디서부터 어디까지 초점이 맞아 보이는가"는 초점거리만으로도, 조리개만으로도
 * 답이 안 나온다. 같은 f/2.8이라도 24mm와 200mm는 스무 배 넘게 다르다. 둘을
 * 함께 놓아야 거리가 나온다(facts.ts).
 *
 * 계산기가 아니라 **표**다. 사진 찍는 자리에서 묻는 것은 "지금 이 렌즈에서
 * 몇 미터부터 맞나"이고, 그 답은 초점거리와 조리개가 정하는 값 하나다.
 */

/**
 * 초점거리(mm) — 흔히 파는 렌즈의 값.
 *
 * 14부터 400까지, 실제로 만들어져 팔리는 자리에만 눈금을 뒀다. 50과 85 사이가
 * 벌어져 있는 것은 그 사이의 렌즈가 드물어서다.
 */
export const FOCALS: number[] = [14, 20, 24, 28, 35, 50, 85, 100, 135, 200, 300, 400];

/**
 * 조리개 f값 — 한 칸씩 조이는 자리와 밝은 렌즈의 최대 개방.
 *
 * 1.4·1.8·2는 밝은 단렌즈의 개방값이고, 2.8부터는 √2씩 조이는 표준 눈금이다.
 * 한 칸 조일 때마다 빛은 절반이 되고 심도는 √2배 깊어진다.
 */
export const APERTURES: number[] = [1.4, 1.8, 2, 2.8, 4, 5.6, 8, 11, 16, 22];

/**
 * 허용 착란원(mm) — "이 정도 번지면 아직 점으로 보인다"의 지름.
 *
 * 심도라는 것은 렌즈가 정말로 초점을 맞춘 면이 하나뿐인데도 그 앞뒤가
 * 맞아 **보이는** 범위다. 그래서 값이 아니라 약속에서 나온다. 판형이 작을수록
 * 같은 사진 크기로 키울 때 더 크게 번지므로 허용치도 작아진다.
 *
 * 35mm 판형의 0.03mm은 대각선 약 43mm를 1430으로 나눈 값으로, 가장 널리 쓰는
 * 관례다. 잡지에 크게 싣거나 화면에서 100%로 들여다보면 이보다 엄격해진다.
 */
export const FORMATS: { key: string; coc: number; crop: number }[] = [
  { key: 'ff', coc: 0.03, crop: 1 },
  { key: 'apsc', coc: 0.02, crop: 1.5 },
  { key: 'm43', coc: 0.015, crop: 2 },
];

/** 표에 함께 싣는 피사체 거리(m) — 인물부터 풍경까지 */
export const SUBJECTS: number[] = [0.5, 1, 2, 3, 5, 10];

export interface Cell {
  /** 초점거리(mm) */
  focal: number;
  /** 조리개 f값 */
  aperture: number;
}

export const CELLS: Cell[] = FOCALS.flatMap(focal => APERTURES.map(aperture => ({ focal, aperture })));

/** 50mm f/1.8 → 50mm-f1-8 */
export const slugOf = (c: Cell): string => `${c.focal}mm-f${String(c.aperture).replace('.', '-')}`;

export const DOF_SLUGS = CELLS.map(slugOf);

const BY_SLUG = new Map(CELLS.map(c => [slugOf(c), c]));

export const cellOf = (slug: string): Cell | undefined => BY_SLUG.get(slug);

export const formatOf = (key: string) => FORMATS.find(f => f.key === key);

/** 목록과 공유 카드가 같은 그림을 쓴다 */
export const DOF_ICON = '📷';

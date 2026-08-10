/**
 * 딜레이 타임 288칸 — 템포 24가지 × 음표 길이 12가지.
 *
 * 딜레이와 리버브를 곡에 맞추려면 밀리초를 알아야 하는데, 그 값은 템포만으로도
 * 음표 길이만으로도 정해지지 않는다. 둘을 곱해야 나온다(facts.ts).
 *
 *   한 박(4분음표) = 60000 ÷ BPM 밀리초
 *
 * 그래서 이 표는 곱셈 하나지만, 작업 중에 계산기를 꺼내는 대신 눈으로 찾으라고
 * 미리 펼쳐 둔 것이다.
 */

/**
 * 템포(BPM).
 *
 * 5씩 오르되 **실제로 많이 쓰는 값을 빠뜨리지 않았다** — 124·126·128은 클럽
 * 음악이, 174는 드럼앤베이스가 쓰는 자리다. 눈금을 고르게만 두면 정작 찾는
 * 템포가 없어서, 규칙보다 쓰임을 앞에 뒀다.
 */
export const TEMPOS: number[] = [
  60, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120,
  124, 126, 128, 130, 135, 140, 145, 150, 160, 170, 174, 180,
];

/**
 * 음표 길이 — 4분음표를 1로 본 배수.
 *
 * 점음표는 1.5배, 셋잇단음표는 3분의 2다. 이 둘이 있어야 딜레이가 곡에
 * 붙는다 — 점8분음표 딜레이는 기타에서 가장 많이 쓰는 설정이다.
 */
export const NOTES: { key: string; beats: number }[] = [
  { key: '1', beats: 4 },
  { key: '2', beats: 2 },
  { key: '4', beats: 1 },
  { key: '8', beats: 0.5 },
  { key: '16', beats: 0.25 },
  { key: '32', beats: 0.125 },
  { key: '2d', beats: 3 },
  { key: '4d', beats: 1.5 },
  { key: '8d', beats: 0.75 },
  { key: '4t', beats: 2 / 3 },
  { key: '8t', beats: 1 / 3 },
  { key: '16t', beats: 1 / 6 },
];

/** 한 마디의 박 수 — 4/4박자를 기준으로 삼는다 */
export const BEATS_PER_BAR = 4;

export interface Cell {
  /** 템포(BPM) */
  bpm: number;
  /** 음표 열쇠 */
  note: string;
}

export const CELLS: Cell[] = TEMPOS.flatMap(bpm => NOTES.map(n => ({ bpm, note: n.key })));

/** 120BPM의 점8분음표 → 120-8d */
export const slugOf = (c: Cell): string => `${c.bpm}-${c.note}`;

export const BPM_SLUGS = CELLS.map(slugOf);

const BY_SLUG = new Map(CELLS.map(c => [slugOf(c), c]));

export const cellOf = (slug: string): Cell | undefined => BY_SLUG.get(slug);

export const noteOf = (key: string) => NOTES.find(n => n.key === key);

/** 목록과 공유 카드가 같은 그림을 쓴다 */
export const BPM_ICON = '🎚️';

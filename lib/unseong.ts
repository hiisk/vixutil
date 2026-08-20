import { BRANCHES, STEMS, type Chart, type Pillar } from './saju-data.ts';

/**
 * 십이운성(十二運星) — 일간이 각 지지에서 갖는 «기운의 세기».
 *
 * ── 왜 필요한가 ────────────────────────────────────────────
 * 「제왕」·「장생」·「목욕」은 사주를 조금이라도 본 사람이면 듣는 말이고,
 * 「내 일간이 어느 자리에서 힘이 센가」는 명식을 뽑아야 알 수 있었다.
 * 십이신살과 짝이 되는 표라 같은 재료(명식)로 바로 낸다.
 *
 * ── 규칙 ───────────────────────────────────────────────────
 * 일간마다 «장생지»가 정해져 있고, 거기서부터 열두 자리를 돈다.
 * **양간은 순행, 음간은 역행이다.** 이 방향 때문에 갑과 을이 같은 목(木)인데도
 * 힘이 세는 자리가 정반대다.
 *
 *   갑 장생 亥 → 순행     을 장생 午 → 역행
 *   병·무 장생 寅         정·기 장생 酉
 *   경 장생 巳            신 장생 子
 *   임 장생 申            계 장생 卯
 *
 * 확인할 못: **건록은 그 일간이 스스로 앉는 자리**다(갑→寅, 병→巳, 경→申,
 * 임→亥). 제왕은 그다음 왕지(갑→卯, 병→午, 경→酉, 임→子)다. 규칙을 잘못
 * 짜면 이 둘이 동시에 어긋난다 — tests/unseong.test.ts가 그것을 잰다.
 */

export interface Unseong {
  name: string;
  hanja: string;
  /** 0~5 — 기운의 세기. 화면에서 막대로 낸다 */
  power: number;
  gist: string;
  body: string;
}

/** 장생부터 양까지 — 이 차례가 곧 규칙이다 */
export const UNSEONGS: readonly Unseong[] = [
  { name: '장생', hanja: '長生', power: 4, gist: '태어나 자라는 자리',
    body: '갓 나서 뻗어 가는 기운입니다. 배우고 시작하는 데 힘이 붙고, 사람이 잘 따릅니다. 아직 여물지 않아 큰 결정을 혼자 밀어붙이기보다 도움을 받는 쪽이 낫다고 봅니다.' },
  { name: '목욕', hanja: '沐浴', power: 2, gist: '씻고 꾸미는 자리',
    body: '함지살(咸池殺)이라고도 합니다. 겉으로 드러내고 꾸미는 기운이라 멋과 매력이 있지만, 마음이 자주 바뀌고 시작한 것을 끝내기 전에 다음 것으로 옮겨 가기 쉽습니다.' },
  { name: '관대', hanja: '冠帶', power: 4, gist: '옷을 갖춰 입는 자리',
    body: '어른의 옷을 입는 때입니다. 자기 주장이 서고 바깥일에 나서게 됩니다. 힘은 붙었는데 아직 다듬어지지 않아, 고집이 세다는 말을 듣기 쉽습니다.' },
  { name: '건록', hanja: '建祿', power: 5, gist: '제 발로 서는 자리',
    body: '일간이 스스로 앉는 자리입니다. 남에게 기대지 않고 제 힘으로 벌어들이는 기운이라 열둘 가운데 가장 실속 있다고 봅니다. 다만 혼자 다 하려다 주변을 놓치기 쉽습니다.' },
  { name: '제왕', hanja: '帝旺', power: 5, gist: '가장 높은 자리',
    body: '기운이 꼭대기에 오른 자리입니다. 결단이 빠르고 남을 이끄는 힘이 큽니다. 다만 꼭대기 다음은 내리막이라, 옛 책은 이 자리를 «넘치는 것을 경계하라»는 뜻으로 함께 읽었습니다.' },
  { name: '쇠', hanja: '衰', power: 3, gist: '한풀 꺾이는 자리',
    body: '기세가 한 번 꺾인 자리입니다. 나서기보다 지키는 데 맞고, 경험으로 판단하는 힘이 좋습니다. 새로 벌이는 일보다 하던 것을 다듬는 쪽이 낫습니다.' },
  { name: '병', hanja: '病', power: 2, gist: '앓아 눕는 자리',
    body: '몸과 마음이 약해지는 자리로 봅니다. 남의 아픔을 잘 알아 돌보는 일과 맞고, 정이 많습니다. 스스로를 돌보는 것을 뒤로 미루기 쉬운 것이 이 자리의 흠입니다.' },
  { name: '사', hanja: '死', power: 1, gist: '멈추어 생각하는 자리',
    body: '움직임이 멎는 자리입니다. 무섭게 들리지만 명리에서는 «바깥일이 줄고 안이 깊어진다»로 읽습니다. 연구·기술·글처럼 혼자 파고드는 일과 맞습니다.' },
  { name: '묘', hanja: '墓', power: 1, gist: '거두어 넣는 자리',
    body: '창고에 들이는 자리입니다. 모으고 간수하는 힘이 좋아 저축과 수집에 맞습니다. 반대로 내놓기를 아까워해 사람과 기회를 붙들고만 있기 쉽습니다.' },
  { name: '절', hanja: '絶', power: 1, gist: '끊어지는 자리',
    body: '포태(胞胎)의 «포»입니다. 앞의 것이 끊기고 아직 다음이 오지 않은 자리라 마음이 가장 흔들립니다. 다만 끊긴 자리에서 새로 시작하므로, 판을 갈아엎는 결정과는 오히려 맞습니다.' },
  { name: '태', hanja: '胎', power: 2, gist: '들어서는 자리',
    body: '새 기운이 배는 자리입니다. 아직 눈에 안 보이지만 안에서 자라고 있습니다. 계획을 세우고 준비하는 데 좋고, 서둘러 내보이면 흩어집니다.' },
  { name: '양', hanja: '養', power: 3, gist: '기르는 자리',
    body: '태어나기 전 길러지는 자리입니다. 남의 도움을 받는 복이 있다고 보아 윗사람·부모의 덕을 말합니다. 스스로 나서는 힘은 아직 약합니다.' },
] as const;

/** 일간별 장생지 — 여기서부터 열둘을 돈다 */
const BIRTH_BRANCH = [11, 6, 2, 9, 2, 9, 5, 0, 8, 3];

/** 양간은 순행, 음간은 역행 — 이 방향이 갑과 을을 갈라놓는다 */
const isYang = (stemIdx: number) => stemIdx % 2 === 0;

/** 일간이 그 지지에서 갖는 십이운성 */
export function unseongOf(stemIdx: number, branchIdx: number): Unseong {
  const start = BIRTH_BRANCH[stemIdx];
  const step = isYang(stemIdx)
    ? (branchIdx - start + 12) % 12
    : (start - branchIdx + 12) % 12;
  return UNSEONGS[step];
}

export type PillarName = '연주' | '월주' | '일주' | '시주';

export interface UnseongHit {
  pillar: PillarName;
  branchIdx: number;
  unseong: Unseong;
}

const PILLAR_NAMES: PillarName[] = ['연주', '월주', '일주', '시주'];

/** 명식 네 기둥의 십이운성 — 기준은 늘 일간이다 */
export function readUnseong(chart: Chart): UnseongHit[] {
  const pillars: (Pillar | null)[] = [chart.year, chart.month, chart.day, chart.hour];
  const stem = chart.day.stemIdx;
  const out: UnseongHit[] = [];
  pillars.forEach((p, i) => {
    if (!p) return;
    out.push({ pillar: PILLAR_NAMES[i], branchIdx: p.branchIdx, unseong: unseongOf(stem, p.branchIdx) });
  });
  return out;
}

/** 그 일간이 열두 지지에서 갖는 운성 전부 — 표로 낸다 */
export const unseongRow = (stemIdx: number) =>
  BRANCHES.map((_, b) => unseongOf(stemIdx, b));

/** 네 기둥의 세기를 더해 한 줄로 — 「전체적으로 강한 사주인가」 */
export function unseongPower(hits: UnseongHit[]): { total: number; max: number; label: string } {
  const total = hits.reduce((s, h) => s + h.unseong.power, 0);
  const max = hits.length * 5;
  const ratio = max ? total / max : 0;
  const label = ratio >= 0.8 ? '아주 강합니다'
    : ratio >= 0.6 ? '강한 편입니다'
    : ratio >= 0.4 ? '중간입니다'
    : ratio >= 0.25 ? '약한 편입니다'
    : '많이 약합니다';
  return { total, max, label };
}

export const stemName = (i: number) => STEMS[i].kor;
export const branchName = (i: number) => BRANCHES[i].kor;

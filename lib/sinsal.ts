import { BRANCHES, SAMHAP, samhapOf, type Chart, type Pillar } from './saju-data.ts';

/**
 * 십이신살(十二神殺) — 사주의 네 지지에 붙는 열두 가지 이름.
 *
 * ── 왜 필요한가 ────────────────────────────────────────────
 * 「도화살」·「역마살」·「화개살」은 사주를 모르는 사람도 아는 말이고 검색도
 * 크다. 그런데 정작 «내 사주에 그게 있는가»를 알려면 만세력을 뽑아 표를
 * 짚어야 했다. 명식은 이미 lib/saju-data.ts가 세우니, 그 위에 표 하나를
 * 얹으면 된다.
 *
 * ── 규칙 ───────────────────────────────────────────────────
 * 기준 지지가 속한 삼합 무리가 자리를 정한다. 무리의 세 자리가 각각 못이다.
 *
 *   생지(첫째) = 지살    왕지(둘째) = 장성살    묘지(셋째) = 화개살
 *
 * 이 셋을 고정하면 나머지 아홉은 순서대로 채워진다. 겁살부터 화개살까지
 * 열두 이름을 지지 열둘에 한 칸씩 돌려 놓는 것이다.
 *
 * 결과가 왜 믿을 만한지는 세상에 알려진 값 셋으로 확인된다 —
 * 도화살은 늘 자오묘유, 역마살은 늘 인신사해, 화개살은 늘 진술축미다.
 * tests/sinsal.test.ts가 그것을 잰다.
 *
 * ── 기준을 무엇으로 두나 ───────────────────────────────────
 * 옛 책은 년지를, 요즘은 일지를 기준으로 삼는 쪽이 많다. 어느 하나만 내면
 * 다른 쪽 표와 안 맞아 «틀렸다»는 말을 듣는다. 둘 다 낸다.
 */

export interface Sinsal {
  name: string;
  hanja: string;
  /** 흔히 같이 불리는 다른 이름 */
  alias?: string;
  /** 한 줄 요약 — 목록에서 읽는 말 */
  gist: string;
  /** 그 자리가 뜻하는 것 */
  body: string;
  /** 좋게만도 나쁘게만도 안 읽는다 — 대개 양면이 있다 */
  tone: 'good' | 'mixed' | 'caution';
}

/**
 * 겁살부터 화개살까지 — 이 차례가 곧 규칙이다.
 *
 * 넷째가 지살, 여덟째가 장성살, 열두째가 화개살이고 그 셋이 각각 삼합의
 * 생·왕·묘에 놓인다. 순서를 바꾸면 전부 어긋난다.
 */
export const SINSALS: readonly Sinsal[] = [
  {
    name: '겁살', hanja: '劫殺', tone: 'caution',
    gist: '빼앗기는 자리',
    body: '가진 것을 잃거나 남에게 넘어가기 쉬운 자리로 봅니다. 옛날에는 도둑과 재물 손실을 뜻했고, 지금은 «내 뜻과 무관하게 판이 바뀌는 일»로 읽습니다. 보증·동업·큰 대여처럼 남의 손에 결정권이 넘어가는 일을 특히 조심하라 했습니다.',
  },
  {
    name: '재살', hanja: '災殺', alias: '수옥살', tone: 'caution',
    gist: '갇히고 묶이는 자리',
    body: '수옥살(囚獄殺)이라고도 합니다. 다툼과 송사, 몸이 매이는 일을 뜻합니다. 다만 «묶인다»는 성질은 규율이 필요한 자리에서는 힘이 되기도 해서, 법·의료·군경처럼 규칙이 센 분야와는 오히려 맞는다고 봅니다.',
  },
  {
    name: '천살', hanja: '天殺', tone: 'caution',
    gist: '사람 힘 밖의 자리',
    body: '가뭄이나 홍수처럼 사람이 어찌할 수 없는 일을 뜻했습니다. 내 탓이 아닌 데서 일이 어긋나는 자리라, 되지 않는 것을 붙들고 힘을 쓰기보다 물러설 때를 아는 것이 낫다고 봅니다.',
  },
  {
    name: '지살', hanja: '地殺', tone: 'mixed',
    gist: '움직이고 나서는 자리',
    body: '삼합의 첫 자리(생지)에 놓입니다. 밖으로 나가고 새로 시작하는 기운으로, 역마살의 작은 형태로 봅니다. 이사·유학·출장처럼 자리를 옮기는 일이 잦고, 스스로 나서서 알리는 일과 잘 맞습니다.',
  },
  {
    name: '년살', hanja: '年殺', alias: '도화살', tone: 'mixed',
    gist: '끌리고 눈에 띄는 자리',
    body: '흔히 말하는 **도화살**입니다. 늘 자·오·묘·유 넷 가운데 놓입니다. 예로부터 «이성이 따른다»고 했지만, 본디 뜻은 사람 눈을 끄는 매력입니다. 남 앞에 서는 일 — 연예·영업·강의·창작 — 에서는 재산에 가깝게 봅니다. 관계가 여럿으로 흩어지지 않게 하는 것이 관건입니다.',
  },
  {
    name: '월살', hanja: '月殺', alias: '고초살', tone: 'caution',
    gist: '메마르고 더딘 자리',
    body: '고초살(枯焦殺)이라고도 합니다. 씨를 뿌려도 싹이 더디 트는 자리로, 애쓴 만큼 바로 돌아오지 않는 때를 뜻합니다. 성과가 늦게 오는 일을 붙들고 있을 때 특히 지치기 쉬우니, 기간을 길게 잡으라는 뜻으로 읽습니다.',
  },
  {
    name: '망신살', hanja: '亡身殺', tone: 'caution',
    gist: '드러나는 자리',
    body: '감추고 싶은 것이 드러나는 자리입니다. 다만 «드러난다»는 것은 숨길 게 없는 사람에게는 손해가 아니어서, 옛 책도 이 자리를 가진 사람이 솔직하고 정이 많다고 적었습니다. 말이 앞서 구설에 오르는 것만 조심하면 됩니다.',
  },
  {
    name: '장성살', hanja: '將星殺', tone: 'good',
    gist: '앞장서는 자리',
    body: '삼합의 가운데 자리(왕지)로, 열둘 가운데 기운이 가장 셉니다. 이름 그대로 장수의 별이라 우두머리 노릇과 결단에 어울립니다. 다만 세다 보니 남의 말을 안 듣기 쉬워, 곁에 다른 소리를 낼 사람을 두라 했습니다.',
  },
  {
    name: '반안살', hanja: '攀鞍殺', tone: 'good',
    gist: '올라타는 자리',
    body: '안장에 오른다는 뜻입니다. 열둘 가운데 가장 순한 자리로, 윗사람의 도움과 승진·자리 얻음을 뜻합니다. 스스로 밀어붙이기보다 끌어 주는 사람을 만나 오르는 결이라, 사람을 챙기는 일이 곧 실속입니다.',
  },
  {
    name: '역마살', hanja: '驛馬殺', tone: 'mixed',
    gist: '멀리 오가는 자리',
    body: '늘 인·신·사·해 넷 가운데 놓입니다. 한자리에 오래 못 있는 기운으로, 옛날에는 떠도는 팔자라 하여 나쁘게 봤습니다. 지금은 이동이 곧 기회인 시대라 무역·항공·영업·해외 일에서는 오히려 유리하다고 봅니다. 자리를 자주 옮기는 것 자체를 문제로 보지 않아도 됩니다.',
  },
  {
    name: '육해살', hanja: '六害殺', tone: 'caution',
    gist: '거스르는 자리',
    body: '일이 매끄럽게 안 풀리고 사람과 어긋나기 쉬운 자리로 봅니다. 몸이 약해지거나 하던 일이 자꾸 걸리는 때를 뜻합니다. 크게 터지는 것보다 잔걸림이 이어지는 성질이라, 무리해서 속도를 내지 않는 편이 낫다고 했습니다.',
  },
  {
    name: '화개살', hanja: '華蓋殺', tone: 'mixed',
    gist: '거두어 안으로 드는 자리',
    body: '늘 진·술·축·미 넷 가운데 놓입니다. 화려한 것을 덮는다는 뜻으로, 밖으로 뻗던 기운이 안으로 접히는 자리입니다. 예술·학문·종교처럼 혼자 파고드는 일과 잘 맞는다고 보아 «예술가의 살»이라 부릅니다. 사람들 속에서 외로움을 느끼기 쉬운 것이 다른 면입니다.',
  },
] as const;

/** 이름으로 찾기 — 도화살·수옥살 같은 별칭도 받는다 */
export const findSinsal = (name: string) =>
  SINSALS.find(s => s.name === name || s.alias === name);

/**
 * 기준 지지에서 볼 때 대상 지지가 무슨 신살인가.
 *
 * 생지가 지살(네 번째)이므로, 겁살은 생지에서 셋 뒤로 물린 자리다.
 */
export function sinsalOf(baseBranch: number, targetBranch: number): Sinsal {
  const birth = samhapOf(baseBranch)[0];
  const geopsal = (birth - 3 + 12) % 12;
  return SINSALS[(targetBranch - geopsal + 12) % 12];
}

export type PillarName = '연주' | '월주' | '일주' | '시주';

export interface SinsalHit {
  pillar: PillarName;
  branchIdx: number;
  sinsal: Sinsal;
}

/** 기준을 년지로 볼 때와 일지로 볼 때 — 책마다 달라 둘 다 낸다 */
export interface SinsalReading {
  base: '연지' | '일지';
  baseBranch: number;
  hits: SinsalHit[];
}

const PILLAR_NAMES: PillarName[] = ['연주', '월주', '일주', '시주'];

export function readSinsal(chart: Chart, base: '연지' | '일지'): SinsalReading {
  const pillars: (Pillar | null)[] = [chart.year, chart.month, chart.day, chart.hour];
  const baseBranch = (base === '연지' ? chart.year : chart.day).branchIdx;
  const hits: SinsalHit[] = [];
  pillars.forEach((p, i) => {
    if (!p) return;   /* 시를 모르면 시주가 없다 */
    hits.push({ pillar: PILLAR_NAMES[i], branchIdx: p.branchIdx, sinsal: sinsalOf(baseBranch, p.branchIdx) });
  });
  return { base, baseBranch, hits };
}

/**
 * 그 신살이 놓일 수 있는 지지 넷 — 네 삼합 무리가 각각 하나씩 준다.
 *
 * 도화살이 «늘 자오묘유»인 것이 이 함수로 나온다. 설명에 쓰고, 검사가
 * 알려진 값과 맞대 보는 자리이기도 하다.
 */
export function branchesFor(sinsalName: string): number[] {
  const idx = SINSALS.findIndex(s => s.name === sinsalName);
  if (idx < 0) return [];
  return SAMHAP.map(g => ((g[0] - 3 + 12) % 12 + idx) % 12).sort((a, b) => a - b);
}

/** 지지 이름 — 화면에서 쓴다 */
export const branchName = (idx: number) => BRANCHES[idx].kor;

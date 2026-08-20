import {
  BRANCHES, ILJU_READINGS, STEMS, buildChart,
  type Birth, type Element,
} from './saju-data.ts';
import { unseongOf } from './unseong.ts';

/**
 * 일주(日柱) 60가지 — 「갑자일주」·「병오일주」는 하나하나가 검색어다.
 *
 * ── 왜 이제야 내는가 ───────────────────────────────────────
 * **해석 글 60편이 이미 lib/saju-data.ts에 있었다**(ILJU_READINGS). 사주 통합
 * 화면 안에서 자기 일주 하나만 보여 주는 데 쓰이고 있었고, 나머지 쉰아홉은
 * 아무도 닿을 수 없었다. 주소를 내주기만 하면 되는 자리였다.
 *
 * ── 낱장에 무엇을 더 얹는가 ────────────────────────────────
 * 해석 글만 있으면 다른 사이트와 다를 게 없다. 이미 있는 계산으로 붙일 수
 * 있는 것을 얹는다 — 일간의 오행·성격, 일지의 동물·계절, 그 짝의 십이운성,
 * 그리고 공망. 전부 데이터에서 나오므로 예순 장이 저절로 서로 다르다.
 */

/**
 * 주소에 쓰는 로마자.
 *
 * 이 저장소는 한자 성어를 sipbeoljimok처럼 로마자로 적는다 — 그 관례를 따른다.
 * 신(辛)과 신(申)이 둘 다 sin이지만 천간·지지 자리가 정해져 있어 붙여 쓰면
 * 겹치지 않는다(신사 sinsa / 병신 byeongsin).
 */
const STEM_ROMAN = ['gap', 'eul', 'byeong', 'jeong', 'mu', 'gi', 'gyeong', 'sin', 'im', 'gye'];
const BRANCH_ROMAN = ['ja', 'chuk', 'in', 'myo', 'jin', 'sa', 'o', 'mi', 'sin', 'yu', 'sul', 'hae'];

/** 육십갑자 — 천간·지지의 짝수 홀수가 맞는 60가지뿐이다 */
export const GAPJA: readonly { key: string; slug: string; stemIdx: number; branchIdx: number }[] =
  Array.from({ length: 60 }, (_, i) => {
    const stemIdx = i % 10;
    const branchIdx = i % 12;
    return {
      key: STEMS[stemIdx].kor + BRANCHES[branchIdx].kor,
      slug: STEM_ROMAN[stemIdx] + BRANCH_ROMAN[branchIdx],
      stemIdx, branchIdx,
    };
  });

export const ILJU_BY_SLUG = new Map(GAPJA.map(g => [g.slug, g]));

export const ILJU_MAP = new Map(GAPJA.map(g => [g.key, g]));

/**
 * 공망(空亡) — 그 순(旬)에서 천간이 모자라 비는 지지 둘.
 *
 * 육십갑자를 열 개씩 여섯 순으로 끊으면, 지지는 열둘이라 순마다 두 개가 남는다.
 * 그 둘이 공망이다. 「있어도 없는 것처럼 본다」는 자리라 사주에서 자주 짚는다.
 */
export function gongmang(stemIdx: number, branchIdx: number): [number, number] {
  /* 그 간지가 육십갑자에서 몇 번째인지 → 순의 첫 자리를 찾는다 */
  const i = GAPJA.findIndex(g => g.stemIdx === stemIdx && g.branchIdx === branchIdx);
  const headBranch = GAPJA[Math.floor(i / 10) * 10].branchIdx;
  return [(headBranch + 10) % 12, (headBranch + 11) % 12];
}

export interface IljuInfo {
  key: string;
  slug: string;
  stemIdx: number;
  branchIdx: number;
  hanja: string;
  /** 일간 */
  stem: (typeof STEMS)[number];
  /** 일지 */
  branch: (typeof BRANCHES)[number];
  reading: string;
  /** 일간이 그 일지에서 갖는 십이운성 */
  unseong: string;
  unseongPower: number;
  /** 일간과 일지의 오행 관계 */
  relation: string;
  gongmang: [string, string];
}

/** 오행 상생·상극 — 일간과 일지가 서로 돕는지 치는지 */
const SAENG: Record<Element, Element> = { 목: '화', 화: '토', 토: '금', 금: '수', 수: '목' };
const GEUK: Record<Element, Element> = { 목: '토', 토: '수', 수: '화', 화: '금', 금: '목' };

function relationOf(a: Element, b: Element): string {
  if (a === b) return `일간과 일지가 같은 ${a} 기운입니다 — 뜻이 한 방향이라 밀고 나가는 힘이 세지만, 부족한 것도 같습니다.`;
  if (SAENG[b] === a) return `일지 ${b}이 일간 ${a}을 낳아 주는 자리입니다 — 앉은 자리에서 기운을 받는 구조라 뒷심이 있습니다.`;
  if (SAENG[a] === b) return `일간 ${a}이 일지 ${b}을 낳는 자리입니다 — 내가 내주는 쪽이라 표현과 베풂이 많고, 그만큼 소모도 큽니다.`;
  if (GEUK[a] === b) return `일간 ${a}이 일지 ${b}을 치는 자리입니다 — 앉은 자리를 다스리는 구조라 주도권을 쥐지만 쉬어 갈 자리가 적습니다.`;
  if (GEUK[b] === a) return `일지 ${b}이 일간 ${a}을 치는 자리입니다 — 앉은 자리가 나를 누르는 구조라 긴장이 있고, 그 긴장이 날카로움으로 나옵니다.`;
  return `일간 ${a}과 일지 ${b}은 돕지도 치지도 않는 사이입니다.`;
}

export function iljuInfo(key: string): IljuInfo | null {
  const g = ILJU_MAP.get(key);
  if (!g) return null;
  const stem = STEMS[g.stemIdx];
  const branch = BRANCHES[g.branchIdx];
  const u = unseongOf(g.stemIdx, g.branchIdx);
  const [a, b] = gongmang(g.stemIdx, g.branchIdx);
  return {
    key,
    slug: g.slug,
    stemIdx: g.stemIdx,
    branchIdx: g.branchIdx,
    hanja: stem.hanja + branch.hanja,
    stem,
    branch,
    reading: ILJU_READINGS[key] ?? '',
    unseong: u.name,
    unseongPower: u.power,
    relation: relationOf(stem.element, branch.element),
    gongmang: [BRANCHES[a].kor, BRANCHES[b].kor],
  };
}

/** 생년월일시 → 그 사람의 일주 열쇠 */
export function iljuOfBirth(b: Birth): string {
  const c = buildChart(b, 'male');
  return STEMS[c.day.stemIdx].kor + BRANCHES[c.day.branchIdx].kor;
}

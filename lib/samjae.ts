/**
 * 삼재(三災) — 열두 해마다 세 해씩 돌아온다는 액운의 주기.
 *
 * ── 왜 필요한가 ────────────────────────────────────────────
 * 운세 갈래에서 연초마다 크게 검색되는 말인데 없었다. 「2026 삼재 띠」처럼
 * 해가 바뀔 때마다 새로 찾는 종류라, 한 번 만들어 두면 해마다 다시 온다.
 *
 * ── 규칙 ───────────────────────────────────────────────────
 * 삼재는 띠 하나가 아니라 **삼합 무리 셋이 함께** 든다. 무리의 마지막 자리
 * (묘고·墓庫)에서 끝나는 연속한 세 해가 그 무리의 삼재다.
 *
 *   신자진생(원숭이·쥐·용)  →  인묘진년
 *   인오술생(범·말·개)      →  신유술년
 *   해묘미생(돼지·토끼·양)  →  사오미년
 *   사유축생(뱀·닭·소)      →  해자축년
 *
 * 네 무리의 삼재 구간이 열두 지지를 빈틈없이 나눠 갖는다. 그래서 **어느 해든
 * 삼재인 띠가 정확히 셋**이고, 열두 해 가운데 세 해가 자기 차례다.
 *
 * 세 해는 각각 이름이 다르다 — 들삼재(入)·눌삼재(臥)·날삼재(出). 드는 해가
 * 가장 세고 나가는 해가 가장 약하다고 본다.
 *
 * ── 눈으로 확인이 안 되는 종류다 ───────────────────────────
 * 화면에 「2026년은 눌삼재입니다」라고 떠 있어도 그게 맞는지 사람은 모른다.
 * 규칙은 tests/samjae.test.ts가 붙든다.
 */

import { SAMHAP, samhapOf } from './saju-data.ts';

/**
 * 판정 색 — 삼재인가 아닌가 두 가지뿐이다.
 *
 * 결과판 바탕이 라이트=흰색·다크=slate-900이라 한 벌로 양쪽을 다 넘겨야 한다.
 * tests/samjae.test.ts가 잰다 — 사주 궁합에서 다크만 보고 라이트를 안 봐서
 * 미달인 색을 낸 적이 있다.
 */
export const SAMJAE_COLORS = {
  /** 삼재 중 */
  in: '#b45309',
  /** 삼재 아님 */
  clear: '#0d9488',
} as const;

export type SamjaePhase = '들삼재' | '눌삼재' | '날삼재';

export const PHASES: readonly SamjaePhase[] = ['들삼재', '눌삼재', '날삼재'];

/** 해의 지지 — 2020년이 자(0)다 */
export const branchOfYear = (year: number): number => (((year - 4) % 12) + 12) % 12;

/** 그 지지의 해 가운데 atMost 이하에서 가장 늦은 해 */
function latestYearOf(branchIdx: number, atMost: number): number {
  return atMost - ((((atMost - (branchIdx + 4)) % 12) + 12) % 12);
}

/** 그 띠의 삼재 세 해의 지지 — 묘고에서 끝나는 연속 셋 */
export function samjaeBranches(branchIdx: number): [number, number, number] {
  const tomb = samhapOf(branchIdx)[2];
  return [(tomb + 10) % 12, (tomb + 11) % 12, tomb];
}

export interface SamjaeYear {
  year: number;
  branchIdx: number;
  phase: SamjaePhase;
  /** 그 해의 지지가 본인 띠와 같은가 — 묘고 띠는 날삼재가 늘 자기 띠 해다 */
  ownAnimal: boolean;
}

export interface SamjaeResult {
  animalIdx: number;
  /** 지금 지나는(또는 앞으로 올) 삼재 세 해 */
  block: [SamjaeYear, SamjaeYear, SamjaeYear];
  /** 올해가 그 안에 있으면 그 해, 아니면 null */
  current: SamjaeYear | null;
  /** 삼재가 아니면 몇 해 뒤에 드는가 */
  yearsUntil: number;
}

/**
 * 한 띠의 삼재를 그 해 기준으로 푼다.
 *
 * 올해가 삼재 안이면 그 세 해를, 아니면 다음에 올 세 해를 낸다 — 「지금
 * 아니다」로 끝내면 사람이 알고 싶은 것(그럼 언제)에 답을 안 한 셈이다.
 */
export function samjaeFor(animalIdx: number, thisYear: number): SamjaeResult {
  const branches = samjaeBranches(animalIdx);
  const enter = latestYearOf(branches[0], thisYear);
  /* enter는 늘 올해 이하다. 올해가 enter+2를 넘었으면 이번 바퀴는 지나갔다 */
  const start = thisYear <= enter + 2 ? enter : enter + 12;

  const block = [0, 1, 2].map(i => ({
    year: start + i,
    branchIdx: branches[i],
    phase: PHASES[i],
    ownAnimal: branches[i] === animalIdx,
  })) as [SamjaeYear, SamjaeYear, SamjaeYear];

  return {
    animalIdx,
    block,
    current: block.find(b => b.year === thisYear) ?? null,
    yearsUntil: Math.max(0, start - thisYear),
  };
}

/** 그 해에 삼재가 드는 띠 셋 — 어느 해든 정확히 셋이다 */
export function animalsInSamjae(year: number): { animalIdx: number; phase: SamjaePhase }[] {
  const b = branchOfYear(year);
  const group = SAMHAP.find(g => samjaeBranches(g[0]).includes(b))!;
  const phase = PHASES[samjaeBranches(group[0]).indexOf(b)];
  return group.map(animalIdx => ({ animalIdx, phase }));
}

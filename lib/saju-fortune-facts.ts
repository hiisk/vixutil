import { STEMS, BRANCHES, getSipseong } from './saju-data.ts';
import type { Pillar, Element } from './saju-data.ts';

/**
 * 사주 영역별 운세의 계산 부분만 떼어낸 곳.
 *
 * 원래 lib/saju-fortune.ts 안에 계산과 한국어 문장이 함께 있었는데, 영어·중국어를
 * 붙이면서 계산을 두 번 쓰게 되면 언어에 따라 점수가 갈리는 사고가 난다.
 * 그래서 여기에 한 벌만 두고 한국어·영어·중국어가 모두 이걸 읽는다.
 *
 * 점수 식은 옮기기 전과 한 글자도 다르지 않다 — tests/saju-fortune-intl.test.ts가
 * 세 언어의 점수가 같은지 확인한다.
 */
export type SipCats = { 비겁: number; 식상: number; 재성: number; 관성: number; 인성: number };
export type Score = 1 | 2 | 3 | 4 | 5;

const SS_CAT: Record<string, keyof SipCats> = {
  비견: '비겁', 겁재: '비겁', 식신: '식상', 상관: '식상',
  편재: '재성', 정재: '재성', 편관: '관성', 정관: '관성',
  편인: '인성', 정인: '인성',
};

/** 도화살 지지: 子(0)卯(3)午(6)酉(9) */
const PEACH = new Set([0, 3, 6, 9]);
/** 역마살 지지: 寅(2)申(8)巳(5)亥(11) */
const YONGMA = new Set([2, 8, 5, 11]);

function countSip(ilganIdx: number, pillars: (Pillar | null)[]): SipCats {
  const c: SipCats = { 비겁: 0, 식상: 0, 재성: 0, 관성: 0, 인성: 0 };
  for (const p of pillars) {
    if (!p) continue;
    const cat = SS_CAT[getSipseong(ilganIdx, p.stemIdx)];
    if (cat) c[cat]++;
  }
  return c;
}

export function clamp(n: number): Score {
  return Math.min(5, Math.max(1, Math.round(n))) as Score;
}

export interface SajuFacts {
  gender: 'male' | 'female';
  singang: boolean;
  /** 십성 다섯 갈래 개수 (일주 제외) */
  sc: SipCats;
  /** 연·월·시주의 십성 이름 — 시주가 없으면 빈 문자열이 들어간다 */
  allSS: string[];
  hasPeach: boolean;
  hasYongma: boolean;
  missingEls: Element[];
  dominantEl: Element | undefined;
  /** 여성은 관성, 남성은 재성 개수 */
  partnerCat: number;
  /** 배우자 별 — 정관/편관 또는 정재/편재 */
  partnerStar: string | null;
  hasStablePartner: boolean;
  hasJeongin: boolean;
  hasPyeongin: boolean;
  lateMarriage: boolean;
  dayStemKor: string;
  dayStemElement: Element;
  dayBranchKor: string;
  scores: {
    love: Score; marriage: Score; career: Score; wealth: Score; study: Score;
    health: Score; social: Score; business: Score; change: Score; future: Score;
  };
}

/**
 * 사주 네 기둥에서 영역별 판단에 쓰이는 사실과 점수를 뽑는다.
 *
 * 문장은 하나도 만들지 않는다 — 여기서 나온 사실을 언어별 문구 표가 읽어 간다.
 */
export function sajuFacts(
  dayPillar: Pillar,
  yearPillar: Pillar,
  monthPillar: Pillar,
  hourPillar: Pillar | null,
  gender: 'male' | 'female',
  singang: boolean,
  ohaengCounts: Record<string, number>,
): SajuFacts {
  const ilg = dayPillar.stemIdx;
  const dayStem = STEMS[ilg];
  const dayBranch = BRANCHES[dayPillar.branchIdx];
  const allPillars = [yearPillar, monthPillar, dayPillar, hourPillar];
  const others = [yearPillar, monthPillar, hourPillar];
  const sc = countSip(ilg, others);

  const ySS = getSipseong(ilg, yearPillar.stemIdx);
  const mSS = getSipseong(ilg, monthPillar.stemIdx);
  const hSS = hourPillar ? getSipseong(ilg, hourPillar.stemIdx) : '';
  const allSS = [ySS, mSS, hSS];

  const hasPeach = allPillars.some(p => p && PEACH.has(p.branchIdx));
  const hasYongma = allPillars.some(p => p && YONGMA.has(p.branchIdx));
  const missingEls = (['목', '화', '토', '금', '수'] as Element[]).filter(e => !ohaengCounts[e]);
  const dominantEl = (Object.entries(ohaengCounts) as [Element, number][]).sort((a, b) => b[1] - a[1])[0]?.[0];

  const partnerCat = gender === 'female' ? sc.관성 : sc.재성;
  const partnerStar = gender === 'female'
    ? (allSS.includes('정관') ? '정관' : allSS.includes('편관') ? '편관' : null)
    : (allSS.includes('정재') ? '정재' : allSS.includes('편재') ? '편재' : null);

  const hasStablePartner = gender === 'female' ? allSS.includes('정관') : allSS.includes('정재');
  const hasJeongin = allSS.includes('정인');
  const hasPyeongin = allSS.includes('편인');
  const lateMarriage = partnerCat === 0 || (singang && sc.비겁 >= 2);

  return {
    gender, singang, sc, allSS, hasPeach, hasYongma, missingEls, dominantEl,
    partnerCat, partnerStar, hasStablePartner, hasJeongin, hasPyeongin, lateMarriage,
    dayStemKor: dayStem.kor,
    dayStemElement: dayStem.element,
    dayBranchKor: dayBranch.kor,
    scores: {
      love: clamp(3
        + (partnerCat >= 2 ? 1 : partnerCat === 0 ? -1 : 0)
        + (hasPeach ? 1 : 0)
        + (singang && partnerCat === 0 ? -1 : 0)),
      marriage: clamp(3
        + (hasStablePartner ? 1 : 0)
        + (partnerCat === 0 ? -1 : 0)
        + (sc.비겁 >= 3 ? -1 : 0)),
      career: clamp(3
        + (sc.관성 >= 2 ? 1 : 0)
        + (sc.식상 >= 2 && sc.관성 === 0 ? 1 : 0)
        + (singang && sc.비겁 >= 2 ? 1 : 0)
        + (!singang && sc.비겁 >= 3 ? -1 : 0)),
      wealth: clamp(3
        + (sc.재성 >= 2 ? 1 : sc.재성 === 0 ? -1 : 0)
        + (sc.식상 >= 1 && sc.재성 >= 1 ? 1 : 0)
        + (sc.비겁 >= 3 ? -1 : 0)
        + (missingEls.includes('금') ? -1 : 0)),
      study: clamp(3
        + (sc.인성 >= 2 ? 1 : 0)
        + (hasJeongin ? 1 : 0)
        + (sc.비겁 >= 3 && sc.인성 === 0 ? -1 : 0)
        + (singang && sc.인성 >= 1 ? 1 : 0)),
      health: clamp((singang ? 4 : 3)
        - (missingEls.length >= 2 ? 1 : 0)
        + (missingEls.length === 0 ? 1 : 0)),
      social: clamp(3
        + (sc.식상 >= 2 ? 1 : 0)
        + (sc.인성 >= 2 ? 1 : 0)
        + (hasPeach ? 1 : 0)
        + (sc.비겁 >= 3 ? -1 : 0)),
      business: clamp(3
        + (singang && sc.재성 >= 1 ? 1 : 0)
        + (sc.식상 >= 1 && sc.재성 >= 1 ? 1 : 0)
        + (!singang && sc.관성 >= 2 ? -1 : 0)
        + (sc.비겁 >= 3 && sc.재성 === 0 ? -1 : 0)),
      change: clamp(3
        + (hasYongma ? 1 : 0)
        + (singang ? 1 : 0)
        + (sc.비겁 >= 2 ? 1 : 0)
        + (sc.관성 >= 3 ? -1 : 0)),
      future: clamp((singang ? 4 : 3)
        + (sc.관성 >= 1 ? 0 : sc.재성 >= 1 ? 0 : sc.식상 >= 1 ? 0 : -1)
        - (missingEls.length >= 3 ? 1 : 0)),
    },
  };
}

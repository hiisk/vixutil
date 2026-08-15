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

/*
 * 도화살(桃花殺)·역마살(驛馬殺)은 삼합(三合)으로 정해진다.
 *
 * 기준 지지가 속한 삼합국의 첫 글자 바로 다음 지지가 도화, 그 첫 글자를 충(沖)하는
 * 지지가 역마다. 기준은 년지 또는 일지로 잡고 나머지 지지에서 찾는다.
 *   申子辰 → 도화 酉·역마 寅 / 寅午戌 → 卯·申 / 巳酉丑 → 午·亥 / 亥卯未 → 子·巳
 * 삼합국은 지지 번호를 4로 나눈 나머지로 갈린다(申8·子0·辰4는 모두 나머지 0).
 *
 * 전에는 "네 기둥에 子卯午酉가 하나라도 있으면 도화"로 봤다. 그러면 사주 열에
 * 여덟이 도화가 되어(1-(8/12)^4 = 80%) 판정이 없는 것과 마찬가지였다.
 */
/** 지지%4 → 도화 지지 */
const PEACH_OF = [9, 6, 3, 0];
/** 지지%4 → 역마 지지 */
const YONGMA_OF = [2, 11, 8, 5];

/*
 * 문창귀인(文昌貴人) — 일간마다 정해진 지지 하나. 학문·시험·문서의 길신이라
 * 학업 주제에서만 쓴다.
 *   甲-巳 乙-午 丙-申 丁-酉 戊-申 己-酉 庚-亥 辛-子 壬-寅 癸-卯
 *
 * 戊는 자료가 갈린다 — 巳로 두는 곳도 있고 申으로 두는 곳도 있다(火土동궁을
 * 인정하느냐의 차이). 조견표를 그대로 싣는 쪽이 다수라 申을 골랐다.
 *   근거: sajustudy.com/93(신살론), dk-saju.com/sinsal/문창귀인
 */
const MUNCHANG_OF = [5, 6, 8, 9, 8, 9, 11, 0, 2, 3];

/** 기준 자리(baseIdx)의 삼합으로 정해지는 살이 다른 자리에 있는가 */
function hasStar(table: number[], branches: (number | null)[], baseIdx: number): boolean {
  const base = branches[baseIdx];
  if (base == null) return false;
  const want = table[base % 4];
  return branches.some((b, i) => i !== baseIdx && b === want);
}

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
  /** 문창귀인(文昌貴人) — 일간이 정하는 지지가 사주에 있는가 */
  hasMunchang: boolean;
  /** 관인상생(官印相生) — 정관과 정인이 함께 있는 승진의 전형 구조 */
  gwanInSangsaeng: boolean;
  /** 상관견관(傷官見官) — 상관이 정관을 쳐서 직장·명예가 흔들리는 구조 */
  sanggwanGyeonGwan: boolean;
  /** 식상생재(食傷生財) — 재능이 재물로 이어지는 구조 */
  siksangSaengJae: boolean;
  dayStemKor: string;
  dayStemElement: Element;
  dayBranchKor: string;
  scores: {
    love: Score; marriage: Score; career: Score; wealth: Score; study: Score;
    health: Score; social: Score; business: Score; change: Score; future: Score;
    promotion: Score;
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

  // 년지 기준과 일지 기준 둘 다 본다 — 전통은 년지, 현대 실무는 일지를 함께 쓴다
  const bl = allPillars.map(p => p ? p.branchIdx : null);
  const hasPeach = hasStar(PEACH_OF, bl, 0) || hasStar(PEACH_OF, bl, 2);
  const hasYongma = hasStar(YONGMA_OF, bl, 0) || hasStar(YONGMA_OF, bl, 2);
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

  // 문창귀인은 일간이 정한 지지가 네 기둥 어디에든 있으면 성립한다
  const hasMunchang = bl.includes(MUNCHANG_OF[ilg]);
  // 관인상생·상관견관은 천간 십성으로 본다 — 이 파일의 다른 판정과 기준을 맞춘다
  const gwanInSangsaeng = allSS.includes('정관') && allSS.includes('정인');
  const sanggwanGyeonGwan = allSS.includes('상관') && allSS.includes('정관');
  const siksangSaengJae = sc.식상 >= 1 && sc.재성 >= 1;

  return {
    gender, singang, sc, allSS, hasPeach, hasYongma, missingEls, dominantEl,
    partnerCat, partnerStar, hasStablePartner, hasJeongin, hasPyeongin, lateMarriage,
    hasMunchang, gwanInSangsaeng, sanggwanGyeonGwan, siksangSaengJae,
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
      /*
       * 승진운 — 취업(career)·이직(change)과 보는 곳이 다르다.
       *  · 정관(正官)은 조직 안의 직급과 규범이라 승진의 첫 근거다.
       *  · 관인상생(官印相生)은 정관이 정인을 낳는 구조로, 발령·임명처럼
       *    조직이 자리를 내주는 승진의 전형으로 친다.
       *  · 상관견관(傷官見官)은 상관이 정관을 쳐서 직장·명예가 흔들린다
       *    — 淵海子平·命理正宗의 "傷官見官 爲禍百端".
       *  · 관성이 아예 없으면 조직의 사다리와 인연이 옅다.
       */
      promotion: clamp(3
        + (allSS.includes('정관') ? 1 : 0)
        + (gwanInSangsaeng ? 1 : 0)
        + (sanggwanGyeonGwan ? -1 : 0)
        + (sc.관성 === 0 ? -1 : 0)),
      future: clamp((singang ? 4 : 3)
        + (sc.관성 >= 1 ? 0 : sc.재성 >= 1 ? 0 : sc.식상 >= 1 ? 0 : -1)
        - (missingEls.length >= 3 ? 1 : 0)),
    },
  };
}

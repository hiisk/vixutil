import type { Metadata } from 'next';
import type { Element, Pillar } from './saju-data.ts';
import { BRANCHES, STEMS } from './saju-data.ts';
import type { SajuFacts } from './saju-fortune-facts.ts';
import { alternateLanguages10, localeHref, openGraphFor, type AnyLocale10 } from './locales.ts';
import { withCard } from './og-cards/index.ts';
import { TOPIC_L10N } from './saju-topics-l10n/index.ts';

/**
 * 사주 주제별 낱장 — /fortune/saju/<주제>.
 *
 * ── 왜 갈랐나 ────────────────────────────────────────────
 * 통합 페이지 한 장이 열 영역을 다 이고 있었다. "사주 연애운"·"이직 시기 사주"처럼
 * 사람이 실제로 치는 말은 주제마다 다른데, 주소가 하나면 그 말들이 한 장으로만
 * 몰린다. 주제마다 주소를 하나씩 준다.
 *
 * ── 얇아지지 않게 하는 것 ────────────────────────────────
 * 주제 낱장이 통합 페이지의 한 문단을 떼어낸 것이면 낼 이유가 없다. 그래서 주제마다
 * **명리에서 실제로 보는 자리가 다르다**는 것을 evidence 줄로 드러낸다. 연애는
 * 배우자궁(일지)과 도화를 보고, 승진은 관인상생을 보고, 학업은 문창귀인을 본다 —
 * 같은 사주라도 주제마다 짚는 글자가 다르다.
 *
 * 계산은 여기서 하지 않는다. lib/saju-fortune-facts.ts가 낸 사실을 고르기만 한다.
 */

export const TOPIC_SLUGS = ['love', 'job', 'career', 'promotion', 'money', 'health', 'study'] as const;
export type TopicSlug = (typeof TOPIC_SLUGS)[number];

export function isTopicSlug(s: string): s is TopicSlug {
  return (TOPIC_SLUGS as readonly string[]).includes(s);
}

/**
 * 주제 → 영역 운세 id.
 *
 * 열 영역 가운데 여섯은 이미 있던 것을 쓴다. 승진(promotion)만 이번에 새로 냈다 —
 * 취업(career)·이직(change)과 보는 곳이 달라서 점수를 나눠 쓸 수 없었다.
 * 주소 이름은 열 언어가 함께 쓰므로 영문이다: job=취업, career=이직.
 */
export const TOPIC_DOMAIN: Record<TopicSlug, string> = {
  love: 'love',
  job: 'career',
  career: 'change',
  promotion: 'promotion',
  money: 'wealth',
  health: 'health',
  study: 'study',
};

/** 영역 → 주제. 통합 페이지가 그 영역에서 주제 낱장으로 내려보낼 때 쓴다. */
export const TOPIC_OF_DOMAIN: Record<string, TopicSlug> = Object.fromEntries(
  (Object.entries(TOPIC_DOMAIN) as [TopicSlug, string][]).map(([t, d]) => [d, t]),
);

export const TOPIC_EMOJI: Record<TopicSlug, string> = {
  love: '💕', job: '💼', career: '🔄', promotion: '🏅',
  money: '💰', health: '🏥', study: '📚',
};

/** 화면 색 — 통합 페이지의 영역 색과 맞춘다 */
export const TOPIC_COLOR: Record<TopicSlug, string> = {
  love: 'rose', job: 'blue', career: 'orange', promotion: 'teal',
  money: 'amber', health: 'green', study: 'indigo',
};

/**
 * 주제를 옮겨 다닐 때 들고 가는 값.
 *
 * 주제를 바꿀 때마다 생년월일시를 다시 넣게 하면 아무도 안 쓴다. 낱장이 이미
 * ?y=&m=&d=&h=&g=를 주소에 싣고 있으므로(SajuTopicPage의 replaceState) 전환
 * 링크에 그대로 붙여 보낸다 — 받는 쪽은 마운트 때 그 주소를 읽어 바로 푼다.
 *
 * **이름은 여기 없다.** 개인정보이고, 주소에 넣으면 캐시가 이름마다 갈린다.
 * 이름은 sessionStorage로 넘긴다 — 탭 안에서만 살고 서버로는 안 간다.
 */
export function topicQuery(v: {
  year: string; month: string; day: string; hour?: string; gender: string;
}): string {
  if (!v.year || !v.month || !v.day) return '';
  return '?' + new URLSearchParams({
    y: v.year, m: v.month, d: v.day, ...(v.hour ? { h: v.hour } : {}), g: v.gender,
  });
}

/** 이름을 주제 사이에서 옮기는 자리 */
export const NAME_KEY = 'saju-name';

/**
 * 근거 한 줄.
 *
 * 값을 문장으로 만들지 않는다 — 열 언어가 같은 줄을 쓰려면 라벨 열쇠와 값 열쇠만
 * 넘기고 말은 언어별 표가 채워야 한다. 한자는 열 언어가 그대로 쓴다.
 */
export interface EvidenceRow {
  /** TOPIC_L10N[lang].terms의 열쇠 */
  term: string;
  /** 한자 — 언어와 무관하게 그대로 보인다 */
  hanja?: string;
  /** 십성 이름(정관·편재…) — 없으면 null, 언어별 표의 열쇠다 */
  star?: string | null;
  /** 오행 — 언어별 표의 열쇠. 해당 없음이면 null */
  el?: Element | null;
  count?: number;
  on?: boolean;
}

const starIn = (allSS: string[], a: string, b: string) =>
  allSS.includes(a) ? a : allSS.includes(b) ? b : null;

/**
 * 주제가 짚는 자리를 고른다.
 *
 * 주제마다 네 줄이고, 네 줄이 겹치지 않는다 — 같은 사주로 연애와 재물을 열면
 * 다른 글자를 짚는다. tests/saju-topics.test.ts가 그것을 지킨다.
 */
export function topicEvidence(
  topic: TopicSlug,
  f: SajuFacts,
  day: Pillar,
  month: Pillar,
  daewoon: Pillar | null,
): EvidenceRow[] {
  const female = f.gender === 'female';
  const authStar = starIn(f.allSS, '정관', '편관');
  const wealthStar = starIn(f.allSS, '정재', '편재');
  const resStar = starIn(f.allSS, '정인', '편인');
  const dayBranch = BRANCHES[day.branchIdx];
  const monthBranch = BRANCHES[month.branchIdx];

  switch (topic) {
    /* 연애 — 배우자궁(일지)·배우자 별(여자 관성/남자 재성)·도화 */
    case 'love':
      return [
        { term: 'spouseSeat', hanja: dayBranch.hanja, el: dayBranch.element },
        { term: female ? 'authStar' : 'wealthStar', star: f.partnerStar },
        { term: 'peach', on: f.hasPeach },
        { term: female ? 'authCount' : 'wealthCount', count: f.partnerCat },
      ];

    /* 취업 — 관성(조직)·인성(자격·문서)·월지(직업 환경) */
    case 'job':
      return [
        { term: 'authCount', count: f.sc.관성 },
        { term: 'authStar', star: authStar },
        { term: 'resourceCount', count: f.sc.인성 },
        { term: 'careerSeat', hanja: monthBranch.hanja, el: monthBranch.element },
      ];

    /* 이직 — 역마(이동)·현재 대운(전환점)·비겁(홀로서기)·관성(붙잡는 힘) */
    case 'career':
      return [
        { term: 'yongma', on: f.hasYongma },
        {
          term: 'daewoonNow',
          hanja: daewoon ? STEMS[daewoon.stemIdx].hanja + BRANCHES[daewoon.branchIdx].hanja : undefined,
          on: daewoon !== null,
        },
        { term: 'selfCount', count: f.sc.비겁 },
        { term: 'authCount', count: f.sc.관성 },
      ];

    /* 승진 — 정관(직급)·관인상생(발령)·상관견관(명예 손상)·인성(문서) */
    case 'promotion':
      return [
        { term: 'authStar', star: authStar },
        { term: 'gwanIn', on: f.gwanInSangsaeng },
        { term: 'sanggwan', on: f.sanggwanGyeonGwan },
        { term: 'resourceCount', count: f.sc.인성 },
      ];

    /* 재물 — 재성(재물 그릇)·식상생재(재능→돈)·비겁(겁재, 새는 곳) */
    case 'money':
      return [
        { term: 'wealthCount', count: f.sc.재성 },
        { term: 'wealthStar', star: wealthStar },
        { term: 'siksangSaengJae', on: f.siksangSaengJae },
        { term: 'selfCount', count: f.sc.비겁 },
      ];

    /* 건강 — 오행의 불급(없는 것)과 태과(넘치는 것), 일간의 강약 */
    case 'health':
      return [
        { term: 'missingEl', el: f.missingEls[0] ?? null },
        { term: 'dominantEl', el: f.dominantEl ?? null },
        { term: 'strength', on: f.singang },
        { term: 'missingCount', count: f.missingEls.length },
      ];

    /* 학업 — 인성(공부의 뿌리)·문창귀인(시험·문서)·일간의 강약 */
    case 'study':
      return [
        { term: 'resourceCount', count: f.sc.인성 },
        { term: 'resourceStar', star: resStar },
        { term: 'munchang', on: f.hasMunchang },
        { term: 'strength', on: f.singang },
      ];
  }
}

/**
 * 주제 낱장의 메타데이터 — 열 언어가 서로를 가리킨다.
 *
 * 공유 카드는 따로 만들지 않는다. lib/og-cards/index.ts의 cardUrl이 주소를 거슬러
 * 올라가며 찾으므로 /fortune/saju/love는 fortune/saju의 카드를 그대로 쓴다 —
 * 일흔 장을 새로 그리면 og 장부 두 곳(og-cards.test·og-fonts.test)이 함께 움직여야
 * 하는데, 얻는 것이 없다.
 */
export function topicMetadata(lang: AnyLocale10, topic: TopicSlug): Metadata {
  const c = TOPIC_L10N[lang];
  const route = `/fortune/saju/${topic}`;
  /* H1은 짧게 두고(화면에 보이는 글이다), 사람이 실제로 치는 말은 <title>에 넣는다.
     낱말을 늘어놓으면 역효과라 언어마다 한 구절만 붙인다 — ui.metaTitle의 틀. */
  const title = c.ui.metaTitle.replace('{topic}', c.title[topic]);
  const description = `${c.lead[topic]} ${c.ui.metaDescSuffix}`;
  return withCard({
    title,
    description,
    alternates: { canonical: localeHref(lang, route), languages: alternateLanguages10(route) },
    openGraph: { ...openGraphFor(lang), title, description, url: localeHref(lang, route) },
  });
}

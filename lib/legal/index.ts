/**
 * 정책·소개 네 장의 입구 — 문구를 갈래·언어로 꺼내고, 메타데이터를 만든다.
 *
 * 라우트 파일 40개가 이 두 함수만 부른다. 그래서 canonical·hreflang·공유 카드의
 * 규칙이 40곳에 흩어지지 않는다 — 한 곳에서 틀리면 40곳이 같이 틀리고, 검사도
 * 한 곳만 보면 된다.
 *
 * **여기에 JSX가 닿으면 안 된다.** withCard를 부르는 사슬은 node --test가 그대로
 * 부르므로(lib/og-cards/index.ts의 같은 주석), 화면은 components/LegalPage.tsx에
 * 따로 둔다. 이 파일은 데이터와 메타데이터만 만진다.
 */
import type { Metadata } from 'next';

import { langOfLocale, localeOfLang, type Lang } from '../i18n/lang.ts';
import { alternateLanguages10, localeHref, openGraphFor } from '../locales.ts';
import { withCard } from '../og-cards/index.ts';
import { ABOUT } from './about.ts';
import { CONTACT } from './contact.ts';
import { PRIVACY } from './privacy.ts';
import { TERMS } from './terms.ts';
import { LEGAL_KINDS, legalRoute, type LegalCopy, type LegalKind } from './common.ts';

export * from './common.ts';

/** 갈래 → 열 언어 문구 */
export const LEGAL_COPY: Record<LegalKind, Record<Lang, LegalCopy>> = {
  about: ABOUT,
  contact: CONTACT,
  privacy: PRIVACY,
  terms: TERMS,
};

export const legalCopy = (kind: LegalKind, lang: Lang): LegalCopy => LEGAL_COPY[kind][lang];

/**
 * 그 갈래·언어의 metadata.
 *
 * ── 카드는 왜 안 붙이나 ────────────────────────────────────────
 * withCard는 그 경로에 카드가 없으면 조상으로 올라간다. /about에는 제 카드가
 * 없으므로 첫 화면 카드(`/og/<언어>`)가 붙는다. 이 네 장은 SNS로 공유되는 물건이
 * 아니고, 공유될 때 보여야 하는 것은 "vixutil이라는 사이트"이므로 그것이 맞다.
 * 계산기 낱장이 섹션 카드를 물려받는 것과 같은 판단이다(lib/og-cards/index.ts).
 *
 * ── 왜 열 언어를 다 선언하나 ───────────────────────────────────
 * 네 장은 열 언어가 모두 있다. 여덟 언어짜리 alternateLanguages를 쓰면 중국어
 * 페이지가 있는데도 선언에서 빠져, 그 두 언어가 hreflang 묶음 밖에 남는다.
 */
export function legalMetadata(kind: LegalKind, locale: string): Metadata {
  const lang = langOfLocale(locale);
  const copy = legalCopy(kind, lang);
  const route = legalRoute(kind);
  return withCard({
    title: copy.title,
    description: copy.description,
    openGraph: openGraphFor(localeOfLang(lang)),
    alternates: {
      canonical: localeHref(localeOfLang(lang), route),
      languages: alternateLanguages10(route),
    },
  });
}

/** 사이트맵·검사가 쓰는 주소 전부 — 갈래 넷 × 언어 열 = 40개 */
export function legalRoutes(): string[] {
  return LEGAL_KINDS.flatMap(kind =>
    (Object.keys(LEGAL_COPY[kind]) as Lang[]).map(lang => localeHref(localeOfLang(lang), legalRoute(kind))),
  );
}

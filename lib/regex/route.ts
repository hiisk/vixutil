/**
 * 정규식 라우트가 함께 쓰는 부분 — 메타와 공유 카드.
 */
import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import { ogCard } from '../og-template';
import { alternates8, prefix8, type Lang8 } from '../i18n/lang8.ts';
import { PATTERNS, REGEX_ICON, patternOf } from './list.ts';
import { regexFacts } from './facts.ts';
import { whatOf } from './desc.ts';
import { REGEX_UI } from './ui.ts';

const FROM = '#0ea5e9';
const TO = '#0f172a';

/** 데바나가리는 카드에서 정형되지 않는다 — 앞선 섹션들과 같은 이유다 */
const cardLang = (lang: Lang8): Lang8 => (lang === 'hi' ? 'en' : lang);

export function hubMetadata(lang: Lang8): Metadata {
  const ui = REGEX_UI[lang];
  return {
    title: ui.hubMetaTitle,
    description: ui.hubMetaDesc,
    alternates: { canonical: `${prefix8(lang)}/text/regex`, languages: alternates8('/text/regex') },
  };
}

export function detailMetadata(lang: Lang8, slug: string): Metadata {
  const x = patternOf(slug);
  if (!x) return {};
  const ui = REGEX_UI[lang];
  const f = regexFacts(x);
  return {
    title: `${ui.metaTitle(whatOf(slug, lang))} — ${ui.section}`,
    description: ui.metaDesc(f, whatOf(slug, lang)),
    alternates: {
      canonical: `${prefix8(lang)}/text/regex/${slug}`,
      languages: alternates8(`/text/regex/${slug}`),
    },
  };
}

export function hubCard(lang: Lang8): ReactElement {
  const ui = REGEX_UI[cardLang(lang)];
  return ogCard({ icon: REGEX_ICON, eyebrow: ui.section, title: ui.hubTitle, desc: ui.hubLead, from: FROM, to: TO });
}

export function patternCard(lang: Lang8, slug: string): ReactElement {
  const card = cardLang(lang);
  const ui = REGEX_UI[card];
  const x = patternOf(slug);
  if (!x) return hubCard(card);
  return ogCard({
    icon: REGEX_ICON,
    eyebrow: `${ui.section} · ${ui.kindLabel[x.kind]}`,
    // 카드에는 식을 그대로 싣는다 — 링크를 보는 자리에서 바로 베껴 쓸 수 있다
    title: x.re.length > 42 ? `${x.re.slice(0, 40)}…` : x.re,
    desc: whatOf(slug, card),
    from: FROM,
    to: TO,
  });
}

export const patternParams = () => PATTERNS.map(x => ({ slug: x.slug }));

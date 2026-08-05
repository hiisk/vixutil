/**
 * ASCII 라우트가 함께 쓰는 부분 — 메타와 공유 카드.
 */
import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import { ogCard } from '../og-template';
import { alternates, langPrefix, type Lang } from '../i18n/lang.ts';
import { ASCII_ICON, CODES, codeOf } from './list.ts';
import { asciiFacts } from './facts.ts';
import { ASCII_UI } from './ui.ts';
import { prerender } from '../prerender.ts';
import { withCard } from '../og-cards/index.ts';

const FROM = '#14b8a6';
const TO = '#0f172a';

/** 데바나가리는 카드에서 정형되지 않는다 — 앞선 섹션들과 같은 이유다 */
const cardLang = (lang: Lang): Lang => (lang === 'hi' ? 'en' : lang);

export function hubMetadata(lang: Lang): Metadata {
  const ui = ASCII_UI[lang];
  return withCard({
    title: ui.hubMetaTitle,
    description: ui.hubMetaDesc,
    alternates: { canonical: `${langPrefix(lang)}/ascii`, languages: alternates('/ascii') },
  });
}

export function detailMetadata(lang: Lang, slug: string): Metadata {
  const code = codeOf(slug);
  if (code === undefined) return {};
  const ui = ASCII_UI[lang];
  const f = asciiFacts(code);
  return withCard({
    title: ui.metaTitle(f),
    description: ui.metaDesc(f),
    alternates: {
      canonical: `${langPrefix(lang)}/ascii/${code}`,
      languages: alternates(`/ascii/${code}`),
    },
  });
}

export function hubCard(lang: Lang): ReactElement {
  const ui = ASCII_UI[cardLang(lang)];
  return ogCard({ icon: ASCII_ICON, eyebrow: ui.section, title: ui.hubTitle, desc: ui.hubLead, from: FROM, to: TO });
}

export const asciiParams = () => prerender(CODES.map(code => ({ slug: String(code) })));

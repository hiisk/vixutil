/**
 * HTTP 라우트가 함께 쓰는 부분 — 메타와 공유 카드.
 */
import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import { ogCard } from '../og-template';
import { alternates8, prefix8, type Lang8 } from '../i18n/lang8.ts';
import { HTTP_ITEMS, HTTP_ICON, httpItemOf } from './list.ts';
import { httpFacts } from './facts.ts';
import { httpDesc } from './desc.ts';
import { HTTP_UI } from './ui.ts';

const FROM = '#0d9488';
const TO = '#0f172a';

/** 데바나가리는 카드에서 정형되지 않는다 — 앞선 섹션들과 같은 이유다 */
const cardLang = (lang: Lang8): Lang8 => (lang === 'hi' ? 'en' : lang);

export function hubMetadata(lang: Lang8): Metadata {
  const ui = HTTP_UI[lang];
  return {
    title: ui.hubMetaTitle,
    description: ui.hubMetaDesc,
    alternates: { canonical: `${prefix8(lang)}/http`, languages: alternates8('/http') },
  };
}

export function detailMetadata(lang: Lang8, slug: string): Metadata {
  const x = httpItemOf(slug);
  if (!x) return {};
  const ui = HTTP_UI[lang];
  return {
    title: `${ui.metaTitle(x.name)} — ${ui.section}`,
    description: ui.metaDesc(x.name, httpDesc(slug, lang)),
    alternates: {
      canonical: `${prefix8(lang)}/http/${slug}`,
      languages: alternates8(`/http/${slug}`),
    },
  };
}

export function hubCard(lang: Lang8): ReactElement {
  const ui = HTTP_UI[cardLang(lang)];
  return ogCard({ icon: HTTP_ICON, eyebrow: ui.section, title: ui.hubTitle, desc: ui.hubLead, from: FROM, to: TO });
}

export function itemCard(lang: Lang8, slug: string): ReactElement {
  const card = cardLang(lang);
  const ui = HTTP_UI[card];
  const x = httpItemOf(slug);
  if (!x) return hubCard(card);
  const f = httpFacts(x);
  return ogCard({
    icon: HTTP_ICON,
    eyebrow: `${ui.section} · ${f.kind === 'status' ? ui.classLabel[f.klass!] : ui.sideLabel[f.side!]}`,
    title: x.name,
    desc: httpDesc(slug, card),
    from: FROM,
    to: TO,
  });
}

export const httpParams = () => HTTP_ITEMS.map(x => ({ slug: x.slug }));

/**
 * 포트 라우트가 함께 쓰는 부분 — 메타와 공유 카드.
 */
import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import { ogCard } from '../og-template';
import { alternates, langPrefix, type Lang } from '../i18n/lang.ts';
import { PORTS, PORT_ICON, portOf } from './list.ts';
import { portFacts } from './facts.ts';
import { PORT_UI } from './ui.ts';
import { prerender } from '../prerender.ts';

const FROM = '#c026d3';
const TO = '#0f172a';

/** 데바나가리는 카드에서 정형되지 않는다 — 앞선 섹션들과 같은 이유다 */
const cardLang = (lang: Lang): Lang => (lang === 'hi' ? 'en' : lang);

export function hubMetadata(lang: Lang): Metadata {
  const ui = PORT_UI[lang];
  return {
    title: ui.hubMetaTitle,
    description: ui.hubMetaDesc,
    alternates: { canonical: `${langPrefix(lang)}/port`, languages: alternates('/port') },
  };
}

export function detailMetadata(lang: Lang, slug: string): Metadata {
  const x = portOf(slug);
  if (!x) return {};
  const ui = PORT_UI[lang];
  const f = portFacts(x);
  return {
    title: ui.metaTitle(f),
    description: ui.metaDesc(f),
    alternates: {
      canonical: `${langPrefix(lang)}/port/${x.port}`,
      languages: alternates(`/port/${x.port}`),
    },
  };
}

export function hubCard(lang: Lang): ReactElement {
  const ui = PORT_UI[cardLang(lang)];
  return ogCard({ icon: PORT_ICON, eyebrow: ui.section, title: ui.hubTitle, desc: ui.hubLead, from: FROM, to: TO });
}

export const portParams = () => prerender(PORTS.map(x => ({ slug: String(x.port) })));

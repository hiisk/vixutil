/**
 * 권한 모드 라우트가 함께 쓰는 부분 — 메타와 공유 카드.
 */
import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import { ogCard } from '../og-template';
import { alternates, langPrefix, type Lang } from '../i18n/lang.ts';
import { CHMOD_ICON, MODES, modeOf } from './list.ts';
import { chmodFacts } from './facts.ts';
import { CHMOD_UI } from './ui.ts';
import { prerender } from '../prerender.ts';

const FROM = '#ea580c';
const TO = '#0f172a';

/** 데바나가리는 카드에서 정형되지 않는다 — 앞선 섹션들과 같은 이유다 */
const cardLang = (lang: Lang): Lang => (lang === 'hi' ? 'en' : lang);

export function hubMetadata(lang: Lang): Metadata {
  const ui = CHMOD_UI[lang];
  return {
    title: ui.hubMetaTitle,
    description: ui.hubMetaDesc,
    alternates: { canonical: `${langPrefix(lang)}/chmod`, languages: alternates('/chmod') },
  };
}

export function detailMetadata(lang: Lang, slug: string): Metadata {
  const mode = modeOf(slug);
  if (!mode) return {};
  const ui = CHMOD_UI[lang];
  const f = chmodFacts(mode);
  return {
    title: ui.metaTitle(f),
    description: ui.metaDesc(f),
    alternates: {
      canonical: `${langPrefix(lang)}/chmod/${mode}`,
      languages: alternates(`/chmod/${mode}`),
    },
  };
}

export function hubCard(lang: Lang): ReactElement {
  const ui = CHMOD_UI[cardLang(lang)];
  return ogCard({ icon: CHMOD_ICON, eyebrow: ui.section, title: ui.hubTitle, desc: ui.hubLead, from: FROM, to: TO });
}

export const chmodParams = () => prerender(MODES.map(mode => ({ slug: mode })));

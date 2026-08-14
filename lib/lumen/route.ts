/**
 * 조명 라우트가 함께 쓰는 부분 — 메타와 공유 카드.
 */
import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import { ogCard } from '../og-template';
import { alternates, langPrefix, type Lang } from '../i18n/lang.ts';
import { LUMEN_ICON } from './list.ts';
import { LUMEN_UI } from './ui.ts';
import { withCard } from '../og-cards/index.ts';

const FROM = '#ca8a04';
const TO = '#0f172a';

/** 데바나가리는 카드에서 정형되지 않는다 — 앞선 섹션들과 같은 이유다 */
const cardLang = (lang: Lang): Lang => (lang === 'hi' ? 'en' : lang);

export function hubMetadata(lang: Lang): Metadata {
  const ui = LUMEN_UI[lang];
  return withCard({
    title: ui.hubMetaTitle,
    description: ui.hubMetaDesc,
    alternates: { canonical: `${langPrefix(lang)}/lumen`, languages: alternates('/lumen') },
  });
}

export function hubCard(lang: Lang): ReactElement {
  const ui = LUMEN_UI[cardLang(lang)];
  return ogCard({ icon: LUMEN_ICON, eyebrow: ui.section, title: ui.hubTitle, desc: ui.hubLead, from: FROM, to: TO });
}

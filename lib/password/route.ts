/**
 * 비밀번호 라우트가 함께 쓰는 부분 — 메타와 공유 카드.
 */
import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import { ogCard } from '../og-template';
import { alternates, langPrefix, type Lang } from '../i18n/lang.ts';
import { PASSWORD_ICON, PASSWORD_SLUGS } from './list.ts';
import { PASSWORD_UI } from './ui.ts';
import { prerender } from '../prerender.ts';
import { withCard } from '../og-cards/index.ts';

const FROM = '#0f766e';
const TO = '#111827';

/** 데바나가리는 카드에서 정형되지 않는다 — 앞선 섹션들과 같은 이유다 */
const cardLang = (lang: Lang): Lang => (lang === 'hi' ? 'en' : lang);

export function hubMetadata(lang: Lang): Metadata {
  const ui = PASSWORD_UI[lang];
  return withCard({
    title: ui.hubMetaTitle,
    description: ui.hubMetaDesc,
    alternates: { canonical: `${langPrefix(lang)}/password`, languages: alternates('/password') },
  });
}

export function hubCard(lang: Lang): ReactElement {
  const ui = PASSWORD_UI[cardLang(lang)];
  return ogCard({ icon: PASSWORD_ICON, eyebrow: ui.section, title: ui.hubTitle, desc: ui.hubLead, from: FROM, to: TO });
}

export const passwordParams = () => prerender(PASSWORD_SLUGS.map(slug => ({ slug })));

/**
 * 화면 규격 라우트가 함께 쓰는 부분 — 메타와 공유 카드.
 */
import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import { ogCard } from '../og-template';
import { alternates, langPrefix, type Lang } from '../i18n/lang.ts';
import { SCREENS, SCREEN_ICON } from './screens.ts';
import { screenView } from './facts.ts';
import { DEVICE_UI } from './ui.ts';

const FROM = '#0ea5e9';
const TO = '#0f172a';
/** 데바나가리는 카드에서 정형되지 않는다 — 앞선 섹션들과 같은 이유다 */
const cardLang = (lang: Lang): Lang => (lang === 'hi' ? 'en' : lang);

export { SCREEN_ICON, screenView };

export function hubMetadata(lang: Lang): Metadata {
  const ui = DEVICE_UI[lang];
  return {
    title: ui.hubMetaTitle,
    description: ui.hubMetaDesc,
    alternates: {
      canonical: `${langPrefix(lang)}/device/screen`,
      languages: alternates('/device/screen'),
    },
  };
}

export function detailMetadata(lang: Lang, slug: string): Metadata {
  const v = screenView(slug);
  if (!v) return {};
  const ui = DEVICE_UI[lang];
  return {
    title: `${ui.metaTitle(v.name)} — ${ui.section}`,
    description: ui.metaDesc(v),
    alternates: {
      canonical: `${langPrefix(lang)}/device/screen/${slug}`,
      languages: alternates(`/device/screen/${slug}`),
    },
  };
}

export function hubCard(lang: Lang): ReactElement {
  const ui = DEVICE_UI[cardLang(lang)];
  return ogCard({ icon: SCREEN_ICON, eyebrow: ui.section, title: ui.hubTitle, desc: ui.hubLead, from: FROM, to: TO });
}

export function screenCard(lang: Lang, slug: string): ReactElement {
  const card = cardLang(lang);
  const ui = DEVICE_UI[card];
  const v = screenView(slug);
  if (!v) return hubCard(card);
  return ogCard({
    icon: SCREEN_ICON,
    eyebrow: `${ui.section} · ${ui.kindLabel[v.kind]}`,
    title: v.name,
    // 카드에서 바로 알아야 하는 것은 해상도·인치·밀도 세 가지다
    desc: `${v.w}×${v.h} · ${v.inch}" · ${v.ppi} ppi · ${v.ratioLabel}`,
    from: FROM,
    to: TO,
  });
}

export const screenParams = () => SCREENS.map(s => ({ slug: s.slug }));

/**
 * 렌즈 화각 라우트가 함께 쓰는 부분 — 메타와 공유 카드.
 */
import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import { ogCard } from '../og-template';
import { alternates8, langPrefix, type Lang8 } from '../i18n/lang.ts';
import { LENSES, LENS_ICON, lensOf } from './list.ts';
import { lensFacts } from './facts.ts';
import { LENS_UI } from './ui.ts';

const FROM = '#4f46e5';
const TO = '#0f172a';

/** 데바나가리는 카드에서 정형되지 않는다 — 앞선 섹션들과 같은 이유다 */
const cardLang = (lang: Lang8): Lang8 => (lang === 'hi' ? 'en' : lang);

export function hubMetadata(lang: Lang8): Metadata {
  const ui = LENS_UI[lang];
  return {
    title: ui.hubMetaTitle,
    description: ui.hubMetaDesc,
    alternates: { canonical: `${langPrefix(lang)}/snap/lens`, languages: alternates8('/snap/lens') },
  };
}

export function detailMetadata(lang: Lang8, slug: string): Metadata {
  const l = lensOf(slug);
  if (!l) return {};
  const ui = LENS_UI[lang];
  const f = lensFacts(l);
  return {
    title: `${ui.metaTitle(f.focal, f.sensorName)} — ${ui.section}`,
    description: ui.metaDesc(f, ui.kindLabel[f.kind]),
    alternates: {
      canonical: `${langPrefix(lang)}/snap/lens/${slug}`,
      languages: alternates8(`/snap/lens/${slug}`),
    },
  };
}

export function hubCard(lang: Lang8): ReactElement {
  const ui = LENS_UI[cardLang(lang)];
  return ogCard({ icon: LENS_ICON, eyebrow: ui.section, title: ui.hubTitle, desc: ui.hubLead, from: FROM, to: TO });
}

export function lensCard(lang: Lang8, slug: string): ReactElement {
  const card = cardLang(lang);
  const ui = LENS_UI[card];
  const l = lensOf(slug);
  if (!l) return hubCard(card);
  const f = lensFacts(l);
  return ogCard({
    icon: LENS_ICON,
    eyebrow: `${ui.section} · ${ui.kindLabel[f.kind]}`,
    title: `${f.focal}mm · ${f.sensorName}`,
    desc: ui.metaDesc(f, ui.kindLabel[f.kind]),
    from: FROM,
    to: TO,
  });
}

export const lensParams = () => LENSES.map(l => ({ slug: l.slug }));

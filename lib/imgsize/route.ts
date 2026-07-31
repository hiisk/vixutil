/**
 * 이미지 크기 라우트가 함께 쓰는 부분 — 메타와 공유 카드.
 */
import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import { ogCard } from '../og-template';
import { alternates8, langPrefix, type Lang8 } from '../i18n/lang.ts';
import { IMG_SIZES, IMG_SIZE_ICON, imgSizeOf } from './list.ts';
import { sizeFacts } from './facts.ts';
import { IMG_SIZE_UI } from './ui.ts';

const FROM = '#db2777';
const TO = '#0f172a';

/** 데바나가리는 카드에서 정형되지 않는다 — 앞선 섹션들과 같은 이유다 */
const cardLang = (lang: Lang8): Lang8 => (lang === 'hi' ? 'en' : lang);

export function hubMetadata(lang: Lang8): Metadata {
  const ui = IMG_SIZE_UI[lang];
  return {
    title: ui.hubMetaTitle,
    description: ui.hubMetaDesc,
    alternates: { canonical: `${langPrefix(lang)}/image/size`, languages: alternates8('/image/size') },
  };
}

export function detailMetadata(lang: Lang8, slug: string): Metadata {
  const x = imgSizeOf(slug);
  if (!x) return {};
  const ui = IMG_SIZE_UI[lang];
  const f = sizeFacts(x);
  return {
    title: `${ui.metaTitle(x.name, x.w, x.h)} — ${ui.section}`,
    description: ui.metaDesc(f, ui.kindLabel[x.kind]),
    alternates: {
      canonical: `${langPrefix(lang)}/image/size/${slug}`,
      languages: alternates8(`/image/size/${slug}`),
    },
  };
}

export function hubCard(lang: Lang8): ReactElement {
  const ui = IMG_SIZE_UI[cardLang(lang)];
  return ogCard({ icon: IMG_SIZE_ICON, eyebrow: ui.section, title: ui.hubTitle, desc: ui.hubLead, from: FROM, to: TO });
}

export function sizeCard(lang: Lang8, slug: string): ReactElement {
  const card = cardLang(lang);
  const ui = IMG_SIZE_UI[card];
  const x = imgSizeOf(slug);
  if (!x) return hubCard(card);
  const f = sizeFacts(x);
  return ogCard({
    icon: IMG_SIZE_ICON,
    eyebrow: `${ui.section} · ${ui.kindLabel[x.kind]}`,
    title: `${x.w} × ${x.h}`,
    desc: `${x.name} · ${f.ratioLabel} · ${f.mm[0]}×${f.mm[1]} mm`,
    from: FROM,
    to: TO,
  });
}

export const sizeParams = () => IMG_SIZES.map(x => ({ slug: x.slug }));

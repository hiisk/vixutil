/**
 * 확장자 라우트가 함께 쓰는 부분 — 메타와 공유 카드.
 */
import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import { ogCard } from '../og-template';
import { alternates8, langPrefix, type Lang8 } from '../i18n/lang.ts';
import { EXTS, EXT_ICON, extOf } from './list.ts';
import { extFacts } from './facts.ts';
import { EXT_UI } from './ui.ts';

const FROM = '#6366f1';
const TO = '#0f172a';

/** 데바나가리는 카드에서 정형되지 않는다 — 앞선 섹션들과 같은 이유다 */
const cardLang = (lang: Lang8): Lang8 => (lang === 'hi' ? 'en' : lang);

export function hubMetadata(lang: Lang8): Metadata {
  const ui = EXT_UI[lang];
  return {
    title: ui.hubMetaTitle,
    description: ui.hubMetaDesc,
    alternates: { canonical: `${langPrefix(lang)}/ext`, languages: alternates8('/ext') },
  };
}

export function detailMetadata(lang: Lang8, slug: string): Metadata {
  const x = extOf(slug);
  if (!x) return {};
  const ui = EXT_UI[lang];
  return {
    title: `${ui.metaTitle(x.ext)} — ${ui.section}`,
    description: ui.metaDesc(extFacts(x), ui.kindLabel[x.kind]),
    alternates: {
      canonical: `${langPrefix(lang)}/ext/${slug}`,
      languages: alternates8(`/ext/${slug}`),
    },
  };
}

export function hubCard(lang: Lang8): ReactElement {
  const ui = EXT_UI[cardLang(lang)];
  return ogCard({ icon: EXT_ICON, eyebrow: ui.section, title: ui.hubTitle, desc: ui.hubLead, from: FROM, to: TO });
}

export function extCard(lang: Lang8, slug: string): ReactElement {
  const card = cardLang(lang);
  const ui = EXT_UI[card];
  const x = extOf(slug);
  if (!x) return hubCard(card);
  const f = extFacts(x);
  return ogCard({
    icon: EXT_ICON,
    eyebrow: `${ui.section} · ${ui.kindLabel[x.kind]}`,
    title: `.${x.ext}`,
    // 카드에서 바로 알아야 하는 것은 MIME과 여는 프로그램이다
    desc: `${f.mime} · ${f.apps.slice(0, 3).join(', ')}`,
    from: FROM,
    to: TO,
  });
}

export const extParams = () => EXTS.map(x => ({ slug: x.ext }));

/**
 * 주파수 라우트가 함께 쓰는 부분 — 메타와 공유 카드.
 */
import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import { ogCard } from '../og-template';
import { alternates, langPrefix, type Lang } from '../i18n/lang.ts';
import { FREQS, FREQ_ICON, freqOf, freqSlug } from './freqs.ts';
import { freqFacts } from './facts.ts';
import { SOUND_UI } from './ui.ts';
import { prerender } from '../prerender.ts';

const FROM = '#10b981';
const TO = '#0f172a';

/** 데바나가리는 카드에서 정형되지 않는다 — 앞선 섹션들과 같은 이유다 */
const cardLang = (lang: Lang): Lang => (lang === 'hi' ? 'en' : lang);

export function hubMetadata(lang: Lang): Metadata {
  const ui = SOUND_UI[lang];
  return {
    title: ui.hubMetaTitle,
    description: ui.hubMetaDesc,
    alternates: { canonical: `${langPrefix(lang)}/sound/hz`, languages: alternates('/sound/hz') },
  };
}

export function detailMetadata(lang: Lang, slug: string): Metadata {
  const f = freqOf(slug);
  if (!f) return {};
  const ui = SOUND_UI[lang];
  const facts = freqFacts(f);
  return {
    title: `${ui.metaTitle(f.hz)} — ${ui.section}`,
    description: ui.metaDesc(facts),
    alternates: {
      canonical: `${langPrefix(lang)}/sound/hz/${slug}`,
      languages: alternates(`/sound/hz/${slug}`),
    },
  };
}

export function hubCard(lang: Lang): ReactElement {
  const ui = SOUND_UI[cardLang(lang)];
  return ogCard({ icon: FREQ_ICON, eyebrow: ui.section, title: ui.hubTitle, desc: ui.hubLead, from: FROM, to: TO });
}

export function freqCard(lang: Lang, slug: string): ReactElement {
  const card = cardLang(lang);
  const ui = SOUND_UI[card];
  const f = freqOf(slug);
  if (!f) return hubCard(card);
  const facts = freqFacts(f);
  return ogCard({
    icon: FREQ_ICON,
    eyebrow: `${ui.section} · ${ui.rangeLabel[facts.range]}`,
    title: `${f.hz} Hz`,
    // 카드에서 바로 알아야 하는 것은 음이름과 파장이다
    desc: `${ui.note} ${facts.note} · ${ui.wavelength} ${facts.wavelengthLabel} · ${ui.period} ${facts.periodLabel}`,
    from: FROM,
    to: TO,
  });
}

export const freqParams = () => prerender(FREQS.map(f => ({ slug: freqSlug(f.hz) })));

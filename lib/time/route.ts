/**
 * 도시 시계 라우트가 함께 쓰는 부분 — 메타와 공유 카드.
 */
import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import { ogCard } from '../og-template';
import { alternates8, prefix8, type Lang8 } from '../i18n/lang8.ts';
import { timeCity, timeCountry } from './cities8.ts';
import { cityFacts } from './facts.ts';
import { TIME_UI } from './ui.ts';

const TO = '#0f172a';

/** 데바나가리는 카드에서 정형되지 않는다 — 앞선 섹션들과 같은 이유다 */
const cardLang = (lang: Lang8): Lang8 => (lang === 'hi' ? 'en' : lang);

export function detailMetadata(lang: Lang8, slug: string): Metadata {
  const city = timeCity(slug);
  if (!city) return {};
  const ui = TIME_UI[lang];
  const f = cityFacts(city, lang);
  return {
    title: `${ui.metaTitle(f.city)} — ${ui.section}`,
    description: ui.metaDesc(f),
    alternates: {
      canonical: `${prefix8(lang)}/time/${slug}`,
      languages: alternates8(`/time/${slug}`),
    },
  };
}

export function cityCard(lang: Lang8, slug: string): ReactElement {
  const city = timeCity(slug);
  const card = cardLang(lang);
  const ui = TIME_UI[card];
  if (!city) {
    return ogCard({ icon: '🕰️', eyebrow: ui.section, title: ui.hubTitle, desc: ui.hubLead, from: '#0ea5e9', to: TO });
  }
  const f = cityFacts(city, card);
  return ogCard({
    icon: '🕰️',
    eyebrow: `${ui.section} · ${timeCountry(city.country)?.name[card] ?? ''}`,
    title: f.city,
    // 카드에서 바로 알아야 하는 것은 오프셋과 서머타임 여부다
    desc: `${city.zone} · UTC ${f.standardLabel} · ${ui.dstLabel} ${f.dst ? ui.dstYes : ui.dstNo}`,
    from: '#0ea5e9',
    to: TO,
  });
}

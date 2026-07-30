/**
 * 주사위 확률 라우트가 함께 쓰는 부분 — 메타와 공유 카드.
 */
import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import { ogCard } from '../og-template';
import { alternates8, prefix8, type Lang8 } from '../i18n/lang8.ts';
import { DICE_ICON, ROLLS, rollOf } from './list.ts';
import { rollFacts } from './facts.ts';
import { DICE_UI } from './ui.ts';

const FROM = '#e11d48';
const TO = '#0f172a';

/** 데바나가리는 카드에서 정형되지 않는다 — 앞선 섹션들과 같은 이유다 */
const cardLang = (lang: Lang8): Lang8 => (lang === 'hi' ? 'en' : lang);

export function hubMetadata(lang: Lang8): Metadata {
  const ui = DICE_UI[lang];
  return {
    title: ui.hubMetaTitle,
    description: ui.hubMetaDesc,
    alternates: { canonical: `${prefix8(lang)}/random/dice`, languages: alternates8('/random/dice') },
  };
}

export function detailMetadata(lang: Lang8, slug: string): Metadata {
  const r = rollOf(slug);
  if (!r) return {};
  const ui = DICE_UI[lang];
  const f = rollFacts(r);
  return {
    title: `${ui.metaTitle(f)} — ${ui.section}`,
    description: ui.metaDesc(f),
    alternates: {
      canonical: `${prefix8(lang)}/random/dice/${slug}`,
      languages: alternates8(`/random/dice/${slug}`),
    },
  };
}

export function hubCard(lang: Lang8): ReactElement {
  const ui = DICE_UI[cardLang(lang)];
  return ogCard({ icon: DICE_ICON, eyebrow: ui.section, title: ui.hubTitle, desc: ui.hubLead, from: FROM, to: TO });
}

export function rollCard(lang: Lang8, slug: string): ReactElement {
  const card = cardLang(lang);
  const ui = DICE_UI[card];
  const r = rollOf(slug);
  if (!r) return hubCard(card);
  const f = rollFacts(r);
  return ogCard({
    icon: DICE_ICON,
    eyebrow: `${ui.section} · ${ui.diceTitle(f.dice)}`,
    title: `${f.dice}d6 = ${f.sum}`,
    desc: ui.desc(f),
    from: FROM,
    to: TO,
  });
}

export const rollParams = () => ROLLS.map(r => ({ slug: r.slug }));

/**
 * 음악 이론 라우트가 함께 쓰는 부분.
 *
 * 언어 여덟 × 파일 넷 = 서른두 파일이다. 문구를 만드는 규칙을 그 안에 적으면
 * 한 언어만 고쳐지는 날이 온다. 라우트는 언어만 넘기고 문구는 여기서 만든다.
 */
import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import { ogCard } from '../og-template';
import { alternates8, langPrefix, type Lang8 } from '../i18n/lang.ts';
import { KIND_WORD, colorOf, iconOf, musicItem } from './catalog.ts';
import { itemFacts } from './facts.ts';
import { MUSIC_UI } from './ui.ts';

const HUB_FROM = '#0ea5e9';
const HUB_TO = '#0f172a';

/**
 * 공유 카드만 라틴 표기로 내는 언어.
 *
 * 카드를 그리는 satori에는 복잡 문자 정형이 없어 데바나가리의 모음 기호 자리를
 * 바꿔 주지 못한다 — 지하철 카드에서 "दिल्ली"가 "दलि्ली"로 나온 것과 같은 문제다.
 */
const cardLang = (lang: Lang8): Lang8 => (lang === 'hi' ? 'en' : lang);

export function hubMetadata(lang: Lang8): Metadata {
  const ui = MUSIC_UI[lang];
  return {
    title: ui.hubMetaTitle,
    description: ui.hubMetaDesc,
    alternates: { canonical: `${langPrefix(lang)}/music`, languages: alternates8('/music') },
  };
}

export function detailMetadata(lang: Lang8, slug: string): Metadata {
  const item = musicItem(slug);
  if (!item) return {};
  const ui = MUSIC_UI[lang];
  const f = itemFacts(item, lang);
  return {
    title: `${ui.metaTitle(f)} — ${ui.section}`,
    description: ui.metaDesc(f),
    alternates: {
      canonical: `${langPrefix(lang)}/music/${slug}`,
      languages: alternates8(`/music/${slug}`),
    },
  };
}

export function hubCard(lang: Lang8): ReactElement {
  const ui = MUSIC_UI[cardLang(lang)];
  return ogCard({
    icon: '🎹',
    eyebrow: ui.section,
    title: ui.hubTitle,
    desc: ui.hubLead,
    from: HUB_FROM,
    to: HUB_TO,
  });
}

export function itemCard(lang: Lang8, slug: string): ReactElement {
  const item = musicItem(slug);
  const card = cardLang(lang);
  const ui = MUSIC_UI[card];
  if (!item) return hubCard(lang);
  const f = itemFacts(item, card);
  return ogCard({
    icon: iconOf(item),
    eyebrow: `${ui.section} · ${KIND_WORD[card][item.kind]}`,
    title: f.title,
    desc: f.notes.join(' · '),
    from: colorOf(item),
    to: HUB_TO,
  });
}

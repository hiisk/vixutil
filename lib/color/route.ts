/**
 * 색 라우트가 함께 쓰는 부분 — 메타와 공유 카드.
 *
 * 언어 여덟 × 파일 넷이라 문구 규칙을 라우트에 적지 않는다.
 */
import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import { ogCard } from '../og-template';
import { alternates, langPrefix, type Lang } from '../i18n/lang.ts';
import { namedColor } from './named8.ts';
import { colorFacts } from './facts.ts';
import { COLOR_UI } from './ui.ts';
import { HEX_UI } from './hex-ui.ts';
import { expandHex, familyOfHex, parseHexSlug } from './hex-grid.ts';
import { withCard } from '../og-cards/index.ts';

const HUB_TO = '#0f172a';

/** 데바나가리는 카드에서 정형되지 않는다 — 지하철·음악에서와 같은 이유다 */
const cardLang = (lang: Lang): Lang => (lang === 'hi' ? 'en' : lang);

export function hubMetadata(lang: Lang): Metadata {
  const ui = COLOR_UI[lang];
  return withCard({
    title: ui.hubMetaTitle,
    description: ui.hubMetaDesc,
    alternates: { canonical: `${langPrefix(lang)}/color`, languages: alternates('/color') },
  });
}

/**
 * hex 낱장의 메타 — `/color/hex-1a2`.
 *
 * 이름 있는 색과 같은 라우트를 쓰므로 여기서 갈린다. 계열 이름은 COLOR_UI에 이미
 * 열 언어로 있으니 다시 적지 않는다.
 */
function hexMetadata(lang: Lang, slug: string, short: string): Metadata {
  const full = expandHex(short);
  const f = colorFacts(full);
  const hx = HEX_UI[lang];
  const family = COLOR_UI[lang].familyLabel[familyOfHex(full)];
  return withCard({
    /* 갈래 이름을 뒤에 또 붙이지 않는다 — 제목이 "…색상 코드 — 초록 계열 — hex 색상 코드"가 된다 */
    title: hx.metaTitle(full.toUpperCase(), family),
    description: hx.metaDesc(full.toUpperCase(), f),
    alternates: {
      canonical: `${langPrefix(lang)}/color/${slug}`,
      languages: alternates(`/color/${slug}`),
    },
  });
}

export function detailMetadata(lang: Lang, slug: string): Metadata {
  const short = parseHexSlug(slug);
  if (short) return hexMetadata(lang, slug, short);
  const color = namedColor(slug);
  if (!color) return {};
  const ui = COLOR_UI[lang];
  const f = colorFacts(color.hex);
  return withCard({
    title: `${ui.metaTitle(color.name[lang], f.hex)} — ${ui.section}`,
    description: ui.metaDesc(color.name[lang], f),
    alternates: {
      canonical: `${langPrefix(lang)}/color/${slug}`,
      languages: alternates(`/color/${slug}`),
    },
  });
}

export function hubCard(lang: Lang): ReactElement {
  const ui = COLOR_UI[cardLang(lang)];
  return ogCard({
    icon: '🎨',
    eyebrow: ui.section,
    title: ui.hubTitle,
    desc: ui.hubLead,
    from: '#a855f7',
    to: HUB_TO,
  });
}

export function colorCard(lang: Lang, slug: string): ReactElement {
  const card = cardLang(lang);
  const ui = COLOR_UI[card];
  const short = parseHexSlug(slug);
  if (short) {
    const full = expandHex(short);
    const f = colorFacts(full);
    return ogCard({
      icon: '🎨',
      eyebrow: `${HEX_UI[card].section} · ${ui.familyLabel[familyOfHex(full)]}`,
      title: full.toUpperCase(),
      desc: `RGB ${f.rgb.r}, ${f.rgb.g}, ${f.rgb.b} · HSL ${f.hsl.h}°, ${f.hsl.s}%, ${f.hsl.l}%`,
      from: full,
      to: HUB_TO,
    });
  }
  const color = namedColor(slug);
  if (!color) return hubCard(lang);
  const f = colorFacts(color.hex);
  return ogCard({
    icon: '🎨',
    eyebrow: `${ui.section} · ${f.hex.toUpperCase()}`,
    title: color.name[card],
    desc: `RGB ${f.rgb.r}, ${f.rgb.g}, ${f.rgb.b} · HSL ${f.hsl.h}°, ${f.hsl.s}%, ${f.hsl.l}%`,
    // 카드 배경이 그 색 자체다 — 공유 링크에서 색이 바로 보인다
    from: color.hex,
    to: HUB_TO,
  });
}

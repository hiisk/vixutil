/**
 * 색 라우트가 함께 쓰는 부분 — 메타와 공유 카드.
 *
 * 언어 여덟 × 파일 넷이라 문구 규칙을 라우트에 적지 않는다.
 *
 * ── 자료는 열 언어인데 라우트가 여덟인 이유 ─────────────
 * 색 이름과 화면 문구는 중국어까지 채웠지만 주소는 아직 여덟이다. 이 섹션의
 * 상위 페이지 /color가 색 목록 전용이 아니라 색상 도구 허브(ColorHubIntl)와 같은
 * 페이지이고, 그 허브는 일곱 언어짜리 *-tools-intl 층에 묶여 있다.
 * 도구 허브가 열 언어로 넘어오면 alternates8을 alternates로 바꾸면 된다.
 */
import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import { ogCard } from '../og-template';
import { alternates8, langPrefix, type Lang8 } from '../i18n/lang.ts';
import { namedColor } from './named8.ts';
import { colorFacts } from './facts.ts';
import { COLOR_UI } from './ui.ts';

const HUB_TO = '#0f172a';

/** 데바나가리는 카드에서 정형되지 않는다 — 지하철·음악에서와 같은 이유다 */
const cardLang = (lang: Lang8): Lang8 => (lang === 'hi' ? 'en' : lang);

export function hubMetadata(lang: Lang8): Metadata {
  const ui = COLOR_UI[lang];
  return {
    title: ui.hubMetaTitle,
    description: ui.hubMetaDesc,
    alternates: { canonical: `${langPrefix(lang)}/color`, languages: alternates8('/color') },
  };
}

export function detailMetadata(lang: Lang8, slug: string): Metadata {
  const color = namedColor(slug);
  if (!color) return {};
  const ui = COLOR_UI[lang];
  const f = colorFacts(color.hex);
  return {
    title: `${ui.metaTitle(color.name[lang], f.hex)} — ${ui.section}`,
    description: ui.metaDesc(color.name[lang], f),
    alternates: {
      canonical: `${langPrefix(lang)}/color/${slug}`,
      languages: alternates8(`/color/${slug}`),
    },
  };
}

export function hubCard(lang: Lang8): ReactElement {
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

export function colorCard(lang: Lang8, slug: string): ReactElement {
  const color = namedColor(slug);
  const card = cardLang(lang);
  const ui = COLOR_UI[card];
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

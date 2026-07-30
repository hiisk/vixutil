/**
 * 지하철 라우트가 함께 쓰는 부분.
 *
 * 언어 여덟 × 파일 넷(허브·허브 카드·상세·상세 카드) = 서른두 파일이다. 그 안에
 * 제목을 만드는 규칙을 서른두 번 적으면 한 언어만 고쳐지는 날이 온다. 라우트
 * 파일은 언어만 넘기고, 문구는 여기서 한 곳에서 만든다.
 */
import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import { ogCard } from '../og-template';
import { metroAlternates, metroPrefix, type MetroLang } from './lang.ts';
import { METRO_UI } from './ui.ts';
import { metroLine } from '../metro-lines.ts';
import { countryName, lineIcon, lineTitle } from './types.ts';
import { lineFacts } from './facts.ts';

const HUB_FROM = '#475569';
const HUB_TO = '#0f172a';

export function hubMetadata(lang: MetroLang): Metadata {
  const ui = METRO_UI[lang];
  const path = `${metroPrefix(lang)}/metro`;
  return {
    title: ui.hubMetaTitle,
    description: ui.hubMetaDesc,
    alternates: { canonical: path, languages: metroAlternates() },
  };
}

export function detailMetadata(lang: MetroLang, slug: string): Metadata {
  const line = metroLine(slug);
  if (!line) return {};
  const ui = METRO_UI[lang];
  return {
    title: `${ui.metaTitle(lineTitle(line, lang))} — ${ui.section}`,
    description: ui.metaDesc(lineFacts(line, lang)),
    alternates: {
      canonical: `${metroPrefix(lang)}/metro/${slug}`,
      languages: metroAlternates(slug),
    },
  };
}

export function hubCard(lang: MetroLang): ReactElement {
  const ui = METRO_UI[lang];
  return ogCard({
    icon: '🚇',
    eyebrow: ui.section,
    title: ui.hubTitle,
    desc: ui.hubLead,
    from: HUB_FROM,
    to: HUB_TO,
  });
}

export function lineCard(lang: MetroLang, slug: string): ReactElement {
  const line = metroLine(slug);
  const ui = METRO_UI[lang];
  if (!line) return hubCard(lang);
  return ogCard({
    icon: lineIcon(line),
    eyebrow: `${ui.section} · ${countryName(line.city, lang)}`,
    title: lineTitle(line, lang),
    desc: `${line.stations.length} ${ui.stations}${line.loop ? ` · ${ui.loopNote}` : ''}`,
    from: line.color,
    to: HUB_TO,
  });
}

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
import { withCard } from '../og-cards/index.ts';

const HUB_FROM = '#475569';
const HUB_TO = '#0f172a';

/**
 * 공유 카드만 라틴 표기로 내는 언어.
 *
 * 카드를 그리는 satori에는 복잡 문자 정형(shaping)이 없다. 데바나가리는 자음에
 * 붙는 모음 기호의 자리를 바꿔 그려야 하는데 그것을 못 해서 "दिल्ली"가
 * "दलि्ली"로, "स्टेशन"이 "स ्टेशन"으로 나온다 — 빌드한 카드를 열어 보고 알았다.
 * 페이지 본문은 브라우저가 그리니 멀쩡하므로 카드만 영어 표기를 쓴다.
 */
const cardLang = (lang: MetroLang): MetroLang => (lang === 'hi' ? 'en' : lang);

export function hubMetadata(lang: MetroLang): Metadata {
  const ui = METRO_UI[lang];
  const path = `${metroPrefix(lang)}/metro`;
  return withCard({
    title: ui.hubMetaTitle,
    description: ui.hubMetaDesc,
    alternates: { canonical: path, languages: metroAlternates() },
  });
}

export function detailMetadata(lang: MetroLang, slug: string): Metadata {
  const line = metroLine(slug);
  if (!line) return {};
  const ui = METRO_UI[lang];
  return withCard({
    title: `${ui.metaTitle(lineTitle(line, lang))} — ${ui.section}`,
    description: ui.metaDesc(lineFacts(line, lang)),
    alternates: {
      canonical: `${metroPrefix(lang)}/metro/${slug}`,
      languages: metroAlternates(slug),
    },
  });
}

export function hubCard(lang: MetroLang): ReactElement {
  const ui = METRO_UI[cardLang(lang)];
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
  const card = cardLang(lang);
  const ui = METRO_UI[card];
  if (!line) return hubCard(lang);
  return ogCard({
    icon: lineIcon(line),
    eyebrow: `${ui.section} · ${countryName(line.city, card)}`,
    title: lineTitle(line, card),
    desc: `${ui.stationCount(line.stations.length)}${line.loop ? ` · ${ui.loopNote}` : ''}`,
    from: line.color,
    to: HUB_TO,
  });
}

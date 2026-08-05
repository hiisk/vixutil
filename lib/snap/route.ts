/**
 * 새 스냅테스트의 메타데이터와 공유 카드.
 *
 * 기존 열하나는 lib/snap-tools-intl.ts가 맡는데 거기는 아홉 언어(SnapIntlLang)
 * 표라 한국어가 없다 — 한국어 페이지가 따로 손으로 쓰여 있어서다. 새 도구는
 * 열 언어가 한 컴포넌트를 함께 쓰므로 표도 열 언어짜리로 따로 둔다.
 * 옛것을 열 언어로 넓히는 것은 기존 열하나를 전부 건드리는 일이라 하지 않았다.
 */
import type { Metadata } from 'next';

import { withCard } from '../og-cards/index.ts';
import { alternateLanguages10, localeHref, openGraphFor, type AnyLocale10 } from '../locales.ts';
import { TOOL_TEXT, NEW_SNAP_SLUGS, type NewSnapSlug } from './tool-text.ts';
import type { SnapLang } from '@/components/snap/SnapShell';

/** 주소에 쓰는 로케일 — 한국어만 'ko'로 다르다 */
const locale = (lang: SnapLang): AnyLocale10 => (lang === 'ko' ? 'ko' : lang) as AnyLocale10;

const SNAP_HUB: Record<SnapLang, string> = {
  ko: '스냅테스트', en: 'Snap Test', es: 'Snap Test', 'pt-br': 'Snap Test', ja: 'スナップテスト',
  de: 'Snap-Test', fr: 'Snap Test', hi: 'स्नैप टेस्ट', 'zh-hans': '拍照测试', 'zh-hant': '拍照測驗',
};

/** 빵부스러기에 쓰는 허브 이름 */
export function newSnapHubTitle(lang: SnapLang): string {
  return SNAP_HUB[lang];
}

export function newSnapMetadata(lang: SnapLang, slug: NewSnapSlug): Metadata {
  const t = TOOL_TEXT[lang].tools[slug];
  const route = `/snap/${slug}`;
  const title = `${t.title} | vixutil`;
  return withCard({
    title: t.title,
    description: t.desc,
    alternates: { canonical: localeHref(locale(lang), route), languages: alternateLanguages10(route) },
    openGraph: {
      ...openGraphFor(locale(lang)),
      title,
      description: t.desc,
      url: localeHref(locale(lang), route),
    },
  });
}

/**
 * 새 스냅테스트의 허브 카드.
 *
 * 기존 열하나는 snapHubCards가 SNAP_TOOLS에서 만든다. 새 도구를 거기 넣으려면
 * 제목·설명을 TOOLS 표에 한 벌 더 적어야 하는데, 그러면 같은 문구가 두 곳에
 * 있게 되고 한쪽만 고치는 사고가 난다. 그래서 여기서 이어 붙인다.
 */
export function newSnapHubCards(lang: SnapLang) {
  const prefix = lang === 'ko' ? '' : `/${lang}`;
  return NEW_SNAP_SLUGS.map(slug => ({
    href: `${prefix}/snap/${slug}`,
    icon: HUB_ICON[slug],
    color: HUB_COLOR[slug],
    title: TOOL_TEXT[lang].tools[slug].title,
    desc: TOOL_TEXT[lang].tools[slug].desc,
  }));
}

const HUB_ICON: Record<NewSnapSlug, string> = {
  'id-photo': '\u{1FAAA}', 'head-pose': '\u{1F9ED}', 'real-smile': '\u{1F604}',
  'eye-open': '\u{1F441}\u{FE0F}', framing: '\u{1F5BC}\u{FE0F}',
};
const HUB_COLOR: Record<NewSnapSlug, string> = {
  'id-photo': 'from-sky-500 to-indigo-600',
  'head-pose': 'from-emerald-500 to-teal-600',
  'real-smile': 'from-amber-400 to-rose-500',
  'eye-open': 'from-violet-500 to-fuchsia-600',
  framing: 'from-indigo-500 to-sky-500',
};

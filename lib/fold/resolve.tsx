import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import type { FoldLang } from './lang';
import { sectionHasLocale } from '../i18n/lang';
import { DATA_KEY } from './lang';
import { localeOfLang } from '../i18n/lang';
import {
  STATIC_ROUTES, STATIC_ROUTE_KEYS, SLUG_ROUTES, CATCHALL_ROUTES,
  EN_STATIC_OVERRIDES, EN_SLUG_OVERRIDES, type Loader,
} from './registry';

type Match = { load: Loader; params: Record<string, unknown> };

/* Next의 우선순위 그대로: 정적 > [slug] > [...slug]. en 예외는 등록부의 OVERRIDES */
function match(lang: FoldLang, segs: string[] | undefined): Match | null {
  const key = segs?.join('/') ?? '';
  /*
   * 그 언어에서 안 내기로 한 갈래는 여기서 끊는다 — 낱장은 라우트 파일이 없어
   * 저절로 404지만, **허브는 이 캐치올이 굽는다**. 여기를 안 막으면 /es/hanja가
   * 살아남아 사이트맵에도 hreflang에도 없는 장이 혼자 서 있게 된다.
   * 목록은 lib/i18n/lang.ts의 SECTION_LOCALES.
   */
  if (segs?.length && !sectionHasLocale(segs[0], localeOfLang(DATA_KEY[lang]))) return null;
  const s = (lang === 'en' && EN_STATIC_OVERRIDES[key]) || STATIC_ROUTES[key];
  if (s) return { load: s, params: {} };
  if (segs && segs.length >= 2) {
    const prefix = segs.slice(0, -1).join('/');
    const d = (lang === 'en' && EN_SLUG_OVERRIDES[prefix]) || SLUG_ROUTES[prefix];
    if (d) return { load: d, params: { slug: segs[segs.length - 1] } };
    for (const [cp, load] of Object.entries(CATCHALL_ROUTES)) {
      if (key.startsWith(cp + '/')) {
        return { load, params: { slug: segs.slice(cp.split('/').length) } };
      }
    }
  }
  return null;
}

/**
 * 그 언어가 실제로 굽는 허브 열쇠들.
 *
 * STATIC_ROUTE_KEYS를 그대로 넘기면 안 내기로 한 갈래까지 굽으려 든다 —
 * match()가 null을 내므로 빌드가 404 장을 만들어 놓는다. 미리 거른다.
 */
export function staticKeysFor(lang: FoldLang): string[] {
  const locale = localeOfLang(DATA_KEY[lang]);
  return STATIC_ROUTE_KEYS.filter(k => sectionHasLocale(k.split('/')[0], locale));
}

type Built = {
  metadata?: Metadata;
  generateMetadata?: (a: { params: Promise<unknown> }) => Metadata | Promise<Metadata>;
  Page: (p: { params: Promise<unknown> }) => ReactNode | Promise<ReactNode>;
};

export async function foldMetadata(lang: FoldLang, segs: string[] | undefined): Promise<Metadata> {
  const m = match(lang, segs);
  if (!m) return {};
  const built = (await m.load()).build(lang) as Built;
  if (built.metadata) return built.metadata;
  if (built.generateMetadata) return built.generateMetadata({ params: Promise.resolve(m.params) });
  return {};
}

export async function foldPage(lang: FoldLang, segs: string[] | undefined) {
  const m = match(lang, segs);
  if (!m) notFound();
  const { Page } = (await m.load()).build(lang) as Built;
  return <Page params={Promise.resolve(m.params)} />;
}

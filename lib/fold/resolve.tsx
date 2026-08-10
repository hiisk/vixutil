import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import type { FoldLang } from './lang';
import {
  STATIC_ROUTES, SLUG_ROUTES, CATCHALL_ROUTES,
  EN_STATIC_OVERRIDES, EN_SLUG_OVERRIDES, type Loader,
} from './registry';

type Match = { load: Loader; params: Record<string, unknown> };

/* Next의 우선순위 그대로: 정적 > [slug] > [...slug]. en 예외는 등록부의 OVERRIDES */
function match(lang: FoldLang, segs: string[] | undefined): Match | null {
  const key = segs?.join('/') ?? '';
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

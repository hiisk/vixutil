import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import FoldView, { KoView } from '@/components/FoldView';
import { KO_DEEP_META, KO_DEEP_MODULE } from '@/lib/ko/registry-meta';
import { DEEP_PREFIX_META, DEEP_PREFIX_MODULE } from '@/lib/fold/registry-meta';

/**
 * 한국어 세 칸 낱장을 라우트 하나로 받는다 — /game/chess/x, /text/regex/x …
 *
 * ── 칸 이름을 [section]/[slug]/[deep]으로 맞춘 까닭 ─────────
 * Next는 **같은 깊이의 동적 칸 이름이 같아야 한다.** 처음에 [a]/[b]/[slug]로 두었더니
 * 형제인 [section]/[slug]와 첫 칸 이름이 달라 `You cannot use different slug names
 * for the same dynamic path ('a' !== 'section')`가 나고 **사이트 전체가 500**이 됐다.
 * 빌드는 통과한다 — 서버를 띄워야 드러난다.
 *
 * 그래서 앞 두 칸 이름을 형제와 같게 두고, 실제 낱장 슬러그는 [deep]이 받는다.
 * 등록부 열쇠는 `${section}/${slug}` 꼴이다 — 'game/chess'처럼.
 *
 * 세 칸 정적 페이지(/calculator/dev/base64)와 /crypto/[coin]/price-prediction은
 * 앞 칸이 정해져 있어 Next가 그쪽을 먼저 고른다.
 */
/*
 * ── 뷰를 클라이언트에서 부르는 까닭 (2026-08-15) ────────────────
 * 형제 라우트(app/(ko)/[section]/[slug])와 같다 — 뷰 등록부를 서버에서 부르면
 * 그리는 것은 한 갈래뿐인데 클라이언트 청크가 11.6MB로 나간다.
 * 까닭과 실측은 components/FoldView.tsx 머리말.
 */
/*
 * ── CDN 캐시를 시도했다가 되돌렸다 (2026-08-13) ────────────────
 * ISR 쓰기가 크롤 한 바퀴에 무료 한도의 240~343%라, 캐시를 CDN에만 두는 길
 * (force-dynamic + s-maxage 헤더)을 시도했다. **배포해서 재 보니 안 된다** —
 * 미들웨어가 세운 다른 헤더(X-Cache-Policy)는 그대로 나가는데 Cache-Control만
 * 프레임워크가 붙인 no-store가 이겼다. next.config의 headers()도 정적 라우트에만
 * 먹었다. 즉 App Router 페이지는 **ISR로 캐시되거나 캐시가 아예 없거나 둘뿐이다.**
 *
 * no-store는 요청마다 원본이 페이지 전체를 보내 Origin Transfer를 348%까지 태운
 * 바로 그 상태이므로, ISR로 되돌린다. 쓰기가 한도를 넘을지는 크롤 양에 달렸고
 * 그것은 배포 뒤 Usage로 잰다 — 셈과 실측은 lib/prerender.ts.
 */
export const revalidate = false;

type Params = Promise<{ section: string; slug: string; deep: string }>;

/** 두 칸 갈래도 제 모듈의 목록을 모아 굽는다 — 까닭은 [section]/[slug]에 적어 뒀다 */
export async function generateStaticParams() {
  const out: { section: string; slug: string; deep: string }[] = [];
  for (const [key, load] of Object.entries(KO_DEEP_META)) {
    const [section, slug] = key.split('/');
    const mod = await load();
    for (const p of mod.generateStaticParams()) out.push({ section, slug, deep: p.slug });
  }
  /* 접두 갈래(convert/<쌍>/<값>)는 가운데 칸도 목록에서 나온다 — lib/fold/deep-prefix.ts */
  for (const [section, load] of Object.entries(DEEP_PREFIX_META)) {
    const built = (await load()).buildMeta('ko');
    for (const p of built.generateStaticParams()) out.push({ section, slug: p.b, deep: p.slug });
  }
  return out;
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { section, slug, deep } = await params;
  const load = KO_DEEP_META[`${section}/${slug}`];
  if (load) return (await load()).generateMetadata({ params: Promise.resolve({ slug: deep }) });
  const prefix = DEEP_PREFIX_META[section];
  if (!prefix) return {};
  return (await prefix()).buildMeta('ko').generateMetadata({
    params: Promise.resolve({ b: slug, slug: deep }) as Promise<never>,
  });
}

export default async function KoDeepLeaf({ params }: { params: Params }) {
  const { section, slug, deep } = await params;
  const mod = KO_DEEP_MODULE[`${section}/${slug}`];
  if (mod) return <KoView mod={mod} params={{ slug: deep }} />;
  const prefix = DEEP_PREFIX_MODULE[section];
  if (!prefix) notFound();
  return <FoldView mod={prefix} lang="ko" params={{ b: slug, slug: deep }} />;
}

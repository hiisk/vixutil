import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { KO_DEEP_LEAVES } from '@/lib/ko/registry';
import { DEEP_PREFIX_ROUTES } from '@/lib/fold/deep-prefix';

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
  for (const [key, load] of Object.entries(KO_DEEP_LEAVES)) {
    const [section, slug] = key.split('/');
    const mod = await load();
    for (const p of mod.generateStaticParams()) out.push({ section, slug, deep: p.slug });
  }
  /* 접두 갈래(convert/<쌍>/<값>)는 가운데 칸도 목록에서 나온다 — lib/fold/deep-prefix.ts */
  for (const [section, load] of Object.entries(DEEP_PREFIX_ROUTES)) {
    const built = (await load()).build('ko');
    for (const p of built.generateStaticParams()) out.push({ section, slug: p.b, deep: p.slug });
  }
  return out;
}

/**
 * 접두 갈래를 먼저 가른다 — 두 번째 칸이 목록인 갈래(convert/<쌍>/<값>)다.
 * 정확한 열쇠가 있으면 그쪽이 이긴다(까닭은 lib/fold/deep-prefix.ts).
 */
async function prefixBuild(section: string) {
  const load = DEEP_PREFIX_ROUTES[section];
  return load ? (await load()).build('ko') : null;
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { section, slug, deep } = await params;
  const load = KO_DEEP_LEAVES[`${section}/${slug}`];
  if (load) return (await load()).generateMetadata({ params: Promise.resolve({ slug: deep }) });
  const built = await prefixBuild(section);
  return built ? built.generateMetadata({ params: Promise.resolve({ b: slug, slug: deep }) }) : {};
}

export default async function KoDeepLeaf({ params }: { params: Params }) {
  const { section, slug, deep } = await params;
  const load = KO_DEEP_LEAVES[`${section}/${slug}`];
  if (load) return (await load()).default({ params: Promise.resolve({ slug: deep }) });
  const built = await prefixBuild(section);
  if (!built) notFound();
  return built.Page({ params: Promise.resolve({ b: slug, slug: deep }) });
}

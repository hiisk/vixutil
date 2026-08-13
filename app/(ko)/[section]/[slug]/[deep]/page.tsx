import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { KO_DEEP_LEAVES } from '@/lib/ko/registry';

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
 * ── ISR을 버리고 CDN 캐시만 쓴다 (2026-08-13, 두 번째 고침) ────
 * ISR은 크롤 한 바퀴에 쓰기 48만~69만 단위가 든다 — 무료 한도 20만의 240~343%다.
 * 배포마다 캐시가 새로 생기므로 그 값이 배포할 때마다 다시 든다. 그래서 캐시를
 * ISR 저장소가 아니라 **CDN**에 둔다(「CDN cache reads and writes are free」).
 * 동적으로 그리되 next.config의 headers()가 s-maxage를 붙인다 — 2026-08-10의
 * force-dynamic과 다른 점이 그 헤더 하나다. 셈은 lib/prerender.ts.
 */
export const dynamic = 'force-dynamic';

type Params = Promise<{ section: string; slug: string; deep: string }>;

/** 두 칸 갈래도 제 모듈의 목록을 모아 굽는다 — 까닭은 [section]/[slug]에 적어 뒀다 */
export async function generateStaticParams() {
  const out: { section: string; slug: string; deep: string }[] = [];
  for (const [key, load] of Object.entries(KO_DEEP_LEAVES)) {
    const [section, slug] = key.split('/');
    const mod = await load();
    for (const p of mod.generateStaticParams()) out.push({ section, slug, deep: p.slug });
  }
  return out;
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { section, slug, deep } = await params;
  const load = KO_DEEP_LEAVES[`${section}/${slug}`];
  if (!load) return {};
  return (await load()).generateMetadata({ params: Promise.resolve({ slug: deep }) });
}

export default async function KoDeepLeaf({ params }: { params: Params }) {
  const { section, slug, deep } = await params;
  const load = KO_DEEP_LEAVES[`${section}/${slug}`];
  if (!load) notFound();
  return (await load()).default({ params: Promise.resolve({ slug: deep }) });
}

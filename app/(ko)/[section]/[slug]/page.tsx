import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { KO_LEAVES } from '@/lib/ko/registry';

/**
 * 한국어 두 칸 낱장을 라우트 하나로 받는다 — /rate/x, /shortcut/x, /emoji/x …
 *
 * Vercel 라우팅 표가 2,048개까지고 동적 라우트 하나가 두 칸을 쓴다. 갈래마다
 * 라우트를 두면 90개가 표에서 180칸을 먹었다. 갈래별 알맹이는 lib/ko/pages에
 * 그대로 있고, 여기서는 등록부를 보고 넘긴다.
 *
 * 두 칸 정적 페이지(/color/name, /food/coffee, /calculator/bmi …)를 가로채지
 * 않는다. 그쪽은 실제 라우트 파일이고 Next는 정해진 칸을 동적 칸보다 먼저 고른다.
 * /og/…와 /sitemap/…도 첫 칸이 정해져 있어 여기 오지 않는다.
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

type Params = Promise<{ section: string; slug: string }>;

/**
 * 갈래마다 굽을 낱장을 모은다.
 *
 * 각 모듈이 제 generateStaticParams를 그대로 갖고 있고 여기서 그것을 부른다 —
 * 옮기면서 죽은 코드로 남기지 않으려는 것이다. prerender()가 지금 빈 배열을
 * 돌려주므로 굽는 장수는 0이고, PRERENDER_PER_ROUTE를 올리면 갈래마다 그만큼 굽는다.
 */
export async function generateStaticParams() {
  const out: { section: string; slug: string }[] = [];
  for (const [section, load] of Object.entries(KO_LEAVES)) {
    const mod = await load();
    for (const p of mod.generateStaticParams()) out.push({ section, slug: p.slug });
  }
  return out;
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { section, slug } = await params;
  const load = KO_LEAVES[section];
  if (!load) return {};
  return (await load()).generateMetadata({ params: Promise.resolve({ slug }) });
}

export default async function KoLeaf({ params }: { params: Params }) {
  const { section, slug } = await params;
  const load = KO_LEAVES[section];
  if (!load) notFound();
  return (await load()).default({ params: Promise.resolve({ slug }) });
}

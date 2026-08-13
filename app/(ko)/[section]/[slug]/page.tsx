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
 * ── force-dynamic을 걷고 ISR로 되돌렸다 (2026-08-13) ──────────
 * force-dynamic은 요청마다 원본에서 페이지를 전송한다. Hobby의 Fast Origin
 * Transfer가 30일 10GB인데 실제로 한도의 348%까지 올라 사이트가 멈췄다.
 * lib/prerender.ts가 ISR을 버린 2026-08-10의 셈에는 이 항목이 없었다 — 그때 본
 * 것은 ISR 쓰기 한도였다.
 *
 * ISR로 되돌린 뒤 실측한 차이:
 *   Cache-Control  no-store → s-maxage=86400, stale-while-revalidate=31449600
 *   ETag           없음 → 있음. 크롤러 재방문이 **304 · 0바이트**로 떨어진다
 *   두 번째 요청    매번 다시 그림 → x-nextjs-cache: HIT (다시 안 그린다)
 *
 * 남은 위험은 하나다 — 배포가 캐시를 비우면 크롤 한 바퀴마다 쓰기가 든다(옛
 * 주석이 16만이라 적었다). 그런데 Vercel 문서는 「내용이 이전과 같으면 쓰기
 * 단위가 발생하지 않는다」와 「팀이 직접 무효화하지 않는 한 남는다」고 말한다.
 * 어느 쪽이 맞는지는 배포하고 며칠 Usage를 봐야 안다. 치솟으면 되돌린다.
 *
 * 하루로 잡은 까닭: 낱장은 순수 계산이라 더 길게 둘 수도 있지만 고침이 반영되는
 * 데 그만큼 걸린다. 하루면 크롤러의 재방문이 CDN에서 처리된다.
 */
export const revalidate = 86400;

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

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
export const dynamic = 'force-dynamic';

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

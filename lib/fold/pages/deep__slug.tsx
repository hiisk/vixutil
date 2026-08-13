import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import type { FoldLang } from '../lang';
import { SLUG_ROUTES } from '../registry';

/**
 * 세 칸 낱장을 언어마다 라우트 하나로 접는다 — game/chess/[slug] 같은 것들.
 *
 * ── 왜 접었나 ────────────────────────────────────────────
 * Vercel의 라우팅 표는 **2,048개**까지다. 동적 라우트 하나가 표에서 두 칸을
 * 쓰는데, 언어 아홉 개 × 낱장 102개가 쌓여 2,094개가 되었고 배포가
 * `Maximum number of routes exceeded`로 죽었다. 빌드는 성공하고 그 뒤 단계에서
 * 죽으므로, 빌드 로그만 보면 성공으로 보인다.
 *
 * 세 칸을 고른 이유는 부딪히지 않기 때문이다. 등록부의 정적 경로 251개 가운데
 * 슬래시가 둘인 것은 **하나도 없다** — 즉 `[a]/[b]/[slug]`가 잡는 것은 여기
 * 적힌 낱장 열한 갈래뿐이다. 두 칸(`[section]/[slug]`)으로 접으면 두 칸짜리
 * 정적 경로 151개까지 함께 잡혀 아홉 언어 1,359장이 굽기를 잃는다.
 *
 * `calculator/dev/base64`처럼 첫 칸이 정해진 경로는 Next가 정적 칸을 먼저
 * 고르므로 이 라우트로 오지 않는다.
 */
type Params = Promise<{ a: string; b: string; slug: string }>;

/** 등록부에서 그 갈래의 모듈을 찾아 그쪽 build(lang)에 넘긴다 */
async function delegate(lang: FoldLang, a: string, b: string) {
  const loader = SLUG_ROUTES[`${a}/${b}`];
  if (!loader) return null;
  const mod = await loader();
  return mod.build(lang) as {
    generateMetadata: (arg: { params: Promise<{ slug: string }> }) => Promise<Metadata>;
    Page: (arg: { params: Promise<{ slug: string }> }) => Promise<React.ReactElement | null>;
  };
}

export function build(lang: FoldLang) {
  async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
    const { a, b, slug } = await params;
    const built = await delegate(lang, a, b);
    if (!built) return {};
    return built.generateMetadata({ params: Promise.resolve({ slug }) });
  }

  async function Page({ params }: { params: Params }) {
    const { a, b, slug } = await params;
    const built = await delegate(lang, a, b);
    if (!built) notFound();
    return built.Page({ params: Promise.resolve({ slug }) });
  }


  /*
   * ── ISR을 켜려면 이것이 있어야 한다 (2026-08-13) ────────────────
   * 없으면 [a]/[b]/[slug] 라우트가 동적으로 잡혀 캐시를 아예 쓰지 않는다 —
   * revalidate만 적어도 듣지 않는다. 세 칸 낱장이 20,709장(주소의 10%)이라
   * 이 라우트가 캐시를 못 쓰면 그만큼이 요청마다 원본 전송이 된다.
   *
   * 한국어 세 칸 디스패처(app/(ko)/[section]/[slug]/[deep]/page.tsx)와 같은
   * 방식이다 — 등록부의 두 칸 열쇠를 갈라 a·b로 쓰고, 그 모듈의 목록을 slug로
   * 삼는다. 목록이 없는 모듈은 건너뛴다(그 갈래는 요청 때만 만들어진다).
   * prerender()가 걸러서 지금은 빈 배열이므로 빌드는 한 장도 굽지 않는다.
   */
  async function generateStaticParams() {
    const out: { a: string; b: string; slug: string }[] = [];
    for (const [key, load] of Object.entries(SLUG_ROUTES)) {
      if (!key.includes('/')) continue;
      const [a, b] = key.split('/');
      const mod = (await load()) as { build?: (l: FoldLang) => { generateStaticParams?: () => { slug: string }[] } };
      const built = mod.build?.(lang);
      for (const p of built?.generateStaticParams?.() ?? []) out.push({ a, b, slug: p.slug });
    }
    return out;
  }

  return { generateMetadata, generateStaticParams, Page };
}

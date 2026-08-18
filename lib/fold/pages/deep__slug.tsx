import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import FoldView from '@/components/FoldView';
import type { FoldLang } from '../lang';
import { DEEP_META, DEEP_MODULE } from '../registry-meta';

/**
 * 세 칸 낱장을 언어마다 라우트 하나로 접는다 — game/chess/[slug] 같은 것들.
 *
 * ── 왜 접었나 ────────────────────────────────────────────
 * Vercel의 라우팅 표는 **2,048개**까지다. 동적 라우트 하나가 표에서 두 칸을
 * 쓰는데, 언어 아홉 개 × 낱장 102개가 쌓여 2,094개가 되었고 배포가
 * `Maximum number of routes exceeded`로 죽었다. 빌드는 성공하고 그 뒤 단계에서
 * 죽으므로, 빌드 로그만 보면 성공으로 보인다.
 *
 * 세 칸을 고른 이유는 부딪히지 않기 때문이다. 등록부의 정적 경로 가운데 슬래시가
 * 둘인 것은 **하나도 없다** — 즉 `[a]/[b]/[slug]`가 잡는 것은 등록부의 두 칸 낱장
 * 열쇠뿐이다. `calculator/dev/base64`처럼 첫 칸이 정해진 경로는 Next가 정적 칸을
 * 먼저 고르므로 이 라우트로 오지 않는다.
 *
 * ── registry.ts를 안 부르는 까닭 (2026-08-15) ─────────────
 * 예전에는 여기서 SLUG_ROUTES를 통째로 들여왔다. 그러면 이 라우트의 서버 그래프가
 * **등록부 전체**(허브 211 + 낱장 62)에 닿아, 그리는 것은 하나뿐인데 클라이언트
 * 청크가 16.5MB로 나갔다. 지금은 메타 전용 등록부의 세 칸 몫만 보고, 뷰는
 * 클라이언트 모듈인 components/FoldView.tsx가 부른다(까닭은 그 파일 머리말).
 */
type Params = Promise<{ a: string; b: string; slug: string }>;

/* 앞 두 칸이 고정인 갈래만 남았다 — `game/chess` 꼴이다.
   둘째 칸이 목록이던 접두 갈래(convert/<쌍>/<값>)는 2026-08-18에 지웠다. */
function pick(a: string, b: string) {
  const exact = `${a}/${b}`;
  if (DEEP_META[exact]) return { meta: DEEP_META[exact], mod: DEEP_MODULE[exact] };
  return null;
}

export function build(lang: FoldLang) {
  async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
    const { a, b, slug } = await params;
    const hit = pick(a, b);
    if (!hit) return {};
    const built = (await hit.meta()).buildMeta(lang);
    return built.generateMetadata({ params: Promise.resolve({ slug }) as Promise<never> });
  }

  async function Page({ params }: { params: Params }) {
    const { a, b, slug } = await params;
    const hit = pick(a, b);
    if (!hit) notFound();
    return <FoldView mod={hit.mod} lang={lang} params={{ slug }} />;
  }

  /*
   * ── ISR을 켜려면 이것이 있어야 한다 (2026-08-13) ────────────────
   * 없으면 [a]/[b]/[slug] 라우트가 동적으로 잡혀 캐시를 아예 쓰지 않는다 —
   * revalidate만 적어도 듣지 않는다. 세 칸 낱장이 20,709장(주소의 10%)이라
   * 이 라우트가 캐시를 못 쓰면 그만큼이 요청마다 원본 전송이 된다.
   * prerender()가 걸러서 지금은 빈 배열이므로 빌드는 한 장도 굽지 않는다.
   */
  async function generateStaticParams() {
    const out: { a: string; b: string; slug: string }[] = [];
    for (const [key, load] of Object.entries(DEEP_META)) {
      const [a, b] = key.split('/');
      const built = (await load()).buildMeta(lang);
      for (const p of built.generateStaticParams?.() ?? []) out.push({ a, b, slug: p.slug });
    }
    return out;
  }

  return { generateMetadata, generateStaticParams, Page };
}

/* 생성됨(gen.mjs) — 메타 전용. 뷰(<Page/>)는 같은 이름의 원본 모듈에 있고
   components/FoldView.tsx가 클라이언트에서 따로 부른다. 여기서 뷰를 부르면
   서버 그래프가 클라이언트 컴포넌트에 닿아 라우트의 청크가 도로 합쳐진다. */
import type { Metadata } from 'next';
import { CONVERT_MAP, CONVERT_TOOLS } from '@/lib/convert-tools';
import { localized } from '@/lib/convert-localized';
import { LEAF_UI } from '@/lib/convert/leaf-ui';
import { leafFacts } from '@/lib/convert/leaf-facts';
import { parseValueSlug, valuesFor, valueSlug } from '@/lib/convert/values';
import { alternateLanguages10 } from '@/lib/locales';
import { localeHref, localeTag } from '@/lib/locales';
import { withCard } from '@/lib/og-cards';
import { prerender } from '@/lib/prerender';
import type { ConvertLang } from '@/lib/convert-ui-intl';
/**
 * 단위 변환 값 낱장 — `/convert/<쌍>/<값>` 33,120장(138쌍 × 24값 × 열 언어).
 *
 * ── 왜 쌍마다 등록부 줄을 안 두는가 ─────────────────────────
 * 다른 세 칸 낱장(game/chess 등)은 등록부 열쇠가 `${a}/${b}`로 하나씩 있다.
 * 여기는 쌍이 138개라 그 방식이면 등록부에 138줄이 붙는다. 대신 **접두 등록부**
 * (lib/fold/deep-prefix.ts)에 `convert` 한 줄만 두고, 두 번째 칸(쌍 슬러그)은
 * 이 모듈이 CONVERT_MAP에서 찾는다. 라우트 표에는 아무 영향이 없다 —
 * 이미 있는 `[a]/[b]/[slug]` 하나가 그대로 받는다.
 *
 * ── 없는 값은 404다 ─────────────────────────────────────────
 * 아무 숫자나 열리면 무한한 주소가 생겨 크롤 예산이 새고, 사이트맵에 없는 장이
 * 색인에 들어온다. 대표값 스물넷(lib/convert/values.ts)에 있는 값만 낸다.
 */
/**
 * @param lang 열 언어 전부를 받는다(FoldLang이 아니라 ConvertLang) — 한국어
 *   세 칸 라우트도 같은 모듈을 쓰기 때문이다. 접기는 아홉 언어 전용이지만
 *   이 화면에는 접기에 기대는 것이 하나도 없다.
 */
export function buildMeta(lang: ConvertLang) {
  /** 주소 두 칸을 도구와 값으로 — 아니면 null */
  function resolve(pair: string, value: string) {
    const tool = CONVERT_MAP[pair];
    if (!tool) return null;
    const v = parseValueSlug(value);
    if (v === null || !valuesFor(pair).includes(v)) return null;
    return { tool, v };
  }

  async function generateMetadata({ params }: { params: Promise<{ b: string; slug: string }> }): Promise<Metadata> {
    const { b, slug } = await params;
    const hit = resolve(b, slug);
    if (!hit) return {};
    const { tool, v } = hit;
    const text = localized(tool, lang);
    const t = LEAF_UI[lang];
    const f = leafFacts(tool, v);
    const num = (n: number) => n.toLocaleString(localeTag(lang), { maximumFractionDigits: 6 });
    const route = `/convert/${tool.slug}/${valueSlug(v)}`;
    return withCard({
      title: t.metaTitle(num(v), text.from, text.to, num(f.result)),
      description: t.metaDesc(num(v), text.from, text.to, num(f.result)),
      alternates: { canonical: localeHref(lang, route), languages: alternateLanguages10(route) },
    });
  }

  /*
   * ISR을 켜려면 generateStaticParams가 있어야 한다 — revalidate만으로는 라우트가
   * 동적으로 잡혀 캐시가 안 걸린다. prerender()가 걸러서 지금은 빈 배열이다.
   * 목록의 꼴은 부르는 쪽(deep__slug)이 a·b·slug로 다시 감싼다.
   */
  const generateStaticParams = () =>
    prerender(CONVERT_TOOLS.flatMap(t => valuesFor(t.slug).map(v => ({ b: t.slug, slug: valueSlug(v) }))));

  return { generateMetadata, generateStaticParams };
}

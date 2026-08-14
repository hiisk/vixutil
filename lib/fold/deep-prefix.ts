import type { Metadata } from 'next';
import type { ConvertLang } from '@/lib/convert-ui-intl';

/**
 * 세 칸 낱장 가운데 **두 번째 칸이 목록인** 갈래.
 *
 * ── 왜 따로 있나 ─────────────────────────────────────────────
 * 보통의 세 칸 낱장은 `game/chess/<슬러그>`처럼 앞 두 칸이 고정이라, 등록부
 * 열쇠를 `game/chess`로 두면 된다(lib/fold/registry.ts의 SLUG_ROUTES).
 *
 * 그런데 값 낱장은 `convert/<쌍>/<값>`이고 쌍이 138개다. 같은 방식이면 등록부에
 * 138줄이 붙고, 쌍을 하나 더할 때마다 두 곳을 고쳐야 한다. 그래서 **첫 칸만**
 * 등록하고 둘째 칸은 모듈이 제 자료에서 찾게 한다.
 *
 * 라우트 표에는 영향이 없다 — 이미 있는 `[a]/[b]/[slug]` 하나가 그대로 받는다.
 * 순서도 안전하다: 정확한 열쇠(`${a}/${b}`)를 먼저 보고, 없을 때만 여기를 본다.
 */
export interface DeepPrefixModule {
  build: (lang: ConvertLang) => {
    generateMetadata: (a: { params: Promise<{ b: string; slug: string }> }) => Promise<Metadata>;
    Page: (a: { params: Promise<{ b: string; slug: string }> }) => Promise<React.ReactElement | null>;
    generateStaticParams: () => { b: string; slug: string }[];
  };
}

export const DEEP_PREFIX_ROUTES: Record<string, () => Promise<DeepPrefixModule>> = {
  convert: () => import('./pages/convert__value'),
};

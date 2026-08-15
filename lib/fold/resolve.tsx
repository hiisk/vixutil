import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import FoldView from '@/components/FoldView';
import type { FoldLang } from './lang';
import { DATA_KEY } from './lang';
import { localeOfLang, sectionHasLocale } from '../i18n/lang';
import {
  STATIC_META, EN_STATIC_META, STATIC_MODULE, EN_STATIC_MODULE, STATIC_KEYS,
} from './registry-meta';

/*
 * 접힌 허브 캐치올의 서버 쪽 — 메타·굽는 목록·모듈 **이름**만 다룬다.
 *
 * ── registry.ts(뷰)를 부르지 않는 것이 요점이다 (2026-08-15) ──
 * Turbopack은 라우트마다 클라이언트 청크 그룹을 하나만 만든다. 여기서 registry.ts를
 * 부르면 그 라우트의 서버 그래프가 허브 모듈 211개에 닿고, 그리는 것은 하나뿐인데
 * 211개의 클라이언트 컴포넌트가 전부 <script src>로 나간다 — 실측 16.5MB.
 * `() => import()`는 **서버 그래프의** 지연 경계일 뿐이라 이것을 못 가른다.
 *
 * 그래서 서버는 메타 전용 등록부(registry-meta.ts → pages/*.meta.tsx)만 보고,
 * 뷰는 클라이언트 모듈인 components/FoldView.tsx가 부른다(실측 16.5MB → 72KB).
 *
 * ── 낱장 갈래를 여기서 뗀 까닭 ────────────────────────────────
 * 이 캐치올은 dynamicParams = false이고 굽는 목록이 STATIC_KEYS뿐이라, 예전
 * match()의 SLUG_ROUTES·CATCHALL_ROUTES 갈래는 **닿을 수 없는 코드였다**
 * (/en/calculator/bmi는 접기 전에도 지금도 404다 — 실측으로 확인했다).
 * 낱장은 저마다 라우트 파일이 있고 lib/fold/pages/*__slug를 직접 부른다.
 */

const keyOf = (segs?: string[]) => segs?.join('/') ?? '';

/*
 * 그 언어에서 안 내기로 한 갈래는 여기서 끊는다 — 낱장은 라우트 파일이 없어
 * 저절로 404지만, **허브는 이 캐치올이 굽는다**. 여기를 안 막으면 /es/hanja가
 * 살아남아 사이트맵에도 hreflang에도 없는 장이 혼자 서 있게 된다.
 * 목록은 lib/i18n/lang.ts의 SECTION_LOCALES.
 */
const allowed = (lang: FoldLang, segs?: string[]) =>
  !segs?.length || sectionHasLocale(segs[0], localeOfLang(DATA_KEY[lang]));

/**
 * 그 언어가 실제로 굽는 허브 열쇠들.
 *
 * STATIC_KEYS를 그대로 넘기면 안 내기로 한 갈래까지 굽으려 든다 — 빌드가 404 장을
 * 만들어 놓는다. 미리 거른다.
 */
export function staticKeysFor(lang: FoldLang): string[] {
  const locale = localeOfLang(DATA_KEY[lang]);
  return STATIC_KEYS.filter(k => sectionHasLocale(k.split('/')[0], locale));
}

export async function foldMetadata(lang: FoldLang, segs: string[] | undefined): Promise<Metadata> {
  if (!allowed(lang, segs)) return {};
  const key = keyOf(segs);
  /* en 예외는 등록부의 OVERRIDES — generator 가족이 en만 딴 구현이다 */
  const load = (lang === 'en' && EN_STATIC_META[key]) || STATIC_META[key];
  if (!load) return {};
  return (await load()).buildMeta(lang).metadata;
}

export function foldPage(lang: FoldLang, segs: string[] | undefined) {
  if (!allowed(lang, segs)) notFound();
  const key = keyOf(segs);
  const mod = (lang === 'en' && EN_STATIC_MODULE[key]) || STATIC_MODULE[key];
  if (!mod) notFound();
  return <FoldView mod={mod} lang={lang} />;
}

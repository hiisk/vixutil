/* 생성됨(gen.mjs) — 한국어 낱장의 **메타 전용** 등록부.
 *
 * registry.ts(뷰)와 갈라 놓는 까닭은 lib/fold/registry-meta.ts 머리말과 같다:
 * 디스패처가 뷰 모듈에 닿으면 낱장 라우트 하나가 갈래 마흔다섯 개의 클라이언트
 * 청크를 통째로 지고 간다. 그리는 것은 components/FoldView.tsx가 부른다.
 */
import type { Metadata } from 'next';

export type KoMeta = () => Promise<{
  generateMetadata: (a: { params: Promise<{ slug: string }> }) => Promise<Metadata>;
  generateStaticParams: () => { slug: string }[];
}>;

export const KO_META: Record<string, KoMeta> = {
  'body': () => import('./pages/body__slug.meta'),
  'checklist': () => import('./pages/checklist__slug.meta'),
  'cmd': () => import('./pages/cmd__slug.meta'),
  'color': () => import('./pages/color__slug.meta'),
  'convert': () => import('./pages/convert__slug.meta'),
  'country': () => import('./pages/country__slug.meta'),
  'craft': () => import('./pages/craft__slug.meta'),
  'css': () => import('./pages/css__slug.meta'),
  'emoji': () => import('./pages/emoji__slug.meta'),
  'error': () => import('./pages/error__slug.meta'),
  'ext': () => import('./pages/ext__slug.meta'),
  'flight': () => import('./pages/flight__slug.meta'),
  'food': () => import('./pages/food__slug.meta'),
  'generator': () => import('./pages/generator__slug.meta'),
  'geometry': () => import('./pages/geometry__slug.meta'),
  'hanja': () => import('./pages/hanja__slug.meta'),
  'html': () => import('./pages/html__slug.meta'),
  'http': () => import('./pages/http__slug.meta'),
  'metro': () => import('./pages/metro__slug.meta'),
  'music': () => import('./pages/music__slug.meta'),
  'port': () => import('./pages/port__slug.meta'),
  'quiz': () => import('./pages/quiz__slug.meta'),
  'random': () => import('./pages/random__slug.meta'),
  'rate': () => import('./pages/rate__slug.meta'),
  'shortcut': () => import('./pages/shortcut__slug.meta'),
  'test': () => import('./pages/test__slug.meta'),
  'time': () => import('./pages/time__slug.meta'),
};

export const KO_DEEP_META: Record<string, KoMeta> = {
  'body/bmi': () => import('./pages/body__bmi__slug.meta'),
  'calculator/salary': () => import('./pages/calculator__salary__slug.meta'),
  'calculator/severance': () => import('./pages/calculator__severance__slug.meta'),
  'calculator/loan-method': () => import('./pages/calculator__loan-method__slug.meta'),
  'body/exercise': () => import('./pages/body__exercise__slug.meta'),
  'device/screen': () => import('./pages/device__screen__slug.meta'),
  'fortune/birthday': () => import('./pages/fortune__birthday__slug.meta'),
  'fortune/card': () => import('./pages/fortune__card__slug.meta'),
  'fortune/saju': () => import('./pages/fortune__saju__slug.meta'),
  'game/chess': () => import('./pages/game__chess__slug.meta'),
  'game/cube': () => import('./pages/game__cube__slug.meta'),
  'game/poker': () => import('./pages/game__poker__slug.meta'),
  'image/size': () => import('./pages/image__size__slug.meta'),
  'random/dice': () => import('./pages/random__dice__slug.meta'),
  'snap/lens': () => import('./pages/snap__lens__slug.meta'),
  'sound/hz': () => import('./pages/sound__hz__slug.meta'),
  'text/char': () => import('./pages/text__char__slug.meta'),
  'text/regex': () => import('./pages/text__regex__slug.meta'),
};

export const KO_MODULE: Record<string, string> = {
  'body': 'body__slug',
  'checklist': 'checklist__slug',
  'cmd': 'cmd__slug',
  'color': 'color__slug',
  'convert': 'convert__slug',
  'country': 'country__slug',
  'craft': 'craft__slug',
  'css': 'css__slug',
  'emoji': 'emoji__slug',
  'error': 'error__slug',
  'ext': 'ext__slug',
  'flight': 'flight__slug',
  'food': 'food__slug',
  'generator': 'generator__slug',
  'geometry': 'geometry__slug',
  'hanja': 'hanja__slug',
  'html': 'html__slug',
  'http': 'http__slug',
  'metro': 'metro__slug',
  'music': 'music__slug',
  'port': 'port__slug',
  'quiz': 'quiz__slug',
  'random': 'random__slug',
  'rate': 'rate__slug',
  'shortcut': 'shortcut__slug',
  'test': 'test__slug',
  'time': 'time__slug',
};

export const KO_DEEP_MODULE: Record<string, string> = {
  'body/bmi': 'body__bmi__slug',
  'calculator/salary': 'calculator__salary__slug',
  'calculator/severance': 'calculator__severance__slug',
  'calculator/loan-method': 'calculator__loan-method__slug',
  'body/exercise': 'body__exercise__slug',
  'device/screen': 'device__screen__slug',
  'fortune/birthday': 'fortune__birthday__slug',
  'fortune/card': 'fortune__card__slug',
  'fortune/saju': 'fortune__saju__slug',
  'game/chess': 'game__chess__slug',
  'game/cube': 'game__cube__slug',
  'game/poker': 'game__poker__slug',
  'image/size': 'image__size__slug',
  'random/dice': 'random__dice__slug',
  'snap/lens': 'snap__lens__slug',
  'sound/hz': 'sound__hz__slug',
  'text/char': 'text__char__slug',
  'text/regex': 'text__regex__slug',
};

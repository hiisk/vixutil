/**
 * 한국어 낱장 모듈 표 — 갈래 이름 → 그 낱장을 그리는 모듈.
 *
 * ── 왜 접었나 ────────────────────────────────────────────
 * Vercel 라우팅 표는 2,048개까지고 동적 라우트 하나가 두 칸을 쓴다. 아홉 언어를
 * 접은 뒤에도 941개가 남아 한도까지 134칸뿐이었다(2026-08-12). 한국어 낱장 101개를
 * 라우트 둘로 접어 99개를 덜었다.
 *
 * ── 국제 언어와 다르게 옮기기만 했다 ──────────────────────
 * lib/fold/pages의 모듈은 localeHref로 접두어 있는 주소를 만든다. 한국어는 접두어가
 * 없어서 그것을 그대로 쓰면 정경로가 /ko/rate/…로 틀어진다. 그래서 재사용하지 않고
 * 페이지 파일을 옮겼다 — 그리는 것이 한 글자도 안 바뀐다.
 *
 * 뗀 것은 `export const dynamic` 한 줄뿐이고, 디스패처가 대신 선언한다.
 * **generateStaticParams는 그대로 두었다.** 디스패처가 이 표를 돌며 모아서 실제로
 * 쓰므로, PRERENDER_PER_ROUTE를 올리면 갈래마다 그만큼 굽는 손잡이가 살아 있다.
 * 죽은 코드로 남겨 두면 그것을 지키는 검사가 아무것도 안 지키게 된다.
 */
import type { Metadata } from 'next';

/** 페이지 모듈의 모양 — Next 페이지가 내보내는 그대로다 */
export type KoLeaf = {
  default: (arg: { params: Promise<{ slug: string }> }) => Promise<React.ReactElement | null>;
  generateMetadata: (arg: { params: Promise<{ slug: string }> }) => Promise<Metadata>;
  generateStaticParams: () => { slug: string }[];
};

/** 한 칸 갈래 — /rate/[slug] 꼴 */
export const KO_LEAVES: Record<string, () => Promise<KoLeaf>> = {
  'ascii': () => import('./pages/ascii__slug'),
  'body': () => import('./pages/body__slug'),
  'checklist': () => import('./pages/checklist__slug'),
  'chmod': () => import('./pages/chmod__slug'),
  'cidr': () => import('./pages/cidr__slug'),
  'cmd': () => import('./pages/cmd__slug'),
  'code': () => import('./pages/code__slug'),
  'color': () => import('./pages/color__slug'),
  'convert': () => import('./pages/convert__slug'),
  'country': () => import('./pages/country__slug'),
  'craft': () => import('./pages/craft__slug'),
  'css': () => import('./pages/css__slug'),
  'date': () => import('./pages/date__slug'),
  'emoji': () => import('./pages/emoji__slug'),
  'error': () => import('./pages/error__slug'),
  'ext': () => import('./pages/ext__slug'),
  'flight': () => import('./pages/flight__slug'),
  'food': () => import('./pages/food__slug'),
  'fraction': () => import('./pages/fraction__slug'),
  'generator': () => import('./pages/generator__slug'),
  'geometry': () => import('./pages/geometry__slug'),
  'hanja': () => import('./pages/hanja__slug'),
  'html': () => import('./pages/html__slug'),
  'http': () => import('./pages/http__slug'),
  'keycode': () => import('./pages/keycode__slug'),
  'metro': () => import('./pages/metro__slug'),
  'music': () => import('./pages/music__slug'),
  'number': () => import('./pages/number__slug'),
  'password': () => import('./pages/password__slug'),
  'percent': () => import('./pages/percent__slug'),
  'port': () => import('./pages/port__slug'),
  'quiz': () => import('./pages/quiz__slug'),
  'random': () => import('./pages/random__slug'),
  'rate': () => import('./pages/rate__slug'),
  'rem': () => import('./pages/rem__slug'),
  'roman': () => import('./pages/roman__slug'),
  'shortcut': () => import('./pages/shortcut__slug'),
  'sqrt': () => import('./pages/sqrt__slug'),
  'test': () => import('./pages/test__slug'),
  'time': () => import('./pages/time__slug'),
  'times': () => import('./pages/times__slug'),
  'year': () => import('./pages/year__slug'),
};

/** 두 칸 갈래 — /game/chess/[slug] 꼴 */
export const KO_DEEP_LEAVES: Record<string, () => Promise<KoLeaf>> = {
  'body/bmi': () => import('./pages/body__bmi__slug'),
  'calculator/salary': () => import('./pages/calculator__salary__slug'),
  'calculator/severance': () => import('./pages/calculator__severance__slug'),
  'calculator/loan-method': () => import('./pages/calculator__loan-method__slug'),
  'body/exercise': () => import('./pages/body__exercise__slug'),
  'device/screen': () => import('./pages/device__screen__slug'),
  'fortune/birthday': () => import('./pages/fortune__birthday__slug'),
  'fortune/card': () => import('./pages/fortune__card__slug'),
  'fortune/saju': () => import('./pages/fortune__saju__slug'),
  'game/chess': () => import('./pages/game__chess__slug'),
  'game/cube': () => import('./pages/game__cube__slug'),
  'game/poker': () => import('./pages/game__poker__slug'),
  'image/size': () => import('./pages/image__size__slug'),
  'random/dice': () => import('./pages/random__dice__slug'),
  'snap/lens': () => import('./pages/snap__lens__slug'),
  'sound/hz': () => import('./pages/sound__hz__slug'),
  'text/char': () => import('./pages/text__char__slug'),
  'text/regex': () => import('./pages/text__regex__slug'),
};

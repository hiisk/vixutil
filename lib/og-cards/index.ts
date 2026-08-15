/**
 * 공유 카드를 경로로 찾는다.
 *
 * 전에는 app 곳곳의 opengraph-image.tsx 1,799장이 이 일을 했다. 파일 규약이라
 * 손이 안 갔지만, 장마다 라우트 엔트리가 하나씩 생겼다. 그 엔트리들이 컴파일
 * 비용의 대부분을 썼다 — 접고 재 보니 컴파일이 204초에서 86초가 됐다.
 * 2코어 8GB 빌드 컨테이너가 그 무게에 눌려 SIGKILL로 죽고 있었다.
 *
 * 카드는 한 장도 없애지 않았다. **엔트리만** 접었다:
 *   그리는 곳  app/og/[...slug]/route.tsx  (하나)
 *   대응표     lib/og-cards/<언어>.tsx      (열 개, 합쳐 1,799줄)
 *   이름표     lib/og-cards/keys.ts         (경로만, JSX 없이)
 *
 * ── 왜 이 파일에 JSX가 닿으면 안 되는가 ──────────────────────────
 * withCard는 섹션마다 있는 route.ts 예순몇 개가 부르고, 그것들은 검사가 부른다.
 * node --test는 JSX를 파싱하지 못하므로, 사슬 어딘가에 og-template.tsx가
 * 들어오면 검사 수백 개가 한꺼번에 "Unknown file extension .tsx"로 죽는다.
 * 그래서 이 파일은 이름표(keys.ts)와 규격(og-size.ts)만 본다.
 * 카드를 실제로 그리는 cardAt은 ./render.ts에 따로 있다.
 *
 * ── 물려받기 ────────────────────────────────────────────────────
 * 파일 규약은 낱장에 카드가 없으면 조상 세그먼트의 카드를 물려줬다 —
 * /paper/a4는 /paper의 카드를 썼다. 그 규칙을 cardUrl이 대신한다.
 * 메타데이터를 만들 때 미리 풀어 두므로, 같은 카드를 쓰는 낱장 수천 장이
 * 주소 하나를 함께 쓴다. 캐시가 갈라지지 않는다.
 */
import type { Metadata } from 'next';

import { LANGS, type Lang } from '../i18n/lang.ts';
import { openGraphFor, type AnyLocale10 } from '../locales.ts';
import { OG_SIZE } from '../og-size.ts';
import { CARD_KEYS } from './keys.ts';

/**
 * 카드 주소의 언어 칸.
 *
 * 한국어는 사이트 주소에 앞머리가 없지만(`/paper`), 카드 주소에서는 'ko'를
 * 적는다. 안 그러면 `/og/paper`가 "한국어 paper"인지 "paper라는 언어의 첫
 * 화면"인지 가릴 수 없다.
 */
const SEG_OF_LANG = new Map<Lang, string>(LANGS.map(l => [l.lang, l.prefix.slice(1) || 'ko']));
const LANG_OF_SEG = new Map<string, Lang>([...SEG_OF_LANG].map(([l, s]) => [s, l]));
/** og:locale을 고르는 데 쓴다 — locales.ts의 경로형 로케일 */
const LOCALE_OF_LANG = new Map<Lang, AnyLocale10>(LANGS.map(l => [l.lang, l.locale]));

const HAS = new Map<Lang, Set<string>>(
  (Object.entries(CARD_KEYS) as [Lang, string[]][]).map(([l, ks]) => [l, new Set(ks)]),
);

/**
 * 낱장마다 제 카드를 그리는 섹션 (2026-08-15).
 *
 * ── 왜 필요한가 ──────────────────────────────────────────────────
 * 카드 2,109장을 낱장 286,266개가 나눠 쓰고 있었다. `/color/cherry`도
 * `/color/skyblue`도 "색"이라는 같은 그림이 나갔다. <title>에는 답이 들어
 * 있는데(#11AA22 · 200의 15% = 30) 카드에는 안 들어간다 — 공유하면 전부
 * 같은 그림이라 눈에 띄지 않는다.
 *
 * ── 왜 라우트가 안 늘어나나 ─────────────────────────────────────
 * 카드를 그리는 곳은 app/og/[...slug] **캐치올 하나**다. 칸이 몇이든 같은
 * 라우트가 받으므로 `/og/ko/color/cherry`를 내도 **라우트 엔트리는 0칸 는다.**
 * 1,799장을 접었던 사고(index.ts 머리말)는 카드가 많아서가 아니라 카드마다
 * **파일**이 있어서였다. 파일은 여전히 하나다.
 *
 * ── 왜 전부가 아니라 이 목록인가 ────────────────────────────────
 * 낱장 286,266개 전부에 카드를 내면 크롤러가 한 바퀴 훑을 때 28.7GB다
 * (한 장 약 100KB). Origin Transfer 한도가 30일 10GB이므로 **287%**이고,
 * 이 저장소는 바로 그 한도의 348%에서 한 번 멈춘 적이 있다(lib/prerender.ts).
 * 함수 시간도 한 장 1초라 286,266초 = 79시간이다.
 *
 * 그래서 **이미 낱장 카드를 그릴 줄 아는 섹션만** 켠다. 파일 규약을 접을 때
 * 살아남은 함수들이고(<섹션>Card(lang, slug)), 그동안 아무도 안 불러
 * 죽어 있었다. 여는 주소 공간이 얼마인지 아는 채로 켜는 것이 요점이다.
 *
 * 크롤러가 이 주소들을 쓸어 가지 못하게 app/robots.ts가 `/og/*​/*​/*`를 막고,
 * 링크 미리보기를 만드는 것들(lib/crawlers.ts의 UNFURLERS)만 통과시킨다.
 * 그래서 값은 **페이지 수가 아니라 공유 횟수**를 따라간다.
 *
 * 목록을 늘리려면: 그 섹션에 `<섹션>Card(lang, slug)`를 만들고 여기와
 * render.ts의 DETAIL에 같이 적는다(둘이 어긋나면 검사가 잡는다).
 */
export const DETAIL_SECTIONS: readonly string[] = [
  'cmd', 'color', 'css', 'device/screen', 'ext', 'food', 'fortune/card',
  'game/chess', 'game/cube', 'game/poker', 'html', 'http', 'image/size',
  'metro', 'music', 'percent', 'random/dice', 'snap/lens', 'sound/hz',
  'text/char', 'text/regex', 'time',
];
const DETAIL = new Set(DETAIL_SECTIONS);

/** '/en/color/name' → { lang: 'en', path: 'color/name' } */
function split(canonical: string): { lang: Lang; path: string } {
  const segs = canonical.replace(/^https?:\/\/[^/]+/, '').split('/').filter(Boolean);
  const lang = segs.length ? LANG_OF_SEG.get(segs[0]) : undefined;
  // 한국어는 앞머리가 없다 — 첫 칸이 언어가 아니면 그대로 경로다
  return lang ? { lang, path: segs.slice(1).join('/') } : { lang: 'ko', path: segs.join('/') };
}

/**
 * 이 경로가 쓸 카드 주소. 그 자리에 카드가 없으면 조상으로 올라간다.
 * 뿌리까지 올라가도 없으면 undefined — 카드를 안 붙인다.
 */
export function cardUrl(canonical: string): string | undefined {
  const { lang, path } = split(canonical);
  const has = HAS.get(lang);
  if (!has) return undefined;
  const segs = path ? path.split('/') : [];
  for (let n = segs.length; n >= 0; n--) {
    const key = segs.slice(0, n).join('/');
    if (!has.has(key)) continue;
    const seg = SEG_OF_LANG.get(lang);
    /*
     * 섹션 바로 아래 낱장이고 그 섹션이 낱장 카드를 그릴 줄 알면, 슬러그까지
     * 실어 보낸다 — 같은 캐치올 라우트가 받으므로 라우트는 안 는다.
     */
    if (n === segs.length - 1 && DETAIL.has(key)) {
      return `/og/${seg}/${key}/${encodeURIComponent(segs[n])}`;
    }
    return `/og/${seg}${key ? `/${key}` : ''}`;
  }
  return undefined;
}

/**
 * 이 경로에 **제** 카드가 있는가 — 조상 것을 물려받는 경우는 false.
 *
 * cardUrl은 조상으로 올라가므로 어떤 경로를 넣어도 대개 주소가 나온다. 그래서
 * "이 섹션이 제 카드를 갖췄는가"는 그것으로 못 본다. 섹션을 새로 만들면서
 * 카드를 안 넣으면 상위 카드가 나가는데, 그건 404가 아니라 **엉뚱한 그림**이라
 * 눈에 안 띈다. 그 자리를 보는 검사들이 이 함수를 쓴다.
 */
export function hasOwnCard(route: string): boolean {
  const { lang, path } = split(route);
  return HAS.get(lang)?.has(path) ?? false;
}

/** `/og/<언어>/<키>`의 칸들 → 언어와 키. 언어 칸이 아니면 null. */
export function parseCardSlug(slug: string[]): { lang: Lang; key: string } | null {
  const lang = LANG_OF_SEG.get(slug[0] ?? '');
  return lang ? { lang, key: slug.slice(1).join('/') } : null;
}

/** 미리 구울 수 있는 카드 주소 전부 — app/og의 generateStaticParams가 쓴다 */
export function allCardParams(): { slug: string[] }[] {
  return LANGS.flatMap(l =>
    CARD_KEYS[l.lang].map(key => ({
      slug: [SEG_OF_LANG.get(l.lang)!, ...(key ? key.split('/') : [])],
    })),
  );
}

/**
 * 메타데이터에 카드를 붙인다.
 *
 * 어느 카드인지는 **그 객체가 이미 들고 있는 canonical**에서 읽는다. 경로를
 * 두 번 적지 않으므로 둘이 어긋날 수가 없다 — 파일 규약이 라우트 위치로
 * 카드를 정하던 것과 같은 성질이다.
 *
 * canonical이 없으면 아무것도 안 붙인다. 그런 자리가 남아 있는지는
 * tests/og-cards.test.ts가 본다.
 */
export function withCard(m: Metadata): Metadata {
  const canonical = m.alternates?.canonical;
  if (typeof canonical !== 'string') return m;
  const url = cardUrl(canonical);
  if (!url) return m;
  const images = [{ url, ...OG_SIZE }];
  /*
   * type·siteName·locale을 함께 넣어야 한다.
   *
   * Next는 openGraph를 **통째로** 갈아 끼운다 — 페이지가 선언하면 루트
   * 레이아웃의 것이 남김없이 사라진다. 그래서 여기서 images만 얹었더니
   * 한국어 허브 열두 장에서 og:locale이 통째로 없어졌다. 번역 페이지는
   * 원래 openGraphFor를 직접 적고 있어서 멀쩡했고, 한국어만 조용히 빠졌다.
   * tests/hreflang-pairs.test.ts가 잡는다.
   *
   * m.openGraph를 기본값 뒤에 두어, 페이지가 적은 것은 그대로 이긴다.
   */
  const lang = split(canonical).lang;
  const base = openGraphFor(LOCALE_OF_LANG.get(lang) ?? 'ko');
  return {
    ...m,
    openGraph: { ...base, ...m.openGraph, images },
    twitter: { ...m.twitter, images },
  };
}

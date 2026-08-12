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
  'air': () => import('./pages/air__slug'),
  'altitude': () => import('./pages/altitude__slug'),
  'ampere': () => import('./pages/ampere__slug'),
  'ascii': () => import('./pages/ascii__slug'),
  'bandwidth': () => import('./pages/bandwidth__slug'),
  'battery': () => import('./pages/battery__slug'),
  'bed': () => import('./pages/bed__slug'),
  'bignum': () => import('./pages/bignum__slug'),
  'blood': () => import('./pages/blood__slug'),
  'body': () => import('./pages/body__slug'),
  'bpm': () => import('./pages/bpm__slug'),
  'bra': () => import('./pages/bra__slug'),
  'cable': () => import('./pages/cable__slug'),
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
  'darts': () => import('./pages/darts__slug'),
  'dew': () => import('./pages/dew__slug'),
  'dof': () => import('./pages/dof__slug'),
  'drill': () => import('./pages/drill__slug'),
  'drink': () => import('./pages/drink__slug'),
  'element': () => import('./pages/element__slug'),
  'emoji': () => import('./pages/emoji__slug'),
  'error': () => import('./pages/error__slug'),
  'exposure': () => import('./pages/exposure__slug'),
  'ext': () => import('./pages/ext__slug'),
  'filament': () => import('./pages/filament__slug'),
  'flight': () => import('./pages/flight__slug'),
  'food': () => import('./pages/food__slug'),
  'fraction': () => import('./pages/fraction__slug'),
  'fret': () => import('./pages/fret__slug'),
  'gear': () => import('./pages/gear__slug'),
  'generator': () => import('./pages/generator__slug'),
  'gengo': () => import('./pages/gengo__slug'),
  'geometry': () => import('./pages/geometry__slug'),
  'golf': () => import('./pages/golf__slug'),
  'gravity': () => import('./pages/gravity__slug'),
  'hanja': () => import('./pages/hanja__slug'),
  'heredity': () => import('./pages/heredity__slug'),
  'hike': () => import('./pages/hike__slug'),
  'html': () => import('./pages/html__slug'),
  'http': () => import('./pages/http__slug'),
  'insul': () => import('./pages/insul__slug'),
  'keycode': () => import('./pages/keycode__slug'),
  'lumber': () => import('./pages/lumber__slug'),
  'lumen': () => import('./pages/lumen__slug'),
  'metro': () => import('./pages/metro__slug'),
  'microwave': () => import('./pages/microwave__slug'),
  'music': () => import('./pages/music__slug'),
  'number': () => import('./pages/number__slug'),
  'pace': () => import('./pages/pace__slug'),
  'paper': () => import('./pages/paper__slug'),
  'password': () => import('./pages/password__slug'),
  'petfood': () => import('./pages/petfood__slug'),
  'port': () => import('./pages/port__slug'),
  'powerbank': () => import('./pages/powerbank__slug'),
  'purifier': () => import('./pages/purifier__slug'),
  'quake': () => import('./pages/quake__slug'),
  'quiz': () => import('./pages/quiz__slug'),
  'raid': () => import('./pages/raid__slug'),
  'random': () => import('./pages/random__slug'),
  'rate': () => import('./pages/rate__slug'),
  'rem': () => import('./pages/rem__slug'),
  'resistor': () => import('./pages/resistor__slug'),
  'roman': () => import('./pages/roman__slug'),
  'screw': () => import('./pages/screw__slug'),
  'shortcut': () => import('./pages/shortcut__slug'),
  'size': () => import('./pages/size__slug'),
  'sqrt': () => import('./pages/sqrt__slug'),
  'stop': () => import('./pages/stop__slug'),
  'tatami': () => import('./pages/tatami__slug'),
  'test': () => import('./pages/test__slug'),
  'time': () => import('./pages/time__slug'),
  'times': () => import('./pages/times__slug'),
  'tire': () => import('./pages/tire__slug'),
  'torque': () => import('./pages/torque__slug'),
  'uv': () => import('./pages/uv__slug'),
  'viewing': () => import('./pages/viewing__slug'),
  'wifi': () => import('./pages/wifi__slug'),
  'windchill': () => import('./pages/windchill__slug'),
  'wine': () => import('./pages/wine__slug'),
  'wire': () => import('./pages/wire__slug'),
  'year': () => import('./pages/year__slug'),
};

/** 두 칸 갈래 — /game/chess/[slug] 꼴 */
export const KO_DEEP_LEAVES: Record<string, () => Promise<KoLeaf>> = {
  'device/screen': () => import('./pages/device__screen__slug'),
  'fortune/card': () => import('./pages/fortune__card__slug'),
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

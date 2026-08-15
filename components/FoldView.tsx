'use client';
/*
 * 라우트의 클라이언트 청크를 낱장 단위로 가르는 디스패처.
 *
 * ── 왜 이것이 필요한가 (실측 2026-08-15) ────────────────────
 * Turbopack은 라우트마다 클라이언트 청크 그룹을 **하나만** 만든다. 그 라우트의
 * 서버 그래프가 닿는 클라이언트 컴포넌트 전부가 한 덩이가 되어, 화면에 하나만
 * 그려도 전부 <script src>로 나간다. 등록부의 () => import()는 **서버 그래프의**
 * 지연 경계일 뿐이라 이것을 못 가른다(허브 캐치올 하나가 16.5MB였다).
 *
 * 가르는 자리는 **클라이언트 모듈 안의 import()**뿐이다 — 여기가 그 자리다.
 * 여기서 부르는 모듈은 저마다 async 청크가 되고, 라우트가 지고 가는 것은 이
 * 파일과 껍데기뿐이다. SSR은 그대로다 — 서버에서 풀어 마크업을 다 그린다.
 *
 * ── Suspense 경계를 두지 않는 까닭 ──────────────────────────
 * 낱장 뷰 안의 notFound()는 **경계가 있으면 404를 못 낸다.** React가 껍데기를
 * 먼저 흘려보내(상태 200) 뒤늦게 던져진 not-found를 상태 코드에 못 싣는다 —
 * 없는 슬러그가 200으로 나가 색인에 쓰레기가 낀다. 실제로 지어서 재 봤다:
 *   Suspense 있음 → /en/color/<없는슬러그> = 200 (본문만 404 화면)
 *   Suspense 없음 → 404 ✓
 * 그래서 경계를 두지 않는다. 값은 스트리밍을 포기하는 것인데, 이 라우트들은
 * ISR로 캐시되므로 첫 바이트까지의 시간이 문제가 되지 않는다.
 * **경계를 도로 씌우면 없는 슬러그 십만 개가 200으로 나간다.**
 *
 * ── 약속을 props에 매어 두는 까닭 ───────────────────────────
 * use()는 렌더가 다시 돌 때 **같은** 약속을 받아야 한다(새로 만들면 영원히
 * 서스펜드한다). 그런데 서버에서도 도는 코드라 모듈 수준 Map에 쌓으면 페이지
 * 이십팔만 장이 그대로 샌다. props 객체는 서스펜드-재시도 사이에 동일하고
 * 쓰임이 끝나면 회수되므로 WeakMap의 열쇠로 딱 맞다.
 *
 * ── 새 페이지를 낼 때 ───────────────────────────────────────
 * 이 표는 lib/fold/registry.ts·lib/ko/registry.ts에서 기계로 뽑는다. 한쪽만
 * 고치면 그 갈래가 조용히 죽으므로 tests/fold-routes.test.ts가 셋을 대조한다.
 */
import { use, type ReactNode } from 'react';
import type { FoldLang } from '@/lib/fold/lang';

type Params = Record<string, string>;
type Built = { Page: (a: { params: Promise<Params> }) => ReactNode | Promise<ReactNode> };

/* 값의 build(lang) 서명이 모듈마다 조금씩 달라(ConvertLang 등) 표는 느슨하게 두고
   부르는 자리에서 한 번 맞춘다 */
type Loader = () => Promise<unknown>;

/* 국제 뷰 — lib/fold/pages/*.tsx */
const FOLD: Record<string, Loader> = {
  'air': () => import('@/lib/fold/pages/air'),
  'ascii': () => import('@/lib/fold/pages/ascii'),
  'body': () => import('@/lib/fold/pages/body'),
  'body__bmi__slug': () => import('@/lib/fold/pages/body__bmi__slug'),
  'body__exercise__slug': () => import('@/lib/fold/pages/body__exercise__slug'),
  'calculator': () => import('@/lib/fold/pages/calculator'),
  'checklist': () => import('@/lib/fold/pages/checklist'),
  'chmod': () => import('@/lib/fold/pages/chmod'),
  'cidr': () => import('@/lib/fold/pages/cidr'),
  'cmd': () => import('@/lib/fold/pages/cmd'),
  'code': () => import('@/lib/fold/pages/code'),
  'color': () => import('@/lib/fold/pages/color'),
  'color__colorblind': () => import('@/lib/fold/pages/color__colorblind'),
  'color__contrast': () => import('@/lib/fold/pages/color__contrast'),
  'color__gradient': () => import('@/lib/fold/pages/color__gradient'),
  'color__mixer': () => import('@/lib/fold/pages/color__mixer'),
  'color__name': () => import('@/lib/fold/pages/color__name'),
  'color__palette': () => import('@/lib/fold/pages/color__palette'),
  'color__random': () => import('@/lib/fold/pages/color__random'),
  'color__shades': () => import('@/lib/fold/pages/color__shades'),
  'color__shadow': () => import('@/lib/fold/pages/color__shadow'),
  'color__temperature': () => import('@/lib/fold/pages/color__temperature'),
  'convert': () => import('@/lib/fold/pages/convert'),
  'convert__value': () => import('@/lib/fold/pages/convert__value'),
  'country': () => import('@/lib/fold/pages/country'),
  'craft': () => import('@/lib/fold/pages/craft'),
  'css': () => import('@/lib/fold/pages/css'),
  'date__slug': () => import('@/lib/fold/pages/date__slug'),
  'device': () => import('@/lib/fold/pages/device'),
  'device__gamepad': () => import('@/lib/fold/pages/device__gamepad'),
  'device__info': () => import('@/lib/fold/pages/device__info'),
  'device__keyboard': () => import('@/lib/fold/pages/device__keyboard'),
  'device__mic': () => import('@/lib/fold/pages/device__mic'),
  'device__monitor': () => import('@/lib/fold/pages/device__monitor'),
  'device__mouse': () => import('@/lib/fold/pages/device__mouse'),
  'device__refresh-rate': () => import('@/lib/fold/pages/device__refresh-rate'),
  'device__screen': () => import('@/lib/fold/pages/device__screen'),
  'device__screen__slug': () => import('@/lib/fold/pages/device__screen__slug'),
  'device__speaker': () => import('@/lib/fold/pages/device__speaker'),
  'device__touch': () => import('@/lib/fold/pages/device__touch'),
  'device__webcam': () => import('@/lib/fold/pages/device__webcam'),
  'dpi': () => import('@/lib/fold/pages/dpi'),
  'emoji': () => import('@/lib/fold/pages/emoji'),
  'error': () => import('@/lib/fold/pages/error'),
  'ext': () => import('@/lib/fold/pages/ext'),
  'flight': () => import('@/lib/fold/pages/flight'),
  'food': () => import('@/lib/fold/pages/food'),
  'food__baking-pan': () => import('@/lib/fold/pages/food__baking-pan'),
  'food__coffee': () => import('@/lib/fold/pages/food__coffee'),
  'food__measure': () => import('@/lib/fold/pages/food__measure'),
  'food__oven': () => import('@/lib/fold/pages/food__oven'),
  'food__pasta': () => import('@/lib/fold/pages/food__pasta'),
  'food__recipe-scale': () => import('@/lib/fold/pages/food__recipe-scale'),
  'food__rice': () => import('@/lib/fold/pages/food__rice'),
  'food__salt': () => import('@/lib/fold/pages/food__salt'),
  'food__steak': () => import('@/lib/fold/pages/food__steak'),
  'food__storage': () => import('@/lib/fold/pages/food__storage'),
  'fortune': () => import('@/lib/fold/pages/fortune'),
  'fortune__animal': () => import('@/lib/fold/pages/fortune__animal'),
  'fortune__biorhythm': () => import('@/lib/fold/pages/fortune__biorhythm'),
  'fortune__birth-stone': () => import('@/lib/fold/pages/fortune__birth-stone'),
  'fortune__birthday__slug': () => import('@/lib/fold/pages/fortune__birthday__slug'),
  'fortune__blood-match': () => import('@/lib/fold/pages/fortune__blood-match'),
  'fortune__blood-type': () => import('@/lib/fold/pages/fortune__blood-type'),
  'fortune__card': () => import('@/lib/fold/pages/fortune__card'),
  'fortune__card__slug': () => import('@/lib/fold/pages/fortune__card__slug'),
  'fortune__daily': () => import('@/lib/fold/pages/fortune__daily'),
  'fortune__daily-tarot': () => import('@/lib/fold/pages/fortune__daily-tarot'),
  'fortune__dream': () => import('@/lib/fold/pages/fortune__dream'),
  'fortune__lucky-numbers': () => import('@/lib/fold/pages/fortune__lucky-numbers'),
  'fortune__mbti': () => import('@/lib/fold/pages/fortune__mbti'),
  'fortune__mbti-match': () => import('@/lib/fold/pages/fortune__mbti-match'),
  'fortune__saju': () => import('@/lib/fold/pages/fortune__saju'),
  'fortune__saju__slug': () => import('@/lib/fold/pages/fortune__saju__slug'),
  'fortune__star-match': () => import('@/lib/fold/pages/fortune__star-match'),
  'fortune__tarot': () => import('@/lib/fold/pages/fortune__tarot'),
  'fortune__tarot-yesno': () => import('@/lib/fold/pages/fortune__tarot-yesno'),
  'fortune__today-color': () => import('@/lib/fold/pages/fortune__today-color'),
  'fortune__zodiac': () => import('@/lib/fold/pages/fortune__zodiac'),
  'fortune__zodiac-match': () => import('@/lib/fold/pages/fortune__zodiac-match'),
  'fraction': () => import('@/lib/fold/pages/fraction'),
  'game': () => import('@/lib/fold/pages/game'),
  'game__2048': () => import('@/lib/fold/pages/game__2048'),
  'game__aim': () => import('@/lib/fold/pages/game__aim'),
  'game__beat': () => import('@/lib/fold/pages/game__beat'),
  'game__chess': () => import('@/lib/fold/pages/game__chess'),
  'game__chess__slug': () => import('@/lib/fold/pages/game__chess__slug'),
  'game__color-blind': () => import('@/lib/fold/pages/game__color-blind'),
  'game__cps': () => import('@/lib/fold/pages/game__cps'),
  'game__cube': () => import('@/lib/fold/pages/game__cube'),
  'game__cube__slug': () => import('@/lib/fold/pages/game__cube__slug'),
  'game__dot-count': () => import('@/lib/fold/pages/game__dot-count'),
  'game__hearing': () => import('@/lib/fold/pages/game__hearing'),
  'game__math': () => import('@/lib/fold/pages/game__math'),
  'game__memory': () => import('@/lib/fold/pages/game__memory'),
  'game__minesweeper': () => import('@/lib/fold/pages/game__minesweeper'),
  'game__nback': () => import('@/lib/fold/pages/game__nback'),
  'game__number-memory': () => import('@/lib/fold/pages/game__number-memory'),
  'game__peripheral': () => import('@/lib/fold/pages/game__peripheral'),
  'game__poker': () => import('@/lib/fold/pages/game__poker'),
  'game__poker__slug': () => import('@/lib/fold/pages/game__poker__slug'),
  'game__reaction': () => import('@/lib/fold/pages/game__reaction'),
  'game__rotation': () => import('@/lib/fold/pages/game__rotation'),
  'game__sequence': () => import('@/lib/fold/pages/game__sequence'),
  'game__sliding': () => import('@/lib/fold/pages/game__sliding'),
  'game__stroop': () => import('@/lib/fold/pages/game__stroop'),
  'game__sudoku': () => import('@/lib/fold/pages/game__sudoku'),
  'game__typing': () => import('@/lib/fold/pages/game__typing'),
  'generator': () => import('@/lib/fold/pages/generator'),
  'generator__en': () => import('@/lib/fold/pages/generator__en'),
  'geometry': () => import('@/lib/fold/pages/geometry'),
  'hanja': () => import('@/lib/fold/pages/hanja'),
  'home': () => import('@/lib/fold/pages/home'),
  'html': () => import('@/lib/fold/pages/html'),
  'http': () => import('@/lib/fold/pages/http'),
  'image': () => import('@/lib/fold/pages/image'),
  'image__adjust': () => import('@/lib/fold/pages/image__adjust'),
  'image__compress': () => import('@/lib/fold/pages/image__compress'),
  'image__convert': () => import('@/lib/fold/pages/image__convert'),
  'image__crop': () => import('@/lib/fold/pages/image__crop'),
  'image__favicon': () => import('@/lib/fold/pages/image__favicon'),
  'image__frame': () => import('@/lib/fold/pages/image__frame'),
  'image__merge': () => import('@/lib/fold/pages/image__merge'),
  'image__mosaic': () => import('@/lib/fold/pages/image__mosaic'),
  'image__palette': () => import('@/lib/fold/pages/image__palette'),
  'image__resize': () => import('@/lib/fold/pages/image__resize'),
  'image__rotate': () => import('@/lib/fold/pages/image__rotate'),
  'image__round': () => import('@/lib/fold/pages/image__round'),
  'image__size': () => import('@/lib/fold/pages/image__size'),
  'image__size__slug': () => import('@/lib/fold/pages/image__size__slug'),
  'image__split': () => import('@/lib/fold/pages/image__split'),
  'image__watermark': () => import('@/lib/fold/pages/image__watermark'),
  'keycode': () => import('@/lib/fold/pages/keycode'),
  'laundry': () => import('@/lib/fold/pages/laundry'),
  'metro': () => import('@/lib/fold/pages/metro'),
  'music': () => import('@/lib/fold/pages/music'),
  'number': () => import('@/lib/fold/pages/number'),
  'password': () => import('@/lib/fold/pages/password'),
  'percent': () => import('@/lib/fold/pages/percent'),
  'port': () => import('@/lib/fold/pages/port'),
  'quiz': () => import('@/lib/fold/pages/quiz'),
  'random': () => import('@/lib/fold/pages/random'),
  'random__dice': () => import('@/lib/fold/pages/random__dice'),
  'random__dice__slug': () => import('@/lib/fold/pages/random__dice__slug'),
  'rate': () => import('@/lib/fold/pages/rate'),
  'rem': () => import('@/lib/fold/pages/rem'),
  'roman': () => import('@/lib/fold/pages/roman'),
  'search': () => import('@/lib/fold/pages/search'),
  'shortcut': () => import('@/lib/fold/pages/shortcut'),
  'snap': () => import('@/lib/fold/pages/snap'),
  'snap__animal-face': () => import('@/lib/fold/pages/snap__animal-face'),
  'snap__backdrop': () => import('@/lib/fold/pages/snap__backdrop'),
  'snap__brows': () => import('@/lib/fold/pages/snap__brows'),
  'snap__contrast': () => import('@/lib/fold/pages/snap__contrast'),
  'snap__couple-match': () => import('@/lib/fold/pages/snap__couple-match'),
  'snap__distance': () => import('@/lib/fold/pages/snap__distance'),
  'snap__expression': () => import('@/lib/fold/pages/snap__expression'),
  'snap__eye-open': () => import('@/lib/fold/pages/snap__eye-open'),
  'snap__eye-spacing': () => import('@/lib/fold/pages/snap__eye-spacing'),
  'snap__face-reading': () => import('@/lib/fold/pages/snap__face-reading'),
  'snap__face-shape': () => import('@/lib/fold/pages/snap__face-shape'),
  'snap__face-symmetry': () => import('@/lib/fold/pages/snap__face-symmetry'),
  'snap__face-thirds': () => import('@/lib/fold/pages/snap__face-thirds'),
  'snap__first-impression': () => import('@/lib/fold/pages/snap__first-impression'),
  'snap__framing': () => import('@/lib/fold/pages/snap__framing'),
  'snap__golden-ratio': () => import('@/lib/fold/pages/snap__golden-ratio'),
  'snap__handwriting': () => import('@/lib/fold/pages/snap__handwriting'),
  'snap__head-pose': () => import('@/lib/fold/pages/snap__head-pose'),
  'snap__id-photo': () => import('@/lib/fold/pages/snap__id-photo'),
  'snap__lens': () => import('@/lib/fold/pages/snap__lens'),
  'snap__lens__slug': () => import('@/lib/fold/pages/snap__lens__slug'),
  'snap__lighting': () => import('@/lib/fold/pages/snap__lighting'),
  'snap__lips': () => import('@/lib/fold/pages/snap__lips'),
  'snap__mirror': () => import('@/lib/fold/pages/snap__mirror'),
  'snap__personal-color': () => import('@/lib/fold/pages/snap__personal-color'),
  'snap__photo-mood': () => import('@/lib/fold/pages/snap__photo-mood'),
  'snap__real-smile': () => import('@/lib/fold/pages/snap__real-smile'),
  'snap__sharpness': () => import('@/lib/fold/pages/snap__sharpness'),
  'snap__smile-score': () => import('@/lib/fold/pages/snap__smile-score'),
  'snap__white-balance': () => import('@/lib/fold/pages/snap__white-balance'),
  'sound': () => import('@/lib/fold/pages/sound'),
  'sound__binaural': () => import('@/lib/fold/pages/sound__binaural'),
  'sound__bpm-tap': () => import('@/lib/fold/pages/sound__bpm-tap'),
  'sound__decibel': () => import('@/lib/fold/pages/sound__decibel'),
  'sound__hz': () => import('@/lib/fold/pages/sound__hz'),
  'sound__hz__slug': () => import('@/lib/fold/pages/sound__hz__slug'),
  'sound__metronome': () => import('@/lib/fold/pages/sound__metronome'),
  'sound__mosquito': () => import('@/lib/fold/pages/sound__mosquito'),
  'sound__noise': () => import('@/lib/fold/pages/sound__noise'),
  'sound__pitch': () => import('@/lib/fold/pages/sound__pitch'),
  'sound__recorder': () => import('@/lib/fold/pages/sound__recorder'),
  'sound__tone': () => import('@/lib/fold/pages/sound__tone'),
  'sound__tuner': () => import('@/lib/fold/pages/sound__tuner'),
  'sqrt': () => import('@/lib/fold/pages/sqrt'),
  'test': () => import('@/lib/fold/pages/test'),
  'text': () => import('@/lib/fold/pages/text'),
  'text__case': () => import('@/lib/fold/pages/text__case'),
  'text__char': () => import('@/lib/fold/pages/text__char'),
  'text__char__slug': () => import('@/lib/fold/pages/text__char__slug'),
  'text__clean': () => import('@/lib/fold/pages/text__clean'),
  'text__dedupe': () => import('@/lib/fold/pages/text__dedupe'),
  'text__emoticon': () => import('@/lib/fold/pages/text__emoticon'),
  'text__lorem': () => import('@/lib/fold/pages/text__lorem'),
  'text__manuscript': () => import('@/lib/fold/pages/text__manuscript'),
  'text__mask': () => import('@/lib/fold/pages/text__mask'),
  'text__qr': () => import('@/lib/fold/pages/text__qr'),
  'text__regex': () => import('@/lib/fold/pages/text__regex'),
  'text__regex__slug': () => import('@/lib/fold/pages/text__regex__slug'),
  'text__replace': () => import('@/lib/fold/pages/text__replace'),
  'text__reverse': () => import('@/lib/fold/pages/text__reverse'),
  'text__slug': () => import('@/lib/fold/pages/text__slug'),
  'text__special-char': () => import('@/lib/fold/pages/text__special-char'),
  'text__table': () => import('@/lib/fold/pages/text__table'),
  'text__vertical': () => import('@/lib/fold/pages/text__vertical'),
  'text__wrap': () => import('@/lib/fold/pages/text__wrap'),
  'time': () => import('@/lib/fold/pages/time'),
  'time__alarm': () => import('@/lib/fold/pages/time__alarm'),
  'time__date-add': () => import('@/lib/fold/pages/time__date-add'),
  'time__lived': () => import('@/lib/fold/pages/time__lived'),
  'time__pomodoro': () => import('@/lib/fold/pages/time__pomodoro'),
  'time__stopwatch': () => import('@/lib/fold/pages/time__stopwatch'),
  'time__timer': () => import('@/lib/fold/pages/time__timer'),
  'time__timezone': () => import('@/lib/fold/pages/time__timezone'),
  'time__weeknumber': () => import('@/lib/fold/pages/time__weeknumber'),
  'time__workdays': () => import('@/lib/fold/pages/time__workdays'),
  'time__worldclock': () => import('@/lib/fold/pages/time__worldclock'),
  'times': () => import('@/lib/fold/pages/times'),
  'year': () => import('@/lib/fold/pages/year'),
};

/* 한국어 뷰 — lib/ko/pages/*.tsx */
const KO: Record<string, Loader> = {
  'air__slug': () => import('@/lib/ko/pages/air__slug'),
  'ascii__slug': () => import('@/lib/ko/pages/ascii__slug'),
  'body__bmi__slug': () => import('@/lib/ko/pages/body__bmi__slug'),
  'body__exercise__slug': () => import('@/lib/ko/pages/body__exercise__slug'),
  'body__slug': () => import('@/lib/ko/pages/body__slug'),
  'calculator__loan-method__slug': () => import('@/lib/ko/pages/calculator__loan-method__slug'),
  'calculator__salary__slug': () => import('@/lib/ko/pages/calculator__salary__slug'),
  'calculator__severance__slug': () => import('@/lib/ko/pages/calculator__severance__slug'),
  'checklist__slug': () => import('@/lib/ko/pages/checklist__slug'),
  'chmod__slug': () => import('@/lib/ko/pages/chmod__slug'),
  'cidr__slug': () => import('@/lib/ko/pages/cidr__slug'),
  'cmd__slug': () => import('@/lib/ko/pages/cmd__slug'),
  'code__slug': () => import('@/lib/ko/pages/code__slug'),
  'color__slug': () => import('@/lib/ko/pages/color__slug'),
  'convert__slug': () => import('@/lib/ko/pages/convert__slug'),
  'country__slug': () => import('@/lib/ko/pages/country__slug'),
  'craft__slug': () => import('@/lib/ko/pages/craft__slug'),
  'css__slug': () => import('@/lib/ko/pages/css__slug'),
  'date__slug': () => import('@/lib/ko/pages/date__slug'),
  'device__screen__slug': () => import('@/lib/ko/pages/device__screen__slug'),
  'dpi__slug': () => import('@/lib/ko/pages/dpi__slug'),
  'emoji__slug': () => import('@/lib/ko/pages/emoji__slug'),
  'error__slug': () => import('@/lib/ko/pages/error__slug'),
  'ext__slug': () => import('@/lib/ko/pages/ext__slug'),
  'flight__slug': () => import('@/lib/ko/pages/flight__slug'),
  'food__slug': () => import('@/lib/ko/pages/food__slug'),
  'fortune__birthday__slug': () => import('@/lib/ko/pages/fortune__birthday__slug'),
  'fortune__card__slug': () => import('@/lib/ko/pages/fortune__card__slug'),
  'fortune__saju__slug': () => import('@/lib/ko/pages/fortune__saju__slug'),
  'fraction__slug': () => import('@/lib/ko/pages/fraction__slug'),
  'game__chess__slug': () => import('@/lib/ko/pages/game__chess__slug'),
  'game__cube__slug': () => import('@/lib/ko/pages/game__cube__slug'),
  'game__poker__slug': () => import('@/lib/ko/pages/game__poker__slug'),
  'generator__slug': () => import('@/lib/ko/pages/generator__slug'),
  'geometry__slug': () => import('@/lib/ko/pages/geometry__slug'),
  'hanja__slug': () => import('@/lib/ko/pages/hanja__slug'),
  'html__slug': () => import('@/lib/ko/pages/html__slug'),
  'http__slug': () => import('@/lib/ko/pages/http__slug'),
  'image__size__slug': () => import('@/lib/ko/pages/image__size__slug'),
  'keycode__slug': () => import('@/lib/ko/pages/keycode__slug'),
  'laundry__slug': () => import('@/lib/ko/pages/laundry__slug'),
  'metro__slug': () => import('@/lib/ko/pages/metro__slug'),
  'music__slug': () => import('@/lib/ko/pages/music__slug'),
  'number__slug': () => import('@/lib/ko/pages/number__slug'),
  'password__slug': () => import('@/lib/ko/pages/password__slug'),
  'percent__slug': () => import('@/lib/ko/pages/percent__slug'),
  'port__slug': () => import('@/lib/ko/pages/port__slug'),
  'quiz__slug': () => import('@/lib/ko/pages/quiz__slug'),
  'random__dice__slug': () => import('@/lib/ko/pages/random__dice__slug'),
  'random__slug': () => import('@/lib/ko/pages/random__slug'),
  'rate__slug': () => import('@/lib/ko/pages/rate__slug'),
  'rem__slug': () => import('@/lib/ko/pages/rem__slug'),
  'roman__slug': () => import('@/lib/ko/pages/roman__slug'),
  'shortcut__slug': () => import('@/lib/ko/pages/shortcut__slug'),
  'snap__lens__slug': () => import('@/lib/ko/pages/snap__lens__slug'),
  'sound__hz__slug': () => import('@/lib/ko/pages/sound__hz__slug'),
  'sqrt__slug': () => import('@/lib/ko/pages/sqrt__slug'),
  'test__slug': () => import('@/lib/ko/pages/test__slug'),
  'text__char__slug': () => import('@/lib/ko/pages/text__char__slug'),
  'text__regex__slug': () => import('@/lib/ko/pages/text__regex__slug'),
  'time__slug': () => import('@/lib/ko/pages/time__slug'),
  'times__slug': () => import('@/lib/ko/pages/times__slug'),
  'year__slug': () => import('@/lib/ko/pages/year__slug'),
};

type FoldProps = { mod: string; lang: FoldLang | 'ko'; params?: Params };
type KoProps = { mod: string; params?: Params };

const pending = new WeakMap<object, Promise<ReactNode>>();

function held(props: object, make: () => Promise<ReactNode>) {
  let p = pending.get(props);
  if (!p) {
    p = make();
    /* 없는 슬러그면 뷰 안의 notFound()가 이 약속을 거절한다. use()가 그것을 받아
       404를 제대로 내지만, 약속 자체에 손잡이가 없으면 브라우저가
       "Uncaught (in promise)"를 세 줄 찍는다 — 빈 catch로 그것만 막는다.
       삼키는 것이 아니다: use()가 같은 거절을 그대로 다시 던진다. */
    p.catch(() => {});
    pending.set(props, p);
  }
  return p;
}

async function foldElement({ mod, lang, params }: FoldProps) {
  const m = (await FOLD[mod]()) as { build: (l: string) => Built };
  return m.build(lang).Page({ params: Promise.resolve(params ?? {}) });
}

async function koElement({ mod, params }: KoProps) {
  const m = (await KO[mod]()) as { default: (a: { params: Promise<Params> }) => ReactNode | Promise<ReactNode> };
  return m.default({ params: Promise.resolve(params ?? {}) });
}

export default function FoldView(props: FoldProps) {
  return use(held(props, () => foldElement(props)));
}

export function KoView(props: KoProps) {
  return use(held(props, () => koElement(props)));
}

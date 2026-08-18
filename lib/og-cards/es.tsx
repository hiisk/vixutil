/**
 * 스페인어 공유 카드 — 경로에서 카드로 가는 대응표.
 *
 * 전에는 app 곳곳의 opengraph-image.tsx 1,799장이 이 일을 했다. 파일 규약이라
 * 편했지만 장마다 라우트 엔트리가 하나씩 생겨서, 컴파일 비용의 다섯 분의 넷을
 * 그것들이 썼다(카드를 치우면 컴파일이 4.3분에서 99초로 줄었다). 2코어 8GB
 * 빌드 컨테이너가 그 무게로 죽었다.
 *
 * 그래서 카드는 그대로 두고 **엔트리만** 접었다. 1,799개 라우트가 언어마다
 * 모듈 하나씩, 모두 열 개가 됐다. 그리는 것은 app/og/[...slug]/route.tsx 하나다.
 *
 * 키는 언어 접두사를 뺀 라우트다 — ''는 첫 화면, 'color/name'은 /color/name.
 * 낱장은 자기 섹션 카드를 쓴다(전에 파일 규약이 물려주던 것과 같다).
 * 그 물려주기는 lib/og-cards/index.ts의 cardFor가 한다.
 */
import type { ReactElement } from 'react';
import { newSnapCard } from '@/lib/snap/card';

import { hubCard as flightHub } from '@/lib/flight/route';
import { hubCard as passwordHub } from '@/lib/password/route';
import { hubCard as asciiHub } from '@/lib/ascii/route';
import { BODY_SECTION } from '@/lib/body-section';
import { hubCard as chessHub } from '@/lib/chess/route';
import { hubCard as chmodHub } from '@/lib/chmod/route';
import { hubCard as cidrHub } from '@/lib/cidr/route';
import { hubCard as codeHub } from '@/lib/code/route';
import { COUNTRY_SECTION, COUNTRY_UI } from '@/lib/country-ui';
import { hubCard as cssHub } from '@/lib/css/route';
import { hubCard as cubeHub } from '@/lib/cube/route';
import { hubCard as deviceHub } from '@/lib/device/route';
import { hubCard as diceHub } from '@/lib/dice/route';
import { hubCard as extHub } from '@/lib/ext/route';
import { sectionMeta } from '@/lib/formula/section';
import { hubCard as fractionHub } from '@/lib/fraction/route';
import { GEO_SECTION } from '@/lib/geo-section';
import { CRAFT_SECTION } from '@/lib/craft-section';
import { hubCard as glyphHub } from '@/lib/glyph/route';
import { HANJA_SECTION, HANJA_UI } from '@/lib/hanja-ui';
import { hubCard as htmlHub } from '@/lib/html/route';
import { hubCard as httpHub } from '@/lib/http/route';
import { hubCard as cmdHub } from '@/lib/cmd/route';
import { hubCard as scHub } from '@/lib/shortcut/route';
import { hubCard as emojiHub } from '@/lib/emoji/route';
import { hubCard as errHub } from '@/lib/errmsg/route';
import { hubCard as imgsizeHub } from '@/lib/imgsize/route';
import { hubCard as keycodeHub } from '@/lib/keycode/route';
import { hubCard as lensHub } from '@/lib/lens/route';
import { hubCard as metroHub } from '@/lib/metro/route';
import { hubCard as musicHub } from '@/lib/music/route';
import { hubCard as numberHub } from '@/lib/number/route';
import { colorOg, deviceOg, foodOg, gameOg, imageOg, intlOg, soundOg, textOg, timeOg } from '@/lib/og-intl';
import { ogCard } from '@/lib/og-template';
import { hubCard as pokerHub } from '@/lib/poker/route';
import { hubCard as portHub } from '@/lib/port/route';
import { RATE_SECTION } from '@/lib/rate-section';
import { hubCard as regexHub } from '@/lib/regex/route';
import { hubCard as remHub } from '@/lib/rem/route';
import { hubCard as romanHub } from '@/lib/roman/route';
import { hubCard as soundHub } from '@/lib/sound/route';
import { hubCard as percentHub } from '@/lib/percent/route';
import { hubCard as sqrtHub } from '@/lib/sqrt/route';
import { hubCard as tarotHub } from '@/lib/tarot/route';
import { hubCard as timesHub } from '@/lib/times/route';
import { hubCard as yearHub } from '@/lib/year/route';

export const CARDS: Record<string, () => ReactElement> = {
  'snap/lighting': () => newSnapCard('es', 'lighting'),
  'snap/sharpness': () => newSnapCard('es', 'sharpness'),
  'snap/face-thirds': () => newSnapCard('es', 'face-thirds'),
  'snap/eye-spacing': () => newSnapCard('es', 'eye-spacing'),
  'snap/face-shape': () => newSnapCard('es', 'face-shape'),
  'snap/brows': () => newSnapCard('es', 'brows'),
  'snap/lips': () => newSnapCard('es', 'lips'),
  'snap/contrast': () => newSnapCard('es', 'contrast'),
  'snap/backdrop': () => newSnapCard('es', 'backdrop'),
  'snap/white-balance': () => newSnapCard('es', 'white-balance'),
  'snap/distance': () => newSnapCard('es', 'distance'),
  'snap/mirror': () => newSnapCard('es', 'mirror'),
  'snap/id-photo': () => newSnapCard('es', 'id-photo'),
  'snap/head-pose': () => newSnapCard('es', 'head-pose'),
  'snap/real-smile': () => newSnapCard('es', 'real-smile'),
  'snap/eye-open': () => newSnapCard('es', 'eye-open'),
  'snap/framing': () => newSnapCard('es', 'framing'),
  '': () => intlOg('home/es'),
  'flight': () => flightHub('es'),
  'password': () => passwordHub('es'),
  'ascii': () => asciiHub('es'),
  'body': () => {
    const meta = sectionMeta(BODY_SECTION, 'es');
    return ogCard({
      icon: '🩺',
      eyebrow: meta.section,
      title: meta.hubTitle,
      desc: meta.hubLead,
      from: BODY_SECTION.ogFrom,
      to: BODY_SECTION.ogTo,
    });
  },
  'calculator': () => intlOg('calculator/es'),
  'checklist': () => intlOg('checklist/es'),
  'chmod': () => chmodHub('es'),
  'cidr': () => cidrHub('es'),
  'code': () => codeHub('es'),
  'color': () => intlOg('color/es'),
  'color/colorblind': () => colorOg('colorblind', 'es'),
  'color/contrast': () => colorOg('contrast', 'es'),
  'color/gradient': () => colorOg('gradient', 'es'),
  'color/mixer': () => colorOg('mixer', 'es'),
  'color/name': () => colorOg('name', 'es'),
  'color/palette': () => colorOg('palette', 'es'),
  'color/random': () => colorOg('random', 'es'),
  'color/shades': () => colorOg('shades', 'es'),
  'color/shadow': () => colorOg('shadow', 'es'),
  'color/temperature': () => colorOg('temperature', 'es'),
  'convert': () => intlOg('convert/es'),
  'country': () => {
    const ui = COUNTRY_UI['es'];
    return ogCard({
      icon: '🧭',
      eyebrow: ui.section,
      title: ui.hubTitle,
      desc: ui.hubLead,
      from: COUNTRY_SECTION.ogFrom,
      to: COUNTRY_SECTION.ogTo,
    });
  },
  'css': () => cssHub('es'),
  'device': () => intlOg('device/es'),
  'device/gamepad': () => deviceOg('gamepad', 'es'),
  'device/info': () => deviceOg('info', 'es'),
  'device/keyboard': () => deviceOg('keyboard', 'es'),
  'device/mic': () => deviceOg('mic', 'es'),
  'device/monitor': () => deviceOg('monitor', 'es'),
  'device/mouse': () => deviceOg('mouse', 'es'),
  'device/refresh-rate': () => deviceOg('refresh-rate', 'es'),
  'device/screen': () => deviceHub('es'),
  'device/speaker': () => deviceOg('speaker', 'es'),
  'device/touch': () => deviceOg('touch', 'es'),
  'device/webcam': () => deviceOg('webcam', 'es'),
  'ext': () => extHub('es'),
  'food': () => intlOg('food/es'),
  'food/baking-pan': () => foodOg('baking-pan', 'es'),
  'food/coffee': () => foodOg('coffee', 'es'),
  'food/measure': () => foodOg('measure', 'es'),
  'food/oven': () => foodOg('oven', 'es'),
  'food/pasta': () => foodOg('pasta', 'es'),
  'food/recipe-scale': () => foodOg('recipe-scale', 'es'),
  'food/rice': () => foodOg('rice', 'es'),
  'food/salt': () => foodOg('salt', 'es'),
  'food/steak': () => foodOg('steak', 'es'),
  'food/storage': () => foodOg('storage', 'es'),
  'fortune': () => intlOg('fortune/es'),
  'fortune/animal': () => intlOg('fortune/animal/es'),
  'fortune/biorhythm': () => intlOg('fortune/biorhythm/es'),
  'fortune/birth-stone': () => intlOg('fortune/birth-stone/es'),
  'fortune/blood-match': () => intlOg('fortune/blood-match/es'),
  'fortune/blood-type': () => intlOg('fortune/blood-type/es'),
  'fortune/card': () => tarotHub('es'),
  'fortune/daily': () => intlOg('fortune/daily/es'),
  'fortune/daily-tarot': () => intlOg('fortune/daily-tarot/es'),
  'fortune/dream': () => intlOg('fortune/dream/es'),
  'fortune/lucky-numbers': () => intlOg('fortune/lucky-numbers/es'),
  'fortune/mbti': () => intlOg('fortune/mbti/es'),
  'fortune/mbti-match': () => intlOg('fortune/mbti-match/es'),
  'fortune/saju': () => intlOg('fortune/saju/es'),
  'fortune/star-match': () => intlOg('fortune/star-match/es'),
  'fortune/tarot': () => intlOg('fortune/tarot/es'),
  'fortune/tarot-yesno': () => intlOg('fortune/tarot-yesno/es'),
  'fortune/today-color': () => intlOg('fortune/today-color/es'),
  'fortune/zodiac': () => intlOg('fortune/zodiac/es'),
  'fortune/zodiac-match': () => intlOg('fortune/zodiac-match/es'),
  'fraction': () => fractionHub('es'),
  'game': () => intlOg('game/es'),
  'game/sliding': () => gameOg('sliding', 'es'),
  'game/sudoku': () => gameOg('sudoku', 'es'),
  'game/minesweeper': () => gameOg('minesweeper', 'es'),
  'game/2048': () => gameOg('2048', 'es'),
  'game/aim': () => gameOg('aim', 'es'),
  'game/chess': () => chessHub('es'),
  'game/color-blind': () => gameOg('color-blind', 'es'),
  'game/cps': () => gameOg('cps', 'es'),
  'game/cube': () => cubeHub('es'),
  'game/hearing': () => gameOg('hearing', 'es'),
  'game/math': () => gameOg('math', 'es'),
  'game/memory': () => gameOg('memory', 'es'),
  'game/number-memory': () => gameOg('number-memory', 'es'),
  'game/poker': () => pokerHub('es'),
  'game/reaction': () => gameOg('reaction', 'es'),
  'game/sequence': () => gameOg('sequence', 'es'),
  'game/typing': () => gameOg('typing', 'es'),
  'game/stroop': () => gameOg('stroop', 'es'),
  'game/dot-count': () => gameOg('dot-count', 'es'),
  'game/nback': () => gameOg('nback', 'es'),
  'game/rotation': () => gameOg('rotation', 'es'),
  'game/beat': () => gameOg('beat', 'es'),
  'game/peripheral': () => gameOg('peripheral', 'es'),
  'generator': () => intlOg('generator/es'),
  // 잘못 지웠던 것을 되살림 — craft는 공식 계산기 40종이다
  'craft': () => {
    const meta = sectionMeta(CRAFT_SECTION, 'es');
    return ogCard({
      icon: '🧶',
      eyebrow: meta.section,
      title: meta.hubTitle,
      desc: meta.hubLead,
      from: CRAFT_SECTION.ogFrom,
      to: CRAFT_SECTION.ogTo,
    });
  },
  'geometry': () => {
    const meta = sectionMeta(GEO_SECTION, 'es');
    return ogCard({
      icon: '📐',
      eyebrow: meta.section,
      title: meta.hubTitle,
      desc: meta.hubLead,
      from: GEO_SECTION.ogFrom,
      to: GEO_SECTION.ogTo,
    });
  },
  'hanja': () => {
    const ui = HANJA_UI['es'];
    return ogCard({
      icon: '📖',
      eyebrow: ui.section,
      title: ui.hubTitle,
      desc: ui.hubLead,
      from: HANJA_SECTION.ogFrom,
      to: HANJA_SECTION.ogTo,
    });
  },
  'html': () => htmlHub('es'),
  'cmd': () => cmdHub('es'),
  'shortcut': () => scHub('es'),
  'emoji': () => emojiHub('es'),
  'error': () => errHub('es'),
  'http': () => httpHub('es'),
  'image': () => intlOg('image/es'),
  'image/compress': () => imageOg('compress', 'es'),
  'image/convert': () => imageOg('convert', 'es'),
  'image/crop': () => imageOg('crop', 'es'),
  'image/merge': () => imageOg('merge', 'es'),
  'image/mosaic': () => imageOg('mosaic', 'es'),
  'image/palette': () => imageOg('palette', 'es'),
  'image/resize': () => imageOg('resize', 'es'),
  'image/rotate': () => imageOg('rotate', 'es'),
  'image/watermark': () => imageOg('watermark', 'es'),
  'image/adjust': () => imageOg('adjust', 'es'),
  'image/frame': () => imageOg('frame', 'es'),
  'image/round': () => imageOg('round', 'es'),
  'image/split': () => imageOg('split', 'es'),
  'image/favicon': () => imageOg('favicon', 'es'),
  'image/size': () => imgsizeHub('es'),
  'keycode': () => keycodeHub('es'),
  'metro': () => metroHub('es'),
  'music': () => musicHub('es'),
  'number': () => numberHub('es'),
  'port': () => portHub('es'),
  'quiz': () => intlOg('quiz/es'),
  'random': () => intlOg('random/es'),
  'random/dice': () => diceHub('es'),
  'rate': () => {
    const meta = sectionMeta(RATE_SECTION, 'es');
    return ogCard({
      icon: '📐',
      eyebrow: meta.section,
      title: meta.hubTitle,
      desc: meta.hubLead,
      from: RATE_SECTION.ogFrom,
      to: RATE_SECTION.ogTo,
    });
  },
  'rem': () => remHub('es'),
  'roman': () => romanHub('es'),
  'search': () => intlOg('search/es'),
  'snap': () => intlOg('snap/es'),
  'snap/animal-face': () => intlOg('snap/animal-face/es'),
  'snap/couple-match': () => intlOg('snap/couple-match/es'),
  'snap/expression': () => intlOg('snap/expression/es'),
  'snap/face-reading': () => intlOg('snap/face-reading/es'),
  'snap/face-symmetry': () => intlOg('snap/face-symmetry/es'),
  'snap/first-impression': () => intlOg('snap/first-impression/es'),
  'snap/golden-ratio': () => intlOg('snap/golden-ratio/es'),
  'snap/handwriting': () => intlOg('snap/handwriting/es'),
  'snap/lens': () => lensHub('es'),
  'snap/personal-color': () => intlOg('snap/personal-color/es'),
  'snap/photo-mood': () => intlOg('snap/photo-mood/es'),
  'snap/smile-score': () => intlOg('snap/smile-score/es'),
  'sound': () => intlOg('sound/es'),
  'sound/binaural': () => soundOg('binaural', 'es'),
  'sound/bpm-tap': () => soundOg('bpm-tap', 'es'),
  'sound/decibel': () => soundOg('decibel', 'es'),
  'sound/hz': () => soundHub('es'),
  'sound/metronome': () => soundOg('metronome', 'es'),
  'sound/mosquito': () => soundOg('mosquito', 'es'),
  'sound/noise': () => soundOg('noise', 'es'),
  'sound/pitch': () => soundOg('pitch', 'es'),
  'sound/recorder': () => soundOg('recorder', 'es'),
  'sound/tone': () => soundOg('tone', 'es'),
  'sound/tuner': () => soundOg('tuner', 'es'),
  'percent': () => percentHub('es'),
  'sqrt': () => sqrtHub('es'),
  'test': () => intlOg('test/es'),
  'text': () => intlOg('text/es'),
  'text/case': () => textOg('case', 'es'),
  'text/char': () => glyphHub('es'),
  'text/clean': () => textOg('clean', 'es'),
  'text/dedupe': () => textOg('dedupe', 'es'),
  'text/emoticon': () => textOg('emoticon', 'es'),
  'text/lorem': () => textOg('lorem', 'es'),
  'text/manuscript': () => textOg('manuscript', 'es'),
  'text/regex': () => regexHub('es'),
  'text/replace': () => textOg('replace', 'es'),
  'text/mask': () => textOg('mask', 'es'),
  'text/wrap': () => textOg('wrap', 'es'),
  'text/table': () => textOg('table', 'es'),
  'text/slug': () => textOg('slug', 'es'),
  'text/reverse': () => textOg('reverse', 'es'),
  'text/qr': () => textOg('qr', 'es'),
  'text/vertical': () => textOg('vertical', 'es'),
  'text/special-char': () => textOg('special-char', 'es'),
  'time': () => intlOg('time/es'),
  'time/alarm': () => timeOg('alarm', 'es'),
  'time/date-add': () => timeOg('date-add', 'es'),
  'time/lived': () => timeOg('lived', 'es'),
  'time/pomodoro': () => timeOg('pomodoro', 'es'),
  'time/stopwatch': () => timeOg('stopwatch', 'es'),
  'time/timer': () => timeOg('timer', 'es'),
  'time/timezone': () => timeOg('timezone', 'es'),
  'time/weeknumber': () => timeOg('weeknumber', 'es'),
  'time/workdays': () => timeOg('workdays', 'es'),
  'time/worldclock': () => timeOg('worldclock', 'es'),
  'times': () => timesHub('es'),
  'year': () => yearHub('es'),
};

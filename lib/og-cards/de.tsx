/**
 * 독일어 공유 카드 — 경로에서 카드로 가는 대응표.
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

import { hubCard as passwordHub } from '@/lib/password/route';
import { hubCard as asciiHub } from '@/lib/ascii/route';
import { BODY_SECTION } from '@/lib/body-section';
import { hubCard as chessHub } from '@/lib/chess/route';
import { hubCard as chmodHub } from '@/lib/chmod/route';
import { hubCard as cidrHub } from '@/lib/cidr/route';
import { hubCard as codeHub } from '@/lib/code/route';
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
import { hubCard as httpHub } from '@/lib/http/route';
import { hubCard as cmdHub } from '@/lib/cmd/route';
import { hubCard as scHub } from '@/lib/shortcut/route';
import { hubCard as emojiHub } from '@/lib/emoji/route';
import { hubCard as imgsizeHub } from '@/lib/imgsize/route';
import { hubCard as keycodeHub } from '@/lib/keycode/route';
import { hubCard as lensHub } from '@/lib/lens/route';
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
  'snap/lighting': () => newSnapCard('de', 'lighting'),
  'snap/sharpness': () => newSnapCard('de', 'sharpness'),
  'snap/face-thirds': () => newSnapCard('de', 'face-thirds'),
  'snap/eye-spacing': () => newSnapCard('de', 'eye-spacing'),
  'snap/face-shape': () => newSnapCard('de', 'face-shape'),
  'snap/brows': () => newSnapCard('de', 'brows'),
  'snap/lips': () => newSnapCard('de', 'lips'),
  'snap/contrast': () => newSnapCard('de', 'contrast'),
  'snap/backdrop': () => newSnapCard('de', 'backdrop'),
  'snap/white-balance': () => newSnapCard('de', 'white-balance'),
  'snap/distance': () => newSnapCard('de', 'distance'),
  'snap/mirror': () => newSnapCard('de', 'mirror'),
  'snap/id-photo': () => newSnapCard('de', 'id-photo'),
  'snap/head-pose': () => newSnapCard('de', 'head-pose'),
  'snap/real-smile': () => newSnapCard('de', 'real-smile'),
  'snap/eye-open': () => newSnapCard('de', 'eye-open'),
  'snap/framing': () => newSnapCard('de', 'framing'),
  '': () => intlOg('home/de'),
  'password': () => passwordHub('de'),
  'ascii': () => asciiHub('de'),
  'body': () => {
    const meta = sectionMeta(BODY_SECTION, 'de');
    return ogCard({
      icon: '🩺',
      eyebrow: meta.section,
      title: meta.hubTitle,
      desc: meta.hubLead,
      from: BODY_SECTION.ogFrom,
      to: BODY_SECTION.ogTo,
    });
  },
  'calculator': () => intlOg('calculator/de'),
  'checklist': () => intlOg('checklist/de'),
  'chmod': () => chmodHub('de'),
  'cidr': () => cidrHub('de'),
  'code': () => codeHub('de'),
  'color': () => intlOg('color/de'),
  'color/colorblind': () => colorOg('colorblind', 'de'),
  'color/contrast': () => colorOg('contrast', 'de'),
  'color/gradient': () => colorOg('gradient', 'de'),
  'color/mixer': () => colorOg('mixer', 'de'),
  'color/name': () => colorOg('name', 'de'),
  'color/palette': () => colorOg('palette', 'de'),
  'color/random': () => colorOg('random', 'de'),
  'color/shades': () => colorOg('shades', 'de'),
  'color/shadow': () => colorOg('shadow', 'de'),
  'color/temperature': () => colorOg('temperature', 'de'),
  'convert': () => intlOg('convert/de'),
  'device': () => intlOg('device/de'),
  'device/gamepad': () => deviceOg('gamepad', 'de'),
  'device/info': () => deviceOg('info', 'de'),
  'device/keyboard': () => deviceOg('keyboard', 'de'),
  'device/mic': () => deviceOg('mic', 'de'),
  'device/monitor': () => deviceOg('monitor', 'de'),
  'device/mouse': () => deviceOg('mouse', 'de'),
  'device/refresh-rate': () => deviceOg('refresh-rate', 'de'),
  'device/screen': () => deviceHub('de'),
  'device/speaker': () => deviceOg('speaker', 'de'),
  'device/touch': () => deviceOg('touch', 'de'),
  'device/webcam': () => deviceOg('webcam', 'de'),
  'ext': () => extHub('de'),
  'food': () => intlOg('food/de'),
  'food/baking-pan': () => foodOg('baking-pan', 'de'),
  'food/coffee': () => foodOg('coffee', 'de'),
  'food/measure': () => foodOg('measure', 'de'),
  'food/oven': () => foodOg('oven', 'de'),
  'food/pasta': () => foodOg('pasta', 'de'),
  'food/recipe-scale': () => foodOg('recipe-scale', 'de'),
  'food/rice': () => foodOg('rice', 'de'),
  'food/salt': () => foodOg('salt', 'de'),
  'food/steak': () => foodOg('steak', 'de'),
  'food/storage': () => foodOg('storage', 'de'),
  'fortune': () => intlOg('fortune/de'),
  'fortune/animal': () => intlOg('fortune/animal/de'),
  'fortune/biorhythm': () => intlOg('fortune/biorhythm/de'),
  'fortune/birth-stone': () => intlOg('fortune/birth-stone/de'),
  'fortune/blood-match': () => intlOg('fortune/blood-match/de'),
  'fortune/blood-type': () => intlOg('fortune/blood-type/de'),
  'fortune/card': () => tarotHub('de'),
  'fortune/daily': () => intlOg('fortune/daily/de'),
  'fortune/daily-tarot': () => intlOg('fortune/daily-tarot/de'),
  'fortune/dream': () => intlOg('fortune/dream/de'),
  'fortune/lucky-numbers': () => intlOg('fortune/lucky-numbers/de'),
  'fortune/mbti': () => intlOg('fortune/mbti/de'),
  'fortune/mbti-match': () => intlOg('fortune/mbti-match/de'),
  'fortune/saju': () => intlOg('fortune/saju/de'),
  'fortune/star-match': () => intlOg('fortune/star-match/de'),
  'fortune/tarot': () => intlOg('fortune/tarot/de'),
  'fortune/tarot-yesno': () => intlOg('fortune/tarot-yesno/de'),
  'fortune/today-color': () => intlOg('fortune/today-color/de'),
  'fortune/zodiac': () => intlOg('fortune/zodiac/de'),
  'fortune/zodiac-match': () => intlOg('fortune/zodiac-match/de'),
  'fraction': () => fractionHub('de'),
  'game': () => intlOg('game/de'),
  'game/sliding': () => gameOg('sliding', 'de'),
  'game/sudoku': () => gameOg('sudoku', 'de'),
  'game/minesweeper': () => gameOg('minesweeper', 'de'),
  'game/2048': () => gameOg('2048', 'de'),
  'game/aim': () => gameOg('aim', 'de'),
  'game/chess': () => chessHub('de'),
  'game/color-blind': () => gameOg('color-blind', 'de'),
  'game/cps': () => gameOg('cps', 'de'),
  'game/cube': () => cubeHub('de'),
  'game/hearing': () => gameOg('hearing', 'de'),
  'game/math': () => gameOg('math', 'de'),
  'game/memory': () => gameOg('memory', 'de'),
  'game/number-memory': () => gameOg('number-memory', 'de'),
  'game/poker': () => pokerHub('de'),
  'game/reaction': () => gameOg('reaction', 'de'),
  'game/sequence': () => gameOg('sequence', 'de'),
  'game/typing': () => gameOg('typing', 'de'),
  'game/stroop': () => gameOg('stroop', 'de'),
  'game/dot-count': () => gameOg('dot-count', 'de'),
  'game/nback': () => gameOg('nback', 'de'),
  'game/rotation': () => gameOg('rotation', 'de'),
  'game/beat': () => gameOg('beat', 'de'),
  'game/peripheral': () => gameOg('peripheral', 'de'),
  'generator': () => intlOg('generator/de'),
  // 잘못 지웠던 것을 되살림 — craft는 공식 계산기 40종이다
  'craft': () => {
    const meta = sectionMeta(CRAFT_SECTION, 'de');
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
    const meta = sectionMeta(GEO_SECTION, 'de');
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
    const ui = HANJA_UI['de'];
    return ogCard({
      icon: '📖',
      eyebrow: ui.section,
      title: ui.hubTitle,
      desc: ui.hubLead,
      from: HANJA_SECTION.ogFrom,
      to: HANJA_SECTION.ogTo,
    });
  },
  'cmd': () => cmdHub('de'),
  'shortcut': () => scHub('de'),
  'emoji': () => emojiHub('de'),
  'http': () => httpHub('de'),
  'image': () => intlOg('image/de'),
  'image/compress': () => imageOg('compress', 'de'),
  'image/convert': () => imageOg('convert', 'de'),
  'image/crop': () => imageOg('crop', 'de'),
  'image/merge': () => imageOg('merge', 'de'),
  'image/mosaic': () => imageOg('mosaic', 'de'),
  'image/palette': () => imageOg('palette', 'de'),
  'image/resize': () => imageOg('resize', 'de'),
  'image/rotate': () => imageOg('rotate', 'de'),
  'image/watermark': () => imageOg('watermark', 'de'),
  'image/adjust': () => imageOg('adjust', 'de'),
  'image/frame': () => imageOg('frame', 'de'),
  'image/round': () => imageOg('round', 'de'),
  'image/split': () => imageOg('split', 'de'),
  'image/favicon': () => imageOg('favicon', 'de'),
  'image/size': () => imgsizeHub('de'),
  'keycode': () => keycodeHub('de'),
  'number': () => numberHub('de'),
  'port': () => portHub('de'),
  'quiz': () => intlOg('quiz/de'),
  'random': () => intlOg('random/de'),
  'random/dice': () => diceHub('de'),
  'rate': () => {
    const meta = sectionMeta(RATE_SECTION, 'de');
    return ogCard({
      icon: '📐',
      eyebrow: meta.section,
      title: meta.hubTitle,
      desc: meta.hubLead,
      from: RATE_SECTION.ogFrom,
      to: RATE_SECTION.ogTo,
    });
  },
  'rem': () => remHub('de'),
  'roman': () => romanHub('de'),
  'search': () => intlOg('search/de'),
  'snap': () => intlOg('snap/de'),
  'snap/animal-face': () => intlOg('snap/animal-face/de'),
  'snap/couple-match': () => intlOg('snap/couple-match/de'),
  'snap/expression': () => intlOg('snap/expression/de'),
  'snap/face-reading': () => intlOg('snap/face-reading/de'),
  'snap/face-symmetry': () => intlOg('snap/face-symmetry/de'),
  'snap/first-impression': () => intlOg('snap/first-impression/de'),
  'snap/golden-ratio': () => intlOg('snap/golden-ratio/de'),
  'snap/handwriting': () => intlOg('snap/handwriting/de'),
  'snap/lens': () => lensHub('de'),
  'snap/personal-color': () => intlOg('snap/personal-color/de'),
  'snap/photo-mood': () => intlOg('snap/photo-mood/de'),
  'snap/smile-score': () => intlOg('snap/smile-score/de'),
  'sound': () => intlOg('sound/de'),
  'sound/binaural': () => soundOg('binaural', 'de'),
  'sound/bpm-tap': () => soundOg('bpm-tap', 'de'),
  'sound/decibel': () => soundOg('decibel', 'de'),
  'sound/hz': () => soundHub('de'),
  'sound/metronome': () => soundOg('metronome', 'de'),
  'sound/mosquito': () => soundOg('mosquito', 'de'),
  'sound/noise': () => soundOg('noise', 'de'),
  'sound/pitch': () => soundOg('pitch', 'de'),
  'sound/recorder': () => soundOg('recorder', 'de'),
  'sound/tone': () => soundOg('tone', 'de'),
  'sound/tuner': () => soundOg('tuner', 'de'),
  'percent': () => percentHub('de'),
  'sqrt': () => sqrtHub('de'),
  'test': () => intlOg('test/de'),
  'text': () => intlOg('text/de'),
  'text/case': () => textOg('case', 'de'),
  'text/char': () => glyphHub('de'),
  'text/clean': () => textOg('clean', 'de'),
  'text/dedupe': () => textOg('dedupe', 'de'),
  'text/emoticon': () => textOg('emoticon', 'de'),
  'text/lorem': () => textOg('lorem', 'de'),
  'text/manuscript': () => textOg('manuscript', 'de'),
  'text/regex': () => regexHub('de'),
  'text/replace': () => textOg('replace', 'de'),
  'text/mask': () => textOg('mask', 'de'),
  'text/wrap': () => textOg('wrap', 'de'),
  'text/table': () => textOg('table', 'de'),
  'text/slug': () => textOg('slug', 'de'),
  'text/reverse': () => textOg('reverse', 'de'),
  'text/qr': () => textOg('qr', 'de'),
  'text/vertical': () => textOg('vertical', 'de'),
  'text/special-char': () => textOg('special-char', 'de'),
  'time': () => intlOg('time/de'),
  'time/alarm': () => timeOg('alarm', 'de'),
  'time/date-add': () => timeOg('date-add', 'de'),
  'time/lived': () => timeOg('lived', 'de'),
  'time/pomodoro': () => timeOg('pomodoro', 'de'),
  'time/stopwatch': () => timeOg('stopwatch', 'de'),
  'time/timer': () => timeOg('timer', 'de'),
  'time/timezone': () => timeOg('timezone', 'de'),
  'time/weeknumber': () => timeOg('weeknumber', 'de'),
  'time/workdays': () => timeOg('workdays', 'de'),
  'time/worldclock': () => timeOg('worldclock', 'de'),
  'times': () => timesHub('de'),
  'year': () => yearHub('de'),
};

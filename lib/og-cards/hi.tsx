/**
 * 힌디어 공유 카드 — 경로에서 카드로 가는 대응표.
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

import { hubCard as altitudeHub } from '@/lib/altitude/route';
import { hubCard as airHub } from '@/lib/air/route';
import { hubCard as ampereHub } from '@/lib/ampere/route';
import { hubCard as braHub } from '@/lib/bra/route';
import { hubCard as cableHub } from '@/lib/cable/route';
import { hubCard as gengoHub } from '@/lib/gengo/route';
import { hubCard as bignumHub } from '@/lib/bignum/route';
import { hubCard as viewingHub } from '@/lib/viewing/route';
import { hubCard as passwordHub } from '@/lib/password/route';
import { hubCard as petfoodHub } from '@/lib/petfood/route';
import { hubCard as sizeHub } from '@/lib/size/route';
import { hubCard as uvHub } from '@/lib/uv/route';
import { hubCard as hikeHub } from '@/lib/hike/route';
import { hubCard as insulHub } from '@/lib/insul/route';
import { hubCard as asciiHub } from '@/lib/ascii/route';
import { hubCard as bandwidthHub } from '@/lib/bandwidth/route';
import { hubCard as batteryHub } from '@/lib/battery/route';
import { BODY_SECTION } from '@/lib/body-section';
import { hubCard as chessHub } from '@/lib/chess/route';
import { hubCard as chmodHub } from '@/lib/chmod/route';
import { hubCard as cidrHub } from '@/lib/cidr/route';
import { hubCard as codeHub } from '@/lib/code/route';
import { COUNTRY_SECTION, COUNTRY_UI } from '@/lib/country-ui';
import { hubCard as cssHub } from '@/lib/css/route';
import { hubCard as cubeHub } from '@/lib/cube/route';
import { hubCard as dartsHub } from '@/lib/darts/route';
import { hubCard as deviceHub } from '@/lib/device/route';
import { hubCard as dewHub } from '@/lib/dew/route';
import { hubCard as diceHub } from '@/lib/dice/route';
import { hubCard as drillHub } from '@/lib/drill/route';
import { hubCard as elementHub } from '@/lib/element/route';
import { hubCard as extHub } from '@/lib/ext/route';
import { sectionMeta } from '@/lib/formula/section';
import { hubCard as fractionHub } from '@/lib/fraction/route';
import { hubCard as fretHub } from '@/lib/fret/route';
import { GEO_SECTION } from '@/lib/geo-section';
import { hubCard as glyphHub } from '@/lib/glyph/route';
import { hubCard as gravityHub } from '@/lib/gravity/route';
import { HANJA_SECTION, HANJA_UI } from '@/lib/hanja-ui';
import { hubCard as htmlHub } from '@/lib/html/route';
import { hubCard as httpHub } from '@/lib/http/route';
import { hubCard as imgsizeHub } from '@/lib/imgsize/route';
import { hubCard as keycodeHub } from '@/lib/keycode/route';
import { hubCard as lensHub } from '@/lib/lens/route';
import { hubCard as lumenHub } from '@/lib/lumen/route';
import { hubCard as metroHub } from '@/lib/metro/route';
import { hubCard as musicHub } from '@/lib/music/route';
import { hubCard as numberHub } from '@/lib/number/route';
import { colorOg, deviceOg, foodOg, gameOg, imageOg, intlOg, soundOg, textOg, timeOg } from '@/lib/og-intl';
import { ogCard } from '@/lib/og-template';
import { hubCard as paceHub } from '@/lib/pace/route';
import { hubCard as paperHub } from '@/lib/paper/route';
import { hubCard as pokerHub } from '@/lib/poker/route';
import { hubCard as portHub } from '@/lib/port/route';
import { RATE_SECTION } from '@/lib/rate-section';
import { hubCard as regexHub } from '@/lib/regex/route';
import { hubCard as remHub } from '@/lib/rem/route';
import { hubCard as resistorHub } from '@/lib/resistor/route';
import { hubCard as romanHub } from '@/lib/roman/route';
import { hubCard as screwHub } from '@/lib/screw/route';
import { hubCard as soundHub } from '@/lib/sound/route';
import { hubCard as sqrtHub } from '@/lib/sqrt/route';
import { hubCard as stopHub } from '@/lib/stop/route';
import { hubCard as tarotHub } from '@/lib/tarot/route';
import { hubCard as timesHub } from '@/lib/times/route';
import { hubCard as tireHub } from '@/lib/tire/route';
import { hubCard as torqueHub } from '@/lib/torque/route';
import { hubCard as wifiHub } from '@/lib/wifi/route';
import { hubCard as windchillHub } from '@/lib/windchill/route';
import { hubCard as wireHub } from '@/lib/wire/route';
import { hubCard as yearHub } from '@/lib/year/route';

export const CARDS: Record<string, () => ReactElement> = {
  'snap/lighting': () => newSnapCard('hi', 'lighting'),
  'snap/sharpness': () => newSnapCard('hi', 'sharpness'),
  'snap/white-balance': () => newSnapCard('hi', 'white-balance'),
  'snap/distance': () => newSnapCard('hi', 'distance'),
  'snap/mirror': () => newSnapCard('hi', 'mirror'),
  'snap/id-photo': () => newSnapCard('hi', 'id-photo'),
  'snap/head-pose': () => newSnapCard('hi', 'head-pose'),
  'snap/real-smile': () => newSnapCard('hi', 'real-smile'),
  'snap/eye-open': () => newSnapCard('hi', 'eye-open'),
  'snap/framing': () => newSnapCard('hi', 'framing'),
  '': () => intlOg('home/hi'),
  'air': () => airHub('hi'),
  'altitude': () => altitudeHub('hi'),
  'ampere': () => ampereHub('hi'),
  'bra': () => braHub('hi'),
  'password': () => passwordHub('hi'),
  'cable': () => cableHub('hi'),
  'bignum': () => bignumHub('hi'),
  'gengo': () => gengoHub('hi'),
  'viewing': () => viewingHub('hi'),
  'petfood': () => petfoodHub('hi'),
  'size': () => sizeHub('hi'),
  'uv': () => uvHub('hi'),
  'hike': () => hikeHub('hi'),
  'insul': () => insulHub('hi'),
  'ascii': () => asciiHub('hi'),
  'bandwidth': () => bandwidthHub('hi'),
  'battery': () => batteryHub('hi'),
  'body': () => {
    const meta = sectionMeta(BODY_SECTION, 'hi');
    return ogCard({
      icon: '🩺',
      eyebrow: meta.section,
      title: meta.hubTitle,
      desc: meta.hubLead,
      from: BODY_SECTION.ogFrom,
      to: BODY_SECTION.ogTo,
    });
  },
  'calculator': () => intlOg('calculator/hi'),
  'checklist': () => intlOg('checklist/hi'),
  'chmod': () => chmodHub('hi'),
  'cidr': () => cidrHub('hi'),
  'code': () => codeHub('hi'),
  'color': () => intlOg('color/hi'),
  'color/colorblind': () => colorOg('colorblind', 'hi'),
  'color/contrast': () => colorOg('contrast', 'hi'),
  'color/gradient': () => colorOg('gradient', 'hi'),
  'color/mixer': () => colorOg('mixer', 'hi'),
  'color/name': () => colorOg('name', 'hi'),
  'color/palette': () => colorOg('palette', 'hi'),
  'color/random': () => colorOg('random', 'hi'),
  'color/shades': () => colorOg('shades', 'hi'),
  'color/shadow': () => colorOg('shadow', 'hi'),
  'color/temperature': () => colorOg('temperature', 'hi'),
  'convert': () => intlOg('convert/hi'),
  'country': () => {
    const ui = COUNTRY_UI['hi'];
    return ogCard({
      icon: '🧭',
      eyebrow: ui.section,
      title: ui.hubTitle,
      desc: ui.hubLead,
      from: COUNTRY_SECTION.ogFrom,
      to: COUNTRY_SECTION.ogTo,
    });
  },
  'css': () => cssHub('hi'),
  'darts': () => dartsHub('hi'),
  'device': () => intlOg('device/hi'),
  'device/gamepad': () => deviceOg('gamepad', 'hi'),
  'device/info': () => deviceOg('info', 'hi'),
  'device/keyboard': () => deviceOg('keyboard', 'hi'),
  'device/mic': () => deviceOg('mic', 'hi'),
  'device/monitor': () => deviceOg('monitor', 'hi'),
  'device/mouse': () => deviceOg('mouse', 'hi'),
  'device/refresh-rate': () => deviceOg('refresh-rate', 'hi'),
  'device/screen': () => deviceHub('hi'),
  'device/speaker': () => deviceOg('speaker', 'hi'),
  'device/touch': () => deviceOg('touch', 'hi'),
  'device/webcam': () => deviceOg('webcam', 'hi'),
  'dew': () => dewHub('hi'),
  'drill': () => drillHub('hi'),
  'element': () => elementHub('hi'),
  'ext': () => extHub('hi'),
  'food': () => intlOg('food/hi'),
  'food/baking-pan': () => foodOg('baking-pan', 'hi'),
  'food/coffee': () => foodOg('coffee', 'hi'),
  'food/measure': () => foodOg('measure', 'hi'),
  'food/oven': () => foodOg('oven', 'hi'),
  'food/pasta': () => foodOg('pasta', 'hi'),
  'food/recipe-scale': () => foodOg('recipe-scale', 'hi'),
  'food/rice': () => foodOg('rice', 'hi'),
  'food/salt': () => foodOg('salt', 'hi'),
  'food/steak': () => foodOg('steak', 'hi'),
  'food/storage': () => foodOg('storage', 'hi'),
  'fortune': () => intlOg('fortune/hi'),
  'fortune/animal': () => intlOg('fortune/animal/hi'),
  'fortune/biorhythm': () => intlOg('fortune/biorhythm/hi'),
  'fortune/birth-stone': () => intlOg('fortune/birth-stone/hi'),
  'fortune/blood-match': () => intlOg('fortune/blood-match/hi'),
  'fortune/blood-type': () => intlOg('fortune/blood-type/hi'),
  'fortune/card': () => tarotHub('hi'),
  'fortune/daily': () => intlOg('fortune/daily/hi'),
  'fortune/daily-tarot': () => intlOg('fortune/daily-tarot/hi'),
  'fortune/dream': () => intlOg('fortune/dream/hi'),
  'fortune/lucky-numbers': () => intlOg('fortune/lucky-numbers/hi'),
  'fortune/mbti': () => intlOg('fortune/mbti/hi'),
  'fortune/mbti-match': () => intlOg('fortune/mbti-match/hi'),
  'fortune/saju': () => intlOg('fortune/saju/hi'),
  'fortune/star-match': () => intlOg('fortune/star-match/hi'),
  'fortune/tarot': () => intlOg('fortune/tarot/hi'),
  'fortune/tarot-yesno': () => intlOg('fortune/tarot-yesno/hi'),
  'fortune/today-color': () => intlOg('fortune/today-color/hi'),
  'fortune/zodiac': () => intlOg('fortune/zodiac/hi'),
  'fortune/zodiac-match': () => intlOg('fortune/zodiac-match/hi'),
  'fraction': () => fractionHub('hi'),
  'fret': () => fretHub('hi'),
  'game': () => intlOg('game/hi'),
  'game/aim': () => gameOg('aim', 'hi'),
  'game/chess': () => chessHub('hi'),
  'game/color-blind': () => gameOg('color-blind', 'hi'),
  'game/cps': () => gameOg('cps', 'hi'),
  'game/cube': () => cubeHub('hi'),
  'game/hearing': () => gameOg('hearing', 'hi'),
  'game/math': () => gameOg('math', 'hi'),
  'game/memory': () => gameOg('memory', 'hi'),
  'game/number-memory': () => gameOg('number-memory', 'hi'),
  'game/poker': () => pokerHub('hi'),
  'game/reaction': () => gameOg('reaction', 'hi'),
  'game/sequence': () => gameOg('sequence', 'hi'),
  'game/typing': () => gameOg('typing', 'hi'),
  'generator': () => intlOg('generator/hi'),
  'geometry': () => {
    const meta = sectionMeta(GEO_SECTION, 'hi');
    return ogCard({
      icon: '📐',
      eyebrow: meta.section,
      title: meta.hubTitle,
      desc: meta.hubLead,
      from: GEO_SECTION.ogFrom,
      to: GEO_SECTION.ogTo,
    });
  },
  'gravity': () => gravityHub('hi'),
  'hanja': () => {
    const ui = HANJA_UI['hi'];
    return ogCard({
      icon: '📖',
      eyebrow: ui.section,
      title: ui.hubTitle,
      desc: ui.hubLead,
      from: HANJA_SECTION.ogFrom,
      to: HANJA_SECTION.ogTo,
    });
  },
  'html': () => htmlHub('hi'),
  'http': () => httpHub('hi'),
  'image': () => intlOg('image/hi'),
  'image/compress': () => imageOg('compress', 'hi'),
  'image/convert': () => imageOg('convert', 'hi'),
  'image/crop': () => imageOg('crop', 'hi'),
  'image/merge': () => imageOg('merge', 'hi'),
  'image/mosaic': () => imageOg('mosaic', 'hi'),
  'image/palette': () => imageOg('palette', 'hi'),
  'image/resize': () => imageOg('resize', 'hi'),
  'image/rotate': () => imageOg('rotate', 'hi'),
  'image/size': () => imgsizeHub('hi'),
  'keycode': () => keycodeHub('hi'),
  'lumen': () => lumenHub('hi'),
  'metro': () => metroHub('hi'),
  'music': () => musicHub('hi'),
  'number': () => numberHub('hi'),
  'pace': () => paceHub('hi'),
  'paper': () => paperHub('hi'),
  'port': () => portHub('hi'),
  'quiz': () => intlOg('quiz/hi'),
  'random': () => intlOg('random/hi'),
  'random/dice': () => diceHub('hi'),
  'rate': () => {
    const meta = sectionMeta(RATE_SECTION, 'hi');
    return ogCard({
      icon: '📐',
      eyebrow: meta.section,
      title: meta.hubTitle,
      desc: meta.hubLead,
      from: RATE_SECTION.ogFrom,
      to: RATE_SECTION.ogTo,
    });
  },
  'rem': () => remHub('hi'),
  'resistor': () => resistorHub('hi'),
  'roman': () => romanHub('hi'),
  'screw': () => screwHub('hi'),
  'search': () => intlOg('search/hi'),
  'snap': () => intlOg('snap/hi'),
  'snap/animal-face': () => intlOg('snap/animal-face/hi'),
  'snap/couple-match': () => intlOg('snap/couple-match/hi'),
  'snap/expression': () => intlOg('snap/expression/hi'),
  'snap/face-reading': () => intlOg('snap/face-reading/hi'),
  'snap/face-symmetry': () => intlOg('snap/face-symmetry/hi'),
  'snap/first-impression': () => intlOg('snap/first-impression/hi'),
  'snap/golden-ratio': () => intlOg('snap/golden-ratio/hi'),
  'snap/handwriting': () => intlOg('snap/handwriting/hi'),
  'snap/lens': () => lensHub('hi'),
  'snap/personal-color': () => intlOg('snap/personal-color/hi'),
  'snap/photo-mood': () => intlOg('snap/photo-mood/hi'),
  'snap/smile-score': () => intlOg('snap/smile-score/hi'),
  'sound': () => intlOg('sound/hi'),
  'sound/binaural': () => soundOg('binaural', 'hi'),
  'sound/bpm-tap': () => soundOg('bpm-tap', 'hi'),
  'sound/decibel': () => soundOg('decibel', 'hi'),
  'sound/hz': () => soundHub('hi'),
  'sound/metronome': () => soundOg('metronome', 'hi'),
  'sound/mosquito': () => soundOg('mosquito', 'hi'),
  'sound/noise': () => soundOg('noise', 'hi'),
  'sound/pitch': () => soundOg('pitch', 'hi'),
  'sound/recorder': () => soundOg('recorder', 'hi'),
  'sound/tone': () => soundOg('tone', 'hi'),
  'sound/tuner': () => soundOg('tuner', 'hi'),
  'sqrt': () => sqrtHub('hi'),
  'stop': () => stopHub('hi'),
  'test': () => intlOg('test/hi'),
  'text': () => intlOg('text/hi'),
  'text/case': () => textOg('case', 'hi'),
  'text/char': () => glyphHub('hi'),
  'text/clean': () => textOg('clean', 'hi'),
  'text/dedupe': () => textOg('dedupe', 'hi'),
  'text/emoticon': () => textOg('emoticon', 'hi'),
  'text/lorem': () => textOg('lorem', 'hi'),
  'text/manuscript': () => textOg('manuscript', 'hi'),
  'text/regex': () => regexHub('hi'),
  'text/replace': () => textOg('replace', 'hi'),
  'text/special-char': () => textOg('special-char', 'hi'),
  'time': () => intlOg('time/hi'),
  'time/alarm': () => timeOg('alarm', 'hi'),
  'time/date-add': () => timeOg('date-add', 'hi'),
  'time/lived': () => timeOg('lived', 'hi'),
  'time/pomodoro': () => timeOg('pomodoro', 'hi'),
  'time/stopwatch': () => timeOg('stopwatch', 'hi'),
  'time/timer': () => timeOg('timer', 'hi'),
  'time/timezone': () => timeOg('timezone', 'hi'),
  'time/weeknumber': () => timeOg('weeknumber', 'hi'),
  'time/workdays': () => timeOg('workdays', 'hi'),
  'time/worldclock': () => timeOg('worldclock', 'hi'),
  'times': () => timesHub('hi'),
  'tire': () => tireHub('hi'),
  'torque': () => torqueHub('hi'),
  'wifi': () => wifiHub('hi'),
  'windchill': () => windchillHub('hi'),
  'wire': () => wireHub('hi'),
  'year': () => yearHub('hi'),
};

/**
 * 영어 공유 카드 — 경로에서 카드로 가는 대응표.
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

import { hubCard as altitudeHub } from '@/lib/altitude/route';
import { hubCard as ampereHub } from '@/lib/ampere/route';
import { hubCard as uvHub } from '@/lib/uv/route';
import { hubCard as hikeHub } from '@/lib/hike/route';
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
  '': () => intlOg('home/en'),
  'altitude': () => altitudeHub('en'),
  'ampere': () => ampereHub('en'),
  'uv': () => uvHub('en'),
  'hike': () => hikeHub('en'),
  'ascii': () => asciiHub('en'),
  'bandwidth': () => bandwidthHub('en'),
  'battery': () => batteryHub('en'),
  'body': () => {
    const meta = BODY_SECTION.meta['en'];
    return ogCard({
      icon: '🩺',
      eyebrow: meta.section,
      title: meta.hubTitle,
      desc: meta.hubLead,
      from: BODY_SECTION.ogFrom,
      to: BODY_SECTION.ogTo,
    });
  },
  'calculator': () => intlOg('calculator/en'),
  'checklist': () => intlOg('checklist/en'),
  'chmod': () => chmodHub('en'),
  'cidr': () => cidrHub('en'),
  'code': () => codeHub('en'),
  'color': () => intlOg('color/en'),
  'color/colorblind': () => colorOg('colorblind', 'en'),
  'color/contrast': () => colorOg('contrast', 'en'),
  'color/gradient': () => colorOg('gradient', 'en'),
  'color/mixer': () => colorOg('mixer', 'en'),
  'color/name': () => colorOg('name', 'en'),
  'color/palette': () => colorOg('palette', 'en'),
  'color/random': () => colorOg('random', 'en'),
  'color/shades': () => colorOg('shades', 'en'),
  'color/shadow': () => colorOg('shadow', 'en'),
  'color/temperature': () => colorOg('temperature', 'en'),
  'convert': () => intlOg('convert/en'),
  'country': () => {
    const ui = COUNTRY_UI['en'];
    return ogCard({
      icon: '🧭',
      eyebrow: ui.section,
      title: ui.hubTitle,
      desc: ui.hubLead,
      from: COUNTRY_SECTION.ogFrom,
      to: COUNTRY_SECTION.ogTo,
    });
  },
  'css': () => cssHub('en'),
  'darts': () => dartsHub('en'),
  'device': () => intlOg('device/en'),
  'device/gamepad': () => deviceOg('gamepad', 'en'),
  'device/info': () => deviceOg('info', 'en'),
  'device/keyboard': () => deviceOg('keyboard', 'en'),
  'device/mic': () => deviceOg('mic', 'en'),
  'device/monitor': () => deviceOg('monitor', 'en'),
  'device/mouse': () => deviceOg('mouse', 'en'),
  'device/refresh-rate': () => deviceOg('refresh-rate', 'en'),
  'device/screen': () => deviceHub('en'),
  'device/speaker': () => deviceOg('speaker', 'en'),
  'device/touch': () => deviceOg('touch', 'en'),
  'device/webcam': () => deviceOg('webcam', 'en'),
  'dew': () => dewHub('en'),
  'drill': () => drillHub('en'),
  'element': () => elementHub('en'),
  'ext': () => extHub('en'),
  'food': () => intlOg('food/en'),
  'food/baking-pan': () => foodOg('baking-pan', 'en'),
  'food/coffee': () => foodOg('coffee', 'en'),
  'food/measure': () => foodOg('measure', 'en'),
  'food/oven': () => foodOg('oven', 'en'),
  'food/pasta': () => foodOg('pasta', 'en'),
  'food/recipe-scale': () => foodOg('recipe-scale', 'en'),
  'food/rice': () => foodOg('rice', 'en'),
  'food/salt': () => foodOg('salt', 'en'),
  'food/steak': () => foodOg('steak', 'en'),
  'food/storage': () => foodOg('storage', 'en'),
  'fortune': () => intlOg('fortune/en'),
  'fortune/animal': () => intlOg('fortune/animal/en'),
  'fortune/biorhythm': () => intlOg('fortune/biorhythm/en'),
  'fortune/birth-stone': () => intlOg('fortune/birth-stone/en'),
  'fortune/blood-match': () => intlOg('fortune/blood-match/en'),
  'fortune/blood-type': () => intlOg('fortune/blood-type/en'),
  'fortune/card': () => tarotHub('en'),
  'fortune/daily': () => intlOg('fortune/daily/en'),
  'fortune/daily-tarot': () => intlOg('fortune/daily-tarot/en'),
  'fortune/dream': () => intlOg('fortune/dream/en'),
  'fortune/lucky-numbers': () => intlOg('fortune/lucky-numbers/en'),
  'fortune/mbti': () => intlOg('fortune/mbti/en'),
  'fortune/mbti-match': () => intlOg('fortune/mbti-match/en'),
  'fortune/saju': () => intlOg('fortune/saju/en'),
  'fortune/star-match': () => intlOg('fortune/star-match/en'),
  'fortune/tarot': () => intlOg('fortune/tarot/en'),
  'fortune/tarot-yesno': () => intlOg('fortune/tarot-yesno/en'),
  'fortune/today-color': () => intlOg('fortune/today-color/en'),
  'fortune/zodiac': () => intlOg('fortune/zodiac/en'),
  'fortune/zodiac-match': () => intlOg('fortune/zodiac-match/en'),
  'fraction': () => fractionHub('en'),
  'fret': () => fretHub('en'),
  'game': () => intlOg('game/en'),
  'game/aim': () => gameOg('aim', 'en'),
  'game/chess': () => chessHub('en'),
  'game/color-blind': () => gameOg('color-blind', 'en'),
  'game/cps': () => gameOg('cps', 'en'),
  'game/cube': () => cubeHub('en'),
  'game/hearing': () => gameOg('hearing', 'en'),
  'game/math': () => gameOg('math', 'en'),
  'game/memory': () => gameOg('memory', 'en'),
  'game/number-memory': () => gameOg('number-memory', 'en'),
  'game/poker': () => pokerHub('en'),
  'game/reaction': () => gameOg('reaction', 'en'),
  'game/sequence': () => gameOg('sequence', 'en'),
  'game/typing': () => gameOg('typing', 'en'),
  'generator': () => intlOg('generator/en'),
  'geometry': () => {
    const meta = GEO_SECTION.meta['en'];
    return ogCard({
      icon: '📐',
      eyebrow: meta.section,
      title: meta.hubTitle,
      desc: meta.hubLead,
      from: GEO_SECTION.ogFrom,
      to: GEO_SECTION.ogTo,
    });
  },
  'gravity': () => gravityHub('en'),
  'hanja': () => {
    const ui = HANJA_UI['en'];
    return ogCard({
      icon: '📖',
      eyebrow: ui.section,
      title: ui.hubTitle,
      desc: ui.hubLead,
      from: HANJA_SECTION.ogFrom,
      to: HANJA_SECTION.ogTo,
    });
  },
  'html': () => htmlHub('en'),
  'http': () => httpHub('en'),
  'image': () => intlOg('image/en'),
  'image/compress': () => imageOg('compress', 'en'),
  'image/convert': () => imageOg('convert', 'en'),
  'image/crop': () => imageOg('crop', 'en'),
  'image/merge': () => imageOg('merge', 'en'),
  'image/mosaic': () => imageOg('mosaic', 'en'),
  'image/palette': () => imageOg('palette', 'en'),
  'image/resize': () => imageOg('resize', 'en'),
  'image/rotate': () => imageOg('rotate', 'en'),
  'image/size': () => imgsizeHub('en'),
  'keycode': () => keycodeHub('en'),
  'lumen': () => lumenHub('en'),
  'metro': () => metroHub('en'),
  'music': () => musicHub('en'),
  'number': () => numberHub('en'),
  'pace': () => paceHub('en'),
  'paper': () => paperHub('en'),
  'port': () => portHub('en'),
  'quiz': () => intlOg('quiz/en'),
  'random': () => intlOg('random/en'),
  'random/dice': () => diceHub('en'),
  'rate': () => {
    const meta = RATE_SECTION.meta['en'];
    return ogCard({
      icon: '📐',
      eyebrow: meta.section,
      title: meta.hubTitle,
      desc: meta.hubLead,
      from: RATE_SECTION.ogFrom,
      to: RATE_SECTION.ogTo,
    });
  },
  'rem': () => remHub('en'),
  'resistor': () => resistorHub('en'),
  'roman': () => romanHub('en'),
  'screw': () => screwHub('en'),
  'search': () => intlOg('search/en'),
  'snap': () => intlOg('snap/en'),
  'snap/animal-face': () => intlOg('snap/animal-face/en'),
  'snap/couple-match': () => intlOg('snap/couple-match/en'),
  'snap/expression': () => intlOg('snap/expression/en'),
  'snap/face-reading': () => intlOg('snap/face-reading/en'),
  'snap/face-symmetry': () => intlOg('snap/face-symmetry/en'),
  'snap/first-impression': () => intlOg('snap/first-impression/en'),
  'snap/golden-ratio': () => intlOg('snap/golden-ratio/en'),
  'snap/handwriting': () => intlOg('snap/handwriting/en'),
  'snap/lens': () => lensHub('en'),
  'snap/personal-color': () => intlOg('snap/personal-color/en'),
  'snap/photo-mood': () => intlOg('snap/photo-mood/en'),
  'snap/smile-score': () => intlOg('snap/smile-score/en'),
  'sound': () => intlOg('sound/en'),
  'sound/binaural': () => soundOg('binaural', 'en'),
  'sound/bpm-tap': () => soundOg('bpm-tap', 'en'),
  'sound/decibel': () => soundOg('decibel', 'en'),
  'sound/hz': () => soundHub('en'),
  'sound/metronome': () => soundOg('metronome', 'en'),
  'sound/mosquito': () => soundOg('mosquito', 'en'),
  'sound/noise': () => soundOg('noise', 'en'),
  'sound/pitch': () => soundOg('pitch', 'en'),
  'sound/recorder': () => soundOg('recorder', 'en'),
  'sound/tone': () => soundOg('tone', 'en'),
  'sound/tuner': () => soundOg('tuner', 'en'),
  'sqrt': () => sqrtHub('en'),
  'stop': () => stopHub('en'),
  'test': () => intlOg('test/en'),
  'text': () => intlOg('text/en'),
  'text/case': () => textOg('case', 'en'),
  'text/char': () => glyphHub('en'),
  'text/clean': () => textOg('clean', 'en'),
  'text/dedupe': () => textOg('dedupe', 'en'),
  'text/emoticon': () => textOg('emoticon', 'en'),
  'text/lorem': () => textOg('lorem', 'en'),
  'text/manuscript': () => textOg('manuscript', 'en'),
  'text/regex': () => regexHub('en'),
  'text/replace': () => textOg('replace', 'en'),
  'text/special-char': () => textOg('special-char', 'en'),
  'time': () => intlOg('time/en'),
  'time/alarm': () => timeOg('alarm', 'en'),
  'time/date-add': () => timeOg('date-add', 'en'),
  'time/lived': () => timeOg('lived', 'en'),
  'time/pomodoro': () => timeOg('pomodoro', 'en'),
  'time/stopwatch': () => timeOg('stopwatch', 'en'),
  'time/timer': () => timeOg('timer', 'en'),
  'time/timezone': () => timeOg('timezone', 'en'),
  'time/weeknumber': () => timeOg('weeknumber', 'en'),
  'time/workdays': () => timeOg('workdays', 'en'),
  'time/worldclock': () => timeOg('worldclock', 'en'),
  'times': () => timesHub('en'),
  'tire': () => tireHub('en'),
  'torque': () => torqueHub('en'),
  'wifi': () => wifiHub('en'),
  'windchill': () => windchillHub('en'),
  'wire': () => wireHub('en'),
  'year': () => yearHub('en'),
};

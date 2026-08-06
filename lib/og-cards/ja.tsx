/**
 * 일본어 공유 카드 — 경로에서 카드로 가는 대응표.
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
  '': () => intlOg('home/ja'),
  'altitude': () => altitudeHub('ja'),
  'ampere': () => ampereHub('ja'),
  'uv': () => uvHub('ja'),
  'hike': () => hikeHub('ja'),
  'insul': () => insulHub('ja'),
  'ascii': () => asciiHub('ja'),
  'bandwidth': () => bandwidthHub('ja'),
  'battery': () => batteryHub('ja'),
  'body': () => {
    const meta = sectionMeta(BODY_SECTION, 'ja');
    return ogCard({
      icon: '🩺',
      eyebrow: meta.section,
      title: meta.hubTitle,
      desc: meta.hubLead,
      from: BODY_SECTION.ogFrom,
      to: BODY_SECTION.ogTo,
    });
  },
  'calculator': () => intlOg('calculator/ja'),
  'checklist': () => intlOg('checklist/ja'),
  'chmod': () => chmodHub('ja'),
  'cidr': () => cidrHub('ja'),
  'code': () => codeHub('ja'),
  'color': () => intlOg('color/ja'),
  'color/colorblind': () => colorOg('colorblind', 'ja'),
  'color/contrast': () => colorOg('contrast', 'ja'),
  'color/gradient': () => colorOg('gradient', 'ja'),
  'color/mixer': () => colorOg('mixer', 'ja'),
  'color/name': () => colorOg('name', 'ja'),
  'color/palette': () => colorOg('palette', 'ja'),
  'color/random': () => colorOg('random', 'ja'),
  'color/shades': () => colorOg('shades', 'ja'),
  'color/shadow': () => colorOg('shadow', 'ja'),
  'color/temperature': () => colorOg('temperature', 'ja'),
  'convert': () => intlOg('convert/ja'),
  'country': () => {
    const ui = COUNTRY_UI['ja'];
    return ogCard({
      icon: '🧭',
      eyebrow: ui.section,
      title: ui.hubTitle,
      desc: ui.hubLead,
      from: COUNTRY_SECTION.ogFrom,
      to: COUNTRY_SECTION.ogTo,
    });
  },
  'css': () => cssHub('ja'),
  'darts': () => dartsHub('ja'),
  'device': () => intlOg('device/ja'),
  'device/gamepad': () => deviceOg('gamepad', 'ja'),
  'device/info': () => deviceOg('info', 'ja'),
  'device/keyboard': () => deviceOg('keyboard', 'ja'),
  'device/mic': () => deviceOg('mic', 'ja'),
  'device/monitor': () => deviceOg('monitor', 'ja'),
  'device/mouse': () => deviceOg('mouse', 'ja'),
  'device/refresh-rate': () => deviceOg('refresh-rate', 'ja'),
  'device/screen': () => deviceHub('ja'),
  'device/speaker': () => deviceOg('speaker', 'ja'),
  'device/touch': () => deviceOg('touch', 'ja'),
  'device/webcam': () => deviceOg('webcam', 'ja'),
  'dew': () => dewHub('ja'),
  'drill': () => drillHub('ja'),
  'element': () => elementHub('ja'),
  'ext': () => extHub('ja'),
  'food': () => intlOg('food/ja'),
  'food/baking-pan': () => foodOg('baking-pan', 'ja'),
  'food/coffee': () => foodOg('coffee', 'ja'),
  'food/measure': () => foodOg('measure', 'ja'),
  'food/oven': () => foodOg('oven', 'ja'),
  'food/pasta': () => foodOg('pasta', 'ja'),
  'food/recipe-scale': () => foodOg('recipe-scale', 'ja'),
  'food/rice': () => foodOg('rice', 'ja'),
  'food/salt': () => foodOg('salt', 'ja'),
  'food/steak': () => foodOg('steak', 'ja'),
  'food/storage': () => foodOg('storage', 'ja'),
  'fortune': () => intlOg('fortune/ja'),
  'fortune/animal': () => intlOg('fortune/animal/ja'),
  'fortune/biorhythm': () => intlOg('fortune/biorhythm/ja'),
  'fortune/birth-stone': () => intlOg('fortune/birth-stone/ja'),
  'fortune/blood-match': () => intlOg('fortune/blood-match/ja'),
  'fortune/blood-type': () => intlOg('fortune/blood-type/ja'),
  'fortune/card': () => tarotHub('ja'),
  'fortune/daily': () => intlOg('fortune/daily/ja'),
  'fortune/daily-tarot': () => intlOg('fortune/daily-tarot/ja'),
  'fortune/dream': () => intlOg('fortune/dream/ja'),
  'fortune/lucky-numbers': () => intlOg('fortune/lucky-numbers/ja'),
  'fortune/mbti': () => intlOg('fortune/mbti/ja'),
  'fortune/mbti-match': () => intlOg('fortune/mbti-match/ja'),
  'fortune/saju': () => intlOg('fortune/saju/ja'),
  'fortune/star-match': () => intlOg('fortune/star-match/ja'),
  'fortune/tarot': () => intlOg('fortune/tarot/ja'),
  'fortune/tarot-yesno': () => intlOg('fortune/tarot-yesno/ja'),
  'fortune/today-color': () => intlOg('fortune/today-color/ja'),
  'fortune/zodiac': () => intlOg('fortune/zodiac/ja'),
  'fortune/zodiac-match': () => intlOg('fortune/zodiac-match/ja'),
  'fraction': () => fractionHub('ja'),
  'fret': () => fretHub('ja'),
  'game': () => intlOg('game/ja'),
  'game/aim': () => gameOg('aim', 'ja'),
  'game/chess': () => chessHub('ja'),
  'game/color-blind': () => gameOg('color-blind', 'ja'),
  'game/cps': () => gameOg('cps', 'ja'),
  'game/cube': () => cubeHub('ja'),
  'game/hearing': () => gameOg('hearing', 'ja'),
  'game/math': () => gameOg('math', 'ja'),
  'game/memory': () => gameOg('memory', 'ja'),
  'game/number-memory': () => gameOg('number-memory', 'ja'),
  'game/poker': () => pokerHub('ja'),
  'game/reaction': () => gameOg('reaction', 'ja'),
  'game/sequence': () => gameOg('sequence', 'ja'),
  'game/typing': () => gameOg('typing', 'ja'),
  'generator': () => intlOg('generator/ja'),
  'geometry': () => {
    const meta = sectionMeta(GEO_SECTION, 'ja');
    return ogCard({
      icon: '📐',
      eyebrow: meta.section,
      title: meta.hubTitle,
      desc: meta.hubLead,
      from: GEO_SECTION.ogFrom,
      to: GEO_SECTION.ogTo,
    });
  },
  'gravity': () => gravityHub('ja'),
  'hanja': () => {
    const ui = HANJA_UI['ja'];
    return ogCard({
      icon: '📖',
      eyebrow: ui.section,
      title: ui.hubTitle,
      desc: ui.hubLead,
      from: HANJA_SECTION.ogFrom,
      to: HANJA_SECTION.ogTo,
    });
  },
  'html': () => htmlHub('ja'),
  'http': () => httpHub('ja'),
  'image': () => intlOg('image/ja'),
  'image/compress': () => imageOg('compress', 'ja'),
  'image/convert': () => imageOg('convert', 'ja'),
  'image/crop': () => imageOg('crop', 'ja'),
  'image/merge': () => imageOg('merge', 'ja'),
  'image/mosaic': () => imageOg('mosaic', 'ja'),
  'image/palette': () => imageOg('palette', 'ja'),
  'image/resize': () => imageOg('resize', 'ja'),
  'image/rotate': () => imageOg('rotate', 'ja'),
  'image/size': () => imgsizeHub('ja'),
  'keycode': () => keycodeHub('ja'),
  'lumen': () => lumenHub('ja'),
  'metro': () => metroHub('ja'),
  'music': () => musicHub('ja'),
  'number': () => numberHub('ja'),
  'pace': () => paceHub('ja'),
  'paper': () => paperHub('ja'),
  'port': () => portHub('ja'),
  'quiz': () => intlOg('quiz/ja'),
  'random': () => intlOg('random/ja'),
  'random/dice': () => diceHub('ja'),
  'rate': () => {
    const meta = sectionMeta(RATE_SECTION, 'ja');
    return ogCard({
      icon: '📐',
      eyebrow: meta.section,
      title: meta.hubTitle,
      desc: meta.hubLead,
      from: RATE_SECTION.ogFrom,
      to: RATE_SECTION.ogTo,
    });
  },
  'rem': () => remHub('ja'),
  'resistor': () => resistorHub('ja'),
  'roman': () => romanHub('ja'),
  'screw': () => screwHub('ja'),
  'search': () => intlOg('search/ja'),
  'snap': () => intlOg('snap/ja'),
  'snap/animal-face': () => intlOg('snap/animal-face/ja'),
  'snap/couple-match': () => intlOg('snap/couple-match/ja'),
  'snap/expression': () => intlOg('snap/expression/ja'),
  'snap/face-reading': () => intlOg('snap/face-reading/ja'),
  'snap/face-symmetry': () => intlOg('snap/face-symmetry/ja'),
  'snap/first-impression': () => intlOg('snap/first-impression/ja'),
  'snap/golden-ratio': () => intlOg('snap/golden-ratio/ja'),
  'snap/handwriting': () => intlOg('snap/handwriting/ja'),
  'snap/lens': () => lensHub('ja'),
  'snap/personal-color': () => intlOg('snap/personal-color/ja'),
  'snap/photo-mood': () => intlOg('snap/photo-mood/ja'),
  'snap/smile-score': () => intlOg('snap/smile-score/ja'),
  'sound': () => intlOg('sound/ja'),
  'sound/binaural': () => soundOg('binaural', 'ja'),
  'sound/bpm-tap': () => soundOg('bpm-tap', 'ja'),
  'sound/decibel': () => soundOg('decibel', 'ja'),
  'sound/hz': () => soundHub('ja'),
  'sound/metronome': () => soundOg('metronome', 'ja'),
  'sound/mosquito': () => soundOg('mosquito', 'ja'),
  'sound/noise': () => soundOg('noise', 'ja'),
  'sound/pitch': () => soundOg('pitch', 'ja'),
  'sound/recorder': () => soundOg('recorder', 'ja'),
  'sound/tone': () => soundOg('tone', 'ja'),
  'sound/tuner': () => soundOg('tuner', 'ja'),
  'sqrt': () => sqrtHub('ja'),
  'stop': () => stopHub('ja'),
  'test': () => intlOg('test/ja'),
  'text': () => intlOg('text/ja'),
  'text/case': () => textOg('case', 'ja'),
  'text/char': () => glyphHub('ja'),
  'text/clean': () => textOg('clean', 'ja'),
  'text/dedupe': () => textOg('dedupe', 'ja'),
  'text/emoticon': () => textOg('emoticon', 'ja'),
  'text/lorem': () => textOg('lorem', 'ja'),
  'text/manuscript': () => textOg('manuscript', 'ja'),
  'text/regex': () => regexHub('ja'),
  'text/replace': () => textOg('replace', 'ja'),
  'text/special-char': () => textOg('special-char', 'ja'),
  'time': () => intlOg('time/ja'),
  'time/alarm': () => timeOg('alarm', 'ja'),
  'time/date-add': () => timeOg('date-add', 'ja'),
  'time/lived': () => timeOg('lived', 'ja'),
  'time/pomodoro': () => timeOg('pomodoro', 'ja'),
  'time/stopwatch': () => timeOg('stopwatch', 'ja'),
  'time/timer': () => timeOg('timer', 'ja'),
  'time/timezone': () => timeOg('timezone', 'ja'),
  'time/weeknumber': () => timeOg('weeknumber', 'ja'),
  'time/workdays': () => timeOg('workdays', 'ja'),
  'time/worldclock': () => timeOg('worldclock', 'ja'),
  'times': () => timesHub('ja'),
  'tire': () => tireHub('ja'),
  'torque': () => torqueHub('ja'),
  'wifi': () => wifiHub('ja'),
  'windchill': () => windchillHub('ja'),
  'wire': () => wireHub('ja'),
  'year': () => yearHub('ja'),
};

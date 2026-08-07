/**
 * 프랑스어 공유 카드 — 경로에서 카드로 가는 대응표.
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
import { hubCard as bloodHub } from '@/lib/blood/route';
import { hubCard as braHub } from '@/lib/bra/route';
import { hubCard as wineHub } from '@/lib/wine/route';
import { hubCard as bedHub } from '@/lib/bed/route';
import { hubCard as quakeHub } from '@/lib/quake/route';
import { hubCard as microwaveHub } from '@/lib/microwave/route';
import { hubCard as golfHub } from '@/lib/golf/route';
import { hubCard as powerbankHub } from '@/lib/powerbank/route';
import { hubCard as lumberHub } from '@/lib/lumber/route';
import { hubCard as tatamiHub } from '@/lib/tatami/route';
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
  'snap/lighting': () => newSnapCard('fr', 'lighting'),
  'snap/sharpness': () => newSnapCard('fr', 'sharpness'),
  'snap/white-balance': () => newSnapCard('fr', 'white-balance'),
  'snap/distance': () => newSnapCard('fr', 'distance'),
  'snap/mirror': () => newSnapCard('fr', 'mirror'),
  'snap/id-photo': () => newSnapCard('fr', 'id-photo'),
  'snap/head-pose': () => newSnapCard('fr', 'head-pose'),
  'snap/real-smile': () => newSnapCard('fr', 'real-smile'),
  'snap/eye-open': () => newSnapCard('fr', 'eye-open'),
  'snap/framing': () => newSnapCard('fr', 'framing'),
  '': () => intlOg('home/fr'),
  'air': () => airHub('fr'),
  'altitude': () => altitudeHub('fr'),
  'ampere': () => ampereHub('fr'),
  'bed': () => bedHub('fr'),
  'blood': () => bloodHub('fr'),
  'bra': () => braHub('fr'),
  'password': () => passwordHub('fr'),
  'cable': () => cableHub('fr'),
  'lumber': () => lumberHub('fr'),
  'tatami': () => tatamiHub('fr'),
  'bignum': () => bignumHub('fr'),
  'gengo': () => gengoHub('fr'),
  'golf': () => golfHub('fr'),
  'viewing': () => viewingHub('fr'),
  'wine': () => wineHub('fr'),
  'petfood': () => petfoodHub('fr'),
  'size': () => sizeHub('fr'),
  'uv': () => uvHub('fr'),
  'hike': () => hikeHub('fr'),
  'insul': () => insulHub('fr'),
  'ascii': () => asciiHub('fr'),
  'bandwidth': () => bandwidthHub('fr'),
  'battery': () => batteryHub('fr'),
  'body': () => {
    const meta = sectionMeta(BODY_SECTION, 'fr');
    return ogCard({
      icon: '🩺',
      eyebrow: meta.section,
      title: meta.hubTitle,
      desc: meta.hubLead,
      from: BODY_SECTION.ogFrom,
      to: BODY_SECTION.ogTo,
    });
  },
  'calculator': () => intlOg('calculator/fr'),
  'checklist': () => intlOg('checklist/fr'),
  'chmod': () => chmodHub('fr'),
  'cidr': () => cidrHub('fr'),
  'code': () => codeHub('fr'),
  'color': () => intlOg('color/fr'),
  'color/colorblind': () => colorOg('colorblind', 'fr'),
  'color/contrast': () => colorOg('contrast', 'fr'),
  'color/gradient': () => colorOg('gradient', 'fr'),
  'color/mixer': () => colorOg('mixer', 'fr'),
  'color/name': () => colorOg('name', 'fr'),
  'color/palette': () => colorOg('palette', 'fr'),
  'color/random': () => colorOg('random', 'fr'),
  'color/shades': () => colorOg('shades', 'fr'),
  'color/shadow': () => colorOg('shadow', 'fr'),
  'color/temperature': () => colorOg('temperature', 'fr'),
  'convert': () => intlOg('convert/fr'),
  'country': () => {
    const ui = COUNTRY_UI['fr'];
    return ogCard({
      icon: '🧭',
      eyebrow: ui.section,
      title: ui.hubTitle,
      desc: ui.hubLead,
      from: COUNTRY_SECTION.ogFrom,
      to: COUNTRY_SECTION.ogTo,
    });
  },
  'css': () => cssHub('fr'),
  'darts': () => dartsHub('fr'),
  'device': () => intlOg('device/fr'),
  'device/gamepad': () => deviceOg('gamepad', 'fr'),
  'device/info': () => deviceOg('info', 'fr'),
  'device/keyboard': () => deviceOg('keyboard', 'fr'),
  'device/mic': () => deviceOg('mic', 'fr'),
  'device/monitor': () => deviceOg('monitor', 'fr'),
  'device/mouse': () => deviceOg('mouse', 'fr'),
  'device/refresh-rate': () => deviceOg('refresh-rate', 'fr'),
  'device/screen': () => deviceHub('fr'),
  'device/speaker': () => deviceOg('speaker', 'fr'),
  'device/touch': () => deviceOg('touch', 'fr'),
  'device/webcam': () => deviceOg('webcam', 'fr'),
  'dew': () => dewHub('fr'),
  'drill': () => drillHub('fr'),
  'element': () => elementHub('fr'),
  'ext': () => extHub('fr'),
  'food': () => intlOg('food/fr'),
  'food/baking-pan': () => foodOg('baking-pan', 'fr'),
  'food/coffee': () => foodOg('coffee', 'fr'),
  'food/measure': () => foodOg('measure', 'fr'),
  'food/oven': () => foodOg('oven', 'fr'),
  'food/pasta': () => foodOg('pasta', 'fr'),
  'food/recipe-scale': () => foodOg('recipe-scale', 'fr'),
  'food/rice': () => foodOg('rice', 'fr'),
  'food/salt': () => foodOg('salt', 'fr'),
  'food/steak': () => foodOg('steak', 'fr'),
  'food/storage': () => foodOg('storage', 'fr'),
  'fortune': () => intlOg('fortune/fr'),
  'fortune/animal': () => intlOg('fortune/animal/fr'),
  'fortune/biorhythm': () => intlOg('fortune/biorhythm/fr'),
  'fortune/birth-stone': () => intlOg('fortune/birth-stone/fr'),
  'fortune/blood-match': () => intlOg('fortune/blood-match/fr'),
  'fortune/blood-type': () => intlOg('fortune/blood-type/fr'),
  'fortune/card': () => tarotHub('fr'),
  'fortune/daily': () => intlOg('fortune/daily/fr'),
  'fortune/daily-tarot': () => intlOg('fortune/daily-tarot/fr'),
  'fortune/dream': () => intlOg('fortune/dream/fr'),
  'fortune/lucky-numbers': () => intlOg('fortune/lucky-numbers/fr'),
  'fortune/mbti': () => intlOg('fortune/mbti/fr'),
  'fortune/mbti-match': () => intlOg('fortune/mbti-match/fr'),
  'fortune/saju': () => intlOg('fortune/saju/fr'),
  'fortune/star-match': () => intlOg('fortune/star-match/fr'),
  'fortune/tarot': () => intlOg('fortune/tarot/fr'),
  'fortune/tarot-yesno': () => intlOg('fortune/tarot-yesno/fr'),
  'fortune/today-color': () => intlOg('fortune/today-color/fr'),
  'fortune/zodiac': () => intlOg('fortune/zodiac/fr'),
  'fortune/zodiac-match': () => intlOg('fortune/zodiac-match/fr'),
  'fraction': () => fractionHub('fr'),
  'fret': () => fretHub('fr'),
  'game': () => intlOg('game/fr'),
  'game/aim': () => gameOg('aim', 'fr'),
  'game/chess': () => chessHub('fr'),
  'game/color-blind': () => gameOg('color-blind', 'fr'),
  'game/cps': () => gameOg('cps', 'fr'),
  'game/cube': () => cubeHub('fr'),
  'game/hearing': () => gameOg('hearing', 'fr'),
  'game/math': () => gameOg('math', 'fr'),
  'game/memory': () => gameOg('memory', 'fr'),
  'game/number-memory': () => gameOg('number-memory', 'fr'),
  'game/poker': () => pokerHub('fr'),
  'game/reaction': () => gameOg('reaction', 'fr'),
  'game/sequence': () => gameOg('sequence', 'fr'),
  'game/typing': () => gameOg('typing', 'fr'),
  'generator': () => intlOg('generator/fr'),
  'geometry': () => {
    const meta = sectionMeta(GEO_SECTION, 'fr');
    return ogCard({
      icon: '📐',
      eyebrow: meta.section,
      title: meta.hubTitle,
      desc: meta.hubLead,
      from: GEO_SECTION.ogFrom,
      to: GEO_SECTION.ogTo,
    });
  },
  'gravity': () => gravityHub('fr'),
  'hanja': () => {
    const ui = HANJA_UI['fr'];
    return ogCard({
      icon: '📖',
      eyebrow: ui.section,
      title: ui.hubTitle,
      desc: ui.hubLead,
      from: HANJA_SECTION.ogFrom,
      to: HANJA_SECTION.ogTo,
    });
  },
  'html': () => htmlHub('fr'),
  'http': () => httpHub('fr'),
  'image': () => intlOg('image/fr'),
  'image/compress': () => imageOg('compress', 'fr'),
  'image/convert': () => imageOg('convert', 'fr'),
  'image/crop': () => imageOg('crop', 'fr'),
  'image/merge': () => imageOg('merge', 'fr'),
  'image/mosaic': () => imageOg('mosaic', 'fr'),
  'image/palette': () => imageOg('palette', 'fr'),
  'image/resize': () => imageOg('resize', 'fr'),
  'image/rotate': () => imageOg('rotate', 'fr'),
  'image/size': () => imgsizeHub('fr'),
  'keycode': () => keycodeHub('fr'),
  'lumen': () => lumenHub('fr'),
  'microwave': () => microwaveHub('fr'),
  'metro': () => metroHub('fr'),
  'music': () => musicHub('fr'),
  'number': () => numberHub('fr'),
  'pace': () => paceHub('fr'),
  'paper': () => paperHub('fr'),
  'powerbank': () => powerbankHub('fr'),
  'quake': () => quakeHub('fr'),
  'port': () => portHub('fr'),
  'quiz': () => intlOg('quiz/fr'),
  'random': () => intlOg('random/fr'),
  'random/dice': () => diceHub('fr'),
  'rate': () => {
    const meta = sectionMeta(RATE_SECTION, 'fr');
    return ogCard({
      icon: '📐',
      eyebrow: meta.section,
      title: meta.hubTitle,
      desc: meta.hubLead,
      from: RATE_SECTION.ogFrom,
      to: RATE_SECTION.ogTo,
    });
  },
  'rem': () => remHub('fr'),
  'resistor': () => resistorHub('fr'),
  'roman': () => romanHub('fr'),
  'screw': () => screwHub('fr'),
  'search': () => intlOg('search/fr'),
  'snap': () => intlOg('snap/fr'),
  'snap/animal-face': () => intlOg('snap/animal-face/fr'),
  'snap/couple-match': () => intlOg('snap/couple-match/fr'),
  'snap/expression': () => intlOg('snap/expression/fr'),
  'snap/face-reading': () => intlOg('snap/face-reading/fr'),
  'snap/face-symmetry': () => intlOg('snap/face-symmetry/fr'),
  'snap/first-impression': () => intlOg('snap/first-impression/fr'),
  'snap/golden-ratio': () => intlOg('snap/golden-ratio/fr'),
  'snap/handwriting': () => intlOg('snap/handwriting/fr'),
  'snap/lens': () => lensHub('fr'),
  'snap/personal-color': () => intlOg('snap/personal-color/fr'),
  'snap/photo-mood': () => intlOg('snap/photo-mood/fr'),
  'snap/smile-score': () => intlOg('snap/smile-score/fr'),
  'sound': () => intlOg('sound/fr'),
  'sound/binaural': () => soundOg('binaural', 'fr'),
  'sound/bpm-tap': () => soundOg('bpm-tap', 'fr'),
  'sound/decibel': () => soundOg('decibel', 'fr'),
  'sound/hz': () => soundHub('fr'),
  'sound/metronome': () => soundOg('metronome', 'fr'),
  'sound/mosquito': () => soundOg('mosquito', 'fr'),
  'sound/noise': () => soundOg('noise', 'fr'),
  'sound/pitch': () => soundOg('pitch', 'fr'),
  'sound/recorder': () => soundOg('recorder', 'fr'),
  'sound/tone': () => soundOg('tone', 'fr'),
  'sound/tuner': () => soundOg('tuner', 'fr'),
  'sqrt': () => sqrtHub('fr'),
  'stop': () => stopHub('fr'),
  'test': () => intlOg('test/fr'),
  'text': () => intlOg('text/fr'),
  'text/case': () => textOg('case', 'fr'),
  'text/char': () => glyphHub('fr'),
  'text/clean': () => textOg('clean', 'fr'),
  'text/dedupe': () => textOg('dedupe', 'fr'),
  'text/emoticon': () => textOg('emoticon', 'fr'),
  'text/lorem': () => textOg('lorem', 'fr'),
  'text/manuscript': () => textOg('manuscript', 'fr'),
  'text/regex': () => regexHub('fr'),
  'text/replace': () => textOg('replace', 'fr'),
  'text/special-char': () => textOg('special-char', 'fr'),
  'time': () => intlOg('time/fr'),
  'time/alarm': () => timeOg('alarm', 'fr'),
  'time/date-add': () => timeOg('date-add', 'fr'),
  'time/lived': () => timeOg('lived', 'fr'),
  'time/pomodoro': () => timeOg('pomodoro', 'fr'),
  'time/stopwatch': () => timeOg('stopwatch', 'fr'),
  'time/timer': () => timeOg('timer', 'fr'),
  'time/timezone': () => timeOg('timezone', 'fr'),
  'time/weeknumber': () => timeOg('weeknumber', 'fr'),
  'time/workdays': () => timeOg('workdays', 'fr'),
  'time/worldclock': () => timeOg('worldclock', 'fr'),
  'times': () => timesHub('fr'),
  'tire': () => tireHub('fr'),
  'torque': () => torqueHub('fr'),
  'wifi': () => wifiHub('fr'),
  'windchill': () => windchillHub('fr'),
  'wire': () => wireHub('fr'),
  'year': () => yearHub('fr'),
};

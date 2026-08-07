/**
 * 중국어 간체 공유 카드 — 경로에서 카드로 가는 대응표.
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
import { hubCard as heredityHub } from '@/lib/heredity/route';
import { hubCard as exposureHub } from '@/lib/exposure/route';
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
  'snap/lighting': () => newSnapCard('zh-hans', 'lighting'),
  'snap/sharpness': () => newSnapCard('zh-hans', 'sharpness'),
  'snap/white-balance': () => newSnapCard('zh-hans', 'white-balance'),
  'snap/distance': () => newSnapCard('zh-hans', 'distance'),
  'snap/mirror': () => newSnapCard('zh-hans', 'mirror'),
  'snap/id-photo': () => newSnapCard('zh-hans', 'id-photo'),
  'snap/head-pose': () => newSnapCard('zh-hans', 'head-pose'),
  'snap/real-smile': () => newSnapCard('zh-hans', 'real-smile'),
  'snap/eye-open': () => newSnapCard('zh-hans', 'eye-open'),
  'snap/framing': () => newSnapCard('zh-hans', 'framing'),
  '': () => intlOg('home/zh-hans'),
  'air': () => airHub('zh'),
  'altitude': () => altitudeHub('zh'),
  'ampere': () => ampereHub('zh'),
  'bed': () => bedHub('zh'),
  'blood': () => bloodHub('zh'),
  'exposure': () => exposureHub('zh'),
  'heredity': () => heredityHub('zh'),
  'bra': () => braHub('zh'),
  'password': () => passwordHub('zh'),
  'cable': () => cableHub('zh'),
  'lumber': () => lumberHub('zh'),
  'tatami': () => tatamiHub('zh'),
  'bignum': () => bignumHub('zh'),
  'gengo': () => gengoHub('zh'),
  'golf': () => golfHub('zh'),
  'viewing': () => viewingHub('zh'),
  'wine': () => wineHub('zh'),
  'petfood': () => petfoodHub('zh'),
  'size': () => sizeHub('zh'),
  'uv': () => uvHub('zh'),
  'hike': () => hikeHub('zh'),
  'insul': () => insulHub('zh'),
  'ascii': () => asciiHub('zh'),
  'bandwidth': () => bandwidthHub('zh'),
  'battery': () => batteryHub('zh'),
  'body': () => {
    const meta = sectionMeta(BODY_SECTION, 'zh-hans');
    return ogCard({
      icon: '🩺',
      eyebrow: meta.section,
      title: meta.hubTitle,
      desc: meta.hubLead,
      from: BODY_SECTION.ogFrom,
      to: BODY_SECTION.ogTo,
    });
  },
  'calculator': () => intlOg('calculator/zh-hans'),
  'checklist': () => intlOg('checklist/zh-hans'),
  'chmod': () => chmodHub('zh'),
  'cidr': () => cidrHub('zh'),
  'code': () => codeHub('zh'),
  'color': () => intlOg('color/en'),
  'color/colorblind': () => colorOg('colorblind', 'zh-hans'),
  'color/contrast': () => colorOg('contrast', 'zh-hans'),
  'color/gradient': () => colorOg('gradient', 'zh-hans'),
  'color/mixer': () => colorOg('mixer', 'zh-hans'),
  'color/name': () => colorOg('name', 'zh-hans'),
  'color/palette': () => colorOg('palette', 'zh-hans'),
  'color/random': () => colorOg('random', 'zh-hans'),
  'color/shades': () => colorOg('shades', 'zh-hans'),
  'color/shadow': () => colorOg('shadow', 'zh-hans'),
  'color/temperature': () => colorOg('temperature', 'zh-hans'),
  'convert': () => intlOg('convert/ja'),
  'country': () => {
    const ui = COUNTRY_UI['zh-hans'];
    return ogCard({
      icon: '🧭',
      eyebrow: ui.section,
      title: ui.hubTitle,
      desc: ui.hubLead,
      from: COUNTRY_SECTION.ogFrom,
      to: COUNTRY_SECTION.ogTo,
    });
  },
  'css': () => cssHub('zh'),
  'darts': () => dartsHub('zh'),
  'device': () => intlOg('device/ja'),
  'device/gamepad': () => deviceOg('gamepad', 'zh-hans'),
  'device/info': () => deviceOg('info', 'zh-hans'),
  'device/keyboard': () => deviceOg('keyboard', 'zh-hans'),
  'device/mic': () => deviceOg('mic', 'zh-hans'),
  'device/monitor': () => deviceOg('monitor', 'zh-hans'),
  'device/mouse': () => deviceOg('mouse', 'zh-hans'),
  'device/refresh-rate': () => deviceOg('refresh-rate', 'zh-hans'),
  'device/screen': () => deviceHub('zh'),
  'device/speaker': () => deviceOg('speaker', 'zh-hans'),
  'device/touch': () => deviceOg('touch', 'zh-hans'),
  'device/webcam': () => deviceOg('webcam', 'zh-hans'),
  'dew': () => dewHub('zh'),
  'drill': () => drillHub('zh'),
  'element': () => elementHub('zh'),
  'ext': () => extHub('zh'),
  'food': () => intlOg('food/en'),
  'food/baking-pan': () => foodOg('baking-pan', 'zh-hans'),
  'food/coffee': () => foodOg('coffee', 'zh-hans'),
  'food/measure': () => foodOg('measure', 'zh-hans'),
  'food/oven': () => foodOg('oven', 'zh-hans'),
  'food/pasta': () => foodOg('pasta', 'zh-hans'),
  'food/recipe-scale': () => foodOg('recipe-scale', 'zh-hans'),
  'food/rice': () => foodOg('rice', 'zh-hans'),
  'food/salt': () => foodOg('salt', 'zh-hans'),
  'food/steak': () => foodOg('steak', 'zh-hans'),
  'food/storage': () => foodOg('storage', 'zh-hans'),
  'fortune': () => intlOg('fortune/zh-hans'),
  'fortune/animal': () => intlOg('fortune/animal/zh-hans'),
  'fortune/biorhythm': () => intlOg('fortune/biorhythm/zh-hans'),
  'fortune/birth-stone': () => intlOg('fortune/birth-stone/zh-hans'),
  'fortune/blood-match': () => intlOg('fortune/blood-match/zh-hans'),
  'fortune/blood-type': () => intlOg('fortune/blood-type/zh-hans'),
  'fortune/card': () => tarotHub('zh'),
  'fortune/daily': () => intlOg('fortune/daily/zh-hans'),
  'fortune/daily-tarot': () => intlOg('fortune/daily-tarot/zh-hans'),
  'fortune/dream': () => intlOg('fortune/dream/zh-hans'),
  'fortune/lucky-numbers': () => intlOg('fortune/lucky-numbers/zh-hans'),
  'fortune/mbti': () => intlOg('fortune/mbti/zh-hans'),
  'fortune/mbti-match': () => intlOg('fortune/mbti-match/zh-hans'),
  'fortune/saju': () => intlOg('fortune/saju/zh-hans'),
  'fortune/star-match': () => intlOg('fortune/star-match/zh-hans'),
  'fortune/tarot': () => intlOg('fortune/tarot/zh-hans'),
  'fortune/tarot-yesno': () => intlOg('fortune/tarot-yesno/zh-hans'),
  'fortune/today-color': () => intlOg('fortune/today-color/zh-hans'),
  'fortune/zodiac': () => intlOg('fortune/zodiac/zh-hans'),
  'fortune/zodiac-match': () => intlOg('fortune/zodiac-match/zh-hans'),
  'fraction': () => fractionHub('zh'),
  'fret': () => fretHub('zh'),
  'game': () => intlOg('game/ja'),
  'game/aim': () => gameOg('aim', 'zh-hans'),
  'game/chess': () => chessHub('zh'),
  'game/color-blind': () => gameOg('color-blind', 'zh-hans'),
  'game/cps': () => gameOg('cps', 'zh-hans'),
  'game/cube': () => cubeHub('zh'),
  'game/hearing': () => gameOg('hearing', 'zh-hans'),
  'game/math': () => gameOg('math', 'zh-hans'),
  'game/memory': () => gameOg('memory', 'zh-hans'),
  'game/number-memory': () => gameOg('number-memory', 'zh-hans'),
  'game/poker': () => pokerHub('zh'),
  'game/reaction': () => gameOg('reaction', 'zh-hans'),
  'game/sequence': () => gameOg('sequence', 'zh-hans'),
  'game/typing': () => gameOg('typing', 'zh-hans'),
  'generator': () => intlOg('generator/zh-hans'),
  'geometry': () => {
    const meta = sectionMeta(GEO_SECTION, 'zh-hans');
    return ogCard({
      icon: '📐',
      eyebrow: meta.section,
      title: meta.hubTitle,
      desc: meta.hubLead,
      from: GEO_SECTION.ogFrom,
      to: GEO_SECTION.ogTo,
    });
  },
  'gravity': () => gravityHub('zh'),
  'hanja': () => {
    const ui = HANJA_UI['zh-hans'];
    return ogCard({
      icon: '📖',
      eyebrow: ui.section,
      title: ui.hubTitle,
      desc: ui.hubLead,
      from: HANJA_SECTION.ogFrom,
      to: HANJA_SECTION.ogTo,
    });
  },
  'html': () => htmlHub('zh'),
  'http': () => httpHub('zh'),
  'image': () => intlOg('image/ja'),
  'image/compress': () => imageOg('compress', 'zh-hans'),
  'image/convert': () => imageOg('convert', 'zh-hans'),
  'image/crop': () => imageOg('crop', 'zh-hans'),
  'image/merge': () => imageOg('merge', 'zh-hans'),
  'image/mosaic': () => imageOg('mosaic', 'zh-hans'),
  'image/palette': () => imageOg('palette', 'zh-hans'),
  'image/resize': () => imageOg('resize', 'zh-hans'),
  'image/rotate': () => imageOg('rotate', 'zh-hans'),
  'image/size': () => imgsizeHub('zh'),
  'keycode': () => keycodeHub('zh'),
  'lumen': () => lumenHub('zh'),
  'microwave': () => microwaveHub('zh'),
  'metro': () => metroHub('zh'),
  'music': () => musicHub('zh'),
  'number': () => numberHub('zh'),
  'pace': () => paceHub('zh'),
  'paper': () => paperHub('zh'),
  'powerbank': () => powerbankHub('zh'),
  'quake': () => quakeHub('zh'),
  'port': () => portHub('zh'),
  'quiz': () => intlOg('quiz/zh-hans'),
  'random': () => intlOg('random/ja'),
  'random/dice': () => diceHub('zh'),
  'rate': () => {
    const meta = sectionMeta(RATE_SECTION, 'zh-hans');
    return ogCard({
      icon: '📐',
      eyebrow: meta.section,
      title: meta.hubTitle,
      desc: meta.hubLead,
      from: RATE_SECTION.ogFrom,
      to: RATE_SECTION.ogTo,
    });
  },
  'rem': () => remHub('zh'),
  'resistor': () => resistorHub('zh'),
  'roman': () => romanHub('zh'),
  'screw': () => screwHub('zh'),
  'search': () => intlOg('search/ja'),
  'snap': () => intlOg('snap/zh-hans'),
  'snap/animal-face': () => intlOg('snap/animal-face/zh-hans'),
  'snap/couple-match': () => intlOg('snap/couple-match/zh-hans'),
  'snap/expression': () => intlOg('snap/expression/zh-hans'),
  'snap/face-reading': () => intlOg('snap/face-reading/zh-hans'),
  'snap/face-symmetry': () => intlOg('snap/face-symmetry/zh-hans'),
  'snap/first-impression': () => intlOg('snap/first-impression/zh-hans'),
  'snap/golden-ratio': () => intlOg('snap/golden-ratio/zh-hans'),
  'snap/handwriting': () => intlOg('snap/handwriting/zh-hans'),
  'snap/lens': () => lensHub('zh'),
  'snap/personal-color': () => intlOg('snap/personal-color/zh-hans'),
  'snap/photo-mood': () => intlOg('snap/photo-mood/zh-hans'),
  'snap/smile-score': () => intlOg('snap/smile-score/zh-hans'),
  'sound': () => intlOg('sound/ja'),
  'sound/binaural': () => soundOg('binaural', 'zh-hans'),
  'sound/bpm-tap': () => soundOg('bpm-tap', 'zh-hans'),
  'sound/decibel': () => soundOg('decibel', 'zh-hans'),
  'sound/hz': () => soundHub('zh'),
  'sound/metronome': () => soundOg('metronome', 'zh-hans'),
  'sound/mosquito': () => soundOg('mosquito', 'zh-hans'),
  'sound/noise': () => soundOg('noise', 'zh-hans'),
  'sound/pitch': () => soundOg('pitch', 'zh-hans'),
  'sound/recorder': () => soundOg('recorder', 'zh-hans'),
  'sound/tone': () => soundOg('tone', 'zh-hans'),
  'sound/tuner': () => soundOg('tuner', 'zh-hans'),
  'sqrt': () => sqrtHub('zh'),
  'stop': () => stopHub('zh'),
  'test': () => intlOg('test/zh-hans'),
  'text': () => intlOg('text/ja'),
  'text/case': () => textOg('case', 'zh-hans'),
  'text/char': () => glyphHub('zh'),
  'text/clean': () => textOg('clean', 'zh-hans'),
  'text/dedupe': () => textOg('dedupe', 'zh-hans'),
  'text/emoticon': () => textOg('emoticon', 'zh-hans'),
  'text/lorem': () => textOg('lorem', 'zh-hans'),
  'text/manuscript': () => textOg('manuscript', 'zh-hans'),
  'text/regex': () => regexHub('zh'),
  'text/replace': () => textOg('replace', 'zh-hans'),
  'text/special-char': () => textOg('special-char', 'zh-hans'),
  'time': () => intlOg('time/en'),
  'time/alarm': () => timeOg('alarm', 'zh-hans'),
  'time/date-add': () => timeOg('date-add', 'zh-hans'),
  'time/lived': () => timeOg('lived', 'zh-hans'),
  'time/pomodoro': () => timeOg('pomodoro', 'zh-hans'),
  'time/stopwatch': () => timeOg('stopwatch', 'zh-hans'),
  'time/timer': () => timeOg('timer', 'zh-hans'),
  'time/timezone': () => timeOg('timezone', 'zh-hans'),
  'time/weeknumber': () => timeOg('weeknumber', 'zh-hans'),
  'time/workdays': () => timeOg('workdays', 'zh-hans'),
  'time/worldclock': () => timeOg('worldclock', 'zh-hans'),
  'times': () => timesHub('zh'),
  'tire': () => tireHub('zh'),
  'torque': () => torqueHub('zh'),
  'wifi': () => wifiHub('zh'),
  'windchill': () => windchillHub('zh'),
  'wire': () => wireHub('zh'),
  'year': () => yearHub('zh'),
};

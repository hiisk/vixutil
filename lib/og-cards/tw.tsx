/**
 * 중국어 번체 공유 카드 — 경로에서 카드로 가는 대응표.
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
  'snap/lighting': () => newSnapCard('zh-hant', 'lighting'),
  'snap/sharpness': () => newSnapCard('zh-hant', 'sharpness'),
  'snap/white-balance': () => newSnapCard('zh-hant', 'white-balance'),
  'snap/distance': () => newSnapCard('zh-hant', 'distance'),
  'snap/mirror': () => newSnapCard('zh-hant', 'mirror'),
  'snap/id-photo': () => newSnapCard('zh-hant', 'id-photo'),
  'snap/head-pose': () => newSnapCard('zh-hant', 'head-pose'),
  'snap/real-smile': () => newSnapCard('zh-hant', 'real-smile'),
  'snap/eye-open': () => newSnapCard('zh-hant', 'eye-open'),
  'snap/framing': () => newSnapCard('zh-hant', 'framing'),
  '': () => intlOg('home/zh-hant'),
  'air': () => airHub('tw'),
  'altitude': () => altitudeHub('tw'),
  'ampere': () => ampereHub('tw'),
  'bra': () => braHub('tw'),
  'petfood': () => petfoodHub('tw'),
  'size': () => sizeHub('tw'),
  'uv': () => uvHub('tw'),
  'hike': () => hikeHub('tw'),
  'insul': () => insulHub('tw'),
  'ascii': () => asciiHub('tw'),
  'bandwidth': () => bandwidthHub('tw'),
  'battery': () => batteryHub('tw'),
  'body': () => {
    const meta = sectionMeta(BODY_SECTION, 'zh-hant');
    return ogCard({
      icon: '🩺',
      eyebrow: meta.section,
      title: meta.hubTitle,
      desc: meta.hubLead,
      from: BODY_SECTION.ogFrom,
      to: BODY_SECTION.ogTo,
    });
  },
  'calculator': () => intlOg('calculator/zh-hant'),
  'checklist': () => intlOg('checklist/zh-hant'),
  'chmod': () => chmodHub('tw'),
  'cidr': () => cidrHub('tw'),
  'code': () => codeHub('tw'),
  'color': () => intlOg('color/en'),
  'color/colorblind': () => colorOg('colorblind', 'zh-hant'),
  'color/contrast': () => colorOg('contrast', 'zh-hant'),
  'color/gradient': () => colorOg('gradient', 'zh-hant'),
  'color/mixer': () => colorOg('mixer', 'zh-hant'),
  'color/name': () => colorOg('name', 'zh-hant'),
  'color/palette': () => colorOg('palette', 'zh-hant'),
  'color/random': () => colorOg('random', 'zh-hant'),
  'color/shades': () => colorOg('shades', 'zh-hant'),
  'color/shadow': () => colorOg('shadow', 'zh-hant'),
  'color/temperature': () => colorOg('temperature', 'zh-hant'),
  'convert': () => intlOg('convert/ja'),
  'country': () => {
    const ui = COUNTRY_UI['zh-hant'];
    return ogCard({
      icon: '🧭',
      eyebrow: ui.section,
      title: ui.hubTitle,
      desc: ui.hubLead,
      from: COUNTRY_SECTION.ogFrom,
      to: COUNTRY_SECTION.ogTo,
    });
  },
  'css': () => cssHub('tw'),
  'darts': () => dartsHub('tw'),
  'device': () => intlOg('device/ja'),
  'device/gamepad': () => deviceOg('gamepad', 'zh-hant'),
  'device/info': () => deviceOg('info', 'zh-hant'),
  'device/keyboard': () => deviceOg('keyboard', 'zh-hant'),
  'device/mic': () => deviceOg('mic', 'zh-hant'),
  'device/monitor': () => deviceOg('monitor', 'zh-hant'),
  'device/mouse': () => deviceOg('mouse', 'zh-hant'),
  'device/refresh-rate': () => deviceOg('refresh-rate', 'zh-hant'),
  'device/screen': () => deviceHub('tw'),
  'device/speaker': () => deviceOg('speaker', 'zh-hant'),
  'device/touch': () => deviceOg('touch', 'zh-hant'),
  'device/webcam': () => deviceOg('webcam', 'zh-hant'),
  'dew': () => dewHub('tw'),
  'drill': () => drillHub('tw'),
  'element': () => elementHub('tw'),
  'ext': () => extHub('tw'),
  'food': () => intlOg('food/en'),
  'food/baking-pan': () => foodOg('baking-pan', 'zh-hant'),
  'food/coffee': () => foodOg('coffee', 'zh-hant'),
  'food/measure': () => foodOg('measure', 'zh-hant'),
  'food/oven': () => foodOg('oven', 'zh-hant'),
  'food/pasta': () => foodOg('pasta', 'zh-hant'),
  'food/recipe-scale': () => foodOg('recipe-scale', 'zh-hant'),
  'food/rice': () => foodOg('rice', 'zh-hant'),
  'food/salt': () => foodOg('salt', 'zh-hant'),
  'food/steak': () => foodOg('steak', 'zh-hant'),
  'food/storage': () => foodOg('storage', 'zh-hant'),
  'fortune': () => intlOg('fortune/zh-hant'),
  'fortune/animal': () => intlOg('fortune/animal/zh-hant'),
  'fortune/biorhythm': () => intlOg('fortune/biorhythm/zh-hant'),
  'fortune/birth-stone': () => intlOg('fortune/birth-stone/zh-hant'),
  'fortune/blood-match': () => intlOg('fortune/blood-match/zh-hant'),
  'fortune/blood-type': () => intlOg('fortune/blood-type/zh-hant'),
  'fortune/card': () => tarotHub('tw'),
  'fortune/daily': () => intlOg('fortune/daily/zh-hant'),
  'fortune/daily-tarot': () => intlOg('fortune/daily-tarot/zh-hant'),
  'fortune/dream': () => intlOg('fortune/dream/zh-hant'),
  'fortune/lucky-numbers': () => intlOg('fortune/lucky-numbers/zh-hant'),
  'fortune/mbti': () => intlOg('fortune/mbti/zh-hant'),
  'fortune/mbti-match': () => intlOg('fortune/mbti-match/zh-hant'),
  'fortune/saju': () => intlOg('fortune/saju/zh-hant'),
  'fortune/star-match': () => intlOg('fortune/star-match/zh-hant'),
  'fortune/tarot': () => intlOg('fortune/tarot/zh-hant'),
  'fortune/tarot-yesno': () => intlOg('fortune/tarot-yesno/zh-hant'),
  'fortune/today-color': () => intlOg('fortune/today-color/zh-hant'),
  'fortune/zodiac': () => intlOg('fortune/zodiac/zh-hant'),
  'fortune/zodiac-match': () => intlOg('fortune/zodiac-match/zh-hant'),
  'fraction': () => fractionHub('tw'),
  'fret': () => fretHub('tw'),
  'game': () => intlOg('game/ja'),
  'game/aim': () => gameOg('aim', 'zh-hant'),
  'game/chess': () => chessHub('tw'),
  'game/color-blind': () => gameOg('color-blind', 'zh-hant'),
  'game/cps': () => gameOg('cps', 'zh-hant'),
  'game/cube': () => cubeHub('tw'),
  'game/hearing': () => gameOg('hearing', 'zh-hant'),
  'game/math': () => gameOg('math', 'zh-hant'),
  'game/memory': () => gameOg('memory', 'zh-hant'),
  'game/number-memory': () => gameOg('number-memory', 'zh-hant'),
  'game/poker': () => pokerHub('tw'),
  'game/reaction': () => gameOg('reaction', 'zh-hant'),
  'game/sequence': () => gameOg('sequence', 'zh-hant'),
  'game/typing': () => gameOg('typing', 'zh-hant'),
  'generator': () => intlOg('generator/zh-hant'),
  'geometry': () => {
    const meta = sectionMeta(GEO_SECTION, 'zh-hant');
    return ogCard({
      icon: '📐',
      eyebrow: meta.section,
      title: meta.hubTitle,
      desc: meta.hubLead,
      from: GEO_SECTION.ogFrom,
      to: GEO_SECTION.ogTo,
    });
  },
  'gravity': () => gravityHub('tw'),
  'hanja': () => {
    const ui = HANJA_UI['zh-hant'];
    return ogCard({
      icon: '📖',
      eyebrow: ui.section,
      title: ui.hubTitle,
      desc: ui.hubLead,
      from: HANJA_SECTION.ogFrom,
      to: HANJA_SECTION.ogTo,
    });
  },
  'html': () => htmlHub('tw'),
  'http': () => httpHub('tw'),
  'image': () => intlOg('image/ja'),
  'image/compress': () => imageOg('compress', 'zh-hant'),
  'image/convert': () => imageOg('convert', 'zh-hant'),
  'image/crop': () => imageOg('crop', 'zh-hant'),
  'image/merge': () => imageOg('merge', 'zh-hant'),
  'image/mosaic': () => imageOg('mosaic', 'zh-hant'),
  'image/palette': () => imageOg('palette', 'zh-hant'),
  'image/resize': () => imageOg('resize', 'zh-hant'),
  'image/rotate': () => imageOg('rotate', 'zh-hant'),
  'image/size': () => imgsizeHub('tw'),
  'keycode': () => keycodeHub('tw'),
  'lumen': () => lumenHub('tw'),
  'metro': () => metroHub('tw'),
  'music': () => musicHub('tw'),
  'number': () => numberHub('tw'),
  'pace': () => paceHub('tw'),
  'paper': () => paperHub('tw'),
  'port': () => portHub('tw'),
  'quiz': () => intlOg('quiz/zh-hant'),
  'random': () => intlOg('random/ja'),
  'random/dice': () => diceHub('tw'),
  'rate': () => {
    const meta = sectionMeta(RATE_SECTION, 'zh-hant');
    return ogCard({
      icon: '📐',
      eyebrow: meta.section,
      title: meta.hubTitle,
      desc: meta.hubLead,
      from: RATE_SECTION.ogFrom,
      to: RATE_SECTION.ogTo,
    });
  },
  'rem': () => remHub('tw'),
  'resistor': () => resistorHub('tw'),
  'roman': () => romanHub('tw'),
  'screw': () => screwHub('tw'),
  'search': () => intlOg('search/ja'),
  'snap': () => intlOg('snap/zh-hant'),
  'snap/animal-face': () => intlOg('snap/animal-face/zh-hant'),
  'snap/couple-match': () => intlOg('snap/couple-match/zh-hant'),
  'snap/expression': () => intlOg('snap/expression/zh-hant'),
  'snap/face-reading': () => intlOg('snap/face-reading/zh-hant'),
  'snap/face-symmetry': () => intlOg('snap/face-symmetry/zh-hant'),
  'snap/first-impression': () => intlOg('snap/first-impression/zh-hant'),
  'snap/golden-ratio': () => intlOg('snap/golden-ratio/zh-hant'),
  'snap/handwriting': () => intlOg('snap/handwriting/zh-hant'),
  'snap/lens': () => lensHub('tw'),
  'snap/personal-color': () => intlOg('snap/personal-color/zh-hant'),
  'snap/photo-mood': () => intlOg('snap/photo-mood/zh-hant'),
  'snap/smile-score': () => intlOg('snap/smile-score/zh-hant'),
  'sound': () => intlOg('sound/ja'),
  'sound/binaural': () => soundOg('binaural', 'zh-hant'),
  'sound/bpm-tap': () => soundOg('bpm-tap', 'zh-hant'),
  'sound/decibel': () => soundOg('decibel', 'zh-hant'),
  'sound/hz': () => soundHub('tw'),
  'sound/metronome': () => soundOg('metronome', 'zh-hant'),
  'sound/mosquito': () => soundOg('mosquito', 'zh-hant'),
  'sound/noise': () => soundOg('noise', 'zh-hant'),
  'sound/pitch': () => soundOg('pitch', 'zh-hant'),
  'sound/recorder': () => soundOg('recorder', 'zh-hant'),
  'sound/tone': () => soundOg('tone', 'zh-hant'),
  'sound/tuner': () => soundOg('tuner', 'zh-hant'),
  'sqrt': () => sqrtHub('tw'),
  'stop': () => stopHub('tw'),
  'test': () => intlOg('test/zh-hant'),
  'text': () => intlOg('text/ja'),
  'text/case': () => textOg('case', 'zh-hant'),
  'text/char': () => glyphHub('tw'),
  'text/clean': () => textOg('clean', 'zh-hant'),
  'text/dedupe': () => textOg('dedupe', 'zh-hant'),
  'text/emoticon': () => textOg('emoticon', 'zh-hant'),
  'text/lorem': () => textOg('lorem', 'zh-hant'),
  'text/manuscript': () => textOg('manuscript', 'zh-hant'),
  'text/regex': () => regexHub('tw'),
  'text/replace': () => textOg('replace', 'zh-hant'),
  'text/special-char': () => textOg('special-char', 'zh-hant'),
  'time': () => intlOg('time/en'),
  'time/alarm': () => timeOg('alarm', 'zh-hant'),
  'time/date-add': () => timeOg('date-add', 'zh-hant'),
  'time/lived': () => timeOg('lived', 'zh-hant'),
  'time/pomodoro': () => timeOg('pomodoro', 'zh-hant'),
  'time/stopwatch': () => timeOg('stopwatch', 'zh-hant'),
  'time/timer': () => timeOg('timer', 'zh-hant'),
  'time/timezone': () => timeOg('timezone', 'zh-hant'),
  'time/weeknumber': () => timeOg('weeknumber', 'zh-hant'),
  'time/workdays': () => timeOg('workdays', 'zh-hant'),
  'time/worldclock': () => timeOg('worldclock', 'zh-hant'),
  'times': () => timesHub('tw'),
  'tire': () => tireHub('tw'),
  'torque': () => torqueHub('tw'),
  'wifi': () => wifiHub('tw'),
  'windchill': () => windchillHub('tw'),
  'wire': () => wireHub('tw'),
  'year': () => yearHub('tw'),
};

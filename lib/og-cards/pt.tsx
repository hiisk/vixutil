/**
 * 포르투갈어 공유 카드 — 경로에서 카드로 가는 대응표.
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
import { hubCard as drinkHub } from '@/lib/drink/route';
import { hubCard as purifierHub } from '@/lib/purifier/route';
import { hubCard as flightHub } from '@/lib/flight/route';
import { hubCard as raidHub } from '@/lib/raid/route';
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
import { hubCard as dofHub } from '@/lib/dof/route';
import { hubCard as gearHub } from '@/lib/gear/route';
import { hubCard as filamentHub } from '@/lib/filament/route';
import { hubCard as bpmHub } from '@/lib/bpm/route';
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
import { CRAFT_SECTION } from '@/lib/craft-section';
import { hubCard as glyphHub } from '@/lib/glyph/route';
import { hubCard as gravityHub } from '@/lib/gravity/route';
import { HANJA_SECTION, HANJA_UI } from '@/lib/hanja-ui';
import { hubCard as htmlHub } from '@/lib/html/route';
import { hubCard as httpHub } from '@/lib/http/route';
import { hubCard as cmdHub } from '@/lib/cmd/route';
import { hubCard as scHub } from '@/lib/shortcut/route';
import { hubCard as emojiHub } from '@/lib/emoji/route';
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
  'snap/lighting': () => newSnapCard('pt-br', 'lighting'),
  'snap/sharpness': () => newSnapCard('pt-br', 'sharpness'),
  'snap/face-thirds': () => newSnapCard('pt-br', 'face-thirds'),
  'snap/eye-spacing': () => newSnapCard('pt-br', 'eye-spacing'),
  'snap/face-shape': () => newSnapCard('pt-br', 'face-shape'),
  'snap/brows': () => newSnapCard('pt-br', 'brows'),
  'snap/lips': () => newSnapCard('pt-br', 'lips'),
  'snap/contrast': () => newSnapCard('pt-br', 'contrast'),
  'snap/backdrop': () => newSnapCard('pt-br', 'backdrop'),
  'snap/white-balance': () => newSnapCard('pt-br', 'white-balance'),
  'snap/distance': () => newSnapCard('pt-br', 'distance'),
  'snap/mirror': () => newSnapCard('pt-br', 'mirror'),
  'snap/id-photo': () => newSnapCard('pt-br', 'id-photo'),
  'snap/head-pose': () => newSnapCard('pt-br', 'head-pose'),
  'snap/real-smile': () => newSnapCard('pt-br', 'real-smile'),
  'snap/eye-open': () => newSnapCard('pt-br', 'eye-open'),
  'snap/framing': () => newSnapCard('pt-br', 'framing'),
  '': () => intlOg('home/pt-br'),
  'air': () => airHub('pt'),
  'altitude': () => altitudeHub('pt'),
  'ampere': () => ampereHub('pt'),
  'bed': () => bedHub('pt'),
  'blood': () => bloodHub('pt'),
  'exposure': () => exposureHub('pt'),
  'heredity': () => heredityHub('pt'),
  'raid': () => raidHub('pt'),
  'flight': () => flightHub('pt'),
  'purifier': () => purifierHub('pt'),
  'drink': () => drinkHub('pt'),
  'bra': () => braHub('pt'),
  'password': () => passwordHub('pt'),
  'cable': () => cableHub('pt'),
  'lumber': () => lumberHub('pt'),
  'tatami': () => tatamiHub('pt'),
  'bignum': () => bignumHub('pt'),
  'gengo': () => gengoHub('pt'),
  'golf': () => golfHub('pt'),
  'viewing': () => viewingHub('pt'),
  'wine': () => wineHub('pt'),
  'petfood': () => petfoodHub('pt'),
  'size': () => sizeHub('pt'),
  'dof': () => dofHub('pt'),
  'gear': () => gearHub('pt'),
  'filament': () => filamentHub('pt'),
  'bpm': () => bpmHub('pt'),
  'uv': () => uvHub('pt'),
  'hike': () => hikeHub('pt'),
  'insul': () => insulHub('pt'),
  'ascii': () => asciiHub('pt'),
  'bandwidth': () => bandwidthHub('pt'),
  'battery': () => batteryHub('pt'),
  'body': () => {
    const meta = sectionMeta(BODY_SECTION, 'pt-br');
    return ogCard({
      icon: '🩺',
      eyebrow: meta.section,
      title: meta.hubTitle,
      desc: meta.hubLead,
      from: BODY_SECTION.ogFrom,
      to: BODY_SECTION.ogTo,
    });
  },
  'calculator': () => intlOg('calculator/pt-br'),
  'checklist': () => intlOg('checklist/pt-br'),
  'chmod': () => chmodHub('pt'),
  'cidr': () => cidrHub('pt'),
  'code': () => codeHub('pt'),
  'color': () => intlOg('color/pt-br'),
  'color/colorblind': () => colorOg('colorblind', 'pt-br'),
  'color/contrast': () => colorOg('contrast', 'pt-br'),
  'color/gradient': () => colorOg('gradient', 'pt-br'),
  'color/mixer': () => colorOg('mixer', 'pt-br'),
  'color/name': () => colorOg('name', 'pt-br'),
  'color/palette': () => colorOg('palette', 'pt-br'),
  'color/random': () => colorOg('random', 'pt-br'),
  'color/shades': () => colorOg('shades', 'pt-br'),
  'color/shadow': () => colorOg('shadow', 'pt-br'),
  'color/temperature': () => colorOg('temperature', 'pt-br'),
  'convert': () => intlOg('convert/pt-br'),
  'country': () => {
    const ui = COUNTRY_UI['pt-br'];
    return ogCard({
      icon: '🧭',
      eyebrow: ui.section,
      title: ui.hubTitle,
      desc: ui.hubLead,
      from: COUNTRY_SECTION.ogFrom,
      to: COUNTRY_SECTION.ogTo,
    });
  },
  'css': () => cssHub('pt'),
  'darts': () => dartsHub('pt'),
  'device': () => intlOg('device/pt-br'),
  'device/gamepad': () => deviceOg('gamepad', 'pt-br'),
  'device/info': () => deviceOg('info', 'pt-br'),
  'device/keyboard': () => deviceOg('keyboard', 'pt-br'),
  'device/mic': () => deviceOg('mic', 'pt-br'),
  'device/monitor': () => deviceOg('monitor', 'pt-br'),
  'device/mouse': () => deviceOg('mouse', 'pt-br'),
  'device/refresh-rate': () => deviceOg('refresh-rate', 'pt-br'),
  'device/screen': () => deviceHub('pt'),
  'device/speaker': () => deviceOg('speaker', 'pt-br'),
  'device/touch': () => deviceOg('touch', 'pt-br'),
  'device/webcam': () => deviceOg('webcam', 'pt-br'),
  'dew': () => dewHub('pt'),
  'drill': () => drillHub('pt'),
  'element': () => elementHub('pt'),
  'ext': () => extHub('pt'),
  'food': () => intlOg('food/pt-br'),
  'food/baking-pan': () => foodOg('baking-pan', 'pt-br'),
  'food/coffee': () => foodOg('coffee', 'pt-br'),
  'food/measure': () => foodOg('measure', 'pt-br'),
  'food/oven': () => foodOg('oven', 'pt-br'),
  'food/pasta': () => foodOg('pasta', 'pt-br'),
  'food/recipe-scale': () => foodOg('recipe-scale', 'pt-br'),
  'food/rice': () => foodOg('rice', 'pt-br'),
  'food/salt': () => foodOg('salt', 'pt-br'),
  'food/steak': () => foodOg('steak', 'pt-br'),
  'food/storage': () => foodOg('storage', 'pt-br'),
  'fortune': () => intlOg('fortune/pt-br'),
  'fortune/animal': () => intlOg('fortune/animal/pt-br'),
  'fortune/biorhythm': () => intlOg('fortune/biorhythm/pt-br'),
  'fortune/birth-stone': () => intlOg('fortune/birth-stone/pt-br'),
  'fortune/blood-match': () => intlOg('fortune/blood-match/pt-br'),
  'fortune/blood-type': () => intlOg('fortune/blood-type/pt-br'),
  'fortune/card': () => tarotHub('pt'),
  'fortune/daily': () => intlOg('fortune/daily/pt-br'),
  'fortune/daily-tarot': () => intlOg('fortune/daily-tarot/pt-br'),
  'fortune/dream': () => intlOg('fortune/dream/pt-br'),
  'fortune/lucky-numbers': () => intlOg('fortune/lucky-numbers/pt-br'),
  'fortune/mbti': () => intlOg('fortune/mbti/pt-br'),
  'fortune/mbti-match': () => intlOg('fortune/mbti-match/pt-br'),
  'fortune/saju': () => intlOg('fortune/saju/pt-br'),
  'fortune/star-match': () => intlOg('fortune/star-match/pt-br'),
  'fortune/tarot': () => intlOg('fortune/tarot/pt-br'),
  'fortune/tarot-yesno': () => intlOg('fortune/tarot-yesno/pt-br'),
  'fortune/today-color': () => intlOg('fortune/today-color/pt-br'),
  'fortune/zodiac': () => intlOg('fortune/zodiac/pt-br'),
  'fortune/zodiac-match': () => intlOg('fortune/zodiac-match/pt-br'),
  'fraction': () => fractionHub('pt'),
  'fret': () => fretHub('pt'),
  'game': () => intlOg('game/pt-br'),
  'game/aim': () => gameOg('aim', 'pt-br'),
  'game/chess': () => chessHub('pt'),
  'game/color-blind': () => gameOg('color-blind', 'pt-br'),
  'game/cps': () => gameOg('cps', 'pt-br'),
  'game/cube': () => cubeHub('pt'),
  'game/hearing': () => gameOg('hearing', 'pt-br'),
  'game/math': () => gameOg('math', 'pt-br'),
  'game/memory': () => gameOg('memory', 'pt-br'),
  'game/number-memory': () => gameOg('number-memory', 'pt-br'),
  'game/poker': () => pokerHub('pt'),
  'game/reaction': () => gameOg('reaction', 'pt-br'),
  'game/sequence': () => gameOg('sequence', 'pt-br'),
  'game/typing': () => gameOg('typing', 'pt-br'),
  'game/stroop': () => gameOg('stroop', 'pt-br'),
  'game/dot-count': () => gameOg('dot-count', 'pt-br'),
  'game/nback': () => gameOg('nback', 'pt-br'),
  'game/rotation': () => gameOg('rotation', 'pt-br'),
  'game/beat': () => gameOg('beat', 'pt-br'),
  'game/peripheral': () => gameOg('peripheral', 'pt-br'),
  'generator': () => intlOg('generator/pt-br'),
  'craft': () => {
    const meta = sectionMeta(CRAFT_SECTION, 'pt-br');
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
    const meta = sectionMeta(GEO_SECTION, 'pt-br');
    return ogCard({
      icon: '📐',
      eyebrow: meta.section,
      title: meta.hubTitle,
      desc: meta.hubLead,
      from: GEO_SECTION.ogFrom,
      to: GEO_SECTION.ogTo,
    });
  },
  'gravity': () => gravityHub('pt'),
  'hanja': () => {
    const ui = HANJA_UI['pt-br'];
    return ogCard({
      icon: '📖',
      eyebrow: ui.section,
      title: ui.hubTitle,
      desc: ui.hubLead,
      from: HANJA_SECTION.ogFrom,
      to: HANJA_SECTION.ogTo,
    });
  },
  'html': () => htmlHub('pt'),
  'cmd': () => cmdHub('pt'),
  'shortcut': () => scHub('pt'),
  'emoji': () => emojiHub('pt'),
  'http': () => httpHub('pt'),
  'image': () => intlOg('image/pt-br'),
  'image/compress': () => imageOg('compress', 'pt-br'),
  'image/convert': () => imageOg('convert', 'pt-br'),
  'image/crop': () => imageOg('crop', 'pt-br'),
  'image/merge': () => imageOg('merge', 'pt-br'),
  'image/mosaic': () => imageOg('mosaic', 'pt-br'),
  'image/palette': () => imageOg('palette', 'pt-br'),
  'image/resize': () => imageOg('resize', 'pt-br'),
  'image/rotate': () => imageOg('rotate', 'pt-br'),
  'image/watermark': () => imageOg('watermark', 'pt-br'),
  'image/adjust': () => imageOg('adjust', 'pt-br'),
  'image/frame': () => imageOg('frame', 'pt-br'),
  'image/round': () => imageOg('round', 'pt-br'),
  'image/split': () => imageOg('split', 'pt-br'),
  'image/favicon': () => imageOg('favicon', 'pt-br'),
  'image/size': () => imgsizeHub('pt'),
  'keycode': () => keycodeHub('pt'),
  'lumen': () => lumenHub('pt'),
  'microwave': () => microwaveHub('pt'),
  'metro': () => metroHub('pt'),
  'music': () => musicHub('pt'),
  'number': () => numberHub('pt'),
  'pace': () => paceHub('pt'),
  'paper': () => paperHub('pt'),
  'powerbank': () => powerbankHub('pt'),
  'quake': () => quakeHub('pt'),
  'port': () => portHub('pt'),
  'quiz': () => intlOg('quiz/pt-br'),
  'random': () => intlOg('random/pt-br'),
  'random/dice': () => diceHub('pt'),
  'rate': () => {
    const meta = sectionMeta(RATE_SECTION, 'pt-br');
    return ogCard({
      icon: '📐',
      eyebrow: meta.section,
      title: meta.hubTitle,
      desc: meta.hubLead,
      from: RATE_SECTION.ogFrom,
      to: RATE_SECTION.ogTo,
    });
  },
  'rem': () => remHub('pt'),
  'resistor': () => resistorHub('pt'),
  'roman': () => romanHub('pt'),
  'screw': () => screwHub('pt'),
  'search': () => intlOg('search/pt-br'),
  'snap': () => intlOg('snap/pt-br'),
  'snap/animal-face': () => intlOg('snap/animal-face/pt-br'),
  'snap/couple-match': () => intlOg('snap/couple-match/pt-br'),
  'snap/expression': () => intlOg('snap/expression/pt-br'),
  'snap/face-reading': () => intlOg('snap/face-reading/pt-br'),
  'snap/face-symmetry': () => intlOg('snap/face-symmetry/pt-br'),
  'snap/first-impression': () => intlOg('snap/first-impression/pt-br'),
  'snap/golden-ratio': () => intlOg('snap/golden-ratio/pt-br'),
  'snap/handwriting': () => intlOg('snap/handwriting/pt-br'),
  'snap/lens': () => lensHub('pt'),
  'snap/personal-color': () => intlOg('snap/personal-color/pt-br'),
  'snap/photo-mood': () => intlOg('snap/photo-mood/pt-br'),
  'snap/smile-score': () => intlOg('snap/smile-score/pt-br'),
  'sound': () => intlOg('sound/pt-br'),
  'sound/binaural': () => soundOg('binaural', 'pt-br'),
  'sound/bpm-tap': () => soundOg('bpm-tap', 'pt-br'),
  'sound/decibel': () => soundOg('decibel', 'pt-br'),
  'sound/hz': () => soundHub('pt'),
  'sound/metronome': () => soundOg('metronome', 'pt-br'),
  'sound/mosquito': () => soundOg('mosquito', 'pt-br'),
  'sound/noise': () => soundOg('noise', 'pt-br'),
  'sound/pitch': () => soundOg('pitch', 'pt-br'),
  'sound/recorder': () => soundOg('recorder', 'pt-br'),
  'sound/tone': () => soundOg('tone', 'pt-br'),
  'sound/tuner': () => soundOg('tuner', 'pt-br'),
  'sqrt': () => sqrtHub('pt'),
  'stop': () => stopHub('pt'),
  'test': () => intlOg('test/pt-br'),
  'text': () => intlOg('text/pt-br'),
  'text/case': () => textOg('case', 'pt-br'),
  'text/char': () => glyphHub('pt'),
  'text/clean': () => textOg('clean', 'pt-br'),
  'text/dedupe': () => textOg('dedupe', 'pt-br'),
  'text/emoticon': () => textOg('emoticon', 'pt-br'),
  'text/lorem': () => textOg('lorem', 'pt-br'),
  'text/manuscript': () => textOg('manuscript', 'pt-br'),
  'text/regex': () => regexHub('pt'),
  'text/replace': () => textOg('replace', 'pt-br'),
  'text/mask': () => textOg('mask', 'pt-br'),
  'text/wrap': () => textOg('wrap', 'pt-br'),
  'text/table': () => textOg('table', 'pt-br'),
  'text/slug': () => textOg('slug', 'pt-br'),
  'text/reverse': () => textOg('reverse', 'pt-br'),
  'text/vertical': () => textOg('vertical', 'pt-br'),
  'text/special-char': () => textOg('special-char', 'pt-br'),
  'time': () => intlOg('time/pt-br'),
  'time/alarm': () => timeOg('alarm', 'pt-br'),
  'time/date-add': () => timeOg('date-add', 'pt-br'),
  'time/lived': () => timeOg('lived', 'pt-br'),
  'time/pomodoro': () => timeOg('pomodoro', 'pt-br'),
  'time/stopwatch': () => timeOg('stopwatch', 'pt-br'),
  'time/timer': () => timeOg('timer', 'pt-br'),
  'time/timezone': () => timeOg('timezone', 'pt-br'),
  'time/weeknumber': () => timeOg('weeknumber', 'pt-br'),
  'time/workdays': () => timeOg('workdays', 'pt-br'),
  'time/worldclock': () => timeOg('worldclock', 'pt-br'),
  'times': () => timesHub('pt'),
  'tire': () => tireHub('pt'),
  'torque': () => torqueHub('pt'),
  'wifi': () => wifiHub('pt'),
  'windchill': () => windchillHub('pt'),
  'wire': () => wireHub('pt'),
  'year': () => yearHub('pt'),
};

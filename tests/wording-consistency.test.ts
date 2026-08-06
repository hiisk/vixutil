/**
 * 같은 말을 섹션마다 다르게 번역하지 않았는지 본다.
 *
 * 원문이 통일돼 있으면 번역도 통일돼야 한다. 한국어가 열네 섹션에서 모두
 * "읽는 방법"이고 영어가 모두 "How to read this", 일본어가 모두 "読み方"인데
 * 중국어만 怎么看这张表·怎么看这些数字·怎么看这些式子…로 아홉 갈래가 났던 적이
 * 있다. 섹션을 하나씩 옮기다 보면 그 자리에서는 다 자연스러워 보이는데, 사이트를
 * 훑으면 같은 자리 제목이 페이지마다 다른 말이 된다.
 *
 * 한 섹션만 보고 있으면 절대 안 보이는 종류다. 그래서 섹션을 가로질러 센다 —
 * 어떤 열쇠의 한국어가 n가지면, 다른 언어도 n가지를 넘으면 안 된다.
 *
 * 반대(번역이 원문보다 적은 것)는 막지 않는다. 한국어가 "이 값 이상"과 "이
 * 값 이하"로 갈라 쓰는 자리를 다른 언어가 한 낱말로 덮는 일은 정상이다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { LANG_CODES, type Lang } from '../lib/i18n/lang.ts';

import { DICE_UI } from '../lib/dice/ui.ts';
import { DEVICE_UI } from '../lib/device/ui.ts';
import { REGEX_UI } from '../lib/regex/ui.ts';
import { IMG_SIZE_UI } from '../lib/imgsize/ui.ts';
import { HTTP_UI } from '../lib/http/ui.ts';
import { CSS_UI } from '../lib/css/ui.ts';
import { LENS_UI } from '../lib/lens/ui.ts';
import { HTML_UI } from '../lib/html/ui.ts';
import { EXT_UI } from '../lib/ext/ui.ts';
import { GLYPH_UI } from '../lib/glyph/ui.ts';
import { ELEMENT_UI } from '../lib/element/ui.ts';
import { SOUND_UI } from '../lib/sound/ui.ts';
import { TAROT_UI } from '../lib/tarot/ui.ts';
import { CUBE_UI } from '../lib/cube/ui.ts';
import { MUSIC_UI } from '../lib/music/ui.ts';
import { METRO_UI } from '../lib/metro/ui.ts';
import { NUMBER_UI } from '../lib/number/ui.ts';
import { ASCII_UI } from '../lib/ascii/ui.ts';
import { PORT_UI } from '../lib/port/ui.ts';
import { CHMOD_UI } from '../lib/chmod/ui.ts';
import { RESISTOR_UI } from '../lib/resistor/ui.ts';
import { FRACTION_UI } from '../lib/fraction/ui.ts';
import { KEYCODE_UI } from '../lib/keycode/ui.ts';
import { CIDR_UI } from '../lib/cidr/ui.ts';
import { CODE_UI } from '../lib/code/ui.ts';
import { DARTS_UI } from '../lib/darts/ui.ts';
import { TIMES_UI } from '../lib/times/ui.ts';
import { SQRT_UI } from '../lib/sqrt/ui.ts';
import { ROMAN_UI } from '../lib/roman/ui.ts';
import { TIRE_UI } from '../lib/tire/ui.ts';
import { SCREW_UI } from '../lib/screw/ui.ts';
import { YEAR_UI } from '../lib/year/ui.ts';
import { PACE_UI } from '../lib/pace/ui.ts';
import { PX_UI } from '../lib/rem/ui.ts';
import { STOP_UI } from '../lib/stop/ui.ts';
import { ALTITUDE_UI } from '../lib/altitude/ui.ts';
import { WIFI_UI } from '../lib/wifi/ui.ts';
import { FRET_UI } from '../lib/fret/ui.ts';
import { GRAVITY_UI } from '../lib/gravity/ui.ts';
import { WINDCHILL_UI } from '../lib/windchill/ui.ts';
import { DEW_UI } from '../lib/dew/ui.ts';
import { DRILL_UI } from '../lib/drill/ui.ts';
import { BANDWIDTH_UI } from '../lib/bandwidth/ui.ts';
import { BATTERY_UI } from '../lib/battery/ui.ts';
import { WIRE_UI } from '../lib/wire/ui.ts';
import { PAPER_UI } from '../lib/paper/ui.ts';
import { TORQUE_UI } from '../lib/torque/ui.ts';
import { LUMEN_UI } from '../lib/lumen/ui.ts';
import { AMPERE_UI } from '../lib/ampere/ui.ts';
import { UV_UI } from '../lib/uv/ui.ts';
import { HIKE_UI } from '../lib/hike/ui.ts';
import { INSUL_UI } from '../lib/insul/ui.ts';
import { AIR_UI } from '../lib/air/ui.ts';
import { SIZE_UI } from '../lib/size/ui.ts';
import { BRA_UI } from '../lib/bra/ui.ts';
import { PETFOOD_UI } from '../lib/petfood/ui.ts';
import { PASSWORD_UI } from '../lib/password/ui.ts';
import { VIEWING_UI } from '../lib/viewing/ui.ts';
import { BIGNUM_UI } from '../lib/bignum/ui.ts';
import { GENGO_UI } from '../lib/gengo/ui.ts';
import { CABLE_UI } from '../lib/cable/ui.ts';
import { TATAMI_UI } from '../lib/tatami/ui.ts';
import { LUMBER_UI } from '../lib/lumber/ui.ts';
import { POWERBANK_UI } from '../lib/powerbank/ui.ts';
import { GOLF_UI } from '../lib/golf/ui.ts';

type AnyUI = Record<Lang, Record<string, unknown>>;

/** 섹션마다 UI 모양이 다르다. 여기서는 열쇠 이름과 문자열 값만 보므로 넓혀서 받는다. */
const ui = (u: unknown) => u as AnyUI;

const SECTIONS: Record<string, AnyUI> = {
  dice: ui(DICE_UI), device: ui(DEVICE_UI), regex: ui(REGEX_UI),
  imgsize: ui(IMG_SIZE_UI), http: ui(HTTP_UI), css: ui(CSS_UI),
  lens: ui(LENS_UI), html: ui(HTML_UI), ext: ui(EXT_UI),
  glyph: ui(GLYPH_UI), element: ui(ELEMENT_UI), sound: ui(SOUND_UI),
  tarot: ui(TAROT_UI), cube: ui(CUBE_UI), music: ui(MUSIC_UI),
  metro: ui(METRO_UI), number: ui(NUMBER_UI), ascii: ui(ASCII_UI), port: ui(PORT_UI), chmod: ui(CHMOD_UI), resistor: ui(RESISTOR_UI), fraction: ui(FRACTION_UI), keycode: ui(KEYCODE_UI), cidr: ui(CIDR_UI), code: ui(CODE_UI), darts: ui(DARTS_UI), times: ui(TIMES_UI), sqrt: ui(SQRT_UI), roman: ui(ROMAN_UI), tire: ui(TIRE_UI), screw: ui(SCREW_UI), year: ui(YEAR_UI), pace: ui(PACE_UI), rem: ui(PX_UI), stop: ui(STOP_UI), altitude: ui(ALTITUDE_UI), wifi: ui(WIFI_UI), fret: ui(FRET_UI), gravity: ui(GRAVITY_UI), windchill: ui(WINDCHILL_UI), dew: ui(DEW_UI), drill: ui(DRILL_UI), bandwidth: ui(BANDWIDTH_UI), battery: ui(BATTERY_UI), wire: ui(WIRE_UI), paper: ui(PAPER_UI), torque: ui(TORQUE_UI), lumen: ui(LUMEN_UI), ampere: ui(AMPERE_UI), uv: ui(UV_UI), hike: ui(HIKE_UI), insul: ui(INSUL_UI), air: ui(AIR_UI), size: ui(SIZE_UI), bra: ui(BRA_UI), petfood: ui(PETFOOD_UI), password: ui(PASSWORD_UI), viewing: ui(VIEWING_UI), bignum: ui(BIGNUM_UI), gengo: ui(GENGO_UI), cable: ui(CABLE_UI), tatami: ui(TATAMI_UI), lumber: ui(LUMBER_UI), powerbank: ui(POWERBANK_UI), golf: ui(GOLF_UI),
};

/**
 * 섹션마다 뜻이 다른 열쇠는 뺀다.
 *
 * section은 섹션 이름 자체라 열여섯 가지인 것이 맞고, 제목·설명은 페이지마다
 * 달라야 한다. 여기 세는 것은 "어느 섹션에서나 같은 뜻인 자리"뿐이다.
 */
const PER_SECTION = new Set([
  'section', 'hubTitle', 'hubLead', 'hubMetaTitle', 'hubMetaDesc',
]);

test('원문이 한 가지인 자리는 번역도 한 가지다', () => {
  // 열쇠 → 언어 → 그 열쇠에 쓰인 값들
  const byKey = new Map<string, Map<Lang, Map<string, string[]>>>();

  for (const [name, ui] of Object.entries(SECTIONS)) {
    for (const key of Object.keys(ui.ko)) {
      if (PER_SECTION.has(key)) continue;
      if (typeof ui.ko[key] !== 'string') continue;
      const perLang = byKey.get(key) ?? new Map<Lang, Map<string, string[]>>();
      byKey.set(key, perLang);
      for (const lang of LANG_CODES) {
        const v = ui[lang]?.[key];
        if (typeof v !== 'string') continue;
        const seen = perLang.get(lang) ?? new Map<string, string[]>();
        perLang.set(lang, seen);
        seen.set(v, [...(seen.get(v) ?? []), name]);
      }
    }
  }

  const bad: string[] = [];
  for (const [key, perLang] of byKey) {
    const koCount = perLang.get('ko')?.size ?? 0;
    // 두 섹션 아래는 흩어질 여지가 없다
    const sections = [...(perLang.get('ko')?.values() ?? [])].flat().length;
    if (sections < 3 || koCount === 0) continue;
    for (const lang of LANG_CODES) {
      if (lang === 'ko') continue;
      const seen = perLang.get(lang);
      if (!seen || seen.size <= koCount) continue;
      const spread = [...seen].map(([v, secs]) => `${v} (${secs.join(', ')})`).join('\n      ');
      bad.push(`${key} — 한국어 ${koCount}가지인데 ${lang}은 ${seen.size}가지:\n      ${spread}`);
    }
  }

  assert.deepEqual(
    bad, [],
    `같은 자리를 섹션마다 다른 말로 옮겼다. 원문이 통일돼 있으면 번역도 통일하라:\n\n  ${bad.join('\n\n  ')}`,
  );
});

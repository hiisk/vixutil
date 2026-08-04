/**
 * 지판 계산이 스스로 어긋나지 않는지 본다.
 *
 * 프렛 하나가 반음이라는 것이 이 표의 전제다. 그래서 검사는 열두 칸을 올리면
 * 주파수가 정확히 두 배가 되는지, 프렛 자리가 12프렛에서 줄 길이의 절반이
 * 되는지를 본다 — 둘 다 평균율에서 곧장 따라 나오는 값이다.
 *
 * 같은 음이 나는 자리들도 MIDI 번호로 되짚는다. 표를 적어 두었다면 못 잡을 것을,
 * 계산으로 내면 서로 어긋나는 순간 걸린다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';

import { DOTS, FRET_ICON, FRET_SLUGS, MAX_FRET, OPEN_MIDI, SCALES, SPOTS, STRINGS, slugOf, spotOf } from '../lib/fret/list.ts';
import { acrossFrets, alongString, distanceOf, fretFacts, hzOf, midiOf, nameOf } from '../lib/fret/facts.ts';
import { noteName } from '../lib/music/notes.ts';
import { FRET_UI } from '../lib/fret/ui.ts';
import { LANG_CODES } from '../lib/i18n/lang.ts';
import { DENSE } from './han.ts';

test('100가지가 넘고 주소가 겹치지 않는다', () => {
  assert.ok(SPOTS.length >= 100, `${SPOTS.length}가지뿐이다`);
  assert.equal(SPOTS.length, STRINGS * (MAX_FRET + 1));
  assert.equal(SPOTS.length, 144);
  assert.equal(new Set(FRET_SLUGS).size, SPOTS.length, 'slug 중복');
  assert.deepEqual(spotOf('s3-f5'), { string: 3, fret: 5 });
  assert.equal(spotOf('s7-f0'), undefined, '일곱 번째 줄은 없다');
  assert.equal(spotOf('s1-f24'), undefined, '24프렛은 이 표 밖이다');
});

test('주소와 자리가 서로를 되돌린다', () => {
  for (const p of SPOTS) {
    assert.deepEqual(spotOf(slugOf(p)), p, `${slugOf(p)}: 되읽으면 다른 자리가 나온다`);
  }
  assert.equal(slugOf({ string: 6, fret: 0 }), 's6-f0');
});

test('표준 조율의 줄 사이가 5·5·5·4·5 반음이다', () => {
  // 1번 줄에서 아래로 세므로 두 번째 자리(2번과 3번 사이)가 네 반음이다.
  // 6번 줄에서 위로 세는 흔한 표기로는 5-5-5-4-5가 된다 — 같은 사실이다.
  const gaps = OPEN_MIDI.slice(0, -1).map((m, i) => m - OPEN_MIDI[i + 1]);
  assert.deepEqual(gaps, [5, 4, 5, 5, 5], '2번과 3번 사이만 네 반음이다');
  assert.deepEqual([...gaps].reverse(), [5, 5, 5, 4, 5], '아래에서 세면 5-5-5-4-5다');
  assert.equal(OPEN_MIDI.length, STRINGS);
  // 1번 줄과 6번 줄은 두 옥타브 차이다
  assert.equal(OPEN_MIDI[0] - OPEN_MIDI[5], 24);
  assert.equal(midiOf({ string: 1, fret: 5 }), 69, '1번 줄 5프렛이 A4다');
  assert.equal(hzOf({ string: 1, fret: 5 }), 440, '그 자리가 440Hz다');
});

test('열두 칸을 올리면 주파수가 두 배가 된다', () => {
  for (const p of SPOTS) {
    if (p.fret + 12 > MAX_FRET) continue;
    const up = hzOf({ string: p.string, fret: p.fret + 12 });
    assert.ok(Math.abs(up / hzOf(p) - 2) < 0.001, `${slugOf(p)}: 한 옥타브 위가 ${up / hzOf(p)}배다`);
  }
  // 개방현 여섯 줄의 주파수 — 널리 실린 값들
  assert.equal(hzOf({ string: 6, fret: 0 }), 82.41);
  assert.equal(hzOf({ string: 5, fret: 0 }), 110);
  assert.equal(hzOf({ string: 1, fret: 0 }), 329.63);
});

test('프렛 자리가 12프렛에서 줄의 절반이 된다', () => {
  for (const s of SCALES) {
    assert.equal(distanceOf(0, s.mm), 0, `${s.key}: 0프렛은 너트다`);
    assert.equal(distanceOf(12, s.mm), Math.round(s.mm / 2 * 10) / 10, `${s.key}: 12프렛이 절반이 아니다`);
    // 24프렛은 남은 절반을 다시 반으로 나눈 자리라 4분의 3이다
    assert.ok(Math.abs(distanceOf(24, s.mm) - s.mm * 0.75) < 0.06, `${s.key}: 24프렛이 4분의 3이 아니다`);
    // 프렛은 갈수록 촘촘해진다 — 간격이 줄어야 한다
    let prevGap = Infinity;
    for (let f = 1; f <= MAX_FRET; f++) {
      const gap = distanceOf(f, s.mm) - distanceOf(f - 1, s.mm);
      assert.ok(gap > 0, `${s.key} ${f}프렛: 앞 프렛보다 너트에 가깝다`);
      assert.ok(gap < prevGap, `${s.key} ${f}프렛: 간격이 넓어졌다`);
      assert.ok(distanceOf(f, s.mm) < s.mm, `${s.key} ${f}프렛: 브리지를 넘었다`);
      prevGap = gap;
    }
  }
  assert.equal(distanceOf(12, 648), 324);
  // 널리 쓰이는 규칙 — 다음 프렛까지 남은 길이의 17.817분의 1이다
  assert.ok(Math.abs(distanceOf(1, 648) - 648 / 17.817) < 0.1, '첫 프렛은 스케일의 17.817분의 1이다');
});

test('울리는 길이와 너트까지의 거리를 더하면 줄 길이다', () => {
  for (const p of SPOTS) {
    for (const d of fretFacts(p).distances) {
      const scale = SCALES.find(s => s.key === d.key)!.mm;
      assert.ok(Math.abs(d.mm + d.from - scale) < 0.11, `${slugOf(p)} ${d.key}: 합이 ${d.mm + d.from}이다`);
      assert.ok(d.from > 0, `${slugOf(p)} ${d.key}: 울릴 길이가 없다`);
    }
  }
});

test('같은 음이 나는 자리들이 서로를 가리킨다', () => {
  for (const p of SPOTS) {
    const f = fretFacts(p);
    for (const o of f.sameNote) {
      assert.equal(midiOf(o), f.midi, `${slugOf(p)}: ${slugOf(o)}는 다른 음이다`);
      assert.notEqual(o.string, p.string, `${slugOf(p)}: 같은 줄이 섞였다`);
      // 상대 쪽에서도 나를 가리켜야 한다
      assert.ok(
        fretFacts(o).sameNote.some(x => x.string === p.string && x.fret === p.fret),
        `${slugOf(p)}·${slugOf(o)}: 한쪽만 가리킨다`,
      );
    }
  }
  // 널리 아는 자리 — 1번 줄 개방 E는 2번 줄 5프렛과 같다
  assert.ok(fretFacts({ string: 1, fret: 0 }).sameNote.some(o => o.string === 2 && o.fret === 5));
  // 가운데 도는 3번 줄 5프렛과 2번 줄 1프렛에 함께 있다
  assert.equal(midiOf({ string: 3, fret: 5 }), 60);
  assert.equal(midiOf({ string: 2, fret: 1 }), 60);
});

test('음 이름을 음악 섹션과 같은 표에서 가져온다', () => {
  for (const lang of LANG_CODES) {
    for (const p of SPOTS) {
      assert.equal(nameOf(p, lang), noteName(midiOf(p) % 12, lang), `${slugOf(p)} ${lang}: 이름이 갈렸다`);
    }
  }
  // 독일어는 B를 H로 쓴다 — 표를 따로 두었다면 여기서 갈렸을 것이다
  assert.equal(nameOf({ string: 2, fret: 0 }, 'de'), 'H');
  assert.equal(nameOf({ string: 2, fret: 0 }, 'ko'), 'B');
  assert.equal(nameOf({ string: 2, fret: 0 }, 'fr'), 'Si');
});

test('옥타브 표기가 MIDI와 맞는다', () => {
  for (const p of SPOTS) {
    const f = fretFacts(p);
    assert.equal(f.midi, (f.octave + 1) * 12 + f.pc, `${slugOf(p)}: 옥타브와 피치 클래스가 어긋난다`);
    assert.ok(f.pc >= 0 && f.pc < 12);
  }
  assert.equal(fretFacts({ string: 3, fret: 5 }).octave, 4, '가운데 도는 C4다');
  assert.equal(fretFacts({ string: 6, fret: 0 }).octave, 2);
});

test('줄과 프렛으로 가른 목록이 제자리에 있다', () => {
  for (let s = 1; s <= STRINGS; s++) {
    const list = alongString(s);
    assert.equal(list.length, MAX_FRET + 1, `${s}번 줄: 자리 수가 다르다`);
    for (const p of list) assert.equal(p.string, s);
  }
  for (let f = 0; f <= MAX_FRET; f++) {
    const list = acrossFrets(f);
    assert.equal(list.length, STRINGS, `${f}프렛: 줄 수가 다르다`);
    assert.equal(new Set(list.map(p => p.string)).size, STRINGS);
  }
  // 점이 찍히는 프렛은 지판 밖으로 나가지 않는다
  for (const d of DOTS) assert.ok(d >= 1 && d <= MAX_FRET, `${d}프렛에는 점을 찍을 수 없다`);
  assert.ok(DOTS.includes(12), '12프렛에는 점이 있다');
});

test('언어끼리 글자가 섞이지 않는다', () => {
  const HAN_OK = new Set(['ja', 'zh', 'tw']);
  const f = fretFacts({ string: 3, fret: 5 });
  for (const lang of LANG_CODES) {
    const ui = FRET_UI[lang];
    const strings = [
      ...Object.values(ui).filter((v): v is string => typeof v === 'string'),
      ...ui.how,
      ...ui.hubFaq.flatMap(q => [q.q, q.a]),
      ui.desc(f, nameOf({ string: 3, fret: 5 }, lang)),
      ...ui.fretFaq(f, nameOf({ string: 3, fret: 5 }, lang)).flatMap(q => [q.q, q.a]),
      ...SCALES.map(s => ui.scaleName(s.key)),
      ui.stringName(1),
      ui.fretName(5),
    ];
    for (const s of strings) {
      if (lang !== 'ko') assert.ok(!/[가-힣]/.test(s), `${lang}: 한글이 섞였다 — ${s}`);
      if (lang !== 'ja') assert.ok(!/[ぁ-んァ-ヶ]/.test(s), `${lang}: 가나가 섞였다 — ${s}`);
      if (!HAN_OK.has(lang)) assert.ok(!/[一-龯]/.test(s), `${lang}: 한자가 섞였다 — ${s}`);
      if (lang !== 'hi') assert.ok(!/[ऀ-ॿ]/.test(s), `${lang}: 데바나가리가 섞였다 — ${s}`);
    }
  }
});

test('줄·프렛·스케일 이름이 열 언어에 다 있다', () => {
  for (const lang of LANG_CODES) {
    const ui = FRET_UI[lang];
    const scales = SCALES.map(s => ui.scaleName(s.key));
    assert.equal(new Set(scales).size, SCALES.length, `${lang}: 스케일 이름이 겹친다`);
    const strings = Array.from({ length: STRINGS }, (_, i) => ui.stringName(i + 1));
    assert.equal(new Set(strings).size, STRINGS, `${lang}: 줄 이름이 겹친다`);
    for (const n of [...scales, ...strings, ui.fretName(0), ui.fretName(12)]) {
      assert.ok(n.trim().length > 0, `${lang}: 빈 이름이 있다`);
    }
  }
});

test('열 언어 모두 문구가 채워져 있다', () => {
  const f = fretFacts({ string: 3, fret: 5 });
  for (const lang of LANG_CODES) {
    const ui = FRET_UI[lang];
    const floor = DENSE.has(lang) ? 6 : 12;
    for (const [key, v] of Object.entries(ui)) {
      if (typeof v !== 'string') continue;
      assert.ok(v.trim().length > 0, `${lang}.${key}: 비어 있다`);
    }
    assert.ok(ui.hubLead.length >= (DENSE.has(lang) ? 20 : 35), `${lang}: hubLead가 짧다`);
    assert.equal(ui.how.length, 4, `${lang}: 읽는 방법이 네 줄이 아니다`);
    assert.equal(ui.hubFaq.length, 5, `${lang}: 질문이 다섯이 아니다`);
    for (const h of ui.how) assert.ok(h.length >= floor, `${lang}: 너무 짧다 — ${h}`);
    for (const q of ui.hubFaq) assert.ok(q.q.length >= floor && q.a.length >= floor * 2, `${lang}: 답이 짧다 — ${q.q}`);
    assert.equal(ui.fretFaq(f, 'C').length, 4, `${lang}: 낱장 질문이 넷이 아니다`);
    // 12프렛이 절반이라는 것이 이 표의 근거라 열 언어 모두에 적혀 있어야 한다
    assert.ok(ui.distanceNote.includes('12'), `${lang}: 12프렛 이야기가 빠졌다`);
  }
});

test('기타 아이콘은 목록과 카드가 같은 그림을 쓴다', async () => {
  const { ICON_FOR } = await import('../lib/og-icon-map.ts');
  assert.equal(ICON_FOR[FRET_ICON], 'guitar', '이모지가 기타 아이콘으로 이어지지 않는다');
});

/**
 * 주파수 계산이 스스로 어긋나지 않는지 본다.
 *
 * 소리는 눈으로 검산할 수 없다. 파장이 34cm인지 3.4cm인지 화면만 봐서는 아무도
 * 모르고, 음이름이 한 옥타브 밀려도 그럴듯해 보인다. 그래서 널리 알려진 기준점을
 * 못으로 박아 둔다 — A4=440Hz, C4=261.63Hz, 1000Hz의 주기 1밀리초, 20Hz의
 * 파장 17미터.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';

import { FREQS, FREQ_ICON, FREQ_RANGES, FREQ_SLUGS, freqOf, freqRange, freqSlug, freqsOfRange } from '../lib/sound/freqs.ts';
import { AUDIBLE_MAX, AUDIBLE_MIN, SPEED_OF_SOUND, dtmfKeys, freqFacts, nearbyFreqs, nearestNote } from '../lib/sound/facts.ts';
import { SOUND_UI } from '../lib/sound/ui.ts';
import { LANG8_CODES } from '../lib/i18n/lang8.ts';

test('100가지가 넘는다', () => {
  assert.ok(FREQS.length >= 100, `${FREQS.length}가지뿐이다`);
});

test('주파수가 겹치지 않고 오름차순이다', () => {
  assert.equal(new Set(FREQS.map(f => f.hz)).size, FREQS.length, '같은 주파수가 두 번 있다');
  FREQS.forEach((f, i) => {
    if (i > 0) assert.ok(FREQS[i - 1].hz < f.hz, `${f.hz}Hz가 앞 값보다 크지 않다`);
    assert.ok(f.tags.length > 0, `${f.hz}Hz에 갈래가 없다`);
  });
});

test('slug이 겹치지 않고 주소로 쓸 수 있다', () => {
  assert.equal(new Set(FREQ_SLUGS).size, FREQS.length, 'slug 중복');
  for (const s of FREQ_SLUGS) assert.match(s, /^[0-9]+(-[0-9]+)?$/, `주소에 못 쓰는 slug: ${s}`);
  // 261.63Hz는 261-63이 되고, 다시 찾아올 수 있어야 한다
  assert.equal(freqSlug(261.63), '261-63');
  assert.equal(freqOf('261-63')?.hz, 261.63);
  assert.equal(freqOf('440')?.hz, 440);
});

test('음이름이 기준점과 맞는다', () => {
  // 조율의 못 — 이 넷이 틀리면 나머지 음이름도 전부 밀린다
  assert.deepEqual(nearestNote(440), { note: 'A4', cents: 0 });
  assert.deepEqual(nearestNote(261.63), { note: 'C4', cents: 0 });
  assert.deepEqual(nearestNote(27.5), { note: 'A0', cents: 0 });
  assert.deepEqual(nearestNote(4186), { note: 'C8', cents: 0 });
  // 옥타브는 정확히 두 배다
  assert.equal(nearestNote(880).note, 'A5');
  assert.equal(nearestNote(220).note, 'A3');
});

test('432Hz는 A4보다 32센트 낮다', () => {
  // 널리 도는 "대체 조율" — 반음의 3분의 1쯤 낮다는 것이 이 숫자로 드러난다
  const f = nearestNote(432);
  assert.equal(f.note, 'A4');
  assert.equal(f.cents, -32);
});

test('센트는 반음의 절반을 넘지 않는다', () => {
  // 넘는다면 더 가까운 음을 고르지 못한 것이다
  for (const f of FREQS) {
    const { cents } = nearestNote(f.hz);
    assert.ok(Math.abs(cents) <= 50, `${f.hz}Hz: ${cents}센트`);
    assert.ok(!Object.is(cents, -0), `${f.hz}Hz: -0이 나온다`);
  }
});

test('파장과 주기가 맞는다', () => {
  // 20Hz는 17미터, 1000Hz는 1밀리초 — 외워 둘 만한 두 값이다
  const low = freqFacts(freqOf('20')!);
  assert.ok(Math.abs(low.wavelengthM - 17.15) < 0.001, `20Hz 파장 ${low.wavelengthM}`);
  const k = freqFacts(freqOf('1000')!);
  assert.equal(k.periodMs, 1);
  assert.ok(Math.abs(k.wavelengthM - 0.343) < 0.001);

  for (const f of FREQS) {
    const facts = freqFacts(f);
    assert.ok(Math.abs(facts.wavelengthM - SPEED_OF_SOUND / f.hz) < 0.0001, `${f.hz}Hz 파장`);
    assert.ok(Math.abs(facts.periodMs - 1000 / f.hz) < 0.0001, `${f.hz}Hz 주기`);
    // 주파수가 두 배면 파장은 절반이다
    assert.ok(facts.wavelengthM > 0 && facts.periodMs > 0);
  }
});

test('단위가 자릿수에 따라 바뀐다', () => {
  // 17미터와 1.7센티를 같은 단위로 적으면 한쪽이 0.017이 되어 안 읽힌다
  assert.match(freqFacts(freqOf('20')!).wavelengthLabel, / m$/);
  assert.match(freqFacts(freqOf('1000')!).wavelengthLabel, / cm$/);
  assert.match(freqFacts(freqOf('20000')!).wavelengthLabel, / (cm|mm)$/);
  assert.match(freqFacts(freqOf('20')!).periodLabel, / ms$/);
  assert.match(freqFacts(freqOf('20000')!).periodLabel, / µs$/);
});

test('배음과 옥타브가 정수배·두 배다', () => {
  for (const f of FREQS) {
    const facts = freqFacts(f);
    assert.equal(facts.harmonics.length, 3);
    facts.harmonics.forEach((h, i) => {
      assert.ok(Math.abs(h - f.hz * (i + 2)) < 0.01, `${f.hz}Hz의 ${i + 2}배음`);
    });
    assert.ok(Math.abs(facts.octaveUp - f.hz * 2) < 0.01);
    assert.ok(Math.abs(facts.octaveDown - f.hz / 2) < 0.01);
    // 한 옥타브 위는 반드시 같은 음이름이어야 한다
    // 10Hz의 음이름은 D#-1처럼 옥타브가 음수라 부호까지 떼야 한다
    const bare = (n: string) => n.replace(/-?\d+$/, '');
    assert.equal(bare(nearestNote(facts.octaveUp).note), bare(facts.note));
  }
});

test('가청 판정이 경계에서 맞는다', () => {
  assert.equal(freqFacts(freqOf('20')!).audible, true);
  assert.equal(freqFacts(freqOf('20000')!).audible, true);
  assert.equal(freqFacts(freqOf('18')!).audible, false);
  assert.equal(freqFacts(freqOf('21000')!).audible, false);
  assert.equal(AUDIBLE_MIN, 20);
  assert.equal(AUDIBLE_MAX, 20000);
});

test('구간 나누기가 빈 곳 없이 덮는다', () => {
  assert.equal(
    FREQ_RANGES.reduce((n, r) => n + freqsOfRange(r).length, 0),
    FREQS.length,
    '어느 구간에도 안 들어간 주파수가 있다',
  );
  assert.equal(freqRange(10), 'sub');
  assert.equal(freqRange(20), 'low');
  assert.equal(freqRange(250), 'mid');
  assert.equal(freqRange(4000), 'high');
  assert.equal(freqRange(20000), 'high');
  assert.equal(freqRange(24000), 'ultra');
});

test('전화 버튼음 격자가 맞는다', () => {
  // 697Hz는 1·2·3·A가 있는 줄이고, 1336Hz는 2·5·8·0이 있는 칸이다
  assert.deepEqual(dtmfKeys(697), ['1', '2', '3', 'A']);
  assert.deepEqual(dtmfKeys(941), ['*', '0', '#', 'D']);
  assert.deepEqual(dtmfKeys(1336), ['2', '5', '8', '0']);
  assert.deepEqual(dtmfKeys(440), [], '전화음이 아닌 주파수는 빈 배열이다');
  // 데이터에 dtmf로 적힌 것은 모두 격자에서 찾아져야 한다
  for (const f of FREQS.filter(x => x.tags.includes('dtmf'))) {
    assert.ok(dtmfKeys(f.hz).length === 4, `${f.hz}Hz가 격자에 없다`);
  }
});

test('가까운 주파수는 배수로 재고 자기 자신을 뺀다', () => {
  for (const f of FREQS) {
    const near = nearbyFreqs(f.hz);
    assert.ok(near.length > 0, `${f.hz}Hz: 이웃이 없다`);
    assert.ok(!near.some(n => n.hz === f.hz), `${f.hz}Hz: 자기 자신이 들어 있다`);
    assert.ok(near.every((n, i) => i === 0 || near[i - 1].hz < n.hz), `${f.hz}Hz: 정렬이 깨졌다`);
  }
  // 뺄셈으로 재면 20000Hz 옆에 19500만 오고, 배수로 재야 아래쪽도 함께 온다
  const around = nearbyFreqs(1000).map(n => n.hz);
  assert.ok(around.some(h => h < 1000) && around.some(h => h > 1000), '한쪽으로 쏠렸다');
});

test('여덟 언어가 모두 채워져 있다', () => {
  const f = freqFacts(freqOf('440')!);
  for (const lang of LANG8_CODES) {
    const ui = SOUND_UI[lang];
    for (const [key, val] of Object.entries(ui)) {
      assert.ok(val != null, `${lang}.${key}가 비었다`);
      if (typeof val === 'string') assert.ok(val.trim().length > 0, `${lang}.${key}가 빈 문자열이다`);
    }
    assert.equal(ui.how.length, 4, `${lang}: 설명 수가 다르다`);
    assert.equal(ui.hubFaq.length, 5, `${lang}: 허브 FAQ 수가 다르다`);
    assert.equal(ui.freqFaq(f).length, 5, `${lang}: 상세 FAQ 수가 다르다`);
    for (const r of FREQ_RANGES) assert.ok(ui.rangeLabel[r], `${lang}: ${r} 이름이 없다`);
    // 데이터에 쓰인 갈래는 모두 이름과 설명이 있어야 한다
    for (const tag of new Set(FREQS.flatMap(x => x.tags))) {
      assert.ok(ui.tagLabel[tag], `${lang}: ${tag} 이름이 없다`);
      // 일본어는 같은 뜻을 절반 길이로 적는다 — 글자 수로 재면 언어마다 잣대가 달라진다
      assert.ok(ui.tagNote[tag]?.length >= 8, `${lang}: ${tag} 설명이 없다`);
    }
  }
});

test('FAQ 답이 그 주파수의 숫자를 담고 있다', () => {
  // 틀만 여덟 벌 두고 값을 끼워 넣는 구조라, 값이 안 끼워지면 113장이 같은 글이 된다
  for (const slug of ['440', '17000', '60']) {
    const f = freqFacts(freqOf(slug)!);
    for (const lang of LANG8_CODES) {
      const joined = SOUND_UI[lang].freqFaq(f).map(x => `${x.q} ${x.a}`).join(' ');
      assert.ok(joined.includes(String(f.hz)), `${lang}/${slug}: 주파수가 안 들어갔다`);
      assert.ok(joined.includes(f.note), `${lang}/${slug}: 음이름이 안 들어갔다`);
      assert.ok(joined.includes(f.wavelengthLabel), `${lang}/${slug}: 파장이 안 들어갔다`);
    }
  }
});

test('딱 맞는 음에는 센트 차이를 적지 않는다', () => {
  // A4에 "+0센트"라고 적히면 틀린 값처럼 보인다
  const a4 = freqFacts(freqOf('440')!);
  assert.ok(a4.onPitch);
  const off = freqFacts(freqOf('432')!);
  assert.ok(!off.onPitch);
  for (const lang of LANG8_CODES) {
    assert.ok(SOUND_UI[lang].onPitchLabel.trim().length > 0, `${lang}: 딱 맞음 표시가 없다`);
    assert.ok(SOUND_UI[lang].centsLabel(-32).includes('32'), `${lang}: 센트 표기가 숫자를 안 담는다`);
    assert.ok(SOUND_UI[lang].centsLabel(21).startsWith('+'), `${lang}: 양수에 부호가 없다`);
  }
});

test('힌디어 문구에 라틴 낱말이 새지 않는다', () => {
  const ui = SOUND_UI.hi;
  const texts = [ui.hubTitle, ui.hubLead, ui.safety, ...ui.how, ...ui.hubFaq.map(x => `${x.q} ${x.a}`), ...Object.values(ui.tagNote)];
  for (const t of texts) {
    const stripped = t.replace(/Hz|kHz|A4|\bC\b/g, '');
    assert.ok(!/[A-Za-z]{5,}/.test(stripped), `힌디어에 라틴 낱말이 남았다: ${t}`);
  }
});

test('주파수 아이콘은 목록과 카드가 같은 그림을 쓴다', async () => {
  const { ICON_FOR } = await import('../lib/og-icon-map.ts');
  assert.equal(ICON_FOR[FREQ_ICON], 'wave', '이모지가 파형 아이콘으로 이어지지 않는다');
});

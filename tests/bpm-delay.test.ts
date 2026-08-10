/**
 * 딜레이 타임 — 셈을 다른 길로 되짚는다.
 *
 * 4분음표 한 박은 60000 ÷ BPM이므로, 밀리초에 BPM을 도로 곱하면 60000에
 * 박수를 곱한 값이 나와야 한다. 한 마디는 네 박이라 4분음표 넷과 같아야 하고,
 * 점음표는 온음표의 1.5배, 셋잇단음표는 3분의 2여야 한다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { BEATS_PER_BAR, CELLS, NOTES, TEMPOS, cellOf, noteOf, slugOf } from '../lib/bpm/list.ts';
import { beatMsOf, bpmFacts, msOf } from '../lib/bpm/facts.ts';

const facts = (slug: string) => {
  const c = cellOf(slug);
  assert.ok(c, `${slug} 칸이 없다`);
  return bpmFacts(c);
};

test('칸은 템포 24가지 × 음표 12가지', () => {
  assert.equal(TEMPOS.length, 24);
  assert.equal(NOTES.length, 12);
  assert.equal(CELLS.length, 288);
  assert.equal(new Set(CELLS.map(slugOf)).size, 288);
  for (const c of CELLS) assert.deepEqual(cellOf(slugOf(c)), c, slugOf(c));

  // 템포는 오르는 차례이고, 많이 쓰는 값이 빠지지 않았다
  for (let i = 1; i < TEMPOS.length; i++) assert.ok(TEMPOS[i] > TEMPOS[i - 1]);
  for (const want of [120, 124, 126, 128, 140, 174]) {
    assert.ok(TEMPOS.includes(want), `${want}BPM이 빠졌다 — 많이 찾는 템포다`);
  }
  assert.equal(cellOf('120'), undefined);
  assert.equal(cellOf('121-4'), undefined, '축에 없는 템포가 열리면 안 된다');
  assert.equal(cellOf('120-64'), undefined, '없는 음표가 열리면 안 된다');
});

test('밀리초에 템포를 도로 곱하면 60000이다', () => {
  /*
   * 화면에 내는 값은 두 자리에서 끊는다. 끊은 값에 템포를 도로 곱하면 그
   * 오차가 템포 배로 커지므로(115BPM이면 0.005 × 115), 관계는 끊기 전 값으로
   * 본다. 끊는 규칙 자체는 아래에서 딱 떨어지는 값으로 따로 못을 박는다.
   */
  for (const c of CELLS) {
    const f = bpmFacts(c);
    const beats = noteOf(c.note)!.beats;
    const exact = msOf(c.bpm, beats);
    assert.ok(Math.abs(exact * c.bpm - 60_000 * beats) < 1e-9, `${f.slug}: 식이 어긋난다`);
    assert.ok(Math.abs(f.ms - exact) <= 0.005 + 1e-9, `${f.slug}: 끊은 값이 멀다`);
  }
  // 손으로 셈한 값 — 120BPM의 4분음표는 정확히 500ms다
  assert.equal(facts('120-4').ms, 500);
  assert.equal(facts('120-8').ms, 250);
  assert.equal(facts('120-16').ms, 125);
  // 60BPM이면 한 박이 1초다
  assert.equal(beatMsOf(60), 1000);
});

test('점음표는 1.5배, 셋잇단은 3분의 2다', () => {
  for (const bpm of TEMPOS) {
    const plain = msOf(bpm, noteOf('8')!.beats);
    assert.ok(Math.abs(msOf(bpm, noteOf('8d')!.beats) - plain * 1.5) < 1e-9, `${bpm}: 점8분`);
    assert.ok(Math.abs(msOf(bpm, noteOf('8t')!.beats) - plain * (2 / 3)) < 1e-9, `${bpm}: 8분 셋잇단`);
    assert.ok(Math.abs(msOf(bpm, noteOf('4d')!.beats) - msOf(bpm, noteOf('4')!.beats) * 1.5) < 1e-9, `${bpm}: 점4분`);
  }
  // 기타에서 가장 많이 쓰는 설정 — 120BPM 점8분음표는 375ms다
  assert.equal(facts('120-8d').ms, 375);
});

test('한 마디는 4분음표 넷이다', () => {
  for (const c of CELLS) {
    const f = bpmFacts(c);
    assert.ok(Math.abs(f.barMs - beatMsOf(c.bpm) * BEATS_PER_BAR) <= 0.005 + 1e-9, f.slug);
    // 이 음표가 한 마디에 몇 번 들어가는가 — 박수로 나눈 값이다
    const beats = noteOf(c.note)!.beats;
    assert.ok(Math.abs(f.perBar - BEATS_PER_BAR / beats) <= 0.0005 + 1e-9, `${f.slug}: ${f.perBar}`);
    // 끊기 전 값끼리는 정확히 한 마디가 된다
    assert.ok(Math.abs((BEATS_PER_BAR / beats) * msOf(c.bpm, beats) - beatMsOf(c.bpm) * BEATS_PER_BAR) < 1e-9, f.slug);
  }
  assert.equal(facts('120-4').barMs, 2000);
  assert.equal(facts('120-4').perBar, 4);
  assert.equal(facts('120-16').perBar, 16);
});

test('진동수는 길이의 역수다', () => {
  for (const c of CELLS) {
    const f = bpmFacts(c);
    const exact = 1000 / msOf(c.bpm, noteOf(c.note)!.beats);
    assert.ok(Math.abs(f.hz - exact) <= 0.0005 + 1e-9, `${f.slug}: ${f.hz} vs ${exact}`);
  }
  // 500ms는 2Hz다
  assert.equal(facts('120-4').hz, 2);
});

test('템포가 빠를수록 짧고, 음표가 길수록 길다', () => {
  // 같은 음표에서 템포가 오르면 밀리초가 준다
  for (const n of NOTES) {
    let prev = Infinity;
    for (const bpm of TEMPOS) {
      const ms = bpmFacts({ bpm, note: n.key }).ms;
      assert.ok(ms < prev, `${bpm}BPM ${n.key}에서 안 줄었다`);
      prev = ms;
    }
  }
  // 이웃은 실제로 짧은 쪽·긴 쪽을 가리킨다
  for (const c of CELLS) {
    const f = bpmFacts(c);
    if (f.faster) assert.ok(bpmFacts(cellOf(f.faster.slug)!).ms < f.ms, `${f.slug} faster`);
    if (f.slower) assert.ok(bpmFacts(cellOf(f.slower.slug)!).ms > f.ms, `${f.slug} slower`);
    if (f.quicker) assert.ok(bpmFacts(cellOf(f.quicker.slug)!).ms < f.ms, `${f.slug} quicker`);
    if (f.calmer) assert.ok(bpmFacts(cellOf(f.calmer.slug)!).ms > f.ms, `${f.slug} calmer`);
  }
  assert.equal(facts('60-4').calmer, null);
  assert.equal(facts('180-4').quicker, null);
});

test('축에 없는 값을 넣으면 조용히 답하지 않는다', () => {
  assert.throws(() => bpmFacts({ bpm: 121, note: '4' }), /모르는 템포/);
  assert.throws(() => bpmFacts({ bpm: 120, note: '64' }), /모르는 음표/);
});
test('언어끼리 글자가 섞이지 않는다', async () => {
  const { LANG_CODES } = await import('../lib/i18n/lang.ts');
  const { BPM_UI } = await import('../lib/bpm/ui.ts');
  const { hanProblem } = await import('./han.ts');
  const HAN_OK = new Set(['ja', 'zh', 'tw']);
  // 값이 0이 되는 칸, 큰 칸, 주유가 필요한 칸 — 문장 갈래를 모두 밟는다
  const shown = [
    bpmFacts({ bpm: 120, note: '4' }),
    bpmFacts({ bpm: 60, note: '1' }),
    bpmFacts({ bpm: 180, note: '16t' }),
  ];
  for (const lang of LANG_CODES) {
    const ui = BPM_UI[lang];
    const strings = [
      ...Object.values(ui).filter((v): v is string => typeof v === 'string'),
      ...ui.how,
      ...ui.hubFaq.flatMap(q => [q.q, q.a]),
      ...NOTES.map(n => ui.noteName(n.key)),
      ...shown.flatMap(f => [ui.desc(f), ui.metaTitle(f), ui.metaDesc(f),
        ...ui.cellFaq(f).flatMap(q => [q.q, q.a])]),
    ];
    for (const s of strings) {
      if (lang !== 'ko') assert.ok(!/[가-힣]/.test(s), `${lang}: 한글이 섞였다 — ${s}`);
      if (lang !== 'ja') assert.ok(!/[ぁ-んァ-ヶ]/.test(s), `${lang}: 가나가 섞였다 — ${s}`);
      if (!HAN_OK.has(lang)) assert.ok(!/[一-龯]/.test(s), `${lang}: 한자가 섞였다 — ${s}`);
      if (lang !== 'hi') assert.ok(!/[ऀ-ॿ]/.test(s), `${lang}: 데바나가리가 섞였다 — ${s}`);
      const han = hanProblem(lang, s);
      assert.equal(han, '', `${lang}: ${han} — ${s}`);
    }
  }
});

test('열 언어 모두 문구가 채워져 있다', async () => {
  const { LANG_CODES } = await import('../lib/i18n/lang.ts');
  const { DENSE } = await import('./han.ts');
  const { BPM_UI } = await import('../lib/bpm/ui.ts');
  const f = bpmFacts({ bpm: 120, note: '4' });
  for (const lang of LANG_CODES) {
    const ui = BPM_UI[lang];
    const floor = DENSE.has(lang) ? 6 : 12;
    for (const [key, v] of Object.entries(ui)) {
      if (typeof v !== 'string') continue;
      assert.ok(v.trim().length > 0, `${lang}.${key}: 비어 있다`);
    }
    assert.ok(ui.hubLead.length >= (DENSE.has(lang) ? 20 : 35), `${lang}: hubLead가 짧다`);
    assert.equal(ui.how.length, 4, `${lang}: 알아 둘 것이 네 줄이 아니다`);
    assert.equal(ui.hubFaq.length, 5, `${lang}: 질문이 다섯이 아니다`);
    for (const h of ui.how) assert.ok(h.length >= floor, `${lang}: 너무 짧다 — ${h}`);
    for (const q of ui.hubFaq) assert.ok(q.q.length >= floor && q.a.length >= floor * 2, `${lang}: 답이 짧다 — ${q.q}`);
    assert.equal(ui.cellFaq(f).length, 4, `${lang}: 낱장 질문이 넷이 아니다`);
    // 나눗셈의 뜻과 "값을 안 내는 이유" — 전제 둘은 길게 밝혀야 한다
    assert.ok(ui.formulaNote.length >= floor * 6, `${lang}: 식 설명이 짧다`);
    assert.ok(ui.dottedNote.length >= floor * 6, `${lang}: 점음표 설명이 짧다`);
    assert.ok(ui.useNote.length >= floor * 6, `${lang}: 쓰임 설명이 짧다`);
  }
});

test('낱장 문장이 실제 숫자를 담는다', async () => {
  const { LANG_CODES } = await import('../lib/i18n/lang.ts');
  const { BPM_UI } = await import('../lib/bpm/ui.ts');
  // 자리표만 채우고 값을 안 넣으면 열 언어가 다 같은 문장이 된다
  for (const lang of LANG_CODES) {
    const ui = BPM_UI[lang];
    for (const c of [{ bpm: 120, note: '4' }, { bpm: 128, note: '8d' }]) {
      const f = bpmFacts(c);
      assert.ok(ui.desc(f).includes(String(f.ms)), `${lang}: desc에 밀리초가 없다`);
      assert.ok(ui.metaTitle(f).includes(String(c.bpm)), `${lang}: metaTitle에 템포가 없다`);
      assert.ok(ui.metaDesc(f).includes(String(f.ms)), `${lang}: metaDesc에 밀리초가 없다`);
    }
    // 칸이 다르면 문장도 달라야 한다
    assert.notEqual(ui.desc(bpmFacts({ bpm: 120, note: '4' })), ui.desc(bpmFacts({ bpm: 128, note: '8d' })), lang);
  }
});

test('딜레이 아이콘은 목록과 카드가 같은 그림을 쓴다', async () => {
  const { ICON_FOR } = await import('../lib/og-icon-map.ts');
  const { BPM_ICON } = await import('../lib/bpm/list.ts');
  assert.ok(ICON_FOR[BPM_ICON], `${BPM_ICON} 이모지가 아이콘으로 이어지지 않는다`);
});

/**
 * 자외선 — 계산한 값을 다른 길로 되짚는다.
 *
 * 시간은 양을 세기로 나눈 것이므로, 시간에 세기를 도로 곱해 최소 홍반량이
 * 나오는지 본다. 구간은 세계보건기구가 가른 자리를 검사에만 적어 두고 그
 * 경계에서 이름이 바뀌는지 확인한다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  BANDS, CELLS, INDEXES, OUTING, PER_INDEX, SKINS, SPFS, UV_MAX, UV_MIN, UV_STEP,
  cellOf, skinOf, slugOf,
} from '../lib/uv/list.ts';
import { bandOf, burnMinutesOf, irradianceOf, uvFacts } from '../lib/uv/facts.ts';

const facts = (slug: string) => {
  const c = cellOf(slug);
  assert.ok(c, `${slug} 칸이 없다`);
  return uvFacts(c);
};

test('칸은 지수 21가지 × 피부 6가지', () => {
  assert.equal(INDEXES.length, 21);
  assert.equal(INDEXES[0], UV_MIN);
  assert.equal(INDEXES[INDEXES.length - 1], UV_MAX);
  assert.equal(SKINS.length, 6);
  assert.equal(CELLS.length, 126);
  assert.equal(new Set(CELLS.map(slugOf)).size, 126);
  for (const c of CELLS) assert.deepEqual(cellOf(slugOf(c)), c, slugOf(c));
  // 눈금이 고르다 — 하나라도 어긋나면 앞뒤 칸이 뜻을 잃는다
  for (let i = 1; i < INDEXES.length; i++) {
    assert.ok(Math.abs(INDEXES[i] - INDEXES[i - 1] - UV_STEP) < 1e-9, String(INDEXES[i]));
  }
  assert.equal(cellOf('8'), undefined);
  assert.equal(cellOf('8-vii'), undefined);
});

test('지수는 세기를 말한다', () => {
  // 지수 1이 0.025W/m²이므로 지수 8이면 0.2W/m²다
  assert.equal(irradianceOf(1), PER_INDEX);
  assert.equal(irradianceOf(8), 0.2);
  for (const c of CELLS) {
    const f = uvFacts(c);
    // 세기를 지수로 도로 나누면 0.025가 나온다
    assert.ok(Math.abs(f.irradiance / c.uv - PER_INDEX) < 1e-6, f.slug);
  }
});

test('시간에 세기를 도로 곱하면 최소 홍반량이다', () => {
  for (const c of CELLS) {
    const f = uvFacts(c);
    const back = f.minutes * 60 * irradianceOf(c.uv);
    // 분을 한 자리에서 끊었으므로 그만큼은 어긋난다
    assert.ok(Math.abs(back - f.med) <= 60 * irradianceOf(c.uv) * 0.05 + 1e-6, `${f.slug}: ${back} vs ${f.med}`);
    assert.equal(f.med, skinOf(c.skin)!.med, f.slug);
  }
  // 지수 8에서 II형은 스무 분 남짓 — 널리 알려진 값과 어긋나지 않는다
  assert.equal(facts('8-ii').minutes, 20.8);
  // 지수가 두 배면 시간은 절반이다
  assert.ok(Math.abs(burnMinutesOf(250, 8) * 2 - burnMinutesOf(250, 4)) < 1e-9);
});

test('피부 타입이 올라갈수록 오래 버틴다', () => {
  const meds = SKINS.map(s => s.med);
  assert.deepEqual([...meds].sort((a, b) => a - b), meds);
  // I형과 VI형이 다섯 배다
  assert.equal(SKINS[5].med / SKINS[0].med, 5);
  for (const c of CELLS) {
    const f = uvFacts(c);
    if (f.darker) assert.ok(uvFacts(cellOf(f.darker.slug)!).minutes > f.minutes, f.slug);
    if (f.stronger) assert.ok(uvFacts(cellOf(f.stronger.slug)!).minutes < f.minutes, f.slug);
  }
});

test('차단제는 시간을 지수만큼 늘린다', () => {
  for (const c of CELLS) {
    const f = uvFacts(c);
    assert.equal(f.shields.length, SPFS.length, f.slug);
    for (const s of f.shields) {
      const exact = burnMinutesOf(f.med, c.uv) * s.spf;
      assert.ok(Math.abs(s.minutes - exact) <= 0.05 + 1e-9, `${f.slug} SPF${s.spf}: ${s.minutes} vs ${exact}`);
    }
    // SPF 30은 SPF 15의 정확히 두 배다
    assert.ok(Math.abs(f.shields[1].minutes / f.shields[0].minutes - 2) < 0.01, f.slug);
  }
});

test('두 시간을 버티려면 필요한 지수', () => {
  for (const c of CELLS) {
    const f = uvFacts(c);
    const exact = burnMinutesOf(f.med, c.uv);
    // 그 지수면 두 시간을 넘기고, 하나 낮추면 못 넘긴다
    assert.ok(f.needSpf * exact >= OUTING - 1e-9, `${f.slug}: ${f.needSpf}`);
    if (f.needSpf > 1) assert.ok((f.needSpf - 1) * exact < OUTING, f.slug);
    // 아무것도 안 발라도 두 시간이 되면 1이다
    assert.equal(f.needSpf === 1, exact >= OUTING, f.slug);
  }
  assert.equal(OUTING, 120);
  assert.equal(facts('8-ii').needSpf, 6);
});

test('구간은 세계보건기구가 가른 자리에서 바뀐다', () => {
  // 예보에 쓰는 표 — 여기서만 적고 계산에는 넣지 않는다
  const WHO: [number, string][] = [
    [1, 'low'], [2.5, 'low'], [3, 'moderate'], [5.5, 'moderate'],
    [6, 'high'], [7.5, 'high'], [8, 'veryHigh'], [10.5, 'veryHigh'], [11, 'extreme'],
  ];
  for (const [uv, key] of WHO) assert.equal(bandOf(uv), key, String(uv));
  assert.deepEqual(BANDS.map(b => b.key), ['low', 'moderate', 'high', 'veryHigh', 'extreme']);
  // 그림자 눈대중은 지수 6에서 갈린다
  assert.equal(facts('5-5-ii').shortShadow, false);
  assert.equal(facts('6-ii').shortShadow, true);
});

test('앞뒤 칸은 한 단계씩만 움직인다', () => {
  const f = facts('8-ii');
  assert.equal(f.stronger?.uv, 8.5);
  assert.equal(f.weaker?.uv, 7.5);
  assert.equal(f.darker?.skin, 'iii');
  assert.equal(f.fairer?.skin, 'i');
  assert.equal(facts('1-i').weaker, null);
  assert.equal(facts('1-i').fairer, null);
  assert.equal(facts('11-vi').stronger, null);
  assert.equal(facts('11-vi').darker, null);
});

test('언어끼리 글자가 섞이지 않는다', async () => {
  const { LANG_CODES } = await import('../lib/i18n/lang.ts');
  const { UV_UI } = await import('../lib/uv/ui.ts');
  const HAN_OK = new Set(['ja', 'zh', 'tw']);
  const shown = [uvFacts({ uv: 8, skin: 'ii' }), uvFacts({ uv: 1, skin: 'vi' }), uvFacts({ uv: 11, skin: 'i' })];
  for (const lang of LANG_CODES) {
    const ui = UV_UI[lang];
    const strings = [
      ...Object.values(ui).filter((v): v is string => typeof v === 'string'),
      ...ui.how,
      ...ui.hubFaq.flatMap(q => [q.q, q.a]),
      ...shown.flatMap(f => [ui.desc(f), ui.metaTitle(f), ui.metaDesc(f), ...ui.cellFaq(f).flatMap(q => [q.q, q.a])]),
      ...SKINS.map(s => ui.skinName(s.key)),
      ...BANDS.map(b => ui.bandName(b.key)),
    ];
    for (const s of strings) {
      if (lang !== 'ko') assert.ok(!/[가-힣]/.test(s), `${lang}: 한글이 섞였다 — ${s}`);
      if (lang !== 'ja') assert.ok(!/[ぁ-んァ-ヶ]/.test(s), `${lang}: 가나가 섞였다 — ${s}`);
      if (!HAN_OK.has(lang)) assert.ok(!/[一-龯]/.test(s), `${lang}: 한자가 섞였다 — ${s}`);
      if (lang !== 'hi') assert.ok(!/[ऀ-ॿ]/.test(s), `${lang}: 데바나가리가 섞였다 — ${s}`);
    }
  }
});

test('피부 타입과 구간 이름이 열 언어에 다 있다', async () => {
  const { LANG_CODES } = await import('../lib/i18n/lang.ts');
  const { UV_UI } = await import('../lib/uv/ui.ts');
  for (const lang of LANG_CODES) {
    const ui = UV_UI[lang];
    const skins = SKINS.map(s => ui.skinName(s.key));
    assert.equal(new Set(skins).size, SKINS.length, `${lang}: 피부 이름이 겹친다`);
    // 이름에 로마 숫자가 들어가야 예보나 병원에서 들은 말과 이어진다
    for (const s of SKINS) assert.match(ui.skinName(s.key), new RegExp(`\\b${s.roman}\\b|${s.roman}[형型]`), `${lang}: ${s.key}에 ${s.roman}이 없다`);
    const bands = BANDS.map(b => ui.bandName(b.key));
    assert.equal(new Set(bands).size, BANDS.length, `${lang}: 구간 이름이 겹친다`);
  }
});

test('열 언어 모두 문구가 채워져 있다', async () => {
  const { LANG_CODES } = await import('../lib/i18n/lang.ts');
  const { DENSE } = await import('./han.ts');
  const { UV_UI } = await import('../lib/uv/ui.ts');
  const f = uvFacts({ uv: 8, skin: 'ii' });
  for (const lang of LANG_CODES) {
    const ui = UV_UI[lang];
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
    assert.equal(ui.cellFaq(f).length, 4, `${lang}: 낱장 질문이 넷이 아니다`);
    // 나눗셈의 뜻과 차단 지수의 한계 — 전제 둘은 길게 밝혀야 한다
    assert.ok(ui.medNote.length >= floor * 6, `${lang}: 홍반량 설명이 짧다`);
    assert.ok(ui.spfNote.length >= floor * 6, `${lang}: 차단 지수 설명이 짧다`);
  }
});

test('해 아이콘은 목록과 카드가 같은 그림을 쓴다', async () => {
  const { ICON_FOR } = await import('../lib/og-icon-map.ts');
  const { UV_ICON } = await import('../lib/uv/list.ts');
  assert.equal(ICON_FOR[UV_ICON], 'sunrise', '이모지가 아이콘으로 이어지지 않는다');
});

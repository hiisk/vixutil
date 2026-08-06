/**
 * 대기질 — 계산한 값을 다른 길로 되짚는다.
 *
 * 미국 지수는 직선 하나로 잇는 값이라, 지수에서 농도로 되돌려 원래 농도가
 * 나오는지 본다. 구간 경계에서는 지수가 딱 50·100·150이 되어야 하고, 한국
 * 등급은 공표된 경계에서 이름이 바뀌어야 한다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  CATEGORIES, CELLS, CIGARETTE, INDEX_EDGES, KOREA_GRADES, POLLUTANTS,
  cellOf, pollutantOf, slugOf,
} from '../lib/air/list.ts';
import { airFacts, bandsOf, categoryOf, concentrationOf, epaOf, koreaGradeOf } from '../lib/air/facts.ts';

const facts = (slug: string) => {
  const c = cellOf(slug);
  assert.ok(c, `${slug} 칸이 없다`);
  return airFacts(c);
};

test('칸은 오염물질 6가지 × 농도 18가지', () => {
  assert.equal(POLLUTANTS.length, 6);
  for (const p of POLLUTANTS) {
    assert.equal(p.levels.length, 18, p.key);
    assert.equal(p.epa.length, 6, p.key);
    assert.equal(p.korea.length, 3, p.key);
    // 농도 목록도 구간표도 오름차순이어야 한다
    assert.deepEqual([...p.levels].sort((a, b) => a - b), p.levels, p.key);
    assert.deepEqual([...p.epa].sort((a, b) => a - b), p.epa, p.key);
    assert.deepEqual([...p.korea].sort((a, b) => a - b), p.korea, p.key);
  }
  assert.equal(CELLS.length, 108);
  assert.equal(new Set(CELLS.map(slugOf)).size, 108);
  for (const c of CELLS) assert.deepEqual(cellOf(slugOf(c)), c, slugOf(c));
  assert.equal(cellOf('pm25'), undefined);
  assert.equal(cellOf('pm25-37'), undefined);
});

test('구간 경계에서 지수가 딱 떨어진다', () => {
  for (const p of POLLUTANTS) {
    const bands = bandsOf(p.key);
    assert.equal(bands.length, 6, p.key);
    for (let i = 0; i < bands.length; i++) {
      // 농도 위끝에서는 지수 위끝이 나온다 — 50, 100, 150, 200, 300, 500
      assert.ok(Math.abs(epaOf(p.key, bands[i].cHi) - INDEX_EDGES[i][1]) < 1e-9, `${p.key} ${bands[i].cHi}`);
      // 아래끝은 앞 구간에서 이어진다
      assert.equal(bands[i].cLo, i === 0 ? 0 : p.epa[i - 1], `${p.key} ${i}`);
    }
  }
  // 널리 알려진 자리 — 초미세먼지 35.4가 100, 미세먼지 154가 100
  assert.equal(epaOf('pm25', 35.4), 100);
  assert.equal(epaOf('pm10', 154), 100);
  assert.equal(epaOf('pm25', 9), 50);
});

test('지수에서 농도로 되돌아온다', () => {
  for (const c of CELLS) {
    const index = epaOf(c.key, c.value);
    const back = concentrationOf(c.key, index);
    assert.ok(Math.abs(back - c.value) < 1e-6, `${slugOf(c)}: ${back} vs ${c.value}`);
  }
  // 지수 100이 되는 농도를 다시 지수로 바꾸면 100이다
  for (const p of POLLUTANTS) {
    const f = airFacts({ key: p.key, value: p.levels[0] });
    assert.ok(Math.abs(epaOf(p.key, f.hundred) - 100) < 0.5, `${p.key}: ${f.hundred}`);
  }
});

test('농도가 오르면 지수도 오른다', () => {
  for (const p of POLLUTANTS) {
    for (let i = 1; i < p.levels.length; i++) {
      assert.ok(epaOf(p.key, p.levels[i]) > epaOf(p.key, p.levels[i - 1]), `${p.key} ${p.levels[i]}`);
    }
  }
  // 등급 이름도 지수를 따라간다
  assert.equal(categoryOf(50), 'good');
  assert.equal(categoryOf(51), 'moderate');
  assert.equal(categoryOf(101), 'sensitive');
  assert.equal(categoryOf(151), 'unhealthy');
  assert.equal(categoryOf(201), 'veryUnhealthy');
  assert.equal(categoryOf(301), 'hazardous');
  assert.deepEqual(CATEGORIES.map(c => c.key), ['good', 'moderate', 'sensitive', 'unhealthy', 'veryUnhealthy', 'hazardous']);
});

test('한국 등급은 공표된 경계에서 바뀐다', () => {
  for (const p of POLLUTANTS) {
    const [good, normal, bad] = p.korea;
    assert.equal(koreaGradeOf(p.key, good), 'good', p.key);
    assert.equal(koreaGradeOf(p.key, good + 0.1), 'normal', p.key);
    assert.equal(koreaGradeOf(p.key, normal), 'normal', p.key);
    assert.equal(koreaGradeOf(p.key, normal + 0.1), 'bad', p.key);
    assert.equal(koreaGradeOf(p.key, bad), 'bad', p.key);
    assert.equal(koreaGradeOf(p.key, bad + 0.1), 'veryBad', p.key);
  }
  assert.deepEqual([...KOREA_GRADES], ['good', 'normal', 'bad', 'veryBad']);
  // 초미세먼지 15가 좋음의 끝, 35가 보통의 끝이다
  assert.equal(facts('pm25-15').korea, 'good');
  assert.equal(facts('pm25-35').korea, 'normal');
  assert.equal(facts('pm25-40').korea, 'bad');
});

test('같은 농도인데 두 나라가 갈리는 자리가 있다', () => {
  for (const c of CELLS) {
    const f = airFacts(c);
    const usBad = epaOf(c.key, c.value) > 100;
    const krBad = f.korea === 'bad' || f.korea === 'veryBad';
    assert.equal(f.split, usBad !== krBad, f.slug);
  }
  // 미세먼지 150은 한국에서 나쁨인데 미국 지수로는 아직 보통이다
  assert.equal(facts('pm10-150').korea, 'bad');
  assert.ok(facts('pm10-150').epa <= 100);
  assert.equal(facts('pm10-150').split, true);
  // 갈리는 칸이 실제로 여럿 있어야 이 표가 뜻이 있다
  const splits = CELLS.filter(c => airFacts(c).split);
  assert.ok(splits.length >= 10, `갈리는 칸이 ${splits.length}개뿐이다`);
});

test('초미세먼지는 담배 개비로 옮긴다', () => {
  for (const c of CELLS) {
    const f = airFacts(c);
    if (c.key !== 'pm25') {
      assert.equal(f.cigarettes, null, f.slug);
      continue;
    }
    // 되돌려 곱하면 원래 농도가 나온다
    assert.ok(Math.abs((f.cigarettes as number) * CIGARETTE - c.value) <= CIGARETTE * 0.005 + 1e-9, f.slug);
  }
  assert.equal(CIGARETTE, 22);
  // 22µg/m³를 하루 마시면 담배 한 개비다
  assert.equal(airFacts({ key: 'pm25', value: 22 }).cigarettes, 1);
});

test('앞뒤 칸은 한 단계씩만 움직인다', () => {
  const f = facts('pm25-35');
  assert.equal(f.higher?.value, 40);
  assert.equal(f.lower?.value, 30);
  assert.equal(facts('pm25-5').lower, null);
  assert.equal(facts('pm25-250').higher, null);
  for (const c of CELLS) {
    const g = airFacts(c);
    if (g.higher) assert.ok(airFacts(cellOf(g.higher.slug)!).epa >= g.epa, g.slug);
    // 같은 오염물질 안에서만 움직인다
    if (g.higher) assert.equal(g.higher.key, c.key, g.slug);
  }
});

test('언어끼리 글자가 섞이지 않는다', async () => {
  const { LANG_CODES } = await import('../lib/i18n/lang.ts');
  const { AIR_UI } = await import('../lib/air/ui.ts');
  const HAN_OK = new Set(['ja', 'zh', 'tw']);
  const shown = [airFacts({ key: 'pm25', value: 35 }), airFacts({ key: 'pm10', value: 150 }), airFacts({ key: 'co', value: 9 })];
  for (const lang of LANG_CODES) {
    const ui = AIR_UI[lang];
    const strings = [
      ...Object.values(ui).filter((v): v is string => typeof v === 'string'),
      ...ui.how,
      ...ui.hubFaq.flatMap(q => [q.q, q.a]),
      ...shown.flatMap(f => [ui.desc(f), ui.metaTitle(f), ui.metaDesc(f), ...ui.cellFaq(f).flatMap(q => [q.q, q.a])]),
      ...POLLUTANTS.map(p => ui.pollutantName(p.key)),
      ...CATEGORIES.map(c => ui.categoryName(c.key)),
      ...KOREA_GRADES.map(k => ui.koreaName(k)),
    ];
    for (const s of strings) {
      if (lang !== 'ko') assert.ok(!/[가-힣]/.test(s), `${lang}: 한글이 섞였다 — ${s}`);
      if (lang !== 'ja') assert.ok(!/[ぁ-んァ-ヶ]/.test(s), `${lang}: 가나가 섞였다 — ${s}`);
      if (!HAN_OK.has(lang)) assert.ok(!/[一-龯]/.test(s), `${lang}: 한자가 섞였다 — ${s}`);
      if (lang !== 'hi') assert.ok(!/[ऀ-ॿ]/.test(s), `${lang}: 데바나가리가 섞였다 — ${s}`);
    }
  }
});

test('오염물질과 등급 이름이 열 언어에 다 있다', async () => {
  const { LANG_CODES } = await import('../lib/i18n/lang.ts');
  const { AIR_UI } = await import('../lib/air/ui.ts');
  for (const lang of LANG_CODES) {
    const ui = AIR_UI[lang];
    const names = POLLUTANTS.map(p => ui.pollutantName(p.key));
    assert.equal(new Set(names).size, POLLUTANTS.length, `${lang}: 오염물질 이름이 겹친다`);
    for (const p of POLLUTANTS) assert.notEqual(ui.pollutantName(p.key), p.key, `${lang}: ${p.key} 번역이 없다`);
    // 먼지 둘은 이름에 PM 표기가 들어가야 검색어와 이어진다
    assert.match(ui.pollutantName('pm25'), /PM ?2[.,]5/, `${lang}: pm25 표기가 없다`);
    assert.match(ui.pollutantName('pm10'), /PM ?10/, `${lang}: pm10 표기가 없다`);
    const cats = CATEGORIES.map(c => ui.categoryName(c.key));
    assert.equal(new Set(cats).size, CATEGORIES.length, `${lang}: 미국 등급 이름이 겹친다`);
    const kr = KOREA_GRADES.map(k => ui.koreaName(k));
    assert.equal(new Set(kr).size, KOREA_GRADES.length, `${lang}: 한국 등급 이름이 겹친다`);
  }
});

test('열 언어 모두 문구가 채워져 있다', async () => {
  const { LANG_CODES } = await import('../lib/i18n/lang.ts');
  const { DENSE } = await import('./han.ts');
  const { AIR_UI } = await import('../lib/air/ui.ts');
  const f = airFacts({ key: 'pm25', value: 35 });
  for (const lang of LANG_CODES) {
    const ui = AIR_UI[lang];
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
    // 직선으로 잇는다는 것과 나라마다 갈린다는 것 — 전제 둘은 길게 밝혀야 한다
    assert.ok(ui.indexNote.length >= floor * 6, `${lang}: 지수 설명이 짧다`);
    assert.ok(ui.splitNote.length >= floor * 6, `${lang}: 어긋남 설명이 짧다`);
  }
});

test('안개 아이콘은 목록과 카드가 같은 그림을 쓴다', async () => {
  const { ICON_FOR } = await import('../lib/og-icon-map.ts');
  const { AIR_ICON } = await import('../lib/air/list.ts');
  assert.equal(ICON_FOR[AIR_ICON], 'cloud', '이모지가 아이콘으로 이어지지 않는다');
});

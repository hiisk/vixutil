/**
 * 단열 — 계산한 값을 다른 길로 되짚는다.
 *
 * 열저항은 나눗셈 하나라 곱해서 되돌리고, 열관류율은 뒤집은 값이라 다시
 * 뒤집어 본다. "같은 열저항을 내는 다른 재료의 두께"는 그 두께로 열저항을
 * 다시 계산해 원래 값과 맞춰 본다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  CELLS, DELTA_T, MATERIALS, R_INSIDE, R_OUTSIDE, TARGETS, THICKNESSES,
  cellOf, materialOf, slugOf,
} from '../lib/insul/list.ts';
import { insulFacts, rOf, thicknessFor, uOf } from '../lib/insul/facts.ts';

const facts = (slug: string) => {
  const c = cellOf(slug);
  assert.ok(c, `${slug} 칸이 없다`);
  return insulFacts(c);
};

test('칸은 재료 12가지 × 두께 12가지', () => {
  assert.equal(MATERIALS.length, 12);
  assert.equal(THICKNESSES.length, 12);
  assert.equal(CELLS.length, 144);
  assert.equal(new Set(CELLS.map(slugOf)).size, 144);
  for (const c of CELLS) assert.deepEqual(cellOf(slugOf(c)), c, slugOf(c));
  // 열전도율 차례여야 "앞은 더 잘 막는다"는 말이 선다
  const lambdas = MATERIALS.map(m => m.lambda);
  assert.deepEqual([...lambdas].sort((a, b) => a - b), lambdas);
  assert.deepEqual([...THICKNESSES].sort((a, b) => a - b), THICKNESSES);
  assert.equal(cellOf('xps'), undefined);
  assert.equal(cellOf('xps-99'), undefined);
});

test('열저항은 두께를 열전도율로 나눈 것', () => {
  for (const c of CELLS) {
    const f = insulFacts(c);
    // 열저항에 열전도율을 도로 곱하면 두께가 나온다 — 보여 주려고 두 자리에서
    // 끊었으므로, 되짚을 때는 끊기 전 값을 쓴다
    const exact = rOf(c.mm, f.lambda);
    assert.ok(Math.abs(exact * f.lambda * 1000 - c.mm) < 1e-9, `${f.slug}: ${exact}`);
    assert.ok(Math.abs(f.r - exact) <= 0.005 + 1e-9, `${f.slug}: ${f.r} vs ${exact}`);
    assert.equal(f.lambda, materialOf(c.key)!.lambda, f.slug);
  }
  // 두께가 두 배면 열저항도 두 배다
  assert.ok(Math.abs(rOf(200, 0.028) - rOf(100, 0.028) * 2) < 1e-9);
  // 압출법 100밀리미터는 3.57이다
  assert.equal(facts('xps-100').r, 3.57);
});

test('열관류율은 표면까지 더한 뒤 뒤집은 값', () => {
  for (const c of CELLS) {
    const f = insulFacts(c);
    const exact = rOf(c.mm, f.lambda);
    assert.ok(Math.abs(f.total - (exact + R_INSIDE + R_OUTSIDE)) < 0.01, f.slug);
    // 뒤집어 되돌리면 표면까지 더한 열저항이 나온다 — 끊기 전 값끼리 견준다
    const total = exact + R_INSIDE + R_OUTSIDE;
    assert.ok(Math.abs(1 / uOf(exact) - total) < 1e-9, `${f.slug}: ${1 / uOf(exact)} vs ${total}`);
    assert.ok(Math.abs(f.u - uOf(exact)) <= 0.0005 + 1e-9, `${f.slug}: ${f.u} vs ${uOf(exact)}`);
    // 표면 저항이 있으므로 아무리 얇아도 이 값을 넘지 못한다
    assert.ok(f.u < 1 / (R_INSIDE + R_OUTSIDE), f.slug);
  }
  assert.equal(R_INSIDE + R_OUTSIDE, 0.17);
  assert.equal(facts('xps-100').u, 0.267);
  // 단열재가 없다시피 하면 표면 저항만 남는다
  assert.ok(Math.abs(uOf(0) - 1 / 0.17) < 1e-9);
});

test('열손실은 열관류율에 온도 차를 곱한 것', () => {
  for (const c of CELLS) {
    const f = insulFacts(c);
    assert.ok(Math.abs(f.loss - f.u * DELTA_T) <= 0.02, f.slug);
    // 되돌려 나누면 열관류율이 나온다
    assert.ok(Math.abs(f.loss / DELTA_T - f.u) <= 0.001, f.slug);
  }
  assert.equal(DELTA_T, 20);
});

test('같은 열저항을 내는 두께를 되짚는다', () => {
  for (const c of CELLS) {
    const f = insulFacts(c);
    assert.equal(f.same.length, MATERIALS.length - 1, f.slug);
    const exact = rOf(c.mm, f.lambda);
    for (const s of f.same) {
      const lambda = materialOf(s.key)!.lambda;
      // 그 두께로 열저항을 다시 계산하면 원래 값이 나온다 — 밀리미터로 끊은
      // 만큼만 어긋난다
      const back = rOf(s.mm, lambda);
      assert.ok(Math.abs(back - exact) <= 0.5 / 1000 / lambda + 1e-9, `${f.slug} → ${s.key}: ${back} vs ${exact}`);
      // 열전도율이 큰 재료일수록 더 두꺼워야 한다 — 밀리미터로 끊으면
      // 열전도율이 한 끗 차이일 때 같은 값이 되므로 끊기 전으로 견준다
      assert.equal(thicknessFor(exact, lambda) > c.mm, lambda > f.lambda, `${f.slug} → ${s.key}`);
    }
    // 콘크리트 항목과 따로 낸 값이 어긋나면 안 된다.
    // 콘크리트 자신은 목록에서 빠지므로(제 짝은 안 싣는다) 그때만 건너뛴다
    const inSame = f.same.find(s => s.key === 'concrete');
    if (c.key === 'concrete') {
      assert.equal(inSame, undefined, f.slug);
      assert.ok(Math.abs(f.concrete - c.mm / 1000) < 1e-9, f.slug);
    } else {
      assert.ok(inSame, f.slug);
      assert.ok(Math.abs(inSame.mm / 1000 - f.concrete) <= 0.011, `${f.slug}: ${inSame.mm} vs ${f.concrete}`);
    }
  }
  // 압출법 100밀리미터를 콘크리트로 내려면 5.71미터가 필요하다
  assert.equal(facts('xps-100').concrete, 5.71);
  assert.ok(Math.abs(thicknessFor(1, 1.6) - 1600) < 1e-9);
});

test('기준은 열관류율이 그 아래일 때만 만족한다', () => {
  assert.deepEqual(TARGETS.map(t => t.key), ['passive', 'korea', 'basic']);
  for (const c of CELLS) {
    const f = insulFacts(c);
    for (const t of TARGETS) assert.equal(f.meets.includes(t.key), uOf(rOf(c.mm, f.lambda)) <= t.u, `${f.slug} ${t.key}`);
    // 엄한 기준을 넘었다면 느슨한 기준도 넘는다
    if (f.meets.includes('passive')) assert.ok(f.meets.includes('basic'), f.slug);
  }
  // 콘크리트만으로는 어떤 두께로도 기준에 못 든다
  for (const mm of THICKNESSES) assert.deepEqual(insulFacts({ key: 'concrete', mm }).meets, [], `concrete-${mm}`);
});

test('앞뒤 칸은 한 단계씩만 움직인다', () => {
  const f = facts('xps-100');
  assert.equal(f.thicker?.mm, 120);
  assert.equal(f.thinner?.mm, 70);
  assert.equal(f.better?.key, 'pur');
  assert.equal(f.worse?.key, 'eps2');
  assert.equal(facts('vacuum-10').thinner, null);
  assert.equal(facts('vacuum-10').better, null);
  assert.equal(facts('concrete-400').thicker, null);
  assert.equal(facts('concrete-400').worse, null);
  for (const c of CELLS) {
    const g = insulFacts(c);
    const exactR = (x: { key: string; mm: number }) => rOf(x.mm, materialOf(x.key)!.lambda);
    if (g.thicker) assert.ok(exactR(g.thicker) > exactR(c), g.slug);
    if (g.better) assert.ok(exactR(g.better) > exactR(c), g.slug);
  }
});

test('언어끼리 글자가 섞이지 않는다', async () => {
  const { LANG_CODES } = await import('../lib/i18n/lang.ts');
  const { INSUL_UI } = await import('../lib/insul/ui.ts');
  const HAN_OK = new Set(['ja', 'zh', 'tw']);
  const shown = [insulFacts({ key: 'xps', mm: 100 }), insulFacts({ key: 'concrete', mm: 400 }), insulFacts({ key: 'vacuum', mm: 10 })];
  for (const lang of LANG_CODES) {
    const ui = INSUL_UI[lang];
    const strings = [
      ...Object.values(ui).filter((v): v is string => typeof v === 'string'),
      ...ui.how,
      ...ui.hubFaq.flatMap(q => [q.q, q.a]),
      ...shown.flatMap(f => [ui.desc(f), ui.metaTitle(f), ui.metaDesc(f), ...ui.cellFaq(f).flatMap(q => [q.q, q.a])]),
      ...MATERIALS.map(m => ui.materialName(m.key)),
      ...TARGETS.map(t => ui.targetName(t.key)),
    ];
    for (const s of strings) {
      if (lang !== 'ko') assert.ok(!/[가-힣]/.test(s), `${lang}: 한글이 섞였다 — ${s}`);
      if (lang !== 'ja') assert.ok(!/[ぁ-んァ-ヶ]/.test(s), `${lang}: 가나가 섞였다 — ${s}`);
      if (!HAN_OK.has(lang)) assert.ok(!/[一-龯]/.test(s), `${lang}: 한자가 섞였다 — ${s}`);
      if (lang !== 'hi') assert.ok(!/[ऀ-ॿ]/.test(s), `${lang}: 데바나가리가 섞였다 — ${s}`);
    }
  }
});

test('재료 이름과 기준 이름이 열 언어에 다 있다', async () => {
  const { LANG_CODES } = await import('../lib/i18n/lang.ts');
  const { INSUL_UI } = await import('../lib/insul/ui.ts');
  const OTHER_SCRIPT = ['ko', 'ja', 'hi', 'zh', 'tw'];
  for (const lang of LANG_CODES) {
    const ui = INSUL_UI[lang];
    const names = MATERIALS.map(m => ui.materialName(m.key));
    assert.equal(new Set(names).size, MATERIALS.length, `${lang}: 재료 이름이 겹친다`);
    if (OTHER_SCRIPT.includes(lang)) {
      for (const m of MATERIALS) assert.notEqual(ui.materialName(m.key), m.key, `${lang}: ${m.key} 번역이 없다`);
    }
    const targets = TARGETS.map(t => ui.targetName(t.key));
    assert.equal(new Set(targets).size, TARGETS.length, `${lang}: 기준 이름이 겹친다`);
    // 기준 이름에는 그 값이 들어가야 무엇을 넘었는지 알 수 있다
    for (const t of TARGETS) {
      const shown = ui.targetName(t.key).replace(',', '.');
      assert.ok(shown.includes(String(t.u)) || shown.includes(t.u.toFixed(2)), `${lang}: ${t.key}에 값이 없다 — ${shown}`);
    }
  }
});

test('열 언어 모두 문구가 채워져 있다', async () => {
  const { LANG_CODES } = await import('../lib/i18n/lang.ts');
  const { DENSE } = await import('./han.ts');
  const { INSUL_UI } = await import('../lib/insul/ui.ts');
  const f = insulFacts({ key: 'xps', mm: 100 });
  for (const lang of LANG_CODES) {
    const ui = INSUL_UI[lang];
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
    // 나눗셈 하나라는 것과 뒤집는다는 것 — 전제 둘은 길게 밝혀야 한다
    assert.ok(ui.rNote.length >= floor * 6, `${lang}: 열저항 설명이 짧다`);
    assert.ok(ui.uNote.length >= floor * 6, `${lang}: 열관류율 설명이 짧다`);
  }
});

test('벽돌 아이콘은 목록과 카드가 같은 그림을 쓴다', async () => {
  const { ICON_FOR } = await import('../lib/og-icon-map.ts');
  const { INSUL_ICON } = await import('../lib/insul/list.ts');
  assert.equal(ICON_FOR[INSUL_ICON], 'grid', '이모지가 아이콘으로 이어지지 않는다');
});

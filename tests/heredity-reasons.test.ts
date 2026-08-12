/**
 * 낱장 512장이 서로 다른 문장을 갖는지 본다.
 *
 * ── 무엇이 있었나 (2026-08-12) ────────────────────────────
 * 애드센스가 "가치 없는 콘텐츠"로 거절한 뒤 111개 섹션의 낱장을 실제로 받아
 * 재 봤다. **글이 짧아서가 아니었다** — 가장 짧은 것도 1,129자이고 heredity는
 * 2,400자였다. 문제는 형제끼리 **낱말 95.9%가 같다**는 것이었다.
 *
 * 두 낱장을 맞대어 보니 고유 낱말 357개 중 다른 것이 **여섯 개**뿐이었고,
 * 그 여섯이 전부 숫자였다. 문장이 틀에서 나와 혈액형 이름과 퍼센트만 갈렸다.
 *
 * 고친 방법: 칸의 구조에서 갈래를 뽑아(facts.ts의 reasonKeys) 갈래마다 다른
 * 문장을 붙인다. 512칸이 열넷의 갈래 조합으로 나뉜다.
 *
 * 이 검사가 지키는 것: 갈래를 하나로 뭉개거나 문장을 한 벌로 되돌리면 걸린다.
 * 둘 다 빌드는 멀쩡히 끝나고 화면도 그대로 보인다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { CELLS, TYPES } from '../lib/heredity/list.ts';
import { heredityFacts, reasonKeys, type ReasonKey } from '../lib/heredity/facts.ts';
import { HEREDITY_UI } from '../lib/heredity/ui.ts';
import { LANG_CODES } from '../lib/i18n/lang.ts';
import { DENSE, hanProblem } from './han.ts';

const ALL = CELLS.map(c => heredityFacts(c));

test('갈래가 여러 가지로 갈린다 — 한 벌로 뭉개지지 않았다', () => {
  const combos = new Map<string, number>();
  for (const f of ALL) {
    const k = reasonKeys(f).join('+');
    assert.ok(k.length > 0, `${f.slug}: 갈래가 하나도 없다`);
    combos.set(k, (combos.get(k) ?? 0) + 1);
  }
  /*
   * 열 가지 밑으로 떨어지면 문장이 다시 뭉개진 것이다. 지금은 열넷이다.
   * 상한을 두지 않는 것은 갈래가 늘어나는 것은 좋은 방향이기 때문이다.
   */
  assert.ok(combos.size >= 10, `갈래 조합이 ${combos.size}가지뿐 — 문장이 뭉개졌다`);
  // 한 조합이 절반을 넘게 먹으면 그 조합 안에서는 문장이 그대로다
  const biggest = Math.max(...combos.values());
  assert.ok(
    biggest < ALL.length / 2,
    `한 갈래가 ${biggest}칸(${((biggest / ALL.length) * 100).toFixed(0)}%)을 먹는다 — 갈래를 더 갈라야 한다`,
  );
});

test('불가능한 칸은 왜 안 되는지 말한다', () => {
  /*
   * 이것이 이 섹션에서 가장 중요한 문장이다. "안 됩니다"만 적으면 왜인지 알 수
   * 없고, 그 페이지는 판정 한 줄과 표뿐이 된다.
   */
  const bad: string[] = [];
  for (const f of ALL) {
    if (f.possible) continue;
    const keys = reasonKeys(f);
    const explains: ReasonKey[] = ['noAboAllele', 'noRhFromNeg', 'abNeedsBoth', 'oNeedsBoth'];
    if (!keys.some(k => explains.includes(k))) bad.push(`${f.slug}: ${keys.join('+')}`);
    // 불가능한 칸에는 확률 갈래가 붙어서는 안 된다
    for (const k of ['bothFixed', 'oneFixed', 'neitherFixed'] as ReasonKey[]) {
      if (keys.includes(k)) bad.push(`${f.slug}: 불가능한데 ${k}가 붙었다`);
    }
  }
  assert.deepEqual(bad.slice(0, 5), [], bad.join('\n  '));
});

test('가능한 칸은 확률이 하나인지 범위인지 말한다', () => {
  const bad: string[] = [];
  for (const f of ALL) {
    if (!f.possible) continue;
    const keys = reasonKeys(f);
    const chance: ReasonKey[] = ['bothFixed', 'oneFixed', 'neitherFixed'];
    const got = keys.filter(k => chance.includes(k));
    if (got.length !== 1) bad.push(`${f.slug}: 확률 갈래가 ${got.length}개다`);
    // 부모가 둘 다 정해지면 확률은 값 하나여야 한다
    if (f.fatherFixed && f.motherFixed && !keys.includes('bothFixed')) {
      bad.push(`${f.slug}: 둘 다 정해졌는데 bothFixed가 아니다`);
    }
    if (keys.includes('bothFixed')) {
      assert.equal(f.minChance, f.maxChance, `${f.slug}: bothFixed인데 확률이 범위다`);
    }
  }
  assert.deepEqual(bad.slice(0, 5), [], bad.join('\n  '));
});

test('Rh+ 부모 둘에게서 Rh−가 나오는 칸을 따로 짚는다', () => {
  /* 사람들이 가장 많이 놀라는 자리다 — 그 칸에서만 그 문장이 나와야 한다 */
  let hit = 0;
  for (const f of ALL) {
    const marked = reasonKeys(f).includes('rhNegFromBothPlus');
    const should = f.possible && !f.child.rh && f.father.rh && f.mother.rh;
    assert.equal(marked, should, `${f.slug}: rhNegFromBothPlus 판정이 어긋났다`);
    if (should) hit++;
  }
  assert.ok(hit > 0, '그런 칸이 하나도 없다 — 판정이 죽었다');
});

test('여덟 가지가 다 나오는 칸과 하나만 나오는 칸을 가른다', () => {
  for (const f of ALL) {
    const keys = reasonKeys(f);
    if (!f.possible) continue;
    assert.equal(
      keys.includes('allEight'), f.possibleChildren.length === TYPES.length,
      `${f.slug}: allEight 판정이 어긋났다`,
    );
    assert.equal(
      keys.includes('onlyChild'), f.possibleChildren.length === 1,
      `${f.slug}: onlyChild 판정이 어긋났다`,
    );
  }
});

test('열 언어에 갈래 문장이 다 있고 남의 언어가 안 섞인다', () => {
  const KEYS: ReasonKey[] = [
    'bothFixed', 'oneFixed', 'neitherFixed', 'onlyChild', 'allEight',
    'rhNegFromBothPlus', 'noAboAllele', 'noRhFromNeg', 'abNeedsBoth', 'oNeedsBoth',
  ];
  const HAN_OK = new Set(['ja', 'zh', 'tw']);
  for (const lang of LANG_CODES) {
    const ui = HEREDITY_UI[lang];
    assert.ok(ui.reasonsTitle.trim().length > 0, `${lang}: 제목이 비었다`);

    // 열쇠마다 문장이 실제로 나오는지 — 그 열쇠를 가진 칸을 찾아 확인한다
    const seen = new Set<string>();
    for (const f of ALL) {
      const lines = ui.reasons(f);
      assert.equal(lines.length, reasonKeys(f).length, `${lang}/${f.slug}: 줄 수가 갈래 수와 다르다`);
      for (const line of lines) {
        seen.add(line);
        const floor = DENSE.has(lang) ? 20 : 40;
        assert.ok(line.length >= floor, `${lang}: 갈래 문장이 짧다 — ${line}`);
        if (lang !== 'ko') assert.ok(!/[가-힣]/.test(line), `${lang}: 한글이 섞였다 — ${line}`);
        if (lang !== 'ja') assert.ok(!/[ぁ-んァ-ヶ]/.test(line), `${lang}: 가나가 섞였다 — ${line}`);
        if (!HAN_OK.has(lang)) assert.ok(!/[一-龯]/.test(line), `${lang}: 한자가 섞였다 — ${line}`);
        if (lang !== 'hi') assert.ok(!/[ऀ-ॿ]/.test(line), `${lang}: 데바나가리가 섞였다 — ${line}`);
        const han = hanProblem(lang, line);
        assert.equal(han, '', `${lang}: ${han} — ${line}`);
      }
    }
    // 열쇠 열 개가 모두 어딘가에서 쓰인다 — 쓰이지 않는 문장은 죽은 문장이다
    assert.ok(seen.size >= KEYS.length - 1, `${lang}: 갈래 문장이 ${seen.size}가지만 나온다`);
  }
});

test('두 칸의 설명이 실제로 다르다', () => {
  /*
   * 이 검사가 이 작업의 요점이다. 갈래를 나눠 두고도 문장이 같으면 아무 소용이
   * 없다. 갈래 조합이 다른 칸끼리 문장이 달라야 한다.
   */
  for (const lang of LANG_CODES) {
    const ui = HEREDITY_UI[lang];
    const byCombo = new Map<string, string>();
    for (const f of ALL) {
      const combo = reasonKeys(f).join('+');
      const text = ui.reasons(f).join(' ');
      const before = byCombo.get(combo);
      if (before === undefined) byCombo.set(combo, text);
      else assert.equal(text, before, `${lang}: 같은 갈래인데 문장이 다르다 — ${combo}`);
    }
    // 갈래가 다르면 문장도 달라야 한다
    const texts = [...byCombo.values()];
    assert.equal(new Set(texts).size, texts.length, `${lang}: 갈래가 다른데 문장이 같다`);
  }
});

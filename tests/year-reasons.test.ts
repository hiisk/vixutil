/**
 * 낱장 241장이 서로 다른 문장을 갖는지 본다.
 *
 * ── 무엇이 있었나 (2026-08-12) ────────────────────────────
 * 애드센스가 "가치 없는 콘텐츠"로 거절한 뒤 111개 섹션의 낱장을 받아 재 봤다.
 * 글이 짧아서가 아니었다(본문 2,900자). 형제끼리 **낱말 96%가 같았다** — 문장이
 * 틀에서 나와 연도와 요일 이름만 갈렸다.
 *
 * 고친 방법: 달력 규칙에서 갈래를 뽑고(facts.ts의 yearReasonKeys), 문장이 그
 * 갈래의 사실을 짚게 했다. 특히 **그 해에 53번 드는 요일**을 문장에 넣은 것이
 * 241해를 스물세 갈래로 벌린 축이다 — 365 = 52×7 + 1 이라는 규칙에서 바로
 * 나오는 사실이면서 해마다 다른 것이 그것뿐이었다.
 *
 * 이 검사가 지키는 것: 갈래를 뭉개거나 문장을 한 벌로 되돌리면 걸린다.
 * 둘 다 빌드는 멀쩡히 끝나고 화면도 그대로 보인다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { YEARS } from '../lib/year/list.ts';
import { extraWeekdays, yearFacts, yearReasonKeys, type YearReasonKey } from '../lib/year/facts.ts';
import { YEAR_UI } from '../lib/year/ui.ts';
import { LANG_CODES } from '../lib/i18n/lang.ts';
import { DENSE, hanProblem } from './han.ts';

const ALL = YEARS.map(y => yearFacts(y));

/** 문장까지 담은 갈래 — 요일 이름이 들어가므로 열쇠만으로는 안 세어진다 */
const shape = (f: ReturnType<typeof yearFacts>) =>
  `${yearReasonKeys(f).join('+')}|${extraWeekdays(f).join(',')}`;

test('갈래가 고르게 퍼진다 — 한 벌로 뭉개지지 않았다', () => {
  const combos = new Map<string, number>();
  for (const f of ALL) combos.set(shape(f), (combos.get(shape(f)) ?? 0) + 1);

  assert.ok(combos.size >= 15, `갈래가 ${combos.size}가지뿐 — 문장이 뭉개졌다`);
  const biggest = Math.max(...combos.values());
  assert.ok(
    biggest < ALL.length * 0.25,
    `한 갈래가 ${biggest}해(${((biggest / ALL.length) * 100).toFixed(0)}%)를 먹는다 — 더 갈라야 한다`,
  );
});

test('윤년 규칙 네 갈래가 다 나온다', () => {
  const seen = new Set<YearReasonKey>();
  for (const f of ALL) for (const k of yearReasonKeys(f)) seen.add(k);
  for (const k of ['not4', 'by4', 'by100', 'by400'] as YearReasonKey[]) {
    assert.ok(seen.has(k), `${k} 갈래가 한 번도 안 나온다 — 목록의 해 범위가 그 규칙을 안 밟는다`);
  }
});

test('1900은 윤년이 아니고 2000은 윤년이다', () => {
  /* 백 년 규칙과 사백 년 규칙이 갈리는 자리 — 달력에서 가장 유명한 예다 */
  const y1900 = ALL.find(f => f.year === 1900);
  const y2000 = ALL.find(f => f.year === 2000);
  assert.ok(y1900 && y2000, '1900과 2000이 목록에 없다');
  assert.equal(y1900!.leap, false);
  assert.equal(y2000!.leap, true);
  assert.ok(yearReasonKeys(y1900!).includes('by100'), '1900에 by100 갈래가 없다');
  assert.ok(yearReasonKeys(y2000!).includes('by400'), '2000에 by400 갈래가 없다');
  // 문장도 갈라져야 한다
  for (const lang of LANG_CODES) {
    const ui = YEAR_UI[lang];
    assert.notEqual(ui.reasons(y1900!)[0], ui.reasons(y2000!)[0], `${lang}: 1900과 2000의 첫 문장이 같다`);
  }
});

test('53번 드는 요일이 달력 규칙과 맞는다', () => {
  /*
   * 365 = 52×7 + 1 이라 1월 1일의 요일이 하나 더 든다. 366일이면 그 다음
   * 요일까지 둘이다. 이것이 문장을 일곱(윤년은 열넷) 갈래로 벌리는 축이므로,
   * 규칙 자체를 못 박아 둔다.
   */
  for (const f of ALL) {
    const got = extraWeekdays(f);
    assert.equal(got.length, f.leap ? 2 : 1, `${f.year}: 53번 드는 요일이 ${got.length}개다`);
    assert.equal(got[0], f.firstWeekday, `${f.year}: 첫 요일이 1월 1일과 다르다`);
    if (f.leap) assert.equal(got[1], (f.firstWeekday + 1) % 7, `${f.year}: 두 번째 요일이 어긋났다`);
    // 평년이면 1월 1일과 12월 31일이 같은 요일이다 — 남는 하루가 그것이다
    if (!f.leap) assert.equal(f.firstWeekday, f.lastWeekday, `${f.year}: 평년인데 앞뒤 요일이 다르다`);
  }
});

test('53주짜리 해에만 그 갈래가 붙는다', () => {
  let hit = 0;
  for (const f of ALL) {
    const marked = yearReasonKeys(f).includes('weeks53');
    assert.equal(marked, f.isoWeeks === 53, `${f.year}: weeks53 판정이 어긋났다`);
    if (marked) hit++;
  }
  assert.ok(hit > 0, '53주짜리 해가 하나도 없다 — 판정이 죽었다');
});

test('열 언어에 갈래 문장이 다 있고 남의 언어가 안 섞인다', () => {
  const HAN_OK = new Set(['ja', 'zh', 'tw']);
  for (const lang of LANG_CODES) {
    const ui = YEAR_UI[lang];
    assert.ok(ui.reasonsTitle.trim().length > 0, `${lang}: 제목이 비었다`);
    for (const f of ALL) {
      const lines = ui.reasons(f);
      assert.equal(lines.length, yearReasonKeys(f).length, `${lang}/${f.year}: 줄 수가 갈래 수와 다르다`);
      for (const line of lines) {
        const floor = DENSE.has(lang) ? 15 : 30;
        assert.ok(line.length >= floor, `${lang}: 갈래 문장이 짧다 — ${line}`);
        if (lang !== 'ko') assert.ok(!/[가-힣]/.test(line), `${lang}: 한글이 섞였다 — ${line}`);
        if (lang !== 'ja') assert.ok(!/[ぁ-んァ-ヶ]/.test(line), `${lang}: 가나가 섞였다 — ${line}`);
        if (!HAN_OK.has(lang)) assert.ok(!/[一-龯]/.test(line), `${lang}: 한자가 섞였다 — ${line}`);
        if (lang !== 'hi') assert.ok(!/[ऀ-ॿ]/.test(line), `${lang}: 데바나가리가 섞였다 — ${line}`);
        const han = hanProblem(lang, line);
        assert.equal(han, '', `${lang}: ${han} — ${line}`);
      }
      // 그 해의 숫자가 문장 어딘가에 들어 있어야 한다 — 안 들어 있으면 틀이 그대로다
      assert.ok(lines.join(' ').includes(String(f.year)), `${lang}/${f.year}: 문장에 연도가 없다`);
    }
  }
});

test('갈래가 다른 두 해는 문장도 다르다', () => {
  for (const lang of LANG_CODES) {
    const ui = YEAR_UI[lang];
    const byShape = new Map<string, string>();
    for (const f of ALL) {
      /* 연도 숫자는 늘 다르므로 지워 놓고 뼈대만 견준다 */
      const text = ui.reasons(f).join(' ').replaceAll(String(f.year), '〈해〉');
      const k = shape(f);
      const before = byShape.get(k);
      if (before === undefined) byShape.set(k, text);
      else assert.equal(text, before, `${lang}: 같은 갈래인데 뼈대가 다르다 — ${k}`);
    }
    const texts = [...byShape.values()];
    assert.equal(new Set(texts).size, texts.length, `${lang}: 갈래가 다른데 뼈대가 같다`);
  }
});

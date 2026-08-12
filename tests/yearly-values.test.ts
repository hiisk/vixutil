/**
 * 해마다 바뀌는 값의 표(lib/yearly-values.ts)가 실제 코드와 맞는지 본다.
 *
 * ── 이 검사가 있어야 하는 까닭 ─────────────────────────────
 * 표를 만들어 두는 것만으로는 오래 못 간다. 누군가 코드에서 요율을 고치고 표를
 * 안 고치면, 표는 남아 있지만 **거짓말을 하는 문서**가 된다. 그러면 다음 해에
 * 그 표를 믿고 훑은 사람이 "이미 확인된 값"으로 넘겨 버린다.
 *
 * 그래서 표가 가리키는 파일과 문자열이 실제로 그 자리에 있는지 검사한다.
 * 코드에서 값을 고치면 이 검사가 걸리고, 걸린 사람이 표도 함께 고치게 된다.
 *
 * ── 왜 "올해와 비교"하지 않나 ──────────────────────────────
 * `asOf`가 올해보다 뒤지면 실패시키는 검사를 넣을 수도 있었다. 그러면 해가
 * 바뀌는 순간 아무 변경도 없이 빌드가 깨진다 — 시간이 지나면 저절로 실패하는
 * 검사는 결국 주석 처리되고 아무도 안 본다. 대신 `oldestAsOf()`를 내보내
 * 필요할 때 사람이 세어 보게 한다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { YEARLY_VALUES, oldestAsOf, yearlyOnly } from '../lib/yearly-values.ts';

const ROOT = join(import.meta.dirname, '..');

test('표가 가리키는 파일이 모두 실재한다', () => {
  const missing = YEARLY_VALUES.filter(v => !existsSync(join(ROOT, v.file))).map(v => `${v.label} → ${v.file}`);
  assert.deepEqual(missing, [], '표가 없는 파일을 가리킨다:\n  ' + missing.join('\n  '));
});

test('표에 적은 값이 그 파일에 실제로 있다', () => {
  /*
   * 이것이 이 검사의 본체다. 코드에서 요율을 고치고 표를 안 고치면 여기서 걸린다.
   * needle을 문자열 그대로 찾는 것은 값과 이름이 함께 맞는지 보려는 것이다 —
   * 숫자만 찾으면 다른 자리의 같은 숫자에 헛맞을 수 있다.
   */
  const drifted: string[] = [];
  for (const v of YEARLY_VALUES) {
    const p = join(ROOT, v.file);
    if (!existsSync(p)) continue;
    if (!readFileSync(p, 'utf8').includes(v.needle)) {
      drifted.push(`${v.label}\n      ${v.file}에서 "${v.needle}"를 못 찾았다`);
    }
  }
  assert.deepEqual(
    drifted, [],
    '코드가 바뀌었는데 lib/yearly-values.ts를 안 고쳤다:\n  - ' + drifted.join('\n  - '),
  );
});

test('표에 빠뜨린 계산 파일이 없다', () => {
  /*
   * 표가 코드를 따라가는지도 봐야 한다. "고시"라고 적어 둔 계산 파일은 해마다
   * 확인할 값을 갖고 있다는 뜻이므로 표에 있어야 한다.
   *
   * 자료·문구 파일(퀴즈·사전·검색 색인)은 뺀다 — 거기서 "고시"는 낱말일 뿐이다.
   */
  const SKIP = /quiz|test-data|dream|fortune|checklist|search-index|calc-faq|section-faq|generator|hanja|glossary|terms|formula\//;
  const listed = new Set(YEARLY_VALUES.map(v => v.file));

  const suspects: string[] = [];
  const walk = (dir: string) => {
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      const p = join(dir, e.name);
      if (e.isDirectory()) { walk(p); continue; }
      if (!e.name.endsWith('.ts')) continue;
      const rel = p.replace(ROOT + '/', '');
      if (SKIP.test(rel) || listed.has(rel)) continue;
      const src = readFileSync(p, 'utf8');
      /*
       * 고시·법률로 정해진 값을 상수로 들고 있는 파일만 잡는다.
       *
       * 처음에는 「고시」라는 낱말만 찾았다. 그래서 **법률로 정해진 값을 놓쳤다** —
       * 월세 세액공제(조세특례제한법)는 "조특법 개정으로 바뀐다"고 적혀 있어
       * 탐지기에 걸리지 않았고, 등록부에 넣기 전에도 검사가 초록이었다.
       * 그 담당이 보고에 그 사실을 적어 주어 알았다(2026-08-13).
       * 이제 개정·법률·시행령도 함께 찾는다.
       */
      if (
        /해마다 고시|고시로 (?:정해|바뀌)|개정(?:으로|되|을 거듭|된)|시행령으로 (?:정해|바뀌)|법이 정한 (?:금액|비율)/.test(src)
        && /^export const [A-Z_]+ = [0-9]/m.test(src)
      ) {
        suspects.push(rel);
      }
    }
  };
  walk(join(ROOT, 'lib'));

  assert.deepEqual(
    suspects, [],
    '고시값을 상수로 들고 있는데 lib/yearly-values.ts에 없다:\n  ' + suspects.join('\n  '),
  );
});

test('해마다 확인할 것과 규칙을 갈라 두었다', () => {
  /*
   * 'yearly'와 'rule'을 섞어 두면 새해에 스물두 줄을 다 확인해야 한다.
   * 갈라 두어야 실제로 확인할 것만 훑을 수 있다.
   */
  const yearly = yearlyOnly();
  assert.ok(yearly.length > 0, '해마다 확인할 값이 하나도 없다 — 갈래를 잘못 적었다');
  assert.ok(yearly.length < YEARLY_VALUES.length, '전부 yearly로 적혀 있다 — 규칙과 안 갈랐다');

  for (const v of YEARLY_VALUES) {
    assert.ok(v.source.length > 0, `${v.label}: 어디서 확인하는지 안 적혀 있다`);
    assert.ok(v.asOf >= 2000 && v.asOf <= 2100, `${v.label}: 기준 연도가 이상하다 (${v.asOf})`);
    // 'ours'는 법 근거가 없다는 것을 분명히 밝혀야 한다
    if (v.kind === 'ours') {
      assert.match(v.source, /없음/, `${v.label}: 우리가 정한 기준인데 근거가 있는 것처럼 적혀 있다`);
    }
  }
});

test('같은 값을 두 줄로 적어 두지 않았다', () => {
  const keys = YEARLY_VALUES.map(v => `${v.file}::${v.needle}`);
  const dup = [...new Set(keys.filter((k, i) => keys.indexOf(k) !== i))];
  assert.deepEqual(dup, [], '같은 자리를 두 번 적었다');

  const labels = YEARLY_VALUES.map(v => v.label);
  assert.equal(new Set(labels).size, labels.length, '이름이 겹치는 줄이 있다');
});

test('기준 연도가 하나라도 적혀 있다', () => {
  /* oldestAsOf가 실제로 값을 내는지 — 표가 비면 이 검사부터 걸린다 */
  const oldest = oldestAsOf();
  assert.ok(Number.isFinite(oldest), '기준 연도를 셀 수 없다');
  assert.ok(oldest >= 2023, `가장 오래된 기준이 ${oldest}년이다 — 세율표 개정을 놓쳤을 수 있다`);
});

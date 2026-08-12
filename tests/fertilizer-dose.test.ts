/**
 * 비료 시비량 — 셈을 다른 길로 되짚는다.
 *
 * 비료량은 성분량을 함량으로 나눈 값이므로, 비료량에 함량을 도로 곱하면 성분량이
 * 나와야 한다. 그 왕복만으로는 방향이 뒤집힌 것을 못 잡는다 — 곱셈과 나눗셈을
 * 서로 바꿔도 왕복은 여전히 맞기 때문이다. 그래서 함량 100%인 가상의 비료를
 * 함께 본다: 함량이 100%면 비료량과 성분량이 같아야 하고, 식이 뒤집혀 있으면
 * 그 자리만 유일하게 살아남지 못한다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  AREAS, BASE_TARGET, CELLS, FERTILIZERS, NUTRIENTS, TARGETS,
  cellOf, contentOf, fertilizerOf, isCompound, slugOf,
} from '../lib/fertilizer/list.ts';
import {
  TO_ELEMENT, basisOf, elementOf, fertilizerFacts, fertilizerFor,
  neighboursOf, npkOf, nutrientIn, nutrientsOf, oxideOf,
} from '../lib/fertilizer/facts.ts';

const facts = (slug: string) => {
  const c = cellOf(slug);
  assert.ok(c, `${slug} 칸이 없다`);
  return fertilizerFacts(c);
};

test('칸은 비료 15가지 × 면적 9가지', () => {
  assert.equal(FERTILIZERS.length, 15);
  assert.equal(AREAS.length, 9);
  assert.equal(CELLS.length, 135);
  // 100칸을 넘어야 한다는 것이 이 섹션의 전제다
  assert.ok(CELLS.length > 100, `칸이 ${CELLS.length}개뿐이다`);
  assert.equal(new Set(CELLS.map(slugOf)).size, 135, 'slug가 겹친다');
  for (const c of CELLS) assert.deepEqual(cellOf(slugOf(c)), c, slugOf(c));
  for (let i = 1; i < AREAS.length; i++) assert.ok(AREAS[i] > AREAS[i - 1]);
  assert.equal(cellOf('urea'), undefined);
  assert.equal(cellOf('compost-100m2'), undefined, '축에 없는 비료가 열리면 안 된다');
  assert.equal(cellOf('urea-77m2'), undefined, '축에 없는 면적이 열리면 안 된다');
  // 슬러그 규칙 — 언어를 안 가린다
  assert.equal(slugOf({ fertilizer: 'urea', area: 100 }), 'urea-100m2');
});

test('함량은 0~100 사이이고 세 성분의 합이 100을 넘지 않는다', () => {
  /*
   * 자릿수 실수를 잡는다. 46을 0.46으로 적거나 460으로 적으면 나눗셈은 그대로
   * 돌아가고 답만 백 배 틀린다 — 화면에서는 그냥 큰 숫자로 보인다.
   */
  for (const f of FERTILIZERS) {
    let sum = 0;
    for (const k of NUTRIENTS) {
      const v = contentOf(f, k);
      assert.ok(v >= 0 && v <= 100, `${f.key}.${k}: ${v}`);
      sum += v;
    }
    assert.ok(sum > 0, `${f.key}: 성분이 하나도 없다`);
    assert.ok(sum <= 100, `${f.key}: 함량 합이 ${sum}%다 — 100%를 넘을 수 없다`);
  }
  // 널리 알려진 값 몇 개는 못으로 박아 둔다
  assert.equal(fertilizerOf('urea')!.n, 46, '요소의 질소는 46%다');
  assert.equal(fertilizerOf('potassium-chloride')!.k, 60, '염화칼륨의 K₂O는 60%다');
  assert.equal(fertilizerOf('dap')!.p, 46, 'DAP의 P₂O₅는 46%다');
});

test('복합비료 열쇠의 숫자가 실제 함량과 같다', () => {
  /*
   * 이름은 열쇠에서 만든다('npk-21-17-17' → '복합비료 21-17-17'). 열쇠와 함량이
   * 어긋나면 화면에 적힌 이름이 거짓이 되는데, 그 거짓은 아무 데서도 안 걸린다.
   */
  for (const f of FERTILIZERS) {
    if (!isCompound(f.key)) continue;
    assert.equal(f.key.slice(4), npkOf(f), `${f.key}: 이름의 숫자와 함량이 다르다`);
  }
  assert.equal(FERTILIZERS.filter(f => isCompound(f.key)).length, 4);
});

test('비료량에 함량을 도로 곱하면 성분량이다', () => {
  for (const c of CELLS) {
    const f = fertilizerFacts(c);
    for (const target of TARGETS) {
      const need = c.area * target;
      const grams = fertilizerFor(need, f.content);
      const back = nutrientIn(grams, f.content);
      assert.ok(Math.abs(back - need) < 1e-9, `${f.slug} ${target}g/m²: ${back} vs ${need}`);
    }
  }
});

test('함량 100%면 비료량과 성분량이 같다 — 식이 뒤집혔는지 보는 자리', () => {
  /*
   * 곱셈으로 바꿔 놓아도 위의 왕복 검사는 통과한다. 함량이 1일 때만 두 방향이
   * 갈리므로, 나눗셈의 방향은 여기서만 드러난다.
   */
  for (const need of [1, 10, 250, 1000, 20000]) {
    assert.equal(fertilizerFor(need, 100), need, `함량 100%에서 ${need}g`);
  }
  // 함량이 100%보다 작으면 비료는 늘 성분보다 많다
  for (const f of FERTILIZERS) {
    const basis = basisOf(f);
    const content = contentOf(f, basis);
    const grams = fertilizerFor(1000, content);
    if (content < 100) assert.ok(grams > 1000, `${f.key}: ${content}%인데 비료가 ${grams}g로 성분보다 적다`);
  }
  // 널리 알려진 값 — 요소로 질소 10g은 21.74g이다
  assert.ok(Math.abs(fertilizerFor(10, 46) - 21.739) < 0.001, '요소 46%에서 10g이 21.74g이 아니다');
});

test('복합비료는 기준 성분을 맞추면 나머지 둘이 함량 비율대로 따라온다', () => {
  for (const c of CELLS) {
    const f = fertilizerFacts(c);
    if (!f.compound) continue;
    for (const d of f.doses) {
      const exact = fertilizerFor(c.area * d.target, f.content);
      for (const a of d.along) {
        // 따라 들어온 양 ÷ 기준 성분량 = 함량 비율
        const along = nutrientIn(exact, a.content);
        const want = a.content / f.content;
        assert.ok(
          Math.abs(along / (c.area * d.target) - want) < 1e-9,
          `${f.slug} ${d.target}g/m² ${a.key}: ${along / (c.area * d.target)} vs ${want}`,
        );
        // facts가 담은 반올림 값도 그 비율에서 벗어나지 않는다
        assert.ok(Math.abs(a.grams - along) < 0.1, `${f.slug} ${a.key}: 반올림이 어긋났다`);
      }
    }
  }
  // 21-17-17로 질소 10g/m²를 100m²에 — 비료 4761.9g, P₂O₅와 K₂O가 각각 809.5g
  const f = facts('npk-21-17-17-100m2');
  assert.equal(f.basis, 'n');
  assert.ok(Math.abs(f.main.grams - 4761.9) < 0.1, `${f.main.grams}g`);
  assert.equal(f.main.along.length, 2);
  for (const a of f.main.along) assert.ok(Math.abs(a.grams - 809.5) < 0.1, `${a.key}: ${a.grams}g`);
});

test('P₂O₅ ↔ P, K₂O ↔ K 환산이 왕복한다', () => {
  // 계수는 분자량 비율이다 — 자리를 못으로 박아 둔다
  assert.equal(TO_ELEMENT.n, 1, '질소는 봉지도 원소 표기라 계수가 1이다');
  assert.ok(Math.abs(TO_ELEMENT.p - 61.948 / 141.943) < 0.001, `P 계수 ${TO_ELEMENT.p}`);
  assert.ok(Math.abs(TO_ELEMENT.k - 78.196 / 94.195) < 0.001, `K 계수 ${TO_ELEMENT.k}`);
  for (const key of NUTRIENTS) {
    for (const g of [1, 8.1, 100, 809.5, 20000]) {
      assert.ok(Math.abs(oxideOf(key, elementOf(key, g)) - g) < 1e-9, `${key} ${g}g 산화물→원소→산화물`);
      assert.ok(Math.abs(elementOf(key, oxideOf(key, g)) - g) < 1e-9, `${key} ${g}g 원소→산화물→원소`);
    }
  }
  // 원소는 산화물보다 늘 적다 — 방향이 뒤집히면 여기서 걸린다
  assert.ok(elementOf('p', 100) < 100, 'P가 P₂O₅보다 많다');
  assert.ok(elementOf('k', 100) < 100, 'K가 K₂O보다 많다');
  assert.ok(Math.abs(elementOf('p', 100) - 43.6) < 0.1, 'P₂O₅ 100g은 P 43.6g이다');
  assert.ok(Math.abs(elementOf('k', 100) - 83.0) < 0.1, 'K₂O 100g은 K 83.0g이다');
});

test('면적이 두 배면 비료량도 두 배다 — 선형', () => {
  for (const f of FERTILIZERS) {
    const a = facts(`${f.key}-10m2`).main.grams;
    const b = facts(`${f.key}-20m2`).main.grams;
    assert.ok(Math.abs(b / a - 2) < 0.001, `${f.key}: ${b / a}`);
    // m²당 값은 면적과 무관하다
    for (const area of AREAS) {
      const x = facts(`${f.key}-${area}m2`);
      assert.ok(Math.abs(x.main.perM2 - a / 10) < 0.02, `${f.key} ${area}m²: m²당이 흔들린다`);
    }
  }
  // 목표도 정비례다
  for (const c of CELLS) {
    const x = fertilizerFacts(c);
    const first = x.doses[0];
    for (const d of x.doses) {
      const want = (first.grams * d.target) / first.target;
      assert.ok(Math.abs(d.grams - want) < want * 0.001 + 0.2, `${x.slug} ${d.target}g/m²`);
    }
  }
});

test('함량이 절반이면 비료량은 두 배다 — 반비례', () => {
  // 20-20-20과 10-10-10은 함량이 정확히 두 배 차이다
  const rich = facts('npk-20-20-20-100m2').main.grams;
  const lean = facts('npk-10-10-10-100m2').main.grams;
  assert.ok(Math.abs(lean / rich - 2) < 0.001, `${lean} / ${rich}`);
  // 순수한 식으로도 확인한다
  for (const content of [10, 21, 46, 52, 60]) {
    const whole = fertilizerFor(1000, content);
    const half = fertilizerFor(1000, content / 2);
    assert.ok(Math.abs(half / whole - 2) < 1e-9, `${content}% → ${half / whole}`);
  }
});

test('함량 0인 성분에서 0으로 나누지 않는다', () => {
  // 기준 성분은 늘 함량이 가장 큰 것이라 0이 될 수 없다
  for (const f of FERTILIZERS) {
    const basis = basisOf(f);
    assert.ok(contentOf(f, basis) > 0, `${f.key}: 기준 성분 함량이 0이다`);
  }
  // 함께 들어가는 성분에 함량 0이 섞이면 Infinity가 화면에 앉는다
  for (const c of CELLS) {
    const f = fertilizerFacts(c);
    for (const d of f.doses) {
      assert.ok(Number.isFinite(d.grams) && d.grams > 0, `${f.slug} ${d.target}: ${d.grams}`);
      assert.ok(Number.isFinite(d.perM2), `${f.slug} ${d.target}: perM2`);
      for (const a of d.along) {
        assert.ok(a.content > 0, `${f.slug}: 함량 0인 ${a.key}가 along에 들어왔다`);
        assert.ok(Number.isFinite(a.grams) && Number.isFinite(a.element), `${f.slug} ${a.key}`);
      }
      // 기준 성분은 along에 또 나오지 않는다
      assert.ok(!d.along.some(a => a.key === f.basis), `${f.slug}: 기준 성분이 along에 겹쳤다`);
      assert.equal(d.along.length, nutrientsOf(f.fert).length - 1, `${f.slug}: along 수가 안 맞는다`);
    }
  }
  // 함량 0을 직접 넘기면 조용히 답하지 않는다
  assert.throws(() => fertilizerFor(1000, 0), /함량이 0/);
  assert.throws(() => fertilizerFor(1000, -5), /함량이 0/);
});

test('기준 성분은 함량이 가장 큰 것이고, 같으면 N이 먼저다', () => {
  for (const f of FERTILIZERS) {
    const basis = basisOf(f);
    for (const k of NUTRIENTS) {
      assert.ok(contentOf(f, basis) >= contentOf(f, k), `${f.key}: ${basis}보다 ${k}가 크다`);
    }
  }
  assert.equal(basisOf(fertilizerOf('urea')!), 'n');
  assert.equal(basisOf(fertilizerOf('tsp')!), 'p');
  assert.equal(basisOf(fertilizerOf('potassium-chloride')!), 'k');
  assert.equal(basisOf(fertilizerOf('mkp')!), 'p', 'MKP는 P₂O₅ 52%가 K₂O 34%보다 크다');
  assert.equal(basisOf(fertilizerOf('npk-20-20-20')!), 'n', '같으면 질소가 먼저다');
  assert.equal(basisOf(fertilizerOf('npk-17-21-17')!), 'p', '21%인 인산이 기준이다');
});

test('이웃은 원형으로 감기고, 모든 칸이 들어오는 링크를 넷 받는다', () => {
  /*
   * 앞에서 뒤로만 가리키면 목록 끝에 붙인 칸은 들어오는 링크가 0이 된다.
   * 원형이면 나가는 링크 넷과 들어오는 링크 넷이 정확히 맞아떨어진다.
   */
  const incoming = new Map(CELLS.map(c => [slugOf(c), 0]));
  for (const c of CELLS) {
    const near = neighboursOf(c);
    assert.equal(near.length, 4, slugOf(c));
    assert.equal(new Set(near.map(n => n.slug)).size, 4, `${slugOf(c)}: 이웃이 겹친다`);
    assert.ok(!near.some(n => n.slug === slugOf(c)), `${slugOf(c)}: 자기 자신을 이웃으로 걸었다`);
    for (const n of near) {
      assert.ok(incoming.has(n.slug), `${slugOf(c)} → ${n.slug}: 목록에 없는 칸을 가리킨다`);
      incoming.set(n.slug, incoming.get(n.slug)! + 1);
    }
  }
  for (const [slug, n] of incoming) assert.equal(n, 4, `${slug}: 들어오는 링크가 ${n}개다`);
});

test('축에 없는 값을 넣으면 조용히 답하지 않는다', () => {
  assert.throws(() => fertilizerFacts({ fertilizer: 'compost', area: 100 }), /모르는 비료/);
  assert.throws(() => fertilizerFacts({ fertilizer: 'urea', area: 77 }), /모르는 면적/);
  assert.throws(() => neighboursOf({ fertilizer: 'urea', area: 77 }), /목록에 없는 칸/);
});

test('기준 목표가 TARGETS 안에 있고 main이 그 값을 가리킨다', () => {
  assert.ok(TARGETS.includes(BASE_TARGET), `기준 목표 ${BASE_TARGET}이 TARGETS에 없다`);
  for (const c of CELLS) {
    const f = fertilizerFacts(c);
    assert.equal(f.main.target, BASE_TARGET, f.slug);
    assert.equal(f.doses.length, TARGETS.length, f.slug);
    assert.equal(f.main.need, c.area * BASE_TARGET, `${f.slug}: 필요 성분량이 면적 × 목표가 아니다`);
  }
});

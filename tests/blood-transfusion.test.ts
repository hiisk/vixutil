/**
 * 수혈 적합표 — 항원·항체 계산이 공표된 표와 맞는지 본다.
 *
 * lib/blood 는 항원과 항체만으로 답을 만든다. 여기서는 그 길을 쓰지 않고,
 * 적십자가 공표한 "이 혈액형은 누구에게서 적혈구를 받을 수 있는가" 목록을
 * 그대로 적어 두고 64칸을 하나씩 맞춰 본다. 혈장·전혈은 그 표에서 규칙으로
 * 끌어낸다 — 구현이 아니라 표에서.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { COMPONENTS, TYPES, cellOf, labelOf, slugOf, typeOf, BLOOD_SLUGS, type BloodType } from '../lib/blood/list.ts';
import { antibodiesOf, antigensOf, bloodFacts, okFor, poolOf, reachOf } from '../lib/blood/facts.ts';

/**
 * 적십자·혈액원이 공표하는 적혈구 표.
 * 열쇠가 받는 사람, 값이 그 사람이 받을 수 있는 주는 사람 목록이다.
 * 이 목록은 계산이 아니라 옮겨 적은 자료다 — 그래야 대조가 된다.
 */
const RBC_RECEIVE: Record<string, string[]> = {
  'o-neg': ['o-neg'],
  'o-pos': ['o-neg', 'o-pos'],
  'a-neg': ['o-neg', 'a-neg'],
  'a-pos': ['o-neg', 'o-pos', 'a-neg', 'a-pos'],
  'b-neg': ['o-neg', 'b-neg'],
  'b-pos': ['o-neg', 'o-pos', 'b-neg', 'b-pos'],
  'ab-neg': ['o-neg', 'a-neg', 'b-neg', 'ab-neg'],
  'ab-pos': ['o-neg', 'o-pos', 'a-neg', 'a-pos', 'b-neg', 'b-pos', 'ab-neg', 'ab-pos'],
};

const T = (key: string): BloodType => {
  const t = typeOf(key);
  assert.ok(t, `혈액형이 없다: ${key}`);
  return t;
};

const PAIRS = TYPES.flatMap(d => TYPES.map(r => [d, r] as const));

test('혈액형 여덟 개가 ABO 넷과 Rh 둘의 곱으로 나온다', () => {
  assert.equal(TYPES.length, 8);
  assert.equal(new Set(TYPES.map(t => t.key)).size, 8);
  // 표기의 마이너스는 U+2212라서 기본 정렬이 사전 순으로 오지 않는다 — 양쪽 다 같은 방법으로 세운다
  assert.deepEqual(
    TYPES.map(labelOf).sort(),
    ['A+', 'A−', 'AB+', 'AB−', 'B+', 'B−', 'O+', 'O−'].sort(),
  );
  // 표에 적힌 열쇠와 코드가 만든 열쇠가 같은 여덟이어야 대조가 성립한다
  assert.deepEqual(Object.keys(RBC_RECEIVE).sort(), TYPES.map(t => t.key).sort());
});

test('칸이 192개이고 슬러그가 겹치지 않는다', () => {
  assert.equal(BLOOD_SLUGS.length, 3 * 8 * 8);
  assert.equal(new Set(BLOOD_SLUGS).size, BLOOD_SLUGS.length);
  for (const slug of BLOOD_SLUGS) {
    const c = cellOf(slug);
    assert.ok(c, `되돌아오지 않는다: ${slug}`);
    assert.equal(slugOf(c), slug);
  }
});

test('적혈구 64칸이 공표된 표와 하나도 어긋나지 않는다', () => {
  for (const [d, r] of PAIRS) {
    const want = RBC_RECEIVE[r.key].includes(d.key);
    assert.equal(
      okFor('rbc', d, r),
      want,
      `적혈구 ${labelOf(d)} → ${labelOf(r)} 는 ${want ? '되어야' : '안 되어야'} 한다`,
    );
  }
});

test('혈장은 적혈구 표를 ABO만 남기고 뒤집은 것이다', () => {
  // 표에서 Rh를 지운다 — 받는 사람의 ABO가 어느 ABO에게서 적혈구를 받는가
  const rbcAbo = (d: BloodType, r: BloodType) =>
    RBC_RECEIVE[`${r.abo.toLowerCase()}-neg`].includes(`${d.abo.toLowerCase()}-neg`);

  for (const [d, r] of PAIRS) {
    assert.equal(
      okFor('plasma', d, r),
      rbcAbo(r, d),
      `혈장 ${labelOf(d)} → ${labelOf(r)} 는 적혈구 ${labelOf(r)} → ${labelOf(d)} 와 같아야 한다`,
    );
  }
});

test('혈장은 Rh를 따지지 않는다', () => {
  for (const [d, r] of PAIRS) {
    const flipD = T(`${d.abo.toLowerCase()}-${d.rh ? 'neg' : 'pos'}`);
    const flipR = T(`${r.abo.toLowerCase()}-${r.rh ? 'neg' : 'pos'}`);
    assert.equal(okFor('plasma', d, r), okFor('plasma', flipD, r));
    assert.equal(okFor('plasma', d, r), okFor('plasma', d, flipR));
  }
});

test('전혈은 따로 적지 않았는데 ABO 동형만 남는다', () => {
  for (const [d, r] of PAIRS) {
    const want = d.abo === r.abo && (!d.rh || r.rh);
    assert.equal(okFor('whole', d, r), want, `전혈 ${labelOf(d)} → ${labelOf(r)}`);
  }
});

test('되는 칸이 성분마다 27·36·12개다', () => {
  const count = (c: (typeof COMPONENTS)[number]) => PAIRS.filter(([d, r]) => okFor(c, d, r)).length;
  assert.equal(count('rbc'), 27);
  assert.equal(count('plasma'), 36);
  assert.equal(count('whole'), 12);
  assert.equal(count('rbc') + count('plasma') + count('whole'), 75);
  // 공표된 표 쪽에서 센 27과 맞물려야 한다
  assert.equal(Object.values(RBC_RECEIVE).reduce((n, list) => n + list.length, 0), 27);
});

test('만능 공혈자와 만능 수혈자가 성분에 따라 뒤바뀐다', () => {
  const donors = (c: (typeof COMPONENTS)[number]) => TYPES.filter(t => reachOf(c, t) === 8).map(labelOf).sort();
  const recips = (c: (typeof COMPONENTS)[number]) => TYPES.filter(t => poolOf(c, t) === 8).map(labelOf).sort();

  assert.deepEqual(donors('rbc'), ['O−']);
  assert.deepEqual(recips('rbc'), ['AB+']);
  // 혈장은 Rh를 안 따지므로 AB형 둘 다 만능 공혈자, O형 둘 다 만능 수혈자다
  assert.deepEqual(donors('plasma'), ['AB+', 'AB−']);
  assert.deepEqual(recips('plasma'), ['O+', 'O−']);
  assert.deepEqual(donors('whole'), []);
  assert.deepEqual(recips('whole'), []);
});

test('적혈구와 혈장의 답이 갈리는 짝이 실제로 있다', () => {
  const split = PAIRS.filter(([d, r]) => okFor('rbc', d, r) !== okFor('plasma', d, r));
  assert.equal(split.length, 39);
  // 27 + 36 − 2×12 — 둘 다 되는 칸이 곧 전혈이 되는 칸이라서 이렇게 맞물린다
  const n = (c: (typeof COMPONENTS)[number]) => PAIRS.filter(([d, r]) => okFor(c, d, r)).length;
  assert.equal(split.length, n('rbc') + n('plasma') - 2 * n('whole'));

  // 대표 두 짝 — 방향이 정확히 반대다
  const oNeg = T('o-neg');
  const abPos = T('ab-pos');
  assert.equal(okFor('rbc', oNeg, abPos), true);
  assert.equal(okFor('plasma', oNeg, abPos), false);
  assert.equal(okFor('rbc', abPos, oNeg), false);
  assert.equal(okFor('plasma', abPos, oNeg), true);
});

test('항체는 자기가 갖지 않은 ABO 항원을 친다', () => {
  for (const t of TYPES) {
    const ag = antigensOf(t);
    const ab = antibodiesOf(t);
    assert.equal(ab.A, !ag.A, labelOf(t));
    assert.equal(ab.B, !ag.B, labelOf(t));
    assert.equal(ag.D, t.rh, labelOf(t));
  }
  // AB형은 항체가 없고 O형은 둘 다 갖는다 — 뒤집힘의 뿌리가 여기다
  assert.deepEqual(antibodiesOf(T('ab-pos')), { A: false, B: false });
  assert.deepEqual(antibodiesOf(T('o-neg')), { A: true, B: true });
});

test('막히는 칸에는 까닭이 붙고 되는 칸에는 붙지 않는다', () => {
  for (const slug of BLOOD_SLUGS) {
    const f = bloodFacts(cellOf(slug)!);
    assert.equal(f.ok, f.reasons.length === 0, slug);
  }
  const rh = bloodFacts(cellOf('rbc-o-pos-to-o-neg')!);
  assert.deepEqual(rh.reasons, ['rh-sensitise']);
  const both = bloodFacts(cellOf('rbc-ab-pos-to-o-neg')!);
  assert.deepEqual(both.reasons, ['recip-anti-a', 'recip-anti-b', 'rh-sensitise']);
  const plasma = bloodFacts(cellOf('plasma-o-neg-to-ab-pos')!);
  assert.deepEqual(plasma.reasons, ['donor-anti-a', 'donor-anti-b']);
});

test('표가 대칭이 아니다 — 방향을 바꾸면 답이 달라지는 칸이 86개다', () => {
  const facts = BLOOD_SLUGS.map(s => bloodFacts(cellOf(s)!));
  assert.equal(facts.filter(f => f.ok !== f.reverseOk).length, 86);

  // 양쪽이 다 되는 칸은 ABO 항원이 똑같을 때뿐이다.
  // Rh까지 같아야 하는 것은 혈장이 아닌 성분에서만이다 — 혈장은 Rh를 안 따진다.
  for (const f of facts) {
    if (!(f.ok && f.reverseOk)) continue;
    assert.equal(f.donorAntigens.A, f.recipientAntigens.A, f.slug);
    assert.equal(f.donorAntigens.B, f.recipientAntigens.B, f.slug);
    if (f.cell.component !== 'plasma') {
      assert.equal(f.donorAntigens.D, f.recipientAntigens.D, f.slug);
    }
  }
});

test('되돌아가는 칸과 다른 성분 칸이 실제로 있는 슬러그다', () => {
  for (const slug of BLOOD_SLUGS) {
    const f = bloodFacts(cellOf(slug)!);
    assert.ok(cellOf(f.reverseSlug), `${slug} 의 반대 칸이 없다`);
    assert.equal(f.others.length, 2);
    for (const o of f.others) {
      assert.ok(cellOf(o.slug), `${slug} 의 ${o.component} 칸이 없다`);
      assert.equal(o.ok, okFor(o.component, f.donor, f.recipient));
    }
  }
});

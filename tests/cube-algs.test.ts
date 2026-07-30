/**
 * 큐브 공식이 정말로 그 경우를 푸는지 본다.
 *
 * 이 자료는 검사하기 어려워 보이지만 사실 가장 검사하기 쉽다 — 큐브를 돌려
 * 보면 되기 때문이다. 공식을 한 수라도 잘못 적으면 아래 두 층이 깨지거나
 * 다른 공식과 같은 경우가 되고, 둘 다 여기서 걸린다.
 *
 * 먼저 돌리는 장치부터 검사한다. 장치가 틀리면 나머지 검사가 모두 무의미해지므로,
 * 큐브를 만져 본 사람이면 아는 사실 몇 가지를 못으로 박아 둔다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';

import { apply, f2lIntact, isSolved, reverseAlg, solved, tokens } from '../lib/cube/sim.ts';
import { ALGS, ALG_SLUGS, CUBE_ICON, F2L, OLL, PLL, STEPS, algOf, algsOfStep } from '../lib/cube/list.ts';
import { caseFacts, diagram, readLastLayer } from '../lib/cube/facts.ts';
import { CUBE_UI } from '../lib/cube/ui.ts';
import { LANG8_CODES } from '../lib/i18n/lang8.ts';

test('한 수를 네 번 돌리면 제자리로 온다', () => {
  for (const m of ['U', 'D', 'R', 'L', 'F', 'B', 'M', 'E', 'S', 'r', 'l', 'u', 'd', 'f', 'b', 'x', 'y', 'z']) {
    assert.ok(isSolved(apply(solved(), [m, m, m, m].join(' '))), `${m}를 네 번 돌렸는데 제자리가 아니다`);
  }
});

test('큐브를 만져 본 사람이면 아는 사실들', () => {
  const s = solved();
  // 섹시무브는 여섯 번이면 제자리로 돌아온다
  assert.ok(isSolved(apply(s, Array(6).fill("R U R' U'").join(' '))), '섹시무브 여섯 번이 제자리가 아니다');
  // 수네도 여섯 번이면 제자리다
  assert.ok(isSolved(apply(s, Array(6).fill("R U R' U R U2 R'").join(' '))), '수네 여섯 번이 제자리가 아니다');
  // T퍼뮤테이션은 두 번 걸면 원래대로다
  const t = "R U R' U' R' F R2 U' R' U' R U R' F'";
  assert.ok(isSolved(apply(s, `${t} ${t}`)), 'T퍼뮤 두 번이 제자리가 아니다');
  // Ua퍼뮤는 세 조각을 돌리므로 세 번이면 제자리다
  assert.ok(isSolved(apply(s, Array(3).fill('M2 U M U2 M\' U M2').join(' '))), 'Ua퍼뮤 세 번이 제자리가 아니다');
  // 역순은 되돌린다
  const alg = "r U R' U' r' F R F'";
  assert.ok(isSolved(apply(apply(s, alg), reverseAlg(alg))), '역순이 되돌리지 못한다');
});

test('100가지가 넘는다', () => {
  assert.ok(ALGS.length >= 100, `${ALGS.length}가지뿐이다`);
  assert.equal(ALGS.length, F2L.length + OLL.length + PLL.length);
});

test('단계마다 알려진 개수와 맞는다', () => {
  // 셋 다 수학적으로 정해진 수다 — 하나라도 다르면 빠뜨렸거나 겹쳤다
  assert.equal(algsOfStep('f2l').length, 41, 'F2L은 41가지다');
  assert.equal(algsOfStep('oll').length, 57, 'OLL은 57가지다');
  assert.equal(algsOfStep('pll').length, 21, 'PLL은 21가지다');
});

test('열쇠가 겹치지 않고 주소로 쓸 수 있다', () => {
  assert.equal(new Set(ALG_SLUGS).size, ALGS.length, 'slug 중복');
  for (const a of ALGS) {
    assert.match(a.slug, /^[a-z0-9-]+$/, `주소에 못 쓰는 slug: ${a.slug}`);
    assert.ok(a.label.trim().length > 0, `${a.slug}: 이름이 없다`);
    assert.ok(a.alg.trim().length > 0, `${a.slug}: 공식이 없다`);
  }
});

test('공식이 읽을 수 있는 수로만 되어 있다', () => {
  for (const a of ALGS) {
    for (const t of tokens(a.alg)) {
      assert.match(t, /^[URFDLBMESxyzrlufdb]w?(2|'|)$/, `${a.slug}: 읽을 수 없는 수 ${t}`);
    }
  }
});

test('119개 모두 제 경우를 실제로 푼다', () => {
  // 다 맞춘 큐브에 역순을 걸면 그 공식이 풀어야 할 모양이 나온다.
  // 그 모양에 공식을 걸었을 때 제자리로 돌아와야 성립한다.
  for (const a of ALGS) {
    const f = caseFacts(a);
    assert.ok(f.sound, `${a.slug}: 성립하지 않는 공식이다 — ${a.alg}`);
    assert.ok(f.moves > 0, `${a.slug}: 수가 없다`);
  }
});

test('OLL과 PLL은 아래 두 층을 건드리지 않는다', () => {
  for (const a of [...OLL, ...PLL]) {
    const f = caseFacts(a);
    assert.ok(f2lIntact(f.state), `${a.slug}: 아래 두 층이 깨진다`);
  }
});

test('PLL은 색이 다 맞은 자리에서만 쓴다', () => {
  for (const a of PLL) {
    const ll = readLastLayer(caseFacts(a).state);
    assert.ok(ll.co.every(v => v === 0), `${a.slug}: 모서리 방향이 틀어져 있다`);
    assert.ok(ll.eo.every(v => v === 0), `${a.slug}: 변 방향이 틀어져 있다`);
  }
});

test('OLL은 반드시 무언가 방향이 틀어져 있다', () => {
  for (const a of OLL) {
    const ll = readLastLayer(caseFacts(a).state);
    const oriented = ll.co.every(v => v === 0) && ll.eo.every(v => v === 0);
    assert.ok(!oriented, `${a.slug}: 이미 다 맞은 모양이다`);
    // 방향 수의 합은 3의 배수, 뒤집힌 변의 수는 짝수여야 한다 — 큐브가 성립하는 조건
    assert.equal(ll.co.reduce((n, v) => n + v, 0) % 3, 0, `${a.slug}: 모서리 방향 합이 맞지 않는다`);
    assert.equal(ll.eo.filter(v => v !== 0).length % 2, 0, `${a.slug}: 뒤집힌 변이 홀수다`);
  }
});

test('같은 단계 안에서 경우가 겹치지 않는다', () => {
  for (const step of STEPS) {
    const seen = new Map<string, string>();
    for (const a of algsOfStep(step)) {
      const f = caseFacts(a);
      const before = seen.get(f.key);
      assert.equal(before, undefined, `${a.slug}와 ${before}가 같은 경우다`);
      seen.set(f.key, a.slug);
    }
    assert.equal(seen.size, algsOfStep(step).length, `${step}: 경우 수가 공식 수와 다르다`);
  }
});

test('역순을 걸면 다시 그 경우가 만들어진다', () => {
  for (const a of ALGS) {
    const f = caseFacts(a);
    const back = apply(f.state, a.alg);
    // 마지막 층의 자리는 윗면을 돌린 만큼 달라질 수 있으므로 아래 두 층만 본다
    if (a.step !== 'f2l') assert.ok(f2lIntact(back), `${a.slug}: 공식을 걸었는데 아래 두 층이 깨진다`);
  }
});

test('그림은 경우와 같은 수의 칸을 칠한다', () => {
  for (const a of ALGS) {
    const f = caseFacts(a);
    const d = diagram(f);
    assert.equal(d.length, 54, `${a.slug}: 그림 칸 수가 다르다`);
    if (a.step === 'oll') {
      // OLL 그림은 윗면 색 아니면 회색뿐이다
      assert.ok(d.every(v => v === 0 || v === 6), `${a.slug}: OLL 그림에 다른 색이 있다`);
    }
    if (a.step === 'pll') {
      // PLL 그림은 윗면이 모두 한 색이다
      assert.ok([0, 1, 2, 3, 4, 5, 6, 7, 8].every(i => d[i] === d[4]), `${a.slug}: PLL인데 윗면이 한 색이 아니다`);
    }
  }
});

test('OLL 그림에서 노란 칸 수가 방향과 맞는다', () => {
  for (const a of OLL) {
    const f = caseFacts(a);
    const d = diagram(f);
    // 윗면 여덟 칸 중 노란 칸 = 방향이 맞은 조각 수
    const lit = [0, 1, 2, 3, 5, 6, 7, 8].filter(i => d[i] === 0).length;
    const ll = readLastLayer(f.state);
    const oriented = ll.co.filter(v => v === 0).length + ll.eo.filter(v => v === 0).length;
    assert.equal(lit, oriented, `${a.slug}: 그림의 노란 칸이 방향과 어긋난다`);
  }
});

test('갈래가 빈 곳 없이 덮는다', () => {
  const shapes = new Set(OLL.map(a => caseFacts(a).shape));
  for (const s of ['dot', 'corner', 'line', 'cross']) assert.ok(shapes.has(s as never), `OLL에 ${s} 모양이 없다`);
  const moving = new Set(PLL.map(a => caseFacts(a).moving));
  for (const m of ['corners', 'edges', 'both']) assert.ok(moving.has(m as never), `PLL에 ${m}가 없다`);
  const places = new Set(F2L.map(a => caseFacts(a).place));
  for (const p of ['both-up', 'corner-in', 'edge-in', 'both-in']) assert.ok(places.has(p as never), `F2L에 ${p}가 없다`);
});

test('여덟 언어 문구가 모두 채워져 있다', () => {
  const f = caseFacts(algOf('oll-27')!);
  for (const lang of LANG8_CODES) {
    const ui = CUBE_UI[lang];
    for (const [key, val] of Object.entries(ui)) {
      assert.ok(val != null, `${lang}.${key}가 비었다`);
      if (typeof val === 'string') assert.ok(val.trim().length > 0, `${lang}.${key}가 빈 문자열이다`);
    }
    assert.equal(ui.how.length, 4, `${lang}: 보는 방법 수가 다르다`);
    assert.equal(ui.hubFaq.length, 5, `${lang}: 허브 FAQ 수가 다르다`);
    assert.equal(ui.caseFaq(f).length, 4, `${lang}: 상세 FAQ 수가 다르다`);
    assert.ok(ui.notation.length >= 8, `${lang}: 표기 설명이 모자라다`);
    for (const s of STEPS) {
      assert.ok(ui.stepLabel[s], `${lang}: ${s} 이름이 없다`);
      assert.ok(ui.stepNote[s]?.length >= 10, `${lang}: ${s} 설명이 없다`);
    }
  }
});

test('설명이 모든 항목에서 만들어진다', () => {
  for (const a of ALGS) {
    const f = caseFacts(a);
    for (const lang of LANG8_CODES) {
      const d = CUBE_UI[lang].desc(f);
      const floor = lang === 'ja' || lang === 'ko' ? 12 : 20;
      assert.ok(d.length > floor, `${lang}/${a.slug}: 설명이 너무 짧다 — ${d}`);
      assert.ok(d.includes(String(f.moves)), `${lang}/${a.slug}: 설명에 수가 없다`);
    }
  }
});

test('언어끼리 글자가 섞이지 않는다', () => {
  // 공식 표기와 단계 이름(F2L·OLL·PLL)은 어느 언어에서나 로마자 그대로 쓴다
  const f = caseFacts(algOf('pll-t')!);
  for (const lang of LANG8_CODES) {
    const ui = CUBE_UI[lang];
    const texts = [
      ui.hubTitle, ui.hubLead, ui.hubMetaTitle, ui.hubMetaDesc, ui.section, ui.notationNote,
      ...ui.how,
      ...Object.values(ui.stepNote),
      ...ui.notation.map(n => n.text),
      ...ui.hubFaq.flatMap(q => [q.q, q.a]),
      ...ui.caseFaq(f).flatMap(q => [q.q, q.a]),
      ui.desc(f),
    ];
    for (const t of texts) {
      if (lang !== 'ko') assert.ok(!/[가-힣]/.test(t), `${lang}: 한글이 섞였다 — ${t}`);
      if (lang !== 'ja' && lang !== 'ko') assert.ok(!/[ぁ-んァ-ヶ]/.test(t), `${lang}: 가나가 섞였다 — ${t}`);
      if (lang !== 'hi') assert.ok(!/[ऀ-ॿ]/.test(t), `${lang}: 데바나가리가 섞였다 — ${t}`);
      assert.ok(!/[а-яА-Я]/.test(t), `${lang}: 키릴 문자가 섞였다 — ${t}`);
    }
  }
});

test('모든 공식이 여덟 언어 메타를 만든다', () => {
  for (const a of ALGS) {
    const f = caseFacts(a);
    for (const lang of LANG8_CODES) {
      const ui = CUBE_UI[lang];
      assert.ok(ui.metaTitle(a.label).includes(a.label), `${lang}/${a.slug}: 제목에 이름이 없다`);
      const desc = ui.metaDesc(f);
      assert.ok(desc.includes(a.alg), `${lang}/${a.slug}: 설명에 공식이 없다`);
      const floor = lang === 'ja' || lang === 'ko' ? 25 : 40;
      assert.ok(desc.length > floor, `${lang}/${a.slug}: 설명이 너무 짧다`);
    }
  }
});

test('큐브 아이콘은 목록과 카드가 같은 그림을 쓴다', async () => {
  const { ICON_FOR } = await import('../lib/og-icon-map.ts');
  assert.equal(ICON_FOR[CUBE_ICON], 'puzzle', '이모지가 퍼즐 아이콘으로 이어지지 않는다');
});

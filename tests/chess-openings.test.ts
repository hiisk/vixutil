/**
 * 체스 오프닝 자료가 규칙과 어긋나지 않는지 본다.
 *
 * 이 섹션은 수순만 적고 나머지를 계산한다. 그래서 검사가 실제로 실패할 수 있다 —
 * 수순 한 글자가 틀리면 그 수를 둘 수 없어 예외가 나고, 표기가 모호하면(Nd7처럼
 * 두 나이트가 갈 수 있는 자리) 어느 기물인지 정해지지 않아 또 예외가 난다.
 *
 * 규칙 자체가 맞는지는 perft로 붙든다. 잘 알려진 자리에서 나오는 수의 개수는
 * 공개된 값이 있어서, 규칙 어느 한 곳(앙파상·캐슬링·핀)이 어긋나면 숫자가 달라진다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';

import {
  apply, fenOf, inCheck, isMate, legalMoves, numbered, parseFen, play,
  sanOf, startPosition, type Position,
} from '../lib/chess/engine.ts';
import { FAMILY_TRAITS, OPENINGS, openingOf } from '../lib/chess/list.ts';
import { FAMILIES, LINES, familyName, fullName, lineName } from '../lib/chess/names.ts';
import { groupCounts, groupOf, openingFacts } from '../lib/chess/facts.ts';
import { CHESS_UI, fill } from '../lib/chess/ui.ts';
import { LANG10_CODES, LANGS10, alternates10 } from '../lib/i18n/lang10.ts';

const perft = (p: Position, depth: number): number =>
  depth === 0 ? 1 : legalMoves(p).reduce((n, m) => n + perft(apply(p, m), depth - 1), 0);

test('규칙이 맞다 — 시작 자리의 perft', () => {
  // 공개된 값이다. 하나라도 어긋나면 수를 만드는 곳이 틀린 것이다.
  assert.equal(perft(startPosition(), 1), 20);
  assert.equal(perft(startPosition(), 2), 400);
  assert.equal(perft(startPosition(), 3), 8902);
  assert.equal(perft(startPosition(), 4), 197281);
});

test('규칙이 맞다 — 캐슬링·앙파상·핀이 섞인 자리의 perft', () => {
  // Kiwipete라 불리는 검사용 자리. 캐슬링 양쪽, 앙파상, 핀이 한꺼번에 걸려 있다.
  const p = parseFen('r3k2r/p1ppqpb1/bn2pnp1/3PN3/1p2P3/2N2Q1p/PPPBBPPP/R3K2R w KQkq - 0 1');
  assert.equal(perft(p, 1), 48);
  assert.equal(perft(p, 2), 2039);
  assert.equal(perft(p, 3), 97862);
});

test('오프닝이 100가지를 넘는다', () => {
  assert.ok(OPENINGS.length >= 100, `${OPENINGS.length}가지뿐이다`);
});

test('slug이 겹치지 않고 주소로 쓸 수 있다', () => {
  const seen = new Set<string>();
  for (const x of OPENINGS) {
    assert.match(x.slug, /^[a-z0-9-]+$/, `주소에 못 쓰는 slug: ${x.slug}`);
    assert.ok(!seen.has(x.slug), `slug 중복: ${x.slug}`);
    seen.add(x.slug);
    assert.equal(openingOf(x.slug)?.slug, x.slug);
  }
});

test('모든 수순을 실제로 둘 수 있다', () => {
  for (const x of OPENINGS) {
    assert.doesNotThrow(() => play(x.moves), `${x.slug}의 수순을 둘 수 없다`);
  }
});

test('저장한 표기에는 장군 표시가 없고, 정식 표기와 같다', () => {
  for (const x of OPENINGS) {
    const f = openingFacts(x);
    x.moves.forEach((move, i) => {
      assert.ok(!/[+#]/.test(move), `${x.slug}: 자료에 장군 표시가 들어 있다 (${move})`);
      assert.equal(f.san[i].replace(/[+#]$/, ''), move, `${x.slug}: ${i + 1}번째 표기가 정식 표기와 다르다`);
    });
  }
});

test('메이트로 끝나는 수순은 정말 메이트다', () => {
  const mates = ['fools-mate', 'scholars-mate', 'legal-trap'];
  for (const slug of mates) {
    const x = openingOf(slug)!;
    assert.ok(openingFacts(x).mate, `${slug}가 메이트가 아니다`);
    assert.match(openingFacts(x).san.at(-1)!, /#$/, `${slug}의 마지막 표기에 #가 없다`);
  }
  // 나머지는 메이트가 아니어야 한다 — 오프닝이 끝난 게임일 리 없다
  for (const x of OPENINGS) {
    if (mates.includes(x.slug)) continue;
    assert.ok(!openingFacts(x).mate, `${x.slug}가 메이트로 끝난다`);
  }
});

test('두 오프닝이 같은 자리에 이르지 않는다', () => {
  const seen = new Map<string, string>();
  for (const x of OPENINGS) {
    // 반수·50수 규칙은 빼고 자리만 본다
    const key = openingFacts(x).fen.split(' ').slice(0, 4).join(' ');
    const before = seen.get(key);
    assert.equal(before, undefined, `${x.slug}와 ${before}가 같은 자리다`);
    seen.set(key, x.slug);
  }
});

test('수순과 자리가 서로 맞는다', () => {
  for (const x of OPENINGS) {
    const f = openingFacts(x);
    assert.equal(f.ply, x.moves.length);
    // 둘 차례는 반수의 홀짝이 정한다
    assert.equal(f.turn, x.moves.length % 2 === 0 ? 'w' : 'b', `${x.slug}: 차례가 어긋난다`);
    // 판에 남은 기물 수와 잡힌 수를 더하면 서른둘이다
    assert.equal([...f.board].filter(c => c !== '.').length + f.captures, 32, `${x.slug}: 기물 수가 맞지 않는다`);
    // 자리 하나마다 판이 하나씩 있다
    assert.equal(f.frames.length, x.moves.length + 1, `${x.slug}: 판 수가 수순과 맞지 않는다`);
    for (const frame of f.frames) assert.equal(frame.length, 64, `${x.slug}: 판이 64칸이 아니다`);
    // 킹은 언제나 양쪽에 하나씩 있다
    assert.equal([...f.board].filter(c => c === 'K').length, 1, `${x.slug}: 백 킹이 하나가 아니다`);
    assert.equal([...f.board].filter(c => c === 'k').length, 1, `${x.slug}: 흑 킹이 하나가 아니다`);
    assert.ok(f.replies > 0 || f.mate, `${x.slug}: 둘 수 있는 수가 없는데 메이트도 아니다`);
  }
});

test('수 풀이가 표기와 어긋나지 않는다', () => {
  for (const x of OPENINGS) {
    const f = openingFacts(x);
    assert.equal(f.steps.length, x.moves.length, `${x.slug}: 풀이 수가 다르다`);
    f.steps.forEach((step, i) => {
      assert.equal(step.san, f.san[i]);
      assert.equal(step.side, i % 2 === 0 ? 'w' : 'b');
      assert.equal(step.no, Math.floor(i / 2) + 1);
      assert.match(step.from, /^[a-h][1-8]$/, `${x.slug}: 출발 칸이 이상하다 (${step.from})`);
      assert.match(step.to, /^[a-h][1-8]$/, `${x.slug}: 도착 칸이 이상하다 (${step.to})`);
      assert.notEqual(step.from, step.to, `${x.slug}: 제자리에 두었다`);
      assert.ok('PNBRQK'.includes(step.piece), `${x.slug}: 기물이 이상하다 (${step.piece})`);
      // 표기와 맞는지 — 캐슬링이 아니면 도착 칸이 표기에 들어 있다
      if (step.castle) assert.match(step.san, /^O-O/, `${x.slug}: 캐슬링인데 표기가 다르다`);
      else assert.ok(step.san.includes(step.to), `${x.slug}: ${step.san}에 ${step.to}가 없다`);
      assert.equal(step.capture, step.san.includes('x'), `${x.slug}: 잡기 표시가 어긋난다 (${step.san})`);
      assert.equal(step.check, /[+#]$/.test(step.san), `${x.slug}: 장군 표시가 어긋난다 (${step.san})`);
      // 폰이 아닌 기물은 표기 첫 글자가 그 기물이다
      if (!step.castle && step.piece !== 'P') assert.equal(step.san[0], step.piece, `${x.slug}: ${step.san}의 기물이 다르다`);
    });
  }
});

test('갈래는 첫 두 수가 정한다', () => {
  for (const x of OPENINGS) {
    const [a, b] = x.moves;
    const want =
      a === 'e4' ? (b === 'e5' || b === undefined ? 'open' : 'semiopen')
        : a === 'd4' ? (b === 'd5' || b === undefined ? 'closed' : b === 'Nf6' ? 'indian' : 'flank')
          : 'flank';
    assert.equal(groupOf(x.moves), want, `${x.slug}: 갈래가 어긋난다`);
  }
  const counts = groupCounts();
  assert.equal(Object.values(counts).reduce((a, b) => a + b, 0), OPENINGS.length);
});

test('계열·갈래·성격 열쇠가 모두 있다', () => {
  for (const x of OPENINGS) {
    assert.ok(FAMILIES[x.family], `${x.slug}: 없는 계열 ${x.family}`);
    assert.ok(FAMILY_TRAITS[x.family], `${x.family}: 성격이 없다`);
    if (x.line) assert.ok(LINES[x.line], `${x.slug}: 없는 갈래 ${x.line}`);
  }
});

test('이름이 열 언어에서 모두 채워지고 겹치지 않는다', () => {
  for (const lang of LANG10_CODES) {
    const seen = new Map<string, string>();
    for (const x of OPENINGS) {
      const name = fullName(x.family, x.line, lang);
      assert.ok(name.length > 1, `${lang}: ${x.slug}의 이름이 비었다`);
      assert.ok(!name.includes('undefined'), `${lang}: ${x.slug}의 이름에 빈 칸이 있다 (${name})`);
      const before = seen.get(name);
      assert.equal(before, undefined, `${lang}: "${name}"을 ${x.slug}와 ${before}가 함께 쓴다`);
      seen.set(name, x.slug);
    }
  }
});

test('쓰이지 않는 계열·갈래가 남아 있지 않다', () => {
  const usedFamily = new Set(OPENINGS.map(x => x.family));
  const usedLine = new Set(OPENINGS.map(x => x.line).filter(Boolean));
  for (const id of Object.keys(FAMILIES)) assert.ok(usedFamily.has(id), `쓰이지 않는 계열: ${id}`);
  for (const id of Object.keys(LINES)) assert.ok(usedLine.has(id), `쓰이지 않는 갈래: ${id}`);
  // 이름 만들기가 열 언어에서 다 도는지도 함께 본다
  for (const lang of LANG10_CODES) {
    for (const id of Object.keys(FAMILIES)) assert.ok(familyName(id, lang).length > 0);
    for (const id of Object.keys(LINES)) assert.ok(lineName(id, lang).length > 0);
  }
});

test('형제는 서로를 가리키는 앞수를 정말 함께 쓴다', () => {
  for (const x of OPENINGS) {
    const f = openingFacts(x);
    for (const kin of f.siblings) {
      const y = openingOf(kin)!;
      assert.equal(y.moves[0], x.moves[0], `${x.slug}와 ${kin}은 첫 수가 다르다`);
    }
    if (f.siblings.length) {
      const first = openingOf(f.siblings[0])!;
      const shared = x.moves.filter((m, i) => first.moves[i] === m && x.moves.slice(0, i + 1).every((mm, j) => first.moves[j] === mm)).length;
      assert.equal(shared, f.sharedPly, `${x.slug}: 함께 쓰는 수의 개수가 어긋난다`);
    }
  }
});

test('화면 문구가 열 언어에 모두 있다', () => {
  const keys = Object.keys(CHESS_UI.ko);
  for (const lang of LANG10_CODES) {
    const ui = CHESS_UI[lang] as unknown as Record<string, unknown>;
    assert.deepEqual(Object.keys(ui).sort(), keys.sort(), `${lang}: 열쇠가 다르다`);
    for (const [key, value] of Object.entries(ui)) {
      if (typeof value === 'string') {
        assert.ok(value.trim().length > 0, `${lang}.${key}가 비었다`);
      } else {
        for (const [k2, v2] of Object.entries(value as Record<string, string>)) {
          assert.ok(v2.trim().length > 0, `${lang}.${key}.${k2}가 비었다`);
        }
      }
    }
  }
});

test('문장의 빈자리가 모두 채워진다', () => {
  for (const lang of LANG10_CODES) {
    const ui = CHESS_UI[lang];
    const filled = [
      fill(ui.hubTitle, { n: OPENINGS.length }),
      fill(ui.hubMetaTitle, { n: OPENINGS.length }),
      fill(ui.hubMetaDesc, { n: OPENINGS.length }),
      fill(ui.metaTitle, { name: '…' }),
      fill(ui.metaDesc, { name: '…', line: '1.e4' }),
      fill(ui.ha1, { n: 1, ...groupCounts() }),
      fill(ui.a3, { n: 1, side: ui.white }),
      fill(ui.moves, { n: 2 }),
      fill(ui.movesOne, { n: 1 }),
      fill(ui.centre, { sq: 'e4' }),
      fill(ui.captures, { n: 2 }),
      fill(ui.castling, { side: ui.white }),
      fill(ui.countLabel, { n: 3 }),
      fill(ui.sharedWith, { n: 3 }),
      fill(ui.boardAlt, { name: '…' }),
      fill(ui.q1, { name: '…' }),
    ];
    for (const text of filled) {
      assert.ok(!text.includes('{'), `${lang}: 채워지지 않은 자리가 있다 — ${text}`);
    }
  }
});

test('열 언어 주소가 모두 다르고 hreflang과 짝이 맞는다', () => {
  const alt = alternates10('/game/chess');
  assert.equal(Object.keys(alt).length, LANGS10.length + 1, 'x-default까지 세면 열한 개다');
  const hrefs = new Set(Object.values(alt));
  assert.equal(hrefs.size, LANGS10.length, '같은 주소를 두 언어가 쓴다');
  assert.equal(alt['zh-Hans'], '/zh-hans/game/chess');
  assert.equal(alt['zh-Hant'], '/zh-hant/game/chess');
  assert.equal(alt['x-default'], '/en/game/chess');
});

test('표기를 만드는 쪽과 읽는 쪽이 서로 맞는다', () => {
  // 정식 표기를 다시 읽어 두면 같은 자리가 나와야 한다
  for (const x of OPENINGS) {
    const f = openingFacts(x);
    const again = play(f.san.map(s => s.replace(/[+#]$/, '')));
    assert.equal(fenOf(again.positions.at(-1)!), f.fen, `${x.slug}: 표기를 되읽으면 다른 자리가 된다`);
    assert.equal(numbered(again.san), f.line, `${x.slug}: 번호 붙인 수순이 다르다`);
  }
});

test('같은 곳에 갈 수 있는 기물이 둘이면 표기가 갈린다', () => {
  // 두 룩이 모두 d1에 갈 수 있는 자리 — 표기에 어느 줄에서 왔는지 붙어야 한다.
  // 킹을 e1에 두면 h1 룩이 막혀서 갈래가 생기지 않는다. 그래서 킹을 비켜 둔다.
  const p = parseFen('4k3/8/8/8/8/8/4K3/R6R w - - 0 1');
  const names = legalMoves(p).filter(m => m.piece === 'R').map(m => sanOf(p, m));
  assert.deepEqual(names.filter(n => n.endsWith('d1')).sort(), ['Rad1', 'Rhd1'], `갈라 적지 않았다: ${names.join(' ')}`);
  // 줄이 같고 열이 다르면 열로 가른다
  const q = parseFen('4k3/8/8/8/R7/8/4K3/R7 w - - 0 1');
  const rooks = legalMoves(q).filter(m => m.piece === 'R').map(m => sanOf(q, m));
  assert.ok(rooks.includes('R1a2') && rooks.includes('R4a2'), `줄로 가르지 않았다: ${rooks.join(' ')}`);
  // 갈래가 없으면 군더더기를 붙이지 않는다
  const one = parseFen('4k3/8/8/8/8/8/4K3/R7 w - - 0 1');
  assert.ok(legalMoves(one).filter(m => m.piece === 'R').map(m => sanOf(one, m)).includes('Rd1'));
});

test('앙파상과 승격이 규칙대로 된다', () => {
  const ep = play(['e4', 'a6', 'e5', 'd5', 'exd6']);
  assert.equal(fenOf(ep.positions.at(-1)!).split(' ')[0], 'rnbqkbnr/1pp1pppp/p2P4/8/8/8/PPPP1PPP/RNBQKBNR');
  const promo = play(['a4', 'b5', 'axb5', 'a6', 'bxa6', 'h6', 'a7', 'h5', 'axb8=Q']);
  assert.equal(promo.san.at(-1), 'axb8=Q');
  assert.ok(inCheck(promo.positions.at(-1)!) === false);
  // 없는 수는 예외다 — 자료가 틀렸을 때 조용히 넘어가지 않는다
  assert.throws(() => play(['e4', 'e5', 'Nf6']), /둘 수 없는 수/, '백이 흑 자리의 수를 두었다');
  // 나이트가 아직 g1에 있으니 캐슬링할 수 없다
  assert.throws(() => play(['e4', 'e5', 'Bb5', 'Nc6', 'O-O']), /캐슬링/);
  // 핀된 기물은 움직일 수 없다 — d7 나이트가 킹을 가리고 있다
  assert.throws(() => play(['e4', 'e5', 'Nf3', 'd6', 'Bb5', 'Nd7', 'Nc3', 'Nb6']), /둘 수 없는 수/);
  // 읽을 수 없는 표기도 예외다
  assert.throws(() => play(['e4', 'z9']), /읽을 수 없는 표기/);
});

test('허브가 한 번에 그려도 될 크기다', () => {
  // 목록에 판 그림을 다 실으면 HTML이 몇백 KB로 불어난다. 수순 글자만 싣는지 본다.
  const text = OPENINGS.map(x => `${fullName(x.family, x.line, 'ko')}${x.moves.slice(0, 5).join(' ')}`).join('');
  assert.ok(text.length < 20000, `목록 글자가 너무 많다: ${text.length}`);
});

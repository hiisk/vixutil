import { test } from 'node:test';
import assert from 'node:assert/strict';
import { animalsInSamjae, branchOfYear, samjaeBranches, samjaeFor, SAMJAE_COLORS } from '../lib/samjae.ts';
import { AA_LARGE, CARD_GROUNDS, contrast } from './contrast.ts';
import { ANIMALS } from '../lib/fortune-data.ts';

/**
 * 삼재 규칙.
 *
 * 화면에 「2026년은 눌삼재입니다」라고 떠 있어도 그게 맞는지 사람은 모른다.
 * 세상에 알려진 값 몇 개를 못 박고, 나머지는 규칙끼리 어긋나지 않는지 본다.
 */

const nameOf = (i: number) => ANIMALS[i].name;

test('ANIMALS 차례가 지지 차례와 같다', () => {
  /* 이 전제가 무너지면 아래 검사가 전부 엉뚱한 띠를 재게 된다 */
  assert.equal(ANIMALS.length, 12);
  assert.equal(nameOf(0), '쥐띠');
  assert.equal(nameOf(1), '소띠');
  assert.equal(nameOf(11), '돼지띠');
  /* 2020년은 쥐해다 */
  assert.equal(branchOfYear(2020), 0);
  assert.equal(branchOfYear(2026), 6, '2026은 말해다');
  assert.equal(branchOfYear(2025), 5, '2025는 뱀해다');
});

test('2025~2027 삼재는 돼지·토끼·양띠다', () => {
  /* 세상에 널리 알려진 값 — 해묘미생의 삼재가 사오미년이다 */
  for (const y of [2025, 2026, 2027]) {
    const got = animalsInSamjae(y).map(x => nameOf(x.animalIdx)).sort();
    assert.deepEqual(got, ['돼지띠', '양띠', '토끼띠'], `${y}년`);
  }
  assert.equal(animalsInSamjae(2025)[0].phase, '들삼재');
  assert.equal(animalsInSamjae(2026)[0].phase, '눌삼재');
  assert.equal(animalsInSamjae(2027)[0].phase, '날삼재');
});

test('네 무리의 삼재가 알려진 대로다', () => {
  const KNOWN: [string, string[]][] = [
    /* 신자진생 → 인묘진년 */
    ['원숭이띠', ['범띠', '토끼띠', '용띠']],
    /* 인오술생 → 신유술년 */
    ['범띠', ['원숭이띠', '닭띠', '개띠']],
    /* 해묘미생 → 사오미년 */
    ['돼지띠', ['뱀띠', '말띠', '양띠']],
    /* 사유축생 → 해자축년 */
    ['뱀띠', ['돼지띠', '쥐띠', '소띠']],
  ];
  for (const [born, want] of KNOWN) {
    const idx = ANIMALS.findIndex(a => a.name === born);
    assert.notEqual(idx, -1, `${born}을 못 찾았다`);
    assert.deepEqual(samjaeBranches(idx).map(nameOf), want, `${born}생`);
  }
});

test('같은 무리 셋은 삼재가 똑같다', () => {
  /* 삼재는 띠 하나가 아니라 삼합 무리 셋이 함께 든다 */
  const GROUPS = [['원숭이띠', '쥐띠', '용띠'], ['범띠', '말띠', '개띠'],
                  ['돼지띠', '토끼띠', '양띠'], ['뱀띠', '닭띠', '소띠']];
  for (const g of GROUPS) {
    const sets = g.map(n => samjaeBranches(ANIMALS.findIndex(a => a.name === n)).join(','));
    assert.equal(new Set(sets).size, 1, `${g.join('·')}의 삼재가 서로 다르다`);
  }
});

test('어느 해든 삼재인 띠가 정확히 셋이고, 열두 해 동안 모든 띠가 세 번씩 든다', () => {
  const count = new Map<number, number>();
  for (let y = 2020; y < 2032; y++) {
    const inIt = animalsInSamjae(y);
    assert.equal(inIt.length, 3, `${y}년에 ${inIt.length}띠다`);
    assert.equal(new Set(inIt.map(x => x.animalIdx)).size, 3, `${y}년에 같은 띠가 겹쳤다`);
    for (const x of inIt) count.set(x.animalIdx, (count.get(x.animalIdx) ?? 0) + 1);
  }
  assert.equal(count.size, 12, '열두 해 동안 한 번도 안 드는 띠가 있다');
  for (const [idx, n] of count) assert.equal(n, 3, `${nameOf(idx)}가 열두 해에 ${n}번 든다`);
});

test('samjaeFor와 animalsInSamjae가 서로 어긋나지 않는다', () => {
  /* 두 함수가 같은 규칙을 다른 방향에서 읽는다 — 한쪽만 고치면 여기서 걸린다 */
  for (let y = 2000; y < 2060; y++) {
    const byYear = new Set(animalsInSamjae(y).map(x => x.animalIdx));
    for (let a = 0; a < 12; a++) {
      const r = samjaeFor(a, y);
      assert.equal(
        r.current !== null, byYear.has(a),
        `${y}년 ${nameOf(a)}: samjaeFor는 ${r.current ? '삼재' : '아님'}, animalsInSamjae는 그 반대다`,
      );
      if (r.current) assert.equal(r.current.phase, animalsInSamjae(y).find(x => x.animalIdx === a)!.phase);
    }
  }
});

test('삼재가 아니면 몇 해 뒤인지 말해 준다', () => {
  for (let y = 2020; y < 2040; y++) {
    for (let a = 0; a < 12; a++) {
      const r = samjaeFor(a, y);
      assert.equal(r.block[0].phase, '들삼재');
      assert.deepEqual(r.block.map(b => b.year), [r.block[0].year, r.block[0].year + 1, r.block[0].year + 2]);
      if (r.current) {
        assert.equal(r.yearsUntil, 0, '삼재 중인데 남은 해가 있다고 한다');
      } else {
        assert.ok(r.yearsUntil >= 1 && r.yearsUntil <= 9,
          `${y}년 ${nameOf(a)}: ${r.yearsUntil}해 뒤라고 한다`);
        assert.equal(r.block[0].year, y + r.yearsUntil);
      }
      /* 블록의 지지가 실제 그 해의 지지와 맞는가 — 여기가 틀리면 연도가 밀린 것이다 */
      for (const b of r.block) assert.equal(branchOfYear(b.year), b.branchIdx);
    }
  }
});

test('묘고 띠는 날삼재가 자기 띠 해다', () => {
  /* 진·술·축·미(용·개·소·양)는 자기 무리의 마지막 자리라, 삼재의 끝해가
     본인 띠 해와 겹친다. 알아 두면 재미있는 자리라 화면에도 낸다. */
  const TOMB = ['용띠', '개띠', '양띠', '소띠'];
  for (let a = 0; a < 12; a++) {
    const r = samjaeFor(a, 2026);
    const own = r.block.filter(b => b.ownAnimal);
    if (TOMB.includes(nameOf(a))) {
      assert.equal(own.length, 1, `${nameOf(a)}에 자기 띠 해가 없다`);
      assert.equal(own[0].phase, '날삼재', `${nameOf(a)}의 자기 띠 해가 날삼재가 아니다`);
    } else {
      assert.equal(own.length, 0, `${nameOf(a)}에 자기 띠 해가 있다고 나온다`);
    }
  }
});

test('이 검사가 실제로 문다', () => {
  /* 위 검사들이 «아무것도 안 재고» 통과하는 것이 아님을 확인한다.
     규칙을 한 칸 어긋나게 흉내 내면 알려진 값과 달라져야 한다. */
  const 돼지 = ANIMALS.findIndex(a => a.name === '돼지띠');
  const right = samjaeBranches(돼지);
  const shifted = right.map(b => (b + 1) % 12);
  assert.notDeepEqual(shifted.map(nameOf), ['뱀띠', '말띠', '양띠'],
    '한 칸 밀어도 같다면 이 검사는 아무것도 안 재고 있다');
  assert.deepEqual(right.map(nameOf), ['뱀띠', '말띠', '양띠']);
});

test('판정 색이 두 테마의 결과판에서 다 읽힌다', () => {
  /* 「삼재입니다」는 36px 굵은 글자라 대형 글자 기준(3.0)이다. 색을 한 벌만
     쓰므로 흰 바탕과 slate-900 양쪽에서 다 넘겨야 한다. */
  for (const [name, color] of Object.entries(SAMJAE_COLORS)) {
    for (const [theme, bg] of Object.entries(CARD_GROUNDS)) {
      const r = contrast(color, bg);
      assert.ok(r >= AA_LARGE, `${theme}에서 ${name}(${color})의 대비가 ${r.toFixed(2)} — ${AA_LARGE} 미달`);
    }
  }
});

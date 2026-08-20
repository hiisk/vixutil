import { test } from 'node:test';
import assert from 'node:assert/strict';
import { CARDS, tarotSlugOfId } from '../lib/tarot/deck.ts';
import { getFullDeck } from '../lib/fortune-data.ts';

/**
 * 타로 덱이 두 벌인데 서로 맞물린다 — 그 맞물림을 지킨다.
 *
 * 뽑기 화면(lib/fortune-data)과 사전 78장(lib/tarot/deck)은 다른 파일이고,
 * 이어 주는 것은 «덱에서의 자리»(id) 하나뿐이다. 한쪽 순서가 바뀌면 공유한
 * 주소가 조용히 남의 카드를 가리킨다 — 화면은 멀쩡해서 아무도 모른다.
 */

/** 사전 쪽 슬러그를 뽑기 쪽 영어 이름과 견줄 수 있는 꼴로 */
const norm = (s: string) => s.toLowerCase().replace(/[^a-z]/g, '');

test('두 덱이 일흔여덟 자리에서 같은 카드다', () => {
  const draw = getFullDeck();
  assert.equal(draw.length, 78);
  assert.equal(CARDS.length, 78);

  for (const c of draw) {
    const slug = tarotSlugOfId(c.id);
    assert.ok(slug, `id ${c.id}(${c.nameEn})에 사전 주소가 없다`);
    /*
      이름으로 대조한다. id만 세면 «둘 다 78개»라는 것밖에 못 보고, 순서가
      통째로 밀린 경우를 놓친다 — 그게 바로 잡으려는 고장이다.
    */
    assert.equal(norm(slug), norm(c.nameEn),
      `id ${c.id}: 뽑기는 ${c.nameEn}인데 사전은 ${slug}이다`);
  }
});

test('마이너는 수트와 끗수까지 맞는다', () => {
  const byId = new Map(CARDS.map(c => [c.id, c]));
  for (const c of getFullDeck()) {
    if (c.id < 22) { assert.equal(byId.get(c.id)!.arcana, 'major'); continue; }
    const d = byId.get(c.id)!;
    assert.equal(d.arcana, 'minor', `id ${c.id}`);
    assert.equal(d.suit, c.suit, `id ${c.id} 수트`);
    assert.equal(d.rank, c.rank, `id ${c.id} 끗수`);
  }
});

test('이 검사가 실제로 문다', () => {
  /* 자리를 하나 밀면 이름이 어긋나야 한다 — 밀림을 못 잡으면 검사가 헛것이다 */
  const draw = getFullDeck();
  const shifted = draw.map((c, i) => ({ ...c, id: draw[(i + 1) % draw.length].id }));
  const wrong = shifted.filter(c => norm(tarotSlugOfId(c.id) ?? '') !== norm(c.nameEn));
  assert.ok(wrong.length > 70, `밀었는데 ${wrong.length}장만 어긋난다`);
  /* 없는 자리는 undefined다 — 조용히 첫 장으로 떨어지면 안 된다 */
  assert.equal(tarotSlugOfId(78), undefined);
  assert.equal(tarotSlugOfId(-1), undefined);
});

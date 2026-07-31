/**
 * 타로 78장이 스스로 어긋나지 않는지 본다.
 *
 * 마이너 56장은 수트 × 계급으로 만들기 때문에, 표 한 칸이 비면 열네 장이 한꺼번에
 * 이상해진다. 그런데 화면에는 빈칸이 그냥 공백으로 나와서 눈으로는 못 잡는다.
 * 그래서 78장 × 열 언어를 전부 만들어 보고 빈 곳이 없는지 확인한다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';

import { CARDS, CARD_SLUGS, MAJORS, MAJOR_SLUGS, RANKS, SUITS, SUIT_ELEMENT, TAROT_ICON, cardOf, cardsOfSuit, minorSlug } from '../lib/tarot/deck.ts';
import { MAJOR_COPY } from '../lib/tarot/majors.ts';
import { cardView, majorNeighbours, sameRank, sameSuit } from '../lib/tarot/facts.ts';
import { TAROT_UI } from '../lib/tarot/ui.ts';
import { LANG_CODES } from '../lib/i18n/lang.ts';
import { hanProblem } from './han.ts';

test('한 벌은 78장이다', () => {
  assert.equal(CARDS.length, 78);
  assert.equal(MAJORS.length, 22);
  assert.equal(CARDS.filter(c => c.arcana === 'minor').length, 56);
  for (const s of SUITS) assert.equal(cardsOfSuit(s).length, 14, `${s}가 14장이 아니다`);
});

test('slug이 겹치지 않고 주소로 쓸 수 있다', () => {
  assert.equal(new Set(CARD_SLUGS).size, 78, 'slug 중복');
  for (const s of CARD_SLUGS) assert.match(s, /^[a-z-]+$/, `주소에 못 쓰는 slug: ${s}`);
  assert.equal(minorSlug('cups', 3), 'three-of-cups');
  assert.equal(cardOf('three-of-cups')?.id, 38);
  assert.equal(cardOf('the-fool')?.id, 0);
});

test('id가 0부터 77까지 빠짐없이 이어진다', () => {
  // 기존 뽑기 도구가 쓰는 번호와 같아야 한다 — 메이저 0~21, 완드·컵·소드·펜타클 순
  assert.deepEqual(CARDS.map(c => c.id), Array.from({ length: 78 }, (_, i) => i));
  assert.equal(cardOf('ace-of-wands')?.id, 22);
  assert.equal(cardOf('ace-of-cups')?.id, 36);
  assert.equal(cardOf('ace-of-swords')?.id, 50);
  assert.equal(cardOf('ace-of-pentacles')?.id, 64);
});

test('메이저 22장의 문구가 덱과 짝을 이룬다', () => {
  const keys = Object.keys(MAJOR_COPY);
  assert.equal(keys.length, 22);
  for (const slug of MAJOR_SLUGS) assert.ok(MAJOR_COPY[slug], `${slug}의 문구가 없다`);
  for (const key of keys) assert.ok(MAJOR_SLUGS.includes(key), `덱에 없는 카드의 문구: ${key}`);
});

test('수트마다 원소가 하나씩 붙는다', () => {
  assert.equal(SUIT_ELEMENT.wands, 'fire');
  assert.equal(SUIT_ELEMENT.cups, 'water');
  assert.equal(SUIT_ELEMENT.swords, 'air');
  assert.equal(SUIT_ELEMENT.pentacles, 'earth');
  assert.equal(new Set(Object.values(SUIT_ELEMENT)).size, 4, '두 수트가 같은 원소를 쓴다');
});

test('78장 × 열 언어가 모두 채워진다', () => {
  // 마이너는 표에서 조합되므로, 표 한 칸이 비면 열네 장이 함께 무너진다
  for (const card of CARDS) {
    for (const lang of LANG_CODES) {
      const v = cardView(card.slug, lang);
      assert.ok(v, `${card.slug}/${lang}: 값을 못 만든다`);
      assert.ok(v!.name.trim().length > 0, `${card.slug}/${lang}: 이름이 비었다`);
      assert.ok(v!.upright.trim().length > 10, `${card.slug}/${lang}: 정방향이 비었다`);
      assert.ok(v!.reversed.trim().length > 10, `${card.slug}/${lang}: 역방향이 비었다`);
      assert.ok(v!.kindLine.trim().length > 0, `${card.slug}/${lang}: 갈래 줄이 비었다`);
    }
  }
});

test('한 언어 안에서 카드 이름이 겹치지 않는다', () => {
  // 수트나 계급 이름을 잘못 적으면 두 카드가 같은 이름이 되는데, 목록에서는 티가 안 난다
  for (const lang of LANG_CODES) {
    const names = CARDS.map(c => cardView(c.slug, lang)!.name);
    const dup = [...new Set(names.filter((n, i) => names.indexOf(n) !== i))];
    assert.deepEqual(dup, [], `${lang}: 이름이 겹친다 — ${dup.join(', ')}`);
  }
});

test('마이너 이름에 수트와 계급이 모두 들어간다', () => {
  for (const lang of LANG_CODES) {
    const ui = TAROT_UI[lang];
    for (const suit of SUITS) {
      for (const rank of RANKS) {
        const v = cardView(minorSlug(suit, rank), lang)!;
        assert.ok(v.name.includes(ui.suitLabel[suit]), `${lang}/${suit}/${rank}: 이름에 수트가 없다`);
        assert.ok(v.name.includes(ui.rankLabel[rank]), `${lang}/${suit}/${rank}: 이름에 계급이 없다`);
      }
    }
  }
});

test('마이너 해석에 수트 주제와 계급 단계가 겹쳐 들어간다', () => {
  // 조합이 끊기면 "이 수트는 를 다루므로" 같은 빈 문장이 나간다
  for (const lang of LANG_CODES) {
    const ui = TAROT_UI[lang];
    const v = cardView('three-of-cups', lang)!;
    assert.ok(v.upright.includes(ui.suitTheme.cups), `${lang}: 수트 주제가 안 들어갔다`);
    assert.ok(v.upright.includes(ui.rankTheme[3]), `${lang}: 계급 단계가 안 들어갔다`);
    assert.ok(v.reversed.includes(ui.suitTheme.cups), `${lang}: 역방향에 수트 주제가 없다`);
  }
});

test('메이저에는 수트가 없고 마이너에는 번호가 없다', () => {
  const fool = cardView('the-fool', 'ko')!;
  assert.equal(fool.arcana, 'major');
  assert.equal(fool.suit, undefined);
  assert.equal(fool.number, 0);
  const three = cardView('three-of-cups', 'ko')!;
  assert.equal(three.arcana, 'minor');
  assert.equal(three.number, undefined);
  assert.equal(three.suit, 'cups');
  assert.equal(three.rank, 3);
  assert.ok(three.elementName);
});

test('같은 수트·같은 숫자·이웃 카드가 자기 자신을 빼고 나온다', () => {
  for (const card of CARDS) {
    for (const list of [sameSuit(card.slug), sameRank(card.slug), majorNeighbours(card.slug)]) {
      assert.ok(!list.some(c => c.slug === card.slug), `${card.slug}: 자기 자신이 들어 있다`);
    }
  }
  assert.equal(sameSuit('three-of-cups').length, 13);
  assert.equal(sameRank('three-of-cups').length, 3);
  // 광대는 뒤에만, 세계는 앞에만 이웃이 있다
  assert.equal(majorNeighbours('the-fool').length, 1);
  assert.equal(majorNeighbours('the-world').length, 1);
  assert.equal(majorNeighbours('the-star').length, 2);
  assert.equal(sameSuit('the-fool').length, 0, '메이저에는 수트 동료가 없다');
});

test('열 언어 문구가 모두 채워져 있다', () => {
  for (const lang of LANG_CODES) {
    const ui = TAROT_UI[lang];
    for (const [key, val] of Object.entries(ui)) {
      assert.ok(val != null, `${lang}.${key}가 비었다`);
      if (typeof val === 'string') assert.ok(val.trim().length > 0, `${lang}.${key}가 빈 문자열이다`);
      if (typeof val === 'string') assert.equal(hanProblem(lang, val), '');
    }
    assert.equal(ui.how.length, 4, `${lang}: 설명 수가 다르다`);
    assert.equal(ui.hubFaq.length, 5, `${lang}: 허브 FAQ 수가 다르다`);
    assert.equal(ui.cardFaq('a', 'b', 'c', 'd').length, 3, `${lang}: 카드 FAQ 수가 다르다`);
    for (const s of SUITS) {
      assert.ok(ui.suitLabel[s], `${lang}: ${s} 이름이 없다`);
      assert.ok(ui.suitTheme[s]?.length >= 8, `${lang}: ${s} 주제가 없다`);
    }
    for (const r of RANKS) {
      assert.ok(ui.rankLabel[r], `${lang}: ${r} 이름이 없다`);
      assert.ok(ui.rankTheme[r]?.length >= 8, `${lang}: ${r} 단계가 없다`);
    }
  }
});

test('언어끼리 글자가 섞이지 않는다', () => {
  // 열 칸을 나란히 적다 보면 한 칸에 다른 언어가 흘러 들어간다 — 실제로 한 번 났다
  for (const [slug, copy] of Object.entries(MAJOR_COPY)) {
    for (const lang of LANG_CODES) {
      for (const field of ['name', 'up', 'rev'] as const) {
        const t = copy[field][lang];
        if (lang !== 'ko') assert.ok(!/[가-힣]/.test(t), `${slug}/${lang}/${field}: 한글이 섞였다`);
        if (lang !== 'ja' && lang !== 'ko') assert.ok(!/[ぁ-んァ-ヶ]/.test(t), `${slug}/${lang}/${field}: 가나가 섞였다`);
        if (lang !== 'hi') assert.ok(!/[ऀ-ॿ]/.test(t), `${slug}/${lang}/${field}: 데바나가리가 섞였다`);
      }
    }
  }
});

test('메타 문구가 카드 이름을 담는다', () => {
  for (const card of CARDS) {
    for (const lang of LANG_CODES) {
      const v = cardView(card.slug, lang)!;
      const ui = TAROT_UI[lang];
      assert.ok(ui.metaTitle(v.name).includes(v.name), `${lang}/${card.slug}: 제목에 이름이 없다`);
      const desc = ui.metaDesc(v.name, v.upright);
      assert.ok(desc.includes(v.name), `${lang}/${card.slug}: 설명에 이름이 없다`);
      assert.ok(desc.length > 40, `${lang}/${card.slug}: 설명이 너무 짧다`);
    }
  }
});

test('타로 아이콘은 목록과 카드가 같은 그림을 쓴다', async () => {
  const { ICON_FOR } = await import('../lib/og-icon-map.ts');
  assert.equal(ICON_FOR[TAROT_ICON], 'cards', '이모지가 카드 아이콘으로 이어지지 않는다');
});

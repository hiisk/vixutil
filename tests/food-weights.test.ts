/**
 * 재료 무게 환산 검사.
 *
 * 이 표가 틀리면 반죽이 망가지는데, 화면에서는 숫자가 그럴듯하게 보인다. 그래서
 * 아는 값을 박아 둔다 — 물 1컵은 240g, 밀가루 1컵은 125g, 버터 1큰술은 14g,
 * 소금 1작은술은 6g. 제과 책에 실려 있는 값이라 어긋나면 바로 드러난다.
 *
 * 컵이 나라마다 다른 것도 검사가 지킨다. 미국 240ml와 한국 200ml의 비가 1.2로
 * 유지되지 않으면 어느 한쪽 계산이 깨진 것이다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

import { LANGS8, LANG_CODES, type Lang } from '../lib/i18n/lang.ts';
import { FOOD_CATEGORIES, INGREDIENTS, ingredient, ingredientsOfCategory } from '../lib/food/ingredients8.ts';
import { VOLUMES, foodFacts, mlOfGrams, similarIngredients } from '../lib/food/facts.ts';
import { FOOD_UI, foodAlternates } from '../lib/food/ui.ts';

const LANGS = LANG_CODES;

/**
 * 자료는 열 언어인데 주소는 아직 여덟이다 — 상위 /food가 일곱 언어짜리 도구
 * 허브와 같은 페이지라서다. 자세한 사정은 lib/food/route.ts에 적어 두었다.
 */
const ROUTE_LANGS = LANGS8;
const HANGUL = /[가-힣]/;
const dense = (lang: Lang) => lang === 'ja';
const facts = (slug: string) => {
  const ing = ingredient(slug);
  assert.ok(ing, `${slug} 없음`);
  return foodFacts(ing);
};

test('재료가 100가지를 넘고 slug가 겹치지 않는다', () => {
  assert.ok(INGREDIENTS.length >= 100, `${INGREDIENTS.length}가지뿐`);
  assert.equal(new Set(INGREDIENTS.map(i => i.slug)).size, INGREDIENTS.length, 'slug 중복');
});

test('slug는 URL에 쓸 수 있고 밀도는 그럴듯한 범위다', () => {
  for (const i of INGREDIENTS) {
    assert.match(i.slug, /^[a-z0-9-]+$/, i.slug);
    // 마시멜로(208)보다 가볍거나 꿀(1417)보다 무거운 식재료는 이 목록에 없다
    assert.ok(i.gPerL >= 150 && i.gPerL <= 1600, `${i.slug}: 밀도 ${i.gPerL}`);
  }
});

test('갈래가 정해진 목록 안이고 모두 쓰인다', () => {
  const used = new Set(INGREDIENTS.map(i => i.category));
  for (const c of used) assert.ok(FOOD_CATEGORIES.includes(c), `모르는 갈래 ${c}`);
  for (const c of FOOD_CATEGORIES) {
    assert.ok(used.has(c), `안 쓰인 갈래 ${c}`);
    assert.ok(ingredientsOfCategory(c).length >= 5, `${c} 갈래가 ${ingredientsOfCategory(c).length}가지뿐`);
  }
});

test('제과 책에 실린 값과 맞는다', () => {
  // 물은 1L에 1000g이므로 240ml 컵은 정확히 240g이다
  assert.equal(facts('water').grams.cupUs, 240);
  assert.equal(facts('water').grams.cupMetric, 200);
  assert.equal(facts('water').grams.tbsp, 15);
  assert.equal(facts('water').grams.tsp, 5);
  // 널리 쓰이는 기준값들
  assert.equal(facts('all-purpose-flour').grams.cupUs, 125);
  assert.equal(facts('granulated-sugar').grams.cupUs, 200);
  assert.equal(facts('honey').grams.cupUs, 340);
  assert.equal(facts('white-rice').grams.cupUs, 185);
  assert.equal(facts('rolled-oats').grams.cupUs, 90);
  // 버터 한 스틱은 113g, 1컵(스틱 둘)은 227g 근처여야 한다
  assert.ok(Math.abs(facts('butter').grams.cupUs - 227) <= 5, `버터 1컵 ${facts('butter').grams.cupUs}g`);
  // 소금 1작은술은 6g 근처다 — 이 값이 틀리면 간이 두 배로 틀어진다
  assert.ok(Math.abs(facts('table-salt').grams.tsp - 6) <= 0.5, `소금 1작은술 ${facts('table-salt').grams.tsp}g`);
});

test('컵의 나라별 비율이 유지된다', () => {
  assert.equal(VOLUMES.cupUs, 240);
  assert.equal(VOLUMES.cupMetric, 200);
  assert.equal(VOLUMES.cupUk, 284);
  assert.equal(VOLUMES.tbsp, 15);
  assert.equal(VOLUMES.tsp, 5);
  for (const i of INGREDIENTS) {
    const f = foodFacts(i);
    // 미국 컵은 한국 컵의 1.2배다. 어느 한쪽 계산이 깨지면 이 비가 무너진다
    assert.ok(
      Math.abs(f.grams.cupUs / f.grams.cupMetric - 1.2) < 0.03,
      `${i.slug}: ${f.grams.cupUs} / ${f.grams.cupMetric}`,
    );
    // 큰술은 작은술의 세 배다
    assert.ok(Math.abs(f.grams.tbsp / f.grams.tsp - 3) < 0.06, `${i.slug}: 큰술/작은술 비율`);
    assert.ok(f.grams.cupUs > f.grams.cupMetric, `${i.slug}: 큰 컵이 더 무겁지 않다`);
    assert.ok(f.grams.cupUk > f.grams.cupUs, `${i.slug}: 영국 컵이 더 무겁지 않다`);
  }
});

test('그램에서 부피로 돌아가면 제자리다', () => {
  for (const i of INGREDIENTS) {
    const f = foodFacts(i);
    // 1컵의 무게를 부피로 되돌리면 240ml 근처여야 한다
    const back = mlOfGrams(i, f.grams.cupUs);
    assert.ok(Math.abs(back - 240) < 3, `${i.slug}: ${f.grams.cupUs}g → ${back}ml`);
    assert.ok(f.mlPer100g > 50 && f.mlPer100g < 700, `${i.slug}: 100g = ${f.mlPer100g}ml`);
    assert.ok(f.cupsPer100g > 0.1 && f.cupsPer100g < 3, `${i.slug}: 100g = ${f.cupsPer100g}컵`);
  }
});

test('컵 분량표가 비례하고 줄어드는 순서다', () => {
  for (const i of INGREDIENTS) {
    const f = foodFacts(i);
    assert.equal(f.cupTable.length, 5, `${i.slug}: 분량표가 ${f.cupTable.length}줄`);
    assert.equal(f.cupTable[0].grams, f.grams.cupUs, `${i.slug}: 1컵이 위 표와 다르다`);
    for (let k = 1; k < f.cupTable.length; k++) {
      assert.ok(f.cupTable[k].grams < f.cupTable[k - 1].grams, `${i.slug}: ${k}번째가 더 무겁다`);
    }
    // ½컵은 1컵의 절반이어야 한다
    const half = f.cupTable.find(r => r.label === '1/2');
    assert.ok(half && Math.abs(half.grams * 2 - f.grams.cupUs) <= 1, `${i.slug}: ½컵이 절반이 아니다`);
  }
});

test('물보다 무거운지 판정이 밀도와 맞는다', () => {
  for (const i of INGREDIENTS) {
    assert.equal(foodFacts(i).denserThanWater, i.gPerL > 1000, `${i.slug}: 물과의 비교가 틀리다`);
  }
  assert.equal(facts('honey').denserThanWater, true);
  assert.equal(facts('all-purpose-flour').denserThanWater, false);
});

test('열 언어 이름이 다 있고 한국어 밖에 한글이 없다', () => {
  for (const i of INGREDIENTS) {
    for (const lang of LANGS) {
      const n = i.name[lang];
      assert.ok(n && n.trim().length > 0, `${i.slug} ${lang}: 이름 없음`);
      if (lang !== 'ko') assert.ok(!HANGUL.test(n), `${i.slug} ${lang}에 한글: ${n}`);
    }
    assert.ok(new Set(Object.values(i.name)).size >= 2, `${i.slug}: 열 언어가 모두 같은 이름`);
  }
});

test('언어마다 재료 이름이 서로 겹치지 않는다', () => {
  for (const lang of LANGS) {
    const names = INGREDIENTS.map(i => i.name[lang]);
    const dup = [...new Set(names.filter((n, k) => names.indexOf(n) !== k))];
    assert.deepEqual(dup, [], `${lang} 중복 이름: ${dup.join(', ')}`);
  }
});

test('비슷한 재료는 자기를 넣지 않고 같은 갈래를 먼저 준다', () => {
  for (const i of INGREDIENTS) {
    const near = similarIngredients(i.slug);
    assert.ok(near.length > 0, `${i.slug}: 추천이 비었다`);
    assert.ok(!near.some(x => x.slug === i.slug), `${i.slug}: 자기를 추천한다`);
  }
  // 박력분 옆에는 다른 가루가 온다
  assert.equal(similarIngredients('cake-flour', 3)[0].category, 'flour');
  assert.deepEqual(similarIngredients('없는재료'), []);
  assert.equal(ingredient('없는재료'), undefined);
});

test('여덟 언어 라우트와 공유 카드가 다 있다', () => {
  for (const { prefix } of ROUTE_LANGS) {
    const p = `app${prefix}/food`;
    assert.ok(existsSync(`${p}/page.tsx`), `${p}/page.tsx 없음`);
    assert.ok(existsSync(`${p}/[slug]/page.tsx`), `${p}/[slug]/page.tsx 없음`);
    assert.ok(existsSync(`${p}/[slug]/opengraph-image.tsx`), `${p}/[slug]/opengraph-image.tsx 없음`);
  }
});

test('hreflang은 아홉 줄이고 포르투갈어는 /pt-br이다', () => {
  const a = foodAlternates('all-purpose-flour');
  assert.equal(Object.keys(a).length, ROUTE_LANGS.length + 1);
  assert.equal(a.ko, '/food/all-purpose-flour');
  assert.equal(a['pt-BR'], '/pt-br/food/all-purpose-flour');
  assert.equal(a['x-default'], '/en/food/all-purpose-flour');
  assert.equal(foodAlternates().ko, '/food');
});

test('사이트맵·검색·허브에 재료가 걸려 있다', () => {
  const map = readFileSync('app/sitemap.ts', 'utf8');
  assert.ok(map.includes('INGREDIENTS'), '사이트맵이 재료 목록을 돌지 않는다');
  const idx = readFileSync('lib/search-index.ts', 'utf8');
  assert.ok(idx.includes('INGREDIENTS'), '검색 인덱스에 재료 없음');
  // 허브에서 걸어 주지 않으면 125장이 고아가 된다
  for (const hub of ['app/food/page.tsx', 'components/FoodHubIntl.tsx']) {
    assert.ok(readFileSync(hub, 'utf8').includes('ingredientsOfCategory'), `${hub}에 재료 목록이 없다`);
  }
});

test('화면 문구가 열 언어로 다 있다', () => {
  for (const lang of LANGS) {
    const ui = FOOD_UI[lang];
    assert.ok(ui, `${lang}: 문구 묶음이 없다`);
    assert.ok(ui.hubTitle.length > 6 && ui.hubLead.length > 20, `${lang}: 허브 문구가 짧다`);
    assert.equal(ui.how.length, 4, `${lang}: 읽는 방법이 네 줄이 아니다`);
    for (const h of ui.how) assert.ok(h.length > 25, `${lang}: 설명이 짧다 — ${h}`);
    for (const k of ['home', 'section', 'cupUs', 'cupMetric', 'cupUk', 'tbsp', 'tsp', 'gram', 'densityLabel', 'per100gTitle', 'cupTableTitle', 'similarTitle', 'faqTitle'] as const) {
      assert.ok(ui[k].trim().length > 0, `${lang}.${k}가 비었다`);
    }
    // 컵 라벨에는 부피가 적혀 있어야 한다 — 어느 나라 컵인지 모르면 값이 쓸모없다
    assert.ok(ui.cupUs.includes('240'), `${lang}: 미국 컵에 240이 없다`);
    assert.ok(ui.cupMetric.includes('200'), `${lang}: 한국 컵에 200이 없다`);
    assert.ok(ui.tbsp.includes('15') && ui.tsp.includes('5'), `${lang}: 큰술·작은술 부피가 없다`);
    for (const c of FOOD_CATEGORIES) assert.ok(ui.categoryLabel[c]?.trim(), `${lang}: ${c} 갈래 이름 없음`);
    if (lang !== 'ko') {
      const joined = ui.hubTitle + ui.hubLead + ui.how.join('') + Object.values(ui.categoryLabel).join('');
      assert.ok(!HANGUL.test(joined), `${lang} 화면 문구에 한글`);
    }
  }
});

test('SEO 문구가 언어마다 실제 값을 담는다', () => {
  const ing = ingredient('all-purpose-flour');
  assert.ok(ing);
  const f = foodFacts(ing);
  for (const lang of LANGS) {
    const ui = FOOD_UI[lang];
    const name = ing.name[lang];
    const title = ui.metaTitle(name, f.grams.cupUs);
    const desc = ui.metaDesc(name, f);
    assert.ok(title.includes(name), `${lang}: 메타 제목에 이름이 없다 — ${title}`);
    assert.ok(title.includes('125'), `${lang}: 메타 제목에 무게가 없다 — ${title}`);
    assert.ok(desc.includes('125') && desc.includes('104'), `${lang}: 메타 설명에 두 컵 값이 없다`);
    assert.ok(desc.length > 60, `${lang}: 메타 설명이 짧다 (${desc.length}자)`);
    assert.ok(ui.hubMetaDesc.length > 60, `${lang}: 허브 메타 설명이 짧다`);
    if (lang !== 'ko') assert.ok(!HANGUL.test(title + desc), `${lang} 메타에 한글`);
  }
});

test('FAQ가 재료마다 다섯 개 이상이고 언어마다 채워져 있다', () => {
  for (const lang of LANGS) {
    const ui = FOOD_UI[lang];
    assert.ok(ui.hubFaq.length >= 4, `${lang}: 허브 FAQ가 ${ui.hubFaq.length}개`);
    for (const it of ui.hubFaq) {
      assert.ok(it.q.length > 5 && it.a.length > (dense(lang) ? 40 : 60), `${lang}: 빈 허브 FAQ — ${it.q}`);
    }
    for (const slug of ['all-purpose-flour', 'honey', 'rolled-oats']) {
      const ing = ingredient(slug);
      assert.ok(ing, slug);
      const f = foodFacts(ing);
      const faq = ui.itemFaq(ing.name[lang], f);
      assert.ok(faq.length >= 5, `${slug} ${lang}: FAQ가 ${faq.length}개`);
      assert.equal(new Set(faq.map(x => x.q)).size, faq.length, `${slug} ${lang}: FAQ 질문 중복`);
      for (const it of faq) {
        assert.ok(it.q.length > 5 && it.a.length > (dense(lang) ? 20 : 30), `${slug} ${lang}: 빈 FAQ — ${it.q}`);
      }
      assert.ok(faq[0].a.includes(String(f.grams.cupUs)), `${slug} ${lang}: FAQ에 1컵 무게가 없다`);
      if (lang !== 'ko') {
        assert.ok(!HANGUL.test(faq.map(x => x.q + x.a).join('')), `${slug} ${lang} FAQ에 한글`);
      }
    }
  }
});

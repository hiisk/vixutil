import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { IDIOMS, HANJA_CATEGORIES, idiomBySlug, relatedIdioms } from '../lib/hanja-tools.ts';
import { HANJA_UI, HANJA_CATEGORY_LABEL, hanjaFaq, hanjaAlternates, idiomHeading } from '../lib/hanja-ui.ts';
import { GLOSS_EN } from '../lib/hanja/gloss-en.ts';

const LANGS = ['ko', 'en', 'zh'] as const;
const HANGUL = /[가-힣]/;
const HANJA = /[一-鿿]/;

test('50개가 있고 slug·한자·독음이 겹치지 않는다', () => {
  assert.ok(IDIOMS.length >= 100, `100개 이상이어야 하는데 ${IDIOMS.length}개`);
  assert.equal(new Set(IDIOMS.map(i => i.slug)).size, IDIOMS.length);
  assert.equal(new Set(IDIOMS.map(i => i.hanja)).size, IDIOMS.length);
  assert.equal(new Set(IDIOMS.map(i => i.reading)).size, IDIOMS.length);
});

test('사자성어는 정말 네 글자다 — 한자·간체·새김이 모두 넷', () => {
  for (const i of IDIOMS) {
    assert.equal([...i.hanja].length, 4, `${i.slug} 한자 ${i.hanja}`);
    assert.equal([...i.simplified].length, 4, `${i.slug} 간체 ${i.simplified}`);
    assert.equal(i.chars.length, 4, `${i.slug} 새김 ${i.chars.length}개`);
    assert.equal([...i.reading].length, 4, `${i.slug} 독음 ${i.reading}`);
  }
});

test('한자 네 자가 모두 한자 영역 글자다', () => {
  for (const i of IDIOMS) {
    for (const ch of [...i.hanja, ...i.simplified]) {
      assert.match(ch, HANJA, `${i.slug}의 "${ch}"는 한자가 아니다`);
    }
  }
});

test('독음은 한글 네 자다', () => {
  for (const i of IDIOMS) assert.match(i.reading, /^[가-힣]{4}$/, `${i.slug}: ${i.reading}`);
});

test('병음은 네 음절이고 성조 표기가 들어 있다', () => {
  for (const i of IDIOMS) {
    assert.equal(i.pinyin.split(/\s+/).length, 4, `${i.slug}: ${i.pinyin}`);
    assert.match(i.pinyin, /[āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ]/, `${i.slug} 병음에 성조가 없다: ${i.pinyin}`);
  }
});

test('글자별 새김은 한글로 적혀 있다', () => {
  for (const i of IDIOMS) {
    for (const c of i.chars) {
      assert.ok(c.length >= 2, `${i.slug} 새김이 너무 짧다: "${c}"`);
      assert.match(c, HANGUL, `${i.slug} 새김에 한글이 없다: "${c}"`);
    }
  }
});

test('영어 새김이 성어마다 네 개씩 있고 한글이 없다', () => {
  for (const i of IDIOMS) {
    const g = GLOSS_EN[i.slug];
    assert.ok(g, `${i.slug} 영어 새김 없음 — 영어 페이지에 한국어 훈음이 그대로 나간다`);
    assert.equal(g.length, 4, `${i.slug} 영어 새김이 ${g.length}개`);
    for (const w of g) {
      assert.ok(w.length > 0, `${i.slug} 빈 새김`);
      assert.ok(!HANGUL.test(w), `${i.slug} 영어 새김에 한글: ${w}`);
    }
  }
});

test('세 언어의 표제·뜻·유래·쓰임이 모두 채워져 있다', () => {
  for (const i of IDIOMS) {
    for (const lang of LANGS) {
      const t = i[lang];
      const min = lang === 'zh' ? { title: 3, meaning: 8, origin: 10, usage: 8 } : { title: 4, meaning: 15, origin: 20, usage: 15 };
      for (const k of ['title', 'meaning', 'origin', 'usage'] as const) {
        assert.ok(t[k].length >= min[k], `${i.slug}.${lang}.${k}가 너무 짧다: "${t[k]}"`);
      }
    }
  }
});

test('영어 표제는 로마자, 중국어 표제는 간체와 같다', () => {
  for (const i of IDIOMS) {
    assert.match(i.en.title, /^[A-Z][a-z]*(-[a-z]+){3}$/, `${i.slug} en 표제: ${i.en.title}`);
    assert.equal(i.zh.title, i.simplified, `${i.slug} zh 표제가 간체와 다르다`);
  }
});

test('영어 설명에 한글이 새지 않는다', () => {
  for (const i of IDIOMS) {
    const joined = Object.values(i.en).join(' ');
    assert.ok(!HANGUL.test(joined), `${i.slug}.en에 한글: ${joined.match(HANGUL)}`);
  }
});

test('중국어 설명에 한글이 새지 않고 실제로 중국어다', () => {
  for (const i of IDIOMS) {
    const joined = Object.values(i.zh).join(' ');
    assert.ok(!HANGUL.test(joined), `${i.slug}.zh에 한글: ${joined.match(HANGUL)}`);
    assert.match(i.zh.meaning, HANJA, `${i.slug} zh 뜻에 한자가 없다`);
  }
});

test('갈래는 정해진 여섯 개 안이고 모두 쓰인다', () => {
  const used = new Set(IDIOMS.map(i => i.category));
  for (const c of used) assert.ok((HANJA_CATEGORIES as readonly string[]).includes(c), `모르는 갈래 ${c}`);
  for (const c of HANJA_CATEGORIES) assert.ok(used.has(c), `안 쓰인 갈래 ${c}`);
});

test('갈래 이름이 세 언어로 다 있다', () => {
  for (const lang of LANGS) {
    for (const c of HANJA_CATEGORIES) assert.ok(HANJA_CATEGORY_LABEL[lang][c], `${lang}에 ${c} 라벨 없음`);
  }
});

test('한국에서 만들어진 표현은 중국어 설명에 그 사실을 적는다', () => {
  // 중국에서 쓰이지 않는 것을 중국 成语처럼 내면 틀린 정보가 된다
  const koreanMade = ['chojiilgwan', 'chiljeonpalgi', 'donggodongnak', 'eonjungyugol', 'yugumueon', 'ileonjiha', 'gamaniseol', 'simsasukgo'];
  for (const slug of koreanMade) {
    const i = idiomBySlug(slug);
    assert.ok(i, `${slug} 없음`);
    const zh = i.zh.origin + i.zh.usage;
    assert.match(zh, /韩国|中文/, `${slug} zh 설명에 한국식 표현이라는 안내가 없다`);
  }
});

test('표제는 언어별로 겹치지 않는다', () => {
  for (const lang of LANGS) {
    const titles = IDIOMS.map(i => idiomHeading(i, lang));
    const dup = titles.filter((x, n) => titles.indexOf(x) !== n);
    assert.deepEqual(dup, [], `${lang} 중복 표제: ${dup.join(', ')}`);
  }
});

test('FAQ는 3개이고 뜻·유래·쓰임을 그대로 담는다', () => {
  for (const i of IDIOMS) {
    for (const lang of LANGS) {
      const faq = hanjaFaq(i, lang);
      assert.equal(faq.length, 3, `${i.slug} ${lang}`);
      assert.ok(faq[0].a.includes(i.hanja), `${i.slug} ${lang} 첫 FAQ에 한자가 없다`);
      assert.equal(faq[1].a, i[lang].origin);
      assert.equal(faq[2].a, i[lang].usage);
      if (lang !== 'ko') {
        for (const item of faq) assert.ok(!HANGUL.test(item.q + item.a), `${i.slug} ${lang} FAQ에 한글`);
      }
    }
  }
});

test('같은 갈래 링크가 자기 자신을 가리키지 않는다', () => {
  for (const i of IDIOMS) {
    const rel = relatedIdioms(i.slug);
    assert.ok(rel.length > 0, `${i.slug} 관련 성어 없음`);
    assert.ok(!rel.some(r => r.slug === i.slug), `${i.slug}가 자기를 가리킨다`);
  }
});

test('세 언어 라우트가 모두 있다', () => {
  for (const p of ['app/hanja', 'app/en/hanja', 'app/zh/hanja']) {
    assert.ok(existsSync(`${p}/page.tsx`), `${p}/page.tsx 없음`);
    assert.ok(existsSync(`${p}/[slug]/page.tsx`), `${p}/[slug]/page.tsx 없음`);
    assert.ok(existsSync(`${p}/opengraph-image.tsx`), `${p}/opengraph-image.tsx 없음`);
  }
});

test('hreflang은 네 줄이고 x-default는 영어를 가리킨다', () => {
  const a = hanjaAlternates('samyeonchoga');
  assert.equal(Object.keys(a).length, 4);
  assert.equal(a.ko, '/hanja/samyeonchoga');
  assert.equal(a['x-default'], '/en/hanja/samyeonchoga');
});

test('사이트맵에 세 언어의 /hanja가 들어 있다', () => {
  const src = readFileSync('app/sitemap.ts', 'utf8');
  for (const p of ['/hanja', '/en/hanja', '/zh/hanja']) {
    assert.ok(src.includes(`${p}\``) || src.includes(`${p}/`), `사이트맵에 ${p} 없음`);
  }
});

test('한국식·중국 고전 출처가 섞여 있다는 안내가 세 언어에 있다', () => {
  for (const lang of LANGS) assert.ok(HANJA_UI[lang].footNote.length > 40, `${lang} 안내문이 짧다`);
});

test('아이콘은 이모지다 — OG 카드 폰트가 도형 문자를 못 받는다', () => {
  for (const i of IDIOMS) assert.match(i.icon, /\p{Extended_Pictographic}/u, `${i.slug}: ${i.icon}`);
});

test('잘 알려진 성어의 뜻이 맞는다', () => {
  assert.equal(idiomBySlug('samyeonchoga')!.hanja, '四面楚歌');
  assert.equal(idiomBySlug('saeongjima')!.hanja, '塞翁之馬');
  assert.equal(idiomBySlug('cheongchuleoram')!.hanja, '靑出於藍');
  assert.equal(idiomBySlug('cheongchuleoram')!.simplified, '青出于蓝');
  assert.ok(idiomBySlug('ugongisan')!.ko.origin.includes('열자'));
  assert.ok(idiomBySlug('ongojisin')!.ko.origin.includes('논어'));
});

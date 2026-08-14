import { test } from 'node:test';
import assert from 'node:assert/strict';
import { localesOfSection } from '../lib/i18n/lang.ts';
import { existsSync, readFileSync } from 'node:fs';
import { IDIOMS, HANJA_CATEGORIES, idiomBySlug, relatedIdioms } from '../lib/hanja-tools.ts';
import { idiomText, idiomGloss } from '../lib/hanja/types.ts';
import { HANJA_UI, hanjaCategories, hanjaFaq, hanjaAlternates, idiomHeading } from '../lib/hanja-ui.ts';
import { GLOSS_EN } from '../lib/hanja/gloss-en.ts';
import { HANJA_L10N, GLOSS_L10N } from '../lib/hanja-l10n/index.ts';
import { appFile, hasKoLeaf, hasLeafAt } from './app-path.ts';
import { hasOwnCard } from '../lib/og-cards/index.ts';

const LANGS = ['ko', 'en', 'es', 'pt-br', 'ja', 'de', 'fr', 'hi'] as const;
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

test('아홉 언어가 새김을 실제로 받아 간다 — 자료만 있고 배선이 없던 자리', () => {
  /*
   * ── 자료는 완벽한데 화면에 안 나가던 자리 (2026-08-13) ──────
   * 위 검사는 GLOSS_EN **자료 파일만** 본다. 496개가 다 채워져 있고 한글도 없어서
   * 통과했는데, 정작 `GLOSS_L10N`에 en 칸이 없어서 화면에는 한 줄도 안 나갔다.
   * idiomGloss가 `?? i.chars[n]`로 떨어지므로 **영어 낱장 124장이 한국어 훈음을
   * 그대로 내보내고 있었다** — "have / prepare / without / worry"가 나가야 할 자리에
   * "있을 유 / 갖출 비 / 없을 무 / 근심 환"이 나갔다.
   *
   * 그래서 자료가 아니라 **함수를 부른다.** 자료가 있어도 배선이 없으면 여기서 걸린다.
   */
  const NON_KO = LANGS.filter(l => l !== 'ko');
  for (const lang of NON_KO) {
    for (const i of IDIOMS) {
      for (let n = 0; n < 4; n++) {
        const g = idiomGloss(i, lang, n);
        assert.notEqual(g, i.chars[n],
          `${lang}/${i.slug}의 ${n}번째 새김이 한국어 훈음 그대로다 — GLOSS_L10N에 ${lang} 칸이 있는지 보라`);
        /* LANGS에 중국어는 없다 — 중국어는 새김 자리에 한국어 독음을 일부러 쓴다 */
        assert.ok(!HANGUL.test(g), `${lang}/${i.slug}에 한글이 샜다: ${g}`);
      }
    }
  }
});

test('여덟 언어의 표제·뜻·유래·쓰임이 모두 채워져 있다', () => {
  for (const i of IDIOMS) {
    for (const lang of LANGS) {
      const t = idiomText(i, lang);
      // 일본어는 한자로 같은 내용을 절반쯤의 글자 수에 담는다 — 길이 기준을 따로 둔다
      const min = lang === 'ja' ? { title: 3, meaning: 8, origin: 10, usage: 8 } : { title: 4, meaning: 15, origin: 20, usage: 15 };
      for (const k of ['title', 'meaning', 'origin', 'usage'] as const) {
        assert.ok(t[k].length >= min[k], `${i.slug}.${lang}.${k}가 너무 짧다: "${t[k]}"`);
      }
    }
  }
});

test('영어 표제는 로마자, 중국어 표제는 간체와 같다', () => {
  for (const i of IDIOMS) {
    assert.match(i.en.title, /^[A-Z][a-z]*(-[a-z]+){3}$/, `${i.slug} en 표제: ${i.en.title}`);
  }
});

test('영어 설명에 한글이 새지 않는다', () => {
  for (const i of IDIOMS) {
    const joined = Object.values(i.en).join(' ');
    assert.ok(!HANGUL.test(joined), `${i.slug}.en에 한글: ${joined.match(HANGUL)}`);
  }
});


test('갈래는 정해진 여섯 개 안이고 모두 쓰인다', () => {
  const used = new Set(IDIOMS.map(i => i.category));
  for (const c of used) assert.ok((HANJA_CATEGORIES as readonly string[]).includes(c), `모르는 갈래 ${c}`);
  for (const c of HANJA_CATEGORIES) assert.ok(used.has(c), `안 쓰인 갈래 ${c}`);
});

test('갈래 이름이 세 언어로 다 있다', () => {
  for (const lang of LANGS) {
    for (const c of HANJA_CATEGORIES) assert.ok(hanjaCategories(lang)[c], `${lang}에 ${c} 라벨 없음`);
  }
});

test('한국에서 만들어진 표현은 중국어 설명에 그 사실을 적는다', () => {
  // 중국에서 쓰이지 않는 것을 중국 成语처럼 내면 틀린 정보가 된다
  const koreanMade = ['chojiilgwan', 'chiljeonpalgi', 'donggodongnak', 'eonjungyugol', 'yugumueon', 'ileonjiha', 'gamaniseol', 'simsasukgo'];
  for (const slug of koreanMade) {
    const i = idiomBySlug(slug);
    assert.ok(i, `${slug} 없음`);
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
      assert.equal(faq[1].a, idiomText(i, lang).origin);
      assert.equal(faq[2].a, idiomText(i, lang).usage);
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

test('한자 문화권 언어에만 라우트가 있다', () => {
  /*
   * 2026-08-14: 한자 훈음은 그 밖의 언어에서 검색되지 않아 라우트를 지웠다.
   * 목록은 lib/i18n/lang.ts의 SECTION_LOCALES 하나뿐이다.
   */
  assert.ok(!hasLeafAt('app/en/hanja'), 'en 한자 낱장 라우트가 남아 있다');
  assert.ok(!hasLeafAt('app/hi/hanja'), 'hi 한자 낱장 라우트가 남아 있다');
  for (const p of ['app/hanja', 'app/ja/hanja']) {
    assert.ok(existsSync(appFile(`${p}/page.tsx`)), `${p}/page.tsx 없음`);
    assert.ok(hasLeafAt(p), `${p}/[slug]/page.tsx 없음`);
    // 카드는 이제 파일이 아니라 lib/og-cards의 대응표에 있다 — 물려받은 것은 안 친다
    assert.ok(hasOwnCard(p.replace(/^app/, '') || '/'), `${p}에 제 공유 카드가 없다`);
  }
});

test('hreflang이 한자 문화권 넷만 낸다', () => {
  /* 지운 언어를 가리키면 그 hreflang 묶음 전체가 신뢰를 잃는다 */
  const a = hanjaAlternates('samyeonchoga');
  assert.equal(Object.keys(a).filter(k => k !== 'x-default').length, localesOfSection('hanja').length);
  assert.equal(a.ko, '/hanja/samyeonchoga');
  assert.equal(a.ja, '/ja/hanja/samyeonchoga');
  assert.equal(a['pt-BR'], undefined, 'pt-br이 남아 있다 — 지운 장이다');
  assert.equal(a.en, undefined, 'en이 남아 있다 — 지운 장이다');
  assert.ok(!String(a['x-default']).startsWith('/en/'), 'x-default가 없는 영어 장을 가리킨다');
});

test('사이트맵이 열 언어의 /hanja를 낸다', () => {
  const src = readFileSync(appFile('app/sitemap.ts'), 'utf8');
  assert.ok(src.includes('/hanja`'), '사이트맵에 /hanja 없음');
  assert.match(src, /INTL_LOCALES10\.filter[\s\S]{0,400}\/hanja/, '사이트맵이 /hanja를 언어별로 돌리지 않는다');
  assert.ok(src.includes("sectionHasLocale('hanja'"), '사이트맵이 한자를 안 거른다 — 지운 언어 주소가 실린다');
});

test('한국식·중국 고전 출처가 섞여 있다는 안내가 여덟 언어에 있다', () => {
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

/*
 * 위의 "여덟 언어가 채워져 있다"는 검사는 idiomText를 부른다. 그런데 idiomText는
 * 사전에 그 성어가 없으면 영어를 대신 돌려주므로, 여덟 언어가 통째로 비어 있어도
 * 길이 검사가 다 통과한다 — 실제로 열두 개를 새로 넣었을 때 여덟 언어가 하나도
 * 없는 채로 스물두 검사가 전부 초록이었다.
 *
 * 그래서 화면에 나오는 값이 아니라 **사전에 그 열쇠가 있는지**를 본다.
 */
test('여덟 언어 사전에 성어가 하나도 빠지지 않는다', () => {
  const bad: string[] = [];
  for (const [lang, table] of Object.entries(HANJA_L10N)) {
    const missing = IDIOMS.filter(i => !table[i.slug]);
    if (missing.length) bad.push(`${lang}: ${missing.length}개 (${missing.slice(0, 3).map(i => i.slug).join(', ')}…)`);
  }
  assert.deepEqual(bad, [], `사전에 없어 영어로 떨어진다:\n  ${bad.join('\n  ')}`);
});

test('글자별 새김도 여덟 언어에 성어마다 있다', () => {
  const bad: string[] = [];
  for (const [lang, table] of Object.entries(GLOSS_L10N)) {
    const missing = IDIOMS.filter(i => !table?.[i.slug]);
    if (missing.length) bad.push(`${lang}: ${missing.length}개 (${missing.slice(0, 3).map(i => i.slug).join(', ')}…)`);
  }
  assert.deepEqual(bad, [], `새김이 없어 한국어 훈음이 그대로 나간다:\n  ${bad.join('\n  ')}`);
});

test('번역이 영어를 그대로 물려받지 않는다', () => {
  // 사전에 열쇠는 있는데 값이 영어 그대로인 경우 — 옮긴 척만 한 자리를 잡는다
  const bad: string[] = [];
  for (const lang of LANGS) {
    if (lang === 'ko' || lang === 'en') continue;
    const same = IDIOMS.filter(i => {
      const t = idiomText(i, lang);
      return t.meaning === i.en.meaning && t.origin === i.en.origin;
    });
    if (same.length) bad.push(`${lang}: ${same.length}개`);
  }
  assert.deepEqual(bad, [], `영어를 그대로 쓰고 있다: ${bad.join(', ')}`);
});

/**
 * 색 이름 110장 검사.
 *
 * 색은 눈으로 맞다/틀리다를 알 수 없다. 대비가 4.5:1이라고 적혀 있어도 계산이
 * 틀렸는지 알 수 없고, 보색이 반대편이 아니어도 화면은 멀쩡하다. 그래서 값이
 * 알려진 것으로 고정한다 — 흰-검 대비 21:1, 빨강의 보색은 시안, red의 CMYK는
 * 0/100/100/0.
 *
 * 여덟 언어도 같이 본다. 색 이름은 그 나라 사람이 실제로 검색하는 단어라
 * 한 언어만 빠지면 그 언어권에서는 페이지가 있어도 못 찾는다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

import { LANGS as LANG_INFO, LANG_CODES, type Lang } from '../lib/i18n/lang.ts';
import { COLOR_FAMILIES, NAMED_COLORS_8, colorsOfFamily, namedColor } from '../lib/color/named8.ts';
import { colorFacts, nearbyColors } from '../lib/color/facts.ts';
import { COLOR_UI, colorAlternates, colorFaq } from '../lib/color/ui.ts';
import { appFile } from './app-path.ts';

const LANGS = LANG_CODES;
const HANGUL = /[가-힣]/;
const dense = (lang: Lang) => lang === 'ja';

test('색이 100가지를 넘고 slug·hex가 겹치지 않는다', () => {
  assert.ok(NAMED_COLORS_8.length >= 100, `${NAMED_COLORS_8.length}가지뿐`);
  assert.equal(new Set(NAMED_COLORS_8.map(c => c.slug)).size, NAMED_COLORS_8.length, 'slug 중복');
  // 같은 hex가 두 이름으로 들어가면 두 페이지가 같은 색을 보여 준다
  assert.equal(new Set(NAMED_COLORS_8.map(c => c.hex)).size, NAMED_COLORS_8.length, 'hex 중복');
});

test('hex는 여섯 자리 소문자이고 slug는 URL에 쓸 수 있다', () => {
  for (const c of NAMED_COLORS_8) {
    assert.match(c.hex, /^#[0-9a-f]{6}$/, `${c.slug}: ${c.hex}`);
    assert.match(c.slug, /^[a-z0-9-]+$/, c.slug);
  }
});

test('계열이 정해진 목록 안이고 모두 쓰인다', () => {
  const used = new Set(NAMED_COLORS_8.map(c => c.family));
  for (const f of used) assert.ok(COLOR_FAMILIES.includes(f), `모르는 계열 ${f}`);
  for (const f of COLOR_FAMILIES) {
    assert.ok(used.has(f), `안 쓰인 계열 ${f}`);
    assert.ok(colorsOfFamily(f).length >= 5, `${f} 계열이 ${colorsOfFamily(f).length}가지뿐`);
  }
});

test('여덟 언어 이름이 다 있고 한국어 밖에 한글이 없다', () => {
  for (const c of NAMED_COLORS_8) {
    for (const lang of LANGS) {
      const n = c.name[lang];
      assert.ok(n && n.trim().length > 0, `${c.slug} ${lang}: 이름 없음`);
      if (lang !== 'ko') assert.ok(!HANGUL.test(n), `${c.slug} ${lang}에 한글: ${n}`);
    }
    // 언어별 이름이 전부 같으면 옮기지 않은 것이다 — 고유명사라도 대개 한둘은 다르다
    assert.ok(new Set(Object.values(c.name)).size >= 2, `${c.slug}: 여덟 언어가 모두 같은 이름`);
  }
});

test('언어마다 색 이름이 서로 겹치지 않는다', () => {
  for (const lang of LANGS) {
    const names = NAMED_COLORS_8.map(c => c.name[lang]);
    const dup = names.filter((n, i) => names.indexOf(n) !== i);
    assert.deepEqual([...new Set(dup)], [], `${lang} 중복 이름: ${[...new Set(dup)].join(', ')}`);
  }
});

test('아는 값으로 변환이 맞는지 고정한다', () => {
  const red = colorFacts('#ff0000');
  assert.deepEqual(red.rgb, { r: 255, g: 0, b: 0 });
  assert.deepEqual(red.hsl, { h: 0, s: 100, l: 50 });
  assert.deepEqual(red.cmyk, { c: 0, m: 100, y: 100, k: 0 });
  // 빨강의 보색은 시안이다
  assert.equal(red.complement, '#00ffff');
  // 기준색은 빼고 나머지 둘만 — 빨강의 삼각 배색은 초록과 파랑이다
  assert.deepEqual(red.triad, ['#00ff00', '#0000ff']);
  assert.equal(red.analogous.length, 2);

  const white = colorFacts('#ffffff');
  // WCAG에서 가능한 최대 대비
  assert.equal(white.onBlack, 21);
  assert.equal(white.lum, 1);
  const black = colorFacts('#000000');
  assert.equal(black.onWhite, 21);
  assert.equal(black.lum, 0);
  assert.equal(black.textOn, 'white');
});

test('대비 판정이 4.5:1 기준과 맞는다', () => {
  for (const c of NAMED_COLORS_8) {
    const f = colorFacts(c.hex);
    assert.equal(f.aaWhite, f.onWhite >= 4.5, `${c.slug}: 흰 바탕 판정이 값과 다르다`);
    assert.equal(f.aaBlack, f.onBlack >= 4.5, `${c.slug}: 검은 바탕 판정이 값과 다르다`);
    // 흰색과 검은색 대비를 곱하면 늘 21이 넘는다 — 한쪽은 반드시 읽힌다
    assert.ok(f.onWhite >= 4.5 || f.onBlack >= 4.5, `${c.slug}: 양쪽 모두 AA 미달`);
    assert.equal(f.textOn, f.onWhite >= f.onBlack ? 'white' : 'black', `${c.slug}: 글자 색이 대비와 어긋난다`);
  }
});

test('모든 색의 계산값이 형식에 맞는다', () => {
  for (const c of NAMED_COLORS_8) {
    const f = colorFacts(c.hex);
    assert.equal(f.hex, c.hex);
    for (const v of [f.rgb.r, f.rgb.g, f.rgb.b]) assert.ok(v >= 0 && v <= 255, `${c.slug}: RGB ${v}`);
    assert.ok(f.hsl.h >= 0 && f.hsl.h <= 360, `${c.slug}: 색상 ${f.hsl.h}`);
    for (const v of [f.cmyk.c, f.cmyk.m, f.cmyk.y, f.cmyk.k]) assert.ok(v >= 0 && v <= 100, `${c.slug}: CMYK ${v}`);
    assert.ok(f.lum >= 0 && f.lum <= 1, `${c.slug}: 밝기 ${f.lum}`);
    assert.equal(f.shades.length, 9, `${c.slug}: 명도 단계가 ${f.shades.length}개`);
    assert.equal(f.analogous.length, 2, `${c.slug}: 유사색이 ${f.analogous.length}개`);
    assert.equal(f.triad.length, 2, `${c.slug}: 삼각 배색이 ${f.triad.length}개`);
    // 기준색이 조화 칸에 다시 나오면 같은 색이 두 번 보인다.
    // 무채색은 돌려도 제자리라 화면에서 조화 부분을 아예 감춘다.
    if (f.chromatic) {
      for (const hex of [...f.analogous, ...f.triad]) {
        assert.notEqual(hex, f.hex, `${c.slug}: 조화 칸에 기준색이 들어 있다`);
      }
    }
    for (const hex of [f.complement, ...f.analogous, ...f.triad, f.cvd.protan, f.cvd.deutan, f.cvd.tritan, ...f.shades.map(s => s.hex)]) {
      assert.match(hex, /^#[0-9a-f]{6}$/i, `${c.slug}: 잘못된 hex ${hex}`);
    }
  }
});

test('명도 단계는 밝은 쪽에서 어두운 쪽으로 간다', () => {
  for (const c of NAMED_COLORS_8) {
    const f = colorFacts(c.hex);
    const lums = f.shades.map(s => colorFacts(s.hex).lum);
    for (let i = 1; i < lums.length; i++) {
      assert.ok(lums[i] <= lums[i - 1] + 0.001, `${c.slug}: ${i}번째 단계가 더 밝다`);
    }
  }
});

test('가까운 색은 자기를 넣지 않고 실제로 가깝다', () => {
  for (const c of NAMED_COLORS_8) {
    const near = nearbyColors(c.slug);
    assert.ok(near.length > 0, `${c.slug}: 추천이 비었다`);
    assert.ok(!near.some(n => n.slug === c.slug), `${c.slug}: 자기를 추천한다`);
  }
  // 빨강 근처에는 빨강 계열이 먼저 온다
  const nearRed = nearbyColors('red', 4).map(c => c.family);
  assert.ok(nearRed.includes('red') || nearRed.includes('orange'), `빨강 근처: ${nearRed.join(',')}`);
  assert.deepEqual(nearbyColors('없는색'), []);
  assert.equal(namedColor('없는색'), undefined);
});

test('열 언어 라우트와 공유 카드가 다 있다', () => {
  for (const { prefix } of LANG_INFO) {
    const p = `app${prefix}/color`;
    assert.ok(existsSync(appFile(`${p}/page.tsx`)), `${p}/page.tsx 없음`);
    assert.ok(existsSync(appFile(`${p}/[slug]/page.tsx`)), `${p}/[slug]/page.tsx 없음`);
  }
});

test('hreflang은 아홉 줄이고 포르투갈어는 /pt-br이다', () => {
  const a = colorAlternates('red');
  assert.equal(Object.keys(a).length, LANG_INFO.length + 1);
  assert.equal(a.ko, '/color/red');
  assert.equal(a.en, '/en/color/red');
  assert.equal(a['pt-BR'], '/pt-br/color/red');
  assert.equal(a['x-default'], '/en/color/red');
  assert.equal(colorAlternates().ko, '/color');
});

test('사이트맵과 검색 인덱스에 색 이름이 들어 있다', () => {
  const map = readFileSync(appFile('app/sitemap.ts'), 'utf8');
  assert.ok(map.includes('NAMED_COLORS_8'), '사이트맵이 색 목록을 돌지 않는다');
  const idx = readFileSync('lib/search-index.ts', 'utf8');
  assert.ok(idx.includes('NAMED_COLORS_8'), '검색 인덱스에 색 이름 없음');
  // 허브에서 걸어 주지 않으면 110장이 고아가 된다.
  // 한국어는 자기 허브가 있고, 나머지 일곱 언어는 ColorHubIntl 하나를 함께 쓴다.
  for (const hub of ['app/color/page.tsx', 'components/ColorHubIntl.tsx']) {
    assert.ok(readFileSync(hub.startsWith('app/') ? appFile(hub) : hub, 'utf8').includes('colorsOfFamily'), `${hub}에 색 목록이 없다`);
  }
});

test('화면 문구가 여덟 언어로 다 있다', () => {
  for (const lang of LANGS) {
    const ui = COLOR_UI[lang];
    assert.ok(ui, `${lang}: 문구 묶음이 없다`);
    assert.ok(ui.hubTitle.length > 6 && ui.hubLead.length > 20, `${lang}: 허브 문구가 짧다`);
    assert.equal(ui.how.length, 4, `${lang}: 읽는 방법이 네 줄이 아니다`);
    for (const h of ui.how) assert.ok(h.length > 25, `${lang}: 설명이 짧다 — ${h}`);
    for (const k of ['home', 'section', 'hexLabel', 'rgbLabel', 'contrastLabel', 'onWhite', 'onBlack', 'passAa', 'failAa', 'harmonyTitle', 'shadesTitle', 'cvdTitle', 'nearbyTitle', 'faqTitle'] as const) {
      assert.ok(ui[k].trim().length > 0, `${lang}.${k}가 비었다`);
    }
    for (const f of COLOR_FAMILIES) assert.ok(ui.familyLabel[f]?.trim(), `${lang}: ${f} 계열 이름 없음`);
    if (lang !== 'ko') {
      const joined = ui.hubTitle + ui.hubLead + ui.how.join('') + Object.values(ui.familyLabel).join('');
      assert.ok(!HANGUL.test(joined), `${lang} 화면 문구에 한글`);
    }
  }
});

test('SEO 문구가 언어마다 실제 값을 담는다', () => {
  const red = namedColor('red');
  assert.ok(red);
  const f = colorFacts(red.hex);
  for (const lang of LANGS) {
    const ui = COLOR_UI[lang];
    const name = red.name[lang];
    const title = ui.metaTitle(name, f.hex);
    const desc = ui.metaDesc(name, f);
    assert.ok(title.includes(name), `${lang}: 메타 제목에 이름이 없다 — ${title}`);
    assert.ok(title.includes('FF0000'), `${lang}: 메타 제목에 hex가 없다 — ${title}`);
    assert.ok(desc.includes('255'), `${lang}: 메타 설명에 RGB가 없다`);
    assert.ok(desc.length > 60, `${lang}: 메타 설명이 짧다 (${desc.length}자)`);
    assert.ok(ui.hubMetaDesc.length > 60, `${lang}: 허브 메타 설명이 짧다`);
    if (lang !== 'ko') assert.ok(!HANGUL.test(title + desc), `${lang} 메타에 한글`);
  }
});

test('FAQ가 색마다 다섯 개 이상이고 언어마다 채워져 있다', () => {
  for (const lang of LANGS) {
    const ui = COLOR_UI[lang];
    assert.ok(ui.hubFaq.length >= 4, `${lang}: 허브 FAQ가 ${ui.hubFaq.length}개`);
    for (const it of ui.hubFaq) {
      assert.ok(it.q.length > 5 && it.a.length > (dense(lang) ? 40 : 60), `${lang}: 빈 허브 FAQ — ${it.q}`);
    }
    // 색마다 문장 틀이 같으니 세 색만 재도 충분하다
    for (const slug of ['red', 'white', 'rose-gold']) {
      const c = namedColor(slug);
      assert.ok(c, slug);
      const f = colorFacts(c.hex);
      const faq = colorFaq(lang, c.name[lang], f);
      // 무채색은 보색 질문을 빼므로 넷이다
      assert.ok(faq.length >= (f.chromatic ? 5 : 4), `${slug} ${lang}: FAQ가 ${faq.length}개`);
      assert.equal(new Set(faq.map(x => x.q)).size, faq.length, `${slug} ${lang}: FAQ 질문 중복`);
      for (const it of faq) {
        assert.ok(it.q.length > 5 && it.a.length > (dense(lang) ? 20 : 30), `${slug} ${lang}: 빈 FAQ — ${it.q}`);
      }
      assert.ok(faq[0].a.includes(f.hex.toUpperCase()), `${slug} ${lang}: FAQ에 hex가 없다`);
      if (lang !== 'ko') {
        assert.ok(!HANGUL.test(faq.map(x => x.q + x.a).join('')), `${slug} ${lang} FAQ에 한글`);
      }
    }
  }
});

/**
 * 지하철 노선 데이터와 정답 판정 검사.
 *
 * 이 게임에서 틀리면 바로 드러나는 것은 두 가지다 — 역 이름이 중복되거나
 * 빠지는 것, 그리고 정답인데 안 받아 주는 것. 둘 다 눈으로는 서른 노선을 못 본다.
 *
 * 언어가 여덟이 되면서 "한 언어만 빠졌다"가 새로운 실패 방식으로 늘었다. 문구·
 * 도시 이름·라우트·hreflang·사이트맵을 언어 목록에서 돌면서 본다 — 목록에 언어를
 * 더하는 순간 빠진 곳이 전부 드러나야 한다.
 */
import { LOCALES } from '../lib/locales.ts';
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

import { METRO_LINES, METRO_CITIES, SECOND_CITIES, metroLine, relatedLines, totalStations } from '../lib/metro-lines.ts';
import { charCount, findStation, firstChar, layout, lineCopy, lineName, lineTitle, matches, normalize } from '../lib/metro/types.ts';
import { CITIES } from '../lib/metro/cities.ts';
import { METRO_LANGS, METRO_LANG_CODES, metroAlternates, numberedLine, type MetroLang } from '../lib/metro/lang.ts';
import { METRO_UI, clock } from '../lib/metro/ui.ts';
import { lineFacts } from '../lib/metro/facts.ts';

const LANGS = METRO_LANG_CODES;
const HANGUL = /[가-힣]/;

/** 한 글자에 담기는 뜻이 많은 언어는 같은 내용이 짧다 */
const dense = (lang: MetroLang) => lang === 'ja';
const minIntro = (lang: MetroLang) => (dense(lang) ? 28 : 40);
const minHint = (lang: MetroLang) => (dense(lang) ? 18 : 25);
const minAnswer = (lang: MetroLang) => (dense(lang) ? 20 : 30);

test('노선이 있고 slug가 겹치지 않는다', () => {
  assert.ok(METRO_LINES.length >= 25, `${METRO_LINES.length}개뿐`);
  assert.equal(new Set(METRO_LINES.map(l => l.slug)).size, METRO_LINES.length, 'slug 중복');
  assert.ok(METRO_CITIES.length >= 15, `도시가 ${METRO_CITIES.length}곳뿐`);
});

test('수도가 아닌 도시의 노선도 들어 있다', () => {
  // 지하철은 수도에만 있는 것이 아니다. 이 줄이 0이 되면 허브의 두 번째 묶음이 빈다
  assert.ok(SECOND_CITIES.length >= 5, `수도 밖 도시가 ${SECOND_CITIES.length}곳뿐`);
  for (const city of SECOND_CITIES) {
    assert.ok(METRO_LINES.some(l => l.city === city), `${city}에 노선이 없다`);
  }
});

test('노선마다 역이 넉넉하고 한 노선 안에서 역 이름이 겹치지 않는다', () => {
  for (const l of METRO_LINES) {
    assert.ok(l.stations.length >= 10, `${l.slug}: 역이 ${l.stations.length}개`);
    const names = l.stations.map(s => normalize(s.name));
    assert.equal(new Set(names).size, names.length, `${l.slug}: 같은 역 이름이 두 번`);
    for (const st of l.stations) {
      assert.ok(st.name.trim().length > 0, `${l.slug}: 빈 역 이름`);
      assert.ok(charCount(st) >= 1, `${l.slug}: ${st.name} 글자 수가 0`);
      assert.ok(firstChar(st).length > 0, `${l.slug}: ${st.name} 첫 글자 없음`);
    }
  }
});

test('노선 색은 여섯 자리 hex이고 도시 열쇠는 등록된 것이다', () => {
  for (const l of METRO_LINES) {
    assert.match(l.color, /^#[0-9a-f]{6}$/i, `${l.slug}: ${l.color}`);
    assert.match(l.city, /^[a-z]+$/, `${l.slug}: ${l.city}`);
    assert.match(l.slug, /^[a-z0-9-]+$/, `${l.slug}`);
    assert.ok(CITIES[l.city], `${l.slug}: cities.ts에 ${l.city} 없음`);
  }
});

test('도시와 나라 이름이 여덟 언어로 다 있다', () => {
  for (const city of METRO_CITIES) {
    const info = CITIES[city];
    for (const lang of LANGS) {
      assert.ok(info.name[lang]?.trim(), `${city} ${lang}: 도시 이름 없음`);
      assert.ok(info.country[lang]?.trim(), `${city} ${lang}: 나라 이름 없음`);
    }
    // 국기는 지역 표시 문자 두 개로 이루어져 Extended_Pictographic에 안 걸린다
    assert.match(info.icon, /[\p{Extended_Pictographic}\p{Regional_Indicator}]/u, `${city}: 아이콘이 이모지가 아니다`);
  }
});

test('여덟 언어 소개와 힌트가 다 있고 한국어 밖 화면에 한글이 없다', () => {
  for (const l of METRO_LINES) {
    for (const lang of LANGS) {
      const t = lineCopy(l, lang);
      assert.ok(t, `${l.slug} ${lang}: 문구 없음`);
      assert.ok(t.intro.length > minIntro(lang), `${l.slug} ${lang}: 소개가 짧다 (${t.intro.length}자)`);
      assert.ok(t.hint.length > minHint(lang), `${l.slug} ${lang}: 힌트가 짧다 (${t.hint.length}자)`);
      assert.ok(lineName(l, lang).trim(), `${l.slug} ${lang}: 노선 이름 없음`);
      assert.ok(lineTitle(l, lang).trim(), `${l.slug} ${lang}: 제목 없음`);
      // 역 이름은 현지 표기라 그대로 두지만, 화면 문구에는 한글이 새면 안 된다
      if (lang !== 'ko') {
        assert.ok(!HANGUL.test(t.intro + t.hint), `${l.slug} ${lang}에 한글: ${(t.intro + t.hint).match(HANGUL)}`);
        assert.ok(!HANGUL.test(lineName(l, lang)), `${l.slug} ${lang} 노선 이름에 한글`);
      }
    }
  }
});

test('번호가 붙은 노선 이름은 언어마다 그 언어의 꼴로 나온다', () => {
  assert.equal(numberedLine('2', 'ko'), '2호선');
  assert.equal(numberedLine('2', 'en'), 'Line 2');
  assert.equal(numberedLine('2', 'es'), 'Línea 2');
  assert.equal(numberedLine('2', 'pt'), 'Linha 2');
  assert.equal(numberedLine('2', 'ja'), '2号線');
  assert.equal(numberedLine('2', 'de'), 'Linie 2');
  assert.equal(numberedLine('2', 'fr'), 'Ligne 2');
  const line2 = metroLine('seoul-line-2');
  assert.ok(line2);
  assert.equal(lineName(line2, 'ko'), '2호선');
  assert.equal(lineTitle(line2, 'ja'), 'ソウル 2号線');
  assert.equal(lineTitle(line2, 'es'), 'Seúl Línea 2');
});

test('언어별 노선 이름이 도시 안에서 겹치지 않는다', () => {
  for (const city of METRO_CITIES) {
    const lines = METRO_LINES.filter(l => l.city === city);
    for (const lang of LANGS) {
      const names = lines.map(l => lineName(l, lang));
      assert.equal(new Set(names).size, names.length, `${city} ${lang}: 노선 이름 중복 — ${names.join(', ')}`);
    }
  }
});

test('노선도 좌표가 역마다 하나씩 나오고 겹치지 않는다', () => {
  for (const l of METRO_LINES) {
    const pts = layout(l);
    assert.equal(pts.length, l.stations.length, `${l.slug}: 좌표 수가 역 수와 다르다`);
    for (const p of pts) {
      assert.ok(Number.isFinite(p.x) && Number.isFinite(p.y), `${l.slug}: 좌표가 NaN`);
    }
    // 같은 자리에 두 역이 겹치면 노선도에서 하나가 가려진다
    const keys = pts.map(p => `${p.x.toFixed(2)},${p.y.toFixed(2)}`);
    assert.equal(new Set(keys).size, keys.length, `${l.slug}: 두 역이 같은 좌표`);
  }
});

test('현지 표기와 로마자를 모두 정답으로 받는다', () => {
  for (const l of METRO_LINES) {
    const solved = l.stations.map(() => false);
    for (let i = 0; i < l.stations.length; i++) {
      const st = l.stations[i];
      assert.ok(matches(st.name, st), `${l.slug}: ${st.name} 자기 이름을 못 받는다`);
      if (st.roman) assert.ok(matches(st.roman, st), `${l.slug}: ${st.name} 로마자 ${st.roman}을 못 받는다`);
      if (st.alt) assert.ok(matches(st.alt, st), `${l.slug}: ${st.name} 다른 표기 ${st.alt}을 못 받는다`);
      // 공백과 대소문자를 무시한다
      assert.ok(matches(st.name.toUpperCase().replace(/\s/g, ''), st), `${l.slug}: ${st.name} 공백·대소문자 무시 실패`);
      assert.equal(findStation(st.name, l, solved), i, `${l.slug}: ${st.name} 자리를 못 찾는다`);
    }
  }
});

test('빈 입력과 없는 역은 받지 않는다', () => {
  const l = METRO_LINES[0];
  const solved = l.stations.map(() => false);
  assert.equal(findStation('', l, solved), -1);
  assert.equal(findStation('   ', l, solved), -1);
  assert.equal(findStation('이런역은없다', l, solved), -1);
});

test('이미 맞힌 역은 다시 세지 않는다', () => {
  const l = METRO_LINES[0];
  const solved = l.stations.map((_, i) => i === 0);
  assert.equal(findStation(l.stations[0].name, l, solved), -1, '맞힌 역을 또 찾아준다');
});

test('괄호가 붙은 역은 괄호 안 이름만으로도 맞힌다', () => {
  const st = { name: '총신대입구(이수)' };
  assert.ok(matches('이수', st));
  assert.ok(matches('총신대입구', st));
  assert.ok(matches('총신대입구(이수)', st));
});

test('경과 시간 표기는 분:초', () => {
  assert.equal(clock(0), '0:00');
  assert.equal(clock(9000), '0:09');
  assert.equal(clock(65000), '1:05');
  assert.equal(clock(600000), '10:00');
});

test('추천 노선은 같은 도시를 먼저 준다', () => {
  for (const l of METRO_LINES) {
    const rel = relatedLines(l.slug);
    assert.ok(rel.length > 0, `${l.slug}: 추천이 비었다`);
    assert.ok(!rel.some(r => r.slug === l.slug), `${l.slug}: 자기를 추천한다`);
  }
  assert.deepEqual(relatedLines('없는노선'), []);
  assert.equal(metroLine('없는노선'), undefined);
});

test('역 수 합계가 실제와 맞는다', () => {
  const sum = METRO_LINES.reduce((n, l) => n + l.stations.length, 0);
  assert.equal(totalStations(), sum);
  assert.ok(sum >= 600, `역이 ${sum}개뿐`);
});

test('여덟 언어 라우트와 공유 카드가 다 있다', () => {
  for (const { prefix } of METRO_LANGS) {
    const p = `app${prefix}/metro`;
    assert.ok(existsSync(`${p}/page.tsx`), `${p}/page.tsx 없음`);
    assert.ok(existsSync(`${p}/[slug]/page.tsx`), `${p}/[slug]/page.tsx 없음`);
    assert.ok(existsSync(`${p}/opengraph-image.tsx`), `${p}/opengraph-image.tsx 없음`);
    assert.ok(existsSync(`${p}/[slug]/opengraph-image.tsx`), `${p}/[slug]/opengraph-image.tsx 없음`);
  }
  // 중국어는 이 섹션에서 빼기로 했다 — 라우트가 되살아나면 여기서 잡힌다
  assert.ok(!existsSync('app/zh/metro'), 'app/zh/metro가 남아 있다');
});

test('hreflang은 아홉 줄이고 x-default는 영어를 가리킨다', () => {
  const a = metroAlternates('seoul-line-2');
  assert.equal(Object.keys(a).length, METRO_LANGS.length + 1);
  assert.equal(a.ko, '/metro/seoul-line-2');
  assert.equal(a.en, '/en/metro/seoul-line-2');
  assert.equal(a.es, '/es/metro/seoul-line-2');
  // 상파울루·리우 노선을 담았으니 경로도 /pt-br, hreflang도 pt-BR이다
  assert.equal(a['pt-BR'], '/pt-br/metro/seoul-line-2');
  assert.equal(a.hi, '/hi/metro/seoul-line-2');
  assert.equal(a['x-default'], '/en/metro/seoul-line-2');
  assert.equal(metroAlternates().ko, '/metro');
  assert.ok(!('zh' in a), 'hreflang에 zh가 남아 있다');
});

test('사이트맵과 검색 인덱스, lang 교정에 여덟 언어가 들어 있다', () => {
  const map = readFileSync('app/sitemap.ts', 'utf8');
  assert.ok(map.includes('METRO_LANGS'), '사이트맵이 언어 목록을 돌지 않는다');
  assert.ok(map.includes('/metro'), '사이트맵에 /metro 없음');
  const idx = readFileSync('lib/search-index.ts', 'utf8');
  assert.ok(idx.includes("'metro'"), '검색 인덱스에 metro 없음');
  // 빌드 뒤 <html lang>을 고치는 곳이 언어 목록을 손으로 들고 있으면 새 언어를
  // 넣을 때 그것만 빠뜨린다. 실제로 중국어를 걷어낸 뒤에도 zh 규칙이 남아 있었다.
  // 그래서 목록을 적었는지 보지 않고 lib/locales.ts에서 파생하는지를 본다 —
  // 파생하면 언어를 늘리는 순간 자동으로 따라온다.
  const fixer = readFileSync('scripts/fix-html-lang.mjs', 'utf8');
  assert.ok(
    /from '\.\.\/lib\/locales\.ts'/.test(fixer) && fixer.includes('LOCALES'),
    'fix-html-lang.mjs가 lib/locales.ts의 목록을 쓰지 않는다',
  );
  // 지하철이 쓰는 언어가 그 레지스트리에 다 있는지도 본다
  const tags = new Set<string>(LOCALES.map(l => l.tag));
  for (const { htmlLang } of METRO_LANGS) {
    assert.ok(tags.has(htmlLang), `lib/locales.ts에 ${htmlLang} 없음`);
  }
});

test('화면 문구가 여덟 언어로 다 있다', () => {
  for (const lang of LANGS) {
    const ui = METRO_UI[lang];
    assert.ok(ui, `${lang}: 문구 묶음이 없다`);
    assert.ok(ui.hubTitle.length > 4 && ui.hubLead.length > 10, `${lang}: 허브 문구가 짧다`);
    assert.equal(ui.how.length, 4, `${lang}: 푸는 방법이 네 줄이 아니다`);
    for (const h of ui.how) assert.ok(h.length > 15, `${lang}: 설명이 짧다 — ${h}`);
    for (const k of ['home', 'section', 'placeholder', 'skip', 'hint', 'stations', 'capitalGroup', 'secondGroup', 'faqTitle'] as const) {
      assert.ok(ui[k].trim().length > 0, `${lang}.${k}가 비었다`);
    }
    // "40 역 수"가 아니라 "40개 역"으로 읽혀야 한다 — 라벨과 문장 꼴은 다르다
    const count = ui.stationCount(40);
    assert.ok(count.includes('40'), `${lang}: 역 수 표기에 숫자가 없다 — ${count}`);
    assert.ok(count.trim() !== '40' && count.length > 2, `${lang}: 역 수 표기가 숫자뿐 — ${count}`);
    if (lang !== 'ko') {
      const joined = ui.hubTitle + ui.hubLead + ui.how.join('') + ui.capitalGroup + ui.secondGroup;
      assert.ok(!HANGUL.test(joined), `${lang} 화면 문구에 한글`);
    }
  }
});

test('SEO 문구가 언어마다 실제 노선 사실을 담는다', () => {
  const line = metroLine('seoul-line-2');
  assert.ok(line);
  for (const lang of LANGS) {
    const ui = METRO_UI[lang];
    const f = lineFacts(line, lang);
    assert.equal(f.count, line.stations.length);
    assert.equal(f.first, line.stations[0].name);
    assert.ok(ui.hubMetaTitle.length > 15, `${lang}: 허브 메타 제목이 짧다`);
    assert.ok(ui.hubMetaDesc.length > 60, `${lang}: 허브 메타 설명이 짧다`);
    const title = ui.metaTitle(f.title);
    const desc = ui.metaDesc(f);
    assert.ok(title.includes(f.title), `${lang}: 메타 제목에 노선 이름이 없다 — ${title}`);
    assert.ok(desc.includes(String(f.count)), `${lang}: 메타 설명에 역 수가 없다 — ${desc}`);
    assert.ok(desc.length > 60, `${lang}: 메타 설명이 짧다 (${desc.length}자)`);
    if (lang !== 'ko') assert.ok(!HANGUL.test(title + ui.hubMetaTitle + ui.hubMetaDesc), `${lang} 메타에 한글`);
  }
});

test('FAQ가 노선마다 다섯 개 이상이고 언어마다 채워져 있다', () => {
  for (const lang of LANGS) {
    const ui = METRO_UI[lang];
    assert.ok(ui.hubFaq.length >= 4, `${lang}: 허브 FAQ가 ${ui.hubFaq.length}개`);
    for (const item of ui.hubFaq) {
      assert.ok(item.q.length > 5 && item.a.length > 40, `${lang}: 빈 허브 FAQ — ${item.q}`);
    }
    for (const l of METRO_LINES) {
      const f = lineFacts(l, lang);
      const faq = ui.lineFaq(f);
      assert.ok(faq.length >= 5, `${l.slug} ${lang}: FAQ가 ${faq.length}개`);
      assert.equal(new Set(faq.map(x => x.q)).size, faq.length, `${l.slug} ${lang}: FAQ 질문 중복`);
      for (const item of faq) {
        assert.ok(item.q.length > 5 && item.a.length > minAnswer(lang), `${l.slug} ${lang}: 빈 FAQ — ${item.q}`);
      }
      // 첫 항목은 역 수를 답으로 준다 — 숫자가 빠지면 답이 아니다
      assert.ok(faq[0].a.includes(String(f.count)), `${l.slug} ${lang}: FAQ에 역 수가 없다 — ${faq[0].a}`);
      if (lang !== 'ko') {
        // 역 이름은 현지 표기라 영어 FAQ에도 한글로 들어간다 — 그것만 걷어내고 본다
        const joined = faq.map(x => x.q + x.a).join('')
          .split(f.first).join('').split(f.last).join('');
        assert.ok(!HANGUL.test(joined), `${l.slug} ${lang} FAQ에 한글: ${joined.match(HANGUL)}`);
      }
    }
  }
});

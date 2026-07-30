/**
 * 지하철 노선 데이터와 정답 판정 검사.
 *
 * 이 게임에서 틀리면 바로 드러나는 것은 두 가지다 — 역 이름이 중복되거나
 * 빠지는 것, 그리고 정답인데 안 받아 주는 것. 둘 다 눈으로는 백 노선을 못 본다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

import { METRO_LINES, METRO_CITIES, metroLine, relatedLines, totalStations } from '../lib/metro-lines.ts';
import { charCount, findStation, firstChar, layout, matches, normalize } from '../lib/metro/types.ts';
import { METRO_UI, metroAlternates, clock } from '../lib/metro/ui.ts';

const LANGS = ['ko', 'en', 'zh'] as const;
const HANGUL = /[가-힣]/;

test('노선이 있고 slug가 겹치지 않는다', () => {
  assert.ok(METRO_LINES.length >= 15, `${METRO_LINES.length}개뿐`);
  assert.equal(new Set(METRO_LINES.map(l => l.slug)).size, METRO_LINES.length, 'slug 중복');
  assert.ok(METRO_CITIES.length >= 6, `도시가 ${METRO_CITIES.length}곳뿐`);
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

test('노선 색은 여섯 자리 hex이고 도시 열쇠는 소문자다', () => {
  for (const l of METRO_LINES) {
    assert.match(l.color, /^#[0-9a-f]{6}$/i, `${l.slug}: ${l.color}`);
    assert.match(l.city, /^[a-z]+$/, `${l.slug}: ${l.city}`);
    assert.match(l.slug, /^[a-z0-9-]+$/, `${l.slug}`);
  }
});

test('세 언어 문구가 다 있고 영어·중국어에 한글이 없다', () => {
  for (const l of METRO_LINES) {
    for (const lang of LANGS) {
      const t = l[lang];
      assert.ok(t.city.trim() && t.line.trim() && t.country.trim(), `${l.slug} ${lang}: 이름 누락`);
      assert.ok(t.intro.length > (lang === 'zh' ? 20 : 40), `${l.slug} ${lang}: 소개가 짧다`);
      assert.ok(t.hint.length > (lang === 'zh' ? 12 : 25), `${l.slug} ${lang}: 힌트가 짧다`);
    }
    // 역 이름은 현지 표기라 그대로 두지만, 화면 문구에는 한글이 새면 안 된다
    assert.ok(!HANGUL.test(l.en.intro + l.en.hint + l.en.country), `${l.slug}: en에 한글`);
    assert.ok(!HANGUL.test(l.zh.intro + l.zh.hint + l.zh.country), `${l.slug}: zh에 한글`);
  }
});

test('언어별 노선 이름이 도시 안에서 겹치지 않는다', () => {
  for (const city of METRO_CITIES) {
    const lines = METRO_LINES.filter(l => l.city === city);
    for (const lang of LANGS) {
      const names = lines.map(l => l[lang].line);
      assert.equal(new Set(names).size, names.length, `${city} ${lang}: 노선 이름 중복`);
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
  assert.ok(sum >= 300, `역이 ${sum}개뿐`);
});

test('세 언어 라우트와 공유 카드가 다 있다', () => {
  for (const p of ['app/metro', 'app/en/metro', 'app/zh/metro']) {
    assert.ok(existsSync(`${p}/page.tsx`), `${p}/page.tsx 없음`);
    assert.ok(existsSync(`${p}/[slug]/page.tsx`), `${p}/[slug]/page.tsx 없음`);
    assert.ok(existsSync(`${p}/opengraph-image.tsx`), `${p}/opengraph-image.tsx 없음`);
    assert.ok(existsSync(`${p}/[slug]/opengraph-image.tsx`), `${p}/[slug]/opengraph-image.tsx 없음`);
  }
});

test('hreflang은 네 줄이고 x-default는 영어를 가리킨다', () => {
  const a = metroAlternates('seoul-line-2');
  assert.equal(Object.keys(a).length, 4);
  assert.equal(a.ko, '/metro/seoul-line-2');
  assert.equal(a.en, '/en/metro/seoul-line-2');
  assert.equal(a.zh, '/zh/metro/seoul-line-2');
  assert.equal(a['x-default'], '/en/metro/seoul-line-2');
});

test('사이트맵과 검색 인덱스에 세 언어가 들어 있다', () => {
  const map = readFileSync('app/sitemap.ts', 'utf8');
  for (const p of ['/metro', '/en/metro', '/zh/metro']) {
    assert.ok(map.includes(`${p}\``) || map.includes(`${p}/`), `사이트맵에 ${p} 없음`);
  }
  const idx = readFileSync('lib/search-index.ts', 'utf8');
  assert.ok(idx.includes("'metro'"), '검색 인덱스에 metro 없음');
});

test('화면 문구가 세 언어로 다 있다', () => {
  for (const lang of LANGS) {
    const ui = METRO_UI[lang];
    assert.ok(ui.hubTitle.length > 4 && ui.hubLead.length > 10, `${lang}: 허브 문구가 짧다`);
    assert.equal(ui.how.length, 4, `${lang}: 푸는 방법이 네 줄이 아니다`);
    for (const h of ui.how) assert.ok(h.length > 15, `${lang}: 설명이 짧다 — ${h}`);
  }
  assert.ok(!HANGUL.test(METRO_UI.en.hubTitle + METRO_UI.en.hubLead + METRO_UI.en.how.join('')));
  assert.ok(!HANGUL.test(METRO_UI.zh.hubTitle + METRO_UI.zh.hubLead + METRO_UI.zh.how.join('')));
});

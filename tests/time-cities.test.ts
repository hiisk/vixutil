/**
 * 도시 시계 검사.
 *
 * 시간대는 눈으로 틀린 것을 알 수 없다. 오프셋이 한 시간 어긋나도 화면은 멀쩡하고,
 * 서머타임을 거꾸로 적어도 반년은 맞는 값이 나온다. 그래서 아는 답을 박아 둔다 —
 * 서울 +09:00 서머타임 없음, 뉴욕 겨울 −05:00 여름 −04:00, 카트만두 +05:45,
 * 애리조나(피닉스)는 서머타임 없음, 시드니는 1월이 여름이라 +11:00.
 *
 * 시간대 이름 자체도 검사가 지킨다 — 116곳을 모두 Intl로 계산해 보므로 오타나
 * 없어진 시간대는 바로 드러난다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

import { LANGS8, LANG8_CODES, type Lang8 } from '../lib/i18n/lang.ts';
import {
  TIME_CITIES, TIME_COUNTRIES, TIME_REGIONS, citiesOfRegion, timeCity, timeCountry, zoneRegion,
} from '../lib/time/cities8.ts';
import { cityFacts, gapLabel, gapMinutes, offsetLabel, sameZoneCities, timeFacts, usesDst } from '../lib/time/facts.ts';
import { TIME_UI, timeAlternates } from '../lib/time/ui.ts';

const LANGS = LANG8_CODES;
const HANGUL = /[가-힣]/;
const dense = (lang: Lang8) => lang === 'ja';
const facts = (slug: string) => {
  const c = timeCity(slug);
  assert.ok(c, `${slug} 없음`);
  return timeFacts(c);
};

test('도시가 100곳을 넘고 slug가 겹치지 않는다', () => {
  assert.ok(TIME_CITIES.length >= 100, `${TIME_CITIES.length}곳뿐`);
  assert.equal(new Set(TIME_CITIES.map(c => c.slug)).size, TIME_CITIES.length, 'slug 중복');
  assert.ok(Object.keys(TIME_COUNTRIES).length >= 40, '나라가 모자라다');
});

test('slug는 URL에 쓸 수 있고 나라 열쇠가 등록돼 있다', () => {
  for (const c of TIME_CITIES) {
    assert.match(c.slug, /^[a-z0-9-]+$/, c.slug);
    assert.ok(TIME_COUNTRIES[c.country], `${c.slug}: 나라 ${c.country}가 없다`);
  }
});

test('시간대 이름이 실제로 존재한다', () => {
  // Intl이 모르는 이름이면 던진다 — 오타나 폐기된 시간대가 여기서 걸린다
  for (const c of TIME_CITIES) {
    assert.doesNotThrow(
      () => new Intl.DateTimeFormat('en', { timeZone: c.zone }).format(new Date(0)),
      `${c.slug}: 없는 시간대 ${c.zone}`,
    );
    assert.match(c.zone, /^[A-Za-z_]+\/[A-Za-z_/-]+$/, `${c.slug}: 시간대 꼴이 이상하다 ${c.zone}`);
  }
});

test('아는 오프셋과 서머타임이 맞는다', () => {
  assert.equal(facts('seoul').standardLabel, '+09:00');
  assert.equal(facts('seoul').dst, false);
  assert.equal(facts('tokyo').standardLabel, '+09:00');
  // 뉴욕은 겨울 −5, 여름 −4
  assert.equal(facts('new-york').standardLabel, '-05:00');
  assert.equal(facts('new-york').summerLabel, '-04:00');
  assert.equal(facts('new-york').dst, true);
  assert.equal(facts('london').standardLabel, '+00:00');
  assert.equal(facts('london').summerLabel, '+01:00');
  // 45분 단위 시간대
  assert.equal(facts('kathmandu').standardLabel, '+05:45');
  assert.equal(facts('delhi').standardLabel, '+05:30');
  // 애리조나는 서머타임을 쓰지 않는다 — 같은 미국이라도 갈린다
  assert.equal(facts('phoenix').dst, false);
  assert.equal(facts('los-angeles').dst, true);
  // 남반구는 계절이 반대라 1월이 여름이다
  assert.equal(facts('sydney').standardLabel, '+11:00');
  assert.equal(facts('sydney').summerLabel, '+10:00');
  assert.equal(facts('sydney').dst, true);
});

test('오프셋 표기와 서머타임 판정이 계산과 맞는다', () => {
  assert.equal(offsetLabel(540), '+09:00');
  assert.equal(offsetLabel(-300), '-05:00');
  assert.equal(offsetLabel(345), '+05:45');
  assert.equal(offsetLabel(0), '+00:00');
  for (const c of TIME_CITIES) {
    const f = timeFacts(c);
    assert.equal(f.dst, usesDst(c.zone), `${c.slug}: 서머타임 판정이 갈린다`);
    assert.equal(f.dst, f.standardMinutes !== f.summerMinutes, `${c.slug}: 판정과 값이 어긋난다`);
    // 서머타임은 대개 한 시간이고, 30분·2시간인 곳도 있지만 그 범위를 넘지 않는다
    if (f.dst) assert.ok(f.dstShift >= 30 && f.dstShift <= 120, `${c.slug}: 서머타임 ${f.dstShift}분`);
    // 지구에서 쓰는 오프셋은 −12:00에서 +14:00 사이다
    assert.ok(f.standardMinutes >= -720 && f.standardMinutes <= 840, `${c.slug}: 오프셋 ${f.standardMinutes}분`);
    // 음수에서 %는 -0을 주고 strictEqual은 Object.is라 -0 !== 0이다
    assert.equal(Math.abs(f.standardMinutes) % 15, 0, `${c.slug}: 오프셋이 15분 단위가 아니다`);
  }
});

test('시차가 부호와 분까지 맞는다', () => {
  const seoul = timeCity('seoul');
  const ny = timeCity('new-york');
  const kathmandu = timeCity('kathmandu');
  assert.ok(seoul && ny && kathmandu);
  // 서울이 뉴욕보다 14시간 빠르다
  assert.equal(gapMinutes(seoul, ny), 840);
  assert.equal(gapLabel(gapMinutes(seoul, ny)), '+14:00');
  assert.equal(gapLabel(gapMinutes(ny, seoul)), '−14:00');
  // 45분 단위가 뭉개지지 않는다
  assert.equal(gapLabel(gapMinutes(kathmandu, seoul)), '−3:15');
  assert.equal(gapLabel(0), '+0:00');
});

test('같은 시간대 도시는 시차가 0이다', () => {
  const seoul = timeCity('seoul');
  const busan = timeCity('busan');
  assert.ok(seoul && busan);
  assert.equal(gapMinutes(seoul, busan), 0);
  for (const c of TIME_CITIES) {
    const near = sameZoneCities(c);
    assert.ok(!near.some(n => n.slug === c.slug), `${c.slug}: 자기를 추천한다`);
    for (const n of near) {
      assert.ok(Math.abs(gapMinutes(n, c)) <= 60, `${c.slug} ↔ ${n.slug}: 시차가 ${gapMinutes(n, c)}분`);
    }
  }
});

test('갈래가 시간대 앞머리에서 나오고 모두 쓰인다', () => {
  for (const c of TIME_CITIES) {
    assert.ok(TIME_REGIONS.includes(zoneRegion(c)), `${c.slug}: 모르는 갈래 ${zoneRegion(c)}`);
  }
  for (const r of TIME_REGIONS) {
    assert.ok(citiesOfRegion(r).length > 0, `${r} 갈래가 비었다`);
  }
  // 갈래를 다 합치면 전체가 된다 — 어느 도시도 목록에서 빠지지 않는다
  const sum = TIME_REGIONS.reduce((n, r) => n + citiesOfRegion(r).length, 0);
  assert.equal(sum, TIME_CITIES.length, '갈래 합계가 전체와 다르다');
});

test('여덟 언어 도시·나라 이름이 다 있고 문자가 섞이지 않는다', () => {
  for (const c of TIME_CITIES) {
    for (const lang of LANGS) {
      const n = c.name[lang];
      assert.ok(n && n.trim().length > 0, `${c.slug} ${lang}: 이름 없음`);
      if (lang !== 'ko') assert.ok(!HANGUL.test(n), `${c.slug} ${lang}에 한글: ${n}`);
    }
    // 힌디 이름에 라틴 문자가 섞이면 옮기다 만 것이다
    assert.ok(!/[A-Za-z]/.test(c.name.hi), `${c.slug}: 힌디 이름에 라틴 문자 — ${c.name.hi}`);
    assert.ok(new Set(Object.values(c.name)).size >= 2, `${c.slug}: 여덟 언어가 모두 같은 이름`);
  }
  for (const [code, country] of Object.entries(TIME_COUNTRIES)) {
    for (const lang of LANGS) {
      assert.ok(country.name[lang]?.trim(), `${code} ${lang}: 나라 이름 없음`);
      if (lang !== 'ko') assert.ok(!HANGUL.test(country.name[lang]), `${code} ${lang} 나라 이름에 한글`);
    }
    assert.ok(country.flag.length > 0, `${code}: 국기 없음`);
  }
});

test('한 언어 안에서 도시 이름이 겹치지 않는다', () => {
  for (const lang of LANGS) {
    const names = TIME_CITIES.map(c => c.name[lang]);
    const dup = [...new Set(names.filter((n, i) => names.indexOf(n) !== i))];
    assert.deepEqual(dup, [], `${lang} 중복 도시 이름: ${dup.join(', ')}`);
  }
});

test('여덟 언어 라우트와 공유 카드가 다 있다', () => {
  for (const { prefix } of LANGS8) {
    const p = `app${prefix}/time`;
    assert.ok(existsSync(`${p}/page.tsx`), `${p}/page.tsx 없음`);
    assert.ok(existsSync(`${p}/[slug]/page.tsx`), `${p}/[slug]/page.tsx 없음`);
    assert.ok(existsSync(`${p}/[slug]/opengraph-image.tsx`), `${p}/[slug]/opengraph-image.tsx 없음`);
  }
});

test('hreflang은 아홉 줄이고 포르투갈어는 /pt-br이다', () => {
  const a = timeAlternates('new-york');
  assert.equal(Object.keys(a).length, LANGS8.length + 1);
  assert.equal(a.ko, '/time/new-york');
  assert.equal(a['pt-BR'], '/pt-br/time/new-york');
  assert.equal(a['x-default'], '/en/time/new-york');
  assert.equal(timeAlternates().ko, '/time');
});

test('사이트맵·검색·허브에 도시가 걸려 있다', () => {
  const map = readFileSync('app/sitemap.ts', 'utf8');
  assert.ok(map.includes('TIME_CITIES'), '사이트맵이 도시 목록을 돌지 않는다');
  const idx = readFileSync('lib/search-index.ts', 'utf8');
  assert.ok(idx.includes('TIME_CITIES'), '검색 인덱스에 도시 없음');
  for (const hub of ['app/time/page.tsx', 'components/TimeHubIntl.tsx']) {
    assert.ok(readFileSync(hub, 'utf8').includes('citiesOfRegion'), `${hub}에 도시 목록이 없다`);
  }
});

test('현재 시각은 브라우저에서만 그린다', () => {
  // 서버에서 계산하면 빌드 시각이 굳고 하이드레이션이 깨진다
  const clock = readFileSync('components/time/CityClock.tsx', 'utf8');
  assert.ok(clock.startsWith("'use client'"), 'CityClock이 클라이언트 컴포넌트가 아니다');
  assert.ok(clock.includes('useEffect'), '마운트 뒤에 시각을 채우지 않는다');
  const page = readFileSync('components/CityTimePage.tsx', 'utf8');
  assert.ok(!page.includes('new Date()'), '페이지가 서버에서 현재 시각을 만든다');
});

test('화면 문구가 여덟 언어로 다 있다', () => {
  for (const lang of LANGS) {
    const ui = TIME_UI[lang];
    assert.ok(ui, `${lang}: 문구 묶음이 없다`);
    assert.ok(ui.hubTitle.length > 6 && ui.hubLead.length > 20, `${lang}: 허브 문구가 짧다`);
    assert.equal(ui.how.length, 4, `${lang}: 읽는 방법이 네 줄이 아니다`);
    for (const h of ui.how) assert.ok(h.length > 25, `${lang}: 설명이 짧다 — ${h}`);
    for (const k of ['home', 'section', 'nowLabel', 'zoneLabel', 'standardLabel', 'summerLabel', 'dstLabel', 'dstYes', 'dstNo', 'gapTitle', 'gapNote', 'sameZoneTitle', 'faqTitle'] as const) {
      assert.ok(ui[k].trim().length > 0, `${lang}.${k}가 비었다`);
    }
    for (const r of TIME_REGIONS) assert.ok(ui.regionLabel[r]?.trim(), `${lang}: ${r} 갈래 이름 없음`);
    // 단위까지 그 언어여야 한다 — "사용 (60min)"처럼 영어가 섞이면 안 된다
    const m = ui.minuteLabel(60);
    assert.ok(m.includes('60') && m.trim() !== '60', `${lang}: 분 단위 표기가 없다 — ${m}`);
    if (lang !== 'ko') {
      const joined = ui.hubTitle + ui.hubLead + ui.how.join('') + Object.values(ui.regionLabel).join('');
      assert.ok(!HANGUL.test(joined), `${lang} 화면 문구에 한글`);
    }
  }
});

test('SEO 문구가 언어마다 실제 값을 담는다', () => {
  const city = timeCity('new-york');
  assert.ok(city);
  for (const lang of LANGS) {
    const ui = TIME_UI[lang];
    const f = cityFacts(city, lang);
    assert.equal(f.gaps.length, 4, '기준 도시가 넷이 아니다');
    const title = ui.metaTitle(f.city);
    const desc = ui.metaDesc(f);
    assert.ok(title.includes(f.city), `${lang}: 메타 제목에 도시가 없다 — ${title}`);
    assert.ok(desc.includes('America/New_York'), `${lang}: 메타 설명에 시간대가 없다`);
    assert.ok(desc.includes('-05:00'), `${lang}: 메타 설명에 오프셋이 없다`);
    assert.ok(desc.length > 60, `${lang}: 메타 설명이 짧다 (${desc.length}자)`);
    assert.ok(ui.hubMetaDesc.length > 60, `${lang}: 허브 메타 설명이 짧다`);
    if (lang !== 'ko') assert.ok(!HANGUL.test(title + desc), `${lang} 메타에 한글`);
  }
});

test('FAQ가 도시마다 다섯 개 이상이고 언어마다 채워져 있다', () => {
  for (const lang of LANGS) {
    const ui = TIME_UI[lang];
    assert.ok(ui.hubFaq.length >= 4, `${lang}: 허브 FAQ가 ${ui.hubFaq.length}개`);
    for (const it of ui.hubFaq) {
      assert.ok(it.q.length > 5 && it.a.length > (dense(lang) ? 40 : 60), `${lang}: 빈 허브 FAQ — ${it.q}`);
    }
    // 서머타임을 쓰는 곳과 안 쓰는 곳, 45분 단위까지 한 번씩 본다
    for (const slug of ['new-york', 'seoul', 'kathmandu']) {
      const city = timeCity(slug);
      assert.ok(city, slug);
      const f = cityFacts(city, lang);
      const faq = ui.cityFaq(f);
      assert.ok(faq.length >= 5, `${slug} ${lang}: FAQ가 ${faq.length}개`);
      assert.equal(new Set(faq.map(x => x.q)).size, faq.length, `${slug} ${lang}: FAQ 질문 중복`);
      for (const it of faq) {
        assert.ok(it.q.length > 5 && it.a.length > (dense(lang) ? 20 : 30), `${slug} ${lang}: 빈 FAQ — ${it.q}`);
      }
      assert.ok(faq[1].a.includes(f.gaps[0].label), `${slug} ${lang}: FAQ에 시차가 없다`);
      if (lang !== 'ko') {
        assert.ok(!HANGUL.test(faq.map(x => x.q + x.a).join('')), `${slug} ${lang} FAQ에 한글`);
      }
    }
  }
});

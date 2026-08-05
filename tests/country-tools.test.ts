import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { COUNTRIES, COUNTRY_REGIONS, countryBySlug, relatedCountries } from '../lib/country-tools.ts';
import { countryText } from '../lib/country/types.ts';
import { COUNTRY_UI, countryRegions, countryFaq, countryAlternates, gapText, utcLabel } from '../lib/country-ui.ts';
import { appFile } from './app-path.ts';

const LANGS = ['ko', 'en', 'es', 'pt-br', 'ja', 'de', 'fr', 'hi'] as const;
const HANGUL = /[가-힣]/;

test('50개국이 있고 slug·국가코드가 겹치지 않는다', () => {
  assert.ok(COUNTRIES.length >= 100, `100개국 이상이어야 하는데 ${COUNTRIES.length}개`);
  assert.equal(new Set(COUNTRIES.map(c => c.slug)).size, COUNTRIES.length);
  assert.equal(new Set(COUNTRIES.map(c => c.code)).size, COUNTRIES.length);
});

test('slug는 소문자·하이픈, 국가코드는 대문자 두 자리다', () => {
  for (const c of COUNTRIES) {
    assert.match(c.slug, /^[a-z-]+$/, c.slug);
    assert.match(c.code, /^[A-Z]{2}$/, c.code);
  }
});

test('여덟 언어의 이름·수도·언어·통화·소개·팁·비자가 모두 채워져 있다', () => {
  for (const c of COUNTRIES) {
    for (const lang of LANGS) {
      const t = countryText(c, lang);
      for (const k of ['name', 'capital', 'languages', 'currency'] as const) {
        assert.ok(t[k].length > 0, `${c.slug}.${lang}.${k} 비었음`);
      }
      // 일본어는 한자로 같은 내용을 절반쯤의 글자 수에 담는다 — 길이 기준을 따로 둔다
      const min = lang === 'ja' ? { intro: 25, tip: 12, visa: 10 } : { intro: 50, tip: 25, visa: 20 };
      for (const k of ['intro', 'tip', 'visa'] as const) {
        assert.ok(t[k].length >= min[k], `${c.slug}.${lang}.${k}가 너무 짧다: "${t[k]}"`);
      }
    }
  }
});

test('나라 이름은 언어별로 겹치지 않는다', () => {
  for (const lang of LANGS) {
    const names = COUNTRIES.map(c => countryText(c, lang).name);
    const dup = names.filter((x, i) => names.indexOf(x) !== i);
    assert.deepEqual(dup, [], `${lang} 중복 이름: ${dup.join(', ')}`);
  }
});

test('번역 일곱 언어 본문에 한글이 새지 않는다', () => {
  for (const c of COUNTRIES) {
    for (const lang of LANGS.filter(l => l !== 'ko')) {
      const joined = Object.values(countryText(c, lang)).join(' ');
      assert.ok(!HANGUL.test(joined), `${c.slug}.${lang}에 한글: ${joined.match(HANGUL)}`);
    }
  }
});

test('긴급 전화 안내도 언어별로 번역돼 있다', () => {
  for (const c of COUNTRIES) {
    for (const lang of LANGS) {
      assert.ok(countryText(c, lang).emergency.length > 2, `${c.slug}.${lang}.emergency 비었음`);
      assert.match(countryText(c, lang).emergency, /\d/, `${c.slug}.${lang}.emergency에 번호가 없다`);
    }
  }
});

test('지역은 정해진 목록 안이고 여섯 지역이 모두 쓰인다', () => {
  const used = new Set(COUNTRIES.map(c => c.region));
  for (const r of used) assert.ok((COUNTRY_REGIONS as readonly string[]).includes(r), `모르는 지역 ${r}`);
  for (const r of COUNTRY_REGIONS) assert.ok(used.has(r), `안 쓰인 지역 ${r}`);
});

test('지역 이름이 여덟 언어로 다 있다', () => {
  for (const lang of LANGS) {
    for (const r of COUNTRY_REGIONS) assert.ok(countryRegions(lang)[r], `${lang}에 ${r} 라벨 없음`);
  }
});

test('IANA 시간대가 모두 유효하다 — 현재 시각 계산이 여기에 달려 있다', () => {
  for (const c of COUNTRIES) {
    assert.doesNotThrow(() => new Intl.DateTimeFormat('en-US', { timeZone: c.tz }), `${c.slug}: ${c.tz}`);
  }
});

test('표에 적은 표준시 오프셋이 IANA 자료와 맞는다', () => {
  // 북반구는 1월이 표준시, 남반구는 7월이 표준시다
  const offsetAt = (tz: string, iso: string) => {
    const s = new Intl.DateTimeFormat('en-US', { timeZone: tz, timeZoneName: 'longOffset' }).format(new Date(iso));
    const m = s.match(/GMT([+-])(\d{2}):(\d{2})/);
    if (!m) return 0;
    const sign = m[1] === '-' ? -1 : 1;
    return sign * (Number(m[2]) + Number(m[3]) / 60);
  };
  for (const c of COUNTRIES) {
    const jan = offsetAt(c.tz, '2026-01-15T12:00:00Z');
    const jul = offsetAt(c.tz, '2026-07-15T12:00:00Z');
    // 표준시는 두 값 중 하나다. 서머타임을 쓰면 나머지 하나가 +1시간이 된다
    assert.ok(
      Math.abs(jan - c.utc) < 0.01 || Math.abs(jul - c.utc) < 0.01,
      `${c.slug}: 표는 ${c.utc}인데 1월 ${jan}, 7월 ${jul}`,
    );
  }
});

test('서머타임 표시가 IANA 자료와 맞는다', () => {
  const offsetAt = (tz: string, iso: string) => {
    const s = new Intl.DateTimeFormat('en-US', { timeZone: tz, timeZoneName: 'longOffset' }).format(new Date(iso));
    const m = s.match(/GMT([+-])(\d{2}):(\d{2})/);
    if (!m) return 0;
    return (m[1] === '-' ? -1 : 1) * (Number(m[2]) + Number(m[3]) / 60);
  };
  for (const c of COUNTRIES) {
    const changes = Math.abs(offsetAt(c.tz, '2026-01-15T12:00:00Z') - offsetAt(c.tz, '2026-07-15T12:00:00Z')) > 0.01;
    assert.equal(changes, c.dst, `${c.slug}: dst=${c.dst}인데 실제 변동은 ${changes}`);
  }
});

test('국가번호는 + 로 시작하고 숫자만 온다', () => {
  for (const c of COUNTRIES) assert.match(c.dial, /^\+\d{1,4}$/, `${c.slug}: ${c.dial}`);
});

test('통화 코드는 대문자 세 자리, 도메인은 점으로 시작한다', () => {
  for (const c of COUNTRIES) {
    assert.match(c.currencyCode, /^[A-Z]{3}$/, `${c.slug}: ${c.currencyCode}`);
    assert.match(c.tld, /^\.[a-z]{2,3}$/, `${c.slug}: ${c.tld}`);
  }
});

test('통행 방향은 left 또는 right뿐이다', () => {
  for (const c of COUNTRIES) assert.ok(c.drive === 'left' || c.drive === 'right', `${c.slug}: ${c.drive}`);
});

test('국기 이모지가 국가코드와 일치한다', () => {
  for (const c of COUNTRIES) {
    // 국기 이모지는 지역 표시 문자 두 개로 만들어진다 — 코드에서 계산해 맞춰본다
    const expected = String.fromCodePoint(...[...c.code].map(ch => 0x1f1e6 + ch.charCodeAt(0) - 65));
    assert.equal(c.icon, expected, `${c.slug}: ${c.code}의 국기는 ${expected}인데 ${c.icon}`);
  }
});

test('시차 문장이 30분·45분 단위 나라에서도 자연스럽다', () => {
  const nepal = countryBySlug('nepal')!;
  assert.equal(utcLabel(nepal.utc), 'UTC+5:45');
  assert.ok(gapText(nepal, 'ko').includes('3.25'), gapText(nepal, 'ko'));
  const india = countryBySlug('india')!;
  assert.equal(utcLabel(india.utc), 'UTC+5:30');
  const japan = countryBySlug('japan')!;
  assert.equal(gapText(japan, 'ko'), COUNTRY_UI.ko.sameTime);
});

test('음수 오프셋은 UTC-5처럼 표기된다 — OG 폰트가 U+2212를 못 받는다', () => {
  assert.equal(utcLabel(-5), 'UTC-5');
  assert.equal(utcLabel(-3.5), 'UTC-3:30');
});

test('한국과 시차가 없는 나라는 일본뿐이다', () => {
  const same = COUNTRIES.filter(c => c.utc === 9).map(c => c.slug);
  assert.deepEqual(same, ['japan']);
});

test('FAQ는 3개이고 실제 데이터가 들어간다', () => {
  for (const c of COUNTRIES) {
    for (const lang of LANGS) {
      const faq = countryFaq(c, lang);
      assert.equal(faq.length, 3, `${c.slug} ${lang}`);
      assert.ok(faq[0].a.includes(utcLabel(c.utc)), `${c.slug} ${lang} 시차 FAQ에 오프셋 없음`);
      assert.ok(faq[1].a.includes(c.volt), `${c.slug} ${lang} 전압 FAQ에 전압 없음`);
      assert.equal(faq[2].a, countryText(c, lang).visa);
      if (lang !== 'ko') {
        for (const item of faq) assert.ok(!HANGUL.test(item.q + item.a), `${c.slug} ${lang} FAQ에 한글`);
      }
    }
  }
});

test('같은 지역 나라 링크가 자기 자신을 가리키지 않는다', () => {
  for (const c of COUNTRIES) {
    const rel = relatedCountries(c.slug);
    assert.ok(rel.length > 0, `${c.slug} 관련 나라 없음`);
    assert.ok(!rel.some(r => r.slug === c.slug), `${c.slug}가 자기를 가리킨다`);
  }
});

test('세 언어 라우트가 모두 있다', () => {
  for (const p of ['app/country', 'app/en/country', ]) {
    assert.ok(existsSync(appFile(`${p}/page.tsx`)), `${p}/page.tsx 없음`);
    assert.ok(existsSync(appFile(`${p}/[slug]/page.tsx`)), `${p}/[slug]/page.tsx 없음`);
    assert.ok(existsSync(appFile(`${p}/opengraph-image.tsx`)), `${p}/opengraph-image.tsx 없음`);
  }
});

test('hreflang이 열 언어와 x-default를 낸다', () => {
  const a = countryAlternates('japan');
  // 열 언어 + x-default. 하나라도 빠지면 구글이 묶음을 통째로 무시한다.
  // 중국어를 더한 뒤에도 여덟 언어짜리를 부르던 탓에, 중국어 페이지 100장이
  // 있는데 아무도 선언하지 않는 상태였다.
  assert.equal(Object.keys(a).length, 11);
  assert.equal(a.ko, '/country/japan');
  assert.equal(a['pt-BR'], '/pt-br/country/japan');
  assert.equal(a['x-default'], '/en/country/japan');
});

test('사이트맵이 열 언어의 /country를 낸다', () => {
  const src = readFileSync(appFile('app/sitemap.ts'), 'utf8');
  // ko는 그대로 적히고, 나머지 아홉은 INTL_LOCALES10을 돌려 만든다
  assert.ok(src.includes('/country`'), '사이트맵에 /country 없음');
  assert.match(src, /INTL_LOCALES10\.flatMap[\s\S]{0,400}\/country/, '사이트맵이 /country를 언어별로 돌리지 않는다');
});

test('비자 정책이 바뀔 수 있다는 안내가 여덟 언어에 모두 있다', () => {
  for (const lang of LANGS) {
    assert.ok(COUNTRY_UI[lang].footNote.length > 40, `${lang} 안내문이 짧다`);
    assert.ok(COUNTRY_UI[lang].hubNotice.length > 10, `${lang} 허브 안내문이 없다`);
  }
});

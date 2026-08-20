import { test } from 'node:test';
import assert from 'node:assert/strict';
import { easter, holidaysOf, type CountryDef } from '../lib/holidays/engine.ts';
import { DE } from '../lib/holidays/de.ts';
import { FR } from '../lib/holidays/fr.ts';
import { ES } from '../lib/holidays/es.ts';
import { BR } from '../lib/holidays/br.ts';

/**
 * 나라별 공휴일 표 — 독일·프랑스·스페인·브라질.
 *
 * 규칙이 «그럴듯한» 날짜를 내는지는 눈으로 못 본다. 그래서 최근 세 해의 목록을
 * 통째로, 세상에 알려진 실제 날짜로 못 박는다. 규칙 하나가 하루라도 밀리면
 * deepEqual이 그 줄에서 터진다.
 *
 * 기준: 2025·2026·2027년 부활절은 각각 4월 20일·4월 5일·3월 28일이다.
 */

type Row = [slug: string, date: string];
const list = (c: CountryDef, y: number): Row[] =>
  holidaysOf(c, y).map(h => [h.slug, h.observed] as Row);

/* ── 독일 ── 전국 공휴일 아홉 ─────────────────────────────── */

const WANT_DE: Record<number, Row[]> = {
  2025: [
    ['neujahr', '2025-01-01'],
    ['karfreitag', '2025-04-18'],
    ['ostermontag', '2025-04-21'],
    ['tag-der-arbeit', '2025-05-01'],
    ['christi-himmelfahrt', '2025-05-29'],
    ['pfingstmontag', '2025-06-09'],
    ['tag-der-deutschen-einheit', '2025-10-03'],
    ['erster-weihnachtstag', '2025-12-25'],
    ['zweiter-weihnachtstag', '2025-12-26'],
  ],
  2026: [
    ['neujahr', '2026-01-01'],
    ['karfreitag', '2026-04-03'],
    ['ostermontag', '2026-04-06'],
    ['tag-der-arbeit', '2026-05-01'],
    ['christi-himmelfahrt', '2026-05-14'],
    ['pfingstmontag', '2026-05-25'],
    ['tag-der-deutschen-einheit', '2026-10-03'],
    ['erster-weihnachtstag', '2026-12-25'],
    ['zweiter-weihnachtstag', '2026-12-26'],
  ],
  2027: [
    ['neujahr', '2027-01-01'],
    ['karfreitag', '2027-03-26'],
    ['ostermontag', '2027-03-29'],
    ['tag-der-arbeit', '2027-05-01'],
    ['christi-himmelfahrt', '2027-05-06'],
    ['pfingstmontag', '2027-05-17'],
    ['tag-der-deutschen-einheit', '2027-10-03'],
    ['erster-weihnachtstag', '2027-12-25'],
    ['zweiter-weihnachtstag', '2027-12-26'],
  ],
};

/* ── 프랑스 ── 본토 법정 공휴일 열하나 ────────────────────── */

const WANT_FR: Record<number, Row[]> = {
  2025: [
    ['jour-de-l-an', '2025-01-01'],
    ['lundi-de-paques', '2025-04-21'],
    ['fete-du-travail', '2025-05-01'],
    ['victoire-1945', '2025-05-08'],
    ['ascension', '2025-05-29'],
    ['lundi-de-pentecote', '2025-06-09'],
    ['fete-nationale', '2025-07-14'],
    ['assomption', '2025-08-15'],
    ['toussaint', '2025-11-01'],
    ['armistice-1918', '2025-11-11'],
    ['noel', '2025-12-25'],
  ],
  2026: [
    ['jour-de-l-an', '2026-01-01'],
    ['lundi-de-paques', '2026-04-06'],
    ['fete-du-travail', '2026-05-01'],
    ['victoire-1945', '2026-05-08'],
    ['ascension', '2026-05-14'],
    ['lundi-de-pentecote', '2026-05-25'],
    ['fete-nationale', '2026-07-14'],
    ['assomption', '2026-08-15'],
    ['toussaint', '2026-11-01'],
    ['armistice-1918', '2026-11-11'],
    ['noel', '2026-12-25'],
  ],
  /* 2027년은 부활절이 일러서 승천일(5월 6일)이 종전 기념일(5월 8일)보다 앞선다 */
  2027: [
    ['jour-de-l-an', '2027-01-01'],
    ['lundi-de-paques', '2027-03-29'],
    ['fete-du-travail', '2027-05-01'],
    ['ascension', '2027-05-06'],
    ['victoire-1945', '2027-05-08'],
    ['lundi-de-pentecote', '2027-05-17'],
    ['fete-nationale', '2027-07-14'],
    ['assomption', '2027-08-15'],
    ['toussaint', '2027-11-01'],
    ['armistice-1918', '2027-11-11'],
    ['noel', '2027-12-25'],
  ],
};

/* ── 스페인 ── 전국 공휴일 열 ─────────────────────────────── */

const WANT_ES: Record<number, Row[]> = {
  2025: [
    ['ano-nuevo', '2025-01-01'],
    ['epifania-del-senor', '2025-01-06'],
    ['viernes-santo', '2025-04-18'],
    ['fiesta-del-trabajo', '2025-05-01'],
    ['asuncion-de-la-virgen', '2025-08-15'],
    ['fiesta-nacional', '2025-10-12'],
    ['todos-los-santos', '2025-11-01'],
    ['dia-de-la-constitucion', '2025-12-06'],
    ['inmaculada-concepcion', '2025-12-08'],
    ['navidad', '2025-12-25'],
  ],
  2026: [
    ['ano-nuevo', '2026-01-01'],
    ['epifania-del-senor', '2026-01-06'],
    ['viernes-santo', '2026-04-03'],
    ['fiesta-del-trabajo', '2026-05-01'],
    ['asuncion-de-la-virgen', '2026-08-15'],
    ['fiesta-nacional', '2026-10-12'],
    ['todos-los-santos', '2026-11-01'],
    ['dia-de-la-constitucion', '2026-12-06'],
    ['inmaculada-concepcion', '2026-12-08'],
    ['navidad', '2026-12-25'],
  ],
  2027: [
    ['ano-nuevo', '2027-01-01'],
    ['epifania-del-senor', '2027-01-06'],
    ['viernes-santo', '2027-03-26'],
    ['fiesta-del-trabajo', '2027-05-01'],
    ['asuncion-de-la-virgen', '2027-08-15'],
    ['fiesta-nacional', '2027-10-12'],
    ['todos-los-santos', '2027-11-01'],
    ['dia-de-la-constitucion', '2027-12-06'],
    ['inmaculada-concepcion', '2027-12-08'],
    ['navidad', '2027-12-25'],
  ],
};

/* ── 브라질 ── 연방 공휴일 열 (2024년부터) ────────────────── */

const WANT_BR: Record<number, Row[]> = {
  2025: [
    ['confraternizacao-universal', '2025-01-01'],
    ['sexta-feira-santa', '2025-04-18'],
    ['tiradentes', '2025-04-21'],
    ['dia-do-trabalho', '2025-05-01'],
    ['independencia', '2025-09-07'],
    ['nossa-senhora-aparecida', '2025-10-12'],
    ['finados', '2025-11-02'],
    ['proclamacao-da-republica', '2025-11-15'],
    ['consciencia-negra', '2025-11-20'],
    ['natal', '2025-12-25'],
  ],
  2026: [
    ['confraternizacao-universal', '2026-01-01'],
    ['sexta-feira-santa', '2026-04-03'],
    ['tiradentes', '2026-04-21'],
    ['dia-do-trabalho', '2026-05-01'],
    ['independencia', '2026-09-07'],
    ['nossa-senhora-aparecida', '2026-10-12'],
    ['finados', '2026-11-02'],
    ['proclamacao-da-republica', '2026-11-15'],
    ['consciencia-negra', '2026-11-20'],
    ['natal', '2026-12-25'],
  ],
  2027: [
    ['confraternizacao-universal', '2027-01-01'],
    ['sexta-feira-santa', '2027-03-26'],
    ['tiradentes', '2027-04-21'],
    ['dia-do-trabalho', '2027-05-01'],
    ['independencia', '2027-09-07'],
    ['nossa-senhora-aparecida', '2027-10-12'],
    ['finados', '2027-11-02'],
    ['proclamacao-da-republica', '2027-11-15'],
    ['consciencia-negra', '2027-11-20'],
    ['natal', '2027-12-25'],
  ],
};

const TABLES: [string, CountryDef, Record<number, Row[]>][] = [
  ['독일', DE, WANT_DE],
  ['프랑스', FR, WANT_FR],
  ['스페인', ES, WANT_ES],
  ['브라질', BR, WANT_BR],
];

for (const [name, country, want] of TABLES) {
  for (const y of [2025, 2026, 2027]) {
    test(`${name} ${y}년 공휴일이 알려진 날짜와 맞는다`, () => {
      assert.deepEqual(list(country, y), want[y]);
    });
  }
}

test('공휴일 개수가 그 나라의 알려진 개수와 같다', () => {
  /* 독일 9(전국) · 프랑스 11(본토) · 스페인 10(전국) · 브라질 10(2024~) */
  const COUNT: [string, CountryDef, number][] = [
    ['독일', DE, 9], ['프랑스', FR, 11], ['스페인', ES, 10], ['브라질', BR, 10],
  ];
  for (const [name, c, n] of COUNT) {
    assert.equal(c.holidays.length, n, `${name} 정의가 ${c.holidays.length}개다`);
    for (const y of [2025, 2026, 2027]) {
      assert.equal(holidaysOf(c, y).length, n, `${name} ${y}년이 ${n}개가 아니다`);
    }
  }
});

test('부활절 파생일이 그 해 부활절과 맞물린다', () => {
  /* offset을 나라 파일이 아니라 여기서 다시 적어 대조한다 — 양쪽이 같이 틀리기 어렵게 */
  const DERIVED: [CountryDef, string, number][] = [
    [DE, 'karfreitag', -2], [DE, 'ostermontag', 1],
    [DE, 'christi-himmelfahrt', 39], [DE, 'pfingstmontag', 50],
    [FR, 'lundi-de-paques', 1], [FR, 'ascension', 39], [FR, 'lundi-de-pentecote', 50],
    [ES, 'viernes-santo', -2],
    [BR, 'sexta-feira-santa', -2],
  ];
  for (const y of [2025, 2026, 2027]) {
    const e = easter(y).getTime();
    for (const [c, slug, off] of DERIVED) {
      const h = holidaysOf(c, y).find(x => x.slug === slug);
      assert.ok(h, `${c.code} ${y} ${slug}이 없다`);
      const days = (Date.parse(h.date) - e) / 86400000;
      assert.equal(days, off, `${c.code} ${y} ${slug}이 부활절 ${days}일차다`);
    }
  }
});

test('프랑스에는 성금요일이 없고 독일·스페인·브라질에는 있다', () => {
  /* 알자스-모젤을 뺀 본토 기준. 이 셋이 갈리는 지점이라 따로 못 박는다 */
  for (const y of [2025, 2026, 2027]) {
    const good = (c: CountryDef) => holidaysOf(c, y).some(h => h.date === toIso(easter(y), -2));
    assert.equal(good(FR), false, `${y} 프랑스에 성금요일이 들어갔다`);
    assert.equal(good(DE), true);
    assert.equal(good(ES), true);
    assert.equal(good(BR), true);
  }
  /* 성체축일(+60)은 네 나라 전국 목록 어디에도 없다 — 독일은 주별, 브라질은 재량일 */
  for (const y of [2025, 2026, 2027]) {
    for (const c of [DE, FR, ES, BR]) {
      assert.ok(
        !holidaysOf(c, y).some(h => h.date === toIso(easter(y), 60)),
        `${c.code} ${y}에 성체축일이 들어갔다`,
      );
    }
  }
});

function toIso(base: Date, offset: number): string {
  return new Date(base.getTime() + offset * 86400000).toISOString().slice(0, 10);
}

test('네 나라 모두 주말과 겹쳐도 옮기지 않는다', () => {
  for (const c of [DE, FR, ES, BR]) {
    for (let y = 2020; y <= 2035; y++) {
      for (const h of holidaysOf(c, y)) {
        assert.equal(h.moved, false, `${c.code} ${y} ${h.slug}이 ${h.observed}로 옮겨졌다`);
        assert.equal(h.observed, h.date);
      }
    }
  }
});

test('브라질 흑인 의식의 날은 2024년부터다', () => {
  /* Lei 14.759/2023 — 그전에는 연방 공휴일이 아니었다(일부 주·시만) */
  const has = (y: number) => holidaysOf(BR, y).some(h => h.slug === 'consciencia-negra');
  assert.equal(has(2023), false);
  assert.equal(has(2024), true);
  assert.equal(holidaysOf(BR, 2023).length, 9);
  assert.equal(holidaysOf(BR, 2024).length, 10);
  /* 2023년 목록에 11월 20일이 아예 없어야 한다 */
  assert.ok(!holidaysOf(BR, 2023).some(h => h.observed === '2023-11-20'));
});

test('독일 통일의 날은 1990년부터다', () => {
  assert.equal(holidaysOf(DE, 1989).length, 8);
  assert.equal(holidaysOf(DE, 1990).length, 9);
});

test('나라마다 slug가 겹치지 않고 코드가 맞다', () => {
  for (const [name, c] of [['독일', DE], ['프랑스', FR], ['스페인', ES], ['브라질', BR]] as const) {
    assert.equal(new Set(c.holidays.map(h => h.slug)).size, c.holidays.length, `${name} slug 중복`);
    for (const h of c.holidays) assert.match(h.slug, /^[a-z][a-z0-9-]*[a-z0-9]$/, `${name} ${h.slug}`);
  }
  assert.deepEqual([DE.code, FR.code, ES.code, BR.code], ['de', 'fr', 'es', 'br']);
});

test('이 검사가 실제로 문다', () => {
  /* 규칙을 하루 밀면 위의 표와 어긋나야 한다 */
  const shifted: CountryDef = {
    ...DE,
    holidays: DE.holidays.map(h =>
      h.slug === 'karfreitag' ? { ...h, rule: { kind: 'easter' as const, offset: -1 } } : h,
    ),
  };
  assert.notDeepEqual(list(shifted, 2026), WANT_DE[2026]);
  /* 고정일도 마찬가지 — 프랑스 혁명 기념일을 7월 15일로 밀면 어긋난다 */
  const fr15: CountryDef = {
    ...FR,
    holidays: FR.holidays.map(h =>
      h.slug === 'fete-nationale' ? { ...h, rule: { kind: 'fixed' as const, month: 7, day: 15 } } : h,
    ),
  };
  assert.notDeepEqual(list(fr15, 2026), WANT_FR[2026]);
  /* 하나를 빼면 개수 검사가 걸려야 한다 */
  assert.notEqual(holidaysOf({ ...ES, holidays: ES.holidays.slice(1) }, 2026).length, 10);
});

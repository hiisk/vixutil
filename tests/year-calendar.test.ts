/**
 * 달력 규칙이 스스로 어긋나지 않는지 본다.
 *
 * 요일은 체르의 공식으로 냈으므로, 검사는 Date 객체로 되짚는다 — 규칙에서
 * 뽑은 요일과 달력이 아는 요일이 201해 내내 같아야 한다. 서로 아주 다른 길이라
 * 공식을 잘못 옮기면 그 자리에서 갈린다.
 *
 * ISO 주 수도 마찬가지다. 코드는 "1월 1일이 목요일이거나 윤년의 수요일이면
 * 53주"라는 규칙으로 내는데, 검사는 그 해의 목요일을 하나씩 세어 본다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';

import { FIRST_YEAR, LAST_YEAR, YEARS, YEAR_ICON, YEAR_SLUGS, yearOf } from '../lib/year/list.ts';
import {
  BRANCHES, STEMS, decades, isLeap, isoWeeksOf, leapYears, longYears, monthDays,
  neighbours, skipped, weekdayOf, yearFacts,
} from '../lib/year/facts.ts';
import { YEAR_UI } from '../lib/year/ui.ts';
import { LANG_CODES } from '../lib/i18n/lang.ts';
import { DENSE } from './han.ts';

test('100가지가 넘고 주소가 겹치지 않는다', () => {
  assert.ok(YEARS.length >= 100, `${YEARS.length}가지뿐이다`);
  assert.equal(YEARS.length, LAST_YEAR - FIRST_YEAR + 1);
  assert.equal(new Set(YEAR_SLUGS).size, YEARS.length, 'slug 중복');
  assert.equal(yearOf('2026'), 2026);
  assert.equal(yearOf('1879'), undefined);
});

test('요일을 달력으로 되짚어도 같다', () => {
  for (const y of YEARS) {
    for (const [m, d] of [[1, 1], [2, 28], [3, 1], [7, 4], [12, 31]] as [number, number][]) {
      const mine = weekdayOf(y, m, d);
      const real = new Date(Date.UTC(y, m - 1, d)).getUTCDay();
      assert.equal(mine, real, `${y}-${m}-${d}: 공식은 ${mine}, 달력은 ${real}`);
    }
  }
  // 윤년의 2월 29일도 본다 — 공식이 갈리는 자리다
  for (const y of leapYears()) {
    assert.equal(weekdayOf(y, 2, 29), new Date(Date.UTC(y, 1, 29)).getUTCDay(), `${y}-02-29`);
  }
});

test('윤년 규칙이 세 갈래로 갈린다', () => {
  for (const y of YEARS) {
    const f = yearFacts(y);
    assert.equal(f.leap, new Date(Date.UTC(y, 1, 29)).getUTCMonth() === 1, `${y}: 달력과 윤년 판단이 다르다`);
    if (y % 400 === 0) assert.equal(f.rule, 'by400');
    else if (y % 100 === 0) assert.equal(f.rule, 'by100');
    else if (y % 4 === 0) assert.equal(f.rule, 'by4');
    else assert.equal(f.rule, 'not4');
    assert.equal(f.leap, f.rule === 'by4' || f.rule === 'by400', `${y}: 갈래와 윤년 여부가 어긋난다`);
  }
  assert.equal(isLeap(2000), true, '400으로 나뉘면 윤년');
  assert.equal(isLeap(1900), false, '100으로 나뉘면 윤년이 아니다');
  assert.equal(isLeap(2024), true);
  assert.equal(isLeap(2026), false);
  assert.deepEqual(skipped(), [1900, 2100], '4로 나뉘는데 윤년이 아닌 해');
  assert.equal(leapYears().length, 59, '241해 가운데 윤년');
});

test('달의 날 수를 더하면 그 해 날 수가 된다', () => {
  for (const y of YEARS) {
    const f = yearFacts(y);
    assert.equal(f.months.length, 12, `${y}: 달이 열둘이 아니다`);
    assert.equal(f.months.reduce((a, b) => a + b, 0), f.days, `${y}: 달을 더하면 ${f.days}일이 아니다`);
    assert.equal(f.days, f.leap ? 366 : 365);
    assert.equal(f.febDays, f.leap ? 29 : 28, `${y}: 2월 날 수가 다르다`);
    // 달력에게 물어도 같아야 한다 — 다음 달 0일이 이번 달 마지막 날이다
    for (let m = 0; m < 12; m++) {
      assert.equal(f.months[m], new Date(Date.UTC(y, m + 1, 0)).getUTCDate(), `${y}-${m + 1}: 날 수가 다르다`);
    }
  }
  assert.deepEqual(monthDays(2024)[1], 29);
  assert.deepEqual(monthDays(2026)[1], 28);
});

test('53주짜리 해는 목요일이 53번 든 해다', () => {
  for (const y of YEARS) {
    // 목요일을 하나씩 세어 본다 — 규칙과 아주 다른 길이다
    let thursdays = 0;
    for (let m = 1; m <= 12; m++) {
      for (let d = 1; d <= monthDays(y)[m - 1]; d++) if (weekdayOf(y, m, d) === 4) thursdays++;
    }
    assert.equal(isoWeeksOf(y), thursdays, `${y}: 규칙은 ${isoWeeksOf(y)}주인데 목요일은 ${thursdays}번이다`);
    assert.ok(isoWeeksOf(y) === 52 || isoWeeksOf(y) === 53, `${y}: 주 수가 52도 53도 아니다`);
  }
  assert.equal(isoWeeksOf(2026), 53, '2026년 1월 1일은 목요일이다');
  assert.equal(isoWeeksOf(2024), 52);
  assert.ok(longYears().includes(2026));
});

test('간지가 60년마다 돌아온다', () => {
  for (const y of YEARS) {
    const f = yearFacts(y);
    assert.ok(f.stem >= 0 && f.stem < 10, `${y}: 십간 자리가 벗어났다`);
    assert.ok(f.branch >= 0 && f.branch < 12, `${y}: 십이지 자리가 벗어났다`);
    // 60년 뒤는 같은 간지, 12년 뒤는 같은 띠다
    if (YEARS.includes(y + 60)) {
      const later = yearFacts(y + 60);
      assert.equal(later.stem, f.stem, `${y}: 60년 뒤 십간이 다르다`);
      assert.equal(later.branch, f.branch, `${y}: 60년 뒤 십이지가 다르다`);
    }
    if (YEARS.includes(y + 12)) assert.equal(yearFacts(y + 12).branch, f.branch, `${y}: 12년 뒤 띠가 다르다`);
    // 한 해 뒤는 반드시 한 칸씩 넘어간다
    if (YEARS.includes(y + 1)) {
      const next = yearFacts(y + 1);
      assert.equal(next.stem, (f.stem + 1) % 10, `${y}: 십간이 한 칸 넘어가지 않았다`);
      assert.equal(next.branch, (f.branch + 1) % 12, `${y}: 십이지가 한 칸 넘어가지 않았다`);
    }
  }
  // 손으로 아는 해들
  const named = (y: number) => STEMS[yearFacts(y).stem] + BRANCHES[yearFacts(y).branch];
  assert.equal(named(1984), '갑자', '1984년이 갑자년이다');
  assert.equal(named(2024), '갑진');
  assert.equal(named(2026), '병오');
  assert.equal(named(1900), '경자');
});

test('앞뒤 윤년을 짚는다', () => {
  for (const y of YEARS) {
    const f = yearFacts(y);
    if (f.prevLeap !== null) {
      assert.ok(isLeap(f.prevLeap) && f.prevLeap < y, `${y}: 앞 윤년이 이상하다`);
      for (let x = f.prevLeap + 1; x < y; x++) assert.ok(!isLeap(x), `${y}: ${x}를 건너뛰었다`);
    }
    if (f.nextLeap !== null) {
      assert.ok(isLeap(f.nextLeap) && f.nextLeap > y, `${y}: 다음 윤년이 이상하다`);
      for (let x = y + 1; x < f.nextLeap; x++) assert.ok(!isLeap(x), `${y}: ${x}를 건너뛰었다`);
    }
  }
  assert.equal(yearFacts(2120).nextLeap, null, '2120이 구간의 마지막 윤년이다');
  assert.equal(yearFacts(2026).nextLeap, 2028);
  assert.equal(yearFacts(2026).prevLeap, 2024);
  assert.equal(yearFacts(1880).prevLeap, null, '1880이 구간의 첫 윤년이다');
});

test('십 년 묶음이 241해를 빠짐없이 담는다', () => {
  const d = decades();
  assert.deepEqual(d.flatMap(x => x.years), YEARS, '빠지거나 순서가 다르다');
  assert.equal(d[0].from, 1880);
  assert.equal(d[d.length - 1].years.length, 1, '2120년만 남는 마지막 묶음');
  for (const y of YEARS) {
    const list = neighbours(y);
    assert.ok(!list.includes(y), `${y}: 이웃에 자기 자신이 있다`);
  }
});

test('언어끼리 글자가 섞이지 않는다', () => {
  const HAN_OK = new Set(['ja', 'zh', 'tw']);
  for (const lang of LANG_CODES) {
    const ui = YEAR_UI[lang];
    const strings = [
      ...Object.values(ui).filter((v): v is string => typeof v === 'string'),
      ...ui.how,
      ...ui.hubFaq.flatMap(q => [q.q, q.a]),
      ui.desc(yearFacts(2026)),
      ui.desc(yearFacts(2024)),
      ...ui.yearFaq(yearFacts(2026)).flatMap(q => [q.q, q.a]),
    ];
    for (const s of strings) {
      if (lang !== 'ko') assert.ok(!/[가-힣]/.test(s), `${lang}: 한글이 섞였다 — ${s}`);
      if (lang !== 'ja') assert.ok(!/[ぁ-んァ-ヶ]/.test(s), `${lang}: 가나가 섞였다 — ${s}`);
      if (!HAN_OK.has(lang)) assert.ok(!/[一-龯]/.test(s), `${lang}: 한자가 섞였다 — ${s}`);
      if (lang !== 'hi') assert.ok(!/[ऀ-ॿ]/.test(s), `${lang}: 데바나가리가 섞였다 — ${s}`);
    }
  }
});

test('요일·띠·간지 이름이 열 언어에 다 있다', () => {
  for (const lang of LANG_CODES) {
    const ui = YEAR_UI[lang];
    assert.equal(ui.weekdays.length, 7, `${lang}: 요일이 일곱이 아니다`);
    assert.equal(new Set(ui.weekdays).size, 7, `${lang}: 요일 이름이 겹친다`);
    assert.equal(ui.zodiac.length, 12, `${lang}: 띠가 열둘이 아니다`);
    assert.equal(new Set(ui.zodiac).size, 12, `${lang}: 띠 이름이 겹친다`);
    assert.equal(ui.stems.length, 10, `${lang}: 십간이 열이 아니다`);
    assert.equal(ui.branches.length, 12, `${lang}: 십이지가 열둘이 아니다`);
    for (const w of [...ui.weekdays, ...ui.zodiac, ...ui.stems, ...ui.branches]) {
      assert.ok(w.trim().length > 0, `${lang}: 빈 이름이 있다`);
    }
  }
  // 십이지와 띠는 자리마다 짝이 맞는다 — 자(子)가 쥐다
  assert.equal(YEAR_UI.ko.zodiac[0], '쥐');
  assert.equal(YEAR_UI.en.zodiac[0], 'Rat');
  assert.equal(YEAR_UI.ko.zodiac[yearFacts(2026).branch], '말', '2026년은 말띠다');
  assert.equal(YEAR_UI.en.zodiac[yearFacts(2024).branch], 'Dragon', '2024년은 용띠다');
});

test('열 언어 모두 문구가 채워져 있다', () => {
  for (const lang of LANG_CODES) {
    const ui = YEAR_UI[lang];
    const floor = DENSE.has(lang) ? 6 : 12;
    for (const [key, v] of Object.entries(ui)) {
      if (typeof v !== 'string') continue;
      assert.ok(v.trim().length > 0, `${lang}.${key}: 비어 있다`);
    }
    assert.ok(ui.hubLead.length >= (DENSE.has(lang) ? 20 : 35), `${lang}: hubLead가 짧다`);
    assert.equal(ui.how.length, 4, `${lang}: 읽는 방법이 네 줄이 아니다`);
    assert.equal(ui.hubFaq.length, 5, `${lang}: 질문이 다섯이 아니다`);
    for (const h of ui.how) assert.ok(h.length >= floor, `${lang}: 너무 짧다 — ${h}`);
    for (const q of ui.hubFaq) assert.ok(q.q.length >= floor && q.a.length >= floor * 2, `${lang}: 답이 짧다 — ${q.q}`);
    assert.equal(ui.yearFaq(yearFacts(2026)).length, 4, `${lang}: 낱장 질문이 넷이 아니다`);
    // 400은 이 표의 핵심 규칙이라 열 언어 모두에 적혀 있어야 한다
    assert.ok(ui.leapNote.includes('400'), `${lang}: 400년 규칙이 적혀 있지 않다`);
  }
});

test('연도 아이콘은 목록과 카드가 같은 그림을 쓴다', async () => {
  const { ICON_FOR } = await import('../lib/og-icon-map.ts');
  assert.ok(ICON_FOR[YEAR_ICON], '이모지가 아이콘으로 이어지지 않는다');
});

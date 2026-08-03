/**
 * 정규식 155가지를 실제로 돌려 본다.
 *
 * 이 자료는 눈으로 검사할 수 없다. 이메일 식이라며 올라온 것이 점 두 개짜리
 * 주소를 통과시키는지는 넣어 봐야 안다. 그래서 식마다 "맞아야 하는 보기"와
 * "맞으면 안 되는 보기"를 함께 두고, 여기서 전부 돌린다.
 *
 * 화면에 보이는 보기가 곧 여기서 쓰는 보기다. 설명과 식이 어긋난 채로 남을 수 없다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';

import { KINDS, PATTERNS, PATTERN_SLUGS, REGEX_ICON, patternOf, patternsOfKind } from '../lib/regex/list.ts';
import { countGroups, groupNames, regexFacts, siblingPatterns, tryPattern } from '../lib/regex/facts.ts';
import { WHAT, whatOf } from '../lib/regex/desc.ts';
import { REGEX_UI } from '../lib/regex/ui.ts';
import { LANG_CODES } from '../lib/i18n/lang.ts';
import { DENSE, hanProblem } from './han.ts';

test('100가지가 넘는다', () => {
  assert.ok(PATTERNS.length >= 100, `${PATTERNS.length}가지뿐이다`);
});

test('열쇠가 겹치지 않고 주소로 쓸 수 있다', () => {
  assert.equal(new Set(PATTERN_SLUGS).size, PATTERNS.length, 'slug 중복');
  for (const x of PATTERNS) {
    assert.match(x.slug, /^[a-z0-9-]+$/, `주소에 못 쓰는 slug: ${x.slug}`);
    assert.ok(x.re.length > 0, `${x.slug}: 식이 비었다`);
  }
});

test('식이 모두 만들어진다', () => {
  for (const x of PATTERNS) {
    assert.doesNotThrow(() => new RegExp(x.re, x.flags), `${x.slug}: 식을 만들 수 없다 — ${x.re}`);
    assert.match(x.flags, /^[gimsuy]*$/, `${x.slug}: 모르는 플래그 ${x.flags}`);
  }
});

test('맞아야 하는 보기가 모두 맞는다', () => {
  for (const x of PATTERNS) {
    assert.ok(x.ok.length >= 1, `${x.slug}: 맞는 보기가 없다`);
    for (const s of x.ok) {
      const re = new RegExp(x.re, x.flags.replace('g', ''));
      assert.ok(re.test(s), `${x.slug}: ${JSON.stringify(s)}가 맞아야 하는데 안 맞는다 — ${x.re}`);
    }
  }
});

test('맞으면 안 되는 보기가 모두 안 맞는다', () => {
  // 이 검사가 이 자료의 핵심이다 — 인터넷에 도는 식이 틀리는 곳이 대부분 여기다
  for (const x of PATTERNS) {
    assert.ok(x.no.length >= 1, `${x.slug}: 맞지 않는 보기가 없다`);
    for (const s of x.no) {
      const re = new RegExp(x.re, x.flags.replace('g', ''));
      assert.ok(!re.test(s), `${x.slug}: ${JSON.stringify(s)}가 맞으면 안 되는데 맞는다 — ${x.re}`);
    }
  }
});

test('보기가 서로 겹치지 않는다', () => {
  for (const x of PATTERNS) {
    const both = x.ok.filter(s => x.no.includes(s));
    assert.deepEqual(both, [], `${x.slug}: 같은 보기가 양쪽에 있다`);
  }
});

test('널리 아는 것들이 제대로 걸린다', () => {
  // 이메일: 점이 두 개 이어지거나 @가 두 개면 통과하면 안 된다
  const email = new RegExp(patternOf('email')!.re);
  assert.ok(email.test('user@example.com'));
  assert.ok(!email.test('user@@example.com'));
  assert.ok(!email.test('user@example..com'));
  assert.ok(!email.test('user example@a.com'));

  // IPv4: 256은 없다
  const ipv4 = new RegExp(patternOf('ipv4')!.re);
  assert.ok(ipv4.test('192.168.0.1'));
  assert.ok(!ipv4.test('256.0.0.1'));
  assert.ok(!ipv4.test('1.2.3.4.5'));

  // 날짜: 13월과 32일은 없다
  const date = new RegExp(patternOf('iso-date')!.re);
  assert.ok(date.test('2024-02-29'));
  assert.ok(!date.test('2024-13-01'));
  assert.ok(!date.test('2024-01-32'));

  // 시각: 24시와 60분은 없다
  const time = new RegExp(patternOf('time-24h')!.re);
  assert.ok(time.test('23:59'));
  assert.ok(!time.test('24:00'));
  assert.ok(!time.test('12:60'));

  // 포트: 65536은 없다
  const port = new RegExp(patternOf('port-number')!.re);
  assert.ok(port.test('65535'));
  assert.ok(!port.test('65536'));
});

test('통째로 검사하는 식은 앞뒤가 묶여 있다', () => {
  // 앵커가 없는 검사식은 "abc<이메일>def"도 통과시킨다 — 검사식으로는 쓸 수 없다
  for (const x of patternsOfKind('validate')) {
    const f = regexFacts(x);
    assert.ok(f.anchored, `${x.slug}: 검사식인데 ^와 $가 없다`);
  }
});

test('묶음 세기가 실제 결과와 맞는다', () => {
  for (const x of PATTERNS) {
    const re = new RegExp(x.re, x.flags.replace('g', ''));
    const hit = re.exec(x.ok[0]);
    assert.ok(hit, `${x.slug}: 첫 보기가 맞지 않는다`);
    assert.equal(countGroups(x.re), hit.length - 1, `${x.slug}: 묶음 수가 실제와 다르다`);
    for (const n of groupNames(x.re)) assert.ok(hit.groups?.[n] !== undefined, `${x.slug}: 이름 붙은 묶음 ${n}이 비었다`);
  }
});

test('식이 오래 걸리지 않는다', () => {
  // (a+)+ 꼴이 섞이면 맞지 않는 입력에서 시간이 폭발한다.
  // 여기 실린 식은 그런 모양이 없어야 한다 — 어긋난 입력을 길게 넣어 재 본다.
  const evil = `${'a'.repeat(40)}!`;
  for (const x of PATTERNS) {
    const re = new RegExp(x.re, x.flags);
    const start = process.hrtime.bigint();
    re.test(evil);
    re.test(`${'0'.repeat(40)}!`);
    re.test(`${'<'.repeat(40)}!`);
    const ms = Number(process.hrtime.bigint() - start) / 1e6;
    assert.ok(ms < 50, `${x.slug}: 어긋난 입력에 ${ms.toFixed(1)}ms가 걸린다 — 되짚기가 폭발한다`);
  }
});

test('돌려보기가 잡은 자리를 그대로 돌려준다', () => {
  const t = tryPattern(patternOf('digits-in-text')!, 'a12b345c');
  assert.deepEqual(t.hits, ['12', '345']);
  assert.ok(t.matched);
  assert.ok(!tryPattern(patternOf('digits-in-text')!, 'abc').matched);
  // 길이 0으로 맞는 식도 무한히 돌지 않는다
  assert.ok(tryPattern(patternOf('word-boundary')!, 'cat cat').hits.length <= 20);
});

test('갈래가 빈 곳 없이 덮는다', () => {
  assert.equal(KINDS.reduce((n, k) => n + patternsOfKind(k).length, 0), PATTERNS.length, '갈래 밖의 식이 있다');
  for (const k of KINDS) assert.ok(patternsOfKind(k).length >= 5, `${k}가 너무 적다`);
});

test('155개 모두 열 언어 설명이 있다', () => {
  for (const x of PATTERNS) {
    const row = WHAT[x.slug];
    assert.ok(row, `${x.slug}: 설명이 없다`);
    assert.equal(row.length, 10, `${x.slug}: 열 칸이 아니다`);
    for (const lang of LANG_CODES) {
      assert.ok(whatOf(x.slug, lang).trim().length > 1, `${x.slug}/${lang}: 설명이 비었다`);
    }
  }
  const extra = Object.keys(WHAT).filter(k => !PATTERN_SLUGS.includes(k));
  assert.deepEqual(extra, [], `데이터에 없는 항목의 설명: ${extra.join(', ')}`);
});

test('한 언어 안에서 설명이 겹치지 않는다', () => {
  // 설명이 곧 화면 제목이 된다 — 겹치면 두 페이지가 같은 제목으로 색인된다
  for (const lang of LANG_CODES) {
    const seen = new Map<string, string>();
    for (const x of PATTERNS) {
      const w = whatOf(x.slug, lang);
      const before = seen.get(w);
      assert.equal(before, undefined, `${lang}: "${w}"를 ${before}와 ${x.slug}가 함께 쓴다`);
      seen.set(w, x.slug);
    }
  }
});

test('언어끼리 글자가 섞이지 않는다', () => {
  for (const x of PATTERNS) {
    for (const lang of LANG_CODES) {
      const d = whatOf(x.slug, lang);
      if (lang !== 'ko') assert.ok(!/[가-힣]/.test(d), `${x.slug}/${lang}: 한글이 섞였다 — ${d}`);
      if (lang !== 'ja' && lang !== 'ko') assert.ok(!/[ぁ-んァ-ヶ]/.test(d), `${x.slug}/${lang}: 가나가 섞였다 — ${d}`);
      if (lang !== 'hi') assert.ok(!/[ऀ-ॿ]/.test(d), `${x.slug}/${lang}: 데바나가리가 섞였다 — ${d}`);
    }
  }
});

test('열 언어 문구가 모두 채워져 있다', () => {
  const f = regexFacts(patternOf('email')!);
  for (const lang of LANG_CODES) {
    const ui = REGEX_UI[lang];
    for (const [key, val] of Object.entries(ui)) {
      assert.ok(val != null, `${lang}.${key}가 비었다`);
      if (typeof val === 'string') assert.ok(val.trim().length > 0, `${lang}.${key}가 빈 문자열이다`);
      if (typeof val === 'string') assert.equal(hanProblem(lang, val), '');
    }
    assert.equal(ui.how.length, 4, `${lang}: 읽는 방법 수가 다르다`);
    assert.equal(ui.hubFaq.length, 5, `${lang}: 허브 FAQ 수가 다르다`);
    assert.equal(ui.patternFaq(f, 'x', 'a', 'b').length, 4, `${lang}: 상세 FAQ 수가 다르다`);
    for (const k of KINDS) {
      assert.ok(ui.kindLabel[k], `${lang}: ${k} 이름이 없다`);
      assert.ok(ui.kindNote[k]?.length >= 10, `${lang}: ${k} 설명이 없다`);
    }
    for (const c of ['i', 'g', 'm', 's']) assert.ok(ui.flagLabel[c], `${lang}: 플래그 ${c} 이름이 없다`);
    assert.ok(ui.tryHitMany.includes('{n}'), `${lang}: 잡힌 수를 채울 자리가 없다`);
  }
});

test('설명이 모든 항목에서 만들어진다', () => {
  for (const x of PATTERNS) {
    const f = regexFacts(x);
    for (const lang of LANG_CODES) {
      const d = REGEX_UI[lang].desc(f, whatOf(x.slug, lang));
      const floor = DENSE.has(lang) ? 20 : 35;
      assert.ok(d.length > floor, `${lang}/${x.slug}: 설명이 너무 짧다 — ${d}`);
    }
  }
});

test('앵커 여부가 설명에 그대로 드러난다', () => {
  // 계산한 사실이 문장에 반영되지 않으면, 검사식과 찾기식을 같은 말로 설명하게 된다
  for (const lang of LANG_CODES) {
    const ui = REGEX_UI[lang];
    const anchored = ui.desc(regexFacts(patternOf('email')!), 'x');
    const loose = ui.desc(regexFacts(patternOf('digit')!), 'x');
    assert.notEqual(anchored, loose, `${lang}: 앵커가 있든 없든 같은 문장이 나온다`);
  }
});

test('모든 식이 열 언어 메타를 만든다', () => {
  for (const x of PATTERNS) {
    const f = regexFacts(x);
    for (const lang of LANG_CODES) {
      const ui = REGEX_UI[lang];
      const what = whatOf(x.slug, lang);
      assert.ok(ui.metaTitle(what).includes(what), `${lang}/${x.slug}: 제목에 대상이 없다`);
      const desc = ui.metaDesc(f, what);
      assert.ok(desc.includes(x.re), `${lang}/${x.slug}: 설명에 식이 없다`);
      const floor = DENSE.has(lang) ? 25 : 40;
      assert.ok(desc.length > floor, `${lang}/${x.slug}: 설명이 너무 짧다`);
    }
  }
});

test('이웃 식이 자기 자신을 빼고 같은 갈래만 준다', () => {
  for (const x of PATTERNS) {
    const near = siblingPatterns(x.slug);
    assert.ok(near.length > 0, `${x.slug}: 이웃이 없다`);
    assert.ok(!near.some(o => o.slug === x.slug), `${x.slug}: 자기 자신이 들어 있다`);
    for (const o of near) assert.equal(o.kind, x.kind, `${x.slug}: 다른 갈래가 섞였다`);
  }
});

test('정규식 아이콘은 목록과 카드가 같은 그림을 쓴다', async () => {
  const { ICON_FOR } = await import('../lib/og-icon-map.ts');
  assert.ok(ICON_FOR[REGEX_ICON], '이모지가 그림으로 이어지지 않는다');
});

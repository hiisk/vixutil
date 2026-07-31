/**
 * HTTP 사전이 스스로 어긋나지 않는지 본다.
 *
 * 이 자료의 위험은 갈래를 잘못 적는 것이다. 404를 5xx로 분류하거나 요청 헤더를
 * 응답 쪽에 두면 화면은 멀쩡히 뜨는데 설명이 정반대가 된다. 그래서 갈래는
 * 데이터에 적지 않고 번호에서 계산하고, 널리 알려진 값 몇 개를 못으로 박는다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';

import { HEADERS, HTTP_ICON, HTTP_ITEMS, HTTP_SLUGS, STATUSES, headersOfSide, httpItemOf, statusClass, statusesOfClass } from '../lib/http/list.ts';
import { httpFacts, relatedHttp } from '../lib/http/facts.ts';
import { HTTP_DESC, httpDesc } from '../lib/http/desc.ts';
import { HTTP_UI } from '../lib/http/ui.ts';
import { LANG8_CODES } from '../lib/i18n/lang.ts';

test('100가지가 넘는다', () => {
  assert.ok(HTTP_ITEMS.length >= 100, `${HTTP_ITEMS.length}가지뿐이다`);
});

test('열쇠가 겹치지 않고 주소로 쓸 수 있다', () => {
  assert.equal(new Set(HTTP_SLUGS).size, HTTP_ITEMS.length, 'slug 중복');
  for (const x of HTTP_ITEMS) {
    assert.match(x.slug, /^[a-z0-9-]+$/, `주소에 못 쓰는 slug: ${x.slug}`);
    assert.ok(x.name.trim().length > 0, `${x.slug}: 이름이 없다`);
  }
});

test('상태 코드의 갈래는 번호에서 나온다', () => {
  assert.equal(statusClass(404), '4xx');
  assert.equal(statusClass(200), '2xx');
  assert.equal(statusClass(503), '5xx');
  for (const x of STATUSES) {
    assert.ok(x.code! >= 100 && x.code! <= 599, `${x.slug}: 코드 범위 밖`);
    assert.equal(x.slug, String(x.code), `${x.slug}: 열쇠와 코드가 다르다`);
    assert.ok(x.name.startsWith(`${x.code} `), `${x.slug}: 이름이 번호로 시작하지 않는다`);
  }
});

test('오류 판정이 4xx·5xx에서만 참이다', () => {
  for (const x of STATUSES) {
    const f = httpFacts(x);
    const shouldBeError = x.code! >= 400;
    assert.equal(f.isError, shouldBeError, `${x.slug}: 오류 판정이 다르다`);
    assert.equal(f.isRedirect, x.code! >= 300 && x.code! < 400, `${x.slug}: 넘김 판정이 다르다`);
  }
  assert.ok(httpFacts(httpItemOf('404')!).isError);
  assert.ok(!httpFacts(httpItemOf('301')!).isError);
  assert.ok(httpFacts(httpItemOf('301')!).isRedirect);
});

test('헤더 열쇠는 이름을 소문자로 내린 것이다', () => {
  // 헤더 이름은 대소문자를 가리지 않으므로 주소는 소문자 하나로 고정한다
  for (const x of HEADERS) {
    assert.equal(x.slug, x.name.toLowerCase(), `${x.name}: 열쇠가 소문자 이름과 다르다`);
    assert.ok(x.side, `${x.slug}: 요청·응답 구분이 없다`);
  }
  assert.equal(httpItemOf('content-type')?.name, 'Content-Type');
});

test('갈래가 빈 곳 없이 덮는다', () => {
  const classes = ['1xx', '2xx', '3xx', '4xx', '5xx'] as const;
  assert.equal(classes.reduce((n, c) => n + statusesOfClass(c).length, 0), STATUSES.length, '갈래 밖 상태 코드가 있다');
  const sides = ['request', 'response', 'both'] as const;
  assert.equal(sides.reduce((n, s) => n + headersOfSide(s).length, 0), HEADERS.length, '갈래 밖 헤더가 있다');
  for (const c of classes) assert.ok(statusesOfClass(c).length > 0, `${c}가 비었다`);
  for (const s of sides) assert.ok(headersOfSide(s).length > 0, `${s}가 비었다`);
});

test('실제 줄 꼴이 갈래에 맞는다', () => {
  // 상태는 응답 첫 줄, 헤더는 이름과 콜론 — 섞이면 따라 쓴 사람이 틀린 것을 보낸다
  for (const x of STATUSES) {
    assert.ok(httpFacts(x).example.startsWith('HTTP/1.1 '), `${x.slug}: 상태 줄 꼴이 아니다`);
  }
  for (const x of HEADERS) {
    assert.ok(httpFacts(x).example.startsWith(`${x.name}: `), `${x.slug}: 헤더 줄 꼴이 아니다`);
  }
});

test('132개 모두 여덟 언어 설명이 있다', () => {
  for (const x of HTTP_ITEMS) {
    const row = HTTP_DESC[x.slug];
    assert.ok(row, `${x.slug}: 설명이 없다`);
    assert.equal(row.length, 8, `${x.slug}: 여덟 칸이 아니다`);
    for (const lang of LANG8_CODES) {
      const floor = lang === 'ja' || lang === 'ko' ? 6 : 10;
      assert.ok(httpDesc(x.slug, lang).trim().length > floor, `${x.slug}/${lang}: 설명이 비었거나 너무 짧다`);
    }
  }
  const extra = Object.keys(HTTP_DESC).filter(k => !HTTP_SLUGS.includes(k));
  assert.deepEqual(extra, [], `데이터에 없는 항목의 설명: ${extra.join(', ')}`);
});

test('언어끼리 글자가 섞이지 않는다', () => {
  for (const x of HTTP_ITEMS) {
    for (const lang of LANG8_CODES) {
      const d = httpDesc(x.slug, lang);
      if (lang !== 'ko') assert.ok(!/[가-힣]/.test(d), `${x.slug}/${lang}: 한글이 섞였다`);
      if (lang !== 'ja' && lang !== 'ko') assert.ok(!/[ぁ-んァ-ヶ]/.test(d), `${x.slug}/${lang}: 가나가 섞였다`);
      if (lang !== 'hi') assert.ok(!/[ऀ-ॿ]/.test(d), `${x.slug}/${lang}: 데바나가리가 섞였다`);
    }
  }
});

test('견줄 항목은 자기 자신을 빼고 같은 갈래만 준다', () => {
  for (const x of HTTP_ITEMS) {
    const rel = relatedHttp(x.slug);
    assert.ok(!rel.includes(x.slug), `${x.slug}: 자기 자신이 들어 있다`);
    for (const n of rel) {
      const o = httpItemOf(n)!;
      assert.equal(o.kind, x.kind, `${x.slug}: 다른 종류가 섞였다`);
      if (x.kind === 'status') assert.equal(statusClass(o.code!), statusClass(x.code!), `${x.slug}: 다른 갈래가 섞였다`);
      else assert.equal(o.side, x.side, `${x.slug}: 다른 방향이 섞였다`);
    }
  }
});

test('문서 주소가 항목을 가리킨다', () => {
  assert.ok(httpFacts(httpItemOf('404')!).docUrl.endsWith('/Status/404'));
  assert.ok(httpFacts(httpItemOf('content-type')!).docUrl.endsWith('/Headers/Content-Type'));
  for (const x of HTTP_ITEMS) assert.match(httpFacts(x).docUrl, /^https:\/\//, `${x.slug}: 주소 꼴이 아니다`);
});

test('여덟 언어 문구가 모두 채워져 있다', () => {
  const f = httpFacts(httpItemOf('404')!);
  for (const lang of LANG8_CODES) {
    const ui = HTTP_UI[lang];
    for (const [key, val] of Object.entries(ui)) {
      assert.ok(val != null, `${lang}.${key}가 비었다`);
      if (typeof val === 'string') assert.ok(val.trim().length > 0, `${lang}.${key}가 빈 문자열이다`);
    }
    assert.equal(ui.how.length, 4, `${lang}: 설명 수가 다르다`);
    assert.equal(ui.hubFaq.length, 5, `${lang}: 허브 FAQ 수가 다르다`);
    assert.equal(ui.itemFaq(f, 'x', 'y').length, 4, `${lang}: 상세 FAQ 수가 다르다`);
    for (const c of ['1xx', '2xx', '3xx', '4xx', '5xx'] as const) {
      assert.ok(ui.classLabel[c], `${lang}: ${c} 이름이 없다`);
      assert.ok(ui.classNote[c]?.length >= 10, `${lang}: ${c} 설명이 없다`);
    }
    for (const s of ['request', 'response', 'both'] as const) {
      assert.ok(ui.sideLabel[s], `${lang}: ${s} 이름이 없다`);
      assert.ok(ui.sideNote[s]?.length >= 10, `${lang}: ${s} 설명이 없다`);
    }
  }
});

test('FAQ가 오류와 정상 코드를 다르게 말한다', () => {
  for (const lang of LANG8_CODES) {
    const ui = HTTP_UI[lang];
    const err = ui.itemFaq(httpFacts(httpItemOf('500')!), 'x', 'y')[2].a;
    const ok = ui.itemFaq(httpFacts(httpItemOf('200')!), 'x', 'y')[2].a;
    assert.notEqual(err, ok, `${lang}: 오류 여부에 관계없이 같은 답이 나온다`);
  }
});

test('모든 항목이 여덟 언어 메타를 만든다', () => {
  for (const x of HTTP_ITEMS) {
    for (const lang of LANG8_CODES) {
      const ui = HTTP_UI[lang];
      assert.ok(ui.metaTitle(x.name).includes(x.name), `${lang}/${x.slug}: 제목에 이름이 없다`);
      const desc = ui.metaDesc(x.name, httpDesc(x.slug, lang));
      assert.ok(desc.includes(x.name), `${lang}/${x.slug}: 설명에 이름이 없다`);
      const floor = lang === 'ja' || lang === 'ko' ? 25 : 40;
      assert.ok(desc.length > floor, `${lang}/${x.slug}: 설명이 너무 짧다`);
    }
  }
});

test('HTTP 아이콘은 목록과 카드가 같은 그림을 쓴다', async () => {
  const { ICON_FOR } = await import('../lib/og-icon-map.ts');
  assert.equal(ICON_FOR[HTTP_ICON], 'server', '이모지가 서버 아이콘으로 이어지지 않는다');
});

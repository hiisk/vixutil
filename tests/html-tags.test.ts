/**
 * HTML 태그 사전이 스스로 어긋나지 않는지 본다.
 *
 * 가장 잘 나는 실수는 닫는 태그다. <br></br>처럼 존재하지 않는 꼴을 적어도
 * 화면에서는 그럴듯해 보이고, 그대로 따라 쓴 사람만 빈 줄이 하나 더 생긴다.
 * 그래서 여는 꼴과 닫는 꼴이 데이터와 어긋나지 않는지 126개 전부 확인한다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';

import { TAGS, TAG_ICON, TAG_KINDS, TAG_NAMES, tagOf, tagsOfKind } from '../lib/html/tags.ts';
import { relatedTags, tagFacts } from '../lib/html/facts.ts';
import { TAG_DESC, tagDesc } from '../lib/html/desc.ts';
import { HTML_UI } from '../lib/html/ui.ts';
import { LANG_CODES } from '../lib/i18n/lang.ts';
import { DENSE, hanProblem } from './han.ts';

test('100개가 넘는다', () => {
  assert.ok(TAGS.length >= 100, `${TAGS.length}개뿐이다`);
});

test('태그 이름이 겹치지 않고 주소로 쓸 수 있다', () => {
  assert.equal(new Set(TAG_NAMES).size, TAGS.length, '이름 중복');
  for (const t of TAGS) {
    assert.match(t.name, /^[a-z0-9]+$/, `주소에 못 쓰는 이름: ${t.name}`);
    assert.ok(!t.name.includes('<'), `${t.name}: 꺾쇠는 데이터에 넣지 않는다`);
  }
});

test('여는 꼴과 닫는 꼴이 어긋나지 않는다', () => {
  // <br></br>은 존재하지 않는 꼴이다 — 데이터가 void라고 했으면 닫는 꼴도 없어야 한다
  for (const t of TAGS) {
    const f = tagFacts(t);
    assert.equal(f.open, `<${t.name}>`, `${t.name}: 여는 꼴이 다르다`);
    if (f.isVoid) {
      assert.equal(f.close, '', `${t.name}: 빈 태그에 닫는 꼴이 붙었다`);
      assert.equal(f.example, `<${t.name}>`, `${t.name}: 빈 태그 보기가 틀렸다`);
    } else {
      assert.equal(f.close, `</${t.name}>`, `${t.name}: 닫는 꼴이 다르다`);
      assert.equal(f.example, `<${t.name}></${t.name}>`, `${t.name}: 보기가 틀렸다`);
    }
  }
});

test('닫지 않는 태그 목록이 표준과 맞는다', () => {
  // 표준이 정한 빈 요소 — 하나라도 빠지거나 더 들어가면 그 태그의 설명이 틀린 것이다
  const VOID = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr'];
  for (const name of VOID) {
    const t = tagOf(name);
    if (t) assert.ok(tagFacts(t).isVoid, `${name}은 닫지 않는 태그여야 한다`);
  }
  for (const t of TAGS) {
    if (tagFacts(t).isVoid && t.kind !== 'deprecated') {
      assert.ok(VOID.includes(t.name), `${t.name}: 표준 빈 요소가 아닌데 void로 적혔다`);
    }
  }
});

test('갈래가 빈 곳 없이 덮는다', () => {
  for (const k of TAG_KINDS) assert.ok(tagsOfKind(k).length > 0, `${k} 갈래가 비었다`);
  assert.equal(
    TAG_KINDS.reduce((n, k) => n + tagsOfKind(k).length, 0),
    TAGS.length,
    '갈래에 안 들어간 태그가 있다',
  );
});

test('폐기 표시가 갈래와 맞는다', () => {
  for (const t of TAGS) {
    assert.equal(tagFacts(t).deprecated, t.kind === 'deprecated', `${t.name}: 폐기 표시가 갈래와 다르다`);
  }
  assert.ok(tagFacts(tagOf('marquee')!).deprecated);
  assert.ok(!tagFacts(tagOf('div')!).deprecated);
});

test('126개 모두 열 언어 설명이 있다', () => {
  // 마이너 아르카나처럼 조합할 수 없는 자료라, 한 칸이 비면 그 태그만 조용히 빈 페이지가 된다
  for (const t of TAGS) {
    const row = TAG_DESC[t.name];
    assert.ok(row, `${t.name}: 설명이 없다`);
    assert.equal(row.length, 10, `${t.name}: 열 칸이 아니다`);
    for (const lang of LANG_CODES) {
      const d = tagDesc(t.name, lang);
      assert.ok(d.trim().length > 10, `${t.name}/${lang}: 설명이 비었거나 너무 짧다`);
    }
  }
  const extra = Object.keys(TAG_DESC).filter(k => !TAG_NAMES.includes(k));
  assert.deepEqual(extra, [], `데이터에 없는 태그의 설명: ${extra.join(', ')}`);
});

test('언어끼리 글자가 섞이지 않는다', () => {
  for (const t of TAGS) {
    for (const lang of LANG_CODES) {
      const d = tagDesc(t.name, lang);
      if (lang !== 'ko') assert.ok(!/[가-힣]/.test(d), `${t.name}/${lang}: 한글이 섞였다`);
      if (lang !== 'ja' && lang !== 'ko') assert.ok(!/[ぁ-んァ-ヶ]/.test(d), `${t.name}/${lang}: 가나가 섞였다`);
      if (lang !== 'hi') assert.ok(!/[ऀ-ॿ]/.test(d), `${t.name}/${lang}: 데바나가리가 섞였다`);
    }
  }
});

test('견줄 태그는 자기 자신을 빼고 같은 갈래만 준다', () => {
  for (const t of TAGS) {
    const rel = relatedTags(t.name);
    assert.ok(!rel.includes(t.name), `${t.name}: 자기 자신이 들어 있다`);
    for (const n of rel) assert.equal(tagOf(n)?.kind, t.kind, `${t.name}: 다른 갈래가 섞였다`);
  }
});

test('문서 주소가 태그 이름을 담는다', () => {
  for (const t of TAGS) {
    const url = tagFacts(t).docUrl;
    assert.match(url, /^https:\/\//, `${t.name}: 주소 꼴이 아니다`);
    assert.ok(url.endsWith(`/${t.name}`), `${t.name}: 주소가 태그를 가리키지 않는다`);
  }
});

test('열 언어 문구가 모두 채워져 있다', () => {
  const f = tagFacts(tagOf('div')!);
  for (const lang of LANG_CODES) {
    const ui = HTML_UI[lang];
    for (const [key, val] of Object.entries(ui)) {
      assert.ok(val != null, `${lang}.${key}가 비었다`);
      if (typeof val === 'string') assert.ok(val.trim().length > 0, `${lang}.${key}가 빈 문자열이다`);
      if (typeof val === 'string') assert.equal(hanProblem(lang, val), '');
    }
    assert.equal(ui.how.length, 4, `${lang}: 설명 수가 다르다`);
    assert.equal(ui.hubFaq.length, 5, `${lang}: 허브 FAQ 수가 다르다`);
    assert.equal(ui.tagFaq(f, 'x', 'y').length, 4, `${lang}: 상세 FAQ 수가 다르다`);
    for (const k of TAG_KINDS) {
      assert.ok(ui.kindLabel[k], `${lang}: ${k} 이름이 없다`);
      assert.ok(ui.kindNote[k]?.length >= 10, `${lang}: ${k} 설명이 없다`);
    }
  }
});

test('FAQ가 빈 태그와 닫는 태그를 다르게 말한다', () => {
  // 같은 문장이 나가면 <br>에도 "닫는 태그와 짝을 이룬다"고 적히게 된다
  for (const lang of LANG_CODES) {
    const ui = HTML_UI[lang];
    const br = ui.tagFaq(tagFacts(tagOf('br')!), 'x', 'y')[1].a;
    const div = ui.tagFaq(tagFacts(tagOf('div')!), 'x', 'y')[1].a;
    assert.notEqual(br, div, `${lang}: 빈 태그와 여닫는 태그의 답이 같다`);
    assert.ok(br.includes('<br>'), `${lang}: br 답에 보기가 없다`);
    assert.ok(div.includes('</div>'), `${lang}: div 답에 닫는 태그가 없다`);
  }
});

test('모든 태그가 열 언어 메타를 만든다', () => {
  for (const t of TAGS) {
    for (const lang of LANG_CODES) {
      const ui = HTML_UI[lang];
      const title = ui.metaTitle(t.name);
      const desc = ui.metaDesc(t.name, tagDesc(t.name, lang));
      assert.ok(title.includes(t.name), `${lang}/${t.name}: 제목에 이름이 없다`);
      assert.ok(desc.includes(t.name), `${lang}/${t.name}: 설명에 이름이 없다`);
      // 한국어와 일본어는 같은 뜻을 절반 길이로 적는다 — 글자 수 기준을 하나로 두면 잣대가 달라진다
      const floor = DENSE.has(lang) ? 25 : 40;
      assert.ok(desc.length > floor, `${lang}/${t.name}: 설명이 너무 짧다 (${desc.length}자)`);
    }
  }
});

test('태그 아이콘은 목록과 카드가 같은 그림을 쓴다', async () => {
  const { ICON_FOR } = await import('../lib/og-icon-map.ts');
  assert.equal(ICON_FOR[TAG_ICON], 'window', '이모지가 창 아이콘으로 이어지지 않는다');
});

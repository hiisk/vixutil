/**
 * 확장자 목록이 스스로 어긋나지 않는지 본다.
 *
 * 위험한 곳은 MIME 타입이다. image/jpg처럼 그럴듯하지만 존재하지 않는 값을 적어도
 * 화면은 멀쩡히 뜨고, 틀렸다는 사실은 브라우저가 파일을 못 여는 순간에야 드러난다.
 * 그래서 형식과 짝 관계를 여기서 붙들어 둔다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';

import { EXTS, EXT_ICON, EXT_KINDS, EXT_SLUGS, extOf, extsOfKind } from '../lib/ext/list.ts';
import { extFacts, relatedExts } from '../lib/ext/facts.ts';
import { EXT_UI } from '../lib/ext/ui.ts';
import { LANG8_CODES } from '../lib/i18n/lang8.ts';

test('100가지가 넘는다', () => {
  assert.ok(EXTS.length >= 100, `${EXTS.length}가지뿐이다`);
});

test('확장자가 겹치지 않고 주소로 쓸 수 있다', () => {
  assert.equal(new Set(EXT_SLUGS).size, EXTS.length, '확장자 중복');
  for (const x of EXTS) {
    assert.match(x.ext, /^[a-z0-9]+$/, `주소에 못 쓰는 확장자: ${x.ext}`);
    assert.ok(!x.ext.startsWith('.'), `점이 붙어 있다: ${x.ext}`);
    assert.ok(x.apps.length > 0, `${x.ext}: 여는 프로그램이 없다`);
  }
});

test('MIME 타입이 형식을 지킨다', () => {
  // type/subtype 두 토막이고, 등록된 최상위 타입 여덟 개 중 하나여야 한다
  const TOP = ['application', 'audio', 'font', 'image', 'model', 'text', 'video', 'multipart', 'message'];
  for (const x of EXTS) {
    assert.match(x.mime, /^[a-z]+\/[a-z0-9][a-z0-9.+-]*$/, `${x.ext}: MIME 형식이 아니다 — ${x.mime}`);
    const [top] = x.mime.split('/');
    assert.ok(TOP.includes(top), `${x.ext}: 없는 최상위 타입 ${top}`);
  }
  // 흔히 틀리는 값 — image/jpg는 존재하지 않는다
  assert.equal(extOf('jpg')!.mime, 'image/jpeg');
  assert.equal(extOf('svg')!.mime, 'image/svg+xml');
  assert.equal(extOf('mp3')!.mime, 'audio/mpeg');
  assert.equal(extOf('docx')!.mime, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
});

test('갈래가 빈 곳 없이 덮는다', () => {
  for (const k of EXT_KINDS) assert.ok(extsOfKind(k).length > 0, `${k} 갈래가 비었다`);
  assert.equal(
    EXT_KINDS.reduce((n, k) => n + extsOfKind(k).length, 0),
    EXTS.length,
    '갈래에 안 들어간 확장자가 있다',
  );
});

test('쌍둥이는 서로를 가리킨다', () => {
  // jpg가 jpeg를 쌍둥이로 보면 jpeg도 jpg를 봐야 한다. 한쪽만 보이면 목록이 갈린다
  for (const x of EXTS) {
    for (const t of extFacts(x).twins) {
      const back = extFacts(extOf(t)!).twins;
      assert.ok(back.includes(x.ext), `${x.ext}는 ${t}를 보는데 ${t}는 ${x.ext}를 안 본다`);
    }
  }
  assert.deepEqual(extFacts(extOf('jpg')!).twins, ['jpeg']);
  assert.deepEqual(extFacts(extOf('sqlite')!).twins, ['db']);
  assert.deepEqual(extFacts(extOf('webp')!).twins, [], '혼자인 형식은 쌍둥이가 없다');
});

test('MIME을 두 토막으로 가른다', () => {
  const f = extFacts(extOf('svg')!);
  assert.equal(f.mimeType, 'image');
  assert.equal(f.mimeSubtype, 'svg+xml');
  assert.ok(f.official);
  // x- 로 시작하면 표준에 등록되지 않았다는 뜻이다
  assert.equal(extFacts(extOf('srt')!).official, false);
  assert.equal(extFacts(extOf('iso')!).official, false);
  assert.equal(extFacts(extOf('pdf')!).official, true);
});

test('브라우저가 여는 목록이 상식과 맞는다', () => {
  // 이 판정만은 계산이 아니라 손으로 적은 것이라, 틀리면 눈으로 못 잡는다
  for (const e of ['jpg', 'png', 'webp', 'svg', 'pdf', 'mp4', 'mp3', 'html', 'json']) {
    assert.ok(extFacts(extOf(e)!).web, `.${e}는 브라우저에서 열려야 한다`);
  }
  for (const e of ['psd', 'hwp', 'docx', 'zip', 'exe', 'mkv', 'tiff', 'blend']) {
    assert.ok(!extFacts(extOf(e)!).web, `.${e}는 브라우저에서 안 열려야 한다`);
  }
});

test('글자 파일 표시가 실제와 맞는다', () => {
  for (const e of ['txt', 'html', 'css', 'js', 'json', 'csv', 'srt', 'md']) {
    assert.ok(extFacts(extOf(e)!).text, `.${e}는 글자 파일이다`);
  }
  for (const e of ['png', 'mp4', 'zip', 'exe', 'ttf', 'psd']) {
    assert.ok(!extFacts(extOf(e)!).text, `.${e}는 글자 파일이 아니다`);
  }
});

test('견줄 확장자는 자기 자신을 빼고 쌍둥이를 먼저 준다', () => {
  for (const x of EXTS) {
    const rel = relatedExts(x.ext);
    assert.ok(rel.length > 0, `${x.ext}: 견줄 것이 없다`);
    assert.ok(!rel.includes(x.ext), `${x.ext}: 자기 자신이 들어 있다`);
    assert.equal(new Set(rel).size, rel.length, `${x.ext}: 중복`);
    const twins = extFacts(x).twins;
    if (twins.length > 0) assert.equal(rel[0], twins[0], `${x.ext}: 쌍둥이가 앞에 오지 않는다`);
  }
});

test('여덟 언어가 모두 채워져 있다', () => {
  const f = extFacts(extOf('webp')!);
  for (const lang of LANG8_CODES) {
    const ui = EXT_UI[lang];
    for (const [key, val] of Object.entries(ui)) {
      assert.ok(val != null, `${lang}.${key}가 비었다`);
      if (typeof val === 'string') assert.ok(val.trim().length > 0, `${lang}.${key}가 빈 문자열이다`);
    }
    assert.equal(ui.how.length, 4, `${lang}: 설명 수가 다르다`);
    assert.equal(ui.hubFaq.length, 5, `${lang}: 허브 FAQ 수가 다르다`);
    assert.equal(ui.extFaq(f, ui.kindLabel.image).length, 5, `${lang}: 상세 FAQ 수가 다르다`);
    for (const k of EXT_KINDS) {
      assert.ok(ui.kindLabel[k], `${lang}: ${k} 이름이 없다`);
      assert.ok(ui.kindNote[k]?.length >= 10, `${lang}: ${k} 설명이 없다`);
    }
  }
});

test('FAQ 답이 그 확장자의 값을 담고 있다', () => {
  // 틀만 여덟 벌 두고 값을 끼워 넣는 구조라, 값이 안 끼워지면 140장이 같은 글이 된다
  for (const e of ['webp', 'hwp', 'mkv']) {
    const x = extOf(e)!;
    const f = extFacts(x);
    for (const lang of LANG8_CODES) {
      const ui = EXT_UI[lang];
      const joined = ui.extFaq(f, ui.kindLabel[x.kind]).map(q => `${q.q} ${q.a}`).join(' ');
      assert.ok(joined.includes(`.${e}`), `${lang}/${e}: 확장자가 안 들어갔다`);
      assert.ok(joined.includes(f.mime), `${lang}/${e}: MIME이 안 들어갔다`);
      assert.ok(joined.includes(f.apps[0]), `${lang}/${e}: 여는 프로그램이 안 들어갔다`);
    }
  }
});

test('모든 확장자가 여덟 언어 메타를 만든다', () => {
  for (const x of EXTS) {
    const f = extFacts(x);
    for (const lang of LANG8_CODES) {
      const ui = EXT_UI[lang];
      const title = ui.metaTitle(x.ext);
      const desc = ui.metaDesc(f, ui.kindLabel[x.kind]);
      assert.ok(title.includes(x.ext), `${lang}/${x.ext}: 제목에 확장자가 없다`);
      assert.ok(desc.includes(f.mime), `${lang}/${x.ext}: 설명에 MIME이 없다`);
      assert.ok(desc.length > 40, `${lang}/${x.ext}: 설명이 너무 짧다`);
    }
  }
});

test('힌디어 문구에 라틴 낱말이 새지 않는다', () => {
  const ui = EXT_UI.hi;
  const texts = [ui.hubTitle, ui.hubLead, ...ui.how, ...ui.hubFaq.map(x => `${x.q} ${x.a}`), ...Object.values(ui.kindNote)];
  for (const t of texts) {
    // 확장자와 MIME, 프로그램 이름은 만국 공통이라 그대로 둔다
    const stripped = t
      .replace(/\.[a-z0-9]+/g, '')
      .replace(/[a-z]+\/[a-z0-9.+-]+/g, '')
      // 브랜드와 규격 이름만 예외다 — 나머지가 영어로 남아 있으면 번역이 덜 된 것이다
      .replace(/MIME|macOS|DOS|JPEG|PNG|3D/g, '');
    assert.ok(!/[A-Za-z]{5,}/.test(stripped), `힌디어에 라틴 낱말이 남았다: ${t}`);
  }
});

test('확장자 아이콘은 목록과 카드가 같은 그림을 쓴다', async () => {
  const { ICON_FOR } = await import('../lib/og-icon-map.ts');
  assert.equal(ICON_FOR[EXT_ICON], 'doc', '이모지가 문서 아이콘으로 이어지지 않는다');
});

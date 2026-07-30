/**
 * 이미지 크기가 스스로 어긋나지 않는지 본다.
 *
 * 인쇄물과 증명사진은 밀리미터가 먼저 정해져 있고 픽셀이 그 환산값이다.
 * 둘이 어긋나면 "A4 300dpi"라 적어 놓고 실제로는 다른 크기를 주게 되는데,
 * 화면에서는 그럴듯해 보인다. 그래서 두 값을 서로 대조한다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';

import { IMG_SIZES, IMG_SIZE_ICON, IMG_SIZE_SLUGS, SIZE_KINDS, imgSizeOf, sizesOfKind } from '../lib/imgsize/list.ts';
import { commonRatio, sameKind, sameRatio, sizeFacts } from '../lib/imgsize/facts.ts';
import { IMG_SIZE_UI } from '../lib/imgsize/ui.ts';
import { LANG8_CODES } from '../lib/i18n/lang8.ts';

test('100가지가 넘는다', () => {
  assert.ok(IMG_SIZES.length >= 100, `${IMG_SIZES.length}가지뿐이다`);
});

test('slug이 겹치지 않고 주소로 쓸 수 있다', () => {
  assert.equal(new Set(IMG_SIZE_SLUGS).size, IMG_SIZES.length, 'slug 중복');
  for (const x of IMG_SIZES) {
    assert.match(x.slug, /^[a-z0-9-]+$/, `주소에 못 쓰는 slug: ${x.slug}`);
    assert.ok(x.w > 0 && x.h > 0, `${x.slug}: 크기가 0이다`);
    assert.ok(Number.isInteger(x.w) && Number.isInteger(x.h), `${x.slug}: 픽셀이 정수가 아니다`);
  }
});

test('적어 둔 밀리미터와 픽셀이 같은 dpi를 가리킨다', () => {
  /*
    이 검사가 이 파일의 이유다. A4를 2480×3508이라 적고 밀리미터를 210×297로
    적었으면 두 값이 300dpi에서 만나야 한다. 한쪽만 틀려도 계산은 조용히
    다른 크기를 내놓는다.
  */
  for (const x of IMG_SIZES) {
    if (!x.mm) continue;
    const dx = x.w / (x.mm[0] / 25.4);
    const dy = x.h / (x.mm[1] / 25.4);
    assert.ok(Math.abs(dx - dy) < 8, `${x.slug}: 가로 ${dx.toFixed(0)}dpi와 세로 ${dy.toFixed(0)}dpi가 다르다`);
    assert.ok(
      [72, 150, 300].some(d => Math.abs(dx - d) < 8),
      `${x.slug}: ${dx.toFixed(0)}dpi — 72·150·300 어디에도 안 맞는다`,
    );
  }
});

test('알려진 크기의 값이 맞는다', () => {
  // 어디서 찾아봐도 같아야 하는 값들 — 계산식을 갈아엎어도 움직이지 않는 못이다
  const yt = sizeFacts(imgSizeOf('youtube-thumbnail')!);
  assert.equal(`${yt.w}×${yt.h}`, '1280×720');
  assert.equal(yt.ratioLabel, '16:9');

  const a4 = sizeFacts(imgSizeOf('a4-300dpi')!);
  assert.equal(`${a4.w}×${a4.h}`, '2480×3508');
  assert.deepEqual(a4.mm, [210, 297]);
  assert.equal(a4.ratioLabel, '1:√2', 'A판은 반으로 접어도 같은 비다');

  const ig = sizeFacts(imgSizeOf('instagram-square')!);
  assert.ok(ig.square);
  assert.equal(ig.ratioLabel, '1:1');
});

test('300dpi 환산이 밀리미터와 맞는다', () => {
  for (const x of IMG_SIZES) {
    const f = sizeFacts(x);
    assert.ok(Math.abs(f.printMm[0] - (x.w / 300) * 25.4) < 0.1, `${x.slug}: 가로 환산이 어긋난다`);
    // 인쇄물이 아니면 mm는 300dpi 환산값과 같아야 한다
    if (!x.mm) assert.deepEqual(f.mm, f.printMm, `${x.slug}: mm가 환산값과 다르다`);
  }
});

test('화면비 이름이 가장 가까운 것을 고른다', () => {
  assert.equal(commonRatio(16 / 9), '16:9');
  assert.equal(commonRatio(1), '1:1');
  assert.equal(commonRatio(Math.SQRT2), '1:√2');
  assert.equal(commonRatio(9 / 16), '16:9', '세로도 같은 이름이어야 한다');
  assert.equal(commonRatio(1.7), null, '흔한 비가 아니면 이름을 붙이지 않는다');
});

test('방향 판정이 서로 어긋나지 않는다', () => {
  for (const x of IMG_SIZES) {
    const f = sizeFacts(x);
    assert.equal(f.square, x.w === x.h, `${x.slug}: 정사각 판정이 다르다`);
    assert.equal(f.portrait, x.h > x.w, `${x.slug}: 세로 판정이 다르다`);
    if (f.square) assert.ok(!f.portrait, `${x.slug}: 정사각인데 세로로도 잡혔다`);
    assert.ok(f.ratioValue >= 1, `${x.slug}: 화면비 값이 1보다 작다`);
  }
});

test('갈래가 빈 곳 없이 덮는다', () => {
  for (const k of SIZE_KINDS) assert.ok(sizesOfKind(k).length > 0, `${k} 갈래가 비었다`);
  assert.equal(
    SIZE_KINDS.reduce((n, k) => n + sizesOfKind(k).length, 0),
    IMG_SIZES.length,
    '갈래에 안 들어간 크기가 있다',
  );
});

test('같은 비·같은 갈래 목록이 자기 자신을 뺀다', () => {
  for (const x of IMG_SIZES) {
    for (const list of [sameRatio(x.slug), sameKind(x.slug)]) {
      assert.ok(!list.some(o => o.slug === x.slug), `${x.slug}: 자기 자신이 들어 있다`);
    }
    for (const o of sameRatio(x.slug)) {
      assert.ok(
        Math.abs(sizeFacts(o).ratioValue - sizeFacts(x).ratioValue) < 0.02,
        `${x.slug}: 비가 다른 ${o.slug}가 섞였다`,
      );
    }
    for (const o of sameKind(x.slug)) assert.equal(o.kind, x.kind, `${x.slug}: 갈래가 다른 ${o.slug}가 섞였다`);
  }
});

test('용량 어림이 픽셀 수를 따른다', () => {
  for (const x of IMG_SIZES) {
    const f = sizeFacts(x);
    assert.ok(Math.abs(f.rawMb - (f.pixels * 3) / 1024 / 1024) < 0.1, `${x.slug}: 무압축 크기가 어긋난다`);
    assert.ok(f.jpegKb >= 0, `${x.slug}: JPEG 어림이 음수다`);
  }
  // 픽셀이 네 배면 용량도 네 배다
  const fhd = sizeFacts(imgSizeOf('video-fhd')!);
  const uhd = sizeFacts(imgSizeOf('video-4k')!);
  assert.ok(Math.abs(uhd.rawMb / fhd.rawMb - 4) < 0.05, '4K는 Full HD의 네 배여야 한다');
});

test('여덟 언어가 모두 채워져 있다', () => {
  const f = sizeFacts(imgSizeOf('youtube-thumbnail')!);
  for (const lang of LANG8_CODES) {
    const ui = IMG_SIZE_UI[lang];
    for (const [key, val] of Object.entries(ui)) {
      assert.ok(val != null, `${lang}.${key}가 비었다`);
      if (typeof val === 'string') assert.ok(val.trim().length > 0, `${lang}.${key}가 빈 문자열이다`);
    }
    assert.equal(ui.how.length, 4, `${lang}: 설명 수가 다르다`);
    assert.equal(ui.hubFaq.length, 5, `${lang}: 허브 FAQ 수가 다르다`);
    assert.equal(ui.sizeFaq(f, ui.kindLabel.social).length, 4, `${lang}: 상세 FAQ 수가 다르다`);
    for (const k of SIZE_KINDS) {
      assert.ok(ui.kindLabel[k], `${lang}: ${k} 이름이 없다`);
      assert.ok(ui.kindNote[k]?.length >= 10, `${lang}: ${k} 설명이 없다`);
    }
  }
});

test('FAQ 답이 그 크기의 숫자를 담고 있다', () => {
  for (const slug of ['youtube-thumbnail', 'a4-300dpi', 'favicon-16']) {
    const x = imgSizeOf(slug)!;
    const f = sizeFacts(x);
    for (const lang of LANG8_CODES) {
      const ui = IMG_SIZE_UI[lang];
      const joined = ui.sizeFaq(f, ui.kindLabel[x.kind]).map(q => `${q.q} ${q.a}`).join(' ');
      assert.ok(joined.includes(String(x.w)), `${lang}/${slug}: 가로가 안 들어갔다`);
      assert.ok(joined.includes(String(f.mm[0])), `${lang}/${slug}: 인쇄 크기가 안 들어갔다`);
      assert.ok(joined.includes(x.name), `${lang}/${slug}: 이름이 안 들어갔다`);
    }
  }
});

test('모든 크기가 여덟 언어 메타를 만든다', () => {
  for (const x of IMG_SIZES) {
    const f = sizeFacts(x);
    for (const lang of LANG8_CODES) {
      const ui = IMG_SIZE_UI[lang];
      const title = ui.metaTitle(x.name, x.w, x.h);
      const desc = ui.metaDesc(f, ui.kindLabel[x.kind]);
      assert.ok(title.includes(String(x.w)), `${lang}/${x.slug}: 제목에 가로가 없다`);
      assert.ok(desc.includes(x.name), `${lang}/${x.slug}: 설명에 이름이 없다`);
      const floor = lang === 'ja' || lang === 'ko' ? 25 : 40;
      assert.ok(desc.length > floor, `${lang}/${x.slug}: 설명이 너무 짧다`);
    }
  }
});

test('힌디어 문구에 라틴 낱말이 새지 않는다', () => {
  const ui = IMG_SIZE_UI.hi;
  const texts = [ui.hubTitle, ui.hubLead, ...ui.how, ...ui.hubFaq.map(x => `${x.q} ${x.a}`), ...Object.values(ui.kindNote)];
  for (const t of texts) {
    // 플랫폼 이름과 규격 이름은 만국 공통이라 그대로 둔다
    const stripped = t.replace(/YouTube|Instagram|dpi|A4|MB|KB|px/g, '');
    assert.ok(!/[A-Za-z]{5,}/.test(stripped), `힌디어에 라틴 낱말이 남았다: ${t}`);
  }
});

test('크기 아이콘은 목록과 카드가 같은 그림을 쓴다', async () => {
  const { ICON_FOR } = await import('../lib/og-icon-map.ts');
  assert.equal(ICON_FOR[IMG_SIZE_ICON], 'frame', '이모지가 액자 아이콘으로 이어지지 않는다');
});

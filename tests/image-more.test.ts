import { test } from 'node:test';
import assert from 'node:assert/strict';

import {
  placeMark, markFontSize, ANCHORS, filterString, NO_ADJUST, PRESETS,
  frame, cornerRadius, splitGrid, ICON_SIZES, squareCrop, manifestIcons, headTags,
} from '../lib/image-more.ts';

/**
 * 이미지 도구 여섯의 셈 검사.
 *
 * 캔버스는 node에서 못 돌리지만 자리와 크기를 정하는 셈은 순수하다. 이런 셈은
 * 눈으로 보면 그럴듯한데 한 픽셀씩 어긋나는 일이 잦아서, **되붙이면 원본이
 * 되는가** 같은 성질로 확인하는 편이 값 하나를 짚는 것보다 훨씬 세다.
 */

/* ────────── 워터마크 ────────── */

test('아홉 자리 모두 사진 안에 들어간다', () => {
  for (const a of ANCHORS) {
    const p = placeMark(1000, 600, 200, 60, a, 0.05);
    assert.ok(p.x >= 0 && p.y >= 0, `${a}: 음수 좌표 (${p.x}, ${p.y})`);
    assert.ok(p.x + 200 <= 1000, `${a}: 오른쪽으로 넘쳤다`);
    assert.ok(p.y + 60 <= 600, `${a}: 아래로 넘쳤다`);
  }
});

test('여백은 짧은 변을 기준으로 잡는다', () => {
  /*
   * 긴 변으로 잡으면 세로로 긴 사진에서 위아래 여백이 좌우보다 훨씬 커진다.
   * 600×1000 사진에서 왼쪽 여백과 위쪽 여백이 같아야 한다.
   */
  const p = placeMark(600, 1000, 100, 40, 'top-left', 0.05);
  assert.equal(p.x, p.y, `좌우 ${p.x} vs 위아래 ${p.y}`);
  assert.equal(p.x, 30, '짧은 변 600의 5%');
});

test('가운데 자리는 실제로 가운데다', () => {
  const p = placeMark(1000, 600, 200, 60, 'center', 0.05);
  assert.equal(p.x, 400);
  assert.equal(p.y, 270);
});

test('워터마크가 사진보다 크면 밖으로 나가지 않는다', () => {
  const p = placeMark(100, 100, 300, 300, 'bottom-right', 0.05);
  assert.equal(p.x, 0);
  assert.equal(p.y, 0);
});

test('글자 크기는 사진 크기를 따라간다', () => {
  const small = markFontSize(400, 300, 0.05);
  const big = markFontSize(4000, 3000, 0.05);
  assert.ok(big > small * 5, `큰 사진에서 안 커졌다: ${small} → ${big}`);
  assert.ok(markFontSize(20, 20, 0.05) >= 8, '너무 작아 안 보이는 크기가 나왔다');
});

/* ────────── 보정 ────────── */

test('아무것도 안 건드리면 필터가 none이다', () => {
  // "brightness(1)"을 늘어놓아도 결과는 같지만 캔버스가 그만큼 느려진다.
  assert.equal(filterString(NO_ADJUST), 'none');
});

test('기본값인 항목은 필터 문자열에 안 들어간다', () => {
  const s = filterString({ ...NO_ADJUST, brightness: 10 });
  assert.equal(s, 'brightness(1.1)');
  assert.equal(s.includes('contrast'), false);
  assert.equal(s.includes('grayscale'), false);
});

test('-100이면 0배, +100이면 2배가 된다', () => {
  assert.equal(filterString({ ...NO_ADJUST, saturate: -100 }), 'saturate(0)');
  assert.equal(filterString({ ...NO_ADJUST, saturate: 100 }), 'saturate(2)');
});

test('미리 만든 값들이 실제로 서로 다른 필터를 낸다', () => {
  const seen = new Set(PRESETS.map(p => filterString(p.adjust)));
  assert.equal(seen.size, PRESETS.length, '두 개가 같은 결과를 낸다');
  assert.equal(filterString(PRESETS[0].adjust), 'none', '첫째는 원본이어야 한다');
});

/* ────────── 테두리 ────────── */

test('원본 비율이면 테두리만큼만 커진다', () => {
  const f = frame(1000, 800, 'original', 0.05);
  const b = 40; // 짧은 변 800의 5%
  assert.equal(f.canvasW, 1000 + b * 2);
  assert.equal(f.canvasH, 800 + b * 2);
  assert.equal(f.x, b);
  assert.equal(f.y, b);
});

test('정사각으로 맞추면 캔버스가 정사각이 된다', () => {
  const f = frame(1000, 600, '1:1', 0.05);
  assert.equal(f.canvasW, f.canvasH, `${f.canvasW}×${f.canvasH}`);
});

test('사진은 늘어나지 않고 원래 크기 그대로 놓인다', () => {
  // 테두리를 두르려고 화질을 버리는 것은 맞바꿈이 안 맞는다.
  for (const r of ['1:1', '4:5', '16:9', '9:16'] as const) {
    const f = frame(1000, 600, r, 0.05);
    assert.equal(f.w, 1000, `${r}: 가로가 바뀌었다`);
    assert.equal(f.h, 600, `${r}: 세로가 바뀌었다`);
  }
});

test('어떤 비율에서도 사진이 캔버스 안에 다 들어간다', () => {
  for (const r of ['1:1', '4:5', '3:4', '16:9', '9:16'] as const) {
    for (const [w, h] of [[1000, 600], [600, 1000], [800, 800], [2000, 300]]) {
      const f = frame(w, h, r, 0.06);
      assert.ok(f.x >= 0 && f.y >= 0, `${r} ${w}×${h}: 음수 좌표`);
      assert.ok(f.x + f.w <= f.canvasW, `${r} ${w}×${h}: 가로로 넘쳤다`);
      assert.ok(f.y + f.h <= f.canvasH, `${r} ${w}×${h}: 세로로 넘쳤다`);
    }
  }
});

test('사진이 가운데에 놓인다', () => {
  const f = frame(1000, 600, '1:1', 0.05);
  assert.equal(f.x, f.canvasW - f.x - f.w, '좌우 여백이 다르다');
  assert.equal(f.y, f.canvasH - f.y - f.h, '위아래 여백이 다르다');
});

/* ────────── 모서리 ────────── */

test('100%면 짧은 변의 절반이 된다', () => {
  // 캔버스는 반지름이 변의 절반을 넘으면 못 그린다 — 100%가 그 한계여야 한다.
  assert.equal(cornerRadius(400, 200, 1), 100);
  assert.equal(cornerRadius(200, 200, 1), 100);
});

test('0%면 각진 모서리 그대로다', () => {
  assert.equal(cornerRadius(400, 200, 0), 0);
});

test('1을 넘겨도 절반을 넘지 않는다', () => {
  assert.equal(cornerRadius(400, 200, 3), 100);
  assert.equal(cornerRadius(400, 200, -1), 0);
});

/* ────────── 분할 ────────── */

test('조각을 도로 붙이면 원본 크기가 된다', () => {
  /*
   * 여기가 이 셈의 핵심이다. 나머지 픽셀을 버리면 작아지고, 마지막 조각에
   * 몰아주면 그 조각만 크다. 어느 쪽이든 격자로 붙였을 때 티가 난다.
   */
  for (const [w, h] of [[1000, 1000], [1001, 999], [1920, 1080], [7, 5]]) {
    for (const [c, r] of [[3, 3], [3, 1], [2, 5], [1, 1]]) {
      const tiles = splitGrid(w, h, c, r);
      assert.equal(tiles.length, c * r, `${w}×${h} ${c}×${r}: 조각 수`);
      const rowW = tiles.filter(t => t.row === 0).reduce((n, t) => n + t.w, 0);
      const colH = tiles.filter(t => t.col === 0).reduce((n, t) => n + t.h, 0);
      assert.equal(rowW, w, `${w}×${h} ${c}×${r}: 가로 합이 ${rowW}`);
      assert.equal(colH, h, `${w}×${h} ${c}×${r}: 세로 합이 ${colH}`);
    }
  }
});

test('조각 크기 차이가 한 픽셀을 넘지 않는다', () => {
  const tiles = splitGrid(1001, 1001, 3, 3);
  const ws = [...new Set(tiles.map(t => t.w))];
  assert.ok(Math.max(...ws) - Math.min(...ws) <= 1, `가로 차이 ${ws.join(', ')}`);
});

test('조각이 서로 겹치거나 틈이 생기지 않는다', () => {
  const tiles = splitGrid(1000, 700, 4, 3);
  for (const t of tiles) {
    const right = tiles.find(o => o.row === t.row && o.col === t.col + 1);
    if (right) assert.equal(t.x + t.w, right.x, `${t.index}과 오른쪽 사이가 안 맞는다`);
    const below = tiles.find(o => o.col === t.col && o.row === t.row + 1);
    if (below) assert.equal(t.y + t.h, below.y, `${t.index}과 아래 사이가 안 맞는다`);
  }
});

test('index는 왼쪽 위부터 가로로 센다', () => {
  const tiles = splitGrid(300, 300, 3, 3);
  assert.deepEqual(tiles.map(t => t.index), [0, 1, 2, 3, 4, 5, 6, 7, 8]);
  assert.equal(tiles[1].row, 0);
  assert.equal(tiles[1].col, 1);
  assert.equal(tiles[3].row, 1);
});

/* ────────── 파비콘 ────────── */

test('아이콘 크기가 겹치지 않고 파일 이름도 유일하다', () => {
  assert.equal(new Set(ICON_SIZES.map(i => i.size)).size, ICON_SIZES.length);
  assert.equal(new Set(ICON_SIZES.map(i => i.name)).size, ICON_SIZES.length);
});

test('각 플랫폼이 실제로 찾는 크기가 들어 있다', () => {
  const sizes = ICON_SIZES.map(i => i.size);
  for (const need of [16, 32, 180, 192, 512]) {
    assert.ok(sizes.includes(need), `${need}px이 없다`);
  }
});

test('파일 이름에 그 크기가 적혀 있다', () => {
  for (const i of ICON_SIZES) {
    if (i.use === 'apple') continue; // apple-touch-icon.png는 이름이 정해져 있다
    assert.ok(i.name.includes(String(i.size)), `${i.name}에 ${i.size}가 없다`);
  }
});

test('정사각 잘라내기는 짧은 변에 맞추고 가운데를 잡는다', () => {
  const wide = squareCrop(1000, 600);
  assert.equal(wide.size, 600);
  assert.equal(wide.y, 0);
  assert.equal(wide.x, 200);

  const tall = squareCrop(600, 1000);
  assert.equal(tall.size, 600);
  assert.equal(tall.x, 0);
  assert.equal(tall.y, 200);
});

test('매니페스트의 파일 이름이 실제로 만드는 파일과 같다', () => {
  // 어긋나면 안드로이드에서 아이콘이 안 뜬다. 사람이 눈으로 못 잡는 종류다.
  const made = new Set(ICON_SIZES.map(i => i.name));
  const m = JSON.parse(manifestIcons()) as { icons: { src: string; sizes: string }[] };
  assert.ok(m.icons.length > 0);
  for (const icon of m.icons) {
    assert.ok(made.has(icon.src.slice(1)), `매니페스트가 없는 파일을 가리킨다: ${icon.src}`);
  }
});

test('head 태그가 가리키는 파일도 실제로 만든다', () => {
  const made = new Set(ICON_SIZES.map(i => i.name));
  for (const m of headTags().matchAll(/href="\/([\w.-]+)"/g)) {
    if (m[1] === 'site.webmanifest') continue; // 매니페스트는 아이콘이 아니다
    assert.ok(made.has(m[1]), `head가 없는 파일을 가리킨다: ${m[1]}`);
  }
});

test('매니페스트의 크기 표기가 파일 이름과 어긋나지 않는다', () => {
  const m = JSON.parse(manifestIcons()) as { icons: { src: string; sizes: string }[] };
  for (const icon of m.icons) {
    const n = ICON_SIZES.find(i => i.name === icon.src.slice(1))!;
    assert.equal(icon.sizes, `${n.size}x${n.size}`, `${icon.src}의 크기 표기가 다르다`);
  }
});

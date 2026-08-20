import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { GLYPH_MIN_LUM, glyphAccent } from '../lib/og-accent.ts';

const ROOT = join(import.meta.dirname, '..');

const lum = (hex: string) => {
  const n = parseInt(hex.slice(1), 16);
  return 0.2126 * ((n >> 16) & 255) + 0.7152 * ((n >> 8) & 255) + 0.0722 * (n & 255);
};

/**
 * 공유 카드의 글리프가 바탕에 묻히지 않는다.
 *
 * 카드 바탕은 from→to 그라디언트고 글리프는 to 쪽에 앉는다. 강조색이 to면
 * 바탕과 같은 색이라 글리프 안쪽이 통째로 사라진다 — 갈래 스물여덟이 to로
 * 거의 검정을 쓰고 있어 그 카드들이 전부 «테두리만 남은 그림»이었다.
 */

test('어두운 to는 갈아 끼우고, 볼 만한 to는 그대로 둔다', () => {
  /* 그대로 두는 쪽 — 대부분의 갈래다. 여기가 바뀌면 카드 2천 장의 색이 바뀐다 */
  assert.equal(glyphAccent('#6366f1', '#6d28d9'), '#6d28d9');
  assert.equal(glyphAccent('#0ea5e9', '#db2777'), '#db2777');

  /* 갈아 끼우는 쪽 */
  assert.equal(glyphAccent('#7c3aed', '#0f172a'), '#7c3aed');
  assert.equal(glyphAccent('#0ea5e9', '#0f172a'), '#0ea5e9');

  /* 둘 다 어두우면 밝힌다 — 그대로 두면 안 보인다 */
  const both = glyphAccent('#000000', '#000000');
  assert.ok(lum(both) >= GLYPH_MIN_LUM, `둘 다 검정인데 ${both}가 나왔다`);
});

test('저장소에 적힌 색 짝이 하나도 안 묻힌다', () => {
  /*
    갈래마다 손으로 적은 색이라, 다음에 누가 어두운 짝을 새로 적을 수 있다.
    실제로 적혀 있는 값을 전부 긁어 통과하는지 본다.
  */
  const files = [
    ...readdirSync(join(ROOT, 'lib', 'og-cards')).map(f => join('lib/og-cards', f)),
    ...readdirSync(join(ROOT, 'lib')).filter(f => f.endsWith('.ts') || f.endsWith('.tsx')).map(f => join('lib', f)),
    ...readdirSync(join(ROOT, 'lib'), { withFileTypes: true }).filter(d => d.isDirectory())
      .map(d => join('lib', d.name, 'route.ts')),
  ];
  const pairs: [string, string, string][] = [];
  for (const f of files) {
    let src: string;
    try { src = readFileSync(join(ROOT, f), 'utf8'); } catch { continue; }
    /* 갈래마다 위에 상수로 적은 꼴 */
    const cf = /^const FROM = '(#[0-9a-f]{6})';/m.exec(src);
    const ct = /^const TO = '(#[0-9a-f]{6})';/m.exec(src);
    if (cf && ct) pairs.push([f, cf[1], ct[1]]);
    /* 카드마다 그 자리에 적은 꼴 */
    for (const m of src.matchAll(/from: '(#[0-9a-f]{6})',\s*\n?\s*to: '(#[0-9a-f]{6})'/g)) {
      pairs.push([f, m[1], m[2]]);
    }
  }
  /* 못 읽었으면 이 검사는 아무것도 안 본 것이다 */
  assert.ok(pairs.length > 100, `색 짝을 ${pairs.length}개밖에 못 읽었다`);

  const bad = pairs
    .filter(([, f, t]) => lum(glyphAccent(f, t)) < GLYPH_MIN_LUM)
    .map(([f, a, b]) => `${f}: ${a}→${b}`);
  assert.deepEqual(bad, [], `글리프가 바탕에 묻힌다:\n  ${bad.join('\n  ')}`);
});

test('카드가 실제로 이 색을 쓴다', () => {
  /*
    위 둘은 함수만 본다. 정작 ogCard가 glyphAccent를 안 부르면 전부 초록인 채로
    카드는 그대로 묻힌다 — 그래서 부르는 자리를 글자로 확인한다.
    (og-template은 JSX라 node --test가 못 읽는다. 그래서 글자로 본다.)
  */
  const src = readFileSync(join(ROOT, 'lib', 'og-template.tsx'), 'utf8');
  assert.match(src, /ogGlyph\(icon, glyphAccent\(from, to\)\)/,
    'ogCard가 glyphAccent를 안 쓴다 — 색을 고쳐도 카드는 그대로다');
});

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

/**
 * 공유 카드가 전송 한도를 갉아먹지 않는지, 그리고 읽히는지 본다.
 *
 * og-template.tsx는 JSX라 node --test가 import하지 못한다. 그래서 여기서는
 * 소스를 글자로 읽어 규칙이 살아 있는지 본다 — 실제 크기는 빌드 뒤에
 * next start로 재고 그 숫자를 주석에 남긴다.
 */
const ROOT = join(import.meta.dirname, '..');
const SRC = readFileSync(join(ROOT, 'lib', 'og-template.tsx'), 'utf8');

test('배경 그라디언트가 계단으로 쪼개져 있다', () => {
  /*
   * PNG는 무손실이라 매끄러운 그라디언트를 픽셀마다 다른 색으로 적는다.
   * 카드 한 장이 226KB가 됐고 이미 압축된 형식이라 전송할 때 더 줄지도 않는다
   * (gzip 후 221KB). 카드 1,899장이면 한 번 훑을 때 420MB다.
   *
   * 계단으로 쪼개면 같은 색이 넓게 이어져 PNG가 줄인다 — 실측 226KB → 86~105KB.
   * 매끄러운 stop으로 되돌리면 크기가 두 배 넘게 뛰는데, 눈으로는 똑같아서
   * 카드를 봐도 모른다.
   */
  assert.match(SRC, /const BANDS = \d+/, '계단 수가 없다');
  const bands = Number(/const BANDS = (\d+)/.exec(SRC)![1]);
  assert.ok(bands >= 8 && bands <= 32, `계단이 ${bands}개 — 너무 적으면 띠가 보이고 너무 많으면 커진다`);
  for (const id of ['bg', 'sheet', 'spot']) {
    const block = new RegExp(`id="${id}"[\\s\\S]{0,400}?</(linear|radial)Gradient>`).exec(SRC);
    assert.ok(block, `${id} 그라디언트를 못 찾았다`);
    assert.match(block[0], /banded/, `${id}가 계단을 안 쓴다 — 카드가 두 배로 커진다`);
  }
});

test('eyebrow가 어두운 배경에서 읽히는 색이다', () => {
  /*
   * eyebrow는 섹션의 to 색을 그대로 썼는데, to가 어두운 섹션이 쉰 곳이다
   * (paper·wifi·ext… 전부 #0f172a, 밝기 23). 카드 배경도 어두우므로 검은 배경에
   * 검은 글씨가 되어 아무도 못 읽었다 — 열 언어를 곱하면 500장이다.
   */
  const line = /fontSize: 20[^}]*color: ([^}]+)}/.exec(SRC);
  assert.ok(line, 'eyebrow 스타일을 못 찾았다');
  assert.match(line[1], /readableOnDark/, 'eyebrow가 색을 그대로 쓴다 — 어두운 섹션에서 안 보인다');
});

test('밝기를 올리는 계산이 실제로 올린다', () => {
  /*
   * 함수 자체를 부르려면 JSX 파일을 import해야 해서, 같은 식을 여기서 다시
   * 세워 성질만 본다. 식이 바뀌면 여기도 같이 바꿔야 한다는 뜻이지만,
   * 그 편이 "올린다고 적어 놓고 안 올리는" 것보다 낫다.
   */
  const lum = (h: string) => {
    const n = parseInt(h.slice(1), 16);
    return 0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255);
  };
  const min = Number(/readableOnDark\(hex: string, minLum = (\d+)\)/.exec(SRC)![1]);
  assert.ok(min >= 120, `밝기 하한이 ${min} — 어두운 배경에서 읽히려면 120은 넘어야 한다`);
  assert.ok(lum('#0f172a') < min, '기준이 되는 어두운 색이 이미 하한을 넘는다 — 검사가 헛돈다');
});

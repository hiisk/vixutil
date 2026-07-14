import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, relative } from 'node:path';
import { REFERRALS, REFERRAL_REL } from '../lib/referral.ts';

const ROOT = join(import.meta.dirname, '..');
const OUT = join(ROOT, 'out');
const built = existsSync(OUT);

test('제휴 링크가 lib/referral.ts 한 곳에서만 관리된다', () => {
  // 링크가 두 벌로 갈라지면 한쪽만 바뀌는 사고가 난다.
  // (실제로 크립토 페이지가 별도로 하드코딩하고 있었다.)
  const hardcoded: string[] = [];

  const scan = (dir: string) => {
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      const p = join(dir, e.name);
      if (e.isDirectory()) { scan(p); continue; }
      if (!/\.tsx?$/.test(e.name)) continue;
      if (relative(ROOT, p) === join('lib', 'referral.ts')) continue;

      const src = readFileSync(p, 'utf8');
      for (const r of REFERRALS) {
        const host = new URL(r.href).host;
        if (src.includes(host)) hardcoded.push(`${relative(ROOT, p)}: ${host}`);
      }
    }
  };
  for (const d of ['app', 'components', 'lib']) scan(join(ROOT, d));

  assert.deepEqual(hardcoded, [], `제휴 링크를 직접 박아둔 곳:\n  ${hardcoded.join('\n  ')}`);
});

test('제휴 링크에 rel="sponsored"가 붙는다', () => {
  // 제휴 링크임을 검색엔진에 알리지 않으면 링크 스팸으로 취급될 수 있다.
  assert.match(REFERRAL_REL, /sponsored/, 'rel에 sponsored가 없다');
  assert.match(REFERRAL_REL, /noopener/, 'rel에 noopener가 없다 — 새 탭 보안');

  const footer = readFileSync(join(ROOT, 'components', 'SiteFooter.tsx'), 'utf8');
  assert.match(footer, /rel=\{REFERRAL_REL\}/, '푸터가 REFERRAL_REL을 쓰지 않는다');
});

test('푸터가 제휴 링크를 광고로 명시한다', () => {
  // 광고임을 숨기면 당장은 클릭이 늘어도 신뢰를 잃는다.
  const footer = readFileSync(join(ROOT, 'components', 'SiteFooter.tsx'), 'utf8');
  assert.match(footer, /광고/, '푸터에 광고 표기가 없다');
});

test('빌드된 페이지에 제휴 링크가 실린다', { skip: built ? false : 'out/ 없음 — npm run build 필요' }, () => {
  const walk = (dir: string, out: string[] = []): string[] => {
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      const p = join(dir, e.name);
      if (e.isDirectory()) walk(p, out);
      else if (e.name.endsWith('.html')) out.push(p);
    }
    return out;
  };

  const pages = walk(OUT);
  const host = new URL(REFERRALS[0].href).host;
  const withRef = pages.filter(p => readFileSync(p, 'utf8').includes(host));

  // 푸터가 있는 페이지에는 전부 실려야 한다. 404 등 몇 개는 푸터가 없다.
  const ratio = withRef.length / pages.length;
  assert.ok(ratio > 0.9, `제휴 링크가 ${withRef.length}/${pages.length} 페이지에만 있다`);
});

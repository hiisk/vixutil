/**
 * 제휴 카드가 모든 화면에 정확히 한 번 뜨는지 본다.
 *
 * 예전에는 화면마다 손으로 넣었다. 그 결과 코인·운세·뽑기·관상 네 섹션에만
 * 있었고 나머지 스물일곱 섹션 — 방문의 대부분 — 은 카드를 아예 못 봤다.
 * 손으로 넣는 방식은 새 페이지를 만들 때마다 또 빠진다.
 *
 * 지금은 SiteFooter가 기본으로 세운다. 모든 화면이 이미 푸터를 쓰므로 새
 * 페이지도 자동으로 딸려 온다. 결과 화면처럼 본문 한가운데 자기 카드를 세운
 * 페이지만 referral={false}로 푸터 자리를 끈다.
 *
 * 이 검사가 지키는 것은 둘이다.
 *  - 끄기만 하고 자기 카드를 안 세운 페이지 (그 화면엔 카드가 아예 없다)
 *  - 자기 카드를 세워 놓고 끄지 않은 페이지 (같은 광고가 두 번 뜬다)
 *
 * 조건부로만 뜨는 카드(결과를 봐야 나오는 것)는 끄지 않는다 — 끄면 결과를 보기
 * 전까지 그 화면에 카드가 없다. 실제로 여덟 장이 그 상태가 됐다가 되돌렸다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join, relative } from 'node:path';
import { appEntries } from './app-path.ts';

const ROOT = join(import.meta.dirname, '..');

function tsxFiles(dir: string, out: string[] = []): string[] {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) tsxFiles(p, out);
    else if (e.name.endsWith('.tsx')) out.push(p);
  }
  return out;
}

/*
  카드를 정의하는 파일 자신은 "화면"이 아니라 세지 않는다. ReferralAside(옆 레일)는
  머리 주석에서 referral={false} 규칙을 설명하고 있어서, 안 빼면 그 낱말만 보고
  "푸터를 껐는데 카드가 없는 화면"으로 잡혔다.
*/
const CARD_DEFS = ['SiteFooter.tsx', 'ReferralCards.tsx', 'ReferralAside.tsx'];
const files = [...tsxFiles(join(ROOT, 'app')), ...tsxFiles(join(ROOT, 'components'))]
  .filter(f => !CARD_DEFS.some(d => f.endsWith(d)));

test('푸터 카드를 끈 화면은 자기 카드를 세운다', () => {
  const bad: string[] = [];
  for (const f of files) {
    const src = readFileSync(f, 'utf8');
    if (!src.includes('referral={false}')) continue;
    if (!src.includes('<ReferralCards')) bad.push(relative(ROOT, f));
  }
  assert.deepEqual(bad, [], `푸터 카드를 껐는데 대신 세운 카드가 없다 — 이 화면엔 제휴 카드가 아예 없다:\n  ${bad.join('\n  ')}`);
});

test('늘 보이는 자기 카드를 세운 화면은 푸터 카드를 끈다', () => {
  const bad: string[] = [];
  for (const f of files) {
    const src = readFileSync(f, 'utf8');
    if (!src.includes('<ReferralCards') || !src.includes('<SiteFooter')) continue;
    if (src.includes('referral={false}')) continue;
    // 조건부로만 뜨는 카드는 푸터 것을 남겨 두는 것이 맞다.
    // 여는 중괄호 안에서 &&로 걸려 있거나, 반환문 최상단이 아닌 깊은 자리에 있으면 조건부로 본다.
    const line = src.split('\n').find(l => l.includes('<ReferralCards')) ?? '';
    const indent = line.length - line.trimStart().length;
    const conditional = /&&\s*<ReferralCards/.test(src) || indent >= 10;
    if (!conditional) bad.push(relative(ROOT, f));
  }
  assert.deepEqual(bad, [], `자기 카드와 푸터 카드가 겹친다. SiteFooter에 referral={false}를 넣어라:\n  ${bad.join('\n  ')}`);
});

test('제휴 링크는 sponsored를 달고 새 창으로 연다', () => {
  // 제휴 링크임을 검색엔진에 알리지 않으면 링크 스팸으로 취급될 수 있다.
  const src = readFileSync(join(ROOT, 'components', 'ReferralCards.tsx'), 'utf8');
  assert.ok(src.includes('rel={REFERRAL_REL}'), 'rel이 REFERRAL_REL이 아니다');
  assert.ok(src.includes("target=\"_blank\""), '새 창으로 열지 않는다');
});

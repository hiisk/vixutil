import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, relative } from 'node:path';
import {
  REFERRALS, RANKED_REFERRALS, REFERRAL_REL, hasRankBasis,
  RISK_NOTE_KO, RISK_NOTE_EN,
} from '../lib/referral.ts';

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

  const card = readFileSync(join(ROOT, 'components', 'ReferralCards.tsx'), 'utf8');
  assert.match(card, /rel=\{REFERRAL_REL\}/, '카드가 REFERRAL_REL을 쓰지 않는다');
});

test('제휴 카드가 광고임을 명시한다', () => {
  // 광고임을 숨기면 당장은 클릭이 늘어도 신뢰를 잃는다.
  // 푸터에 있던 표기를 카드로 옮겼으므로 검사도 카드를 본다.
  const card = readFileSync(join(ROOT, 'components', 'ReferralCards.tsx'), 'utf8');
  assert.match(card, /'광고'/, '한국어 광고 표기가 없다');
  assert.match(card, /'Ad'/, '영어 광고 표기가 없다');
});

test('제휴 카드에 원금 손실·제휴 관계 고지가 함께 붙는다', () => {
  // 카드를 크게 키우기로 하면서 더 필요해진 것들이다. 크기만 키우고 고지를 떼면
  // 원금 전액을 잃을 수 있는 상품을 수수료 받고 밀어주는 모양이 된다.
  const card = readFileSync(join(ROOT, 'components', 'ReferralCards.tsx'), 'utf8');
  assert.ok(card.includes('RISK_NOTE_KO') && card.includes('RISK_NOTE_EN'), '카드가 위험 고지를 렌더하지 않는다');
  assert.match(RISK_NOTE_KO, /원금/, '원금 손실 언급 누락');
  assert.match(RISK_NOTE_KO, /제휴|수수료/, '제휴 관계 고지 누락');
  assert.match(RISK_NOTE_EN, /principal/i, 'principal 언급 누락');
  assert.match(RISK_NOTE_EN, /affiliate|commission/i, '제휴 관계 고지 누락');
});

test('"1위" 문구는 무엇에 대한 1위인지 밝힌다', () => {
  // 근거 없는 종합 순위("코인 선물 사이트 1위")를 사실처럼 내보내지 않기 위한 규칙이다.
  // 돈이 오가는 결정을 앞둔 사람에게 확인할 수 없는 순위를 보여주면 안 된다.
  for (const r of REFERRALS) {
    assert.ok(hasRankBasis(r.ko.rankLabel), `${r.id}: 한국어 순위 근거 없음 — "${r.ko.rankLabel}"`);
    assert.ok(hasRankBasis(r.en.rankLabel), `${r.id}: 영어 순위 근거 없음 — "${r.en.rankLabel}"`);
  }
});

test('근거 없는 순위 문구는 규칙에 걸린다', () => {
  // 규칙이 실제로 거르는지 확인한다 — 통과만 하는 검사는 아무것도 지키지 못한다.
  assert.equal(hasRankBasis('1위'), false);
  assert.equal(hasRankBasis('#1'), false);
  assert.equal(hasRankBasis('선물 거래량 1위'), true);
  assert.equal(hasRankBasis('#1 new-user bonus'), true);
});

test('모든 제휴 항목에 한국어·영어 문구가 모두 있다', () => {
  // crypto 섹션은 영어, 나머지는 한국어라 두 벌이 항상 있어야 한다.
  for (const r of REFERRALS) {
    for (const [lang, copy] of [['ko', r.ko], ['en', r.en]] as const) {
      assert.ok(copy.rankLabel.length > 0, `${r.id}.${lang}: rankLabel 누락`);
      assert.ok(copy.bonus.length > 0, `${r.id}.${lang}: bonus 누락`);
      assert.ok(copy.perks.length > 0, `${r.id}.${lang}: perks 비어 있음`);
      assert.ok(copy.cta.length > 0, `${r.id}.${lang}: cta 누락`);
    }
    assert.ok(r.href.startsWith('https://'), `${r.id}: https가 아니다`);
  }
});

test('노출 순서에 중복이나 빈틈이 없다', () => {
  const ranks = REFERRALS.map(r => r.rank);
  assert.equal(new Set(ranks).size, ranks.length, 'rank 중복');
  assert.deepEqual([...ranks].sort(), REFERRALS.map((_, i) => i + 1), 'rank가 1부터 연속이 아니다');
  assert.deepEqual(RANKED_REFERRALS.map(r => r.rank), [...ranks].sort());
});

test('혜택 금액이 화면 쪽에 하드코딩돼 있지 않다', () => {
  // 예전에는 푸터와 signals 페이지가 각각 금액을 박아두고 있었다.
  // 프로모션이 바뀔 때 한 군데만 고치면 두 화면이 다른 금액을 말하게 된다.
  const amounts = REFERRALS.flatMap(r => [r.ko.bonus, r.en.bonus])
    .map(b => b.replace(/[^0-9,]/g, ''))
    .filter(n => n.length > 0);

  for (const file of [
    join('components', 'ReferralCards.tsx'),
    join('components', 'SiteFooter.tsx'),
    join('app', 'crypto', 'signals', 'page.tsx'),
  ]) {
    const src = readFileSync(join(ROOT, file), 'utf8');
    for (const n of amounts) {
      assert.ok(!src.includes(`$${n}`), `${file}: 금액 $${n}이 하드코딩돼 있다`);
    }
  }
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

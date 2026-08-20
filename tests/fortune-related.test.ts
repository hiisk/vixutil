import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { FORTUNE_RELATED } from '../lib/fortune-related.ts';
import { pickRelated } from '../lib/related.ts';

/**
 * 운세 낱장이 서로 이어져 있는지.
 *
 * 스물셋이 전부 막다른 길이었다 — 낱장에서 갈 수 있는 곳이 허브 하나뿐이라,
 * 뒤에 낸 페이지는 들어오는 링크가 0이었다. 목록이 실제 폴더와 어긋나거나
 * 낱장이 관련 항목을 안 그리면 그 상태로 되돌아간다.
 */

const ROOT = join(import.meta.dirname, '..');
const DIR = join(ROOT, 'app', '(ko)', 'fortune');

const folders = readdirSync(DIR, { withFileTypes: true })
  .filter(d => d.isDirectory()).map(d => d.name).sort();

test('목록이 실제 낱장 폴더와 정확히 같다', () => {
  /* 새 도구를 내고 여기 안 적으면 그 페이지만 다시 고아가 된다 */
  const listed = [...FORTUNE_RELATED].map(i => i.slug).sort();
  assert.deepEqual(listed, folders,
    `목록에만 있는 것: ${listed.filter(s => !folders.includes(s))}\n` +
    `폴더에만 있는 것: ${folders.filter(s => !listed.includes(s))}`);
});

/**
 * 관련 항목을 안 그려도 되는 곳.
 *
 * card(타로 78장 사전)는 열 언어가 함께 쓰는 허브 컴포넌트
 * (components/tarot/TarotHubPage.tsx)로 그려진다. 한국어 목록을 그 안에 넣으면
 * 아홉 언어 화면에 한국어 링크가 뜬다. 그리고 이쪽은 이미 카드 78장으로
 * 뻗어 나가는 허브라 막다른 길이 아니다 — 필요한 것은 **들어오는** 링크였고,
 * 그건 다른 낱장들이 FORTUNE_RELATED로 가리켜 주는 것으로 해결됐다.
 */
const NO_RELATED = ['card'];

test('낱장마다 관련 항목을 그린다', () => {
  const missing = folders.filter(f => {
    if (NO_RELATED.includes(f)) return false;
    const src = readFileSync(join(DIR, f, 'page.tsx'), 'utf8');
    /* 페이지가 컴포넌트에 위임하는 경우도 있으니 그쪽까지 본다 */
    if (src.includes('RelatedContent')) return false;
    const m = src.match(/import (\w+) from '@\/components\/([\w/]+)'/g) ?? [];
    for (const imp of m) {
      const path = imp.match(/'@\/components\/([\w/]+)'/)?.[1];
      if (!path) continue;
      try {
        if (readFileSync(join(ROOT, 'components', `${path}.tsx`), 'utf8').includes('RelatedContent')) return false;
      } catch { /* 없는 경로는 넘긴다 */ }
    }
    return true;
  });
  assert.deepEqual(missing, [], `관련 항목이 없는 운세 낱장:\n  ${missing.join('\n  ')}`);
});

test('어느 낱장도 들어오는 링크가 0이 아니다', () => {
  /*
   * pickRelated는 같은 갈래를 우선하되 마지막 한 칸을 «목록상 다음 항목»에
   * 고정한다. 그 덕에 전체가 하나의 고리로 이어진다 — 그 성질이 실제로
   * 성립하는지 여기서 센다.
   */
  const inbound = new Map(FORTUNE_RELATED.map(i => [i.slug, 0]));
  for (const item of FORTUNE_RELATED) {
    for (const p of pickRelated(FORTUNE_RELATED, item.slug, 6)) {
      inbound.set(p.slug, (inbound.get(p.slug) ?? 0) + 1);
    }
  }
  const orphans = [...inbound].filter(([, n]) => n === 0).map(([s]) => s);
  assert.deepEqual(orphans, [], `아무도 안 가리키는 낱장: ${orphans.join(', ')}`);
});

test('갈래마다 이웃이 하나는 있다', () => {
  /* 혼자뿐인 갈래는 «○○ 더 보기»에 자기 말고 아무것도 못 낸다 */
  const byCat = new Map<string, number>();
  for (const i of FORTUNE_RELATED) byCat.set(i.category, (byCat.get(i.category) ?? 0) + 1);
  const lonely = [...byCat].filter(([, n]) => n < 2).map(([c]) => c);
  assert.deepEqual(lonely, [], `혼자뿐인 갈래: ${lonely.join(', ')}`);
});

test('이 검사가 실제로 문다', () => {
  assert.ok(folders.length > 20, `운세 폴더가 ${folders.length}개뿐이다 — 경로가 틀렸다`);
  assert.ok(FORTUNE_RELATED.length > 20);
  /* 목록에서 하나 빼면 폴더와 어긋나야 한다 */
  const short = FORTUNE_RELATED.slice(1).map(i => i.slug).sort();
  assert.notDeepEqual(short, folders, '하나를 빼도 같다면 이 검사는 아무것도 안 재고 있다');
  /* 추천이 자기 자신을 내면 안 된다 */
  for (const i of FORTUNE_RELATED) {
    assert.ok(!pickRelated(FORTUNE_RELATED, i.slug, 6).some(p => p.slug === i.slug),
      `${i.slug}가 자기 자신을 추천한다`);
  }
  /* 예외로 둔 것도 «들어오는» 링크는 있어야 한다 — 그게 이 작업의 목적이다 */
  for (const slug of NO_RELATED) {
    const inbound = FORTUNE_RELATED.filter(i => pickRelated(FORTUNE_RELATED, i.slug, 6).some(p => p.slug === slug));
    assert.ok(inbound.length > 0, `${slug}를 가리키는 낱장이 없다`);
  }
});

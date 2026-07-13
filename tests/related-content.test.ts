import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { pickRelated, type RelatedItem } from '../lib/related.ts';

const APP = join(import.meta.dirname, '..', 'app');
const SECTIONS = ['test', 'quiz', 'checklist', 'generator'] as const;

test('상세 페이지는 모두 RelatedContent를 렌더링한다', () => {
  // 추천이 빠지면 상세 페이지가 허브로만 이어지는 막다른 길이 된다.
  const unwired = SECTIONS.filter(s => {
    const src = readFileSync(join(APP, s, '[slug]', 'page.tsx'), 'utf8');
    return !src.includes('<RelatedContent');
  });
  assert.deepEqual(unwired, [], `추천이 없는 섹션: ${unwired.join(', ')}`);
});

const make = (n: number, cats: string[]): RelatedItem[] =>
  Array.from({ length: n }, (_, i) => ({
    slug: `s${i}`, title: `T${i}`, desc: `D${i}`, icon: '🔵',
    category: cats[i % cats.length],
  }));

const slugsOf = (items: RelatedItem[], slug: string, limit = 6) =>
  pickRelated(items, slug, limit).map(i => i.slug);

test('모든 항목이 최소 한 번은 추천된다 — 고아 페이지가 없다', () => {
  // 카테고리에 혼자뿐인 항목도 순환 고리 덕분에 인바운드 링크를 받아야 한다.
  const items: RelatedItem[] = [...make(20, ['A', 'B', 'C']), {
    slug: 'lonely', title: '외톨이', desc: '혼자뿐인 카테고리', icon: '🕳️', category: 'Z',
  }];
  const inbound = new Map(items.map(i => [i.slug, 0]));
  for (const i of items) {
    for (const s of slugsOf(items, i.slug)) inbound.set(s, (inbound.get(s) ?? 0) + 1);
  }
  const orphans = [...inbound].filter(([, n]) => n === 0).map(([s]) => s);
  assert.deepEqual(orphans, [], `아무도 링크하지 않는 항목: ${orphans.join(', ')}`);
});

test('자기 자신을 추천하지 않고 중복도 없다', () => {
  const items = make(30, ['A', 'B']);
  for (const i of items) {
    const picked = slugsOf(items, i.slug);
    assert.ok(!picked.includes(i.slug), `${i.slug}: 자기 자신을 추천함`);
    assert.equal(new Set(picked).size, picked.length, `${i.slug}: 중복 추천`);
  }
});

test('같은 카테고리를 우선 추천한다', () => {
  const items = make(30, ['A', 'B', 'C']);
  const picked = slugsOf(items, 's0');
  const same = picked.filter(s => items.find(i => i.slug === s)!.category === 'A');
  // 6칸 중 마지막 한 칸은 순환 고리용이므로 나머지 5칸은 같은 카테고리여야 한다.
  assert.ok(same.length >= 5, `같은 카테고리 추천이 ${same.length}개뿐`);
});

test('결정론적이다 — 같은 입력이면 같은 결과', () => {
  // 빌드마다 링크가 바뀌면 크롤러가 보는 링크 구조가 흔들린다.
  const items = make(25, ['A', 'B']);
  assert.deepEqual(slugsOf(items, 's7'), slugsOf(items, 's7'));
});

test('항목이 적으면 한도를 넘겨 채우지 않는다', () => {
  assert.equal(slugsOf(make(3, ['A']), 's0', 6).length, 2);
});

test('없는 slug를 주면 빈 목록을 준다', () => {
  assert.deepEqual(pickRelated(make(10, ['A']), '없는-slug'), []);
});

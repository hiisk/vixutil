import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

/**
 * 공유 카드에 들어가는 글자 정리.
 *
 * og-template.tsx는 JSX가 들어 있어 node --test가 파싱하지 못한다. 그래서
 * 함수를 직접 부르지 못하고, 정규식만 소스에서 떼어 와 같은 동작을 확인한다.
 */
const src = readFileSync('lib/og-template.tsx', 'utf8');

/** stripForCard 본문의 replace 규칙을 그대로 재현한다 */
function stripForCard(text: string): string {
  const body = src.slice(src.indexOf('export function stripForCard'), src.indexOf('/** 그림의 중심'));
  const patterns = [...body.matchAll(/\.replace\((\/[^/]+\/[gu]*), '([^']*)'\)/g)];
  assert.ok(patterns.length >= 3, `replace 규칙을 못 찾음 (${patterns.length}개)`);
  let out = text;
  for (const [, re, to] of patterns) {
    const m = re.match(/^\/([\s\S]*)\/([gu]*)$/);
    out = out.replace(new RegExp(m![1], m![2]), to);
  }
  return out.trim();
}

test('카드 정리 함수가 소스에 있고 카드 렌더에 쓰인다', () => {
  assert.match(src, /export function stripForCard/);
  assert.match(src, /const sub = stripForCard\(desc\)/);
});

test('문자 이모티콘의 괘선·도형이 빠진다 — 폰트가 이 글자를 못 받는다', () => {
  // 이것 때문에 빌드 로그에 "Failed to load dynamic font ... 400"이 세 번 찍혔다
  const out = stripForCard('(╯°□°）╯ 같은 문자 이모티콘 복사');
  assert.ok(!/[─-◿]/.test(out), `괘선·도형이 남았다: ${out}`);
  assert.ok(out.includes('문자 이모티콘 복사'), out);
});

test('이모지는 계속 빠진다', () => {
  assert.equal(stripForCard('사주 탈탈 털어보자 🧓'), '사주 탈탈 털어보자');
});

test('화살표는 남긴다 — 계산기 설명이 문장 부호로 쓴다', () => {
  assert.ok(stripForCard('월급 → 실수령액').includes('→'));
});

test('한글·한자·라틴 문자는 건드리지 않는다', () => {
  assert.equal(stripForCard('四面楚歌 사면초가 Sa-myeon-cho-ga'), '四面楚歌 사면초가 Sa-myeon-cho-ga');
  assert.equal(stripForCard('UTC+5:45 · 230V 50Hz'), 'UTC+5:45 · 230V 50Hz');
});

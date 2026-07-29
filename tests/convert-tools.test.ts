import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  CONVERT_TOOLS, CONVERT_MAP, CONVERT_CATEGORIES, convert, convertBack, format,
  findConvertTool, relatedConvertTools,
} from '../lib/convert-tools.ts';
import { convertFaq } from '../lib/convert-faq.ts';
import { SECTION_FAQ } from '../lib/section-faq.ts';

const ROOT = join(import.meta.dirname, '..');

/**
 * 쉰 개를 엔진 하나가 그린다. 그래서 화면이 아니라 데이터가 틀릴 위험이 크다 —
 * 계수 하나가 어긋나도 화면은 멀쩡해 보이고, 그 단위를 실제로 쓰는 사람만 안다.
 */

test('쉰 개 이상을 담는다', () => {
  assert.ok(CONVERT_TOOLS.length >= 50, `${CONVERT_TOOLS.length}개뿐`);
  assert.ok(new Set(CONVERT_TOOLS.map(t => t.category)).size >= 8, '분류가 너무 적다');
});

test('slug와 제목이 중복되지 않는다', () => {
  for (const key of ['slug', 'title', 'metaTitle', 'long'] as const) {
    const vals = CONVERT_TOOLS.map(t => t[key]);
    const dup = [...new Set(vals.filter((v, i) => vals.indexOf(v) !== i))];
    assert.deepEqual(dup, [], `${key}가 겹친다: ${dup.join(' / ')}`);
  }
});

test('모든 도구에 필요한 값이 있다', () => {
  for (const t of CONVERT_TOOLS) {
    assert.ok(t.from.trim() && t.to.trim(), `${t.slug}: 단위 이름 누락`);
    assert.ok(Number.isFinite(t.factor) && t.factor !== 0, `${t.slug}: 계수가 이상하다`);
    assert.ok(t.digits >= 0 && t.digits <= 6, `${t.slug}: 자릿수가 이상하다`);
    assert.ok(t.quick.length >= 4, `${t.slug}: 자주 찾는 값이 부족하다`);
    assert.ok(t.long.length >= 40, `${t.slug}: 설명이 짧다`);
    assert.ok(t.note.length >= 30, `${t.slug}: 주의사항이 짧다`);
    assert.ok(CONVERT_CATEGORIES.includes(t.category), `${t.slug}: 허브에 없는 분류 ${t.category}`);
  }
});

test('변환과 역변환이 서로 맞는다', () => {
  for (const t of CONVERT_TOOLS) {
    for (const v of [0, 1, 7.5, 100]) {
      const back = convertBack(convert(v, t), t);
      assert.ok(Math.abs(back - v) < 1e-6, `${t.slug}: ${v} → ${convert(v, t)} → ${back}`);
    }
  }
});

test('알려진 값과 일치한다', () => {
  const at = (slug: string, v: number) => convert(v, CONVERT_MAP[slug]);
  // 정의값 — 어긋나면 계수가 잘못된 것이다
  assert.ok(Math.abs(at('cm-inch', 2.54) - 1) < 1e-6, '2.54cm는 1인치');
  assert.ok(Math.abs(at('m-feet', 0.3048) - 1) < 1e-6, '0.3048m는 1피트');
  assert.ok(Math.abs(at('km-mile', 1.609344) - 1) < 1e-6, '1.609344km는 1마일');
  assert.equal(at('celsius-fahrenheit', 100), 212, '물 끓는점');
  assert.equal(at('celsius-fahrenheit', 0), 32, '물 어는점');
  assert.equal(at('celsius-kelvin', -273.15), 0, '절대영도');
  assert.equal(at('geun-g', 1), 600, '고기 한 근');
  assert.equal(at('don-g', 1), 3.75, '금 한 돈');
  assert.equal(at('byte-bit', 1), 8, '1바이트는 8비트');
  assert.equal(at('mbps-mbs', 100), 12.5, '100Mbps는 12.5MB/s');
  assert.equal(at('cubicm-l', 1), 1000, '1㎥는 1000L');
  assert.ok(Math.abs(at('pyeong-m2', 1) - 3.305785) < 1e-5, '1평');
});

test('정수 결과의 0을 지우지 않는다', () => {
  // 꼬리 0을 무조건 지우면 600g이 6g이 된다 — 실제로 그렇게 만들었다가 잡은 버그다
  assert.equal(format(600, 0), '600');
  assert.equal(format(1000, 1), '1000');
  assert.equal(format(1.5, 2), '1.5');
  assert.equal(format(1.0, 2), '1');
  assert.equal(format(0, 2), '0');
});

test('FAQ가 실제 계산값을 담는다', () => {
  for (const t of CONVERT_TOOLS) {
    const faq = convertFaq(t);
    assert.equal(faq.length, 3, `${t.slug}: FAQ 개수`);
    for (const item of faq) {
      assert.ok(item.q.trim().length > 0, `${t.slug}: 빈 질문`);
      assert.ok(item.a.trim().length >= 20, `${t.slug}: 답변이 짧다 — ${item.q}`);
    }
    // 첫 문항의 답에는 1단위 변환값이 들어가야 한다
    assert.ok(faq[0].a.includes(format(convert(1, t), Math.max(t.digits, 2))), `${t.slug}: 계산값이 답에 없다`);
  }
});

test('허브와 상세 라우트가 있다', () => {
  assert.ok(existsSync(join(ROOT, 'app', 'convert', 'page.tsx')));
  assert.ok(existsSync(join(ROOT, 'app', 'convert', '[slug]', 'page.tsx')));
  assert.ok(existsSync(join(ROOT, 'app', 'convert', '[slug]', 'opengraph-image.tsx')));
  assert.ok((SECTION_FAQ.convert ?? []).length >= 3, '허브 FAQ가 부족하다');
});

test('허브가 모든 분류를 그린다', () => {
  const hub = readFileSync(join(ROOT, 'app', 'convert', 'page.tsx'), 'utf8');
  assert.ok(hub.includes('CONVERT_CATEGORIES'), '허브가 분류 목록을 쓰지 않는다');
  const orphan = CONVERT_TOOLS.filter(t => !CONVERT_CATEGORIES.includes(t.category));
  assert.deepEqual(orphan, [], '허브에 안 그려지는 도구가 있다');
});

test('검색 인덱스·사이트맵·푸터가 이 섹션을 싣는다', () => {
  const index = readFileSync(join(ROOT, 'lib', 'search-index.ts'), 'utf8');
  assert.ok(index.includes('CONVERT_TOOLS'), '검색 인덱스 누락');
  assert.ok(index.includes('convert:'), 'SECTION_META 누락');

  const sitemap = readFileSync(join(ROOT, 'app', 'sitemap.ts'), 'utf8');
  assert.ok(sitemap.includes('CONVERT_TOOLS'), '사이트맵 누락');

  const footer = readFileSync(join(ROOT, 'components', 'SiteFooter.tsx'), 'utf8');
  assert.ok(footer.includes('"/convert"'), '푸터 누락');
});

test('관련 도구가 자기 자신을 넣지 않는다', () => {
  for (const t of CONVERT_TOOLS) {
    const related = relatedConvertTools(t.slug);
    assert.ok(related.length > 0, `${t.slug}: 추천이 비어 있다`);
    assert.ok(!related.some(r => r.slug === t.slug), `${t.slug}: 자기 자신 추천`);
  }
  assert.equal(findConvertTool('없는변환'), undefined);
  assert.deepEqual(relatedConvertTools('없는변환'), []);
});

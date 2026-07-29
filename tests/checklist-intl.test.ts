import { test } from 'node:test';
import assert from 'node:assert/strict';
import { CHECKLISTS_EN, CHECKLISTS_EN_MAP } from '../lib/checklist-en.ts';
import { CHECKLISTS_ZH, CHECKLISTS_ZH_MAP } from '../lib/checklist-zh.ts';

const SETS = [
  ['en', CHECKLISTS_EN, CHECKLISTS_EN_MAP],
  ['zh', CHECKLISTS_ZH, CHECKLISTS_ZH_MAP],
] as const;

test('en·zh 체크리스트가 같은 slug 집합을 갖는다', () => {
  // hreflang이 en↔zh를 slug로 짝짓기 때문에, 한쪽에만 있는 slug는 깨진 대체 링크가 된다
  const en = CHECKLISTS_EN.map(c => c.slug).sort();
  const zh = CHECKLISTS_ZH.map(c => c.slug).sort();
  assert.deepEqual(zh, en, 'en과 zh의 slug 구성이 다르다');
});

test('slug가 유일하고 형식이 맞다', () => {
  for (const [label, list] of SETS) {
    const slugs = list.map(c => c.slug);
    assert.equal(new Set(slugs).size, slugs.length, `${label}: 중복 slug`);
    for (const s of slugs) {
      assert.match(s, /^[a-z0-9-]+$/, `${label}: 잘못된 slug ${s}`);
    }
  }
});

test('제목·설명·아이콘·분류가 모두 채워져 있다', () => {
  for (const [label, list] of SETS) {
    for (const c of list) {
      for (const field of ['title', 'desc', 'icon', 'category'] as const) {
        assert.ok(c[field] && c[field].trim().length > 0, `${label} ${c.slug}: ${field} 비어 있음`);
      }
    }
  }
});

test('한글이 남아 있지 않다', () => {
  // 한국어 데이터에서 복사해오다 만 항목을 잡는다
  const hangul = /[가-힣]/;
  for (const [label, list] of SETS) {
    for (const c of list) {
      assert.ok(!hangul.test(c.title + c.desc + c.category), `${label} ${c.slug}: 제목/설명에 한글`);
      for (const sec of c.sections) {
        assert.ok(!hangul.test(sec.title), `${label} ${c.slug}: 섹션 제목에 한글 — ${sec.title}`);
        for (const item of sec.items) {
          assert.ok(!hangul.test(item.text), `${label} ${c.slug}/${item.id}: 항목에 한글`);
          if (item.note) assert.ok(!hangul.test(item.note), `${label} ${c.slug}/${item.id}: 노트에 한글`);
        }
      }
    }
  }
});

test('항목 id가 체크리스트 안에서 유일하다', () => {
  // id가 겹치면 하나를 체크할 때 다른 항목까지 같이 켜진다 (localStorage 키가 id 기준)
  for (const [label, list] of SETS) {
    for (const c of list) {
      const ids = c.sections.flatMap(s => s.items.map(i => i.id));
      assert.equal(new Set(ids).size, ids.length, `${label} ${c.slug}: 중복 항목 id`);
    }
  }
});

test('모든 체크리스트에 섹션과 항목이 충분히 있다', () => {
  for (const [label, list] of SETS) {
    for (const c of list) {
      assert.ok(c.sections.length >= 3, `${label} ${c.slug}: 섹션이 ${c.sections.length}개뿐`);
      const total = c.sections.reduce((s, sec) => s + sec.items.length, 0);
      assert.ok(total >= 10, `${label} ${c.slug}: 항목이 ${total}개뿐`);
      for (const sec of c.sections) {
        assert.ok(sec.items.length >= 3, `${label} ${c.slug}/${sec.title}: 항목이 너무 적다`);
      }
    }
  }
});

test('MAP이 모든 체크리스트를 담고 있다', () => {
  for (const [label, list, map] of SETS) {
    for (const c of list) {
      assert.equal(map[c.slug], c, `${label}: 맵에 없음 ${c.slug}`);
    }
  }
});

test('en·zh 같은 slug끼리 섹션 수가 일치한다', () => {
  // 구조가 어긋나면 같은 주제인데 한쪽만 빈약해 보인다
  for (const en of CHECKLISTS_EN) {
    const zh = CHECKLISTS_ZH_MAP[en.slug];
    assert.equal(zh.sections.length, en.sections.length, `${en.slug}: 섹션 수가 다르다`);
    for (let i = 0; i < en.sections.length; i++) {
      assert.equal(
        zh.sections[i].items.length, en.sections[i].items.length,
        `${en.slug} 섹션 ${i + 1}: 항목 수가 다르다`,
      );
    }
  }
});

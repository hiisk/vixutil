/**
 * 한국어를 뺀 아홉 언어 체크리스트 검사.
 *
 * 전에는 영어 하나만 봤고, 중국어를 걷어내면서 남은 빈 test()가 아무것도
 * 검사하지 않은 채 초록으로 세어지고 있었다. 아홉 언어로 넓히면서 지웠다.
 *
 * **id는 아홉 언어에서 같아야 한다.** 체크 상태를 id로 저장하기 때문에,
 * 하나라도 어긋나면 언어를 바꿨을 때 체크가 조용히 날아간다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { CHECKLISTS_INTL, CHECKLISTS_INTL_MAP, type ChecklistIntlLang } from '../lib/checklist-l10n/index.ts';
import { hanProblem } from './han.ts';
import type { Checklist } from '../lib/types.ts';

const SETS = Object.entries(CHECKLISTS_INTL) as [ChecklistIntlLang, Checklist[]][];

/** 그 체크리스트에서 사람 눈에 보이는 문자열을 전부 모은다 */
function textOf(c: Checklist): string[] {
  return [c.title, c.desc, c.category,
    ...c.sections.flatMap(s => [s.title, ...s.items.flatMap(i => [i.text, i.note ?? ''])])];
}

/** id를 순서대로 늘어놓는다 */
function idsOf(c: Checklist): string[] {
  return c.sections.flatMap(s => s.items.map(i => i.id));
}

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

test('같은 slug끼리 섹션 수와 항목 수가 일치한다', () => {
  // 구조가 어긋나면 같은 주제인데 한쪽만 빈약해 보인다
  for (const en of CHECKLISTS_INTL.en) {
    const shape = en.sections.map(s => s.items.length);
    for (const [label, list] of SETS) {
      if (label === 'en') continue;
      const c = list.find(x => x.slug === en.slug)!;
      assert.deepEqual(c.sections.map(s => s.items.length), shape,
        `${label} ${en.slug}: 섹션·항목 수가 영어와 다르다`);
    }
  }
});

test('아홉 언어가 같은 12종을 가진다', () => {
  const en = CHECKLISTS_INTL.en.map(c => c.slug).sort();
  for (const [label, list] of SETS) {
    assert.deepEqual(list.map(c => c.slug).sort(), en, `${label}의 슬러그가 영어와 다르다`);
  }
});

test('항목 id가 아홉 언어에서 같다', () => {
  // 체크 상태를 id로 저장하므로, 어긋나면 언어를 바꿨을 때 체크가 날아간다
  for (const en of CHECKLISTS_INTL.en) {
    const ids = idsOf(en);
    for (const [label, list] of SETS) {
      if (label === 'en') continue;
      const c = list.find(x => x.slug === en.slug);
      assert.ok(c, `${label}: ${en.slug}가 없다`);
      assert.deepEqual(idsOf(c), ids, `${label} ${en.slug}: 항목 id가 영어와 다르다`);
    }
  }
});

test('id가 한 체크리스트 안에서 유일하다', () => {
  for (const [label, list] of SETS) {
    for (const c of list) {
      const ids = idsOf(c);
      assert.equal(new Set(ids).size, ids.length, `${label} ${c.slug}: 중복 id`);
    }
  }
});

test('번역이 영어를 그대로 물려받지 않는다', () => {
  const bad: string[] = [];
  for (const [label, list] of SETS) {
    if (label === 'en') continue;
    for (const c of list) {
      const en = CHECKLISTS_INTL.en.find(e => e.slug === c.slug)!;
      if (c.title === en.title && c.desc === en.desc) bad.push(`${label}/${c.slug}`);
    }
  }
  assert.deepEqual(bad, [], `영어 그대로인 항목:\n  ${bad.join('\n  ')}`);
});

test('번체 자리에 간체가 섞이지 않았다', () => {
  const bad: string[] = [];
  for (const [label, list] of SETS) {
    const key = label === 'zh-hant' ? 'tw' : label === 'zh-hans' ? 'zh' : null;
    if (!key) continue;
    for (const c of list) {
      for (const s of textOf(c)) {
        const p = hanProblem(key, s);
        if (p) bad.push(`${label} ${c.slug}: ${p}`);
      }
    }
  }
  assert.deepEqual(bad, [], `글자가 섞인 자리:\n  ${bad.join('\n  ')}`);
});

test('MAP이 모든 체크리스트를 담고 있다', () => {
  for (const [label, list] of SETS) {
    for (const c of list) assert.equal(CHECKLISTS_INTL_MAP[label][c.slug], c, `${label}: 맵에 없음 ${c.slug}`);
  }
});

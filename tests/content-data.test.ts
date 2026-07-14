import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { CHECKLISTS } from '../lib/checklist-data.ts';

const ROOT = join(import.meta.dirname, '..');
const LIB = join(ROOT, 'lib');

/**
 * test/quiz/generator 데이터는 aggregator가 확장자 없이 import해 node로 직접
 * 로드할 수 없다. 소스를 읽어 slug와 category를 뽑는다. 두 따옴표 스타일이
 * 섞여 있어 둘 다 받는다.
 */
function itemsFromSource(prefix: string): { slug: string; category: string }[] {
  const files = readdirSync(LIB).filter(f => f.startsWith(`${prefix}-data-`) && f.endsWith('.ts'));
  assert.ok(files.length > 0, `${prefix} 데이터 파일을 찾지 못함`);

  const out: { slug: string; category: string }[] = [];
  const re = /["']?slug["']?:\s*["']([^"']+)["'][\s\S]{0,600}?["']?category["']?:\s*["']([^"']+)["']/g;
  for (const f of files) {
    const src = readFileSync(join(LIB, f), 'utf8');
    for (const m of src.matchAll(re)) out.push({ slug: m[1], category: m[2] });
  }
  return out;
}

/** 허브의 카테고리 목록은 컴포넌트에 하드코딩돼 있다. 소스에서 그대로 읽어와 대조한다. */
function hubCategories(component: string): string[] {
  const src = readFileSync(join(ROOT, 'components', component), 'utf8');
  const m = src.match(/const CATEGORIES = \[([^\]]+)\]/);
  assert.ok(m, `${component}: CATEGORIES 선언을 찾지 못함`);
  return [...m[1].matchAll(/'([^']+)'/g)].map(x => x[1]);
}

const SECTIONS = [
  { name: 'test',      hub: 'TestSearch.tsx',      items: itemsFromSource('test') },
  { name: 'quiz',      hub: 'QuizSearch.tsx',      items: itemsFromSource('quiz') },
  { name: 'generator', hub: 'GeneratorSearch.tsx', items: itemsFromSource('generator') },
  { name: 'checklist', hub: 'ChecklistSearch.tsx', items: CHECKLISTS.map(c => ({ slug: c.slug, category: c.category })) },
];

test('데이터가 실제로 수집된다', () => {
  for (const { name, items } of SECTIONS) {
    assert.ok(items.length > 20, `${name}: ${items.length}개만 수집됨 — 파싱이 깨졌을 수 있다`);
  }
});

test('모든 콘텐츠의 카테고리가 해당 허브 목록에 있다', () => {
  // 허브는 CATEGORIES를 돌면서 그 카테고리에 속한 항목만 그린다.
  // 목록에 없는 카테고리를 쓰면 그 항목은 허브 어디에도 나타나지 않는다 —
  // 페이지는 빌드되고 사이트맵에도 실리지만 사람이 클릭해 닿을 수 없는 유령이 된다.
  const problems: string[] = [];
  for (const { name, hub, items } of SECTIONS) {
    const known = new Set(hubCategories(hub));
    for (const i of items) {
      if (!known.has(i.category)) problems.push(`${name}/${i.slug} → "${i.category}"`);
    }
  }
  assert.deepEqual(problems, [], `허브에 안 보이는 콘텐츠:\n  ${problems.join('\n  ')}`);
});

test('허브 카테고리 탭에 빈 칸이 없다', () => {
  // 항목이 하나도 없는 카테고리 탭은 눌러도 빈 화면만 나온다.
  const empty: string[] = [];
  for (const { name, hub, items } of SECTIONS) {
    const used = new Set(items.map(i => i.category));
    for (const c of hubCategories(hub)) if (!used.has(c)) empty.push(`${name} → "${c}"`);
  }
  assert.deepEqual(empty, [], `항목이 없는 카테고리 탭:\n  ${empty.join('\n  ')}`);
});

test('NEW 배지 목록이 실제 존재하는 slug만 가리킨다', async () => {
  // 오타나 삭제된 slug가 남아 있으면 배지가 조용히 안 뜬다.
  const mod = await import('../lib/new-content.ts');
  const registries: Record<string, Set<string>> = {
    test: mod.NEW_TEST_SLUGS,
    quiz: mod.NEW_QUIZ_SLUGS,
    generator: mod.NEW_GENERATOR_SLUGS,
    checklist: mod.NEW_CHECKLIST_SLUGS,
  };

  const bad: string[] = [];
  for (const { name, items } of SECTIONS) {
    const known = new Set(items.map(i => i.slug));
    for (const slug of registries[name]) {
      if (!known.has(slug)) bad.push(`${name}/${slug}`);
    }
  }
  assert.deepEqual(bad, [], `존재하지 않는 slug를 가리키는 NEW 배지: ${bad.join(', ')}`);
});

/** 퀴즈 문항의 보기 수와 정답 인덱스를 소스에서 뽑는다. */
function quizQuestions(): { slug: string; optCount: number; correct: number }[] {
  const out: { slug: string; optCount: number; correct: number }[] = [];
  for (const f of readdirSync(LIB).filter(f => /^quiz-data-\w\.ts$/.test(f))) {
    const src = readFileSync(join(LIB, f), 'utf8');
    for (const b of src.matchAll(/slug: '([^']+)'[\s\S]*?questions: \[([\s\S]*?)\n {4}\],/g)) {
      for (const q of b[2].matchAll(/opts: \[([^\]]*)\], correct: (\d+)/g)) {
        const optCount = [...q[1].matchAll(/'(?:\\.|[^'\\])*'/g)].length;
        out.push({ slug: b[1], optCount, correct: Number(q[2]) });
      }
    }
  }
  return out;
}

test('퀴즈 정답 인덱스가 보기 범위 안에 있다', () => {
  const qs = quizQuestions();
  assert.ok(qs.length > 500, `문항이 ${qs.length}개만 파싱됨`);
  const bad = qs.filter(q => q.correct < 0 || q.correct >= q.optCount);
  assert.deepEqual(bad, [], `범위 밖 정답: ${bad.map(b => `${b.slug}(correct=${b.correct}, opts=${b.optCount})`).join(', ')}`);
});

/** 퀴즈별 정답 인덱스 시퀀스 */
function answerSequences(): Map<string, number[]> {
  const by = new Map<string, number[]>();
  for (const q of quizQuestions()) {
    if (!by.has(q.slug)) by.set(q.slug, []);
    by.get(q.slug)!.push(q.correct);
  }
  return by;
}

test('퀴즈 정답이 특정 보기 번호에 몰려 있지 않다', () => {
  // 정답이 늘 같은 자리면 그 번호만 찍어도 만점이라 퀴즈가 무의미해진다.
  // 실제로 36개 퀴즈가 80~100% 한 자리에 몰려 있었다.
  const biased: string[] = [];
  for (const [slug, idxs] of answerSequences()) {
    if (idxs.length < 5) continue;
    const counts = new Map<number, number>();
    for (const i of idxs) counts.set(i, (counts.get(i) ?? 0) + 1);
    const top = Math.max(...counts.values());
    if (top / idxs.length > 0.5) biased.push(`${slug} (${top}/${idxs.length})`);
  }
  assert.deepEqual(biased, [], `정답이 한 자리에 절반 넘게 몰린 퀴즈:\n  ${biased.join('\n  ')}`);
});

test('퀴즈 정답 순서에 눈에 보이는 규칙이 없다', () => {
  // 분포가 균등해도 순서가 0,1,2,3,0,1,2,3… 처럼 규칙적이면 소용없다.
  // 한 퀴즈만 풀어보면 나머지 전부를 뚫을 수 있다. 실제로 한 번 이렇게 만들었다가
  // 되돌렸다. "고르게 섞였는가"와 "예측 불가능한가"는 다른 문제다.
  const patterned: string[] = [];

  for (const [slug, idxs] of answerSequences()) {
    if (idxs.length < 5) continue;

    // 1) 순환 패턴 (0,1,2,3,0,1,… / 3,2,1,0,3,2,… 등 일정 간격 증감)
    const diffs = idxs.slice(1).map((v, i) => (v - idxs[i] + 4) % 4);
    if (new Set(diffs).size === 1 && diffs[0] !== 0) {
      patterned.push(`${slug}: 일정 간격 순환 [${idxs.join(',')}]`);
      continue;
    }

    // 2) 같은 자리가 3번 연속
    for (let i = 0; i + 2 < idxs.length; i++) {
      if (idxs[i] === idxs[i + 1] && idxs[i + 1] === idxs[i + 2]) {
        patterned.push(`${slug}: 같은 자리 3연속 [${idxs.join(',')}]`);
        break;
      }
    }
  }

  assert.deepEqual(patterned, [], `정답 순서에 규칙이 보이는 퀴즈:\n  ${patterned.join('\n  ')}`);
});

test('문항 순서별로도 정답 위치가 치우치지 않는다', () => {
  // "1번 문항의 정답은 늘 1번" 같은 위치 편향도 찍기로 뚫린다.
  const byPosition = new Map<number, Map<number, number>>();
  for (const [, idxs] of answerSequences()) {
    idxs.forEach((correct, qi) => {
      if (!byPosition.has(qi)) byPosition.set(qi, new Map());
      const m = byPosition.get(qi)!;
      m.set(correct, (m.get(correct) ?? 0) + 1);
    });
  }

  const skewed: string[] = [];
  for (const [qi, counts] of byPosition) {
    const total = [...counts.values()].reduce((a, b) => a + b, 0);
    if (total < 30) continue; // 표본이 적으면 편차가 커서 의미 없다
    const top = Math.max(...counts.values());
    if (top / total > 0.45) skewed.push(`${qi + 1}번 문항: 정답의 ${Math.round((top / total) * 100)}%가 한 자리`);
  }
  assert.deepEqual(skewed, [], `문항 위치별 정답 편향:\n  ${skewed.join('\n  ')}`);
});

test('섹션 안에서 slug가 중복되지 않는다', () => {
  for (const { name, items } of SECTIONS) {
    const slugs = items.map(i => i.slug);
    const dup = [...new Set(slugs.filter((s, i) => slugs.indexOf(s) !== i))];
    assert.deepEqual(dup, [], `${name}: 중복 slug ${dup.join(', ')}`);
  }
});

test('체크리스트 항목 id가 같은 체크리스트 안에서 중복되지 않는다', () => {
  // ChecklistEngine이 id를 Set으로 관리하므로 중복되면 체크가 함께 켜지고 꺼진다.
  for (const c of CHECKLISTS) {
    const ids = c.sections.flatMap(s => s.items.map(i => i.id));
    const dup = [...new Set(ids.filter((id, i) => ids.indexOf(id) !== i))];
    assert.deepEqual(dup, [], `${c.slug}: 중복 항목 id ${dup.join(', ')}`);
  }
});

test('체크리스트에 빈 섹션이나 빈 항목이 없다', () => {
  for (const c of CHECKLISTS) {
    assert.ok(c.sections.length > 0, `${c.slug}: 섹션이 없다`);
    assert.ok(c.title?.trim() && c.desc?.trim() && c.icon?.trim(), `${c.slug}: 제목·설명·아이콘 누락`);
    for (const s of c.sections) {
      assert.ok(s.items.length > 0, `${c.slug} / ${s.title}: 항목이 없다`);
      for (const i of s.items) assert.ok(i.text.trim(), `${c.slug}: 빈 항목 텍스트`);
    }
  }
});

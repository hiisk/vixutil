import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { appFile } from './app-path.ts';
import { sitemapRoutes } from './app-path.ts';

const ROOT = join(import.meta.dirname, '..');

/**
 * 체크리스트·퀴즈·테스트는 항목을 언어별로 따로 썼다. 한국어 목록과 번역 목록이
 * 대부분 다르지만 **일부는 겹친다**.
 *
 * 그 겹치는 것들이 문제였다. 2026-08-02에 "하나도 안 겹친다"고 단정하고 상세
 * 페이지의 언어 버튼에서 한국어를 통째로 뺐는데, 실제로는 아홉 개가 겹쳤다.
 * 그 아홉은 양쪽에 페이지가 멀쩡히 있으면서 서로 건너갈 수 없었다.
 *
 * lib/checklist-data.ts 같은 파일은 하위 파일을 확장자 없이 import해서 node로
 * 직접 못 부른다(quiz-quality.test.ts와 같은 사정). 그래서 소스와 빌드 산출물을
 * 읽어서 본다.
 */
const SECTIONS = ['checklist', 'quiz', 'test'] as const;

/** 이 여섯 군데가 언어 목록을 손으로 만들면 hreflang과 갈라진다. */
const PICKERS = [
  'components/ChecklistIntlPage.tsx',
  'components/QuizIntlPage.tsx',
  'components/TestIntlPage.tsx',
  'app/checklist/[slug]/page.tsx',
  'app/quiz/[slug]/page.tsx',
  'app/test/[slug]/page.tsx',
];

test('상세 페이지의 언어 목록은 hreflang과 같은 함수에서 나온다', () => {
  const bad: string[] = [];
  for (const f of PICKERS) {
    const src = readFileSync(f.startsWith('app/') ? appFile(f) : join(ROOT, f), 'utf8');
    // 상세 picker — route에 슬러그가 들어가는 쪽
    for (const m of src.matchAll(/<LangPicker[\s\S]{0,300}?\/>/g)) {
      const tag = m[0];
      if (!/route=\{`\/(checklist|quiz|test)\/\$\{/.test(tag)) continue;   // 허브는 건너뛴다
      if (!tag.includes('localesWithItem(')) bad.push(`${f}: ${tag.replace(/\s+/g, ' ').slice(0, 110)}`);
    }
  }
  assert.deepStrictEqual(bad, []);
});

test('localesWithItem이 hreflang과 같은 표를 쓴다', () => {
  const src = readFileSync(join(ROOT, 'lib/locale-alternates.ts'), 'utf8');
  // 두 함수가 같은 MAPS를 보는지 — 한쪽만 다른 표를 보면 조용히 갈라진다
  for (const fn of ['localeAlternates', 'localesWithItem']) {
    const body = src.slice(src.indexOf(`export function ${fn}`));
    const end = body.indexOf('\n}');
    assert.ok(body.slice(0, end).includes('MAPS[section]'), `${fn}이 MAPS를 안 본다`);
  }
});

/**
 * 빌드했을 때만 도는 부분. 겹치는 항목이 실제로 있는지 본다 — 0이면 위 검사들이
 * 통과해도 "한국어를 목록에 넣는 길"은 한 번도 돌지 않은 셈이다.
 */
const built = sitemapRoutes() !== null;

test('한국어와 번역판이 겹치는 항목이 실제로 있다', { skip: !built && '빌드 산출물 없음 — npm run build 필요' }, () => {
  /*
   * 전에는 구운 HTML 파일 이름을 견줬다. ISR로 바꾼 뒤로는 그게 성립하지 않는다 —
   * 한국어 낱장은 안 굽고 번역 낱장은 굽는 식이라, 구운 것만 세면 겹침이 0으로
   * 나온다(실제로 그렇게 나왔다). 사이트맵은 굽는 것과 무관하게 전부를 담는다.
   */
  const routes = sitemapRoutes()!;
  let overlap = 0;
  const detail: string[] = [];
  for (const sec of SECTIONS) {
    const slugs = (prefix: string) =>
      new Set(routes
        .filter(r => r.startsWith(`${prefix}/${sec}/`))
        .map(r => r.slice(`${prefix}/${sec}/`.length))
        .filter(x => x && !x.includes('/')));
    const ko = slugs('');
    const both = [...slugs('/en')].filter(x => ko.has(x));
    overlap += both.length;
    detail.push(`${sec} ${both.length}개`);
  }
  assert.ok(overlap > 0, `겹치는 항목이 없다 — 검사가 헛돈다 (${detail.join(', ')})`);
});

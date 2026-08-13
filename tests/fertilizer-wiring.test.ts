/**
 * 비료 배선 — 계산이 아니라 이어짐과 문구를 본다(계산은 fertilizer-dose.test.ts).
 *
 * 접힌 라우트는 등록부에서 한 줄이 빠져도 빌드가 통과하고, 사이트맵은 그 주소를
 * 계속 내걸며, 아홉 언어에서만 조용히 404가 된다. 그래서 등록부·껍데기·사이트맵·
 * 카드·문구가 실제로 이어져 있는지를 파일과 데이터로 되짚는다.
 *
 * 문구 쪽은 값을 직접 센다. 튜플은 칸이 채워졌는지만 보므로 빈 문자열이나 영어
 * 원문이 남아도 tsc는 통과한다 — 그러니 언어마다 글자를 세고, 남의 언어 글자가
 * 섞였는지 훑고, 문장에 실제 숫자가 들어갔는지 같은 함수로 기댓값을 만들어 본다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { koLeafSrc } from './app-path.ts';

import { LANGS, LANG_CODES } from '../lib/i18n/lang.ts';
import { FERTILIZERS, FERTILIZER_ICON, FERTILIZER_SLUGS, cellOf } from '../lib/fertilizer/list.ts';
import { fertilizerFacts, npkOf } from '../lib/fertilizer/facts.ts';
import { FERTILIZER_UI, SYMBOL, fertilizerName, mass, num } from '../lib/fertilizer/ui.ts';
import { ICON_FOR } from '../lib/og-icon-map.ts';
import { CARD_KEYS } from '../lib/og-cards/keys.ts';
import { DENSE, hanProblem } from './han.ts';

const ROOT = join(import.meta.dirname, '..');
const FOLD_LANGS = ['en', 'es', 'pt-br', 'ja', 'de', 'fr', 'hi', 'zh-hans', 'zh-hant'];

/** 문장 갈래를 모두 밟는 칸들 — 단일 성분·복합·인산 기준·칼리 기준·양 끝 면적 */
const SHOWN = [
  'urea-100m2',
  'npk-21-17-17-100m2',
  'tsp-1m2',
  'potassium-chloride-1000m2',
  'mkp-20m2',
].map(s => fertilizerFacts(cellOf(s)!));

test('새싹 아이콘은 목록과 카드가 같은 그림을 쓴다', () => {
  assert.ok(ICON_FOR[FERTILIZER_ICON], `${FERTILIZER_ICON} 이모지가 아이콘으로 이어지지 않는다 — 공유 카드에 컬러 이모지가 그대로 나간다`);
});

test('등록부에 비료 두 줄이 있다 — 빠지면 아홉 언어에서 조용히 404다', () => {
  const src = readFileSync(join(ROOT, 'lib', 'fold', 'registry.ts'), 'utf8');
  assert.ok(src.includes(`'fertilizer': () => import('./pages/fertilizer')`), 'STATIC_ROUTES에 fertilizer가 없다 — 아홉 언어 허브가 404다');
  assert.ok(src.includes(`'fertilizer': () => import('./pages/fertilizer__slug')`), 'SLUG_ROUTES에 fertilizer가 없다 — 아홉 언어 낱장이 404다');
  assert.ok(existsSync(join(ROOT, 'lib', 'fold', 'pages', 'fertilizer.tsx')), '허브 공유 모듈이 없다');
  assert.ok(existsSync(join(ROOT, 'lib', 'fold', 'pages', 'fertilizer__slug.tsx')), '낱장 공유 모듈이 없다');
});

test('사이트맵이 허브와 낱장 135칸을 열 언어로 내건다', () => {
  /*
   * 등록부와 사이트맵은 서로 모른다 — 한쪽에만 있으면 크롤러가 404를 받거나
   * 페이지가 색인에서 빠진다. 낱장 수는 데이터에서 세므로 칸을 늘리면 따라온다.
   */
  const src = readFileSync(join(ROOT, 'app', 'sitemap.ts'), 'utf8');
  assert.ok(src.includes(`from "@/lib/fertilizer/list"`), '사이트맵이 비료 목록을 안 불러온다');
  assert.match(src, /\/fertilizer`, changeFrequency: weekly, priority: 0\.85/, '허브 줄(우선순위 .85)이 없다');
  assert.match(src, /FERTILIZER_CELLS\.map/, '낱장 줄이 없다 — 135칸이 사이트맵에서 빠진다');
  // 허브 1 + 낱장 135가 열 언어씩 — 낱장 수가 틀리면 목록 쪽이 깨진 것이다
  assert.equal(FERTILIZER_SLUGS.length, 135);
  assert.equal(LANGS.length, 10);
  assert.equal((1 + FERTILIZER_SLUGS.length) * LANGS.length, 1360);
});

test('낱장 껍데기가 아홉 언어에 있고 제 언어로 부른다', () => {
  /*
   * 껍데기는 언어 이름만 다르다. 복사하다 언어를 안 바꾸면 그 언어 낱장 전체가
   * 다른 언어로 그려진다 — 화면은 멀쩡해서 안 드러난다.
   */
  for (const lang of FOLD_LANGS) {
    const p = join(ROOT, 'app', `(${lang})`, lang, 'fertilizer', '[slug]', 'page.tsx');
    assert.ok(existsSync(p), `${lang}에 낱장 껍데기가 없다`);
    const src = readFileSync(p, 'utf8');
    assert.ok(src.includes(`build('${lang}')`), `${lang} 껍데기가 제 언어로 안 부른다`);
    /* 2026-08-13: force-dynamic → ISR. 둘이 함께 있어야 캐시가 걸린다 —
       revalidate만 있으면 라우트가 동적으로 잡혀 아무 효과가 없다(실측 확인).
       까닭은 tests/prerender-budget.test.ts 머리말. */
    assert.ok(/export const revalidate = false/.test(src), `${lang} 낱장이 revalidate = false가 아니다 — 없으면 캐시가 안 걸리고, 주기를 주면 ISR 쓰기가 되살아난다`);
    assert.ok(src.includes('generateStaticParams'), `${lang} 낱장이 generateStaticParams를 안 내보낸다 — revalidate만으로는 안 걸린다`);
  }
  // 한국어는 접지 않는다 — 허브 파일이 직접 있다
  assert.ok(existsSync(join(ROOT, 'app', '(ko)', 'fertilizer', 'page.tsx')), '한국어 허브가 없다');
  /*
   * 한국어 낱장은 lib/ko/pages 모듈이다 — Vercel 라우팅 표 2,048 한도 때문에 접었다.
   * force-dynamic은 모듈이 아니라 디스패처 라우트가 선언하므로 여기서 보지 않는다
   * (tests/prerender-budget.test.ts가 낱장 라우트 전부를 훑으며 지킨다).
   * generateStaticParams는 여기서 본다 — 사라지면 굽는 손잡이가 조용히 죽는다.
   */
  const ko = koLeafSrc('fertilizer');
  assert.ok(ko.includes('generateStaticParams'), '한국어 낱장에 generateStaticParams가 없다');
  assert.ok(ko.includes('FERTILIZER_SLUGS') || ko.includes('fertilizerParams'), '한국어 낱장이 비료 목록을 안 돌린다');
});

test('공유 카드 열쇠가 열 언어에 다 있다', () => {
  for (const lang of LANG_CODES) {
    assert.ok(CARD_KEYS[lang].includes('fertilizer'), `${lang} 카드 열쇠에 fertilizer가 없다 — 그 언어만 상위 카드를 물려받는다`);
    const src = readFileSync(join(ROOT, 'lib', 'og-cards', `${lang}.tsx`), 'utf8');
    assert.ok(src.includes(`'fertilizer': () => fertilizerHub('${lang}')`), `${lang}.tsx에 카드 본체가 없다 — keys.ts와 어긋나 /og가 404다`);
  }
});

test('홈과 한국어 검색 색인이 비료를 건다', () => {
  // 홈에서 안 걸리면 낱장 1,350장이 사이트맵에만 있는 상태가 된다
  const ko = readFileSync(join(ROOT, 'app', '(ko)', 'page.tsx'), 'utf8');
  assert.ok(ko.includes(`href: '/fertilizer'`), '한국어 홈에 카드가 없다');
  const home = readFileSync(join(ROOT, 'lib', 'locale-home.ts'), 'utf8');
  assert.ok(home.includes(`route: '/fertilizer'`), '아홉 언어 홈에 카드가 없다');
  const idx = readFileSync(join(ROOT, 'lib', 'search-index.ts'), 'utf8');
  assert.ok(idx.includes(`section: 'fertilizer' as const`), '검색 색인에 비료 항목이 없다');
  assert.ok(idx.includes(`{ href: '/fertilizer',`), '검색 색인에 허브 항목이 없다');
  assert.ok(/fertilizer:\s*\{ label:/.test(idx), 'SECTION_META에 비료 이름표가 없다');
});

test('열 언어 모두 문구가 채워져 있다', () => {
  const f = SHOWN[0];
  for (const lang of LANG_CODES) {
    const ui = FERTILIZER_UI[lang];
    const floor = DENSE.has(lang) ? 6 : 12;
    for (const [key, v] of Object.entries(ui)) {
      if (typeof v !== 'string') continue;
      assert.ok(v.trim().length > 0, `${lang}.${key}: 비어 있다`);
    }
    assert.ok(ui.hubLead.length >= (DENSE.has(lang) ? 20 : 35), `${lang}: hubLead가 짧다`);
    assert.equal(ui.how.length, 4, `${lang}: 알아 둘 것이 네 줄이 아니다`);
    assert.equal(ui.hubFaq.length, 3, `${lang}: 질문이 셋이 아니다`);
    for (const h of ui.how) assert.ok(h.length >= floor, `${lang}: 너무 짧다 — ${h}`);
    for (const q of ui.hubFaq) assert.ok(q.q.length >= floor && q.a.length >= floor * 2, `${lang}: 답이 짧다 — ${q.q}`);
    assert.equal(ui.cellFaq(f).length, 3, `${lang}: 낱장 질문이 셋이 아니다`);
    // 셈의 전제 넷은 길게 밝혀야 한다 — 나눗셈 방향·복합비료·산화물 표기·봉지 읽기
    assert.ok(ui.divideNote.length >= floor * 6, `${lang}: 나눗셈 설명이 짧다`);
    assert.ok(ui.compoundNote.length >= floor * 6, `${lang}: 복합비료 설명이 짧다`);
    assert.ok(ui.oxideNote.length >= floor * 6, `${lang}: 산화물 표기 설명이 짧다`);
    assert.ok(ui.labelNote.length >= floor * 6, `${lang}: 봉지 읽기 설명이 짧다`);
  }
});

test('비료 이름이 열 언어로 옮겨져 있다', () => {
  /*
   * 이름은 옮기지만 성분 기호는 안 옮긴다. 이름 쪽이 안 옮겨지면 열 언어가 모두
   * 영어 원문을 쓰게 되는데, 그것은 화면에서 안 드러난다 — 같은 낱말이 두 언어에
   * 그대로 있는 것은 정상이므로(Urea는 영어와 스페인어가 같다), 언어를 통틀어
   * 이름이 몇 가지로 갈리는지를 센다.
   */
  for (const f of FERTILIZERS) {
    const names = LANG_CODES.map(lang => fertilizerName(f.key, lang, npkOf(f)));
    for (const [i, n] of names.entries()) {
      assert.ok(n.trim().length > 0, `${f.key}.${LANG_CODES[i]}: 이름이 비어 있다`);
      assert.notEqual(n, f.key, `${f.key}.${LANG_CODES[i]}: 열쇠가 그대로 이름이 됐다`);
    }
    // 라틴 아닌 넷(ko·ja·hi·zh)은 저마다 다른 글자를 쓴다 — 영어와 같으면 안 옮긴 것이다
    for (const lang of ['ko', 'ja', 'hi'] as const) {
      assert.notEqual(
        fertilizerName(f.key, lang, npkOf(f)),
        fertilizerName(f.key, 'en', npkOf(f)),
        `${f.key}: ${lang} 이름이 영어 그대로다`,
      );
    }
    assert.ok(new Set(names).size >= 5, `${f.key}: 이름이 ${new Set(names).size}가지뿐 — 옮기지 않은 언어가 있다`);
  }
  // 성분 기호는 옮기지 않는다 — 봉지와 같은 글자여야 되짚을 수 있다
  assert.deepEqual(SYMBOL, { n: 'N', p: 'P₂O₅', k: 'K₂O' });
});

test('언어끼리 글자가 섞이지 않는다', () => {
  const HAN_OK = new Set(['ja', 'zh', 'tw']);
  for (const lang of LANG_CODES) {
    const ui = FERTILIZER_UI[lang];
    const strings = [
      ...Object.values(ui).filter((v): v is string => typeof v === 'string'),
      ...ui.how,
      ...ui.hubFaq.flatMap(q => [q.q, q.a]),
      ...FERTILIZERS.map(f => fertilizerName(f.key, lang, npkOf(f))),
      ...SHOWN.flatMap(f => [ui.desc(f), ui.metaTitle(f), ui.metaDesc(f),
        ...ui.cellFaq(f).flatMap(q => [q.q, q.a])]),
    ];
    for (const s of strings) {
      if (lang !== 'ko') assert.ok(!/[가-힣]/.test(s), `${lang}: 한글이 섞였다 — ${s}`);
      if (lang !== 'ja') assert.ok(!/[ぁ-んァ-ヶ]/.test(s), `${lang}: 가나가 섞였다 — ${s}`);
      if (!HAN_OK.has(lang)) assert.ok(!/[一-龯]/.test(s), `${lang}: 한자가 섞였다 — ${s}`);
      if (lang !== 'hi') assert.ok(!/[ऀ-ॿ]/.test(s), `${lang}: 데바나가리가 섞였다 — ${s}`);
      const han = hanProblem(lang, s);
      assert.equal(han, '', `${lang}: ${han} — ${s}`);
    }
  }
});

test('한 언어 안에서 제목 135개가 모두 다르다', () => {
  /*
   * 자리표에 값을 안 넣으면 한 언어의 제목 135개가 모두 같은 문장이 된다.
   * 칸마다 비료와 면적이 다르므로, 같은 언어에서 제목이 겹치는 일은 없어야 한다.
   */
  for (const lang of LANG_CODES) {
    const ui = FERTILIZER_UI[lang];
    const seen = new Map<string, string>();
    for (const slug of FERTILIZER_SLUGS) {
      const title = ui.metaTitle(fertilizerFacts(cellOf(slug)!));
      const already = seen.get(title);
      assert.equal(already, undefined, `${lang}: ${slug}와 ${already}의 제목이 같다 — ${title}`);
      seen.set(title, slug);
    }
    assert.equal(seen.size, FERTILIZER_SLUGS.length, `${lang}: 제목이 ${seen.size}가지뿐이다`);
  }
});

test('제목이 언어를 통틀어 유일하다 — 간체·번체가 같은 낱말일 때만 겹친다', () => {
  /*
   * 언어끼리 제목이 같으면 대개 그 언어를 안 옮긴 것이다. 다만 간체와 번체는
   * 낱말이 같으면 글자도 같다 — 尿素는 두 벌에서 똑같이 尿素다. 그런 자리를
   * 억지로 다르게 적으면 한쪽이 어색해지므로, 겹침을 허용하되 **자료로 설명이
   * 되는지**를 함께 본다: 비료 이름이 두 벌에서 같을 때만 제목도 같을 수 있다.
   * 이름이 다른데 제목이 같으면 그것은 옮기지 않은 것이라 그대로 걸린다.
   */
  const seen = new Map<string, string>();
  let excused = 0;
  for (const lang of LANG_CODES) {
    const ui = FERTILIZER_UI[lang];
    for (const slug of FERTILIZER_SLUGS) {
      const f = fertilizerFacts(cellOf(slug)!);
      const title = ui.metaTitle(f);
      const where = `${lang}/${slug}`;
      const already = seen.get(title);
      if (already === undefined) {
        seen.set(title, where);
        continue;
      }
      const [otherLang, ...rest] = already.split('/');
      const sameCell = rest.join('/') === slug;
      const pair = new Set([lang, otherLang]);
      const zhPair = pair.size === 2 && pair.has('zh') && pair.has('tw');
      const nameShared = fertilizerName(f.fert.key, 'zh', npkOf(f.fert)) === fertilizerName(f.fert.key, 'tw', npkOf(f.fert));
      assert.ok(
        zhPair && sameCell && nameShared,
        `제목이 겹친다 — ${where}와 ${already}: ${title}`,
      );
      excused += 1;
    }
  }
  // 봐준 자리는 이름이 두 벌에서 같은 비료 × 면적 아홉뿐이다 — 늘어나면 까닭을 다시 본다
  const shared = FERTILIZERS.filter(f => fertilizerName(f.key, 'zh', npkOf(f)) === fertilizerName(f.key, 'tw', npkOf(f)));
  assert.equal(excused, shared.length * 9, `봐준 겹침이 ${excused}개 — 이름이 같은 비료는 ${shared.length}가지다`);
  assert.deepEqual(shared.map(f => f.key), ['urea'], '간체·번체가 같은 이름은 요소뿐이어야 한다');
});

test('낱장 문장이 그 언어의 표기로 실제 숫자를 담는다', () => {
  /*
   * es·pt·de·fr는 소수점에 쉼표를 쓴다. 자료의 숫자를 그냥 넣으면 그 네 언어에서만
   * 21.74가 되는데 화면은 멀쩡해 보인다. 그래서 기댓값을 화면과 같은 함수(num·mass)로
   * 만들어 견준다 — 한 자리라도 그 함수를 안 지나면 그 언어에서 걸린다.
   */
  for (const lang of LANG_CODES) {
    const ui = FERTILIZER_UI[lang];
    for (const f of SHOWN) {
      assert.ok(ui.desc(f).includes(mass(lang, f.main.grams)), `${lang}: desc에 비료량이 없다 — ${ui.desc(f)}`);
      assert.ok(ui.desc(f).includes(num(lang, f.main.perM2)), `${lang}: desc에 m²당 값이 없다`);
      assert.ok(ui.desc(f).includes(num(lang, f.content)), `${lang}: desc에 함량이 없다`);
      assert.ok(ui.metaTitle(f).includes(mass(lang, f.main.grams)), `${lang}: metaTitle에 비료량이 없다`);
      assert.ok(ui.metaDesc(f).includes(mass(lang, f.main.need)), `${lang}: metaDesc에 필요 성분량이 없다`);
      // 기준 성분 기호가 문장에 드러나야 무엇을 맞춘 값인지 알 수 있다
      assert.ok(ui.metaTitle(f).includes(SYMBOL[f.basis]), `${lang}: metaTitle에 기준 성분이 없다`);
    }
    // 소수점 기호가 그 언어의 것이어야 한다
    const urea = SHOWN[0];
    const want = lang === 'es' || lang === 'pt' || lang === 'de' || lang === 'fr' ? '21,74' : '21.74';
    assert.ok(ui.desc(urea).includes(want), `${lang}: 소수점 기호가 ${want}가 아니다 — ${ui.desc(urea)}`);
    // 칸이 다르면 문장도 달라야 한다
    assert.notEqual(ui.desc(SHOWN[0]), ui.desc(SHOWN[1]), lang);
  }
});

test('복합비료 낱장은 따라 들어오는 성분을 문장에 적는다', () => {
  // 복합비료에서 이 문장이 비면 이 섹션의 값이 사라진다
  const compound = SHOWN[1];
  assert.ok(compound.main.along.length === 2, '고른 칸이 복합비료가 아니다');
  for (const lang of LANG_CODES) {
    const faq = FERTILIZER_UI[lang].cellFaq(compound);
    const last = faq[faq.length - 1].a;
    for (const a of compound.main.along) {
      assert.ok(last.includes(SYMBOL[a.key]), `${lang}: ${SYMBOL[a.key]}가 문장에 없다 — ${last}`);
      assert.ok(last.includes(mass(lang, a.grams)), `${lang}: ${a.key} 양이 문장에 없다 — ${last}`);
    }
    // 단일 성분 비료는 같은 자리에서 다른 말을 한다
    const single = FERTILIZER_UI[lang].cellFaq(SHOWN[0]);
    assert.notEqual(single[single.length - 1].a, last, `${lang}: 단일 성분과 복합이 같은 답을 낸다`);
  }
});

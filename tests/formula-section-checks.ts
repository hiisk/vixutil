/**
 * 공식 섹션의 공통 검사.
 *
 * /rate·/body·/geometry가 같은 엔진을 쓰므로 깨지는 방식도 같다 — 용어 사전에
 * 없는 키, 치환 안 된 공식, 0으로 나누기, 영어 페이지에 남은 한글. 섹션마다
 * 같은 테스트를 복사하면 한 곳만 고치고 넘어가게 되므로 여기 한 벌만 둔다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import type { FormulaTool } from '../lib/formula/types.ts';
import { TERMS, UNITS, type Lang } from '../lib/formula/terms.ts';
import { sectionAlternates, groupNum } from '../lib/formula/ui.ts';
import { formulaFaq, renderFormula } from '../lib/formula/faq.ts';
import type { SectionConfig } from '../lib/formula/section.ts';

const LANGS: Lang[] = ['ko', 'en', 'zh'];
const HANGUL = /[가-힣]/;

export const withDefaults = (t: FormulaTool) => {
  const v: Record<string, number> = {};
  for (const f of t.fields) v[f.key] = f.def;
  return { v, out: t.compute(v) };
};

export const primaryOf = (tools: FormulaTool[], slug: string, v: Record<string, number>) => {
  const t = tools.find(x => x.slug === slug);
  assert.ok(t, `${slug} 없음`);
  const out = t.compute(v);
  return (out.find(o => o.primary) ?? out[0]).value;
};

export const outputsOf = (tools: FormulaTool[], slug: string, v: Record<string, number>) => {
  const t = tools.find(x => x.slug === slug);
  assert.ok(t, `${slug} 없음`);
  return t.compute(v);
};

export function checkFormulaSection(section: SectionConfig, expectedCount = 50) {
  const { tools, key } = section;
  const name = `[${key}]`;

  test(`${name} ${expectedCount}종이 있고 slug가 겹치지 않는다`, () => {
    assert.ok(tools.length >= expectedCount, `${expectedCount}종 이상이어야 하는데 ${tools.length}개`);
    assert.equal(new Set(tools.map(t => t.slug)).size, tools.length);
  });

  test(`${name} slug는 URL에 쓸 수 있는 소문자·하이픈만 쓴다`, () => {
    for (const t of tools) assert.match(t.slug, /^[a-z0-9-]+$/, t.slug);
  });

  test(`${name} 세 언어의 제목·설명·본문·주의가 모두 채워져 있다`, () => {
    for (const t of tools) {
      for (const lang of LANGS) {
        const x = t[lang];
        // 중국어는 글자당 정보량이 커서 같은 내용이 훨씬 짧다
        const min = lang === 'zh' ? { title: 3, desc: 6, long: 20, note: 12 } : { title: 5, desc: 12, long: 40, note: 20 };
        for (const k of ['title', 'desc', 'long', 'note'] as const) {
          assert.ok(x[k].length >= min[k], `${t.slug}.${lang}.${k}가 너무 짧다: "${x[k]}"`);
        }
      }
    }
  });

  test(`${name} 제목은 언어별로 서로 겹치지 않는다`, () => {
    for (const lang of LANGS) {
      const titles = tools.map(t => t[lang].title);
      const dup = titles.filter((x, i) => titles.indexOf(x) !== i);
      assert.deepEqual(dup, [], `${lang} 중복 제목: ${dup.join(', ')}`);
    }
  });

  test(`${name} 영어·중국어 페이지에 한글이 새지 않는다`, () => {
    for (const t of tools) {
      for (const lang of ['en', 'zh'] as const) {
        const joined = Object.values(t[lang]).join(' ');
        assert.ok(!HANGUL.test(joined), `${t.slug}.${lang}에 한글: ${joined.match(HANGUL)}`);
      }
    }
  });

  test(`${name} 중국어 본문은 실제로 중국어다`, () => {
    for (const t of tools) assert.match(t.zh.title + t.zh.long, /[一-鿿]/, `${t.slug} zh에 한자 없음`);
  });

  test(`${name} 카테고리는 정해진 목록 안이고 전부 쓰인다`, () => {
    const used = new Set(tools.map(t => t.category));
    for (const c of used) assert.ok(section.categories.includes(c), `모르는 카테고리 ${c}`);
    for (const c of section.categories) assert.ok(used.has(c), `안 쓰인 카테고리 ${c}`);
  });

  test(`${name} 카테고리 이름이 세 언어로 다 있다`, () => {
    for (const lang of LANGS) {
      for (const c of section.categories) assert.ok(section.categoryLabel[lang][c], `${lang}에 ${c} 라벨 없음`);
    }
  });

  test(`${name} 입력 라벨과 단위가 사전에 등록돼 있다`, () => {
    for (const t of tools) {
      assert.ok(t.fields.length > 0, `${t.slug} 입력 없음`);
      assert.equal(new Set(t.fields.map(x => x.key)).size, t.fields.length, `${t.slug} 입력 키 중복`);
      for (const f of t.fields) {
        assert.ok(TERMS[f.term], `${t.slug}: TERMS에 ${f.term} 없음`);
        if (f.unit) assert.ok(UNITS[f.unit], `${t.slug}: UNITS에 ${f.unit} 없음`);
      }
    }
  });

  test(`${name} 결과 항목도 사전에 있고 주인공이 하나다`, () => {
    for (const t of tools) {
      const { out } = withDefaults(t);
      assert.ok(out.length > 0, `${t.slug} 결과 없음`);
      for (const o of out) {
        assert.ok(TERMS[o.term], `${t.slug}: TERMS에 ${o.term} 없음`);
        if (o.unit) assert.ok(UNITS[o.unit], `${t.slug}: UNITS에 ${o.unit} 없음`);
      }
      assert.ok(out.filter(o => o.primary).length <= 1, `${t.slug} primary가 둘 이상`);
    }
  });

  test(`${name} 공식의 {키}가 모두 치환된다`, () => {
    for (const t of tools) {
      for (const m of t.formula.matchAll(/\{(\w+)\}/g)) {
        assert.ok(TERMS[m[1]], `${t.slug} 공식의 ${m[1]}가 TERMS에 없음`);
      }
      for (const lang of LANGS) {
        assert.ok(!renderFormula(t.formula, lang).includes('{'), `${t.slug} ${lang} 공식에 치환 안 된 자리`);
      }
    }
  });

  test(`${name} 공식에 한글이 없다 — 세 언어가 같은 문자열을 쓴다`, () => {
    for (const t of tools) {
      assert.ok(!HANGUL.test(t.formula), `${t.slug} 공식에 한글: ${t.formula}`);
    }
  });

  test(`${name} 기본값 계산 결과가 모두 유한한 숫자다`, () => {
    for (const t of tools) {
      for (const o of withDefaults(t).out) {
        assert.ok(Number.isFinite(o.value), `${t.slug}.${o.term} = ${o.value}`);
      }
    }
  });

  test(`${name} 0을 넣어도 NaN·Infinity가 나오지 않는다`, () => {
    for (const t of tools) {
      const v: Record<string, number> = {};
      for (const f of t.fields) v[f.key] = 0;
      for (const o of t.compute(v)) {
        assert.ok(Number.isFinite(o.value), `${t.slug}.${o.term}이 0 입력에서 ${o.value}`);
      }
    }
  });

  test(`${name} 해석 문구는 세 언어가 함께 나온다`, () => {
    for (const t of tools) {
      if (!t.verdict) continue;
      const { v, out } = withDefaults(t);
      const verdict = t.verdict(v, out);
      if (!verdict) continue;
      for (const lang of LANGS) assert.ok(verdict[lang]?.length > 3, `${t.slug} verdict.${lang} 비었음`);
      assert.ok(!HANGUL.test(verdict.en), `${t.slug} verdict.en에 한글`);
      assert.ok(!HANGUL.test(verdict.zh), `${t.slug} verdict.zh에 한글`);
    }
  });

  test(`${name} FAQ는 3개이고 실제 계산값이 들어간다`, () => {
    for (const t of tools) {
      for (const lang of LANGS) {
        const faq = formulaFaq(t, lang);
        assert.equal(faq.length, 3, `${t.slug} ${lang}`);
        for (const item of faq) assert.ok(item.q.length > 4 && item.a.length > 10, `${t.slug} ${lang} 빈 FAQ`);
        const { out } = withDefaults(t);
        const primary = out.find(o => o.primary) ?? out[0];
        assert.ok(
          faq[1].a.includes(groupNum(primary.value, primary.digits ?? 2)),
          `${t.slug} ${lang} 예시에 계산값 없음: ${faq[1].a}`,
        );
        if (lang !== 'ko') {
          for (const item of faq) assert.ok(!HANGUL.test(item.q + item.a), `${t.slug} ${lang} FAQ에 한글`);
        }
      }
    }
  });

  test(`${name} 세 언어 라우트가 모두 있다`, () => {
    for (const p of [`app/${key}`, `app/en/${key}`, `app/zh/${key}`]) {
      assert.ok(existsSync(`${p}/page.tsx`), `${p}/page.tsx 없음`);
      assert.ok(existsSync(`${p}/[slug]/page.tsx`), `${p}/[slug]/page.tsx 없음`);
      assert.ok(existsSync(`${p}/opengraph-image.tsx`), `${p}/opengraph-image.tsx 없음`);
    }
  });

  test(`${name} hreflang은 네 줄이고 x-default는 영어를 가리킨다`, () => {
    const slug = tools[0].slug;
    const a = sectionAlternates(key, slug);
    assert.equal(Object.keys(a).length, 4);
    assert.equal(a.ko, `/${key}/${slug}`);
    assert.equal(a.en, `/en/${key}/${slug}`);
    assert.equal(a.zh, `/zh/${key}/${slug}`);
    assert.equal(a['x-default'], `/en/${key}/${slug}`);
  });

  test(`${name} 사이트맵에 세 언어가 들어 있다`, () => {
    const src = readFileSync('app/sitemap.ts', 'utf8');
    for (const p of [`/${key}`, `/en/${key}`, `/zh/${key}`]) {
      assert.ok(src.includes(`${p}\``) || src.includes(`${p}/`), `사이트맵에 ${p} 없음`);
    }
  });

  test(`${name} 섹션 메타가 세 언어로 다 있고 서로 다르다`, () => {
    const titles = LANGS.map(l => section.meta[l].metaTitle);
    assert.equal(new Set(titles).size, 3);
    for (const lang of LANGS) {
      assert.ok(section.meta[lang].metaDesc.length > (lang === 'zh' ? 40 : 80), `${lang} 설명이 너무 짧다`);
    }
    assert.ok(!HANGUL.test(section.meta.en.metaTitle + section.meta.en.metaDesc));
    assert.ok(!HANGUL.test(section.meta.zh.metaTitle + section.meta.zh.metaDesc));
  });
}

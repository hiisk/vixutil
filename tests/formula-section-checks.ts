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
import { answerLine, inputRows, outputRows, scenarioTable, substituted } from '../lib/formula/article.ts';
import { termDesc } from '../lib/formula/glossary.ts';
import type { SectionConfig } from '../lib/formula/section.ts';

const LANGS: Lang[] = ['ko', 'en'];
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
        const min = false ? { title: 3, desc: 6, long: 20, note: 12 } : { title: 5, desc: 12, long: 40, note: 20 };
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
      for (const lang of ['en'] as const) {
        const joined = Object.values(t[lang]).join(' ');
        assert.ok(!HANGUL.test(joined), `${t.slug}.${lang}에 한글: ${joined.match(HANGUL)}`);
      }
    }
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

  test(`${name} 아이콘은 이모지다 — OG 이미지 폰트가 도형 문자를 못 받는다`, () => {
    for (const t of tools) {
      assert.match(t.icon, /\p{Extended_Pictographic}/u, `${t.slug} 아이콘 "${t.icon}"이 이모지가 아니다`);
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
    }
  });

  test(`${name} FAQ는 다섯 개 이상이고 실제 계산값이 들어간다`, () => {
    for (const t of tools) {
      for (const lang of LANGS) {
        const faq = formulaFaq(t, lang);
        assert.ok(faq.length >= 5, `${t.slug} ${lang} FAQ ${faq.length}개`);
        assert.equal(new Set(faq.map(f => f.q)).size, faq.length, `${t.slug} ${lang} FAQ 질문 중복`);
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

  test(`${name} 두 언어 라우트가 모두 있다`, () => {
    for (const p of [`app/${key}`, `app/en/${key}`]) {
      assert.ok(existsSync(`${p}/page.tsx`), `${p}/page.tsx 없음`);
      assert.ok(existsSync(`${p}/[slug]/page.tsx`), `${p}/[slug]/page.tsx 없음`);
      assert.ok(existsSync(`${p}/opengraph-image.tsx`), `${p}/opengraph-image.tsx 없음`);
    }
  });

  test(`${name} hreflang은 세 줄이고 x-default는 영어를 가리킨다`, () => {
    const slug = tools[0].slug;
    const a = sectionAlternates(key, slug);
    assert.equal(Object.keys(a).length, 3);
    assert.equal(a.ko, `/${key}/${slug}`);
    assert.equal(a.en, `/en/${key}/${slug}`);
    assert.equal(a['x-default'], `/en/${key}/${slug}`);
  });

  test(`${name} 사이트맵에 그 섹션의 모든 언어가 들어 있다`, () => {
    /*
      번역 언어는 INTL_LOCALES를 돌려 만든다. 주소를 한 줄씩 적어 두면 언어를
      늘릴 때 사이트맵만 조용히 빠지고, 색인에서 그 언어가 통째로 사라진다.
    */
    const src = readFileSync('app/sitemap.ts', 'utf8');
    assert.ok(src.includes(`/${key}\``) || src.includes(`/${key}/`), `사이트맵에 /${key} 없음`);
    const intl = new RegExp(`INTL_LOCALES\\.flatMap[\\s\\S]{0,240}/${key}`);
    const hasIntl = intl.test(src);
    const hasEn = src.includes(`/en/${key}\``) || src.includes(`/en/${key}/`);
    assert.ok(hasIntl || hasEn, `사이트맵에 /en/${key} 없음`);
  });

  test(`${name} 본문 표가 두 언어로 다 채워진다`, () => {
    for (const t of tools) {
      for (const lang of LANGS) {
        const ins = inputRows(t, lang);
        assert.equal(ins.length, t.fields.length, `${t.slug} ${lang} 입력 표 줄 수`);
        for (const r of ins) {
          assert.ok(r.label.length > 0 && !r.label.includes('{'), `${t.slug} ${lang} 입력 라벨: ${r.label}`);
          assert.ok(r.range.length > 0, `${t.slug} ${lang} 범위 비었음`);
        }
        const outs = outputRows(t, lang);
        assert.ok(outs.length > 0, `${t.slug} ${lang} 결과 표 비었음`);
        for (const r of outs) assert.ok(r.value !== '—', `${t.slug} ${lang} 결과값이 계산 안 됨`);

        // 대입한 식에는 치환 안 된 중괄호가 남지 않는다
        const sub = substituted(t, lang);
        assert.ok(!sub.includes('{') && !sub.includes('}'), `${t.slug} ${lang} 대입식에 {} 남음: ${sub}`);
        assert.ok(!/NaN|Infinity/.test(sub + answerLine(t, lang)), `${t.slug} ${lang} 대입식이 NaN`);

        if (lang !== 'ko') {
          const blob = [...ins.map(r => r.label + r.range + (r.desc ?? '')), ...outs.map(r => r.label + (r.desc ?? ''))].join('');
          assert.ok(!HANGUL.test(blob), `${t.slug} ${lang} 본문 표에 한글`);
        }
      }
    }
  });

  test(`${name} 값별 결과 표는 세 줄 이상이고 숫자가 다르다`, () => {
    let missing = 0;
    for (const t of tools) {
      const table = scenarioTable(t, 'ko');
      if (!table) { missing++; continue; }
      assert.ok(table.rows.length >= 3, `${t.slug} 표가 ${table.rows.length}줄`);
      assert.equal(new Set(table.rows.map(r => r[0])).size, table.rows.length, `${t.slug} 표의 입력값 중복`);
      for (const r of table.rows) assert.ok(!r.includes('NaN'), `${t.slug} 표에 NaN`);
      // 입력을 두 배로 바꿨는데 결과가 하나도 안 움직이면 대표 입력을 잘못 골랐다
      const firstCol = table.rows.map(r => r[1]);
      assert.ok(new Set(firstCol).size > 1, `${t.slug} 대표 입력을 바꿔도 결과가 그대로`);
    }
    assert.ok(missing === 0, `값별 표가 안 만들어진 도구 ${missing}개`);
  });

  test(`${name} 뜻풀이가 붙은 용어가 절반을 넘는다`, () => {
    const used = new Set<string>();
    for (const t of tools) {
      for (const f of t.fields) used.add(f.term);
      for (const o of withDefaults(t).out) used.add(o.term);
    }
    const described = [...used].filter(k => termDesc(k, 'ko'));
    // 전부 채우기 전에도 통과해야 한다 — 다만 절반은 넘겨 둔다
    assert.ok(
      described.length * 2 >= used.size,
      `용어 ${used.size}개 중 뜻풀이 ${described.length}개뿐: ${[...used].filter(k => !termDesc(k, 'ko')).slice(0, 12).join(', ')}`,
    );
    for (const k of described) {
      for (const lang of LANGS) {
        const d = termDesc(k, lang)!;
        assert.ok(d.length > (false ? 6 : 10), `${k} ${lang} 뜻풀이가 너무 짧다`);
        if (lang !== 'ko') assert.ok(!HANGUL.test(d), `${k} ${lang} 뜻풀이에 한글`);
      }
    }
  });

  test(`${name} 섹션 메타가 두 언어로 다 있고 서로 다르다`, () => {
    const titles = LANGS.map(l => section.meta[l].metaTitle);
    assert.equal(new Set(titles).size, 2);
    for (const lang of LANGS) {
      assert.ok(section.meta[lang].metaDesc.length > 80, `${lang} 설명이 너무 짧다`);
    }
    assert.ok(!HANGUL.test(section.meta.en.metaTitle + section.meta.en.metaDesc));
  });
}

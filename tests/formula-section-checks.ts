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
import { textOf } from '../lib/formula/text.ts';
import { TERMS, UNITS, type FormulaLang } from '../lib/formula/terms.ts';
import { sectionAlternates, groupNum, formulaLocales } from '../lib/formula/ui.ts';
import { formulaFaq, renderFormula } from '../lib/formula/faq.ts';
import { answerLine, inputRows, outputRows, scenarioTable, substituted } from '../lib/formula/article.ts';
import { termDesc } from '../lib/formula/glossary.ts';
import type { SectionConfig } from '../lib/formula/section.ts';
import { sectionMeta, sectionCategories } from '../lib/formula/section.ts';
import { verdictText } from '../lib/formula/types.ts';
import { appFile } from './app-path.ts';
import { hasOwnCard } from '../lib/og-cards/index.ts';
import { engineLabels } from '../lib/formula/engine-labels.ts';
import { sectionHasLang } from '../lib/formula/section.ts';

const LANGS: FormulaLang[] = ['ko', 'en', 'es', 'pt-br', 'ja', 'de', 'fr', 'hi', 'zh-hans', 'zh-hant'];
const HANGUL = /[가-힣]/;

/**
 * 글자 수 바닥은 라틴 문자에 맞춰져 있다.
 *
 * 한자로 쓰는 언어는 같은 내용을 절반 남짓의 글자에 담는다 — "售价减掉成本的值。"는
 * 아홉 자지만 "Sale price minus cost."와 같은 말이다. 중국어는 일본어보다도 촘촘하다
 * (가나가 없어서). 바닥을 라틴 기준으로 두면 제대로 쓴 문장이 짧다고 걸린다.
 *
 * 그렇다고 바닥을 없애지는 않는다 — 진짜 토막 난 문장을 잡아야 하므로 낮춰서 둔다.
 */
const DENSE = new Set<FormulaLang>(['ja', 'zh-hans', 'zh-hant']);

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

  test(`${name} 열 언어의 제목·설명·본문·주의가 모두 채워져 있다`, () => {
    for (const t of tools) {
      for (const lang of LANGS) {
        const x = textOf(t, lang);
        // 한자로 쓰는 언어는 같은 내용을 절반쯤의 글자 수에 담는다 — 길이 기준을 따로 둔다
        const min = DENSE.has(lang) ? { title: 2, desc: 6, long: 20, note: 12 } : { title: 5, desc: 12, long: 40, note: 20 };
        for (const k of ['title', 'desc', 'long', 'note'] as const) {
          assert.ok(x[k].length >= min[k], `${t.slug}.${lang}.${k}가 너무 짧다: "${x[k]}"`);
        }
      }
    }
  });

  /**
   * 위 검사는 길이만 본다 — 번역이 없으면 영어가 대신 나오고, 영어는 길이를 통과한다.
   *
   * 그래서 "채워져 있다"가 "영어가 나온다"와 구별되지 않는다. 실제로 중국어를 열고도
   * 백 페이지가 통째로 영어인 채 검사가 다 초록이었다.
   *
   * 제목 하나만 비교하면 안 된다 — 독일어 'BMI Prime'처럼 제 나라 말로 옮겨도
   * 영어와 똑같이 적히는 이름이 있다. 제목·설명·본문이 셋 다 글자까지 같을 때만
   * 사전에 그 항목이 없는 것으로 본다.
   */
  test(`${name} 번역이 영어를 그대로 물려받지 않는다`, () => {
    const bad: string[] = [];
    for (const lang of LANGS) {
      if (lang === 'ko' || lang === 'en') continue;
      const same = tools.filter(t => {
        const x = textOf(t, lang);
        return x.title === t.en.title && x.desc === t.en.desc && x.long === t.en.long;
      });
      if (same.length) bad.push(`${lang}: ${same.length}/${tools.length}종이 영어 그대로 (${same.slice(0, 3).map(t => t.slug).join(', ')}…)`);
    }
    assert.deepEqual(bad, [], `번역이 비어 영어로 떨어지고 있다:\n  ${bad.join('\n  ')}`);
  });

  test(`${name} 제목은 언어별로 서로 겹치지 않는다`, () => {
    for (const lang of LANGS) {
      const titles = tools.map(t => textOf(t, lang).title);
      const dup = titles.filter((x, i) => titles.indexOf(x) !== i);
      assert.deepEqual(dup, [], `${lang} 중복 제목: ${dup.join(', ')}`);
    }
  });

  test(`${name} 번역 아홉 언어에 한글이 새지 않는다`, () => {
    for (const t of tools) {
      for (const lang of LANGS.filter(l => l !== 'ko')) {
        const joined = Object.values(textOf(t, lang)).join(' ');
        assert.ok(!HANGUL.test(joined), `${t.slug}.${lang}에 한글: ${joined.match(HANGUL)}`);
      }
    }
  });


  /**
   * 번역해 놓고 링크를 안 걸면 아무도 못 본다.
   *
   * 언어 전환 목록을 만드는 자리가 여덟 언어 목록(ALL_LOCALES)으로 거르고 있어서,
   * 중국어 300종을 다 옮긴 뒤에도 목록에 안 떴다. 주소를 직접 치지 않는 한 그
   * 페이지에 닿을 방법이 없었고, 검사는 전부 초록이었다.
   *
   * 그래서 "이 섹션이 나가는 언어"와 "전환 목록에 뜨는 언어"가 같은지 본다.
   */
  test(`${name} 전환 목록이 이 섹션의 언어를 빠짐없이 담는다`, () => {
    const shown = formulaLocales(section);
    const missing = LANGS.filter(l => !shown.includes(l));
    assert.deepEqual(
      missing, [],
      `${section.key}가 나가는 언어인데 전환 목록에 없다 — 주소를 직접 치지 않으면 닿을 수 없다: ${missing.join(', ')}`,
    );
  });

  test(`${name} 카테고리는 정해진 목록 안이고 전부 쓰인다`, () => {
    const used = new Set(tools.map(t => t.category));
    for (const c of used) assert.ok(section.categories.includes(c), `모르는 카테고리 ${c}`);
    for (const c of section.categories) assert.ok(used.has(c), `안 쓰인 카테고리 ${c}`);
  });

  test(`${name} 카테고리 이름이 열 언어로 다 있다`, () => {
    for (const lang of LANGS) {
      for (const c of section.categories) assert.ok(sectionCategories(section, lang)[c], `${lang}에 ${c} 라벨 없음`);
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

  test(`${name} 공식에 한글이 없다 — 열 언어가 같은 문자열을 쓴다`, () => {
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

  test(`${name} 해석 문구가 열 언어로 다 나온다`, () => {
    for (const t of tools) {
      if (!t.verdict) continue;
      const { v, out } = withDefaults(t);
      const verdict = t.verdict(v, out);
      if (!verdict) continue;
      for (const lang of LANGS) assert.ok(verdictText(verdict, lang).length > 3, `${t.slug} verdict.${lang} 비었음`);
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
      assert.ok(existsSync(appFile(`${p}/page.tsx`)), `${p}/page.tsx 없음`);
      assert.ok(existsSync(appFile(`${p}/[slug]/page.tsx`)), `${p}/[slug]/page.tsx 없음`);
      // 카드는 이제 파일이 아니라 lib/og-cards의 대응표에 있다 — 물려받은 것은 안 친다
    assert.ok(hasOwnCard(p.replace(/^app/, '') || '/'), `${p}에 제 공유 카드가 없다`);
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
      번역 언어는 INTL_LOCALES10을 돌려 만든다. 주소를 한 줄씩 적어 두면 언어를
      늘릴 때 사이트맵만 조용히 빠지고, 색인에서 그 언어가 통째로 사라진다 —
      실제로 중국어가 그렇게 빠져 섹션마다 100장이 사이트맵에 0건이었다.
    */
    const src = readFileSync(appFile('app/sitemap.ts'), 'utf8');
    assert.ok(src.includes(`/${key}\``) || src.includes(`/${key}/`), `사이트맵에 /${key} 없음`);
    const intl = new RegExp(`INTL_LOCALES10\\.flatMap[\\s\\S]{0,240}/${key}`);
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
        // 번역이 아직 없으면 null이다 — 영어를 대신 내놓기보다 안 보이는 편이 낫다고 정했다
        const d = termDesc(k, lang);
        if (!d) continue;
        assert.ok(d.length > (DENSE.has(lang) ? 4 : 10), `${k} ${lang} 뜻풀이가 너무 짧다`);
        if (lang !== 'ko') assert.ok(!HANGUL.test(d), `${k} ${lang} 뜻풀이에 한글`);
      }
    }
  });

  /*
   * 문구에 적은 개수가 실제 도구 수와 맞는가.
   *
   * "100종"이라고 박아 둔 채 122~126종이 되도록 아무도 못 고쳤다. 열 언어 ×
   * 세 섹션이라 고칠 자리가 서른 곳이고, 화면과 검색결과 제목에 그대로 나가는
   * 문구다. 지금은 {n}을 sectionMeta가 채우므로, 누가 다시 숫자를 박아 넣으면
   * 여기서 걸린다.
   */
  test(`${name} 문구에 적은 개수가 실제 도구 수와 맞는다`, () => {
    const NUM = /(\d{2,3})\s*(종|가지|種|種類|个|种|tools|Tools|calculators|calculadoras|herramientas|ferramentas|Rechner|Werkzeuge|calculateurs|calculatrices|outils|टूल|कैलकुलेटर|औज़ार|आँकड़े|medidas|mesures|Körperwerte)/g;
    for (const lang of LANGS) {
      const m = sectionMeta(section, lang);
      const joined = [m.hubLead, m.metaTitle, m.metaDesc].join(' ');
      assert.ok(!joined.includes('{n}'), `${lang}: {n}이 안 채워졌다`);
      for (const hit of joined.matchAll(NUM)) {
        assert.equal(
          Number(hit[1]), tools.length,
          `${lang} 문구에 "${hit[0]}"이라 적혀 있는데 실제는 ${tools.length}종이다 — 숫자 대신 {n}을 쓰라`,
        );
      }
    }
  });

  test(`${name} 섹션 메타가 열 언어로 다 있고 서로 다르다`, () => {
    const titles = LANGS.map(l => sectionMeta(section, l).metaTitle);
    // 열 개가 모두 달라야 한다 — 같은 게 있으면 한 언어가 다른 언어 문구를 물려받은 것이다
    assert.equal(new Set(titles).size, LANGS.length, `제목이 겹친다: ${titles.join(' / ')}`);
    for (const lang of LANGS) {
      // 일본어는 한자로 같은 내용을 절반쯤의 글자 수에 담는다
      const min = DENSE.has(lang) ? 45 : 80;
      assert.ok(sectionMeta(section, lang).metaDesc.length > min, `${lang} 설명이 너무 짧다`);
    }
    assert.ok(!HANGUL.test(section.meta.en.metaTitle + section.meta.en.metaDesc));
  });
}

/**
 * 서버가 풀어 주는 라벨이 화면에 필요한 것을 다 담는지 본다.
 *
 * 클라이언트 엔진은 사전을 들고 있지 않다 — term()을 부르면 여덟 언어 사전
 * 2.6MB가 번들에 딸려 오기 때문이다(components/FormulaEngine.tsx 주석). 대신
 * 서버가 기본값으로 한 번 계산해 그 도구가 쓰는 열쇠만 풀어 넘긴다.
 *
 * 그 방식은 "출력 항목이 입력에 따라 바뀌지 않는다"는 데 기댄다. 어떤 도구가
 * 입력에 따라 다른 term을 내놓으면 그 라벨이 라벨 표에 없어서 화면에 열쇠
 * 이름이 그대로 뜬다 — 페이지가 깨지지 않아 눈으로는 못 잡는 종류다.
 */
export function checkEngineLabels(section: SectionConfig) {
  const name = `[${section.key}]`;

  test(`${name} 출력 항목이 입력에 따라 바뀌지 않는다`, () => {
    const bad: string[] = [];
    for (const t of section.tools) {
      const sets = new Set<string>();
      for (const mode of ['def', 'zero', 'x2', 'half'] as const) {
        const v: Record<string, number> = {};
        for (const f of t.fields) {
          v[f.key] = mode === 'def' ? f.def : mode === 'zero' ? 0 : mode === 'x2' ? f.def * 2 : f.def / 2;
        }
        sets.add(t.compute(v).map(o => `${o.term}:${o.unit ?? ''}`).join('|'));
      }
      if (sets.size > 1) bad.push(`${t.slug} — ${[...sets].join(' / ')}`);
    }
    assert.deepEqual(
      bad, [],
      `입력에 따라 출력 항목이 달라진다. 서버가 미리 푼 라벨에 없는 항목이 나오면 화면에 열쇠 이름이 뜬다:\n  ${bad.join('\n  ')}`,
    );
  });

  test(`${name} 서버가 푸는 라벨이 화면에 필요한 것을 다 담는다`, () => {
    const bad: string[] = [];
    for (const t of section.tools) {
      for (const lang of LANGS) {
        if (!sectionHasLang(section, lang)) continue;
        const { labels, units } = engineLabels(t, lang);
        const v: Record<string, number> = {};
        for (const f of t.fields) v[f.key] = f.def;
        for (const f of t.fields) {
          if (!labels[f.term]) bad.push(`${t.slug}/${lang}: 입력 ${f.term}`);
          if (f.unit && units[f.unit] === undefined) bad.push(`${t.slug}/${lang}: 단위 ${f.unit}`);
        }
        for (const o of t.compute(v)) {
          if (!labels[o.term]) bad.push(`${t.slug}/${lang}: 출력 ${o.term}`);
          if (o.unit && units[o.unit] === undefined) bad.push(`${t.slug}/${lang}: 단위 ${o.unit}`);
        }
        for (const m of t.formula.matchAll(/\{(\w+)\}/g)) {
          if (!labels[m[1]]) bad.push(`${t.slug}/${lang}: 공식 ${m[1]}`);
        }
      }
    }
    assert.deepEqual(bad.slice(0, 20), [], `라벨이 없어 화면에 열쇠 이름이 뜬다 (${bad.length}건)`);
  });
}

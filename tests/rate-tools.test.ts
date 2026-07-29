import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { readFileSync } from 'node:fs';
import { RATE_TOOLS, RATE_CATEGORIES, rateTool } from '../lib/rate-tools.ts';
import { TERMS, UNITS } from '../lib/formula/terms.ts';
import { sectionAlternates, groupNum } from '../lib/formula/ui.ts';
import { formulaFaq, renderFormula } from '../lib/formula/faq.ts';
import { RATE_CATEGORY_LABEL, RATE_META } from '../lib/rate-section.ts';

const LANGS = ['ko', 'en', 'zh'] as const;
const HANGUL = /[가-힣]/;

/** 기본값으로 계산한 결과 */
const runDefaults = (t: typeof RATE_TOOLS[number]) => {
  const v: Record<string, number> = {};
  for (const f of t.fields) v[f.key] = f.def;
  return { v, out: t.compute(v) };
};

test('50종이 있고 slug가 겹치지 않는다', () => {
  assert.ok(RATE_TOOLS.length >= 50, `50종 이상이어야 하는데 ${RATE_TOOLS.length}개`);
  assert.equal(new Set(RATE_TOOLS.map(t => t.slug)).size, RATE_TOOLS.length);
});

test('slug는 URL에 쓸 수 있는 소문자·하이픈만 쓴다', () => {
  for (const t of RATE_TOOLS) assert.match(t.slug, /^[a-z0-9-]+$/, t.slug);
});

test('세 언어의 제목·설명·본문·주의가 모두 채워져 있다', () => {
  for (const t of RATE_TOOLS) {
    for (const lang of LANGS) {
      const x = t[lang];
      // 중국어는 글자당 정보량이 커서 같은 내용이 훨씬 짧다 — 길이 기준을 언어에 맞춘다
      const min = lang === 'zh' ? { title: 3, desc: 6, long: 20, note: 12 } : { title: 5, desc: 12, long: 40, note: 20 };
      for (const key of ['title', 'desc', 'long', 'note'] as const) {
        assert.ok(x[key].length >= min[key], `${t.slug}.${lang}.${key}가 너무 짧다: "${x[key]}"`);
      }
    }
  }
});

test('제목은 언어별로 서로 겹치지 않는다 — 검색 결과에서 구별돼야 한다', () => {
  for (const lang of LANGS) {
    const titles = RATE_TOOLS.map(t => t[lang].title);
    const dup = titles.filter((x, i) => titles.indexOf(x) !== i);
    assert.deepEqual(dup, [], `${lang} 중복 제목: ${dup.join(', ')}`);
  }
});

test('영어·중국어 페이지에 한글이 새지 않는다', () => {
  for (const t of RATE_TOOLS) {
    for (const lang of ['en', 'zh'] as const) {
      const joined = Object.values(t[lang]).join(' ');
      assert.ok(!HANGUL.test(joined), `${t.slug}.${lang}에 한글: ${joined.match(HANGUL)}`);
    }
  }
});

test('중국어 본문은 실제로 중국어다 — 영어를 그대로 둔 페이지가 없다', () => {
  for (const t of RATE_TOOLS) {
    assert.match(t.zh.title + t.zh.long, /[一-鿿]/, `${t.slug} zh에 한자 없음`);
  }
});

test('카테고리는 정해진 6종 안에 있고 6종 모두 쓰인다', () => {
  const used = new Set(RATE_TOOLS.map(t => t.category));
  for (const c of used) assert.ok((RATE_CATEGORIES as readonly string[]).includes(c), `모르는 카테고리 ${c}`);
  for (const c of RATE_CATEGORIES) assert.ok(used.has(c), `안 쓰인 카테고리 ${c}`);
});

test('카테고리 이름이 세 언어로 다 있다', () => {
  for (const lang of LANGS) {
    for (const c of RATE_CATEGORIES) {
      assert.ok(RATE_CATEGORY_LABEL[lang][c], `${lang}에 ${c} 라벨 없음`);
    }
  }
});

test('입력 라벨과 단위가 사전에 등록돼 있다', () => {
  for (const t of RATE_TOOLS) {
    assert.ok(t.fields.length > 0, `${t.slug} 입력 없음`);
    for (const f of t.fields) {
      assert.ok(TERMS[f.term], `${t.slug}: TERMS에 ${f.term} 없음`);
      if (f.unit) assert.ok(UNITS[f.unit], `${t.slug}: UNITS에 ${f.unit} 없음`);
      assert.equal(new Set(t.fields.map(x => x.key)).size, t.fields.length, `${t.slug} 입력 키 중복`);
    }
  }
});

test('결과 항목도 사전에 등록돼 있고 주인공이 하나 있다', () => {
  for (const t of RATE_TOOLS) {
    const { out } = runDefaults(t);
    assert.ok(out.length > 0, `${t.slug} 결과 없음`);
    for (const o of out) {
      assert.ok(TERMS[o.term], `${t.slug}: TERMS에 ${o.term} 없음`);
      if (o.unit) assert.ok(UNITS[o.unit], `${t.slug}: UNITS에 ${o.unit} 없음`);
    }
    assert.ok(out.filter(o => o.primary).length <= 1, `${t.slug} primary가 둘 이상`);
  }
});

test('공식의 {키}가 모두 용어 사전에 있다 — 화면에 {price}가 그대로 나오면 안 된다', () => {
  for (const t of RATE_TOOLS) {
    for (const m of t.formula.matchAll(/\{(\w+)\}/g)) {
      assert.ok(TERMS[m[1]], `${t.slug} 공식의 ${m[1]}가 TERMS에 없음`);
    }
    for (const lang of LANGS) {
      assert.ok(!renderFormula(t.formula, lang).includes('{'), `${t.slug} ${lang} 공식에 치환 안 된 자리`);
    }
  }
});

test('기본값 계산 결과가 모두 유한한 숫자다', () => {
  for (const t of RATE_TOOLS) {
    for (const o of runDefaults(t).out) {
      assert.ok(Number.isFinite(o.value), `${t.slug}.${o.term} = ${o.value}`);
    }
  }
});

test('0을 넣어도 NaN·Infinity가 나오지 않는다 — 입력을 지운 순간 화면이 깨지면 안 된다', () => {
  for (const t of RATE_TOOLS) {
    const v: Record<string, number> = {};
    for (const f of t.fields) v[f.key] = 0;
    for (const o of t.compute(v)) {
      assert.ok(Number.isFinite(o.value), `${t.slug}.${o.term}이 0 입력에서 ${o.value}`);
    }
  }
});

test('해석 문구는 세 언어가 함께 나온다', () => {
  for (const t of RATE_TOOLS) {
    if (!t.verdict) continue;
    const { v, out } = runDefaults(t);
    const verdict = t.verdict(v, out);
    if (!verdict) continue;
    for (const lang of LANGS) {
      assert.ok(verdict[lang] && verdict[lang].length > 3, `${t.slug} verdict.${lang} 비었음`);
    }
    assert.ok(!HANGUL.test(verdict.en), `${t.slug} verdict.en에 한글`);
    assert.ok(!HANGUL.test(verdict.zh), `${t.slug} verdict.zh에 한글`);
  }
});

/* ───────── 계산이 실제로 맞는지 ───────── */

const primaryOf = (slug: string, v: Record<string, number>) => {
  const t = rateTool(slug)!;
  const out = t.compute(v);
  return (out.find(o => o.primary) ?? out[0]).value;
};

test('할인율: 39,000원 30% 할인은 27,300원', () => {
  assert.equal(primaryOf('discount', { price: 39000, rate: 30 }), 27300);
});

test('할인율 역산: 50,000 → 35,000은 30%', () => {
  assert.equal(primaryOf('discount-rate', { list: 50000, sale: 35000 }), 30);
});

test('이중 할인: 30% 후 20%는 50%가 아니라 44%', () => {
  const t = rateTool('double-discount')!;
  const out = t.compute({ price: 100000, first: 30, second: 20 });
  assert.equal(out[0].value, 56000);
  assert.equal(out[1].value, 44);
});

test('부가세 역산: 110,000원의 공급가액은 100,000원, 세액은 10,000원', () => {
  const t = rateTool('vat-extract')!;
  const out = t.compute({ total: 110000, rate: 10 });
  assert.equal(out[0].value, 100000);
  assert.equal(out[1].value, 10000);
});

test('원천징수 3.3%: 300만 원의 실수령은 2,901,000원', () => {
  assert.equal(primaryOf('withholding', { gross: 3000000, rate: 3.3 }), 2901000);
});

test('세전 역산: 실수령 100만 원, 3.3%면 계약금은 1,034,126원', () => {
  assert.equal(primaryOf('gross-up', { net: 1000000, rate: 3.3 }), 1034126);
});

test('증감률: 45,000 → 52,000은 15.56%', () => {
  assert.equal(primaryOf('percent-change', { before: 45000, after: 52000 }), 15.56);
});

test('퍼센트포인트: 4% → 5%는 1%p이면서 25% 증가', () => {
  const t = rateTool('percent-point')!;
  const out = t.compute({ before: 4, after: 5 });
  assert.equal(out[0].value, 1);
  assert.equal(out[1].value, 25);
});

test('원래 값 역산: 10% 올라 66,000이면 원래는 60,000', () => {
  assert.equal(primaryOf('reverse-percent', { after: 66000, rate: 10 }), 60000);
});

test('비 간단히: 1920:1080은 16:9', () => {
  const t = rateTool('ratio-simplify')!;
  const out = t.compute({ a: 1920, b: 1080 });
  assert.equal(out[0].value, 16);
  assert.equal(out[1].value, 9);
});

test('CAGR: 1000만이 5년 뒤 2400만이면 연 19.14%', () => {
  assert.equal(primaryOf('cagr', { start: 10000000, end: 24000000, years: 5 }), 19.14);
});

test('가중평균: 300개 20%와 700개 5%는 9.5% — 단순평균 12.5%가 아니다', () => {
  const t = rateTool('weighted-percent')!;
  const out = t.compute({ a: 300, ra: 20, b: 700, rb: 5 });
  assert.equal(out[0].value, 9.5);
  assert.equal(out[1].value, 12.5);
});

test('복리: 1000만 원 연 6% 10년은 17,908,477원', () => {
  assert.equal(primaryOf('compound-interest', { principal: 10000000, rate: 6, years: 10 }), 17908477);
});

test('단리: 1000만 원 연 3.5% 3년의 만기는 11,050,000원', () => {
  assert.equal(primaryOf('simple-interest', { principal: 10000000, rate: 3.5, years: 3 }), 11050000);
});

test('대출: 2억 연 4.5% 30년의 월 상환액은 1,013,371원', () => {
  assert.equal(primaryOf('loan-payment', { principal: 200000000, rate: 4.5, years: 30 }), 1013371);
});

test('72의 법칙: 연 7%면 약 10.3년, 정확히는 10.24년', () => {
  const t = rateTool('rule-of-72')!;
  const out = t.compute({ rate: 7 });
  assert.equal(out[0].value, 10.3);
  assert.equal(out[1].value, 10.24);
});

test('손실 회복: 30% 하락은 42.86% 상승이 필요하다', () => {
  assert.equal(primaryOf('loss-recovery', { loss: 30 }), 42.86);
});

test('손실 회복: 50% 하락은 정확히 100% 상승이 필요하다', () => {
  assert.equal(primaryOf('loss-recovery', { loss: 50 }), 100);
});

test('실질 이자율: 명목 3.5%, 물가 2.5%면 0.98%', () => {
  assert.equal(primaryOf('real-rate', { nominal: 3.5, inflation: 2.5 }), 0.98);
});

test('농도: 물 200g에 소금 30g을 녹인 용액 230g은 13.04%', () => {
  assert.equal(primaryOf('concentration', { solute: 30, solution: 230 }), 13.04);
});

test('희석: 20% 300g을 5%로 만들려면 물 900g', () => {
  assert.equal(primaryOf('dilute-water', { conc: 20, solution: 300, target: 5 }), 900);
});

test('혼합: 30% 200g과 10% 300g은 18%', () => {
  assert.equal(primaryOf('mix-two', { a: 200, ra: 30, b: 300, rb: 10 }), 18);
});

test('소금물: 3% 1kg은 소금 30g과 물 970g', () => {
  const t = rateTool('salt-water')!;
  const out = t.compute({ target: 3, total: 1000 });
  assert.equal(out[0].value, 30);
  assert.equal(out[1].value, 970);
});

test('배율 희석: 1000배 20L는 원액 20ml, 물 1L당 1ml', () => {
  const t = rateTool('dilution-fold')!;
  const out = t.compute({ fold: 1000, batch: 20 });
  assert.equal(out[0].value, 20);
  assert.equal(out[1].value, 1);
});

test('ppm: 0.05%는 500ppm', () => {
  assert.equal(primaryOf('ppm-percent', { percent: 0.05 }), 500);
});

test('승률: 27승 18패는 60%', () => {
  assert.equal(primaryOf('win-rate', { wins: 27, losses: 18 }), 60);
});

test('점수: 55점 만점에 43점은 78.2점', () => {
  assert.equal(primaryOf('score-percent', { score: 43, max: 55 }), 78.2);
});

test('손익분기: 고정비 300만, 단가 15,000, 변동비 6,000이면 334개', () => {
  assert.equal(primaryOf('breakeven', { fixed: 3000000, price: 15000, variable: 6000 }), 334);
});

test('단가가 변동비보다 낮으면 손익분기점이 없다고 알린다', () => {
  const t = rateTool('breakeven')!;
  const v = { fixed: 3000000, price: 5000, variable: 6000 };
  const verdict = t.verdict!(v, t.compute(v));
  assert.ok(verdict && verdict.tone === 'bad');
});

/* ───────── 화면·라우트 ───────── */

test('FAQ는 3개이고 실제 계산값이 들어간다', () => {
  for (const t of RATE_TOOLS) {
    for (const lang of LANGS) {
      const faq = formulaFaq(t, lang);
      assert.equal(faq.length, 3, `${t.slug} ${lang}`);
      for (const item of faq) {
        assert.ok(item.q.length > 4 && item.a.length > 10, `${t.slug} ${lang} 빈 FAQ`);
      }
      const { out } = runDefaults(t);
      const primary = out.find(o => o.primary) ?? out[0];
      assert.ok(
        faq[1].a.includes(groupNum(primary.value, primary.digits ?? 2)),
        `${t.slug} ${lang} 예시에 계산값 없음: ${faq[1].a}`,
      );
    }
  }
});

test('영어·중국어 FAQ에 한글이 없다', () => {
  for (const t of RATE_TOOLS) {
    for (const lang of ['en', 'zh'] as const) {
      for (const item of formulaFaq(t, lang)) {
        assert.ok(!HANGUL.test(item.q + item.a), `${t.slug} ${lang} FAQ에 한글`);
      }
    }
  }
});

test('세 언어 라우트가 모두 있다', () => {
  for (const p of ['app/rate', 'app/en/rate', 'app/zh/rate']) {
    assert.ok(existsSync(`${p}/page.tsx`), `${p}/page.tsx 없음`);
    assert.ok(existsSync(`${p}/[slug]/page.tsx`), `${p}/[slug]/page.tsx 없음`);
    assert.ok(existsSync(`${p}/opengraph-image.tsx`), `${p}/opengraph-image.tsx 없음`);
  }
});

test('hreflang은 네 줄이고 x-default는 영어를 가리킨다', () => {
  const a = sectionAlternates('rate', 'discount');
  assert.equal(Object.keys(a).length, 4);
  assert.equal(a.ko, '/rate/discount');
  assert.equal(a.en, '/en/rate/discount');
  assert.equal(a.zh, '/zh/rate/discount');
  assert.equal(a['x-default'], '/en/rate/discount');
});

test('사이트맵에 세 언어의 /rate가 들어 있다', () => {
  const src = readFileSync('app/sitemap.ts', 'utf8');
  for (const p of ['/rate', '/en/rate', '/zh/rate']) {
    assert.ok(src.includes(`${p}\``) || src.includes(`${p}/`), `사이트맵에 ${p} 없음`);
  }
});

test('섹션 메타가 세 언어로 다 있고 서로 다르다', () => {
  const titles = LANGS.map(l => RATE_META[l].metaTitle);
  assert.equal(new Set(titles).size, 3);
  for (const lang of LANGS) {
    const m = RATE_META[lang];
    assert.ok(m.metaDesc.length > (lang === 'zh' ? 40 : 80), `${lang} 설명이 너무 짧다`);
  }
  assert.ok(!HANGUL.test(RATE_META.en.metaTitle + RATE_META.en.metaDesc));
  assert.ok(!HANGUL.test(RATE_META.zh.metaTitle + RATE_META.zh.metaDesc));
});

test('groupNum은 세 자리마다 끊고 정수의 0을 지우지 않는다', () => {
  assert.equal(groupNum(1200000, 0), '1,200,000');
  assert.equal(groupNum(600, 0), '600');
  assert.equal(groupNum(0.05, 2), '0.05');
});

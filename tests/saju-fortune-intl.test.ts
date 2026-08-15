import { test } from 'node:test';
import assert from 'node:assert/strict';
import { analyzeFortune } from '../lib/saju-fortune.ts';
import { analyzeFortuneIntl } from '../lib/saju-fortune-intl.ts';
import { sajuFacts } from '../lib/saju-fortune-facts.ts';
import type { Pillar } from '../lib/saju-data.ts';

/**
 * 영역별 운세는 언어마다 문장이 다르지만 점수는 같아야 한다.
 *
 * 원래 계산과 한국어 문장이 한 파일에 있었고, 영어·중국어를 붙이면서 계산을
 * 옮겼다. 옮기는 과정에서 식이 바뀌면 같은 사주가 언어에 따라 다른 등급을 받는데
 * 화면만 봐서는 눈치채기 어렵다 — 그래서 여기서 못 박는다.
 */
const pillar = (stemIdx: number, branchIdx: number): Pillar => ({ stemIdx, branchIdx } as Pillar);

/** 십간 10 × 십이지 12를 훑어 만든 사주 표본 */
function samples() {
  const out: {
    day: Pillar; year: Pillar; month: Pillar; hour: Pillar | null;
    gender: 'male' | 'female'; singang: boolean; ohaeng: Record<string, number>;
  }[] = [];
  for (let d = 0; d < 10; d++) {
    for (let b = 0; b < 12; b += 3) {
      for (const gender of ['male', 'female'] as const) {
        for (const singang of [true, false]) {
          out.push({
            day: pillar(d, b),
            year: pillar((d + 3) % 10, (b + 5) % 12),
            month: pillar((d + 6) % 10, (b + 8) % 12),
            hour: b % 6 === 0 ? pillar((d + 1) % 10, (b + 2) % 12) : null,
            gender,
            singang,
            // 오행 개수도 갈라 준다 — 빠진 오행 수가 점수에 들어가기 때문이다
            ohaeng: b < 6
              ? { 목: 2, 화: 1, 토: 1, 금: 0, 수: 0 }
              : { 목: 1, 화: 1, 토: 1, 금: 1, 수: 1 },
          });
        }
      }
    }
  }
  return out;
}

test('영역별 운세 점수가 세 언어에서 같다', () => {
  for (const s of samples()) {
    const ko = analyzeFortune(s.day, s.year, s.month, s.hour, s.gender, s.singang, s.ohaeng);
    const en = analyzeFortuneIntl(s.day, s.year, s.month, s.hour, s.gender, s.singang, s.ohaeng, 'en');
    const where = `day=${s.day.stemIdx}/${s.day.branchIdx} ${s.gender} singang=${s.singang}`;

    assert.equal(en.length, ko.length, `영역 개수가 다르다 (${where})`);

    for (let i = 0; i < ko.length; i++) {
      // id와 순서를 공유해야 화면에서 같은 자리에 같은 영역이 온다
      assert.equal(en[i].id, ko[i].id, `영역 순서가 다르다 (${where}, ${i}번째)`);
      assert.equal(en[i].score, ko[i].score, `${ko[i].id} 점수가 다르다 (${where})`);
      assert.equal(en[i].colorKey, ko[i].colorKey, `${ko[i].id} 색이 다르다 (${where})`);
    }
  }
});

/*
 * 영역 수는 늘어난 내력을 함께 적는다 — 숫자만 고치면 왜 늘었는지가 사라진다.
 *   10  처음
 *   11  2026-08-15: 승진(promotion)을 더했다. /fortune/saju/promotion을 내면서
 *       취업(career)·이직(change)과 짚는 자리가 달라 점수를 나눠 쓸 수 없었다.
 */
const DOMAIN_COUNT = 11;

test('영역이 모두 문장을 갖는다', () => {
  for (const s of samples().slice(0, 40)) {
    for (const lang of ['en'] as const) {
      const list = analyzeFortuneIntl(s.day, s.year, s.month, s.hour, s.gender, s.singang, s.ohaeng, lang);
      assert.equal(list.length, DOMAIN_COUNT, `${lang}: 영역이 ${DOMAIN_COUNT}개가 아니다`);
      for (const d of list) {
        assert.ok(d.title.length > 0, `${lang}/${d.id}: title이 비었다`);
        assert.ok(d.grade.length > 0, `${lang}/${d.id}: grade가 비었다`);
        assert.ok(d.intro.length > 30, `${lang}/${d.id}: intro가 너무 짧다`);
        assert.ok(d.summary.length > 10, `${lang}/${d.id}: summary가 너무 짧다`);
        assert.ok(d.advice.length > 10, `${lang}/${d.id}: advice가 너무 짧다`);
        assert.equal(d.points.length, 4, `${lang}/${d.id}: points가 4개가 아니다`);
        for (const p of d.points) {
          assert.ok(p.length > 10, `${lang}/${d.id}: 빈 point가 있다`);
          // 문구 표를 잘못 참조하면 undefined가 문장에 섞여 들어간다
          assert.ok(!p.includes('undefined'), `${lang}/${d.id}: point에 undefined가 섞였다 — ${p}`);
        }
        assert.ok(!d.summary.includes('undefined'), `${lang}/${d.id}: summary에 undefined가 섞였다`);
        assert.ok(!d.advice.includes('undefined'), `${lang}/${d.id}: advice에 undefined가 섞였다`);
      }
    }
  }
});

test('영어·중국어 문장에 한국어가 남아 있지 않다', () => {
  // 십성·오행 한자는 남겨 두지만 한글 음절이 섞이면 옮기다 만 것이다
  const hangul = /[가-힣]/;
  for (const s of samples().slice(0, 40)) {
    for (const lang of ['en'] as const) {
      for (const d of analyzeFortuneIntl(s.day, s.year, s.month, s.hour, s.gender, s.singang, s.ohaeng, lang)) {
        const all = [d.title, d.summary, d.intro, d.advice, ...d.points].join(' ');
        assert.ok(!hangul.test(all), `${lang}/${d.id}: 한글이 남아 있다 — ${all.match(/[가-힣]+/g)?.join(', ')}`);
      }
    }
  }
});

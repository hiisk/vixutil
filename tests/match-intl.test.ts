import { test } from 'node:test';
import assert from 'node:assert/strict';
import { ANIMALS } from '../lib/fortune-data.ts';
import { SIGNS } from '../lib/star-match.ts';
import { ZODIAC_SIGNS_EN, ANIMALS_EN } from '../lib/fortune-en.ts';
import { MBTI_TYPES, calcMbtiMatch, type MbtiType } from '../lib/mbti-match.ts';
import { calcZodiacMatch, MATCH_INFO } from '../lib/zodiac-match.ts';
import { calcStarMatch, STAR_MATCH_INFO } from '../lib/star-match.ts';
import {
  ZODIAC_MATCH_TEXT, STAR_MATCH_TEXT, MBTI_MATCH_TEXT, MBTI_AXIS_TEXT, MATCH_UI,
} from '../lib/match-intl.ts';

const LANGS = ['en'] as const;

test('star-match의 SIGNS 순서가 다국어 별자리 목록과 일치한다', () => {
  // 화면은 ZODIAC_SIGNS_*로 그리고 계산은 SIGNS 인덱스로 하므로,
  // 순서가 어긋나면 고른 별자리와 다른 별자리의 궁합이 조용히 나온다
  const ids = SIGNS.map(s => s.id);
  assert.deepEqual(ZODIAC_SIGNS_EN.map(s => s.id), ids, 'en 별자리 순서가 star-match와 다르다');
});

test('띠 궁합 계산이 쓰는 ANIMALS 순서가 다국어 목록과 일치한다', () => {
  const ids = ANIMALS.map(a => a.id);
  assert.deepEqual(ANIMALS_EN.map(a => a.id), ids, 'en 띠 순서가 다르다');
});

test('띠 궁합의 모든 유형에 en 문구가 있다', () => {
  for (const lang of LANGS) {
    for (const type of Object.keys(MATCH_INFO)) {
      const txt = ZODIAC_MATCH_TEXT[lang][type as keyof typeof MATCH_INFO];
      assert.ok(txt, `${lang}: ${type} 문구 없음`);
      for (const field of ['label', 'headline', 'reason', 'love', 'advice'] as const) {
        assert.ok(txt[field].trim().length > 0, `${lang}.${type}.${field} 비어 있음`);
        assert.ok(!/[가-힣]/.test(txt[field]), `${lang}.${type}.${field}에 한글이 남아 있다`);
      }
    }
  }
});

test('별자리 궁합의 모든 유형에 en 문구가 있다', () => {
  for (const lang of LANGS) {
    for (const type of Object.keys(STAR_MATCH_INFO)) {
      const txt = STAR_MATCH_TEXT[lang][type as keyof typeof STAR_MATCH_INFO];
      assert.ok(txt, `${lang}: ${type} 문구 없음`);
      for (const field of ['label', 'headline', 'reason', 'love', 'advice'] as const) {
        assert.ok(txt[field].trim().length > 0, `${lang}.${type}.${field} 비어 있음`);
        assert.ok(!/[가-힣]/.test(txt[field]), `${lang}.${type}.${field}에 한글이 남아 있다`);
      }
    }
  }
});

test('MBTI 궁합의 모든 밴드에 en 문구가 있다', () => {
  for (const lang of LANGS) {
    for (const band of ['best', 'good', 'ok', 'work'] as const) {
      const txt = MBTI_MATCH_TEXT[lang][band];
      assert.ok(txt, `${lang}: ${band} 문구 없음`);
      // reason은 축별로 조립하므로 여기서는 비어 있는 게 정상이다
      for (const field of ['label', 'headline', 'love', 'advice'] as const) {
        assert.ok(txt[field].trim().length > 0, `${lang}.${band}.${field} 비어 있음`);
        assert.ok(!/[가-힣]/.test(txt[field]), `${lang}.${band}.${field}에 한글이 남아 있다`);
      }
    }
    for (const key of ['nsSame', 'nsDiff', 'tfSame', 'tfDiff', 'eiDiff', 'jpDiff'] as const) {
      assert.ok(!/[가-힣]/.test(MBTI_AXIS_TEXT[lang][key]), `${lang} 축 문구 ${key}에 한글이 남아 있다`);
    }
  }
});

test('모든 조합이 en 문구를 찾을 수 있다', () => {
  // 유형이 하나라도 누락되면 화면에 undefined가 렌더된다
  for (const lang of LANGS) {
    for (let a = 0; a < 12; a++) {
      for (let b = 0; b < 12; b++) {
        assert.ok(ZODIAC_MATCH_TEXT[lang][calcZodiacMatch(a, b).type], `${lang}: 띠 ${a}-${b} 문구 없음`);
        assert.ok(STAR_MATCH_TEXT[lang][calcStarMatch(a, b).type], `${lang}: 별자리 ${a}-${b} 문구 없음`);
      }
    }
    for (const a of MBTI_TYPES) {
      for (const b of MBTI_TYPES) {
        const band = calcMbtiMatch(a as MbtiType, b as MbtiType).info.band;
        assert.ok(MBTI_MATCH_TEXT[lang][band], `${lang}: MBTI ${a}-${b} 문구 없음`);
      }
    }
  }
});

test('궁합은 대칭이다 — a×b와 b×a가 같은 점수', () => {
  for (let a = 0; a < 12; a++) {
    for (let b = 0; b < 12; b++) {
      assert.equal(calcZodiacMatch(a, b).score, calcZodiacMatch(b, a).score, `띠 ${a}-${b} 비대칭`);
      assert.equal(calcStarMatch(a, b).score, calcStarMatch(b, a).score, `별자리 ${a}-${b} 비대칭`);
    }
  }
});

test('혈액형 궁합 10쌍 전부에 en 문구가 있다', async () => {
  // 키는 A<B<O<AB 순서로 만든다. 문자열 정렬로 만들면 'AB'가 'B' 앞에 와서 어긋난다
  const { BLOOD_MATCH_TEXT } = await import('../lib/match-intl.ts');
  const ids = ['A', 'B', 'O', 'AB'];
  const order: Record<string, number> = { A: 0, B: 1, O: 2, AB: 3 };
  const key = (a: string, b: string) => (order[a] <= order[b] ? `${a}-${b}` : `${b}-${a}`);

  for (const lang of LANGS) {
    const seen = new Set<string>();
    for (const a of ids) {
      for (const b of ids) {
        const k = key(a, b);
        seen.add(k);
        const txt = BLOOD_MATCH_TEXT[lang][k];
        assert.ok(txt, `${lang}: ${k} 문구 없음`);
        for (const field of ['label', 'headline', 'reason', 'love', 'advice'] as const) {
          assert.ok(txt[field].trim().length > 0, `${lang}.${k}.${field} 비어 있음`);
          assert.ok(!/[가-힣]/.test(txt[field]), `${lang}.${k}.${field}에 한글이 남아 있다`);
        }
      }
    }
    assert.equal(seen.size, 10, `${lang}: 조합이 10쌍이 아니다`);
  }
});

test('MBTI 16유형이 세 언어 모두 같은 순서다', async () => {
  const { MBTI_TYPES } = await import('../lib/fortune-data.ts');
  const { MBTI_TYPES_EN } = await import('../lib/fortune-en.ts');
  const ids = MBTI_TYPES.map((m: { id: string }) => m.id);
  assert.equal(ids.length, 16);
  assert.deepEqual(MBTI_TYPES_EN.map(m => m.id), ids, 'en MBTI 순서가 다르다');
  for (const list of [MBTI_TYPES_EN]) {
    for (const m of list) {
      assert.ok(m.nickname.trim().length > 0, `${m.id}: nickname 비어 있음`);
      assert.ok(!/[가-힣]/.test(m.nickname + m.trait), `${m.id}: 한글이 남아 있다`);
    }
  }
});

test('궁합 UI 문구가 en 모두 채워져 있다', () => {
  const keys = ['pickBoth', 'you', 'partner', 'score', 'why', 'love', 'advice', 'reset', 'disclaimer'];
  for (const lang of LANGS) {
    for (const k of keys) {
      assert.ok(MATCH_UI[lang][k] && MATCH_UI[lang][k].trim().length > 0, `${lang}.${k} 비어 있음`);
    }
  }
});

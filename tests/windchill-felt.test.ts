/**
 * 체감온도가 스스로 어긋나지 않는지 본다.
 *
 * 공식은 되돌리기 어려운 모양이라, 그 대신 성질로 잡는다. 바람이 세지면 반드시
 * 더 춥게 느껴지고, 기온이 오르면 반드시 덜 춥게 느껴진다. 210칸 어디서든 그
 * 순서가 뒤집히면 계수를 잘못 옮긴 것이다.
 *
 * 널리 실린 표의 값과도 맞춘다 — 영하 10도에 시속 30km면 체감 영하 20도쯤이다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';

import { CELLS, COLDEST, FASTEST_WIND, FROSTBITE, SLOWEST_WIND, TEMPS, WARMEST, WINDCHILL_ICON, WINDCHILL_SLUGS, WINDS, cellOf, slugOf } from '../lib/windchill/list.ts';
import { alongTemp, alongWind, dangerous, feltOf, frostbiteOf, windchillFacts } from '../lib/windchill/facts.ts';
import { WINDCHILL_UI } from '../lib/windchill/ui.ts';
import { LANG_CODES } from '../lib/i18n/lang.ts';
import { DENSE } from './han.ts';

test('100가지가 넘고 주소가 겹치지 않는다', () => {
  assert.ok(CELLS.length >= 100, `${CELLS.length}가지뿐이다`);
  assert.equal(CELLS.length, TEMPS.length * WINDS.length);
  assert.equal(CELLS.length, 336);
  assert.equal(new Set(WINDCHILL_SLUGS).size, CELLS.length, 'slug 중복');
  assert.equal(TEMPS[0], COLDEST);
  assert.equal(TEMPS[TEMPS.length - 1], WARMEST);
  assert.equal(WINDS[0], SLOWEST_WIND);
  assert.equal(WINDS[WINDS.length - 1], FASTEST_WIND);
});

test('영하와 영상이 주소에서 갈린다', () => {
  for (const c of CELLS) {
    assert.deepEqual(cellOf(slugOf(c)), c, `${slugOf(c)}: 되읽으면 다른 칸이 나온다`);
  }
  assert.equal(slugOf({ t: -10, v: 30 }), 'm10-30');
  assert.equal(slugOf({ t: 10, v: 30 }), '10-30');
  assert.equal(slugOf({ t: 0, v: 5 }), '0-5');
  // 영하 10도와 영상 10도가 다른 주소여야 한다
  assert.notEqual(slugOf({ t: -10, v: 5 }), slugOf({ t: 10, v: 5 }));
  assert.equal(cellOf('m31-5'), undefined, '구간 밖은 받지 않는다');
  assert.equal(cellOf('m10-7'), undefined, '눈금에 없는 풍속은 받지 않는다');
});

test('널리 실린 표의 값과 맞는다', () => {
  // 캐나다·미국 기상청 표에 실리는 값들 (반올림 차이만큼만 어긋난다)
  assert.ok(Math.abs(feltOf(-10, 30) - -20) < 0.6, `-10도 30km/h가 ${feltOf(-10, 30)}도다`);
  assert.ok(Math.abs(feltOf(0, 20) - -5) < 0.6, `0도 20km/h가 ${feltOf(0, 20)}도다`);
  assert.ok(Math.abs(feltOf(-20, 40) - -34) < 0.6);
  assert.ok(Math.abs(feltOf(-30, 50) - -49) < 0.6);
  // 바람이 거의 없으면 체감은 기온에 가깝다
  assert.ok(Math.abs(feltOf(10, 5) - 10) < 0.5, '영상 10도·시속 5km는 기온과 비슷하다');
});

test('바람이 세지면 반드시 더 춥게 느껴진다', () => {
  for (const t of TEMPS) {
    const row = alongWind(t);
    for (let i = 1; i < row.length; i++) {
      const prev = feltOf(t, row[i - 1].v);
      const now = feltOf(t, row[i].v);
      assert.ok(now < prev, `${t}도: 풍속 ${row[i].v}에서 체감이 올라갔다`);
    }
  }
});

test('기온이 오르면 반드시 덜 춥게 느껴진다', () => {
  for (const v of WINDS) {
    const col = alongTemp(v);
    for (let i = 1; i < col.length; i++) {
      assert.ok(feltOf(col[i].t, v) > feltOf(col[i - 1].t, v), `${v}km/h: ${col[i].t}도에서 체감이 내려갔다`);
    }
  }
});

test('체감은 언제나 기온보다 낮다', () => {
  for (const c of CELLS) {
    const f = windchillFacts(c);
    assert.ok(f.felt < c.t, `${slugOf(c)}: 체감 ${f.felt}도가 기온 ${c.t}도보다 높다`);
    assert.ok(f.drop > 0, `${slugOf(c)}: 낮아진 폭이 0 이하다`);
    assert.ok(Math.abs(f.drop - (c.t - f.felt)) < 0.11, `${slugOf(c)}: 낮아진 폭이 어긋난다`);
    // 시속 5km에서의 값이 그 기온의 기준선이다
    assert.equal(f.calm, feltOf(c.t, 5), `${slugOf(c)}: 기준선이 다르다`);
    assert.ok(f.felt <= f.calm, `${slugOf(c)}: 바람이 더 센데 덜 춥다`);
  }
});

test('화씨 변환이 되돌아온다', () => {
  for (const c of CELLS) {
    const f = windchillFacts(c);
    const back = ((f.fahrenheit - 32) * 5) / 9;
    assert.ok(Math.abs(back - f.felt) < 0.1, `${slugOf(c)}: 화씨를 되돌리면 ${back.toFixed(2)}도가 된다`);
  }
  assert.equal(windchillFacts({ t: 0, v: 5 }).fahrenheit, Math.round((feltOf(0, 5) * 9 / 5 + 32) * 10) / 10);
});

test('동상 시간이 체감온도 순서를 따른다', () => {
  for (const c of CELLS) {
    const f = windchillFacts(c);
    const expected = FROSTBITE.find(x => f.felt <= x.below)?.minutes ?? null;
    assert.equal(f.frostbite, expected, `${slugOf(c)}: 동상 시간이 다르다`);
    // 더 추울수록 시간이 짧아진다 — 같은 풍속에서 기온을 낮춰 본다
    if (f.colder) {
      const colder = windchillFacts(f.colder);
      if (f.frostbite !== null && colder.frostbite !== null) {
        assert.ok(colder.frostbite <= f.frostbite, `${slugOf(c)}: 더 추운데 시간이 길다`);
      }
    }
  }
  assert.equal(frostbiteOf(-20), null, '체감 영하 20도는 이 표의 위험 구간이 아니다');
  assert.equal(frostbiteOf(-30), 30);
  assert.equal(frostbiteOf(-40), 10);
  assert.equal(frostbiteOf(-50), 2);
  assert.ok(dangerous().length > 0 && dangerous().length < CELLS.length, '전부이거나 하나도 없으면 가른 것이 아니다');
});

test('이웃 칸이 구간 끝에서 끊긴다', () => {
  const corner = windchillFacts({ t: COLDEST, v: SLOWEST_WIND });
  assert.equal(corner.colder, null);
  assert.equal(corner.calmer, null);
  assert.deepEqual(corner.warmer, { t: COLDEST + 2, v: SLOWEST_WIND });
  assert.deepEqual(corner.windier, { t: COLDEST, v: SLOWEST_WIND + 5 });
  const far = windchillFacts({ t: WARMEST, v: FASTEST_WIND });
  assert.equal(far.warmer, null);
  assert.equal(far.windier, null);
});

test('언어끼리 글자가 섞이지 않는다', () => {
  const HAN_OK = new Set(['ja', 'zh', 'tw']);
  const f = windchillFacts({ t: -10, v: 30 });
  for (const lang of LANG_CODES) {
    const ui = WINDCHILL_UI[lang];
    const strings = [
      ...Object.values(ui).filter((v): v is string => typeof v === 'string'),
      ...ui.how,
      ...ui.hubFaq.flatMap(q => [q.q, q.a]),
      ui.desc(f),
      ...ui.windchillFaq(f).flatMap(q => [q.q, q.a]),
      ui.tempName(-10),
      ui.windName(30),
    ];
    for (const s of strings) {
      if (lang !== 'ko') assert.ok(!/[가-힣]/.test(s), `${lang}: 한글이 섞였다 — ${s}`);
      if (lang !== 'ja') assert.ok(!/[ぁ-んァ-ヶ]/.test(s), `${lang}: 가나가 섞였다 — ${s}`);
      if (!HAN_OK.has(lang)) assert.ok(!/[一-龯]/.test(s), `${lang}: 한자가 섞였다 — ${s}`);
      if (lang !== 'hi') assert.ok(!/[ऀ-ॿ]/.test(s), `${lang}: 데바나가리가 섞였다 — ${s}`);
    }
  }
});

test('열 언어 모두 문구가 채워져 있다', () => {
  const f = windchillFacts({ t: -10, v: 30 });
  for (const lang of LANG_CODES) {
    const ui = WINDCHILL_UI[lang];
    const floor = DENSE.has(lang) ? 6 : 12;
    for (const [key, v] of Object.entries(ui)) {
      if (typeof v !== 'string') continue;
      assert.ok(v.trim().length > 0, `${lang}.${key}: 비어 있다`);
    }
    assert.ok(ui.hubLead.length >= (DENSE.has(lang) ? 20 : 35), `${lang}: hubLead가 짧다`);
    assert.equal(ui.how.length, 4, `${lang}: 읽는 방법이 네 줄이 아니다`);
    assert.equal(ui.hubFaq.length, 5, `${lang}: 질문이 다섯이 아니다`);
    for (const h of ui.how) assert.ok(h.length >= floor, `${lang}: 너무 짧다 — ${h}`);
    for (const q of ui.hubFaq) assert.ok(q.q.length >= floor && q.a.length >= floor * 2, `${lang}: 답이 짧다 — ${q.q}`);
    assert.equal(ui.windchillFaq(f).length, 4, `${lang}: 낱장 질문이 넷이 아니다`);
    // 물이 체감온도가 아니라 기온대로 언다는 것은 이 표의 핵심이라 빠지면 안 된다
    assert.ok(ui.notRealNote.length >= floor * 4, `${lang}: 오해를 푸는 문구가 짧다`);
    assert.ok(ui.caution.length >= floor * 3, `${lang}: 주의 문구가 짧다`);
  }
});

test('눈 아이콘은 목록과 카드가 같은 그림을 쓴다', async () => {
  const { ICON_FOR } = await import('../lib/og-icon-map.ts');
  assert.equal(ICON_FOR[WINDCHILL_ICON], 'snow', '이모지가 눈 아이콘으로 이어지지 않는다');
});

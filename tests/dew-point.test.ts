/**
 * 이슬점 계산이 스스로 어긋나지 않는지 본다.
 *
 * 이슬점은 상대습도를 온도로 되돌린 값이다. 그래서 검사는 한 바퀴를 돌린다 —
 * 나온 이슬점에서 포화 수증기압을 구하고 기온의 포화 수증기압으로 나누면 다시
 * 그 상대습도가 나와야 한다.
 *
 * 습도 100%에서는 이슬점이 기온과 같아야 하고, 그보다 낮으면 반드시 기온보다
 * 낮아야 한다. 그 두 자리가 이 계산의 기둥이다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';

import { CELLS, COLDEST, COMFORT, DEW_ICON, DEW_SLUGS, DRIEST, HUMIDS, TEMPS, WARMEST, WETTEST, cellOf, slugOf } from '../lib/dew/list.ts';
import { absoluteOf, alongHumid, alongTemp, comfortOf, dewFacts, dewOf, saturationOf } from '../lib/dew/facts.ts';
import { DEW_UI } from '../lib/dew/ui.ts';
import { LANG_CODES } from '../lib/i18n/lang.ts';
import { DENSE } from './han.ts';

test('100가지가 넘고 주소가 겹치지 않는다', () => {
  assert.ok(CELLS.length >= 100, `${CELLS.length}가지뿐이다`);
  assert.equal(CELLS.length, TEMPS.length * HUMIDS.length);
  assert.equal(CELLS.length, 210);
  assert.equal(new Set(DEW_SLUGS).size, CELLS.length, 'slug 중복');
  assert.equal(TEMPS[0], COLDEST);
  assert.equal(TEMPS[TEMPS.length - 1], WARMEST);
  assert.equal(HUMIDS[0], DRIEST);
  assert.equal(HUMIDS[HUMIDS.length - 1], WETTEST, '상대습도는 100을 넘지 않는다');
  for (const c of CELLS) assert.deepEqual(cellOf(slugOf(c)), c, `${slugOf(c)}: 되읽으면 다른 칸이다`);
  assert.equal(cellOf('26-75'), undefined, '눈금에 없는 습도는 받지 않는다');
});

test('이슬점에서 상대습도를 되돌리면 제자리로 온다', () => {
  for (const c of CELLS) {
    const dew = dewOf(c.t, c.rh);
    // 상대습도 = 이슬점의 포화 수증기압 ÷ 기온의 포화 수증기압
    const back = (saturationOf(dew) / saturationOf(c.t)) * 100;
    assert.ok(Math.abs(back - c.rh) < 0.6, `${slugOf(c)}: 되돌리면 습도가 ${back.toFixed(2)}%가 된다`);
  }
});

test('습도 100%에서는 이슬점이 기온과 같다', () => {
  for (const t of TEMPS) {
    assert.ok(Math.abs(dewOf(t, 100) - t) < 0.05, `${t}도 100%: 이슬점이 ${dewOf(t, 100)}도다`);
    assert.equal(dewFacts({ t, rh: 100 }).spread, 0, `${t}도 100%: 스프레드가 0이 아니다`);
  }
});

test('습도가 낮을수록 이슬점이 낮다', () => {
  for (const t of TEMPS) {
    const row = alongHumid(t);
    for (let i = 1; i < row.length; i++) {
      assert.ok(dewOf(t, row[i].rh) > dewOf(t, row[i - 1].rh), `${t}도: 습도 ${row[i].rh}%에서 이슬점이 내려갔다`);
    }
    // 100%가 아니면 반드시 기온보다 낮다
    for (const c of row) {
      if (c.rh === 100) continue;
      assert.ok(dewOf(t, c.rh) < t, `${slugOf(c)}: 이슬점이 기온보다 높다`);
    }
  }
});

test('기온이 오르면 같은 습도에서도 이슬점이 오른다', () => {
  for (const rh of HUMIDS) {
    const col = alongTemp(rh);
    for (let i = 1; i < col.length; i++) {
      assert.ok(dewOf(col[i].t, rh) > dewOf(col[i - 1].t, rh), `${rh}%: ${col[i].t}도에서 이슬점이 내려갔다`);
    }
  }
});

test('널리 실린 값과 맞는다', () => {
  assert.ok(Math.abs(dewOf(30, 60) - 21.4) < 0.3, `30도 60%가 ${dewOf(30, 60)}도다`);
  assert.ok(Math.abs(dewOf(20, 50) - 9.3) < 0.3);
  assert.ok(Math.abs(dewOf(26, 70) - 20.1) < 0.3);
  // 20도 100%의 공기는 1세제곱미터에 17g쯤의 물을 품는다
  assert.ok(Math.abs(absoluteOf(20, 100) - 17.3) < 0.2, `20도 포화가 ${absoluteOf(20, 100)}g/m³다`);
  assert.ok(Math.abs(absoluteOf(30, 100) - 30.4) < 0.3);
});

test('품은 물의 양이 습도에 비례한다', () => {
  for (const c of CELLS) {
    const f = dewFacts(c);
    // 절대습도 = 최대량 × 상대습도
    assert.ok(Math.abs(f.absolute - (f.capacity * c.rh) / 100) < 0.02, `${slugOf(c)}: 절대습도가 비례하지 않는다`);
    assert.ok(f.absolute <= f.capacity + 0.001, `${slugOf(c)}: 품을 수 있는 양을 넘었다`);
    assert.ok(f.capacity > 0);
  }
  // 같은 습도라도 기온이 높으면 훨씬 많이 품는다 — 30도의 60%는 10도의 60%보다 세 배 넘는다
  assert.ok(absoluteOf(30, 60) / absoluteOf(10, 60) > 3, '기온이 오르면 품는 양이 크게 는다');
});

test('스프레드가 기온과 이슬점의 차이다', () => {
  for (const c of CELLS) {
    const f = dewFacts(c);
    assert.ok(Math.abs(f.spread - (c.t - f.dew)) < 0.11, `${slugOf(c)}: 스프레드가 어긋난다`);
    assert.ok(f.spread >= 0, `${slugOf(c)}: 스프레드가 음수다`);
    // 화씨를 되돌리면 이슬점이다
    assert.ok(Math.abs(((f.fahrenheit - 32) * 5) / 9 - f.dew) < 0.1, `${slugOf(c)}: 화씨가 어긋난다`);
  }
});

test('눅눅함 눈금이 이슬점 순서를 따른다', () => {
  const order = COMFORT.map(c => c.key);
  for (const c of CELLS) {
    const f = dewFacts(c);
    assert.ok(order.includes(f.comfort), `${slugOf(c)}: 모르는 눈금이다`);
    // 이슬점이 높아지면 눈금도 뒤로만 간다
    if (f.wetter) {
      const wetter = dewFacts(f.wetter);
      assert.ok(order.indexOf(wetter.comfort) >= order.indexOf(f.comfort), `${slugOf(c)}: 습해졌는데 눈금이 앞으로 갔다`);
    }
  }
  assert.equal(comfortOf(5), 'dry');
  assert.equal(comfortOf(14), 'pleasant');
  assert.equal(comfortOf(18), 'sticky');
  assert.equal(comfortOf(22), 'muggy');
  assert.equal(comfortOf(26), 'oppressive');
});

test('이웃 칸이 구간 끝에서 끊긴다', () => {
  const corner = dewFacts({ t: COLDEST, rh: DRIEST });
  assert.equal(corner.colder, null);
  assert.equal(corner.drier, null);
  assert.deepEqual(corner.warmer, { t: COLDEST + 2, rh: DRIEST });
  const far = dewFacts({ t: WARMEST, rh: WETTEST });
  assert.equal(far.warmer, null);
  assert.equal(far.wetter, null);
});

test('언어끼리 글자가 섞이지 않는다', () => {
  const HAN_OK = new Set(['ja', 'zh', 'tw']);
  const f = dewFacts({ t: 26, rh: 70 });
  for (const lang of LANG_CODES) {
    const ui = DEW_UI[lang];
    const strings = [
      ...Object.values(ui).filter((v): v is string => typeof v === 'string'),
      ...ui.how,
      ...ui.hubFaq.flatMap(q => [q.q, q.a]),
      ui.desc(f),
      ...ui.dewFaq(f).flatMap(q => [q.q, q.a]),
      ...COMFORT.map(c => ui.comfortName(c.key)),
    ];
    for (const s of strings) {
      if (lang !== 'ko') assert.ok(!/[가-힣]/.test(s), `${lang}: 한글이 섞였다 — ${s}`);
      if (lang !== 'ja') assert.ok(!/[ぁ-んァ-ヶ]/.test(s), `${lang}: 가나가 섞였다 — ${s}`);
      if (!HAN_OK.has(lang)) assert.ok(!/[一-龯]/.test(s), `${lang}: 한자가 섞였다 — ${s}`);
      if (lang !== 'hi') assert.ok(!/[ऀ-ॿ]/.test(s), `${lang}: 데바나가리가 섞였다 — ${s}`);
    }
  }
});

test('눅눅함 이름이 열 언어에 다 있다', () => {
  for (const lang of LANG_CODES) {
    const names = COMFORT.map(c => DEW_UI[lang].comfortName(c.key));
    assert.equal(new Set(names).size, COMFORT.length, `${lang}: 눈금 이름이 겹친다`);
    for (const n of names) assert.ok(n.trim().length > 0, `${lang}: 빈 눈금 이름`);
  }
});

test('열 언어 모두 문구가 채워져 있다', () => {
  const f = dewFacts({ t: 26, rh: 70 });
  for (const lang of LANG_CODES) {
    const ui = DEW_UI[lang];
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
    assert.equal(ui.dewFaq(f).length, 4, `${lang}: 낱장 질문이 넷이 아니다`);
    // 상대습도만으로는 눅눅함을 알 수 없다는 것이 이 표의 전제다
    assert.ok(ui.whyNote.length >= floor * 4, `${lang}: 이유를 밝히는 문구가 짧다`);
  }
});

test('물방울 아이콘은 목록과 카드가 같은 그림을 쓴다', async () => {
  const { ICON_FOR } = await import('../lib/og-icon-map.ts');
  assert.equal(ICON_FOR[DEW_ICON], 'drop', '이모지가 물방울 아이콘으로 이어지지 않는다');
});

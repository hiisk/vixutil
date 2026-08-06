import { test } from 'node:test';
import assert from 'node:assert/strict';
import { BODY_TOOLS, bodyTool } from '../lib/body-tools.ts';
import { BODY_SECTION } from '../lib/body-section.ts';
import { checkFormulaSection, primaryOf, outputsOf } from './formula-section-checks.ts';

checkFormulaSection(BODY_SECTION, 100);

const primary = (slug: string, v: Record<string, number>) => primaryOf(BODY_TOOLS, slug, v);
const outputs = (slug: string, v: Record<string, number>) => outputsOf(BODY_TOOLS, slug, v);
/** 소수 둘째 자리에서 자른 값끼리 더하면 부동소수 찌꺼기가 남는다 */
const round2 = (n: number) => Math.round(n * 100) / 100;

test('BMI: 170cm 68kg은 23.5', () => {
  assert.equal(primary('bmi', { height: 170, weight: 68 }), 23.5);
});

test('BMI 판정은 아시아·태평양 기준을 쓴다 — 24는 과체중이다', () => {
  const t = bodyTool('bmi')!;
  const v = { height: 170, weight: 69.5 };
  const verdict = t.verdict!(v, t.compute(v));
  assert.ok(verdict!.ko.includes('과체중'), verdict!.ko);
  assert.ok(verdict!.en.includes('overweight'), verdict!.en);
});

test('표준 체중: 170cm는 BMI 22 기준 63.6kg', () => {
  assert.equal(primary('ideal-weight', { height: 170, sex: 1 }), 63.6);
});

test('목표 BMI 체중: 170cm에서 BMI 23은 66.5kg', () => {
  const out = outputs('bmi-target-weight', { height: 170, weight: 80, target: 23 });
  assert.equal(out[0].value, 66.5);
  assert.equal(out[1].value, 13.5);
});

test('제지방량: 70kg 체지방 20%는 제지방 56kg, 지방 14kg', () => {
  const out = outputs('lean-mass', { weight: 70, fat: 20 });
  assert.equal(out[0].value, 56);
  assert.equal(out[1].value, 14);
});

test('WHR: 허리 85 엉덩이 96은 0.885', () => {
  assert.equal(primary('whr', { waist: 85, hip: 96, sex: 1 }), 0.885);
});

test('WHtR: 허리가 키의 정확히 절반이면 0.5', () => {
  assert.equal(primary('whtr', { waist: 85, height: 170 }), 0.5);
});

test('체표면적: 170cm 65kg의 Mosteller 값은 1.752㎡', () => {
  const out = outputs('bsa', { height: 170, weight: 65 });
  assert.equal(out[1].value, 1.752);
});

test('기초대사량: 남성 30세 170cm 65kg은 1,568kcal', () => {
  assert.equal(primary('bmr', { sex: 1, age: 30, height: 170, weight: 65 }), 1568);
});

test('기초대사량은 성별로 166kcal 차이난다', () => {
  const male = primary('bmr', { sex: 1, age: 30, height: 170, weight: 65 });
  const female = primary('bmr', { sex: 0, age: 30, height: 170, weight: 65 });
  assert.equal(male - female, 166);
});

test('TDEE: 기초대사량 1500에 활동계수 1.55는 2,325kcal', () => {
  assert.equal(primary('tdee', { bmr: 1500, activity: 1.55 }), 2325);
});

test('감량 칼로리: 주 0.5kg은 하루 550kcal 적자', () => {
  const out = outputs('calorie-deficit', { tdee: 2300, perWeek: 0.5 });
  assert.equal(out[1].value, 550);
  assert.equal(out[0].value, 1750);
});

test('감량 칼로리: 섭취가 1,200 아래로 내려가면 경고한다', () => {
  const t = bodyTool('calorie-deficit')!;
  const v = { tdee: 1600, perWeek: 1 };
  const verdict = t.verdict!(v, t.compute(v));
  assert.equal(verdict!.tone, 'bad');
});

test('감량 기간: 10kg을 하루 500kcal 적자로 빼면 22주', () => {
  assert.equal(primary('weight-loss-time', { now: 80, goal: 70, deficit: 500 }), 22);
});

test('단백질: 65kg에 1.6g/kg은 104g', () => {
  assert.equal(primary('protein-need', { weight: 65, perKg: 1.6 }), 104);
});

test('최대 심박수: 35세는 Tanaka 184, 220−나이 185', () => {
  const out = outputs('max-heart-rate', { age: 35 });
  assert.equal(out[0].value, 184);
  assert.equal(out[1].value, 185);
});

test('1RM: 80kg 8회는 Epley 101.3kg', () => {
  assert.equal(primary('one-rep-max', { weight: 80, reps: 8 }), 101.3);
});

test('1RM 역산: 100kg 1RM으로 10회는 75kg', () => {
  assert.equal(primary('rep-weight', { oneRm: 100, reps: 10 }), 75);
});

test('페이스: 10km 55분은 5.5분/km이고 초 부분은 30초', () => {
  const out = outputs('running-pace', { km: 10, minutes: 55 });
  assert.equal(out[0].value, 5.5);
  assert.equal(out[1].value, 30);
});

test('완주 시간: 마라톤을 6분/km로 달리면 4시간 13분', () => {
  const out = outputs('race-time', { km: 42.195, pace: 6 });
  assert.equal(out[1].value, 4);
  assert.equal(out[2].value, 13);
});

test('트레드밀: 10km/h는 6분/km', () => {
  assert.equal(primary('treadmill-pace', { speed: 10 }), 6);
});

test('아이 예상 키: 아버지 175 어머니 162의 아들은 175cm', () => {
  assert.equal(primary('child-height', { father: 175, mother: 162, sex: 1 }), 175);
});

test('아이 예상 키: 딸은 아들보다 13cm 낮게 나온다', () => {
  const son = primary('child-height', { father: 175, mother: 162, sex: 1 });
  const daughter = primary('child-height', { father: 175, mother: 162, sex: 0 });
  assert.equal(son - daughter, 13);
});

test('수유량: 4.5kg 아기가 하루 7번이면 1회 96ml', () => {
  const out = outputs('baby-milk', { weight: 4.5, feeds: 7 });
  assert.equal(out[0].value, 96);
  assert.equal(out[1].value, 675);
});

test('신생아 체중: 출생보다 10% 넘게 줄면 진료를 권한다', () => {
  const t = bodyTool('baby-weight-gain')!;
  const v = { birth: 3200, now: 2800 };
  const verdict = t.verdict!(v, t.compute(v));
  assert.equal(verdict!.tone, 'bad');
});

test('평균 동맥압: 120/80은 93.3mmHg, 맥압 40', () => {
  const out = outputs('mean-arterial-pressure', { sys: 120, dia: 80 });
  assert.equal(out[0].value, 93.3);
  assert.equal(out[1].value, 40);
});

test('LDL: 총 200, HDL 50, 중성지방 120이면 126', () => {
  assert.equal(primary('ldl-friedewald', { total: 200, hdl: 50, tg: 120 }), 126);
});

test('LDL: 중성지방 400 이상이면 공식을 쓸 수 없다고 알린다', () => {
  const t = bodyTool('ldl-friedewald')!;
  const v = { total: 240, hdl: 40, tg: 450 };
  const verdict = t.verdict!(v, t.compute(v));
  assert.equal(verdict!.tone, 'bad');
});

test('HOMA-IR: 혈당 95, 인슐린 8이면 1.88', () => {
  assert.equal(primary('homa-ir', { glucose: 95, insulin: 8 }), 1.88);
});

test('HbA1c 6.5%는 평균 혈당 140mg/dL', () => {
  assert.equal(primary('a1c-glucose', { a1c: 6.5 }), 140);
});

test('혈당 단위: 100mg/dL은 5.56mmol/L', () => {
  assert.equal(primary('glucose-unit', { mgdl: 100 }), 5.56);
});

test('카페인: 150mg을 마시고 8시간 뒤 반감기 5시간이면 49.5mg 남는다', () => {
  assert.equal(primary('caffeine-half-life', { mg: 150, hours: 8, half: 5 }), 49.5);
});

test('혈중 알코올: 맥주 500ml 5%를 70kg 남성이 마시면 0.041%', () => {
  assert.equal(primary('alcohol-bac', { ml: 500, abv: 5, weight: 70, sex: 1 }), 0.041);
});

test('혈중 알코올 안내문은 어떤 경우에도 운전을 권하지 않는다', () => {
  const t = bodyTool('alcohol-bac')!;
  for (const v of [{ ml: 100, abv: 4, weight: 90, sex: 1 }, { ml: 1000, abv: 17, weight: 55, sex: 0 }]) {
    const verdict = t.verdict!(v, t.compute(v));
    assert.ok(verdict!.tone === 'bad' || verdict!.tone === 'warn', JSON.stringify(verdict));
  }
});

test('의료 면책 문구가 세 언어 모두에 있다', () => {
  for (const lang of ['ko', 'en'] as const) {
    const foot = BODY_SECTION.meta[lang].footNote;
    assert.ok(foot.length > 30, `${lang} 면책 문구가 없다`);
  }
});

/*
 * ───────── 셋째 묶음 12종 ─────────
 *
 * 기대값은 손으로 세우거나, 다른 도구·이미 아는 기준으로 되돌려 확인한 것이다.
 * 목표 체지방률이 지금과 같으면 감량은 0이고, 순탄수는 뺄 것이 없으면 총탄수와
 * 같고, 혈압 분류의 경계값은 지침에 적힌 숫자 그대로다.
 */

test('피부두께: 세 곳 합 50mm, 35세 남성이면 15.65%', () => {
  const out = outputs('skinfold-body-fat', { sum: 50, age: 35, sex: 1, weight: 70 });
  assert.equal(out[0].value, 15.65);
  assert.equal(round2(out[1].value + out[2].value), 70);
});

test('피부두께: 같은 두께라도 여성 계수가 더 높은 체지방률을 낸다', () => {
  const man = primary('skinfold-body-fat', { sum: 50, age: 35, sex: 1, weight: 70 });
  const woman = primary('skinfold-body-fat', { sum: 50, age: 35, sex: 0, weight: 70 });
  assert.ok(woman > man, `${woman} vs ${man}`);
});

test('피부두께: 두께가 두꺼울수록 체지방률이 올라간다', () => {
  const thin = primary('skinfold-body-fat', { sum: 30, age: 35, sex: 1, weight: 70 });
  const thick = primary('skinfold-body-fat', { sum: 70, age: 35, sex: 1, weight: 70 });
  assert.ok(thick > thin, `${thick} vs ${thin}`);
});

test('감량 목표: 80kg 25%에서 15%를 노리면 70.59kg, 9.41kg 감량', () => {
  const out = outputs('fat-loss-target', { weight: 80, fat: 25, target: 15 });
  assert.equal(out[0].value, 70.59);
  assert.equal(out[1].value, 9.41);
  assert.equal(out[2].value, 60);
});

test('감량 목표: 목표가 지금과 같으면 뺄 것이 없다', () => {
  const out = outputs('fat-loss-target', { weight: 80, fat: 25, target: 25 });
  assert.equal(out[0].value, 80);
  assert.equal(out[1].value, 0);
});

test('감량 목표: 제지방량은 목표를 바꿔도 그대로다', () => {
  const a = outputs('fat-loss-target', { weight: 80, fat: 25, target: 15 })[2].value;
  const b = outputs('fat-loss-target', { weight: 80, fat: 25, target: 10 })[2].value;
  assert.equal(a, b);
});

test('순탄수: 45에서 섬유 8과 당알코올 5의 절반을 빼면 34.5', () => {
  const out = outputs('net-carbs', { carb: 45, fiber: 8, alc: 5 });
  assert.equal(out[0].value, 34.5);
  assert.equal(out[1].value, 138);
});

test('순탄수: 뺄 것이 없으면 총탄수와 같고, 음수로는 안 내려간다', () => {
  assert.equal(primary('net-carbs', { carb: 45, fiber: 0, alc: 0 }), 45);
  assert.equal(primary('net-carbs', { carb: 5, fiber: 40, alc: 0 }), 0);
});

test('혈당부하: GI 70에 탄수 30g이면 21이고 높음으로 본다', () => {
  const t = bodyTool('glycemic-load')!;
  const v = { gi: 70, carb: 30 };
  assert.equal(t.compute(v)[0].value, 21);
  assert.equal(t.verdict!(v, t.compute(v))!.tone, 'bad');
});

test('혈당부하: 지수가 높아도 양이 적으면 부담은 낮다', () => {
  const t = bodyTool('glycemic-load')!;
  // 수박은 GI 72지만 한 조각의 탄수화물이 8g뿐이다
  const v = { gi: 72, carb: 8 };
  assert.equal(t.compute(v)[0].value, 5.8);
  assert.equal(t.verdict!(v, t.compute(v))!.tone, 'good');
});

test('혈당부하: 10과 20이 낮음·중간·높음의 경계다', () => {
  const t = bodyTool('glycemic-load')!;
  const tone = (gi: number, carb: number) => t.verdict!({ gi, carb }, t.compute({ gi, carb }))!.tone;
  assert.equal(tone(100, 9.9), 'good');
  assert.equal(tone(100, 10), 'warn');
  assert.equal(tone(100, 19.9), 'warn');
  assert.equal(tone(100, 20), 'bad');
});

test('칼로리 밀도: 150g에 250kcal면 100g당 166.7kcal, 200kcal는 120g', () => {
  const out = outputs('calorie-density', { kcal: 250, gram: 150 });
  assert.equal(out[0].value, 166.7);
  assert.equal(out[1].value, 120);
});

test('칼로리 밀도: 밀도가 낮을수록 200kcal어치가 무거워진다', () => {
  const light = outputs('calorie-density', { kcal: 30, gram: 100 })[1].value;
  const heavy = outputs('calorie-density', { kcal: 600, gram: 100 })[1].value;
  assert.ok(light > heavy, `${light}g vs ${heavy}g`);
});

test('W/kg: 250W에 72kg면 3.47이고, 등급은 중간이다', () => {
  const t = bodyTool('power-to-weight')!;
  const v = { watt: 250, weight: 72 };
  assert.equal(t.compute(v)[0].value, 3.47);
  assert.equal(t.verdict!(v, t.compute(v))!.tone, 'warn');
});

test('W/kg: 4 이상이면 좋다고, 2.5 미만이면 나쁘다고 알린다', () => {
  const t = bodyTool('power-to-weight')!;
  const tone = (watt: number, weight: number) => t.verdict!({ watt, weight }, t.compute({ watt, weight }))!.tone;
  assert.equal(tone(320, 70), 'good');
  assert.equal(tone(150, 80), 'bad');
});

test('W/kg: 같은 출력이면 가벼운 쪽이 크다', () => {
  const light = primary('power-to-weight', { watt: 250, weight: 60 });
  const heavy = primary('power-to-weight', { watt: 250, weight: 85 });
  assert.ok(light > heavy, `${light} vs ${heavy}`);
});

test('CSS: 400m 380초, 200m 175초면 100m당 102.5초', () => {
  const out = outputs('swim-css', { t400: 380, t200: 175 });
  assert.equal(out[0].value, 102.5);
  assert.equal(out[1].value, 1538);
});

test('CSS: 두 기록이 같으면 0이고 음수로는 안 내려간다', () => {
  assert.equal(primary('swim-css', { t400: 200, t200: 200 }), 0);
  assert.equal(primary('swim-css', { t400: 150, t200: 200 }), 0);
});

test('네거티브 스플릿: 0%면 정확히 반씩, 2%면 전반이 더 길다', () => {
  const even = outputs('negative-split', { total: 240, split: 0, dist: 42.195 });
  assert.equal(even[0].value, 120);
  assert.equal(even[1].value, 120);
  const neg = outputs('negative-split', { total: 240, split: 2, dist: 42.195 });
  assert.ok(neg[0].value > neg[1].value, `${neg[0].value} vs ${neg[1].value}`);
  assert.equal(round2(neg[0].value + neg[1].value), 240);
});

test('혈압: 지침의 경계값이 그대로 단계가 된다', () => {
  const stage = (sys: number, dia: number) => primary('blood-pressure-category', { sys, dia });
  assert.equal(stage(118, 76), 0);
  assert.equal(stage(122, 76), 1);
  assert.equal(stage(132, 76), 2);
  assert.equal(stage(142, 76), 3);
  assert.equal(stage(182, 76), 4);
});

test('혈압: 수축기가 정상이어도 이완기가 높으면 그 단계가 된다', () => {
  // 두 값 가운데 나쁜 쪽이 단계를 정한다 — 한쪽만 보면 놓친다
  assert.equal(primary('blood-pressure-category', { sys: 110, dia: 95 }), 3);
  assert.equal(primary('blood-pressure-category', { sys: 110, dia: 84 }), 2);
});

test('혈압: 평균 동맥압은 (수축기 + 이완기×2) ÷ 3이다', () => {
  assert.equal(outputs('blood-pressure-category', { sys: 120, dia: 90 })[2].value, 100);
});

test('신장: eGFR 경계값이 G1~G5로 갈린다', () => {
  const stage = (egfr: number) => primary('kidney-stage', { egfr });
  assert.equal(stage(95), 1);
  assert.equal(stage(90), 1);
  assert.equal(stage(89), 2);
  assert.equal(stage(59), 3);
  // 30~45 사이도 3기다 — 이 점을 안 짚으면 경계를 45로 옮겨도 검사가 통과한다
  assert.equal(stage(35), 3);
  assert.equal(stage(30), 3);
  assert.equal(stage(29), 4);
  assert.equal(stage(14), 5);
});

test('신장: 60 위아래로 알림의 색이 갈린다', () => {
  const t = bodyTool('kidney-stage')!;
  const tone = (egfr: number) => t.verdict!({ egfr }, t.compute({ egfr }))!.tone;
  assert.equal(tone(72), 'good');
  assert.equal(tone(45), 'warn');
  assert.equal(tone(20), 'bad');
});

test('아이 수면: 나이 구간마다 권장 시간이 계단처럼 줄어든다', () => {
  const range = (age: number) => outputs('child-sleep-need', { age }).slice(1).map(o => o.value);
  assert.deepEqual(range(0.5), [12, 16]);
  assert.deepEqual(range(2), [11, 14]);
  assert.deepEqual(range(4), [10, 13]);
  assert.deepEqual(range(9), [9, 12]);
  assert.deepEqual(range(16), [8, 10]);
  assert.deepEqual(range(30), [7, 9]);
});

test('아이 수면: 권장 시간은 아래위 값의 한가운데다', () => {
  const out = outputs('child-sleep-need', { age: 7 });
  assert.equal(out[0].value, (out[1].value + out[2].value) / 2);
});

test('낮잠: 55분을 경계로 20분과 90분으로 갈린다', () => {
  assert.equal(primary('nap-timing', { plan: 20 }), 20);
  assert.equal(primary('nap-timing', { plan: 55 }), 20);
  assert.equal(primary('nap-timing', { plan: 56 }), 90);
  assert.equal(primary('nap-timing', { plan: 120 }), 90);
});

test('낮잠: 30~60분은 주의, 20분 이하와 80분 이상은 좋다', () => {
  const t = bodyTool('nap-timing')!;
  const tone = (plan: number) => t.verdict!({ plan }, t.compute({ plan }))!.tone;
  assert.equal(tone(20), 'good');
  assert.equal(tone(45), 'warn');
  assert.equal(tone(90), 'good');
});

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { BODY_TOOLS, bodyTool } from '../lib/body-tools.ts';
import { BODY_SECTION } from '../lib/body-section.ts';
import { checkFormulaSection, primaryOf, outputsOf } from './formula-section-checks.ts';

checkFormulaSection(BODY_SECTION);

const primary = (slug: string, v: Record<string, number>) => primaryOf(BODY_TOOLS, slug, v);
const outputs = (slug: string, v: Record<string, number>) => outputsOf(BODY_TOOLS, slug, v);

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
  for (const lang of ['ko', 'en', 'zh'] as const) {
    const foot = BODY_SECTION.meta[lang].footNote;
    assert.ok(foot.length > 30, `${lang} 면책 문구가 없다`);
  }
});

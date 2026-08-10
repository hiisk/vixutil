import type { CalcLang, CalcCopy, CalcTable } from './types.ts';
import { UNIT_WEIGHT } from './unit-weight.ts';
import { UNIT_LENGTH } from './unit-length.ts';

export type { CalcLang, CalcCopy } from './types.ts';
export { CALC_SHELL } from './shell.ts';
import { UNIT_TEMP } from './unit-temp.ts';
import { BINARY } from './binary.ts';
import { PERCENT } from './percent.ts';
import { DEV_JSON } from './dev-tools.ts';
import { DEV_BASE64 } from './dev-tools.ts';
import { DEV_URL_ENCODE } from './dev-tools2.ts';
import { DEV_HASH } from './dev-tools2.ts';
import { DEV_UUID } from './dev-tools2.ts';
import { DEV_TIMESTAMP } from './dev-tools3.ts';
import { DEV_WORD_COUNT } from './dev-tools3.ts';
import { DEV_JWT } from './dev-tools4.ts';
import { DEV_REGEX } from './dev-tools4.ts';
import { DEV_COLOR } from './dev-tools5.ts';
import { DEV_SQL } from './dev-tools5.ts';
import { DEV_DIFF } from './dev-tools5.ts';
import { DEV_CRON } from './dev-cron.ts';
import { LOAN } from './loan.ts';

/**
 * 다국어로 낸 계산기 목록.
 *
 * 여기 있는 슬러그는 한국어에도 같은 주소로 있다 — 열 언어가 짝이 맞는다는
 * 뜻이고, hreflang과 언어 버튼이 그 사실에 기대고 있다. 새로 더할 때는
 * `app/calculator/<슬러그>/page.tsx`가 실재하는지 먼저 확인한다.
 *
 * 한국 법·제도에 묶인 쉰셋은 여기 오지 않는다. 자세한 이유는 types.ts에 적었다.
 */


import { AVG_PRICE } from './avg-price.ts';

import { BREAKEVEN } from './breakeven.ts';

import { DEPOSIT } from './deposit.ts';

import { SAVINGS } from './savings.ts';

import { COMPOUND_GOAL } from './compound-goal.ts';

import { DIVIDEND } from './dividend.ts';

import { INFLATION } from './inflation.ts';

import { RETIREMENT } from './retirement.ts';

import { EXCHANGE } from './exchange.ts';



import { CALORIE } from './health2.ts';

import { PROTEIN } from './health2.ts';

import { BODY_FAT } from './body-fat.ts';

import { CALORIES_BURN } from './calories-burn.ts';

import { CAFFEINE } from './life.ts';


import { BLOOD_PRESSURE } from './life2.ts';


import { DDAY } from './dates.ts';

import { TIME_DIFF } from './dates.ts';

import { BIRTHDAY } from './dates2.ts';

import { OVULATION } from './dates2.ts';

import { PREGNANCY } from './dates2.ts';

import { CAR_INSTALLMENT } from './car.ts';

import { FUEL_EFFICIENCY } from './car.ts';

import { GAS_COST } from './car2.ts';

import { EV_CHARGE } from './car2.ts';

import { GPA } from './gpa.ts';

import { LTV, REFINANCE, LOAN_METHOD } from './finance2.ts';

import { WORK_HOURS, OVERTIME } from './work.ts';

import { CAR_COST } from './car3.ts';

import { AVERAGE, RENTAL_YIELD, APPLIANCE_POWER } from './daily.ts';

import { SHOE_SIZE, PET_AGE, VOLUMETRIC_WEIGHT } from './sizes.ts';

const TABLES: Record<string, CalcTable> = {
  'shoe-size': SHOE_SIZE,
  'pet-age': PET_AGE,
  'volumetric-weight': VOLUMETRIC_WEIGHT,
  'average': AVERAGE,
  'rental-yield': RENTAL_YIELD,
  'appliance-power': APPLIANCE_POWER,
  'ltv': LTV,
  'refinance': REFINANCE,
  'loan-method': LOAN_METHOD,
  'work-hours': WORK_HOURS,
  'overtime': OVERTIME,
  'car-cost': CAR_COST,
  'gpa': GPA,
  'ev-charge': EV_CHARGE,
  'gas-cost': GAS_COST,
  'fuel-efficiency': FUEL_EFFICIENCY,
  'car-installment': CAR_INSTALLMENT,
  'pregnancy': PREGNANCY,
  'ovulation': OVULATION,
  'birthday': BIRTHDAY,
  'time-diff': TIME_DIFF,
  'dday': DDAY,
  'blood-pressure': BLOOD_PRESSURE,
  'caffeine': CAFFEINE,
  'calories-burn': CALORIES_BURN,
  'body-fat': BODY_FAT,
  'protein': PROTEIN,
  'calorie': CALORIE,
  'exchange': EXCHANGE,
  'retirement': RETIREMENT,
  'inflation': INFLATION,
  'dividend': DIVIDEND,
  'compound-goal': COMPOUND_GOAL,
  'savings': SAVINGS,
  'deposit': DEPOSIT,
  'breakeven': BREAKEVEN,
  'avg-price': AVG_PRICE,
  'loan': LOAN,
  'dev/cron': DEV_CRON,
  'dev/diff': DEV_DIFF,
  'dev/sql': DEV_SQL,
  'dev/color': DEV_COLOR,
  'dev/regex': DEV_REGEX,
  'dev/jwt': DEV_JWT,
  'dev/word-count': DEV_WORD_COUNT,
  'dev/timestamp': DEV_TIMESTAMP,
  'dev/uuid': DEV_UUID,
  'dev/hash': DEV_HASH,
  'dev/url-encode': DEV_URL_ENCODE,
  'dev/base64': DEV_BASE64,
  'dev/json': DEV_JSON,
  'percent': PERCENT,
  'binary': BINARY,
  'unit-temp': UNIT_TEMP,
  'unit-weight': UNIT_WEIGHT,
  'unit-length': UNIT_LENGTH,
};

export const CALC_INTL_SLUGS = Object.keys(TABLES);

export function calcCopy(lang: CalcLang, slug: string): CalcCopy | undefined {
  return TABLES[slug]?.[lang];
}

export function hasCalcIntl(slug: string): boolean {
  return slug in TABLES;
}

/**
 * 같은 언어의 다른 계산기 몇 개 — 상세 아래 "다른 계산기"에 쓴다.
 *
 * 앞에서 여섯을 자르면 모든 낱장이 같은 여섯만 가리키고, 목록 뒤에 더한
 * 계산기는 들어오는 링크가 0이 된다(관련 항목 174곳이 그랬던 것과 같은 병).
 * 자기 다음 여섯을 고리로 돌면 어느 계산기든 앞의 여섯 낱장이 가리켜 준다.
 */
export function relatedCalcs(lang: CalcLang, slug: string, count = 6) {
  const i = CALC_INTL_SLUGS.indexOf(slug);
  const ring = i < 0
    ? CALC_INTL_SLUGS
    : [...CALC_INTL_SLUGS.slice(i + 1), ...CALC_INTL_SLUGS.slice(0, i)];
  return ring
    .filter(s => s !== slug)
    .slice(0, count)
    .map(s => ({ slug: s, title: TABLES[s][lang].title, short: TABLES[s][lang].short }));
}

import type { CountryDef } from './engine.ts';

/**
 * 영국(잉글랜드·웨일스) 은행 휴일 (bank holidays).
 *
 * ── 왜 잉글랜드·웨일스만인가 ───────────────────────────────
 * 영국은 네 지역의 휴일이 다르다. 스코틀랜드는 1월 2일과 성 앤드루의 날이
 * 있고 부활절 월요일이 없으며, 북아일랜드는 성 패트릭의 날과 보인 전투일이
 * 더 있다. 한 목록으로 낼 수 없어 가장 인구가 많은 잉글랜드·웨일스를 낸다 —
 * 지역이 다르면 그렇게 밝힌다.
 *
 * ── 주말과 겹치면 ──────────────────────────────────────────
 * 앞으로 당기지 않고 **다음 평일로 민다**(next). 크리스마스와 박싱데이가
 * 토·일에 걸리면 월·화 이틀로 밀리는데, 엔진이 이미 찬 날을 건너뛰므로
 * 둘이 같은 날에 겹치지 않는다.
 */
export const GB: CountryDef = {
  code: 'gb',
  observance: 'next',
  holidays: [
    { slug: 'new-years-day', rule: { kind: 'fixed', month: 1, day: 1 } },
    /* 부활절 이틀 전 금요일. 주말에 안 걸리므로 대체가 없다 */
    { slug: 'good-friday', rule: { kind: 'easter', offset: -2 }, observance: 'none' },
    { slug: 'easter-monday', rule: { kind: 'easter', offset: 1 }, observance: 'none' },
    /* 5월 첫째 월요일 — 1978년부터 */
    { slug: 'early-may', rule: { kind: 'nth', month: 5, weekday: 1, n: 1 }, from: 1978 },
    /* 5월 마지막 월요일 */
    { slug: 'spring-bank', rule: { kind: 'nth', month: 5, weekday: 1, n: -1 } },
    /* 8월 마지막 월요일 — 잉글랜드·웨일스 기준(스코틀랜드는 첫째 월요일) */
    { slug: 'summer-bank', rule: { kind: 'nth', month: 8, weekday: 1, n: -1 } },
    { slug: 'christmas-day', rule: { kind: 'fixed', month: 12, day: 25 } },
    { slug: 'boxing-day', rule: { kind: 'fixed', month: 12, day: 26 } },
  ],
};

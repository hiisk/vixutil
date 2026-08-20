import type { CountryDef } from './engine.ts';

/**
 * 미국 연방 공휴일 (federal holidays).
 *
 * ── 무엇을 넣었나 ──────────────────────────────────────────
 * 연방 공휴일 열하나. 주(州)마다 따로 쉬는 날은 안 넣는다 — 쉰 개 주가 제각각이라
 * 「미국 공휴일」이라는 한 목록으로 낼 수 없다.
 *
 * ── 주말과 겹치면 ──────────────────────────────────────────
 * 토요일이면 앞의 금요일, 일요일이면 뒤의 월요일에 «관측»한다(nearest).
 * 5 U.S.C. §6103이 정한 방식이고, 그래서 7월 4일이 토요일인 해에는 3일 금요일에
 * 연방 기관이 문을 닫는다.
 *
 * ── 「월요일 공휴일법」 ─────────────────────────────────────
 * 1968년 Uniform Monday Holiday Act가 넷을 월요일로 옮겼다 — 워싱턴 탄신일,
 * 메모리얼 데이, 노동절, 콜럼버스 데이. 그래서 이들은 fixed가 아니라 nth다.
 */
export const US: CountryDef = {
  code: 'us',
  observance: 'nearest',
  holidays: [
    { slug: 'new-years-day', rule: { kind: 'fixed', month: 1, day: 1 } },
    /* 1월 셋째 월요일 — 1986년부터 연방 공휴일 */
    { slug: 'mlk-day', rule: { kind: 'nth', month: 1, weekday: 1, n: 3 }, from: 1986 },
    /* 법률상 이름은 여전히 Washington's Birthday다. 2월 셋째 월요일 */
    { slug: 'presidents-day', rule: { kind: 'nth', month: 2, weekday: 1, n: 3 } },
    /* 5월 마지막 월요일 */
    { slug: 'memorial-day', rule: { kind: 'nth', month: 5, weekday: 1, n: -1 } },
    /* 2021년 신설 — 가장 최근에 생긴 연방 공휴일 */
    { slug: 'juneteenth', rule: { kind: 'fixed', month: 6, day: 19 }, from: 2021 },
    { slug: 'independence-day', rule: { kind: 'fixed', month: 7, day: 4 } },
    /* 9월 첫째 월요일 */
    { slug: 'labor-day', rule: { kind: 'nth', month: 9, weekday: 1, n: 1 } },
    /* 10월 둘째 월요일 */
    { slug: 'columbus-day', rule: { kind: 'nth', month: 10, weekday: 1, n: 2 } },
    { slug: 'veterans-day', rule: { kind: 'fixed', month: 11, day: 11 } },
    /* 11월 넷째 목요일 */
    { slug: 'thanksgiving', rule: { kind: 'nth', month: 11, weekday: 4, n: 4 } },
    { slug: 'christmas-day', rule: { kind: 'fixed', month: 12, day: 25 } },
  ],
};

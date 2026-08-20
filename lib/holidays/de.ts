import type { CountryDef } from './engine.ts';

/**
 * 독일 — 전국 공휴일(bundesweite Feiertage) 아홉.
 *
 * 독일은 공휴일을 주(Land)가 정한다. 연방법이 직접 정한 것은 통일의 날 하나뿐이고
 * 나머지 여덟은 열여섯 주가 모두 똑같이 정해 둔 결과로 «전국»이 된다. 여기 넣은
 * 아홉은 그 교집합이다.
 *
 * ── 일부러 뺀 것: 주별 공휴일 ──────────────────────────────
 * 아래는 일부 주에만 있어 뺐다. 주 단위 표를 낼 때 쓴다.
 *   Heilige Drei Könige   1월 6일        BW·BY·ST
 *   Internationaler Frauentag 3월 8일    BE·MV
 *   Fronleichnam          부활절 +60     BW·BY·HE·NW·RP·SL (+ SN·TH 일부)
 *   Mariä Himmelfahrt     8월 15일       SL (+ BY 일부)
 *   Weltkindertag         9월 20일       TH
 *   Reformationstag       10월 31일      BB·HB·HH·MV·NI·SN·ST·SH·TH
 *   Allerheiligen         11월 1일       BW·BY·NW·RP·SL
 *   Buß- und Bettag       11월 수요일    SN
 *   Ostersonntag/Pfingstsonntag          BB (다른 주에선 그냥 일요일)
 *
 * ── 주말과 겹치면 ──────────────────────────────────────────
 * 그냥 사라진다. 독일에는 대체공휴일이 없다.
 */
export const DE: CountryDef = {
  code: 'de',
  observance: 'none',
  holidays: [
    { slug: 'neujahr', rule: { kind: 'fixed', month: 1, day: 1 } },
    { slug: 'karfreitag', rule: { kind: 'easter', offset: -2 } },
    { slug: 'ostermontag', rule: { kind: 'easter', offset: 1 } },
    { slug: 'tag-der-arbeit', rule: { kind: 'fixed', month: 5, day: 1 } },
    { slug: 'christi-himmelfahrt', rule: { kind: 'easter', offset: 39 } },
    { slug: 'pfingstmontag', rule: { kind: 'easter', offset: 50 } },
    /* 통일의 날 — 1990년 통일 조약으로 생겼다 */
    { slug: 'tag-der-deutschen-einheit', rule: { kind: 'fixed', month: 10, day: 3 }, from: 1990 },
    { slug: 'erster-weihnachtstag', rule: { kind: 'fixed', month: 12, day: 25 } },
    { slug: 'zweiter-weihnachtstag', rule: { kind: 'fixed', month: 12, day: 26 } },
  ],
};

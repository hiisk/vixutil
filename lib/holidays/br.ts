import type { CountryDef } from './engine.ts';

/**
 * 브라질 — 연방 공휴일(feriados nacionais) 열.
 *
 * 근거는 Lei 662/1949, Lei 1.266/1950(Tiradentes), Lei 6.802/1980(Aparecida),
 * Lei 10.607/2002(정리), Lei 14.759/2023(흑인 의식의 날)이다.
 *
 * ── 카니발과 성체축일을 뺀 이유 ────────────────────────────
 * Carnaval(부활절 -48·-47)과 Quarta-feira de Cinzas(-46), Corpus Christi(+60)는
 * 연방 차원에서 «ponto facultativo»다 — 공공기관 근무를 면제해 주는 재량일이지
 * 법정 공휴일이 아니다. 민간은 쉴 의무가 없고, 주·시가 따로 법으로 정한 곳에서만
 * 공휴일이 된다(리우데자네이루 등). HolidayDef에는 «법정/재량»을 가를 필드가
 * 없어서 섞으면 열 개짜리 목록이 조용히 열넷이 된다. 그래서 뺐다.
 * 재량일까지 보여주려면 화면 쪽에서 따로 목록을 갖는 편이 낫다.
 *
 * ── 성금요일 ───────────────────────────────────────────────
 * Sexta-feira da Paixão은 Lei 9.093/1995가 «종교 공휴일»로 다루어 형식상 시(市)
 * 법에 근거하지만, 전국이 예외 없이 쉬고 연방 공식 달력에도 feriado로 실린다.
 * 그래서 넣었다.
 *
 * ── 주말과 겹치면 ──────────────────────────────────────────
 * 그냥 사라진다. 브라질에는 대체공휴일이 없다.
 */
export const br: CountryDef = {
  code: 'br',
  observance: 'none',
  holidays: [
    { slug: 'confraternizacao-universal', rule: { kind: 'fixed', month: 1, day: 1 } },
    { slug: 'sexta-feira-santa', rule: { kind: 'easter', offset: -2 } },
    { slug: 'tiradentes', rule: { kind: 'fixed', month: 4, day: 21 } },
    { slug: 'dia-do-trabalho', rule: { kind: 'fixed', month: 5, day: 1 } },
    { slug: 'independencia', rule: { kind: 'fixed', month: 9, day: 7 } },
    /* Lei 6.802/1980 — 성모 아파레시다 */
    { slug: 'nossa-senhora-aparecida', rule: { kind: 'fixed', month: 10, day: 12 }, from: 1980 },
    { slug: 'finados', rule: { kind: 'fixed', month: 11, day: 2 } },
    { slug: 'proclamacao-da-republica', rule: { kind: 'fixed', month: 11, day: 15 } },
    /* Lei 14.759/2023 — 2024년부터 연방 공휴일. 그전에는 일부 주·시만 쉬었다 */
    { slug: 'consciencia-negra', rule: { kind: 'fixed', month: 11, day: 20 }, from: 2024 },
    { slug: 'natal', rule: { kind: 'fixed', month: 12, day: 25 } },
  ],
};

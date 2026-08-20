import type { CountryDef } from './engine.ts';

/**
 * 스페인 — 전국 공휴일(fiestas nacionales) 열.
 *
 * 노동자법(Estatuto de los Trabajadores) 37.2조는 한 해 유급 공휴일을 열넷으로
 * 정하고, 그중 둘은 지역(local)에 맡긴다. 나머지 열둘 가운데 열일곱 자치주가
 * 모두 똑같이 쉬는 것이 아래 열이다.
 *
 * ── 일부러 뺀 것: 자치주가 바꿀 수 있는 날 ─────────────────
 *   Jueves Santo   부활절 -3  — 카탈루냐·발렌시아는 이날 대신 부활절 월요일을 쉰다
 *   Lunes de Pascua 부활절 +1 — 카탈루냐·발렌시아·발레아레스·나바라·라리오하·바스크
 *   San José 3월 19일, Santiago 7월 25일 — 주마다 갈린다
 * 자치주별 표를 낼 때 쓴다.
 *
 * ── 주말과 겹치면: 확인 필요 ───────────────────────────────
 * 37.2조에는 «일요일과 겹치면 그다음 월요일로 옮긴다»는 문장이 있다. 그런데
 * 실제로는 자치주마다 그 해에 옮길지 말지를 따로 정해서, 2023년 1월 1일(일)이나
 * 2025년 10월 12일(일)처럼 어떤 주는 월요일을 쉬고 어떤 주는 안 쉬었다. 전국
 * 하나로 못 박을 수 없어 여기서는 «사라진다(none)»로 두고 원래 날짜만 낸다.
 * 자치주별 표를 낼 때 sundayNext를 주 단위로 다시 봐야 한다.
 */
export const es: CountryDef = {
  code: 'es',
  observance: 'none',
  holidays: [
    { slug: 'ano-nuevo', rule: { kind: 'fixed', month: 1, day: 1 } },
    { slug: 'epifania-del-senor', rule: { kind: 'fixed', month: 1, day: 6 } },
    { slug: 'viernes-santo', rule: { kind: 'easter', offset: -2 } },
    { slug: 'fiesta-del-trabajo', rule: { kind: 'fixed', month: 5, day: 1 } },
    { slug: 'asuncion-de-la-virgen', rule: { kind: 'fixed', month: 8, day: 15 } },
    { slug: 'fiesta-nacional', rule: { kind: 'fixed', month: 10, day: 12 } },
    { slug: 'todos-los-santos', rule: { kind: 'fixed', month: 11, day: 1 } },
    { slug: 'dia-de-la-constitucion', rule: { kind: 'fixed', month: 12, day: 6 } },
    { slug: 'inmaculada-concepcion', rule: { kind: 'fixed', month: 12, day: 8 } },
    { slug: 'navidad', rule: { kind: 'fixed', month: 12, day: 25 } },
  ],
};

import type { CountryDef } from './engine.ts';

/**
 * 프랑스 — 본토(métropole) 법정 공휴일 열하나.
 *
 * 노동법전 L3133-1조가 열한 개를 적어 두었다. 그중 법으로 «반드시 쉬는 날»은
 * 5월 1일 하나뿐이고 나머지는 단체협약이 정하지만, 달력에 실리는 jours fériés는
 * 이 열하나다.
 *
 * ── 부활절 계열이 나라마다 다르다 ──────────────────────────
 * 프랑스는 승천일(+39)과 성령강림 월요일(+50)이 공휴일이지만 **성금요일(-2)은
 * 아니다**. 독일·스페인과 갈리는 지점이다.
 * 부활절 월요일(+1)은 공휴일이고, 성체축일(+60)은 아니다.
 *
 * ── 일부러 뺀 것: 알자스-모젤 ──────────────────────────────
 * Bas-Rhin·Haut-Rhin·Moselle 세 도(道)는 1918년 이전 지방법이 남아 공휴일이
 * 둘 더 있다 — 성금요일(부활절 -2)과 12월 26일(Saint-Étienne). 본토 기준이라 뺐다.
 * 해외영토(Guadeloupe·Martinique·Guyane·La Réunion·Mayotte)의 노예제 폐지
 * 기념일도 날짜가 영토마다 달라 뺐다.
 *
 * ── 성령강림 월요일에 관한 주의 ────────────────────────────
 * 2004년부터 «연대의 날(journée de solidarité)»이 걸려 있어 근무하는 곳이 있다.
 * 그래도 법전상 jour férié 자격은 그대로라 목록에 남긴다.
 *
 * ── 주말과 겹치면 ──────────────────────────────────────────
 * 그냥 사라진다. 프랑스에는 대체공휴일(jour de remplacement)이 없다.
 */
export const FR: CountryDef = {
  code: 'fr',
  observance: 'none',
  holidays: [
    { slug: 'jour-de-l-an', rule: { kind: 'fixed', month: 1, day: 1 } },
    { slug: 'lundi-de-paques', rule: { kind: 'easter', offset: 1 } },
    { slug: 'fete-du-travail', rule: { kind: 'fixed', month: 5, day: 1 } },
    /* 1945년 종전 기념일 — 1959~1981년에는 공휴일이 아니었다가 1981년 법으로
       되살아났다. 되살아난 첫 해가 정확히 언제인지는 확인 필요라 from을 안 걸었다. */
    { slug: 'victoire-1945', rule: { kind: 'fixed', month: 5, day: 8 } },
    { slug: 'ascension', rule: { kind: 'easter', offset: 39 } },
    { slug: 'lundi-de-pentecote', rule: { kind: 'easter', offset: 50 } },
    { slug: 'fete-nationale', rule: { kind: 'fixed', month: 7, day: 14 } },
    { slug: 'assomption', rule: { kind: 'fixed', month: 8, day: 15 } },
    { slug: 'toussaint', rule: { kind: 'fixed', month: 11, day: 1 } },
    { slug: 'armistice-1918', rule: { kind: 'fixed', month: 11, day: 11 } },
    { slug: 'noel', rule: { kind: 'fixed', month: 12, day: 25 } },
  ],
};

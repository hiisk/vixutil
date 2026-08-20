import { type L, type Lang } from '@/lib/i18n/lang';

/**
 * 공휴일 화면이 쓰는 «홈».
 *
 * HolidayUI에 안 넣은 이유는 하나다 — 이 낱말은 갈래와 아무 상관이 없고,
 * 갈래마다 다시 번역할 것도 아니다. 저장소의 다른 섹션들도 각자 갖고 있어
 * 같은 자리에 같은 값이 열 벌 있는데, 그 열 벌을 여기서 늘리지 않으려고
 * 한 줄로 둔다.
 */
const T = <V,>(ko: V, en: V, es: V, pt: V, ja: V, de: V, fr: V, hi: V, zh: V, tw: V): L<V> =>
  ({ ko, en, es, pt, ja, de, fr, hi, zh, tw });

export const HOME_WORD: L<string> =
  T('홈', 'Home', 'Inicio', 'Início', 'ホーム', 'Start', 'Accueil', 'होम', '首页', '首頁');

export type { Lang };

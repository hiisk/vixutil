/**
 * 모터 136칸 — 출력 17가지 × 회전수 8가지.
 *
 * 출력·토크·회전수는 셋 중 둘을 알면 나머지가 정해진다. 표가 아니라 한 줄 식이다.
 *
 *   출력 P(W) = 토크 T(N·m) × 각속도 ω(rad/s),   ω = 2π × n(rpm) ÷ 60
 *
 * 그래서 이 파일에는 축 두 개만 적는다. 토크·마력·전류·감속기는 전부 facts.ts가
 * 저 식에서 만든다 — 널리 쓰이는 T = 9550 × P(kW) ÷ n의 9550도 적어 두지 않고
 * 60000 ÷ 2π로 만든다(tests/motor-power.test.ts가 그것을 2π로 되짚는다).
 *
 * ── 회전수를 왜 안 적는가 ────────────────────────────────
 * 유도전동기의 동기속도는 고를 수 있는 값이 아니라 극수와 주파수가 정하는 값이다.
 *
 *   동기속도(rpm) = 120 × 주파수(Hz) ÷ 극수
 *
 * 그래서 주파수 둘과 극수 넷만 적고 회전수 여덟은 곱셈으로 낸다. 3600rpm을 손으로
 * 적으면 언젠가 3000rpm 자리에 60Hz가 붙지만, 이렇게 두면 그런 짝이 아예 생기지
 * 않는다. 60Hz에서 3600·1800·1200·900, 50Hz에서 3000·1500·1000·750이 나온다.
 *
 * ── 50Hz와 60Hz가 다른 나라를 만든다 ────────────────────
 * 같은 4극 모터가 한국·미국·일본 동부(60Hz)에서는 1800rpm, 유럽·중국·인도(50Hz)에서는
 * 1500rpm으로 돈다. 출력이 같아도 회전수가 1.2배 다르니 토크도 1.2배 다르다 —
 * 이 섹션이 열 언어로 쓸 만한 까닭이 여기 있다. 나라를 바꾸면 답이 바뀐다.
 *
 * ── 어느 조합을 내는가 ──────────────────────────────────
 * 축 둘을 전부 곱한다(17 × 8 = 136칸). 빼 둘 조합을 두지 않는 까닭은 두 가지다.
 *  · IEC 규격 출력은 극수와 따로 정해져 있어, 같은 출력이 2·4·6·8극으로 다 나온다.
 *  · 식은 조합을 가리지 않는다. 0.1kW 8극처럼 카탈로그에 드문 자리도 셈은 똑같고,
 *    "드물다"는 것을 우리가 판단해 빼면 그 판단이 근거 없이 표에 남는다.
 */

/**
 * 정격 출력(kW) — 실제로 파는 규격이다.
 *
 * IEC 60072 계열에서 널리 유통되는 값을 담았다. 0.75kW 아래는 0.1·0.2·0.4로
 * 띄엄띄엄 가고, 그 위는 1.5·2.2·3.7·5.5·7.5처럼 대략 √2 배씩 오른다 —
 * 한 단 위가 힘이 1.4배쯤 되는 자리에 규격을 놓은 것이다. 3.7kW는 5마력 자리이고
 * (유럽 카탈로그는 같은 자리를 4kW로 적는다) 7.5kW는 10마력 자리다.
 */
export const POWERS: number[] = [
  0.1, 0.2, 0.4, 0.75, 1.5, 2.2, 3.7, 5.5, 7.5, 11, 15, 22, 30, 37, 45, 55, 75,
];

/** 상용 주파수 — 나라가 이 둘로 갈린다 */
export const FREQS: number[] = [60, 50];

/** 극수 — 고정자에 감는 방식이 정한다. 홀수 극은 없다 */
export const POLES: number[] = [2, 4, 6, 8];

export interface Speed {
  /** 주파수(Hz) */
  hz: number;
  /** 극수 */
  poles: number;
  /** 동기속도(rpm) — 120 × hz ÷ poles. 여덟 칸 모두 정수로 떨어진다 */
  rpm: number;
}

/** 회전수 여덟 — 적은 것이 아니라 주파수 둘 × 극수 넷에서 나온 값이다 */
export const SPEEDS: Speed[] = FREQS.flatMap(hz =>
  POLES.map(poles => ({ hz, poles, rpm: (120 * hz) / poles })),
);

export interface Cell {
  /** 정격 출력(kW) */
  kw: number;
  /** 동기속도(rpm) */
  rpm: number;
}

export const CELLS: Cell[] = POWERS.flatMap(kw => SPEEDS.map(s => ({ kw, rpm: s.rpm })));

/** 2.2kW 1800rpm → 2-2kw-1800rpm. 소수점은 하이픈으로 눕힌다 */
export const slugOf = (c: Cell): string => `${String(c.kw).replace('.', '-')}kw-${c.rpm}rpm`;

export const MOTOR_SLUGS = CELLS.map(slugOf);

const BY_SLUG = new Map(CELLS.map(c => [slugOf(c), c]));

export const cellOf = (slug: string): Cell | undefined => BY_SLUG.get(slug);

/** 회전수로 주파수·극수를 되찾는다 — 여덟 값이 서로 겹치지 않으므로 하나로 정해진다 */
export const speedOf = (rpm: number): Speed | undefined => SPEEDS.find(s => s.rpm === rpm);

/**
 * 목록과 공유 카드가 같은 그림을 쓴다 — ICON_FOR에 짝이 있어야 한다.
 *
 * 🔃는 og-icons의 'rotate'로 이어지고, 회전수를 다루는 이 섹션에 그대로 맞다.
 * 모터에 더 어울려 보이는 ⚙️(gear)를 안 쓴 까닭은 홈 격자에서 /generator가 이미
 * 그 그림을 쓰고 있어서다 — 같은 격자에 톱니바퀴 카드가 둘이 되면 어느 쪽이
 * 무엇인지 눈으로 가릴 수 없다. 섹션 아이콘으로 🔃를 쓰는 곳은 아직 없다
 * (/image/rotate가 낱장으로 쓰는데, 그쪽은 홈 격자에 안 나온다).
 */
export const MOTOR_ICON = '🔃';

/**
 * 출력 하나와 회전수 하나가 만드는 토크 — 그리고 거기서 갈라져 나오는 것들.
 *
 * ── 단 하나의 식 ─────────────────────────────────────────
 *   P(W) = T(N·m) × ω(rad/s),      ω = 2π × n(rpm) ÷ 60
 *   ⇒ T = P(W) × 60 ÷ (2π × n)
 *
 * 현장에서 쓰는 **T = 9550 × P(kW) ÷ n(rpm)의 9550은 저 식을 정리한 값이다** —
 * 60,000 ÷ 2π = 9549.297…이고 그것을 올려 적은 것이 9550이다. 그래서 이 파일은
 * 계수를 옮겨 적지 않고 ω로 나눈다. 계수를 손으로 적으면 자릿수가 하나 틀려도
 * 136칸이 한꺼번에 조용히 어긋나기 때문이다.
 *
 * ── 마력은 두 가지고 값이 다르다 ─────────────────────────
 * 미터법 마력(PS, 독일·일본·한국 카탈로그)은 735.49875W, 영국 마력(HP, 미국)은
 * 745.699872W다. 1.4% 차이라 작아 보이지만 둘을 같은 값으로 두면 100마력 자리에서
 * 1.4마력이 사라진다. 두 값을 따로 두는 것이 이 섹션이 하는 말 하나다.
 *
 * ── 밖에서 넣어야 하는 값 ────────────────────────────────
 * 전류는 식만으로 안 나온다 — 전압·역률·효율이 필요하고 셋 다 모터마다 다르다.
 * currentOf()는 그 셋을 인수로 받고, 화면에 쓰는 값은 아래 CLASSES의 **대표값**이다.
 * 명판에 적힌 값이 늘 우선이라는 것을 화면 문구가 밝힌다.
 */
import { relatedBySlug } from '../related-window.ts';
import { CELLS, POWERS, SPEEDS, type Cell, type Speed, slugOf, speedOf } from './list.ts';

const round = (x: number, digits = 2): number => {
  const k = 10 ** digits;
  return Math.round(x * k) / k;
};

/**
 * 유효숫자 자리로 자른다 — 카탈로그가 토크를 적는 방식이다.
 *
 * 이 표의 토크는 0.265N·m부터 955N·m까지 3,600배 벌어진다. 소수 두 자리로 자르면
 * 955.00처럼 없는 정밀도를 쓰고, 한 자리로 자르면 0.3이 되어 작은 쪽이 뭉개진다.
 * 유효숫자 셋으로 자르면 0.265·11.7·955로 어느 자리에서나 세 자리를 지킨다.
 */
const sig = (x: number, digits = 3): number => Number(x.toPrecision(digits));

/**
 * 널리 쓰는 9550 — 외워 적지 않고 60,000과 2π로 만든다.
 * tests/motor-power.test.ts가 이 값이 9550 언저리인지, 그리고 ω로 직접 나눈 값과
 * 같은지를 함께 본다.
 */
export const TORQUE_COEF = 60000 / (2 * Math.PI);

/** 미터법 마력(PS) 한 마력의 와트 — 75kgf·m/s를 정의로 삼은 값이다 */
export const PS_WATT = 735.49875;

/** 영국 마력(HP) 한 마력의 와트 — 550ft·lbf/s를 정의로 삼은 값이다 */
export const HP_WATT = 745.699872;

/** 표준중력(m/s²) — N·m를 kgf·m로 옮길 때 쓴다 */
export const GRAVITY = 9.80665;

/** 1lb·ft가 몇 N·m인가 */
export const LBFT_NM = 1.3558179483314004;

/**
 * 대표 슬립 — 유도전동기는 동기속도보다 조금 느리게 돈다.
 *
 * 회전자가 자계보다 느려야 전류가 유도되므로, 부하가 걸리면 반드시 뒤처진다.
 * 3%면 4극 60Hz 모터의 명판이 1800이 아니라 1746rpm으로 적히는 그 차이다.
 * 실제 슬립은 작은 모터가 크고(5% 남짓) 큰 모터가 작다(1~2%) — 대표값이다.
 */
export const SLIP = 0.03;

/** 감속기 감속비 — 한 단·두 단 헬리컬로 만드는 흔한 자리 */
export const RATIOS: number[] = [3, 5, 10, 20];

/**
 * 감속기 효율 — 헬리컬 기준 대표값이다.
 * 웜 감속기는 0.5~0.8까지 떨어지므로 이 값을 그대로 쓰면 안 된다(화면이 밝힌다).
 */
export const GEAR_EFF = 0.95;

/**
 * 3상 전압 — 주파수가 나라를 가르므로 전압도 함께 갈린다.
 *
 * 60Hz 쪽은 일본 200V·한국 380V·북미 460V가 흔하고, 50Hz 쪽은 IEC 400V가
 * 기준이며 230V 삼상도 남아 있다. 한 칸에서 이 값들을 나란히 보여 주는 것이
 * "전압이 다르면 전류가 다르다"를 말하는 가장 짧은 방법이다.
 */
export const VOLTS: Record<number, number[]> = {
  60: [220, 380, 460],
  50: [230, 400],
};

/**
 * 대표 역률·효율 — 크기에 따라 오른다.
 *
 * 작은 모터는 자화전류가 상대적으로 커서 역률이 낮고 손실 비율도 크다. 한 쌍으로
 * 뭉뚱그리면 0.1kW의 전류를 4할 적게 셈하므로 세 대역으로 나눴다. 어느 쪽이든
 * **명판 값이 우선**이며, 이 값은 명판이 없을 때의 어림이다.
 */
const CLASSES: { upto: number; pf: number; eff: number }[] = [
  { upto: 0.75, pf: 0.72, eff: 0.75 },
  { upto: 5.5, pf: 0.82, eff: 0.85 },
  { upto: Infinity, pf: 0.87, eff: 0.92 },
];

export const classOf = (kw: number): { pf: number; eff: number } => {
  const c = CLASSES.find(x => kw <= x.upto) ?? CLASSES[CLASSES.length - 1];
  return { pf: c.pf, eff: c.eff };
};

/** 각속도(rad/s) — 회전수를 초당 라디안으로 옮긴 값이다 */
export const omegaOf = (rpm: number): number => (2 * Math.PI * rpm) / 60;

/**
 * 토크(N·m) = 출력(W) ÷ 각속도(rad/s).
 *
 * 회전수 0에서는 나누지 않고 던진다. 0으로 나누면 Infinity가 조용히 화면까지
 * 흘러가고, "정지한 모터의 토크"는 이 식이 답할 수 있는 물음이 아니다 —
 * 기동토크는 정격토크의 몇 배라는 별개의 값이다.
 */
export const torqueOf = (kw: number, rpm: number): number => {
  if (!(rpm > 0)) throw new Error(`회전수가 0 이하다: ${rpm}rpm — 토크가 정해지지 않는다`);
  return (kw * 1000) / omegaOf(rpm);
};

/** 되짚기 — 토크와 회전수로 출력(kW)을 만든다. torqueOf의 역이다 */
export const powerOf = (nm: number, rpm: number): number => (nm * omegaOf(rpm)) / 1000;

/** 3상 전류(A) = 출력(W) ÷ (√3 × 전압 × 역률 × 효율) */
export const currentOf = (kw: number, volt: number, pf: number, eff: number): number =>
  (kw * 1000) / (Math.sqrt(3) * volt * pf * eff);

export interface Neighbour {
  slug: string;
  kw: number;
  rpm: number;
}

export interface Gear {
  /** 감속비 i */
  ratio: number;
  /** 출력축 회전수(rpm) — 들어온 회전수의 1/i */
  rpm: number;
  /** 출력축 토크(N·m) — 들어온 토크의 i배에 효율을 곱한 값 */
  torque: number;
}

export interface Current {
  volt: number;
  amp: number;
}

export interface MotorFacts {
  cell: Cell;
  slug: string;
  speed: Speed;
  /** 정격 출력(W) */
  watts: number;
  /** 각속도(rad/s) */
  omega: number;
  /** 동기속도에서의 토크(N·m) */
  torque: number;
  /** 같은 토크를 kgf·m와 lb·ft로 — 카탈로그가 나라마다 다른 단위로 적는다 */
  kgfm: number;
  lbft: number;
  /** 미터법 마력과 영국 마력 — 값이 다르다 */
  ps: number;
  hp: number;
  /** 슬립을 본 전부하 회전수(rpm)와 그때의 토크(N·m) */
  fullRpm: number;
  fullTorque: number;
  /** 감속기를 걸었을 때 */
  gears: Gear[];
  /** 전류 셈에 쓴 대표 역률·효율 */
  pf: number;
  eff: number;
  /** 전압별 3상 전류(A) */
  currents: Current[];
  /**
   * 같은 출력·같은 극수의 다른 주파수 짝 — 60Hz 1800rpm ↔ 50Hz 1500rpm.
   * 나라를 바꾸면 토크가 6/5배 달라진다는 것을 한 줄로 보여 주는 자리다.
   */
  pair: { slug: string; hz: number; rpm: number; torque: number };
  /** 이웃 칸 — 자기 자리 다음부터 원형으로 감아 고른다 */
  neighbours: Neighbour[];
}

/** slug를 든 목록 — relatedBySlug가 이 순서를 원형으로 본다 */
const INDEX: Neighbour[] = CELLS.map(c => ({ slug: slugOf(c), kw: c.kw, rpm: c.rpm }));

/**
 * 한 칸에서 뻗는 이웃 수.
 *
 * 갈래(같은 출력·같은 회전수)를 따로 모으지 않는다. 같은 출력 줄과 같은 회전수 줄은
 * 아래 atPower·atSpeed가 화면에 통째로 깔기 때문에, 여기서 또 갈래를 가르면 링크가
 * 겹치기만 하고 들어오는 링크 수는 고르지 않게 된다. 갈래를 안 가르면 136칸이
 * 정확히 여섯 번씩 가리켜진다 — lib/related-window.ts가 그것을 보장한다.
 */
const NEAR = 6;

export function motorFacts(c: Cell): MotorFacts {
  if (!POWERS.includes(c.kw)) throw new Error(`모르는 출력: ${c.kw}kW`);
  const speed = speedOf(c.rpm);
  if (!speed) throw new Error(`모르는 회전수: ${c.rpm}rpm`);

  /*
   * 0.1 × 1000이 100.00000000000001이 되는 자리다(2진 소수). 이 값은 화면 문장에
   * 그대로 들어가므로 반드시 정수로 접는다 — 접지 않으면 열 언어 문장에 꼬리가
   * 붙고, 쉼표를 쓰는 네 언어에서는 소수점 검사까지 함께 깨진다.
   */
  const watts = Math.round(c.kw * 1000);
  const omega = omegaOf(c.rpm);
  const torque = torqueOf(c.kw, c.rpm);
  const { pf, eff } = classOf(c.kw);

  /* 짝은 같은 극수의 다른 주파수 — 축이 주파수 둘뿐이라 늘 하나로 정해진다 */
  const other = SPEEDS.find(s => s.poles === speed.poles && s.hz !== speed.hz)!;

  /*
   * 전부하 회전수는 정수로 자른다. 명판이 1746rpm처럼 정수로 적히기 때문이고,
   * 그 정수로 토크를 다시 셈하는 것이 명판 두 값을 견주는 방식과 같다.
   */
  const fullRpm = Math.round(c.rpm * (1 - SLIP));

  return {
    cell: c,
    slug: slugOf(c),
    speed,
    watts,
    omega: round(omega, 2),
    torque: sig(torque),
    kgfm: sig(torque / GRAVITY),
    lbft: sig(torque / LBFT_NM),
    ps: sig(watts / PS_WATT),
    hp: sig(watts / HP_WATT),
    fullRpm,
    fullTorque: sig(torqueOf(c.kw, fullRpm)),
    gears: RATIOS.map(ratio => ({
      ratio,
      /* 회전수는 정확히 1/i다 — 나누어 떨어지지 않는 자리가 있어 소수 한 자리를 남긴다 */
      rpm: round(c.rpm / ratio, 1),
      torque: sig(torque * ratio * GEAR_EFF),
    })),
    pf,
    eff,
    /*
     * 전류도 유효숫자 셋으로 자른다. 0.232A부터 235A까지 천 배 벌어지므로 소수 두
     * 자리로 자르면 작은 쪽에서 0.23이 되어 되짚기가 1% 어긋난다 — 표의 다른 값과
     * 같은 규칙으로 자르면 어느 자리에서나 세 자리가 남는다.
     */
    currents: VOLTS[speed.hz].map(volt => ({ volt, amp: sig(currentOf(c.kw, volt, pf, eff)) })),
    pair: {
      slug: slugOf({ kw: c.kw, rpm: other.rpm }),
      hz: other.hz,
      rpm: other.rpm,
      torque: sig(torqueOf(c.kw, other.rpm)),
    },
    neighbours: relatedBySlug(INDEX, slugOf(c), NEAR),
  };
}

/** 같은 출력의 한 줄 — 회전수만 다르다 */
export const atPower = (kw: number): Cell[] => SPEEDS.map(s => ({ kw, rpm: s.rpm }));

/** 같은 회전수의 한 줄 — 출력만 다르다 */
export const atSpeed = (rpm: number): Cell[] => POWERS.map(kw => ({ kw, rpm }));

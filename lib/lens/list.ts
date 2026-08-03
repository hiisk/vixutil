/**
 * 렌즈 화각 144가지 — 초점거리와 센서 규격만 적는다.
 *
 * 화각도, 35mm 환산 초점거리도, 두 발짝 앞에서 담기는 폭도 전부 두 숫자에서
 * 나온다. 표를 손으로 적으면 144 × 다섯 칸이고, 한 칸이 틀려도 그럴듯한
 * 숫자라 아무도 못 잡는다.
 *
 * 초점거리(50mm)와 센서 이름(APS-C)은 만국 공통이라 옮길 것이 없다.
 */
export type SensorKey = 'ff' | 'apsc' | 'mft' | 'one-inch';

export interface Sensor {
  key: SensorKey;
  /** 브랜드가 부르는 이름 — 옮기지 않는다 */
  name: string;
  /** 가로·세로(밀리미터) */
  w: number;
  h: number;
}

/**
 * 센서 네 가지.
 *
 * 크롭 배수는 적지 않는다 — 대각선을 재면 나오는 값이라, 적어 두면 두 값이
 * 어긋날 자리만 생긴다.
 */
export const SENSORS: Sensor[] = [
  { key: 'ff', name: 'Full frame', w: 36, h: 24 },
  { key: 'apsc', name: 'APS-C', w: 23.5, h: 15.6 },
  { key: 'mft', name: 'Micro Four Thirds', w: 17.3, h: 13 },
  { key: 'one-inch', name: '1-inch', w: 13.2, h: 8.8 },
];

export const sensorOf = (key: SensorKey): Sensor => SENSORS.find(s => s.key === key)!;

/**
 * 실제로 파는 초점거리들 — 서른여섯 가지.
 *
 * 25mm를 빼면 마이크로포서드의 표준 렌즈가 사라진다. 판마다 즐겨 쓰는 값이
 * 다르므로 어느 판에서든 표준이 되는 초점거리는 모두 넣는다.
 *
 * 30mm는 일부러 뺐다. APS-C에서 환산 46mm가 되어 50mm 풀프레임과의 거리가
 * 35mm(환산 54mm)와 똑같이 4가 되고, "같은 화각 짝"이 둘 사이에서 흔들린다.
 */
export const FOCALS = [
  7, 8, 10, 11, 12, 14, 15, 16, 17, 18, 20, 21, 24, 25, 28, 35, 40, 45, 50,
  55, 60, 70, 75, 85, 90, 100, 105, 135, 150, 180, 200, 300, 400, 500, 600, 800,
];

export interface Lens {
  slug: string;
  focal: number;
  sensor: SensorKey;
}

/** 초점거리 36 × 센서 4 = 144장 */
export const LENSES: Lens[] = SENSORS.flatMap(s =>
  FOCALS.map(f => ({ slug: `${f}mm-${s.key}`, focal: f, sensor: s.key })),
);

export const LENS_SLUGS = LENSES.map(l => l.slug);

export const lensOf = (slug: string): Lens | undefined => LENSES.find(l => l.slug === slug);

export const lensesOfSensor = (key: SensorKey): Lens[] => LENSES.filter(l => l.sensor === key);

/** 목록과 공유 카드가 같은 그림을 쓴다 — 이 이모지가 사진기 아이콘으로 그려진다 */
export const LENS_ICON = '📷';

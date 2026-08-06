/**
 * 주파수 165가지 — 헤르츠 숫자 하나만 적는다.
 *
 * 파장·주기·가장 가까운 음·센트 차이·배음·가청 여부는 전부 그 숫자에서 계산된다.
 * 표를 손으로 적으면 165 × 여섯 칸이고, 소리는 눈으로 검산할 수 없어서 한 칸이
 * 틀려도 아무도 못 잡는다.
 *
 * 다만 "이 주파수를 왜 찾는가"는 계산으로 안 나온다. 440Hz는 조율 기준이고
 * 60Hz는 전기 잡음이며 17kHz는 나이 들면 안 들리는 소리다. 그 쓰임만 갈래로
 * 적어 두고, 문장은 언어마다 갈래에서 만든다.
 */
export type FreqTag =
  | 'band'        // 1/3 옥타브 표준 대역 중심
  | 'audiometry'  // 청력 검사에서 쓰는 주파수
  | 'pitch'       // 음악 기준음
  | 'note'        // 널리 아는 음이름
  | 'mains'       // 전원 잡음
  | 'dtmf'        // 전화 버튼음
  | 'mosquito'    // 나이 들면 안 들리는 고음
  | 'solfeggio'   // 근거 없이 널리 퍼진 "치유 주파수"
  | 'subsonic'    // 귀로는 못 듣고 몸으로 느끼는 저음
  | 'ultrasonic'  // 가청 범위 위
  | 'round';      // 그냥 자주 찾는 반올림 숫자

export interface Freq {
  /** 헤르츠 — 이 숫자 하나가 데이터의 전부다 */
  hz: number;
  tags: FreqTag[];
}

const f = (hz: number, ...tags: FreqTag[]): Freq => ({ hz, tags });

export const FREQS: Freq[] = [
  /* 값 순서로 둔다 — 앞뒤 주파수를 짚는 검사가 이 순서를 본다 */
  f(1, 'subsonic'),
  f(2, 'subsonic'),
  f(3, 'subsonic'),
  f(5, 'subsonic'),
  f(6, 'subsonic'),
  f(7.83, 'subsonic'),
  f(8, 'subsonic'),
  f(10, 'subsonic'),
  f(12.5, 'band', 'subsonic'),
  f(14, 'subsonic'),
  f(15, 'subsonic'),
  f(16, 'band', 'subsonic'),
  f(18, 'subsonic'),
  f(20, 'band', 'round'),
  f(25, 'band'),
  f(27.5, 'pitch', 'note'),
  f(30, 'round'),
  f(31.5, 'band'),
  f(32.7, 'note'),
  f(35, 'round'),
  f(40, 'band', 'round'),
  f(41.2, 'note'),
  f(45, 'round'),
  f(49, 'note'),
  f(50, 'band', 'mains'),
  f(55, 'pitch', 'note'),
  f(60, 'mains', 'round'),
  f(61.74, 'note'),
  f(63, 'band'),
  f(65.41, 'note'),
  f(70, 'round'),
  f(73.42, 'note'),
  f(80, 'band', 'round'),
  f(82.41, 'note'),
  f(87.31, 'note'),
  f(90, 'round'),
  f(92.5, 'note'),
  f(98, 'note'),
  f(100, 'round'),
  f(103.83, 'note'),
  f(110, 'pitch', 'note'),
  f(116.54, 'note'),
  f(120, 'mains', 'round'),
  f(123.47, 'note'),
  f(125, 'band', 'audiometry'),
  f(128, 'pitch'),
  f(130.81, 'note'),
  f(138.59, 'note'),
  f(146.83, 'note'),
  f(150, 'round'),
  f(155.56, 'note'),
  f(160, 'band'),
  f(164.81, 'note'),
  f(174, 'solfeggio'),
  f(174.61, 'note'),
  f(180, 'round'),
  f(185, 'note'),
  f(196, 'note'),
  f(200, 'round'),
  f(207.65, 'note'),
  f(220, 'pitch', 'note'),
  f(233.08, 'note'),
  f(240, 'mains'),
  f(246.94, 'note'),
  f(250, 'band', 'audiometry'),
  f(256, 'pitch'),
  f(261.63, 'note'),
  f(277.18, 'note'),
  f(285, 'solfeggio'),
  f(293.66, 'note'),
  f(300, 'round'),
  f(311.13, 'note'),
  f(315, 'band'),
  f(329.63, 'note'),
  f(349.23, 'note'),
  f(350, 'round'),
  f(360, 'mains'),
  f(369.99, 'note'),
  f(392, 'note'),
  f(396, 'solfeggio'),
  f(400, 'band', 'round'),
  f(415.3, 'pitch'),
  f(417, 'solfeggio'),
  f(432, 'pitch'),
  f(440, 'pitch', 'note'),
  f(450, 'round'),
  f(466.16, 'note'),
  f(493.88, 'note'),
  f(500, 'band', 'audiometry', 'round'),
  f(512, 'pitch'),
  f(523.25, 'note'),
  f(528, 'solfeggio'),
  f(554.37, 'note'),
  f(587.33, 'note'),
  f(600, 'round'),
  f(622.25, 'note'),
  f(630, 'band'),
  f(639, 'solfeggio'),
  f(659.25, 'note'),
  f(697, 'dtmf'),
  f(698.46, 'note'),
  f(700, 'round'),
  f(739.99, 'note'),
  f(741, 'solfeggio'),
  f(750, 'audiometry'),
  f(770, 'dtmf'),
  f(783.99, 'note'),
  f(800, 'band', 'round'),
  f(852, 'dtmf', 'solfeggio'),
  f(880, 'pitch', 'note'),
  f(900, 'round'),
  f(932.33, 'note'),
  f(941, 'dtmf'),
  f(963, 'solfeggio'),
  f(987.77, 'note'),
  f(997, 'round'),
  f(1000, 'band', 'audiometry', 'round'),
  f(1024, 'pitch'),
  f(1046.5, 'note'),
  f(1108.73, 'note'),
  f(1174.66, 'note'),
  f(1209, 'dtmf'),
  f(1250, 'band'),
  f(1318.51, 'note'),
  f(1336, 'dtmf'),
  f(1477, 'dtmf'),
  f(1500, 'round'),
  f(1567.98, 'note'),
  f(1600, 'band'),
  f(1633, 'dtmf'),
  f(1760, 'pitch', 'note'),
  f(1800, 'round'),
  f(1975.53, 'note'),
  f(2000, 'band', 'audiometry', 'round'),
  f(2093, 'note'),
  f(2500, 'band'),
  f(2637.02, 'note'),
  f(3000, 'audiometry', 'round'),
  f(3150, 'band'),
  f(3500, 'round'),
  f(3520, 'pitch', 'note'),
  f(4000, 'band', 'audiometry', 'round'),
  f(4186, 'note'),
  f(4500, 'round'),
  f(5000, 'band', 'round'),
  f(5500, 'round'),
  f(6000, 'audiometry', 'round'),
  f(6300, 'band'),
  f(7000, 'round'),
  f(7040, 'pitch'),
  f(7500, 'round'),
  f(8000, 'band', 'audiometry', 'round'),
  f(9000, 'round'),
  f(10000, 'band', 'round'),
  f(11000, 'round'),
  f(12000, 'round'),
  f(12500, 'band'),
  f(13000, 'round'),
  f(14000, 'mosquito', 'round'),
  f(14080, 'pitch'),
  f(15000, 'mosquito', 'round'),
  f(16000, 'band', 'mosquito'),
  f(16500, 'mosquito'),
  f(17000, 'mosquito', 'round'),
  f(17400, 'mosquito'),
  f(18000, 'mosquito', 'round'),
  f(18500, 'mosquito'),
  f(19000, 'mosquito', 'round'),
  f(19500, 'mosquito'),
  f(20000, 'band', 'round'),
  f(21000, 'ultrasonic'),
  f(22000, 'ultrasonic'),
  f(22050, 'ultrasonic'),
  f(24000, 'ultrasonic'),
  f(25000, 'ultrasonic'),
  f(28000, 'ultrasonic'),
  f(30000, 'ultrasonic'),
  f(32000, 'ultrasonic'),
  f(40000, 'ultrasonic'),
  f(45000, 'ultrasonic'),
  f(50000, 'ultrasonic'),
  f(60000, 'ultrasonic'),
  f(80000, 'ultrasonic'),
  f(100000, 'ultrasonic'),
];

/** 주소에 쓰는 열쇠 — 261.63Hz는 261-63이 된다 */
export const freqSlug = (hz: number): string => String(hz).replace('.', '-');

export const FREQ_SLUGS = FREQS.map(x => freqSlug(x.hz));

export const freqOf = (slug: string): Freq | undefined => FREQS.find(x => freqSlug(x.hz) === slug);

/** 목록을 나눌 때 쓰는 구간 — 사람이 소리를 갈라 듣는 방식에 맞춘다 */
export type FreqRange = 'sub' | 'low' | 'mid' | 'high' | 'ultra';

export function freqRange(hz: number): FreqRange {
  if (hz < 20) return 'sub';
  if (hz < 250) return 'low';
  if (hz < 4000) return 'mid';
  if (hz <= 20000) return 'high';
  return 'ultra';
}

export const FREQ_RANGES: FreqRange[] = ['sub', 'low', 'mid', 'high', 'ultra'];

export const freqsOfRange = (r: FreqRange): Freq[] => FREQS.filter(x => freqRange(x.hz) === r);

/** 목록과 공유 카드가 같은 그림을 쓴다 — 이 이모지가 파형 아이콘으로 그려진다 */
export const FREQ_ICON = '〰️';

/**
 * ASCII 128자 — 제어문자의 약칭만 적는다.
 *
 * 0부터 127까지는 번호를 세면 나오고, 글자는 번호에서 나온다(String.fromCharCode).
 * 진법도 HTML 엔티티도 이스케이프도 URL 인코딩도 마찬가지다. 그래서 여기 적는
 * 자료는 **눈에 보이지 않는 33자의 이름**뿐이다 — NUL·ESC·DEL은 계산으로 나오지
 * 않는다.
 *
 * 약칭과 영어 이름은 옮기지 않는다. 원소기호가 어디서나 Fe인 것과 같은 이유로,
 * ESC는 어느 나라 문서에서도 ESC다. 대신 무엇을 하는 글자인지는 갈래(group)로
 * 묶어 그 갈래 설명만 열 언어로 둔다.
 */
export type Control =
  | 'transmission'
  | 'format'
  | 'device'
  | 'separator'
  | 'other';

export interface ControlChar {
  code: number;
  /** 세 글자 약칭 — 만국 공통 */
  abbr: string;
  /** 영어 이름 — 이것도 옮기지 않는다 */
  name: string;
  group: Control;
}

const c = (code: number, abbr: string, name: string, group: Control): ControlChar =>
  ({ code, abbr, name, group });

export const CONTROLS: ControlChar[] = [
  c(0, 'NUL', 'Null', 'other'),
  c(1, 'SOH', 'Start of heading', 'transmission'),
  c(2, 'STX', 'Start of text', 'transmission'),
  c(3, 'ETX', 'End of text', 'transmission'),
  c(4, 'EOT', 'End of transmission', 'transmission'),
  c(5, 'ENQ', 'Enquiry', 'transmission'),
  c(6, 'ACK', 'Acknowledge', 'transmission'),
  c(7, 'BEL', 'Bell', 'device'),
  c(8, 'BS', 'Backspace', 'format'),
  c(9, 'HT', 'Horizontal tab', 'format'),
  c(10, 'LF', 'Line feed', 'format'),
  c(11, 'VT', 'Vertical tab', 'format'),
  c(12, 'FF', 'Form feed', 'format'),
  c(13, 'CR', 'Carriage return', 'format'),
  c(14, 'SO', 'Shift out', 'device'),
  c(15, 'SI', 'Shift in', 'device'),
  c(16, 'DLE', 'Data link escape', 'transmission'),
  c(17, 'DC1', 'Device control 1', 'device'),
  c(18, 'DC2', 'Device control 2', 'device'),
  c(19, 'DC3', 'Device control 3', 'device'),
  c(20, 'DC4', 'Device control 4', 'device'),
  c(21, 'NAK', 'Negative acknowledge', 'transmission'),
  c(22, 'SYN', 'Synchronous idle', 'transmission'),
  c(23, 'ETB', 'End of transmission block', 'transmission'),
  c(24, 'CAN', 'Cancel', 'other'),
  c(25, 'EM', 'End of medium', 'other'),
  c(26, 'SUB', 'Substitute', 'other'),
  c(27, 'ESC', 'Escape', 'other'),
  c(28, 'FS', 'File separator', 'separator'),
  c(29, 'GS', 'Group separator', 'separator'),
  c(30, 'RS', 'Record separator', 'separator'),
  c(31, 'US', 'Unit separator', 'separator'),
  c(127, 'DEL', 'Delete', 'other'),
];

export const CODES: number[] = Array.from({ length: 128 }, (_, i) => i);

export const ASCII_SLUGS = CODES.map(String);

/** 주소는 십진수다 — 글자를 주소에 넣으면 /·?·%가 경로를 부순다 */
export const codeOf = (slug: string): number | undefined =>
  CODES.find(n => String(n) === slug);

export const controlOf = (code: number): ControlChar | undefined =>
  CONTROLS.find(x => x.code === code);

/** 표의 세로 열여섯 줄, 가로 여덟 칸 — 예부터 이 모양으로 그린다 */
export const TABLE_ROWS = 16;
export const TABLE_COLS = 8;

/** 목록과 공유 카드가 같은 그림을 쓴다 */
export const ASCII_ICON = '⌨️';

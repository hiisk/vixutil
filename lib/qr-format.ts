/**
 * QR에 널리 쓰이는 문자열 꼴 — 와이파이·연락처·메일·문자·좌표.
 *
 * ── 왜 화면이 아니라 여기 있나 ──────────────────────────────
 * 이 꼴들은 규격이 아니라 **관행**이다. 어느 문서에도 "와이파이 QR"이라고
 * 적혀 있지 않고, 안드로이드와 iOS의 카메라가 `WIFI:`로 시작하는 글을 보면
 * 연결 창을 띄우기로 서로 맞춘 것이 전부다. 그래서 한 글자만 틀려도 그냥
 * 글자로 읽히고, 화면에서는 QR이 잘 만들어진 것처럼 보인다.
 *
 * 컴포넌트 안에 두면 "비밀번호에 세미콜론이 들어가면 어떻게 되나"를 물어볼
 * 길이 없다. lib/text-more.ts를 화면에서 떼어낸 것과 같은 이유다.
 *
 * ── 검색이 이 낱말로 온다 ───────────────────────────────────
 * "wifi qr code generator", "vcard qr" 같은 말이 QR 검색의 큰 몫이다.
 * 꼴을 갖춰 두는 것은 기능이기도 하지만 유입 경로이기도 하다.
 */

/** 화면이 고르는 입력 꼴 */
export type QrFormat = 'text' | 'url' | 'wifi' | 'vcard' | 'email' | 'phone' | 'sms' | 'geo';

export const QR_FORMATS: readonly QrFormat[] = ['text', 'url', 'wifi', 'vcard', 'email', 'phone', 'sms', 'geo'];

/* ────────────────────────── 주소 ────────────────────────── */

/**
 * 주소를 다듬는다 — 스킴이 없으면 https를 붙인다.
 *
 * "vixutil.com"만 적은 QR을 스캔하면 기기에 따라 글자로 읽히거나 검색어가 된다.
 * 스킴이 있어야 브라우저가 뜬다. 이미 스킴이 있으면 건드리지 않는다 —
 * mailto·tel·intent 같은 것을 https로 덮으면 안 된다.
 */
export function normalizeUrl(raw: string): string {
  const text = raw.trim();
  if (!text) return '';
  return /^[a-z][a-z0-9+.-]*:/i.test(text) ? text : `https://${text}`;
}

/* ────────────────────────── 와이파이 ────────────────────────── */

export type WifiAuth = 'WPA' | 'WEP' | 'nopass';

export interface WifiInput {
  ssid: string;
  password?: string;
  auth?: WifiAuth;
  /** 숨긴 네트워크 — 이름을 뿌리지 않는 공유기 */
  hidden?: boolean;
}

/**
 * 와이파이 값 안의 특수문자를 벗긴다.
 *
 * `;`는 항목을 가르고 `:`는 열쇠와 값을 가른다. 비밀번호에 그 글자가 들어
 * 있으면 — 실제로 자주 들어 있다 — 벗기지 않으면 그 자리에서 잘려 **엉뚱한
 * 비밀번호로 연결을 시도한다.** 잘린 것을 알 방법이 없어서 사람은 공유기가
 * 고장 났다고 생각한다.
 */
const escapeWifi = (value: string): string => value.replace(/([\\;,:"])/g, '\\$1');

/**
 * 와이파이 QR — `WIFI:T:WPA;S:이름;P:비밀번호;;`
 *
 * 끝이 세미콜론 둘인 것은 마지막 항목의 끝과 전체의 끝이 겹친 것이다.
 * 하나만 적으면 안 읽히는 기기가 있다.
 *
 * 이름이 16진수처럼 생기면(a-f와 숫자만) 따옴표로 감싼다. 관행이 그것을
 * "16진수로 적은 이름"으로 읽기 때문에, 감싸지 않으면 다른 이름이 된다.
 *
 * ── 이 규칙의 값 ────────────────────────────────────────────
 * 이 규칙은 양쪽으로 틀릴 수 있어서 적어 둔다. "Cafe"·"1234"·"ABBA"처럼
 * 우연히 16진수 글자로만 된 흔한 이름도 감싸이는데, 따옴표를 벗기지 않는
 * 판독기라면 이름에 따옴표가 붙어 버린다. 반대로 감싸지 않으면 진짜
 * "deadbeef"라는 이름이 바이트 열로 읽힌다.
 *
 * 관행이 정한 쪽(감싸는 쪽)을 따랐다 — 널리 쓰이는 생성기들이 그렇게 한다.
 * 바꾸려면 위 한 줄만 지우면 되고, 검사가 두 경우를 다 못 박아 둔다.
 */
export function wifiPayload({ ssid, password = '', auth = 'WPA', hidden = false }: WifiInput): string {
  const name = /^[0-9A-Fa-f]+$/.test(ssid) && ssid.length > 0 ? `"${ssid}"` : escapeWifi(ssid);
  const parts = [`T:${auth}`, `S:${name}`];
  // 열린 망은 비밀번호 항목 자체를 빼는 쪽이 넓게 읽힌다
  if (auth !== 'nopass' && password) parts.push(`P:${escapeWifi(password)}`);
  if (hidden) parts.push('H:true');
  return `WIFI:${parts.join(';')};;`;
}

/* ────────────────────────── 연락처 ────────────────────────── */

export interface VcardInput {
  lastName?: string;
  firstName?: string;
  org?: string;
  title?: string;
  phone?: string;
  email?: string;
  url?: string;
  address?: string;
  note?: string;
}

/** vCard 값 벗기기 — 역슬래시·세미콜론·쉼표, 줄바꿈은 \n 두 글자로 */
const escapeVcard = (value: string): string =>
  value.replace(/([\\;,])/g, '\\$1').replace(/\r?\n/g, '\\n');

/**
 * 연락처 QR — vCard 3.0.
 *
 * 4.0이 더 새롭지만 3.0을 쓴다. 아이폰과 안드로이드 기본 카메라가 둘 다
 * 3.0을 확실히 읽고, 4.0은 기기에 따라 이름 자리를 비워 저장한다.
 *
 * 줄 구분은 CRLF다. 규격이 그렇고, LF만 쓰면 항목 하나로 뭉쳐 읽는 앱이 있다.
 * N은 `성;이름;중간이름;접두;접미`의 다섯 칸이라 빈 칸도 자리를 지켜야 한다.
 */
export function vcardPayload(input: VcardInput): string {
  const e = escapeVcard;
  const last = input.lastName?.trim() ?? '';
  const first = input.firstName?.trim() ?? '';
  const lines = ['BEGIN:VCARD', 'VERSION:3.0', `N:${e(last)};${e(first)};;;`];
  const full = [first, last].filter(Boolean).join(' ');
  if (full) lines.push(`FN:${e(full)}`);
  if (input.org?.trim()) lines.push(`ORG:${e(input.org.trim())}`);
  if (input.title?.trim()) lines.push(`TITLE:${e(input.title.trim())}`);
  if (input.phone?.trim()) lines.push(`TEL;TYPE=CELL:${e(input.phone.trim())}`);
  if (input.email?.trim()) lines.push(`EMAIL;TYPE=INTERNET:${e(input.email.trim())}`);
  if (input.url?.trim()) lines.push(`URL:${normalizeUrl(input.url)}`);
  // ADR도 일곱 칸짜리 구조인데, 한 줄로 받은 주소는 "번지" 칸에 넣는 것이 관행이다
  if (input.address?.trim()) lines.push(`ADR;TYPE=HOME:;;${e(input.address.trim())};;;;`);
  if (input.note?.trim()) lines.push(`NOTE:${e(input.note.trim())}`);
  lines.push('END:VCARD');
  return lines.join('\r\n');
}

/* ────────────────────────── 메일·전화·문자·좌표 ────────────────────────── */

export interface EmailInput {
  to: string;
  subject?: string;
  body?: string;
}

/** 메일 QR — `mailto:주소?subject=…&body=…` */
export function emailPayload({ to, subject = '', body = '' }: EmailInput): string {
  const query: string[] = [];
  if (subject.trim()) query.push(`subject=${encodeURIComponent(subject.trim())}`);
  if (body.trim()) query.push(`body=${encodeURIComponent(body.trim())}`);
  return `mailto:${to.trim()}${query.length ? `?${query.join('&')}` : ''}`;
}

/**
 * 전화 QR — `tel:번호`.
 *
 * 공백·괄호·붙임표를 뺀다. 남기면 그대로 번호로 넘기는 기기가 있고, 그러면
 * 전화 앱이 번호를 못 알아본다. 나라 번호의 +는 남긴다.
 */
export const phonePayload = (number: string): string => `tel:${number.replace(/[^\d+]/g, '')}`;

export interface SmsInput {
  number: string;
  message?: string;
}

/**
 * 문자 QR — `SMSTO:번호:내용`.
 *
 * `sms:번호?body=`도 있지만 SMSTO 쪽이 안드로이드·iOS 양쪽에서 더 넓게 읽힌다.
 */
export function smsPayload({ number, message = '' }: SmsInput): string {
  const clean = number.replace(/[^\d+]/g, '');
  return message.trim() ? `SMSTO:${clean}:${message.trim()}` : `SMSTO:${clean}`;
}

export interface GeoInput {
  lat: string;
  lon: string;
}

/** 좌표 QR — `geo:위도,경도`. 지도 앱이 그 자리를 띄운다 */
export function geoPayload({ lat, lon }: GeoInput): string {
  return `geo:${lat.trim()},${lon.trim()}`;
}

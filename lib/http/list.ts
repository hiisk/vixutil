/**
 * HTTP 상태 코드와 헤더 132가지 — 번호와 이름, 갈래만 적는다.
 *
 * 코드 번호와 헤더 이름은 표준이 정한 것이라 언어를 가리지 않는다. 404는
 * 어느 나라에서든 404이고 Content-Type은 Content-Type이다. 열 언어로 쓸
 * 것은 설명 한 줄뿐이다.
 *
 * 갈래(2xx·4xx…)와 요청/응답 구분은 번호와 이름에서 계산된다.
 */
export type HttpKind = 'status' | 'header';

export interface HttpItem {
  /** 주소에 쓰는 열쇠 — 상태는 '404', 헤더는 'content-type' */
  slug: string;
  /** 화면에 그대로 보이는 이름 — '404 Not Found' 또는 'Content-Type' */
  name: string;
  kind: HttpKind;
  /** 상태 코드의 숫자 */
  code?: number;
  /** 헤더가 요청·응답 어느 쪽에 붙는가 */
  side?: 'request' | 'response' | 'both';
}

const st = (code: number, title: string): HttpItem =>
  ({ slug: String(code), name: `${code} ${title}`, kind: 'status', code });

const hd = (name: string, side: 'request' | 'response' | 'both'): HttpItem =>
  ({ slug: name.toLowerCase(), name, kind: 'header', side });

export const HTTP_ITEMS: HttpItem[] = [
  /* ───────── 1xx 정보 ───────── */
  st(100, 'Continue'),
  st(101, 'Switching Protocols'),
  st(102, 'Processing'),
  st(103, 'Early Hints'),

  /* ───────── 2xx 성공 ───────── */
  st(200, 'OK'),
  st(201, 'Created'),
  st(202, 'Accepted'),
  st(203, 'Non-Authoritative Information'),
  st(204, 'No Content'),
  st(205, 'Reset Content'),
  st(206, 'Partial Content'),
  st(207, 'Multi-Status'),
  st(208, 'Already Reported'),
  st(226, 'IM Used'),

  /* ───────── 3xx 넘김 ───────── */
  st(300, 'Multiple Choices'),
  st(301, 'Moved Permanently'),
  st(302, 'Found'),
  st(303, 'See Other'),
  st(304, 'Not Modified'),
  st(307, 'Temporary Redirect'),
  st(308, 'Permanent Redirect'),

  /* ───────── 4xx 요청 잘못 ───────── */
  st(400, 'Bad Request'),
  st(401, 'Unauthorized'),
  st(402, 'Payment Required'),
  st(403, 'Forbidden'),
  st(404, 'Not Found'),
  st(405, 'Method Not Allowed'),
  st(406, 'Not Acceptable'),
  st(407, 'Proxy Authentication Required'),
  st(408, 'Request Timeout'),
  st(409, 'Conflict'),
  st(410, 'Gone'),
  st(411, 'Length Required'),
  st(412, 'Precondition Failed'),
  st(413, 'Content Too Large'),
  st(414, 'URI Too Long'),
  st(415, 'Unsupported Media Type'),
  st(416, 'Range Not Satisfiable'),
  st(417, 'Expectation Failed'),
  st(418, "I'm a teapot"),
  st(421, 'Misdirected Request'),
  st(422, 'Unprocessable Content'),
  st(423, 'Locked'),
  st(424, 'Failed Dependency'),
  st(425, 'Too Early'),
  st(426, 'Upgrade Required'),
  st(428, 'Precondition Required'),
  st(429, 'Too Many Requests'),
  st(431, 'Request Header Fields Too Large'),
  st(451, 'Unavailable For Legal Reasons'),

  /* ───────── 5xx 서버 잘못 ───────── */
  st(500, 'Internal Server Error'),
  st(501, 'Not Implemented'),
  st(502, 'Bad Gateway'),
  st(503, 'Service Unavailable'),
  st(504, 'Gateway Timeout'),
  st(505, 'HTTP Version Not Supported'),
  st(506, 'Variant Also Negotiates'),
  st(507, 'Insufficient Storage'),
  st(508, 'Loop Detected'),
  st(510, 'Not Extended'),
  st(511, 'Network Authentication Required'),

  /* ───────── 요청 헤더 ───────── */
  hd('Accept', 'request'),
  hd('Accept-Encoding', 'request'),
  hd('Accept-Language', 'request'),
  hd('Authorization', 'request'),
  hd('Cookie', 'request'),
  hd('Host', 'request'),
  hd('If-Modified-Since', 'request'),
  hd('If-None-Match', 'request'),
  hd('Origin', 'request'),
  hd('Range', 'request'),
  hd('Referer', 'request'),
  hd('User-Agent', 'request'),
  hd('Sec-Fetch-Dest', 'request'),
  hd('Sec-Fetch-Mode', 'request'),
  hd('Sec-Fetch-Site', 'request'),
  hd('DNT', 'request'),
  hd('Expect', 'request'),
  hd('Forwarded', 'request'),
  hd('From', 'request'),
  hd('If-Match', 'request'),
  hd('If-Range', 'request'),
  hd('Max-Forwards', 'request'),
  hd('Proxy-Authorization', 'request'),
  hd('TE', 'request'),
  hd('Upgrade-Insecure-Requests', 'request'),
  hd('X-Forwarded-For', 'request'),
  hd('X-Forwarded-Proto', 'request'),
  hd('X-Requested-With', 'request'),

  /* ───────── 응답 헤더 ───────── */
  hd('Access-Control-Allow-Origin', 'response'),
  hd('Access-Control-Allow-Methods', 'response'),
  hd('Access-Control-Allow-Headers', 'response'),
  hd('Access-Control-Allow-Credentials', 'response'),
  hd('Access-Control-Max-Age', 'response'),
  hd('Age', 'response'),
  hd('Allow', 'response'),
  hd('Content-Disposition', 'response'),
  hd('Content-Security-Policy', 'response'),
  hd('ETag', 'response'),
  hd('Expires', 'response'),
  hd('Last-Modified', 'response'),
  hd('Location', 'response'),
  hd('Permissions-Policy', 'response'),
  hd('Referrer-Policy', 'response'),
  hd('Retry-After', 'response'),
  hd('Server', 'response'),
  hd('Set-Cookie', 'response'),
  hd('Strict-Transport-Security', 'response'),
  hd('Timing-Allow-Origin', 'response'),
  hd('Vary', 'response'),
  hd('WWW-Authenticate', 'response'),
  hd('X-Content-Type-Options', 'response'),
  hd('X-Frame-Options', 'response'),
  hd('X-XSS-Protection', 'response'),
  hd('Cross-Origin-Opener-Policy', 'response'),
  hd('Cross-Origin-Resource-Policy', 'response'),
  hd('Cross-Origin-Embedder-Policy', 'response'),
  hd('Content-Range', 'response'),
  hd('Accept-Ranges', 'response'),

  /* ───────── 양쪽에 쓰이는 헤더 ───────── */
  hd('Cache-Control', 'both'),
  hd('Connection', 'both'),
  hd('Content-Encoding', 'both'),
  hd('Content-Language', 'both'),
  hd('Content-Length', 'both'),
  hd('Content-Type', 'both'),
  hd('Date', 'both'),
  hd('Pragma', 'both'),
  hd('Trailer', 'both'),
  hd('Transfer-Encoding', 'both'),
  hd('Upgrade', 'both'),
  hd('Via', 'both'),
  hd('Warning', 'both'),
];

/** 상태 코드의 갈래 — 번호 첫 자리가 곧 뜻이다 */
export type StatusClass = '1xx' | '2xx' | '3xx' | '4xx' | '5xx';

export const statusClass = (code: number): StatusClass =>
  (`${Math.floor(code / 100)}xx` as StatusClass);

export const HTTP_SLUGS = HTTP_ITEMS.map(x => x.slug);

export const httpItemOf = (slug: string): HttpItem | undefined => HTTP_ITEMS.find(x => x.slug === slug);

export const STATUSES = HTTP_ITEMS.filter(x => x.kind === 'status');
export const HEADERS = HTTP_ITEMS.filter(x => x.kind === 'header');

export const statusesOfClass = (c: StatusClass): HttpItem[] =>
  STATUSES.filter(x => statusClass(x.code!) === c);

export const headersOfSide = (side: 'request' | 'response' | 'both'): HttpItem[] =>
  HEADERS.filter(x => x.side === side);

/** 목록과 공유 카드가 같은 그림을 쓴다 — 이 이모지가 서버 아이콘으로 그려진다 */
export const HTTP_ICON = '🗄️';

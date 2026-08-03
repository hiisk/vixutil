/**
 * 정규식 155가지 — 식과 함께 "맞아야 하는 보기"와 "맞으면 안 되는 보기"를 적는다.
 *
 * 인터넷에 도는 정규식의 절반은 틀렸다. 이메일 식이라며 올라온 것에 점 두 개짜리
 * 주소를 넣으면 통과하고, 날짜 식이라며 올라온 것에 13월을 넣어도 통과한다.
 * 눈으로 봐서는 알 수 없다 — 돌려 봐야 안다.
 *
 * 그래서 이 표는 식만 적지 않는다. 보기를 함께 적어 두고, 검사가 155개를 모두
 * 실제로 돌려 본다. 맞아야 할 것이 안 맞거나 안 맞아야 할 것이 맞으면 그 자리에서
 * 걸린다. 화면에 보이는 보기도 같은 자료에서 나오므로 설명과 식이 어긋날 수 없다.
 *
 * 정규식 표기는 만국 공통이라 옮길 것이 없다 — 설명만 여덟 언어로 둔다.
 */
export type RegexKind = 'syntax' | 'quantifier' | 'lookaround' | 'validate' | 'extract';

export interface Pattern {
  slug: string;
  /** 정규식 본문 — 감싸는 슬래시는 빼고 적는다 */
  re: string;
  flags: string;
  kind: RegexKind;
  /** 맞아야 하는 보기 */
  ok: string[];
  /** 맞으면 안 되는 보기 */
  no: string[];
}

const p = (slug: string, kind: RegexKind, re: string, ok: string[], no: string[], flags = ''): Pattern =>
  ({ slug, kind, re, flags, ok, no });

/** 문자 하나를 가리키는 표기들 */
const SYNTAX: Pattern[] = [
  p('digit', 'syntax', '\\d', ['7', 'a1b'], ['abc', '한글']),
  p('non-digit', 'syntax', '\\D', ['a', '1a'], ['123', '7']),
  p('word-char', 'syntax', '\\w', ['a', '_', '3'], ['!', ' ']),
  p('non-word-char', 'syntax', '\\W', ['!', 'a b'], ['abc', 'a_1']),
  p('whitespace', 'syntax', '\\s', [' ', 'a\tb'], ['abc', '123']),
  p('non-whitespace', 'syntax', '\\S', ['a', ' a '], ['   ', ' ']),
  p('any-char', 'syntax', '^.$', ['a', '7', '가'], ['ab', '']),
  p('lower-range', 'syntax', '^[a-z]+$', ['abc', 'zz'], ['ABC', 'a1']),
  p('upper-range', 'syntax', '^[A-Z]+$', ['ABC', 'Z'], ['abc', 'A1']),
  p('alnum-class', 'syntax', '^[A-Za-z0-9]+$', ['abc123', 'Z9'], ['a-b', 'a b']),
  p('negated-class', 'syntax', '^[^0-9]+$', ['abc', '한글'], ['abc1', '123']),
  p('hangul-range', 'syntax', '^[가-힣]+$', ['한글', '주사위'], ['abc', '한글1']),
  p('kana-range', 'syntax', '^[ぁ-んァ-ヶー]+$', ['ひらがな', 'カタカナ'], ['漢字', 'abc']),
  p('cjk-range', 'syntax', '^[\\u4e00-\\u9fff]+$', ['漢字', '中文'], ['ひらがな', 'abc']),
  p('escaped-dot', 'syntax', '^a\\.b$', ['a.b'], ['axb', 'ab']),
  p('escaped-slash', 'syntax', '^a/b$', ['a/b'], ['a\\b', 'ab']),
  p('tab', 'syntax', '\\t', ['a\tb'], ['a b', 'ab']),
  p('newline', 'syntax', '\\n', ['a\nb'], ['a b', 'ab']),
  p('carriage-return', 'syntax', '\\r\\n', ['a\r\nb'], ['a\nb', 'ab']),
  p('unicode-escape', 'syntax', '^\\u00e9$', ['é'], ['e', 'É']),
  p('start-anchor', 'syntax', '^Hello', ['Hello world', 'Hello'], ['say Hello', 'hello']),
  p('end-anchor', 'syntax', 'world$', ['hello world', 'world'], ['world peace', 'World']),
  p('whole-string', 'syntax', '^cat$', ['cat'], ['cats', 'a cat']),
  p('word-boundary', 'syntax', '\\bcat\\b', ['a cat sat', 'cat'], ['category', 'concat']),
  p('non-boundary', 'syntax', '\\Bcat', ['concat', 'muscat'], ['cat', 'a cat']),
  p('case-insensitive', 'syntax', '^cat$', ['cat', 'CAT', 'Cat'], ['cats', 'dog'], 'i'),
  p('multiline-anchor', 'syntax', '^b', ['a\nb'], ['a b'], 'm'),
  p('dotall', 'syntax', '^a.b$', ['a\nb', 'axb'], ['ab'], 's'),
  p('unicode-letter', 'syntax', '^\\p{L}+$', ['abc', '한글', 'café'], ['a1', '!'], 'u'),
  p('emoji-property', 'syntax', '^\\p{Extended_Pictographic}+$', ['🎲', '🧩🎯'], ['abc', '한글'], 'u'),
  p('cyrillic-range', 'syntax', '^[\\u0400-\\u04FF]+$', ['Привет', 'Мир'], ['abc', '한글']),
  p('hex-escape', 'syntax', '^\\x41$', ['A'], ['a', 'x41']),
];

/** 몇 번 되풀이되는지를 정하는 표기들 */
const QUANTIFIER: Pattern[] = [
  p('star', 'quantifier', '^ab*c$', ['ac', 'abc', 'abbbc'], ['abd', 'bc']),
  p('plus', 'quantifier', '^ab+c$', ['abc', 'abbc'], ['ac', 'abd']),
  p('question', 'quantifier', '^colou?r$', ['color', 'colour'], ['colouur', 'colr']),
  p('exact-count', 'quantifier', '^\\d{4}$', ['2024', '0000'], ['123', '12345']),
  p('range-count', 'quantifier', '^\\d{2,4}$', ['12', '1234'], ['1', '12345']),
  p('at-least', 'quantifier', '^\\d{2,}$', ['12', '123456'], ['1', '']),
  p('lazy-tag', 'quantifier', '<.+?>', ['<b>bold</b>'], ['plain text', 'a < b']),
  p('greedy-tag', 'quantifier', '^<.+>$', ['<b>bold</b>'], ['plain', '<b']),
  p('alternation', 'quantifier', '^(?:cat|dog)$', ['cat', 'dog'], ['cow', 'catdog']),
  p('group-repeat', 'quantifier', '^(?:ab)+$', ['ab', 'ababab'], ['aba', 'ba']),
  p('capture-group', 'quantifier', '^(\\d{3})-(\\d{4})$', ['123-4567'], ['1234567', '12-345']),
  p('non-capturing', 'quantifier', '^(?:\\d{3}-)+\\d{4}$', ['123-456-7890', '123-4567'], ['1234567', '123-']),
  p('named-group', 'quantifier', '^(?<year>\\d{4})-(?<month>\\d{2})$', ['2024-07'], ['2024-7', '24-07']),
  p('backreference', 'quantifier', '(\\w)\\1', ['success', 'aa'], ['abc', 'ab']),
  p('repeated-word', 'quantifier', '\\b(\\w+)\\s+\\1\\b', ['the the cat', 'is is'], ['the cat', 'this is']),
  p('optional-group', 'quantifier', '^(?:https?://)?example\\.com$', ['example.com', 'https://example.com'], ['ftp://example.com', 'example.org']),
  p('nested-quantifier', 'quantifier', '^(?:\\d{1,3}\\.){3}\\d{1,3}$', ['192.168.0.1', '8.8.8.8'], ['192.168.0', '1.2.3.4.5']),
  p('at-most', 'quantifier', '^\\d{0,3}$', ['12', '123'], ['1234', '12a']),
  p('min-max-word', 'quantifier', '^\\w{3,8}$', ['abc', 'abcdefgh'], ['ab', 'abcdefghi']),
  p('exact-repeat-group', 'quantifier', '^(?:\\w+\\.){2}\\w+$', ['a.b.c', 'x1.y2.z3'], ['a.b', 'a.b.c.d']),
  p('optional-trailing-slash', 'quantifier', '^/[a-z]+/?$', ['/docs', '/docs/'], ['docs', '/docs//']),
];

/** 앞뒤를 살펴보되 잡아먹지 않는 표기들 */
const LOOKAROUND: Pattern[] = [
  p('lookahead', 'lookaround', '\\d+(?= dollars)', ['30 dollars'], ['30 euros', 'dollars']),
  p('negative-lookahead', 'lookaround', '^(?!admin$).+$', ['user', 'administrator'], ['admin', '']),
  p('lookbehind', 'lookaround', '(?<=\\$)\\d+', ['$100'], ['100', '€100']),
  p('negative-lookbehind', 'lookaround', '(?<!\\$)\\b\\d+', ['100 won', '€100'], ['$100', '$5']),
  p('password-rule', 'lookaround', '^(?=.*[A-Z])(?=.*\\d)(?=.*[a-z]).{8,}$', ['Passw0rdy', 'A1bcdefg'], ['password', 'PASSWORD1']),
  p('no-double-space', 'lookaround', '^(?!.*  ).+$', ['one two', 'a'], ['one  two', 'a  b']),
  p('must-contain', 'lookaround', '^(?=.*@).+$', ['a@b', 'x@y.com'], ['ab', 'plain']),
  p('thousand-separator', 'lookaround', '\\B(?=(\\d{3})+(?!\\d))', ['1234567', '1000'], ['100', '12']),
  p('no-repeated-char', 'lookaround', '^(?!.*(.)\\1).+$', ['abc', 'xyz'], ['aab', 'hello']),
  p('lookbehind-won', 'lookaround', '(?<=₩)\\d+', ['₩5000'], ['5000', '$5000']),
  p('no-word-present', 'lookaround', '^(?!.*\\btest\\b).*$', ['production code', 'testing'], ['this is a test', 'test']),
];

/** 통째로 맞는지 보는 식들 — 앞뒤를 묶어 두었다 */
const VALIDATE: Pattern[] = [
  p('email', 'validate', "^[^\\s@]+@[^\\s@.]+(?:\\.[^\\s@.]+)+$", ['a@b.com', 'first.last@sub.example.co.kr'], ['a@b', 'a@@b.com', 'a b@c.com', 'a@b..com']),
  p('url', 'validate', '^https?://[^\\s/$.?#][^\\s]*$', ['https://example.com', 'http://a.io/path?q=1'], ['ftp://example.com', 'example.com', 'https://']),
  p('domain', 'validate', '^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\\.)+[a-z]{2,}$', ['example.com', 'sub.example.co.kr'], ['example', '-bad.com', 'example.c']),
  p('ipv4', 'validate', '^(?:(?:25[0-5]|2[0-4]\\d|1\\d{2}|[1-9]?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|1\\d{2}|[1-9]?\\d)$', ['192.168.0.1', '255.255.255.255', '0.0.0.0'], ['256.1.1.1', '1.2.3', '01.2.3.4']),
  p('ipv6-full', 'validate', '^(?:[0-9a-f]{1,4}:){7}[0-9a-f]{1,4}$', ['2001:0db8:85a3:0000:0000:8a2e:0370:7334', 'fe80:0:0:0:0:0:0:1'], ['2001:db8::1', '1:2:3:4:5:6:7'], 'i'),
  p('mac-address', 'validate', '^(?:[0-9a-f]{2}[:-]){5}[0-9a-f]{2}$', ['00:1b:63:84:45:e6', '00-1B-63-84-45-E6'], ['00:1b:63:84:45', 'zz:1b:63:84:45:e6'], 'i'),
  p('port-number', 'validate', '^(?:6553[0-5]|655[0-2]\\d|65[0-4]\\d{2}|6[0-4]\\d{3}|[1-5]?\\d{1,4})$', ['80', '65535', '0'], ['65536', '99999', '-1']),
  p('uuid', 'validate', '^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$', ['123e4567-e89b-12d3-a456-426614174000'], ['123e4567-e89b-12d3-a456', 'zzze4567-e89b-12d3-a456-426614174000'], 'i'),
  p('hex-colour', 'validate', '^#(?:[0-9a-f]{3}|[0-9a-f]{6})$', ['#fff', '#A1B2C3'], ['fff', '#ffff', '#gggggg'], 'i'),
  p('rgb-colour', 'validate', '^rgb\\(\\s*\\d{1,3}\\s*,\\s*\\d{1,3}\\s*,\\s*\\d{1,3}\\s*\\)$', ['rgb(255, 0, 0)', 'rgb(0,0,0)'], ['rgb(255 0 0)', 'rgba(0,0,0,1)']),
  p('iso-date', 'validate', '^\\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\\d|3[01])$', ['2024-07-29', '2000-01-01'], ['2024-13-01', '2024-7-9', '2024-00-10']),
  p('slash-date', 'validate', '^(?:0[1-9]|[12]\\d|3[01])/(?:0[1-9]|1[0-2])/\\d{4}$', ['29/07/2024', '01/01/2000'], ['32/07/2024', '29/13/2024']),
  p('time-24h', 'validate', '^(?:[01]\\d|2[0-3]):[0-5]\\d$', ['00:00', '23:59'], ['24:00', '12:60', '9:05']),
  p('time-12h', 'validate', '^(?:0?[1-9]|1[0-2]):[0-5]\\d\\s?(?:am|pm)$', ['9:05 am', '12:30pm'], ['13:00 pm', '9:60 am'], 'i'),
  p('iso-datetime', 'validate', '^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(?:\\.\\d+)?(?:Z|[+-]\\d{2}:\\d{2})$', ['2024-07-29T12:00:00Z', '2024-07-29T12:00:00.123+09:00'], ['2024-07-29 12:00:00', '2024-07-29T12:00:00']),
  p('duration-iso', 'validate', '^P(?=\\d|T\\d)(?:\\d+Y)?(?:\\d+M)?(?:\\d+D)?(?:T(?:\\d+H)?(?:\\d+M)?(?:\\d+S)?)?$', ['P1Y2M3D', 'PT30M'], ['1Y', 'P', 'PT']),
  p('semver', 'validate', '^\\d+\\.\\d+\\.\\d+(?:-[0-9a-z.-]+)?(?:\\+[0-9a-z.-]+)?$', ['1.0.0', '2.1.3-beta.1', '1.0.0+build5'], ['1.0', 'v1.0.0'], 'i'),
  p('integer', 'validate', '^\\d+$', ['0', '2024'], ['-1', '1.5', '']),
  p('signed-integer', 'validate', '^[+-]?\\d+$', ['-42', '+7', '0'], ['1.5', '--1']),
  p('decimal', 'validate', '^-?\\d+(?:\\.\\d+)?$', ['3.14', '-0.5', '42'], ['3.', '.5', '1.2.3']),
  p('scientific', 'validate', '^-?\\d+(?:\\.\\d+)?[eE][+-]?\\d+$', ['1e5', '-2.5E-3'], ['1e', '5']),
  p('percentage', 'validate', '^(?:100(?:\\.0+)?|\\d{1,2}(?:\\.\\d+)?)%$', ['0%', '99.9%', '100%'], ['101%', '50', '-5%']),
  p('thousands-number', 'validate', '^\\d{1,3}(?:,\\d{3})*$', ['1,234,567', '999'], ['1,23,456', '1234']),
  p('currency-amount', 'validate', '^[$€£¥₩]\\s?\\d{1,3}(?:,\\d{3})*(?:\\.\\d{2})?$', ['$1,234.56', '₩12,000'], ['1234', '$1,2345']),
  p('hex-string', 'validate', '^[0-9a-f]+$', ['deadbeef', '0FF'], ['xyz', '0x1f'], 'i'),
  p('binary-string', 'validate', '^[01]+$', ['1010', '0'], ['102', '0b10']),
  p('octal-string', 'validate', '^[0-7]+$', ['755', '0'], ['8', '79']),
  p('base64', 'validate', '^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$', ['aGVsbG8=', 'YWJjZA=='], ['aGVsbG8', '###']),
  p('jwt', 'validate', '^[A-Za-z0-9_-]+\\.[A-Za-z0-9_-]+\\.[A-Za-z0-9_-]*$', ['eyJhbGciOiJIUzI1NiJ9.eyJhIjoxfQ.sig'], ['abc.def', 'abc']),
  p('e164-phone', 'validate', '^\\+[1-9]\\d{7,14}$', ['+821012345678', '+14155552671'], ['01012345678', '+0123456789']),
  p('username', 'validate', '^[a-z][a-z0-9_]{2,15}$', ['user_01', 'abc'], ['ab', '1user', 'User']),
  p('slug', 'validate', '^[a-z0-9]+(?:-[a-z0-9]+)*$', ['hello-world', 'a1'], ['Hello-World', 'hello--world', '-hello']),
  p('filename', 'validate', '^[^\\\\/:*?"<>|]+\\.[a-z0-9]+$', ['report.pdf', 'my photo.jpg'], ['report', 'a/b.txt'], 'i'),
  p('image-extension', 'validate', '^.+\\.(?:jpe?g|png|gif|webp|avif|svg)$', ['photo.jpg', 'icon.SVG'], ['photo.txt', 'jpg', '.png'], 'i'),
  p('unix-path', 'validate', '^/(?:[^/\\0]+/)*[^/\\0]*$', ['/usr/local/bin', '/'], ['usr/local', 'C:\\\\Windows']),
  p('windows-path', 'validate', '^[A-Za-z]:\\\\(?:[^\\\\/:*?"<>|]+\\\\)*[^\\\\/:*?"<>|]*$', ['C:\\Users\\me', 'D:\\'], ['/usr/bin', 'C:/Users']),
  p('html-tag', 'validate', '^</?[a-z][a-z0-9]*(?:\\s[^<>]*)?/?>$', ['<div>', '</div>', '<img src="a.png"/>'], ['div', '< div >'], 'i'),
  p('css-class', 'validate', '^\\.-?[_a-z][_a-z0-9-]*$', ['.btn', '.-my-class'], ['btn', '.1st']),
  p('roman-numeral', 'validate', '^M{0,3}(?:CM|CD|D?C{0,3})(?:XC|XL|L?X{0,3})(?:IX|IV|V?I{0,3})$', ['XIV', 'MMXXIV'], ['IIII', 'ABC']),
  p('latitude', 'validate', '^-?(?:90(?:\\.0+)?|[1-8]?\\d(?:\\.\\d+)?)$', ['37.5665', '-90', '0'], ['91', '-90.1']),
  p('longitude', 'validate', '^-?(?:180(?:\\.0+)?|1[0-7]\\d(?:\\.\\d+)?|\\d{1,2}(?:\\.\\d+)?)$', ['126.978', '-180', '0'], ['181', '-180.5']),
  p('no-leading-zero', 'validate', '^(?:0|[1-9]\\d*)$', ['0', '2024'], ['007', '01']),
  p('even-number', 'validate', '^\\d*[02468]$', ['4', '128'], ['3', '127']),
  p('blank-line', 'validate', '^\\s*$', ['', '   ', '\t'], ['a', ' a ']),
  p('iso-week', 'validate', '^\\d{4}-W(?:0[1-9]|[1-4]\\d|5[0-3])$', ['2024-W01', '2024-W53'], ['2024-W00', '2024-W54', '2024-01']),
  p('hex-colour-alpha', 'validate', '^#(?:[0-9a-f]{4}|[0-9a-f]{8})$', ['#ffff', '#A1B2C3D4'], ['#fff', '#ffffff'], 'i'),
  p('card-number-format', 'validate', '^\\d{4}(?:[ -]?\\d{4}){3}$', ['4111111111111111', '4111 1111 1111 1111', '4111-1111-1111-1111'], ['4111 1111 1111', '41111111111111111']),
  p('currency-code', 'validate', '^[A-Z]{3}$', ['USD', 'KRW'], ['usd', 'US']),
  p('hex-with-prefix', 'validate', '^0x[0-9a-f]+$', ['0x1F', '0xdeadbeef'], ['1F', '0x'], 'i'),
  p('sha256-hex', 'validate', '^[0-9a-f]{64}$', ['e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'], ['e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b85', 'abc'], 'i'),
  p('object-id', 'validate', '^[0-9a-f]{24}$', ['507f1f77bcf86cd799439011'], ['507f1f77bcf86cd79943901', 'zzzf1f77bcf86cd799439011'], 'i'),
];

/** 골라내거나 다듬을 때 쓰는 식들 */
const EXTRACT: Pattern[] = [
  p('trailing-space', 'extract', '\\s+$', ['abc   ', 'a\t'], ['abc', ' abc']),
  p('leading-space', 'extract', '^\\s+', ['   abc', '\tabc'], ['abc', 'abc   ']),
  p('outer-space', 'extract', '^\\s+|\\s+$', ['  abc', 'abc  '], ['abc', 'a b']),
  p('repeated-space', 'extract', '\\s{2,}', ['a  b', 'a\t\tb'], ['a b', 'ab']),
  p('empty-lines', 'extract', '\\n\\s*\\n', ['a\n\nb', 'a\n \nb'], ['a\nb', 'ab']),
  p('non-digit-strip', 'extract', '\\D+', ['010-1234', 'a1'], ['1234', '0']),
  p('non-ascii', 'extract', '[^\\x00-\\x7F]', ['한글', 'café'], ['abc', '123']),
  p('control-char', 'extract', '[\\x00-\\x1F]', ['a\u0000b', 'a\u0007'], ['abc', ' ']),
  p('html-tags-strip', 'extract', '</?[^>]+>', ['<b>hi</b>', '<br/>'], ['plain', 'a > b']),
  p('html-comment', 'extract', '<!--[\\s\\S]*?-->', ['<!-- note -->', '<!--\nmulti\n-->'], ['<!-- unclosed', 'plain']),
  p('line-comment', 'extract', '//.*$', ['let a = 1; // set a'], ['let a = 1;', 'https:'], 'm'),
  p('block-comment', 'extract', '/\\*[\\s\\S]*?\\*/', ['/* note */', '/*\nmulti\n*/'], ['/* unclosed', 'plain']),
  p('double-quoted', 'extract', '"[^"\\\\]*(?:\\\\.[^"\\\\]*)*"', ['say "hi"', '"a\\\\"b"'], ['say hi', "'single'"]),
  p('single-quoted', 'extract', "'[^'\\\\]*(?:\\\\.[^'\\\\]*)*'", ["say 'hi'"], ['say hi', '"double"']),
  p('markdown-link', 'extract', '\\[([^\\]]+)\\]\\(([^)]+)\\)', ['[home](/index)', 'see [docs](https://a.io)'], ['[home]', '(link)']),
  p('markdown-heading', 'extract', '^#{1,6}\\s+.+$', ['# Title', '### Sub'], ['#Title', 'Title'], 'm'),
  p('hashtag', 'extract', '(?:^|\\s)#([a-z0-9_]+)', ['#cats', 'love #cats'], ['a#cats', '#'], 'i'),
  p('mention', 'extract', '(?:^|\\s)@([a-z0-9_]{2,})', ['@user', 'hi @user'], ['a@user', '@u'], 'i'),
  p('query-param', 'extract', '[?&]([^=&]+)=([^&]*)', ['?a=1', '/p?a=1&b=2'], ['a=1', '/path']),
  p('url-in-text', 'extract', 'https?://[^\\s<>"]+', ['see https://a.io now'], ['a.io', 'see www.a.io']),
  p('domain-from-url', 'extract', '^https?://([^/:?#]+)', ['https://sub.a.io/path'], ['sub.a.io', 'ftp://a.io']),
  p('file-extension', 'extract', '\\.([a-z0-9]+)$', ['photo.jpg', 'a.tar.gz'], ['photo', 'archive.'], 'i'),
  p('camel-boundary', 'extract', '(?<=[a-z0-9])(?=[A-Z])', ['camelCase', 'myXMLParser'], ['lowercase', 'UPPER']),
  p('snake-part', 'extract', '_([a-z])', ['snake_case', 'a_b'], ['snakecase', 'A_B']),
  p('kebab-part', 'extract', '-([a-z])', ['kebab-case', 'a-b'], ['kebabcase', 'A-B']),
  p('csv-field', 'extract', '(?:^|,)("(?:[^"]|"")*"|[^,]+)', ['a,b,c', '"x,y",z'], ['', ',,']),
  p('key-value', 'extract', '^([^=]+)=(.*)$', ['KEY=value', 'a='], ['novalue', '=only'], 'm'),
  p('first-word', 'extract', '^\\s*(\\S+)', ['hello world', '  hi'], ['', '   ']),
  p('last-word', 'extract', '(\\S+)\\s*$', ['hello world', 'hi  '], ['', '   ']),
  p('digits-in-text', 'extract', '\\d+', ['a1b22', '2024'], ['abc', '']),
  p('word-count', 'extract', '\\b\\w+\\b', ['two words', 'a'], ['', '   ']),
  p('bracket-content', 'extract', '\\[([^\\]]*)\\]', ['[note]', 'a[b]c'], ['note', '[unclosed']),
  p('paren-content', 'extract', '\\(([^)]*)\\)', ['(note)', 'a(b)c'], ['note', '(unclosed']),
  p('emoji-surrogate', 'extract', '[\\uD800-\\uDBFF][\\uDC00-\\uDFFF]', ['🎲', 'a🧩b'], ['abc', '★']),
  p('repeated-char', 'extract', '(.)\\1{2,}', ['aaa', 'wooow'], ['aa', 'abc']),
  p('trailing-comma', 'extract', ',\\s*([}\\]])', ['[1,2,]', '{"a":1, }'], ['[1,2]', '{"a":1}']),
  p('markdown-bold', 'extract', '\\*\\*([^*]+)\\*\\*', ['**bold**', 'a **b** c'], ['*italic*', '**unclosed']),
  p('markdown-code', 'extract', '`([^`]+)`', ['`code`', 'use `x` here'], ['plain', '`unclosed']),
  p('quoted-attribute', 'extract', '(\\w+)="([^"]*)"', ['src="a.png"', 'a b="c"'], ['src=a.png', 'plain']),
  p('ansi-escape', 'extract', '\\x1b\\[[0-9;]*m', ['\u001b[31mred\u001b[0m'], ['plain', '[31m']),
];

export const PATTERNS: Pattern[] = [...SYNTAX, ...QUANTIFIER, ...LOOKAROUND, ...VALIDATE, ...EXTRACT];

export const PATTERN_SLUGS = PATTERNS.map(x => x.slug);

export const patternOf = (slug: string): Pattern | undefined => PATTERNS.find(x => x.slug === slug);

export const KINDS: RegexKind[] = ['syntax', 'quantifier', 'lookaround', 'validate', 'extract'];

export const patternsOfKind = (kind: RegexKind): Pattern[] => PATTERNS.filter(x => x.kind === kind);

/** 목록과 공유 카드가 같은 그림을 쓴다 — 이 이모지가 코드 아이콘으로 그려진다 */
export const REGEX_ICON = '🔤';

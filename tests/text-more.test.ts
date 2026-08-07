import { test } from 'node:test';
import assert from 'node:assert/strict';

import {
  maskPersonal, rewrap, toVertical, reverseText, toSlug, romanizeForSlug,
  makeTable, detectDelimiter, DEFAULT_MASK,
} from '../lib/text-more.ts';

/**
 * 텍스트 도구 여섯의 계산 검사.
 *
 * 이 자리가 있는 이유는 lib/text-clean.ts와 같다 — 계산이 컴포넌트 안에 있으면
 * "010-1234-5678을 가리면 뒷자리가 남는가"를 확인할 방법이 없다.
 *
 * 가리기는 특히 조심해야 한다. **덜 가리면 개인정보가 새고, 더 가리면 글이
 * 망가진다.** 그래서 가려야 하는 것과 가리면 안 되는 것을 둘 다 검사한다.
 */

/* ────────── 가리기 ────────── */

test('전화번호는 가운데만 가린다', () => {
  const r = maskPersonal('연락처는 010-1234-5678 입니다', { phone: true, name: false });
  assert.equal(r.text.includes('5678'), true, '뒷자리는 남아야 확인이 된다');
  assert.equal(r.text.includes('1234'), false, '가운데는 가려야 한다');
  assert.equal(r.text.includes('010'), true);
  assert.equal(r.counts.phone, 1);
});

test('붙임표 없는 전화번호도 잡는다', () => {
  const r = maskPersonal('01012345678', { phone: true, name: false });
  assert.equal(r.counts.phone, 1, '01012345678을 못 잡았다');
  assert.equal(r.text.includes('5678'), true);
});

test('주민등록번호는 성별 자리까지만 남긴다', () => {
  const r = maskPersonal('900101-1234567', { rrn: true, name: false, phone: false });
  assert.equal(r.text, '900101-1******');
  assert.equal(r.counts.rrn, 1);
});

test('주민등록번호를 전화번호로 잘못 잡지 않는다', () => {
  // 둘 다 숫자 덩어리라 순서를 잘못 두면 뒷부분이 전화번호로 걸린다.
  const r = maskPersonal('900101-1234567', DEFAULT_MASK);
  assert.equal(r.counts.rrn, 1);
  assert.equal(r.counts.phone, 0, `전화번호로 오인했다: ${r.text}`);
});

test('카드번호는 가운데 여덟 자리를 가린다', () => {
  const r = maskPersonal('1234-5678-9012-3456', { card: true, name: false, phone: false, rrn: false });
  assert.equal(r.text, '1234-****-****-3456');
});

test('이메일은 도메인을 남기고 아이디만 가린다', () => {
  const r = maskPersonal('hello@example.com', { email: true, name: false });
  assert.equal(r.text, 'he***@example.com');
});

test('짧은 이메일 아이디도 한 글자는 남긴다', () => {
  // 전부 가리면 무엇이었는지 알 수 없어 확인용으로 쓸 수 없다.
  const r = maskPersonal('ab@x.com', { email: true, name: false });
  assert.equal(r.text, 'a*@x.com');
});

test('한글 이름은 글자 수에 따라 다르게 가린다', () => {
  const three = maskPersonal('홍길동', { name: true });
  assert.equal(three.text, '홍*동', '세 글자는 가운데를 가린다');
  const two = maskPersonal('김철', { name: true });
  assert.equal(two.text, '김*', '두 글자는 뒷글자를 가린다');
});

test('인사말은 이름으로 보지 않는다', () => {
  // 이름 규칙은 한글 두~네 글자라 인사말이 그대로 걸린다. 걸리면 글이 망가진다.
  for (const word of ['안녕하세요', '감사합니다', '주식회사', '개인정보']) {
    const r = maskPersonal(word, { name: true });
    assert.equal(r.text, word, `${word}를 가려 버렸다`);
  }
});

test('가리는 글자를 바꿀 수 있다', () => {
  const r = maskPersonal('홍길동', { name: true, char: '●' });
  assert.equal(r.text, '홍●동');
});

test('끈 항목은 건드리지 않는다', () => {
  const r = maskPersonal('홍길동 010-1234-5678', { name: false, phone: true });
  assert.equal(r.text.startsWith('홍길동'), true, '이름을 껐는데 가렸다');
  assert.equal(r.counts.name, 0);
});

/* ────────── 줄바꿈 ────────── */

test('폭에 맞춰 접으면 그 폭을 넘는 줄이 없다', () => {
  const long = '가나다라마바사아자차카타파하'.repeat(4);
  const r = rewrap(long, { mode: 'wrap', width: 20, keepWords: false });
  for (const line of r.text.split('\n')) assert.ok(line.length <= 20, `${line.length}자 줄이 남았다`);
  assert.ok(r.lines > 1);
});

test('낱말을 지키며 접으면 낱말이 안 쪼개진다', () => {
  const r = rewrap('alpha bravo charlie delta echo foxtrot golf hotel', { mode: 'wrap', width: 20, keepWords: true });
  for (const line of r.text.split('\n')) {
    for (const w of line.split(' ')) {
      assert.ok('alpha bravo charlie delta echo foxtrot golf hotel'.split(' ').includes(w), `쪼개진 낱말: ${w}`);
    }
  }
});

test('공백이 없어도 접을 수 있다', () => {
  // 한국어는 낱말 사이 공백이 드물다. keepWords를 켜도 접을 자리가 없으면
  // 그냥 잘라야 한다 — 안 그러면 한 줄이 통째로 남아 접은 의미가 없다.
  const r = rewrap('가'.repeat(50), { mode: 'wrap', width: 10, keepWords: true });
  assert.ok(r.lines >= 5, `${r.lines}줄뿐 — 접지 못했다`);
  assert.ok(r.longest <= 10);
});

test('펴면 문단은 살고 문단 안 줄바꿈만 사라진다', () => {
  const src = '첫째 줄\n이어지는 줄\n\n둘째 문단\n이어지는 줄';
  const r = rewrap(src, { mode: 'unwrap', width: 0, keepWords: true });
  assert.equal(r.text, '첫째 줄 이어지는 줄\n\n둘째 문단 이어지는 줄');
  assert.equal(r.lines, 2, '문단이 둘로 남아야 한다');
});

test('접고 펴면 원래 문단으로 돌아온다', () => {
  const src = 'alpha bravo charlie delta echo foxtrot golf hotel india juliet';
  const wrapped = rewrap(src, { mode: 'wrap', width: 20, keepWords: true }).text;
  const back = rewrap(wrapped, { mode: 'unwrap', width: 0, keepWords: true }).text;
  assert.equal(back, src);
});

/* ────────── 세로쓰기 ────────── */

test('세로로 세우면 줄 수와 글자 수가 바뀐다', () => {
  const r = toVertical('가나다', { gap: 0, rightToLeft: false });
  assert.equal(r, '가\n나\n다');
});

test('여러 줄은 나란한 세로줄이 된다', () => {
  const r = toVertical('가나다\n라마바', { gap: 1, rightToLeft: false });
  assert.equal(r, '가 라\n나 마\n다 바');
});

test('짧은 줄이 오른쪽에 있어도 세로 정렬이 안 어긋난다', () => {
  const r = toVertical('가나다\n라', { gap: 1, rightToLeft: false }).split('\n');
  assert.equal(r[0], '가 라');
  assert.equal(r[1], '나', '빈자리 뒤 공백은 지운다');
  assert.equal(r.length, 3);
});

test('짧은 줄이 왼쪽에 있으면 그 자리를 공백으로 채운다', () => {
  /*
   * 여기가 실제로 어긋나는 자리다. 짧은 줄이 오른쪽이면 빈칸이 줄 끝이라
   * trimEnd가 지워 버려서 채우든 안 채우든 결과가 같다. **왼쪽일 때만**
   * 채우지 않은 것이 드러난다 — 아랫줄이 왼쪽으로 밀려 세로줄이 어긋난다.
   */
  const r = toVertical('라\n가나다', { gap: 1, rightToLeft: false }).split('\n');
  assert.equal(r[0], '라 가');
  assert.equal(r[1], '  나', '왼쪽 빈자리를 안 채워 아랫줄이 밀렸다');
  assert.equal(r[2], '  다');
});

test('오른쪽에서 왼쪽으로 세우면 줄 차례가 뒤집힌다', () => {
  const r = toVertical('가나\n다라', { gap: 1, rightToLeft: true });
  assert.equal(r, '다 가\n라 나');
});

/* ────────── 뒤집기 ────────── */

test('글자 단위로 뒤집는다', () => {
  assert.equal(reverseText('안녕하세요', 'char'), '요세하녕안');
});

test('이모지가 깨지지 않는다', () => {
  // split('')은 서로게이트 쌍을 쪼개 깨뜨린다. [...s]는 코드포인트 단위다.
  const out = reverseText('a🎉b', 'char');
  assert.equal(out, 'b🎉a');
  assert.equal([...out].length, 3);
});

test('낱말 단위로 뒤집으면 낱말 안은 그대로다', () => {
  assert.equal(reverseText('one two three', 'word'), 'three two one');
});

test('줄 단위로 뒤집으면 줄 차례만 바뀐다', () => {
  assert.equal(reverseText('1\n2\n3', 'line'), '3\n2\n1');
});

test('두 번 뒤집으면 원래대로 돌아온다', () => {
  for (const unit of ['char', 'word', 'line'] as const) {
    const src = 'one two three\nfour five six';
    assert.equal(reverseText(reverseText(src, unit), unit), src, `${unit}에서 안 돌아왔다`);
  }
});

/* ────────── 슬러그 ────────── */

test('한글을 로마자로 옮긴다', () => {
  assert.equal(romanizeForSlug('한글'), 'hangeul');
  assert.equal(romanizeForSlug('안녕'), 'annyeong');
});

test('슬러그는 소문자와 하이픈만 남는다', () => {
  const s = toSlug('안녕하세요 世界! Hello World');
  assert.match(s, /^[a-z0-9一-鿿-]+$/, `이상한 글자가 남았다: ${s}`);
  assert.equal(s.includes(' '), false);
  assert.equal(s.includes('!'), false);
});

test('하이픈이 이어지거나 앞뒤에 붙지 않는다', () => {
  const s = toSlug('  hello --- world!!  ');
  assert.equal(s, 'hello-world');
});

test('발음 부호를 떼어 낸다', () => {
  assert.equal(toSlug('Café Münster'), 'cafe-munster');
});

test('구분자를 밑줄로 바꿀 수 있다', () => {
  assert.equal(toSlug('hello world', { separator: '_', lower: true, romanize: true, maxLength: 0 }), 'hello_world');
});

test('길이를 자를 때 낱말 중간에서 끊지 않는다', () => {
  const s = toSlug('alpha bravo charlie delta', { separator: '-', lower: true, romanize: true, maxLength: 14 });
  assert.equal(s, 'alpha-bravo');
  assert.ok(s.length <= 14);
});

test('로마자 변환을 끄면 한글이 남는다', () => {
  const s = toSlug('한글 주소', { separator: '-', lower: true, romanize: false, maxLength: 0 });
  assert.equal(s, '한글-주소');
});

/* ────────── 표 ────────── */

test('구분자를 스스로 알아본다', () => {
  assert.equal(detectDelimiter(['a\tb\tc', 'd\te\tf']), 'tab');
  assert.equal(detectDelimiter(['a,b,c', 'd,e,f']), 'comma');
});

test('줄마다 개수가 고른 쪽을 고른다', () => {
  // 쉼표가 한 줄에만 있으면 그건 구분자가 아니라 글의 일부다.
  assert.equal(detectDelimiter(['a\tb', 'c, and d\te']), 'tab');
});

test('마크다운 표는 제목 줄과 구분선을 갖춘다', () => {
  const r = makeTable('이름\t나이\n김철수\t30', { input: 'auto', format: 'markdown', header: true, align: false });
  const lines = r.text.split('\n');
  assert.equal(lines[0], '| 이름 | 나이 |');
  assert.match(lines[1], /^\|\s*-{3,}\s*\|\s*-{3,}\s*\|$/);
  assert.equal(lines[2], '| 김철수 | 30 |');
  assert.equal(r.rows, 2);
  assert.equal(r.cols, 2);
});

test('제목 줄이 없으면 열 이름을 만들어 준다', () => {
  const r = makeTable('a\tb', { input: 'tab', format: 'markdown', header: false, align: false });
  assert.equal(r.text.split('\n')[0], '| 열1 | 열2 |');
  assert.ok(r.text.includes('| a | b |'), '자료 줄이 사라졌다');
});

test('칸 안의 세로줄을 벗겨 표가 안 깨진다', () => {
  const r = makeTable('a|b\tc', { input: 'tab', format: 'markdown', header: true, align: false });
  assert.ok(r.text.includes('a\\|b'), `세로줄을 안 벗겼다: ${r.text}`);
});

test('줄마다 칸 수가 달라도 어긋나지 않는다', () => {
  const r = makeTable('a\tb\tc\nd\te', { input: 'tab', format: 'markdown', header: true, align: false });
  assert.equal(r.cols, 3);
  for (const line of r.text.split('\n')) {
    assert.equal((line.match(/\|/g) ?? []).length, 4, `칸 수가 어긋난 줄: ${line}`);
  }
});

test('CSV로 낼 때 쉼표가 든 칸은 따옴표로 감싼다', () => {
  const r = makeTable('a, and b\tc', { input: 'tab', format: 'csv', header: false, align: false });
  assert.equal(r.text, '"a, and b",c');
});

test('HTML은 제목 줄만 th가 된다', () => {
  const r = makeTable('이름\t나이\n김철수\t30', { input: 'tab', format: 'html', header: true, align: false });
  assert.equal((r.text.match(/<th>/g) ?? []).length, 2);
  assert.equal((r.text.match(/<td>/g) ?? []).length, 2);
});

test('칸 너비를 맞추면 소스도 표처럼 보인다', () => {
  const r = makeTable('가\t나\n아주긴이름\t짧다', { input: 'tab', format: 'markdown', header: true, align: true });
  const lens = r.text.split('\n').map(l => l.length);
  assert.equal(new Set(lens).size, 1, `줄 길이가 제각각이다: ${lens.join(', ')}`);
});

test('빈 입력은 빈 결과를 준다', () => {
  const r = makeTable('   \n\n', { input: 'auto', format: 'markdown', header: true, align: false });
  assert.equal(r.text, '');
  assert.equal(r.rows, 0);
});

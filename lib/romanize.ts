/**
 * 국어의 로마자 표기법 — 사람 이름 기준.
 *
 * 규정에는 "인명은 음운 변화를 표기에 반영하지 않는다"는 조항이 있다. 그래서
 * 이름은 음절 하나하나를 독립적으로 옮긴다 — 홍빛나는 발음이 [홍빈나]여도
 * Hong Bitna로 적는다. 지명(신라 Silla)과 갈리는 지점이 바로 여기라서, 이
 * 모듈은 이름 전용으로만 쓴다.
 *
 * 성은 규정도 "따로 정하되 관용을 인정한다"고 열어 두었다. 실제로 여권에는
 * 이(Lee)·박(Park)·김(Kim)처럼 표기법과 다른 관용형이 압도적으로 많이 쓰이므로,
 * 표기법대로의 값과 관용형을 둘 다 보여주고 고르게 한다.
 */
// 확장자를 적는다 — tests/가 node로 이 파일을 직접 불러오기 때문이다(다른 lib도 같은 규칙)
import { splitSyllable } from './hangul.ts';

const CHO_ROMAN: Record<string, string> = {
  ㄱ: 'g', ㄲ: 'kk', ㄴ: 'n', ㄷ: 'd', ㄸ: 'tt', ㄹ: 'r', ㅁ: 'm', ㅂ: 'b', ㅃ: 'pp',
  ㅅ: 's', ㅆ: 'ss', ㅇ: '', ㅈ: 'j', ㅉ: 'jj', ㅊ: 'ch', ㅋ: 'k', ㅌ: 't', ㅍ: 'p', ㅎ: 'h',
};

const JUNG_ROMAN: Record<string, string> = {
  ㅏ: 'a', ㅐ: 'ae', ㅑ: 'ya', ㅒ: 'yae', ㅓ: 'eo', ㅔ: 'e', ㅕ: 'yeo', ㅖ: 'ye',
  ㅗ: 'o', ㅘ: 'wa', ㅙ: 'wae', ㅚ: 'oe', ㅛ: 'yo', ㅜ: 'u', ㅝ: 'wo', ㅞ: 'we',
  ㅟ: 'wi', ㅠ: 'yu', ㅡ: 'eu', ㅢ: 'ui', ㅣ: 'i',
};

const JONG_ROMAN: Record<string, string> = {
  '': '', ㄱ: 'k', ㄲ: 'k', ㄳ: 'k', ㄴ: 'n', ㄵ: 'n', ㄶ: 'n', ㄷ: 't', ㄹ: 'l',
  ㄺ: 'k', ㄻ: 'm', ㄼ: 'l', ㄽ: 'l', ㄾ: 'l', ㄿ: 'p', ㅀ: 'l', ㅁ: 'm', ㅂ: 'p',
  ㅄ: 'p', ㅅ: 't', ㅆ: 't', ㅇ: 'ng', ㅈ: 't', ㅊ: 't', ㅋ: 'k', ㅌ: 't', ㅍ: 'p', ㅎ: 't',
};

/**
 * 여권에서 압도적으로 많이 쓰이는 성 표기.
 * 표기법대로면 이=I, 박=Bak, 최=Choe지만 실제로 그렇게 쓰는 사람은 드물다.
 */
const FAMILY_COMMON: Record<string, string> = {
  김: 'Kim', 이: 'Lee', 박: 'Park', 최: 'Choi', 정: 'Jung', 강: 'Kang', 조: 'Cho',
  윤: 'Yoon', 장: 'Jang', 임: 'Lim', 한: 'Han', 오: 'Oh', 서: 'Seo', 신: 'Shin',
  권: 'Kwon', 황: 'Hwang', 안: 'Ahn', 송: 'Song', 전: 'Jeon', 홍: 'Hong', 유: 'Yoo',
  고: 'Ko', 문: 'Moon', 양: 'Yang', 손: 'Son', 배: 'Bae', 백: 'Baek', 허: 'Heo',
  남: 'Nam', 심: 'Shim', 노: 'Noh', 하: 'Ha', 곽: 'Kwak', 성: 'Sung', 차: 'Cha',
  주: 'Joo', 우: 'Woo', 구: 'Koo', 민: 'Min', 진: 'Jin', 지: 'Ji', 엄: 'Eom',
  채: 'Chae', 원: 'Won', 천: 'Cheon', 방: 'Bang', 공: 'Kong', 현: 'Hyun', 함: 'Ham',
  변: 'Byun', 염: 'Yeom', 여: 'Yeo', 추: 'Chu', 도: 'Do', 소: 'So', 석: 'Seok',
  설: 'Seol', 마: 'Ma', 길: 'Gil', 연: 'Yeon', 위: 'Wi', 표: 'Pyo', 명: 'Myung',
  기: 'Ki', 반: 'Ban', 라: 'Ra', 왕: 'Wang', 금: 'Keum', 옥: 'Ok', 육: 'Yook',
  인: 'In', 맹: 'Maeng', 제: 'Je', 모: 'Mo', 류: 'Ryu', 나: 'Na', 신의: 'Shin',
};

/** 두 글자 성 — 남궁민수를 "남 궁민수"로 자르면 안 된다 */
const TWO_LETTER_FAMILY: Record<string, string> = {
  남궁: 'Namgoong', 황보: 'Hwangbo', 선우: 'Sunwoo', 제갈: 'Jegal',
  사공: 'Sagong', 서문: 'Seomun', 독고: 'Dokgo', 동방: 'Dongbang',
};

const upperFirst = (s: string) => (s ? s[0].toUpperCase() + s.slice(1) : s);

/** 음절 하나를 로마자로. 앞 음절의 받침을 받아 ㄹㄹ만 예외 처리한다. */
function syllable(ch: string, prevJong: string): { text: string; jong: string } {
  const parts = splitSyllable(ch);
  if (!parts) return { text: ch, jong: '' };
  // 울릉 Ulleung — ㄹ 받침 뒤의 ㄹ은 r이 아니라 l이다
  const cho = prevJong === 'ㄹ' && parts.cho === 'ㄹ' ? 'l' : CHO_ROMAN[parts.cho] ?? '';
  return {
    text: cho + (JUNG_ROMAN[parts.jung] ?? '') + (JONG_ROMAN[parts.jong] ?? ''),
    jong: parts.jong,
  };
}

/** 한글 문자열을 표기법대로 옮긴다(음운 변화 미반영). */
export function romanize(text: string): string {
  let out = '';
  let prevJong = '';
  for (const ch of text) {
    const r = syllable(ch, prevJong);
    out += r.text;
    prevJong = r.jong;
  }
  return out;
}

export interface NameRoman {
  /** 성 */
  family: string;
  /** 이름 */
  given: string;
  /** 표기법대로: "Hong Gildong" */
  standard: string;
  /** 성만 관용 표기: "Lee Jieun" */
  common: string;
  /** 이름에 붙임표: "Lee Ji-eun" */
  hyphen: string;
  /** 여권 표기(전부 대문자): "LEE JIEUN" */
  passport: string;
  /** 성의 관용 표기가 표기법과 다른가 */
  familyDiffers: boolean;
}

/**
 * 이름을 성과 이름으로 나눈다.
 *
 * 공백이 있으면 그대로 믿고, 없으면 두 글자 성부터 맞춰 본 뒤 한 글자로 자른다.
 * "남궁민수"를 성 한 글자로 자르면 "남 궁민수"가 되어버린다.
 */
export function splitName(input: string): { family: string; given: string } {
  const name = input.trim().replace(/\s+/g, ' ');
  if (!name) return { family: '', given: '' };

  const spaced = name.split(' ');
  if (spaced.length >= 2) {
    return { family: spaced[0], given: spaced.slice(1).join('') };
  }
  const two = name.slice(0, 2);
  if (TWO_LETTER_FAMILY[two] && name.length > 2) {
    return { family: two, given: name.slice(2) };
  }
  return { family: name.slice(0, 1), given: name.slice(1) };
}

export function romanizeName(input: string): NameRoman | null {
  const { family, given } = splitName(input);
  if (!family) return null;

  const familyStandard = upperFirst(romanize(family));
  const familyCommon = TWO_LETTER_FAMILY[family] ?? FAMILY_COMMON[family] ?? familyStandard;
  const givenStandard = upperFirst(romanize(given));

  // 붙임표는 음절 경계마다 — 지은 → Ji-eun. 규정이 허용하는 표기다.
  const givenHyphen = [...given]
    .map((ch, i) => {
      const r = syllable(ch, i === 0 ? '' : (splitSyllable(given[i - 1])?.jong ?? ''));
      return r.text;
    })
    .filter(Boolean)
    .join('-');

  const compose = (f: string, g: string) => (g ? `${f} ${g}` : f);

  return {
    family,
    given,
    standard: compose(familyStandard, givenStandard),
    common: compose(familyCommon, givenStandard),
    hyphen: compose(familyCommon, upperFirst(givenHyphen)),
    passport: compose(familyCommon, givenStandard).toUpperCase(),
    familyDiffers: familyCommon !== familyStandard,
  };
}

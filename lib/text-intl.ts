/**
 * 텍스트 도구가 쓰는 데이터(기호 이름·분류)의 세 언어 이름표.
 *
 * 기호 자체는 언어와 무관하므로 lib/special-chars.ts를 그대로 쓰고, 검색에 쓰이는
 * 이름만 여기서 갈아 끼운다 — 이름이 없으면 "화살표"나 "arrow"로 찾을 수 없다.
 *
 * 이모티콘은 한글 자모로 만든 것(ㅎㅎ, ㅠㅠ, ㅇㅅㅇ)이 섞여 있다. 영어·중국어
 * 화면에서는 그걸 복사해도 쓸 데가 없으므로 걸러낸다.
 */
export type TextLang = 'ko' | 'en';

/** 기호 분류 라벨 — CHAR_GROUPS의 id를 열쇠로 쓴다 */
export const CHAR_GROUP_INTL: Record<TextLang, Record<string, string>> = {
  ko: {
    arrow: '화살표', shape: '도형·별', punct: '문장부호·괄호', math: '수학·단위',
    money: '화폐', circle: '번호·원문자', greek: '그리스 문자', misc: '기타 기호',
  },
  en: {
    arrow: 'Arrows', shape: 'Shapes & stars', punct: 'Punctuation & brackets', math: 'Maths & units',
    money: 'Currency', circle: 'Numbers & enclosed', greek: 'Greek letters', misc: 'Other symbols',
  },
};

/** 이모티콘 분류 라벨 */
export const EMOTICON_GROUP_INTL: Record<TextLang, Record<string, string>> = {
  ko: {
    happy: '기쁨·웃음', sad: '슬픔·눈물', angry: '화남·당황',
    shrug: '무표정·시크', love: '사랑·부탁', action: '동작·기타',
  },
  en: {
    happy: 'Happy', sad: 'Sad', angry: 'Angry & flustered',
    shrug: 'Deadpan', love: 'Love & pleading', action: 'Actions & other',
  },
};

/**
 * 기호 검색 이름 — 한국어 이름을 열쇠로 쓴다.
 *
 * 번역이 아니라 그 언어에서 실제로 검색할 말로 적는다. 영어에서 ※를 찾는
 * 사람은 'reference mark'라고 치고, 중국어에서는 '参考标记'라고 친다.
 */
export const CHAR_NAME_INTL: Record<'en', Record<string, string>> = {
  en: {
    '오른쪽 화살표': 'right arrow', '왼쪽 화살표': 'left arrow', '위쪽 화살표': 'up arrow',
    '아래쪽 화살표': 'down arrow', '좌우 화살표': 'left right arrow', '상하 화살표': 'up down arrow',
    '두 줄 오른쪽': 'double right arrow', '두 줄 왼쪽': 'double left arrow', '두 줄 위': 'double up arrow',
    '두 줄 아래': 'double down arrow', '두 줄 좌우': 'double left right arrow', '굵은 화살표': 'heavy arrow',
    '가는 화살표': 'thin arrow', '삼각 화살표': 'triangle arrow', '꺾인 화살표 답글': 'reply arrow hook',
    '왼쪽 꺾임': 'left hook arrow', '위로 꺾임': 'up hook arrow', '아래로 꺾임': 'down hook arrow',
    '반시계 회전': 'anticlockwise arrow', '시계 회전': 'clockwise arrow',
    '재생 오른쪽 삼각': 'play right triangle', '왼쪽 삼각': 'left triangle',
    '위 삼각': 'up triangle', '아래 삼각': 'down triangle',
    '검은 별': 'black star', '흰 별': 'white star', '하트 채움': 'filled heart', '하트 빈': 'outline heart',
    '검은 사각형': 'black square', '흰 사각형': 'white square', '겹 사각형': 'nested square',
    '무늬 사각형': 'patterned square', '검은 원': 'black circle', '흰 원': 'white circle',
    '겹 원': 'nested circle', '과녁': 'bullseye target',
    '검은 마름모': 'black diamond shape', '흰 마름모': 'white diamond shape',
    '흰 삼각형': 'white triangle', '역삼각형': 'inverted triangle',
    '스페이드': 'spade', '클로버': 'club', '다이아': 'diamond suit', '빈 클로버': 'outline club',
    '작은 검은 사각': 'small black square', '작은 흰 사각': 'small white square',
    '겹 마름모': 'nested diamond', '반짝임': 'sparkle',
    '가운뎃점': 'middle dot interpunct', '말줄임표': 'ellipsis', '두 점 줄임': 'two dot leader',
    '줄표 대시': 'dash', '엔 대시': 'en dash', '엠 대시': 'em dash', '물결표': 'tilde wave dash',
    '참고 표시 쌀미': 'reference mark', '홑낫표 열기': 'corner bracket open', '홑낫표 닫기': 'corner bracket close',
    '겹낫표 열기': 'double corner bracket open', '겹낫표 닫기': 'double corner bracket close',
    '홑화살괄호 열기': 'single angle bracket open', '홑화살괄호 닫기': 'single angle bracket close',
    '겹화살괄호 열기': 'double angle bracket open', '겹화살괄호 닫기': 'double angle bracket close',
    '검은 대괄호 열기': 'black lenticular bracket open', '검은 대괄호 닫기': 'black lenticular bracket close',
    '거북 괄호 열기': 'tortoise shell bracket open', '거북 괄호 닫기': 'tortoise shell bracket close',
    '큰따옴표 열기': 'left double quote', '큰따옴표 닫기': 'right double quote',
    '작은따옴표 열기': 'left single quote', '작은따옴표 닫기': 'right single quote',
    '섹션 절': 'section sign', '문단': 'pilcrow paragraph', '단검표': 'dagger', '겹단검표': 'double dagger',
    '플러스마이너스': 'plus minus', '곱하기': 'multiplication times', '나누기': 'division obelus',
    '같지 않음': 'not equal', '작거나 같음': 'less than or equal', '크거나 같음': 'greater than or equal',
    '근사값 거의 같음': 'approximately equal', '무한대': 'infinity',
    '루트 제곱근': 'square root radical', '시그마 합': 'summation sigma', '적분': 'integral',
    '파이 곱': 'product pi', '그러므로': 'therefore', '왜냐하면': 'because',
    '각': 'angle', '수직': 'perpendicular', '평행': 'parallel', '원소': 'element of',
    '도 각도': 'degree', '퍼밀 천분율': 'per mille',
    '섭씨 도': 'degrees celsius', '화씨 도': 'degrees fahrenheit',
    '제곱미터': 'square metre', '세제곱미터': 'cubic metre', '킬로그램': 'kilogram',
    '센티미터': 'centimetre', '킬로미터': 'kilometre', '밀리리터': 'millilitre',
    '원 대한민국': 'won korea', '달러': 'dollar', '유로': 'euro', '엔 위안': 'yen yuan',
    '파운드': 'pound sterling', '센트': 'cent', '루블': 'ruble', '루피': 'rupee',
    '바트': 'baht', '동 베트남': 'dong vietnam', '페소': 'peso', '비트코인': 'bitcoin',
    '원 숫자 1': 'circled one', '원 숫자 2': 'circled two', '원 숫자 3': 'circled three',
    '원 숫자 4': 'circled four', '원 숫자 5': 'circled five', '원 숫자 6': 'circled six',
    '원 숫자 7': 'circled seven', '원 숫자 8': 'circled eight', '원 숫자 9': 'circled nine',
    '원 숫자 10': 'circled ten',
    '원 기역': 'circled hangul giyeok', '원 니은': 'circled hangul nieun',
    '원 디귿': 'circled hangul digeut', '원 리을': 'circled hangul rieul',
    '괄호 1': 'parenthesised one', '괄호 2': 'parenthesised two', '괄호 3': 'parenthesised three',
    '주식회사': 'company limited',
    '로마 숫자 1': 'roman numeral one', '로마 숫자 2': 'roman numeral two',
    '로마 숫자 3': 'roman numeral three', '로마 숫자 4': 'roman numeral four',
    '로마 숫자 5': 'roman numeral five', '로마 숫자 10': 'roman numeral ten',
    '알파': 'alpha', '베타': 'beta', '감마': 'gamma', '델타': 'delta', '엡실론': 'epsilon',
    '세타': 'theta', '람다': 'lambda', '뮤 마이크로': 'mu micro', '파이': 'pi', '시그마': 'sigma',
    '타우': 'tau', '피': 'phi', '오메가': 'omega',
    '대문자 델타': 'capital delta', '대문자 시그마': 'capital sigma',
    '대문자 오메가': 'capital omega', '대문자 피': 'capital phi', '프사이': 'psi',
    '체크 표시': 'check mark tick', '가는 체크': 'thin check mark', '엑스 표시': 'cross mark x',
    '굵은 엑스': 'heavy cross mark', '전화': 'telephone', '수화기': 'handset',
    '편지 메일': 'envelope mail', '가위': 'scissors', '비행기': 'airplane',
    '왼쪽 손가락': 'pointing left hand', '오른쪽 손가락': 'pointing right hand',
    '음표': 'musical note', '두 음표': 'beamed notes', '플랫': 'flat sign', '샵': 'sharp sign',
    '해 맑음': 'sun clear weather', '구름 흐림': 'cloud overcast', '우산 비': 'umbrella rain',
    '눈사람': 'snowman', '경고': 'warning', '재활용': 'recycling',
    '꽃': 'flower', '꽃 무늬': 'floral ornament', '태극': 'yin yang taegeuk',
  },
};

/** 한글 자모만으로 만든 이모티콘 — ㅎㅎ, ㅠㅠ, ㅇㅅㅇ 같은 것 */
const HANGUL_JAMO = /[ㄱ-ㆎ가-힣]/;

/**
 * 이모티콘에서 한글 자모가 든 것을 걸러낸다.
 *
 * 한국어 화면에서는 그대로 두고, 영어·중국어에서는 뺀다 — 자모 이모티콘은
 * 한글을 읽는 사람에게만 뜻이 통하고, 다른 언어에서는 그냥 깨진 글자로 보인다.
 */
export function emoticonsFor(items: string[], lang: TextLang): string[] {
  if (lang === 'ko') return items;
  return items.filter(e => !HANGUL_JAMO.test(e));
}

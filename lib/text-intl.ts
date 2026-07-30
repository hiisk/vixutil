/**
 * 텍스트 도구가 쓰는 데이터(기호 이름·분류)의 세 언어 이름표.
 *
 * 기호 자체는 언어와 무관하므로 lib/special-chars.ts를 그대로 쓰고, 검색에 쓰이는
 * 이름만 여기서 갈아 끼운다 — 이름이 없으면 "화살표"나 "arrow"로 찾을 수 없다.
 *
 * 이모티콘은 한글 자모로 만든 것(ㅎㅎ, ㅠㅠ, ㅇㅅㅇ)이 섞여 있다. 영어·중국어
 * 화면에서는 그걸 복사해도 쓸 데가 없으므로 걸러낸다.
 */
export type TextLang = 'ko' | 'en' | 'zh';

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
  zh: {
    arrow: '箭头', shape: '图形与星形', punct: '标点与括号', math: '数学与单位',
    money: '货币', circle: '数字与带圈字符', greek: '希腊字母', misc: '其他符号',
  },
};

/** 이모티콘 분류 라벨 */
export const EMOTICON_GROUP_INTL: Record<TextLang, Record<string, string>> = {
  ko: {
    happy: '기쁨·웃음', sad: '슬픔·눈물', angry: '화남·당황',
    blank: '무표정·시크', love: '사랑·부탁', action: '동작·기타',
  },
  en: {
    happy: 'Happy', sad: 'Sad', angry: 'Angry & flustered',
    blank: 'Deadpan', love: 'Love & pleading', action: 'Actions & other',
  },
  zh: {
    happy: '开心与笑', sad: '难过与流泪', angry: '生气与慌乱',
    blank: '面无表情', love: '爱与求人', action: '动作与其他',
  },
};

/**
 * 기호 검색 이름 — 한국어 이름을 열쇠로 쓴다.
 *
 * 번역이 아니라 그 언어에서 실제로 검색할 말로 적는다. 영어에서 ※를 찾는
 * 사람은 'reference mark'라고 치고, 중국어에서는 '参考标记'라고 친다.
 */
export const CHAR_NAME_INTL: Record<'en' | 'zh', Record<string, string>> = {
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
  zh: {
    '오른쪽 화살표': '右箭头', '왼쪽 화살표': '左箭头', '위쪽 화살표': '上箭头',
    '아래쪽 화살표': '下箭头', '좌우 화살표': '左右箭头', '상하 화살표': '上下箭头',
    '두 줄 오른쪽': '双线右箭头', '두 줄 왼쪽': '双线左箭头', '두 줄 위': '双线上箭头',
    '두 줄 아래': '双线下箭头', '두 줄 좌우': '双线左右箭头', '굵은 화살표': '粗箭头',
    '가는 화살표': '细箭头', '삼각 화살표': '三角箭头', '꺾인 화살표 답글': '回复弯箭头',
    '왼쪽 꺾임': '左弯箭头', '위로 꺾임': '上弯箭头', '아래로 꺾임': '下弯箭头',
    '반시계 회전': '逆时针箭头', '시계 회전': '顺时针箭头',
    '재생 오른쪽 삼각': '播放右三角', '왼쪽 삼각': '左三角',
    '위 삼각': '上三角', '아래 삼각': '下三角',
    '검은 별': '实心星', '흰 별': '空心星', '하트 채움': '实心心形', '하트 빈': '空心心形',
    '검은 사각형': '实心方块', '흰 사각형': '空心方块', '겹 사각형': '双层方块',
    '무늬 사각형': '花纹方块', '검은 원': '实心圆', '흰 원': '空心圆',
    '겹 원': '双层圆', '과녁': '靶心',
    '검은 마름모': '实心菱形', '흰 마름모': '空心菱形',
    '흰 삼각형': '空心三角', '역삼각형': '倒三角',
    '스페이드': '黑桃', '클로버': '梅花', '다이아': '方块', '빈 클로버': '空心梅花',
    '작은 검은 사각': '小实心方块', '작은 흰 사각': '小空心方块',
    '겹 마름모': '双层菱形', '반짝임': '闪光',
    '가운뎃점': '间隔号', '말줄임표': '省略号', '두 점 줄임': '双点前导符',
    '줄표 대시': '短横线', '엔 대시': '半角破折号', '엠 대시': '破折号', '물결표': '波浪号',
    '참고 표시 쌀미': '参考标记', '홑낫표 열기': '单直角引号左', '홑낫표 닫기': '单直角引号右',
    '겹낫표 열기': '双直角引号左', '겹낫표 닫기': '双直角引号右',
    '홑화살괄호 열기': '单书名号左', '홑화살괄호 닫기': '单书名号右',
    '겹화살괄호 열기': '双书名号左', '겹화살괄호 닫기': '双书名号右',
    '검은 대괄호 열기': '实心方头括号左', '검은 대괄호 닫기': '实心方头括号右',
    '거북 괄호 열기': '龟甲括号左', '거북 괄호 닫기': '龟甲括号右',
    '큰따옴표 열기': '左双引号', '큰따옴표 닫기': '右双引号',
    '작은따옴표 열기': '左单引号', '작은따옴표 닫기': '右单引号',
    '섹션 절': '章节号', '문단': '段落符', '단검표': '剑标', '겹단검표': '双剑标',
    '플러스마이너스': '正负号', '곱하기': '乘号', '나누기': '除号',
    '같지 않음': '不等号', '작거나 같음': '小于等于', '크거나 같음': '大于等于',
    '근사값 거의 같음': '约等于', '무한대': '无穷',
    '루트 제곱근': '根号', '시그마 합': '求和西格玛', '적분': '积分',
    '파이 곱': '连乘', '그러므로': '所以', '왜냐하면': '因为',
    '각': '角', '수직': '垂直', '평행': '平行', '원소': '属于',
    '도 각도': '度', '퍼밀 천분율': '千分号',
    '섭씨 도': '摄氏度', '화씨 도': '华氏度',
    '제곱미터': '平方米', '세제곱미터': '立方米', '킬로그램': '千克',
    '센티미터': '厘米', '킬로미터': '千米', '밀리리터': '毫升',
    '원 대한민국': '韩元', '달러': '美元', '유로': '欧元', '엔 위안': '日元 人民币',
    '파운드': '英镑', '센트': '分币', '루블': '卢布', '루피': '卢比',
    '바트': '泰铢', '동 베트남': '越南盾', '페소': '比索', '비트코인': '比特币',
    '원 숫자 1': '带圈一', '원 숫자 2': '带圈二', '원 숫자 3': '带圈三',
    '원 숫자 4': '带圈四', '원 숫자 5': '带圈五', '원 숫자 6': '带圈六',
    '원 숫자 7': '带圈七', '원 숫자 8': '带圈八', '원 숫자 9': '带圈九',
    '원 숫자 10': '带圈十',
    '원 기역': '带圈韩文 giyeok', '원 니은': '带圈韩文 nieun',
    '원 디귿': '带圈韩文 digeut', '원 리을': '带圈韩文 rieul',
    '괄호 1': '括号一', '괄호 2': '括号二', '괄호 3': '括号三',
    '주식회사': '株式会社',
    '로마 숫자 1': '罗马数字一', '로마 숫자 2': '罗马数字二',
    '로마 숫자 3': '罗马数字三', '로마 숫자 4': '罗马数字四',
    '로마 숫자 5': '罗马数字五', '로마 숫자 10': '罗马数字十',
    '알파': 'alpha 阿尔法', '베타': 'beta 贝塔', '감마': 'gamma 伽马', '델타': 'delta 德尔塔',
    '엡실론': 'epsilon 艾普西龙', '세타': 'theta 西塔', '람다': 'lambda 兰姆达',
    '뮤 마이크로': 'mu 微', '파이': 'pi 派', '시그마': 'sigma 西格玛',
    '타우': 'tau 陶', '피': 'phi 斐', '오메가': 'omega 欧米伽',
    '대문자 델타': '大写德尔塔', '대문자 시그마': '大写西格玛',
    '대문자 오메가': '大写欧米伽', '대문자 피': '大写斐', '프사이': 'psi 普赛',
    '체크 표시': '对勾', '가는 체크': '细对勾', '엑스 표시': '叉号',
    '굵은 엑스': '粗叉号', '전화': '电话', '수화기': '听筒',
    '편지 메일': '信封 邮件', '가위': '剪刀', '비행기': '飞机',
    '왼쪽 손가락': '左指手', '오른쪽 손가락': '右指手',
    '음표': '音符', '두 음표': '双音符', '플랫': '降号', '샵': '升号',
    '해 맑음': '太阳 晴', '구름 흐림': '云 阴', '우산 비': '雨伞 雨',
    '눈사람': '雪人', '경고': '警告', '재활용': '回收',
    '꽃': '花', '꽃 무늬': '花纹', '태극': '阴阳 太极',
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

/**
 * 텍스트 도구(/text) 섹션의 도구 메타데이터.
 *
 * 이 섹션의 전제: 한글을 다루다 보면 생기는 잔일들 — 한/영 잘못 친 문장,
 * 여권에 적을 영문 이름, 계약서의 한글 금액, 어디선가 복사해 와서 이상한
 * 공백이 섞인 글 — 을 한 곳에서 끝낸다. 전부 문자열 처리라 서버가 필요 없다.
 *
 * 목록·검색·사이트맵·상세 셸에 필요한 메타만 둔다.
 * 실제 화면은 components/text/*.tsx가 슬러그별로 담당한다.
 */
export interface TextTool {
  slug: string;
  title: string;
  desc: string;
  icon: string;
  category: string;
  gradient: string;
  og: [string, string];
  long: string;
  metaTitle: string;
  features: string[];
}

export const TEXT_TOOLS: TextTool[] = [
  {
    slug: 'hanyoung',
    title: '한영타 변환기',
    desc: '한/영 안 바꾸고 친 글자를 되돌립니다',
    icon: '⌨️',
    category: '한글 변환',
    gradient: 'from-blue-500 to-indigo-600',
    og: ['#3b82f6', '#4f46e5'],
    metaTitle: '한영타 변환기 - dkssud를 안녕으로 되돌리기',
    long: '한/영 키를 안 누르고 친 "dkssudgktpdy"를 "안녕하세요"로, 반대로 "ㅇㅍ햐"를 "avoid"로 되돌립니다. 방향은 입력한 글자를 보고 알아서 잡아주며, 두벌식 자판 기준으로 변환합니다.',
    features: ['영타 → 한글, 한글 → 영타 양방향', '방향 자동 감지', '된소리·겹받침·겹모음 정확히 처리', '결과 한 번에 복사'],
  },
  {
    slug: 'romanize',
    title: '영문 이름 변환',
    desc: '여권·명함에 쓸 이름의 로마자 표기',
    icon: '🛂',
    category: '한글 변환',
    gradient: 'from-emerald-500 to-teal-600',
    og: ['#10b981', '#0d9488'],
    metaTitle: '영문 이름 변환 - 여권 로마자 표기 만들기',
    long: '국어의 로마자 표기법대로 옮긴 표기와, 여권에서 실제로 많이 쓰는 관용 표기(이 Lee, 박 Park, 최 Choi)를 함께 보여줍니다. 이름을 붙여 쓴 형태와 붙임표를 넣은 형태 모두 확인할 수 있습니다.',
    features: ['표기법 표기와 여권 관용 표기 비교', '성·이름 자동 분리(두 글자 성 포함)', '붙임표(Gil-dong) 표기 제공', '여권용 대문자 표기'],
  },
  {
    slug: 'initial',
    title: '초성 변환기',
    desc: '문장을 초성만 남겨 퀴즈로 만듭니다',
    icon: '🔤',
    category: '한글 변환',
    gradient: 'from-violet-500 to-fuchsia-600',
    og: ['#8b5cf6', '#d946ef'],
    metaTitle: '초성 변환기 - 초성 퀴즈 만들기',
    long: '"안녕하세요"를 "ㅇㄴㅎㅅㅇ"로 바꿔 초성 퀴즈나 힌트를 만듭니다. 띄어쓰기와 문장부호는 그대로 두거나 함께 지울 수 있어, 노래 제목·영화 제목 맞히기 문제를 몇 초 만에 만들 수 있습니다.',
    features: ['문장 전체를 초성으로', '띄어쓰기·문장부호 유지 여부 선택', '자모 분해(ㅎ+ㅏ+ㄴ) 보기', '결과 복사·공유'],
  },
  {
    slug: 'amount',
    title: '한글 금액 변환',
    desc: '숫자를 계약서용 한글 금액으로',
    icon: '🧾',
    category: '한글 변환',
    gradient: 'from-amber-500 to-orange-600',
    og: ['#f59e0b', '#ea580c'],
    metaTitle: '한글 금액 변환 - 숫자를 일금 삼백만원정으로',
    long: '3500000을 "일금 삼백오십만원정"으로 바꿉니다. 계약서·영수증·경조사 봉투에 쓰는 정식 표기와 읽기 편한 간략 표기를 함께 보여주고, 억·만 단위로 끊어 읽는 형태도 알려줍니다.',
    features: ['계약서용 정식 표기(일금 ~원정)', '읽기용 간략 표기', '억·만 단위로 끊어 읽기', '세 자리 쉼표 표기'],
  },
  {
    slug: 'clean',
    title: '텍스트 정리',
    desc: '복사해 온 글의 이상한 공백·줄바꿈 정리',
    icon: '🧼',
    category: '정리·편집',
    gradient: 'from-sky-500 to-cyan-600',
    og: ['#0ea5e9', '#0891b2'],
    metaTitle: '텍스트 정리 - 줄바꿈·중복 공백·보이지 않는 문자 제거',
    long: 'PDF나 웹에서 복사한 글에 섞여 오는 눈에 안 보이는 문자, 일반 공백처럼 생겼지만 다른 공백, 문장 중간에서 끊긴 줄바꿈을 한 번에 정리합니다. 무엇이 몇 개 지워졌는지도 함께 알려줍니다.',
    features: ['보이지 않는 문자·특수 공백 제거', '문장 중간 줄바꿈 합치기', '중복 공백·빈 줄 정리', '스마트 따옴표를 일반 따옴표로'],
  },
  {
    slug: 'dedupe',
    title: '중복 줄 제거·정렬',
    desc: '목록에서 겹치는 줄을 지우고 정렬합니다',
    icon: '🧹',
    category: '정리·편집',
    gradient: 'from-rose-500 to-pink-600',
    og: ['#f43f5e', '#db2777'],
    metaTitle: '중복 줄 제거·정렬 - 목록 정리, 가나다순',
    long: '명단이나 목록을 붙여 넣으면 겹치는 줄을 지우고 가나다순으로 정렬합니다. 앞뒤 공백만 다른 줄, 대소문자만 다른 줄도 같은 줄로 볼지 고를 수 있어 실제 명단 정리에 바로 쓸 수 있습니다.',
    features: ['중복 줄 제거(몇 개 지웠는지 표시)', '가나다·역순 정렬', '공백·대소문자 무시 옵션', '빈 줄 제거·줄 번호 매기기'],
  },
  {
    slug: 'case',
    title: '대소문자 변환',
    desc: '영문을 원하는 표기 방식으로 바꿉니다',
    icon: '🔠',
    category: '정리·편집',
    gradient: 'from-slate-600 to-indigo-700',
    og: ['#475569', '#4338ca'],
    metaTitle: '대소문자 변환 - 영문 표기 방식 한 번에 바꾸기',
    long: '전부 대문자, 전부 소문자, 단어 첫 글자만 대문자로 바꾸고 camelCase·snake_case·kebab-case 같은 개발 표기법으로도 변환합니다. 결과는 각각 따로 복사할 수 있습니다.',
    features: ['대문자·소문자·첫 글자만 대문자', '문장 첫 글자만 대문자', 'camelCase · snake_case · kebab-case', '표기법별로 따로 복사'],
  },
  {
    slug: 'special-char',
    title: '특수문자 모음',
    desc: '화살표·도형·기호를 눌러서 복사',
    icon: '✨',
    category: '기호·입력',
    gradient: 'from-fuchsia-500 to-violet-600',
    og: ['#d946ef', '#7c3aed'],
    metaTitle: '특수문자 모음 - 화살표·도형·기호 복사하기',
    long: '화살표(→ ⇒), 도형(★ ◆ ▶), 문장부호(※ 「」), 수학·단위(㎡ ℃ ±), 화폐(₩ €), 원문자(① ㉠)를 눌러서 바로 복사합니다. 자판으로 칠 수 없는 기호를 찾아 헤매지 않아도 됩니다.',
    features: ['분류별 기호 모음', '누르면 바로 복사', '이름으로 검색', '최근에 쓴 기호 기억'],
  },
  {
    slug: 'emoticon',
    title: '이모티콘 모음',
    desc: '(╯°□°）╯ 같은 문자 이모티콘 복사',
    icon: '🙂',
    category: '기호·입력',
    gradient: 'from-orange-500 to-rose-500',
    og: ['#f97316', '#f43f5e'],
    metaTitle: '이모티콘 모음 - 카오모지·문자 이모티콘 복사',
    long: 'ㅇㅅㅇ, (╯°□°）╯, ¯\\_(ツ)_/¯ 처럼 문자로만 만든 이모티콘을 감정별로 모았습니다. 이미지가 아니라 글자라서 어디에 붙여 넣어도 깨지지 않고, 닉네임이나 상태 메시지에도 쓸 수 있습니다.',
    features: ['기쁨·슬픔·화남 등 감정별 분류', '한글 이모티콘과 카오모지', '누르면 바로 복사', '최근에 쓴 것 기억'],
  },
  {
    slug: 'replace',
    title: '찾아 바꾸기',
    desc: '긴 글에서 특정 단어를 한 번에 치환',
    icon: '🔍',
    category: '정리·편집',
    gradient: 'from-teal-500 to-emerald-600',
    og: ['#14b8a6', '#059669'],
    metaTitle: '찾아 바꾸기 - 텍스트 일괄 치환',
    long: '이름이나 용어가 통째로 바뀌었을 때 긴 글에서 하나씩 고치지 않아도 됩니다. 대소문자 구분과 정규식을 켤 수 있고, 바꾸기 전에 몇 군데가 바뀌는지 미리 세어 알려줍니다.',
    features: ['몇 곳이 바뀌는지 미리 표시', '대소문자 구분 켜기·끄기', '정규식 지원', '줄바꿈(\\n)·탭 치환'],
  },
  {
    slug: 'manuscript',
    title: '원고지·자소서 글자수',
    desc: '원고지 매수와 자소서 기준 글자수 계산',
    icon: '📝',
    category: '세기·쓰기',
    gradient: 'from-indigo-500 to-violet-600',
    og: ['#6366f1', '#7c3aed'],
    metaTitle: '원고지·자소서 글자수 - 매수와 남은 분량 계산',
    long: '글을 붙여 넣으면 200자 원고지 몇 장인지, 공백을 포함·제외했을 때 각각 몇 자인지 알려줍니다. 자기소개서는 대개 공백 포함으로 세므로 어느 기준으로 몇 자가 남았는지를 함께 보여줍니다.',
    features: ['200자·400자 원고지 매수', '공백 포함·제외 글자수', '자소서 목표 글자수까지 남은 수', '바이트 수(첨부 제한 확인용)'],
  },
  {
    slug: 'lorem',
    title: '더미 텍스트 생성',
    desc: '레이아웃 채울 한글·영문 예시 문장',
    icon: '📄',
    category: '세기·쓰기',
    gradient: 'from-slate-500 to-sky-600',
    og: ['#64748b', '#0284c7'],
    metaTitle: '더미 텍스트 생성 - 한글 로렘입숨',
    long: '디자인 시안이나 화면을 만들 때 채워 넣을 예시 문장을 만듭니다. 영문 로렘입숨은 한글 화면에서 줄 길이와 글자 밀도가 실제와 달라 보이므로, 한글 문장으로도 만들 수 있게 했습니다.',
    features: ['한글·영문 더미 문장', '문단 수와 문단 길이 지정', '글자수 맞춰 자르기', '결과 한 번에 복사'],
  },
];

/** 같은 카테고리를 먼저, 그다음 나머지에서 채운다. */
export function relatedTextTools(slug: string, limit = 4): TextTool[] {
  const current = TEXT_TOOLS.find(t => t.slug === slug);
  if (!current) return [];
  const others = TEXT_TOOLS.filter(t => t.slug !== slug);
  const same = others.filter(t => t.category === current.category);
  const rest = others.filter(t => t.category !== current.category);
  return [...same, ...rest].slice(0, limit);
}

export function findTextTool(slug: string): TextTool | undefined {
  return TEXT_TOOLS.find(t => t.slug === slug);
}

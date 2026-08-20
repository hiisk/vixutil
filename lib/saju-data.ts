// ─── 천간 (Heavenly Stems) ──────────────────────────────────────────────────
export const STEMS = [
  { idx:0, hanja:'甲', kor:'갑', element:'목' as const, yinyang:'양', emoji:'🌳', color:'#16a34a',
    nature:'큰 나무·대나무',
    personality:'타고난 리더십과 개척정신을 가진 사람입니다. 큰 나무처럼 당당하게 서서 주위를 이끄는 힘이 있으며, 새로운 것에 도전하는 것을 두려워하지 않습니다. 목표를 향해 곧게 나아가는 추진력이 강하나, 타인의 의견에 귀를 기울이는 유연함도 키워나가면 더 큰 성공을 이룰 수 있습니다.',
    luckyColor:'초록·파랑', luckyNumber:3, luckyDirection:'동쪽', aptitude:'경영·교육·의료·스포츠',
    yongshin_strong:'금(金)·수(水)', yongshin_weak:'수(水)·화(火)' },
  { idx:1, hanja:'乙', kor:'을', element:'목' as const, yinyang:'음', emoji:'🌿', color:'#15803d',
    nature:'풀·넝쿨',
    personality:'유연하고 적응력이 뛰어나며, 부드러운 방법으로 원하는 것을 이루어가는 능력이 있습니다. 인간관계가 풍부하고 배려심이 깊어 주위 사람들에게 사랑받는 편입니다. 넝쿨이 지지대를 타고 자라듯 환경을 잘 활용하는 영리함과 끈기가 있습니다.',
    luckyColor:'초록·노랑', luckyNumber:8, luckyDirection:'동남쪽', aptitude:'예술·상담·패션·외교',
    yongshin_strong:'금(金)·화(火)', yongshin_weak:'수(水)·목(木)' },
  { idx:2, hanja:'丙', kor:'병', element:'화' as const, yinyang:'양', emoji:'☀️', color:'#dc2626',
    nature:'태양·큰 불',
    personality:'밝고 따뜻한 성격으로 어디서든 주목을 받는 존재입니다. 태양처럼 당당하게 빛나며 주위를 환히 밝히는 에너지가 넘칩니다. 열정과 카리스마가 강하지만, 때로는 지나친 자기 확신이 갈등을 일으킬 수 있으니 상대방의 입장도 배려하는 것이 중요합니다.',
    luckyColor:'빨강·주황', luckyNumber:7, luckyDirection:'남쪽', aptitude:'방송·연예·강연·마케팅',
    yongshin_strong:'수(水)·토(土)', yongshin_weak:'목(木)·토(土)' },
  { idx:3, hanja:'丁', kor:'정', element:'화' as const, yinyang:'음', emoji:'🕯️', color:'#ea580c',
    nature:'촛불·화롯불',
    personality:'섬세하고 감성이 풍부하며, 촛불처럼 주위를 따뜻하게 밝히는 존재입니다. 직관이 뛰어나고 예술적 감각이 발달해 있으며, 진실된 마음으로 사람들과 깊은 관계를 맺습니다. 때로는 예민함이 너무 강해 상처받기 쉬우니 자신을 보호하는 경계선을 만드는 것도 필요합니다.',
    luckyColor:'주황·보라', luckyNumber:2, luckyDirection:'남쪽', aptitude:'예술·음악·상담·교육',
    yongshin_strong:'수(水)·목(木)', yongshin_weak:'목(木)·토(土)' },
  { idx:4, hanja:'戊', kor:'무', element:'토' as const, yinyang:'양', emoji:'⛰️', color:'#ca8a04',
    nature:'산·큰 대지',
    personality:'듬직하고 신뢰감이 넘치며, 산처럼 든든한 존재입니다. 책임감이 강하고 흔들리지 않는 원칙으로 주위에 안정감을 줍니다. 다소 고집스럽게 보일 수 있지만 그 안에 타인을 위하는 따뜻한 마음이 담겨 있습니다.',
    luckyColor:'노랑·황토', luckyNumber:5, luckyDirection:'중앙', aptitude:'건설·부동산·정치·행정',
    yongshin_strong:'목(木)·금(金)', yongshin_weak:'화(火)·목(木)' },
  { idx:5, hanja:'己', kor:'기', element:'토' as const, yinyang:'음', emoji:'🌾', color:'#a16207',
    nature:'평원·논밭',
    personality:'성실하고 꼼꼼하며, 비옥한 대지처럼 다양한 것을 품어안는 포용력이 있습니다. 조화를 중시하고 협력하는 데 뛰어나며, 꾸준한 노력으로 탄탄한 결실을 맺습니다. 때로는 우유부단하게 보일 수 있지만 사실은 모든 것을 신중하게 고려하는 깊은 사고의 결과입니다.',
    luckyColor:'노랑·베이지', luckyNumber:0, luckyDirection:'중앙', aptitude:'농업·요식업·복지·회계',
    yongshin_strong:'목(木)·수(水)', yongshin_weak:'화(火)·목(木)' },
  { idx:6, hanja:'庚', kor:'경', element:'금' as const, yinyang:'양', emoji:'⚔️', color:'#475569',
    nature:'강철·도끼',
    personality:'의지가 강하고 결단력이 뛰어나며, 강철처럼 단단한 신념을 가진 사람입니다. 원칙을 중시하고 불의를 참지 못하는 강직한 성격으로, 한 번 결정한 것은 끝까지 밀어붙이는 추진력이 있습니다. 그러나 때로는 지나친 고집이 관계에 마찰을 일으킬 수 있으니 유연함을 기르는 것이 도움이 됩니다.',
    luckyColor:'흰색·회색', luckyNumber:4, luckyDirection:'서쪽', aptitude:'법조·군사·금융·IT',
    yongshin_strong:'화(火)·수(水)', yongshin_weak:'토(土)·화(火)' },
  { idx:7, hanja:'辛', kor:'신', element:'금' as const, yinyang:'음', emoji:'💎', color:'#64748b',
    nature:'보석·날카로운 칼',
    personality:'예민하고 섬세한 감각을 가진 완벽주의자입니다. 보석처럼 날카롭고 정교한 심미안으로 아름다움과 품질을 추구합니다. 높은 기준을 가지고 있어 스스로에게도 엄격하지만, 그 안에서 나오는 날카로운 통찰력이 주위 사람들에게 큰 도움을 줍니다.',
    luckyColor:'흰색·금색', luckyNumber:9, luckyDirection:'서쪽', aptitude:'의료·연구·공예·디자인',
    yongshin_strong:'수(水)·목(木)', yongshin_weak:'토(土)·화(火)' },
  { idx:8, hanja:'壬', kor:'임', element:'수' as const, yinyang:'양', emoji:'🌊', color:'#2563eb',
    nature:'큰 강·바다',
    personality:'포용력이 넓고 지혜로우며, 큰 강처럼 많은 것을 담아내는 깊이가 있습니다. 다재다능하고 아이디어가 풍부하며, 어떤 상황에서도 유연하게 흘러가는 적응력을 가지고 있습니다. 내면 깊은 곳에 강한 야망을 품고 있으며, 그 흐름이 결국 바다에 닿듯 큰 목표를 이루어내는 사람입니다.',
    luckyColor:'파랑·검정', luckyNumber:1, luckyDirection:'북쪽', aptitude:'유통·무역·철학·연구',
    yongshin_strong:'토(土)·목(木)', yongshin_weak:'금(金)·토(土)' },
  { idx:9, hanja:'癸', kor:'계', element:'수' as const, yinyang:'음', emoji:'🌧️', color:'#1d4ed8',
    nature:'빗물·샘물',
    personality:'직관이 뛰어나고 감수성이 풍부하며, 빗물처럼 섬세하게 모든 것을 느끼는 사람입니다. 신비로운 매력이 있고 상상력이 풍부하며, 예술적 감각과 영적인 통찰력을 갖추고 있습니다. 타인의 감정에 민감하게 반응하며 깊이 공감하는 능력으로 주위 사람들에게 위안을 주는 존재입니다.',
    luckyColor:'파랑·보라', luckyNumber:6, luckyDirection:'북쪽', aptitude:'문학·심리·의료·종교',
    yongshin_strong:'토(土)·화(火)', yongshin_weak:'금(金)·토(土)' },
] as const;

// ─── 지지 (Earthly Branches) ────────────────────────────────────────────────
export const BRANCHES = [
  { idx:0,  hanja:'子', kor:'자', animal:'쥐',     element:'수' as const, season:'겨울', hours:'23-01시', emoji:'🐀' },
  { idx:1,  hanja:'丑', kor:'축', animal:'소',     element:'토' as const, season:'겨울', hours:'01-03시', emoji:'🐂' },
  { idx:2,  hanja:'寅', kor:'인', animal:'호랑이', element:'목' as const, season:'봄',   hours:'03-05시', emoji:'🐅' },
  { idx:3,  hanja:'卯', kor:'묘', animal:'토끼',   element:'목' as const, season:'봄',   hours:'05-07시', emoji:'🐇' },
  { idx:4,  hanja:'辰', kor:'진', animal:'용',     element:'토' as const, season:'봄',   hours:'07-09시', emoji:'🐉' },
  { idx:5,  hanja:'巳', kor:'사', animal:'뱀',     element:'화' as const, season:'여름', hours:'09-11시', emoji:'🐍' },
  { idx:6,  hanja:'午', kor:'오', animal:'말',     element:'화' as const, season:'여름', hours:'11-13시', emoji:'🐎' },
  { idx:7,  hanja:'未', kor:'미', animal:'양',     element:'토' as const, season:'여름', hours:'13-15시', emoji:'🐑' },
  { idx:8,  hanja:'申', kor:'신', animal:'원숭이', element:'금' as const, season:'가을', hours:'15-17시', emoji:'🐒' },
  { idx:9,  hanja:'酉', kor:'유', animal:'닭',     element:'금' as const, season:'가을', hours:'17-19시', emoji:'🐓' },
  { idx:10, hanja:'戌', kor:'술', animal:'개',     element:'토' as const, season:'가을', hours:'19-21시', emoji:'🐕' },
  { idx:11, hanja:'亥', kor:'해', animal:'돼지',   element:'수' as const, season:'겨울', hours:'21-23시', emoji:'🐖' },
] as const;

// ─── 지장간 (Hidden Stems) ──────────────────────────────────────────────────
// 각 지지 안에 감춰진 천간 (여기→중기→본기 순)
export const JIJANGGAN: Record<number, { stemIdx: number; role: '여기'|'중기'|'본기' }[]> = {
  0:  [{ stemIdx:8, role:'여기' }, { stemIdx:9, role:'본기' }],                       // 子: 壬,癸
  1:  [{ stemIdx:9, role:'여기' }, { stemIdx:7, role:'중기' }, { stemIdx:5, role:'본기' }], // 丑: 癸辛己
  2:  [{ stemIdx:4, role:'여기' }, { stemIdx:2, role:'중기' }, { stemIdx:0, role:'본기' }], // 寅: 戊丙甲
  3:  [{ stemIdx:0, role:'여기' }, { stemIdx:1, role:'본기' }],                       // 卯: 甲,乙
  4:  [{ stemIdx:1, role:'여기' }, { stemIdx:9, role:'중기' }, { stemIdx:4, role:'본기' }], // 辰: 乙癸戊
  5:  [{ stemIdx:4, role:'여기' }, { stemIdx:6, role:'중기' }, { stemIdx:2, role:'본기' }], // 巳: 戊庚丙
  6:  [{ stemIdx:2, role:'여기' }, { stemIdx:5, role:'중기' }, { stemIdx:3, role:'본기' }], // 午: 丙己丁
  7:  [{ stemIdx:3, role:'여기' }, { stemIdx:1, role:'중기' }, { stemIdx:5, role:'본기' }], // 未: 丁乙己
  8:  [{ stemIdx:4, role:'여기' }, { stemIdx:8, role:'중기' }, { stemIdx:6, role:'본기' }], // 申: 戊壬庚
  9:  [{ stemIdx:6, role:'여기' }, { stemIdx:7, role:'본기' }],                       // 酉: 庚,辛
  10: [{ stemIdx:7, role:'여기' }, { stemIdx:3, role:'중기' }, { stemIdx:4, role:'본기' }], // 戌: 辛丁戊
  11: [{ stemIdx:4, role:'여기' }, { stemIdx:0, role:'중기' }, { stemIdx:8, role:'본기' }], // 亥: 戊甲壬
};

export type Element = '목' | '화' | '토' | '금' | '수';

// ─── 오행 정보 ────────────────────────────────────────────────────────────────
export const ELEMENT_INFO: Record<Element, { color: string; bg: string; border: string; emoji: string; label: string; advice: string }> = {
  목: { color:'#15803d', bg:'#f0fdf4', border:'#86efac', emoji:'🌳', label:'목(木)',
    advice:'창의력과 성장 에너지가 강합니다. 새로운 시작과 도전에 유리하며 교육·예술 분야에서 빛납니다.' },
  화: { color:'#dc2626', bg:'#fef2f2', border:'#fca5a5', emoji:'🔥', label:'화(火)',
    advice:'열정과 표현력이 넘칩니다. 사교적이고 카리스마가 강해 리더십과 창작 활동에서 두각을 나타냅니다.' },
  토: { color:'#ca8a04', bg:'#fefce8', border:'#fde047', emoji:'⛰️', label:'토(土)',
    advice:'안정감과 신뢰감이 강합니다. 현실적이고 꾸준해서 오래가는 성과를 만드는 데 탁월합니다.' },
  금: { color:'#475569', bg:'#f8fafc', border:'#cbd5e1', emoji:'⚙️', label:'금(金)',
    advice:'결단력과 원칙이 강합니다. 분석적 사고와 강한 의지로 어떤 분야에서든 높은 완성도를 추구합니다.' },
  수: { color:'#2563eb', bg:'#eff6ff', border:'#93c5fd', emoji:'💧', label:'수(水)',
    advice:'지혜와 유연성이 뛰어납니다. 깊은 통찰력과 포용력으로 복잡한 상황도 원만하게 해결합니다.' },
};

export const ELEMENT_SHORTAGE: Record<Element, string> = {
  목: '초록색 식물을 곁에 두거나 새벽 산책을 즐겨보세요. 새로운 배움을 시작하는 것도 목(木) 기운을 보충하는 데 좋습니다.',
  화: '밝고 따뜻한 색상의 옷을 입거나 사람들과 어울리는 시간을 늘려보세요. 남쪽 방향 활동이 화(火) 기운을 북돋웁니다.',
  토: '규칙적인 생활 습관을 만들고 텃밭 가꾸기, 등산 같은 대지와 가까운 활동을 즐겨보세요.',
  금: '원칙을 세우고 지키는 연습을 해보세요. 흰색·은색 소품을 활용하거나 서쪽 방향을 의식하면 도움이 됩니다.',
  수: '독서와 명상, 물가에서의 산책이 도움이 됩니다. 파란색을 가까이 하고 북쪽을 향해 시간을 보내보세요.',
};

// ─── 십성 (Ten Gods) ─────────────────────────────────────────────────────────
export const SIPSEONG_INFO: Record<string, {
  emoji: string; summary: string; category: '비겁'|'식상'|'재성'|'관성'|'인성';
  male: string; female: string; career: string; wealth: string;
}> = {
  비견: {
    emoji:'🤝', summary:'자립·경쟁', category:'비겁',
    male:  '형제·친구의 별. 독립심이 강하고 자존심이 높습니다. 혼자 해결하려는 성향이 강해 의도치 않게 주변 사람들을 밀어낼 수 있습니다.',
    female:'언니·친구·동성 라이벌의 별. 자립심이 강하고 자신만의 길을 걷습니다. 남편 운이 약해질 수 있으나, 그 에너지를 커리어로 전환하면 강점이 됩니다.',
    career:'독립적인 사업가·프리랜서·전문직에 유리합니다. 혼자 결정하고 실행하는 환경에서 빛납니다.',
    wealth:'재물이 들어왔다 나가는 기복이 있습니다. 동업이나 공동투자보다는 단독 운영이 안전합니다.',
  },
  겁재: {
    emoji:'⚡', summary:'투쟁·돌파', category:'비겁',
    male:  '경쟁자이자 형제의 별. 승부욕이 매우 강하고 돌파력이 있습니다. 재물을 빼앗기는 구조가 되기 쉬우나, 이 에너지를 사업에 쓰면 강력한 추진력이 됩니다.',
    female:'경쟁 관계의 여성 에너지. 재물과 남편을 두고 경쟁하는 구조가 생기기 쉽습니다. 에너지를 내 목표로 향하게 하는 것이 핵심입니다.',
    career:'영업·스포츠·협상·경쟁 업종에서 강합니다. 어려운 상황일수록 오히려 힘을 발휘합니다.',
    wealth:'재물 기복이 크고 한 번에 크게 쓰는 성향. 저축보다는 투자·사업으로 재물을 다루는 것이 맞습니다.',
  },
  식신: {
    emoji:'🌸', summary:'재능·복덕', category:'식상',
    male:  '재능과 식복(食福)의 별. 먹을 복이 있고 삶을 즐기는 여유로움이 있습니다. 긍정적이고 낙천적이며 주변을 행복하게 만드는 에너지입니다.',
    female:'자녀·재능·식복의 별. 자녀운이 좋고 모성애가 깊습니다. 음식·예술·교육 분야에서 자연스러운 재능이 나옵니다.',
    career:'요리·예술·교육·유통·서비스업에서 두각을 나타냅니다. 아이디어를 현실로 만드는 능력이 탁월합니다.',
    wealth:'재물이 자연스럽게 들어오는 구조. 욕심을 부리지 않고 내 재능을 발휘하면 경제적으로 여유로워집니다.',
  },
  상관: {
    emoji:'✨', summary:'표현·반항', category:'식상',
    male:  '넘치는 표현력과 반항기의 별. 창의성이 매우 강하고 기존 관습에 얽매이지 않습니다. 직장 상사나 권위에 도전하는 성향이 있어 직장 생활에 마찰이 생기기 쉽습니다.',
    female:'재능과 표현력이 넘치지만, 전통적으로는 남편 운을 약하게 하는 별로 여겨집니다. 현대적으로는 강한 커리어 여성의 상징입니다.',
    career:'예술·문학·방송·연구·창업 분야에서 독보적입니다. 남이 만든 틀 안에서는 한계를 느끼고 직접 판을 만들 때 빛납니다.',
    wealth:'정해진 월급보다는 자신의 재능으로 번 돈이 더 많아지는 구조. 부업·창작 수익이 본업을 능가할 수 있습니다.',
  },
  편재: {
    emoji:'💰', summary:'활동·사업', category:'재성',
    male:  '변동하는 재물과 사업가 기질의 별. 아버지의 별이기도 합니다. 이성적 매력을 쉽게 발산하며, 여성 관계가 복잡해지기 쉽습니다.',
    female:'남편 외의 이성 에너지·아버지의 별. 사업 감각이 있고 활발한 경제 활동을 즐깁니다.',
    career:'무역·투자·부동산·영업·유흥 사업에서 강합니다. 흐름을 타는 능력이 뛰어나고 기회를 먼저 봅니다.',
    wealth:'큰돈이 들어왔다 나가는 기복형 재물. 투자 감각은 좋지만 관리하지 않으면 손에 남지 않습니다.',
  },
  정재: {
    emoji:'💎', summary:'안정·근면', category:'재성',
    male:  '안정적 재물과 배우자의 별. 성실한 노력으로 꾸준히 재산을 모으는 타입입니다. 배우자가 현실적이고 내조를 잘 합니다.',
    female:'안정적 재물의 별. 꼼꼼하게 관리하고 절약하는 재물 운입니다. 사업보다는 안정적인 수입원이 더 잘 맞습니다.',
    career:'공무원·금융·회계·관리직에서 능력을 발휘합니다. 규칙적이고 체계적인 업무를 잘 수행합니다.',
    wealth:'꾸준히 모으는 재물. 절약과 계획적인 저축으로 노후가 안정됩니다. 갑작스러운 횡재보다는 꾸준한 성장형입니다.',
  },
  편관: {
    emoji:'⚔️', summary:'시련·극복', category:'관성',
    male:  '압박·시련·관직의 별(칠살). 강한 경쟁 환경에서 단련됩니다. 극복하면 큰 권위와 성취를 얻지만, 압박에 굴복하면 건강과 심리에 부담이 옵니다.',
    female:'남편 또는 이성의 별. 강하고 자신을 강하게 통제하는 남성과 인연이 생기기 쉽습니다. 자신의 강함을 먼저 키우는 것이 중요합니다.',
    career:'군인·검사·경찰·외과의사·무술인 등 강인한 직종에서 두각을 나타냅니다. 위기 상황에서 더욱 강해집니다.',
    wealth:'재물보다는 권력과 명예를 더 중요시합니다. 직위가 올라갈수록 경제적 여건도 자연스럽게 개선됩니다.',
  },
  정관: {
    emoji:'👑', summary:'명예·질서', category:'관성',
    male:  '명예·직위·법의 별. 사회적 규범을 중시하고 안정적인 직장을 선호합니다. 책임감이 강하며 남에게 신뢰받는 삶을 삽니다.',
    female:'남편의 별. 책임감 있고 사회적으로 인정받는 남성과 인연이 맺어지기 쉽습니다. 가정과 사회 모두에서 안정적인 삶을 추구합니다.',
    career:'공무원·교사·법조인·관리직에서 높은 평가를 받습니다. 조직 안에서 신뢰를 쌓고 차근차근 승진하는 타입입니다.',
    wealth:'정직한 노력으로 얻는 재물. 부정한 방법은 체질에 맞지 않습니다. 꾸준한 직업 수입이 가장 안정적입니다.',
  },
  편인: {
    emoji:'🔮', summary:'이단·영감', category:'인성',
    male:  '독특한 재능과 영적 감각의 별. 종교·철학·의료·비주류 학문에 관심이 높습니다. 고독을 즐기는 편이며, 남이 가지 않는 독창적인 길을 걷습니다.',
    female:'의붓어머니·재능·이단 학문의 별. 창의적 사고와 독특한 감수성이 있으며, 기존의 틀을 벗어나는 것을 즐깁니다.',
    career:'예술·의료·심리·종교·기술 연구 분야에서 독보적인 역량을 발휘합니다. 남다른 시각이 최대 강점입니다.',
    wealth:'재물보다는 지식·기술·콘텐츠로 가치를 만드는 타입. 전문성이 쌓일수록 경제적으로도 성장합니다.',
  },
  정인: {
    emoji:'📚', summary:'학문·보호', category:'인성',
    male:  '어머니·학문·문서의 별. 공부운이 좋고 귀인의 도움을 받습니다. 어머니의 영향을 크게 받으며, 교육적 환경에서 성장합니다.',
    female:'어머니·지식·인문학의 별. 배우고 가르치는 것을 좋아하며, 지성적인 매력이 있습니다. 문서·자격증으로 이익이 생깁니다.',
    career:'교육·학문·출판·법무·의료 등 전문 지식 기반 직종에서 두각을 나타냅니다. 자격증과 학위가 실질적 도움이 됩니다.',
    wealth:'재물보다는 학문과 명예를 중시합니다. 그러나 전문성이 뒷받침되면 안정적인 경제 기반이 마련됩니다.',
  },
};

// ─── 오행 생극 ────────────────────────────────────────────────────────────────
const GENERATES: Record<Element, Element> = { 목:'화', 화:'토', 토:'금', 금:'수', 수:'목' };
const CONTROLS:  Record<Element, Element> = { 목:'토', 토:'수', 수:'화', 화:'금', 금:'목' };

export function getSipseong(ilganIdx: number, targetIdx: number): string {
  const a = STEMS[ilganIdx], b = STEMS[targetIdx];
  const same = a.yinyang === b.yinyang;
  if (a.element === b.element)             return same ? '비견' : '겁재';
  if (GENERATES[a.element] === b.element)  return same ? '식신' : '상관';
  if (GENERATES[b.element] === a.element)  return same ? '편인' : '정인';
  if (CONTROLS[a.element]  === b.element)  return same ? '편재' : '정재';
  if (CONTROLS[b.element]  === a.element)  return same ? '편관' : '정관';
  return '';
}

// ─── 신강/신약 ────────────────────────────────────────────────────────────────
export const STEM_ELEMENTS: Element[] = ['목','목','화','화','토','토','금','금','수','수'];
export const BRANCH_ELEMENTS: Element[] = ['수','토','목','목','토','화','화','토','금','금','토','수'];

/**
 * 지지 가중치 [년지, 월지, 일지, 시지].
 *
 * 명리의 득령(得令)·득지(得地)·득세(得勢) 순서를 그대로 옮겼다. 월지는 일간이
 * 태어난 계절이라 강약을 절반쯤 정하므로 가장 무겁고, 배우자 자리인 일지가
 * 그다음, 년지·시지와 천간은 가볍다. 전에는 넷을 똑같이 세어 월령을 아예 보지
 * 않았다 — 겨울에 난 수(水) 일간과 여름에 난 수 일간이 같은 점수를 받았다.
 * 숫자 자체는 이 순서를 담기 위한 것이고 어느 책의 값을 옮긴 것은 아니다.
 */
const BRANCH_WEIGHT = [1, 3, 2, 1];

export function getSingang(ilganIdx: number, pillars: (Pillar | null)[]): {
  strong: boolean; score: number; label: string;
  desc: string; yongshin: string; yongshinDesc: string;
} {
  const ilEl = STEMS[ilganIdx].element;
  let support = 0, total = 0;
  pillars.forEach((p, i) => {
    if (!p) return;
    // 일간 자신은 세지 않는다 — 강약을 재는 주체이지 자기 응원군이 아니다
    if (i !== 2) {
      total += 1;
      if (['비견','겁재','편인','정인'].includes(getSipseong(ilganIdx, p.stemIdx))) support += 1;
    }
    // 지지는 지장간 본기로 판정한다
    const jjg = JIJANGGAN[p.branchIdx];
    const bEl = STEM_ELEMENTS[jjg[jjg.length - 1].stemIdx];
    const w = BRANCH_WEIGHT[i] ?? 1;
    total += w;
    if (bEl === ilEl || GENERATES[bEl] === ilEl) support += w;
  });
  // 내 편이 절반을 넘으면 신강. score는 화면에 보여 줄 치우침 정도다
  const score = support * 2 - total;
  const strong = score >= 0;
  const stem = STEMS[ilganIdx];
  return {
    strong, score,
    label: strong ? '신강(身强)' : '신약(身弱)',
    desc: strong
      ? `일간 ${stem.hanja}(${stem.kor})의 기운이 강한 신강 사주입니다. 자기 주도적이고 주체성이 강하며, 남의 도움 없이도 길을 개척하는 힘이 있습니다. 다만 에너지가 넘쳐 주변과 마찰이 생기기 쉬우니, 이 힘을 바깥으로 발산하는 출구를 찾는 것이 중요합니다.`
      : `일간 ${stem.hanja}(${stem.kor})의 기운이 약한 신약 사주입니다. 환경의 영향을 크게 받지만 그만큼 공감 능력과 적응력이 뛰어납니다. 주변의 지원과 협력을 적극 활용하면 더 큰 힘을 발휘할 수 있습니다.`,
    yongshin: strong ? stem.yongshin_strong : stem.yongshin_weak,
    yongshinDesc: strong
      ? `신강 사주에서는 일간의 기운을 발산시켜주는 ${stem.yongshin_strong} 기운이 용신이 됩니다. 이 오행과 관련된 색상·직업·방향을 가까이 하면 도움이 됩니다.`
      : `신약 사주에서는 일간을 보강해주는 ${stem.yongshin_weak} 기운이 용신이 됩니다. 이 오행의 에너지를 생활 속에서 많이 취하면 운이 강해집니다.`,
  };
}

// ─── 대운 ─────────────────────────────────────────────────────────────────────
export function getDaewoonDirection(gender: 'male'|'female', yearStemIdx: number): 'forward'|'backward' {
  const yearIsYang = STEMS[yearStemIdx].yinyang === '양';
  return (gender==='male' && yearIsYang) || (gender==='female' && !yearIsYang) ? 'forward' : 'backward';
}

/**
 * 대운수 — 태어난 순간부터 절기까지의 날수를 3으로 나눈다(3일 = 1년).
 * 순행이면 다음 절(節)까지, 역행이면 지난 절까지 센다.
 *
 * 나머지는 반올림한다. 1일이 남으면 버리고 2일이 남으면 올리는 관례
 * (1일 = 4개월, 2일 = 8개월)와 결과가 같다.
 */
export function getDaewoonStartAge(
  birthUtcMs: number, birthYear: number, birthMonth: number,
  direction: 'forward'|'backward'
): number {
  let target = jeolgiUtc(birthYear, birthMonth);
  if (direction === 'forward' && target <= birthUtcMs) {
    target = birthMonth === 12 ? jeolgiUtc(birthYear+1, 1) : jeolgiUtc(birthYear, birthMonth+1);
  } else if (direction === 'backward' && target > birthUtcMs) {
    target = birthMonth === 1 ? jeolgiUtc(birthYear-1, 12) : jeolgiUtc(birthYear, birthMonth-1);
  }
  return Math.max(1, Math.round(Math.abs(target - birthUtcMs) / 86400000 / 3));
}

export interface DaewoonEntry { pillar: Pillar; startAge: number; endAge: number }

export function getDaewoons(monthPillar: Pillar, direction: 'forward'|'backward', startAge: number): DaewoonEntry[] {
  const step = direction==='forward' ? 1 : -1;
  let si = monthPillar.stemIdx, bi = monthPillar.branchIdx;
  return Array.from({ length:10 }, (_, i) => {
    si = ((si + step) + 10) % 10;
    bi = ((bi + step) + 12) % 12;
    return { pillar:{ stemIdx:si, branchIdx:bi }, startAge:startAge+i*10, endAge:startAge+i*10+9 };
  });
}

// ─── 60 일주 해석 ─────────────────────────────────────────────────────────────
export const ILJU_READINGS: Record<string, string> = {
  갑자:'지적 호기심이 넘치고 탐구 정신이 강한 개척자입니다. 겉보기엔 온화하지만 내면에 강한 신념과 개성을 품고 있으며, 자신만의 방식으로 꾸준히 성장해 나갑니다. 수(子)가 갑(甲)을 길러주는 형태라 두뇌가 명석하고 예술적 감수성이 풍부합니다.',
  갑인:'목기(木氣)가 두 배로 강한 타고난 지도자입니다. 인(寅)의 호랑이 기운이 더해져 추진력과 발전 가능성이 매우 크고, 처음 만나는 사람에게도 강한 인상을 남깁니다. 지나친 고집을 경계해야 하며, 협력 관계에서 더 빛납니다.',
  갑진:'안정적인 토(辰) 기반 위에 우뚝 선 나무처럼 든든하고 믿음직한 성격입니다. 인내심이 강하고 성실하여 맡은 일을 끝까지 완수하는 책임감이 있습니다. 일찍 두각을 나타내지 않더라도 나이가 들수록 능력과 평판이 빛납니다.',
  갑오:'불(午)이 나무(甲)를 태우듯 에너지가 강렬하고 활동적입니다. 단기간에 눈부신 성과를 이룰 수 있는 폭발적인 에너지를 가지고 있으나, 그만큼 연소가 빨라 지속적인 관리와 휴식이 중요합니다. 존재감이 강해 어디서나 중심이 됩니다.',
  갑신:'강철(申)이 나무(甲)를 자르는 구조로, 내면에 긴장과 갈등을 품고 있습니다. 그러나 이 긴장이 날카로운 판단력과 분석력으로 승화되어 복잡한 문제를 해결하는 능력이 탁월합니다. 겉보기엔 강해 보이지만 섬세한 내면을 가지고 있습니다.',
  갑술:'뜨거운 의지(戌)와 큰 나무(甲)가 결합된 열정적인 성격입니다. 한 번 집중하면 끝을 보는 집념이 강하며, 고난 앞에서도 흔들리지 않는 의지가 있습니다. 가까운 사람에게 매우 따뜻하고 의리 있는 존재로, 평생 신뢰받는 인간관계를 맺습니다.',
  을축:'온화하면서도 끈기 있는 성격으로, 묵묵히 노력하여 결국 결실을 맺는 타입입니다. 축(丑) 속에 신(辛)·기(己)가 숨어 있어 섬세함과 실용성을 모두 갖추고 있습니다. 어떤 환경에서도 적응하는 뛰어난 유연성으로 안정적인 성과를 이룹니다.',
  을묘:'목기(木氣)가 두 배로 강한 순수한 봄의 에너지입니다. 감수성이 풍부하고 창의적이며 새로운 시작에 강한 에너지를 발휘합니다. 독립심이 강하고 자신만의 세계를 소중히 여기며, 예술·문학·콘텐츠 분야에서 두드러진 재능을 보입니다.',
  을사:'지성과 감성을 겸비한 매력적인 성격의 소유자입니다. 사(巳) 속의 병화(丙火)·경금(庚金)이 숨어 있어 겉으론 부드럽지만 내면에 강한 야망과 판단력을 품고 있습니다. 신비로운 분위기로 사람들을 자연스럽게 끌어당깁니다.',
  을미:'따뜻하고 정감 있는 성격으로 주위 사람들에게 편안함을 줍니다. 미(未) 속에 정화(丁火)·기토(己土)가 숨어 있어 풍요로운 정서와 현실적 안정감을 동시에 갖추고 있습니다. 인간관계를 소중히 여기며 특히 가까운 사람에게 헌신적입니다.',
  을유:'예민하고 심미적인 감각을 가진 완벽주의자입니다. 금(酉)이 을목(乙木)을 자르는 구조로 내면의 긴장감이 있지만, 그것이 오히려 탁월한 집중력과 완성도로 나타납니다. 예술·연구·디자인 분야에서 남다른 안목을 발휘합니다.',
  을해:'깊은 내면의 세계를 가진 사색적인 성격입니다. 해(亥)가 을목(乙木)에 수분을 공급하는 형태로, 두뇌가 맑고 감수성이 풍부합니다. 겉으로는 조용하지만 내면에 넓고 깊은 감정의 바다가 흐르고 있으며 예술적 재능이 특출납니다.',
  병자:'열정(丙)과 지성(子)이 조화를 이루는 매력적인 성격입니다. 물(子) 위에서 빛나는 태양(丙)처럼 어려운 상황에서도 긍정적인 에너지를 잃지 않습니다. 감성과 이성의 균형이 뛰어나며, 창의적인 아이디어를 현실로 구현하는 능력이 탁월합니다.',
  병인:'타고난 리더십과 밝은 에너지로 주변을 활기차게 만드는 존재입니다. 목생화(木生火)로 인(寅)이 병(丙)을 키워주는 구조라 추진력과 성장 잠재력이 매우 큽니다. 대범하고 용기 있는 도전 정신으로 어떤 무대에서도 존재감을 드러냅니다.',
  병진:'활발하고 사교적인 성격으로 어디서든 분위기를 이끄는 타입입니다. 진(辰) 속의 계수(癸水)가 병화(丙)와 공존하는 구조로, 열정과 지혜를 동시에 갖추고 있습니다. 리더십이 강하고 다재다능하여 어떤 분야에서든 중추적인 역할을 맡습니다.',
  병오:'화기(火氣)가 두 배로 강한 강렬하고 빛나는 에너지의 소유자입니다. 카리스마와 열정이 넘쳐 주변에 강한 인상을 남기며 어디서든 중심이 됩니다. 강인한 의지와 넘치는 자신감이 최대 강점이나, 화기가 과하면 성급함이 단점이 되므로 인내심을 기르는 것이 중요합니다.',
  병신:'이성적 판단력(申)과 따뜻한 감성(丙)이 공존하는 균형 잡힌 성격입니다. 금화교쟁(金火交爭)의 구조로 내면에 복잡한 역동성을 품고 있으며, 이것이 탁월한 판단력과 문제해결 능력으로 나타납니다. 겉으론 강해 보이지만 내면은 매우 섬세합니다.',
  병술:'열정적이고 신념이 강한 성격으로, 한 번 결심하면 끝까지 밀어붙이는 의지가 있습니다. 술(戌) 속에 정화(丁)·무토(戊)가 숨어 있어 내면에 또 다른 불씨와 안정감을 품고 있습니다. 리더십이 강하고 책임감이 뛰어나 주변의 신뢰를 받습니다.',
  정축:'따뜻한 촛불(丁)이 대지(丑) 위에 자리한 안정적이고 섬세한 성격입니다. 축(丑) 속의 신금(辛)·계수(癸)가 정화를 조절해주어 감정의 균형을 유지하는 능력이 있습니다. 감정이 풍부하고 공감 능력이 뛰어나며, 주변 사람들에게 깊은 위로와 온기를 전합니다.',
  정묘:'예민하고 감성이 풍부한 예술적 기질의 소유자입니다. 목생화(木生火)로 묘(卯)가 정화(丁)를 키워주는 형태라 창의적 에너지가 끊임없이 샘솟습니다. 섬세한 표현력과 날카로운 관찰력을 갖추고 있으며, 자신만의 독창적인 세계를 구축합니다.',
  정사:'지혜롭고 직관이 예리하며, 깊은 통찰력으로 사람과 상황을 꿰뚫어보는 능력이 있습니다. 화기(火氣)가 두 겹으로 강하고 사(巳) 속에 경금(庚)·무토(戊)까지 숨어 있어 복잡하고 다층적인 에너지를 가집니다. 카리스마 있고 신비로운 매력으로 주변을 끌어당깁니다.',
  정미:'따뜻하고 포용력이 넘치는 성격으로 주변 사람들에게 평온함을 줍니다. 미(未) 속에 을목(乙)·기토(己)가 있어 정화(丁)를 보강하는 구조입니다. 감성적이고 예술적인 감각이 뛰어나며, 인간관계를 소중히 여겨 특히 가까운 사람들에게 헌신적입니다.',
  정유:'완벽을 추구하는 섬세하고 날카로운 성격입니다. 금화교쟁(金火交爭)으로 유(酉)가 정화(丁)를 극하는 긴장감이 있으나, 이것이 오히려 끊임없이 자신을 단련시키는 원동력이 됩니다. 뛰어난 분석력과 심미안으로 어떤 분야에서든 높은 완성도를 추구합니다.',
  정해:'깊은 감수성과 풍부한 상상력을 가진 몽상가형 성격입니다. 수(亥)가 화(丁)를 극하는 구조지만, 해(亥) 속의 갑목(甲)이 정화를 보호해주는 섬세한 구조입니다. 직관이 매우 발달해 있고 보이지 않는 것들을 먼저 감지하는 능력이 있습니다.',
  무자:'든든한 산(戊)이 물(子)을 품은 형태로, 외면은 무뚝뚝해 보이지만 내면에 풍부한 감수성과 지적 호기심이 있습니다. 수(子) 속의 임수(壬)·계수(癸)가 무토(戊)를 자극해 창의적인 발상이 풍부합니다. 신중하고 현실적인 판단력이 탁월합니다.',
  무인:'강인한 의지와 활발한 에너지를 가진 실행력의 달인입니다. 인(寅) 속에 갑목(甲)이 있어 무토(戊)를 자극하는 구조로, 도전적인 상황에서 오히려 강해지는 기질이 있습니다. 리더십이 자연스럽고 어떤 목표도 달성해내는 끈질긴 추진력이 있습니다.',
  무진:'토기(土氣)가 두 배로 강한 중후하고 믿음직한 성격입니다. 진(辰) 속의 을목(乙)·계수(癸)가 내면에 풍요로움을 더해줍니다. 꾸준하고 성실한 노력으로 탄탄한 기반을 쌓아가며, 주변 사람들에게 든든한 버팀목이 되는 존재입니다.',
  무오:'열정적이고 카리스마 넘치는 성격으로 어디서든 주목받습니다. 화생토(火生土)로 오(午)가 무토(戊)를 강하게 키워주는 구조라 에너지와 자신감이 넘칩니다. 리더십이 뛰어나고 목표 지향적이며, 한 번 마음먹은 것은 반드시 이루고야 마는 집념이 있습니다.',
  무신:'실용적이고 분석적인 사고를 가진 현실주의자입니다. 토생금(土生金)으로 무토(戊)가 신금(申)을 키워주는 구조라 에너지를 효율적으로 전환하는 능력이 있습니다. 강한 의지와 날카로운 판단력으로 복잡한 문제도 효율적으로 해결합니다.',
  무술:'토기(土氣)가 매우 강한 중후하고 믿음직한 성격입니다. 술(戌) 속에 신금(辛)·정화(丁)가 숨어 있어 단단한 외면 속에 복잡한 내면이 있습니다. 전통과 원칙을 중시하고 한 번 맺은 인연을 매우 소중히 여기는 의리파입니다.',
  기축:'토기(土氣)가 두 배로 강한 성실하고 꼼꼼한 성격입니다. 축(丑) 속의 신금(辛)·계수(癸)가 기토(己)에 자극을 주어 섬세함과 분석력을 더해줍니다. 천천히 그러나 확실하게 목표를 향해 나아가며, 작은 일에도 최선을 다하는 성실함이 있습니다.',
  기묘:'겸손하고 온화한 성격이지만 속에 뚜렷한 자아와 개성을 품고 있습니다. 목극토(木剋土)로 묘(卯)가 기토(己)를 자극하는 구조라 외부의 자극에 예민하게 반응하고 창의적으로 발전합니다. 사람들과의 관계를 소중히 여기며 중재자 역할을 잘 수행합니다.',
  기사:'내면에 강한 열정과 야망을 품은 현실적인 성격입니다. 화생토(火生土)로 사(巳)가 기토(己)를 강하게 키워주며, 사(巳) 속에 경금(庚)까지 있어 에너지가 풍부합니다. 겉으론 차분하지만 일을 추진할 때는 강인한 집중력을 발휘합니다.',
  기미:'토기(土氣)가 겹쳐 현실적이고 안정적이며, 삶의 질을 중요하게 여깁니다. 미(未) 속의 정화(丁)·을목(乙)이 기토(己)에 활력을 더해줍니다. 따뜻하고 포용력 있는 성격으로 주변 사람들에게 편안함을 주며 공동체에서 소중한 존재가 됩니다.',
  기유:'꼼꼼하고 정확한 성격으로 섬세한 작업과 분석적인 사고에 뛰어납니다. 토생금(土生金)으로 기토(己)가 유금(酉)을 키우는 구조라 에너지의 흐름이 안정적입니다. 완벽주의적 성향으로 높은 품질의 결과물을 만들어내며 실용성과 심미성을 동시에 추구합니다.',
  기해:'부드럽고 감성적인 면과 현실적이고 실용적인 면이 공존하는 복합적인 성격입니다. 수(亥)가 토(己)를 극하는 구조라 내면에 갈등이 있지만, 해(亥) 속의 갑목(甲)이 중간에서 조율합니다. 직관이 뛰어나고 겉으로 드러나지 않는 것들을 잘 감지합니다.',
  경자:'이성적이고 냉철한 판단력 뒤에 감성적인 내면을 품고 있습니다. 금생수(金生水)로 경금(庚)이 자수(子)를 생하는 구조라 에너지를 잘 전환하고 활용합니다. 지적인 탐구심이 강하고 논리적 사고력이 뛰어나며, 원칙을 지키는 강직함과 유연한 적응력을 함께 가집니다.',
  경인:'강인하고 도전적인 성격으로 어떤 상황에서도 굴하지 않는 불굴의 의지가 있습니다. 금극목(金剋木)으로 경금(庚)이 인목(寅)을 극하는 구조라 강한 긴장감이 있지만, 이것이 오히려 창의적 해결책을 찾는 원동력이 됩니다. 자신감 넘치는 개척자 기질이 강합니다.',
  경진:'강인한 의지와 안정적인 기반을 겸비한 현실적인 성격입니다. 토생금(土生金)으로 진토(辰)가 경금(庚)을 키워주는 구조라 내면이 더욱 강해집니다. 신중하고 체계적으로 목표를 달성하며 강한 리더십으로 많은 사람들을 이끌게 됩니다.',
  경오:'뜨거운 열정(午)과 강인한 의지(庚)가 공존하는 강렬한 성격입니다. 화극금(火剋金)으로 내면에 충돌이 있지만, 이것이 단련을 통해 더 강한 자아를 만들어냅니다. 카리스마가 넘치고 존재감이 강하며 어디서든 주목받고, 목표를 정하면 끝까지 밀어붙이는 집념이 있습니다.',
  경신:'금기(金氣)가 두 배로 강한 날카롭고 강직한 성격입니다. 원칙과 정의를 무엇보다 중요하게 여기며, 불합리한 것을 용납하지 못합니다. 자신에게도 타인에게도 엄격한 기준을 적용하지만, 이것이 오히려 높은 신뢰와 권위로 이어집니다.',
  경술:'강인한 의지와 신뢰할 수 있는 안정성을 겸비한 성격입니다. 술(戌) 속에 신금(辛)·정화(丁)·무토(戊)가 숨어 있어 복잡한 내면을 가지고 있습니다. 한 번 맺은 약속은 반드시 지키는 의리파로, 주변 사람들에게 든든한 버팀목이 됩니다.',
  신축:'섬세하고 꼼꼼한 성격으로 높은 품질과 아름다움을 추구합니다. 토생금(土生金)으로 축토(丑)가 신금(辛)을 키워주는 구조라 에너지 기반이 탄탄합니다. 신중하고 차분하게 일을 처리하는 현실적인 완벽주의자로, 작은 것에서도 가치를 발견하는 섬세함이 있습니다.',
  신묘:'예민한 감수성과 창의적인 사고를 가진 예술적 기질의 소유자입니다. 금극목(金剋木)으로 신금(辛)이 묘목(卯)을 극하는 긴장 구조지만, 이 긴장이 섬세한 관찰력과 날카로운 표현력으로 승화됩니다. 독창적인 방법으로 아름다움을 표현하는 재능이 있습니다.',
  신사:'날카로운 지성과 예민한 감각을 갖춘 전략가 성격입니다. 사(巳) 속에 경금(庚)이 있어 신금(辛)을 지지하는 구조로 내면이 더욱 강화됩니다. 신비로운 매력이 있고 복잡한 상황에서도 최선의 해결책을 찾아내는 통찰력이 탁월합니다.',
  신미:'부드럽고 따뜻한 성격 뒤에 섬세하고 날카로운 심미안을 품고 있습니다. 미(未) 속의 정화(丁)가 신금(辛)을 극하는 구조라 내면에 다양한 에너지가 공존합니다. 아름다운 것을 추구하고 우아한 삶을 지향하며, 예술적 감각과 현실적 감각을 동시에 갖추고 있습니다.',
  신유:'금기(金氣)가 두 배로 강한 날카롭고 정교한 성격입니다. 어떤 분야에서든 최고 수준을 달성하려는 완벽주의가 강하며, 타협을 싫어합니다. 차갑게 보일 수 있지만 사실은 깊은 감수성과 따뜻한 마음을 가지고 있으며, 한 번 신뢰하면 끝까지 함께합니다.',
  신해:'감수성이 풍부하고 직관적인 사고를 가진 사색적인 성격입니다. 금생수(金生水)로 신금(辛)이 해수(亥)를 생하는 부드러운 에너지 흐름이 있어 내면이 맑고 깨끗합니다. 예리한 통찰력과 부드러운 표현력을 동시에 갖추어 사람들의 마음을 움직이는 능력이 탁월합니다.',
  임자:'수기(水氣)가 두 배로 강한 지혜롭고 포용력 있는 성격입니다. 자(子) 속의 계수(癸)가 임수(壬)와 함께하여 두뇌가 매우 명석하고 직관이 강합니다. 다재다능하고 적응력이 뛰어나며, 특히 지적인 탐구와 창의적 작업에서 두각을 나타냅니다.',
  임인:'넓은 포용력과 강한 추진력을 함께 가진 역동적인 성격입니다. 수생목(水生木)으로 임수(壬)가 인목(寅)을 키워주는 구조라 창의적이고 생산적인 에너지가 넘칩니다. 리더십이 자연스럽고 사람들을 통해 힘을 얻는 사교적인 성격으로 다양한 분야에서 활약합니다.',
  임진:'깊은 지혜와 강한 포용력으로 많은 것을 담아내는 성격입니다. 진(辰) 속의 계수(癸)·을목(乙)이 임수(壬)와 조화를 이루어 내면이 풍부합니다. 카리스마 있는 리더십과 따뜻한 배려심을 동시에 갖추고 있어 주변 사람들에게 신뢰와 사랑을 받습니다.',
  임오:'물(壬)과 불(午)이 만나는 강렬한 에너지의 소유자입니다. 수극화(水剋火)로 내면에 충돌이 있지만, 이것이 감성과 이성을 동시에 발달시키는 힘이 됩니다. 카리스마가 넘치고 표현력이 뛰어나 많은 사람들에게 강한 인상을 남깁니다.',
  임신:'지성과 통찰력을 겸비한 전략가 성격입니다. 금생수(金生水)로 신금(申)이 임수(壬)를 키워주는 구조라 두뇌가 명석하고 전략적 사고가 탁월합니다. 독립심이 강하고 효율을 중시하며, 혁신적인 아이디어를 실행에 옮기는 데 뛰어납니다.',
  임술:'깊은 사유와 안정된 판단력을 겸비한 신뢰할 수 있는 성격입니다. 술(戌)이 임수(壬)를 막는 구조이지만 술(戌) 속의 정화(丁)·신금(辛)이 복잡한 에너지를 만들어냅니다. 따뜻하고 인간적인 매력이 있으며, 나이가 들수록 더욱 깊이 있는 삶을 살게 됩니다.',
  계축:'빗물(癸)이 대지(丑)에 스며드는 섬세하고 꼼꼼한 성격입니다. 축(丑) 속의 신금(辛)이 계수(癸)를 생해주는 구조로 내면이 맑고 지성이 탁월합니다. 성실하고 차분하게 자신의 길을 걸어가며 꾸준한 노력으로 탄탄한 성과를 이루어냅니다.',
  계묘:'감수성이 풍부하고 창의적인 영감이 넘치는 예술적 기질의 소유자입니다. 수생목(水生木)으로 계수(癸)가 묘목(卯)을 키워주는 구조라 창조적인 에너지가 끊임없이 흘러나옵니다. 자유롭고 독창적인 사고로 새로운 길을 개척하는 것을 즐깁니다.',
  계사:'풍부한 내면 세계와 날카로운 통찰력을 가진 신비로운 매력의 소유자입니다. 수극화(水剋火)로 사(巳)가 계수(癸)를 극하는 긴장 구조이며, 사(巳) 속에 강한 에너지가 숨어 있습니다. 직관이 매우 예리하고 영적인 감각이 발달해 있어 남들이 보지 못하는 것을 감지합니다.',
  계미:'부드럽고 감성적인 성격으로 사람들에게 편안함과 위안을 줍니다. 미(未) 속의 정화(丁)가 계수(癸)를 극하는 구조로 내면에 미묘한 긴장이 있습니다. 타인의 감정에 깊이 공감하고 배려하는 능력이 뛰어나 주변 사람들에게 없어서는 안 될 존재가 됩니다.',
  계유:'예민하고 섬세한 감각의 완벽주의자입니다. 금생수(金生水)로 유금(酉)이 계수(癸)를 키워주는 구조라 에너지 기반이 안정적입니다. 깊은 감수성과 날카로운 심미안으로 아름다움을 추구하며, 조용하지만 내면에 강한 열정과 완벽을 향한 집념이 있습니다.',
  계해:'수기(水氣)가 두 배로 강한 깊고 풍부한 내면 세계를 가진 사색가입니다. 해(亥) 속의 임수(壬)·갑목(甲)이 함께하여 지혜와 창의성이 더욱 강화됩니다. 직관이 매우 발달해 있고 영적인 감각이 뛰어나 인간과 세상의 본질을 꿰뚫어보는 능력이 있습니다.',
};

// ─── 기둥 계산 ────────────────────────────────────────────────────────────────
/**
 * 삼합(三合) — 지지 셋이 모여 한 오행을 이루는 무리.
 *
 * **생(生)·왕(旺)·묘(墓) 차례로 적는다.** 이 순서가 곧 규칙인 쓰임이 있다 —
 * 삼재는 묘고(셋째)에서 끝나는 세 해이고, 십이신살은 생지(첫째)를 지살로
 * 삼아 열둘을 돌린다. 정렬을 바꾸면 그 둘이 조용히 틀린다.
 *
 * 셋이 여기 흩어져 있던 것을 모았다 — 궁합(집합으로만 씀)·삼재·십이신살.
 * 표가 갈라져 있으면 한 곳만 고쳐진 채로 남는다.
 */
export const SAMHAP: readonly (readonly [number, number, number])[] = [
  [8, 0, 4],   // 신자진 — 수국(水局)
  [2, 6, 10],  // 인오술 — 화국(火局)
  [11, 3, 7],  // 해묘미 — 목국(木局)
  [5, 9, 1],   // 사유축 — 금국(金局)
] as const;

/** 그 지지가 속한 삼합 무리 */
export const samhapOf = (branchIdx: number) =>
  SAMHAP.find(g => g.includes(branchIdx))!;

export interface Pillar { stemIdx: number; branchIdx: number }

const DEG = Math.PI / 180;
const J1970 = 2440587.5; // 1970-01-01 00:00 UTC의 율리우스일

/*
 * 절기(節氣)
 *
 * 연주는 1월 1일이 아니라 입춘(立春)에, 월주는 초하루가 아니라 절(節)에 바뀐다.
 * 전에는 [2,4] 같은 고정 날짜 표를 썼는데 실제 입춘은 2월 3일 22:59(2021)에서
 * 2월 5일 사이를 오간다 — 표로는 해마다 며칠씩 틀린다. 게다가 이 파일 안에 서로
 * 어긋나는 절기 표가 둘 있었다(월주는 입추를 8월 8일로, 대운은 8월 7일로 봤다).
 *
 * 그래서 절기 시각을 직접 계산한다. 태양 황경이 15°의 배수를 지나는 순간이
 * 절기이며, 태양 위치는 Meeus 《Astronomical Algorithms》 25장의 낮은 정밀도
 * 식이다. 2025년 한국천문연구원 발표값과 견주면 열두 절 모두 오차 ±8분 안이며
 * tests/saju-calendar.test.ts가 이를 대조한다. ΔT(약 69초)는 그 오차에 묻히므로
 * 넣지 않았다. 절입 시각 10분 안쪽에 태어났다면 전문 만세력으로 다시 보는 편이 낫다.
 */

/** 율리우스일 → 태양 겉보기 황경(도) */
function sunLongitude(jd: number): number {
  const T = (jd - 2451545) / 36525;
  const L0 = 280.46646 + 36000.76983 * T + 0.0003032 * T * T;
  const M = (357.52911 + 35999.05029 * T - 0.0001537 * T * T) * DEG;
  const C = (1.914602 - 0.004817 * T - 0.000014 * T * T) * Math.sin(M)
          + (0.019993 - 0.000101 * T) * Math.sin(2 * M)
          + 0.000289 * Math.sin(3 * M);
  const om = (125.04 - 1934.136 * T) * DEG;
  return ((L0 + C - 0.00569 - 0.00478 * Math.sin(om)) % 360 + 360) % 360;
}

/**
 * 그 달의 절(節)이 드는 순간 — 유닉스 ms(UTC).
 *
 * 양력 월마다 절이 하나씩 있고, 그 절을 지나면 월지가 `month % 12`로 바뀐다
 * (1월 소한 → 丑, 2월 입춘 → 寅, … 11월 입동 → 亥, 12월 대설 → 子).
 * 황경은 소한 285°에서 시작해 한 달에 30°씩 간다.
 */
export function jeolgiUtc(year: number, month: number): number {
  const target = (285 + (month - 1) * 30) % 360;
  let jd = Date.UTC(year, month - 1, 6) / 86400000 + J1970;
  for (let i = 0; i < 8; i++) {
    let d = sunLongitude(jd) - target;
    if (d > 180) d -= 360; else if (d < -180) d += 360;
    jd -= d / 0.9856473; // 태양은 하루에 약 0.9856° 간다
  }
  return (jd - J1970) * 86400000;
}

/** 그 순간 Asia/Seoul의 UTC 오프셋(ms) */
function seoulOffsetMs(utcMs: number): number {
  const name = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Seoul', timeZoneName: 'longOffset' })
    .formatToParts(utcMs).find(p => p.type === 'timeZoneName')?.value ?? '';
  const m = /GMT([+-])(\d\d):(\d\d)/.exec(name);
  if (!m) return 9 * 3600000;
  return (m[1] === '-' ? -1 : 1) * (Number(m[2]) * 3600000 + Number(m[3]) * 60000);
}

/**
 * 한국에서 시계가 가리킨 시각 → 실제 순간(유닉스 ms).
 *
 * 표준 자오선이 두 번 바뀌었고(1954-03-21 ~ 1961-08-09은 동경 127.5도라 UTC+8:30)
 * 서머타임도 세 차례 있었다(1948~1951 · 1955~1960 · 1987~1988). 전환 날짜를 손으로
 * 적는 대신 Intl의 IANA 시간대 자료(Asia/Seoul)를 읽는다 — 브라우저와 Node 모두
 * 갖고 있고 이 전환들이 전부 들어 있다.
 *
 * 오프셋은 순간이 정해져야 알 수 있고 순간은 오프셋이 있어야 정해지므로 두 번 돈다.
 */
export function koreaClockToUtc(year: number, month: number, day: number, hour: number, minute: number): number {
  const wall = Date.UTC(year, month - 1, day, hour, minute);
  let ms = wall - 9 * 3600000;
  for (let i = 0; i < 2; i++) ms = wall - seoulOffsetMs(ms);
  return ms;
}

/** 서울의 경도(동경). 한국 표준시(동경 135도)보다 32분 늦다 */
const SEOUL_LON = 126.978;

/** 균시차(분) — 궤도가 타원이라 태양의 남중 시각이 계절마다 ±16분 흔들린다 (Meeus 28장) */
function eqOfTime(jd: number): number {
  const T = (jd - 2451545) / 36525;
  const L0 = (280.46646 + 36000.76983 * T + 0.0003032 * T * T) * DEG;
  const M = (357.52911 + 35999.05029 * T - 0.0001537 * T * T) * DEG;
  const e = 0.016708634 - 0.000042037 * T;
  const eps = (23.439291 - 0.0130042 * T) * DEG;
  const y = Math.tan(eps / 2) ** 2;
  const E = y * Math.sin(2 * L0) - 2 * e * Math.sin(M)
          + 4 * e * y * Math.sin(M) * Math.cos(2 * L0)
          - 0.5 * y * y * Math.sin(4 * L0) - 1.25 * e * e * Math.sin(2 * M);
  return (E / DEG) * 4;
}

/**
 * 진태양시(眞太陽時) — 서울 하늘의 해가 실제로 가리키는 시각.
 *
 * 시주는 표준시가 아니라 이 시각으로 뽑는다. 한국 표준시는 동경 135도가 기준이라
 * 서울(126.98도)보다 32분 이르고, 여기에 균시차를 더한 것이 진태양시다. 그래서
 * 서울에서 午時는 11:00~13:00이 아니라 대략 11:32~13:32이다.
 *
 * 반환값은 UTC 눈금 위에 얹은 태양시라 `getUTCHours()`로 읽어야 한다.
 */
export function trueSolarMs(utcMs: number): number {
  return utcMs + (SEOUL_LON / 15) * 3600000 + eqOfTime(utcMs / 86400000 + J1970) * 60000;
}

const DAY_OFFSET = 17;
// Date.UTC 사용: new Date(y,m,d)는 KST 자정 = UTC 전날 오후3시이므로 unixDay가 -1 오차 발생
export function getDayPillar(year: number, month: number, day: number): Pillar {
  const unixDay = Math.floor(Date.UTC(year, month - 1, day) / 86400000);
  const idx = ((unixDay + DAY_OFFSET) % 60 + 60) % 60;
  return { stemIdx: idx % 10, branchIdx: idx % 12 };
}

export function getHourPillar(hour: number, dayStemIdx: number): Pillar {
  const branchIdx = Math.floor(((hour+1)%24)/2);
  const BASE=[0,2,4,6,8];
  return { stemIdx:(BASE[dayStemIdx%5]+branchIdx)%10, branchIdx };
}

export interface Birth {
  year: number; month: number; day: number;
  /** 시(0~23) — 모르면 null. 시주를 만들지 않는다 */
  hour: number | null;
  minute?: number;
}

export interface Chart {
  year: Pillar; month: Pillar; day: Pillar; hour: Pillar | null;
  /** 시주를 뽑는 데 쓴 진태양시 — 시를 모르면 null */
  solarHour: { hour: number; minute: number } | null;
  /** 시계 시각과 진태양시의 차이(분). 음수면 진태양시가 늦다 */
  solarShiftMin: number;
  daewoonDirection: 'forward' | 'backward';
  daewoonStartAge: number;
  daewoons: DaewoonEntry[];
}

/** 갑기년 병인두(丙寅頭) — 연간에 따라 寅월의 천간이 정해진다 */
const MONTH_STEM_BASE = [2, 4, 6, 8, 0];

/** 절기해(입춘~입춘)의 간지. 세운(歲運)처럼 해만 알면 되는 곳에 쓴다 */
export function yearPillarOf(solarYear: number): Pillar {
  return { stemIdx: ((solarYear - 4) % 10 + 10) % 10, branchIdx: ((solarYear - 4) % 12 + 12) % 12 };
}

/**
 * 생년월일시 하나에서 네 기둥과 대운을 모두 뽑는다.
 *
 * 한국어 화면과 아홉 언어 화면이 이 함수 하나를 쓴다 — 기둥 계산이 두 벌이면
 * 같은 생일이 언어에 따라 다른 명식을 낸다.
 *
 * ── 일주와 야자시 ─────────────────────────────────────────────────────────
 * 일주는 시계 자정(한국 표준시)에 바뀌는 것으로 본다. 23시 이후 출생을 다음 날
 * 일주로 넘기는 야자시론(夜子時論)도 널리 쓰이지만 학파가 갈리므로 건드리지
 * 않았다 — 여기서는 자정 기준 한 가지만 쓴다.
 */
export function buildChart(b: Birth, gender: 'male' | 'female'): Chart {
  const hasHour = b.hour !== null && b.hour !== undefined;
  // 시를 모르면 절기 경계 판정만 정오로 본다. 절입이 하루 안 어디든 있을 수 있어
  // 자정으로 몰기보다 가운데를 잡는 편이 어긋날 폭이 절반이다.
  const utc = koreaClockToUtc(b.year, b.month, b.day, hasHour ? b.hour! : 12, b.minute ?? 0);

  // 연주 — 입춘 기준
  const year = yearPillarOf(utc < jeolgiUtc(b.year, 2) ? b.year - 1 : b.year);

  // 월주 — 그 달의 절이 아직 안 들었으면 앞 달의 절기월이다
  const jm = utc < jeolgiUtc(b.year, b.month) ? (b.month === 1 ? 12 : b.month - 1) : b.month;
  const branchIdx = jm % 12;
  const month: Pillar = {
    stemIdx: (MONTH_STEM_BASE[year.stemIdx % 5] + ((branchIdx - 2 + 12) % 12)) % 10,
    branchIdx,
  };

  const day = getDayPillar(b.year, b.month, b.day);

  let hour: Pillar | null = null;
  let solarHour: Chart['solarHour'] = null;
  let solarShiftMin = 0;
  if (hasHour) {
    const s = new Date(trueSolarMs(utc));
    solarHour = { hour: s.getUTCHours(), minute: s.getUTCMinutes() };
    solarShiftMin = Math.round((trueSolarMs(utc) - Date.UTC(b.year, b.month - 1, b.day, b.hour!, b.minute ?? 0)) / 60000);
    hour = getHourPillar(solarHour.hour, day.stemIdx);
  }

  const daewoonDirection = getDaewoonDirection(gender, year.stemIdx);
  const daewoonStartAge = getDaewoonStartAge(utc, b.year, b.month, daewoonDirection);
  return {
    year, month, day, hour, solarHour, solarShiftMin,
    daewoonDirection, daewoonStartAge,
    daewoons: getDaewoons(month, daewoonDirection, daewoonStartAge),
  };
}

// ─── 오행 집계 ────────────────────────────────────────────────────────────────
export function countElements(pillars: (Pillar|null)[]): Record<Element, number> {
  const cnt: Record<Element, number> = { 목:0, 화:0, 토:0, 금:0, 수:0 };
  for (const p of pillars) {
    if (!p) continue;
    cnt[STEM_ELEMENTS[p.stemIdx]]++;
    cnt[BRANCH_ELEMENTS[p.branchIdx]]++;
  }
  return cnt;
}

// ─── 헬퍼 ────────────────────────────────────────────────────────────────────
export function pillarLabel(p: Pillar) { return `${STEMS[p.stemIdx].kor}${BRANCHES[p.branchIdx].kor}`; }
export function pillarHanja(p: Pillar) { return `${STEMS[p.stemIdx].hanja}${BRANCHES[p.branchIdx].hanja}`; }
export const SI_NAMES=['자시','축시','인시','묘시','진시','사시','오시','미시','신시','유시','술시','해시'];
export function hourToSi(hour: number) { return SI_NAMES[Math.floor(((hour+1)%24)/2)]; }

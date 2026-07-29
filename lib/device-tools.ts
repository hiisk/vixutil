/**
 * 기기 점검(/device) 섹션의 도구 메타데이터.
 *
 * 이 섹션의 전제: 브라우저가 이미 갖고 있는 표준 API만으로 "내 장비가 제대로
 * 도는가"를 직접 확인해 준다. 설치도 로그인도 없고, 카메라·마이크 스트림은
 * 화면에 그리기만 하고 어디로도 보내지 않는다(정적 배포라 보낼 서버도 없다).
 *
 * 여기엔 목록·검색·사이트맵·상세 셸에 필요한 메타만 둔다.
 * 실제 측정 UI는 components/device/*.tsx가 슬러그별로 담당한다.
 */
export interface DeviceTool {
  slug: string;
  /** 카드·h1에 쓰는 짧은 이름 */
  title: string;
  /** 카드 아래 한 줄 */
  desc: string;
  icon: string;
  category: string;
  /** 상세 페이지 히어로·OG 카드 그라디언트 (from → to) */
  gradient: string;
  /** OG 이미지용 hex 쌍 — 타이틀 그라디언트와 같은 계열로 맞춘다 */
  og: [string, string];
  /** metadata.description 및 상세 페이지 리드 문단 */
  long: string;
  /** 검색 결과 <title>에 붙는 부제 — 페이지마다 달라야 중복 메타가 안 난다 */
  metaTitle: string;
  /** 이 도구가 실제로 무엇을 재는지 3~4개 */
  checks: string[];
  /** 브라우저 권한이 필요한 도구인지 (카메라·마이크) */
  needsPermission?: boolean;
}

export const DEVICE_TOOLS: DeviceTool[] = [
  {
    slug: 'keyboard',
    title: '키보드 테스트',
    desc: '안 눌리는 키·동시입력(N키 롤오버) 확인',
    icon: '⌨️',
    category: '입력장치',
    gradient: 'from-sky-500 to-indigo-600',
    og: ['#0ea5e9', '#4f46e5'],
    metaTitle: '키보드 테스트 - 키 입력·동시입력 확인',
    long: '키를 누르면 화면의 가상 키보드에 그대로 표시됩니다. 반응이 없는 키, 한 번 눌렀는데 두 번 입력되는 키, 동시에 몇 개까지 인식되는지(N키 롤오버)를 브라우저에서 바로 확인하세요.',
    checks: ['키별 입력 인식', '눌린 키 코드(KeyboardEvent.code)', '동시입력 최대 개수', '아직 안 눌러본 키 목록'],
  },
  {
    slug: 'mouse',
    title: '마우스 클릭 테스트',
    desc: '좌·우·휠 클릭과 채터링(더블클릭 오작동) 검사',
    icon: '🖱️',
    category: '입력장치',
    gradient: 'from-violet-500 to-fuchsia-600',
    og: ['#8b5cf6', '#d946ef'],
    metaTitle: '마우스 클릭 테스트 - 채터링·버튼 인식 확인',
    long: '좌클릭·우클릭·휠클릭·사이드 버튼이 제대로 인식되는지, 한 번 눌렀는데 두 번 입력되는 채터링이 있는지 클릭 간격(ms)으로 확인합니다. 스크롤 방향과 커서 이동 폴링도 함께 봅니다.',
    checks: ['버튼별 클릭 인식', '채터링 의심 클릭(간격 ms)', '휠 스크롤 방향·단위', '커서 이동 이벤트 빈도'],
  },
  {
    slug: 'mic',
    title: '마이크 테스트',
    desc: '입력 볼륨 실시간 확인 + 녹음해서 들어보기',
    icon: '🎤',
    category: '오디오',
    gradient: 'from-rose-500 to-orange-500',
    og: ['#f43f5e', '#f97316'],
    metaTitle: '마이크 테스트 - 입력 볼륨·녹음 확인',
    long: '마이크가 소리를 받고 있는지 실시간 레벨 미터로 확인하고, 몇 초 녹음해 바로 들어보며 실제로 어떻게 들리는지 점검합니다. 화상회의·게임 전 1분 점검용입니다.',
    checks: ['입력 레벨(실시간 미터)', '주파수 스펙트럼', '녹음 후 재생 확인', '연결된 마이크 장치 목록'],
    needsPermission: true,
  },
  {
    slug: 'webcam',
    title: '웹캠 테스트',
    desc: '화면·해상도·프레임레이트 확인 및 스냅샷',
    icon: '📷',
    category: '영상',
    gradient: 'from-cyan-500 to-blue-600',
    og: ['#06b6d4', '#2563eb'],
    metaTitle: '웹캠 테스트 - 카메라 화면·해상도 확인',
    long: '카메라가 켜지는지, 어떤 해상도와 프레임레이트로 들어오는지 확인하고 스냅샷을 찍어 화질을 봅니다. 영상은 이 브라우저 안에서만 재생되며 서버로 전송되지 않습니다.',
    checks: ['카메라 화면 출력', '해상도·프레임레이트', '스냅샷 저장', '연결된 카메라 장치 전환'],
    needsPermission: true,
  },
  {
    slug: 'speaker',
    title: '스피커·이어폰 테스트',
    desc: '좌우 채널 분리와 들리는 주파수 대역 확인',
    icon: '🔊',
    category: '오디오',
    gradient: 'from-emerald-500 to-teal-600',
    og: ['#10b981', '#0d9488'],
    metaTitle: '스피커·이어폰 테스트 - 좌우 채널·주파수 확인',
    long: '왼쪽·오른쪽을 따로 울려 채널이 바뀌지 않았는지, 한쪽만 안 나오지는 않는지 확인합니다. 20Hz~16kHz 주파수를 직접 올려가며 내 이어폰과 귀가 어디까지 들리는지도 볼 수 있습니다.',
    checks: ['좌·우 채널 개별 재생', '좌우 균형(스테레오) 확인', '주파수 대역별 재생', '볼륨 조절'],
  },
  {
    slug: 'monitor',
    title: '모니터 불량화소 테스트',
    desc: '단색 전체화면으로 죽은 픽셀·얼룩 찾기',
    icon: '🖥️',
    category: '화면',
    gradient: 'from-slate-600 to-indigo-700',
    og: ['#475569', '#4338ca'],
    metaTitle: '모니터 불량화소 테스트 - 죽은 픽셀·빛샘 확인',
    long: '빨강·초록·파랑·흰색·검정을 전체화면으로 띄워 늘 꺼져 있는 점(데드 픽셀), 늘 켜져 있는 점(스턱 픽셀), 가장자리 빛샘과 얼룩을 찾습니다. 새 모니터를 받은 날 가장 먼저 해야 하는 점검입니다.',
    checks: ['단색 전체화면 5색', '그레이 그라디언트(밴딩)', '색 번짐·잔상 확인', '가장자리 빛샘 확인'],
  },
  {
    slug: 'refresh-rate',
    title: '모니터 주사율 테스트',
    desc: '내 화면이 실제 몇 Hz로 도는지 측정',
    icon: '⚡',
    category: '화면',
    gradient: 'from-amber-500 to-rose-500',
    og: ['#f59e0b', '#f43f5e'],
    metaTitle: '모니터 주사율 테스트 - 실제 Hz 측정',
    long: '설정에 적힌 숫자 말고 지금 이 화면이 실제로 초당 몇 번 그려지는지 잽니다. 144Hz 모니터를 사고도 60Hz로 쓰고 있는 경우가 흔한데, 그걸 바로 확인할 수 있습니다.',
    checks: ['실측 주사율(Hz)', '프레임 간격 편차(끊김)', '최소·최대 프레임 시간', '움직임 부드러움 눈으로 비교'],
  },
  {
    slug: 'touch',
    title: '터치스크린 테스트',
    desc: '멀티터치 인식 개수와 안 먹는 영역 확인',
    icon: '👆',
    category: '입력장치',
    gradient: 'from-pink-500 to-violet-600',
    og: ['#ec4899', '#7c3aed'],
    metaTitle: '터치스크린 테스트 - 멀티터치·인식 불량 영역 확인',
    long: '화면을 손가락으로 눌러 터치 좌표와 동시 인식 개수를 확인하고, 손가락으로 문질러 반응이 없는 영역이 있는지 찾습니다. 액정을 갈았거나 화면이 가끔 안 먹을 때 쓰세요.',
    checks: ['터치 좌표 실시간 표시', '동시 터치 최대 개수', '드래그 궤적으로 사각지대 찾기', '압력·터치 면적(지원 기기)'],
  },
  {
    slug: 'gamepad',
    title: '게임패드 테스트',
    desc: '버튼·아날로그 스틱·트리거 입력 확인',
    icon: '🎮',
    category: '입력장치',
    gradient: 'from-indigo-500 to-cyan-500',
    og: ['#6366f1', '#06b6d4'],
    metaTitle: '게임패드 테스트 - 버튼·스틱 드리프트 확인',
    long: '컨트롤러를 연결하고 버튼을 눌러 인식 여부를, 스틱을 놓은 채로 좌표가 흔들리는지(스틱 드리프트) 확인합니다. 엑스박스·플레이스테이션·닌텐도 계열 패드 모두 브라우저 표준 API로 인식합니다.',
    checks: ['버튼별 입력·아날로그 값', '왼쪽·오른쪽 스틱 좌표', '스틱 드리프트(중립 이탈)', '트리거 눌림 정도'],
  },
  {
    slug: 'info',
    title: '내 기기 정보',
    desc: '해상도·브라우저·OS·코어 수 한눈에 보기',
    icon: '🧾',
    category: '정보',
    gradient: 'from-teal-500 to-sky-600',
    og: ['#14b8a6', '#0284c7'],
    metaTitle: '내 기기 정보 - 해상도·브라우저·OS 확인',
    long: '지금 쓰는 화면 해상도와 브라우저 창 크기, 픽셀 배율, 브라우저·운영체제 버전, CPU 코어 수까지 한 화면에 모아 보여줍니다. 원격 지원을 요청하거나 사양을 물어봤을 때 그대로 복사해 보내면 됩니다.',
    checks: ['화면 해상도·창 크기', '픽셀 배율(DPR)·색심도', '브라우저·엔진·운영체제', 'CPU 코어·메모리·터치 지원'],
  },
];

/** 같은 카테고리를 먼저, 그다음 나머지에서 채워 상세 페이지 하단 추천을 만든다. */
export function relatedDeviceTools(slug: string, limit = 4): DeviceTool[] {
  const current = DEVICE_TOOLS.find(t => t.slug === slug);
  if (!current) return [];
  const others = DEVICE_TOOLS.filter(t => t.slug !== slug);
  const same = others.filter(t => t.category === current.category);
  const rest = others.filter(t => t.category !== current.category);
  return [...same, ...rest].slice(0, limit);
}

export function findDeviceTool(slug: string): DeviceTool | undefined {
  return DEVICE_TOOLS.find(t => t.slug === slug);
}

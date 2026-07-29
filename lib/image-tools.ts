/**
 * 이미지 도구(/image) 섹션의 도구 메타데이터.
 *
 * 이 섹션의 전제: 사진 편집은 대개 "파일을 어딘가에 올리고" 시작하는데, 그게
 * 가장 꺼려지는 부분이다. 여기서는 canvas만 쓰기 때문에 사진이 브라우저 밖으로
 * 나가지 않는다 — 정적 배포라 받을 서버 자체가 없다.
 *
 * 목록·검색·사이트맵·상세 셸에 필요한 메타만 둔다.
 * 실제 편집 UI는 components/image/*.tsx가 슬러그별로 담당한다.
 */
export interface ImageTool {
  slug: string;
  title: string;
  desc: string;
  icon: string;
  category: string;
  /** 상세 히어로·OG 카드 그라디언트 */
  gradient: string;
  /** OG 이미지용 hex 쌍 */
  og: [string, string];
  /** metadata.description 및 상세 리드 문단 */
  long: string;
  /** <title>에 쓰는 문구 — 페이지마다 달라야 중복 메타가 안 난다 */
  metaTitle: string;
  /** 이 도구로 할 수 있는 일 3~4개 */
  features: string[];
}

export const IMAGE_TOOLS: ImageTool[] = [
  {
    slug: 'compress',
    title: '이미지 용량 줄이기',
    desc: '화질을 조절해 사진 파일 크기를 줄입니다',
    icon: '🗜️',
    category: '용량·크기',
    gradient: 'from-violet-500 to-indigo-600',
    og: ['#8b5cf6', '#4f46e5'],
    metaTitle: '이미지 용량 줄이기 - 사진 파일 크기 압축',
    long: '첨부 용량 제한에 걸릴 때 쓰세요. 화질을 조금씩 낮춰가며 원본과 결과를 나란히 비교하고, 몇 %가 줄었는지 바로 확인할 수 있습니다. 사진은 브라우저 안에서만 처리되고 서버로 올라가지 않습니다.',
    features: ['화질 슬라이더로 압축 강도 조절', '원본 대비 절감률 즉시 표시', '원본과 결과 나란히 비교', 'JPG·WebP로 저장'],
  },
  {
    slug: 'resize',
    title: '이미지 크기 조절',
    desc: '가로·세로 픽셀을 원하는 크기로 바꿉니다',
    icon: '📐',
    category: '용량·크기',
    gradient: 'from-sky-500 to-cyan-600',
    og: ['#0ea5e9', '#0891b2'],
    metaTitle: '이미지 크기 조절 - 사진 가로세로 픽셀 변경',
    long: '가로·세로를 직접 입력하거나 비율(%)로 줄일 수 있고, 비율 고정을 켜두면 사진이 찌그러지지 않습니다. 인스타그램·유튜브 썸네일·프로필 사진 같은 자주 쓰는 크기는 버튼 하나로 맞춰집니다.',
    features: ['픽셀 직접 입력 또는 비율(%) 축소', '가로세로 비율 고정', '자주 쓰는 규격 프리셋', '결과 용량 미리 보기'],
  },
  {
    slug: 'convert',
    title: '이미지 포맷 변환',
    desc: 'JPG·PNG·WebP 사이에서 형식을 바꿉니다',
    icon: '🔄',
    category: '용량·크기',
    gradient: 'from-emerald-500 to-teal-600',
    og: ['#10b981', '#0d9488'],
    metaTitle: '이미지 포맷 변환 - JPG PNG WebP 서로 바꾸기',
    long: 'WebP만 받아주지 않는 곳에 올릴 때, 반대로 용량을 줄이려고 WebP로 바꿀 때 쓰세요. 투명 배경이 있는 PNG를 JPG로 바꾸면 배경이 채워지므로 배경색도 함께 고를 수 있습니다.',
    features: ['JPG · PNG · WebP 상호 변환', '손실 포맷은 화질 조절', '투명 배경 채울 색 선택', '변환 전후 용량 비교'],
  },
  {
    slug: 'crop',
    title: '이미지 자르기',
    desc: '필요한 부분만 잘라냅니다',
    icon: '✂️',
    category: '편집',
    gradient: 'from-rose-500 to-orange-500',
    og: ['#f43f5e', '#f97316'],
    metaTitle: '이미지 자르기 - 사진 원하는 부분만 잘라내기',
    long: '사진 위에서 영역을 끌어 원하는 부분만 남깁니다. 1:1·16:9·프로필 같은 비율로 고정하면 규격에 맞춰 잘리고, 자유 비율로 두면 원하는 대로 잡을 수 있습니다.',
    features: ['드래그로 자를 영역 지정', '1:1 · 4:3 · 16:9 등 비율 고정', '잘린 크기 실시간 표시', '원본 화질 그대로 저장'],
  },
  {
    slug: 'rotate',
    title: '이미지 회전·반전',
    desc: '돌아간 사진을 바로 세우고 좌우를 뒤집습니다',
    icon: '🔃',
    category: '편집',
    gradient: 'from-amber-500 to-rose-500',
    og: ['#f59e0b', '#f43f5e'],
    metaTitle: '이미지 회전·반전 - 사진 돌리기, 좌우 뒤집기',
    long: '옆으로 누워 저장된 사진을 90도씩 돌려 바로 세우고, 거울처럼 뒤집힌 셀카를 좌우 반전으로 되돌립니다. 회전 각도를 1도 단위로 미세 조정해 수평선을 맞출 수도 있습니다.',
    features: ['90도씩 좌·우 회전', '좌우 반전 · 상하 반전', '1도 단위 미세 각도 조정', '회전 후 여백 배경색 선택'],
  },
  {
    slug: 'mosaic',
    title: '모자이크 가리기',
    desc: '얼굴·주소 등 가리고 싶은 곳을 문질러 지웁니다',
    icon: '🔳',
    category: '편집',
    gradient: 'from-slate-600 to-violet-700',
    og: ['#475569', '#6d28d9'],
    metaTitle: '모자이크 가리기 - 사진 속 얼굴·개인정보 지우기',
    long: '중고거래 인증샷의 주소, 단체 사진 속 남의 얼굴처럼 가려야 할 부분을 손가락이나 마우스로 문지르면 그 자리만 모자이크됩니다. 사진이 서버로 가지 않으니 개인정보가 담긴 화면도 안심하고 처리할 수 있습니다.',
    features: ['드래그한 자리만 모자이크', '모자이크 굵기 조절', '검은색으로 완전히 덮기', '실수한 부분만 되돌리기'],
  },
  {
    slug: 'merge',
    title: '사진 이어붙이기',
    desc: '여러 장을 한 장으로 세로·가로 연결합니다',
    icon: '🧩',
    category: '편집',
    gradient: 'from-fuchsia-500 to-sky-500',
    og: ['#d946ef', '#0ea5e9'],
    metaTitle: '사진 이어붙이기 - 여러 장을 한 장으로 합치기',
    long: '대화 캡처를 한 장으로 잇거나 비포·애프터를 나란히 붙일 때 씁니다. 폭이 다른 사진도 자동으로 맞춰 정렬하고, 사진 사이 간격과 배경색을 고를 수 있습니다.',
    features: ['세로 · 가로 방향 선택', '폭이 다른 사진 자동 정렬', '사진 간격 · 배경색 지정', '순서 바꾸기'],
  },
  {
    slug: 'palette',
    title: '이미지 색상 추출',
    desc: '사진에서 많이 쓰인 색을 뽑아 HEX로 보여줍니다',
    icon: '🎨',
    category: '분석',
    gradient: 'from-pink-500 to-violet-600',
    og: ['#ec4899', '#7c3aed'],
    metaTitle: '이미지 색상 추출 - 사진에서 HEX 색상 코드 뽑기',
    long: '마음에 드는 사진의 분위기를 그대로 쓰고 싶을 때, 그 사진에서 가장 많이 쓰인 색들을 뽑아 HEX·RGB 코드로 보여줍니다. 사진 위 아무 지점이나 찍으면 그 자리의 색도 바로 알 수 있습니다.',
    features: ['대표 색 팔레트 자동 추출', '색마다 사용 비율 표시', '원하는 지점 색 찍어보기(스포이드)', 'HEX 코드 클릭 한 번에 복사'],
  },
];

/** 같은 카테고리를 먼저, 그다음 나머지에서 채운다. */
export function relatedImageTools(slug: string, limit = 4): ImageTool[] {
  const current = IMAGE_TOOLS.find(t => t.slug === slug);
  if (!current) return [];
  const others = IMAGE_TOOLS.filter(t => t.slug !== slug);
  const same = others.filter(t => t.category === current.category);
  const rest = others.filter(t => t.category !== current.category);
  return [...same, ...rest].slice(0, limit);
}

export function findImageTool(slug: string): ImageTool | undefined {
  return IMAGE_TOOLS.find(t => t.slug === slug);
}

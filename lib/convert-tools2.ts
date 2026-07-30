/**
 * 단위 변환 둘째 묶음 (50종) — 첫 묶음이 일상에서 가장 자주 찾는 것들이었으니
 * 여기는 한 걸음 더 들어간 것들이다.
 *
 * 세 갈래로 골랐다.
 *  1. 라벨과 도면에서 만나는 것 — 트로이온스, 그레인, 포인트, KiB와 KB의 차이
 *  2. 문화권별 전통 단위 — 중국 근(500g)·척(33.33cm)·무(666.67㎡), 일본 촌·몬메
 *  3. 새 분류 셋 — 시간(영상 프레임·음악 BPM), 각도
 *
 * 계수는 정의값과 관습값이 섞여 있다. 특히 중국 근 500g은 한국 근 600g과 다르므로
 * note에 반드시 적는다 — 한 글자 차이로 20% 틀리는 값이 된다.
 */
import type { ConvertTool } from './convert-tools.ts';

const LENGTH2: ConvertTool[] = [
  {
    slug: 'lightyear-km', title: '광년 ↔ km', desc: '광년을 킬로미터로 바꿉니다', icon: '🌌',
    category: '길이', from: '광년', to: 'km', factor: 9460730472580.8, digits: 0, quick: [1, 2, 4.2, 10, 100, 1000],
    metaTitle: '광년 ↔ km 변환 - 빛이 1년에 가는 거리',
    long: '1광년은 빛이 진공에서 1년 동안 가는 거리로 약 9조 4,607억 km입니다. 가장 가까운 별인 프록시마 켄타우리가 4.2광년 떨어져 있습니다.',
    note: '광년은 시간이 아니라 거리 단위입니다. "몇 광년 뒤"라는 표현은 틀린 말입니다.',
  },
  {
    slug: 'au-km', title: '천문단위(AU) ↔ km', desc: '지구-태양 거리 단위를 킬로미터로 바꿉니다', icon: '☀️',
    category: '길이', from: 'AU', to: 'km', factor: 149597870.7, digits: 0, quick: [1, 1.5, 5.2, 9.5, 30, 39],
    metaTitle: '천문단위 AU ↔ km 변환 - 태양계 거리 단위',
    long: '1천문단위는 지구와 태양의 평균 거리로 정확히 1억 4,959만 7,870.7km로 정의돼 있습니다. 화성이 1.5AU, 목성이 5.2AU, 해왕성이 30AU 거리입니다.',
    note: '태양계 안에서는 AU가 편하고 별 사이에서는 광년을 씁니다. 1광년은 약 63,241AU입니다.',
  },
  {
    slug: 'fathom-m', title: '패덤 ↔ m', desc: '수심 단위 패덤을 미터로 바꿉니다', icon: '⚓',
    category: '길이', from: '패덤', to: 'm', factor: 1.8288, digits: 3, quick: [1, 5, 10, 20, 50, 100],
    metaTitle: '패덤 ↔ m 변환 - 해도의 수심 단위',
    long: '1패덤은 정확히 6피트, 1.8288m입니다. 양팔을 벌린 길이에서 온 단위로 해도의 수심과 밧줄 길이를 재는 데 쓰입니다.',
    note: '영국·미국 해도는 패덤, 국제 해도는 미터를 씁니다. 같은 해역인데 숫자가 3배 이상 달라 보이면 단위를 먼저 확인하세요.',
  },
  {
    slug: 'furlong-m', title: '펄롱 ↔ m', desc: '경마 거리 단위 펄롱을 미터로 바꿉니다', icon: '🐎',
    category: '길이', from: '펄롱', to: 'm', factor: 201.168, digits: 2, quick: [1, 2, 4, 6, 8, 12],
    metaTitle: '펄롱 ↔ m 변환 - 경마의 거리 단위',
    long: '1펄롱은 1마일의 8분의 1로 201.168m입니다. 소 한 쌍이 쉬지 않고 밭을 가는 길이에서 온 단위로 지금은 경마에서만 남았습니다.',
    note: '경마 중계의 "라스트 1펄롱"은 결승선까지 약 200m가 남았다는 뜻입니다.',
  },
  {
    slug: 'chi-cm', title: '중국 척(尺) ↔ cm', desc: '중국 시장척을 센티미터로 바꿉니다', icon: '📏',
    category: '길이', from: '尺', to: 'cm', factor: 33.3333, digits: 2, quick: [1, 2, 3, 5, 10, 30],
    metaTitle: '중국 척(尺) ↔ cm 변환 - 시장척 33.33cm',
    long: '중국의 시장척(市尺) 1척은 3분의 1미터, 약 33.33cm입니다. 옷감과 목재를 재는 데 아직 쓰이고, 1척은 10촌(寸)으로 나뉩니다.',
    note: '한국의 자(30.3cm)와 일본의 척(30.3cm)은 중국 척과 다릅니다. 세 나라의 "척"이 서로 다른 값이므로 출처를 확인하세요.',
  },
  {
    slug: 'sun-cm', title: '일본 촌(寸) ↔ cm', desc: '일본 촌을 센티미터로 바꿉니다', icon: '🪵',
    category: '길이', from: '寸', to: 'cm', factor: 3.0303, digits: 3, quick: [1, 3, 5, 10, 30, 100],
    metaTitle: '일본 촌(寸) ↔ cm 변환 - 목공 치수 3.03cm',
    long: '일본의 1촌은 척의 10분의 1로 약 3.03cm입니다. 목공과 건축에서 지금도 쓰이며, 일본 목재 규격과 다다미 치수가 이 단위를 따릅니다.',
    note: '한국의 치와 같은 값입니다. 다만 중국 촌은 3.33cm로 10% 크므로 도면 출처를 확인해야 합니다.',
  },
  {
    slug: 'point-mm', title: '포인트(pt) ↔ mm', desc: '인쇄 포인트를 밀리미터로 바꿉니다', icon: '🔤',
    category: '길이', from: 'pt', to: 'mm', factor: 0.3527777778, digits: 3, quick: [8, 10, 12, 14, 24, 72],
    metaTitle: '포인트(pt) ↔ mm 변환 - 글자 크기 단위',
    long: '1포인트는 1인치의 72분의 1로 약 0.3528mm입니다. 문서의 글자 크기와 여백, 선 굵기가 이 단위로 표기됩니다. 12pt는 약 4.2mm입니다.',
    note: '글자 크기 12pt는 글자 높이가 4.2mm라는 뜻이 아닙니다. 글자를 담는 상자의 높이이고 실제 글자는 그보다 작습니다.',
  },
  {
    slug: 'hand-cm', title: '핸드 ↔ cm', desc: '말 키를 재는 핸드를 센티미터로 바꿉니다', icon: '🐴',
    category: '길이', from: '핸드', to: 'cm', factor: 10.16, digits: 2, quick: [10, 12, 14, 15, 16, 17],
    metaTitle: '핸드 ↔ cm 변환 - 말 키 단위',
    long: '1핸드는 4인치, 10.16cm입니다. 말의 키를 어깨(기갑)까지 재는 데 쓰며, 경주마는 보통 15~17핸드입니다. 16핸드는 약 163cm입니다.',
    note: '핸드는 소수점을 4진법처럼 씁니다. "15.2핸드"는 15핸드 2인치라는 뜻으로 15.5핸드가 아닙니다.',
  },
];

const WEIGHT2: ConvertTool[] = [
  {
    slug: 'troyounce-g', title: '트로이온스 ↔ g', desc: '금·은 거래 단위를 그램으로 바꿉니다', icon: '🥇',
    category: '무게', from: '트로이온스', to: 'g', factor: 31.1034768, digits: 4, quick: [1, 2, 5, 10, 32.15, 100],
    metaTitle: '트로이온스 ↔ g 변환 - 금 시세의 무게 단위',
    long: '금과 은의 국제 시세는 트로이온스당 가격으로 표시됩니다. 1트로이온스는 31.1035g으로, 일반 온스 28.35g보다 약 10% 무겁습니다.',
    note: '일반 온스와 혼동하면 금 가격이 10% 어긋납니다. 1kg은 32.15트로이온스입니다.',
  },
  {
    slug: 'grain-g', title: '그레인 ↔ g', desc: '탄약·약제 단위 그레인을 그램으로 바꿉니다', icon: '🌾',
    category: '무게', from: '그레인', to: 'g', factor: 0.06479891, digits: 4, quick: [1, 5, 55, 115, 230, 1000],
    metaTitle: '그레인 ↔ g 변환 - 탄약과 약의 무게 단위',
    long: '1그레인은 정확히 0.06479891g입니다. 보리 한 알 무게에서 온 단위로 탄약의 탄두 무게, 화약량, 일부 약제 표기에 아직 쓰입니다.',
    note: '진주와 보석에 쓰는 "펄 그레인"은 0.25캐럿(50mg)으로 이 그레인과 다릅니다.',
  },
  {
    slug: 'dram-g', title: '드램 ↔ g', desc: '드램을 그램으로 바꿉니다', icon: '⚖️',
    category: '무게', from: '드램', to: 'g', factor: 1.7718451953, digits: 4, quick: [1, 2, 4, 8, 16, 32],
    metaTitle: '드램 ↔ g 변환 - 온스의 16분의 1',
    long: '1드램은 1온스의 16분의 1로 약 1.772g입니다. 향료와 소량 재료 계량에 쓰이며 미국 조리법과 화장품 표기에서 볼 수 있습니다.',
    note: '무게 드램과 부피 드램(액량 드램 3.7ml)은 다릅니다. 표기 앞에 fl(fluid)이 있으면 부피입니다.',
  },
  {
    slug: 'jin-g', title: '중국 근(斤) ↔ g', desc: '중국 시장근을 그램으로 바꿉니다', icon: '🥢',
    category: '무게', from: '斤', to: 'g', factor: 500, digits: 0, quick: [1, 2, 3, 5, 10, 20],
    metaTitle: '중국 근(斤) ↔ g 변환 - 시장근 500g',
    long: '중국의 시장근(市斤) 1근은 정확히 500g으로 정해져 있습니다. 시장과 식당의 재료 표기에 지금도 널리 쓰이며 1근은 10량(兩)입니다.',
    note: '한국의 근은 고기가 600g, 채소가 375g으로 중국 근과 다릅니다. 중국 조리법을 그대로 따르면 20% 차이가 납니다.',
  },
  {
    slug: 'momme-g', title: '몬메(匁) ↔ g', desc: '일본 진주 무게 단위를 그램으로 바꿉니다', icon: '🦪',
    category: '무게', from: '匁', to: 'g', factor: 3.75, digits: 3, quick: [1, 5, 10, 20, 50, 100],
    metaTitle: '몬메(匁) ↔ g 변환 - 진주와 실크의 무게 단위',
    long: '1몬메는 3.75g입니다. 진주 거래의 국제 표준 단위이고 실크 원단의 무게 표기에도 쓰입니다. 한국의 돈과 같은 값입니다.',
    note: '실크의 "16몬메"는 무게가 아니라 두께를 나타내는 관용 표기입니다. 숫자가 클수록 두꺼운 원단입니다.',
  },
  {
    slug: 'longton-kg', title: '롱톤 ↔ kg', desc: '영국 톤을 킬로그램으로 바꿉니다', icon: '🚢',
    category: '무게', from: '롱톤', to: 'kg', factor: 1016.0469088, digits: 2, quick: [1, 2, 5, 10, 100, 1000],
    metaTitle: '롱톤 ↔ kg 변환 - 영국식 톤 1016kg',
    long: '롱톤(영국톤)은 2,240파운드로 1,016.05kg입니다. 미터톤 1,000kg보다 1.6% 무겁고, 선박 배수량과 영국 화물 거래에 쓰입니다.',
    note: '톤에는 롱톤 1,016kg, 숏톤 907kg, 미터톤 1,000kg 셋이 있습니다. 계약서에 어느 톤인지 적혀 있는지 확인하세요.',
  },
  {
    slug: 'shortton-kg', title: '숏톤 ↔ kg', desc: '미국 톤을 킬로그램으로 바꿉니다', icon: '🇺🇸',
    category: '무게', from: '숏톤', to: 'kg', factor: 907.18474, digits: 2, quick: [1, 2, 5, 10, 100, 1000],
    metaTitle: '숏톤 ↔ kg 변환 - 미국식 톤 907kg',
    long: '숏톤(미국톤)은 2,000파운드로 907.18kg입니다. 미터톤보다 9% 가벼워서 미국 자료의 생산량·배출량을 그대로 읽으면 과대평가하게 됩니다.',
    note: '미국 통계에서 "ton"은 대개 숏톤입니다. 국제 자료의 "tonne"은 미터톤 1,000kg입니다.',
  },
  {
    slug: 'mcg-mg', title: 'μg ↔ mg', desc: '마이크로그램을 밀리그램으로 바꿉니다', icon: '💊',
    category: '무게', from: 'μg', to: 'mg', factor: 0.001, digits: 4, quick: [100, 400, 800, 1000, 5000, 10000],
    metaTitle: 'μg ↔ mg 변환 - 영양제 라벨의 단위',
    long: '1,000마이크로그램이 1밀리그램입니다. 비타민 D와 엽산, 비타민 B12처럼 아주 적은 양을 쓰는 영양소는 μg로, 비타민 C처럼 많이 쓰는 것은 mg로 표기됩니다.',
    note: 'mcg와 μg는 같은 단위의 다른 표기입니다. mg와 착각하면 1,000배 차이가 나므로 라벨을 두 번 보세요.',
  },
];

const VOLUME2: ConvertTool[] = [
  {
    slug: 'tbsp-ml', title: '큰술 ↔ ml', desc: '테이블스푼을 밀리리터로 바꿉니다', icon: '🥄',
    category: '부피', from: '큰술', to: 'ml', factor: 15, digits: 1, quick: [1, 2, 3, 4, 6, 10],
    metaTitle: '큰술 ↔ ml 변환 - 조리법의 계량 단위',
    long: '한국과 대부분 나라의 1큰술은 15ml입니다. 조리법의 "큰술"은 깎아서 담은 양을 뜻하고, 수북이 담으면 1.5배가 됩니다.',
    note: '호주의 큰술은 20ml로 다릅니다. 미국은 14.79ml지만 조리에서는 15ml로 봐도 무리가 없습니다.',
  },
  {
    slug: 'tsp-ml', title: '작은술 ↔ ml', desc: '티스푼을 밀리리터로 바꿉니다', icon: '🥄',
    category: '부피', from: '작은술', to: 'ml', factor: 5, digits: 1, quick: [0.5, 1, 2, 3, 4, 6],
    metaTitle: '작은술 ↔ ml 변환 - 조리법의 계량 단위',
    long: '1작은술은 5ml이고 큰술의 3분의 1입니다. 소금·베이킹파우더처럼 조금만 넣어도 결과가 달라지는 재료에 쓰입니다.',
    note: '베이킹파우더와 소다는 작은술 단위의 차이가 결과를 크게 바꿉니다. 부피보다 저울로 재는 편이 정확합니다.',
  },
  {
    slug: 'pint-l', title: '파인트 ↔ L', desc: '파인트를 리터로 바꿉니다', icon: '🍺',
    category: '부피', from: '파인트', to: 'L', factor: 0.473176473, digits: 4, quick: [1, 2, 4, 8, 16, 20],
    metaTitle: '파인트 ↔ L 변환 - 맥주잔의 부피 단위',
    long: '미국 파인트는 473ml, 영국 파인트는 568ml입니다. 이 변환기는 미국 액량 파인트를 씁니다. 아이스크림과 맥주 용량에서 자주 만납니다.',
    note: '영국 펍의 1파인트는 568ml로 미국보다 20% 많습니다. 같은 "파인트"를 시켜도 나오는 양이 다릅니다.',
  },
  {
    slug: 'quart-l', title: '쿼트 ↔ L', desc: '쿼트를 리터로 바꿉니다', icon: '🥛',
    category: '부피', from: '쿼트', to: 'L', factor: 0.946352946, digits: 4, quick: [1, 2, 4, 5, 8, 10],
    metaTitle: '쿼트 ↔ L 변환 - 1갤런의 4분의 1',
    long: '1미국 쿼트는 갤런의 4분의 1로 946ml입니다. 거의 1리터에 가까워서 우유와 엔진오일 용량에서 자주 보입니다.',
    note: '쿼트는 1L보다 5% 적습니다. 엔진오일을 "1쿼트씩" 넣으면 리터로 계산한 양보다 조금 부족합니다.',
  },
  {
    slug: 'cc-ml', title: 'cc ↔ ml', desc: 'cc와 밀리리터의 관계를 확인합니다', icon: '🩺',
    category: '부피', from: 'cc', to: 'ml', factor: 1, digits: 2, quick: [1, 5, 10, 50, 100, 1000],
    metaTitle: 'cc ↔ ml 변환 - 같은 부피의 두 이름',
    long: '1cc는 1세제곱센티미터이고 정확히 1ml와 같습니다. 의료 현장과 자동차 배기량에서는 cc를, 조리와 생활에서는 ml를 쓰는 관습 차이일 뿐입니다.',
    note: '값이 같으니 환산이 필요 없습니다. 다만 1cc는 1g이 아닙니다 — 물일 때만 그렇고 기름은 0.92g입니다.',
  },
  {
    slug: 'hop-ml', title: '홉 ↔ ml', desc: '전통 부피 단위 홉을 밀리리터로 바꿉니다', icon: '🍶',
    category: '부피', from: '홉', to: 'ml', factor: 180.39, digits: 1, quick: [1, 2, 5, 10, 18, 100],
    metaTitle: '홉 ↔ ml 변환 - 됫박 아래의 부피 단위',
    long: '1홉은 되의 10분의 1로 약 180ml입니다. 쌀과 술을 재던 단위로 일본의 합(合)과 같은 값이며, 일본 청주 한 병 720ml가 정확히 4홉입니다.',
    note: '밥 지을 때의 "쌀 한 컵"은 대개 180ml 홉 계량컵을 뜻합니다. 일반 계량컵 200ml와 다릅니다.',
  },
  {
    slug: 'bushel-l', title: '부셸 ↔ L', desc: '곡물 거래 단위 부셸을 리터로 바꿉니다', icon: '🌽',
    category: '부피', from: '부셸', to: 'L', factor: 35.2391, digits: 2, quick: [1, 2, 5, 10, 100, 1000],
    metaTitle: '부셸 ↔ L 변환 - 곡물 시장의 부피 단위',
    long: '1미국 부셸은 35.24L입니다. 곡물 시세가 부셸당 가격으로 표시되며, 국제 곡물 시장의 옥수수·대두·소맥 가격이 이 단위를 씁니다.',
    note: '부셸은 부피지만 곡물 거래에서는 품목별 표준 무게로 환산합니다. 옥수수 1부셸은 25.4kg, 대두는 27.2kg입니다.',
  },
];

const AREA2: ConvertTool[] = [
  {
    slug: 'sqinch-cm2', title: '제곱인치 ↔ ㎠', desc: '제곱인치를 제곱센티미터로 바꿉니다', icon: '🔲',
    category: '넓이', from: 'sq in', to: '㎠', factor: 6.4516, digits: 3, quick: [1, 2, 5, 10, 100, 144],
    metaTitle: '제곱인치 ↔ ㎠ 변환 - 압력과 면적 표기',
    long: '1제곱인치는 6.4516㎠입니다. 인치가 2.54cm이므로 그 제곱입니다. psi(파운드/제곱인치)의 분모가 이 단위이고, 인쇄물과 필름 규격에도 쓰입니다.',
    note: '길이가 2.54배면 면적은 6.45배입니다. 길이 비율을 그대로 면적에 쓰면 2.5배 틀립니다.',
  },
  {
    slug: 'sqyard-m2', title: '제곱야드 ↔ ㎡', desc: '제곱야드를 제곱미터로 바꿉니다', icon: '🏟️',
    category: '넓이', from: 'sq yd', to: '㎡', factor: 0.83612736, digits: 4, quick: [1, 10, 50, 100, 500, 1000],
    metaTitle: '제곱야드 ↔ ㎡ 변환 - 카펫과 원단의 면적',
    long: '1제곱야드는 0.8361㎡입니다. 미국과 영국에서 카펫·원단·잔디를 이 단위로 팝니다. 1㎡는 약 1.196제곱야드입니다.',
    note: '카펫은 폭이 정해져 있어 제곱야드로 팔면서도 길이(러닝야드)로 재는 경우가 있습니다. 어느 쪽인지 확인하세요.',
  },
  {
    slug: 'sqmile-km2', title: '제곱마일 ↔ ㎢', desc: '제곱마일을 제곱킬로미터로 바꿉니다', icon: '🗺️',
    category: '넓이', from: 'sq mi', to: '㎢', factor: 2.589988110336, digits: 4, quick: [1, 5, 10, 100, 1000, 10000],
    metaTitle: '제곱마일 ↔ ㎢ 변환 - 국토와 도시 면적',
    long: '1제곱마일은 2.59㎢입니다. 미국의 주·군 면적과 산불 피해 면적이 이 단위로 보도됩니다. ㎢로 바꾸면 익숙한 크기로 읽힙니다.',
    note: '길이가 1.609배면 면적은 2.59배입니다. 마일과 킬로미터 비율을 면적에 그대로 쓰면 60% 작게 나옵니다.',
  },
  {
    slug: 'are-m2', title: '아르(a) ↔ ㎡', desc: '아르를 제곱미터로 바꿉니다', icon: '🌱',
    category: '넓이', from: 'a', to: '㎡', factor: 100, digits: 1, quick: [1, 2, 5, 10, 50, 100],
    metaTitle: '아르(a) ↔ ㎡ 변환 - 100㎡의 농지 단위',
    long: '1아르는 10m × 10m, 즉 100㎡입니다. 100아르가 1헥타르입니다. 유럽의 농지·택지 면적에 쓰이고 한국에서도 농업 통계에 남아 있습니다.',
    note: '아르(a)와 헥타르(ha)는 100배 차이입니다. 작은 a와 h가 붙었는지에 따라 값이 백 배 달라집니다.',
  },
  {
    slug: 'mu-m2', title: '중국 무(畝) ↔ ㎡', desc: '중국 농지 단위 무를 제곱미터로 바꿉니다', icon: '🌾',
    category: '넓이', from: '畝', to: '㎡', factor: 666.6667, digits: 2, quick: [1, 2, 5, 10, 15, 100],
    metaTitle: '중국 무(畝) ↔ ㎡ 변환 - 시장무 666.67㎡',
    long: '중국의 시장무(市畝) 1무는 666.67㎡로 정해져 있습니다. 15무가 1헥타르입니다. 중국의 농지 면적과 수확량 통계가 이 단위를 씁니다.',
    note: '한국의 마지기는 지역마다 150~300평으로 다르지만 중국 무는 666.67㎡로 고정된 값입니다.',
  },
];

const TEMPERATURE2: ConvertTool[] = [
  {
    slug: 'fahrenheit-kelvin', title: '℉ ↔ K', desc: '화씨를 켈빈으로 바꿉니다', icon: '🌡️',
    category: '온도', from: '℉', to: 'K', factor: 0.5555555556, offset: 255.3722222222, digits: 2, quick: [0, 32, 68, 98.6, 212, 500],
    metaTitle: '℉ ↔ K 변환 - 화씨를 절대온도로',
    long: '화씨를 켈빈으로 바꾸려면 32를 빼고 9분의 5를 곱한 뒤 273.15를 더합니다. 화씨 32도(물의 어는점)가 273.15K입니다.',
    note: '켈빈에는 "도"를 붙이지 않습니다. 273.15K이지 273.15°K가 아닙니다.',
  },
  {
    slug: 'celsius-rankine', title: '℃ ↔ 랭킨(°R)', desc: '섭씨를 랭킨으로 바꿉니다', icon: '🔧',
    category: '온도', from: '℃', to: '°R', factor: 1.8, offset: 491.67, digits: 2, quick: [-40, 0, 25, 100, 500, 1000],
    metaTitle: '℃ ↔ 랭킨 변환 - 공학에서 쓰는 절대온도',
    long: '랭킨은 화씨 눈금을 쓰는 절대온도입니다. 0°R이 절대영도이고 물의 어는점이 491.67°R입니다. 미국 열역학과 항공 공학 자료에서 만납니다.',
    note: '켈빈과 랭킨은 둘 다 절대온도지만 눈금 간격이 다릅니다. 1K의 변화가 1.8°R의 변화입니다.',
  },
];

const SPEED2: ConvertTool[] = [
  {
    slug: 'mph-ms', title: 'mph ↔ m/s', desc: '시간당 마일을 초당 미터로 바꿉니다', icon: '🚗',
    category: '속도', from: 'mph', to: 'm/s', factor: 0.44704, digits: 4, quick: [10, 25, 30, 55, 65, 100],
    metaTitle: 'mph ↔ m/s 변환 - 미국 속도 표기를 SI로',
    long: '1mph는 0.44704m/s입니다. 미국·영국의 제한속도와 풍속이 mph로 표기되므로 물리 계산에 넣으려면 m/s로 바꿔야 합니다.',
    note: '미국 도로의 65mph는 약 105km/h입니다. mph 숫자에 1.6을 곱하면 km/h가 어림으로 나옵니다.',
  },
  {
    slug: 'pace-kmh', title: '페이스(분/km) ↔ km/h', desc: '달리기 페이스를 시속으로 바꿉니다', icon: '🏃',
    category: '속도', from: '분/km', to: 'km/h', factor: 60, reciprocal: true, digits: 2, quick: [3, 4, 5, 6, 7, 8],
    metaTitle: '페이스(분/km) ↔ km/h 변환 - 달리기 속도',
    long: '페이스는 1km를 가는 데 걸리는 분이고 시속은 1시간에 가는 거리입니다. 60을 페이스로 나누면 시속이 됩니다. 페이스 5분이면 시속 12km입니다.',
    note: '이 변환은 나누기라서 방향이 뒤집힙니다. 페이스 숫자가 작을수록 빠르고, 시속 숫자가 클수록 빠릅니다.',
  },
  {
    slug: 'fps-ms', title: 'ft/s ↔ m/s', desc: '초당 피트를 초당 미터로 바꿉니다', icon: '🎯',
    category: '속도', from: 'ft/s', to: 'm/s', factor: 0.3048, digits: 4, quick: [10, 50, 100, 328, 1000, 1125],
    metaTitle: 'ft/s ↔ m/s 변환 - 탄속과 유속 단위',
    long: '1ft/s는 0.3048m/s입니다. 총알의 탄속, 배관의 유속, 낙하 속도가 미국 자료에서 이 단위로 표기됩니다. 소리의 속도는 약 1,125ft/s입니다.',
    note: 'fps는 초당 프레임(frames per second)의 약자로도 쓰입니다. 문맥을 보고 어느 쪽인지 판단해야 합니다.',
  },
];

const DATA2: ConvertTool[] = [
  {
    slug: 'tb-pb', title: 'TB ↔ PB', desc: '테라바이트를 페타바이트로 바꿉니다', icon: '🗄️',
    category: '데이터', from: 'TB', to: 'PB', factor: 0.001, digits: 4, quick: [1, 10, 100, 500, 1000, 5000],
    metaTitle: 'TB ↔ PB 변환 - 데이터센터 단위',
    long: '1,000테라바이트가 1페타바이트입니다. 개인 저장장치는 TB, 데이터센터와 대규모 백업은 PB 단위로 셉니다.',
    note: '저장장치 제조사는 1TB를 1조 바이트로 셉니다. 운영체제는 1,024 기준으로 세므로 표시 용량이 약 9% 작게 나옵니다.',
  },
  {
    slug: 'kib-kb', title: 'KiB ↔ KB', desc: '1024 기준과 1000 기준을 비교합니다', icon: '🔢',
    category: '데이터', from: 'KiB', to: 'KB', factor: 1.024, digits: 4, quick: [1, 10, 100, 512, 1000, 1024],
    metaTitle: 'KiB ↔ KB 변환 - 1024와 1000의 차이',
    long: '1KiB(키비바이트)는 1,024바이트이고 1KB(킬로바이트)는 1,000바이트입니다. 운영체제는 1,024로, 제조사와 통신사는 1,000으로 셉니다.',
    note: '킬로 단계에서는 2.4% 차이지만 테라 단계에서는 10%로 벌어집니다. 하드디스크 표시 용량이 작아 보이는 이유입니다.',
  },
  {
    slug: 'mib-mb', title: 'MiB ↔ MB', desc: '메비바이트를 메가바이트로 바꿉니다', icon: '💾',
    category: '데이터', from: 'MiB', to: 'MB', factor: 1.048576, digits: 4, quick: [1, 10, 100, 512, 1000, 1024],
    metaTitle: 'MiB ↔ MB 변환 - 1MiB는 1.049MB',
    long: '1MiB는 1,048,576바이트로 1MB(1,000,000바이트)보다 4.9% 큽니다. 리눅스와 개발 도구가 MiB를, 파일 크기 표기가 MB를 주로 씁니다.',
    note: '같은 파일이 도구에 따라 다른 숫자로 보이는 것은 이 차이 때문입니다. 파일이 변한 것이 아닙니다.',
  },
  {
    slug: 'gib-gb', title: 'GiB ↔ GB', desc: '기비바이트를 기가바이트로 바꿉니다', icon: '🖥️',
    category: '데이터', from: 'GiB', to: 'GB', factor: 1.073741824, digits: 4, quick: [1, 4, 8, 16, 64, 256],
    metaTitle: 'GiB ↔ GB 변환 - 메모리 용량 표기',
    long: '1GiB는 1.0737GB입니다. 메모리 용량은 실제로 GiB 단위로 만들어지므로 "16GB 램"은 정확히는 16GiB, 17.18GB입니다.',
    note: '256GB SSD를 꽂으면 238GiB로 보입니다. 18GB가 사라진 것이 아니라 세는 방식이 다른 것입니다.',
  },
];

const ENERGY2: ConvertTool[] = [
  {
    slug: 'wh-joule', title: 'Wh ↔ J', desc: '와트시를 줄로 바꿉니다', icon: '🔋',
    category: '에너지', from: 'Wh', to: 'J', factor: 3600, digits: 0, quick: [1, 10, 100, 500, 1000, 5000],
    metaTitle: 'Wh ↔ J 변환 - 배터리 용량 단위',
    long: '1와트시는 1와트로 1시간 쓰는 에너지, 즉 3,600줄입니다. 노트북 배터리가 50~100Wh, 보조배터리가 보통 37Wh(10,000mAh × 3.7V)입니다.',
    note: 'mAh만으로는 에너지를 알 수 없습니다. 전압을 곱해 Wh로 바꿔야 서로 다른 기기의 배터리를 비교할 수 있습니다.',
  },
  {
    slug: 'btu-kj', title: 'BTU ↔ kJ', desc: '영국 열단위를 킬로줄로 바꿉니다', icon: '❄️',
    category: '에너지', from: 'BTU', to: 'kJ', factor: 1.055056, digits: 4, quick: [1, 100, 1000, 5000, 12000, 18000],
    metaTitle: 'BTU ↔ kJ 변환 - 에어컨 용량 단위',
    long: '1BTU는 1파운드의 물을 1℉ 올리는 열로 약 1.055kJ입니다. 에어컨과 보일러 용량이 시간당 BTU로 표기되며, 12,000BTU/h가 1냉동톤입니다.',
    note: '에어컨의 "12,000BTU"는 시간당 값입니다. 평수로 어림하면 6평에 약 5,000BTU가 필요합니다.',
  },
  {
    slug: 'kcal-kwh', title: 'kcal ↔ kWh', desc: '식품 열량을 전력량으로 바꿉니다', icon: '⚡',
    category: '에너지', from: 'kcal', to: 'kWh', factor: 0.001163, digits: 5, quick: [100, 500, 1000, 2000, 2500, 10000],
    metaTitle: 'kcal ↔ kWh 변환 - 식품 열량을 전기로',
    long: '860kcal이 1kWh입니다. 하루 2,000kcal을 먹는 사람은 에너지로 약 2.3kWh를 쓰는 셈이고, 이는 60W 전구를 39시간 켜는 양입니다.',
    note: '몸은 음식 에너지를 100% 쓰지 못합니다. 실제 효율은 20~25%라 나머지는 열로 나갑니다.',
  },
  {
    slug: 'therm-kwh', title: '섬(therm) ↔ kWh', desc: '가스 요금 단위를 전력량으로 바꿉니다', icon: '🔥',
    category: '에너지', from: 'therm', to: 'kWh', factor: 29.3071, digits: 4, quick: [1, 5, 10, 20, 50, 100],
    metaTitle: 'therm ↔ kWh 변환 - 가스와 전기 요금 비교',
    long: '1섬은 100,000BTU로 29.31kWh입니다. 미국과 영국의 가스 요금이 섬 단위로 청구되므로, 전기와 가스 중 어느 쪽이 싼지 견주려면 같은 단위로 바꿔야 합니다.',
    note: '난방을 전기와 가스로 비교할 때는 기기 효율도 넣어야 합니다. 가스보일러는 90%, 전기 히트펌프는 300%를 넘습니다.',
  },
];

const PRESSURE2: ConvertTool[] = [
  {
    slug: 'atm-kpa', title: '기압(atm) ↔ kPa', desc: '표준 대기압을 킬로파스칼로 바꿉니다', icon: '🌍',
    category: '압력·기타', from: 'atm', to: 'kPa', factor: 101.325, digits: 3, quick: [1, 2, 3, 5, 10, 100],
    metaTitle: '기압(atm) ↔ kPa 변환 - 표준 대기압 101.325kPa',
    long: '1표준기압은 정확히 101.325kPa로 정의돼 있습니다. 해수면의 평균 기압이고, 수심 10m마다 약 1기압이 더해집니다.',
    note: '기상 예보의 hPa는 kPa의 10분의 1입니다. 1,013hPa이 101.3kPa, 곧 1기압입니다.',
  },
  {
    slug: 'psi-kpa', title: 'psi ↔ kPa', desc: '타이어 공기압 단위를 킬로파스칼로 바꿉니다', icon: '🛞',
    category: '압력·기타', from: 'psi', to: 'kPa', factor: 6.894757, digits: 3, quick: [30, 32, 35, 40, 44, 100],
    metaTitle: 'psi ↔ kPa 변환 - 타이어 공기압',
    long: '1psi는 6.895kPa입니다. 타이어 공기압이 나라에 따라 psi, kPa, bar로 표기되므로 주유소 게이지와 차량 스티커의 단위가 다를 수 있습니다.',
    note: '승용차 권장 공기압은 보통 32~36psi(220~250kPa)입니다. 주행 직후에는 열로 3~5psi 올라가 있으니 식은 뒤 재세요.',
  },
  {
    slug: 'torr-pa', title: 'torr ↔ Pa', desc: '진공 압력 단위를 파스칼로 바꿉니다', icon: '🧪',
    category: '압력·기타', from: 'torr', to: 'Pa', factor: 133.322368, digits: 3, quick: [1, 10, 100, 760, 1000, 7600],
    metaTitle: 'torr ↔ Pa 변환 - 진공과 실험실 압력',
    long: '1torr는 수은주 1mm의 압력으로 133.32Pa입니다. 760torr가 1기압입니다. 진공 장비와 실험실 압력계에서 쓰이며 mmHg와 사실상 같은 값입니다.',
    note: 'torr와 mmHg는 정의가 미세하게 다르지만 실용 범위에서는 같다고 봐도 됩니다. 차이가 1,000만분의 2 수준입니다.',
  },
  {
    slug: 'inhg-hpa', title: 'inHg ↔ hPa', desc: '인치 수은주를 헥토파스칼로 바꿉니다', icon: '✈️',
    category: '압력·기타', from: 'inHg', to: 'hPa', factor: 33.8639, digits: 3, quick: [28, 29.92, 30, 30.5, 31, 32],
    metaTitle: 'inHg ↔ hPa 변환 - 항공 기압 설정',
    long: '1inHg는 33.86hPa입니다. 미국과 캐나다의 항공 고도계 설정값이 inHg로 주어지고, 나머지 대부분은 hPa를 씁니다. 표준 기압 29.92inHg가 1,013.25hPa입니다.',
    note: '고도계 설정을 잘못하면 실제 고도가 달라집니다. 1inHg 차이가 약 1,000피트에 해당합니다.',
  },
];

const TIME2: ConvertTool[] = [
  {
    slug: 'frame-sec', title: '프레임 ↔ 초 (30fps)', desc: '영상 프레임 수를 초로 바꿉니다', icon: '🎬',
    category: '시간', from: '프레임', to: '초', factor: 0.0333333333, digits: 4, quick: [1, 15, 30, 60, 300, 1800],
    metaTitle: '프레임 ↔ 초 변환 - 30fps 영상 편집',
    long: '30fps 영상에서 1프레임은 30분의 1초입니다. 편집 프로그램의 타임코드가 프레임 단위로 표시되므로 자막 타이밍을 맞출 때 이 변환이 필요합니다.',
    note: '방송용 29.97fps(드롭 프레임)는 30fps와 미세하게 다릅니다. 긴 영상에서는 그 차이가 초 단위로 쌓입니다.',
  },
  {
    slug: 'bpm-ms', title: 'BPM ↔ ms (1박)', desc: '분당 박자를 한 박의 밀리초로 바꿉니다', icon: '🎵',
    category: '시간', from: 'BPM', to: 'ms', factor: 60000, reciprocal: true, digits: 2, quick: [60, 90, 120, 128, 140, 174],
    metaTitle: 'BPM ↔ ms 변환 - 딜레이와 리버브 설정',
    long: '60,000을 BPM으로 나누면 한 박의 길이가 밀리초로 나옵니다. 120BPM이면 한 박이 500ms입니다. 딜레이와 리버브를 곡 템포에 맞출 때 이 값을 씁니다.',
    note: '이 변환은 나누기라서 방향이 뒤집힙니다. 8분음표는 이 값의 절반, 점8분음표는 0.75배입니다.',
  },
  {
    slug: 'ms-sec', title: 'ms ↔ 초', desc: '밀리초를 초로 바꿉니다', icon: '⏱️',
    category: '시간', from: 'ms', to: '초', factor: 0.001, digits: 4, quick: [1, 16, 100, 500, 1000, 5000],
    metaTitle: 'ms ↔ 초 변환 - 응답 시간과 지연',
    long: '1,000밀리초가 1초입니다. 네트워크 지연, 화면 응답 시간, 오디오 지연이 모두 ms 단위로 표기됩니다. 60fps 화면의 한 프레임이 약 16.7ms입니다.',
    note: '사람이 지연을 느끼기 시작하는 지점은 약 100ms입니다. 20ms 아래는 대개 알아차리지 못합니다.',
  },
];

const ANGLE2: ConvertTool[] = [
  {
    slug: 'degree-gradian', title: '도 ↔ 그레이드(gon)', desc: '도를 그레이드로 바꿉니다', icon: '📐',
    category: '각도', from: '°', to: 'gon', factor: 1.1111111111, digits: 4, quick: [1, 30, 45, 60, 90, 360],
    metaTitle: '도 ↔ 그레이드 변환 - 측량에서 쓰는 각도 단위',
    long: '그레이드는 직각을 100으로 나눈 각도 단위입니다. 한 바퀴가 400그레이드이고 90도가 정확히 100그레이드입니다. 측량과 일부 유럽 공학 자료에서 씁니다.',
    note: '공학용 계산기의 각도 모드가 DEG·RAD·GRAD 셋인 이유가 이 단위입니다. GRAD로 두면 삼각함수 값이 전부 달라집니다.',
  },
  {
    slug: 'arcmin-degree', title: '분(′) ↔ 도(°)', desc: '각의 분을 도로 바꿉니다', icon: '🔭',
    category: '각도', from: '′', to: '°', factor: 0.0166666667, digits: 5, quick: [1, 10, 30, 60, 120, 360],
    metaTitle: '분(′) ↔ 도(°) 변환 - 좌표와 천문 각도',
    long: '1도는 60분이고 1분은 60초입니다. 위도·경도와 천체 위치를 이 방식으로 적습니다. 보름달의 지름이 약 31분, 즉 0.5도입니다.',
    note: '각도의 분·초는 시간의 분·초와 기호가 같지만 다른 개념입니다. 위도 1분은 지구에서 약 1.852km(1해리)입니다.',
  },
];

export const CONVERT_TOOLS2: ConvertTool[] = [
  ...LENGTH2, ...WEIGHT2, ...VOLUME2, ...AREA2, ...TEMPERATURE2,
  ...SPEED2, ...DATA2, ...ENERGY2, ...PRESSURE2, ...TIME2, ...ANGLE2,
];

/** 첫 묶음에 없던 분류 — 허브 탭에 더해야 한다 */
export const CONVERT_CATEGORIES2 = ['시간', '각도'];

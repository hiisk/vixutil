/**
 * 계산기 외 섹션(허브·운세·스냅·크립토)의 자주 묻는 질문.
 * 각 페이지 하단에 노출되며 FAQPage 구조화 데이터로도 함께 출력된다.
 * 키는 선행 슬래시를 뺀 라우트 경로다. (예: 'snap/face-reading')
 */
import type { FaqItem } from './calc-faq';

export const SECTION_FAQ: Record<string, FaqItem[]> = {
  /* ── 허브 ── */
  calculator: [
    {
      q: '계산기를 쓰려면 회원가입이 필요한가요?',
      a: '아닙니다. 모든 계산기는 회원가입이나 로그인 없이 바로 사용할 수 있으며 무료입니다.',
    },
    {
      q: '입력한 금액이나 개인정보가 저장되나요?',
      a: '아닙니다. 모든 계산은 브라우저에서만 이루어지며, 입력한 급여·자산 정보는 서버로 전송되거나 저장되지 않습니다.',
    },
    {
      q: '계산 결과를 법적 근거로 사용할 수 있나요?',
      a: '아닙니다. 모든 결과는 표준 요율과 공개된 산식에 따른 참고용 추정치입니다. 정확한 세액·급여·대출 한도는 관계 기관이나 금융사의 확정 통보를 따라야 합니다.',
    },
    {
      q: '세법이나 요율이 바뀌면 계산기도 갱신되나요?',
      a: '주요 제도 변경(최저임금, 4대보험 요율, 세율 구간 등)은 반영하려 노력하고 있습니다. 다만 시행 직후에는 시차가 있을 수 있으니 중요한 판단에는 최신 고시를 함께 확인하세요.',
    },
  ],
  test: [
    {
      q: '심리테스트 결과가 과학적으로 정확한가요?',
      a: '아닙니다. 이곳의 테스트는 재미와 자기 이해를 위한 콘텐츠이며, 심리학적 진단 도구가 아닙니다. 임상적 판단이 필요하면 전문가와 상담하세요.',
    },
    {
      q: '테스트에 응답한 내용이 저장되나요?',
      a: '아닙니다. 모든 문항 응답과 결과 계산은 브라우저 안에서만 처리되며 서버로 전송되지 않습니다.',
    },
    {
      q: '결과를 친구에게 공유할 수 있나요?',
      a: '네. 결과 화면의 공유 버튼으로 링크를 복사하거나 메신저로 바로 보낼 수 있습니다.',
    },
    {
      q: '같은 테스트를 다시 하면 결과가 달라지나요?',
      a: '응답이 같으면 결과도 같습니다. 결과가 달라졌다면 이전과 다르게 답한 문항이 있다는 뜻입니다.',
    },
  ],
  quiz: [
    {
      q: '퀴즈는 무료인가요?',
      a: '네. 모든 퀴즈는 회원가입 없이 무료로 이용할 수 있습니다.',
    },
    {
      q: '점수는 어떻게 매겨지나요?',
      a: '맞힌 문항 수를 전체 문항 수로 나눠 백분율로 환산합니다. 문항별 배점은 동일합니다.',
    },
    {
      q: '틀린 문제의 정답을 볼 수 있나요?',
      a: '네. 퀴즈를 끝내면 문항별로 내가 고른 답과 정답을 함께 확인할 수 있습니다.',
    },
  ],
  fortune: [
    {
      q: '운세는 매일 바뀌나요?',
      a: '네. 날짜를 기준으로 운세가 결정되므로 매일 자정이 지나면 새로운 운세가 나옵니다. 같은 날 여러 번 접속하면 같은 결과가 유지됩니다.',
    },
    {
      q: '새로고침하면 운세가 달라지나요?',
      a: '아닙니다. 같은 날, 같은 별자리·띠라면 몇 번을 새로고침해도 같은 운세가 나옵니다. 운세가 매번 바뀌면 신뢰할 수 없기 때문입니다.',
    },
    {
      q: '운세를 어디까지 믿어야 하나요?',
      a: '운세는 오락과 자기 성찰을 위한 콘텐츠입니다. 중요한 결정은 운세가 아니라 충분한 정보와 스스로의 판단으로 내리세요.',
    },
    {
      q: '생년월일을 입력하면 저장되나요?',
      a: '아닙니다. 입력한 생년월일은 브라우저에서 별자리·띠·사주를 계산하는 데만 쓰이고 서버로 전송되지 않습니다.',
    },
  ],
  snap: [
    {
      q: '업로드한 사진이 서버로 전송되나요?',
      a: '아닙니다. 얼굴 인식과 분석은 모두 브라우저 안에서 실행되며, 사진은 기기를 벗어나지 않습니다. 저장하거나 전송하지 않습니다.',
    },
    {
      q: '분석 결과가 정확한가요?',
      a: '재미를 위한 콘텐츠입니다. 얼굴 인식 모델이 검출한 특징점을 바탕으로 점수를 내지만, 외모나 성격에 대한 객관적 평가가 아닙니다.',
    },
    {
      q: '얼굴이 인식되지 않아요.',
      a: '정면을 보고 얼굴 전체가 나온 밝은 사진일수록 인식률이 높습니다. 마스크·선글라스·과한 역광·측면 각도는 인식을 어렵게 합니다.',
    },
    {
      q: '처음 실행할 때 왜 시간이 걸리나요?',
      a: '얼굴 인식 모델을 브라우저로 내려받는 과정입니다. 한 번 받고 나면 이후에는 빠르게 동작합니다.',
    },
  ],
  checklist: [
    {
      q: '체크리스트 진행 상황이 저장되나요?',
      a: '체크한 항목은 브라우저에 저장되어 다시 방문해도 유지됩니다. 서버로 전송되지는 않으므로 다른 기기에서는 이어지지 않습니다.',
    },
    {
      q: '항목을 내 상황에 맞게 바꿀 수 있나요?',
      a: '체크리스트는 일반적인 상황을 기준으로 구성된 참고용 목록입니다. 개인 상황에 따라 해당되지 않는 항목은 건너뛰어도 됩니다.',
    },
    {
      q: '체크리스트 내용을 어디까지 신뢰할 수 있나요?',
      a: '준비 과정에서 흔히 놓치는 항목을 모은 참고 자료입니다. 법적·행정적 절차는 반드시 소관 기관의 공식 안내를 함께 확인하세요.',
    },
  ],
  random: [
    {
      q: '결과는 정말 무작위인가요?',
      a: '네. 모든 뽑기는 브라우저에서 실시간으로 난수를 생성해 결정됩니다. 미리 정해진 답이나 조작은 없고, 매번 새로 계산되므로 같은 조건이라도 결과가 달라집니다.',
    },
    {
      q: '입력한 명단이 서버로 전송되나요?',
      a: '아니요. 룰렛 항목이나 참가자 이름 등 모든 입력은 브라우저 안에서만 처리되며 서버로 저장·전송되지 않습니다. 새로고침하면 사라집니다.',
    },
    {
      q: '어디에 쓰면 좋나요?',
      a: '점심 메뉴 정하기, 벌칙·당번 정하기, 팀 나누기, 순서 정하기, 추첨 이벤트 등 "공정하게 하나를 골라야 할 때" 두루 쓸 수 있습니다.',
    },
  ],

  /* ── 랜덤 뽑기 상세 ── 도구마다 묻는 게 달라서 개별로 쓴다. */
  'random/roulette': [
    {
      q: '룰렛 항목은 몇 개까지 넣을 수 있나요?',
      a: '개수 제한은 없지만 항목이 많아질수록 조각이 얇아져 화면에서 알아보기 어려워집니다. 10개 안팎이 읽기 좋습니다.',
    },
    {
      q: '특정 항목이 더 잘 나오게 가중치를 줄 수 있나요?',
      a: '아니요. 모든 항목이 같은 확률입니다. 어떤 항목의 확률을 높이고 싶다면 그 항목을 두 번 넣으면 됩니다.',
    },
    {
      q: '룰렛이 멈추는 위치가 미리 정해져 있나요?',
      a: '아닙니다. 돌리기를 누른 순간 난수로 결과를 뽑고, 그 결과에 맞춰 회전 애니메이션이 멈춥니다. 돌아가는 그림과 실제 추첨은 같은 값입니다.',
    },
    {
      q: '항목을 매번 다시 입력해야 하나요?',
      a: '점심 메뉴, 예/아니오, 벌칙, 커피 내기 프리셋을 눌러 한 번에 채울 수 있습니다. 직접 넣은 항목은 새로고침하면 사라집니다.',
    },
  ],
  'random/ladder': [
    {
      q: '사다리타기 결과는 공정한가요?',
      a: '가로줄을 무작위로 놓아 사다리를 만들기 때문에 참가자마다 어느 결과로 갈 확률이 같습니다. 누가 먼저 고르든 유불리가 없습니다.',
    },
    {
      q: '참가자와 결과 개수가 달라도 되나요?',
      a: '사다리는 참가자 한 명이 결과 하나로 이어지는 구조라 개수를 맞춰야 합니다. 결과가 모자라면 "꽝"처럼 빈 항목을 채워 넣으세요.',
    },
    {
      q: '경로를 미리 보지 않고 결과만 확인할 수 있나요?',
      a: '이름을 누르면 선을 따라가는 경로가 보입니다. 결과만 알고 싶다면 경로 애니메이션이 끝난 지점을 확인하면 됩니다.',
    },
  ],
  'random/pick': [
    {
      q: '한 번에 여러 명을 뽑을 수 있나요?',
      a: '네. 뽑을 인원을 지정하면 그 수만큼 중복 없이 뽑습니다. 같은 사람이 두 번 당첨되지 않습니다.',
    },
    {
      q: '명단은 어떻게 넣나요?',
      a: '이름을 줄바꿈이나 쉼표로 구분해 붙여 넣으면 됩니다. 엑셀이나 메모장에서 복사한 목록을 그대로 붙여 넣어도 인식합니다.',
    },
    {
      q: '추첨 결과를 증빙으로 쓸 수 있나요?',
      a: '결과 화면을 캡처하거나 공유 버튼으로 남길 수 있지만, 서버에 기록이 남지 않으므로 법적 효력이 필요한 추첨에는 별도의 공증된 방식을 쓰세요.',
    },
  ],
  'random/order': [
    {
      q: '순서 정하기와 당첨자 뽑기는 뭐가 다른가요?',
      a: '당첨자 뽑기는 명단에서 일부만 뽑고, 순서 정하기는 전원을 남긴 채 차례만 뒤섞습니다. 발표 순서나 게임 차례를 정할 때는 이쪽입니다.',
    },
    {
      q: '같은 명단으로 다시 돌리면 같은 순서가 나오나요?',
      a: '아니요. 돌릴 때마다 새로 섞으므로 매번 다른 순서가 나옵니다.',
    },
    {
      q: '섞는 방식이 한쪽으로 치우치지 않나요?',
      a: '피셔-예이츠 셔플을 써서 가능한 모든 순서가 같은 확률로 나옵니다. 앞자리나 뒷자리가 유리해지지 않습니다.',
    },
  ],
  'random/secret-santa': [
    {
      q: '자기 자신이 걸릴 수도 있나요?',
      a: '아니요. 아무도 자기 자신에게 배정되지 않도록 다시 뽑습니다. 참가자가 2명 이상이면 항상 성립합니다.',
    },
    {
      q: '다른 사람의 마니또를 못 보게 할 수 있나요?',
      a: '각자 자기 이름을 눌러야 자기 배정만 열립니다. 폰을 돌려가며 한 사람씩 확인하고 닫으면 서로의 마니또를 모르는 채로 진행할 수 있습니다.',
    },
    {
      q: '배정 결과를 나중에 다시 볼 수 있나요?',
      a: '새로고침하면 배정이 사라집니다. 진행자가 전체 배정을 보관해야 한다면 화면을 캡처해 두세요.',
    },
  ],
  'random/team': [
    {
      q: '인원이 팀 수로 나누어떨어지지 않으면 어떻게 되나요?',
      a: '남는 인원을 팀에 하나씩 더 붙여 인원 차이가 최대 1명이 되도록 나눕니다. 한 팀만 유독 많아지지 않습니다.',
    },
    {
      q: '특정 사람을 같은 팀으로 묶을 수 있나요?',
      a: '팀 고정 기능은 없습니다. 꼭 붙여야 한다면 두 사람을 "홍길동·김철수"처럼 한 항목으로 입력해 한 덩어리로 배정하세요.',
    },
    {
      q: '다시 나누면 다른 조합이 나오나요?',
      a: '네. 누를 때마다 새로 섞어 배정하므로 마음에 드는 조합이 나올 때까지 다시 돌릴 수 있습니다.',
    },
  ],
  'random/number': [
    {
      q: '숫자 범위는 어디까지 지정할 수 있나요?',
      a: '시작과 끝 값을 자유롭게 넣을 수 있고 음수도 됩니다. 시작이 끝보다 크면 자동으로 바로잡습니다.',
    },
    {
      q: '중복 없이 여러 개를 뽑을 수 있나요?',
      a: '네. 뽑을 개수를 지정하면 범위 안에서 서로 다른 숫자로 뽑습니다. 로또(1~45 중 6개) 프리셋도 있습니다.',
    },
    {
      q: '로또 번호를 이걸로 뽑으면 당첨 확률이 올라가나요?',
      a: '아니요. 모든 조합의 확률은 동일하며 이 도구는 고르는 수고를 덜어줄 뿐입니다. 어떤 번호 선택 방식도 당첨 확률을 바꾸지 못합니다.',
    },
  ],
  'random/coin-dice': [
    {
      q: '동전 앞뒤 확률이 정확히 반반인가요?',
      a: '네. 난수를 절반 기준으로 갈라 앞/뒤를 정하므로 각각 50%입니다. 실제 동전처럼 던지는 습관에 따라 치우치는 일이 없습니다.',
    },
    {
      q: '주사위를 여러 개 굴릴 수 있나요?',
      a: '네. 개수를 지정하면 한 번에 굴려 각각의 눈과 합계를 함께 보여줍니다. 보드게임에서 2d6이 필요할 때 쓰기 좋습니다.',
    },
    {
      q: '결과가 이상하게 한쪽으로 몰리는데 조작인가요?',
      a: '아닙니다. 무작위에서는 같은 면이 연달아 나오는 구간이 자연스럽게 생깁니다. 앞면이 다섯 번 나왔다고 다음에 뒷면이 나올 확률이 높아지지도 않습니다.',
    },
  ],
  generator: [
    {
      q: '생성된 결과를 상업적으로 써도 되나요?',
      a: '생성기는 아이디어를 얻기 위한 참고 도구입니다. 상호·브랜드명 등으로 사용하려면 상표권 등록 여부와 중복을 반드시 별도로 확인하세요.',
    },
    {
      q: '같은 조건으로 다시 생성하면 같은 결과가 나오나요?',
      a: '생성기는 매번 무작위로 조합하므로 다시 실행하면 다른 결과가 나옵니다. 마음에 드는 결과는 그때그때 저장해두세요.',
    },
    {
      q: '결과가 서버에 저장되나요?',
      a: '아닙니다. 모든 생성은 브라우저에서 이루어지며 결과는 저장되지 않습니다.',
    },
  ],
  // crypto 섹션은 영어 페이지이므로 FAQ도 영어로 작성한다.
  crypto: [
    {
      q: 'Can I trade based on these numbers?',
      a: 'No. Everything here is a statistical description of past price behaviour, not a forecast you can act on. Crypto is a high-risk asset and you can lose your entire principal. Nothing on this site is investment advice.',
    },
    {
      q: 'Where does the price data come from?',
      a: 'Binance public market data. Prices can differ between exchanges, so treat the figures as indicative rather than exact.',
    },
    {
      q: 'Is my data sent anywhere?',
      a: 'No. All calculations run in your browser. We fetch public market data and compute everything locally — nothing you enter is uploaded.',
    },
    {
      q: 'Why are the projected ranges so wide?',
      a: 'Because crypto volatility genuinely is that wide. A projection that shows you a narrow range is usually hiding its uncertainty rather than eliminating it.',
    },
  ],

  /* ── 운세 개별 ── */
  'fortune/zodiac': [
    {
      q: '내 별자리를 모르겠어요.',
      a: '생일이 속한 기간의 별자리를 고르면 됩니다. 각 별자리 아래에 해당 날짜 범위가 표기되어 있으며, 양력 생일 기준입니다.',
    },
    {
      q: '별자리 경계에 걸친 생일은 어떻게 하나요?',
      a: '별자리 경계일(예: 3월 20~21일)에 태어났다면 태어난 시각에 따라 달라질 수 있습니다. 두 별자리 운세를 모두 참고해보세요.',
    },
    {
      q: '별자리 운세는 매일 바뀌나요?',
      a: '네. 날짜 기준으로 결정되어 매일 새로운 운세가 나오며, 같은 날에는 몇 번을 봐도 같은 결과가 유지됩니다.',
    },
  ],
  'fortune/animal': [
    {
      q: '내 띠는 어떻게 확인하나요?',
      a: '태어난 해를 기준으로 12년 주기로 반복됩니다. 각 띠에 해당하는 연도가 함께 표기되어 있으니 출생 연도를 찾아보세요.',
    },
    {
      q: '음력 설 이전에 태어나면 띠가 다른가요?',
      a: '전통적으로는 음력 설(입춘)을 기준으로 띠가 바뀐다고 봅니다. 1~2월 초 출생이라면 앞선 해의 띠일 수 있으니 참고하세요.',
    },
    {
      q: '띠 운세와 별자리 운세 중 뭐가 맞나요?',
      a: '둘 다 오락용 콘텐츠이므로 우열을 따질 수 없습니다. 재미로 함께 보시면 됩니다.',
    },
  ],
  'fortune/saju': [
    {
      q: '사주는 무엇을 보는 건가요?',
      a: '태어난 연·월·일·시를 각각 기둥(주)으로 삼아 네 기둥의 오행(목화토금수) 균형을 살펴보는 전통 명리학입니다.',
    },
    {
      q: '태어난 시간을 모르면 어떻게 하나요?',
      a: '시주를 뺀 세 기둥만으로도 대략적인 오행 균형을 볼 수 있습니다. 다만 정밀도는 떨어집니다.',
    },
    {
      q: '사주 결과가 나쁘게 나오면 어떻게 하나요?',
      a: '사주는 정해진 운명을 알려주는 것이 아니라 타고난 기질의 경향을 보는 참고 자료입니다. 결과에 얽매이지 마세요.',
    },
  ],
  'fortune/tarot': [
    {
      q: '타로 카드는 어떻게 뽑히나요?',
      a: '78장 풀덱에서 무작위로 뽑습니다. 특정 결과가 나오도록 조작되어 있지 않습니다.',
    },
    {
      q: '역방향 카드는 나쁜 뜻인가요?',
      a: '반드시 그렇지는 않습니다. 역방향은 해당 카드의 에너지가 지연되거나 내면을 향하고 있음을 뜻하는 경우가 많습니다.',
    },
    {
      q: '같은 질문을 여러 번 뽑아도 되나요?',
      a: '원하는 답이 나올 때까지 반복해서 뽑으면 의미가 없습니다. 한 번 뽑은 카드를 충분히 곱씹어보는 편이 낫습니다.',
    },
  ],
  'fortune/blood-type': [
    {
      q: '혈액형으로 성격을 알 수 있나요?',
      a: '아닙니다. 혈액형과 성격의 관련성은 여러 차례 조사됐지만 일관된 연관은 확인되지 않았습니다. 잘 맞는 것처럼 느껴지는 건 누구에게나 해당되는 모호한 설명을 자기 이야기로 받아들이는 바넘 효과 때문입니다.',
    },
    {
      q: '운세가 혈액형에 따라 계산되나요?',
      a: '혈액형에서 무언가를 계산해 내는 것이 아니라, 날짜와 혈액형을 섞은 값으로 준비된 문장 중 하나를 고르는 방식입니다. 그래서 같은 날 같은 혈액형이면 항상 같은 결과가 나옵니다.',
    },
    {
      q: '혈액형을 모르면 어떻게 하나요?',
      a: '헌혈이나 건강검진 기록으로 확인할 수 있습니다. 다만 이 페이지는 오락용이므로 굳이 알아내려고 검사까지 받을 필요는 없습니다.',
    },
  ],
  'fortune/biorhythm': [
    {
      q: '바이오리듬은 과학적 근거가 있나요?',
      a: '없습니다. 신체 23일·감성 28일·지성 33일이라는 주기는 20세기 초에 제안된 값이고, 이 주기가 실제 컨디션을 예측한다는 근거는 확인되지 않았습니다. 계산이 정확한 것과 예측이 맞는 것은 다른 이야기입니다.',
    },
    {
      q: '위험일은 무슨 뜻인가요?',
      a: '리듬 곡선이 0을 지나며 고조기와 저조기가 바뀌는 날입니다. 이 페이지에서는 오늘과 내일 사이에 곡선의 부호가 바뀌는 날을 위험일로 봅니다. 나쁜 일이 생기는 날이라는 뜻은 아닙니다.',
    },
    {
      q: '태어난 시간도 필요한가요?',
      a: '필요하지 않습니다. 바이오리듬은 출생일로부터 며칠이 지났는지만 사용하므로 날짜만 있으면 계산됩니다.',
    },
    {
      q: '입력한 생년월일이 저장되나요?',
      a: '아닙니다. 브라우저 안에서 계산에만 쓰이고 서버로 전송되거나 저장되지 않습니다.',
    },
  ],
  'fortune/blood-match': [
    {
      q: '혈액형 궁합은 과학적 근거가 있나요?',
      a: '없습니다. 혈액형과 성격·궁합의 관련성은 여러 차례 검증됐지만 일관된 연관은 확인되지 않았습니다. 잘 맞는 것처럼 느껴지는 건 누구에게나 해당되는 모호한 설명을 자기 이야기로 받아들이는 바넘 효과 때문입니다. 순전히 재미로만 봐주세요.',
    },
    {
      q: '같은 혈액형 조합은 늘 같은 결과가 나오나요?',
      a: '네. 무작위로 뽑는 것이 아니라 조합마다 결과가 정해져 있어, 같은 두 혈액형이면 언제나 같은 궁합이 나옵니다. 순서(내/상대)를 바꿔도 궁합 점수는 같습니다.',
    },
    {
      q: '궁합이 낮게 나왔는데 걱정돼요.',
      a: '걱정하지 마세요. 혈액형 궁합은 오락용이고, 두 사람의 관계를 실제로 결정하는 것은 혈액형이 아니라 서로를 대하는 마음입니다.',
    },
  ],
  'fortune/mbti-match': [
    {
      q: 'MBTI 궁합은 어떻게 계산하나요?',
      a: '세상을 보는 방식(N/S)과 판단하는 방식(T/F)이 같으면 대화가 잘 통해 가점, 에너지 방향(E/I)과 생활 방식(J/P)은 다를 때 서로를 보완해 가점을 주는 방식입니다. 널리 통용되는 통념을 규칙으로 옮긴 것으로, 같은 조합은 늘 같은 결과가 나옵니다.',
    },
    {
      q: 'MBTI 궁합에 공식 기준이 있나요?',
      a: '없습니다. MBTI 궁합은 공식적으로 정해진 것이 아니라 여러 통념이 있을 뿐입니다. 이 계산기는 그중 하나를 투명한 규칙으로 구현한 오락·참고용입니다.',
    },
    {
      q: '내 MBTI를 모르면 어떻게 하나요?',
      a: '심리 테스트 섹션의 MBTI 테스트로 유형을 확인한 뒤 이용하시면 됩니다. 유형이 바뀌면 궁합 결과도 달라집니다.',
    },
  ],
  'fortune/today-color': [
    {
      q: '행운의 색은 어떻게 정해지나요?',
      a: '입력한 이름과 오늘 날짜를 조합해 결정론적으로 계산합니다. 같은 날 같은 이름은 늘 같은 색이 나오고, 날이 바뀌면 새 색으로 바뀝니다. 이름을 비우면 "오늘 모두의 색"이 됩니다.',
    },
    {
      q: '"피하면 좋은 색"은 꼭 피해야 하나요?',
      a: '재미로 보는 참고일 뿐입니다. 반드시 피해야 하는 것은 아니며, 그날 색을 고를 때 가벼운 힌트 정도로 즐겨 주세요.',
    },
    {
      q: '색으로 운을 정말 바꿀 수 있나요?',
      a: '과학적 근거가 있는 예측은 아닙니다. 다만 좋아하는 색을 곁에 두면 기분과 자신감이 살아나는 효과는 있으니, 그런 기분 전환용으로 활용해 보세요.',
    },
  ],
  'fortune/birth-stone': [
    {
      q: '탄생석은 어떤 기준인가요?',
      a: '현재 가장 널리 쓰이는 월별 탄생석(현대 표준)을 기준으로 했습니다. 나라·단체에 따라 일부 달은 보석이 다를 수 있어 대표적인 하나를 실었습니다.',
    },
    {
      q: '탄생화는 무엇인가요?',
      a: '태어난 달을 상징하는 대표 꽃과 그 꽃말입니다. 날짜별 탄생화도 있지만, 여기서는 월을 대표하는 꽃을 소개합니다.',
    },
    {
      q: '성향 설명도 사실인가요?',
      a: '탄생석·탄생화와 그 의미는 널리 알려진 정보지만, "이 달에 태어난 사람" 성향 설명은 재미로 보는 참고용입니다.',
    },
  ],
  'fortune/lucky-lotto': [
    {
      q: '행운 번호는 어떻게 정해지나요?',
      a: '입력한 생년월일과 오늘 날짜를 조합해 결정론적으로 계산합니다. 그래서 같은 날 같은 사람은 늘 같은 번호가 나오고, 날이 바뀌면 새 번호로 갱신됩니다.',
    },
    {
      q: '이 번호로 사면 당첨되나요?',
      a: '아니요. 재미와 참고를 위한 번호일 뿐 당첨을 보장하지 않습니다. 로또는 확률 게임이므로 지나친 구매는 삼가시고, 만 19세 이상만 구매할 수 있습니다.',
    },
    {
      q: '랜덤 뽑기의 로또 번호와 무엇이 다른가요?',
      a: '랜덤 뽑기 도구는 매번 완전 무작위로 뽑습니다. 이 페이지는 생년월일을 반영해 사람마다 다르고 하루 동안 고정되는, 개인화된 "오늘의 번호"라는 점이 다릅니다.',
    },
  ],
  'fortune/daily-tarot': [
    {
      q: '오늘의 타로는 얼마나 자주 바뀌나요?',
      a: '매일 자정을 기준으로 그날의 카드가 새로 정해집니다. 같은 날에는 몇 번을 방문해도 같은 카드가 나오고, 다음 날이 되면 새로운 카드로 바뀝니다.',
    },
    {
      q: '정방향과 역방향은 무슨 차이인가요?',
      a: '정방향은 카드의 기본 의미를, 역방향은 그 의미가 약해지거나 반대로 작용하는 상태를 나타냅니다. 같은 카드라도 방향에 따라 메시지가 달라집니다.',
    },
    {
      q: '타로 결과를 믿어도 되나요?',
      a: '타로는 재미와 자기 성찰을 돕는 참고용입니다. 과학적 예측이 아니며, 그날 마음을 돌아보는 계기 정도로 가볍게 즐기시길 권합니다.',
    },
  ],
  'fortune/tarot-yesno': [
    {
      q: '어떻게 질문하면 되나요?',
      a: '"예" 또는 "아니오"로 답할 수 있는 질문을 마음속으로 떠올린 뒤 카드를 뽑으세요. 질문 칸은 비워 둬도 되고, 기록용으로 적어 둬도 됩니다.',
    },
    {
      q: '예/아니오는 어떻게 정해지나요?',
      a: '뽑힌 타로 카드의 전통적인 긍정·부정 성향과 정/역방향을 조합해 예·아니오·글쎄로 답합니다. 카드가 왜 그렇게 답했는지 의미도 함께 보여드립니다.',
    },
    {
      q: '뽑을 때마다 답이 달라지는데요?',
      a: '카드는 매번 무작위로 뽑히므로 답이 달라질 수 있습니다. 같은 질문을 반복해 원하는 답을 찾기보다, 처음 나온 카드의 메시지를 참고용으로 받아들이는 편이 좋습니다.',
    },
  ],
  'fortune/daily': [
    {
      q: '오늘의 종합운세는 매일 바뀌나요?',
      a: '네. 생년월일과 오늘 날짜를 섞은 값으로 운세를 정하므로 매일 자정이 지나면 새로운 운세가 나옵니다. 같은 날에는 몇 번을 새로고침해도 같은 결과가 유지됩니다.',
    },
    {
      q: '생년월일을 입력하면 저장되나요?',
      a: '아닙니다. 입력한 생년월일은 브라우저에서 운세를 계산하는 데만 쓰이고 서버로 전송되거나 저장되지 않습니다.',
    },
    {
      q: '운세를 어디까지 믿어야 하나요?',
      a: '운세는 오락과 자기 성찰을 위한 콘텐츠입니다. 중요한 결정은 운세가 아니라 충분한 정보와 스스로의 판단으로 내리세요.',
    },
  ],
  'fortune/star-match': [
    {
      q: '별자리 궁합은 어떻게 계산하나요?',
      a: '점성술에서 12별자리는 각각 불·흙·바람·물 네 원소 중 하나에 속합니다. 같은 원소는 잘 통하고, 불↔바람·흙↔물은 서로를 북돋는 보완 관계, 불↔물·흙↔바람은 노력이 필요한 관계로 봅니다. 이 통설을 그대로 따르므로 같은 조합은 늘 같은 결과가 나옵니다.',
    },
    {
      q: '원소가 뭔가요?',
      a: '양자리·사자자리·사수자리는 불, 황소·처녀·염소자리는 흙, 쌍둥이·천칭·물병자리는 바람, 게·전갈·물고기자리는 물에 속합니다. 별자리마다 정해진 이 원소로 성향과 궁합을 봅니다.',
    },
    {
      q: '궁합이 낮게 나왔는데 괜찮을까요?',
      a: '괜찮습니다. 별자리 궁합은 오락·참고용이고, 관계를 실제로 결정하는 것은 태어난 시기가 아니라 서로를 대하는 마음입니다. 성질이 다른 조합이라도 그 차이를 존중하면 오히려 오래가는 사이가 됩니다.',
    },
  ],
  'fortune/zodiac-match': [
    {
      q: '띠 궁합은 어떻게 계산하나요?',
      a: '십이지의 전통 상성인 삼합·육합·충을 기준으로 합니다. 짝을 이루는 육합과 셋이 어울리는 삼합은 좋은 궁합으로, 정반대에 놓인 충은 노력이 필요한 궁합으로 봅니다. 별점처럼 무작위로 뽑는 것이 아니라 규칙이 정해져 있어 같은 조합은 늘 같은 결과가 나옵니다.',
    },
    {
      q: '궁합이 낮게 나왔는데 괜찮을까요?',
      a: '괜찮습니다. 띠 궁합은 오락·전통 참고용이고, 두 사람의 관계를 실제로 결정하는 것은 태어난 해가 아니라 서로를 대하는 마음입니다. 충 관계라도 서로 다름을 인정하면 오히려 더 성장하는 사이가 됩니다.',
    },
    {
      q: '삼합·육합이 뭔가요?',
      a: '육합은 십이지에서 짝을 이루는 여섯 쌍(예: 쥐-소, 범-돼지)으로 서로 끌어당기는 관계입니다. 삼합은 셋이 무리 짓는 네 묶음(예: 원숭이-쥐-용)으로 뜻이 잘 통하는 관계입니다.',
    },
  ],
  'fortune/name-match': [
    {
      q: '다른 사이트와 점수가 다르게 나와요.',
      a: '한글 획수를 세는 기준이 하나로 정해져 있지 않기 때문입니다. ㄱ을 1획으로 보는 표도 있고 2획으로 보는 표도 있어서 같은 이름도 다른 숫자가 나옵니다. 계산이 틀린 것이 아니라 기준이 다른 것입니다.',
    },
    {
      q: '이름 순서를 바꾸면 점수가 달라지나요?',
      a: '달라질 수 있습니다. 두 이름을 한 글자씩 번갈아 놓고 시작하기 때문에 순서가 결과에 영향을 줍니다. 규칙상 그런 것이지 오류가 아닙니다.',
    },
    {
      q: '점수가 낮게 나왔는데 괜찮을까요?',
      a: '괜찮습니다. 이 계산은 획수를 더하고 나머지를 취하는 산수일 뿐이고, 이름이 두 사람의 관계에 대해 알려줄 수 있는 것은 없습니다. 웃고 넘기는 용도입니다.',
    },
    {
      q: '한자 이름이나 영어 이름도 되나요?',
      a: '한글 음절만 계산에 들어갑니다. 한자·영문·공백·기호는 걸러지므로, 한글로 적어서 넣어주세요.',
    },
  ],
  'fortune/dream': [
    {
      q: '꿈 해몽은 어디까지 믿어야 하나요?',
      a: '전통적으로 전해 내려오는 상징 해석을 정리한 것입니다. 과학적 근거가 있는 것은 아니며, 재미로 참고하세요.',
    },
    {
      q: '같은 꿈을 반복해서 꾸는 이유가 뭔가요?',
      a: '심리학에서는 해결되지 않은 스트레스나 걱정이 반복되는 꿈으로 나타난다고 봅니다. 일상에서 마음에 걸리는 일이 있는지 돌아보세요.',
    },
    {
      q: '찾는 꿈이 목록에 없어요.',
      a: '가장 인상적이었던 소재(동물·물·불·사람 등)를 중심으로 검색해보세요. 비슷한 상징의 해석을 참고할 수 있습니다.',
    },
  ],
  'fortune/mbti': [
    {
      q: 'MBTI 운세는 MBTI 검사와 다른 건가요?',
      a: '네. 성격 유형 검사가 아니라, 이미 알고 있는 자신의 MBTI 유형에 맞춰 오늘의 운세를 보여주는 콘텐츠입니다.',
    },
    {
      q: '내 MBTI를 모르는데 어떻게 하나요?',
      a: '심리테스트 섹션의 MBTI 테스트를 먼저 해보시면 유형을 확인할 수 있습니다.',
    },
    {
      q: 'MBTI 유형이 바뀌면 운세도 달라지나요?',
      a: '네. 유형별로 다른 운세가 배정되므로 선택한 유형에 따라 결과가 달라집니다.',
    },
  ],

  /* ── 스냅 개별 ── */
  'snap/face-reading': [
    {
      q: '사진이 서버로 업로드되나요?',
      a: '아닙니다. 얼굴 분석은 브라우저에서만 실행되며 사진은 기기 밖으로 나가지 않습니다.',
    },
    {
      q: '관상 결과를 진지하게 받아들여야 하나요?',
      a: '아닙니다. 전통 관상 해석을 재미있게 재구성한 오락 콘텐츠이며, 성격이나 운명에 대한 판단 근거가 될 수 없습니다.',
    },
    {
      q: '사진에 따라 결과가 달라지나요?',
      a: '네. 각도·표정·조명에 따라 검출되는 얼굴 특징점이 달라져 결과도 바뀝니다.',
    },
  ],
  'snap/first-impression': [
    {
      q: '얼굴로 첫인상을 정말 알 수 있나요?',
      a: '아닙니다. 이 분석은 사진 속 눈·얼굴선·입꼬리의 비율을 재어 유형을 나눈 오락 콘텐츠입니다. 실제 첫인상은 얼굴보다 표정, 자세, 목소리, 태도에서 훨씬 크게 결정된다는 연구가 많습니다.',
    },
    {
      q: '무엇을 측정하나요?',
      a: '눈 높이를 얼굴 높이로 나눈 비율, 얼굴의 세로 대 가로 비율, 입꼬리가 입 중심보다 얼마나 위에 있는지를 잽니다. 모두 얼굴 자체 크기 기준의 상대값이라 사진 크기와 무관합니다.',
    },
    {
      q: '사진이 서버로 전송되나요?',
      a: '아닙니다. 얼굴 인식과 분석은 모두 브라우저 안에서 실행되며 사진은 기기를 벗어나지 않습니다.',
    },
    {
      q: '같은 사람인데 사진마다 결과가 달라요.',
      a: '각도·표정·조명이 바뀌면 검출되는 랜드마크가 달라져 측정값도 바뀝니다. 특히 웃는 사진과 무표정 사진은 다른 유형이 나오는 것이 정상입니다 — 실제로 그 두 사진이 주는 인상도 다르니까요.',
    },
    {
      q: '결과가 마음에 들지 않아요.',
      a: '모든 유형은 우열 없이 각각의 강점을 가지도록 썼습니다. 어떤 인상이든 잘 맞는 자리가 따로 있습니다. 재미로만 봐주세요.',
    },
  ],
  'snap/personal-color': [
    {
      q: '퍼스널 컬러 진단이 정확한가요?',
      a: '사진 속 피부 톤의 색상값을 분석한 참고용 결과입니다. 조명과 카메라 화이트밸런스에 크게 좌우되므로 전문 진단과는 차이가 있습니다.',
    },
    {
      q: '어떤 사진으로 찍어야 정확한가요?',
      a: '화장을 지우고 자연광 아래에서 정면으로 찍은 사진이 가장 정확합니다. 노란 실내조명이나 필터가 적용된 사진은 결과를 왜곡합니다.',
    },
    {
      q: '봄·여름·가을·겨울 톤이 무슨 뜻인가요?',
      a: '피부의 언더톤(따뜻한 톤/차가운 톤)과 명도·채도를 조합해 나눈 분류입니다. 어울리는 색 계열을 고르는 데 참고할 수 있습니다.',
    },
  ],
  'snap/golden-ratio': [
    {
      q: '황금비율 점수가 낮으면 못생긴 건가요?',
      a: '전혀 아닙니다. 특정 수학적 비율에 얼마나 가까운지를 잰 것일 뿐, 매력이나 아름다움과는 무관합니다. 재미로만 보세요.',
    },
    {
      q: '황금비율이 미의 기준인가요?',
      a: '흔히 그렇게 알려져 있지만, 황금비가 아름다움을 결정한다는 과학적 근거는 확립되어 있지 않습니다.',
    },
    {
      q: '측정할 때마다 점수가 조금씩 다릅니다.',
      a: '얼굴 특징점 검출이 각도와 조명에 민감하기 때문입니다. 같은 조건에서 여러 번 찍어 평균적인 경향을 보세요.',
    },
  ],
  'snap/face-symmetry': [
    {
      q: '완벽하게 대칭인 얼굴이 있나요?',
      a: '없습니다. 사람의 얼굴은 누구나 좌우가 다르며, 약간의 비대칭은 지극히 정상입니다.',
    },
    {
      q: '비대칭 점수가 높으면 문제가 있는 건가요?',
      a: '아닙니다. 이 도구는 사진 속 특징점의 좌우 좌표 차이를 잰 것이며 의학적 진단이 아닙니다. 우려되는 증상이 있다면 의료진과 상담하세요.',
    },
    {
      q: '사진 각도가 결과에 영향을 주나요?',
      a: '크게 영향을 줍니다. 고개가 조금만 돌아가도 비대칭 수치가 크게 올라가므로 정면 사진을 사용하세요.',
    },
  ],
  'snap/animal-face': [
    {
      q: '동물상은 어떻게 판정되나요?',
      a: '얼굴 특징점의 비율(눈매·턱선·이목구비 간격 등)을 동물상별 특징과 대조해 가장 가까운 유형을 고릅니다. 재미를 위한 분류입니다.',
    },
    {
      q: '결과가 마음에 안 들어요.',
      a: '동물상에는 우열이 없습니다. 각도와 표정을 바꿔 다시 시도해보면 다른 결과가 나올 수 있습니다.',
    },
    {
      q: '사진이 저장되나요?',
      a: '아닙니다. 브라우저에서만 분석하며 사진은 서버로 전송되거나 저장되지 않습니다.',
    },
  ],
  'snap/smile-score': [
    {
      q: '미소 점수는 무엇을 재는 건가요?',
      a: '얼굴 인식 모델이 검출한 표정 확률 중 "행복" 항목의 강도를 점수로 환산한 것입니다.',
    },
    {
      q: '웃고 있는데 점수가 낮게 나와요.',
      a: '입꼬리만 올린 미소보다 눈가 근육까지 움직이는 미소를 모델이 더 강하게 인식합니다. 조명이 어두우면 검출력도 떨어집니다.',
    },
    {
      q: '결과가 성격을 말해주나요?',
      a: '아닙니다. 사진 한 장의 표정을 잰 것일 뿐 성격이나 기분과는 관계가 없습니다.',
    },
  ],
  'snap/expression': [
    {
      q: '어떤 표정을 인식하나요?',
      a: '기쁨·슬픔·놀람·화남·중립 등 기본 표정을 확률로 분석해 가장 강한 표정을 보여줍니다.',
    },
    {
      q: '무표정인데 화났다고 나와요.',
      a: '표정 인식 모델은 눈썹과 입꼬리의 미세한 각도에 민감합니다. 실제 감정과 다를 수 있으니 재미로 봐주세요.',
    },
    {
      q: '여러 명이 나온 사진도 되나요?',
      a: '가장 크게 검출된 얼굴 하나를 기준으로 분석합니다. 정확한 결과를 원하면 한 사람만 나온 사진을 사용하세요.',
    },
  ],
  'snap/couple-match': [
    {
      q: '궁합 점수가 실제 연애와 관계가 있나요?',
      a: '전혀 없습니다. 두 사진의 얼굴 특징을 비교해 만든 오락용 점수이며, 관계의 성패와는 무관합니다.',
    },
    {
      q: '두 사람의 사진이 모두 필요한가요?',
      a: '네. 각각의 얼굴이 인식되어야 비교가 가능합니다. 두 사진 모두 정면이 잘 보이는 것이 좋습니다.',
    },
    {
      q: '사진이 상대방에게 전송되나요?',
      a: '아닙니다. 두 사진 모두 내 브라우저 안에서만 처리되며 어디로도 전송되지 않습니다.',
    },
  ],
  'snap/photo-mood': [
    {
      q: '사진 분위기는 어떻게 분석하나요?',
      a: '사진의 색상 분포·밝기·대비 같은 시각적 특성을 종합해 분위기를 분류합니다.',
    },
    {
      q: '얼굴이 없는 사진도 되나요?',
      a: '네. 풍경이나 사물 사진도 색감과 톤을 기준으로 분위기를 분석할 수 있습니다.',
    },
    {
      q: '필터를 적용한 사진은 어떻게 되나요?',
      a: '필터가 색감을 바꾸므로 결과도 달라집니다. 원본 사진으로 분석하는 편이 사진 본래의 분위기에 가깝습니다.',
    },
  ],
  'snap/handwriting': [
    {
      q: '손글씨로 성격을 알 수 있나요?',
      a: '필적학은 과학적으로 검증된 분야가 아닙니다. 이 콘텐츠는 재미를 위한 것이며 성격 진단이 아닙니다.',
    },
    {
      q: '어떻게 찍어야 잘 인식되나요?',
      a: '흰 종이에 검은 펜으로 쓴 글씨를 밝은 곳에서 정면으로 촬영하면 인식이 잘 됩니다. 그림자와 구겨짐은 피하세요.',
    },
    {
      q: '글씨 이미지가 저장되나요?',
      a: '아닙니다. 브라우저에서만 분석하며 이미지는 서버로 전송되지 않습니다.',
    },
  ],

  /* ── 크립토 개별 ── */
  'crypto/signals': [
    {
      q: 'Will following these signals make money?',
      a: 'There is no reason to expect so. The signal is a summary of what four indicators currently say about past price — it has no predictive guarantee. The page itself reports that the target was hit next-day only 4.6% of the time while the stop was hit first 42.1% of the time. Read those numbers before acting on anything here.',
    },
    {
      q: 'What does the confidence percentage mean?',
      a: 'It is the share of the four strategies (Trend, Bollinger, RSI, ATR) voting the same direction — nothing more. 100% confidence means all four agree, not that the trade is likely to win.',
    },
    {
      q: 'The indicators disagree with each other. Which one is right?',
      a: 'Disagreement is normal — each indicator looks at a different window and a different property of price. When they conflict, the honest reading is that there is no clear signal, and standing aside is a valid choice.',
    },
    {
      q: 'What is the difference between spot and futures here?',
      a: 'Spot is buy-only (long). The LONG/SHORT labels apply to futures trading only, where you can also take a short position.',
    },
  ],
  'crypto/sold-at-top': [
    {
      q: 'What would selling at the top and buying the bottom have returned?',
      a: 'An amount that is not meaningful. Holding only on days that closed higher produces a figure with more digits than there is money in existence. The size of that number is the finding: it is the arithmetic ceiling, not a target anyone approaches.',
    },
    {
      q: 'How much does missing just a few days cost?',
      a: 'Far more than the days suggest. Crypto returns are concentrated into a small number of sessions, so sitting out the twenty best days of several thousand is enough to erase most of the return \u2014 and for Bitcoin over its full listed history, enough to turn it negative.',
    },
    {
      q: 'Why can I not just avoid the worst days instead?',
      a: 'Because the best days and the worst days are the same week. Violent rebounds follow capitulation, so the largest single-day gains sit immediately beside the largest single-day losses. Bitcoin\u2019s best day in its listed history came the day after its worst.',
    },
    {
      q: 'What happens if I dodge every crash but also miss every rally?',
      a: 'For Bitcoin, you end up behind having simply held. That row is on the page because it is the realistic outcome of active timing \u2014 you do not get to keep the crash avoidance and the rebounds separately.',
    },
    {
      q: 'Are fees included in these numbers?',
      a: 'No, and that omission favours the timing scenarios. Every market-timing row requires dozens or thousands of round trips that buy and hold never pays for, so the real gap is wider than shown, in the direction of doing nothing.',
    },
    {
      q: 'Does sitting out a day mean it is removed from the series?',
      a: 'No. A day sat out simply earns zero for that scenario. Every row covers exactly the same calendar period and the same number of days, so the comparison isolates participation rather than changing the window.',
    },
    {
      q: 'Why does the history start at different dates for different coins?',
      a: 'The window is each coin\u2019s full daily history on the exchange, so it begins when the pair was listed. A newer coin therefore covers fewer days and fewer market cycles, which makes its extreme-day statistics less settled.',
    },
  ],
  'crypto/kelly-criterion': [
    {
      q: 'What is the Kelly criterion?',
      a: 'It is the bet size that maximises the long-run growth rate of capital given a known edge: (p·b \u2212 q) \u00f7 b, where p is the win rate, q is 1 \u2212 p, and b is the reward-to-risk ratio. Betting more than it prescribes lowers growth rather than raising it.',
    },
    {
      q: 'Why do people say never to use full Kelly?',
      a: 'Two reasons. It assumes you know your edge exactly, and overstating it pushes the recommended size up while the penalty for overbetting rises steeply. It is also violent: full Kelly carries roughly a one-in-two chance of the account halving at some point.',
    },
    {
      q: 'What does half Kelly actually cost?',
      a: 'About a quarter of the growth rate. Betting half of the Kelly fraction keeps roughly 75% of the long-run growth while cutting the chance of ever halving the account from one-in-two to one-in-eight. That asymmetry is the entire argument for fractional Kelly.',
    },
    {
      q: 'Does a better strategy make full Kelly safer?',
      a: 'No, and this surprises people. Under the standard approximation the chance of ever falling to a fraction of your peak depends only on what multiple of Kelly you bet, not on the win rate or reward ratio. A stronger edge earns more and recovers faster, but the drawdown profile is set by bet size.',
    },
    {
      q: 'What happens if I bet more than Kelly?',
      a: 'Growth falls, and it reaches zero at roughly twice the Kelly fraction \u2014 the same long-run result as never trading, after living through every drawdown on the way. Beyond that point capital declines even though every individual trade still has positive expectancy.',
    },
    {
      q: 'Can Kelly be used if my edge is negative?',
      a: 'The formula returns a negative number, which means the correct bet is zero. No position size makes a negative-expectancy strategy profitable; reducing size only slows the loss.',
    },
    {
      q: 'Why does the calculator show a break-even win rate?',
      a: 'Because win rate alone says nothing without the reward ratio. At 2:1 you break even at 33.3%, at 1:1 you need 50%. The break-even figure tells you which side of the line your inputs fall on before any sizing question arises.',
    },
  ],
  'crypto/day-of-week': [
    {
      q: 'Is there a best day of the week to buy crypto?',
      a: 'The table shows what each weekday has averaged, but the honest answer is that any effect is far smaller than the daily noise it sits inside. A tenth of a percent tendency cannot be separated from three to four percent daily swings, however many observations you have.',
    },
    {
      q: 'The sample is hundreds of days per weekday. Why is that not enough?',
      a: 'Because sample size is not the constraint — effect size is. Nine years gives roughly 470 observations of each weekday, and the t-statistic can still sit near zero because the signal being looked for is two orders of magnitude smaller than the variation around it.',
    },
    {
      q: 'Why compare the mean to the median?',
      a: 'Because when they disagree, the mean is being carried by outliers. A weekday whose mean is several times its median has one or two enormous days in it rather than a consistent tendency, and that is precisely the case where a t-test overstates significance on fat-tailed returns.',
    },
    {
      q: 'One weekday shows a significant t-statistic. Does that settle it?',
      a: 'No. Seven weekdays tested at a 5% threshold produce about a third of a false positive by chance, so a single flagged day is unremarkable. Even two deserve scrutiny, especially if the mean-versus-median check suggests outliers are responsible.',
    },
    {
      q: 'Why would crypto have weaker weekday effects than stocks?',
      a: 'Because the mechanisms are absent. Weekday patterns in traditional markets come from exchange closes, multi-day settlement, scheduled fund reporting and timed news releases. Crypto trades continuously with none of that structure.',
    },
    {
      q: 'Does the timezone matter?',
      a: 'Yes. Days here are assigned by UTC close, which is the convention Binance candles use. A table built on a local timezone would split returns differently and could shift which weekday looks strongest.',
    },
  ],
  'crypto/rebalancing': [
    {
      q: 'Does rebalancing a crypto portfolio actually help?',
      a: 'It depends on whether the assets take turns leading. Rebalancing sells what rose and buys what fell, which pays off under mean reversion and costs money when one asset simply keeps winning. Crypto has mostly been the second case, so the advice is worth testing rather than assuming.',
    },
    {
      q: 'How often should I rebalance?',
      a: 'The table compares weekly, monthly and quarterly against never touching the portfolio, with fees deducted. More frequent rebalancing means more trades and more cost — weekly trades roughly thirteen times as often as quarterly for the same portfolio.',
    },
    {
      q: 'Does rebalancing reduce risk?',
      a: 'Only conditionally. In a sustained decline it makes drawdown worse, because each rebalance moves money into the falling asset. It cushions drawdown only when the assets mean-revert against each other, which is why both drawdown figures are shown rather than one.',
    },
    {
      q: 'Why does buy-and-hold usually win here?',
      a: 'Because one asset tends to dominate. Left alone, the winner grows into most of the portfolio, and rebalancing would have kept cutting it. The drift panel shows what the untouched weights became, which is also a reminder that the portfolio you end up holding is not the one you chose.',
    },
    {
      q: 'Are fees and taxes included?',
      a: 'Fees are included and deducted from the values shown, because leaving them out flatters rebalancing. Taxes are not modelled at all, and in jurisdictions where each rebalance is a taxable disposal they can outweigh every other effect on the page.',
    },
    {
      q: 'How reliable is this backtest?',
      a: 'It covers one window and a handful of coins that survived to be listed today, so it inherits survivorship bias — tokens that collapsed are absent from the comparison. Treat the direction of the result as informative and the exact figures as specific to this period.',
    },
  ],
  'crypto/volatility': [
    {
      q: 'Which crypto is the most volatile?',
      a: 'It depends on the window, which is why four are shown. A coin can top the seven-day ranking because of one turbulent week while sitting mid-table over a year. The one-week column answers what is happening now and the one-year column answers what the coin is normally like.',
    },
    {
      q: 'What does the "now divided by usual" ratio mean?',
      a: 'It compares the seven-day volatility to the one-year volatility. A value near 1 means the coin is behaving normally; 3 means it is three times more turbulent than usual and is in an unusual regime rather than simply being a volatile asset.',
    },
    {
      q: 'Can volatility be predicted?',
      a: 'To a useful degree, yes — and it is the only thing on this site that can. Volatility clusters, so a violent week is followed by more violent moves more often than not. Direction shows no such persistence, which is why this page ranks turbulence and never suggests which way it resolves.',
    },
    {
      q: 'Why show a "typical day" figure?',
      a: 'Because an annualised percentage is hard to act on. Dividing it by the square root of 365 converts it back to the size of an ordinary daily move, which immediately tells you whether a given stop distance was ever realistic for that coin.',
    },
    {
      q: 'Why is volatility annualised at 365 days rather than 252?',
      a: 'Because crypto trades every day. Equity conventions use roughly 252 trading days a year to account for weekends and holidays, which do not exist here. Using 365 keeps the figures comparable across every window on the page.',
    },
    {
      q: 'Does high volatility mean high risk?',
      a: 'It means large moves in both directions. Whether that is risk depends on your position size and your stop: the same volatility is survivable at one size and ruinous at another, which is a sizing question rather than a property of the coin.',
    },
  ],
  'crypto/drawdown': [
    {
      q: 'What is a drawdown?',
      a: 'The fall from a record high to the lowest point before that high is beaten again. It is quoted as a depth, but it also has two durations that matter: how long the fall took and how long the recovery took.',
    },
    {
      q: 'Why does duration matter more than depth?',
      a: 'Because the cost of a drawdown is paid in time spent watching, not on the single day the low prints. A 50% fall recovered in three months and a 50% fall still unrecovered after three years are the same figure and completely different to hold.',
    },
    {
      q: 'What does "time underwater" mean?',
      a: 'The share of all days the asset spent below a previous high. It is usually large even for assets that rose a great deal, because new highs are rare by construction — most days sit under a level you have already seen.',
    },
    {
      q: 'Why are the deepest and longest drawdowns often different episodes?',
      a: 'Because a sharp crash can recover quickly while a shallow decline can grind on for years. Ranking by depth and ranking by duration give different answers, which is worth knowing before treating depth as the only measure of risk.',
    },
    {
      q: 'Why exclude drawdowns under 10%?',
      a: 'Ten percent moves happen constantly in crypto and listing them all would bury the episodes that mattered. The threshold is a readability choice rather than a meaningful boundary, and it is stated so you can interpret the list accordingly.',
    },
    {
      q: 'Do these figures match other sources?',
      a: 'Not always. They use daily closes since the coin listed on Binance, so intraday lows are excluded and an earlier peak on another exchange is not counted. Every model on this site uses daily closes, which keeps these numbers consistent with the forecasts.',
    },
  ],
  'crypto/stablecoin-depeg': [
    {
      q: 'Why report deviation in basis points instead of percent?',
      a: 'Because the numbers are small and the differences matter. A stablecoin fifteen basis points from parity is doing ordinary market-making; one hundred and fifty basis points away is a different event. A percentage display rounds both toward 0.00% and hides the distinction.',
    },
    {
      q: 'Are these prices against the US dollar?',
      a: 'No, against USDT. Binance quotes stablecoins in USDT, so 0.999 means a tenth of a percent below USDT rather than below a dollar. That matters because when USDT itself drifts, every other row moves the opposite way.',
    },
    {
      q: 'How do you know whether USDT or the other coin is moving?',
      a: 'By taking the median deviation of the other stablecoins and inverting it. If they all sit the same distance on the same side, the simpler explanation is that the yardstick moved. The median is used rather than the average so that one genuinely failing token does not drag the estimate.',
    },
    {
      q: 'Is a small deviation a warning sign?',
      a: 'Usually not. Redemption takes hours and costs fees, so arbitrage does not close a few basis points instantly and stablecoins oscillate around parity continuously. Real depegs persist and widen rather than revert, and volume rises sharply as holders exit.',
    },
    {
      q: 'Why does volume appear next to the deviation?',
      a: 'Because a wide deviation on a thinly traded pair describes the order book rather than the token. Without volume, a quiet market with a wide spread looks identical to a run.',
    },
    {
      q: 'Can this tell me if a stablecoin is safe?',
      a: 'No. Price is the market\u2019s opinion about whether reserves exist and can be redeemed, not evidence about it, and that opinion has been wrong in both directions — slow in some failures, briefly panicked about tokens that were fine.',
    },
  ],
  'crypto/risk-of-ruin': [
    {
      q: 'What is risk of ruin?',
      a: 'The probability that a run of losses reduces an account to a level you would not continue trading from. It depends on the win rate, the reward-to-risk ratio, and the fraction of the account risked on each trade.',
    },
    {
      q: 'Which input matters most?',
      a: 'The risk per trade, by a wide margin. Holding the win rate and reward ratio fixed and varying only the bet size moves the probability of ruin by orders of magnitude. The same strategy can be survivable for one trader and fatal for another purely through position size.',
    },
    {
      q: 'Can I avoid ruin by trading smaller if my strategy loses money?',
      a: 'No. With negative expectancy ruin is certain given enough trades, and smaller bets only postpone it. Advice to reduce size treats a sizing problem as though it could fix an edge problem, which it cannot.',
    },
    {
      q: 'How is the probability calculated?',
      a: 'In closed form rather than by simulation. The ruin probability satisfies a recursion whose solution is a geometric series, so it reduces to a root of p·z^(R+1) − z + q = 0 raised to the number of losses the account can absorb. For a reward ratio of 1 this is exactly the classic (q/p)^n result.',
    },
    {
      q: 'Why does the page also show the break-even win rate?',
      a: 'Because a win rate only means something relative to the reward ratio. At 2:1 you need to be right a third of the time to break even; at 1:2 you need two thirds. Without that comparison a win rate figure is unreadable.',
    },
    {
      q: 'What does the model get wrong about real trading?',
      a: 'It assumes trades are independent. In practice losses cluster, because whatever produced one usually persists for a while, and clustering makes ruin more likely than the figure shown. Win rates also drift, and the one you enter is usually estimated from too few trades.',
    },
  ],
  'crypto/risk-adjusted': [
    {
      q: 'What is the Sharpe ratio and why is it limited for crypto?',
      a: 'It divides return by total standard deviation. Two things make it a poor fit here: it assumes a normal distribution that fat-tailed crypto returns violate, so the worst days are understated, and it treats large gains as risk in exactly the same way as large losses.',
    },
    {
      q: 'How is Sortino different?',
      a: 'It divides only by downside deviation, so upside volatility is not penalised. The denominator still uses the total number of observations rather than only the losing ones, which prevents assets with rare losses from being unfairly punished.',
    },
    {
      q: 'What does the Calmar ratio measure?',
      a: 'Annual return divided by the worst drawdown actually endured. It makes no assumption about the shape of the return distribution, which is its advantage, but it rests on a single historical episode — so a coin that happened to avoid a crash scores well without being safer.',
    },
    {
      q: 'Why do the three ratios rank coins differently?',
      a: 'Because they encode different definitions of risk. A coin whose losses are rare but severe looks better under Sortino than under Calmar; one with steady mild volatility looks better under Sharpe. The rank-spread column shows how many places each coin moves, and a large spread means the ranking depends on which definition you accept.',
    },
    {
      q: 'Why is the risk-free rate set to zero?',
      a: 'Because against crypto return magnitudes it is within rounding error, and fixing it to a specific figure would distort comparisons between periods when rates differed. Setting it to zero keeps every column on the same basis.',
    },
    {
      q: 'Does a high ratio predict future performance?',
      a: 'No. Volatility persists to a useful degree, so the denominators carry some information about the future. The numerator is past return, which does not. Treating a high historical ratio as a forecast is the main way these numbers get misused.',
    },
  ],
  'crypto/compound-calculator': [
    {
      q: 'What is the difference between APR and APY?',
      a: 'APR is the rate before compounding; APY is what you actually receive once interest earns interest. At 12% APR compounded daily the APY is 12.75%. Platforms advertise whichever looks better, so comparing one product\u2019s APR against another\u2019s APY invents a difference that is not there.',
    },
    {
      q: 'Why does a 12% return only need an 10.7% price fall to erase it?',
      a: 'Because the fall applies to the grown balance rather than to what you put in. If your holding is 1.12 times its original size, dropping to 1/1.12 of that returns you to break-even, which is a 10.7% decline. Gains and the losses that undo them are never mirror images.',
    },
    {
      q: 'Does earning yield reduce my risk?',
      a: 'No. Yield paid in a token increases how much of that token you hold, which increases your exposure rather than reducing it. Whether the position ends up profitable is decided mostly by the token price over the same period.',
    },
    {
      q: 'Why compare the yield to volatility?',
      a: 'Because it shows the scale of the two forces. Crypto assets commonly swing fifty to a hundred percent in a year, so a double-digit rate is a small adjustment to an outcome driven by price. The page reports the yield as a percentage of one year\u2019s ordinary swing to make that concrete.',
    },
    {
      q: 'How is the probability of the break-even fall calculated?',
      a: 'From the same model used across this site: the coin\u2019s measured volatility with fat-tailed shocks, sampled over four thousand paths, counting how often the price touches the break-even level at any point within a year. It is monitored on daily closes.',
    },
    {
      q: 'What risks are not in this calculation?',
      a: 'Lock-up periods and unbonding delays, smart-contract failure, validator slashing, platform insolvency, and the possibility that a rate is funded by token emissions rather than revenue. None of them appear in an advertised percentage, and none are modelled here.',
    },
  ],
  'crypto/compare': [
    {
      q: 'Which is better, Bitcoin or Ethereum?',
      a: 'The comparison has no fixed answer because it depends entirely on the window. This page shows returns over 30 days, 90 days, one year and two years precisely so you can see the lead change, and it says so when it does. A single headline figure is a choice of period presented as a property of the asset.',
    },
    {
      q: 'Why does the page show the correlation between the two coins?',
      a: 'Because it decides whether the comparison is interesting. Most large-cap crypto pairs correlate above 0.7, which means they differ mainly in how much they move rather than in when. Choosing between them is then closer to choosing exposure than to choosing a different bet, and holding both is not diversification.',
    },
    {
      q: 'What does beta to Bitcoin mean here?',
      a: 'It measures how much the coin has tended to move for a given Bitcoin move. A beta of 1.5 implies roughly one and a half times the move in either direction. Since almost all crypto moves with Bitcoin, beta is often more informative about a coin than its own return figures.',
    },
    {
      q: 'Why compare drawdowns rather than just returns?',
      a: 'Because drawdown is what determines whether a position is holdable. Two coins with the same annual return are not equivalent if one of them fell eighty percent along the way. The table also separates the worst drawdown ever from the current distance below the high, which are different questions.',
    },
    {
      q: 'Is it fair to compare a new coin against an old one?',
      a: 'Not entirely, and the page notes the overlapping history it used. A coin listed recently is judged on a shorter and usually easier sample, since it has not lived through as many market regimes. The day counts beside each coin are there so that asymmetry is visible.',
    },
    {
      q: 'Does the better past performer keep winning?',
      a: 'There is no evidence here for that, and this page makes no such claim. Volatility and correlation persist to a useful degree, drawdowns describe what holders have already endured, but the return column describes a period that has already happened.',
    },
  ],
  'crypto/correlation': [
    {
      q: 'What does the correlation matrix show?',
      a: 'The linear co-movement of daily returns between the major cryptocurrencies over the window you select. A value of 1 means the two moved together every day, 0 means no linear relationship, and negative values mean they tended to move in opposite directions.',
    },
    {
      q: 'Why show how much the correlation changes?',
      a: 'Because correlation is a property of a pair over a window, not a fixed property of the pair. Splitting the same window into quarters often moves the figure substantially, which means a portfolio designed around a single average was built for a relationship that did not hold for much of the period.',
    },
    {
      q: 'Do cryptocurrencies diversify each other?',
      a: 'Much less than the numbers suggest at a glance. Almost every large-cap pair sits well above zero, so the low readings are low by degree rather than in kind. A basket of them behaves closer to one position held in several proportions than to a diversified portfolio.',
    },
    {
      q: 'Why report a median move on crash days instead of a crash correlation?',
      a: 'Because restricting a sample to days when one variable moved a lot distorts correlation mechanically, through range truncation. A "crash correlation" can therefore rise or fall for reasons unrelated to diversification. How far each coin actually fell on those days has no such artefact and answers the question directly.',
    },
    {
      q: 'What does the multiple against Bitcoin mean?',
      a: 'It compares median moves on the days Bitcoin fell more than three percent. A value of 1.5 means the coin typically fell about half again as much as Bitcoin did on those days, which is the practical form of the question people are asking when they check correlation.',
    },
    {
      q: 'Can correlation predict future price moves?',
      a: 'No. It describes how two assets moved together in the past over one window, and this page shows how unstable even that description is. It carries no forecast about direction for either asset.',
    },
  ],
  'crypto/seasonality': [
    {
      q: 'Is there really a best month to buy crypto?',
      a: 'The table shows what each calendar month has actually done, but the honest answer is that the sample is far too small to establish it. Bitcoin has around nine Octobers on Binance, so an October figure rests on nine numbers rather than on years of daily data.',
    },
    {
      q: 'Why is a p-value shown next to each month?',
      a: 'Because a lopsided win rate looks convincing until you calculate how often chance produces it. Seven up years out of nine happens frequently with a fair coin. The p-value is the probability of a split that uneven or more, and most named crypto seasonal patterns do not survive it.',
    },
    {
      q: 'What is wrong with looking at all twelve months?',
      a: 'Testing twelve things at a 5% threshold produces about 0.6 apparent hits from randomness alone. So finding one dramatic-looking month somewhere in the calendar is the expected outcome of looking rather than a discovery, and a single flagged month should not be read as a pattern.',
    },
    {
      q: 'Does "Uptober" hold up?',
      a: 'October does show the strongest median in Bitcoin\u2019s Binance history, and the sample behind it is roughly nine years. Whether that clears the bar for evidence is exactly what the p column answers, and the page reports the number either way rather than promoting the name.',
    },
    {
      q: 'Can I use this for altcoins?',
      a: 'You can select any Binance coin, but the sample gets much thinner. A token listed three years ago has three observations per month, which is three coincidences rather than a seasonal effect. The page flags coins with too few years rather than presenting the table as meaningful.',
    },
    {
      q: 'How is each month\u2019s return calculated?',
      a: 'From the first to the last daily close within that calendar month, using Binance data. The first and last months of a coin\u2019s history are excluded because they are usually partial, which would otherwise distort those two months.',
    },
  ],
  'crypto/long-short-ratio': [
    {
      q: 'What is the long/short ratio?',
      a: 'It describes how Binance futures participants are positioned. The account ratio is the share of trading accounts holding a long; the top-trader position ratio is the share of money in large accounts that is long. They answer different questions and this page shows both.',
    },
    {
      q: 'Why do the account and position ratios differ?',
      a: 'Because one counts people and the other counts money. When many small accounts are long while a few large positions are short, the account ratio leans long and the position ratio leans short. That disagreement is usually more informative than either number alone.',
    },
    {
      q: 'Does a crowded ratio mean the price will move the other way?',
      a: 'That is the popular claim and this page does not endorse it. Binance exposes only thirty days of positioning history, which sits inside a single market mood, so any backtest over it would produce a number with no evidential weight. Rather than showing a misleading result, no backtest is shown.',
    },
    {
      q: 'Why does open interest matter here?',
      a: 'Because a lopsided ratio on a thin market means far less than the same ratio on a deep one. Open interest is the notional value of all open positions, so it tells you how much capital the reading actually represents.',
    },
    {
      q: 'What do "crowded" and "tilted" mean?',
      a: 'They are labels applied at twenty and ten percentage points away from an even split. Those cutoffs are conventions chosen for readability, not thresholds discovered in data, and a reading just either side of one is not meaningfully different.',
    },
    {
      q: 'Does this cover the whole market?',
      a: 'No, only Binance USD-M futures. Other venues have their own participants and their own positioning, and spot holdings are not represented at all. It is a large slice of derivatives activity rather than a complete picture.',
    },
  ],
  'crypto/fear-greed-index': [
    {
      q: 'What is the crypto Fear & Greed Index?',
      a: 'A single 0 to 100 reading published by alternative.me that blends volatility, market momentum and volume, social media activity, Bitcoin dominance and search interest. Low values are labelled fear and high values greed.',
    },
    {
      q: 'Does buying at extreme fear actually work?',
      a: 'This page tests it rather than assuming it. Every daily reading since 2018 is joined to Bitcoin\u2019s close and grouped by category, and the median return over the next 30 and 90 days is shown for each. The result is displayed as measured, including when it contradicts the popular contrarian rule.',
    },
    {
      q: 'Why does the table show episodes as well as days?',
      a: 'Because consecutive days at the same reading are one event, not many. A month of fear contributes about thirty rows but only a single independent observation. The episode count collapses each run into one and is much smaller, which is the number worth reading.',
    },
    {
      q: 'Why is the current value shown as a percentile?',
      a: 'A reading of 25 means little on its own. Knowing what share of the past several years sat below it turns the number into something comparable — the same value can be unremarkable in one period and unusual in another.',
    },
    {
      q: 'Is the index independent of price?',
      a: 'Largely not. Most of its inputs — volatility, momentum, volume, dominance — are derived from price, so the index moves closely with the market rather than ahead of it. A low reading mainly reflects that the price has already fallen, which limits how much it can add.',
    },
    {
      q: 'How far back does the data go?',
      a: 'The index begins on 1 February 2018, giving roughly three thousand daily readings. That covers only a few market cycles, so groupings drawn from it describe a specific era rather than a general rule.',
    },
  ],
  'crypto/halving-countdown': [
    {
      q: 'When is the next Bitcoin halving?',
      a: 'It happens at a fixed block height rather than on a date — every 210,000 blocks. This page counts the blocks remaining from the live chain height and converts them to an estimated date, so the countdown stays correct as the network speeds up or slows down.',
    },
    {
      q: 'Why do halving countdowns show different dates?',
      a: 'Because converting blocks to a date requires assuming a block time, and blocks do not arrive exactly every ten minutes. Ten minutes is the target the difficulty adjustment aims at, not the observed rate, which drifts either side of it for weeks. Different assumptions move the estimate by days or weeks.',
    },
    {
      q: 'Which block-time assumption is most reliable?',
      a: 'The average across the current difficulty epoch, because it uses the largest sample. A fifteen-block average swings widely and is shown only to make the short-run variation visible. The honest reading is a range rather than any single date.',
    },
    {
      q: 'What actually changes at a halving?',
      a: 'The reward paid to miners for each block is cut in half, which halves the rate at which new bitcoin enters supply. That is the entire mechanism. It is scheduled in the protocol and has followed the same rule since 2009.',
    },
    {
      q: 'Why is there no price prediction on this page?',
      a: 'Because Bitcoin has had four halvings, and any claim about what the price does afterwards rests on those four observations, each embedded in a completely different market. Four points cannot separate a halving effect from everything else happening at the time.',
    },
    {
      q: 'When do halvings stop?',
      a: 'After the 33rd halving the reward rounds to zero in satoshi terms, which is what caps total supply near 21 million. On the current schedule that is well over a century away, and miners are expected to be paid by transaction fees long before then.',
    },
  ],
  'crypto/profit-calculator': [
    {
      q: 'Why is my break-even price higher than my entry?',
      a: 'Because the fee is charged twice — once opening the position and once closing it. Returning to your entry price therefore leaves you down by both fees. For a long, break-even is entry x (1 + fee) / (1 - fee), which at 0.1% per side is about 0.2002% above entry.',
    },
    {
      q: 'Why is break-even slightly more than double the one-way fee?',
      a: 'The exit fee is charged on the exit amount, which is larger than the entry amount once the price has risen to break-even. Doubling the one-way fee assumes both are charged on the same base, and they are not. The gap is small per trade and compounds quickly for anyone trading frequently.',
    },
    {
      q: 'Does leverage increase my profit?',
      a: 'Not in dollars. Once the position size is fixed, a given price move produces the same gain or loss at any leverage. What leverage changes is the margin locked up, and therefore the percentage return quoted on that margin. A $100 gain is $100 whether the ROI reads 10% or 200%.',
    },
    {
      q: 'What fee rate should I enter?',
      a: 'It depends on the venue and order type. Binance spot is commonly 0.1% per side, while USD-M futures are nearer 0.02% for maker orders and 0.04% for taker orders. Volume tiers and fee discounts lower these, so the presets are starting points rather than your actual rate.',
    },
    {
      q: 'Are funding payments included?',
      a: 'No. Perpetual futures charge funding at fixed intervals while the position is open, and that is a separate cost from trading fees. For a position held more than a few hours it can outweigh them, and this page does not model it.',
    },
    {
      q: 'Does the calculator work for short positions?',
      a: 'Yes. For a short the profit comes from the price falling, and break-even sits below your entry at entry x (1 - fee) / (1 + fee) rather than above it. The direction toggle handles both cases.',
    },
  ],
  'crypto/all-time-high': [
    {
      q: 'Why does a 50% drop need a 100% gain to recover?',
      a: 'The loss is measured against the old price and the recovery against the new, smaller one. Half of your money has to double to get back to the whole. The asymmetry grows quickly: down 80% needs up 400%, and down 95% needs up 1,900%.',
    },
    {
      q: 'Where do the all-time highs come from?',
      a: 'They are the highest daily closing price in the Binance history available for each coin. That excludes intraday spikes and any price from before the coin listed on Binance, so a token that peaked elsewhere or earlier will show a high below its true record.',
    },
    {
      q: 'Why use daily closes instead of the intraday high?',
      a: 'Every model on this site — the forecast bands, the touch probabilities, the historical scenarios — is built on daily closes. Mixing an intraday high into that would mean the price and the probability beside it describe different things. Consistency matters more here than matching a headline figure from another source.',
    },
    {
      q: 'Does a large required gain mean the coin is a bargain?',
      a: 'No. The number is arithmetic, not opportunity. A coin down 95% needs 1,900% to recover, and that difficulty is a reason for caution rather than a reason to expect the move. Many assets never regain a former high at all.',
    },
    {
      q: 'Why do the drawdown and recovery orderings differ?',
      a: 'They rank the same coins differently because the relationship between them is non-linear. Sorting by required gain pushes the deepest drawdowns much further apart than sorting by drawdown does, which is a more honest picture of how hard each recovery actually is.',
    },
  ],
  'crypto/altseason-index': [
    {
      q: 'What is the altcoin season index?',
      a: 'It is the share of the top coins that have outperformed Bitcoin over a chosen window, expressed as a percentage. The common convention looks back 90 days across the top 50 coins excluding stablecoins and wrapped assets, and calls 75 or above an altcoin season and 25 or below a Bitcoin season.',
    },
    {
      q: 'Are the 75 and 25 thresholds meaningful?',
      a: 'They are conventions rather than measured regime boundaries. Nothing changes in the market between a reading of 74 and 76, so a value near either line is better read as borderline than as a change of state. This page flags readings within five points of a threshold for that reason.',
    },
    {
      q: 'Can the index say altcoin season while everything is falling?',
      a: 'Yes, and this is the most common misreading. The measure is purely relative, so in a broad sell-off where altcoins fall less than Bitcoin the index rises even though every coin is losing money. The page shows each coin\u2019s own return alongside its performance against Bitcoin so that case is visible.',
    },
    {
      q: 'Why does your list differ from other altcoin season trackers?',
      a: 'The universe here is ranked by trading volume rather than market capitalisation, because a static site has no market-cap feed and volume is the closest public proxy Binance offers. The two usually agree on membership but not always. Since the full list is shown, any difference is easy to inspect rather than hidden.',
    },
    {
      q: 'Which coins are excluded from the calculation?',
      a: 'Bitcoin itself, stablecoins such as USDT, USDC, FDUSD and DAI, and Bitcoin or Ethereum wrappers such as WBTC and WBETH. Including them would drag the index toward the middle, since a stablecoin neither beats nor loses to Bitcoin in any meaningful sense.',
    },
    {
      q: 'Does a high reading mean altcoins will keep outperforming?',
      a: 'No. The index is entirely backward looking — it reports that altcoins have already outperformed over the window you selected. It contains no forecast, and this page does not turn it into one.',
    },
  ],
  'crypto/position-size-calculator': [
    {
      q: 'How is position size calculated?',
      a: 'Divide the amount you are willing to lose — your account multiplied by your risk percentage — by the distance from entry to stop. That gives the quantity, and because the distance is in the denominator, a wider stop automatically produces a smaller position and the loss at stop stays the same either way.',
    },
    {
      q: 'Does leverage change my position size?',
      a: 'No, and this is the most common misconception. Size comes from the stop distance and the loss you accept. Leverage only changes how much margin is locked up to hold that same position. Doubling leverage with an unchanged stop halves the margin posted and leaves the loss at stop identical.',
    },
    {
      q: 'What risk percentage should I use per trade?',
      a: 'Common practice is 0.5% to 2% of the account per trade, and the reason is arithmetic rather than taste: at 2% risk a run of ten losses costs about a fifth of the account, while at 10% the same run is close to fatal. There is no correct figure, but it should be a number a losing streak can survive.',
    },
    {
      q: 'Why does this show the probability of the stop being hit?',
      a: 'Because sizing only fixes what a loss costs, not how often it happens. The same 3% stop is routine noise on a volatile altcoin and a meaningful level on a quiet large cap. The figure comes from sampling that coin\u2019s measured volatility with no directional view, so it estimates how often ordinary movement alone would touch the level.',
    },
    {
      q: 'What is an R multiple and a breakeven win rate?',
      a: 'One R is the amount risked, so a target three times the stop distance away is 3R. The win rate needed just to break even follows only from that ratio and equals 1/(R+1) — 50% at 1R, 33% at 2R, 25% at 3R. Improving the ratio lowers the bar far more dependably than trying to be right more often.',
    },
    {
      q: 'Can I be liquidated before my stop is reached?',
      a: 'Yes, if leverage is high enough that the liquidation price falls inside the stop distance, in which case the stop never gets a chance to execute. Sizing by risk does not prevent that on its own — check the liquidation price separately for the leverage you intend to use.',
    },
  ],
  'crypto/funding-rates': [
    {
      q: 'What is a funding rate?',
      a: 'Perpetual futures never expire, so nothing naturally pulls their price back to spot. Funding does it: at fixed intervals one side pays the other in proportion to the gap between the perpetual and the index price. A positive rate means longs pay shorts, a negative rate means shorts pay longs. The exchange does not keep it — it moves between traders.',
    },
    {
      q: 'Why do your annualised rates differ from other funding tables?',
      a: 'Because most tables assume every contract settles three times a day. Binance runs a large share of its USDT perpetuals on a 4-hour schedule and a few on a 1-hour schedule, so the assumption is wrong for more than half of them. A 4-hour symbol annualised as if it were 8-hourly comes out at exactly half its real rate. This page reads each symbol\u2019s actual interval and uses that.',
    },
    {
      q: 'Does a high annualised rate mean I would earn that in a year?',
      a: 'No. Only the next settlement is fixed; everything after it moves with the market, and the most extreme rates are usually the ones that revert fastest. The annualised column exists to make the size of a small-looking number legible, not to project a year of income.',
    },
    {
      q: 'Can I just collect funding by hedging the position?',
      a: 'That is the standard funding arbitrage, and it is not free. Fees apply on both legs at entry and exit, the rate can flip before you unwind, and shorting spot to hedge requires borrowing — the borrow cost is usually highest on exactly the coins whose funding is extreme, for the same underlying reason.',
    },
    {
      q: 'How do I tell whether a rate is unusually high?',
      a: 'Only by comparing it to that coin\u2019s own history, since baselines differ widely between symbols. Selecting a row shows the percentile of the current rate against its past settlements, which is a more meaningful signal than any absolute threshold.',
    },
    {
      q: 'Do funding rates predict the price direction?',
      a: 'They describe positioning, not direction. A strongly positive rate says leveraged longs are crowded and paying to stay in, which is information about who is exposed rather than about where the price goes next. This page does not turn funding into a directional signal.',
    },
  ],
  'crypto/dca-calculator': [
    {
      q: 'What does this DCA calculator actually compute?',
      a: 'It replays a recurring fixed-amount buy against real Binance daily closes. Buys land on the close at each interval, so you get the total invested, the quantity accumulated, the average cost and what the position would be worth at the end of the window. Fees, spread and slippage are excluded.',
    },
    {
      q: 'Why does it show every start date instead of just one?',
      a: 'Because in crypto the start date usually matters more than the strategy. The same plan begun a year apart can end up with completely different results, so a single hand-picked window mostly reflects the choice of window. Running the plan from every possible start date shows the worst, the median and the best outcome, which tells you whether the headline number was lucky.',
    },
    {
      q: 'Is dollar-cost averaging better than investing a lump sum?',
      a: 'Not automatically, and this page measures it rather than asserting it. Spreading purchases lowers your average cost only when the price falls after you begin. In a market that mostly rose, buying later means buying higher, and lump sum wins more often. What DCA reliably reduces is how much your entry timing decides the outcome, not the average outcome itself.',
    },
    {
      q: 'What does the number of independent windows mean?',
      a: 'Overlapping windows re-measure the same history. Three years of daily data yields hundreds of one-year windows but only three that do not overlap, so the apparent sample size is far larger than the real one. The page shows the non-overlapping count next to every spread, and flags results below six as unreliable.',
    },
    {
      q: 'Why is my result different from other DCA calculators?',
      a: 'Usually the window, the price source or the buy timing. This page uses Binance daily closes and buys at the close of each interval; sites using a different exchange, a different close convention or a fee assumption will land somewhere nearby but not identical. Large gaps almost always come from a different start date rather than a different method.',
    },
    {
      q: 'Does the historical result predict future returns?',
      a: 'No. A backtest describes one particular past, and crypto has only a few genuinely independent multi-year windows in total. Coins that collapsed and were delisted are also missing from the data, which biases any historical average upward. Treat these figures as a description of what happened, not a forecast.',
    },
  ],
  'crypto/liquidation-calculator': [
    {
      q: 'How is the liquidation price calculated?',
      a: 'Liquidation happens when the equity left in the position equals the maintenance margin. Because that margin is charged on the notional at the liquidation price rather than at entry, a long works out to entry x (1 - 1/leverage) / (1 - maintenance margin rate), and a short to entry x (1 + 1/leverage) / (1 + rate). Calculators that omit the divisor place the level further from entry than it actually is, and the gap widens with leverage.',
    },
    {
      q: 'Why does this show a probability of being liquidated?',
      a: 'Because the price alone does not tell you whether a position is risky. A liquidation 20% away is routine in a volatile coin and rare in a quiet one. The probability is sampled from 4,000 paths using that specific coin\u2019s measured volatility and fat tails, counting how often the price touches your level at any point within 7, 30 or 90 days.',
    },
    {
      q: 'Will my real liquidation price match this?',
      a: 'It will be slightly closer to your entry. This calculation excludes trading fees, funding payments and tiered maintenance margin, and all three erode margin in the same direction. Treat this as the optimistic end and confirm against the liquidation price your exchange shows on the order screen.',
    },
    {
      q: 'What maintenance margin rate should I enter?',
      a: 'It depends on the exchange, the coin and your position size, since exchanges apply tiers that rise with notional. On Binance the first tier is commonly 0.4% for BTC and 0.5% to 1% for most altcoins. The calculator cannot know your tier, so it takes the rate as an input rather than guessing.',
    },
    {
      q: 'Does adding margin change my position size?',
      a: 'No. Added margin leaves the quantity and notional untouched and only moves the liquidation price further away. Reducing leverage at a fixed margin is different: that shrinks the position itself.',
    },
    {
      q: 'Is isolated or cross margin assumed?',
      a: 'Isolated. Only the margin assigned to this position backs it. Under cross margin your entire wallet balance and the profit or loss of every other open position feed into the same calculation, so the liquidation price moves as those positions move.',
    },
  ],
  'crypto/atr-tpsl': [
    {
      q: 'What is ATR?',
      a: 'Average True Range — a volatility measure of how much price has typically moved within a single period, including gaps between candles.',
    },
    {
      q: 'Why size stops with ATR instead of a fixed percentage?',
      a: 'A fixed percentage stop is too tight when volatility is high (you get stopped out by ordinary noise) and too loose when it is low (you give back more than you need to). ATR scales the stop to whatever the market is actually doing right now.',
    },
    {
      q: 'What multiplier should I use?',
      a: '1.5–3× is the common range. A smaller multiplier means more frequent stop-outs; a larger one means each loss is bigger. There is no correct answer — it has to match the loss you can actually absorb.',
    },
    {
      q: 'Does a wider stop mean less risk?',
      a: 'No. A wider stop only survives more noise; it does not reduce risk unless you also cut position size. Risk is stop distance multiplied by position size, so widening one without shrinking the other increases what you stand to lose.',
    },
  ],

  'crypto/kimchi-premium': [
    {
      q: '김치 프리미엄이 뭔가요?',
      a: '같은 코인이 국내 거래소에서 해외 거래소보다 비싸게 거래되는 현상입니다. 국내 수요는 몰리는데 해외로 자금을 옮기기가 번거로우면 그 마찰만큼 국내 가격이 위로 벌어집니다. 반대로 국내가 더 싸면 역프리미엄(역프)이라고 합니다.',
    },
    {
      q: '환율 기준과 USDT 기준은 왜 값이 다른가요?',
      a: '환율 기준은 공식 USD/KRW 환율로 환산해 비교한 값이고, USDT 기준은 국내에서 USDT를 사서 해외로 보내는 실제 경로를 반영한 값입니다. 국내 USDT 자체에 프리미엄이나 할인이 붙어 있으면 두 값이 그만큼 갈립니다. 실제로 자금을 옮길 계획이라면 USDT 기준을 보세요.',
    },
    {
      q: '김프가 크면 그만큼 벌 수 있나요?',
      a: '아닙니다. 거래 수수료, 출금 수수료, 송금이 걸리는 동안의 가격 변동, 거래소별 입출금 정책이 모두 실제 수익을 깎습니다. 특히 송금 중 시세가 움직이면 김프보다 큰 손실이 날 수도 있습니다. 이 페이지는 시세 비교를 보여줄 뿐 수익을 보장하지 않습니다.',
    },
    {
      q: '거래대금이 작은 코인의 김프가 유난히 큰데 진짜인가요?',
      a: '얕은 호가일 가능성이 큽니다. 거래가 거의 없는 코인은 마지막 체결가가 오래된 값이거나 소량 주문으로 밀린 값일 수 있습니다. 표에 업비트·빗썸 24시간 거래대금을 함께 표시하니 숫자와 거래대금을 같이 보세요.',
    },
    {
      q: '어떤 코인은 왜 목록에 없나요?',
      a: '세 거래소(업비트 또는 빗썸, 그리고 바이낸스)에 모두 상장된 코인만 비교할 수 있습니다. 또 같은 티커에 서로 다른 토큰을 상장한 경우가 있어(예: 업비트 DATA는 데이터네트워크, 바이낸스 DATA는 Streamr) 가격차가 비정상적으로 큰 코인은 잘못된 비교를 막기 위해 제외했습니다.',
    },
    {
      q: '시세는 얼마나 자주 갱신되나요?',
      a: '코인 시세는 1분마다 자동으로 갱신됩니다. 다만 공식 환율은 제공처가 하루 한 번 갱신하므로, 장중에는 같은 환율이 계속 쓰입니다. 이 점이 신경 쓰인다면 USDT 기준을 보세요 — 국내 USDT 시세는 실시간입니다.',
    },
  ],

  /* ── 기기 점검 ── */
  device: [
    {
      q: '프로그램을 설치해야 하나요?',
      a: '아닙니다. 모든 점검은 웹 브라우저 안에서 바로 실행됩니다. 설치·회원가입·결제가 전혀 없고, 크롬·엣지·사파리 등 최신 브라우저면 페이지를 여는 즉시 사용할 수 있습니다.',
    },
    {
      q: '카메라나 마이크로 들어온 영상·음성이 저장되나요?',
      a: '아닙니다. 이 사이트는 정적 페이지로만 배포돼 있어 영상이나 음성을 받을 서버 자체가 없습니다. 스트림은 브라우저 안에서만 재생·분석되고 탭을 닫는 순간 사라집니다.',
    },
    {
      q: '측정 결과가 실제 하드웨어 사양과 다를 수 있나요?',
      a: '네. 브라우저가 알려주는 값을 그대로 보여주므로 운영체제 설정, 절전 모드, 드라이버 상태에 따라 실제 사양보다 낮게 나올 수 있습니다. 값이 이상하면 전원 설정과 드라이버를 확인한 뒤 다시 측정해 보세요.',
    },
    {
      q: '스마트폰에서도 쓸 수 있나요?',
      a: '대부분 가능합니다. 터치·마이크·카메라·주사율·기기 정보는 모바일에서도 그대로 동작합니다. 키보드·마우스·게임패드 테스트는 해당 장치를 연결한 상태에서 의미가 있습니다.',
    },
  ],
  'device/keyboard': [
    {
      q: '어떤 키를 눌렀는데 화면에 아무 반응이 없어요.',
      a: '운영체제나 다른 프로그램이 그 키를 먼저 가로챘거나, 실제로 스위치가 고장 난 경우입니다. 실행 중인 프로그램을 닫고 다시 눌러 보고 그래도 반응이 없다면 키보드 쪽 문제일 가능성이 큽니다.',
    },
    {
      q: '동시입력(N키 롤오버)이 무엇인가요?',
      a: '여러 키를 한꺼번에 눌렀을 때 몇 개까지 정확히 인식되는지를 말합니다. 보급형 멤브레인 키보드는 보통 여섯 개 안팎에서 막히고, 게이밍 키보드는 그 이상을 지원합니다. 게임에서 이동·점프·공격이 동시에 안 먹는다면 이 한계 때문입니다.',
    },
    {
      q: '한/영 키나 한자 키가 화면 배열에 없습니다.',
      a: '가상 키보드는 표준 영문 배열을 기준으로 그립니다. 배열에 없는 키를 눌러도 아래 "최근 입력"에 키 코드가 그대로 찍히므로 인식 여부는 확인할 수 있습니다.',
    },
  ],
  'device/mouse': [
    {
      q: '채터링이 무엇인가요?',
      a: '마우스 스위치가 닳아서 한 번 눌렀는데 두 번 입력되는 고장입니다. 드래그가 중간에 끊기거나 클릭 한 번에 창이 두 번 열린다면 의심할 만합니다. 이 테스트는 같은 버튼이 60밀리초 안에 다시 눌리면 의심으로 표시합니다.',
    },
    {
      q: '채터링 의심이 떴는데 정말 고장인가요?',
      a: '일부러 아주 빠르게 두 번 눌렀다면 정상입니다. 평소 속도로 한 번씩만 눌렀는데도 반복해서 표시된다면 스위치 수명이 다한 신호로 볼 수 있습니다.',
    },
    {
      q: '사이드 버튼(뒤로·앞으로)이 인식되지 않습니다.',
      a: '브라우저나 마우스 드라이버가 그 버튼을 페이지 이동 기능으로 먼저 쓰는 경우가 있습니다. 드라이버에서 버튼에 다른 기능을 할당해 두었다면 그 설정대로 동작하므로 이 화면에는 표시되지 않을 수 있습니다.',
    },
  ],
  'device/mic': [
    {
      q: '마이크 권한을 거부했는데 다시 물어보지 않습니다.',
      a: '브라우저는 한 번 거부한 사이트에 다시 묻지 않습니다. 주소창 왼쪽의 자물쇠 아이콘을 눌러 마이크 권한을 허용으로 바꾼 뒤 페이지를 새로고침하세요.',
    },
    {
      q: '레벨 미터는 움직이는데 상대방이 잘 안 들린다고 합니다.',
      a: '녹음 버튼으로 실제 소리를 들어보세요. 소리가 작다면 운영체제의 입력 볼륨을 올리고, 웅웅거리거나 잡음이 섞인다면 마이크 위치와 주변 소음, 마이크 부스트 설정을 조정해야 합니다.',
    },
    {
      q: '여러 마이크 중에서 원하는 장치를 고를 수 있나요?',
      a: '네. 권한을 허용하면 연결된 마이크 목록이 나타나고, 목록에서 다른 장치를 고르면 그 장치로 다시 측정을 시작합니다.',
    },
  ],
  'device/webcam': [
    {
      q: '카메라가 켜지지 않고 오류가 납니다.',
      a: '화상회의 앱처럼 다른 프로그램이 카메라를 이미 점유하고 있으면 열리지 않습니다. 해당 앱을 완전히 종료한 뒤 다시 시도하고, 권한이 거부돼 있다면 주소창 자물쇠 아이콘에서 허용으로 바꾸세요.',
    },
    {
      q: '해상도가 기대한 값보다 낮게 나옵니다.',
      a: '카메라가 요청한 해상도를 지원하지 않으면 브라우저가 가장 가까운 값으로 낮춥니다. 또 내장 카메라는 조명이 어두우면 밝기를 확보하려고 프레임레이트를 스스로 떨어뜨립니다.',
    },
    {
      q: '찍은 스냅샷은 어디에 저장되나요?',
      a: '스냅샷은 브라우저 메모리에만 만들어지고, 저장 버튼을 눌렀을 때만 내 기기에 내려받습니다. 어떤 경우에도 서버로 전송되지 않습니다.',
    },
  ],
  'device/speaker': [
    {
      q: '좌우가 반대로 들립니다.',
      a: '이어폰을 좌우 바꿔 꽂았거나 스피커 케이블이 반대로 연결된 경우입니다. 무선 이어버드는 한쪽만 먼저 연결됐을 때도 그렇게 들릴 수 있으니 케이스에 넣었다 다시 연결해 보세요.',
    },
    {
      q: '높은 주파수가 들리지 않는데 스피커 고장인가요?',
      a: '꼭 그렇지는 않습니다. 사람의 가청 상한은 나이가 들수록 낮아져 성인은 15kHz 이상이 잘 안 들리는 경우가 흔합니다. 다른 사람에게 같은 소리를 들려주면 기기 문제인지 구분할 수 있습니다.',
    },
    {
      q: '소리를 크게 키워서 테스트해도 되나요?',
      a: '권하지 않습니다. 특히 고주파를 큰 볼륨으로 오래 들으면 청력에 무리가 갑니다. 30% 정도에서 시작해 필요한 만큼만 천천히 올리세요.',
    },
  ],
  'device/monitor': [
    {
      q: '데드 픽셀과 스턱 픽셀은 어떻게 다른가요?',
      a: '데드 픽셀은 어떤 색을 띄워도 계속 까만 점이고, 스턱 픽셀은 특정 색으로 계속 켜져 있는 점입니다. 스턱 픽셀은 며칠 쓰는 사이 풀리기도 하지만 데드 픽셀은 대개 회복되지 않습니다.',
    },
    {
      q: '검은 화면에서 가장자리가 희끄무레한데 불량인가요?',
      a: 'LCD는 백라이트가 새는 빛샘이 어느 정도 있는 것이 정상입니다. 다만 화면 중앙까지 번지거나 한 부분만 유독 밝다면 제조사에 교환 문의를 해볼 만합니다.',
    },
    {
      q: '전체화면으로 전환되지 않습니다.',
      a: '브라우저 설정이나 기기 정책으로 전체화면이 막힐 수 있습니다. 그때도 색상 화면이 브라우저 창 전체를 덮으므로, 창을 최대화한 상태에서 확인하면 거의 같은 결과를 볼 수 있습니다.',
    },
  ],
  'device/refresh-rate': [
    {
      q: '144Hz 모니터인데 60Hz로 측정됩니다.',
      a: '실제로 60Hz로 동작하고 있을 가능성이 큽니다. 디스플레이 고급 설정이나 그래픽 카드 제어판에서 주사율을 직접 올리고, 케이블 규격이 낮다면 DisplayPort 등 대역폭이 넉넉한 케이블로 바꿔 보세요.',
    },
    {
      q: '측정할 때마다 값이 조금씩 달라집니다.',
      a: '브라우저가 다른 작업과 시간을 나눠 쓰기 때문에 소수점 단위 차이는 정상입니다. 차이가 크다면 백그라운드 프로그램을 닫고 이 탭을 화면 맨 앞에 둔 상태에서 다시 측정하세요.',
    },
    {
      q: '노트북에서 값이 유난히 낮게 나옵니다.',
      a: '배터리로 쓰는 동안 주사율을 자동으로 낮추는 절전 기능이 흔합니다. 전원 어댑터를 연결하고 전원 관리 모드를 성능으로 바꾼 뒤 다시 측정해 보세요.',
    },
  ],
  'device/touch': [
    {
      q: '화면의 특정 부분만 터치가 안 됩니다.',
      a: '테스트 영역을 손가락으로 꼼꼼히 문질러 색이 칠해지지 않는 구멍이 있는지 확인하세요. 같은 자리가 반복해서 비어 있다면 디지타이저 손상이나 액정 교체 후 접촉 불량일 수 있습니다.',
    },
    {
      q: '동시 인식 개수가 기기 사양보다 적게 나옵니다.',
      a: '손가락이 서로 너무 가까우면 하나로 합쳐서 인식됩니다. 손가락을 충분히 벌려 올려 보세요. 두꺼운 보호 필름이나 젖은 손도 인식률을 떨어뜨립니다.',
    },
    {
      q: '터치가 없는 PC에서도 의미가 있나요?',
      a: '있습니다. 터치가 없는 기기에서는 마우스나 스타일러스 입력이 같은 방식으로 표시되므로, 터치패드나 펜의 좌표·필압을 확인하는 용도로 쓸 수 있습니다.',
    },
  ],
  'device/gamepad': [
    {
      q: '컨트롤러를 연결했는데 화면에 나타나지 않습니다.',
      a: '브라우저는 패드에서 입력이 한 번 들어와야 장치를 인식합니다. 연결한 뒤 아무 버튼이나 한 번 눌러 보세요. 그래도 안 되면 다른 USB 포트나 케이블을 쓰거나 블루투스 페어링을 다시 하세요.',
    },
    {
      q: '스틱 드리프트가 무엇인가요?',
      a: '스틱에서 손을 뗐는데도 입력이 계속 들어가는 고장입니다. 손을 완전히 뗀 상태에서 좌표가 0에 가깝지 않고 한쪽으로 치우쳐 있다면 드리프트로 볼 수 있습니다.',
    },
    {
      q: '진동 테스트를 눌러도 반응이 없습니다.',
      a: '진동은 브라우저와 패드가 모두 지원해야 동작합니다. 크롬 계열에서 유선으로 연결했을 때 가장 잘 되고, 지원하지 않는 조합에서는 아무 일도 일어나지 않습니다.',
    },
  ],
  'device/info': [
    {
      q: '해상도가 실제 모니터보다 작게 나옵니다.',
      a: '운영체제의 화면 배율(예: 150%)이 적용된 논리 해상도를 먼저 보여주기 때문입니다. 픽셀 배율을 곱한 "실제 픽셀 추정" 값이 물리 해상도에 더 가깝습니다.',
    },
    {
      q: 'IP 주소나 위치 정보도 확인할 수 있나요?',
      a: '이 페이지는 브라우저가 스스로 알려주는 값만 보여주며 IP·위치·계정 같은 개인정보는 다루지 않습니다. 수집하는 항목도 없고 어디로도 전송되지 않습니다.',
    },
    {
      q: '이 정보를 다른 사람에게 어떻게 전달하나요?',
      a: '맨 아래 복사 버튼을 누르면 모든 항목이 텍스트로 클립보드에 담깁니다. 원격 지원 요청이나 문의 글에 그대로 붙여 넣으면 됩니다.',
    },
  ],

  /* ── 이미지 도구 ── */
  image: [
    {
      q: '올린 사진이 서버에 저장되나요?',
      a: '아닙니다. 모든 편집은 브라우저 안의 canvas에서 이루어지고, 이 사이트는 정적 페이지로만 배포돼 있어 파일을 받을 서버 자체가 없습니다. 페이지를 연 뒤에는 인터넷을 끊어도 편집이 동작합니다.',
    },
    {
      q: '한 번에 여러 장을 처리할 수 있나요?',
      a: '사진 이어붙이기는 여러 장을 함께 다루고, 나머지 도구는 한 장씩 처리합니다. 여러 장을 같은 설정으로 줄이려면 한 장씩 반복해야 합니다.',
    },
    {
      q: '아이폰에서 찍은 HEIC 사진도 되나요?',
      a: '브라우저가 읽을 수 있으면 그대로 됩니다. 사파리에서는 대체로 열리고, 다른 브라우저에서 안 열린다면 아이폰 설정에서 "가장 호환성 높게"로 촬영하거나 JPG로 내보낸 뒤 사용하세요.',
    },
    {
      q: '편집하면 원본 파일이 바뀌나요?',
      a: '아닙니다. 원본은 그대로 있고, 저장 버튼을 눌렀을 때만 편집된 새 파일이 내 기기에 내려받아집니다.',
    },
  ],
  'image/compress': [
    {
      q: '용량이 얼마나 줄어드나요?',
      a: '화질을 70% 정도로 두면 보통 원본의 절반 이하가 됩니다. 다만 이미 강하게 압축된 JPG는 더 줄일 여지가 적어 차이가 작을 수 있습니다.',
    },
    {
      q: '화질은 몇 %로 두는 게 좋나요?',
      a: '화면으로 볼 사진이라면 70~80%에서 눈에 띄는 차이가 거의 없습니다. 인쇄하거나 크게 확대할 사진은 90% 이상을 권합니다.',
    },
    {
      q: '더 줄이고 싶은데 방법이 있나요?',
      a: '이 도구는 화질만 낮추고 픽셀 크기는 그대로 둡니다. 이미지 크기 조절로 가로세로를 먼저 줄인 뒤 압축하면 훨씬 크게 줄어듭니다.',
    },
  ],
  'image/resize': [
    {
      q: '비율 고정은 켜두는 게 좋나요?',
      a: '네. 꺼두고 가로만 바꾸면 사진이 옆으로 늘어나 찌그러집니다. 정사각형처럼 비율 자체를 바꿔야 한다면 늘리는 대신 자르기를 쓰는 편이 자연스럽습니다.',
    },
    {
      q: '작은 사진을 크게 늘리면 선명해지나요?',
      a: '아닙니다. 원본에 없던 정보를 만들어내지는 못하므로 늘릴수록 흐릿하고 뭉개져 보입니다. 확대는 꼭 필요할 때만 하세요.',
    },
    {
      q: '크기를 줄이면 용량은 얼마나 줄어드나요?',
      a: '가로세로를 각각 절반으로 줄이면 픽셀 수는 4분의 1이 되고, 용량도 대체로 그 정도로 줄어듭니다. 화질 손실 없이 용량을 줄이는 가장 확실한 방법입니다.',
    },
  ],
  'image/convert': [
    {
      q: 'WebP는 어떤 형식인가요?',
      a: '같은 화질에서 JPG보다 20~30% 작게 저장되는 형식입니다. 요즘 브라우저는 모두 지원하지만, 일부 프로그램이나 오래된 시스템은 못 읽으니 제출용 파일이라면 JPG가 안전합니다.',
    },
    {
      q: 'PNG를 JPG로 바꾸면 투명 배경은 어떻게 되나요?',
      a: 'JPG에는 투명이 없어서 투명했던 부분이 한 가지 색으로 채워집니다. 이 도구에서 채울 색을 직접 고를 수 있으니, 올릴 곳의 배경색과 맞추면 자연스럽습니다.',
    },
    {
      q: '변환하면 화질이 떨어지나요?',
      a: 'PNG에서 JPG·WebP로 바꿀 때는 손실이 생깁니다. 반대로 JPG를 PNG로 바꾸면 더 나빠지지는 않지만 이미 잃은 화질이 돌아오지도 않고 용량만 커집니다.',
    },
  ],
  'image/crop': [
    {
      q: '자르면 화질이 떨어지나요?',
      a: '남긴 부분은 원본 픽셀 그대로입니다. 다만 JPG로 다시 저장하는 과정에서 아주 약간의 압축 손실이 생깁니다. 원본이 PNG면 그대로 PNG로 저장돼 손실이 없습니다.',
    },
    {
      q: '프로필 사진 규격에 맞추려면 어떻게 하나요?',
      a: '먼저 1:1 비율로 고정해 얼굴이 가운데 오도록 자른 뒤, 이미지 크기 조절에서 512×512처럼 요구되는 픽셀로 맞추면 됩니다.',
    },
    {
      q: '휴대폰에서도 쓸 수 있나요?',
      a: '됩니다. 사진 위에서 손가락으로 끌어 영역을 그리고, 네 모서리의 동그란 손잡이를 잡아 크기를 조절하면 됩니다.',
    },
  ],
  'image/rotate': [
    {
      q: '휴대폰 사진이 자꾸 옆으로 눕는 이유가 뭔가요?',
      a: '사진 파일 안에 "이 방향으로 돌려서 보여달라"는 회전 정보(EXIF)가 따로 들어 있고, 이걸 무시하는 프로그램에서는 원래 저장된 방향 그대로 눕게 됩니다. 이 도구는 그 정보를 반영해 읽으므로 화면에 보이는 그대로 저장됩니다.',
    },
    {
      q: '90도가 아닌 각도로 돌리면 화질이 나빠지나요?',
      a: '픽셀을 다시 배치하는 과정에서 아주 조금 부드러워집니다. 90도·180도 회전은 픽셀을 자리만 옮기므로 손실이 없습니다.',
    },
    {
      q: '회전하고 나면 모서리에 빈 곳이 생깁니다.',
      a: '사각형을 비스듬히 돌리면 네 구석이 비는 것이 당연합니다. 빈 곳은 고른 배경색으로 채워지며, 여백이 싫다면 저장한 뒤 자르기로 잘라내면 됩니다.',
    },
  ],
  'image/mosaic': [
    {
      q: '모자이크한 부분을 나중에 원래대로 되돌릴 수 있나요?',
      a: '저장한 파일에서는 되돌릴 수 없습니다. 해당 픽셀이 평균색으로 아예 교체되기 때문입니다. 다만 칸 크기가 너무 작으면 글자의 형태가 어렴풋이 남을 수 있으니, 글자를 가릴 때는 칸을 크게 잡으세요.',
    },
    {
      q: '확실하게 가리려면 어느 쪽이 좋나요?',
      a: '검게 덮기가 가장 확실합니다. 모자이크는 원래 색의 평균을 남기므로 분위기는 보존되지만 완전한 은폐는 아닙니다. 계좌번호·주민번호처럼 중요한 정보는 검게 덮으세요.',
    },
    {
      q: '실수로 엉뚱한 곳을 칠했습니다.',
      a: '되돌리기 버튼을 누르면 방금 한 붓질이 통째로 취소됩니다. 처음부터 다시 하려면 전부 지우기를 누르세요. 원본은 그대로 남아 있어 언제든 되돌아갑니다.',
    },
  ],
  'image/merge': [
    {
      q: '크기가 다른 사진을 붙이면 어떻게 되나요?',
      a: '"폭 맞추기"를 켜두면 가장 넓은 사진에 맞춰 나머지를 늘려 가장자리를 가지런히 맞춥니다. 끄면 원래 크기 그대로 가운데 정렬되고 남는 자리는 여백 색으로 채워집니다.',
    },
    {
      q: '몇 장까지 붙일 수 있나요?',
      a: '개수 제한은 없지만 합친 결과가 아주 커지면 기기 메모리에 걸려 실패할 수 있습니다. 긴 대화 캡처는 열 장 안팎으로 나눠 붙이는 편이 안전합니다.',
    },
    {
      q: '사진 순서를 바꿀 수 있나요?',
      a: '목록에서 위·아래 화살표로 순서를 바꾸고 ✕로 뺄 수 있습니다. 나중에 사진을 더 올리면 목록 맨 뒤에 이어 붙습니다.',
    },
  ],
  'image/palette': [
    {
      q: '대표 색은 어떤 기준으로 뽑나요?',
      a: '사진을 작게 줄여 모든 픽셀의 색을 세고, 눈에 같은 색으로 보이는 것끼리 묶은 뒤 많이 쓰인 순서로 여섯 개를 고릅니다. 그래서 큰 면적을 차지한 색이 앞에 옵니다.',
    },
    {
      q: '색 옆의 퍼센트는 무슨 뜻인가요?',
      a: '그 색 계열이 사진 전체에서 차지하는 픽셀 비율입니다. 배경이 넓은 사진은 배경색이 절반을 넘기도 합니다.',
    },
    {
      q: '사진의 특정 지점 색만 정확히 알고 싶습니다.',
      a: '사진 위에서 원하는 지점을 누르면 그 자리의 색을 원본 픽셀에서 그대로 읽어 HEX·RGB로 보여줍니다. 목록 맨 위에 "찍은 지점"으로 표시됩니다.',
    },
  ],

  /* ── 텍스트 도구 ── */
  text: [
    {
      q: '입력한 글이 서버에 저장되나요?',
      a: '아닙니다. 모든 변환은 브라우저 안에서 이루어지고, 이 사이트는 정적 페이지로만 배포돼 있어 글을 받을 서버 자체가 없습니다. 계약서나 자기소개서를 붙여 넣어도 밖으로 나가지 않습니다.',
    },
    {
      q: '휴대폰에서도 쓸 수 있나요?',
      a: '모든 도구가 휴대폰에서 그대로 동작합니다. 다만 복사 기능은 브라우저 권한을 따르므로, 복사가 안 되면 결과를 길게 눌러 직접 선택해 복사하세요.',
    },
    {
      q: '글자수 세기는 어디에 있나요?',
      a: '자기소개서·원고지 기준은 "원고지·자소서 글자수"에 있고, 단어수·바이트까지 보는 개발자용 카운터는 계산기 섹션의 글자수 카운터에 있습니다.',
    },
    {
      q: '맞춤법 검사도 되나요?',
      a: '맞춤법 검사는 제공하지 않습니다. 정확한 검사에는 사전과 문법 분석이 필요해 브라우저 안에서만 처리한다는 이 섹션의 원칙과 맞지 않습니다. 대신 붙여넣기 정리, 중복 줄 제거처럼 규칙이 분명한 일을 다룹니다.',
    },
  ],
  'text/hanyoung': [
    {
      q: '왜 이런 일이 생기나요?',
      a: '한국어 자판은 같은 키에 한글 자모와 영문자가 함께 배정돼 있습니다. 한/영 키 상태를 못 보고 치면 키 신호는 같은데 다른 글자가 찍힙니다. 그래서 원래 누른 키를 되짚으면 원문을 복원할 수 있습니다.',
    },
    {
      q: '변환했는데 이상한 글자가 나옵니다.',
      a: '두벌식 표준 자판을 기준으로 변환합니다. 세벌식이나 다른 배열로 치셨다면 키 배치가 달라 결과가 맞지 않습니다. 또 원문에 자판과 무관한 기호가 섞여 있으면 그 부분은 그대로 남습니다.',
    },
    {
      q: '방향을 잘못 잡는 것 같습니다.',
      a: '입력에 한글과 영문 중 어느 쪽이 많은지로 방향을 짐작합니다. 짧은 글이나 섞인 글에서는 어긋날 수 있으니, 버튼으로 방향을 직접 지정하세요.',
    },
  ],
  'text/romanize': [
    {
      q: '이(李)씨는 Lee인가요 I인가요?',
      a: '국어의 로마자 표기법대로면 I지만, 여권에서는 거의 모두 Lee를 씁니다. 규정도 성의 표기는 관용을 인정하고 있어 둘 다 틀린 표기가 아닙니다. 가족과 표기를 맞추는 편이 나중에 서류에서 덜 번거롭습니다.',
    },
    {
      q: '이름에 붙임표(-)를 넣어도 되나요?',
      a: '됩니다. 규정이 이름의 음절 사이에 붙임표를 허용합니다. Gildong과 Gil-dong 모두 가능하며, 여권에는 붙임표 없이 붙여 쓰는 형태가 더 흔합니다.',
    },
    {
      q: '발음대로 적히지 않는 것 같습니다.',
      a: '인명은 음운 변화를 표기에 반영하지 않는다는 규정을 따릅니다. 빛나는 [빈나]로 읽히지만 Bitna로 적습니다. 지명은 반대로 발음 변화를 반영하므로(신라 Silla) 규칙이 다릅니다.',
    },
    {
      q: '성이 두 글자인데 잘못 나뉩니다.',
      a: '남궁·황보·선우처럼 흔한 두 글자 성은 자동으로 알아보지만, 황보라(황보+라 / 황+보라)처럼 사람도 헷갈리는 경우가 있습니다. 화면의 "성이 몇 글자인가요"에서 직접 골라주세요.',
    },
  ],
  'text/initial': [
    {
      q: '초성이 무엇인가요?',
      a: '한글 한 글자를 이루는 첫 자음입니다. "한"은 ㅎ+ㅏ+ㄴ으로 이루어지는데 이 중 맨 앞의 ㅎ이 초성입니다. 문장에서 초성만 남기면 글자 수는 그대로면서 내용은 가려집니다.',
    },
    {
      q: '띄어쓰기를 남기는 게 나은가요?',
      a: '문제를 쉽게 내려면 남기세요. 몇 글자짜리 단어가 몇 개인지가 드러나 난이도가 크게 내려갑니다. 어렵게 내려면 띄어쓰기를 지워 붙여 쓰세요.',
    },
    {
      q: '겹받침이나 된소리도 되나요?',
      a: '됩니다. 초성은 첫 자음만 보므로 "닭"은 ㄷ, "꽃"은 ㄲ이 됩니다. 자모 분해를 켜면 받침까지 낱자로 나눈 결과도 볼 수 있습니다.',
    },
  ],
  'text/amount': [
    {
      q: '왜 숫자와 한글을 함께 적나요?',
      a: '숫자는 고치기 쉽기 때문입니다. 3,500,000 앞에 1을 붙이면 35,000,000이 되지만 "삼백오십만"은 고치기 어렵습니다. 계약서·수표가 금액을 두 번 적는 이유입니다.',
    },
    {
      q: '"일금"과 "원정"은 꼭 써야 하나요?',
      a: '법으로 정해진 형식은 아니지만 관행으로 널리 쓰입니다. 금액의 시작과 끝을 못 박아 앞뒤로 숫자를 덧붙이지 못하게 하는 장치라, 계약서에서는 쓰는 편이 안전합니다.',
    },
    {
      q: '왜 "일십만"처럼 앞에 일을 붙이나요?',
      a: '빈자리를 남기지 않기 위해서입니다. "십만"은 앞에 글자를 더 넣을 여지가 있지만 "일십만"은 그렇지 않습니다. 읽기용 간략 표기에서는 이 일을 빼고 보여줍니다.',
    },
  ],
  'text/clean': [
    {
      q: '보이지 않는 문자가 왜 섞여 오나요?',
      a: 'PDF·워드·웹페이지는 줄바꿈이나 자간을 조절하려고 폭이 0인 공백, BOM 같은 문자를 넣습니다. 눈에는 안 보이지만 글자 수에 잡히고 검색·정렬을 어긋나게 합니다.',
    },
    {
      q: '"끊긴 줄 이어 붙이기"는 언제 켜나요?',
      a: 'PDF에서 복사해 문장 중간중간 줄이 끊겼을 때 켜세요. 문장이 끝난 줄과 빈 줄(문단 경계)은 그대로 두므로 문단 구분은 살아 있습니다. 시나 가사처럼 줄바꿈 자체가 의미인 글에는 끄세요.',
    },
    {
      q: '무엇이 지워졌는지 알 수 있나요?',
      a: '결과 위에 항목별로 몇 개를 손봤는지 표시합니다. 지워진 것이 보이지 않는 문자라면 그 숫자가 유일한 확인 방법입니다.',
    },
  ],
  'text/dedupe': [
    {
      q: '"공백 차이는 같은 줄로"가 무슨 뜻인가요?',
      a: '"김철수"와 "김철수 "(뒤에 공백)를 같은 줄로 보고 하나만 남깁니다. 엑셀이나 메모장에서 옮겨 붙인 명단에는 이런 차이가 흔해서, 이 옵션을 끄면 중복이 그대로 남습니다.',
    },
    {
      q: '가나다순 정렬이 자음 순서와 다릅니다.',
      a: '한국어 사전 순서를 따라 정렬합니다. 컴퓨터가 흔히 쓰는 코드 순서로 정렬하면 자모가 뒤섞이므로, 사람이 기대하는 가나다 순서로 맞췄습니다.',
    },
    {
      q: '어떤 줄이 지워졌는지 볼 수 있나요?',
      a: '원래 줄 수와 남은 줄 수, 지운 줄 수를 함께 보여줍니다. 어떤 줄이 지워졌는지 따로 표시하지는 않으니, 확인이 필요하면 원본을 따로 남겨 두세요.',
    },
  ],
  'text/case': [
    {
      q: 'camelCase와 snake_case는 언제 쓰나요?',
      a: 'camelCase는 자바스크립트·자바의 변수명, snake_case는 파이썬과 데이터베이스 컬럼명, kebab-case는 URL과 CSS 클래스, CONSTANT_CASE는 환경변수에 주로 씁니다.',
    },
    {
      q: '한글은 왜 안 바뀌나요?',
      a: '한글에는 대문자와 소문자 구분이 없습니다. 영문과 섞여 있으면 영문 부분만 바뀌고 한글은 그대로 남습니다.',
    },
  ],
  'text/replace': [
    {
      q: '줄바꿈을 찾아 바꿀 수 있나요?',
      a: '찾을 내용에 \\n을 입력하면 줄바꿈을, \\t를 입력하면 탭을 찾습니다. 여러 줄을 한 줄로 합치고 싶을 때 \\n을 공백으로 바꾸면 됩니다.',
    },
    {
      q: '정규식은 무엇인가요?',
      a: '"숫자 여러 개"나 "@로 끝나는 단어"처럼 패턴으로 찾는 방법입니다. 예를 들어 \\d+는 이어진 숫자를 모두 찾습니다. 모르면 꺼두셔도 일반 단어 치환에는 아무 문제가 없습니다.',
    },
    {
      q: '바꾸기 전에 몇 개가 바뀌는지 알 수 있나요?',
      a: '찾을 내용을 입력하면 몇 곳이 바뀌는지 바로 표시됩니다. 결과도 실시간으로 보이므로 확인한 뒤에 복사하면 됩니다.',
    },
  ],
  'text/manuscript': [
    {
      q: '자기소개서는 공백을 포함해서 세나요?',
      a: '대부분 공백을 포함해서 셉니다. 채용 공고에 기준이 없으면 공백 포함으로 맞추는 편이 안전하고, 입력창에 글자수 제한이 걸린 사이트도 대개 공백을 포함해 셉니다.',
    },
    {
      q: '원고지 매수는 어떻게 계산하나요?',
      a: '원고지는 칸을 세므로 띄어쓰기도 한 칸을 차지합니다. 그래서 공백을 포함한 글자수를 200(또는 400)으로 나눠 올림합니다.',
    },
    {
      q: '바이트 수는 왜 보여주나요?',
      a: '파일이나 입력값에 바이트 제한이 걸린 경우가 있어서입니다. 한글은 UTF-8에서 한 글자가 3바이트라, 글자 수는 적어도 바이트 제한에 먼저 걸릴 수 있습니다.',
    },
  ],
  'text/lorem': [
    {
      q: '한글 더미가 왜 따로 필요한가요?',
      a: '영문은 글자 폭이 좁고 띄어쓰기가 잦아 같은 자리에 훨씬 많이 들어갑니다. 영문 로렘입숨으로 맞춘 레이아웃에 실제 한글을 넣으면 줄 수가 늘어 무너지는 일이 흔합니다.',
    },
    {
      q: '같은 설정인데 결과가 매번 달라지나요?',
      a: '아닙니다. 같은 설정이면 같은 문장이 나옵니다. 다른 문장을 보고 싶을 때만 "다시 만들기"를 누르세요 — 마음에 들었던 결과로 되돌아갈 수 있게 한 것입니다.',
    },
    {
      q: '문장에 뜻이 있나요?',
      a: '자리를 채우는 용도라 내용에 의미는 없습니다. 다만 읽을 때 거슬리지 않도록 실제 문장의 리듬을 흉내 냈습니다. 실제 배포 전에는 반드시 진짜 내용으로 바꾸세요.',
    },
  ],
  'text/special-char': [
    {
      q: '복사한 기호가 네모(□)로 보입니다.',
      a: '붙여 넣은 곳의 글꼴이 그 기호를 갖고 있지 않을 때 그렇게 보입니다. 기호 자체는 정상이므로 다른 글꼴로 바꾸거나 더 흔한 기호로 대체하세요.',
    },
    {
      q: '원하는 기호를 어떻게 찾나요?',
      a: '검색창에 "화살표", "제곱미터", "하트"처럼 이름으로 찾으세요. 분류별로도 나열돼 있고, 한 번 쓴 기호는 맨 위 "최근에 쓴 것"에 남습니다.',
    },
    {
      q: '최근에 쓴 기호는 어디에 저장되나요?',
      a: '이 브라우저 안(localStorage)에만 남습니다. 서버로 전송되지 않으며, 브라우저 데이터를 지우면 함께 사라집니다.',
    },
  ],
  'text/emoticon': [
    {
      q: '이모지와 무엇이 다른가요?',
      a: '이모지(😀)는 그림 문자라 기기·앱마다 모양이 다르게 보이고 못 쓰는 곳도 있습니다. 여기 있는 것은 괄호와 문자로 조립한 것이라 어디서든 같은 모양으로 보입니다.',
    },
    {
      q: '닉네임에 써도 되나요?',
      a: '서비스마다 허용하는 문자가 달라 일부는 거부될 수 있습니다. 한글 자모로 된 것(ㅇㅅㅇ, ㅠㅠ)은 대체로 통과하고, 특수기호가 많이 섞인 카오모지는 막히는 곳이 있습니다.',
    },
  ],

  /* ── 두뇌 게임 ── */
  game: [
    {
      q: '기록이 저장되나요?',
      a: '최고 기록만 이 브라우저 안(localStorage)에 남습니다. 서버로 전송되지 않고 순위표도 없어서, 브라우저 데이터를 지우면 함께 사라집니다.',
    },
    {
      q: '휴대폰에서도 정확한가요?',
      a: '터치는 마우스보다 반응이 조금 느리게 잡히고, 화면 주사율도 기기마다 달라 같은 사람이라도 기록이 달라집니다. 친구와 겨룰 때는 같은 기기로 번갈아 하세요.',
    },
    {
      q: '결과가 나쁘면 문제가 있는 건가요?',
      a: '아닙니다. 전부 재미로 보는 값이며 의학적 검사가 아닙니다. 화면 주사율, 입력 장치, 인터넷 상태, 그날의 컨디션에 따라 크게 흔들립니다.',
    },
    {
      q: '한 판에 얼마나 걸리나요?',
      a: '5초에서 30초면 끝납니다. 반응속도는 다섯 번 재서 1분 안쪽, 클릭 속도와 암산은 고른 시간만큼만 걸립니다.',
    },
  ],
  'game/reaction': [
    {
      q: '평균 반응속도는 얼마인가요?',
      a: '빛을 보고 반응하는 데 보통 200~250ms가 걸립니다. 신호가 눈에서 뇌로 가고 판단한 뒤 손가락까지 명령이 내려가는 시간이라, 연습해도 100ms 아래로는 내려가기 어렵습니다.',
    },
    {
      q: '초록이 되기 전에 눌렀는데 무효가 됩니다.',
      a: '미리 누른 것은 반응이 아니라 예측이기 때문입니다. 대기 시간도 매번 무작위로 두어 박자를 세는 방식이 통하지 않게 했습니다.',
    },
    {
      q: '기록에 화면이나 마우스도 영향을 주나요?',
      a: '줍니다. 60Hz 화면은 초록으로 바뀌는 데만 최대 16ms가 걸리고, 무선 마우스와 블루투스 입력에도 지연이 더해집니다. 20~30ms 차이는 장비 탓일 수 있습니다.',
    },
  ],
  'game/cps': [
    {
      q: 'CPS가 무엇인가요?',
      a: 'Clicks Per Second, 초당 클릭 수입니다. 10초 동안 70번 눌렀다면 7 CPS입니다. 마인크래프트 같은 게임에서 연타 속도를 이야기할 때 쓰는 단위입니다.',
    },
    {
      q: '어떻게 하면 더 나오나요?',
      a: '한 손가락은 보통 6~8 CPS가 한계입니다. 두 손가락을 번갈아 쓰거나 손목을 떠는 방식으로 더 올릴 수 있지만, 손목과 마우스 스위치에 무리가 가니 오래 하지 마세요.',
    },
    {
      q: '왜 시작 버튼이 따로 없나요?',
      a: '첫 클릭에서 시간이 시작됩니다. 시작 버튼을 따로 두면 버튼에서 손을 옮기는 시간이 기록에 섞여 초반 속도가 낮게 잡힙니다.',
    },
  ],
  'game/aim': [
    {
      q: '빗나간 클릭도 세나요?',
      a: '셉니다. 그래야 조준 연습이 됩니다. 빗나간 클릭을 세지 않으면 아무 데나 빠르게 눌러도 과녁 위를 지나가며 점수가 올라 연타 게임이 되어 버립니다.',
    },
    {
      q: '정확도가 너무 낮습니다.',
      a: '마우스 감도(DPI)가 높으면 작은 과녁에서 손이 지나칩니다. 감도를 낮추고 손목 대신 팔로 크게 움직여 보세요. 과녁 크기를 "큼"으로 두고 감을 잡은 뒤 줄이는 편이 낫습니다.',
    },
    {
      q: '휴대폰에서는 불리한가요?',
      a: '작은 과녁은 손가락 끝보다 작아 불리합니다. 모바일에서는 "큼"으로 두고 하는 편이 공평합니다.',
    },
  ],
  'game/typing': [
    {
      q: '한글 타수는 어떻게 세나요?',
      a: '글자 수가 아니라 자판을 누른 횟수로 셉니다. "한"은 ㅎ·ㅏ·ㄴ 세 번을 눌러야 하므로 3타입니다. 그래서 같은 문장이라도 받침이 많으면 타수가 높게 나옵니다.',
    },
    {
      q: '평균 타수는 얼마인가요?',
      a: '성인 평균이 대략 200~300타이고, 300타를 넘으면 빠른 편입니다. 500타 이상은 상당히 숙련된 수준입니다.',
    },
    {
      q: '속도와 정확도 중 무엇이 먼저인가요?',
      a: '정확도입니다. 오타를 지우고 다시 치는 시간이 결국 더 크기 때문에, 정확도 95% 아래라면 속도를 조금 늦추는 편이 실제로는 더 빠릅니다.',
    },
  ],
  'game/memory': [
    {
      q: '몇 단계면 잘하는 건가요?',
      a: '사람이 한 번에 붙잡는 정보는 보통 다섯에서 아홉 덩어리입니다. 6단계를 넘기면 평균 이상, 9단계 이상이면 상당히 좋은 편입니다.',
    },
    {
      q: '더 오래 기억하는 요령이 있나요?',
      a: '순서를 "초록-빨강-파랑"처럼 말로 읊으면 덩어리 수가 줄어 더 길게 갑니다. 눈으로만 좇으면 대여섯 개에서 막힙니다.',
    },
  ],
  'game/number-memory': [
    {
      q: '몇 자리가 보통인가요?',
      a: '일곱 자리 안팎입니다. 전화번호가 그 정도 길이인 것도 우연이 아닙니다. 열 자리를 넘긴다면 아주 좋은 편입니다.',
    },
    {
      q: '보여주는 시간이 왜 자꾸 늘어나나요?',
      a: '자릿수에 비례해 늘립니다. 시간을 고정하면 뒤로 갈수록 다 읽기도 전에 사라져서, 기억력이 아니라 읽는 속도를 재게 됩니다.',
    },
    {
      q: '외우는 요령이 있나요?',
      a: '두세 개씩 묶어 "삼사-이오"처럼 읽으면 덩어리 수가 줄어 훨씬 길게 외울 수 있습니다.',
    },
  ],
  'game/sequence': [
    {
      q: '순서도 맞춰야 하나요?',
      a: '아닙니다. 켜졌던 칸의 위치만 맞으면 됩니다. 순서까지 요구하면 순서 기억 게임과 같아지고, 위치만 보는 쪽이 공간 기억을 더 정확히 잽니다.',
    },
    {
      q: '격자가 갑자기 커집니다.',
      a: '단계가 오르면 켜지는 칸이 늘어나는데, 3×3에서는 곧 자리가 모자랍니다. 그래서 4×4, 5×5로 넓어집니다.',
    },
  ],
  'game/color-blind': [
    {
      q: '색약 검사인가요?',
      a: '아닙니다. 이 게임은 명도 차이를 구별하는 능력을 봅니다. 색약·색맹은 이시하라 검사처럼 특정 색 조합을 쓰는 검사로만 알 수 있고, 정확한 판정은 안과에서 받아야 합니다.',
    },
    {
      q: '화면에 따라 결과가 달라지나요?',
      a: '크게 달라집니다. 밝기를 낮췄거나 야간 모드가 켜져 있으면 미세한 차이가 뭉개집니다. 밝기를 올리고 화면 색 필터를 끈 뒤에 해보세요.',
    },
    {
      q: '어느 단계까지 가면 잘하는 건가요?',
      a: '9단계를 넘기면 평균 이상, 14단계 이상이면 아주 예민한 편입니다. 다만 화면 품질이 결과를 크게 좌우합니다.',
    },
  ],
  'game/hearing': [
    {
      q: '나이에 따라 정말 달라지나요?',
      a: '대체로 그렇습니다. 높은 소리를 감지하는 세포부터 손상되기 때문에 가청 상한이 서서히 내려갑니다. 다만 개인차가 커서 나이만으로 단정할 수는 없습니다.',
    },
    {
      q: '스피커로 해도 되나요?',
      a: '이어폰을 권합니다. 노트북 내장 스피커는 15kHz 위를 거의 못 내서, 귀가 아니라 스피커의 한계가 결과로 나옵니다.',
    },
    {
      q: '한쪽 귀만 안 들립니다.',
      a: '이 테스트로 판단하지 말고 이비인후과에서 청력 검사를 받으세요. 한쪽만 다르게 들리는 것은 확인이 필요한 신호입니다.',
    },
  ],
  'game/math': [
    {
      q: '나눗셈 답이 항상 딱 떨어집니다.',
      a: '일부러 그렇게 냅니다. 나머지나 소수점을 허용하면 암산 능력이 아니라 입력 형식과 반올림 규칙을 맞히는 게임이 됩니다.',
    },
    {
      q: '몇 문제면 잘하는 건가요?',
      a: '30초에 15문제를 넘기면 평균 이상, 25문제 이상이면 아주 빠른 편입니다. 연산 종류와 난이도에 따라 크게 달라집니다.',
    },
    {
      q: '답을 입력했는데 넘어가지 않습니다.',
      a: '정답을 다 입력하면 자동으로 다음 문제로 넘어갑니다. 답이 틀리면 넘어가지 않으니, 막히면 "모르겠어요"로 건너뛰세요 — 넘긴 문제는 끝나고 정답과 함께 보여줍니다.',
    },
  ],

  /* ── 색상 도구 ── */
  color: [
    {
      q: '왜 화면마다 색이 다르게 보이나요?',
      a: '모니터마다 표현할 수 있는 색 범위와 보정 상태가 다르기 때문입니다. 같은 HEX 값이라도 기기에 따라 다르게 보이므로, 인쇄물이나 정확한 색이 중요한 작업은 보정된 화면에서 확인해야 합니다.',
    },
    {
      q: '어떤 색부터 정하는 게 좋나요?',
      a: '주인공 색 하나를 먼저 정하고 나머지를 규칙으로 파생시키는 편이 실패가 적습니다. 명도 단계 생성으로 그 색의 밝기 단계를 만들고, 팔레트 생성기로 보조색을 뽑으면 한 세트가 나옵니다.',
    },
    {
      q: '접근성 기준은 꼭 지켜야 하나요?',
      a: '법으로 강제되는 곳도 있고(공공기관 웹), 그렇지 않더라도 대비가 낮으면 밝은 야외에서 아무도 못 읽습니다. 본문은 4.5:1을 넘기는 것을 기본으로 삼으세요.',
    },
    {
      q: '입력한 색이 저장되나요?',
      a: '아닙니다. 모든 계산이 브라우저 안에서 끝나고 서버로 전송되는 값이 없습니다.',
    },
  ],
  'color/palette': [
    {
      q: '보색과 유사색은 언제 쓰나요?',
      a: '보색은 대비가 강해 버튼이나 강조 표시처럼 눈에 띄어야 하는 곳에, 유사색은 편안해서 배경이나 넓은 면적에 어울립니다. 보색을 넓은 면적에 반반 쓰면 눈이 쉽게 피로해집니다.',
    },
    {
      q: '색을 고른 다음에는 무엇을 하나요?',
      a: '비율을 정하세요. 넓은 배경 60%, 보조 30%, 강조 10% 정도로 쓰면 같은 조합도 훨씬 정돈돼 보입니다. 강조색이 30%를 넘으면 더 이상 강조가 아닙니다.',
    },
    {
      q: '만든 팔레트를 코드로 가져갈 수 있나요?',
      a: '네. CSS 변수 형태로 한 번에 복사할 수 있고, 색마다 눌러서 HEX만 따로 복사할 수도 있습니다.',
    },
  ],
  'color/shades': [
    {
      q: '50~900 숫자는 무엇인가요?',
      a: '디자인 시스템에서 쓰는 밝기 단계 이름입니다. 숫자가 작을수록 밝고 클수록 어둡습니다. Tailwind를 비롯한 여러 도구가 이 방식을 쓰기 때문에 그대로 가져다 쓸 수 있습니다.',
    },
    {
      q: '어느 단계를 버튼 색으로 써야 하나요?',
      a: '보통 500~600을 본체로 쓰고, 눌렀을 때는 700을, 배경 강조에는 50~100을 씁니다. 각 줄의 안내에서 흰 글씨가 읽히는지 확인하고 고르세요.',
    },
    {
      q: '왜 채도는 그대로 두나요?',
      a: '밝기만 바꿔야 같은 색 계열로 보입니다. 채도까지 함께 흔들면 단계마다 다른 색처럼 보여 계열이 흐트러집니다.',
    },
  ],
  'color/mixer': [
    {
      q: '색을 섞었더니 탁해집니다.',
      a: '보색에 가까운 두 색을 반씩 섞으면 회색에 가까워집니다. 한쪽을 70% 이상으로 기울이면 색이 살아나고, 아예 다른 조합을 찾는 편이 나을 때도 많습니다.',
    },
    {
      q: '물감 섞는 것과 결과가 다릅니다.',
      a: '화면의 색은 빛을 더하는 방식(RGB)이고 물감은 빛을 빼는 방식이라 결과가 다릅니다. 파랑과 노랑을 화면에서 섞으면 초록이 아니라 회색에 가까워집니다.',
    },
  ],
  'color/random': [
    {
      q: '왜 완전 무작위가 아닌가요?',
      a: 'RGB를 완전 무작위로 뽑으면 대부분 탁하고 쓸 수 없는 색이 나옵니다. 채도와 밝기를 쓸 만한 범위로 좁혀 뽑기 때문에 그냥 돌려도 쓸 수 있는 조합이 자주 나옵니다.',
    },
    {
      q: '마음에 드는 색만 남길 수 있나요?',
      a: '색 아래 자물쇠를 누르면 그 색은 고정되고 나머지만 다시 뽑힙니다. 스페이스바로 계속 돌려보면서 원하는 조합을 찾으세요.',
    },
  ],
  'color/contrast': [
    {
      q: '대비비 4.5:1은 무슨 뜻인가요?',
      a: '두 색의 밝기 차이를 나타내는 값으로, 1:1이면 같은 밝기이고 흰색과 검은색이 21:1로 최대입니다. 웹 접근성 기준(WCAG AA)은 본문 글자에 4.5:1 이상을 요구합니다.',
    },
    {
      q: '큰 글씨는 기준이 다른가요?',
      a: '네. 18pt 이상(굵은 글씨는 14pt 이상)은 3:1만 넘으면 됩니다. 글자가 크면 획이 굵어 낮은 대비에서도 읽히기 때문입니다.',
    },
    {
      q: '브랜드 색을 못 바꾸는데 기준에 걸립니다.',
      a: '색상은 그대로 두고 밝기만 조절하는 버튼을 쓰세요. 같은 계열을 유지하면서 기준을 넘기는 가장 가까운 밝기를 찾아 줍니다. 그래도 안 되면 글자를 키우거나 배경을 바꾸는 편이 낫습니다.',
    },
  ],
  'color/colorblind': [
    {
      q: '색각 이상은 얼마나 흔한가요?',
      a: '남성은 스무 명 중 한 명꼴, 여성은 훨씬 드뭅니다. 가장 흔한 유형은 빨강과 초록을 구분하기 어려운 경우라, 성공·실패를 초록과 빨강으로만 구분하는 화면은 상당수에게 같은 색으로 보입니다.',
    },
    {
      q: '시뮬레이션 결과가 실제와 같나요?',
      a: '근사 변환입니다. 색각 이상은 정도가 사람마다 달라 정확히 그 사람이 보는 색은 아닙니다. "이 두 색이 구분되는가"를 가늠하는 용도로 쓰세요.',
    },
    {
      q: '그럼 어떻게 만들어야 하나요?',
      a: '색에만 뜻을 싣지 마세요. 아이콘, 글자, 모양을 함께 쓰면 색을 구분하지 못해도 뜻이 전달됩니다. 밝기 차이를 충분히 두는 것도 도움이 됩니다.',
    },
  ],
  'color/gradient': [
    {
      q: '그라디언트 위에 글자를 얹어도 되나요?',
      a: '가장 밝은 지점과 가장 어두운 지점 양쪽에서 대비를 확인해야 합니다. 한쪽에만 맞추면 반대쪽에서 글자가 사라집니다. 불안하면 글자 뒤에 반투명 판을 깔아 주세요.',
    },
    {
      q: '중간에 띠처럼 경계가 보입니다.',
      a: '색 밴딩이라고 하며, 비슷한 색 사이를 넓은 면적에 펼칠 때 화면이 표현할 수 있는 단계가 모자라 생깁니다. 색 차이를 조금 키우거나 미세한 노이즈를 얹으면 덜 보입니다.',
    },
  ],
  'color/shadow': [
    {
      q: '그림자가 탁해 보입니다.',
      a: '순수한 검정을 쓰면 그렇습니다. 배경보다 조금 어두운 남색 계열을 낮은 투명도로 쓰면 훨씬 자연스럽습니다.',
    },
    {
      q: '프리셋은 왜 그림자가 여러 겹인가요?',
      a: '실제 그림자는 물체와 가까운 쪽이 진하고 멀수록 옅게 퍼집니다. 한 겹으로는 그 느낌이 안 나서, 짧고 진한 그림자와 길고 옅은 그림자를 겹칩니다.',
    },
  ],
  'color/name': [
    {
      q: '이름이 정확한 색 이름인가요?',
      a: 'CSS에 정의된 이름 중 가장 가까운 것을 찾아 줍니다. 차이 값이 크면 계열만 비슷한 것이니 "이 색은 산호색이다"라고 단정하지는 마세요.',
    },
    {
      q: 'CMYK 값을 인쇄에 그대로 써도 되나요?',
      a: '단순 변환이라 참고용입니다. 실제 인쇄 색은 잉크·용지·인쇄기에 따라 달라지므로, 정확한 색이 필요하면 별색 지정이나 인쇄소 교정을 거쳐야 합니다.',
    },
  ],
  'color/temperature': [
    {
      q: '켈빈 값이 높을수록 따뜻한 색 아닌가요?',
      a: '반대입니다. 낮을수록 붉고 따뜻하며 높을수록 푸르고 차갑습니다. 쇠를 달굴 때 처음엔 붉게, 더 뜨거워지면 희고 푸르게 빛나는 것을 기준으로 삼았기 때문입니다.',
    },
    {
      q: '집 조명은 몇 K가 좋나요?',
      a: '거실과 침실은 2700~3000K가 아늑하고, 주방이나 책상은 4000~5000K가 눈이 덜 피로합니다. 잠들기 전에는 낮은 색온도가 수면에 덜 방해가 됩니다.',
    },
    {
      q: '사진 화이트밸런스와 같은 개념인가요?',
      a: '이어져 있습니다. 카메라는 촬영 광원의 색온도를 기준으로 색을 보정하는데, 이 값을 잘못 잡으면 사진 전체가 노랗거나 파랗게 나옵니다.',
    },
  ],

  /* ── 시간 도구 ── */
  time: [
    {
      q: '탭을 닫아도 타이머가 울리나요?',
      a: '아닙니다. 브라우저 안에서만 도는 타이머라 탭을 닫으면 멈춥니다. 다른 탭을 보고 있는 동안에는 계속 동작하고 탭 제목에도 남은 시간이 표시되지만, 기기가 잠들면 소리가 나지 않을 수 있습니다.',
    },
    {
      q: '백그라운드에서 시간이 밀리지 않나요?',
      a: '밀리지 않습니다. 1초씩 세는 대신 끝나는 시각을 정해 두고 매번 현재 시각과의 차이를 다시 계산하기 때문에, 브라우저가 잠시 멈췄다 돌아와도 남은 시간이 정확합니다.',
    },
    {
      q: '서머타임이 반영되나요?',
      a: '됩니다. 시차를 숫자로 저장하지 않고 브라우저가 가진 시간대 규칙을 그대로 쓰기 때문에, 미국·유럽의 서머타임 전환이 자동으로 반영됩니다.',
    },
    {
      q: '입력한 날짜가 저장되나요?',
      a: '아닙니다. 모든 계산이 브라우저 안에서 끝나고 서버로 전송되는 값이 없습니다.',
    },
  ],
  'time/timer': [
    {
      q: '알림음이 안 들립니다.',
      a: '기기 음량과 브라우저 탭 음소거를 확인하세요. 또 브라우저는 사용자가 한 번이라도 화면을 눌러야 소리를 허용하므로, 시작 버튼을 누르지 않고 자동으로 시작된 경우에는 소리가 막힐 수 있습니다.',
    },
    {
      q: '다른 탭을 봐도 되나요?',
      a: '됩니다. 탭 제목에 남은 시간이 표시돼 창을 바꿔도 확인할 수 있고, 시간이 끝나면 제목이 바뀌면서 소리가 납니다. 다만 탭을 완전히 닫으면 동작하지 않습니다.',
    },
    {
      q: '1시간 넘는 타이머도 되나요?',
      a: '분 단위로 최대 180분까지 넣을 수 있습니다. 그보다 긴 시간은 알람으로 특정 시각을 지정하는 편이 정확합니다.',
    },
  ],
  'time/stopwatch': [
    {
      q: '랩은 무엇인가요?',
      a: '측정 중에 구간을 끊어 기록하는 기능입니다. 각 구간이 얼마나 걸렸는지와 누적 시간을 함께 보여주므로, 반복 작업이나 운동 세트에서 어느 구간이 느려졌는지 알 수 있습니다.',
    },
    {
      q: '0.01초 단위가 정확한가요?',
      a: '브라우저가 화면을 그리는 주기 안에서 표시되므로 표시 자체는 수십 밀리초 단위로 갱신됩니다. 사람이 버튼을 누르는 반응 시간(200ms 안팎)이 훨씬 크기 때문에, 경기 기록용으로는 쓰지 마세요.',
    },
  ],
  'time/pomodoro': [
    {
      q: '왜 하필 25분인가요?',
      a: '한 번에 집중이 유지되는 시간이 대체로 그 정도이고, 짧아서 시작하는 부담이 적기 때문입니다. 중요한 건 길이보다 그 시간 동안 한 가지만 하는 것입니다.',
    },
    {
      q: '네 번마다 길게 쉬는 이유가 있나요?',
      a: '짧은 휴식만 반복하면 피로가 쌓입니다. 네 번(약 두 시간)마다 15분 정도 길게 쉬면 다음 집중이 확실히 잘 됩니다.',
    },
    {
      q: '집중 시간에 방해받으면 어떻게 하나요?',
      a: '원래 방법에서는 그 뽀모도로를 버립니다. 다만 실제로는 건너뛰기로 단계를 넘기고 다시 시작하는 편이 현실적입니다.',
    },
  ],
  'time/alarm': [
    {
      q: '타이머와 무엇이 다른가요?',
      a: '타이머는 "몇 분 뒤"를, 알람은 "몇 시 몇 분"을 기준으로 합니다. 회의 시작이나 약 먹을 시각처럼 정해진 시각에는 알람이 맞습니다.',
    },
    {
      q: '이미 지난 시각을 넣으면 어떻게 되나요?',
      a: '내일 그 시각으로 잡힙니다. 아침 알람을 밤에 맞추는 경우가 대부분이라 그렇게 동작합니다.',
    },
    {
      q: '아침 기상 알람으로 써도 되나요?',
      a: '권하지 않습니다. 이 탭이 열려 있어야 하고 기기가 잠들면 소리가 나지 않을 수 있습니다. 꼭 일어나야 한다면 휴대폰 알람을 함께 쓰세요.',
    },
  ],
  'time/worldclock': [
    {
      q: '카드 색은 무슨 뜻인가요?',
      a: '그곳의 시간대를 뜻합니다. 초록은 업무 시간(9~18시), 검정은 한밤중, 노랑은 이른 아침, 남색은 저녁입니다. 연락하기 전에 색만 봐도 지금 보내도 되는지 알 수 있습니다.',
    },
    {
      q: '도시를 추가할 수 있나요?',
      a: '아래 목록에서 원하는 도시를 눌러 넣고 뺄 수 있습니다. 목록에 없는 도시는 같은 시간대의 가까운 도시를 쓰면 시각이 같습니다.',
    },
  ],
  'time/timezone': [
    {
      q: '회의 시간을 어떻게 잡나요?',
      a: '하루 비교표에서 초록으로 표시된 줄이 양쪽 모두 업무 시간인 구간입니다. 그중 하나를 누르면 위쪽 변환 결과가 그 시각으로 바뀝니다.',
    },
    {
      q: '왜 "다음 날"이라고 표시되나요?',
      a: '시차가 크면 같은 시각이 상대 도시에서는 날짜가 다릅니다. 한국 오전 9시는 뉴욕 전날 저녁이므로, 날짜를 함께 확인하지 않으면 하루 어긋난 약속을 잡게 됩니다.',
    },
    {
      q: '한 달 뒤 회의도 이대로 맞나요?',
      a: '서머타임이 그 사이에 바뀌면 한 시간 달라집니다. 미국·유럽은 3월과 11월에 전환하므로, 그 시기를 넘는 일정은 가까워졌을 때 다시 확인하세요.',
    },
  ],
  'time/workdays': [
    {
      q: '공휴일이 왜 자동으로 안 빠지나요?',
      a: '한국 공휴일은 음력(설·추석)과 대체공휴일 때문에 해마다 날짜가 달라 코드로 정할 수 없습니다. 그래서 필요한 날짜를 직접 넣어 빼도록 했습니다.',
    },
    {
      q: '시작일과 종료일도 포함해서 세나요?',
      a: '네, 양 끝을 모두 포함합니다. 월요일부터 금요일까지면 5일입니다. 기한을 셀 때 기준이 다를 수 있으니 상대와 맞춰 보세요.',
    },
    {
      q: '"근무일 10일 뒤"는 어떻게 계산하나요?',
      a: '시작일 다음 날부터 주말과 입력한 공휴일을 건너뛰며 열 번을 셉니다. 서류 처리 기한이나 영업일 기준 배송일을 계산할 때 씁니다.',
    },
  ],
  'time/date-add': [
    {
      q: '1월 31일에 1개월을 더하면 언제가 되나요?',
      a: '2월 28일(윤년이면 29일)입니다. 2월 31일이 없으므로 그 달의 마지막 날로 맞춥니다. 그냥 두면 3월 3일이 되어 "한 달 뒤"라는 말과 어긋납니다.',
    },
    {
      q: '과거 날짜도 계산되나요?',
      a: '됩니다. 값에 음수를 넣으면 그만큼 이전 날짜가 나옵니다. -30을 넣으면 30일 전입니다.',
    },
  ],
  'time/weeknumber': [
    {
      q: '주차 계산 기준이 무엇인가요?',
      a: 'ISO 8601을 따릅니다. 주는 월요일에 시작하고, 그 주의 목요일이 속한 해를 기준으로 몇 년 몇 주차인지 정합니다. 회사에서 쓰는 주차도 대개 이 기준입니다.',
    },
    {
      q: '1월 1일인데 52주차라고 나옵니다.',
      a: '오류가 아닙니다. 1월 1일이 금·토·일이면 그 주의 목요일이 아직 전년도이므로 전년도 마지막 주차가 됩니다. ISO 규칙이 그렇게 정하고 있습니다.',
    },
  ],
  'time/lived': [
    {
      q: '나이 계산과 무엇이 다른가요?',
      a: '나이는 연 단위로 끊지만 여기서는 몇 년 몇 개월 며칠인지와, 그것이 몇 시간·몇 분·몇 초인지까지 풀어 보여줍니다. 만 나이 자체가 필요하면 계산기 섹션의 나이 계산기를 쓰세요.',
    },
    {
      q: '1000일 기념일은 어떻게 세나요?',
      a: '태어난 날을 1일이 아니라 0일로 두고 셉니다. 다가오는 1000일 단위 날짜와 남은 일수를 함께 보여줍니다.',
    },
    {
      q: '심장이 뛴 횟수는 정확한가요?',
      a: '안정 시 심박수 70회/분으로 잡은 어림값입니다. 실제 심박수는 나이·운동·컨디션에 따라 크게 달라지므로 재미로만 보세요.',
    },
  ],

  /* ── 소리 도구 ── */
  sound: [
    {
      q: '소리 파일을 받아 오나요?',
      a: '아닙니다. 모든 소리를 브라우저가 계산으로 만듭니다. 그래서 한 번 페이지를 열면 인터넷이 끊겨도 동작하고, 메트로놈이나 기준음처럼 정확한 값이 필요한 소리에 오차가 없습니다.',
    },
    {
      q: '소리가 안 나요.',
      a: '브라우저는 사용자가 화면을 한 번 눌러야 소리를 허용합니다. 재생 버튼을 직접 눌러 보시고, 기기 음량과 탭 음소거(주소창 옆 스피커 표시)도 확인하세요.',
    },
    {
      q: '마이크로 들어간 소리가 저장되나요?',
      a: '아닙니다. 튜너·소음 측정·녹음 모두 브라우저 안에서만 처리되며 서버로 전송되지 않습니다. 녹음은 저장 버튼을 눌렀을 때만 내 기기에 파일로 남습니다.',
    },
    {
      q: '볼륨은 어느 정도가 안전한가요?',
      a: '순수한 전자음은 음악보다 귀에 부담이 큽니다. 특히 고주파를 크게 오래 들으면 청력이 손상될 수 있으니, 겨우 들리는 정도로만 올리고 길게 듣지 마세요.',
    },
  ],
  'sound/metronome': [
    {
      q: '박자가 흔들리지 않나요?',
      a: '흔들리지 않습니다. 그때그때 소리를 내는 대신 오디오 시계에 앞으로의 박자를 미리 예약해 둡니다. 화면이 잠깐 버벅여도 소리 간격은 그대로입니다.',
    },
    {
      q: 'BPM을 모를 때는 어떻게 하나요?',
      a: '음악에 맞춰 "두드려서 BPM 맞추기"를 여러 번 누르면 그 간격으로 BPM이 잡힙니다. 여덟 번쯤 두드리면 값이 안정됩니다.',
    },
    {
      q: '첫 박만 소리가 다릅니다.',
      a: '일부러 그렇게 만들었습니다. 첫 박에 높은 소리로 강세를 주어야 눈을 감고도 몇 박째인지 알 수 있습니다. 박자표를 바꾸면 강세 간격도 함께 바뀝니다.',
    },
  ],
  'sound/tuner': [
    {
      q: '센트가 무엇인가요?',
      a: '반음을 100으로 나눈 단위입니다. ±5센트 안이면 사람 귀에는 맞은 소리로 들립니다. 값이 양수면 기준보다 높은 것이니 줄을 풀고, 음수면 조여야 합니다.',
    },
    {
      q: '음이 자꾸 튑니다.',
      a: '줄을 튕긴 직후에는 음이 흔들리고 배음이 섞여 값이 오르내립니다. 소리가 잦아든 뒤의 값을 보세요. 주변이 시끄러워도 흔들리므로 조용한 곳에서 하는 편이 좋습니다.',
    },
    {
      q: '기준 A4를 바꿀 수 있나요?',
      a: '430~450Hz 사이에서 조정할 수 있습니다. 기본값 440Hz가 국제 표준이지만 오케스트라나 합주 상대에 따라 442Hz 등을 쓰기도 합니다.',
    },
  ],
  'sound/pitch': [
    {
      q: '절대음감이 없어도 되나요?',
      a: '됩니다. 기준음이 매번 바뀌기 때문에 "그 음이 무엇인지"가 아니라 "둘 사이가 얼마나 벌어졌는지"만으로 답합니다. 이쪽은 연습으로 늘릴 수 있는 능력입니다.',
    },
    {
      q: '외우는 요령이 있나요?',
      a: '아는 노래의 첫 두 음으로 외우면 빠릅니다. 완전5도는 반짝반짝 작은별의 처음 두 음, 옥타브는 Somewhere over the rainbow의 처음 두 음입니다.',
    },
  ],
  'sound/bpm-tap': [
    {
      q: '몇 번 두드려야 정확한가요?',
      a: '여덟 번쯤이면 안정됩니다. 최근 여덟 번만 반영하므로 처음 몇 번의 흔들림은 곧 밀려나고, 곡 도중에 템포가 바뀌어도 따라갑니다.',
    },
    {
      q: '흔들림 값은 무슨 뜻인가요?',
      a: '두드린 간격이 얼마나 들쭉날쭉한지입니다. ±60ms를 넘으면 박자를 놓치고 있다는 뜻이니, 한 박씩 크게 세면서 다시 해보세요.',
    },
  ],
  'sound/noise': [
    {
      q: '화이트·핑크·브라운은 뭐가 다른가요?',
      a: '낮은 소리와 높은 소리의 비율이 다릅니다. 화이트는 모든 대역이 고르게 섞여 가장 날카롭고, 핑크는 자연에 가깝고, 브라운은 저역이 강해 파도 소리처럼 들리며 귀에 가장 덜 피곤합니다.',
    },
    {
      q: '소음이 없어지나요?',
      a: '없애는 게 아니라 덮는 것입니다. 잡음이 다른 소리를 묻어 덜 거슬리게 만드는 방식이라, 대화가 겨우 안 들릴 정도면 충분하고 크게 틀 필요가 없습니다.',
    },
    {
      q: '잘 때 켜두고 자도 되나요?',
      a: '자동 정지를 함께 쓰세요. 밤새 크게 틀어 두면 귀에 부담이 되고, 오히려 깊은 잠을 방해할 수 있습니다.',
    },
  ],
  'sound/binaural': [
    {
      q: '왜 이어폰이 필요한가요?',
      a: '좌우 귀에 서로 다른 주파수가 따로 들어가야 맥놀이가 생깁니다. 스피커로 들으면 두 소리가 공기 중에서 먼저 섞여 버려 그냥 두 음이 겹쳐 들릴 뿐입니다.',
    },
    {
      q: '정말 집중이나 수면에 효과가 있나요?',
      a: '연구 결과가 엇갈립니다. 효과가 있더라도 크지 않다는 쪽이 많고, 도움이 됐다면 조용한 소리를 오래 듣는 것 자체의 효과일 수 있습니다. 치료 목적으로는 쓰지 마세요.',
    },
  ],
  'sound/decibel': [
    {
      q: '실제 소음도(dB)와 다릅니다.',
      a: '브라우저는 마이크의 감도를 알 수 없어 절대 소음도를 잴 수 없습니다. 여기 값은 디지털 최대치를 0으로 둔 상대값이라, 같은 기기에서 소리 크기를 비교하는 용도로만 쓰세요.',
    },
    {
      q: '층간소음 증거로 쓸 수 있나요?',
      a: '쓸 수 없습니다. 공식 측정은 보정된 소음계로 정해진 방법에 따라 해야 합니다. 이 도구는 "지금 어느 정도인가"를 가늠하는 용도입니다.',
    },
  ],
  'sound/recorder': [
    {
      q: '녹음 파일은 어떤 형식인가요?',
      a: '브라우저가 지원하는 형식으로 저장되며 대개 WebM입니다. 다른 형식이 필요하면 저장한 뒤 변환 프로그램을 쓰세요.',
    },
    {
      q: '녹음이 서버에 올라가나요?',
      a: '아닙니다. 브라우저 안에서만 만들어지고 저장 버튼을 눌러야 기기에 내려받습니다. 탭을 닫으면 녹음도 사라지니 필요하면 먼저 저장하세요.',
    },
  ],
  'sound/tone': [
    {
      q: '파형에 따라 뭐가 달라지나요?',
      a: '사인파는 배음이 없어 가장 부드럽고, 사각파와 톱니파는 배음이 많아 거칠고 전자음처럼 들립니다. 스피커 점검이나 기준음에는 사인파를 쓰세요.',
    },
    {
      q: '볼륨이 60%까지만 올라갑니다.',
      a: '일부러 제한했습니다. 순수한 사인파는 같은 음량이라도 음악보다 귀에 부담이 훨씬 크고, 고주파를 크게 들으면 청력이 상할 수 있습니다.',
    },
  ],
  'sound/mosquito': [
    {
      q: '왜 모기 소리라고 부르나요?',
      a: '17kHz 안팎의 고주파가 모기 날갯짓 소리와 비슷하고, 나이가 들면 잘 안 들려 청소년에게만 들린다고 해서 붙은 이름입니다.',
    },
    {
      q: '안 들리면 청력에 문제가 있는 건가요?',
      a: '아닙니다. 높은 소리를 감지하는 세포부터 손상되기 때문에 가청 상한이 내려가는 것은 자연스러운 노화입니다. 스피커가 그 대역을 못 내는 경우도 많습니다.',
    },
  ],

  /* ── 계량·요리 ── */
  food: [
    {
      q: '1컵이 몇 ml 기준인가요?',
      a: '한국 기준으로 1컵 200ml, 1큰술 15ml, 1작은술 5ml입니다. 미국 레시피의 1컵은 240ml라 20% 차이가 나므로, 외국 레시피를 볼 때는 출처를 확인하세요.',
    },
    {
      q: '왜 재료마다 그램이 다른가요?',
      a: '부피가 같아도 밀도가 다르기 때문입니다. 1컵이 밀가루는 120g, 설탕은 200g, 꿀은 284g입니다. 특히 베이킹은 이 차이가 결과를 좌우합니다.',
    },
    {
      q: '여기 값이 정확한가요?',
      a: '일반적으로 쓰이는 기준값입니다. 밀가루는 담는 방법(체에 치는지, 눌러 담는지)에 따라 20%까지 달라지고, 고기 굽는 시간은 팬과 화력에 따라 크게 다릅니다. 저울과 온도계를 쓰는 편이 가장 확실합니다.',
    },
    {
      q: '식품 보관 기간은 믿어도 되나요?',
      a: '맛과 질감이 유지되는 기준입니다. 냉장고 온도와 여닫는 횟수에 따라 더 빨리 상할 수 있으니, 기간 안이라도 냄새와 색을 먼저 확인하세요.',
    },
  ],
  'food/measure': [
    {
      q: '밀가루는 어떻게 담아야 하나요?',
      a: '체에 친 뒤 숟가락으로 떠 담고 칼등으로 깎아 재는 것이 기준입니다. 컵으로 밀가루를 퍼 담으면 눌려서 20%까지 더 들어갑니다.',
    },
    {
      q: '큰술은 계량스푼 기준인가요?',
      a: '네, 15ml 계량스푼 기준입니다. 밥숟가락은 보통 10~12ml라 계량스푼보다 작으니, 밥숟가락으로 잰다면 조금 더 넣어야 합니다.',
    },
    {
      q: '목록에 없는 재료는 어떻게 하나요?',
      a: '비슷한 밀도의 재료를 고르세요. 가루류는 밀가루, 액체는 물, 걸쭉한 장류는 고추장 쪽이 가깝습니다.',
    },
  ],
  'food/recipe-scale': [
    {
      q: '온도와 시간은 왜 안 바뀌나요?',
      a: '"180도로 20분"의 숫자까지 곱하면 오븐이 360도가 됩니다. 도·분·초·인분이 붙은 숫자는 그대로 둡니다. 다만 양이 늘면 익는 데 시간이 더 걸리므로 중간에 확인하세요.',
    },
    {
      q: '양념도 그대로 곱해도 되나요?',
      a: '소금·향신료는 배율대로 넣으면 짜거나 강해지는 일이 많습니다. 8할 정도만 넣고 맛을 본 뒤 더하는 편이 안전합니다.',
    },
    {
      q: '분수(1/2, ½)도 인식하나요?',
      a: '네. 1/2과 ½ 모두 숫자로 바꿔 계산합니다. 결과는 소수로 나오므로 0.5큰술처럼 표시됩니다.',
    },
  ],
  'food/salt': [
    {
      q: '염도 6%는 물 대비인가요, 총량 대비인가요?',
      a: '기본 결과는 물 무게 대비입니다(물 1L에 소금 60g). 총량(물+소금) 대비로 정확히 맞추려면 아래에 함께 표시되는 값을 쓰세요. 요리에서는 물 대비로 재는 관행이 더 흔합니다.',
    },
    {
      q: '굵은 소금과 고운 소금이 같나요?',
      a: '무게로 재면 같지만 부피로 재면 다릅니다. 굵은 소금은 알갱이 사이 공간이 많아 같은 컵에 담아도 가볍습니다. 저울로 무게를 재는 편이 확실합니다.',
    },
    {
      q: '배추 절일 때 몇 %가 좋나요?',
      a: '김장은 보통 6% 안팎입니다. 절이는 시간과 배추 상태에 따라 달라지므로, 줄기가 휘어질 정도로 절여졌는지 눈으로 확인하는 것이 기준입니다.',
    },
  ],
  'food/oven': [
    {
      q: '350°F는 몇 도인가요?',
      a: '약 177도로, 보통 180도로 맞춥니다. 외국 레시피의 온도는 대개 25°F 단위라 섭씨로 바꾸면 어중간한 값이 나오므로 가까운 10도 단위로 맞추면 됩니다.',
    },
    {
      q: '에어프라이어 환산이 정확한가요?',
      a: '통설인 "20도 낮추고 시간 20% 줄이기"를 적용한 값입니다. 기기마다 화력이 크게 다르므로 처음 만들 때는 중간에 열어 확인하세요.',
    },
    {
      q: '오븐 온도가 표시와 다른 것 같습니다.',
      a: '가정용 오븐은 20도까지 차이 나는 일이 흔합니다. 오븐 온도계를 하나 넣어 두면 내 오븐의 버릇을 알 수 있고, 예열은 표시등이 꺼진 뒤 5분쯤 더 기다리는 편이 확실합니다.',
    },
  ],
  'food/steak': [
    {
      q: '왜 목표 온도보다 낮게 꺼내나요?',
      a: '불에서 내린 뒤에도 겉의 열이 안으로 퍼져 중심 온도가 3~5도 더 오릅니다. 목표 온도에서 꺼내면 한 단계 더 익은 고기가 됩니다.',
    },
    {
      q: '휴지는 꼭 해야 하나요?',
      a: '해야 합니다. 바로 썰면 육즙이 도마로 흘러나옵니다. 두께의 두 배쯤 되는 시간(2.5cm면 5분) 두면 육즙이 고기 전체로 퍼집니다.',
    },
    {
      q: '온도계 없이 굽는 시간만으로 되나요?',
      a: '어림값은 되지만 팬 온도·고기 처음 온도·두께에 따라 크게 달라집니다. 자주 굽는다면 심부 온도계가 가장 확실한 투자입니다. 다진 고기와 닭고기는 반드시 속까지 익히세요.',
    },
  ],
  'food/rice': [
    {
      q: '쌀과 물 비율이 왜 1:1.2인가요?',
      a: '백미 기준으로 부피 대비 1.2배가 보통 밥입니다. 햅쌀은 수분이 많아 1.1배, 묵은쌀은 1.3배가 알맞습니다. 현미는 겨층이 물을 잘 안 먹어 1.6배까지 필요합니다.',
    },
    {
      q: '손등으로 재는 방법은 맞나요?',
      a: '같은 냄비를 쓸 때만 믿을 만합니다. 손등이 잠길 정도(약 1.5cm)가 백미 보통인데, 냄비 지름이 넓으면 같은 높이라도 물이 훨씬 많아집니다.',
    },
    {
      q: '쌀을 씻은 뒤 바로 재도 되나요?',
      a: '체에 밭쳐 물기를 뺀 뒤 재세요. 젖은 쌀은 이미 물을 먹은 상태라 그만큼 밥이 질어집니다.',
    },
  ],
  'food/pasta': [
    {
      q: '소금을 정말 그렇게 많이 넣나요?',
      a: '면에 간이 배는 유일한 기회라 그렇습니다. 대부분은 물과 함께 버려지고 면에 남는 양은 적습니다. 물 1L에 10g이 기본이고, 소스가 짜다면 조금 줄이세요.',
    },
    {
      q: '물은 왜 이렇게 많이 필요한가요?',
      a: '물이 적으면 면에서 나온 전분이 진해져 면끼리 들러붙고, 면을 넣었을 때 물 온도가 크게 떨어져 겉만 퍼집니다.',
    },
    {
      q: '알덴테는 몇 분 덜 삶는 건가요?',
      a: '봉지에 적힌 시간에서 1분 정도 빼면 됩니다. 소스와 함께 볶는 동안 더 익으므로, 볶을 예정이라면 1~2분 덜 삶는 편이 낫습니다.',
    },
  ],
  'food/coffee': [
    {
      q: '1:15가 무슨 뜻인가요?',
      a: '원두 1g에 물 15g(=15ml)이라는 뜻입니다. 원두 20g이면 물 300ml입니다. 숫자가 클수록 연해집니다.',
    },
    {
      q: '맛이 쓰거나 싱겁습니다.',
      a: '쓰고 텁텁하면 과다 추출입니다 — 굵게 갈거나 물 온도를 낮추세요. 싱겁고 신맛만 나면 부족 추출이니 곱게 갈거나 시간을 늘리세요. 비율보다 분쇄도가 더 크게 작용합니다.',
    },
    {
      q: '물 온도는 몇 도가 좋나요?',
      a: '90~95도입니다. 끓인 물을 30초쯤 두면 그 정도가 됩니다. 100도로 부으면 쓴맛이 강하게 나옵니다.',
    },
  ],
  'food/baking-pan': [
    {
      q: '왜 넓이로 계산하나요?',
      a: '반죽의 두께가 비슷해야 굽는 시간이 맞기 때문입니다. 지름이 1.2배면 넓이는 1.44배가 되므로, 지름 비율로 계산하면 반죽이 모자랍니다.',
    },
    {
      q: '틀 높이가 다르면요?',
      a: '넓이 기준이라 높이가 크게 다르면 어긋납니다. 깊은 틀에 얕은 레시피를 넣으면 반죽이 두꺼워져 속이 덜 익으니, 온도를 10도 낮추고 시간을 늘리세요.',
    },
    {
      q: '반죽은 틀에 얼마나 채우나요?',
      a: '60~70%가 기준입니다. 가득 채우면 부풀면서 넘치고, 너무 적으면 가장자리만 익어 마릅니다.',
    },
  ],
  'food/storage': [
    {
      q: '기간이 지나면 못 먹나요?',
      a: '맛과 질감이 유지되는 기준입니다. 냉동은 그 뒤에도 상하지는 않지만 맛이 떨어지고, 냉장은 기간 안이라도 상할 수 있습니다. 냄새와 색, 끈적임을 먼저 확인하세요.',
    },
    {
      q: '해동한 걸 다시 얼려도 되나요?',
      a: '권하지 않습니다. 녹는 동안 늘어난 세균이 다시 얼려도 사라지지 않고, 조직이 망가져 맛도 크게 떨어집니다. 나눠서 얼려 두는 편이 낫습니다.',
    },
    {
      q: '감자와 양파는 왜 냉장고에 넣지 말라고 하나요?',
      a: '감자는 낮은 온도에서 전분이 당으로 바뀌어 맛이 변하고 튀길 때 잘 탑니다. 양파는 습기를 먹어 물러집니다. 둘 다 서늘하고 어두운 곳에 따로 두세요.',
    },
  ],

  /* ── 단위 변환 ── */
  convert: [
    {
      q: '어느 칸에 넣어야 하나요?',
      a: '양쪽 모두 입력할 수 있습니다. 왼쪽에 넣으면 오른쪽이, 오른쪽에 넣으면 왼쪽이 바뀝니다. "3.5인치가 몇 cm"처럼 반대 방향으로 찾아와도 그대로 쓸 수 있습니다.',
    },
    {
      q: '전통 단위 값이 제가 아는 것과 다릅니다.',
      a: '근·되·마지기 같은 단위는 지역과 품목에 따라 다릅니다. 고기 한 근은 600g이지만 채소는 375g이고, 논 한 마지기도 지역에 따라 150~300평으로 갈립니다. 각 페이지에 그 차이를 적어 두었습니다.',
    },
    {
      q: '계산 결과를 믿어도 되나요?',
      a: '1인치 = 2.54cm처럼 국제적으로 정의된 값은 정확합니다. 마하나 전통 단위처럼 조건에 따라 달라지는 값은 기준을 함께 적어 두었으니 확인하고 쓰세요.',
    },
    {
      q: '데이터 용량이 저장장치 표기와 다릅니다.',
      a: '이 사이트는 1GB = 1,024MB(2진법) 기준입니다. 저장장치 제조사는 1GB를 1,000MB로 계산해 표기하므로, 1TB SSD가 컴퓨터에서 931GB로 보이는 것은 고장이 아니라 이 차이 때문입니다.',
    },
  ],
};

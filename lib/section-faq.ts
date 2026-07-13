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
};

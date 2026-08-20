import type { RelatedItem } from './related.ts';

/**
 * 운세 낱장끼리 이어 주는 목록.
 *
 * ── 왜 필요한가 (2026-08-20) ───────────────────────────────
 * 운세 낱장 스물셋이 **전부 막다른 길**이었다. 계산기·테스트·퀴즈·체크리스트·
 * 생성기에는 「관련 항목」이 있는데 운세만 통째로 빠져 있어서, 낱장에서 갈 수
 * 있는 곳이 허브 하나뿐이었다.
 *
 * 특히 방금 낸 셋(사주 궁합·삼재·십이신살)은 들어오는 링크가 등록부(사이트맵·
 * 허브·검색색인) 말고는 0이었다. [[related-links-front-of-list]]가 말하는
 * 그대로다 — 뒤에 붙인 낱장은 아무도 안 가리킨다.
 *
 * ── 허브 목록과 따로 두는 까닭 ─────────────────────────────
 * 허브(app/(ko)/fortune/page.tsx)는 href·badge·color를 쓰고 여기는 slug·
 * category를 쓴다. 한 표로 합치려면 허브 마크업까지 손대야 해서, 목록만
 * 두 벌로 두고 **둘이 어긋나면 검사가 잡게** 한다(tests/fortune-related.test.ts).
 *
 * ── 갈래를 나누는 기준 ─────────────────────────────────────
 * 「사주 궁합」은 사주이기도 하고 궁합이기도 하다. 궁합에 둔다 — 그 말을 치고
 * 들어온 사람이 다음에 보고 싶은 것은 다른 궁합이지 사주 이론이 아니다.
 */
export const FORTUNE_RELATED: readonly RelatedItem[] = [
  { slug: 'saju', icon: '🔯', title: '사주 분석', desc: '생년월일로 사주 4주 분석 + 오행 균형', category: '사주·명리' },
  { slug: 'sinsal', icon: '🌸', title: '십이신살', desc: '도화살·역마살·화개살이 내 사주에 있는지', category: '사주·명리' },
  { slug: 'unseong', icon: '🌿', title: '십이운성', desc: '장생·건록·제왕 — 일간이 어느 자리에서 힘이 센가', category: '사주·명리' },
  { slug: 'ilju', icon: '📜', title: '일주 60가지', desc: '갑자일주부터 계해일주까지 하나씩 풀이', category: '사주·명리' },
  { slug: 'samjae', icon: '🗓️', title: '삼재', desc: '내 띠 삼재가 언제인지 세 해를 짚어줍니다', category: '사주·명리' },

  { slug: 'saju-match', icon: '💑', title: '사주 궁합', desc: '일간·배우자궁·오행으로 보는 명리 궁합', category: '궁합' },
  { slug: 'name-match', icon: '💕', title: '이름 궁합', desc: '두 사람 이름 획수로 보는 궁합 점수', category: '궁합' },
  { slug: 'zodiac-match', icon: '🐲', title: '띠 궁합', desc: '십이지 삼합·육합으로 보는 두 사람 궁합', category: '궁합' },
  { slug: 'star-match', icon: '⭐', title: '별자리 궁합', desc: '12별자리 원소로 보는 두 사람 궁합', category: '궁합' },
  { slug: 'blood-match', icon: '🩸', title: '혈액형 궁합', desc: 'A·B·O·AB형으로 보는 두 사람 궁합', category: '궁합' },
  { slug: 'mbti-match', icon: '🧠', title: 'MBTI 궁합', desc: '16유형으로 보는 두 사람 궁합 점수', category: '궁합' },

  { slug: 'tarot', icon: '🃏', title: '타로 카드', desc: '78장 풀덱에서 카드 뽑기', category: '타로' },
  { slug: 'tarot-yesno', icon: '🔮', title: '타로 예스/노', desc: '질문을 떠올리고 카드로 받는 예·아니오', category: '타로' },
  { slug: 'daily-tarot', icon: '🃏', title: '오늘의 타로', desc: '매일 자정 바뀌는 오늘의 타로 카드 한 장', category: '타로' },
  { slug: 'card', icon: '🎴', title: '타로 카드 사전', desc: '78장 카드의 정방향·역방향 의미', category: '타로' },

  { slug: 'daily', icon: '🔮', title: '오늘의 종합운세', desc: '생년월일로 보는 오늘의 총운·연애·금전운', category: '오늘의 운세' },
  { slug: 'today-color', icon: '🎨', title: '오늘의 행운 색', desc: '이름·날짜로 보는 오늘의 행운 컬러', category: '오늘의 운세' },
  { slug: 'lucky-lotto', icon: '🍀', title: '행운의 로또 번호', desc: '생년월일로 보는 오늘의 행운 번호 6개', category: '오늘의 운세' },
  { slug: 'biorhythm', icon: '📈', title: '바이오리듬', desc: '신체·감성·지성 리듬을 그래프로', category: '오늘의 운세' },

  { slug: 'zodiac', icon: '⭐', title: '별자리 운세', desc: '12개 별자리로 오늘의 운세 확인', category: '유형별 운세' },
  { slug: 'animal', icon: '🐉', title: '띠 운세', desc: '쥐·소·범 등 12띠별 오늘의 운세', category: '유형별 운세' },
  { slug: 'mbti', icon: '🧠', title: 'MBTI 운세', desc: '16가지 성격 유형별 오늘의 운세', category: '유형별 운세' },
  { slug: 'blood-type', icon: '🩸', title: '혈액형 운세', desc: 'A·B·O·AB형 오늘의 운세', category: '유형별 운세' },

  { slug: 'dream', icon: '🌙', title: '꿈 해몽', desc: '돼지·뱀·불 등 78가지 꿈의 의미 분석', category: '꿈·탄생' },
  { slug: 'birth-stone', icon: '💎', title: '탄생석·탄생화', desc: '태어난 달의 보석과 꽃, 그 의미', category: '꿈·탄생' },
];

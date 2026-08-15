import type { TopicSlug } from '../saju-topics.ts';

/** 자주 묻는 질문 한 쌍 — components/Faq가 그대로 받는다 */
export interface TopicFaq { q: string; a: string; }

/**
 * 주제 낱장 한 언어의 문구.
 *
 * lib/saju-l10n/과 같은 방식이다 — 조건은 코드에, 말은 표에. 다른 점은 열쇠가
 * 열 언어라는 것뿐이다(saju-l10n은 한국어를 뺀 아홉).
 *
 * 문장을 여기 다 적지는 않는다. 영역별 해설(summary·points·advice)은 이미 열
 * 언어로 있으니 그것을 그대로 쓰고, 여기에는 주제 낱장에만 필요한 것 — 제목,
 * 근거 줄의 라벨, 이름 입력 문구 — 만 둔다.
 */
export interface TopicCopy {
  /** 주제 이름 — H1과 메타 제목의 뿌리 */
  title: Record<TopicSlug, string>;
  /** 한 문장 소개 — 메타 설명에도 쓴다. 검색어가 여기 들어간다 */
  lead: Record<TopicSlug, string>;
  /** 근거 줄의 라벨 — lib/saju-topics.ts의 EvidenceRow.term이 열쇠다 */
  terms: Record<string, string>;

  /**
   * 어느 주제에서나 같은 물음 둘 — "무료인가", "태어난 시각을 모르면".
   *
   * 검색 결과에 물음이 그대로 뜨는 자리다. 주제마다 새로 쓰면 열 언어 × 일곱이
   * 되는데, 이 둘은 실제로 주제와 무관하게 같은 답이라 한 벌만 둔다.
   */
  faqCommon: TopicFaq[];
  /** 주제마다 다른 물음 하나 — 그 운을 명리에서 어떻게 보는지 */
  faqTopic: Record<TopicSlug, TopicFaq>;
  ui: {
    /** 명식을 뽑기 전 안내 */
    empty: string;
    /** 근거 블록 제목 */
    evidence: string;
    /** 해설 블록 제목 — 영역 운세를 여는 자리 */
    reading: string;
    /** 이 주제가 명리에서 무엇을 보는지 적은 배경 문단의 제목 */
    background: string;
    /** 근거 줄의 값 — 있음 / 없음 / 해당 없음 */
    yes: string;
    no: string;
    none: string;
    /** strength 줄만 있음/없음 대신 신강·신약으로 읽는다 */
    strong: string;
    weak: string;
    /** 개수 단위 — "{n}개" 꼴. {n}을 그대로 둔다 */
    countOf: string;
    /** 이름 입력 */
    nameLabel: string;
    namePh: string;
    /** 이름은 브라우저 밖으로 안 나간다는 안내 */
    nameNote: string;
    /** "{name}님의 연애운" 꼴 — {name}과 {topic}을 그대로 둔다 */
    titleOf: string;
    /** 사주마다 갈리는 머리말 — {term}과 {value}를 그대로 둔다 */
    introLead: string;
    /**
     * <title> 틀 — {topic}을 그대로 둔다.
     *
     * H1은 짧고 깨끗하게 두고(화면에 보이는 글이다), 사람이 실제로 치는 말은
     * 여기에 넣는다. 낱말을 늘어놓으면 역효과이므로 한 구절만 자연스럽게 붙인다.
     */
    metaTitle: string;
    /** 메타 설명 끝에 붙는 한 구절 — 무료·가입 없음 */
    metaDescSuffix: string;
    /** 다른 주제로 가는 줄의 제목 */
    otherTopics: string;
    /** 통합 페이지로 가는 줄 */
    backToAll: string;
  };
}

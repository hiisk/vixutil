/**
 * 크롤러 정책 — 어느 봇을 받고 어느 봇을 막나.
 *
 * ── 왜 막나 (2026-08-13) ──────────────────────────────────
 * Hobby 한도에서 **Edge 요청 100만**이 벽이고, 그것은 캐시로 줄지 않는다 — 캐시에서
 * 나가는 응답도 요청 하나로 세어진다. 그래서 요청 수 자체를 줄여야 한다.
 *
 * 이 사이트는 주소가 20만 개다. 크롤러 하나가 전부 훑으면 그것만으로 20만 요청이고,
 * 한도의 5분의 1이다. 봇이 열 개면 한도를 두 배로 넘긴다. 실제로 Fast Origin
 * Transfer가 10GB 한도의 348%까지 올라 사이트가 멈췄다.
 *
 * ── 무엇으로 가르나 ───────────────────────────────────────
 * **사람을 보내 주는 봇만 받는다.** 이 사이트의 목적은 검색 유입이므로, 검색 결과에
 * 우리를 실어 주는 봇은 비용을 낼 값이 있다. 그렇지 않은 봇은 대역폭만 먹는다.
 *
 *   받는다  검색 엔진 — 구글·빙·네이버·다음·DuckDuckGo·Apple(Siri·Spotlight)
 *   받는다  사람이 물어서 그때 가져가는 것 — ChatGPT-User·Perplexity-User 같은
 *           것은 사용자의 질문에 답하려고 그 순간 한 장을 가져가고, 인용과 함께
 *           방문자를 보내 준다. 크롤링 규모도 작다
 *   막는다  학습용 대량 수집 — 전부 훑어 가고 링크를 남기지 않는다
 *   막는다  SEO 분석 도구 — 경쟁사 조사용이다. 우리에게 오는 것이 하나도 없다
 *
 * ── 막아도 검색 순위에 영향이 없나 ────────────────────────
 * 없다. 구글·빙·네이버의 색인 봇은 그대로 받는다. 여기서 막는 것은 검색 색인과
 * 무관한 봇들이다. 다만 **AI 답변에 인용될 기회는 줄어든다** — 학습 수집을 막으면
 * 그 모델이 우리 내용을 갖지 못한다. 그것을 값으로 치를지가 판단이고, 지금은
 * 사이트가 멈추는 쪽이 더 크다고 보아 막는다. 한도가 넉넉해지면 되돌릴 수 있다.
 *
 * 봇은 robots.txt를 **지킬 의무가 없다.** 이름을 바꿔 오거나 무시하는 것도 있다.
 * 그래서 이것은 요청을 줄이는 여러 수단 가운데 가장 싼 하나일 뿐이고, 효과는
 * Usage 화면의 Edge 요청 추이로 확인해야 한다.
 */

/** 색인해 주는 검색 엔진 — 받는다 */
export const SEARCH_BOTS: string[] = [
  'Googlebot',
  'Googlebot-Image',
  'Bingbot',
  'Yeti',              // 네이버
  'Daum',              // 다음
  'DuckDuckBot',
  'Applebot',          // Siri·Spotlight
  'YandexBot',
];

/**
 * 사람이 물었을 때 그때 한 장을 가져가는 것 — 받는다.
 *
 * 전부 훑지 않고 인용과 함께 방문자를 보내 준다. 학습용 수집기와 이름이 비슷하니
 * (GPTBot ↔ ChatGPT-User) 헷갈리지 않게 나눠 적었다.
 */
export const ASSISTANT_FETCHERS: string[] = [
  'ChatGPT-User',
  'Perplexity-User',
  'Claude-User',
  'Claude-SearchBot',
];

/** 학습용 대량 수집 — 막는다. 전부 훑어 가고 링크를 남기지 않는다 */
export const TRAINING_CRAWLERS: string[] = [
  'GPTBot',
  'ClaudeBot',
  'anthropic-ai',
  'CCBot',
  'Bytespider',
  'Google-Extended',
  'Applebot-Extended',
  'meta-externalagent',
  'FacebookBot',
  'Diffbot',
  'Omgilibot',
  'Omgili',
  'Timpibot',
  'Webzio-Extended',
  'ImagesiftBot',
  'AI2Bot',
  'Kangaroo Bot',
  'PanguBot',
  'Sidetrade indexer bot',
  'cohere-ai',
  'cohere-training-data-crawler',
];

/** SEO·마케팅 분석 도구 — 막는다. 경쟁사 조사용이고 우리에게 오는 것이 없다 */
export const SEO_CRAWLERS: string[] = [
  'AhrefsBot',
  'SemrushBot',
  'MJ12bot',
  'DotBot',
  'BLEXBot',
  'DataForSeoBot',
  'Barkrowler',
  'ZoominfoBot',
  'PetalBot',
  'SeekportBot',
  'serpstatbot',
  'MegaIndex',
  'Screaming Frog SEO Spider',
  'SiteAuditBot',
  'rogerbot',
  'linkdexbot',
];

/**
 * 링크 미리보기를 만드는 것들 — 낱장 공유 카드를 받아야 하는 유일한 무리 (2026-08-15).
 *
 * 카드가 낱장마다 달라지면서(lib/og-cards의 DETAIL_SECTIONS) `/og/` 아래 주소가
 * 2,109개에서 십수만 개가 됐다. 한 장이 약 100KB라, 크롤러 하나가 그것을 쓸어
 * 가면 Origin Transfer 10GB를 그것만으로 넘긴다 — 이 저장소가 348%로 한 번
 * 멈춘 그 한도다.
 *
 * 그래서 app/robots.ts가 `*`에게 낱장 카드를 막고, 이 목록만 통과시킨다.
 * 카드는 **공유될 때 필요한 것**이지 색인될 것이 아니다 — 구글 웹 검색 결과에는
 * og:image가 안 쓰인다(본문 <img>를 쓴다). 잃는 것이 없다.
 *
 * 그래서 카드 값은 페이지 수가 아니라 **공유 횟수**를 따라간다.
 * Applebot이 여기 있는 것은 iMessage 미리보기를 그것이 가져가기 때문이다
 * (SEARCH_BOTS에도 있지만 그 목록은 robots.txt에 안 쓰인다 — proxy.ts용이다).
 */
export const UNFURLERS: string[] = [
  'facebookexternalhit',
  'Twitterbot',
  'Slackbot',
  'Slackbot-LinkExpanding',
  'Discordbot',
  'LinkedInBot',
  'WhatsApp',
  'TelegramBot',
  'redditbot',
  'Pinterestbot',
  'SkypeUriPreview',
  'kakaotalk-scrap',
  'Applebot',
  'Iframely',
  'Embedly',
  'vkShare',
];

/** 막을 봇 전부 */
export const BLOCKED_CRAWLERS: string[] = [...TRAINING_CRAWLERS, ...SEO_CRAWLERS];

/** 받을 봇 전부 — 검사가 두 목록이 겹치지 않는지 본다 */
export const ALLOWED_CRAWLERS: string[] = [...SEARCH_BOTS, ...ASSISTANT_FETCHERS];

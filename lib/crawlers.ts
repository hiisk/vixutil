/**
 * 크롤러 정책 — 어느 봇을 받고 어느 봇을 막나.
 *
 * ── 왜 막았나 (2026-08-13, Hobby) ─────────────────────────
 * Hobby 한도에서 **Edge 요청 100만**이 벽이었고, 그것은 캐시로 줄지 않는다 —
 * 캐시에서 나가는 응답도 요청 하나로 세어진다. 주소가 20만 개라 봇 하나가 전부
 * 훑으면 그것만으로 한도의 5분의 1이고, 봇이 열이면 두 배를 넘긴다. 실제로
 * Fast Origin Transfer가 10GB 한도의 348%까지 올라 사이트가 멈췄다.
 *
 * ── 벽이 옮겨졌다 (2026-08-15, Pro) ───────────────────────
 * 유료(Pro)로 올라가 세 가지가 달라졌다. Vercel 문서(/docs/limits)의 값이다.
 *
 *   Edge 요청            100만  →  **1,000만**
 *   Fast Data Transfer   100GB  →  **1TB**
 *   Fast Origin Transfer 10GB에서 정지  →  한도가 없다. 넘으면 **청구**된다
 *
 * 정지가 청구로 바뀐 것이 가장 큰 변화다. Hobby에서는 100%가 사이트가 멈추는
 * 선이라 여유를 크게 두어야 했지만, Pro에서는 한 바퀴를 더 받는 값이 얼마인지
 * 세어 보고 고르면 된다. 크롤 한 바퀴 실측치로 값을 매기면 —
 *
 *   Edge 요청  203,039  →  1,000만의 2.0%           (포함분 안)
 *   전송        3.3GB   →  1TB의 0.33%              (포함분 안)
 *   활성 CPU   1.3~2.7시간 × $0.128 = $0.17~0.35
 *
 * 봇 하나를 더 받는 값이 한 바퀴에 **1달러 아래**다. 월 20달러 크레딧에서 이
 * 정도는 유입을 사는 값으로 싸다.
 *
 * ── 무엇으로 가르나 ───────────────────────────────────────
 * 기준은 그대로 **사람을 보내 주는가**다. 다만 Hobby에서는 "확실히 보내 주는
 * 것만" 받았고, 지금은 "보내 줄 수 있는 것"까지 받는다.
 *
 *   받는다  검색 엔진 — 구글·빙·네이버·다음·DuckDuckGo·Apple(Siri·Spotlight)
 *   받는다  사람이 물어서 그때 가져가는 것 — ChatGPT-User·Perplexity-User는
 *           질문에 답하려고 그 순간 한 장을 가져가고 인용과 함께 방문자를 보낸다
 *   받는다  **AI 답변을 만드는 것** — 아래 AI_ANSWER_CRAWLERS. 인용이 달리는
 *           제품이 뒤에 있다. Hobby에서 막았던 것을 되돌린 자리다
 *   막는다  되돌려주는 것이 없는 대량 수집 — 아래 BULK_SCRAPERS
 *   막는다  SEO 분석 도구 — 경쟁사 조사용이다. 이건 요금제와 상관없이 안 받는다
 *
 * ── 막아도 검색 순위에 영향이 없나 ────────────────────────
 * 없다. 구글·빙·네이버의 색인 봇은 그대로 받는다.
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

/**
 * AI 답변을 만드는 것 — 받는다 (2026-08-15에 되돌렸다).
 *
 * 뒤에 **인용이 달리는 제품**이 있는 것들이다. 사람이 ChatGPT·Gemini·Claude·
 * Apple Intelligence에 물었을 때 우리 계산기가 근거로 뜨면 링크를 타고 온다.
 * Hobby에서는 이것을 값으로 치렀다("AI 답변에 인용될 기회는 줄어든다").
 *
 * ── 넷 가운데 둘은 요청을 하나도 안 만든다 ────────────────
 * `Google-Extended`와 `Applebot-Extended`는 **크롤러가 아니라 opt-out 토큰**이다.
 * 그 이름으로 오는 요청이 없고, robots.txt에 적힌 것을 Googlebot·Applebot이 이미
 * 받아 간 내용을 AI 쪽에 쓸지 말지를 정하는 표시일 뿐이다. 즉 막아서 아낀 요청이
 * **0**이었고, 대신 AI Overviews·Apple Intelligence 인용에서만 빠져 있었다.
 * 요금제와 무관하게 막을 이유가 없던 자리다.
 *
 * 실제로 훑어 가는 것은 GPTBot·ClaudeBot·meta-externalagent 셋이고, 한 바퀴에
 * 20만 요청(1,000만의 2%)·3.3GB(1TB의 0.33%)다.
 *
 * `anthropic-ai`는 쓰지 않는 옛 이름이지만 남겨 둔다 — 그 이름으로 오는 것이
 * 있으면 ClaudeBot과 같이 취급하는 것이 맞다.
 */
export const AI_ANSWER_CRAWLERS: string[] = [
  'GPTBot',                  // OpenAI — ChatGPT
  'ClaudeBot',               // Anthropic — Claude
  'anthropic-ai',            // 옛 이름
  'Google-Extended',         // 토큰. AI Overviews·Gemini 근거로 쓸지
  'Applebot-Extended',       // 토큰. Apple Intelligence
  'meta-externalagent',      // Meta AI
];

/**
 * 되돌려주는 것이 없는 대량 수집 — 막는다.
 *
 * 전부 훑어 가고 링크를 남기지 않는다. 위 목록과 가르는 잣대는 **사람이 볼 수 있는
 * 제품이 뒤에 있고 거기에 출처가 달리는가**다. Common Crawl(CCBot)은 자료를 널리
 * 나눠 주지만 우리에게 오는 유입은 없고, Bytespider는 규모가 크고 규칙을 잘 안
 * 지킨다. cohere는 인용이 달리는 소비자 제품이 없다.
 *
 * `FacebookBot`은 미리보기를 만드는 `facebookexternalhit`과 다른 것이다 —
 * 그쪽은 UNFURLERS에 있고 그대로 받는다.
 */
export const BULK_SCRAPERS: string[] = [
  'CCBot',
  'Bytespider',
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

/**
 * SEO·마케팅 분석 도구 — 막는다. 경쟁사 조사용이고 우리에게 오는 것이 없다.
 *
 * 여기는 Pro로 올라가도 안 푼다. 한도가 아니라 **되돌아오는 것이 0**이라서 막는
 * 것이고, 그 셈은 요금제가 바뀌어도 그대로다.
 */
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
export const BLOCKED_CRAWLERS: string[] = [...BULK_SCRAPERS, ...SEO_CRAWLERS];

/** 받을 봇 전부 — 검사가 두 목록이 겹치지 않는지 본다 */
export const ALLOWED_CRAWLERS: string[] = [
  ...SEARCH_BOTS, ...ASSISTANT_FETCHERS, ...AI_ANSWER_CRAWLERS,
];

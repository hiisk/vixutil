/**
 * 쿠팡 파트너스 설정 — 한 곳에서만 온다.
 *
 * 코인 거래소 제휴를 걷어내고 이쪽으로 옮겼다. 이유는 짝이 안 맞아서다:
 * 제휴 카드가 붙은 화면이 일흔 곳인데 내주는 것은 코인 선물 거래소 둘뿐이라,
 * BMI·사주·실수령액을 보러 온 사람에게 엉뚱한 것을 내밀고 있었다.
 *
 * ── 너비는 상수가 아니다 ───────────────────────────────────
 * 쿠팡 위젯은 **넘긴 width 그대로 iframe을 박는다.** 실제로 재 봤다:
 *
 *     width 1200  →  iframe 1200px, 문서 scrollWidth 1200 (모바일 전체가 밀림)
 *     width 358   →  iframe 358px,  넘침 없음
 *     width 100%  →  iframe 390px  (컨테이너가 아니라 뷰포트 폭을 잡는다)
 *
 * 그래서 붙이는 자리의 안쪽 너비를 재서 넘긴다. 이 사이트의 광고 자리는
 * 모바일 328~398px, 데스크톱 본문 544px, 계산기 옆 레일 280px이다.
 */

export const COUPANG = {
  id: 635021,
  trackingCode: 'AF0911455',
  template: 'carousel',
  /** 캐러셀 한 줄 높이 — 자리를 미리 잡아 두어 광고가 뜰 때 화면이 안 튀게 한다 */
  height: 150,
} as const;

/**
 * 위젯 iframe 주소.
 *
 * 쿠팡의 g.js가 만들어 내는 것과 **같은 주소**다. 그 스크립트를 안 쓰는 까닭은
 * components/CoupangAd.tsx 머리에 적었다 — 요약하면 그 스크립트가 <ins>를
 * document.body 끝에 붙여서, React가 그리는 자리에 담을 수 없다.
 *
 * trackingCode가 실적이 잡히는 열쇠다. 빠지면 광고는 뜨지만 수수료가 안 붙는다.
 */
export function coupangWidgetUrl(width: number): string {
  const q = new URLSearchParams({
    id: String(COUPANG.id),
    template: COUPANG.template,
    trackingCode: COUPANG.trackingCode,
    width: String(width),
    height: String(COUPANG.height),
    tsource: '',
    rUrl: '',
    tag: 'js',
  });
  return `https://ads-partners.coupang.com/widgets.html?${q}`;
}

/**
 * 공정위가 요구하는 대가성 표기.
 *
 * 「포스팅」은 블로그 글에 쓰는 말이라 이 사이트에는 안 맞는다 — 페이지다.
 * 광고 위에 둔다. 사람이 광고를 보기 «전»에 읽어야 뜻이 있다.
 */
export const COUPANG_DISCLOSURE =
  '이 페이지는 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.';

/** 너무 좁으면 캐러셀이 한 칸도 못 그린다 — 그럴 바엔 안 그린다 */
export const COUPANG_MIN_WIDTH = 200;

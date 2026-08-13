import { build } from '@/lib/fold/pages/laundry__slug';

/* 아홉 언어가 lib/fold/pages/laundry__slug.tsx 하나를 같이 쓴다 — 접기 이행(2026-08-10).
   낱장은 요청 때 그리고 캐시에 안 써 ISR 쓰기를 0으로 둔다 — 근거는 lib/prerender.ts.
   허브는 app/(fr)/fr/[[...path]]가 굽는다. */
/*
 * ── ISR 실험 (2026-08-13) ─────────────────────────────────────
 * 이 섹션의 아홉 언어만 force-dynamic을 걷고 ISR로 되돌린다. 한국어 낱장은
 * 디스패처 하나를 공유하므로 손대지 않았다 — 비교군으로 남겨 둔다.
 *
 * 왜 다시 ISR인가: force-dynamic은 요청마다 원본에서 페이지를 전송한다. Hobby의
 * Fast Origin Transfer가 30일 10GB인데 주소 20만을 한 번 훑는 데만 3.6GB가 들고,
 * 실제로 한도의 348%까지 올라 사이트가 멈췄다. lib/prerender.ts가 ISR을 버린
 * 2026-08-10의 셈에는 **이 항목이 없었다** — 그때 본 것은 ISR 쓰기 한도였다.
 *
 * 그리고 그 뒤 확인한 사실 둘이 판단을 바꾼다.
 *   · Vercel 문서: 「재검증이 돌았을 때 내용이 이전과 같으면 ISR 쓰기 단위가
 *     발생하지 않는다」 — 이 사이트 낱장은 순수 계산 결과라 바이트가 같다
 *   · Vercel 문서: 「쓴 데이터는 정한 기간만큼 남는다. 팀이 직접 무효화하지
 *     않는 한」 — 옛 주석의 「배포마다 캐시가 비워진다」와 어긋난다
 *
 * 어느 쪽이 맞는지는 **재 봐야 안다.** 그래서 한 섹션만 바꿔 배포하고 ISR 쓰기가
 * 첫 생성 뒤 멈추는지, 배포 뒤에 다시 치솟는지 본다. 멈추면 나머지를 옮긴다.
 *
 * 하루로 잡은 까닭: 내용이 안 바뀌므로 더 길게 둘 수도 있지만, 고침이 반영되는
 * 데 그만큼 걸린다. 하루면 크롤러가 같은 주소를 다시 훑을 때 CDN이 받아 주고
 * (s-maxage), 재검증이 돌아도 내용이 같아 쓰기가 안 생긴다.
 */
export const revalidate = 86400;

const { generateMetadata, generateStaticParams, Page } = build('fr');
export { generateMetadata, generateStaticParams };
export default Page;

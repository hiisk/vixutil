/**
 * 공유 카드의 규격.
 *
 * og-template.tsx에 있었는데, 그 파일은 JSX가 들어 있어 node --test가 파싱하지
 * 못한다. 메타데이터에 카드를 붙이는 lib/og-cards/index.ts가 이 값을 쓰는데,
 * 그쪽은 섹션마다 있는 route.ts 예순몇 개가 부르고 그것들은 검사가 부른다 — 사슬 어딘가에
 * JSX가 있으면 검사 수백 개가 "Unknown file extension .tsx"로 죽는다.
 *
 * 그래서 숫자만 여기로 뺐다. og-template.tsx는 그대로 다시 내보내므로
 * 부르던 곳은 아무것도 안 바뀐다.
 */
export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = 'image/png';

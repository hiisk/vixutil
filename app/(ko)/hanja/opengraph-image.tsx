import { connection } from 'next/server';
import { ogImage } from '@/lib/og-image';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';
import { HANJA_UI, HANJA_SECTION } from '@/lib/hanja-ui';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

const ui = HANJA_UI['ko'];

export default async function Image() {
  // 프리렌더를 여기서 멈춘다 — 카드는 처음 요청될 때 만든다
  await connection();
  return ogImage(
    ogCard({
      icon: '📖',
      eyebrow: ui.section,
      title: ui.hubTitle,
      desc: ui.hubLead,
      from: HANJA_SECTION.ogFrom,
      to: HANJA_SECTION.ogTo,
    }),
  );
}

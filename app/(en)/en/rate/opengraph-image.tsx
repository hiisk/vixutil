import { connection } from 'next/server';
import { ogImage } from '@/lib/og-image';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';
import { RATE_SECTION } from '@/lib/rate-section';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

const meta = RATE_SECTION.meta['en'];

export default async function Image() {
  // 프리렌더를 여기서 멈춘다 — 카드는 처음 요청될 때 만든다
  await connection();
  return ogImage(
    ogCard({
      icon: '📐',
      eyebrow: meta.section,
      title: meta.hubTitle,
      desc: meta.hubLead,
      from: RATE_SECTION.ogFrom,
      to: RATE_SECTION.ogTo,
    }),
  );
}

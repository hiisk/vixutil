import { connection } from 'next/server';
import { ogImage } from '@/lib/og-image';
import { OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-template';
import { intlOg } from '@/lib/og-intl';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  // 프리렌더를 여기서 멈춘다 — 카드는 처음 요청될 때 만든다
  await connection();
  return ogImage(intlOg('device/en'));
}

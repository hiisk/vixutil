import type { Metadata } from 'next';
import ImageHubIntl from '@/components/ImageHubIntl';
import { imageHubMetaIntl } from '@/lib/image-tools-intl';

/* 화면은 components/ImageHubIntl.tsx 하나를 일곱 언어가 같이 쓴다 */
export const metadata: Metadata = imageHubMetaIntl('pt-br');

export default function PtBrImageHub() {
  return <ImageHubIntl lang="pt-br" />;
}

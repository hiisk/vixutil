import type { Metadata } from 'next';
import TextHubIntl from '@/components/TextHubIntl';
import { textHubMetaIntl } from '@/lib/text-tools-intl';

/* 화면은 components/TextHubIntl.tsx 하나를 일곱 언어가 같이 쓴다 */
export const metadata: Metadata = textHubMetaIntl('pt-br');

export default function PtBrTextHub() {
  return <TextHubIntl lang="pt-br" />;
}

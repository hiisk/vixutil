import type { Metadata } from 'next';
import ColorHubIntl from '@/components/ColorHubIntl';
import { colorHubMetaIntl } from '@/lib/color-tools-intl';

/* 화면은 components/ColorHubIntl.tsx 하나를 일곱 언어가 같이 쓴다 */
export const metadata: Metadata = colorHubMetaIntl('ja');

export default function JaColorHub() {
  return <ColorHubIntl lang="ja" />;
}

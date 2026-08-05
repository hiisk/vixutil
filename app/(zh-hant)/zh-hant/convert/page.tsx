import type { Metadata } from 'next';
import ConvertHub from '@/components/ConvertHub';
import { convertHubMetaIntl } from '@/lib/convert-ui-intl';

/* 화면은 components/ConvertHub.tsx 하나를 열 언어가 같이 쓴다 */
export const metadata: Metadata = convertHubMetaIntl('zh-hant');

export default function JaConvertHub() {
  return <ConvertHub lang="zh-hant" />;
}

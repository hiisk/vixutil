import type { Metadata } from 'next';
import RandomHubIntl from '@/components/RandomHubIntl';
import { randomHubMetaIntl } from '@/lib/random-ui-intl';

/* 화면은 components/RandomHubIntl.tsx 하나를 열 언어가 같이 쓴다 */
export const metadata: Metadata = randomHubMetaIntl('zh-hans');

export default function ZhHansRandomHub() {
  return <RandomHubIntl lang="zh-hans" />;
}

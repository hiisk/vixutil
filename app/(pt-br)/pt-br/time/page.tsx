import type { Metadata } from 'next';
import TimeHubIntl from '@/components/TimeHubIntl';
import { timeHubMetaIntl } from '@/lib/time-tools-intl';

/* 화면은 components/TimeHubIntl.tsx 하나를 일곱 언어가 같이 쓴다 */
export const metadata: Metadata = timeHubMetaIntl('pt-br');

export default function PtBrTimeHub() {
  return <TimeHubIntl lang="pt-br" />;
}

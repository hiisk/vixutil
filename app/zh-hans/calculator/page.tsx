import type { Metadata } from 'next';
import CalcIntlHub, { calcIntlHubMeta } from '@/components/calc/CalcIntlHub';

export const metadata: Metadata = calcIntlHubMeta('zh-hans');

export default function Page() {
  return <CalcIntlHub lang="zh-hans" />;
}

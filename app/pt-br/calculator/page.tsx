import type { Metadata } from 'next';
import CalcIntlHub, { calcIntlHubMeta } from '@/components/calc/CalcIntlHub';

export const metadata: Metadata = calcIntlHubMeta('pt-br');

export default function Page() {
  return <CalcIntlHub lang="pt-br" />;
}

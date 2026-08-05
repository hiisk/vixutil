import type { Metadata } from 'next';
import { TestIntlHub, testIntlMeta } from '@/components/TestIntlPage';

export const metadata: Metadata = testIntlMeta('pt-br');

export default function TestHub() {
  return <TestIntlHub lang="pt-br" />;
}

import type { Metadata } from 'next';
import { TestIntlHub, testIntlMeta } from '@/components/TestIntlPage';

export const metadata: Metadata = testIntlMeta('fr');

export default function TestHub() {
  return <TestIntlHub lang="fr" />;
}

import type { Metadata } from 'next';
import { TestIntlHub, testIntlMeta } from '@/components/TestIntlPage';

export const metadata: Metadata = testIntlMeta('de');

export default function TestHub() {
  return <TestIntlHub lang="de" />;
}

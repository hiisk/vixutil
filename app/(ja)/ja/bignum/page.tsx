import type { Metadata } from 'next';
import BigNumHubPage from '@/components/bignum/BigNumHubPage';
import { hubMetadata } from '@/lib/bignum/route';

export const metadata: Metadata = hubMetadata('ja');

export default function BigNumHub() {
  return <BigNumHubPage lang="ja" />;
}

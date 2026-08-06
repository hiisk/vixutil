import type { Metadata } from 'next';
import BraHubPage from '@/components/bra/BraHubPage';
import { hubMetadata } from '@/lib/bra/route';

export const metadata: Metadata = hubMetadata('ja');

export default function BraHub() {
  return <BraHubPage lang="ja" />;
}

import type { Metadata } from 'next';
import RingHubPage from '@/components/ring/RingHubPage';
import { hubMetadata } from '@/lib/ring/route';

export const metadata: Metadata = hubMetadata('ko');

export default function RingHub() {
  return <RingHubPage lang="ko" />;
}

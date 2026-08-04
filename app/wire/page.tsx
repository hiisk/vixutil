import type { Metadata } from 'next';
import WireHubPage from '@/components/wire/WireHubPage';
import { hubMetadata } from '@/lib/wire/route';

export const metadata: Metadata = hubMetadata('ko');

export default function WireHub() {
  return <WireHubPage lang="ko" />;
}

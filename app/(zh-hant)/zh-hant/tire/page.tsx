import type { Metadata } from 'next';
import TireHubPage from '@/components/tire/TireHubPage';
import { hubMetadata } from '@/lib/tire/route';

export const metadata: Metadata = hubMetadata('tw');

export default function TireHub() {
  return <TireHubPage lang="tw" />;
}

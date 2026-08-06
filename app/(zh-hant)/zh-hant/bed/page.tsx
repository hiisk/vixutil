import type { Metadata } from 'next';
import BedHubPage from '@/components/bed/BedHubPage';
import { hubMetadata } from '@/lib/bed/route';

export const metadata: Metadata = hubMetadata('tw');

export default function BedHub() {
  return <BedHubPage lang="tw" />;
}

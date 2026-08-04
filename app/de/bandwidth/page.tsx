import type { Metadata } from 'next';
import BandwidthHubPage from '@/components/bandwidth/BandwidthHubPage';
import { hubMetadata } from '@/lib/bandwidth/route';

export const metadata: Metadata = hubMetadata('de');

export default function BandwidthHub() {
  return <BandwidthHubPage lang="de" />;
}

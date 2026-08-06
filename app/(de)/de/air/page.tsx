import type { Metadata } from 'next';
import AirHubPage from '@/components/air/AirHubPage';
import { hubMetadata } from '@/lib/air/route';

export const metadata: Metadata = hubMetadata('de');

export default function AirHub() {
  return <AirHubPage lang="de" />;
}

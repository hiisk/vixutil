import type { Metadata } from 'next';
import WineHubPage from '@/components/wine/WineHubPage';
import { hubMetadata } from '@/lib/wine/route';

export const metadata: Metadata = hubMetadata('de');

export default function WineHub() {
  return <WineHubPage lang="de" />;
}

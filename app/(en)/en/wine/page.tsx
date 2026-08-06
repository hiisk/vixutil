import type { Metadata } from 'next';
import WineHubPage from '@/components/wine/WineHubPage';
import { hubMetadata } from '@/lib/wine/route';

export const metadata: Metadata = hubMetadata('en');

export default function WineHub() {
  return <WineHubPage lang="en" />;
}

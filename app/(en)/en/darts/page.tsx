import type { Metadata } from 'next';
import DartsHubPage from '@/components/darts/DartsHubPage';
import { hubMetadata } from '@/lib/darts/route';

export const metadata: Metadata = hubMetadata('en');

export default function DartsHub() {
  return <DartsHubPage lang="en" />;
}

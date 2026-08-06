import type { Metadata } from 'next';
import GolfHubPage from '@/components/golf/GolfHubPage';
import { hubMetadata } from '@/lib/golf/route';

export const metadata: Metadata = hubMetadata('fr');

export default function GolfHub() {
  return <GolfHubPage lang="fr" />;
}

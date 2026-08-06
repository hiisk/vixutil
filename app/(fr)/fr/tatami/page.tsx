import type { Metadata } from 'next';
import TatamiHubPage from '@/components/tatami/TatamiHubPage';
import { hubMetadata } from '@/lib/tatami/route';

export const metadata: Metadata = hubMetadata('fr');

export default function TatamiHub() {
  return <TatamiHubPage lang="fr" />;
}

import type { Metadata } from 'next';
import QuakeHubPage from '@/components/quake/QuakeHubPage';
import { hubMetadata } from '@/lib/quake/route';

export const metadata: Metadata = hubMetadata('fr');

export default function QuakeHub() {
  return <QuakeHubPage lang="fr" />;
}

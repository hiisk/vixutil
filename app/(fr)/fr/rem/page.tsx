import type { Metadata } from 'next';
import PxHubPage from '@/components/rem/PxHubPage';
import { hubMetadata } from '@/lib/rem/route';

export const metadata: Metadata = hubMetadata('fr');

export default function RemHub() {
  return <PxHubPage lang="fr" />;
}

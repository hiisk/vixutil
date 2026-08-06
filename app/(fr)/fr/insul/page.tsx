import type { Metadata } from 'next';
import InsulHubPage from '@/components/insul/InsulHubPage';
import { hubMetadata } from '@/lib/insul/route';

export const metadata: Metadata = hubMetadata('fr');

export default function InsulHub() {
  return <InsulHubPage lang="fr" />;
}

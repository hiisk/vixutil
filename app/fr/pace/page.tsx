import type { Metadata } from 'next';
import PaceHubPage from '@/components/pace/PaceHubPage';
import { hubMetadata } from '@/lib/pace/route';

export const metadata: Metadata = hubMetadata('fr');

export default function PaceHub() {
  return <PaceHubPage lang="fr" />;
}

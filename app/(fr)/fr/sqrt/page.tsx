import type { Metadata } from 'next';
import SqrtHubPage from '@/components/sqrt/SqrtHubPage';
import { hubMetadata } from '@/lib/sqrt/route';

export const metadata: Metadata = hubMetadata('fr');

export default function SqrtHub() {
  return <SqrtHubPage lang="fr" />;
}

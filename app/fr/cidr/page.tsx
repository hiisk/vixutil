import type { Metadata } from 'next';
import CidrHubPage from '@/components/cidr/CidrHubPage';
import { hubMetadata } from '@/lib/cidr/route';

export const metadata: Metadata = hubMetadata('fr');

export default function CidrHub() {
  return <CidrHubPage lang="fr" />;
}

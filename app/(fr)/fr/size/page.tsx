import type { Metadata } from 'next';
import SizeHubPage from '@/components/size/SizeHubPage';
import { hubMetadata } from '@/lib/size/route';

export const metadata: Metadata = hubMetadata('fr');

export default function SizeHub() {
  return <SizeHubPage lang="fr" />;
}

import type { Metadata } from 'next';
import BedHubPage from '@/components/bed/BedHubPage';
import { hubMetadata } from '@/lib/bed/route';

export const metadata: Metadata = hubMetadata('pt');

export default function BedHub() {
  return <BedHubPage lang="pt" />;
}

import type { Metadata } from 'next';
import CableHubPage from '@/components/cable/CableHubPage';
import { hubMetadata } from '@/lib/cable/route';

export const metadata: Metadata = hubMetadata('de');

export default function CableHub() {
  return <CableHubPage lang="de" />;
}

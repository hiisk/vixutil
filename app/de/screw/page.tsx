import type { Metadata } from 'next';
import ScrewHubPage from '@/components/screw/ScrewHubPage';
import { hubMetadata } from '@/lib/screw/route';

export const metadata: Metadata = hubMetadata('de');

export default function ScrewHub() {
  return <ScrewHubPage lang="de" />;
}

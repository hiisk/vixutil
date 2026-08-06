import type { Metadata } from 'next';
import GengoHubPage from '@/components/gengo/GengoHubPage';
import { hubMetadata } from '@/lib/gengo/route';

export const metadata: Metadata = hubMetadata('de');

export default function GengoHub() {
  return <GengoHubPage lang="de" />;
}

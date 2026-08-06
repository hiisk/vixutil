import type { Metadata } from 'next';
import GengoHubPage from '@/components/gengo/GengoHubPage';
import { hubMetadata } from '@/lib/gengo/route';

export const metadata: Metadata = hubMetadata('pt');

export default function GengoHub() {
  return <GengoHubPage lang="pt" />;
}

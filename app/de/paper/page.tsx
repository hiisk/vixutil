import type { Metadata } from 'next';
import PaperHubPage from '@/components/paper/PaperHubPage';
import { hubMetadata } from '@/lib/paper/route';

export const metadata: Metadata = hubMetadata('de');

export default function PaperHub() {
  return <PaperHubPage lang="de" />;
}

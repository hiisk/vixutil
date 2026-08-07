import type { Metadata } from 'next';
import PurifierHubPage from '@/components/purifier/PurifierHubPage';
import { hubMetadata } from '@/lib/purifier/route';

export const metadata: Metadata = hubMetadata('de');

export default function PurifierHub() {
  return <PurifierHubPage lang="de" />;
}

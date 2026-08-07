import type { Metadata } from 'next';
import PurifierHubPage from '@/components/purifier/PurifierHubPage';
import { hubMetadata } from '@/lib/purifier/route';

export const metadata: Metadata = hubMetadata('tw');

export default function PurifierHub() {
  return <PurifierHubPage lang="tw" />;
}

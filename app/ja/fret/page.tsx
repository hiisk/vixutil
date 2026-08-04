import type { Metadata } from 'next';
import FretHubPage from '@/components/fret/FretHubPage';
import { hubMetadata } from '@/lib/fret/route';

export const metadata: Metadata = hubMetadata('ja');

export default function FretHub() {
  return <FretHubPage lang="ja" />;
}

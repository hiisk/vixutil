import type { Metadata } from 'next';
import MetroHub from '@/components/MetroHub';
import { hubMetadata } from '@/lib/metro/route';

export const metadata: Metadata = hubMetadata('ja');

export default function MetroHubPage() {
  return <MetroHub lang="ja" />;
}

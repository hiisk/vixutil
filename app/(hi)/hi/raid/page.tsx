import type { Metadata } from 'next';
import RaidHubPage from '@/components/raid/RaidHubPage';
import { hubMetadata } from '@/lib/raid/route';

export const metadata: Metadata = hubMetadata('hi');

export default function RaidHub() {
  return <RaidHubPage lang="hi" />;
}

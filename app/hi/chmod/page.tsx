import type { Metadata } from 'next';
import ChmodHubPage from '@/components/chmod/ChmodHubPage';
import { hubMetadata } from '@/lib/chmod/route';

export const metadata: Metadata = hubMetadata('hi');

export default function ChmodHub() {
  return <ChmodHubPage lang="hi" />;
}

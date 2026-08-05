import type { Metadata } from 'next';
import FreqHubPage from '@/components/sound/FreqHubPage';
import { hubMetadata } from '@/lib/sound/route';

export const metadata: Metadata = hubMetadata('hi');

export default function FreqHub() {
  return <FreqHubPage lang="hi" />;
}

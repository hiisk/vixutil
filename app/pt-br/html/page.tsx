import type { Metadata } from 'next';
import TagHubPage from '@/components/html/TagHubPage';
import { hubMetadata } from '@/lib/html/route';

export const metadata: Metadata = hubMetadata('pt');

export default function TagHub() {
  return <TagHubPage lang="pt" />;
}

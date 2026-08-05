import type { Metadata } from 'next';
import CodeHubPage from '@/components/code/CodeHubPage';
import { hubMetadata } from '@/lib/code/route';

export const metadata: Metadata = hubMetadata('fr');

export default function CodeHub() {
  return <CodeHubPage lang="fr" />;
}

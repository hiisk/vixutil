import type { Metadata } from 'next';
import ScHubPage from '@/components/shortcut/ScHubPage';
import { hubMetadata } from '@/lib/shortcut/route';

export const metadata: Metadata = hubMetadata('ko');

export default function ScHub() {
  return <ScHubPage lang="ko" />;
}

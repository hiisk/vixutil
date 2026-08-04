import type { Metadata } from 'next';
import PaperHubPage from '@/components/paper/PaperHubPage';
import { hubMetadata } from '@/lib/paper/route';

export const metadata: Metadata = hubMetadata('zh');

export default function PaperHub() {
  return <PaperHubPage lang="zh" />;
}

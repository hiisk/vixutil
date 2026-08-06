import type { Metadata } from 'next';
import LumberHubPage from '@/components/lumber/LumberHubPage';
import { hubMetadata } from '@/lib/lumber/route';

export const metadata: Metadata = hubMetadata('zh');

export default function LumberHub() {
  return <LumberHubPage lang="zh" />;
}

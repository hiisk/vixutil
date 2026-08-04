import type { Metadata } from 'next';
import DewHubPage from '@/components/dew/DewHubPage';
import { hubMetadata } from '@/lib/dew/route';

export const metadata: Metadata = hubMetadata('zh');

export default function DewHub() {
  return <DewHubPage lang="zh" />;
}

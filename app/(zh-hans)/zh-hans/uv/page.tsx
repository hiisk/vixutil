import type { Metadata } from 'next';
import UvHubPage from '@/components/uv/UvHubPage';
import { hubMetadata } from '@/lib/uv/route';

export const metadata: Metadata = hubMetadata('zh');

export default function UvHub() {
  return <UvHubPage lang="zh" />;
}

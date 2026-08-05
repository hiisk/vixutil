import type { Metadata } from 'next';
import SizeHubPage from '@/components/imgsize/SizeHubPage';
import { hubMetadata } from '@/lib/imgsize/route';

export const metadata: Metadata = hubMetadata('zh');

export default function SizeHub() {
  return <SizeHubPage lang="zh" />;
}

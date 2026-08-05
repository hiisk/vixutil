import type { Metadata } from 'next';
import StopHubPage from '@/components/stop/StopHubPage';
import { hubMetadata } from '@/lib/stop/route';

export const metadata: Metadata = hubMetadata('zh');

export default function StopHub() {
  return <StopHubPage lang="zh" />;
}

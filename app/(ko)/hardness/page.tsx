import type { Metadata } from 'next';
import HardnessHubPage from '@/components/hardness/HardnessHubPage';
import { hubMetadata } from '@/lib/hardness/route';

export const metadata: Metadata = hubMetadata('ko');

export default function HardnessHub() {
  return <HardnessHubPage lang="ko" />;
}

import type { Metadata } from 'next';
import PercentHubPage from '@/components/percent/PercentHubPage';
import { hubMetadata } from '@/lib/percent/route';

export const metadata: Metadata = hubMetadata('ko');

export default function PercentHub() {
  return <PercentHubPage lang="ko" />;
}

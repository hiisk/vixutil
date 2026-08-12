import type { Metadata } from 'next';
import FertilizerHubPage from '@/components/fertilizer/FertilizerHubPage';
import { hubMetadata } from '@/lib/fertilizer/route';

export const metadata: Metadata = hubMetadata('ko');

export default function FertilizerHub() {
  return <FertilizerHubPage lang="ko" />;
}

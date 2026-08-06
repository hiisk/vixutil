import type { Metadata } from 'next';
import GolfHubPage from '@/components/golf/GolfHubPage';
import { hubMetadata } from '@/lib/golf/route';

export const metadata: Metadata = hubMetadata('ko');

export default function GolfHub() {
  return <GolfHubPage lang="ko" />;
}

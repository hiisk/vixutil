import type { Metadata } from 'next';
import WindchillHubPage from '@/components/windchill/WindchillHubPage';
import { hubMetadata } from '@/lib/windchill/route';

export const metadata: Metadata = hubMetadata('ko');

export default function WindchillHub() {
  return <WindchillHubPage lang="ko" />;
}

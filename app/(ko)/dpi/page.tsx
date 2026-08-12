import type { Metadata } from 'next';
import DpiHubPage from '@/components/dpi/DpiHubPage';
import { hubMetadata } from '@/lib/dpi/route';

export const metadata: Metadata = hubMetadata('ko');

export default function DpiHub() {
  return <DpiHubPage lang="ko" />;
}

import type { Metadata } from 'next';
import SunHubPage from '@/components/sun/SunHubPage';
import { hubMetadata } from '@/lib/sun/route';

export const metadata: Metadata = hubMetadata('ko');

export default function SunHub() {
  return <SunHubPage lang="ko" />;
}

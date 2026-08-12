import type { Metadata } from 'next';
import SteelHubPage from '@/components/steel/SteelHubPage';
import { hubMetadata } from '@/lib/steel/route';

export const metadata: Metadata = hubMetadata('ko');

export default function SteelHub() {
  return <SteelHubPage lang="ko" />;
}

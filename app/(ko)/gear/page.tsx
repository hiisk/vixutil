import type { Metadata } from 'next';
import GearHubPage from '@/components/gear/GearHubPage';
import { hubMetadata } from '@/lib/gear/route';

export const metadata: Metadata = hubMetadata('ko');

export default function GearHub() {
  return <GearHubPage lang="ko" />;
}

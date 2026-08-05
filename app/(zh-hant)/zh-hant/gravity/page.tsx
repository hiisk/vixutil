import type { Metadata } from 'next';
import GravityHubPage from '@/components/gravity/GravityHubPage';
import { hubMetadata } from '@/lib/gravity/route';

export const metadata: Metadata = hubMetadata('tw');

export default function GravityHub() {
  return <GravityHubPage lang="tw" />;
}

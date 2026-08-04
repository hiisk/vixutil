import type { Metadata } from 'next';
import PortHubPage from '@/components/port/PortHubPage';
import { hubMetadata } from '@/lib/port/route';

export const metadata: Metadata = hubMetadata('ja');

export default function PortHub() {
  return <PortHubPage lang="ja" />;
}

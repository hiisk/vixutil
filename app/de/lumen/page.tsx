import type { Metadata } from 'next';
import LumenHubPage from '@/components/lumen/LumenHubPage';
import { hubMetadata } from '@/lib/lumen/route';

export const metadata: Metadata = hubMetadata('de');

export default function LumenHub() {
  return <LumenHubPage lang="de" />;
}

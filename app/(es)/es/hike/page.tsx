import type { Metadata } from 'next';
import HikeHubPage from '@/components/hike/HikeHubPage';
import { hubMetadata } from '@/lib/hike/route';

export const metadata: Metadata = hubMetadata('es');

export default function HikeHub() {
  return <HikeHubPage lang="es" />;
}

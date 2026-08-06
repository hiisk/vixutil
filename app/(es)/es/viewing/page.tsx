import type { Metadata } from 'next';
import ViewingHubPage from '@/components/viewing/ViewingHubPage';
import { hubMetadata } from '@/lib/viewing/route';

export const metadata: Metadata = hubMetadata('es');

export default function ViewingHub() {
  return <ViewingHubPage lang="es" />;
}

import type { Metadata } from 'next';
import AltitudeHubPage from '@/components/altitude/AltitudeHubPage';
import { hubMetadata } from '@/lib/altitude/route';

export const metadata: Metadata = hubMetadata('es');

export default function AltitudeHub() {
  return <AltitudeHubPage lang="es" />;
}

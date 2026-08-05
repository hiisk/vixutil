import type { Metadata } from 'next';
import WindchillHubPage from '@/components/windchill/WindchillHubPage';
import { hubMetadata } from '@/lib/windchill/route';

export const metadata: Metadata = hubMetadata('es');

export default function WindchillHub() {
  return <WindchillHubPage lang="es" />;
}

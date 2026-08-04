import type { Metadata } from 'next';
import DrillHubPage from '@/components/drill/DrillHubPage';
import { hubMetadata } from '@/lib/drill/route';

export const metadata: Metadata = hubMetadata('es');

export default function DrillHub() {
  return <DrillHubPage lang="es" />;
}

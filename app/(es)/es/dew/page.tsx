import type { Metadata } from 'next';
import DewHubPage from '@/components/dew/DewHubPage';
import { hubMetadata } from '@/lib/dew/route';

export const metadata: Metadata = hubMetadata('es');

export default function DewHub() {
  return <DewHubPage lang="es" />;
}

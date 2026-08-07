import type { Metadata } from 'next';
import ExposureHubPage from '@/components/exposure/ExposureHubPage';
import { hubMetadata } from '@/lib/exposure/route';

export const metadata: Metadata = hubMetadata('es');

export default function ExposureHub() {
  return <ExposureHubPage lang="es" />;
}

import type { Metadata } from 'next';
import MicrowaveHubPage from '@/components/microwave/MicrowaveHubPage';
import { hubMetadata } from '@/lib/microwave/route';

export const metadata: Metadata = hubMetadata('es');

export default function MicrowaveHub() {
  return <MicrowaveHubPage lang="es" />;
}

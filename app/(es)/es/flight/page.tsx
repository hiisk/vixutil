import type { Metadata } from 'next';
import FlightHubPage from '@/components/flight/FlightHubPage';
import { hubMetadata } from '@/lib/flight/route';

export const metadata: Metadata = hubMetadata('es');

export default function FlightHub() {
  return <FlightHubPage lang="es" />;
}

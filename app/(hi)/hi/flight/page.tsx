import type { Metadata } from 'next';
import FlightHubPage from '@/components/flight/FlightHubPage';
import { hubMetadata } from '@/lib/flight/route';

export const metadata: Metadata = hubMetadata('hi');

export default function FlightHub() {
  return <FlightHubPage lang="hi" />;
}

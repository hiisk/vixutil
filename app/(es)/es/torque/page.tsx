import type { Metadata } from 'next';
import TorqueHubPage from '@/components/torque/TorqueHubPage';
import { hubMetadata } from '@/lib/torque/route';

export const metadata: Metadata = hubMetadata('es');

export default function TorqueHub() {
  return <TorqueHubPage lang="es" />;
}

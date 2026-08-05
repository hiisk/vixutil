import type { Metadata } from 'next';
import UvHubPage from '@/components/uv/UvHubPage';
import { hubMetadata } from '@/lib/uv/route';

export const metadata: Metadata = hubMetadata('es');

export default function UvHub() {
  return <UvHubPage lang="es" />;
}

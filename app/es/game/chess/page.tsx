import type { Metadata } from 'next';
import ChessHubPage from '@/components/chess/ChessHubPage';
import { hubMetadata } from '@/lib/chess/route';

export const metadata: Metadata = hubMetadata('es');

export default function ChessHub() {
  return <ChessHubPage lang="es" />;
}

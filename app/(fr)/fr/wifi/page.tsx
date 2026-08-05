import type { Metadata } from 'next';
import WifiHubPage from '@/components/wifi/WifiHubPage';
import { hubMetadata } from '@/lib/wifi/route';

export const metadata: Metadata = hubMetadata('fr');

export default function WifiHub() {
  return <WifiHubPage lang="fr" />;
}

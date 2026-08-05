import type { Metadata } from 'next';
import KeycodeHubPage from '@/components/keycode/KeycodeHubPage';
import { hubMetadata } from '@/lib/keycode/route';

export const metadata: Metadata = hubMetadata('fr');

export default function KeycodeHub() {
  return <KeycodeHubPage lang="fr" />;
}

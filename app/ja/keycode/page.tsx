import type { Metadata } from 'next';
import KeycodeHubPage from '@/components/keycode/KeycodeHubPage';
import { hubMetadata } from '@/lib/keycode/route';

export const metadata: Metadata = hubMetadata('ja');

export default function KeycodeHub() {
  return <KeycodeHubPage lang="ja" />;
}

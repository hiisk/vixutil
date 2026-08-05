import type { Metadata } from 'next';
import MusicHub from '@/components/MusicHub';
import { hubMetadata } from '@/lib/music/route';

export const metadata: Metadata = hubMetadata('ja');

export default function MusicHubPage() {
  return <MusicHub lang="ja" />;
}

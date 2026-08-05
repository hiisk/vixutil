import type { Metadata } from 'next';
import MusicHub from '@/components/MusicHub';
import { hubMetadata } from '@/lib/music/route';

export const metadata: Metadata = hubMetadata('en');

export default function MusicHubPage() {
  return <MusicHub lang="en" />;
}

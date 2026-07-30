import type { Metadata } from 'next';
import MetroHub from '@/components/MetroHub';
import { hubMetadata } from '@/lib/metro/route';

export const metadata: Metadata = hubMetadata('en');

export default function MetroHubPage() {
  return <MetroHub lang="en" />;
}

import type { Metadata } from 'next';
import ColorHub from '@/components/ColorHub';
import { hubMetadata } from '@/lib/color/route';

export const metadata: Metadata = hubMetadata('hi');

export default function ColorHubPage() {
  return <ColorHub lang="hi" />;
}

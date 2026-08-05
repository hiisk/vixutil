import type { Metadata } from 'next';
import GlyphHubPage from '@/components/glyph/GlyphHubPage';
import { hubMetadata } from '@/lib/glyph/route';

export const metadata: Metadata = hubMetadata('hi');

export default function GlyphHub() {
  return <GlyphHubPage lang="hi" />;
}

import type { Metadata } from 'next';
import ColorHubIntl from '@/components/ColorHubIntl';
import { alternateLanguages } from '@/lib/locales';

export const metadata: Metadata = {
  title: 'Colour Tools — Palette, Contrast, CSS Gradient',
  description: 'Free colour tools: palette generator, shade scale, contrast checker, colour blindness simulator, CSS gradient and box-shadow. Runs in your browser, no install.',
  alternates: {
    canonical: '/en/color',
    languages: alternateLanguages('/color'),
  },
};

export default function EnColorHub() {
  return <ColorHubIntl lang="en" />;
}

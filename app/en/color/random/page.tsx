import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import RandomTool from '@/components/color/RandomTool';
import { alternateLanguages } from '@/lib/locales';

export const metadata: Metadata = {
  title: 'Random Colour Generator — Reroll a Palette With Locks',
  description: 'Generates five random colours. Lock the ones you like and reroll only the rest, so you can spin through combinations quickly until something works.',
  alternates: {
    canonical: '/en/color/random',
    languages: alternateLanguages('/color/random'),
  },
};

export default function EnColorRandomPage() {
  return (
    <ColorShellIntl slug="random" lang="en">
      <RandomTool lang="en" />
    </ColorShellIntl>
  );
}

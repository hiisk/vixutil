import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import RandomTool from '@/components/color/RandomTool';
import { alternateLanguages } from '@/lib/locales';

export const metadata: Metadata = {
  title: 'Zufallsfarben-Generator — Palette mit Sperren neu würfeln',
  description: 'Erzeugt fünf Zufallsfarben. Sperre die, die dir gefallen, und würfle nur den Rest neu — so kommst du schnell durch viele Kombinationen, bis eine passt.',
  alternates: {
    canonical: '/de/color/random',
    languages: alternateLanguages('/color/random'),
  },
};

export default function DeColorRandomPage() {
  return (
    <ColorShellIntl slug="random" lang="de">
      <RandomTool lang="de" />
    </ColorShellIntl>
  );
}

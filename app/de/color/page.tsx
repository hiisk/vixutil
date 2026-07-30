import type { Metadata } from 'next';
import ColorHubIntl from '@/components/ColorHubIntl';
import { alternateLanguages } from '@/lib/locales';

export const metadata: Metadata = {
  title: 'Farbwerkzeuge — Paletten, Kontrast, CSS-Verläufe',
  description: 'Kostenlose Farbwerkzeuge: Palettengenerator, Farbabstufungen, Kontrast-Prüfer, Farbenblindheit-Simulator, CSS-Verlauf und Schatten. Läuft im Browser, ohne Installation.',
  alternates: {
    canonical: '/de/color',
    languages: alternateLanguages('/color'),
  },
};

export default function DeColorHub() {
  return <ColorHubIntl lang="de" />;
}

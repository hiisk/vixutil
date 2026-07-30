import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import TemperatureTool from '@/components/color/TemperatureTool';
import { alternateLanguages } from '@/lib/locales';

export const metadata: Metadata = {
  title: 'Temperatura de cor — Converter kelvin para RGB',
  description: 'Veja como o branco quente de 2700 K realmente aparece, e o quanto a luz do dia de 6500 K é azulada. Útil ao escolher iluminação ou para pegar o jeito do balanço de branco na fotografia.',
  alternates: {
    canonical: '/pt-br/color/temperature',
    languages: alternateLanguages('/color/temperature'),
  },
};

export default function PtBrColorTemperaturePage() {
  return (
    <ColorShellIntl slug="temperature" lang="pt-br">
      <TemperatureTool lang="pt-br" />
    </ColorShellIntl>
  );
}

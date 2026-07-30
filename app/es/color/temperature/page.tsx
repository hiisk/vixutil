import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import TemperatureTool from '@/components/color/TemperatureTool';
import { alternateLanguages } from '@/lib/locales';

export const metadata: Metadata = {
  title: 'Temperatura de color — Convertir kelvin a RGB',
  description: 'Mira qué aspecto tiene de verdad el blanco cálido de 2700 K y lo azul que es la luz de día de 6500 K. Útil al elegir iluminación o para hacerse una idea del balance de blancos en fotografía.',
  alternates: {
    canonical: '/es/color/temperature',
    languages: alternateLanguages('/color/temperature'),
  },
};

export default function EsColorTemperaturePage() {
  return (
    <ColorShellIntl slug="temperature" lang="es">
      <TemperatureTool lang="es" />
    </ColorShellIntl>
  );
}

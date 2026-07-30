import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import NameTool from '@/components/color/NameTool';
import { alternateLanguages } from '@/lib/locales';

export const metadata: Metadata = {
  title: 'Farbnamen finden — Nächstgelegener Farbname zu einem HEX',
  description: 'Gib einen Farbcode ein, und der nächstgelegene benannte Farbton wird gefunden — Koralle, Petrol, Karmesin — samt HEX, RGB, HSL und CMYK. Für den Fall, dass du eine Farbe in Worten beschreiben musst.',
  alternates: {
    canonical: '/de/color/name',
    languages: alternateLanguages('/color/name'),
  },
};

export default function DeColorNamePage() {
  return (
    <ColorShellIntl slug="name" lang="de">
      <NameTool lang="de" />
    </ColorShellIntl>
  );
}

import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import ToneTool from '@/components/sound/ToneTool';
import { soundMetaIntl } from '@/lib/sound-tools-intl';

export const metadata: Metadata = soundMetaIntl('es', 'tone');

export default function EsSoundTonePage() {
  return (
    <SoundShellIntl slug="tone" lang="es">
      <ToneTool lang="es" />
    </SoundShellIntl>
  );
}

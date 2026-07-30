import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import BinauralTool from '@/components/sound/BinauralTool';
import { soundMetaIntl } from '@/lib/sound-tools-intl';

export const metadata: Metadata = soundMetaIntl('es', 'binaural');

export default function EsSoundBinauralPage() {
  return (
    <SoundShellIntl slug="binaural" lang="es">
      <BinauralTool lang="es" />
    </SoundShellIntl>
  );
}

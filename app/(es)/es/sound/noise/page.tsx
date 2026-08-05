import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import NoiseTool from '@/components/sound/NoiseTool';
import { soundMetaIntl } from '@/lib/sound-tools-intl';

export const metadata: Metadata = soundMetaIntl('es', 'noise');

export default function EsSoundNoisePage() {
  return (
    <SoundShellIntl slug="noise" lang="es">
      <NoiseTool lang="es" />
    </SoundShellIntl>
  );
}

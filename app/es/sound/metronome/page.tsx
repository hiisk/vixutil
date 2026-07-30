import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import MetronomeTool from '@/components/sound/MetronomeTool';
import { soundMetaIntl } from '@/lib/sound-tools-intl';

export const metadata: Metadata = soundMetaIntl('es', 'metronome');

export default function EsSoundMetronomePage() {
  return (
    <SoundShellIntl slug="metronome" lang="es">
      <MetronomeTool lang="es" />
    </SoundShellIntl>
  );
}

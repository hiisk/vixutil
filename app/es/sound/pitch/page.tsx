import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import PitchTool from '@/components/sound/PitchTool';
import { soundMetaIntl } from '@/lib/sound-tools-intl';

export const metadata: Metadata = soundMetaIntl('es', 'pitch');

export default function EsSoundPitchPage() {
  return (
    <SoundShellIntl slug="pitch" lang="es">
      <PitchTool lang="es" />
    </SoundShellIntl>
  );
}

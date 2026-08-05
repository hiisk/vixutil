import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import TunerTool from '@/components/sound/TunerTool';
import { soundMetaIntl } from '@/lib/sound-tools-intl';

export const metadata: Metadata = soundMetaIntl('es', 'tuner');

export default function EsSoundTunerPage() {
  return (
    <SoundShellIntl slug="tuner" lang="es">
      <TunerTool lang="es" />
    </SoundShellIntl>
  );
}

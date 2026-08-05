import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import DecibelTool from '@/components/sound/DecibelTool';
import { soundMetaIntl } from '@/lib/sound-tools-intl';

export const metadata: Metadata = soundMetaIntl('es', 'decibel');

export default function EsSoundDecibelPage() {
  return (
    <SoundShellIntl slug="decibel" lang="es">
      <DecibelTool lang="es" />
    </SoundShellIntl>
  );
}

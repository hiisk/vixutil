import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import BpmTapTool from '@/components/sound/BpmTapTool';
import { soundMetaIntl } from '@/lib/sound-tools-intl';

export const metadata: Metadata = soundMetaIntl('es', 'bpm-tap');

export default function EsSoundBpmTapPage() {
  return (
    <SoundShellIntl slug="bpm-tap" lang="es">
      <BpmTapTool lang="es" />
    </SoundShellIntl>
  );
}

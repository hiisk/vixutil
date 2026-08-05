import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import RecorderTool from '@/components/sound/RecorderTool';
import { soundMetaIntl } from '@/lib/sound-tools-intl';

export const metadata: Metadata = soundMetaIntl('es', 'recorder');

export default function EsSoundRecorderPage() {
  return (
    <SoundShellIntl slug="recorder" lang="es">
      <RecorderTool lang="es" />
    </SoundShellIntl>
  );
}

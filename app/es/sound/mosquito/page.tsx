import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import MosquitoTool from '@/components/sound/MosquitoTool';
import { soundMetaIntl } from '@/lib/sound-tools-intl';

export const metadata: Metadata = soundMetaIntl('es', 'mosquito');

export default function EsSoundMosquitoPage() {
  return (
    <SoundShellIntl slug="mosquito" lang="es">
      <MosquitoTool lang="es" />
    </SoundShellIntl>
  );
}

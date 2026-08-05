import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import MosquitoTool from '@/components/sound/MosquitoTool';
import { soundMetaIntl } from '@/lib/sound-tools-intl';

export const metadata: Metadata = soundMetaIntl('de', 'mosquito');

export default function DeSoundMosquitoPage() {
  return (
    <SoundShellIntl slug="mosquito" lang="de">
      <MosquitoTool lang="de" />
    </SoundShellIntl>
  );
}

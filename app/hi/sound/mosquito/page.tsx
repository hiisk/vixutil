import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import MosquitoTool from '@/components/sound/MosquitoTool';
import { soundMetaIntl } from '@/lib/sound-tools-intl';

export const metadata: Metadata = soundMetaIntl('hi', 'mosquito');

export default function HiSoundMosquitoPage() {
  return (
    <SoundShellIntl slug="mosquito" lang="hi">
      <MosquitoTool lang="hi" />
    </SoundShellIntl>
  );
}

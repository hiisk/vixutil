import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import MosquitoTool from '@/components/sound/MosquitoTool';
import { soundMetaIntl } from '@/lib/sound-tools-intl';

export const metadata: Metadata = soundMetaIntl('en', 'mosquito');

export default function EnSoundMosquitoPage() {
  return (
    <SoundShellIntl slug="mosquito" lang="en">
      <MosquitoTool lang="en" />
    </SoundShellIntl>
  );
}

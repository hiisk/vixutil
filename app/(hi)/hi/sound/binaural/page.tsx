import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import BinauralTool from '@/components/sound/BinauralTool';
import { soundMetaIntl } from '@/lib/sound-tools-intl';

export const metadata: Metadata = soundMetaIntl('hi', 'binaural');

export default function HiSoundBinauralPage() {
  return (
    <SoundShellIntl slug="binaural" lang="hi">
      <BinauralTool lang="hi" />
    </SoundShellIntl>
  );
}

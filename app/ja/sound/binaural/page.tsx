import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import BinauralTool from '@/components/sound/BinauralTool';
import { soundMetaIntl } from '@/lib/sound-tools-intl';

export const metadata: Metadata = soundMetaIntl('ja', 'binaural');

export default function JaSoundBinauralPage() {
  return (
    <SoundShellIntl slug="binaural" lang="ja">
      <BinauralTool lang="ja" />
    </SoundShellIntl>
  );
}

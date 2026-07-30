import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import ToneTool from '@/components/sound/ToneTool';
import { soundMetaIntl } from '@/lib/sound-tools-intl';

export const metadata: Metadata = soundMetaIntl('ja', 'tone');

export default function JaSoundTonePage() {
  return (
    <SoundShellIntl slug="tone" lang="ja">
      <ToneTool lang="ja" />
    </SoundShellIntl>
  );
}

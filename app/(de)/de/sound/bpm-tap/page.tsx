import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import BpmTapTool from '@/components/sound/BpmTapTool';
import { soundMetaIntl } from '@/lib/sound-tools-intl';

export const metadata: Metadata = soundMetaIntl('de', 'bpm-tap');

export default function DeSoundBpmTapPage() {
  return (
    <SoundShellIntl slug="bpm-tap" lang="de">
      <BpmTapTool lang="de" />
    </SoundShellIntl>
  );
}

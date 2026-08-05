import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import BpmTapTool from '@/components/sound/BpmTapTool';
import { soundMetaIntl } from '@/lib/sound-tools-intl';

export const metadata: Metadata = soundMetaIntl('en', 'bpm-tap');

export default function EnSoundBpmTapPage() {
  return (
    <SoundShellIntl slug="bpm-tap" lang="en">
      <BpmTapTool lang="en" />
    </SoundShellIntl>
  );
}

import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import DecibelTool from '@/components/sound/DecibelTool';
import { soundMetaIntl } from '@/lib/sound-tools-intl';

export const metadata: Metadata = soundMetaIntl('en', 'decibel');

export default function EnSoundDecibelPage() {
  return (
    <SoundShellIntl slug="decibel" lang="en">
      <DecibelTool lang="en" />
    </SoundShellIntl>
  );
}

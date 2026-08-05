import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import ToneTool from '@/components/sound/ToneTool';
import { soundMetaIntl } from '@/lib/sound-tools-intl';

export const metadata: Metadata = soundMetaIntl('zh-hant', 'tone');

export default function ZhHantSoundTonePage() {
  return (
    <SoundShellIntl slug="tone" lang="zh-hant">
      <ToneTool lang="zh-hant" />
    </SoundShellIntl>
  );
}

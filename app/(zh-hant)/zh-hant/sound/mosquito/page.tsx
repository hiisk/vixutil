import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import MosquitoTool from '@/components/sound/MosquitoTool';
import { soundMetaIntl } from '@/lib/sound-tools-intl';

export const metadata: Metadata = soundMetaIntl('zh-hant', 'mosquito');

export default function ZhHantSoundMosquitoPage() {
  return (
    <SoundShellIntl slug="mosquito" lang="zh-hant">
      <MosquitoTool lang="zh-hant" />
    </SoundShellIntl>
  );
}

import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import MosquitoTool from '@/components/sound/MosquitoTool';
import { soundMetaIntl } from '@/lib/sound-tools-intl';

export const metadata: Metadata = soundMetaIntl('zh-hans', 'mosquito');

export default function ZhHansSoundMosquitoPage() {
  return (
    <SoundShellIntl slug="mosquito" lang="zh-hans">
      <MosquitoTool lang="zh-hans" />
    </SoundShellIntl>
  );
}

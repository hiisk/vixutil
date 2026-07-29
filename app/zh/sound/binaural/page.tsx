import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import BinauralTool from '@/components/sound/BinauralTool';

export const metadata: Metadata = {
  title: '双耳节拍 — Delta、Theta、Alpha、Beta',
  description: '给左右耳送入略有差异的频率，你会感觉到一个等于差值的缓慢拍频。必须戴耳机，而且关于其效果的科学依据目前仍不明确。',
  alternates: {
    canonical: '/zh/sound/binaural',
    languages: { 'en': '/en/sound/binaural', 'zh': '/zh/sound/binaural', 'ko': '/sound/binaural', 'x-default': '/en/sound/binaural' },
  },
};

export default function ZhSoundBinauralPage() {
  return (
    <SoundShellIntl slug="binaural" lang="zh">
      <BinauralTool lang="zh" />
    </SoundShellIntl>
  );
}

import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import NoiseTool from '@/components/sound/NoiseTool';

export const metadata: Metadata = {
  title: '白噪音 — 免费播放白／粉／褐噪音',
  description: '生成并播放白噪音、粉噪音、褐噪音三种。它靠盖住周围的声音来帮助专注或入睡；低频更强的褐噪音最接近海浪声，听久了也不太累耳。',
  alternates: {
    canonical: '/zh/sound/noise',
    languages: { 'en': '/en/sound/noise', 'zh': '/zh/sound/noise', 'ko': '/sound/noise', 'x-default': '/en/sound/noise' },
  },
};

export default function ZhSoundNoisePage() {
  return (
    <SoundShellIntl slug="noise" lang="zh">
      <NoiseTool lang="zh" />
    </SoundShellIntl>
  );
}

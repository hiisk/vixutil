import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import ToneTool from '@/components/sound/ToneTool';

export const metadata: Metadata = {
  title: '在线频率发生器 — 播放任意 Hz 正弦波',
  description: '生成 20Hz 到 20kHz 之间任意频率的声音。可以选正弦波、方波、锯齿波，用来检查音箱、给乐器一个基准音，或做些简单实验。',
  alternates: {
    canonical: '/zh/sound/tone',
    languages: { 'en': '/en/sound/tone', 'zh': '/zh/sound/tone', 'ko': '/sound/tone', 'x-default': '/en/sound/tone' },
  },
};

export default function ZhSoundTonePage() {
  return (
    <SoundShellIntl slug="tone" lang="zh">
      <ToneTool lang="zh" />
    </SoundShellIntl>
  );
}

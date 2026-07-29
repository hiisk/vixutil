import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import PitchTool from '@/components/sound/PitchTool';

export const metadata: Metadata = {
  title: '音程听辨训练 — 免费练相对音高',
  description: '它会依次播放两个音，你来判断它们之间的音程（大三度、纯五度等）。不需要绝对音感，只要熟悉了音之间的距离，和弦与旋律就好听懂多了。',
  alternates: {
    canonical: '/zh/sound/pitch',
    languages: { 'en': '/en/sound/pitch', 'zh': '/zh/sound/pitch', 'ko': '/sound/pitch', 'x-default': '/en/sound/pitch' },
  },
};

export default function ZhSoundPitchPage() {
  return (
    <SoundShellIntl slug="pitch" lang="zh">
      <PitchTool lang="zh" />
    </SoundShellIntl>
  );
}

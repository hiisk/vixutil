import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import MetronomeTool from '@/components/sound/MetronomeTool';

export const metadata: Metadata = {
  title: '在线节拍器 — 免费，可调 BPM',
  description: '设定 BPM 后，它会按精确的间隔发出节拍声。选好四四拍这类拍号，第一拍会加重音，靠耳朵就能知道现在是第几拍。',
  alternates: {
    canonical: '/zh/sound/metronome',
    languages: { 'en': '/en/sound/metronome', 'zh': '/zh/sound/metronome', 'ko': '/sound/metronome', 'x-default': '/en/sound/metronome' },
  },
};

export default function ZhSoundMetronomePage() {
  return (
    <SoundShellIntl slug="metronome" lang="zh">
      <MetronomeTool lang="zh" />
    </SoundShellIntl>
  );
}

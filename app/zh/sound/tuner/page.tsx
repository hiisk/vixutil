import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import TunerTool from '@/components/sound/TunerTool';

export const metadata: Metadata = {
  title: '在线调音器 — 吉他、尤克里里免费调音',
  description: '对着麦克风弹一下，它会告诉你这是什么音，以及比标准音高了还是低了多少音分。吉他、尤克里里、贝斯的空弦标准音也可以直接听。',
  alternates: {
    canonical: '/zh/sound/tuner',
    languages: { 'en': '/en/sound/tuner', 'zh': '/zh/sound/tuner', 'ko': '/sound/tuner', 'x-default': '/en/sound/tuner' },
  },
};

export default function ZhSoundTunerPage() {
  return (
    <SoundShellIntl slug="tuner" lang="zh">
      <TunerTool lang="zh" />
    </SoundShellIntl>
  );
}

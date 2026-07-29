import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import BpmTapTool from '@/components/sound/BpmTapTool';

export const metadata: Metadata = {
  title: 'BPM 测速 — 敲击测出歌曲速度',
  description: '跟着音乐随便敲键盘，它就会算出每分钟拍数（BPM）。大约敲八次数值就稳定了，而且它以最近的几拍为主，所以中途变速也跟得上。',
  alternates: {
    canonical: '/zh/sound/bpm-tap',
    languages: { 'en': '/en/sound/bpm-tap', 'zh': '/zh/sound/bpm-tap', 'ko': '/sound/bpm-tap', 'x-default': '/en/sound/bpm-tap' },
  },
};

export default function ZhSoundBpmTapPage() {
  return (
    <SoundShellIntl slug="bpm-tap" lang="zh">
      <BpmTapTool lang="zh" />
    </SoundShellIntl>
  );
}

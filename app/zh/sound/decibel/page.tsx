import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import DecibelTool from '@/components/sound/DecibelTool';

export const metadata: Metadata = {
  title: '噪音测量 — 用麦克风查看环境噪音',
  description: '把麦克风收到的声音大小以相对分贝显示。可以和图书馆、交谈、地铁这些参照对比，估个大概。各设备麦克风不同，所以这不是绝对值。',
  alternates: {
    canonical: '/zh/sound/decibel',
    languages: { 'en': '/en/sound/decibel', 'zh': '/zh/sound/decibel', 'ko': '/sound/decibel', 'x-default': '/en/sound/decibel' },
  },
};

export default function ZhSoundDecibelPage() {
  return (
    <SoundShellIntl slug="decibel" lang="zh">
      <DecibelTool lang="zh" />
    </SoundShellIntl>
  );
}

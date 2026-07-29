import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import MosquitoTool from '@/components/sound/MosquitoTool';

export const metadata: Metadata = {
  title: '蚊子音 — 试听 17kHz 高频',
  description: '17kHz 上下的高频，随着年龄增长会越来越听不见。因为据说只有青少年听得到，所以被叫做蚊子音 —— 逐个频率试听，看看自己能听到哪儿。',
  alternates: {
    canonical: '/zh/sound/mosquito',
    languages: { 'en': '/en/sound/mosquito', 'zh': '/zh/sound/mosquito', 'ko': '/sound/mosquito', 'x-default': '/en/sound/mosquito' },
  },
};

export default function ZhSoundMosquitoPage() {
  return (
    <SoundShellIntl slug="mosquito" lang="zh">
      <MosquitoTool lang="zh" />
    </SoundShellIntl>
  );
}

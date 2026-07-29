import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import SpeakerTest from '@/components/device/SpeakerTest';

export const metadata: Metadata = {
  title: '音箱测试 — 在线检查左右声道与频率',
  description: '分别让左右两边发声，确认声道没有对调、也没有哪一边不出声。还可以从 20Hz 一路调到 16kHz，看看自己的耳机和耳朵到底能到哪。',
  alternates: {
    canonical: '/zh/device/speaker',
    languages: { 'en': '/en/device/speaker', 'zh': '/zh/device/speaker', 'ko': '/device/speaker', 'x-default': '/en/device/speaker' },
  },
};

export default function ZhDeviceSpeakerPage() {
  return (
    <DeviceShellIntl slug="speaker" lang="zh">
      <SpeakerTest lang="zh" />
    </DeviceShellIntl>
  );
}

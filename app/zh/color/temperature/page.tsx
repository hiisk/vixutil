import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import TemperatureTool from '@/components/color/TemperatureTool';

export const metadata: Metadata = {
  title: '色温换算 — 开尔文（K）转 RGB',
  description: '看看 2700K 暖白光实际是什么颜色，6500K 日光又有多蓝。选灯具或理解摄影白平衡时很有帮助。',
  alternates: {
    canonical: '/zh/color/temperature',
    languages: { 'en': '/en/color/temperature', 'zh': '/zh/color/temperature', 'ko': '/color/temperature', 'x-default': '/en/color/temperature' },
  },
};

export default function ZhTemperaturePage() {
  return (
    <ColorShellIntl slug="temperature" lang="zh">
      <TemperatureTool lang="zh" />
    </ColorShellIntl>
  );
}

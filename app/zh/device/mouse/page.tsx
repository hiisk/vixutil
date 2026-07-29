import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import MouseTest from '@/components/device/MouseTest';

export const metadata: Metadata = {
  title: '鼠标点击测试 — 检查按键与双击连击问题',
  description: '检查左键、右键、中键、侧键是否都能识别，以及按一次是否变成了两次（连击），依据是点击间隔（毫秒）。滚轮方向和光标移动的轮询频率也一并显示。',
  alternates: {
    canonical: '/zh/device/mouse',
    languages: { 'en': '/en/device/mouse', 'zh': '/zh/device/mouse', 'ko': '/device/mouse', 'x-default': '/en/device/mouse' },
  },
};

export default function ZhDeviceMousePage() {
  return (
    <DeviceShellIntl slug="mouse" lang="zh">
      <MouseTest lang="zh" />
    </DeviceShellIntl>
  );
}

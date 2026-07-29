import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import RefreshRateTest from '@/components/device/RefreshRateTest';

export const metadata: Metadata = {
  title: '刷新率测试 — 测显示器的真实 Hz',
  description: '不是看设置里写的数字，而是测这块屏幕现在每秒实际画了多少次。买了 144Hz 却一直用在 60Hz 是很常见的事，这里能立刻查出来。',
  alternates: {
    canonical: '/zh/device/refresh-rate',
    languages: { 'en': '/en/device/refresh-rate', 'zh': '/zh/device/refresh-rate', 'ko': '/device/refresh-rate', 'x-default': '/en/device/refresh-rate' },
  },
};

export default function ZhDeviceRefreshRatePage() {
  return (
    <DeviceShellIntl slug="refresh-rate" lang="zh">
      <RefreshRateTest lang="zh" />
    </DeviceShellIntl>
  );
}

import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import MonitorTest from '@/components/device/MonitorTest';

export const metadata: Metadata = {
  title: '屏幕坏点检测 — 查死点、亮点与漏光',
  description: '用红、绿、蓝、白、黑铺满全屏，找出一直不亮的点（死点）、一直亮着的点（亮点），以及边缘的漏光和斑块。新显示器到手那天最该先做的检查。',
  alternates: {
    canonical: '/zh/device/monitor',
    languages: { 'en': '/en/device/monitor', 'zh': '/zh/device/monitor', 'ko': '/device/monitor', 'x-default': '/en/device/monitor' },
  },
};

export default function ZhDeviceMonitorPage() {
  return (
    <DeviceShellIntl slug="monitor" lang="zh">
      <MonitorTest lang="zh" />
    </DeviceShellIntl>
  );
}

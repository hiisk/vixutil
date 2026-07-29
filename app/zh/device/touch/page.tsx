import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import TouchTest from '@/components/device/TouchTest';

export const metadata: Metadata = {
  title: '触摸屏测试 — 多点触控与失灵区域检查',
  description: '按屏幕查看触摸坐标和同时识别的点数，再用手指划过去，找出有没有没反应的区域。换过屏幕、或者屏幕偶尔失灵时用它。',
  alternates: {
    canonical: '/zh/device/touch',
    languages: { 'en': '/en/device/touch', 'zh': '/zh/device/touch', 'ko': '/device/touch', 'x-default': '/en/device/touch' },
  },
};

export default function ZhDeviceTouchPage() {
  return (
    <DeviceShellIntl slug="touch" lang="zh">
      <TouchTest lang="zh" />
    </DeviceShellIntl>
  );
}

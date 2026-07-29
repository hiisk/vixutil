import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import DeviceInfo from '@/components/device/DeviceInfo';

export const metadata: Metadata = {
  title: '我的设备信息 — 查看分辨率、浏览器与操作系统',
  description: '当前的屏幕分辨率与浏览器窗口大小、像素比、浏览器与操作系统版本，还有 CPU 核心数，全在一个页面上。要请人远程协助或被问配置时，直接复制发过去就行。',
  alternates: {
    canonical: '/zh/device/info',
    languages: { 'en': '/en/device/info', 'zh': '/zh/device/info', 'ko': '/device/info', 'x-default': '/en/device/info' },
  },
};

export default function ZhDeviceInfoPage() {
  return (
    <DeviceShellIntl slug="info" lang="zh">
      <DeviceInfo lang="zh" />
    </DeviceShellIntl>
  );
}

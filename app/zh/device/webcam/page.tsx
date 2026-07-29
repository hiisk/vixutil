import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import WebcamTest from '@/components/device/WebcamTest';

export const metadata: Metadata = {
  title: '在线摄像头测试 — 免安装检查相机',
  description: '确认摄像头能开、看它输出的分辨率和帧率，再拍张快照看画质。视频只在这个浏览器内播放，不会发送到服务器。',
  alternates: {
    canonical: '/zh/device/webcam',
    languages: { 'en': '/en/device/webcam', 'zh': '/zh/device/webcam', 'ko': '/device/webcam', 'x-default': '/en/device/webcam' },
  },
};

export default function ZhDeviceWebcamPage() {
  return (
    <DeviceShellIntl slug="webcam" lang="zh">
      <WebcamTest lang="zh" />
    </DeviceShellIntl>
  );
}

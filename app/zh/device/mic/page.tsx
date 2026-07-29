import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import MicTest from '@/components/device/MicTest';

export const metadata: Metadata = {
  title: '在线麦克风测试 — 检查输入音量并录音',
  description: '用实时电平表确认麦克风有没有收到声音，再录几秒回放，听听实际听起来是什么样。视频会议或开游戏前一分钟的检查。',
  alternates: {
    canonical: '/zh/device/mic',
    languages: { 'en': '/en/device/mic', 'zh': '/zh/device/mic', 'ko': '/device/mic', 'x-default': '/en/device/mic' },
  },
};

export default function ZhDeviceMicPage() {
  return (
    <DeviceShellIntl slug="mic" lang="zh">
      <MicTest lang="zh" />
    </DeviceShellIntl>
  );
}

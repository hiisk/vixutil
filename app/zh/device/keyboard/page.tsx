import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import KeyboardTest from '@/components/device/KeyboardTest';

export const metadata: Metadata = {
  title: '在线键盘测试 — 检查按键与 N 键无冲',
  description: '按下按键，屏幕上的虚拟键盘就会亮起。没反应的键、按一次却输入两次的键、最多能同时识别几个键（N 键无冲），都能在浏览器里直接查。',
  alternates: {
    canonical: '/zh/device/keyboard',
    languages: { 'en': '/en/device/keyboard', 'zh': '/zh/device/keyboard', 'ko': '/device/keyboard', 'x-default': '/en/device/keyboard' },
  },
};

export default function ZhDeviceKeyboardPage() {
  return (
    <DeviceShellIntl slug="keyboard" lang="zh">
      <KeyboardTest lang="zh" />
    </DeviceShellIntl>
  );
}

import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import GamepadTest from '@/components/device/GamepadTest';

export const metadata: Metadata = {
  title: '手柄测试 — 检查按键与摇杆漂移',
  description: '连上手柄按按键确认能否识别，再松开摇杆看坐标会不会自己乱动（摇杆漂移）。Xbox、PlayStation、任天堂系列手柄都通过浏览器标准 API 识别。',
  alternates: {
    canonical: '/zh/device/gamepad',
    languages: { 'en': '/en/device/gamepad', 'zh': '/zh/device/gamepad', 'ko': '/device/gamepad', 'x-default': '/en/device/gamepad' },
  },
};

export default function ZhDeviceGamepadPage() {
  return (
    <DeviceShellIntl slug="gamepad" lang="zh">
      <GamepadTest lang="zh" />
    </DeviceShellIntl>
  );
}

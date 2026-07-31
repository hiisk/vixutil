import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import GamepadTest from '@/components/device/GamepadTest';
import { deviceMetaIntl } from '@/lib/device-tools-intl';

export const metadata: Metadata = deviceMetaIntl('zh-hans', 'gamepad');

export default function ZhHansDeviceGamepadPage() {
  return (
    <DeviceShellIntl slug="gamepad" lang="zh-hans">
      <GamepadTest lang="zh-hans" />
    </DeviceShellIntl>
  );
}

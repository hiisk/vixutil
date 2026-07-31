import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import GamepadTest from '@/components/device/GamepadTest';
import { deviceMetaIntl } from '@/lib/device-tools-intl';

export const metadata: Metadata = deviceMetaIntl('zh-hant', 'gamepad');

export default function ZhHantDeviceGamepadPage() {
  return (
    <DeviceShellIntl slug="gamepad" lang="zh-hant">
      <GamepadTest lang="zh-hant" />
    </DeviceShellIntl>
  );
}

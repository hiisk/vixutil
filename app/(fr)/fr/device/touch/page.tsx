import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import TouchTest from '@/components/device/TouchTest';
import { deviceMetaIntl } from '@/lib/device-tools-intl';

export const metadata: Metadata = deviceMetaIntl('fr', 'touch');

export default function FrDeviceTouchPage() {
  return (
    <DeviceShellIntl slug="touch" lang="fr">
      <TouchTest lang="fr" />
    </DeviceShellIntl>
  );
}

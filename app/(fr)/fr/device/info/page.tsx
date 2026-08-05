import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import DeviceInfo from '@/components/device/DeviceInfo';
import { deviceMetaIntl } from '@/lib/device-tools-intl';

export const metadata: Metadata = deviceMetaIntl('fr', 'info');

export default function FrDeviceInfoPage() {
  return (
    <DeviceShellIntl slug="info" lang="fr">
      <DeviceInfo lang="fr" />
    </DeviceShellIntl>
  );
}

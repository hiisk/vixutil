import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import DeviceInfo from '@/components/device/DeviceInfo';

export const metadata: Metadata = {
  title: 'My Device Info — Check Screen Resolution, Browser and OS',
  description: 'Your screen resolution and browser window size, pixel ratio, browser and operating system version, and CPU core count — all on one screen. Copy it straight out when you are asking for remote support or someone asks about your specs.',
  alternates: {
    canonical: '/en/device/info',
    languages: { 'en': '/en/device/info', 'ko': '/device/info', 'x-default': '/en/device/info' },
  },
};

export default function EnDeviceInfoPage() {
  return (
    <DeviceShellIntl slug="info" lang="en">
      <DeviceInfo lang="en" />
    </DeviceShellIntl>
  );
}

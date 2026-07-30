import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import RefreshRateTest from '@/components/device/RefreshRateTest';

export const metadata: Metadata = {
  title: 'Refresh Rate Test — Measure Your Real Monitor Hz',
  description: 'Not the number in your settings — how many times per second this screen is actually drawing. Buying a 144Hz monitor and running it at 60Hz is a common mistake, and this catches it immediately.',
  alternates: {
    canonical: '/en/device/refresh-rate',
    languages: { 'en': '/en/device/refresh-rate', 'ko': '/device/refresh-rate', 'x-default': '/en/device/refresh-rate' },
  },
};

export default function EnDeviceRefreshRatePage() {
  return (
    <DeviceShellIntl slug="refresh-rate" lang="en">
      <RefreshRateTest lang="en" />
    </DeviceShellIntl>
  );
}

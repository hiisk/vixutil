import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import SpeakerTest from '@/components/device/SpeakerTest';
import { deviceMetaIntl } from '@/lib/device-tools-intl';

export const metadata: Metadata = deviceMetaIntl('en', 'speaker');

export default function EnDeviceSpeakerPage() {
  return (
    <DeviceShellIntl slug="speaker" lang="en">
      <SpeakerTest lang="en" />
    </DeviceShellIntl>
  );
}

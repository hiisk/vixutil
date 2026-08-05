import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import SpeakerTest from '@/components/device/SpeakerTest';
import { deviceMetaIntl } from '@/lib/device-tools-intl';

export const metadata: Metadata = deviceMetaIntl('zh-hans', 'speaker');

export default function ZhHansDeviceSpeakerPage() {
  return (
    <DeviceShellIntl slug="speaker" lang="zh-hans">
      <SpeakerTest lang="zh-hans" />
    </DeviceShellIntl>
  );
}

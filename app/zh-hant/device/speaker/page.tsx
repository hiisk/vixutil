import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import SpeakerTest from '@/components/device/SpeakerTest';
import { deviceMetaIntl } from '@/lib/device-tools-intl';

export const metadata: Metadata = deviceMetaIntl('zh-hant', 'speaker');

export default function ZhHantDeviceSpeakerPage() {
  return (
    <DeviceShellIntl slug="speaker" lang="zh-hant">
      <SpeakerTest lang="zh-hant" />
    </DeviceShellIntl>
  );
}

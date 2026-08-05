import type { Metadata } from 'next';
import { alternateLanguages10 } from '@/lib/locales';
import DeviceShell from '@/components/DeviceShell';
import MicTest from '@/components/device/MicTest';

export const metadata: Metadata = {
  title: '마이크 테스트 - 입력 볼륨·녹음 확인',
  description: '마이크가 소리를 받고 있는지 실시간 레벨 미터로 확인하고, 몇 초 녹음해 바로 들어보며 실제로 어떻게 들리는지 점검합니다. 화상회의·게임 전 1분 점검용입니다.',
  alternates: {
    canonical: '/device/mic',
    languages: alternateLanguages10('/device/mic'),
  },
};

export default function Page() {
  return (
    <DeviceShell slug="mic">
      <MicTest />
    </DeviceShell>
  );
}

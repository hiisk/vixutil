import type { Metadata } from 'next';
import { alternateLanguages } from '@/lib/locales';
import DeviceShell from '@/components/DeviceShell';
import RefreshRateTest from '@/components/device/RefreshRateTest';

export const metadata: Metadata = {
  title: '모니터 주사율 테스트 - 실제 Hz 측정',
  description: '설정에 적힌 숫자 말고 지금 이 화면이 실제로 초당 몇 번 그려지는지 잽니다. 144Hz 모니터를 사고도 60Hz로 쓰고 있는 경우가 흔한데, 그걸 바로 확인할 수 있습니다.',
  alternates: {
    canonical: '/device/refresh-rate',
    languages: alternateLanguages('/device/refresh-rate'),
  },
};

export default function Page() {
  return (
    <DeviceShell slug="refresh-rate">
      <RefreshRateTest />
    </DeviceShell>
  );
}

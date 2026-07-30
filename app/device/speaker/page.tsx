import type { Metadata } from 'next';
import { alternateLanguages } from '@/lib/locales';
import DeviceShell from '@/components/DeviceShell';
import SpeakerTest from '@/components/device/SpeakerTest';

export const metadata: Metadata = {
  title: '스피커·이어폰 테스트 - 좌우 채널·주파수 확인',
  description: '왼쪽·오른쪽을 따로 울려 채널이 바뀌지 않았는지, 한쪽만 안 나오지는 않는지 확인합니다. 20Hz~16kHz 주파수를 직접 올려가며 내 이어폰과 귀가 어디까지 들리는지도 볼 수 있습니다.',
  alternates: {
    canonical: '/device/speaker',
    languages: alternateLanguages('/device/speaker'),
  },
};

export default function Page() {
  return (
    <DeviceShell slug="speaker">
      <SpeakerTest />
    </DeviceShell>
  );
}

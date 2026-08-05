import type { Metadata } from 'next';
import { alternateLanguages10 } from '@/lib/locales';
import DeviceShell from '@/components/DeviceShell';
import KeyboardTest from '@/components/device/KeyboardTest';
import { withCard } from '@/lib/og-cards';

export const metadata: Metadata = withCard({
  title: '키보드 테스트 - 키 입력·동시입력 확인',
  description: '키를 누르면 화면의 가상 키보드에 그대로 표시됩니다. 반응이 없는 키, 한 번 눌렀는데 두 번 입력되는 키, 동시에 몇 개까지 인식되는지(N키 롤오버)를 브라우저에서 바로 확인하세요.',
  alternates: {
    canonical: '/device/keyboard',
    languages: alternateLanguages10('/device/keyboard'),
  },
});

export default function Page() {
  return (
    <DeviceShell slug="keyboard">
      <KeyboardTest />
    </DeviceShell>
  );
}

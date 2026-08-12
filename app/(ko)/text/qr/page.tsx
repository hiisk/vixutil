import type { Metadata } from 'next';
import { alternateLanguages10 } from '@/lib/locales';
import TextShell from '@/components/TextShell';
import QrTool from '@/components/text/QrTool';
import { withCard } from '@/lib/og-cards';

export const metadata: Metadata = withCard({
  title: "QR 코드 생성기 - 와이파이·주소·연락처 QR 만들기",
  description: "주소, 와이파이 접속 정보, 연락처, 문자, 지도 좌표를 QR 코드로 만듭니다. 인코딩을 브라우저 안에서 하므로 입력한 비밀번호가 서버로 나가지 않고, SVG와 PNG로 내려받을 수 있습니다.",
  alternates: {
    canonical: '/text/qr',
    languages: alternateLanguages10('/text/qr'),
  },
});

export default function Page() {
  return (
    <TextShell slug="qr">
      <QrTool />
    </TextShell>
  );
}

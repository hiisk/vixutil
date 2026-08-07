import type { Metadata } from 'next';
import { alternateLanguages10 } from '@/lib/locales';
import TextShell from '@/components/TextShell';
import MaskTool from '@/components/text/MaskTool';
import { withCard } from '@/lib/og-cards';

export const metadata: Metadata = withCard({
  title: "개인정보 가리기 - 이름·전화번호·주민번호 마스킹",
  description: "이름·전화번호·주민등록번호·카드번호·이메일이 섞인 글을 붙여 넣으면 한 번에 가려 줍니다. 뒷자리는 남기고 가운데만 가리므로 무엇이었는지 확인할 수는 있고, 그대로 캡처해 공유해도 됩니다. 브라우저 안에서만 처리하고 서버로 보내지 않습니다.",
  alternates: {
    canonical: '/text/mask',
    languages: alternateLanguages10('/text/mask'),
  },
});

export default function Page() {
  return (
    <TextShell slug="mask">
      <MaskTool />
    </TextShell>
  );
}

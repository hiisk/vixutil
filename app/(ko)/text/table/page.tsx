import type { Metadata } from 'next';
import { alternateLanguages10 } from '@/lib/locales';
import TextShell from '@/components/TextShell';
import TableTool from '@/components/text/TableTool';
import { withCard } from '@/lib/og-cards';

export const metadata: Metadata = withCard({
  title: "표 만들기 - 엑셀 붙여넣기를 마크다운·CSV·HTML로",
  description: "엑셀이나 시트에서 복사한 자료를 붙여 넣으면 마크다운 표, CSV, TSV, HTML 표로 바꿔 줍니다. 무엇으로 나뉘어 있는지 스스로 알아보고, 줄마다 칸 수가 달라도 빈칸으로 채워 표가 어긋나지 않게 합니다.",
  alternates: {
    canonical: '/text/table',
    languages: alternateLanguages10('/text/table'),
  },
});

export default function Page() {
  return (
    <TextShell slug="table">
      <TableTool />
    </TextShell>
  );
}

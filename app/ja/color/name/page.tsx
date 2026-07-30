import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import NameTool from '@/components/color/NameTool';
import { alternateLanguages } from '@/lib/locales';

export const metadata: Metadata = {
  title: '色名を調べる — HEXにいちばん近い色名',
  description: 'カラーコードを入れると、いちばん近い色名（コーラル、ティール、クリムゾンなど）を探し、HEX・RGB・HSL・CMYKをまとめて表示します。色を言葉で伝えたいときに使えます。',
  alternates: {
    canonical: '/ja/color/name',
    languages: alternateLanguages('/color/name'),
  },
};

export default function JaColorNamePage() {
  return (
    <ColorShellIntl slug="name" lang="ja">
      <NameTool lang="ja" />
    </ColorShellIntl>
  );
}

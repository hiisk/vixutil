import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import NameTool from '@/components/color/NameTool';
import { alternateLanguages } from '@/lib/locales';

export const metadata: Metadata = {
  title: 'रंग का नाम — किसी HEX के सबसे नज़दीक नामित रंग',
  description: 'रंग कोड डालिए और सबसे नज़दीक का नामित रंग — coral, teal, crimson — मिल जाएगा, साथ में HEX, RGB, HSL और CMYK भी। जब रंग को शब्दों में बताना हो, तब काम आता है।',
  alternates: {
    canonical: '/hi/color/name',
    languages: alternateLanguages('/color/name'),
  },
};

export default function HiColorNamePage() {
  return (
    <ColorShellIntl slug="name" lang="hi">
      <NameTool lang="hi" />
    </ColorShellIntl>
  );
}

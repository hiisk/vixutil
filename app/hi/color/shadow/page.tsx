import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import ShadowTool from '@/components/color/ShadowTool';
import { alternateLanguages } from '@/lib/locales';

export const metadata: Metadata = {
  title: 'CSS box-shadow जनरेटर — लाइव प्रीव्यू और कोड',
  description: 'ऑफ़सेट, ब्लर, फैलाव, रंग और अपारदर्शिता को नतीजा देखते हुए समायोजित करें और CSS ले जाएँ। कई छायाएँ परतों में रखकर ज़्यादा स्वाभाविक गहराई देने वाले प्रीसेट भी हैं।',
  alternates: {
    canonical: '/hi/color/shadow',
    languages: alternateLanguages('/color/shadow'),
  },
};

export default function HiColorShadowPage() {
  return (
    <ColorShellIntl slug="shadow" lang="hi">
      <ShadowTool lang="hi" />
    </ColorShellIntl>
  );
}

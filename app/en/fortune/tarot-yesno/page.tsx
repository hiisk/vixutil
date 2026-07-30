import type { Metadata } from 'next';
import TarotIntl from '@/components/fortune/TarotIntl';

export const metadata: Metadata = {
  title: "Tarot Yes or No — Draw One Card",
  description: "Hold a question in mind and draw a single tarot card for a yes, no or not-yet answer. Free, with the full card reading.",
  alternates: {
    canonical: '/en/fortune/tarot-yesno',
    languages: { 'en': '/en/fortune/tarot-yesno', 'ko': '/fortune/tarot-yesno', 'x-default': '/en/fortune/tarot-yesno' },
  },
};

export default function EnTarotYesNoPage() {
  return <TarotIntl mode="yesno" lang="en" />;
}

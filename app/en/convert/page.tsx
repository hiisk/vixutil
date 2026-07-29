import type { Metadata } from 'next';
import ConvertHub from '@/components/ConvertHub';
import { convertAlternates } from '@/lib/convert-ui-intl';

export const metadata: Metadata = {
  title: 'Unit Converter — 50 conversions incl. Korean units',
  description:
    'cm to inches, kg to pounds, Celsius to Fahrenheit, Mbps to MB/s and Korean units like pyeong, geun and don — 50 converters with common-value tables. Free, no sign-up.',
  alternates: { canonical: '/en/convert', languages: convertAlternates() },
};

export default function EnConvertHub() {
  return <ConvertHub lang="en" faq={[
  { q: 'Which box do I type in?', a: 'Either one. Typing on the left updates the right, and typing on the right updates the left, so it works whichever direction you came from.' },
  { q: 'Why do Korean traditional units differ from what I know?', a: 'Units like geun, doe and majigi vary by region and product — a geun of meat is 600 g but a geun of vegetables is 375 g. Each page notes where the value splits.' },
  { q: 'Are these numbers exact?', a: 'Defined values such as 1 inch = 2.54 cm are exact. Values that depend on conditions, like Mach or traditional units, list the assumption on the page.' },
  { q: 'Why does my drive show less capacity?', a: 'This site uses 1 GB = 1,024 MB (binary). Drive makers count 1 GB as 1,000 MB, which is why a 1 TB SSD appears as 931 GB.' },
]} />;
}

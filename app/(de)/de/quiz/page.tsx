import type { Metadata } from 'next';
import { QuizIntlHub, quizIntlMeta } from '@/components/QuizIntlPage';

export const metadata: Metadata = quizIntlMeta('de');

export default function QuizHub() {
  return <QuizIntlHub lang="de" />;
}

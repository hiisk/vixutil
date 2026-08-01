import type { Metadata } from 'next';
import { QuizIntlHub, quizIntlMeta } from '@/components/QuizIntlPage';

export const metadata: Metadata = quizIntlMeta('hi');

export default function QuizHub() {
  return <QuizIntlHub lang="hi" />;
}

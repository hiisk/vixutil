import type { Metadata } from 'next';
import { QuizIntlHub, quizIntlMeta } from '@/components/QuizIntlPage';

export const metadata: Metadata = quizIntlMeta('pt-br');

export default function QuizHub() {
  return <QuizIntlHub lang="pt-br" />;
}

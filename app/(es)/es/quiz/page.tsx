import type { Metadata } from 'next';
import { QuizIntlHub, quizIntlMeta } from '@/components/QuizIntlPage';

export const metadata: Metadata = quizIntlMeta('es');

export default function QuizHub() {
  return <QuizIntlHub lang="es" />;
}

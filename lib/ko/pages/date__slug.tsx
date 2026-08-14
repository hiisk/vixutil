/** 한국어 날짜 낱장 — 열 언어가 같은 모듈을 쓴다(어댑터 까닭은 body__bmi__slug와 같다) */
import { build } from '../../fold/pages/date__slug';

const ko = build('ko');

export const generateMetadata = ko.generateMetadata;
export const generateStaticParams = ko.generateStaticParams;
export default ko.Page;

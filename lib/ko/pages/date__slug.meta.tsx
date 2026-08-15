/* 생성됨(gen.mjs) — 메타 전용 어댑터. 그리는 것은 원본 모듈에 있다. */
/** 한국어 날짜 낱장 — 열 언어가 같은 모듈을 쓴다(어댑터 까닭은 body__bmi__slug와 같다) */
import { buildMeta } from '../../fold/pages/date__slug.meta';

const ko = buildMeta('ko');

export const generateMetadata = ko.generateMetadata;
export const generateStaticParams = ko.generateStaticParams;

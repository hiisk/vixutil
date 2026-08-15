/* 생성됨(gen.mjs) — 메타 전용 어댑터. 그리는 것은 원본 모듈에 있다. */
/** 한국어 운동 낱장 — 열 언어가 같은 모듈을 쓴다 */
import { buildMeta } from '../../fold/pages/body__exercise__slug.meta';

const ko = buildMeta('ko');

export const generateMetadata = ko.generateMetadata;
export const generateStaticParams = ko.generateStaticParams;

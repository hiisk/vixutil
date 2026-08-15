/* 생성됨(gen.mjs) — 메타 전용 어댑터. 그리는 것은 원본 모듈에 있다. */
/**
 * 한국어 BMI 격자 낱장 — 화면과 셈은 열 언어가 같은 모듈을 쓴다.
 *
 * 한국어 등록부(KO_DEEP_LEAVES)는 `{ default, generateMetadata, generateStaticParams }`
 * 꼴을 요구하고 접힌 국제 모듈은 `build(lang)`을 내보낸다. 여기서 한 번 감싼다 —
 * 화면을 두 벌로 두면 곧 서로 달라진다(다른 섹션에서 실제로 그랬다).
 */
import { buildMeta } from '../../fold/pages/body__bmi__slug.meta';

const ko = buildMeta('ko');

export const generateMetadata = ko.generateMetadata;
export const generateStaticParams = ko.generateStaticParams;

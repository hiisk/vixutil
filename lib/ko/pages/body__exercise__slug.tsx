/** 한국어 운동 낱장 — 열 언어가 같은 모듈을 쓴다 */
import { build } from '../../fold/pages/body__exercise__slug';

const ko = build('ko');

export const generateMetadata = ko.generateMetadata;
export const generateStaticParams = ko.generateStaticParams;
export default ko.Page;

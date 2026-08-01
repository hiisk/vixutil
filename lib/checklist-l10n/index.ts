import type { Checklist } from '../types.ts';
import type { AnyLocale10 } from '../locales.ts';
import { CHECKLISTS_EN, CHECKLISTS_EN_MAP } from '../checklist-en.ts';
import { CHECKLISTS_ES, CHECKLISTS_ES_MAP } from './es.ts';
import { CHECKLISTS_PT, CHECKLISTS_PT_MAP } from './pt-br.ts';
import { CHECKLISTS_JA, CHECKLISTS_JA_MAP } from './ja.ts';
import { CHECKLISTS_DE, CHECKLISTS_DE_MAP } from './de.ts';
import { CHECKLISTS_FR, CHECKLISTS_FR_MAP } from './fr.ts';
import { CHECKLISTS_HI, CHECKLISTS_HI_MAP } from './hi.ts';
import { CHECKLISTS_ZH_HANS, CHECKLISTS_ZH_HANS_MAP } from './zh-hans.ts';
import { CHECKLISTS_ZH_HANT, CHECKLISTS_ZH_HANT_MAP } from './zh-hant.ts';

/**
 * 한국어를 뺀 아홉 언어의 체크리스트.
 *
 * 한국어 128종은 연말정산·전세사기처럼 한국 제도에 묶인 항목이 많아 옮기지
 * 않는다([[lib/checklist-en.ts]] 주석). 영어판 12종은 이사·해외여행·면접처럼
 * 어디서나 같은 일이라 그대로 아홉 언어로 옮겼다.
 *
 * **id는 아홉 언어가 같아야 한다** — 체크 상태를 id로 저장하므로, 어긋나면
 * 언어를 바꿨을 때 체크가 날아간다. 검사가 이것을 강제한다.
 */
export type ChecklistIntlLang = Exclude<AnyLocale10, 'ko'>;

export const CHECKLISTS_INTL: Record<ChecklistIntlLang, Checklist[]> = {
  'en': CHECKLISTS_EN,
  'es': CHECKLISTS_ES,
  'pt-br': CHECKLISTS_PT,
  'ja': CHECKLISTS_JA,
  'de': CHECKLISTS_DE,
  'fr': CHECKLISTS_FR,
  'hi': CHECKLISTS_HI,
  'zh-hans': CHECKLISTS_ZH_HANS,
  'zh-hant': CHECKLISTS_ZH_HANT,
};

export const CHECKLISTS_INTL_MAP: Record<ChecklistIntlLang, Record<string, Checklist>> = {
  'en': CHECKLISTS_EN_MAP,
  'es': CHECKLISTS_ES_MAP,
  'pt-br': CHECKLISTS_PT_MAP,
  'ja': CHECKLISTS_JA_MAP,
  'de': CHECKLISTS_DE_MAP,
  'fr': CHECKLISTS_FR_MAP,
  'hi': CHECKLISTS_HI_MAP,
  'zh-hans': CHECKLISTS_ZH_HANS_MAP,
  'zh-hant': CHECKLISTS_ZH_HANT_MAP,
};

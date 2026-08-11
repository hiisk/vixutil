/**
 * 앱별 안내문을 합친다. 새 앱은 notes-*.ts를 만들고 여기 한 줄을 더한다.
 */
import type { Ten } from './types.ts';
import { SC_NOTES_CORE } from './notes-core.ts';
import { SC_NOTES_OFFICE2 } from './notes-office2.ts';
import { SC_NOTES_MAIL } from './notes-mail.ts';
import { SC_NOTES_ADOBE } from './notes-adobe.ts';
import { SC_NOTES_DEV2 } from './notes-dev2.ts';
import { SC_NOTES_CHAT } from './notes-chat.ts';

export const SC_APP_NOTES: Record<string, Ten> = {
  ...SC_NOTES_CORE,
  ...SC_NOTES_OFFICE2,
  ...SC_NOTES_MAIL,
  ...SC_NOTES_ADOBE,
  ...SC_NOTES_DEV2,
  ...SC_NOTES_CHAT,
};

'use client';
import { useMemo, useState } from 'react';
import { replaceAll } from '@/lib/text-clean';
import { CARD, CopyBox, InputArea, Toggle } from './ui';
import { REPLACE_UI, type TextLang } from '@/lib/text-ui-intl';

export default function ReplaceTool({ lang = 'ko' }: { lang?: TextLang } = {}) {
  const ui = REPLACE_UI[lang];
  const [text, setText] = useState('');
  const [find, setFind] = useState('');
  const [to, setTo] = useState('');
  const [caseSensitive, setCaseSensitive] = useState(true);
  const [regex, setRegex] = useState(false);

  const result = useMemo(
    () => replaceAll(text, find, to, { caseSensitive, regex }),
    [text, find, to, caseSensitive, regex],
  );

  const field = 'w-full rounded-xl border chip-off px-3.5 py-2.5 text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-300 dark:placeholder:text-slate-600 focus:outline-none focus:border-indigo-400 transition-colors font-mono';

  return (
    <div>
      <InputArea value={text} onChange={setText} rows={7} label={ui.sourceLabel} placeholder={ui.sourcePlaceholder} lang={lang} />

      <div className={`${CARD} mt-4`}>
        <div className="grid sm:grid-cols-2 gap-3">
          <label>
            <span className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5">{ui.findLabel}</span>
            <input value={find} onChange={e => setFind(e.target.value)} placeholder={ui.findPlaceholder} className={field} />
          </label>
          <label>
            <span className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5">{ui.toLabel}</span>
            <input value={to} onChange={e => setTo(e.target.value)} placeholder={ui.toPlaceholder} className={field} />
          </label>
        </div>

        <div className="mt-3">
          <Toggle checked={caseSensitive} onChange={setCaseSensitive} label={ui.caseSensitive} hint={ui.caseSensitiveHint} />
          <Toggle checked={regex} onChange={setRegex} label={ui.regex} hint={ui.regexHint} />
        </div>

        {!regex && (
          <p className="mt-2 text-[11px] text-slate-400 dark:text-slate-500">
            {ui.escapeNoteBefore}<code className="font-mono">\n</code>{ui.escapeNoteMid}<code className="font-mono">\t</code>{ui.escapeNoteAfter}
          </p>
        )}

        {result.error && (
          <p className="mt-3 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/50 px-4 py-2.5 text-xs text-rose-700 dark:text-rose-300">
            {ui.regexError(result.error)}
          </p>
        )}

        {find && !result.error && (
          <p className={`mt-3 text-sm font-bold ${result.count > 0 ? 'text-indigo-600' : 'text-slate-400 dark:text-slate-500'}`}>
            {result.count > 0 ? ui.willChange(result.count) : ui.noMatch}
          </p>
        )}
      </div>

      <CopyBox value={result.text} label={ui.outputLabel} rows={7} lang={lang} />
    </div>
  );
}

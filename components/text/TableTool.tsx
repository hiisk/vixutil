'use client';
import { useMemo, useState } from 'react';
import { makeTable, type TableFormat, type TableInput } from '@/lib/text-more';
import { CARD, CopyBox, InputArea, Stat, Toggle } from './ui';
import { TABLE_UI } from '@/lib/text-more-ui';
import type { TextLang } from '@/lib/text-intl';

const INPUTS: TableInput[] = ['auto', 'tab', 'comma', 'space'];
const FORMATS: TableFormat[] = ['markdown', 'csv', 'tsv', 'html'];
const FORMAT_LABEL = ['Markdown', 'CSV', 'TSV', 'HTML'];

export default function TableTool({ lang = 'ko' }: { lang?: TextLang } = {}) {
  const ui = TABLE_UI[lang];
  const [text, setText] = useState('');
  const [input, setInput] = useState<TableInput>('auto');
  const [format, setFormat] = useState<TableFormat>('markdown');
  const [header, setHeader] = useState(true);
  const [align, setAlign] = useState(false);

  const result = useMemo(() => makeTable(text, { input, format, header, align }), [text, input, format, header, align]);

  const pill = (on: boolean) =>
    `rounded-xl border py-2.5 text-sm font-bold transition-colors ${
      on
        ? 'border-indigo-300 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300'
        : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:border-indigo-200'
    }`;

  return (
    <div>
      <InputArea value={text} onChange={setText} rows={7} label={ui.inputLabel} lang={lang} placeholder={ui.placeholder} />

      <div className={`${CARD} mt-4`}>
        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">{ui.inputTitle}</p>
        <div className="grid grid-cols-2 gap-2">
          {INPUTS.map((v, i) => (
            <button key={v} onClick={() => setInput(v)} className={pill(input === v)}>{ui.inputs[i]}</button>
          ))}
        </div>

        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-4 mb-2">{ui.formatTitle}</p>
        <div className="grid grid-cols-4 gap-2">
          {FORMATS.map((v, i) => (
            <button key={v} onClick={() => setFormat(v)} className={pill(format === v)}>{FORMAT_LABEL[i]}</button>
          ))}
        </div>

        <div className="mt-3">
          <Toggle checked={header} onChange={setHeader} label={ui.header} hint={ui.headerHint} />
          {format === 'markdown' && <Toggle checked={align} onChange={setAlign} label={ui.align} hint={ui.alignHint} />}
        </div>
      </div>

      {text && (
        <div className="grid grid-cols-2 gap-2 mt-4">
          <Stat label={ui.rows} value={result.rows} accent="text-indigo-600" />
          <Stat label={ui.cols} value={result.cols} />
        </div>
      )}

      <CopyBox value={result.text} label={ui.outputLabel} rows={9} mono lang={lang} />
    </div>
  );
}

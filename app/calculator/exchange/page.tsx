'use client';
import { useState, useEffect } from 'react';
import CalcShell, { Card, CardHeader, Label, inputCls, TableWrap } from '@/components/CalcShell';

const TARGETS = [
  { code:'USD', name:'미국 달러',  flag:'🇺🇸' },
  { code:'JPY', name:'일본 엔',    flag:'🇯🇵', scale:100 },
  { code:'EUR', name:'유로',       flag:'🇪🇺' },
  { code:'CNY', name:'중국 위안',  flag:'🇨🇳' },
  { code:'GBP', name:'영국 파운드',flag:'🇬🇧' },
  { code:'HKD', name:'홍콩 달러', flag:'🇭🇰' },
  { code:'AUD', name:'호주 달러', flag:'🇦🇺' },
  { code:'CHF', name:'스위스 프랑',flag:'🇨🇭' },
];

const ALL = [
  {code:'KRW',name:'한국 원',flag:'🇰🇷'},
  ...TARGETS,
];

export default function ExchangePage() {
  const [amount, setAmount] = useState('');
  const [from, setFrom] = useState('KRW');
  const [to, setTo] = useState('USD');
  const [rates, setRates] = useState<Record<string,number>|null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [date, setDate] = useState('');

  useEffect(()=>{
    fetch('https://api.exchangerate-api.com/v4/latest/KRW')
      .then(r=>r.json())
      .then(d=>{setRates(d.rates);setDate(d.date);setLoading(false);})
      .catch(()=>{setError('환율 정보를 불러올 수 없습니다.');setLoading(false);});
  },[]);

  function convert(v:number,f:string,t:string){
    if(!rates) return 0;
    if(f==='KRW') return v*(rates[t]??0);
    if(t==='KRW') return v/(rates[f]??1);
    return (v/(rates[f]??1))*(rates[t]??0);
  }

  const result = amount&&rates ? convert(Number(amount),from,to) : null;
  const isSmall = to!=='KRW' && from!=='KRW';

  return (
    <CalcShell title="환율 계산기" description="실시간 환율 API 연동 (ExchangeRate-API)">
      <div className="flex flex-col gap-4">
        {loading && (
          <Card className="p-8 text-center text-slate-400 dark:text-slate-500 text-sm">
            환율 정보 불러오는 중...
          </Card>
        )}
        {error && (
          <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-2xl px-4 py-3 text-red-600 text-sm">{error}</div>
        )}

        {rates && (
          <>
            <Card className="p-5">
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">통화 선택</p>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <Label>보낼 통화</Label>
                  <select value={from} onChange={e=>setFrom(e.target.value)} className={inputCls}>
                    {ALL.map(c=>(
                      <option key={c.code} value={c.code}>{c.flag} {c.code} {c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label>받을 통화</Label>
                  <select value={to} onChange={e=>setTo(e.target.value)} className={inputCls}>
                    {ALL.map(c=>(
                      <option key={c.code} value={c.code}>{c.flag} {c.code} {c.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <Label>금액</Label>
                <input type="number" value={amount} onChange={e=>setAmount(e.target.value)}
                  placeholder="변환할 금액을 입력하세요" className={inputCls}/>
              </div>
            </Card>

            {result !== null && (
              <div className="bg-blue-600 rounded-2xl p-6 text-center">
                <p className="text-blue-200 text-sm mb-2">
                  {Number(amount).toLocaleString()} {from}
                </p>
                <p className="text-white text-4xl font-black">
                  {result.toLocaleString(undefined, {
                    maximumFractionDigits: to==='KRW'?0:isSmall?4:2,
                    minimumFractionDigits: to==='KRW'?0:2,
                  })} {to}
                </p>
                {date && <p className="text-blue-300 text-xs mt-2">기준일 {date}</p>}
              </div>
            )}

            <Card>
              <CardHeader title="원화 기준 환율표" sub={date||undefined}/>
              <TableWrap>
                <table className="calc-table">
                  <thead>
                    <tr>
                      <th className="text-left pl-5">통화</th>
                      <th>기준</th>
                      <th>원화 환율</th>
                      <th>만원 환산</th>
                    </tr>
                  </thead>
                  <tbody>
                    {TARGETS.map(c=>{
                      const r = rates[c.code]??1;
                      const krwPerUnit = c.scale ? (c.scale/r) : (1/r);
                      const unitPer10k = 10000 * r;
                      return (
                        <tr key={c.code}>
                          <td className="text-left pl-5 text-slate-700 dark:text-slate-200 font-semibold">
                            {c.flag} {c.code}
                          </td>
                          <td className="text-slate-500 dark:text-slate-400">{c.scale?`${c.scale}${c.code}`:`1${c.code}`}</td>
                          <td className="font-bold text-slate-900 dark:text-slate-100">{Math.round(krwPerUnit).toLocaleString()}원</td>
                          <td className="text-blue-700 dark:text-blue-300">
                            {c.scale
                              ? `${(unitPer10k*c.scale/10000).toFixed(2)}${c.code}`
                              : `${unitPer10k.toFixed(2)}${c.code}`}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </TableWrap>
            </Card>
          </>
        )}
      </div>
    </CalcShell>
  );
}

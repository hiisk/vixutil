'use client';
import { useState } from 'react';
import CalcShell, { Card, Label, inputCls } from '@/components/CalcShell';

const DAYS_OF_WEEK = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
const ZODIAC = ['쥐', '소', '호랑이', '토끼', '용', '뱀', '말', '양', '원숭이', '닭', '개', '돼지'];
const ZODIAC_EMOJI = ['🐭', '🐮', '🐯', '🐰', '🐲', '🐍', '🐴', '🐑', '🐵', '🐔', '🐶', '🐷'];

const STAR_SIGNS = [
  { name: '염소자리', emoji: '♑', from: [12, 22], to: [1, 19] },
  { name: '물병자리', emoji: '♒', from: [1, 20], to: [2, 18] },
  { name: '물고기자리', emoji: '♓', from: [2, 19], to: [3, 20] },
  { name: '양자리', emoji: '♈', from: [3, 21], to: [4, 19] },
  { name: '황소자리', emoji: '♉', from: [4, 20], to: [5, 20] },
  { name: '쌍둥이자리', emoji: '♊', from: [5, 21], to: [6, 21] },
  { name: '게자리', emoji: '♋', from: [6, 22], to: [7, 22] },
  { name: '사자자리', emoji: '♌', from: [7, 23], to: [8, 22] },
  { name: '처녀자리', emoji: '♍', from: [8, 23], to: [9, 22] },
  { name: '천칭자리', emoji: '♎', from: [9, 23], to: [10, 23] },
  { name: '전갈자리', emoji: '♏', from: [10, 24], to: [11, 22] },
  { name: '사수자리', emoji: '♐', from: [11, 23], to: [12, 21] },
];

function getStarSign(month: number, day: number) {
  return STAR_SIGNS.find(s => {
    if (s.from[0] === s.to[0]) return month === s.from[0] && day >= s.from[1] && day <= s.to[1];
    if (month === s.from[0]) return day >= s.from[1];
    if (month === s.to[0]) return day <= s.to[1];
    return false;
  }) ?? STAR_SIGNS[0];
}

export default function BirthdayPage() {
  const [birth, setBirth] = useState('');

  const info = (() => {
    if (!birth) return null;
    const d = new Date(birth);
    if (isNaN(d.getTime())) return null;
    const y = d.getFullYear();
    const m = d.getMonth() + 1;
    const day = d.getDate();
    const zodiac = ZODIAC[(y - 4) % 12];
    const zodiacEmoji = ZODIAC_EMOJI[(y - 4) % 12];
    const star = getStarSign(m, day);
    const birthDow = DAYS_OF_WEEK[d.getDay()];
    const thisYear = new Date().getFullYear();
    const birthdayThisYear = new Date(thisYear, d.getMonth(), d.getDate());
    const birthdayDow = DAYS_OF_WEEK[birthdayThisYear.getDay()];
    const manAge = thisYear - y - (new Date() < birthdayThisYear ? 1 : 0);
    return { y, m, day, zodiac, zodiacEmoji, star, birthDow, birthdayDow, manAge, koreanAge: thisYear - y + 1 };
  })();

  return (
    <CalcShell path="/calculator/birthday" title="생년월일 계산기" description="띠·별자리·요일·나이 정보 계산">
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <Label>생년월일</Label>
          <input type="date" value={birth} onChange={e => setBirth(e.target.value)} className={inputCls} />
        </Card>

        {info && (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-blue-600 rounded-2xl p-5 text-center">
                <p className="text-blue-200 text-xs mb-1">띠</p>
                <p className="text-4xl mb-1">{info.zodiacEmoji}</p>
                <p className="text-white text-xl font-black">{info.zodiac}띠</p>
              </div>
              <div className="bg-slate-800 rounded-2xl p-5 text-center">
                <p className="text-slate-400 dark:text-slate-500 text-xs mb-1">별자리</p>
                <p className="text-4xl mb-1">{info.star.emoji}</p>
                <p className="text-white text-xl font-black">{info.star.name}</p>
              </div>
            </div>
            <Card>
              <div className="divide-y divide-slate-100">
                {[
                  { label: '태어난 요일', value: info.birthDow },
                  { label: `${new Date().getFullYear()}년 생일 요일`, value: info.birthdayDow },
                  { label: '만 나이', value: `${info.manAge}세` },
                  { label: '한국 나이', value: `${info.koreanAge}세` },
                ].map(r => (
                  <div key={r.label} className="px-5 py-3 flex justify-between text-sm">
                    <span className="text-slate-500 dark:text-slate-400">{r.label}</span>
                    <span className="font-bold text-slate-800 dark:text-slate-100">{r.value}</span>
                  </div>
                ))}
              </div>
            </Card>
          </>
        )}
      </div>
    </CalcShell>
  );
}

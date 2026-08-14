/**
 * 도시 쌍 낱장의 화면 문구 — 열 언어.
 *
 * 시간대 라벨(표준시·서머타임·UTC 오프셋)은 TIME_UI에 이미 열 언어로 있다.
 * 여기 적는 것은 **쌍에만 있는 말**뿐이다 — 어느 쪽이 앞서는가, 서머타임에
 * 시차가 바뀌는가, 겹치는 업무시간. 겹치는 문구를 다시 적으면 한쪽만 고쳐진다.
 *
 * 표의 시각(09:00)은 숫자로만 적는다 — 어느 언어에서나 같게 읽힌다. 다만 시차는
 * dur()로 그 언어의 말을 쓴다. "+14:00"은 시계 시각처럼 읽혀서 제목에서 사람이
 * 클릭할 글자가 안 된다.
 */
import type { L, Lang } from '../i18n/lang.ts';

export interface PairUI {
  /**
   * 시차를 그 언어의 말로 — "14시간", "3시간 30분".
   *
   * "+14:00"으로 적으면 시계 시각처럼 읽히고, 제목에서 사람이 클릭할 글자가 안 된다.
   * 30·45분 시간대(인도 +5:30, 네팔 +5:45)가 있으므로 분을 버리지 않는다.
   */
  dur: (h: number, m: number) => string;
  /** 시차가 없을 때의 짧은 말 — "0시간"이라고 쓰면 답이 아니라 계산 결과처럼 읽힌다 */
  noGap: string;
  /** "서울과 뉴욕의 시차" */
  title: (a: string, b: string) => string;
  metaTitle: (a: string, b: string, gap: string) => string;
  metaDesc: (a: string, b: string, gap: string, summer: string, shifts: boolean) => string;
  /** 어느 쪽이 앞서는가 */
  ahead: (fast: string, slow: string, gap: string) => string;
  same: (a: string, b: string) => string;
  dstTitle: string;
  /** 서머타임으로 시차가 바뀐다 */
  dstShifts: (winter: string, summer: string) => string;
  dstStable: string;
  dstWho: (city: string) => string;
  dstNeither: string;
  clockTitle: (a: string, b: string) => string;
  clockNote: string;
  prevDay: string;
  nextDay: string;
  overlapTitle: string;
  overlapText: (a: string, b: string, from: number, to: number, hours: number) => string;
  overlapNone: (a: string, b: string) => string;
  neighborsTitle: string;
  bothTitle: string;
  faq: (a: string, b: string, gap: string, summer: string, shifts: boolean, overlap: number) => { q: string; a: string }[];
}

const hh = (h: number) => `${String(h).padStart(2, '0')}:00`;

const ko: PairUI = {
  noGap: '시차 없음',
  dur: (h, m) => (m ? `${h}시간 ${m}분` : `${h}시간`),
  title: (a, b) => `${a}와 ${b}의 시차`,
  metaTitle: (a, b, gap) => `${a} ${b} 시차 — ${gap}`,
  metaDesc: (a, b, gap, summer, shifts) =>
    `${a}와 ${b}의 시차는 표준시 기준 ${gap}입니다.${shifts ? ` 서머타임 기간에는 ${summer}로 한 시간 달라집니다.` : ' 서머타임이 있어도 시차는 바뀌지 않습니다.'} 24시간 대응표와 겹치는 업무시간까지 함께 봅니다.`,
  ahead: (fast, slow, gap) => `${fast}이 ${slow}보다 ${gap} 빠릅니다.`,
  same: (a, b) => `${a}와 ${b}는 시차가 없습니다. 같은 시각을 씁니다.`,
  dstTitle: '서머타임 때 시차가 바뀌나요',
  dstShifts: (winter, summer) => `바뀝니다. 겨울에는 ${winter}, 여름에는 ${summer}입니다.`,
  dstStable: '안 바뀝니다. 일 년 내내 같은 시차입니다.',
  dstWho: city => `${city}만 서머타임을 씁니다.`,
  dstNeither: '두 도시 다 서머타임을 쓰지 않습니다.',
  clockTitle: (a, b) => `${a} 시각 → ${b} 시각`,
  clockNote: '표준시(1월) 기준입니다. 서머타임 기간에는 한 시간씩 밀립니다.',
  prevDay: '전날',
  nextDay: '다음날',
  overlapTitle: '겹치는 업무시간',
  overlapText: (a, b, from, to, hours) =>
    `${a} 기준 ${hh(from)}~${hh(to)}면 ${b}도 업무시간입니다. 하루에 ${hours}시간 겹칩니다.`,
  overlapNone: (a, b) => `${a}의 업무시간(09:00~18:00)에 ${b}는 업무시간이 아닙니다. 한쪽이 이른 아침이나 늦은 저녁을 맡아야 합니다.`,
  neighborsTitle: '다른 도시와의 시차',
  bothTitle: '두 도시 자세히',
  faq: (a, b, gap, summer, shifts, overlap) => [
    { q: `${a}와 ${b}의 시차는 몇 시간인가요?`, a: `표준시 기준 ${gap}입니다.${shifts ? ` 다만 서머타임 기간에는 ${summer}가 되어 한 시간 줄거나 늘어납니다.` : ''}` },
    { q: `${a}가 정오일 때 ${b}는 몇 시인가요?`, a: `아래 24시간 대응표에서 12:00 줄을 보면 됩니다. 표는 표준시 기준이라 서머타임 기간에는 한 시간씩 밀립니다.` },
    { q: `회의를 몇 시에 잡아야 하나요?`, a: overlap > 0 ? `두 도시의 업무시간(09:00~18:00)이 하루 ${overlap}시간 겹칩니다. 그 안에서 잡으면 양쪽 다 근무 중입니다.` : `업무시간이 겹치지 않습니다. 한쪽이 이른 아침이나 늦은 저녁을 맡아야 합니다.` },
  ],
};

const en: PairUI = {
  noGap: 'No difference',
  dur: (h, m) => (m ? `${h}h ${m}m` : h === 1 ? '1 hour' : `${h} hours`),
  title: (a, b) => `Time difference between ${a} and ${b}`,
  metaTitle: (a, b, gap) => `${a} to ${b} time difference — ${gap}`,
  metaDesc: (a, b, gap, summer, shifts) =>
    `${a} and ${b} are ${gap} apart on standard time.${shifts ? ` During daylight saving the gap becomes ${summer}.` : ' Daylight saving does not change the gap.'} With a 24-hour conversion table and the overlapping work hours.`,
  ahead: (fast, slow, gap) => `${fast} is ${gap} ahead of ${slow}.`,
  same: (a, b) => `${a} and ${b} have no time difference — they share the same clock.`,
  dstTitle: 'Does daylight saving change it?',
  dstShifts: (winter, summer) => `Yes. In winter the gap is ${winter}; in summer it is ${summer}.`,
  dstStable: 'No. The gap is the same all year.',
  dstWho: city => `Only ${city} observes daylight saving.`,
  dstNeither: 'Neither city observes daylight saving.',
  clockTitle: (a, b) => `${a} time → ${b} time`,
  clockNote: 'Standard time (January). During daylight saving each row shifts by an hour.',
  prevDay: 'prev day',
  nextDay: 'next day',
  overlapTitle: 'Overlapping work hours',
  overlapText: (a, b, from, to, hours) =>
    `Between ${hh(from)} and ${hh(to)} in ${a}, ${b} is also at work — ${hours} hours a day.`,
  overlapNone: (a, b) => `During ${a} work hours (09:00–18:00) ${b} is off the clock. One side has to take an early morning or a late evening.`,
  neighborsTitle: 'Other city pairs',
  bothTitle: 'Both cities in detail',
  faq: (a, b, gap, summer, shifts, overlap) => [
    { q: `How many hours is ${a} ahead of ${b}?`, a: `${gap} on standard time.${shifts ? ` During daylight saving it becomes ${summer}, an hour more or less.` : ''}` },
    { q: `What time is it in ${b} when it is noon in ${a}?`, a: `Read the 12:00 row of the 24-hour table below. The table is on standard time, so each row shifts an hour during daylight saving.` },
    { q: 'When should we schedule a meeting?', a: overlap > 0 ? `The two cities' work hours (09:00–18:00) overlap for ${overlap} hours a day. Anything inside that window catches both sides at work.` : 'The work hours do not overlap at all. One side has to take an early morning or a late evening.' },
  ],
};

const es: PairUI = {
  noGap: 'Sin diferencia',
  dur: (h, m) => (m ? `${h} h ${m} min` : h === 1 ? '1 hora' : `${h} horas`),
  title: (a, b) => `Diferencia horaria entre ${a} y ${b}`,
  metaTitle: (a, b, gap) => `Diferencia horaria ${a} – ${b} — ${gap}`,
  metaDesc: (a, b, gap, summer, shifts) =>
    `${a} y ${b} se llevan ${gap} en horario estándar.${shifts ? ` Durante el horario de verano la diferencia pasa a ${summer}.` : ' El horario de verano no cambia la diferencia.'} Con tabla de conversión de 24 horas y las horas de trabajo que coinciden.`,
  ahead: (fast, slow, gap) => `${fast} va ${gap} por delante de ${slow}.`,
  same: (a, b) => `${a} y ${b} no tienen diferencia horaria: comparten el mismo reloj.`,
  dstTitle: '¿El horario de verano la cambia?',
  dstShifts: (winter, summer) => `Sí. En invierno la diferencia es ${winter} y en verano ${summer}.`,
  dstStable: 'No. La diferencia es la misma todo el año.',
  dstWho: city => `Solo ${city} aplica horario de verano.`,
  dstNeither: 'Ninguna de las dos ciudades aplica horario de verano.',
  clockTitle: (a, b) => `Hora en ${a} → hora en ${b}`,
  clockNote: 'Horario estándar (enero). Durante el horario de verano cada fila se desplaza una hora.',
  prevDay: 'día anterior',
  nextDay: 'día siguiente',
  overlapTitle: 'Horas de trabajo que coinciden',
  overlapText: (a, b, from, to, hours) =>
    `Entre las ${hh(from)} y las ${hh(to)} en ${a}, ${b} también está trabajando: ${hours} horas al día.`,
  overlapNone: (a, b) => `En el horario laboral de ${a} (09:00–18:00) ${b} no está trabajando. Alguien tiene que madrugar o quedarse hasta tarde.`,
  neighborsTitle: 'Otros pares de ciudades',
  bothTitle: 'Las dos ciudades en detalle',
  faq: (a, b, gap, summer, shifts, overlap) => [
    { q: `¿Cuántas horas de diferencia hay entre ${a} y ${b}?`, a: `${gap} en horario estándar.${shifts ? ` Durante el horario de verano pasa a ${summer}.` : ''}` },
    { q: `¿Qué hora es en ${b} cuando en ${a} es mediodía?`, a: 'Mira la fila de las 12:00 en la tabla de 24 horas. La tabla usa horario estándar, así que en verano cada fila se desplaza una hora.' },
    { q: '¿A qué hora conviene reunirse?', a: overlap > 0 ? `Las jornadas (09:00–18:00) coinciden ${overlap} horas al día. Cualquier hora dentro de esa franja pilla a los dos trabajando.` : 'Las jornadas no coinciden. Alguien tiene que madrugar o quedarse hasta tarde.' },
  ],
};

const pt: PairUI = {
  noGap: 'Sem diferença',
  dur: (h, m) => (m ? `${h} h ${m} min` : h === 1 ? '1 hora' : `${h} horas`),
  title: (a, b) => `Diferença de fuso entre ${a} e ${b}`,
  metaTitle: (a, b, gap) => `Diferença de horário ${a} – ${b} — ${gap}`,
  metaDesc: (a, b, gap, summer, shifts) =>
    `${a} e ${b} têm ${gap} de diferença no horário padrão.${shifts ? ` No horário de verão a diferença passa a ${summer}.` : ' O horário de verão não muda a diferença.'} Com tabela de conversão de 24 horas e as horas de trabalho em comum.`,
  ahead: (fast, slow, gap) => `${fast} está ${gap} à frente de ${slow}.`,
  same: (a, b) => `${a} e ${b} não têm diferença de fuso — usam o mesmo relógio.`,
  dstTitle: 'O horário de verão muda isso?',
  dstShifts: (winter, summer) => `Muda. No inverno a diferença é ${winter}; no verão, ${summer}.`,
  dstStable: 'Não muda. A diferença é a mesma o ano todo.',
  dstWho: city => `Só ${city} adota horário de verão.`,
  dstNeither: 'Nenhuma das duas cidades adota horário de verão.',
  clockTitle: (a, b) => `Hora em ${a} → hora em ${b}`,
  clockNote: 'Horário padrão (janeiro). No horário de verão cada linha desloca uma hora.',
  prevDay: 'dia anterior',
  nextDay: 'dia seguinte',
  overlapTitle: 'Horas de trabalho em comum',
  overlapText: (a, b, from, to, hours) =>
    `Entre ${hh(from)} e ${hh(to)} em ${a}, ${b} também está no expediente — ${hours} horas por dia.`,
  overlapNone: (a, b) => `No expediente de ${a} (09:00–18:00) ${b} não está trabalhando. Um dos lados tem de pegar a madrugada ou a noite.`,
  neighborsTitle: 'Outros pares de cidades',
  bothTitle: 'As duas cidades em detalhe',
  faq: (a, b, gap, summer, shifts, overlap) => [
    { q: `Quantas horas de diferença há entre ${a} e ${b}?`, a: `${gap} no horário padrão.${shifts ? ` No horário de verão passa a ${summer}.` : ''}` },
    { q: `Que horas são em ${b} quando é meio-dia em ${a}?`, a: 'Veja a linha das 12:00 na tabela de 24 horas. A tabela usa horário padrão, então no verão cada linha desloca uma hora.' },
    { q: 'A que horas marcar uma reunião?', a: overlap > 0 ? `Os expedientes (09:00–18:00) coincidem ${overlap} horas por dia. Qualquer horário dentro dessa faixa pega os dois lados trabalhando.` : 'Os expedientes não coincidem. Um dos lados tem de pegar a madrugada ou a noite.' },
  ],
};

const ja: PairUI = {
  noGap: '時差なし',
  dur: (h, m) => (m ? `${h}時間${m}分` : `${h}時間`),
  title: (a, b) => `${a}と${b}の時差`,
  metaTitle: (a, b, gap) => `${a} ${b} 時差 — ${gap}`,
  metaDesc: (a, b, gap, summer, shifts) =>
    `${a}と${b}の時差は標準時で${gap}です。${shifts ? `サマータイム中は${summer}になります。` : 'サマータイムがあっても時差は変わりません。'}24時間の対応表と重なる勤務時間も見られます。`,
  ahead: (fast, slow, gap) => `${fast}のほうが${slow}より${gap}進んでいます。`,
  same: (a, b) => `${a}と${b}に時差はありません。同じ時刻を使います。`,
  dstTitle: 'サマータイムで時差は変わりますか',
  dstShifts: (winter, summer) => `変わります。冬は${winter}、夏は${summer}です。`,
  dstStable: '変わりません。一年を通して同じ時差です。',
  dstWho: city => `${city}だけがサマータイムを使います。`,
  dstNeither: 'どちらの都市もサマータイムを使いません。',
  clockTitle: (a, b) => `${a}の時刻 → ${b}の時刻`,
  clockNote: '標準時（1月）基準です。サマータイム中は1時間ずつずれます。',
  prevDay: '前日',
  nextDay: '翌日',
  overlapTitle: '重なる勤務時間',
  overlapText: (a, b, from, to, hours) =>
    `${a}の${hh(from)}〜${hh(to)}なら${b}も勤務時間です。1日${hours}時間重なります。`,
  overlapNone: (a, b) => `${a}の勤務時間（09:00〜18:00）に${b}は勤務時間ではありません。どちらかが早朝か夜を担当することになります。`,
  neighborsTitle: 'ほかの都市の時差',
  bothTitle: '2都市の詳細',
  faq: (a, b, gap, summer, shifts, overlap) => [
    { q: `${a}と${b}の時差は何時間ですか？`, a: `標準時で${gap}です。${shifts ? `ただしサマータイム中は${summer}になり、1時間ずれます。` : ''}` },
    { q: `${a}が正午のとき${b}は何時ですか？`, a: '下の24時間対応表で12:00の行を見てください。表は標準時基準なので、サマータイム中は1時間ずつずれます。' },
    { q: '会議は何時に設定すべきですか？', a: overlap > 0 ? `両都市の勤務時間（09:00〜18:00）が1日${overlap}時間重なります。その中で決めれば双方が勤務中です。` : '勤務時間が重なりません。どちらかが早朝か夜を担当することになります。' },
  ],
};

const de: PairUI = {
  noGap: 'Kein Unterschied',
  dur: (h, m) => (m ? `${h} Std. ${m} Min.` : h === 1 ? '1 Stunde' : `${h} Stunden`),
  title: (a, b) => `Zeitverschiebung zwischen ${a} und ${b}`,
  metaTitle: (a, b, gap) => `Zeitverschiebung ${a} – ${b} — ${gap}`,
  metaDesc: (a, b, gap, summer, shifts) =>
    `${a} und ${b} trennen ${gap} in der Normalzeit.${shifts ? ` In der Sommerzeit sind es ${summer}.` : ' Die Sommerzeit ändert den Abstand nicht.'} Mit 24-Stunden-Tabelle und den gemeinsamen Arbeitszeiten.`,
  ahead: (fast, slow, gap) => `${fast} ist ${gap} vor ${slow}.`,
  same: (a, b) => `Zwischen ${a} und ${b} gibt es keine Zeitverschiebung — gleiche Uhrzeit.`,
  dstTitle: 'Ändert die Sommerzeit das?',
  dstShifts: (winter, summer) => `Ja. Im Winter sind es ${winter}, im Sommer ${summer}.`,
  dstStable: 'Nein. Der Abstand bleibt das ganze Jahr gleich.',
  dstWho: city => `Nur ${city} stellt auf Sommerzeit um.`,
  dstNeither: 'Keine der beiden Städte stellt auf Sommerzeit um.',
  clockTitle: (a, b) => `Uhrzeit in ${a} → Uhrzeit in ${b}`,
  clockNote: 'Normalzeit (Januar). In der Sommerzeit verschiebt sich jede Zeile um eine Stunde.',
  prevDay: 'Vortag',
  nextDay: 'Folgetag',
  overlapTitle: 'Gemeinsame Arbeitszeit',
  overlapText: (a, b, from, to, hours) =>
    `Zwischen ${hh(from)} und ${hh(to)} in ${a} arbeitet auch ${b} — ${hours} Stunden am Tag.`,
  overlapNone: (a, b) => `Während der Arbeitszeit in ${a} (09:00–18:00) hat ${b} Feierabend. Eine Seite muss früh morgens oder spät abends ran.`,
  neighborsTitle: 'Andere Städtepaare',
  bothTitle: 'Beide Städte im Detail',
  faq: (a, b, gap, summer, shifts, overlap) => [
    { q: `Wie groß ist die Zeitverschiebung zwischen ${a} und ${b}?`, a: `${gap} in der Normalzeit.${shifts ? ` In der Sommerzeit sind es ${summer}.` : ''}` },
    { q: `Wie spät ist es in ${b}, wenn es in ${a} Mittag ist?`, a: 'Sieh in der 24-Stunden-Tabelle die Zeile 12:00. Die Tabelle gilt für Normalzeit; in der Sommerzeit verschiebt sich jede Zeile um eine Stunde.' },
    { q: 'Wann sollte ein Meeting liegen?', a: overlap > 0 ? `Die Arbeitszeiten (09:00–18:00) überschneiden sich ${overlap} Stunden am Tag. Alles in diesem Fenster trifft beide Seiten im Dienst.` : 'Die Arbeitszeiten überschneiden sich nicht. Eine Seite muss früh morgens oder spät abends ran.' },
  ],
};

const fr: PairUI = {
  noGap: 'Aucun décalage',
  dur: (h, m) => (m ? `${h} h ${m} min` : h === 1 ? '1 heure' : `${h} heures`),
  title: (a, b) => `Décalage horaire entre ${a} et ${b}`,
  metaTitle: (a, b, gap) => `Décalage horaire ${a} – ${b} — ${gap}`,
  metaDesc: (a, b, gap, summer, shifts) =>
    `${a} et ${b} sont séparées de ${gap} en heure standard.${shifts ? ` À l’heure d’été l’écart passe à ${summer}.` : ' L’heure d’été ne change pas l’écart.'} Avec un tableau de conversion sur 24 heures et les heures de travail communes.`,
  ahead: (fast, slow, gap) => `${fast} est en avance de ${gap} sur ${slow}.`,
  same: (a, b) => `${a} et ${b} n’ont aucun décalage — même heure.`,
  dstTitle: 'L’heure d’été change-t-elle cela ?',
  dstShifts: (winter, summer) => `Oui. En hiver l’écart est de ${winter}, en été de ${summer}.`,
  dstStable: 'Non. L’écart est le même toute l’année.',
  dstWho: city => `Seule ${city} applique l’heure d’été.`,
  dstNeither: 'Aucune des deux villes n’applique l’heure d’été.',
  clockTitle: (a, b) => `Heure à ${a} → heure à ${b}`,
  clockNote: 'Heure standard (janvier). À l’heure d’été chaque ligne se décale d’une heure.',
  prevDay: 'veille',
  nextDay: 'lendemain',
  overlapTitle: 'Heures de travail communes',
  overlapText: (a, b, from, to, hours) =>
    `Entre ${hh(from)} et ${hh(to)} à ${a}, ${b} travaille aussi — ${hours} heures par jour.`,
  overlapNone: (a, b) => `Pendant les heures de bureau de ${a} (09:00–18:00), ${b} ne travaille pas. Un côté devra prendre tôt le matin ou tard le soir.`,
  neighborsTitle: 'Autres paires de villes',
  bothTitle: 'Les deux villes en détail',
  faq: (a, b, gap, summer, shifts, overlap) => [
    { q: `Quel est le décalage horaire entre ${a} et ${b} ?`, a: `${gap} en heure standard.${shifts ? ` À l’heure d’été il passe à ${summer}.` : ''}` },
    { q: `Quelle heure est-il à ${b} quand il est midi à ${a} ?`, a: 'Regardez la ligne 12:00 du tableau sur 24 heures. Le tableau est en heure standard : à l’heure d’été chaque ligne se décale d’une heure.' },
    { q: 'À quelle heure caler une réunion ?', a: overlap > 0 ? `Les horaires de bureau (09:00–18:00) se recouvrent ${overlap} heures par jour. Tout créneau dans cette fenêtre attrape les deux côtés au travail.` : 'Les horaires ne se recouvrent pas. Un côté devra prendre tôt le matin ou tard le soir.' },
  ],
};

const hi: PairUI = {
  noGap: 'कोई अंतर नहीं',
  dur: (h, m) => (m ? `${h} घंटे ${m} मिनट` : h === 1 ? '1 घंटा' : `${h} घंटे`),
  title: (a, b) => `${a} और ${b} के बीच समय का अंतर`,
  metaTitle: (a, b, gap) => `${a} – ${b} समय अंतर — ${gap}`,
  metaDesc: (a, b, gap, summer, shifts) =>
    `${a} और ${b} के बीच मानक समय पर ${gap} का अंतर है।${shifts ? ` डेलाइट सेविंग के दौरान यह ${summer} हो जाता है।` : ' डेलाइट सेविंग से यह अंतर नहीं बदलता।'} साथ में 24 घंटे की तालिका और साझा कार्य-समय।`,
  ahead: (fast, slow, gap) => `${fast}, ${slow} से ${gap} आगे है।`,
  same: (a, b) => `${a} और ${b} में कोई समय अंतर नहीं है — दोनों एक ही घड़ी पर हैं।`,
  dstTitle: 'क्या डेलाइट सेविंग से यह बदलता है?',
  dstShifts: (winter, summer) => `हाँ। सर्दियों में अंतर ${winter} और गर्मियों में ${summer} होता है।`,
  dstStable: 'नहीं। पूरे साल अंतर एक जैसा रहता है।',
  dstWho: city => `केवल ${city} डेलाइट सेविंग अपनाता है।`,
  dstNeither: 'दोनों में से कोई भी शहर डेलाइट सेविंग नहीं अपनाता।',
  clockTitle: (a, b) => `${a} का समय → ${b} का समय`,
  clockNote: 'मानक समय (जनवरी) के अनुसार। डेलाइट सेविंग में हर पंक्ति एक घंटा खिसक जाती है।',
  prevDay: 'पिछला दिन',
  nextDay: 'अगला दिन',
  overlapTitle: 'साझा कार्य-समय',
  overlapText: (a, b, from, to, hours) =>
    `${a} में ${hh(from)} से ${hh(to)} के बीच ${b} भी काम पर होता है — दिन में ${hours} घंटे।`,
  overlapNone: (a, b) => `${a} के कार्य-समय (09:00–18:00) में ${b} काम पर नहीं होता। किसी एक को सुबह जल्दी या देर शाम लेनी पड़ेगी।`,
  neighborsTitle: 'दूसरे शहरों के जोड़े',
  bothTitle: 'दोनों शहर विस्तार से',
  faq: (a, b, gap, summer, shifts, overlap) => [
    { q: `${a} और ${b} में कितने घंटे का अंतर है?`, a: `मानक समय पर ${gap}।${shifts ? ` डेलाइट सेविंग में यह ${summer} हो जाता है।` : ''}` },
    { q: `${a} में दोपहर होने पर ${b} में क्या समय होता है?`, a: 'नीचे 24 घंटे की तालिका में 12:00 वाली पंक्ति देखें। तालिका मानक समय पर है, इसलिए डेलाइट सेविंग में हर पंक्ति एक घंटा खिसकती है।' },
    { q: 'बैठक किस समय रखें?', a: overlap > 0 ? `दोनों शहरों का कार्य-समय (09:00–18:00) दिन में ${overlap} घंटे मिलता है। उसी दायरे में रखें तो दोनों तरफ़ लोग काम पर होंगे।` : 'कार्य-समय बिलकुल नहीं मिलता। किसी एक को सुबह जल्दी या देर शाम लेनी पड़ेगी।' },
  ],
};

const zh: PairUI = {
  noGap: '没有时差',
  dur: (h, m) => (m ? `${h}小时${m}分` : `${h}小时`),
  title: (a, b) => `${a}与${b}的时差`,
  metaTitle: (a, b, gap) => `${a} ${b} 时差 — ${gap}`,
  metaDesc: (a, b, gap, summer, shifts) =>
    `${a}与${b}在标准时下相差${gap}。${shifts ? `夏令时期间变为${summer}。` : '夏令时不会改变这个时差。'}另有24小时对照表与重叠的上班时间。`,
  ahead: (fast, slow, gap) => `${fast}比${slow}快${gap}。`,
  same: (a, b) => `${a}与${b}没有时差，用的是同一个时刻。`,
  dstTitle: '夏令时会改变时差吗',
  dstShifts: (winter, summer) => `会。冬天是${winter}，夏天是${summer}。`,
  dstStable: '不会。全年时差相同。',
  dstWho: city => `只有${city}实行夏令时。`,
  dstNeither: '两个城市都不实行夏令时。',
  clockTitle: (a, b) => `${a}时间 → ${b}时间`,
  clockNote: '以标准时（1月）为准。夏令时期间每一行会错开一小时。',
  prevDay: '前一天',
  nextDay: '次日',
  overlapTitle: '重叠的上班时间',
  overlapText: (a, b, from, to, hours) =>
    `${a}的${hh(from)}至${hh(to)}，${b}也在上班时间，每天重叠${hours}小时。`,
  overlapNone: (a, b) => `${a}的上班时间（09:00–18:00）里${b}并不上班。总得有一方赶早或熬晚。`,
  neighborsTitle: '其他城市的时差',
  bothTitle: '两座城市详情',
  faq: (a, b, gap, summer, shifts, overlap) => [
    { q: `${a}和${b}相差几个小时？`, a: `标准时下${gap}。${shifts ? `夏令时期间变为${summer}。` : ''}` },
    { q: `${a}中午12点时${b}是几点？`, a: '看下面24小时对照表的12:00那一行。表格以标准时为准，夏令时期间每行错开一小时。' },
    { q: '会议该约在几点？', a: overlap > 0 ? `两地上班时间（09:00–18:00）每天重叠${overlap}小时，约在这个区间双方都在岗。` : '上班时间完全不重叠，总得有一方赶早或熬晚。' },
  ],
};

const tw: PairUI = {
  noGap: '沒有時差',
  dur: (h, m) => (m ? `${h}小時${m}分` : `${h}小時`),
  title: (a, b) => `${a}與${b}的時差`,
  metaTitle: (a, b, gap) => `${a} ${b} 時差 — ${gap}`,
  metaDesc: (a, b, gap, summer, shifts) =>
    `${a}與${b}在標準時下相差${gap}。${shifts ? `夏令時間期間變為${summer}。` : '夏令時間不會改變這個時差。'}另有24小時對照表與重疊的上班時間。`,
  ahead: (fast, slow, gap) => `${fast}比${slow}快${gap}。`,
  same: (a, b) => `${a}與${b}沒有時差，用的是同一個時刻。`,
  dstTitle: '夏令時間會改變時差嗎',
  dstShifts: (winter, summer) => `會。冬天是${winter}，夏天是${summer}。`,
  dstStable: '不會。全年時差相同。',
  dstWho: city => `只有${city}實行夏令時間。`,
  dstNeither: '兩個城市都不實行夏令時間。',
  clockTitle: (a, b) => `${a}時間 → ${b}時間`,
  clockNote: '以標準時（1月）為準。夏令時間期間每一列會錯開一小時。',
  prevDay: '前一天',
  nextDay: '隔日',
  overlapTitle: '重疊的上班時間',
  overlapText: (a, b, from, to, hours) =>
    `${a}的${hh(from)}至${hh(to)}，${b}也在上班時間，每天重疊${hours}小時。`,
  overlapNone: (a, b) => `${a}的上班時間（09:00–18:00）裡${b}並不上班。總得有一方趕早或熬晚。`,
  neighborsTitle: '其他城市的時差',
  bothTitle: '兩座城市詳情',
  faq: (a, b, gap, summer, shifts, overlap) => [
    { q: `${a}和${b}相差幾個小時？`, a: `標準時下${gap}。${shifts ? `夏令時間期間變為${summer}。` : ''}` },
    { q: `${a}中午12點時${b}是幾點？`, a: '看下面24小時對照表的12:00那一列。表格以標準時為準，夏令時間期間每列錯開一小時。' },
    { q: '會議該約在幾點？', a: overlap > 0 ? `兩地上班時間（09:00–18:00）每天重疊${overlap}小時，約在這個區間雙方都在崗。` : '上班時間完全不重疊，總得有一方趕早或熬晚。' },
  ],
};

export const PAIR_UI: L<PairUI> = { ko, en, es, pt, ja, de, fr, hi, zh, tw };

export const pairUi = (lang: Lang): PairUI => PAIR_UI[lang];

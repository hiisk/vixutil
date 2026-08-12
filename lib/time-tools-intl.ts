// node에서 직접 로드할 수 있게 확장자를 명시한다 (allowImportingTsExtensions)
import type { TimeTool } from './time-tools.ts';
import { TIME_TOOLS } from './time-tools.ts';
import { alternateLanguages10, localeHref, openGraphFor, type IntlLocale } from './locales.ts';
import { withCard } from './og-cards/index.ts';
import { relatedBySlug } from './related-window.ts';

/**
 * 시간 도구(/time) 섹션의 번역 메타데이터.
 *
 * slug·icon·gradient·og는 한국어와 공유한다. 언어별로 갈라지는 건 사람이 읽는
 * 문구뿐이라, 여기에는 그것만 둔다 — slug를 공유해야 hreflang이 여덟 언어를
 * 짝지을 수 있고, 도구가 추가돼도 한 곳만 채우면 된다.
 */
/**
 * 시간 도구 허브가 쓰는 언어 — 공용 IntlLocale에 중국어 둘을 더한다.
 * IntlLocale 자체를 넓히지 않는 이유는 lib/food-tools-intl.ts에 적어 두었다.
 */
export type ToolIntlLang = IntlLocale | 'zh-hans' | 'zh-hant';

interface ToolCopy {
  title: string;
  desc: string;
  category: string;
  metaTitle: string;
  long: string;
  features: string[];
}

const COPY: Record<ToolIntlLang, Record<string, ToolCopy>> = {
  en: {
    timer: {
      title: 'Timer', desc: 'Set a time and get a sound when it runs out', category: 'Measure',
      metaTitle: 'Online Timer — Free Countdown With Alarm',
      long: 'Set minutes and seconds, watch the remaining time in large digits, and get a sound when it finishes. Common lengths like three minutes or ten are one button away.',
      features: ['Quick 1, 3, 5 and 10 minute presets', 'Remaining time in large digits', 'Sound on finish', 'Countdown mirrored in the tab title'],
    },
    stopwatch: {
      title: 'Stopwatch', desc: 'Time something to the hundredth of a second', category: 'Measure',
      metaTitle: 'Online Stopwatch — Free, With Lap Times',
      long: 'Times to a hundredth of a second and records laps, so you can compare each split and see which was quickest.',
      features: ['Hundredth-of-a-second precision', 'Lap recording', 'Compare time per split', 'Fastest and slowest laps marked'],
    },
    pomodoro: {
      title: 'Pomodoro Timer', desc: 'Focus and break cycles, switched automatically', category: 'Measure',
      metaTitle: 'Pomodoro Timer — Free 25/5 Focus Cycles',
      long: 'Runs focus and break periods and switches between them for you, with a longer break every fourth round.',
      features: ['Automatic focus and break switching', 'Longer break every fourth round', 'Screen colour per phase', 'Completed pomodoros counted'],
    },
    alarm: {
      title: 'Alarm Clock', desc: 'Set a clock time and get a sound then', category: 'Measure',
      metaTitle: 'Online Alarm Clock — Free, Set Any Time',
      long: 'Set an hour and minute and the alarm sounds at that time, with the remaining wait shown alongside.',
      features: ['Set by hour and minute', 'Remaining time shown', 'Choose the alarm sound', 'Runs while the tab stays open'],
    },
    worldclock: {
      title: 'World Clock', desc: 'Current time in cities around the world', category: 'World time',
      metaTitle: 'World Clock — Current Time in Major Cities',
      long: 'Shows the current time in major cities at a glance, marking which are on a different date and which are inside working hours.',
      features: ['Current time in major cities', 'Different-date cities marked', 'Working hours and night marked', 'Add and remove cities'],
    },
    timezone: {
      title: 'Time Zone Converter', desc: 'Convert a time between two cities', category: 'World time',
      metaTitle: 'Time Zone Converter — Compare Two Cities Hour by Hour',
      long: 'Converts a time between two cities in both directions and lays the whole day out side by side, so the overlap in working hours is obvious.',
      features: ['Convert both directions', 'Whole-day comparison table', 'Overlapping working hours highlighted', 'Daylight saving applied automatically'],
    },
    workdays: {
      title: 'Working Days Calculator', desc: 'Count days excluding weekends', category: 'Date counting',
      metaTitle: 'Working Days Calculator — Business Days Between Dates',
      long: 'Counts working days between two dates with weekends excluded, and can also give the date a set number of working days ahead.',
      features: ['Working days excluding weekends', 'Add your own holidays', 'Date n working days later', 'Shown alongside total days'],
    },
    'date-add': {
      title: 'Date Calculator', desc: 'Add or subtract days, weeks, months and years', category: 'Date counting',
      metaTitle: 'Date Calculator — Add or Subtract From Any Date',
      long: 'Adds or subtracts days, weeks, months or years from a date, handling month-end properly and showing the resulting weekday.',
      features: ['Add or subtract days, weeks, months, years', 'Correct month-end handling (31 Jan + 1 month)', 'Resulting weekday shown', 'Quick 100-day and 1-year buttons'],
    },
    weeknumber: {
      title: 'Week Number', desc: 'Which ISO week and quarter a date falls in', category: 'Date counting',
      metaTitle: 'Week Number Calculator — ISO 8601 Week and Quarter',
      long: 'Gives the ISO 8601 week number for any date, along with the quarter, the day of the year and that week’s Monday to Sunday.',
      features: ['ISO 8601 week number', 'Quarter and day of year', 'Monday to Sunday of that week', 'Days remaining and progress'],
    },
    lived: {
      title: 'Time Lived Calculator', desc: 'How long you have been alive, in every unit', category: 'Date counting',
      metaTitle: 'Time Lived Calculator — Days, Hours and Minutes Since Birth',
      long: 'Converts your date of birth into years, months and days, then into total days, hours, minutes and seconds — with the next thousand-day milestone.',
      features: ['Years, months, days and total days', 'Converted to hours, minutes and seconds', 'Next 1,000-day milestone', 'Estimated heartbeats so far'],
    },
  },

  es: {
    timer: {
      title: 'Temporizador', desc: 'Fija un tiempo y suena cuando se acaba', category: 'Medir',
      metaTitle: 'Temporizador online — Cuenta atrás gratis con alarma',
      long: 'Fija minutos y segundos, mira el tiempo restante en dígitos grandes y suena al terminar. Las duraciones de siempre, tres minutos o diez, están a un botón.',
      features: ['Atajos rápidos de 1, 3, 5 y 10 minutos', 'Tiempo restante en dígitos grandes', 'Sonido al acabar', 'La cuenta atrás también en el título de la pestaña'],
    },
    stopwatch: {
      title: 'Cronómetro', desc: 'Cronometra a la centésima de segundo', category: 'Medir',
      metaTitle: 'Cronómetro online — Gratis, con vueltas',
      long: 'Cronometra a la centésima de segundo y registra vueltas, así puedes comparar cada parcial y ver cuál fue la más rápida.',
      features: ['Precisión de centésima de segundo', 'Registro de vueltas', 'Comparar el tiempo por parcial', 'Vuelta más rápida y más lenta marcadas'],
    },
    pomodoro: {
      title: 'Temporizador pomodoro', desc: 'Ciclos de concentración y descanso, con cambio automático', category: 'Medir',
      metaTitle: 'Temporizador pomodoro — Ciclos 25/5 gratis',
      long: 'Encadena periodos de concentración y descanso y cambia de uno a otro por ti, con un descanso más largo cada cuarta ronda.',
      features: ['Cambio automático entre concentración y descanso', 'Descanso largo cada cuarta ronda', 'Color de pantalla según la fase', 'Pomodoros completados contados'],
    },
    alarm: {
      title: 'Despertador', desc: 'Fija una hora del reloj y suena entonces', category: 'Medir',
      metaTitle: 'Despertador online — Gratis, a cualquier hora',
      long: 'Fija hora y minuto y la alarma suena a esa hora, con la espera restante al lado.',
      features: ['Fijar por hora y minuto', 'Tiempo restante a la vista', 'Elegir el sonido de la alarma', 'Funciona mientras la pestaña siga abierta'],
    },
    worldclock: {
      title: 'Reloj mundial', desc: 'Hora actual en ciudades de todo el mundo', category: 'Hora mundial',
      metaTitle: 'Reloj mundial — Hora actual en las grandes ciudades',
      long: 'Muestra de un vistazo la hora actual en las grandes ciudades, marcando cuáles están en otra fecha y cuáles están en horario laboral.',
      features: ['Hora actual en las grandes ciudades', 'Ciudades con otra fecha marcadas', 'Horario laboral y noche marcados', 'Añadir y quitar ciudades'],
    },
    timezone: {
      title: 'Conversor de zonas horarias', desc: 'Convierte una hora entre dos ciudades', category: 'Hora mundial',
      metaTitle: 'Conversor de zonas horarias — Compara dos ciudades hora por hora',
      long: 'Convierte una hora entre dos ciudades en los dos sentidos y despliega el día entero lado a lado, así el solape en horario laboral queda a la vista.',
      features: ['Convertir en los dos sentidos', 'Tabla de comparación del día completo', 'Horario laboral solapado resaltado', 'Horario de verano aplicado solo'],
    },
    workdays: {
      title: 'Calculadora de días laborables', desc: 'Cuenta días sin contar los fines de semana', category: 'Contar fechas',
      metaTitle: 'Calculadora de días laborables — Días hábiles entre fechas',
      long: 'Cuenta los días laborables entre dos fechas sin los fines de semana, y también da la fecha que queda a un número dado de días laborables.',
      features: ['Días laborables sin fines de semana', 'Añade tus propios festivos', 'Fecha n días laborables después', 'Mostrado junto al total de días'],
    },
    'date-add': {
      title: 'Calculadora de fechas', desc: 'Suma o resta días, semanas, meses y años', category: 'Contar fechas',
      metaTitle: 'Calculadora de fechas — Sumar o restar a cualquier fecha',
      long: 'Suma o resta días, semanas, meses o años a una fecha, tratando bien los finales de mes y mostrando el día de la semana resultante.',
      features: ['Sumar o restar días, semanas, meses, años', 'Fin de mes bien tratado (31 ene + 1 mes)', 'Día de la semana resultante', 'Botones rápidos de 100 días y 1 año'],
    },
    weeknumber: {
      title: 'Número de semana', desc: 'En qué semana ISO y trimestre cae una fecha', category: 'Contar fechas',
      metaTitle: 'Calculadora de número de semana — Semana ISO 8601 y trimestre',
      long: 'Da el número de semana ISO 8601 de cualquier fecha, junto con el trimestre, el día del año y el lunes a domingo de esa semana.',
      features: ['Número de semana ISO 8601', 'Trimestre y día del año', 'Lunes a domingo de esa semana', 'Días restantes y avance'],
    },
    lived: {
      title: 'Calculadora de tiempo vivido', desc: 'Cuánto llevas vivo, en todas las unidades', category: 'Contar fechas',
      metaTitle: 'Calculadora de tiempo vivido — Días, horas y minutos desde tu nacimiento',
      long: 'Convierte tu fecha de nacimiento en años, meses y días, y luego en total de días, horas, minutos y segundos — con el siguiente hito de mil días.',
      features: ['Años, meses, días y días totales', 'Convertido a horas, minutos y segundos', 'Siguiente hito de 1.000 días', 'Latidos estimados hasta ahora'],
    },
  },

  'pt-br': {
    timer: {
      title: 'Timer', desc: 'Defina um tempo e ele toca quando acaba', category: 'Medir',
      metaTitle: 'Timer online — Contagem regressiva grátis com alarme',
      long: 'Defina minutos e segundos, veja o tempo restante em dígitos grandes e ouça um som ao terminar. As durações de sempre, três minutos ou dez, estão a um botão.',
      features: ['Atalhos rápidos de 1, 3, 5 e 10 minutos', 'Tempo restante em dígitos grandes', 'Som ao terminar', 'A contagem também no título da aba'],
    },
    stopwatch: {
      title: 'Cronômetro', desc: 'Cronometra até o centésimo de segundo', category: 'Medir',
      metaTitle: 'Cronômetro online — Grátis, com voltas',
      long: 'Cronometra até o centésimo de segundo e registra voltas, então você compara cada parcial e vê qual foi a mais rápida.',
      features: ['Precisão de centésimo de segundo', 'Registro de voltas', 'Comparar o tempo por parcial', 'Volta mais rápida e mais lenta marcadas'],
    },
    pomodoro: {
      title: 'Timer pomodoro', desc: 'Ciclos de foco e pausa, trocados automaticamente', category: 'Medir',
      metaTitle: 'Timer pomodoro — Ciclos 25/5 grátis',
      long: 'Encadeia períodos de foco e pausa e troca entre eles para você, com uma pausa mais longa a cada quarta rodada.',
      features: ['Troca automática entre foco e pausa', 'Pausa longa a cada quarta rodada', 'Cor da tela conforme a fase', 'Pomodoros concluídos contados'],
    },
    alarm: {
      title: 'Despertador', desc: 'Defina uma hora do relógio e ele toca nela', category: 'Medir',
      metaTitle: 'Despertador online — Grátis, em qualquer horário',
      long: 'Defina hora e minuto e o alarme toca naquele horário, com o tempo de espera restante do lado.',
      features: ['Definir por hora e minuto', 'Tempo restante à vista', 'Escolher o som do alarme', 'Funciona enquanto a aba ficar aberta'],
    },
    worldclock: {
      title: 'Relógio mundial', desc: 'Hora atual em cidades do mundo', category: 'Hora mundial',
      metaTitle: 'Relógio mundial — Hora atual nas grandes cidades',
      long: 'Mostra num relance a hora atual nas grandes cidades, marcando quais estão em outra data e quais estão em horário de trabalho.',
      features: ['Hora atual nas grandes cidades', 'Cidades em outra data marcadas', 'Horário de trabalho e noite marcados', 'Adicionar e remover cidades'],
    },
    timezone: {
      title: 'Conversor de fusos horários', desc: 'Converta uma hora entre duas cidades', category: 'Hora mundial',
      metaTitle: 'Conversor de fusos horários — Compare duas cidades hora a hora',
      long: 'Converte uma hora entre duas cidades nos dois sentidos e abre o dia inteiro lado a lado, então a sobreposição de horário de trabalho fica evidente.',
      features: ['Converter nos dois sentidos', 'Tabela de comparação do dia inteiro', 'Horário de trabalho sobreposto destacado', 'Horário de verão aplicado sozinho'],
    },
    workdays: {
      title: 'Calculadora de dias úteis', desc: 'Conta dias sem contar os fins de semana', category: 'Contar datas',
      metaTitle: 'Calculadora de dias úteis — Dias úteis entre datas',
      long: 'Conta os dias úteis entre duas datas sem os fins de semana, e também dá a data que fica a um número definido de dias úteis à frente.',
      features: ['Dias úteis sem fins de semana', 'Adicione seus próprios feriados', 'Data n dias úteis depois', 'Mostrado ao lado do total de dias'],
    },
    'date-add': {
      title: 'Calculadora de datas', desc: 'Some ou subtraia dias, semanas, meses e anos', category: 'Contar datas',
      metaTitle: 'Calculadora de datas — Somar ou subtrair de qualquer data',
      long: 'Soma ou subtrai dias, semanas, meses ou anos de uma data, tratando bem os fins de mês e mostrando o dia da semana resultante.',
      features: ['Somar ou subtrair dias, semanas, meses, anos', 'Fim de mês tratado direito (31 jan + 1 mês)', 'Dia da semana resultante', 'Botões rápidos de 100 dias e 1 ano'],
    },
    weeknumber: {
      title: 'Número da semana', desc: 'Em que semana ISO e trimestre cai uma data', category: 'Contar datas',
      metaTitle: 'Calculadora de número da semana — Semana ISO 8601 e trimestre',
      long: 'Dá o número da semana ISO 8601 de qualquer data, junto com o trimestre, o dia do ano e a segunda a domingo daquela semana.',
      features: ['Número da semana ISO 8601', 'Trimestre e dia do ano', 'Segunda a domingo daquela semana', 'Dias restantes e progresso'],
    },
    lived: {
      title: 'Calculadora de tempo vivido', desc: 'Quanto tempo você já viveu, em todas as unidades', category: 'Contar datas',
      metaTitle: 'Calculadora de tempo vivido — Dias, horas e minutos desde o nascimento',
      long: 'Converte sua data de nascimento em anos, meses e dias, e depois em total de dias, horas, minutos e segundos — com o próximo marco de mil dias.',
      features: ['Anos, meses, dias e dias totais', 'Convertido em horas, minutos e segundos', 'Próximo marco de 1.000 dias', 'Batimentos estimados até agora'],
    },
  },

  ja: {
    timer: {
      title: 'タイマー', desc: '時間を決めると、ゼロになったときに音が鳴る', category: '計測',
      metaTitle: 'オンラインタイマー — 無料のカウントダウンとアラーム',
      long: '分と秒を決めると残り時間が大きな数字で表示され、終わったときに音が鳴ります。3分や10分といったよく使う長さはボタン一つです。',
      features: ['1分・3分・5分・10分のプリセット', '残り時間を大きな数字で表示', '終わったときに音が鳴る', 'タブのタイトルにも残り時間'],
    },
    stopwatch: {
      title: 'ストップウォッチ', desc: '100分の1秒まで計る', category: '計測',
      metaTitle: 'オンラインストップウォッチ — 無料・ラップ計測つき',
      long: '100分の1秒まで計り、ラップを記録します。区間ごとの時間を並べて、どれがいちばん速かったか比べられます。',
      features: ['100分の1秒の精度', 'ラップの記録', '区間ごとの時間を比較', '最速と最遅のラップに印'],
    },
    pomodoro: {
      title: 'ポモドーロタイマー', desc: '集中と休憩を自動で切り替える', category: '計測',
      metaTitle: 'ポモドーロタイマー — 無料の25分/5分サイクル',
      long: '集中時間と休憩時間を回し、自動で切り替えます。4回ごとに長めの休憩が入ります。',
      features: ['集中と休憩を自動で切り替え', '4回ごとに長い休憩', '段階ごとに画面の色が変わる', 'こなしたポモドーロを数える'],
    },
    alarm: {
      title: 'アラーム', desc: '時刻を決めると、その時刻に音が鳴る', category: '計測',
      metaTitle: 'オンラインアラーム — 無料・好きな時刻に設定',
      long: '時と分を決めると、その時刻にアラームが鳴ります。あと何分待つかも一緒に表示されます。',
      features: ['時と分で設定', '残り時間を表示', 'アラーム音を選べる', 'タブを開いているあいだ動きます'],
    },
    worldclock: {
      title: '世界時計', desc: '世界の都市の現在時刻', category: '世界時間',
      metaTitle: '世界時計 — 主要都市の現在時刻',
      long: '主要都市の現在時刻をひと目で表示し、日付が違う都市と勤務時間内の都市に印を付けます。',
      features: ['主要都市の現在時刻', '日付が違う都市に印', '勤務時間と夜間に印', '都市の追加と削除'],
    },
    timezone: {
      title: 'タイムゾーン変換', desc: '二つの都市のあいだで時刻を変換', category: '世界時間',
      metaTitle: 'タイムゾーン変換 — 二都市を1時間ずつ比較',
      long: '二つの都市の時刻を両方向に変換し、一日を並べて表示します。勤務時間が重なる帯がすぐ分かります。',
      features: ['両方向に変換', '一日まるごとの比較表', '重なる勤務時間を強調', 'サマータイムを自動で反映'],
    },
    workdays: {
      title: '営業日計算', desc: '土日を除いて日数を数える', category: '日付計算',
      metaTitle: '営業日計算 — 二つの日付のあいだの営業日',
      long: '二つの日付のあいだの営業日を、土日を除いて数えます。指定した営業日数だけ先の日付を出すこともできます。',
      features: ['土日を除いた営業日', '祝日を自分で追加できる', 'n営業日後の日付', '総日数と並べて表示'],
    },
    'date-add': {
      title: '日付計算', desc: '日・週・月・年を足したり引いたり', category: '日付計算',
      metaTitle: '日付計算 — どの日付にも足す・引く',
      long: 'ある日付に日・週・月・年を足したり引いたりします。月末の扱いも正しく処理し、出た日付の曜日も表示します。',
      features: ['日・週・月・年を足す・引く', '月末を正しく処理（1月31日＋1か月）', '出た日付の曜日を表示', '100日後・1年後のボタン'],
    },
    weeknumber: {
      title: '週番号', desc: 'その日付が何週目・第何四半期か', category: '日付計算',
      metaTitle: '週番号の計算 — ISO 8601の週と四半期',
      long: 'どの日付でもISO 8601の週番号を出し、四半期、その年の何日目か、その週の月曜から日曜も表示します。',
      features: ['ISO 8601の週番号', '四半期とその年の何日目か', 'その週の月曜から日曜', '残り日数と進み具合'],
    },
    lived: {
      title: '生きた時間の計算', desc: 'これまで生きた長さをあらゆる単位で', category: '日付計算',
      metaTitle: '生きた時間の計算 — 生まれてからの日数・時間・分',
      long: '生年月日を年・月・日に換算し、さらに総日数・時間・分・秒に直します。次の1000日の節目も出ます。',
      features: ['年・月・日と総日数', '時間・分・秒に換算', '次の1000日の節目', 'これまでの心拍数の推定'],
    },
  },

  de: {
    timer: {
      title: 'Timer', desc: 'Zeit einstellen und es klingelt, wenn sie um ist', category: 'Messen',
      metaTitle: 'Online-Timer — Kostenloser Countdown mit Alarm',
      long: 'Stell Minuten und Sekunden ein, sieh die Restzeit in großen Ziffern und hör einen Ton, wenn sie abgelaufen ist. Die üblichen Längen wie drei oder zehn Minuten liegen auf einem Knopf.',
      features: ['Schnellwahl 1, 3, 5 und 10 Minuten', 'Restzeit in großen Ziffern', 'Ton am Ende', 'Countdown auch im Tab-Titel'],
    },
    stopwatch: {
      title: 'Stoppuhr', desc: 'Misst auf die Hundertstelsekunde', category: 'Messen',
      metaTitle: 'Online-Stoppuhr — Kostenlos, mit Rundenzeiten',
      long: 'Misst auf die Hundertstelsekunde und hält Runden fest, sodass du jede Zwischenzeit vergleichen und die schnellste erkennen kannst.',
      features: ['Genauigkeit auf die Hundertstelsekunde', 'Rundenaufzeichnung', 'Zeit pro Abschnitt vergleichen', 'Schnellste und langsamste Runde markiert'],
    },
    pomodoro: {
      title: 'Pomodoro-Timer', desc: 'Konzentrations- und Pausenzyklen, automatisch gewechselt', category: 'Messen',
      metaTitle: 'Pomodoro-Timer — Kostenlose 25/5-Zyklen',
      long: 'Lässt Konzentrations- und Pausenphasen laufen und wechselt für dich zwischen ihnen, mit einer längeren Pause in jeder vierten Runde.',
      features: ['Automatischer Wechsel zwischen Arbeit und Pause', 'Längere Pause in jeder vierten Runde', 'Bildschirmfarbe je Phase', 'Abgeschlossene Pomodoros gezählt'],
    },
    alarm: {
      title: 'Wecker', desc: 'Uhrzeit einstellen und es klingelt dann', category: 'Messen',
      metaTitle: 'Online-Wecker — Kostenlos, zu jeder Uhrzeit',
      long: 'Stell Stunde und Minute ein und der Alarm klingelt zu dieser Zeit, mit der restlichen Wartezeit daneben.',
      features: ['Nach Stunde und Minute einstellen', 'Restzeit sichtbar', 'Weckton wählen', 'Läuft, solange der Tab offen bleibt'],
    },
    worldclock: {
      title: 'Weltzeituhr', desc: 'Aktuelle Zeit in Städten weltweit', category: 'Weltzeit',
      metaTitle: 'Weltzeituhr — Aktuelle Zeit in großen Städten',
      long: 'Zeigt die aktuelle Zeit in großen Städten auf einen Blick und markiert, welche schon ein anderes Datum haben und welche in der Arbeitszeit liegen.',
      features: ['Aktuelle Zeit in großen Städten', 'Städte mit anderem Datum markiert', 'Arbeitszeit und Nacht markiert', 'Städte hinzufügen und entfernen'],
    },
    timezone: {
      title: 'Zeitzonen-Umrechner', desc: 'Rechne eine Uhrzeit zwischen zwei Städten um', category: 'Weltzeit',
      metaTitle: 'Zeitzonen-Umrechner — Zwei Städte Stunde für Stunde',
      long: 'Rechnet eine Uhrzeit zwischen zwei Städten in beide Richtungen um und legt den ganzen Tag nebeneinander, damit die Überlappung der Arbeitszeiten offensichtlich wird.',
      features: ['In beide Richtungen umrechnen', 'Vergleichstabelle für den ganzen Tag', 'Überlappende Arbeitszeiten hervorgehoben', 'Sommerzeit automatisch berücksichtigt'],
    },
    workdays: {
      title: 'Arbeitstage-Rechner', desc: 'Zählt Tage ohne Wochenenden', category: 'Datumsrechnen',
      metaTitle: 'Arbeitstage-Rechner — Werktage zwischen zwei Daten',
      long: 'Zählt die Arbeitstage zwischen zwei Daten ohne Wochenenden und nennt auch das Datum, das eine bestimmte Zahl von Arbeitstagen später liegt.',
      features: ['Arbeitstage ohne Wochenenden', 'Eigene Feiertage ergänzen', 'Datum n Arbeitstage später', 'Neben der Gesamtzahl der Tage gezeigt'],
    },
    'date-add': {
      title: 'Datumsrechner', desc: 'Tage, Wochen, Monate und Jahre addieren oder abziehen', category: 'Datumsrechnen',
      metaTitle: 'Datumsrechner — Zu jedem Datum addieren oder abziehen',
      long: 'Addiert oder zieht Tage, Wochen, Monate oder Jahre von einem Datum ab, behandelt Monatsenden richtig und zeigt den resultierenden Wochentag.',
      features: ['Tage, Wochen, Monate, Jahre addieren oder abziehen', 'Monatsende richtig behandelt (31. Jan + 1 Monat)', 'Resultierender Wochentag', 'Schnelltasten für 100 Tage und 1 Jahr'],
    },
    weeknumber: {
      title: 'Kalenderwoche', desc: 'In welche ISO-Woche und welches Quartal ein Datum fällt', category: 'Datumsrechnen',
      metaTitle: 'Kalenderwoche berechnen — ISO-8601-Woche und Quartal',
      long: 'Nennt die ISO-8601-Kalenderwoche für jedes Datum, dazu das Quartal, den Tag im Jahr und den Montag bis Sonntag dieser Woche.',
      features: ['ISO-8601-Kalenderwoche', 'Quartal und Tag im Jahr', 'Montag bis Sonntag dieser Woche', 'Restliche Tage und Fortschritt'],
    },
    lived: {
      title: 'Gelebte-Zeit-Rechner', desc: 'Wie lange du schon lebst, in jeder Einheit', category: 'Datumsrechnen',
      metaTitle: 'Gelebte-Zeit-Rechner — Tage, Stunden und Minuten seit der Geburt',
      long: 'Rechnet dein Geburtsdatum in Jahre, Monate und Tage um und dann in Gesamttage, Stunden, Minuten und Sekunden — mit dem nächsten Tausend-Tage-Meilenstein.',
      features: ['Jahre, Monate, Tage und Gesamttage', 'In Stunden, Minuten und Sekunden umgerechnet', 'Nächster 1.000-Tage-Meilenstein', 'Geschätzte Herzschläge bis jetzt'],
    },
  },

  fr: {
    timer: {
      title: 'Minuteur', desc: 'Règle un temps et ça sonne quand il est écoulé', category: 'Mesurer',
      metaTitle: 'Minuteur en ligne — Compte à rebours gratuit avec alarme',
      long: 'Règle les minutes et les secondes, vois le temps restant en gros chiffres, et un son se déclenche à la fin. Les durées habituelles, trois minutes ou dix, sont à un bouton.',
      features: ['Raccourcis 1, 3, 5 et 10 minutes', 'Temps restant en gros chiffres', 'Son à la fin', 'Compte à rebours aussi dans le titre de l’onglet'],
    },
    stopwatch: {
      title: 'Chronomètre', desc: 'Chronomètre au centième de seconde', category: 'Mesurer',
      metaTitle: 'Chronomètre en ligne — Gratuit, avec tours',
      long: 'Chronomètre au centième de seconde et enregistre les tours, de sorte que tu peux comparer chaque intermédiaire et voir lequel a été le plus rapide.',
      features: ['Précision au centième de seconde', 'Enregistrement des tours', 'Comparer le temps par intermédiaire', 'Tour le plus rapide et le plus lent marqués'],
    },
    pomodoro: {
      title: 'Minuteur pomodoro', desc: 'Cycles de concentration et de pause, changés automatiquement', category: 'Mesurer',
      metaTitle: 'Minuteur pomodoro — Cycles 25/5 gratuits',
      long: 'Enchaîne des périodes de concentration et de pause et bascule pour toi de l’une à l’autre, avec une pause plus longue toutes les quatre manches.',
      features: ['Bascule automatique entre travail et pause', 'Pause plus longue toutes les quatre manches', 'Couleur d’écran selon la phase', 'Pomodoros terminés comptés'],
    },
    alarm: {
      title: 'Réveil', desc: 'Règle une heure et ça sonne à ce moment', category: 'Mesurer',
      metaTitle: 'Réveil en ligne — Gratuit, à n’importe quelle heure',
      long: 'Règle l’heure et les minutes et l’alarme sonne à ce moment, avec l’attente restante affichée à côté.',
      features: ['Régler par heure et minute', 'Temps restant affiché', 'Choisir le son de l’alarme', 'Fonctionne tant que l’onglet reste ouvert'],
    },
    worldclock: {
      title: 'Horloge mondiale', desc: 'Heure actuelle dans des villes du monde entier', category: 'Heure mondiale',
      metaTitle: 'Horloge mondiale — Heure actuelle dans les grandes villes',
      long: 'Affiche d’un coup d’œil l’heure actuelle dans les grandes villes, en marquant celles qui sont à une autre date et celles qui sont dans les heures de travail.',
      features: ['Heure actuelle dans les grandes villes', 'Villes à une autre date marquées', 'Heures de travail et nuit marquées', 'Ajouter et retirer des villes'],
    },
    timezone: {
      title: 'Convertisseur de fuseaux horaires', desc: 'Convertis une heure entre deux villes', category: 'Heure mondiale',
      metaTitle: 'Convertisseur de fuseaux — Compare deux villes heure par heure',
      long: 'Convertit une heure entre deux villes dans les deux sens et déroule la journée entière côte à côte : le chevauchement des heures de travail devient évident.',
      features: ['Convertir dans les deux sens', 'Tableau de comparaison sur la journée', 'Heures de travail communes surlignées', 'Heure d’été appliquée automatiquement'],
    },
    workdays: {
      title: 'Calculateur de jours ouvrés', desc: 'Compte les jours sans les week-ends', category: 'Compter les dates',
      metaTitle: 'Calculateur de jours ouvrés — Jours ouvrables entre deux dates',
      long: 'Compte les jours ouvrés entre deux dates hors week-ends, et donne aussi la date située un nombre donné de jours ouvrés plus loin.',
      features: ['Jours ouvrés hors week-ends', 'Ajoute tes propres jours fériés', 'Date n jours ouvrés plus tard', 'Affiché à côté du total de jours'],
    },
    'date-add': {
      title: 'Calculateur de dates', desc: 'Ajoute ou retire des jours, semaines, mois et années', category: 'Compter les dates',
      metaTitle: 'Calculateur de dates — Ajouter ou retirer à n’importe quelle date',
      long: 'Ajoute ou retire des jours, semaines, mois ou années à une date, gère correctement les fins de mois et affiche le jour de la semaine obtenu.',
      features: ['Ajouter ou retirer jours, semaines, mois, années', 'Fin de mois bien gérée (31 janv. + 1 mois)', 'Jour de la semaine obtenu', 'Boutons rapides 100 jours et 1 an'],
    },
    weeknumber: {
      title: 'Numéro de semaine', desc: 'Dans quelle semaine ISO et quel trimestre tombe une date', category: 'Compter les dates',
      metaTitle: 'Calculateur de numéro de semaine — Semaine ISO 8601 et trimestre',
      long: 'Donne le numéro de semaine ISO 8601 de n’importe quelle date, avec le trimestre, le jour de l’année et le lundi au dimanche de cette semaine.',
      features: ['Numéro de semaine ISO 8601', 'Trimestre et jour de l’année', 'Lundi au dimanche de cette semaine', 'Jours restants et progression'],
    },
    lived: {
      title: 'Calculateur de temps vécu', desc: 'Depuis combien de temps tu vis, dans toutes les unités', category: 'Compter les dates',
      metaTitle: 'Calculateur de temps vécu — Jours, heures et minutes depuis la naissance',
      long: 'Convertit ta date de naissance en années, mois et jours, puis en total de jours, heures, minutes et secondes — avec le prochain palier de mille jours.',
      features: ['Années, mois, jours et jours au total', 'Converti en heures, minutes et secondes', 'Prochain palier de 1 000 jours', 'Battements de cœur estimés jusqu’ici'],
    },
  },

  hi: {
    timer: {
      title: 'टाइमर', desc: 'समय तय करें, ख़त्म होने पर आवाज़ आती है', category: 'मापना',
      metaTitle: 'ऑनलाइन टाइमर — मुफ़्त उल्टी गिनती और अलार्म',
      long: 'मिनट और सेकंड तय करें, बचा समय बड़े अंकों में देखें, और ख़त्म होने पर आवाज़ सुनें। रोज़ की अवधियाँ — तीन मिनट, दस मिनट — एक बटन दूर हैं।',
      features: ['1, 3, 5 और 10 मिनट के तुरंत विकल्प', 'बचा समय बड़े अंकों में', 'ख़त्म होने पर आवाज़', 'टैब के शीर्षक में भी उल्टी गिनती'],
    },
    stopwatch: {
      title: 'स्टॉपवॉच', desc: 'सौवें सेकंड तक समय मापता है', category: 'मापना',
      metaTitle: 'ऑनलाइन स्टॉपवॉच — मुफ़्त, लैप समय के साथ',
      long: 'सौवें सेकंड तक मापता है और लैप दर्ज करता है, जिससे हर हिस्से का समय मिलाकर देख सकते हैं कि कौन सबसे तेज़ था।',
      features: ['सौवें सेकंड की सटीकता', 'लैप का रिकॉर्ड', 'हर हिस्से का समय तुलना', 'सबसे तेज़ और सबसे धीमा लैप चिह्नित'],
    },
    pomodoro: {
      title: 'पोमोडोरो टाइमर', desc: 'एकाग्रता और विश्राम के चक्र, अपने आप बदलते हुए', category: 'मापना',
      metaTitle: 'पोमोडोरो टाइमर — मुफ़्त 25/5 चक्र',
      long: 'एकाग्रता और विश्राम की अवधियाँ चलाता है और आपके लिए उनके बीच बदल देता है, हर चौथे दौर पर लंबा विश्राम।',
      features: ['एकाग्रता और विश्राम अपने आप बदलते हैं', 'हर चौथे दौर पर लंबा विश्राम', 'हर चरण में स्क्रीन का रंग', 'पूरे हुए पोमोडोरो गिने जाते हैं'],
    },
    alarm: {
      title: 'अलार्म घड़ी', desc: 'घड़ी का समय तय करें, उसी समय आवाज़ आती है', category: 'मापना',
      metaTitle: 'ऑनलाइन अलार्म घड़ी — मुफ़्त, किसी भी समय पर',
      long: 'घंटा और मिनट तय करें और उसी समय अलार्म बजता है, साथ में कितना इंतज़ार बाकी है यह भी दिखता है।',
      features: ['घंटे और मिनट से सेट करें', 'बचा समय दिखता है', 'अलार्म की आवाज़ चुनें', 'जब तक टैब खुला है तब तक चलता है'],
    },
    worldclock: {
      title: 'विश्व घड़ी', desc: 'दुनिया भर के शहरों का अभी का समय', category: 'विश्व समय',
      metaTitle: 'विश्व घड़ी — बड़े शहरों का अभी का समय',
      long: 'बड़े शहरों का अभी का समय एक नज़र में दिखाता है, और यह भी चिह्नित करता है कि कहाँ तारीख़ अलग है और कहाँ कामकाजी घंटे चल रहे हैं।',
      features: ['बड़े शहरों का अभी का समय', 'दूसरी तारीख़ वाले शहर चिह्नित', 'कामकाजी घंटे और रात चिह्नित', 'शहर जोड़ें और हटाएँ'],
    },
    timezone: {
      title: 'समय क्षेत्र कनवर्टर', desc: 'दो शहरों के बीच समय बदलें', category: 'विश्व समय',
      metaTitle: 'समय क्षेत्र कनवर्टर — दो शहरों की घंटे-दर-घंटे तुलना',
      long: 'दो शहरों के बीच समय दोनों दिशाओं में बदलता है और पूरा दिन साथ-साथ रखता है, जिससे कामकाजी घंटों का साझा हिस्सा साफ़ दिखता है।',
      features: ['दोनों दिशाओं में बदलें', 'पूरे दिन की तुलना तालिका', 'साझा कामकाजी घंटे उजागर', 'डेलाइट सेविंग अपने आप लागू'],
    },
    workdays: {
      title: 'कार्यदिवस कैलकुलेटर', desc: 'सप्ताहांत छोड़कर दिन गिनें', category: 'तारीख़ गिनती',
      metaTitle: 'कार्यदिवस कैलकुलेटर — दो तारीख़ों के बीच के कार्यदिवस',
      long: 'दो तारीख़ों के बीच के कार्यदिवस सप्ताहांत छोड़कर गिनता है, और तय संख्या के कार्यदिवस आगे की तारीख़ भी बता देता है।',
      features: ['सप्ताहांत छोड़कर कार्यदिवस', 'अपनी छुट्टियाँ जोड़ें', 'n कार्यदिवस बाद की तारीख़', 'कुल दिनों के साथ दिखता है'],
    },
    'date-add': {
      title: 'तारीख़ कैलकुलेटर', desc: 'दिन, सप्ताह, महीने और साल जोड़ें या घटाएँ', category: 'तारीख़ गिनती',
      metaTitle: 'तारीख़ कैलकुलेटर — किसी भी तारीख़ में जोड़ें या घटाएँ',
      long: 'किसी तारीख़ में दिन, सप्ताह, महीने या साल जोड़ता-घटाता है, महीने के अंत को ठीक से संभालता है और निकली तारीख़ का दिन भी बताता है।',
      features: ['दिन, सप्ताह, महीने, साल जोड़ें या घटाएँ', 'महीने का अंत ठीक से (31 जन + 1 महीना)', 'निकली तारीख़ का दिन', '100 दिन और 1 साल के तुरंत बटन'],
    },
    weeknumber: {
      title: 'सप्ताह संख्या', desc: 'कोई तारीख़ किस ISO सप्ताह और तिमाही में पड़ती है', category: 'तारीख़ गिनती',
      metaTitle: 'सप्ताह संख्या कैलकुलेटर — ISO 8601 सप्ताह और तिमाही',
      long: 'किसी भी तारीख़ की ISO 8601 सप्ताह संख्या बताता है, साथ में तिमाही, साल का कौन-सा दिन, और उस सप्ताह का सोमवार से रविवार।',
      features: ['ISO 8601 सप्ताह संख्या', 'तिमाही और साल का दिन', 'उस सप्ताह का सोमवार से रविवार', 'बचे दिन और प्रगति'],
    },
    lived: {
      title: 'जिए समय का कैलकुलेटर', desc: 'आप कितने समय से जी रहे हैं, हर इकाई में', category: 'तारीख़ गिनती',
      metaTitle: 'जिए समय का कैलकुलेटर — जन्म से अब तक दिन, घंटे और मिनट',
      long: 'आपकी जन्मतिथि को साल, महीने और दिन में बदलता है, फिर कुल दिन, घंटे, मिनट और सेकंड में — और अगला हज़ार दिन का पड़ाव भी।',
      features: ['साल, महीने, दिन और कुल दिन', 'घंटे, मिनट और सेकंड में बदला', 'अगला 1,000 दिन का पड़ाव', 'अब तक की अनुमानित धड़कनें'],
    },
  },
  'zh-hans': {
    timer: {
      title: '计时器', desc: '设好时间，到点响一声', category: '计时',
      metaTitle: '在线计时器 — 免费倒计时，带提示音',
      long: '定好分和秒，剩余时间用大字显示，走完会响一声。三分钟、十分钟这些常用长度，一按就好。',
      features: ['1、3、5、10 分钟的快捷预设', '剩余时间用大字显示', '结束时有提示音', '倒计时同步显示在标签标题上'],
    },
    stopwatch: {
      title: '秒表', desc: '精确到百分之一秒地计时', category: '计时',
      metaTitle: '在线秒表 — 免费，带分段计时',
      long: '精确到百分之一秒，还能记圈，每一段都能拿来比，哪一段最快一目了然。',
      features: ['百分之一秒的精度', '分段记圈', '逐段对比时间', '标出最快和最慢的一圈'],
    },
    pomodoro: {
      title: '番茄钟', desc: '专注和休息自动轮换', category: '计时',
      metaTitle: '番茄钟 — 免费的 25/5 专注循环',
      long: '把专注和休息两段串起来自动切换，每第四轮换成一段长休息。',
      features: ['专注与休息自动切换', '每第四轮进长休息', '不同阶段换屏幕颜色', '统计完成的番茄数'],
    },
    alarm: {
      title: '闹钟', desc: '定一个钟点，到时响铃', category: '计时',
      metaTitle: '在线闹钟 — 免费，可设任意时间',
      long: '定好时和分，到点就响，旁边还显示还要等多久。',
      features: ['按时和分设定', '显示剩余时间', '可挑闹铃声', '标签页开着就会运行'],
    },
    worldclock: {
      title: '世界时钟', desc: '世界各大城市现在几点', category: '世界时间',
      metaTitle: '世界时钟 — 主要城市的当前时间',
      long: '把各大城市的当前时间一眼摆出来，并标出哪些已经跨了日期、哪些正在上班时间里。',
      features: ['主要城市的当前时间', '标出日期不同的城市', '标出上班时间和深夜', '可以增删城市'],
    },
    timezone: {
      title: '时区换算', desc: '把一个时间在两座城市之间换算', category: '世界时间',
      metaTitle: '时区换算 — 两座城市逐小时对照',
      long: '在两座城市之间双向换算时间，并把一整天并排铺开，上班时间在哪里重叠一看就懂。',
      features: ['双向换算', '一整天的对照表', '突出显示重叠的上班时间', '自动套用夏令时'],
    },
    workdays: {
      title: '工作日计算', desc: '数天数时把周末去掉', category: '日期计算',
      metaTitle: '工作日计算 — 两个日期之间的工作天数',
      long: '算两个日期之间去掉周末的工作日，也能反过来给出「n 个工作日之后是哪天」。',
      features: ['去掉周末的工作日', '可自行加入节假日', 'n 个工作日之后的日期', '和总天数并排显示'],
    },
    'date-add': {
      title: '日期加减', desc: '加减天、周、月、年', category: '日期计算',
      metaTitle: '日期加减计算 — 从任意日期往前往后算',
      long: '在一个日期上加减天、周、月或年，月底的情况处理得当，还会告诉你结果是星期几。',
      features: ['加减天、周、月、年', '月底处理正确（1 月 31 日 + 1 个月）', '显示结果是星期几', '100 天、1 年的快捷按钮'],
    },
    weeknumber: {
      title: '周次查询', desc: '这个日期是第几周、第几季度', category: '日期计算',
      metaTitle: '周次计算 — ISO 8601 周次与季度',
      long: '给出任意日期的 ISO 8601 周次，附带季度、年内第几天，以及那一周从周一到周日的日期。',
      features: ['ISO 8601 周次', '季度和年内天数', '那一周的周一到周日', '今年还剩多少天和进度'],
    },
    lived: {
      title: '活了多久', desc: '把出生到现在换算成各种单位', category: '日期计算',
      metaTitle: '活了多久 — 出生至今的天数、小时数和分钟数',
      long: '把出生日期换算成年、月、日，再折成总天数、小时、分钟和秒 —— 还告诉你下一个千日纪念在哪天。',
      features: ['年月日和总天数', '折算成小时、分钟、秒', '下一个 1000 天的纪念日', '心跳次数的粗略估算'],
    },
  },
  'zh-hant': {
    timer: {
      title: '計時器', desc: '設好時間，到點響一聲', category: '計時',
      metaTitle: '線上計時器 — 免費倒數計時，帶提示音',
      long: '定好分和秒，剩餘時間用大字顯示，走完會響一聲。三分鐘、十分鐘這些常用長度，一按就好。',
      features: ['1、3、5、10 分鐘的快捷預設', '剩餘時間用大字顯示', '結束時有提示音', '倒數同步顯示在分頁標題上'],
    },
    stopwatch: {
      title: '碼表', desc: '精確到百分之一秒地計時', category: '計時',
      metaTitle: '線上碼表 — 免費，帶分段計時',
      long: '精確到百分之一秒，還能記圈，每一段都能拿來比，哪一段最快一目了然。',
      features: ['百分之一秒的精度', '分段記圈', '逐段對比時間', '標出最快和最慢的一圈'],
    },
    pomodoro: {
      title: '番茄鐘', desc: '專注和休息自動輪換', category: '計時',
      metaTitle: '番茄鐘 — 免費的 25/5 專注循環',
      long: '把專注和休息兩段串起來自動切換，每第四輪換成一段長休息。',
      features: ['專注與休息自動切換', '每第四輪進長休息', '不同階段換螢幕顏色', '統計完成的番茄數'],
    },
    alarm: {
      title: '鬧鐘', desc: '定一個鐘點，到時響鈴', category: '計時',
      metaTitle: '線上鬧鐘 — 免費，可設任意時間',
      long: '定好時和分，到點就響，旁邊還顯示還要等多久。',
      features: ['按時和分設定', '顯示剩餘時間', '可挑鬧鈴聲', '分頁開著就會運行'],
    },
    worldclock: {
      title: '世界時鐘', desc: '世界各大城市現在幾點', category: '世界時間',
      metaTitle: '世界時鐘 — 主要城市的目前時間',
      long: '把各大城市的目前時間一眼擺出來，並標出哪些已經跨了日期、哪些正在上班時間裡。',
      features: ['主要城市的目前時間', '標出日期不同的城市', '標出上班時間和深夜', '可以增刪城市'],
    },
    timezone: {
      title: '時區換算', desc: '把一個時間在兩座城市之間換算', category: '世界時間',
      metaTitle: '時區換算 — 兩座城市逐小時對照',
      long: '在兩座城市之間雙向換算時間，並把一整天並排鋪開，上班時間在哪裡重疊一看就懂。',
      features: ['雙向換算', '一整天的對照表', '突出顯示重疊的上班時間', '自動套用日光節約時間'],
    },
    workdays: {
      title: '工作日計算', desc: '數天數時把週末去掉', category: '日期計算',
      metaTitle: '工作日計算 — 兩個日期之間的工作天數',
      long: '算兩個日期之間去掉週末的工作日，也能反過來給出「n 個工作日之後是哪天」。',
      features: ['去掉週末的工作日', '可自行加入國定假日', 'n 個工作日之後的日期', '和總天數並排顯示'],
    },
    'date-add': {
      title: '日期加減', desc: '加減天、週、月、年', category: '日期計算',
      metaTitle: '日期加減計算 — 從任意日期往前往後算',
      long: '在一個日期上加減天、週、月或年，月底的情況處理得當，還會告訴你結果是星期幾。',
      features: ['加減天、週、月、年', '月底處理正確（1 月 31 日 + 1 個月）', '顯示結果是星期幾', '100 天、1 年的快捷按鈕'],
    },
    weeknumber: {
      title: '週次查詢', desc: '這個日期是第幾週、第幾季', category: '日期計算',
      metaTitle: '週次計算 — ISO 8601 週次與季',
      long: '給出任意日期的 ISO 8601 週次，附帶季、年內第幾天，以及那一週從週一到週日的日期。',
      features: ['ISO 8601 週次', '季和年內天數', '那一週的週一到週日', '今年還剩多少天和進度'],
    },
    lived: {
      title: '活了多久', desc: '把出生到現在換算成各種單位', category: '日期計算',
      metaTitle: '活了多久 — 出生至今的天數、小時數和分鐘數',
      long: '把出生日期換算成年、月、日，再折成總天數、小時、分鐘和秒 —— 還告訴你下一個千日紀念在哪天。',
      features: ['年月日和總天數', '折算成小時、分鐘、秒', '下一個 1000 天的紀念日', '心跳次數的粗略估算'],
    },
  },
};

/** 언어별 분류 순서. 여기 문자열은 위 category와 글자까지 같아야 한다 */
export const TIME_CATEGORY_ORDER: Record<ToolIntlLang, string[]> = {
  en: ['Measure', 'World time', 'Date counting'],
  es: ['Medir', 'Hora mundial', 'Contar fechas'],
  'pt-br': ['Medir', 'Hora mundial', 'Contar datas'],
  ja: ['計測', '世界時間', '日付計算'],
  de: ['Messen', 'Weltzeit', 'Datumsrechnen'],
  fr: ['Mesurer', 'Heure mondiale', 'Compter les dates'],
  hi: ['मापना', 'विश्व समय', 'तारीख़ गिनती'],
  'zh-hans': ['计时', '世界时间', '日期计算'],
  'zh-hant': ['計時', '世界時間', '日期計算'],
};

/** 언어별 도구 목록 — slug·icon·gradient는 한국어와 공유하고 문구만 갈아 끼운다 */
export function timeToolsIntl(lang: ToolIntlLang): TimeTool[] {
  return TIME_TOOLS.map(t => {
    const c = COPY[lang][t.slug];
    // 번역이 아직 없으면 한국어를 그대로 쓴다 — 도구가 추가돼도 화면이 깨지지 않는다
    return c ? { ...t, ...c } : t;
  });
}

export function findTimeToolIntl(lang: ToolIntlLang, slug: string): TimeTool | undefined {
  return timeToolsIntl(lang).find(t => t.slug === slug);
}

export function relatedTimeToolsIntl(lang: ToolIntlLang, slug: string, count = 4): TimeTool[] {
  /*
   * 이웃은 자기 자리 다음부터 원형으로 감아 고른다(lib/related-window.ts).
   * 전에는 `[...same, ...rest].slice(0, count)`였고, 그러면 갈래의 앞에서
   * 넉 개만 뽑혀 뒤쪽 도구에 **들어오는 링크가 0**이 됐다 — 여덟 섹션에서
   * 열두 도구가 그 상태였고 열 언어이므로 120쪽이었다.
   */
  return relatedBySlug(timeToolsIntl(lang), slug, count, (a, b) => a.category === b.category);
}

/** 라우트가 그대로 쓰는 메타데이터 — 문구를 라이브러리 한 곳에만 둔다 */
export function timeMetaIntl(lang: ToolIntlLang, slug: string) {
  const t = findTimeToolIntl(lang, slug);
  if (!t) throw new Error(`time-tools-intl: 도구가 없다 — ${slug}`);
  return withCard({
    title: t.metaTitle,
    description: t.long,
    openGraph: openGraphFor(lang),
    alternates: {
      canonical: localeHref(lang, `/time/${slug}`),
      languages: alternateLanguages10(`/time/${slug}`),
    },
  });
}

export function timeHubMetaIntl(lang: ToolIntlLang) {
  const ui = TIME_SHELL_UI[lang];
  return withCard({
    title: ui.hubTitle,
    description: ui.hubDesc,
    openGraph: openGraphFor(lang),
    alternates: {
      canonical: localeHref(lang, '/time'),
      languages: alternateLanguages10('/time'),
    },
  });
}

/** 셸·허브 UI 문구 */
export const TIME_SHELL_UI: Record<ToolIntlLang, {
  home: string; section: string; canDo: string; others: string;
  notice: string; footNote: string;
  hubTitle: string; hubDesc: string; hubLead: string; hubFoot: string; eyebrow: string;
}> = {
  en: {
    home: 'Home', section: 'Time tools',
    canDo: 'What this tool does', others: 'Other time tools',
    notice: '⏱️ Runs while this tab is open. No install, no sign-up.',
    footNote: 'Timer and alarm sounds may not fire if the device goes to sleep.',
    hubTitle: 'Time Tools — Timer, Stopwatch, World Clock, Date Maths',
    hubDesc: 'Free time tools in your browser: timer, stopwatch, pomodoro, alarm clock, world clock, time zone converter, working days, date calculator, week number and time lived.',
    hubLead: 'Everything runs while this tab is open — no install and no sign-up.',
    hubFoot: 'Free time tools', eyebrow: 'Time',
  },
  es: {
    home: 'Inicio', section: 'Herramientas de tiempo',
    canDo: 'Qué hace esta herramienta', others: 'Otras herramientas de tiempo',
    notice: '⏱️ Funciona mientras esta pestaña esté abierta. Sin instalar y sin registro.',
    footNote: 'Los sonidos del temporizador y la alarma pueden no dispararse si el aparato se duerme.',
    hubTitle: 'Herramientas de tiempo — Temporizador, cronómetro, reloj mundial, fechas',
    hubDesc: 'Herramientas de tiempo gratis en tu navegador: temporizador, cronómetro, pomodoro, despertador, reloj mundial, conversor de zonas horarias, días laborables, calculadora de fechas, número de semana y tiempo vivido.',
    hubLead: 'Todo funciona mientras esta pestaña esté abierta — sin instalar y sin registro.',
    hubFoot: 'Herramientas de tiempo gratis', eyebrow: 'Tiempo',
  },
  'pt-br': {
    home: 'Início', section: 'Ferramentas de tempo',
    canDo: 'O que esta ferramenta faz', others: 'Outras ferramentas de tempo',
    notice: '⏱️ Funciona enquanto esta aba estiver aberta. Sem instalar e sem cadastro.',
    footNote: 'Os sons do timer e do alarme podem não disparar se o aparelho entrar em repouso.',
    hubTitle: 'Ferramentas de tempo — Timer, cronômetro, relógio mundial, datas',
    hubDesc: 'Ferramentas de tempo grátis no navegador: timer, cronômetro, pomodoro, despertador, relógio mundial, conversor de fusos, dias úteis, calculadora de datas, número da semana e tempo vivido.',
    hubLead: 'Tudo funciona enquanto esta aba estiver aberta — sem instalar e sem cadastro.',
    hubFoot: 'Ferramentas de tempo grátis', eyebrow: 'Tempo',
  },
  ja: {
    home: 'ホーム', section: '時間ツール',
    canDo: 'このツールでできること', others: 'ほかの時間ツール',
    notice: '⏱️ このタブを開いているあいだ動きます。インストールも登録もありません。',
    footNote: '端末がスリープに入ると、タイマーやアラームの音が鳴らないことがあります。',
    hubTitle: '時間ツール — タイマー・ストップウォッチ・世界時計・日付計算',
    hubDesc: 'ブラウザで動く無料の時間ツール：タイマー、ストップウォッチ、ポモドーロ、アラーム、世界時計、タイムゾーン変換、営業日計算、日付計算、週番号、生きた時間。',
    hubLead: 'このタブを開いているあいだ動きます — インストールも登録もありません。',
    hubFoot: '無料の時間ツール', eyebrow: 'Time',
  },
  de: {
    home: 'Start', section: 'Zeitwerkzeuge',
    canDo: 'Was dieses Werkzeug macht', others: 'Weitere Zeitwerkzeuge',
    notice: '⏱️ Läuft, solange dieser Tab offen ist. Keine Installation, keine Anmeldung.',
    footNote: 'Timer- und Weckertöne können ausbleiben, wenn das Gerät in den Ruhezustand geht.',
    hubTitle: 'Zeitwerkzeuge — Timer, Stoppuhr, Weltzeituhr, Datumsrechnen',
    hubDesc: 'Kostenlose Zeitwerkzeuge im Browser: Timer, Stoppuhr, Pomodoro, Wecker, Weltzeituhr, Zeitzonen-Umrechner, Arbeitstage, Datumsrechner, Kalenderwoche und gelebte Zeit.',
    hubLead: 'Alles läuft, solange dieser Tab offen ist — keine Installation, keine Anmeldung.',
    hubFoot: 'Kostenlose Zeitwerkzeuge', eyebrow: 'Zeit',
  },
  fr: {
    home: 'Accueil', section: 'Outils de temps',
    canDo: 'Ce que fait cet outil', others: 'Autres outils de temps',
    notice: '⏱️ Fonctionne tant que cet onglet reste ouvert. Rien à installer, pas d’inscription.',
    footNote: 'Les sons du minuteur et du réveil peuvent ne pas se déclencher si l’appareil se met en veille.',
    hubTitle: 'Outils de temps — Minuteur, chronomètre, horloge mondiale, dates',
    hubDesc: 'Outils de temps gratuits dans le navigateur : minuteur, chronomètre, pomodoro, réveil, horloge mondiale, convertisseur de fuseaux, jours ouvrés, calculateur de dates, numéro de semaine et temps vécu.',
    hubLead: 'Tout fonctionne tant que cet onglet reste ouvert — rien à installer, pas d’inscription.',
    hubFoot: 'Outils de temps gratuits', eyebrow: 'Temps',
  },
  hi: {
    home: 'होम', section: 'समय उपकरण',
    canDo: 'यह उपकरण क्या करता है', others: 'अन्य समय उपकरण',
    notice: '⏱️ जब तक यह टैब खुला है तब तक चलता है। कुछ इंस्टॉल नहीं, रजिस्ट्रेशन नहीं।',
    footNote: 'उपकरण सो जाए तो टाइमर और अलार्म की आवाज़ नहीं बज सकती।',
    hubTitle: 'समय उपकरण — टाइमर, स्टॉपवॉच, विश्व घड़ी, तारीख़ गणित',
    hubDesc: 'ब्राउज़र में मुफ़्त समय उपकरण: टाइमर, स्टॉपवॉच, पोमोडोरो, अलार्म घड़ी, विश्व घड़ी, समय क्षेत्र कनवर्टर, कार्यदिवस, तारीख़ कैलकुलेटर, सप्ताह संख्या और जिया समय।',
    hubLead: 'जब तक यह टैब खुला है तब तक सब चलता है — कुछ इंस्टॉल नहीं, रजिस्ट्रेशन नहीं।',
    hubFoot: 'मुफ़्त समय उपकरण', eyebrow: 'समय',
  },
  'zh-hans': {
    home: '首页', section: '时间工具',
    canDo: '这个工具能做什么', others: '其他时间工具',
    notice: '⏱️ 标签页开着就会运行。不用装，也不用注册。',
    footNote: '设备一旦进入睡眠，计时器和闹钟的声音可能不会响。',
    hubTitle: '时间工具 — 计时器、秒表、世界时钟、日期计算',
    hubDesc: '浏览器里的免费时间工具：计时器、秒表、番茄钟、闹钟、世界时钟、时区换算、工作日计算、日期加减、周次查询和活了多久。',
    hubLead: '全部在这个标签页里运行 —— 不用装，也不用注册。',
    hubFoot: '免费时间工具', eyebrow: '时间',
  },
  'zh-hant': {
    home: '首頁', section: '時間工具',
    canDo: '這個工具能做什麼', others: '其他時間工具',
    notice: '⏱️ 分頁開著就會運行。不用裝，也不用註冊。',
    footNote: '裝置一旦進入睡眠，計時器和鬧鐘的聲音可能不會響。',
    hubTitle: '時間工具 — 計時器、碼表、世界時鐘、日期計算',
    hubDesc: '瀏覽器裡的免費時間工具：計時器、碼表、番茄鐘、鬧鐘、世界時鐘、時區換算、工作日計算、日期加減、週次查詢和活了多久。',
    hubLead: '全部在這個分頁裡運行 —— 不用裝，也不用註冊。',
    hubFoot: '免費時間工具', eyebrow: '時間',
  },
};

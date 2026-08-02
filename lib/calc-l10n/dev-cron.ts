import type { CalcLang, CalcTable } from './types.ts';
import { DEV_UI } from './dev-tools.ts';

function withUi(lang: CalcLang, extra: Record<string, string>): Record<string, string> {
  return { ...DEV_UI[lang], ...extra };
}

/**
 * 크론 표현식 도구.
 *
 * 요일 이름과 프리셋 설명이 언어별로 필요하다. 프리셋의 표현식 자체(`0 9 * * *`)는
 * 어디서나 같으므로 컴포넌트가 갖고, 여기에는 그것을 설명하는 말만 둔다.
 */
export const DEV_CRON: CalcTable = {
  en: {
    title: 'Cron expression helper',
    desc: 'Read a cron schedule in plain words, or start from a preset',
    short: 'Explain · presets · field reference',
    intro: [
      { h: 'Five fields, in this order', p: 'Minute, hour, day of month, month, day of week. An asterisk means every value. Getting the order wrong is the classic mistake — 0 9 * * * is nine in the morning, while 9 0 * * * is nine minutes past midnight.' },
      { h: 'Day-of-month and day-of-week are an OR', p: 'If you set both to something other than *, most cron implementations run the job when either matches, not both. A schedule of 0 0 1 * 1 fires on the first of the month and on every Monday.' },
    ],
    faq: [
      { q: 'Is Sunday 0 or 7?', a: 'Both, in most implementations. 0 and 7 each mean Sunday, which is why you sometimes see 0-6 and sometimes 1-7 in documentation.' },
      { q: 'What timezone does cron use?', a: 'The server’s, unless the scheduler says otherwise. This is worth checking before you assume a nightly job runs at midnight where you are.' },
      { q: 'What does */5 mean?', a: 'Every fifth value from the start of the range. In the minute field, */5 fires at 0, 5, 10 and so on — not "five minutes after the job last ran".' },
    ],
    ui: withUi('en', {
      expression: 'Cron expression', explain: 'In words', presets: 'Presets', fields: 'Fields',
      minute: 'Minute', hour: 'Hour', dayOfMonth: 'Day of month', month: 'Month', dayOfWeek: 'Day of week',
      pEveryMin: 'Every minute', pEvery5: 'Every 5 minutes', pHourly: 'Every hour, on the hour',
      pDaily: 'Every day at midnight', pDaily9: 'Every day at 9am', pWeekly: 'Every Monday at midnight',
      pMonthly: 'First day of the month at midnight', pWorkHours: 'Every hour, 9am–6pm, weekdays',
      invalidCron: 'A cron expression needs five fields separated by spaces.',
    }),
  },
  es: {
    title: 'Ayuda para expresiones cron',
    desc: 'Lee una programación cron en palabras, o parte de un preset',
    short: 'Explicar · presets · referencia',
    intro: [
      { h: 'Cinco campos, en este orden', p: 'Minuto, hora, día del mes, mes, día de la semana. Un asterisco significa todos los valores. Equivocar el orden es el error clásico: 0 9 * * * son las nueve de la mañana, mientras que 9 0 * * * son las 00:09.' },
      { h: 'Día del mes y día de la semana se combinan con O', p: 'Si pones ambos distintos de *, la mayoría de implementaciones ejecutan la tarea cuando coincide cualquiera de los dos, no los dos a la vez. 0 0 1 * 1 se dispara el día uno del mes y también todos los lunes.' },
    ],
    faq: [
      { q: '¿El domingo es 0 o 7?', a: 'Los dos, en casi todas las implementaciones. 0 y 7 significan domingo, y por eso a veces ves 0-6 y a veces 1-7 en la documentación.' },
      { q: '¿Qué zona horaria usa cron?', a: 'La del servidor, salvo que el planificador diga otra cosa. Conviene comprobarlo antes de dar por hecho que una tarea nocturna corre a medianoche donde tú estás.' },
      { q: '¿Qué significa */5?', a: 'Cada quinto valor desde el inicio del rango. En el campo de minutos, */5 se dispara en 0, 5, 10... y no «cinco minutos después de la última ejecución».' },
    ],
    ui: withUi('es', {
      expression: 'Expresión cron', explain: 'En palabras', presets: 'Presets', fields: 'Campos',
      minute: 'Minuto', hour: 'Hora', dayOfMonth: 'Día del mes', month: 'Mes', dayOfWeek: 'Día de la semana',
      pEveryMin: 'Cada minuto', pEvery5: 'Cada 5 minutos', pHourly: 'Cada hora en punto',
      pDaily: 'Todos los días a medianoche', pDaily9: 'Todos los días a las 9:00', pWeekly: 'Cada lunes a medianoche',
      pMonthly: 'El día 1 de cada mes a medianoche', pWorkHours: 'Cada hora de 9 a 18, de lunes a viernes',
      invalidCron: 'Una expresión cron necesita cinco campos separados por espacios.',
    }),
  },
  'pt-br': {
    title: 'Ajuda para expressões cron',
    desc: 'Leia um agendamento cron em palavras, ou comece de um preset',
    short: 'Explicar · presets · referência',
    intro: [
      { h: 'Cinco campos, nesta ordem', p: 'Minuto, hora, dia do mês, mês, dia da semana. Um asterisco quer dizer todos os valores. Errar a ordem é o engano clássico: 0 9 * * * são nove da manhã, enquanto 9 0 * * * são 00:09.' },
      { h: 'Dia do mês e dia da semana se combinam com OU', p: 'Se você definir os dois diferentes de *, a maioria das implementações roda a tarefa quando qualquer um bate, não os dois juntos. 0 0 1 * 1 dispara no dia 1 do mês e também em toda segunda-feira.' },
    ],
    faq: [
      { q: 'Domingo é 0 ou 7?', a: 'Os dois, na maioria das implementações. 0 e 7 significam domingo — é por isso que às vezes você vê 0-6 e às vezes 1-7 na documentação.' },
      { q: 'Que fuso o cron usa?', a: 'O do servidor, a menos que o agendador diga outra coisa. Vale conferir antes de supor que uma tarefa noturna roda à meia-noite onde você está.' },
      { q: 'O que significa */5?', a: 'Cada quinto valor a partir do início da faixa. No campo de minutos, */5 dispara em 0, 5, 10… e não "cinco minutos depois da última execução".' },
    ],
    ui: withUi('pt-br', {
      expression: 'Expressão cron', explain: 'Em palavras', presets: 'Presets', fields: 'Campos',
      minute: 'Minuto', hour: 'Hora', dayOfMonth: 'Dia do mês', month: 'Mês', dayOfWeek: 'Dia da semana',
      pEveryMin: 'A cada minuto', pEvery5: 'A cada 5 minutos', pHourly: 'A cada hora, na hora cheia',
      pDaily: 'Todo dia à meia-noite', pDaily9: 'Todo dia às 9h', pWeekly: 'Toda segunda à meia-noite',
      pMonthly: 'Dia 1 de cada mês à meia-noite', pWorkHours: 'A cada hora, 9h–18h, dias úteis',
      invalidCron: 'Uma expressão cron precisa de cinco campos separados por espaços.',
    }),
  },
  ja: {
    title: 'cron 式ヘルパー',
    desc: 'cron のスケジュールを言葉で読み、よく使う形から始める',
    short: '解説・定型・項目一覧',
    intro: [
      { h: '五つの項目、この順番', p: '分、時、日、月、曜日。アスタリスクはすべての値です。順番を取り違えるのが定番の失敗で、0 9 * * * は朝9時ですが、9 0 * * * は午前0時9分です。' },
      { h: '日と曜日は「または」', p: '日と曜日の両方を * 以外にすると、多くの実装ではどちらか一方に当てはまった時点で動きます。両方そろったときではありません。0 0 1 * 1 は毎月1日にも、毎週月曜にも動きます。' },
    ],
    faq: [
      { q: '日曜は 0 ですか 7 ですか。', a: 'たいていの実装ではどちらもです。0 も 7 も日曜を指すので、資料によって 0-6 と書かれたり 1-7 と書かれたりします。' },
      { q: 'cron はどの時間帯で動きますか。', a: 'スケジューラが別に指定していなければサーバーの時間帯です。深夜のジョブが自分のところの0時に動くと決めてかかる前に確かめる価値があります。' },
      { q: '*/5 はどういう意味ですか。', a: '範囲の先頭から5つおきです。分の欄なら 0、5、10… で動きます。「前回の実行から5分後」ではありません。' },
    ],
    ui: withUi('ja', {
      expression: 'cron 式', explain: '言葉にすると', presets: 'よく使う形', fields: '項目',
      minute: '分', hour: '時', dayOfMonth: '日', month: '月', dayOfWeek: '曜日',
      pEveryMin: '毎分', pEvery5: '5分おき', pHourly: '毎時0分',
      pDaily: '毎日0時', pDaily9: '毎日9時', pWeekly: '毎週月曜0時',
      pMonthly: '毎月1日0時', pWorkHours: '平日9〜18時の毎時',
      invalidCron: 'cron 式は空白で区切った五つの項目が必要です。',
    }),
  },
  de: {
    title: 'Cron-Ausdruck erklären',
    desc: 'Einen Cron-Zeitplan in Worten lesen oder von einer Vorlage ausgehen',
    short: 'Erklären · Vorlagen · Felder',
    intro: [
      { h: 'Fünf Felder, in dieser Reihenfolge', p: 'Minute, Stunde, Tag des Monats, Monat, Wochentag. Ein Sternchen heißt jeder Wert. Die Reihenfolge zu verwechseln ist der Klassiker: 0 9 * * * ist neun Uhr morgens, 9 0 * * * dagegen null Uhr neun.' },
      { h: 'Monatstag und Wochentag sind ein ODER', p: 'Setzt du beide auf etwas anderes als *, laufen die meisten Cron-Implementierungen den Job, sobald eines von beiden passt — nicht erst, wenn beide passen. 0 0 1 * 1 feuert am Monatsersten und an jedem Montag.' },
    ],
    faq: [
      { q: 'Ist Sonntag 0 oder 7?', a: 'In den meisten Implementierungen beides. 0 und 7 stehen für Sonntag, deshalb liest man in Dokumentationen mal 0-6 und mal 1-7.' },
      { q: 'Welche Zeitzone nutzt Cron?', a: 'Die des Servers, sofern der Scheduler nichts anderes sagt. Das lohnt zu prüfen, bevor man annimmt, ein nächtlicher Job laufe bei einem selbst um Mitternacht.' },
      { q: 'Was bedeutet */5?', a: 'Jeder fünfte Wert ab Beginn des Bereichs. Im Minutenfeld feuert */5 bei 0, 5, 10 und so weiter — nicht „fünf Minuten nach dem letzten Lauf“.' },
    ],
    ui: withUi('de', {
      expression: 'Cron-Ausdruck', explain: 'In Worten', presets: 'Vorlagen', fields: 'Felder',
      minute: 'Minute', hour: 'Stunde', dayOfMonth: 'Tag des Monats', month: 'Monat', dayOfWeek: 'Wochentag',
      pEveryMin: 'Jede Minute', pEvery5: 'Alle 5 Minuten', pHourly: 'Stündlich zur vollen Stunde',
      pDaily: 'Täglich um Mitternacht', pDaily9: 'Täglich um 9 Uhr', pWeekly: 'Jeden Montag um Mitternacht',
      pMonthly: 'Am Monatsersten um Mitternacht', pWorkHours: 'Stündlich von 9 bis 18 Uhr, werktags',
      invalidCron: 'Ein Cron-Ausdruck braucht fünf durch Leerzeichen getrennte Felder.',
    }),
  },
  fr: {
    title: 'Aide aux expressions cron',
    desc: 'Lire un planning cron en toutes lettres, ou partir d’un modèle',
    short: 'Expliquer · modèles · champs',
    intro: [
      { h: 'Cinq champs, dans cet ordre', p: 'Minute, heure, jour du mois, mois, jour de la semaine. Une astérisque signifie toutes les valeurs. Se tromper d’ordre est l’erreur classique : 0 9 * * * signifie neuf heures du matin, alors que 9 0 * * * signifie minuit neuf.' },
      { h: 'Jour du mois et jour de semaine forment un OU', p: 'Si vous mettez les deux à autre chose que *, la plupart des implémentations lancent la tâche dès que l’un des deux correspond, et non quand les deux correspondent. 0 0 1 * 1 se déclenche le 1er du mois et tous les lundis.' },
    ],
    faq: [
      { q: 'Dimanche, c’est 0 ou 7 ?', a: 'Les deux, dans la plupart des implémentations. 0 et 7 désignent dimanche, d’où le 0-6 dans certaines documentations et le 1-7 dans d’autres.' },
      { q: 'Quel fuseau horaire cron utilise-t-il ?', a: 'Celui du serveur, sauf indication contraire du planificateur. Cela mérite vérification avant de supposer qu’une tâche nocturne tourne à minuit chez vous.' },
      { q: 'Que veut dire */5 ?', a: 'Une valeur sur cinq depuis le début de la plage. Dans le champ des minutes, */5 se déclenche à 0, 5, 10, etc. — et non « cinq minutes après la dernière exécution ».' },
    ],
    ui: withUi('fr', {
      expression: 'Expression cron', explain: 'En toutes lettres', presets: 'Modèles', fields: 'Champs',
      minute: 'Minute', hour: 'Heure', dayOfMonth: 'Jour du mois', month: 'Mois', dayOfWeek: 'Jour de la semaine',
      pEveryMin: 'Chaque minute', pEvery5: 'Toutes les 5 minutes', pHourly: 'Chaque heure pile',
      pDaily: 'Chaque jour à minuit', pDaily9: 'Chaque jour à 9 h', pWeekly: 'Chaque lundi à minuit',
      pMonthly: 'Le 1er du mois à minuit', pWorkHours: 'Chaque heure de 9 h à 18 h, en semaine',
      invalidCron: 'Une expression cron demande cinq champs séparés par des espaces.',
    }),
  },
  hi: {
    title: 'क्रॉन एक्सप्रेशन सहायक',
    desc: 'क्रॉन शेड्यूल को शब्दों में पढ़ें, या तैयार नमूने से शुरू करें',
    short: 'व्याख्या · नमूने · खाने',
    intro: [
      { h: 'पाँच खाने, इसी क्रम में', p: 'मिनट, घंटा, महीने का दिन, महीना, सप्ताह का दिन। तारांकन का मतलब हर मान। क्रम उलट जाना सबसे आम भूल है — 0 9 * * * सुबह नौ बजे है, जबकि 9 0 * * * आधी रात के नौ मिनट बाद।' },
      { h: 'महीने का दिन और सप्ताह का दिन "या" से जुड़ते हैं', p: 'अगर दोनों को * से अलग रखें, तो ज़्यादातर क्रॉन दोनों में से कोई एक मिलते ही काम चला देते हैं, दोनों एक साथ मिलने पर नहीं। 0 0 1 * 1 महीने की पहली तारीख़ को भी चलेगा और हर सोमवार को भी।' },
    ],
    faq: [
      { q: 'रविवार 0 है या 7?', a: 'ज़्यादातर जगह दोनों। 0 और 7 दोनों रविवार हैं, इसीलिए कहीं 0-6 लिखा मिलता है और कहीं 1-7।' },
      { q: 'क्रॉन कौन-सा समय-क्षेत्र इस्तेमाल करता है?', a: 'सर्वर का, जब तक शेड्यूलर कुछ और न कहे। यह मान लेने से पहले जाँच लीजिए कि रात वाला काम आपके यहाँ की आधी रात को चलेगा।' },
      { q: '*/5 का क्या मतलब है?', a: 'दायरे की शुरुआत से हर पाँचवाँ मान। मिनट के खाने में */5 का मतलब 0, 5, 10… है — "पिछली बार चलने के पाँच मिनट बाद" नहीं।' },
    ],
    ui: withUi('hi', {
      expression: 'क्रॉन एक्सप्रेशन', explain: 'शब्दों में', presets: 'तैयार नमूने', fields: 'खाने',
      minute: 'मिनट', hour: 'घंटा', dayOfMonth: 'महीने का दिन', month: 'महीना', dayOfWeek: 'सप्ताह का दिन',
      pEveryMin: 'हर मिनट', pEvery5: 'हर 5 मिनट', pHourly: 'हर घंटे, पूरे बजे',
      pDaily: 'हर दिन आधी रात', pDaily9: 'हर दिन सुबह 9 बजे', pWeekly: 'हर सोमवार आधी रात',
      pMonthly: 'हर महीने की 1 तारीख़, आधी रात', pWorkHours: 'कार्यदिवसों में 9 से 18 बजे तक हर घंटे',
      invalidCron: 'क्रॉन एक्सप्रेशन में ख़ाली जगह से अलग किए पाँच खाने चाहिए।',
    }),
  },
  'zh-hans': {
    title: 'Cron 表达式助手',
    desc: '把 cron 计划读成人话，或者从常用模板开始',
    short: '解释 · 模板 · 字段速查',
    intro: [
      { h: '五个字段，就是这个顺序', p: '分、时、日、月、星期。星号表示所有取值。把顺序记反是最经典的错误——0 9 * * * 是早上九点，而 9 0 * * * 是零点零九分。' },
      { h: '日和星期是"或"的关系', p: '如果两者都不是 *，多数 cron 实现是任意一个匹配上就跑，而不是两个都满足。0 0 1 * 1 既在每月 1 号触发，也在每个星期一触发。' },
    ],
    faq: [
      { q: '星期天是 0 还是 7？', a: '多数实现里两个都是。0 和 7 都表示星期天，所以文档里有时写 0-6，有时写 1-7。' },
      { q: 'cron 用哪个时区？', a: '除非调度器另有设置，否则用服务器的时区。在你假定"夜里的任务会在我这边的零点跑"之前，值得先确认一下。' },
      { q: '*/5 是什么意思？', a: '从区间开头起每隔五个取值。在分钟字段里，*/5 会在 0、5、10… 触发，而不是"距上次运行五分钟后"。' },
    ],
    ui: withUi('zh-hans', {
      expression: 'Cron 表达式', explain: '读成人话', presets: '常用模板', fields: '字段',
      minute: '分', hour: '时', dayOfMonth: '日', month: '月', dayOfWeek: '星期',
      pEveryMin: '每分钟', pEvery5: '每 5 分钟', pHourly: '每小时整点',
      pDaily: '每天零点', pDaily9: '每天上午 9 点', pWeekly: '每周一零点',
      pMonthly: '每月 1 号零点', pWorkHours: '工作日 9 点到 18 点每小时',
      invalidCron: 'Cron 表达式需要用空格分开的五个字段。',
    }),
  },
  'zh-hant': {
    title: 'Cron 運算式助手',
    desc: '把 cron 排程讀成人話，或者從常用範本開始',
    short: '解釋 · 範本 · 欄位速查',
    intro: [
      { h: '五個欄位，就是這個順序', p: '分、時、日、月、星期。星號表示所有取值。把順序記反是最經典的錯誤——0 9 * * * 是早上九點，而 9 0 * * * 是零點零九分。' },
      { h: '日和星期是「或」的關係', p: '如果兩者都不是 *，多數 cron 實作是任意一個符合就跑，而不是兩個都滿足。0 0 1 * 1 既在每月 1 號觸發，也在每個星期一觸發。' },
    ],
    faq: [
      { q: '星期天是 0 還是 7？', a: '多數實作裡兩個都是。0 和 7 都表示星期天，所以文件裡有時寫 0-6，有時寫 1-7。' },
      { q: 'cron 用哪個時區？', a: '除非排程器另有設定，否則用伺服器的時區。在你假定「夜裡的工作會在我這邊的零點跑」之前，值得先確認一下。' },
      { q: '*/5 是什麼意思？', a: '從區間開頭起每隔五個取值。在分鐘欄位裡，*/5 會在 0、5、10… 觸發，而不是「距上次執行五分鐘後」。' },
    ],
    ui: withUi('zh-hant', {
      expression: 'Cron 運算式', explain: '讀成人話', presets: '常用範本', fields: '欄位',
      minute: '分', hour: '時', dayOfMonth: '日', month: '月', dayOfWeek: '星期',
      pEveryMin: '每分鐘', pEvery5: '每 5 分鐘', pHourly: '每小時整點',
      pDaily: '每天零點', pDaily9: '每天上午 9 點', pWeekly: '每週一零點',
      pMonthly: '每月 1 號零點', pWorkHours: '工作日 9 點到 18 點每小時',
      invalidCron: 'Cron 運算式需要用空格分開的五個欄位。',
    }),
  },
};

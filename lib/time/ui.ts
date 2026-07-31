/**
 * 도시 시계 화면의 문구 — 열 언어.
 *
 * 116곳 × 8언어 = 928벌을 손으로 쓸 수 없다. 도시마다 다른 것은 이름과 오프셋뿐
 * 이므로 문장 틀을 한 벌만 두고 계산된 값을 끼워 넣는다.
 */
import { alternates8, type L, type Lang8 } from '../i18n/lang.ts';
import type { TimeFacts } from './facts.ts';

export interface FaqItem { q: string; a: string }

/** 문구를 만들 때 필요한 도시의 사실 */
export interface CityFacts extends TimeFacts {
  city: string;
  country: string;
  /** 기준 도시(서울·뉴욕 등)와의 시차 — "+3:15" 꼴 */
  gaps: { city: string; label: string }[];
}

export interface TimeUI {
  home: string;
  section: string;
  hubTitle: string;
  hubLead: string;
  nowLabel: string;
  zoneLabel: string;
  offsetLabel: string;
  standardLabel: string;
  summerLabel: string;
  dstLabel: string;
  dstYes: string;
  dstNo: string;
  /** "60분" — 서머타임을 몇 분 앞당기는지 적을 때 */
  minuteLabel: (n: number) => string;
  gapTitle: string;
  gapNote: string;
  sameZoneTitle: string;
  howTitle: string;
  how: string[];
  faqTitle: string;
  regionLabel: Record<string, string>;
  hubMetaTitle: string;
  hubMetaDesc: string;
  metaTitle: (city: string) => string;
  metaDesc: (f: CityFacts) => string;
  hubFaq: FaqItem[];
  cityFaq: (f: CityFacts) => FaqItem[];
}

const RG = (asia: string, europe: string, america: string, africa: string, australia: string, pacific: string, atlantic: string) =>
  ({ Asia: asia, Europe: europe, America: america, Africa: africa, Australia: australia, Pacific: pacific, Atlantic: atlantic });

const ko: TimeUI = {
  home: '홈',
  section: '세계 시간',
  hubTitle: '세계 도시 116곳 현재 시각',
  hubLead: '도시를 골라 지금 몇 시인지, UTC 오프셋과 서머타임 여부, 다른 도시와의 시차를 확인하세요',
  nowLabel: '현재 시각',
  zoneLabel: '시간대',
  offsetLabel: 'UTC 오프셋',
  standardLabel: '표준시 (1월)',
  summerLabel: '여름 (7월)',
  dstLabel: '서머타임',
  dstYes: '사용',
  dstNo: '없음',
  minuteLabel: n => `${n}분`,
  gapTitle: '주요 도시와의 시차',
  gapNote: '표준시(1월) 기준입니다. 서머타임 기간에는 한 시간씩 달라집니다.',
  sameZoneTitle: '시차가 같거나 가까운 도시',
  howTitle: '읽는 방법',
  how: [
    '현재 시각은 브라우저가 계산합니다. 페이지를 열어 둔 채로도 초가 계속 흐릅니다.',
    'UTC 오프셋은 표준시와 서머타임을 따로 적었습니다. 같은 도시가 계절에 따라 한 시간 옮겨 갑니다.',
    '시차는 표준시(1월) 기준입니다. 남반구는 계절이 반대라 1월이 여름이고, 그때 시드니는 UTC+11입니다.',
    '30분·45분 단위 시간대가 있습니다. 인도는 +5:30, 네팔은 +5:45라서 시차를 소수로 적으면 몇 분인지 알 수 없습니다.',
  ],
  faqTitle: '자주 묻는 질문',
  regionLabel: RG('아시아', '유럽', '아메리카', '아프리카', '오세아니아', '태평양', '대서양'),
  hubMetaTitle: '세계 시간 — 도시 116곳 현재 시각과 시차',
  hubMetaDesc: '뉴욕·런던·도쿄·시드니 등 세계 도시 116곳의 현재 시각과 UTC 오프셋, 서머타임 여부, 서울·뉴욕·런던과의 시차를 한 곳에서 봅니다.',
  metaTitle: city => `${city} 현재 시각과 시차`,
  metaDesc: f =>
    `${f.country} ${f.city}의 시간대는 ${f.zone}이고 UTC ${f.standardLabel}입니다. ${f.dst ? `서머타임 기간에는 UTC ${f.summerLabel}로 한 시간 옮겨 갑니다.` : '서머타임을 쓰지 않아 한 해 내내 같습니다.'} 현재 시각과 주요 도시와의 시차를 함께 보여 줍니다.`,
  hubFaq: [
    {
      q: 'UTC 오프셋이 무엇인가요?',
      a: '세계 표준시(UTC)와 그 지역 시계의 차이입니다. 한국은 UTC+9라서 UTC로 0시일 때 서울은 오전 9시입니다. 오프셋만 알면 어느 두 도시의 시차도 뺄셈으로 나옵니다.',
    },
    {
      q: '서머타임은 어떻게 반영되나요?',
      a: '이 사전은 표준시(1월)와 여름(7월)의 오프셋을 따로 보여 줍니다. 남반구는 계절이 반대라 1월이 여름이고, 그래서 시드니는 1월에 UTC+11, 7월에 +10입니다.',
    },
    {
      q: '왜 30분·45분 단위 시간대가 있나요?',
      a: '시간대는 경도로만 정해지지 않고 나라가 정합니다. 인도는 국토를 한 시간대로 묶으려고 +5:30을, 네팔은 수도의 실제 태양시에 맞춰 +5:45를 씁니다.',
    },
    {
      q: '현재 시각은 어디서 오나요?',
      a: '브라우저의 시계에 IANA 시간대 규칙을 적용해 계산합니다. 서버에 묻지 않으므로 새로 고치지 않아도 초가 흐르고, 기기 시계가 맞으면 값도 맞습니다.',
    },
  ],
  cityFaq: f => [
    {
      q: `${f.city}는 지금 몇 시인가요?`,
      a: `이 페이지 맨 위에서 초 단위로 흐르는 시계가 ${f.city}의 현재 시각입니다. 시간대는 ${f.zone}, UTC ${f.standardLabel} 기준입니다.`,
    },
    {
      q: `${f.city}와 한국의 시차는 얼마인가요?`,
      a: `표준시 기준으로 ${f.gaps.map(g => `${g.city} ${g.label}`).join(', ')}입니다. 앞의 부호가 −이면 그 도시보다 늦은 시각입니다.`,
    },
    {
      q: `${f.city}는 서머타임을 쓰나요?`,
      a: f.dst
        ? `씁니다. 표준시는 UTC ${f.standardLabel}이고 서머타임 기간에는 UTC ${f.summerLabel}로 ${f.dstShift}분 앞당깁니다.`
        : `쓰지 않습니다. 한 해 내내 UTC ${f.standardLabel}이라 시차를 계절마다 다시 계산할 필요가 없습니다.`,
    },
    {
      q: `시간대 이름 ${f.zone}은 무엇인가요?`,
      a: 'IANA 시간대 데이터베이스의 이름입니다. 나라가 아니라 규칙이 같은 지역을 묶은 것이라, 한 나라에 여러 개가 있을 수도 있고 여러 나라가 하나를 함께 쓸 수도 있습니다.',
    },
    {
      q: '항공권이나 회의 시각은 이 값으로 계산해도 되나요?',
      a: '시차 계산에는 쓸 수 있지만, 서머타임 전환일 전후에는 하루 차이로 한 시간이 바뀝니다. 중요한 일정이라면 그 날짜의 현지 시각을 다시 확인하세요.',
    },
  ],
};

const en: TimeUI = {
  home: 'Home',
  section: 'World clock',
  hubTitle: 'Current Time in 116 Cities',
  hubLead: 'Pick a city to see the time there now, its UTC offset and daylight saving, and how far ahead or behind other cities it is',
  nowLabel: 'Time now',
  zoneLabel: 'Time zone',
  offsetLabel: 'UTC offset',
  standardLabel: 'Standard (January)',
  summerLabel: 'Summer (July)',
  dstLabel: 'Daylight saving',
  dstYes: 'Observed',
  dstNo: 'None',
  minuteLabel: n => `${n} min`,
  gapTitle: 'Difference from major cities',
  gapNote: 'Standard time (January). During daylight saving each shifts by an hour.',
  sameZoneTitle: 'Cities on the same or a nearby offset',
  howTitle: 'How to read this',
  how: [
    'The clock is computed in your browser, so the seconds keep running while the page stays open.',
    'The UTC offset is listed for standard time and for summer separately — the same city moves by an hour with the season.',
    'Differences use standard time (January). The southern hemisphere is inverted: January is summer there, so Sydney is UTC+11 then.',
    'Some zones sit on the half or quarter hour. India is +5:30 and Nepal +5:45, which is why a decimal figure cannot say how many minutes.',
  ],
  faqTitle: 'Frequently asked questions',
  regionLabel: RG('Asia', 'Europe', 'Americas', 'Africa', 'Oceania', 'Pacific', 'Atlantic'),
  hubMetaTitle: 'World Clock — current time and offsets for 116 cities',
  hubMetaDesc: 'Current local time, UTC offset and daylight saving for 116 cities including New York, London, Tokyo and Sydney, with the difference from Seoul, New York and London.',
  metaTitle: city => `Current time in ${city}`,
  metaDesc: f =>
    `${f.city}, ${f.country} keeps ${f.zone}, UTC ${f.standardLabel}. ${f.dst ? `During daylight saving it moves to UTC ${f.summerLabel}.` : 'It observes no daylight saving, so the offset holds all year.'} See the time now and the difference from other major cities.`,
  hubFaq: [
    {
      q: 'What is a UTC offset?',
      a: 'The gap between Coordinated Universal Time and the local clock. Korea is UTC+9, so when UTC reads midnight, Seoul reads 9 in the morning. Knowing two offsets gives you the difference by subtraction.',
    },
    {
      q: 'How is daylight saving handled?',
      a: 'Each city lists the offset for standard time (January) and for summer (July) separately. The southern hemisphere is flipped: January is summer there, which is why Sydney is UTC+11 in January and +10 in July.',
    },
    {
      q: 'Why do some zones sit on the half hour?',
      a: 'Zones are set by countries, not by longitude alone. India uses +5:30 to keep one zone across the country; Nepal uses +5:45 to match the true solar time of its capital.',
    },
    {
      q: 'Where does the current time come from?',
      a: 'Your browser’s clock with the IANA time-zone rules applied. No server is asked, so the seconds run without a refresh and the value is right as long as your device clock is.',
    },
  ],
  cityFaq: f => [
    {
      q: `What time is it in ${f.city} right now?`,
      a: `The clock at the top of this page ticks in ${f.city} local time. The zone is ${f.zone}, UTC ${f.standardLabel} in standard time.`,
    },
    {
      q: `How many hours ahead or behind is ${f.city}?`,
      a: `In standard time: ${f.gaps.map(g => `${g.city} ${g.label}`).join(', ')}. A minus sign means ${f.city} is behind that city.`,
    },
    {
      q: `Does ${f.city} observe daylight saving?`,
      a: f.dst
        ? `Yes. Standard time is UTC ${f.standardLabel} and during daylight saving the clock moves ${f.dstShift} minutes forward to UTC ${f.summerLabel}.`
        : `No. It stays at UTC ${f.standardLabel} all year, so the difference never needs recalculating by season.`,
    },
    {
      q: `What does the zone name ${f.zone} mean?`,
      a: 'It is an identifier from the IANA time-zone database. Zones group areas that share the same rules rather than following borders, so one country can hold several and several countries can share one.',
    },
    {
      q: 'Can I plan flights or meetings from these figures?',
      a: 'They are fine for working out the difference, but around a daylight-saving switch a single day changes the answer by an hour. For anything that matters, check the local time on that date.',
    },
  ],
};

const es: TimeUI = {
  home: 'Inicio',
  section: 'Hora mundial',
  hubTitle: 'Hora actual en 116 ciudades',
  hubLead: 'Elige una ciudad y consulta qué hora es allí, su desfase UTC y el horario de verano, y cuánto se adelanta o retrasa respecto a otras ciudades',
  nowLabel: 'Hora actual',
  zoneLabel: 'Zona horaria',
  offsetLabel: 'Desfase UTC',
  standardLabel: 'Estándar (enero)',
  summerLabel: 'Verano (julio)',
  dstLabel: 'Horario de verano',
  dstYes: 'Sí',
  dstNo: 'No',
  minuteLabel: n => `${n} min`,
  gapTitle: 'Diferencia con ciudades principales',
  gapNote: 'Hora estándar (enero). Con el horario de verano cada una cambia una hora.',
  sameZoneTitle: 'Ciudades con el mismo desfase o parecido',
  howTitle: 'Cómo se lee',
  how: [
    'El reloj se calcula en tu navegador, así que los segundos siguen corriendo mientras la página está abierta.',
    'El desfase UTC se indica por separado para la hora estándar y para el verano: la misma ciudad se mueve una hora con la estación.',
    'Las diferencias usan la hora estándar (enero). El hemisferio sur está invertido: allí enero es verano, y por eso Sídney está en UTC+11.',
    'Hay zonas a media hora o a cuarto de hora. India está en +5:30 y Nepal en +5:45, por lo que un número decimal no dice cuántos minutos son.',
  ],
  faqTitle: 'Preguntas frecuentes',
  regionLabel: RG('Asia', 'Europa', 'América', 'África', 'Oceanía', 'Pacífico', 'Atlántico'),
  hubMetaTitle: 'Hora mundial — hora actual y desfases de 116 ciudades',
  hubMetaDesc: 'Hora local actual, desfase UTC y horario de verano de 116 ciudades como Nueva York, Londres, Tokio y Sídney, con la diferencia respecto a Seúl, Nueva York y Londres.',
  metaTitle: city => `Hora actual en ${city}`,
  metaDesc: f =>
    `${f.city} (${f.country}) usa ${f.zone}, UTC ${f.standardLabel}. ${f.dst ? `Con el horario de verano pasa a UTC ${f.summerLabel}.` : 'No aplica horario de verano, así que el desfase se mantiene todo el año.'} Consulta la hora actual y la diferencia con otras ciudades.`,
  hubFaq: [
    {
      q: '¿Qué es el desfase UTC?',
      a: 'La diferencia entre el Tiempo Universal Coordinado y el reloj local. Corea está en UTC+9, así que cuando en UTC son las 0:00 en Seúl son las 9 de la mañana. Con dos desfases, la diferencia sale por resta.',
    },
    {
      q: '¿Cómo se trata el horario de verano?',
      a: 'Cada ciudad muestra el desfase de la hora estándar (enero) y del verano (julio) por separado. El hemisferio sur está invertido: allí enero es verano, y por eso Sídney está en UTC+11 en enero y en +10 en julio.',
    },
    {
      q: '¿Por qué hay zonas a media hora?',
      a: 'Las zonas las fijan los países, no solo la longitud. India usa +5:30 para tener una sola zona en todo el país; Nepal usa +5:45 para ajustarse a la hora solar real de su capital.',
    },
    {
      q: '¿De dónde sale la hora actual?',
      a: 'Del reloj de tu navegador con las reglas de zonas horarias de la IANA aplicadas. No se consulta ningún servidor, así que los segundos corren sin recargar y el valor es correcto si tu dispositivo va en hora.',
    },
  ],
  cityFaq: f => [
    {
      q: `¿Qué hora es ahora en ${f.city}?`,
      a: `El reloj de arriba marca la hora local de ${f.city}. La zona es ${f.zone}, UTC ${f.standardLabel} en hora estándar.`,
    },
    {
      q: `¿Cuántas horas de diferencia tiene ${f.city}?`,
      a: `En hora estándar: ${f.gaps.map(g => `${g.city} ${g.label}`).join(', ')}. El signo menos significa que ${f.city} va por detrás de esa ciudad.`,
    },
    {
      q: `¿${f.city} aplica horario de verano?`,
      a: f.dst
        ? `Sí. La hora estándar es UTC ${f.standardLabel} y en verano el reloj se adelanta ${f.dstShift} minutos hasta UTC ${f.summerLabel}.`
        : `No. Se mantiene en UTC ${f.standardLabel} todo el año, así que la diferencia no cambia con la estación.`,
    },
    {
      q: `¿Qué significa el nombre de zona ${f.zone}?`,
      a: 'Es un identificador de la base de datos de zonas horarias de la IANA. Agrupa áreas con las mismas reglas en vez de seguir fronteras, así que un país puede tener varias y varios países compartir una.',
    },
    {
      q: '¿Sirve para planear vuelos o reuniones?',
      a: 'Sirve para calcular la diferencia, pero alrededor del cambio de horario un solo día altera la respuesta en una hora. Si algo importa, comprueba la hora local en esa fecha.',
    },
  ],
};

const pt: TimeUI = {
  home: 'Início',
  section: 'Hora mundial',
  hubTitle: 'Hora atual em 116 cidades',
  hubLead: 'Escolha uma cidade e veja que horas são lá, o fuso UTC e o horário de verão, e quanto está adiantada ou atrasada em relação a outras cidades',
  nowLabel: 'Hora atual',
  zoneLabel: 'Fuso horário',
  offsetLabel: 'Fuso UTC',
  standardLabel: 'Padrão (janeiro)',
  summerLabel: 'Verão (julho)',
  dstLabel: 'Horário de verão',
  dstYes: 'Sim',
  dstNo: 'Não',
  minuteLabel: n => `${n} min`,
  gapTitle: 'Diferença em relação a grandes cidades',
  gapNote: 'Hora padrão (janeiro). No horário de verão cada uma muda uma hora.',
  sameZoneTitle: 'Cidades com o mesmo fuso ou próximo',
  howTitle: 'Como ler',
  how: [
    'O relógio é calculado no seu navegador, então os segundos continuam correndo enquanto a página fica aberta.',
    'O fuso UTC aparece separado para a hora padrão e para o verão — a mesma cidade se move uma hora com a estação.',
    'As diferenças usam a hora padrão (janeiro). O hemisfério sul é invertido: lá janeiro é verão, e por isso Sydney fica em UTC+11.',
    'Há fusos de meia hora e de quarenta e cinco minutos. A Índia usa +5:30 e o Nepal +5:45, então um número decimal não diz quantos minutos são.',
  ],
  faqTitle: 'Perguntas frequentes',
  regionLabel: RG('Ásia', 'Europa', 'Américas', 'África', 'Oceania', 'Pacífico', 'Atlântico'),
  hubMetaTitle: 'Hora mundial — hora atual e fusos de 116 cidades',
  hubMetaDesc: 'Hora local atual, fuso UTC e horário de verão de 116 cidades como Nova York, Londres, Tóquio e Sydney, com a diferença em relação a Seul, Nova York e Londres.',
  metaTitle: city => `Hora atual em ${city}`,
  metaDesc: f =>
    `${f.city} (${f.country}) usa ${f.zone}, UTC ${f.standardLabel}. ${f.dst ? `No horário de verão passa a UTC ${f.summerLabel}.` : 'Não adota horário de verão, então o fuso vale o ano todo.'} Veja a hora atual e a diferença em relação a outras cidades.`,
  hubFaq: [
    {
      q: 'O que é o fuso UTC?',
      a: 'A diferença entre o Tempo Universal Coordenado e o relógio local. A Coreia é UTC+9, então quando em UTC é meia-noite, em Seul são 9 da manhã. Com dois fusos, a diferença sai por subtração.',
    },
    {
      q: 'Como o horário de verão é tratado?',
      a: 'Cada cidade mostra o fuso da hora padrão (janeiro) e do verão (julho) separadamente. O hemisfério sul é invertido: lá janeiro é verão, e por isso Sydney fica em UTC+11 em janeiro e +10 em julho.',
    },
    {
      q: 'Por que existem fusos de meia hora?',
      a: 'Os fusos são definidos pelos países, não só pela longitude. A Índia usa +5:30 para manter um fuso único no país; o Nepal usa +5:45 para acompanhar a hora solar real da capital.',
    },
    {
      q: 'De onde vem a hora atual?',
      a: 'Do relógio do seu navegador com as regras de fuso da IANA aplicadas. Nenhum servidor é consultado, então os segundos correm sem recarregar e o valor está certo se o relógio do aparelho estiver.',
    },
  ],
  cityFaq: f => [
    {
      q: `Que horas são agora em ${f.city}?`,
      a: `O relógio no topo desta página marca a hora local de ${f.city}. O fuso é ${f.zone}, UTC ${f.standardLabel} na hora padrão.`,
    },
    {
      q: `Qual é a diferença de horas de ${f.city}?`,
      a: `Na hora padrão: ${f.gaps.map(g => `${g.city} ${g.label}`).join(', ')}. O sinal de menos indica que ${f.city} está atrás daquela cidade.`,
    },
    {
      q: `${f.city} adota horário de verão?`,
      a: f.dst
        ? `Sim. A hora padrão é UTC ${f.standardLabel} e no verão o relógio adianta ${f.dstShift} minutos para UTC ${f.summerLabel}.`
        : `Não. Fica em UTC ${f.standardLabel} o ano todo, então a diferença não muda com a estação.`,
    },
    {
      q: `O que significa o nome de fuso ${f.zone}?`,
      a: 'É um identificador do banco de dados de fusos da IANA. Ele agrupa áreas com as mesmas regras em vez de seguir fronteiras, então um país pode ter vários e vários países podem compartilhar um.',
    },
    {
      q: 'Posso planejar voos ou reuniões com esses números?',
      a: 'Servem para calcular a diferença, mas perto da virada do horário de verão um único dia muda a resposta em uma hora. Para algo importante, confira a hora local naquela data.',
    },
  ],
};

const ja: TimeUI = {
  home: 'ホーム',
  section: '世界時計',
  hubTitle: '世界116都市の現在時刻',
  hubLead: '都市を選ぶと、いま何時か、UTCオフセットと夏時間の有無、他都市との時差が分かります',
  nowLabel: '現在時刻',
  zoneLabel: 'タイムゾーン',
  offsetLabel: 'UTCオフセット',
  standardLabel: '標準時（1月）',
  summerLabel: '夏（7月）',
  dstLabel: '夏時間',
  dstYes: 'あり',
  dstNo: 'なし',
  minuteLabel: n => `${n}分`,
  gapTitle: '主要都市との時差',
  gapNote: '標準時（1月）基準です。夏時間の期間は1時間ずれます。',
  sameZoneTitle: '時差が同じか近い都市',
  howTitle: '読み方',
  how: [
    '現在時刻はブラウザで計算します。ページを開いたままでも秒が進み続けます。',
    'UTCオフセットは標準時と夏時間を分けて示します。同じ都市が季節で1時間動きます。',
    '時差は標準時（1月）基準です。南半球は季節が逆で1月が夏なので、そのときシドニーはUTC+11です。',
    '30分・45分単位のタイムゾーンがあります。インドは+5:30、ネパールは+5:45なので、小数で書くと何分か分かりません。',
  ],
  faqTitle: 'よくある質問',
  regionLabel: RG('アジア', 'ヨーロッパ', 'アメリカ', 'アフリカ', 'オセアニア', '太平洋', '大西洋'),
  hubMetaTitle: '世界時計 — 116都市の現在時刻とオフセット',
  hubMetaDesc: 'ニューヨーク・ロンドン・東京・シドニーなど世界116都市の現在時刻とUTCオフセット、夏時間の有無、ソウル・ニューヨーク・ロンドンとの時差をまとめました。',
  metaTitle: city => `${city}の現在時刻と時差`,
  metaDesc: f =>
    `${f.country}の${f.city}のタイムゾーンは${f.zone}、UTC ${f.standardLabel}です。${f.dst ? `夏時間の期間はUTC ${f.summerLabel}に1時間ずれます。` : '夏時間がないため一年中同じです。'}現在時刻と主要都市との時差も表示します。`,
  hubFaq: [
    {
      q: 'UTCオフセットとは何ですか。',
      a: '協定世界時（UTC）と現地時計の差です。韓国はUTC+9なので、UTCが0時のときソウルは午前9時です。二つのオフセットが分かれば、どの二都市の時差も引き算で出ます。',
    },
    {
      q: '夏時間はどう扱っていますか。',
      a: '都市ごとに標準時（1月）と夏（7月）のオフセットを分けて示します。南半球は季節が逆で1月が夏なので、シドニーは1月にUTC+11、7月に+10です。',
    },
    {
      q: 'なぜ30分単位のタイムゾーンがあるのですか。',
      a: 'タイムゾーンは経度だけでなく国が決めます。インドは国土を一つのゾーンにまとめるため+5:30を、ネパールは首都の実際の太陽時に合わせて+5:45を使います。',
    },
    {
      q: '現在時刻はどこから来ますか。',
      a: 'ブラウザの時計にIANAのタイムゾーン規則を当てて計算します。サーバーには問い合わせないので、再読み込みなしで秒が進み、端末の時計が合っていれば値も合います。',
    },
  ],
  cityFaq: f => [
    {
      q: `${f.city}はいま何時ですか。`,
      a: `このページ上部で秒ごとに進む時計が${f.city}の現地時刻です。タイムゾーンは${f.zone}、標準時はUTC ${f.standardLabel}です。`,
    },
    {
      q: `${f.city}との時差はどれくらいですか。`,
      a: `標準時基準で ${f.gaps.map(g => `${g.city} ${g.label}`).join('、')} です。先頭が−なら、その都市より遅い時刻です。`,
    },
    {
      q: `${f.city}に夏時間はありますか。`,
      a: f.dst
        ? `あります。標準時はUTC ${f.standardLabel}で、夏時間の期間はUTC ${f.summerLabel}へ${f.dstShift}分進めます。`
        : `ありません。一年中UTC ${f.standardLabel}なので、季節ごとに時差を計算し直す必要がありません。`,
    },
    {
      q: `タイムゾーン名 ${f.zone} は何を表しますか。`,
      a: 'IANAタイムゾーンデータベースの識別子です。国境ではなく規則が同じ地域をまとめるので、一国に複数あることも、複数国が一つを共有することもあります。',
    },
    {
      q: '航空券や会議の時刻をこの値で決めてよいですか。',
      a: '時差の計算には使えますが、夏時間の切り替え前後は一日違いで一時間変わります。大事な予定なら、その日付の現地時刻をもう一度確かめてください。',
    },
  ],
};

const de: TimeUI = {
  home: 'Start',
  section: 'Weltzeit',
  hubTitle: 'Aktuelle Uhrzeit in 116 Städten',
  hubLead: 'Wähle eine Stadt und sieh, wie spät es dort ist, welchen UTC-Abstand sie hat, ob sie Sommerzeit nutzt und wie weit sie anderen Städten voraus oder hinterher ist',
  nowLabel: 'Uhrzeit jetzt',
  zoneLabel: 'Zeitzone',
  offsetLabel: 'UTC-Abstand',
  standardLabel: 'Normalzeit (Januar)',
  summerLabel: 'Sommer (Juli)',
  dstLabel: 'Sommerzeit',
  dstYes: 'Ja',
  dstNo: 'Nein',
  minuteLabel: n => `${n} Min.`,
  gapTitle: 'Unterschied zu großen Städten',
  gapNote: 'Normalzeit (Januar). In der Sommerzeit verschiebt sich jede um eine Stunde.',
  sameZoneTitle: 'Städte mit gleichem oder nahem Abstand',
  howTitle: 'So liest man das',
  how: [
    'Die Uhr wird im Browser berechnet, die Sekunden laufen also weiter, solange die Seite offen bleibt.',
    'Der UTC-Abstand steht getrennt für Normalzeit und Sommer — dieselbe Stadt wandert mit der Jahreszeit um eine Stunde.',
    'Die Unterschiede gelten für Normalzeit (Januar). Die Südhalbkugel ist umgekehrt: dort ist Januar Sommer, deshalb liegt Sydney dann bei UTC+11.',
    'Manche Zonen liegen auf der halben oder Viertelstunde. Indien hat +5:30, Nepal +5:45 — eine Dezimalzahl sagt darum nicht, wie viele Minuten es sind.',
  ],
  faqTitle: 'Häufige Fragen',
  regionLabel: RG('Asien', 'Europa', 'Amerika', 'Afrika', 'Ozeanien', 'Pazifik', 'Atlantik'),
  hubMetaTitle: 'Weltzeit — aktuelle Uhrzeit und Abstände für 116 Städte',
  hubMetaDesc: 'Aktuelle Ortszeit, UTC-Abstand und Sommerzeit für 116 Städte wie New York, London, Tokio und Sydney, samt Unterschied zu Seoul, New York und London.',
  metaTitle: city => `Aktuelle Uhrzeit in ${city}`,
  metaDesc: f =>
    `${f.city} (${f.country}) nutzt ${f.zone}, UTC ${f.standardLabel}. ${f.dst ? `In der Sommerzeit wechselt es auf UTC ${f.summerLabel}.` : 'Es gibt keine Sommerzeit, der Abstand gilt das ganze Jahr.'} Dazu die aktuelle Uhrzeit und der Unterschied zu anderen Städten.`,
  hubFaq: [
    {
      q: 'Was ist der UTC-Abstand?',
      a: 'Der Unterschied zwischen der koordinierten Weltzeit und der Ortsuhr. Korea liegt bei UTC+9: wenn UTC Mitternacht zeigt, ist es in Seoul 9 Uhr morgens. Aus zwei Abständen ergibt sich der Unterschied durch Subtraktion.',
    },
    {
      q: 'Wie wird die Sommerzeit behandelt?',
      a: 'Jede Stadt nennt den Abstand für Normalzeit (Januar) und Sommer (Juli) getrennt. Die Südhalbkugel ist umgekehrt: dort ist Januar Sommer, weshalb Sydney im Januar bei UTC+11 und im Juli bei +10 liegt.',
    },
    {
      q: 'Warum liegen manche Zonen auf der halben Stunde?',
      a: 'Zonen legen Staaten fest, nicht die Länge allein. Indien nutzt +5:30, um das ganze Land in einer Zone zu halten; Nepal nutzt +5:45, um der echten Sonnenzeit seiner Hauptstadt zu folgen.',
    },
    {
      q: 'Woher kommt die aktuelle Uhrzeit?',
      a: 'Von der Uhr deines Browsers, auf die die IANA-Zeitzonenregeln angewandt werden. Es wird kein Server gefragt, die Sekunden laufen ohne Neuladen, und der Wert stimmt, solange die Geräteuhr stimmt.',
    },
  ],
  cityFaq: f => [
    {
      q: `Wie spät ist es gerade in ${f.city}?`,
      a: `Die Uhr oben auf dieser Seite läuft in der Ortszeit von ${f.city}. Die Zone ist ${f.zone}, in Normalzeit UTC ${f.standardLabel}.`,
    },
    {
      q: `Wie groß ist der Zeitunterschied zu ${f.city}?`,
      a: `In Normalzeit: ${f.gaps.map(g => `${g.city} ${g.label}`).join(', ')}. Ein Minus heißt, ${f.city} liegt hinter dieser Stadt.`,
    },
    {
      q: `Gilt in ${f.city} Sommerzeit?`,
      a: f.dst
        ? `Ja. Die Normalzeit ist UTC ${f.standardLabel}; in der Sommerzeit rückt die Uhr ${f.dstShift} Minuten vor auf UTC ${f.summerLabel}.`
        : `Nein. Es bleibt das ganze Jahr bei UTC ${f.standardLabel}, der Unterschied muss also nie nach Jahreszeit neu gerechnet werden.`,
    },
    {
      q: `Was bedeutet der Zonenname ${f.zone}?`,
      a: 'Er ist eine Kennung aus der IANA-Zeitzonendatenbank. Zonen bündeln Gebiete mit gleichen Regeln statt Grenzen zu folgen — ein Land kann mehrere haben, mehrere Länder eine teilen.',
    },
    {
      q: 'Kann ich Flüge oder Termine damit planen?',
      a: 'Für den Unterschied ja, aber um die Zeitumstellung herum ändert ein einziger Tag die Antwort um eine Stunde. Bei Wichtigem prüfe die Ortszeit zu genau diesem Datum.',
    },
  ],
};

const fr: TimeUI = {
  home: 'Accueil',
  section: 'Heure mondiale',
  hubTitle: 'Heure actuelle dans 116 villes',
  hubLead: 'Choisissez une ville pour voir l’heure qu’il y est, son décalage UTC et l’heure d’été, et son avance ou son retard sur d’autres villes',
  nowLabel: 'Heure actuelle',
  zoneLabel: 'Fuseau horaire',
  offsetLabel: 'Décalage UTC',
  standardLabel: 'Heure normale (janvier)',
  summerLabel: 'Été (juillet)',
  dstLabel: 'Heure d’été',
  dstYes: 'Oui',
  dstNo: 'Non',
  minuteLabel: n => `${n} min`,
  gapTitle: 'Décalage avec les grandes villes',
  gapNote: 'Heure normale (janvier). À l’heure d’été, chacune décale d’une heure.',
  sameZoneTitle: 'Villes au même décalage ou proche',
  howTitle: 'Comment lire',
  how: [
    'L’horloge est calculée dans votre navigateur : les secondes continuent de défiler tant que la page reste ouverte.',
    'Le décalage UTC est donné séparément pour l’heure normale et pour l’été — la même ville bouge d’une heure selon la saison.',
    'Les écarts se réfèrent à l’heure normale (janvier). L’hémisphère sud est inversé : là-bas janvier est l’été, d’où Sydney à UTC+11.',
    'Certains fuseaux tombent sur la demie ou le quart d’heure. L’Inde est à +5:30 et le Népal à +5:45 : un nombre décimal ne dit pas combien de minutes.',
  ],
  faqTitle: 'Questions fréquentes',
  regionLabel: RG('Asie', 'Europe', 'Amériques', 'Afrique', 'Océanie', 'Pacifique', 'Atlantique'),
  hubMetaTitle: 'Heure mondiale — heure actuelle et décalages de 116 villes',
  hubMetaDesc: 'Heure locale actuelle, décalage UTC et heure d’été pour 116 villes dont New York, Londres, Tokyo et Sydney, avec l’écart par rapport à Séoul, New York et Londres.',
  metaTitle: city => `Heure actuelle à ${city}`,
  metaDesc: f =>
    `${f.city} (${f.country}) suit ${f.zone}, UTC ${f.standardLabel}. ${f.dst ? `À l’heure d’été, la ville passe à UTC ${f.summerLabel}.` : 'Pas d’heure d’été : le décalage vaut toute l’année.'} Avec l’heure actuelle et l’écart avec d’autres villes.`,
  hubFaq: [
    {
      q: 'Qu’est-ce que le décalage UTC ?',
      a: 'L’écart entre le temps universel coordonné et l’horloge locale. La Corée est à UTC+9 : quand il est minuit en UTC, il est 9 h du matin à Séoul. Avec deux décalages, l’écart s’obtient par soustraction.',
    },
    {
      q: 'Comment l’heure d’été est-elle prise en compte ?',
      a: 'Chaque ville affiche séparément le décalage en heure normale (janvier) et en été (juillet). L’hémisphère sud est inversé : là-bas janvier est l’été, d’où Sydney à UTC+11 en janvier et +10 en juillet.',
    },
    {
      q: 'Pourquoi certains fuseaux sont-ils à la demi-heure ?',
      a: 'Les fuseaux sont fixés par les États, pas par la seule longitude. L’Inde utilise +5:30 pour n’avoir qu’un fuseau ; le Népal utilise +5:45 pour coller à l’heure solaire réelle de sa capitale.',
    },
    {
      q: 'D’où vient l’heure actuelle ?',
      a: 'De l’horloge de votre navigateur, à laquelle sont appliquées les règles de fuseaux de l’IANA. Aucun serveur n’est interrogé : les secondes défilent sans rechargement, et la valeur est juste si l’horloge de l’appareil l’est.',
    },
  ],
  cityFaq: f => [
    {
      q: `Quelle heure est-il à ${f.city} en ce moment ?`,
      a: `L’horloge en haut de cette page bat à l’heure locale de ${f.city}. Le fuseau est ${f.zone}, UTC ${f.standardLabel} en heure normale.`,
    },
    {
      q: `Quel est le décalage avec ${f.city} ?`,
      a: `En heure normale : ${f.gaps.map(g => `${g.city} ${g.label}`).join(', ')}. Un signe moins signifie que ${f.city} est en retard sur cette ville.`,
    },
    {
      q: `${f.city} applique-t-elle l’heure d’été ?`,
      a: f.dst
        ? `Oui. L’heure normale est UTC ${f.standardLabel} ; à l’heure d’été l’horloge avance de ${f.dstShift} minutes, jusqu’à UTC ${f.summerLabel}.`
        : `Non. La ville reste à UTC ${f.standardLabel} toute l’année : l’écart n’a pas à être recalculé selon la saison.`,
    },
    {
      q: `Que signifie le nom de fuseau ${f.zone} ?`,
      a: 'C’est un identifiant de la base de données des fuseaux de l’IANA. Les fuseaux regroupent les zones aux mêmes règles plutôt que de suivre les frontières : un pays peut en compter plusieurs, plusieurs pays en partager un.',
    },
    {
      q: 'Peut-on planifier un vol ou une réunion avec ces valeurs ?',
      a: 'Pour l’écart, oui, mais autour du changement d’heure un seul jour modifie la réponse d’une heure. Pour ce qui compte, vérifiez l’heure locale à cette date précise.',
    },
  ],
};

const hi: TimeUI = {
  home: 'होम',
  section: 'विश्व समय',
  hubTitle: '116 शहरों का वर्तमान समय',
  hubLead: 'शहर चुनें और देखें वहाँ अभी क्या समय है, UTC अंतर और डेलाइट सेविंग, तथा दूसरे शहरों से कितना आगे-पीछे है',
  nowLabel: 'अभी का समय',
  zoneLabel: 'समय क्षेत्र',
  offsetLabel: 'UTC अंतर',
  standardLabel: 'मानक (जनवरी)',
  summerLabel: 'ग्रीष्म (जुलाई)',
  dstLabel: 'डेलाइट सेविंग',
  dstYes: 'हाँ',
  dstNo: 'नहीं',
  minuteLabel: n => `${n} मिनट`,
  gapTitle: 'बड़े शहरों से अंतर',
  gapNote: 'मानक समय (जनवरी) के अनुसार। डेलाइट सेविंग में हर एक घंटा बदल जाता है।',
  sameZoneTitle: 'समान या नज़दीकी अंतर वाले शहर',
  howTitle: 'कैसे पढ़ें',
  how: [
    'घड़ी आपके ब्राउज़र में गिनी जाती है, इसलिए पन्ना खुला रहने तक सेकंड चलते रहते हैं।',
    'UTC अंतर मानक समय और ग्रीष्म के लिए अलग-अलग दिया है — वही शहर मौसम के साथ एक घंटा हट जाता है।',
    'अंतर मानक समय (जनवरी) पर आधारित हैं। दक्षिणी गोलार्ध उलटा है: वहाँ जनवरी गर्मी है, इसलिए तब सिडनी UTC+11 पर रहता है।',
    'कुछ क्षेत्र आधे या पौन घंटे पर हैं। भारत +5:30 और नेपाल +5:45 है, इसलिए दशमलव संख्या से मिनट पता नहीं चलते।',
  ],
  faqTitle: 'आम सवाल',
  regionLabel: RG('एशिया', 'यूरोप', 'अमेरिका', 'अफ़्रीका', 'ओशिआनिया', 'प्रशांत', 'अटलांटिक'),
  hubMetaTitle: 'विश्व समय — 116 शहरों का वर्तमान समय और UTC अंतर',
  hubMetaDesc: 'न्यूयॉर्क, लंदन, टोक्यो और सिडनी सहित 116 शहरों का वर्तमान स्थानीय समय, UTC अंतर और डेलाइट सेविंग, साथ में सिओल-न्यूयॉर्क-लंदन से अंतर।',
  metaTitle: city => `${city} का वर्तमान समय`,
  metaDesc: f =>
    `${f.country} का ${f.city} ${f.zone} समय क्षेत्र में है, UTC ${f.standardLabel}। ${f.dst ? `डेलाइट सेविंग में यह UTC ${f.summerLabel} हो जाता है।` : 'डेलाइट सेविंग नहीं है, इसलिए अंतर साल भर वही रहता है।'} अभी का समय और बड़े शहरों से अंतर भी देखें।`,
  hubFaq: [
    {
      q: 'UTC अंतर क्या है?',
      a: 'समन्वित सार्वत्रिक समय (UTC) और स्थानीय घड़ी का फ़र्क़। कोरिया UTC+9 पर है, इसलिए UTC में रात 12 बजे सिओल में सुबह 9 बजते हैं। दो अंतर पता हों तो किसी भी दो शहरों का फ़र्क़ घटाकर निकल आता है।',
    },
    {
      q: 'डेलाइट सेविंग कैसे दिखाया गया है?',
      a: 'हर शहर के लिए मानक समय (जनवरी) और ग्रीष्म (जुलाई) का अंतर अलग-अलग दिया है। दक्षिणी गोलार्ध उलटा है: वहाँ जनवरी गर्मी है, इसलिए सिडनी जनवरी में UTC+11 और जुलाई में +10 रहता है।',
    },
    {
      q: 'कुछ क्षेत्र आधे घंटे पर क्यों हैं?',
      a: 'समय क्षेत्र देश तय करते हैं, केवल देशांतर नहीं। भारत पूरे देश को एक क्षेत्र में रखने के लिए +5:30 रखता है; नेपाल अपनी राजधानी के वास्तविक सौर समय से मिलाने के लिए +5:45।',
    },
    {
      q: 'वर्तमान समय कहाँ से आता है?',
      a: 'आपके ब्राउज़र की घड़ी पर IANA के समय-क्षेत्र नियम लगाकर। किसी सर्वर से नहीं पूछा जाता, इसलिए पन्ना ताज़ा किए बिना सेकंड चलते हैं और डिवाइस की घड़ी सही हो तो मान भी सही रहता है।',
    },
  ],
  cityFaq: f => [
    {
      q: `${f.city} में अभी क्या समय है?`,
      a: `इस पन्ने के ऊपर चलती घड़ी ${f.city} का स्थानीय समय है। समय क्षेत्र ${f.zone} है, मानक समय UTC ${f.standardLabel}।`,
    },
    {
      q: `${f.city} से समय का अंतर कितना है?`,
      a: `मानक समय में: ${f.gaps.map(g => `${g.city} ${g.label}`).join(', ')}। ऋण चिह्न का अर्थ है कि ${f.city} उस शहर से पीछे है।`,
    },
    {
      q: `${f.city} में डेलाइट सेविंग है?`,
      a: f.dst
        ? `है। मानक समय UTC ${f.standardLabel} है और डेलाइट सेविंग में घड़ी ${f.dstShift} मिनट आगे बढ़कर UTC ${f.summerLabel} हो जाती है।`
        : `नहीं। साल भर UTC ${f.standardLabel} रहता है, इसलिए मौसम के हिसाब से अंतर दोबारा गिनने की ज़रूरत नहीं।`,
    },
    {
      q: `समय क्षेत्र का नाम ${f.zone} क्या बताता है?`,
      a: 'यह IANA समय-क्षेत्र डेटाबेस का पहचान-नाम है। यह सीमाओं के बजाय एक ही नियम वाले इलाक़ों को जोड़ता है, इसलिए एक देश में कई हो सकते हैं और कई देश एक साझा कर सकते हैं।',
    },
    {
      q: 'क्या इन आंकड़ों से उड़ान या मीटिंग तय कर सकते हैं?',
      a: 'अंतर निकालने के लिए ठीक हैं, पर डेलाइट सेविंग बदलने के आसपास एक दिन का फ़र्क़ जवाब को एक घंटा बदल देता है। ज़रूरी काम हो तो उस तारीख़ का स्थानीय समय दोबारा देखें।',
    },
  ],
};

const zh: TimeUI = {
  home: '首页',
  section: '世界时间',
  hubTitle: '全球 116 座城市的当前时间',
  hubLead: '挑一座城市，看它现在几点、UTC 偏移多少、用不用夏令时，以及和别的城市差几个小时',
  nowLabel: '当前时间',
  zoneLabel: '时区',
  offsetLabel: 'UTC 偏移',
  standardLabel: '标准时间（1 月）',
  summerLabel: '夏季（7 月）',
  dstLabel: '夏令时',
  dstYes: '使用',
  dstNo: '不使用',
  minuteLabel: n => `${n} 分`,
  gapTitle: '与主要城市的时差',
  gapNote: '按标准时间（1 月）计算。夏令时期间会各差一小时。',
  sameZoneTitle: '时差相同或相近的城市',
  howTitle: '怎么看这些数字',
  how: [
    '当前时间由浏览器自己算出来。页面就这么开着不动，秒数也会一直往前走。',
    'UTC 偏移把标准时间和夏令时分开列出。同一座城市，会随季节挪一个小时。',
    '时差按标准时间（1 月）算。南半球季节相反，1 月正是夏天，那时悉尼是 UTC+11。',
    '有些时区是 30 分或 45 分为单位。印度是 +5:30，尼泊尔是 +5:45，所以时差写成小数就看不出到底差几分钟。',
  ],
  faqTitle: '常见问题',
  regionLabel: RG('亚洲', '欧洲', '美洲', '非洲', '大洋洲', '太平洋', '大西洋'),
  hubMetaTitle: '世界时间 — 116 座城市的当前时间与时差',
  hubMetaDesc: '纽约、伦敦、东京、悉尼等全球 116 座城市的当前时间、UTC 偏移、夏令时使用情况，以及和首尔、纽约、伦敦的时差，全在一页看完。',
  metaTitle: city => `${city}的当前时间与时差`,
  metaDesc: f =>
    `${f.country}${f.city}属于 ${f.zone} 时区，UTC ${f.standardLabel}。${f.dst ? `夏令时期间挪到 UTC ${f.summerLabel}，快一个小时。` : '不使用夏令时，全年不变。'} 本页同时给出当前时间和与主要城市的时差。`,
  hubFaq: [
    {
      q: 'UTC 偏移是什么？',
      a: '就是世界标准时间（UTC）和当地时钟之间的差。韩国是 UTC+9，所以 UTC 零点时首尔是上午九点。只要知道偏移，任意两座城市的时差做个减法就出来了。',
    },
    {
      q: '夏令时是怎么体现的？',
      a: '本词典把标准时间（1 月）和夏季（7 月）的偏移分开列。南半球季节相反，1 月正是夏天，所以悉尼 1 月是 UTC+11，7 月是 +10。',
    },
    {
      q: '为什么会有 30 分、45 分的时区？',
      a: '时区不只按经度划，是各国自己定的。印度为了让全国用同一个时区选了 +5:30，尼泊尔为了贴合首都的真太阳时用了 +5:45。',
    },
    {
      q: '当前时间是哪来的？',
      a: '拿浏览器自己的时钟，套上 IANA 时区数据库的规则算出来的。整个过程不去问服务器，所以页面不刷新秒数也照走；只要你设备上的时钟是准的，这里显示的值就是准的。',
    },
  ],
  cityFaq: f => [
    {
      q: `${f.city}现在几点？`,
      a: `本页最上方那个逐秒走动的钟，就是${f.city}的当前时间。时区是 ${f.zone}，基准为 UTC ${f.standardLabel}。`,
    },
    {
      q: `${f.city}和别处差几个小时？`,
      a: `按标准时间算，分别是 ${f.gaps.map(g => `${g.city} ${g.label}`).join('、')}。前面带 − 号的，表示比那座城市晚。`,
    },
    {
      q: `${f.city}用夏令时吗？`,
      a: f.dst
        ? `用。标准时间是 UTC ${f.standardLabel}，夏令时期间挪到 UTC ${f.summerLabel}，往前拨 ${f.dstShift} 分钟。`
        : `不用。全年都是 UTC ${f.standardLabel}，所以时差不必每换个季节就重算一遍。`,
    },
    {
      q: `时区名 ${f.zone} 是什么意思？`,
      a: '它是 IANA 时区数据库里的名字。划分依据不是国家，而是规则相同的地区，所以一个国家可能有好几个，几个国家也可能共用一个。',
    },
    {
      q: '机票或会议时间能照这个算吗？',
      a: '算时差可以，但在夏令时切换的前后一天，会差出一个小时。真正要紧的日程，请按那一天的当地时间再确认一次。',
    },
  ],
};

const tw: TimeUI = {
  home: '首頁',
  section: '世界時間',
  hubTitle: '全球 116 座城市的目前時間',
  hubLead: '挑一座城市，看它現在幾點、UTC 偏移多少、用不用日光節約時間，以及和別的城市差幾個小時',
  nowLabel: '目前時間',
  zoneLabel: '時區',
  offsetLabel: 'UTC 偏移',
  standardLabel: '標準時間（1 月）',
  summerLabel: '夏季（7 月）',
  dstLabel: '日光節約時間',
  dstYes: '使用',
  dstNo: '不使用',
  minuteLabel: n => `${n} 分`,
  gapTitle: '與主要城市的時差',
  gapNote: '按標準時間（1 月）計算。日光節約時間期間會各差一小時。',
  sameZoneTitle: '時差相同或相近的城市',
  howTitle: '怎麼看這些數字',
  how: [
    '目前時間由瀏覽器自己算出來。頁面就這麼開著不動，秒數也會一直往前走。',
    'UTC 偏移把標準時間和日光節約時間分開列出。同一座城市，會隨季節挪一個小時。',
    '時差按標準時間（1 月）算。南半球季節相反，1 月正是夏天，那時雪梨是 UTC+11。',
    '有些時區是 30 分或 45 分為單位。印度是 +5:30，尼泊爾是 +5:45，所以時差寫成小數就看不出到底差幾分鐘。',
  ],
  faqTitle: '常見問題',
  regionLabel: RG('亞洲', '歐洲', '美洲', '非洲', '大洋洲', '太平洋', '大西洋'),
  hubMetaTitle: '世界時間 — 116 座城市的目前時間與時差',
  hubMetaDesc: '紐約、倫敦、東京、雪梨等全球 116 座城市的目前時間、UTC 偏移、日光節約時間使用情況，以及和首爾、紐約、倫敦的時差，全在一頁看完。',
  metaTitle: city => `${city}的目前時間與時差`,
  metaDesc: f =>
    `${f.country}${f.city}屬於 ${f.zone} 時區，UTC ${f.standardLabel}。${f.dst ? `日光節約時間期間挪到 UTC ${f.summerLabel}，快一個小時。` : '不使用日光節約時間，全年不變。'} 本頁同時給出目前時間和與主要城市的時差。`,
  hubFaq: [
    {
      q: 'UTC 偏移是什麼？',
      a: '就是世界標準時間（UTC）和當地時鐘之間的差。韓國是 UTC+9，所以 UTC 零點時首爾是上午九點。只要知道偏移，任意兩座城市的時差做個減法就出來了。',
    },
    {
      q: '日光節約時間是怎麼體現的？',
      a: '本辭典把標準時間（1 月）和夏季（7 月）的偏移分開列。南半球季節相反，1 月正是夏天，所以雪梨 1 月是 UTC+11，7 月是 +10。',
    },
    {
      q: '為什麼會有 30 分、45 分的時區？',
      a: '時區不只按經度劃，是各國自己定的。印度為了讓全國用同一個時區選了 +5:30，尼泊爾為了貼合首都的真太陽時用了 +5:45。',
    },
    {
      q: '目前時間是哪來的？',
      a: '拿瀏覽器自己的時鐘，套上 IANA 時區資料庫的規則算出來的。整個過程不去問伺服器，所以頁面不重新整理秒數也照走；只要你裝置上的時鐘是準的，這裡顯示的值就是準的。',
    },
  ],
  cityFaq: f => [
    {
      q: `${f.city}現在幾點？`,
      a: `本頁最上方那個逐秒走動的鐘，就是${f.city}的目前時間。時區是 ${f.zone}，基準為 UTC ${f.standardLabel}。`,
    },
    {
      q: `${f.city}和別處差幾個小時？`,
      a: `按標準時間算，分別是 ${f.gaps.map(g => `${g.city} ${g.label}`).join('、')}。前面帶 − 號的，表示比那座城市晚。`,
    },
    {
      q: `${f.city}用日光節約時間嗎？`,
      a: f.dst
        ? `用。標準時間是 UTC ${f.standardLabel}，日光節約時間期間挪到 UTC ${f.summerLabel}，往前撥 ${f.dstShift} 分鐘。`
        : `不用。全年都是 UTC ${f.standardLabel}，所以時差不必每換個季節就重算一遍。`,
    },
    {
      q: `時區名 ${f.zone} 是什麼意思？`,
      a: '它是 IANA 時區資料庫裡的名字。劃分依據不是國家，而是規則相同的地區，所以一個國家可能有好幾個，幾個國家也可能共用一個。',
    },
    {
      q: '機票或會議時間能照這個算嗎？',
      a: '算時差可以，但在日光節約時間切換的前後一天，會差出一個小時。真正要緊的日程，請按那一天的當地時間再確認一次。',
    },
  ],
};

export const TIME_UI: L<TimeUI> = { ko, en, es, pt, ja, de, fr, hi, zh, tw };

export const timeUi = (lang: Lang8): TimeUI => TIME_UI[lang];

/** hreflang 묶음 — 도시 slug만 넣으면 아홉 줄이 나온다 */
export const timeAlternates = (slug?: string): Record<string, string> =>
  alternates8(slug ? `/time/${slug}` : '/time');

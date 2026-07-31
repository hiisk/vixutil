/**
 * 지하철 게임 화면의 문구 — 열 언어.
 *
 * 노선 소개는 노선마다 다르니 데이터에 두지만, 화면 문구는 노선이 몇 개든
 * 한 벌이면 된다. 여기 여덟 벌을 두고 노선을 더할 때는 건드리지 않는다.
 *
 * FAQ와 메타 문구도 여기서 만든다. 노선이 서른 개면 손으로 쓰면 서른 × 여덟 =
 * 이백사십 벌이 되므로, 노선 이름·역 수·기점만 받아 문장을 조립한다.
 */
import { METRO_LANGS, metroAlternates, type L, type MetroLang } from './lang.ts';

export { METRO_LANGS, metroAlternates };

export interface FaqItem { q: string; a: string }

/** FAQ·메타 문구를 만들 때 필요한 노선의 사실 */
export interface LineFacts {
  title: string;
  city: string;
  country: string;
  count: number;
  first: string;
  last: string;
  loop: boolean;
}

export interface MetroUI {
  home: string;
  section: string;
  hubTitle: string;
  hubLead: string;
  placeholder: string;
  start: string;
  skip: string;
  perMin: string;
  accuracy: string;
  wrongTry: string;
  nextIs: (n: number, t: number) => string;
  restart: string;
  giveUp: string;
  hint: string;
  solvedOf: (a: number, b: number) => string;
  elapsed: string;
  remaining: string;
  done: string;
  doneIn: (t: string) => string;
  already: string;
  notFound: string;
  hintFirst: (c: string) => string;
  hintLen: (n: number) => string;
  hintNear: (a: string) => string;
  hintUsed: (n: number) => string;
  listTitle: string;
  howTitle: string;
  how: string[];
  related: string;
  stations: string;
  /** "20駅" / "33 estaciones" — 라벨이 아니라 문장에 넣는 꼴 */
  stationCount: (n: number) => string;
  lineColor: string;
  loopNote: string;
  /** 허브에서 도시를 두 덩이로 나눌 때의 머리말 */
  capitalGroup: string;
  secondGroup: string;
  linesIn: (n: number) => string;
  faqTitle: string;
  hubMetaTitle: string;
  hubMetaDesc: string;
  metaTitle: (title: string) => string;
  metaDesc: (f: LineFacts) => string;
  hubFaq: FaqItem[];
  lineFaq: (f: LineFacts) => FaqItem[];
}

const ko: MetroUI = {
  home: '홈',
  section: '지하철 역 맞추기',
  hubTitle: '지하철 노선 역 이름 맞추기',
  hubLead: '서울·부산·도쿄·런던·파리·베를린·마드리드·상파울루·델리 노선을 골라 기점부터 역 이름을 순서대로 타이핑하세요',
  placeholder: '다음 역 이름을 타이핑…',
  start: '시작',
  skip: '이 역 정답',
  perMin: '분당 역',
  accuracy: '정확도',
  wrongTry: '아직 맞지 않습니다',
  nextIs: (n, t) => `${n}번째 역 / 전체 ${t}개`,
  restart: '다시 하기',
  giveUp: '포기하고 전체 보기',
  hint: '힌트',
  solvedOf: (a, b) => `${a} / ${b}`,
  elapsed: '경과 시간',
  remaining: '남은 역',
  done: '모두 맞혔습니다',
  doneIn: t => `${t}에 완주했습니다`,
  already: '이미 맞힌 역입니다',
  notFound: '이 노선에 없는 역입니다',
  hintFirst: c => `다음 역은 "${c}"로 시작합니다`,
  hintLen: n => `다음 역은 ${n}글자입니다`,
  hintNear: a => `${a} 옆의 역입니다`,
  hintUsed: n => `힌트 ${n}번 사용`,
  listTitle: '역 목록',
  howTitle: '푸는 방법',
  how: [
    '기점부터 순서대로 다음 역 이름을 타이핑합니다. 다 치는 순간 엔터 없이 넘어갑니다.',
    '노선도가 맞힐 역 쪽으로 따라 움직이고, 지나온 역이 화면에 남아 실마리가 됩니다.',
    '로마자로 쳐도 정답으로 받습니다. 공백과 하이픈, 대소문자는 무시합니다.',
    '막히면 힌트를 누르거나 건너뛰기로 넘어갈 수 있습니다. 건너뛴 역은 오타로 셉니다.',
  ],
  related: '다른 노선',
  stations: '역 수',
  stationCount: n => `${n}개 역`,
  lineColor: '노선색',
  loopNote: '순환선',
  capitalGroup: '수도의 지하철',
  secondGroup: '수도가 아닌 도시의 지하철',
  linesIn: n => `${n}개 노선`,
  faqTitle: '자주 묻는 질문',
  hubMetaTitle: '지하철 역 이름 맞추기 — 세계 노선 타이핑 게임',
  hubMetaDesc: '서울·부산·도쿄·오사카·런던·뉴욕·파리·베를린·마드리드·상파울루·델리 등 세계 지하철 노선의 역 이름을 기점부터 순서대로 타이핑하는 게임입니다. 노선도가 따라 움직이고 로마자 입력도 정답으로 받습니다.',
  metaTitle: t => `${t} 역 이름 맞추기`,
  metaDesc: f =>
    `${f.country} ${f.title}의 역 ${f.count}개를 ${f.loop ? '순환 방향대로' : `${f.first}에서 ${f.last}까지 순서대로`} 타이핑해 맞춰 보세요. 노선도가 따라 움직이고 로마자 표기도 정답으로 받습니다.`,
  hubFaq: [
    {
      q: '어떤 게임인가요?',
      a: '노선을 하나 고르면 기점부터 차례로 다음 역 이름을 묻습니다. 답을 타이핑해 다 치는 순간 엔터 없이 다음 역으로 넘어가고, 노선도가 그쪽으로 따라 움직입니다. 몇 분 만에 한 노선을 다 셀 수 있는지 겨루는 놀이입니다.',
    },
    {
      q: '역 이름을 그 나라 말로 알아야 하나요?',
      a: '아닙니다. 한자·가나·데바나가리 노선은 로마자 표기도 정답으로 받습니다. 도쿄 야마노테선은 "新宿"이든 "Shinjuku"든 맞고, 델리 옐로 라인은 데바나가리와 영문 표기가 모두 통합니다.',
    },
    {
      q: '어느 도시가 들어 있나요?',
      a: '수도의 큰 노선과 함께 수도가 아닌 도시의 노선도 담았습니다. 부산·오사카·시카고·리옹·뮌헨·바르셀로나·상파울루·리우데자네이루·뭄바이의 노선을 각각 풀 수 있습니다.',
    },
    {
      q: '기록이 남나요?',
      a: '맞힌 역 수와 경과 시간, 분당 역 수, 정확도를 화면에서 바로 보여 줍니다. 서버에 보내지 않으므로 계정도 필요 없고 새로 고치면 처음부터 다시 시작합니다.',
    },
  ],
  lineFaq: f => [
    {
      q: `${f.title}에는 역이 몇 개 있나요?`,
      a: f.loop
        ? `이 게임에는 ${f.count}개 역이 들어 있습니다. 순환선이라 시작과 끝이 이어져 있어 ${f.first}에서 출발해 한 바퀴 돌면 다시 ${f.first}로 돌아옵니다.`
        : `이 게임에는 ${f.count}개 역이 들어 있고, ${f.first}에서 출발해 ${f.last}에서 끝납니다.`,
    },
    {
      q: '순서를 꼭 지켜야 하나요?',
      a: `네. ${f.first} 다음 역부터 차례대로 묻습니다. 순서를 아는 것이 이 게임의 내용이라 아무 역이나 먼저 답할 수는 없고, 막히면 건너뛰기로 그 역만 넘길 수 있습니다.`,
    },
    {
      q: '로마자로 입력해도 되나요?',
      a: '됩니다. 현지 표기와 로마자 표기를 모두 정답으로 받고, 공백·하이픈·가운뎃점·대소문자는 무시합니다. 괄호가 붙은 역은 괄호 안 이름만으로도 맞힐 수 있습니다.',
    },
    {
      q: '힌트는 어떻게 쓰나요?',
      a: '힌트를 누르면 다음 역의 첫 글자, 글자 수, 앞 역 이름을 차례로 알려 줍니다. 쓴 횟수가 화면에 남으므로 안 쓰고 끝내면 그만큼 좋은 기록이 됩니다.',
    },
    {
      q: `${f.city} 노선이 더 있나요?`,
      a: '아래 다른 노선 목록에서 같은 도시의 노선을 먼저 보여 줍니다. 도시 안의 노선을 다 풀면 다른 나라 노선으로 넘어가 보세요.',
    },
  ],
};

const en: MetroUI = {
  home: 'Home',
  section: 'Name the Stations',
  hubTitle: 'Metro Line Station Quiz',
  hubLead: 'Pick a line in Seoul, Tokyo, London, New York, Paris, Berlin, Madrid, São Paulo or Delhi and type its stations in order from the terminus',
  placeholder: 'Type the next station…',
  start: 'Start',
  skip: 'Show this one',
  perMin: 'Stations/min',
  accuracy: 'Accuracy',
  wrongTry: 'Not it yet',
  nextIs: (n, t) => `Station ${n} of ${t}`,
  restart: 'Play again',
  giveUp: 'Give up and reveal all',
  hint: 'Hint',
  solvedOf: (a, b) => `${a} / ${b}`,
  elapsed: 'Elapsed',
  remaining: 'Left',
  done: 'You named them all',
  doneIn: t => `Finished in ${t}`,
  already: 'Already found',
  notFound: 'Not on this line',
  hintFirst: c => `The next station starts with “${c}”`,
  hintLen: n => `The next station has ${n} characters`,
  hintNear: a => `It is next to ${a}`,
  hintUsed: n => `${n} hints used`,
  listTitle: 'Station list',
  howTitle: 'How to play',
  how: [
    'Type the next station in order from the terminus. Finish the word and it advances without Enter.',
    'The map follows the station you are on, and the ones behind you stay visible as clues.',
    'Romanised spellings count. Spaces, hyphens and letter case are ignored.',
    'Stuck? Take a hint or skip the station — a skip counts as a miss.',
  ],
  related: 'Other lines',
  stations: 'Stations',
  stationCount: n => `${n} stations`,
  lineColor: 'Line colour',
  loopNote: 'Loop line',
  capitalGroup: 'Capital city metros',
  secondGroup: 'Metros beyond the capital',
  linesIn: n => `${n} lines`,
  faqTitle: 'Frequently asked questions',
  hubMetaTitle: 'Metro Station Quiz — Type the Stations of World Metro Lines',
  hubMetaDesc: 'Type the stations of metro lines in Seoul, Busan, Tokyo, Osaka, London, New York, Paris, Berlin, Madrid, São Paulo and Delhi in order from the terminus. The map follows along and romanised spellings count.',
  metaTitle: t => `${t} station quiz`,
  metaDesc: f =>
    `Name all ${f.count} stations on the ${f.title} in ${f.country}, ${f.loop ? 'going once round the loop' : `in order from ${f.first} to ${f.last}`}. The map follows your progress and romanised spellings count.`,
  hubFaq: [
    {
      q: 'What is this game?',
      a: 'Pick a line and it asks for each station in turn, starting from the terminus. Finish typing an answer and it advances without Enter while the map pans to follow. The point is to see how fast you can recite a whole line.',
    },
    {
      q: 'Do I need to read the local script?',
      a: 'No. Lines written in kanji, kana or Devanagari also accept romanised spellings. On the Tokyo Yamanote Line both “新宿” and “Shinjuku” count; on the Delhi Yellow Line both the Devanagari and the English name work.',
    },
    {
      q: 'Which cities are included?',
      a: 'Alongside the big capital-city lines there are metros beyond the capital — Busan, Osaka, Chicago, Lyon, Munich, Barcelona, São Paulo, Rio de Janeiro and Mumbai each have a line to solve.',
    },
    {
      q: 'Are scores saved?',
      a: 'Your station count, elapsed time, stations per minute and accuracy all show on screen as you play. Nothing is sent to a server, so no account is needed and a refresh starts over.',
    },
  ],
  lineFaq: f => [
    {
      q: `How many stations does the ${f.title} have?`,
      a: f.loop
        ? `This quiz holds ${f.count} stations. It is a loop, so starting at ${f.first} and going all the way round brings you back to ${f.first}.`
        : `This quiz holds ${f.count} stations, running from ${f.first} at one end to ${f.last} at the other.`,
    },
    {
      q: 'Must I answer in order?',
      a: `Yes. It asks for the station after ${f.first} first and works along the line. Knowing the order is the whole point, so you cannot jump ahead — but you can skip a station you are stuck on.`,
    },
    {
      q: 'Can I type romanised names?',
      a: 'Yes. Both the local spelling and the romanised form count, and spaces, hyphens, middle dots and letter case are ignored. Where a name carries a bracketed alias, the alias alone is accepted too.',
    },
    {
      q: 'How do hints work?',
      a: 'Each hint reveals a little more about the next station — first its opening character, then how many characters it has, then the station before it. The count stays on screen, so finishing without hints is the better run.',
    },
    {
      q: `Are there other ${f.city} lines?`,
      a: 'The list of other lines below puts the same city first. Once you have cleared the city, try a line from another country.',
    },
  ],
};

const es: MetroUI = {
  home: 'Inicio',
  section: 'Adivina las estaciones',
  hubTitle: 'Juego de estaciones de metro',
  hubLead: 'Elige una línea de Madrid, Barcelona, Seúl, Tokio, Londres, París o São Paulo y escribe sus estaciones en orden desde la terminal',
  placeholder: 'Escribe la siguiente estación…',
  start: 'Empezar',
  skip: 'Ver esta',
  perMin: 'Estaciones/min',
  accuracy: 'Precisión',
  wrongTry: 'Todavía no',
  nextIs: (n, t) => `Estación ${n} de ${t}`,
  restart: 'Jugar otra vez',
  giveUp: 'Rendirse y ver todas',
  hint: 'Pista',
  solvedOf: (a, b) => `${a} / ${b}`,
  elapsed: 'Tiempo',
  remaining: 'Quedan',
  done: 'Has nombrado todas',
  doneIn: t => `Completado en ${t}`,
  already: 'Ya la tenías',
  notFound: 'No está en esta línea',
  hintFirst: c => `La siguiente empieza por «${c}»`,
  hintLen: n => `La siguiente tiene ${n} caracteres`,
  hintNear: a => `Está junto a ${a}`,
  hintUsed: n => `${n} pistas usadas`,
  listTitle: 'Lista de estaciones',
  howTitle: 'Cómo se juega',
  how: [
    'Escribe la siguiente estación en orden desde la terminal. Al completar la palabra avanza sin pulsar Enter.',
    'El plano sigue a la estación en juego y las anteriores quedan a la vista como pistas.',
    'Las grafías romanizadas también valen. Se ignoran espacios, guiones y mayúsculas.',
    '¿Atascado? Pide una pista o salta la estación: un salto cuenta como fallo.',
  ],
  related: 'Otras líneas',
  stations: 'Estaciones',
  stationCount: n => `${n} estaciones`,
  lineColor: 'Color de la línea',
  loopNote: 'Línea circular',
  capitalGroup: 'Metros de capitales',
  secondGroup: 'Metros fuera de la capital',
  linesIn: n => `${n} líneas`,
  faqTitle: 'Preguntas frecuentes',
  hubMetaTitle: 'Juego de estaciones de metro — escribe las paradas de líneas del mundo',
  hubMetaDesc: 'Escribe en orden las estaciones de líneas de metro de Madrid, Barcelona, Seúl, Tokio, Londres, Nueva York, París, Berlín, São Paulo y Delhi. El plano avanza contigo y se aceptan las grafías romanizadas.',
  metaTitle: t => `Estaciones de ${t}`,
  metaDesc: f =>
    `Nombra las ${f.count} estaciones de ${f.title} (${f.country}) ${f.loop ? 'dando una vuelta completa al anillo' : `en orden desde ${f.first} hasta ${f.last}`}. El plano sigue tu avance y se aceptan las grafías romanizadas.`,
  hubFaq: [
    {
      q: '¿En qué consiste el juego?',
      a: 'Eliges una línea y el juego te pide una estación tras otra desde la terminal. Al terminar de escribir el nombre avanza sin pulsar Enter y el plano se desplaza contigo. Se trata de ver en cuántos minutos recitas una línea entera.',
    },
    {
      q: '¿Hace falta leer la escritura local?',
      a: 'No. Las líneas escritas en kanji, kana o devanagari aceptan también la grafía romanizada. En la línea Yamanote de Tokio valen tanto «新宿» como «Shinjuku», y en la Yellow Line de Delhi valen el devanagari y el nombre inglés.',
    },
    {
      q: '¿Qué ciudades hay?',
      a: 'Además de las grandes líneas de capitales hay metros que no están en la capital: Barcelona, Busan, Osaka, Chicago, Lyon, Múnich, São Paulo, Río de Janeiro y Bombay tienen cada uno una línea.',
    },
    {
      q: '¿Se guardan los resultados?',
      a: 'El número de estaciones, el tiempo, las estaciones por minuto y la precisión se muestran en pantalla mientras juegas. Nada se envía a un servidor, así que no necesitas cuenta y al recargar se empieza de nuevo.',
    },
  ],
  lineFaq: f => [
    {
      q: `¿Cuántas estaciones tiene ${f.title}?`,
      a: f.loop
        ? `Este juego incluye ${f.count} estaciones. Es una línea circular, así que si sales de ${f.first} y das la vuelta completa vuelves a ${f.first}.`
        : `Este juego incluye ${f.count} estaciones, desde ${f.first} en un extremo hasta ${f.last} en el otro.`,
    },
    {
      q: '¿Hay que responder en orden?',
      a: `Sí. Primero pide la estación siguiente a ${f.first} y avanza por la línea. Saber el orden es justamente el reto, así que no puedes adelantarte, pero sí saltar la estación que te bloquea.`,
    },
    {
      q: '¿Puedo escribir los nombres romanizados?',
      a: 'Sí. Se aceptan la grafía local y la romanizada, y se ignoran espacios, guiones, puntos medios y mayúsculas. Si el nombre lleva un alias entre paréntesis, el alias solo también vale.',
    },
    {
      q: '¿Cómo funcionan las pistas?',
      a: 'Cada pista revela un poco más de la siguiente estación: primero su primera letra, luego cuántos caracteres tiene y después la estación anterior. El contador queda a la vista, así que terminar sin pistas es la mejor partida.',
    },
    {
      q: `¿Hay más líneas de ${f.city}?`,
      a: 'La lista de otras líneas de abajo pone primero las de la misma ciudad. Cuando termines con la ciudad, prueba una línea de otro país.',
    },
  ],
};

const pt: MetroUI = {
  home: 'Início',
  section: 'Adivinhe as estações',
  hubTitle: 'Jogo das estações de metrô',
  hubLead: 'Escolha uma linha de São Paulo, Rio de Janeiro, Seul, Tóquio, Londres ou Paris e digite as estações em ordem a partir do terminal',
  placeholder: 'Digite a próxima estação…',
  start: 'Começar',
  skip: 'Ver esta',
  perMin: 'Estações/min',
  accuracy: 'Precisão',
  wrongTry: 'Ainda não',
  nextIs: (n, t) => `Estação ${n} de ${t}`,
  restart: 'Jogar de novo',
  giveUp: 'Desistir e ver todas',
  hint: 'Dica',
  solvedOf: (a, b) => `${a} / ${b}`,
  elapsed: 'Tempo',
  remaining: 'Faltam',
  done: 'Você acertou todas',
  doneIn: t => `Concluído em ${t}`,
  already: 'Já foi encontrada',
  notFound: 'Não está nesta linha',
  hintFirst: c => `A próxima começa com “${c}”`,
  hintLen: n => `A próxima tem ${n} caracteres`,
  hintNear: a => `Fica ao lado de ${a}`,
  hintUsed: n => `${n} dicas usadas`,
  listTitle: 'Lista de estações',
  howTitle: 'Como jogar',
  how: [
    'Digite a próxima estação em ordem, a partir do terminal. Ao completar a palavra o jogo avança sem Enter.',
    'O mapa acompanha a estação da vez, e as que já passaram ficam à vista como pistas.',
    'Grafias romanizadas também valem. Espaços, hifens e maiúsculas são ignorados.',
    'Travou? Peça uma dica ou pule a estação — pular conta como erro.',
  ],
  related: 'Outras linhas',
  stations: 'Estações',
  stationCount: n => `${n} estações`,
  lineColor: 'Cor da linha',
  loopNote: 'Linha circular',
  capitalGroup: 'Metrôs de capitais',
  secondGroup: 'Metrôs fora da capital',
  linesIn: n => `${n} linhas`,
  faqTitle: 'Perguntas frequentes',
  hubMetaTitle: 'Jogo das estações de metrô — digite as paradas de linhas do mundo',
  hubMetaDesc: 'Digite em ordem as estações de linhas de metrô de São Paulo, Rio de Janeiro, Seul, Tóquio, Londres, Nova York, Paris, Berlim, Madri e Délhi. O mapa acompanha e grafias romanizadas valem.',
  metaTitle: t => `Estações da ${t}`,
  metaDesc: f =>
    `Diga as ${f.count} estações da ${f.title} (${f.country}) ${f.loop ? 'dando uma volta completa no anel' : `em ordem, de ${f.first} até ${f.last}`}. O mapa acompanha o seu avanço e grafias romanizadas valem.`,
  hubFaq: [
    {
      q: 'Como é o jogo?',
      a: 'Você escolhe uma linha e ele pede uma estação após a outra, começando pelo terminal. Ao terminar de digitar o nome, avança sem Enter, e o mapa desliza junto. A ideia é ver em quantos minutos você recita uma linha inteira.',
    },
    {
      q: 'Preciso ler a escrita local?',
      a: 'Não. As linhas escritas em kanji, kana ou devanágari aceitam também a grafia romanizada. Na Linha Yamanote de Tóquio valem “新宿” e “Shinjuku”; na Yellow Line de Délhi valem o devanágari e o nome em inglês.',
    },
    {
      q: 'Quais cidades estão incluídas?',
      a: 'Além das grandes linhas de capitais há metrôs fora da capital: São Paulo, Rio de Janeiro, Busan, Osaka, Chicago, Lyon, Munique, Barcelona e Mumbai têm uma linha cada.',
    },
    {
      q: 'Os resultados ficam salvos?',
      a: 'O número de estações, o tempo, as estações por minuto e a precisão aparecem na tela enquanto você joga. Nada é enviado a um servidor, então não precisa de conta e recarregar recomeça do zero.',
    },
  ],
  lineFaq: f => [
    {
      q: `Quantas estações tem a ${f.title}?`,
      a: f.loop
        ? `Este jogo traz ${f.count} estações. É uma linha circular, então sair de ${f.first} e dar a volta completa leva de volta a ${f.first}.`
        : `Este jogo traz ${f.count} estações, de ${f.first} em uma ponta até ${f.last} na outra.`,
    },
    {
      q: 'Preciso responder na ordem?',
      a: `Sim. Ele pede primeiro a estação seguinte a ${f.first} e segue ao longo da linha. Saber a ordem é o próprio desafio, então não é possível pular adiante — mas dá para saltar a estação que travou você.`,
    },
    {
      q: 'Posso digitar os nomes romanizados?',
      a: 'Pode. A grafia local e a romanizada valem, e espaços, hifens, pontos e maiúsculas são ignorados. Quando o nome tem um apelido entre parênteses, o apelido sozinho também é aceito.',
    },
    {
      q: 'Como funcionam as dicas?',
      a: 'Cada dica revela um pouco mais da próxima estação: primeiro a letra inicial, depois quantos caracteres ela tem e então a estação anterior. O contador fica na tela, então terminar sem dicas é a melhor partida.',
    },
    {
      q: `Há outras linhas de ${f.city}?`,
      a: 'A lista de outras linhas abaixo mostra primeiro as da mesma cidade. Depois de fechar a cidade, experimente uma linha de outro país.',
    },
  ],
};

const ja: MetroUI = {
  home: 'ホーム',
  section: '駅名当て',
  hubTitle: '地下鉄の駅名当てゲーム',
  hubLead: '東京・大阪・ソウル・ロンドン・パリ・ニューヨークなどの路線を選び、起点から順に駅名を入力します',
  placeholder: '次の駅名を入力…',
  start: 'はじめる',
  skip: 'この駅の答え',
  perMin: '駅/分',
  accuracy: '正答率',
  wrongTry: 'まだ違います',
  nextIs: (n, t) => `${t}駅中 ${n}駅目`,
  restart: 'もう一度',
  giveUp: 'あきらめて全部見る',
  hint: 'ヒント',
  solvedOf: (a, b) => `${a} / ${b}`,
  elapsed: '経過時間',
  remaining: '残り',
  done: 'すべて当てました',
  doneIn: t => `${t}で完走しました`,
  already: 'すでに当てた駅です',
  notFound: 'この路線にはありません',
  hintFirst: c => `次の駅は「${c}」から始まります`,
  hintLen: n => `次の駅は${n}文字です`,
  hintNear: a => `${a}の隣の駅です`,
  hintUsed: n => `ヒント${n}回使用`,
  listTitle: '駅一覧',
  howTitle: '遊び方',
  how: [
    '起点から順に次の駅名を入力します。打ち終わった瞬間にエンターなしで次へ進みます。',
    '路線図が今の駅に合わせて動き、通り過ぎた駅は画面に残って手がかりになります。',
    'ローマ字で打っても正解になります。空白・ハイフン・大文字小文字は無視します。',
    '詰まったらヒントを押すか、スキップで飛ばせます。スキップはミスとして数えます。',
  ],
  related: 'ほかの路線',
  stations: '駅数',
  stationCount: n => `${n}駅`,
  lineColor: '路線色',
  loopNote: '環状線',
  capitalGroup: '首都の地下鉄',
  secondGroup: '首都以外の都市の地下鉄',
  linesIn: n => `${n}路線`,
  faqTitle: 'よくある質問',
  hubMetaTitle: '駅名当てゲーム — 世界の地下鉄路線をタイピング',
  hubMetaDesc: '東京・大阪・ソウル・釜山・ロンドン・ニューヨーク・パリ・ベルリン・マドリード・デリーなど、世界の地下鉄路線の駅名を起点から順に入力するゲームです。路線図が連動し、ローマ字入力も正解になります。',
  metaTitle: t => `${t}の駅名当て`,
  metaDesc: f =>
    `${f.country}の${f.title}、全${f.count}駅を${f.loop ? '環状に一周しながら' : `${f.first}から${f.last}まで順に`}入力して当ててみましょう。路線図が連動し、ローマ字表記も正解になります。`,
  hubFaq: [
    {
      q: 'どんなゲームですか。',
      a: '路線を一つ選ぶと、起点から順に次の駅名を尋ねます。打ち終わった瞬間にエンターなしで次へ進み、路線図もそちらへ動きます。一つの路線を何分で言い切れるかを競う遊びです。',
    },
    {
      q: '現地の文字が読めないと解けませんか。',
      a: 'いいえ。漢字・かな・デーヴァナーガリーの路線はローマ字表記でも正解になります。山手線は「新宿」でも「Shinjuku」でも正解で、デリーのイエローラインはデーヴァナーガリーと英字表記の両方が通ります。',
    },
    {
      q: 'どの都市が入っていますか。',
      a: '首都の主要路線に加えて、首都以外の都市の路線も入れました。大阪・釜山・シカゴ・リヨン・ミュンヘン・バルセロナ・サンパウロ・リオデジャネイロ・ムンバイの路線をそれぞれ解けます。',
    },
    {
      q: '記録は残りますか。',
      a: '当てた駅数・経過時間・分あたりの駅数・正答率をその場で表示します。サーバーには送らないのでアカウントは不要で、再読み込みすると最初から始まります。',
    },
  ],
  lineFaq: f => [
    {
      q: `${f.title}の駅はいくつありますか。`,
      a: f.loop
        ? `このゲームには${f.count}駅が入っています。環状線なので${f.first}を出て一周すると再び${f.first}に戻ります。`
        : `このゲームには${f.count}駅が入っており、${f.first}から${f.last}までです。`,
    },
    {
      q: '順番どおりに答える必要がありますか。',
      a: `はい。${f.first}の次の駅から順に尋ねます。順番を知っていることがこのゲームの中身なので先に飛ばすことはできませんが、詰まった駅はスキップできます。`,
    },
    {
      q: 'ローマ字で入力してもよいですか。',
      a: '大丈夫です。現地表記とローマ字表記のどちらも正解になり、空白・ハイフン・中黒・大文字小文字は無視します。括弧つきの駅名は括弧の中だけでも正解です。',
    },
    {
      q: 'ヒントはどう使いますか。',
      a: 'ヒントを押すと次の駅の最初の一文字、文字数、一つ前の駅名を順に教えます。使った回数が画面に残るので、使わずに終えるほど良い記録になります。',
    },
    {
      q: `${f.city}の路線はほかにもありますか。`,
      a: '下の「ほかの路線」では同じ都市の路線を先に並べています。その都市を解き終えたら別の国の路線にも挑んでみてください。',
    },
  ],
};

const de: MetroUI = {
  home: 'Start',
  section: 'Stationen erraten',
  hubTitle: 'U-Bahn-Stationen-Quiz',
  hubLead: 'Wähle eine Linie in Berlin, München, Seoul, Tokio, London oder Paris und tippe ihre Stationen ab der Endhaltestelle in der richtigen Reihenfolge',
  placeholder: 'Nächste Station tippen…',
  start: 'Starten',
  skip: 'Diese zeigen',
  perMin: 'Stationen/Min',
  accuracy: 'Trefferquote',
  wrongTry: 'Noch nicht',
  nextIs: (n, t) => `Station ${n} von ${t}`,
  restart: 'Noch einmal',
  giveUp: 'Aufgeben und alle zeigen',
  hint: 'Tipp',
  solvedOf: (a, b) => `${a} / ${b}`,
  elapsed: 'Zeit',
  remaining: 'Übrig',
  done: 'Alle Stationen gefunden',
  doneIn: t => `In ${t} geschafft`,
  already: 'Schon gefunden',
  notFound: 'Nicht auf dieser Linie',
  hintFirst: c => `Die nächste beginnt mit „${c}“`,
  hintLen: n => `Die nächste hat ${n} Zeichen`,
  hintNear: a => `Sie liegt neben ${a}`,
  hintUsed: n => `${n} Tipps genutzt`,
  listTitle: 'Stationsliste',
  howTitle: 'So wird gespielt',
  how: [
    'Tippe die nächste Station der Reihe nach ab der Endhaltestelle. Ist das Wort fertig, geht es ohne Enter weiter.',
    'Der Netzplan folgt der aktuellen Station, und die bereits genannten bleiben als Anhaltspunkt sichtbar.',
    'Romanisierte Schreibweisen zählen ebenfalls. Leerzeichen, Bindestriche und Groß- und Kleinschreibung werden ignoriert.',
    'Hängst du fest? Nimm einen Tipp oder überspringe die Station — ein Sprung zählt als Fehler.',
  ],
  related: 'Andere Linien',
  stations: 'Stationen',
  stationCount: n => `${n} Stationen`,
  lineColor: 'Linienfarbe',
  loopNote: 'Ringlinie',
  capitalGroup: 'U-Bahnen in Hauptstädten',
  secondGroup: 'U-Bahnen außerhalb der Hauptstadt',
  linesIn: n => `${n} Linien`,
  faqTitle: 'Häufige Fragen',
  hubMetaTitle: 'U-Bahn-Stationen-Quiz — Linien der Welt tippen',
  hubMetaDesc: 'Tippe die Stationen von U-Bahn-Linien in Berlin, München, Seoul, Tokio, London, New York, Paris, Madrid, São Paulo und Delhi der Reihe nach ab der Endhaltestelle. Der Netzplan folgt mit, romanisierte Schreibweisen zählen.',
  metaTitle: t => `Stationen der ${t}`,
  metaDesc: f =>
    `Nenne alle ${f.count} Stationen der ${f.title} in ${f.country} ${f.loop ? 'auf einer Runde durch den Ring' : `der Reihe nach von ${f.first} bis ${f.last}`}. Der Netzplan folgt deinem Fortschritt, romanisierte Schreibweisen zählen.`,
  hubFaq: [
    {
      q: 'Was ist das für ein Spiel?',
      a: 'Du wählst eine Linie, und das Spiel fragt Station für Station ab der Endhaltestelle. Ist der Name fertig getippt, geht es ohne Enter weiter, und der Netzplan wandert mit. Es geht darum, in wie wenigen Minuten du eine ganze Linie aufsagen kannst.',
    },
    {
      q: 'Muss ich die Landesschrift lesen können?',
      a: 'Nein. Linien in Kanji, Kana oder Devanagari nehmen auch die romanisierte Schreibweise an. Auf der Tokioter Yamanote-Linie zählen „新宿“ und „Shinjuku“, auf der Yellow Line in Delhi sowohl Devanagari als auch der englische Name.',
    },
    {
      q: 'Welche Städte sind dabei?',
      a: 'Neben den großen Hauptstadtlinien gibt es U-Bahnen außerhalb der Hauptstadt: München, Barcelona, Busan, Osaka, Chicago, Lyon, São Paulo, Rio de Janeiro und Mumbai haben je eine Linie.',
    },
    {
      q: 'Werden Ergebnisse gespeichert?',
      a: 'Stationszahl, Zeit, Stationen pro Minute und Trefferquote stehen während des Spiels auf dem Bildschirm. Nichts geht an einen Server, also braucht es kein Konto, und ein Neuladen fängt von vorn an.',
    },
  ],
  lineFaq: f => [
    {
      q: `Wie viele Stationen hat die ${f.title}?`,
      a: f.loop
        ? `In diesem Quiz stecken ${f.count} Stationen. Sie ist eine Ringlinie: von ${f.first} aus einmal herum, und du bist wieder in ${f.first}.`
        : `In diesem Quiz stecken ${f.count} Stationen, von ${f.first} an einem Ende bis ${f.last} am anderen.`,
    },
    {
      q: 'Muss ich in der richtigen Reihenfolge antworten?',
      a: `Ja. Gefragt wird zuerst die Station nach ${f.first}, dann weiter entlang der Linie. Die Reihenfolge zu kennen ist der eigentliche Reiz, vorgreifen geht also nicht — eine Station, an der du hängst, kannst du aber überspringen.`,
    },
    {
      q: 'Darf ich romanisiert tippen?',
      a: 'Ja. Sowohl die örtliche als auch die romanisierte Schreibweise zählt, und Leerzeichen, Bindestriche, Mittelpunkte sowie Groß- und Kleinschreibung werden ignoriert. Steht ein Beiname in Klammern, gilt auch er allein.',
    },
    {
      q: 'Wie funktionieren die Tipps?',
      a: 'Jeder Tipp verrät ein Stück mehr über die nächste Station: erst ihren Anfangsbuchstaben, dann ihre Zeichenzahl, dann die Station davor. Der Zähler bleibt sichtbar — ohne Tipps durchzukommen ist der bessere Lauf.',
    },
    {
      q: `Gibt es weitere Linien in ${f.city}?`,
      a: 'Die Liste weiter unten stellt die Linien derselben Stadt nach vorn. Ist die Stadt durchgespielt, nimm eine Linie aus einem anderen Land.',
    },
  ],
};

const fr: MetroUI = {
  home: 'Accueil',
  section: 'Devinez les stations',
  hubTitle: 'Quiz des stations de métro',
  hubLead: 'Choisissez une ligne à Paris, Lyon, Séoul, Tokyo, Londres ou Berlin et tapez ses stations dans l’ordre depuis le terminus',
  placeholder: 'Tapez la station suivante…',
  start: 'Commencer',
  skip: 'Voir celle-ci',
  perMin: 'Stations/min',
  accuracy: 'Précision',
  wrongTry: 'Pas encore',
  nextIs: (n, t) => `Station ${n} sur ${t}`,
  restart: 'Rejouer',
  giveUp: 'Abandonner et tout voir',
  hint: 'Indice',
  solvedOf: (a, b) => `${a} / ${b}`,
  elapsed: 'Temps',
  remaining: 'Restantes',
  done: 'Vous les avez toutes trouvées',
  doneIn: t => `Terminé en ${t}`,
  already: 'Déjà trouvée',
  notFound: 'Pas sur cette ligne',
  hintFirst: c => `La suivante commence par « ${c} »`,
  hintLen: n => `La suivante compte ${n} caractères`,
  hintNear: a => `Elle est à côté de ${a}`,
  hintUsed: n => `${n} indices utilisés`,
  listTitle: 'Liste des stations',
  howTitle: 'Comment jouer',
  how: [
    'Tapez la station suivante dans l’ordre, en partant du terminus. Dès que le mot est complet, on avance sans Entrée.',
    'Le plan suit la station en cours, et celles déjà passées restent visibles comme indices.',
    'Les graphies romanisées comptent aussi. Espaces, traits d’union et majuscules sont ignorés.',
    'Bloqué ? Prenez un indice ou passez la station — un passage compte comme une erreur.',
  ],
  related: 'Autres lignes',
  stations: 'Stations',
  stationCount: n => `${n} stations`,
  lineColor: 'Couleur de la ligne',
  loopNote: 'Ligne circulaire',
  capitalGroup: 'Métros de capitales',
  secondGroup: 'Métros hors de la capitale',
  linesIn: n => `${n} lignes`,
  faqTitle: 'Questions fréquentes',
  hubMetaTitle: 'Quiz des stations de métro — tapez les arrêts des lignes du monde',
  hubMetaDesc: 'Tapez dans l’ordre les stations de lignes de métro à Paris, Lyon, Séoul, Tokyo, Londres, New York, Berlin, Madrid, São Paulo et Delhi. Le plan suit votre progression et les graphies romanisées comptent.',
  metaTitle: t => `Stations de la ${t}`,
  metaDesc: f =>
    `Nommez les ${f.count} stations de la ${f.title} (${f.country}) ${f.loop ? 'en faisant un tour complet de la boucle' : `dans l’ordre, de ${f.first} à ${f.last}`}. Le plan suit votre progression et les graphies romanisées comptent.`,
  hubFaq: [
    {
      q: 'En quoi consiste le jeu ?',
      a: 'Vous choisissez une ligne et le jeu demande les stations l’une après l’autre depuis le terminus. Dès que le nom est tapé en entier, on avance sans Entrée et le plan se déplace avec vous. Le but est de voir en combien de minutes vous récitez une ligne entière.',
    },
    {
      q: 'Faut-il lire l’écriture locale ?',
      a: 'Non. Les lignes écrites en kanji, kana ou devanagari acceptent aussi la graphie romanisée. Sur la Yamanote de Tokyo, « 新宿 » et « Shinjuku » comptent tous deux ; sur la Yellow Line de Delhi, le devanagari et le nom anglais fonctionnent.',
    },
    {
      q: 'Quelles villes sont proposées ?',
      a: 'À côté des grandes lignes de capitales figurent des métros hors de la capitale : Lyon, Barcelone, Munich, Busan, Osaka, Chicago, São Paulo, Rio de Janeiro et Mumbai ont chacun une ligne.',
    },
    {
      q: 'Les scores sont-ils enregistrés ?',
      a: 'Le nombre de stations, le temps, les stations par minute et la précision s’affichent pendant la partie. Rien n’est envoyé à un serveur : aucun compte n’est nécessaire et un rechargement repart de zéro.',
    },
  ],
  lineFaq: f => [
    {
      q: `Combien de stations compte la ${f.title} ?`,
      a: f.loop
        ? `Ce quiz contient ${f.count} stations. C’est une ligne circulaire : en partant de ${f.first} et en faisant le tour, on revient à ${f.first}.`
        : `Ce quiz contient ${f.count} stations, de ${f.first} à un bout jusqu’à ${f.last} à l’autre.`,
    },
    {
      q: 'Faut-il répondre dans l’ordre ?',
      a: `Oui. La station demandée en premier est celle qui suit ${f.first}, puis on progresse le long de la ligne. Connaître l’ordre est tout l’intérêt, on ne peut donc pas sauter en avant — mais on peut passer une station qui bloque.`,
    },
    {
      q: 'Puis-je taper les noms romanisés ?',
      a: 'Oui. La graphie locale comme la romanisée comptent, et les espaces, traits d’union, points médians et majuscules sont ignorés. Si le nom porte un alias entre parenthèses, cet alias seul est accepté.',
    },
    {
      q: 'Comment marchent les indices ?',
      a: 'Chaque indice en dit un peu plus sur la station suivante : d’abord sa première lettre, puis son nombre de caractères, puis la station qui la précède. Le compteur reste affiché : finir sans indice est la meilleure partie.',
    },
    {
      q: `Y a-t-il d’autres lignes à ${f.city} ?`,
      a: 'La liste des autres lignes, plus bas, place d’abord celles de la même ville. Une fois la ville terminée, essayez une ligne d’un autre pays.',
    },
  ],
};

const hi: MetroUI = {
  home: 'होम',
  section: 'स्टेशन के नाम बताइए',
  hubTitle: 'मेट्रो स्टेशन नाम क्विज़',
  hubLead: 'दिल्ली, मुंबई, सिओल, टोक्यो, लंदन या पेरिस की कोई लाइन चुनें और टर्मिनल से क्रम में स्टेशन के नाम टाइप करें',
  placeholder: 'अगला स्टेशन टाइप करें…',
  start: 'शुरू करें',
  skip: 'यह वाला दिखाएँ',
  perMin: 'स्टेशन/मिनट',
  accuracy: 'सटीकता',
  wrongTry: 'अभी सही नहीं',
  nextIs: (n, t) => `${t} में से ${n}वाँ स्टेशन`,
  restart: 'फिर खेलें',
  giveUp: 'हार मानें और सब देखें',
  hint: 'संकेत',
  solvedOf: (a, b) => `${a} / ${b}`,
  elapsed: 'बीता समय',
  remaining: 'बाकी',
  done: 'आपने सभी नाम बता दिए',
  doneIn: t => `${t} में पूरा किया`,
  already: 'यह पहले ही मिल चुका है',
  notFound: 'यह इस लाइन पर नहीं है',
  hintFirst: c => `अगला स्टेशन “${c}” से शुरू होता है`,
  hintLen: n => `अगले स्टेशन में ${n} अक्षर हैं`,
  hintNear: a => `यह ${a} के बगल में है`,
  hintUsed: n => `${n} संकेत इस्तेमाल किए`,
  listTitle: 'स्टेशन सूची',
  howTitle: 'कैसे खेलें',
  how: [
    'टर्मिनल से क्रम में अगले स्टेशन का नाम टाइप करें। नाम पूरा होते ही एंटर के बिना आगे बढ़ जाता है।',
    'नक्शा चालू स्टेशन के साथ खिसकता है, और पीछे छूटे स्टेशन संकेत के तौर पर दिखते रहते हैं।',
    'रोमन लिपि में लिखा नाम भी सही माना जाता है। खाली जगह, हाइफ़न और बड़े-छोटे अक्षर नहीं गिने जाते।',
    'अटक गए? संकेत लें या स्टेशन छोड़ दें — छोड़ा हुआ स्टेशन गलती में गिना जाता है।',
  ],
  related: 'अन्य लाइनें',
  stations: 'स्टेशन',
  stationCount: n => `${n} स्टेशन`,
  lineColor: 'लाइन का रंग',
  loopNote: 'रिंग लाइन',
  capitalGroup: 'राजधानियों की मेट्रो',
  secondGroup: 'राजधानी से बाहर की मेट्रो',
  linesIn: n => `${n} लाइनें`,
  faqTitle: 'आम सवाल',
  hubMetaTitle: 'मेट्रो स्टेशन नाम क्विज़ — दुनिया की मेट्रो लाइनें टाइप करें',
  hubMetaDesc: 'दिल्ली, मुंबई, सिओल, टोक्यो, लंदन, न्यूयॉर्क, पेरिस, बर्लिन, मैड्रिड और साओ पाउलो की मेट्रो लाइनों के स्टेशन टर्मिनल से क्रम में टाइप करें। नक्शा साथ चलता है और रोमन लिपि भी सही मानी जाती है।',
  metaTitle: t => `${t} के स्टेशन`,
  metaDesc: f =>
    `${f.country} की ${f.title} के ${f.count} स्टेशन ${f.loop ? 'रिंग के चक्कर के क्रम में' : `${f.first} से ${f.last} तक क्रम में`} टाइप करके बताइए। नक्शा आपके साथ चलता है और रोमन लिपि भी सही मानी जाती है।`,
  hubFaq: [
    {
      q: 'यह खेल क्या है?',
      a: 'आप एक लाइन चुनते हैं और खेल टर्मिनल से एक-एक स्टेशन पूछता जाता है। नाम पूरा टाइप होते ही एंटर के बिना आगे बढ़ जाता है और नक्शा भी साथ खिसकता है। देखना यह है कि पूरी लाइन कितने मिनट में बोल पाते हैं।',
    },
    {
      q: 'क्या स्थानीय लिपि पढ़नी ज़रूरी है?',
      a: 'नहीं। कांजी, काना या देवनागरी में लिखी लाइनों में रोमन लिपि भी सही मानी जाती है। टोक्यो की यामानोते लाइन पर “新宿” और “Shinjuku” दोनों चलते हैं, और दिल्ली की येलो लाइन पर देवनागरी तथा अंग्रेज़ी नाम दोनों।',
    },
    {
      q: 'कौन-कौन शहर शामिल हैं?',
      a: 'राजधानियों की बड़ी लाइनों के साथ राजधानी से बाहर के शहरों की मेट्रो भी है — मुंबई, बुसान, ओसाका, शिकागो, ल्योन, म्यूनिक, बार्सिलोना, साओ पाउलो और रियो डी जनेरो की एक-एक लाइन।',
    },
    {
      q: 'क्या रिकॉर्ड सहेजा जाता है?',
      a: 'बताए गए स्टेशन, बीता समय, प्रति मिनट स्टेशन और सटीकता खेलते-खेलते स्क्रीन पर दिखते हैं। कुछ भी सर्वर पर नहीं जाता, इसलिए खाता नहीं चाहिए और पेज ताज़ा करने पर खेल शुरू से चलता है।',
    },
  ],
  lineFaq: f => [
    {
      q: `${f.title} पर कितने स्टेशन हैं?`,
      a: f.loop
        ? `इस क्विज़ में ${f.count} स्टेशन हैं। यह रिंग लाइन है, इसलिए ${f.first} से चलकर पूरा चक्कर लगाने पर आप फिर ${f.first} पहुँच जाते हैं।`
        : `इस क्विज़ में ${f.count} स्टेशन हैं, एक सिरे पर ${f.first} और दूसरे सिरे पर ${f.last}।`,
    },
    {
      q: 'क्या क्रम से जवाब देना ज़रूरी है?',
      a: `हाँ। पहले ${f.first} के बाद वाला स्टेशन पूछा जाता है और फिर लाइन के साथ आगे बढ़ता है। क्रम जानना ही इस खेल की बात है, इसलिए आगे नहीं कूद सकते — पर जिस स्टेशन पर अटकें उसे छोड़ सकते हैं।`,
    },
    {
      q: 'क्या रोमन लिपि में नाम लिख सकते हैं?',
      a: 'हाँ। स्थानीय और रोमन दोनों वर्तनी सही मानी जाती हैं, और खाली जगह, हाइफ़न, बिंदु तथा बड़े-छोटे अक्षर नहीं गिने जाते। कोष्ठक में दूसरा नाम हो तो अकेला वह नाम भी चलता है।',
    },
    {
      q: 'संकेत कैसे काम करते हैं?',
      a: 'हर संकेत अगले स्टेशन के बारे में थोड़ा और बताता है — पहले पहला अक्षर, फिर अक्षरों की संख्या, फिर उससे पहले वाला स्टेशन। गिनती स्क्रीन पर रहती है, इसलिए बिना संकेत पूरा करना बेहतर खेल माना जाता है।',
    },
    {
      q: `${f.city} की और लाइनें हैं?`,
      a: 'नीचे दी अन्य लाइनों की सूची में उसी शहर की लाइनें पहले आती हैं। शहर पूरा हो जाए तो किसी दूसरे देश की लाइन आज़माइए।',
    },
  ],
};

const zh: MetroUI = {
  home: '首页',
  section: '地铁站名接龙',
  hubTitle: '地铁线路站名接龙',
  hubLead: '挑一条首尔、釜山、东京、伦敦、巴黎、柏林、马德里、圣保罗或德里的线路，从起点开始按顺序把站名一个个打出来',
  placeholder: '打出下一站的名字…',
  start: '开始',
  skip: '看这一站',
  perMin: '每分钟站数',
  accuracy: '正确率',
  wrongTry: '还没对上',
  nextIs: (n, t) => `第 ${n} 站 / 共 ${t} 站`,
  restart: '重来一次',
  giveUp: '放弃，看全部',
  hint: '提示',
  solvedOf: (a, b) => `${a} / ${b}`,
  elapsed: '已用时间',
  remaining: '还剩几站',
  done: '全部答对了',
  doneIn: t => `用 ${t} 跑完全程`,
  already: '这一站已经答过了',
  notFound: '这条线上没有这一站',
  hintFirst: c => `下一站以「${c}」开头`,
  hintLen: n => `下一站是 ${n} 个字`,
  hintNear: a => `就在 ${a} 旁边的那一站`,
  hintUsed: n => `用了 ${n} 次提示`,
  listTitle: '站点列表',
  howTitle: '怎么玩',
  how: [
    '从起点开始，按顺序把下一站的名字打出来。打完那一刻就自动过关，不用按回车。',
    '线路图会跟着要答的那一站移动，走过的站留在屏幕上，本身就是线索。',
    '打罗马字也算对。空格、连字符和大小写一律不计。',
    '卡住了可以按提示，或者用跳过越过这一站。跳过的站算作打错。',
  ],
  related: '其他线路',
  stations: '站数',
  stationCount: n => `${n} 站`,
  lineColor: '线路色',
  loopNote: '环线',
  capitalGroup: '首都的地铁',
  secondGroup: '非首都城市的地铁',
  linesIn: n => `${n} 条线路`,
  faqTitle: '常见问题',
  hubMetaTitle: '地铁站名接龙 — 世界各地线路的打字游戏',
  hubMetaDesc: '首尔、釜山、东京、大阪、伦敦、纽约、巴黎、柏林、马德里、圣保罗、德里等世界地铁线路，从起点开始按顺序打出站名的游戏。线路图会跟着走，打罗马字也算对。',
  metaTitle: t => `${t}站名接龙`,
  metaDesc: f =>
    `试着把${f.country}${f.title}的 ${f.count} 个站${f.loop ? '按环行方向' : `从${f.first}到${f.last}依次`}打出来。线路图会跟着走，罗马字写法也算对。`,
  hubFaq: [
    {
      q: '这是个什么游戏？',
      a: '选好一条线路，它就从起点开始依次问你下一站叫什么。把答案打完那一刻不用按回车就跳到下一站，线路图也跟着挪过去。比的是你能用几分钟把一整条线数完。',
    },
    {
      q: '必须会当地语言的站名吗？',
      a: '不必。汉字、假名、天城文的线路都收罗马字写法。东京山手线写「新宿」或「Shinjuku」都算对，德里黄线的天城文和英文拼写也都通。',
    },
    {
      q: '收了哪些城市？',
      a: '除了首都的大线路，也收了非首都城市的线路。釜山、大阪、芝加哥、里昂、慕尼黑、巴塞罗那、圣保罗、里约热内卢、孟买的线路都能玩。',
    },
    {
      q: '成绩会保存吗？',
      a: '答对的站数、已用时间、每分钟站数和正确率会当场显示在屏幕上。这些不发往服务器，所以不用注册账号，刷新之后也就从头开始了。',
    },
  ],
  lineFaq: f => [
    {
      q: `${f.title}一共有多少站？`,
      a: f.loop
        ? `这个游戏里收了 ${f.count} 站。它是环线，首尾相接，从${f.first}出发绕一整圈，最后还是回到${f.first}。`
        : `这个游戏里收了 ${f.count} 站，从${f.first}出发，到${f.last}结束。`,
    },
    {
      q: '一定要按顺序答吗？',
      a: `是的。从${f.first}的下一站开始依次问。这个游戏考的就是顺序，所以不能挑着先答；卡住的话，可以用跳过单独越过那一站。`,
    },
    {
      q: '可以用罗马字输入吗？',
      a: '可以。当地写法和罗马字写法都算对，空格、连字符、间隔号和大小写一律不计。带括号的站，只打括号里的名字也算对。',
    },
    {
      q: '提示要怎么用？',
      a: '按下提示，会依次告诉你下一站的第一个字、有几个字、以及前一站叫什么。用了几次会留在屏幕上，所以一次不用地跑完，成绩就更漂亮。',
    },
    {
      q: `${f.city}还有别的线路吗？`,
      a: '下方的其他线路列表里，会先列出同一座城市的线路。把这座城市的线路都玩完，再去试试别的国家。',
    },
  ],
};

const tw: MetroUI = {
  home: '首頁',
  section: '地鐵站名接龍',
  hubTitle: '地鐵路線站名接龍',
  hubLead: '挑一條首爾、釜山、東京、倫敦、巴黎、柏林、馬德里、聖保羅或德里的路線，從起點開始按順序把站名一個個打出來',
  placeholder: '打出下一站的名字…',
  start: '開始',
  skip: '看這一站',
  perMin: '每分鐘站數',
  accuracy: '正確率',
  wrongTry: '還沒對上',
  nextIs: (n, t) => `第 ${n} 站 / 共 ${t} 站`,
  restart: '重來一次',
  giveUp: '放棄，看全部',
  hint: '提示',
  solvedOf: (a, b) => `${a} / ${b}`,
  elapsed: '已用時間',
  remaining: '還剩幾站',
  done: '全部答對了',
  doneIn: t => `用 ${t} 跑完全程`,
  already: '這一站已經答過了',
  notFound: '這條線上沒有這一站',
  hintFirst: c => `下一站以「${c}」開頭`,
  hintLen: n => `下一站是 ${n} 個字`,
  hintNear: a => `就在 ${a} 旁邊的那一站`,
  hintUsed: n => `用了 ${n} 次提示`,
  listTitle: '站點列表',
  howTitle: '怎麼玩',
  how: [
    '從起點開始，按順序把下一站的名字打出來。打完那一刻就自動過關，不用按 Enter。',
    '路線圖會跟著要答的那一站移動，走過的站留在螢幕上，本身就是線索。',
    '打羅馬字也算對。空格、連字號和大小寫一律不計。',
    '卡住了可以按提示，或者用跳過越過這一站。跳過的站算作打錯。',
  ],
  related: '其他路線',
  stations: '站數',
  stationCount: n => `${n} 站`,
  lineColor: '路線色',
  loopNote: '環線',
  capitalGroup: '首都的地鐵',
  secondGroup: '非首都城市的地鐵',
  linesIn: n => `${n} 條路線`,
  faqTitle: '常見問題',
  hubMetaTitle: '地鐵站名接龍 — 世界各地路線的打字遊戲',
  hubMetaDesc: '首爾、釜山、東京、大阪、倫敦、紐約、巴黎、柏林、馬德里、聖保羅、德里等世界地鐵路線，從起點開始按順序打出站名的遊戲。路線圖會跟著走，打羅馬字也算對。',
  metaTitle: t => `${t}站名接龍`,
  metaDesc: f =>
    `試著把${f.country}${f.title}的 ${f.count} 個站${f.loop ? '按環行方向' : `從${f.first}到${f.last}依次`}打出來。路線圖會跟著走，羅馬字寫法也算對。`,
  hubFaq: [
    {
      q: '這是個什麼遊戲？',
      a: '選好一條路線，它就從起點開始依次問你下一站叫什麼。把答案打完那一刻不用按 Enter 就跳到下一站，路線圖也跟著挪過去。比的是你能用幾分鐘把一整條線數完。',
    },
    {
      q: '必須會當地語言的站名嗎？',
      a: '不必。漢字、假名、天城文的路線都收羅馬字寫法。東京山手線寫「新宿」或「Shinjuku」都算對，德里黃線的天城文和英文拼寫也都通。',
    },
    {
      q: '收了哪些城市？',
      a: '除了首都的大路線，也收了非首都城市的路線。釜山、大阪、芝加哥、里昂、慕尼黑、巴塞隆納、聖保羅、里約熱內盧、孟買的路線都能玩。',
    },
    {
      q: '成績會保存嗎？',
      a: '答對的站數、已用時間、每分鐘站數和正確率會當場顯示在螢幕上。這些不發往伺服器，所以不用註冊帳號，重新整理之後也就從頭開始了。',
    },
  ],
  lineFaq: f => [
    {
      q: `${f.title}一共有多少站？`,
      a: f.loop
        ? `這個遊戲裡收了 ${f.count} 站。它是環線，首尾相接，從${f.first}出發繞一整圈，最後還是回到${f.first}。`
        : `這個遊戲裡收了 ${f.count} 站，從${f.first}出發，到${f.last}結束。`,
    },
    {
      q: '一定要按順序答嗎？',
      a: `是的。從${f.first}的下一站開始依次問。這個遊戲考的就是順序，所以不能挑著先答；卡住的話，可以用跳過單獨越過那一站。`,
    },
    {
      q: '可以用羅馬字輸入嗎？',
      a: '可以。當地寫法和羅馬字寫法都算對，空格、連字號、間隔號和大小寫一律不計。帶括號的站，只打括號裡的名字也算對。',
    },
    {
      q: '提示要怎麼用？',
      a: '按下提示，會依次告訴你下一站的第一個字、有幾個字、以及前一站叫什麼。用了幾次會留在螢幕上，所以一次不用地跑完，成績就更漂亮。',
    },
    {
      q: `${f.city}還有別的路線嗎？`,
      a: '下方的其他路線列表裡，會先列出同一座城市的路線。把這座城市的路線都玩完，再去試試別的國家。',
    },
  ],
};

export const METRO_UI: L<MetroUI> = { ko, en, es, pt, ja, de, fr, hi, zh, tw };

export const metroUi = (lang: MetroLang): MetroUI => METRO_UI[lang];

/** 경과 시간을 분:초로 */
export const clock = (ms: number): string => {
  const total = Math.floor(ms / 1000);
  const m = Math.floor(total / 60);
  const sec = total % 60;
  return `${m}:${String(sec).padStart(2, '0')}`;
};

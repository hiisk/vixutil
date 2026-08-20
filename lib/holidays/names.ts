/**
 * 공휴일 이름 — 현지어를 앞세운다.
 *
 * 「Tag der Deutschen Einheit」를 「독일 통일의 날」로만 적으면 독일 사람이
 * 찾는 말과 어긋난다. 사람들이 실제로 치는 것은 그 나라 말이므로 그것을
 * 제목으로 삼고, 영어 이름을 곁들여 다른 나라 사람도 알아보게 한다.
 *
 * 일본처럼 글자를 못 읽는 사람이 있는 경우 로마자 읽기를 함께 준다 —
 * 「元日 (Ganjitsu)」.
 *
 * 열 언어로 다 옮기지는 않았다. 옮기면 750개가 되는데, 그 가운데 실제로
 * 쓰이는 것은 «그 나라 사람이 자기 나라 공휴일을 보는» 경우가 압도적이고
 * 그건 현지어로 이미 맞다. 나머지는 영어가 받는다.
 */

export interface HolidayName {
  /** 그 나라 말 이름 — 제목이 되는 말 */
  native: string;
  /** 글자를 못 읽는 사람을 위한 로마자 (일본만) */
  roman?: string;
  /** 영어 이름 */
  en: string;
}

/** `나라코드:슬러그` → 이름 */
export const HOLIDAY_NAMES: Record<string, HolidayName> = {
  /* ── 미국 ─────────────────────────────────────────────── */
  'us:new-years-day': { native: "New Year's Day", en: "New Year's Day" },
  'us:mlk-day': { native: 'Martin Luther King Jr. Day', en: 'Martin Luther King Jr. Day' },
  'us:presidents-day': { native: "Presidents' Day", en: "Presidents' Day (Washington's Birthday)" },
  'us:memorial-day': { native: 'Memorial Day', en: 'Memorial Day' },
  'us:juneteenth': { native: 'Juneteenth', en: 'Juneteenth National Independence Day' },
  'us:independence-day': { native: 'Independence Day', en: 'Independence Day' },
  'us:labor-day': { native: 'Labor Day', en: 'Labor Day' },
  'us:columbus-day': { native: 'Columbus Day', en: 'Columbus Day' },
  'us:veterans-day': { native: 'Veterans Day', en: 'Veterans Day' },
  'us:thanksgiving': { native: 'Thanksgiving Day', en: 'Thanksgiving Day' },
  'us:christmas-day': { native: 'Christmas Day', en: 'Christmas Day' },

  /* ── 영국 ─────────────────────────────────────────────── */
  'gb:new-years-day': { native: "New Year's Day", en: "New Year's Day" },
  'gb:good-friday': { native: 'Good Friday', en: 'Good Friday' },
  'gb:easter-monday': { native: 'Easter Monday', en: 'Easter Monday' },
  'gb:early-may': { native: 'Early May bank holiday', en: 'Early May bank holiday' },
  'gb:spring-bank': { native: 'Spring bank holiday', en: 'Spring bank holiday' },
  'gb:summer-bank': { native: 'Summer bank holiday', en: 'Summer bank holiday' },
  'gb:christmas-day': { native: 'Christmas Day', en: 'Christmas Day' },
  'gb:boxing-day': { native: 'Boxing Day', en: 'Boxing Day' },

  /* ── 독일 ─────────────────────────────────────────────── */
  'de:neujahr': { native: 'Neujahr', en: "New Year's Day" },
  'de:karfreitag': { native: 'Karfreitag', en: 'Good Friday' },
  'de:ostermontag': { native: 'Ostermontag', en: 'Easter Monday' },
  'de:tag-der-arbeit': { native: 'Tag der Arbeit', en: 'Labour Day' },
  'de:christi-himmelfahrt': { native: 'Christi Himmelfahrt', en: 'Ascension Day' },
  'de:pfingstmontag': { native: 'Pfingstmontag', en: 'Whit Monday' },
  'de:tag-der-deutschen-einheit': { native: 'Tag der Deutschen Einheit', en: 'German Unity Day' },
  'de:erster-weihnachtstag': { native: 'Erster Weihnachtstag', en: 'Christmas Day' },
  'de:zweiter-weihnachtstag': { native: 'Zweiter Weihnachtstag', en: 'Boxing Day' },

  /* ── 프랑스 ───────────────────────────────────────────── */
  'fr:jour-de-l-an': { native: "Jour de l'An", en: "New Year's Day" },
  'fr:lundi-de-paques': { native: 'Lundi de Pâques', en: 'Easter Monday' },
  'fr:fete-du-travail': { native: 'Fête du Travail', en: 'Labour Day' },
  'fr:victoire-1945': { native: 'Victoire 1945', en: 'Victory in Europe Day' },
  'fr:ascension': { native: 'Ascension', en: 'Ascension Day' },
  'fr:lundi-de-pentecote': { native: 'Lundi de Pentecôte', en: 'Whit Monday' },
  'fr:fete-nationale': { native: 'Fête nationale', en: 'Bastille Day' },
  'fr:assomption': { native: 'Assomption', en: 'Assumption of Mary' },
  'fr:toussaint': { native: 'Toussaint', en: "All Saints' Day" },
  'fr:armistice-1918': { native: 'Armistice 1918', en: 'Armistice Day' },
  'fr:noel': { native: 'Noël', en: 'Christmas Day' },

  /* ── 스페인 ───────────────────────────────────────────── */
  'es:ano-nuevo': { native: 'Año Nuevo', en: "New Year's Day" },
  'es:epifania-del-senor': { native: 'Epifanía del Señor', en: 'Epiphany' },
  'es:viernes-santo': { native: 'Viernes Santo', en: 'Good Friday' },
  'es:fiesta-del-trabajo': { native: 'Fiesta del Trabajo', en: 'Labour Day' },
  'es:asuncion-de-la-virgen': { native: 'Asunción de la Virgen', en: 'Assumption of Mary' },
  'es:fiesta-nacional': { native: 'Fiesta Nacional de España', en: 'National Day of Spain' },
  'es:todos-los-santos': { native: 'Todos los Santos', en: "All Saints' Day" },
  'es:dia-de-la-constitucion': { native: 'Día de la Constitución', en: 'Constitution Day' },
  'es:inmaculada-concepcion': { native: 'Inmaculada Concepción', en: 'Immaculate Conception' },
  'es:navidad': { native: 'Navidad', en: 'Christmas Day' },

  /* ── 브라질 ───────────────────────────────────────────── */
  'br:confraternizacao-universal': { native: 'Confraternização Universal', en: "New Year's Day" },
  'br:sexta-feira-santa': { native: 'Sexta-feira Santa', en: 'Good Friday' },
  'br:tiradentes': { native: 'Tiradentes', en: 'Tiradentes Day' },
  'br:dia-do-trabalho': { native: 'Dia do Trabalho', en: 'Labour Day' },
  'br:independencia': { native: 'Independência do Brasil', en: 'Independence Day' },
  'br:nossa-senhora-aparecida': { native: 'Nossa Senhora Aparecida', en: 'Our Lady of Aparecida' },
  'br:finados': { native: 'Finados', en: "All Souls' Day" },
  'br:proclamacao-da-republica': { native: 'Proclamação da República', en: 'Republic Day' },
  'br:consciencia-negra': { native: 'Consciência Negra', en: 'Black Awareness Day' },
  'br:natal': { native: 'Natal', en: 'Christmas Day' },

  /* ── 일본 ─────────────────────────────────────────────── */
  'jp:ganjitsu': { native: '元日', roman: 'Ganjitsu', en: "New Year's Day" },
  'jp:seijin': { native: '成人の日', roman: 'Seijin no Hi', en: 'Coming of Age Day' },
  'jp:kenkoku': { native: '建国記念の日', roman: 'Kenkoku Kinen no Hi', en: 'National Foundation Day' },
  'jp:tenno-tanjobi': { native: '天皇誕生日', roman: 'Tennō Tanjōbi', en: "The Emperor's Birthday" },
  'jp:shunbun': { native: '春分の日', roman: 'Shunbun no Hi', en: 'Vernal Equinox Day' },
  'jp:showa': { native: '昭和の日', roman: 'Shōwa no Hi', en: 'Shōwa Day' },
  'jp:kenpo': { native: '憲法記念日', roman: 'Kenpō Kinenbi', en: 'Constitution Memorial Day' },
  'jp:midori': { native: 'みどりの日', roman: 'Midori no Hi', en: 'Greenery Day' },
  'jp:kodomo': { native: 'こどもの日', roman: 'Kodomo no Hi', en: "Children's Day" },
  'jp:umi': { native: '海の日', roman: 'Umi no Hi', en: 'Marine Day' },
  'jp:yama': { native: '山の日', roman: 'Yama no Hi', en: 'Mountain Day' },
  'jp:keiro': { native: '敬老の日', roman: 'Keirō no Hi', en: 'Respect for the Aged Day' },
  'jp:shubun': { native: '秋分の日', roman: 'Shūbun no Hi', en: 'Autumnal Equinox Day' },
  'jp:sports': { native: 'スポーツの日', roman: 'Supōtsu no Hi', en: 'Sports Day' },
  'jp:bunka': { native: '文化の日', roman: 'Bunka no Hi', en: 'Culture Day' },
  'jp:kinro': { native: '勤労感謝の日', roman: 'Kinrō Kansha no Hi', en: 'Labour Thanksgiving Day' },
};

export const nameOf = (country: string, slug: string): HolidayName =>
  HOLIDAY_NAMES[`${country}:${slug}`] ?? { native: slug, en: slug };

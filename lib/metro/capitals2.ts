/**
 * 지하철 노선 - 새로 넣은 수도 노선 (3)
 *
 * 언어를 여덟으로 늘렸으니 그 언어를 쓰는 나라의 수도가 빠져 있으면 안 된다.
 * 스페인어·독일어·힌디어 화면에서 자기 도시의 노선을 풀 수 있도록 마드리드·
 * 베를린·델리를 넣는다.
 *
 * 델리는 역 이름을 영문 표기로 두고 데바나가리를 함께 정답으로 받는다 — 델리
 * 지하철의 안내판이 두 표기를 나란히 쓰기 때문이다.
 */
import { T, s, sa } from './copy.ts';
import type { MetroLine } from './types.ts';

export const CAPITAL2_LINES: MetroLine[] = [
  {
    slug: 'madrid-line-1', city: 'madrid', num: '1', color: '#30a3dc',
    shape: ['S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'SE', 'SE', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'SE', 'SE', 'SE', 'E', 'E', 'SE', 'SE', 'SE', 'SE', 'SE', 'SE', 'SE', 'SE'],
    stations: [
      s('Pinar de Chamartín', 'Pinar de Chamartin', 'terminus'), s('Bambú', 'Bambu'),
      s('Chamartín', 'Chamartin', 'transfer'), s('Plaza de Castilla', undefined, 'transfer'),
      s('Valdeacederas'), s('Tetuán', 'Tetuan'), s('Estrecho'), s('Alvarado'),
      s('Cuatro Caminos', undefined, 'transfer'), s('Ríos Rosas', 'Rios Rosas'), s('Iglesia'),
      s('Bilbao', undefined, 'transfer'), s('Tribunal', undefined, 'transfer'),
      s('Gran Vía', 'Gran Via', 'transfer'), s('Sol', undefined, 'transfer'),
      s('Tirso de Molina'), s('Antón Martín', 'Anton Martin'), s('Estación del Arte', 'Estacion del Arte'),
      s('Atocha Renfe'), s('Menéndez Pelayo', 'Menendez Pelayo'), s('Pacífico', 'Pacifico', 'transfer'),
      s('Puente de Vallecas', undefined, 'transfer'), s('Nueva Numancia'), s('Portazgo'),
      s('Buenos Aires'), s('Alto del Arenal'), s('Miguel Hernández', 'Miguel Hernandez'),
      s('Sierra de Guadalupe'), s('Villa de Vallecas'), s('Congosto'), s('La Gavia'),
      s('Las Suertes'), s('Valdecarros', undefined, 'terminus'),
    ],
    text: T(
      ['1919년에 개통한 스페인 최초의 지하철 노선입니다. 마드리드를 북에서 남으로 관통하며 솔과 그란비아 같은 도심 한복판을 지납니다.',
       '악센트가 없어도 정답으로 받습니다. Sol·Gran Vía·Atocha를 뼈대로 잡고 남쪽 바예카스 구간을 채워 보세요.'],
      ['Spain’s first metro line, opened in 1919. It runs north to south across Madrid, straight through Sol and Gran Vía in the centre.',
       'Spellings without accents count. Anchor on Sol, Gran Vía and Atocha, then fill in the Vallecas stretch to the south.'],
      ['La primera línea de metro de España, inaugurada en 1919. Cruza Madrid de norte a sur y pasa por el mismo centro: Sol y Gran Vía.',
       'Las grafías sin acentos valen. Fija Sol, Gran Vía y Atocha y luego rellena el tramo de Vallecas, al sur.'],
      ['A primeira linha de metrô da Espanha, inaugurada em 1919. Cruza Madri de norte a sul e passa pelo centro, por Sol e Gran Vía.',
       'As grafias sem acento valem. Fixe Sol, Gran Vía e Atocha e depois preencha o trecho de Vallecas, ao sul.'],
      ['1919年に開通したスペイン最初の地下鉄路線です。マドリードを北から南へ貫き、ソルやグランビアといった中心部を通ります。',
       'アクセント記号なしでも正解になります。Sol・Gran Vía・Atocha を骨組みにし、南のバジェカス区間を埋めていきましょう。'],
      ['Spaniens erste U-Bahn-Linie, 1919 eröffnet. Sie durchquert Madrid von Nord nach Süd, mitten durch Sol und Gran Vía.',
       'Schreibweisen ohne Akzente zählen. Setze Sol, Gran Vía und Atocha und füll dann den Abschnitt Vallecas im Süden.'],
      ['La première ligne de métro d’Espagne, ouverte en 1919. Elle traverse Madrid du nord au sud, en plein centre par Sol et Gran Vía.',
       'Les graphies sans accents comptent. Posez Sol, Gran Vía et Atocha, puis complétez le tronçon de Vallecas au sud.'],
      ['1919 में खुली स्पेन की पहली मेट्रो लाइन। यह मैड्रिड को उत्तर से दक्षिण पार करती है और Sol तथा Gran Vía जैसे केंद्र से गुज़रती है।',
       'बिना उच्चारण-चिह्न वाली वर्तनी भी चलती है। Sol, Gran Vía और Atocha को ढाँचा बनाकर दक्षिण का Vallecas हिस्सा भरें।'],
    ),
  },
  {
    slug: 'berlin-u1', city: 'berlin', label: 'U1', color: '#7dad4c',
    shape: ['E', 'E', 'E', 'SE', 'SE', 'SE', 'E', 'E', 'E', 'NE', 'NE', 'E'],
    stations: [
      s('Uhlandstraße', 'Uhlandstrasse', 'terminus'), s('Kurfürstendamm', 'Kurfuerstendamm', 'transfer'),
      s('Wittenbergplatz', undefined, 'transfer'), s('Nollendorfplatz', undefined, 'transfer'),
      s('Kurfürstenstraße', 'Kurfuerstenstrasse'), s('Gleisdreieck', undefined, 'transfer'),
      s('Möckernbrücke', 'Moeckernbruecke', 'transfer'), s('Hallesches Tor', undefined, 'transfer'),
      s('Prinzenstraße', 'Prinzenstrasse'), s('Kottbusser Tor', undefined, 'transfer'),
      s('Görlitzer Bahnhof', 'Goerlitzer Bahnhof'), s('Schlesisches Tor'),
      s('Warschauer Straße', 'Warschauer Strasse', 'terminus'),
    ],
    text: T(
      ['베를린에서 가장 오래된 지하철 노선으로 크로이츠베르크 구간은 고가로 달립니다. 창밖으로 거리가 보이는 구간이 길어 도시 구경에 좋습니다.',
       'ß는 ss로 쳐도 정답으로 받습니다. Kottbusser Tor와 Schlesisches Tor 같은 "Tor" 역을 먼저 떠올려 보세요.'],
      ['Berlin’s oldest U-Bahn line, running on elevated track through Kreuzberg. Much of the ride is above the street, which makes it a sightseeing line.',
       'Type ss for ß and it still counts. Start from the “Tor” stations — Kottbusser Tor, Hallesches Tor, Schlesisches Tor.'],
      ['La línea de metro más antigua de Berlín; en Kreuzberg circula elevada. Buena parte del trayecto va por encima de la calle, así que sirve de mirador.',
       'Puedes escribir ss en lugar de ß. Empieza por las estaciones «Tor»: Kottbusser Tor, Hallesches Tor, Schlesisches Tor.'],
      ['A linha de metrô mais antiga de Berlim; em Kreuzberg corre elevada. Boa parte do trajeto vai acima da rua, o que a torna uma linha de passeio.',
       'Pode digitar ss em vez de ß. Comece pelas estações “Tor”: Kottbusser Tor, Hallesches Tor, Schlesisches Tor.'],
      ['ベルリンで最も古い地下鉄路線で、クロイツベルク区間は高架を走ります。通りの上を進む区間が長く、街を眺めるのに向いています。',
       'ß は ss と打っても正解です。Kottbusser Tor や Schlesisches Tor といった「Tor」の駅から思い出してみてください。'],
      ['Die älteste U-Bahn-Linie Berlins; in Kreuzberg fährt sie als Hochbahn. Ein großer Teil der Strecke liegt über der Straße, was sie zur Aussichtslinie macht.',
       'Für ß darf man ss tippen. Fang mit den „Tor“-Stationen an — Kottbusser Tor, Hallesches Tor, Schlesisches Tor.'],
      ['La plus ancienne ligne de métro de Berlin ; à Kreuzberg, elle roule en aérien. Une grande partie du trajet passe au-dessus de la rue : c’est une ligne panoramique.',
       'On peut taper ss à la place de ß. Commencez par les stations « Tor » : Kottbusser Tor, Hallesches Tor, Schlesisches Tor.'],
      ['बर्लिन की सबसे पुरानी यू-बान लाइन; Kreuzberg में यह ऊपर पुल पर चलती है। बड़ा हिस्सा सड़क के ऊपर से जाता है, इसलिए शहर देखने के लिए अच्छी है।',
       'ß की जगह ss लिखने पर भी सही माना जाता है। “Tor” वाले स्टेशनों से शुरू करें — Kottbusser Tor, Hallesches Tor, Schlesisches Tor।'],
    ),
  },
  {
    slug: 'delhi-yellow', city: 'delhi', color: '#ffdf00',
    label: { ko: '옐로 라인', en: 'Yellow Line', es: 'Línea Amarilla', pt: 'Linha Amarela', ja: 'イエローライン', de: 'Gelbe Linie', fr: 'Ligne jaune', hi: 'येलो लाइन' },
    shape: ['S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'SW', 'SW', 'SW', 'S', 'S', 'S', 'SW', 'SW', 'SW', 'SW', 'SW', 'SW', 'S', 'S', 'SE', 'SE', 'SE'],
    stations: [
      sa('Samaypur Badli', 'समयपुर बादली', 'terminus'), sa('Rohini Sector 18-19', 'रोहिणी सेक्टर 18-19'),
      sa('Haiderpur Badli Mor', 'हैदरपुर बादली मोड़'), sa('Jahangirpuri', 'जहाँगीरपुरी'),
      sa('Adarsh Nagar', 'आदर्श नगर'), sa('Azadpur', 'आज़ादपुर', 'transfer'),
      sa('Model Town', 'मॉडल टाउन'), sa('GTB Nagar', 'जीटीबी नगर'),
      sa('Vishwavidyalaya', 'विश्वविद्यालय'), sa('Vidhan Sabha', 'विधान सभा'),
      sa('Civil Lines', 'सिविल लाइंस'), sa('Kashmere Gate', 'कश्मीरी गेट', 'transfer'),
      sa('Chandni Chowk', 'चाँदनी चौक'), sa('Chawri Bazar', 'चावड़ी बाज़ार'),
      sa('New Delhi', 'नई दिल्ली', 'transfer'), sa('Rajiv Chowk', 'राजीव चौक', 'transfer'),
      sa('Patel Chowk', 'पटेल चौक'), sa('Central Secretariat', 'केंद्रीय सचिवालय', 'transfer'),
      sa('Udyog Bhawan', 'उद्योग भवन'), sa('Lok Kalyan Marg', 'लोक कल्याण मार्ग'),
      sa('Jor Bagh', 'जोर बाग़'), sa('INA Market', 'आईएनए मार्केट'), sa('AIIMS', 'एम्स'),
      sa('Green Park', 'ग्रीन पार्क'), sa('Hauz Khas', 'हौज़ ख़ास', 'transfer'),
      sa('Malviya Nagar', 'मालवीय नगर'), sa('Saket', 'साकेत'), sa('Qutab Minar', 'क़ुतुब मीनार'),
      sa('Chhatarpur', 'छतरपुर'), sa('Sultanpur', 'सुल्तानपुर'), sa('Ghitorni', 'घिटोरनी'),
      sa('Arjan Garh', 'अर्जन गढ़'), sa('Guru Dronacharya', 'गुरु द्रोणाचार्य'),
      sa('Sikanderpur', 'सिकंदरपुर', 'transfer'), sa('MG Road', 'एमजी रोड'),
      sa('IFFCO Chowk', 'इफ़्को चौक'), sa('Millennium City Centre Gurugram', 'मिलेनियम सिटी सेंटर गुरुग्राम', 'terminus'),
    ],
    text: T(
      ['델리를 남북으로 관통해 하리아나주 구르가온까지 이어지는 델리 지하철의 중심 노선입니다. 뉴델리역과 라지브초크에서 다른 노선으로 갈아탑니다.',
       '영문 표기와 데바나가리 표기를 모두 정답으로 받습니다. Rajiv Chowk·Hauz Khas·AIIMS를 뼈대로 잡아 보세요.'],
      ['The backbone of the Delhi Metro, running north to south across the city and on into Gurugram in Haryana. New Delhi and Rajiv Chowk are the big interchanges.',
       'Both the English and the Devanagari spelling count. Anchor on Rajiv Chowk, Hauz Khas and AIIMS.'],
      ['La espina dorsal del metro de Delhi: cruza la ciudad de norte a sur y sigue hasta Gurugram, en Haryana. New Delhi y Rajiv Chowk son los grandes intercambiadores.',
       'Valen tanto la grafía inglesa como la devanagari. Fija Rajiv Chowk, Hauz Khas y AIIMS como puntos de apoyo.'],
      ['A espinha dorsal do metrô de Délhi: cruza a cidade de norte a sul e segue até Gurugram, em Haryana. New Delhi e Rajiv Chowk são as grandes baldeações.',
       'Valem tanto a grafia inglesa como a devanágari. Fixe Rajiv Chowk, Hauz Khas e AIIMS como pontos de apoio.'],
      ['デリー地下鉄の背骨となる路線で、市内を南北に貫きハリヤーナー州のグルガーオンまで延びます。ニューデリー駅とラジーヴ・チョークで他線に乗り換えられます。',
       '英字表記とデーヴァナーガリー表記のどちらも正解になります。Rajiv Chowk・Hauz Khas・AIIMS を骨組みにしましょう。'],
      ['Das Rückgrat der Delhi Metro: von Nord nach Süd durch die Stadt und weiter bis Gurugram in Haryana. New Delhi und Rajiv Chowk sind die großen Umsteigepunkte.',
       'Sowohl die englische als auch die Devanagari-Schreibweise zählt. Nimm Rajiv Chowk, Hauz Khas und AIIMS als Anker.'],
      ['La colonne vertébrale du métro de Delhi : elle traverse la ville du nord au sud et se prolonge jusqu’à Gurugram, dans l’Haryana. New Delhi et Rajiv Chowk sont les grands échangeurs.',
       'La graphie anglaise comme la graphie devanagari comptent. Prenez Rajiv Chowk, Hauz Khas et AIIMS comme repères.'],
      ['दिल्ली मेट्रो की रीढ़ — शहर को उत्तर से दक्षिण पार करती है और हरियाणा के गुरुग्राम तक जाती है। नई दिल्ली और राजीव चौक बड़े इंटरचेंज हैं।',
       'अंग्रेज़ी और देवनागरी दोनों वर्तनी सही मानी जाती हैं। राजीव चौक, हौज़ ख़ास और एम्स को ढाँचा बनाकर चलें।'],
    ),
  },
];

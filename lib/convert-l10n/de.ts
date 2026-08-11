// node에서 직접 로드할 수 있게 확장자를 명시한다 (allowImportingTsExtensions)
import type { ConvertL10n } from '../convert-i18n.ts';

/**
 * 단위 변환 100종의 독일어 문구.
 *
 * 계수는 여기 두지 않는다 — 숫자는 lib/convert-tools.ts 한 곳에만 있어야 한다.
 *
 * 독일어권은 미터법을 철저히 쓰므로, 야드·파운드 계열은 "어디서 마주치는 단위인가"를
 * 앞세운다. 반대로 독일에도 남아 있는 단위(Pferdestärke, Zoll)는 그 사실을 적는다.
 */
export const CONVERT_DE: Record<string, ConvertL10n> = {
  /* ───────── 길이 ───────── */
  'cm-inch': {
    title: 'cm in Zoll', desc: 'Rechnet Zentimeter und Zoll in beide Richtungen um',
    long: 'Rechnet Zentimeter in Zoll und zurück. Bildschirmgrößen, Laufradgrößen und Kleidungsmaße sind in Zoll angegeben.',
    note: 'Ein Zoll ist exakt 2,54 cm. Die "Zoll" eines Monitors messen die Diagonale, nicht die Breite.',
  },
  'm-feet': {
    title: 'Meter in Fuß', desc: 'Rechnet Meter und Fuß in beide Richtungen um',
    long: 'Rechnet Meter in Fuß und zurück. Kommt bei Flughöhen, Gebäudehöhen und Immobilienanzeigen im Ausland vor.',
    note: 'Ein Fuß ist exakt 0,3048 m. Die "35.000 Fuß" aus der Bordansage sind etwa 10,7 km.',
  },
  'km-mile': {
    title: 'Kilometer in Meilen', desc: 'Rechnet Kilometer und Meilen in beide Richtungen um',
    long: 'Rechnet Kilometer in Meilen und zurück. Tempolimits in den USA und in Großbritannien stehen in Meilen, viele Volksläufe ebenfalls.',
    note: 'Eine Meile sind 1,609 km. Der Halbmarathon von 13,1 Meilen entspricht 21,1 km.',
  },
  'mm-inch': {
    title: 'mm in Zoll', desc: 'Rechnet Millimeter und Zoll in beide Richtungen um',
    long: 'Rechnet Millimeter in Zoll und zurück. Schrauben, Rohre und Bohrer werden in Bruchteilen von Zoll verkauft.',
    note: '1/4 Zoll sind 6,35 mm, 1/2 Zoll sind 12,7 mm. Brüche rechnest du am besten erst in Dezimalzahlen um.',
  },
  'yard-m': {
    title: 'Yard in Meter', desc: 'Rechnet Yard und Meter in beide Richtungen um',
    long: 'Rechnet Yard in Meter und zurück. Das Footballfeld und Golfdistanzen werden in Yard gemessen.',
    note: 'Ein Yard sind 0,9144 m, 100 Yard bleiben also knapp unter 100 m.',
  },
  'nautical-mile-km': {
    title: 'Seemeilen in km', desc: 'Rechnet Seemeilen und Kilometer um',
    long: 'Rechnet Seemeilen in Kilometer und zurück. Schifffahrt und Luftfahrt nutzen Seemeilen, weil eine davon einer Breitenminute entspricht.',
    note: 'Eine Seemeile ist exakt 1,852 km. Ein Knoten ist eine Seemeile pro Stunde.',
  },
  'foot-cm': {
    title: 'Fuß in cm', desc: 'Rechnet Fuß und Zentimeter in beide Richtungen um',
    long: 'Rechnet Fuß in Zentimeter und zurück. Körpergrößen im englischsprachigen Raum stehen in Fuß und Zoll: 5 Fuß 9 Zoll sind 175 cm.',
    note: 'Ein Fuß sind 30,48 cm und teilt sich in 12 Zoll. Bei Körpergrößen musst du die Zoll separat dazurechnen.',
  },
  'micron-mm': {
    title: 'Mikrometer in mm', desc: 'Rechnet Mikrometer (µm) und Millimeter um',
    long: 'Rechnet Mikrometer in Millimeter und zurück. Filterleistung von Masken, Haardurchmesser und Schichthöhen im 3D-Druck werden in Mikrometern angegeben.',
    note: 'Ein Mikrometer ist ein Tausendstel Millimeter. Ein Haar hat etwa 70 µm, also 0,07 mm.',
  },
  'ri-km': {
    title: 'Koreanisches Ri (里) in km', desc: 'Rechnet das traditionelle koreanische Ri in Kilometer um',
    long: 'Das Ri ist die Längeneinheit des alten Korea und lebt in Liedern und Sprichwörtern weiter. Die "zehntausend Ri" der Redewendungen sind rund 4.000 km.',
    note: 'Ein koreanisches Ri sind etwa 0,393 km. Das japanische Ri (里) misst fast 3,9 km, zehnmal so viel — dasselbe Schriftzeichen, andere Einheit.',
    from: 'Ri', to: 'km',
  },
  'ja-cm': {
    title: 'Koreanisches Ja (자/尺) in cm', desc: 'Rechnet das traditionelle koreanische Ja in Zentimeter um',
    long: 'Das Ja ist die traditionelle koreanische Längeneinheit und wird noch bei Stoffen und in der Schreinerei benutzt. Ein Ja hat zehn Chi (치).',
    note: 'Ein Ja sind etwa 30,3 cm, fast genau ein Fuß. Das japanische Shaku misst gleich viel, das chinesische Chi dagegen 33,3 cm.',
    from: 'Ja', to: 'cm',
  },
  'lightyear-km': {
    title: 'Lichtjahre in km', desc: 'Rechnet Lichtjahre in Kilometer um',
    long: 'Ein Lichtjahr ist die Strecke, die Licht im Vakuum in einem Jahr zurücklegt: etwa 9,461 Billionen Kilometer. Proxima Centauri, der nächste Stern, liegt 4,2 Lichtjahre entfernt.',
    note: 'Ein Lichtjahr misst Entfernung, nicht Zeit. "In ein paar Lichtjahren" ergibt schlicht keinen Sinn.',
    from: 'Lichtjahre', to: 'km',
  },
  'au-km': {
    title: 'Astronomische Einheiten in km', desc: 'Rechnet astronomische Einheiten (AE) in Kilometer um',
    long: 'Eine astronomische Einheit ist der mittlere Abstand zwischen Erde und Sonne, rund 149,6 Millionen Kilometer. Entfernungen im Sonnensystem stehen in AE.',
    note: 'Jupiter liegt bei etwa 5,2 AE, Neptun bei 30 AE. Für Abstände zwischen Sternen ist die AE zu klein, dort nimmt man Lichtjahre.',
    from: 'AE', to: 'km',
  },
  'fathom-m': {
    title: 'Faden in Meter', desc: 'Rechnet Faden (fathom) in Meter um',
    long: 'Der Faden ist die Tiefeneinheit der englischen Seefahrt und steht bis heute in Seekarten. Er entstand als Spannweite der ausgebreiteten Arme.',
    note: 'Ein Faden sind 1,8288 m, also 6 Fuß. Die "20.000 Meilen unter dem Meer" bei Verne sind eine andere Einheit, keine Faden.',
    from: 'Faden', to: 'm',
  },
  'furlong-m': {
    title: 'Furlong in Meter', desc: 'Rechnet Furlong in Meter um',
    long: 'Das Furlong wird bei britischen und amerikanischen Pferderennen benutzt. Acht Furlong machen eine Meile.',
    note: 'Ein Furlong sind 201,168 m. Ein Rennen über "sechs Furlong" misst etwa 1.207 m.',
    from: 'Furlong', to: 'm',
  },
  'chi-cm': {
    title: 'Chinesisches Chi (尺) in cm', desc: 'Rechnet das chinesische Chi in Zentimeter um',
    long: 'Das Chi ist die traditionelle chinesische Längeneinheit und heute auf einen runden metrischen Wert festgelegt. Es wird bei Textilien und Möbelmaßen benutzt.',
    note: 'Ein Chi ist exakt 33,33 cm. Das koreanische Ja und das japanische Shaku messen 30,3 cm — dasselbe Zeichen, drei Werte.',
    from: '尺', to: 'cm',
  },
  'sun-cm': {
    title: 'Japanisches Sun (寸) in cm', desc: 'Rechnet das japanische Sun in Zentimeter um',
    long: 'Das Sun ist ein Zehntel Shaku und kommt in der Schreinerei und bei Maßen japanischer Messer vor. Eine Klinge "von acht Sun" misst etwa 24 cm.',
    note: 'Ein Sun sind etwa 3,03 cm. Das koreanische Chi (치) misst gleich viel, das chinesische Cun 3,33 cm.',
    from: '寸', to: 'cm',
  },
  'point-mm': {
    title: 'Punkt (pt) in mm', desc: 'Rechnet typografische Punkt in Millimeter um',
    long: 'Der Punkt ist die Einheit für Schriftgrößen in Satz und Druck. Ein Text "in 12 Punkt" hat eine Kegelhöhe von etwa 4,2 mm.',
    note: 'Ein Punkt ist 1/72 Zoll, also 0,3528 mm. Der PostScript-Punkt am Rechner weicht leicht vom alten Druckpunkt ab.',
    from: 'pt', to: 'mm',
  },
  'hand-cm': {
    title: 'Hand in cm', desc: 'Rechnet Hand (hands) in Zentimeter um',
    long: 'Die Hand ist die Einheit für die Widerristhöhe von Pferden. Ein Pferd "mit 16 Hands" misst 162,6 cm.',
    note: 'Eine Hand sind 10,16 cm, also 4 Zoll. 16.2 heißt 16 Hands und 2 Zoll — es ist keine Dezimalzahl.',
    from: 'Hands', to: 'cm',
  },

  /* ───────── 무게 ───────── */
  'kg-lb': {
    title: 'kg in Pfund', desc: 'Rechnet Kilogramm und Pfund in beide Richtungen um',
    long: 'Rechnet Kilogramm in Pfund und zurück. Körpergewicht, Koffer und Hantelscheiben stehen in den USA in Pfund.',
    note: 'Ein Pfund sind 0,4536 kg. Die "45-Pfund"-Scheiben im Fitnessstudio sind etwa 20,4 kg. Das deutsche Pfund von 500 g ist etwas anderes.',
  },
  'g-oz': {
    title: 'Gramm in Unzen', desc: 'Rechnet Gramm und Unzen in beide Richtungen um',
    long: 'Rechnet Gramm in Unzen und zurück. Rezepte und Versandgewichte aus dem Ausland stehen in Unzen.',
    note: 'Eine Unze sind 28,35 g. Die Feinunze für Gold wiegt 31,1 g — eine andere Einheit.',
  },
  'ton-kg': {
    title: 'Tonnen in kg', desc: 'Rechnet Tonnen und Kilogramm um',
    long: 'Rechnet metrische Tonnen in Kilogramm und zurück. Wird bei Fracht, Nutzlast von Lkw und Maschinengewichten gebraucht.',
    note: 'Eine metrische Tonne sind 1.000 kg. Die amerikanische Short Ton (907 kg) und die britische Long Ton (1.016 kg) sind andere Werte.',
  },
  'don-g': {
    title: 'Koreanisches Don (돈) in Gramm', desc: 'Rechnet die koreanische Schmuckeinheit Don in Gramm um',
    long: 'Das Don ist die Einheit, in der in Korea Gold und Silber gewogen werden. Babyringe und Eheringe werden pro Don verkauft.',
    note: 'Ein Don sind 3,75 g. Ein Ring "von einem Don" enthält 3,75 g Gold; für den Preis multiplizierst du mit dem Grammpreis.',
    from: 'Don', to: 'g',
  },
  'nyang-g': {
    title: 'Koreanisches Nyang (냥) in Gramm', desc: 'Rechnet das traditionelle koreanische Nyang in Gramm um',
    long: 'Das Nyang entspricht zehn Don und kommt in der traditionellen koreanischen Medizin und in historischen Texten vor.',
    note: 'Ein Nyang sind 37,5 g. Der chinesische Tael (兩) hat 50 g, der japanische etwa 37,5 g — die Herkunft ist wichtig.',
    from: 'Nyang', to: 'g',
  },
  'geun-g': {
    title: 'Koreanisches Geun (근) in Gramm', desc: 'Rechnet das koreanische Geun in Gramm um',
    long: 'Das Geun wird in koreanischen Metzgereien und Gemüseläden noch benutzt. Achtung: es gilt nicht für alles derselbe Wert.',
    note: 'Fleisch geht mit 600 g pro Geun, Gemüse und Obst dagegen mit 375 g. Wenn der Stand es nicht sagt, frag nach.',
    from: 'Geun', to: 'g',
  },
  'kwan-kg': {
    title: 'Koreanisches Kwan (관) in kg', desc: 'Rechnet das traditionelle koreanische Kwan in Kilogramm um',
    long: 'Das Kwan ist die große Gewichtseinheit Koreas und Japans und hält sich auf Fischmärkten und im Großhandel.',
    note: 'Ein Kwan sind 3,75 kg, also hundert Don. Das japanische Kan (貫) hat denselben Wert.',
    from: 'Kwan', to: 'kg',
  },
  'carat-g': {
    title: 'Karat in Gramm', desc: 'Rechnet Karat in Gramm um',
    long: 'Das Karat ist die Einheit, in der Edelsteine gewogen werden. Ein Diamant "von einem Karat" wiegt 0,2 g.',
    note: 'Achtung beim Wort: das Gewichtskarat (ct) ist nicht das Feingehaltskarat von Gold (K). 18 Karat ist ein Anteil, kein Gewicht.',
  },
  'stone-kg': {
    title: 'Stone in kg', desc: 'Rechnet Stone in Kilogramm um',
    long: 'Das Stone ist die Einheit, in der Briten ihr Körpergewicht angeben. "11 Stone 4" sind 71,7 kg.',
    note: 'Ein Stone sind 6,35 kg, also 14 Pfund. In den USA benutzt man es nicht, dort steht das Gewicht in reinen Pfund.',
  },
  'troyounce-g': {
    title: 'Feinunzen in Gramm', desc: 'Rechnet Feinunzen (Troy ounces) in Gramm um',
    long: 'Die Feinunze ist die Einheit, in der Gold, Silber und Platin gehandelt werden. Der Goldpreis in den Nachrichten gilt pro Feinunze.',
    note: 'Eine Feinunze sind 31,1035 g, 10% mehr als die normale Unze (28,35 g). Wer sie verwechselt, rechnet den Preis falsch.',
    from: 'Feinunzen', to: 'g',
  },
  'grain-g': {
    title: 'Grain in Gramm', desc: 'Rechnet Grain in Gramm um',
    long: 'Das Grain ist die kleinste Masseneinheit des englischen Systems und dient für Munition und Medikamentendosen. Es entstand als Gewicht eines Gerstenkorns.',
    note: 'Ein Grain sind 0,0648 g. Ein Geschoss "mit 55 Grain" wiegt etwa 3,6 g.',
    from: 'Grain', to: 'g',
  },
  'dram-g': {
    title: 'Dram in Gramm', desc: 'Rechnet Dram in Gramm um',
    long: 'Das Dram ist eine kleine Einheit des englischen Systems und kommt in der Parfümerie und bei Pulverladungen vor.',
    note: 'Ein Dram sind 1,772 g, also 1/16 Unze. Das Volumen-Dram (fluid dram) ist etwas anderes.',
    from: 'Dram', to: 'g',
  },
  'jin-g': {
    title: 'Chinesisches Jin (斤) in Gramm', desc: 'Rechnet das chinesische Jin in Gramm um',
    long: 'Das Jin ist die alltägliche Gewichtseinheit in China: auf Märkten werden Gemüse und Fleisch pro Jin verkauft.',
    note: 'Ein chinesisches Jin ist exakt 500 g. Das koreanische Geun hat bei Fleisch 600 g — dasselbe Zeichen, andere Werte.',
    from: '斤', to: 'g',
  },
  'momme-g': {
    title: 'Momme (匁) in Gramm', desc: 'Rechnet das japanische Momme in Gramm um',
    long: 'Das Momme ist die japanische Einheit, in der Perlen und Seide gewogen werden. Das Flächengewicht von Seide wird in Momme angegeben.',
    note: 'Ein Momme sind 3,75 g, genauso viel wie ein koreanisches Don. Eine Seide "mit 19 Momme" beschreibt ein Gewicht pro Quadratmeter.',
    from: '匁', to: 'g',
  },
  'longton-kg': {
    title: 'Long Tons in kg', desc: 'Rechnet britische Long Tons in Kilogramm um',
    long: 'Die Long Ton ist die große britische Gewichtseinheit und kommt bei Schiffsverdrängung und älteren Frachtangaben vor.',
    note: 'Eine Long Ton sind 1.016 kg, etwas mehr als die metrische Tonne. Die amerikanische Short Ton hat 907 kg.',
    from: 'Long Tons', to: 'kg',
  },
  'shortton-kg': {
    title: 'Short Tons in kg', desc: 'Rechnet amerikanische Short Tons in Kilogramm um',
    long: 'Die Short Ton ist, was in den USA unter "Tonne" verstanden wird: Lkw-Gewichte und Materialmengen.',
    note: 'Eine Short Ton sind 907,18 kg, also 2.000 Pfund — 9% weniger als die metrische Tonne.',
    from: 'Short Tons', to: 'kg',
  },
  'mcg-mg': {
    title: 'μg in mg', desc: 'Rechnet Mikrogramm und Milligramm um',
    long: 'Rechnet Mikrogramm in Milligramm und zurück. Dosierungen von Vitaminen und Medikamenten mischen beide Einheiten.',
    note: 'Ein Milligramm sind 1.000 Mikrogramm. mcg mit mg zu verwechseln bedeutet einen Faktor tausend in der Dosis.',
  },

  /* ───────── 부피 ───────── */
  'l-gallon': {
    title: 'Liter in Gallonen', desc: 'Rechnet Liter und Gallonen in beide Richtungen um',
    long: 'Rechnet Liter in Gallonen und zurück. Kraftstoff und große Getränkeeinheiten stehen in den USA in Gallonen.',
    note: 'Gerechnet wird mit der US-Gallone: 3,785 L. Die britische Imperial Gallon hat 4,546 L, 20% mehr.',
  },
  'ml-floz': {
    title: 'mL in Flüssigunzen', desc: 'Rechnet Milliliter und Flüssigunzen um',
    long: 'Rechnet Milliliter in Flüssigunzen und zurück. Kosmetik und importierte Getränke stehen in fl oz.',
    note: 'Gerechnet wird mit der US-Flüssigunze: 29,57 mL. Die britische hat 28,41 mL.',
  },
  'doe-l': {
    title: 'Koreanisches Doe (되) in Liter', desc: 'Rechnet das traditionelle koreanische Doe in Liter um',
    long: 'Das Doe ist das koreanische Maß für Getreide und Alkohol. Makgeolli und Körner werden auf Märkten noch pro Doe verkauft.',
    note: 'Ein Doe sind 1,8 L. Das japanische Shō (升) misst gleich viel, etwa 1,8 L.',
    from: 'Doe', to: 'L',
  },
  'mal-l': {
    title: 'Koreanisches Mal (말) in Liter', desc: 'Rechnet das traditionelle koreanische Mal in Liter um',
    long: 'Das Mal entspricht zehn Doe und dient für Getreide im Großhandel. "Ein Mal Reis" sind etwa 18 L, also 8 kg.',
    note: 'Ein Mal sind 18 L. Beim Umrechnen in Gewicht kommt es auf das Korn an: Reis wiegt rund 8 kg pro Mal.',
    from: 'Mal', to: 'L',
  },
  'cup-ml': {
    title: 'Cups in mL', desc: 'Rechnet Küchen-Cups und Milliliter um',
    long: 'Rechnet Cups in Milliliter und zurück. Rezepte aus dem Ausland sind in Cups geschrieben.',
    note: 'Der US-Cup hat 240 mL, der metrische 200 mL. Die 20% Unterschied merkt man beim Backen.',
    from: 'Cup', to: 'mL',
  },
  'barrel-l': {
    title: 'Barrel in Liter', desc: 'Rechnet Ölbarrel in Liter um',
    long: 'Rechnet Barrel in Liter und zurück. Der Ölpreis in den Nachrichten gilt pro Barrel.',
    note: 'Ein Ölbarrel sind 158,99 L. Das Bierbarrel ist ein anderes Maß — in den USA 117 L.',
  },
  'cubicm-l': {
    title: 'Kubikmeter in Liter', desc: 'Rechnet Kubikmeter und Liter um',
    long: 'Rechnet Kubikmeter in Liter und zurück. Wasser- und Gasverbrauch auf der Rechnung stehen in Kubikmetern.',
    note: 'Ein Kubikmeter sind exakt 1.000 L. Ein Verbrauch von "15 m³" auf der Wasserrechnung sind 15.000 L.',
  },
  'tbsp-ml': {
    title: 'Esslöffel in mL', desc: 'Rechnet Esslöffel und Milliliter um',
    long: 'Rechnet Esslöffel in Milliliter und zurück. Rezepte und Dosierungen von Sirup arbeiten mit Löffeln.',
    note: 'Ein Esslöffel sind 15 mL. Der australische Esslöffel hat 20 mL — schau auf die Herkunft des Rezepts.',
    from: 'EL', to: 'mL',
  },
  'tsp-ml': {
    title: 'Teelöffel in mL', desc: 'Rechnet Teelöffel und Milliliter um',
    long: 'Rechnet Teelöffel in Milliliter und zurück. Kommt in Rezepten und bei kleinen Mengen in der Küche vor.',
    note: 'Ein Teelöffel sind 5 mL, also ein Drittel Esslöffel. Der Löffel aus der Schublade gibt kein genaues Maß.',
    from: 'TL', to: 'mL',
  },
  'pint-l': {
    title: 'Pint in Liter', desc: 'Rechnet Pint in Liter um',
    long: 'Das Pint ist das Maß, in dem in britischen und irischen Pubs Bier ausgeschenkt wird. In den USA steht es auch auf Eis und Sahne.',
    note: 'Das britische Pint hat 568 mL, das amerikanische 473 mL. Ein Pint Bier in London bringt 100 mL mehr.',
    from: 'Pint', to: 'L',
  },
  'quart-l': {
    title: 'Quart in Liter', desc: 'Rechnet Quart in Liter um',
    long: 'Das Quart sind zwei Pint und kommt in den USA bei Milch, Motoröl und Topfgrößen vor.',
    note: 'Das US-Quart hat 946 mL, also fast einen Liter. Das britische hat 1,137 L.',
    from: 'Quart', to: 'L',
  },
  'cc-ml': {
    title: 'cc in mL', desc: 'Rechnet Kubikzentimeter und Milliliter um',
    long: 'cc und mL sind exakt dasselbe. Der Hubraum von Motorrädern und das Volumen von Spritzen stehen in cc.',
    note: '1 cc = 1 mL, immer. Ein Motorrad "mit 125 cc" hat 125 mL Hubraum.',
    from: 'cc', to: 'mL',
  },
  'hop-ml': {
    title: 'Koreanisches Hop (홉) in mL', desc: 'Rechnet das traditionelle koreanische Hop in Milliliter um',
    long: 'Das Hop ist ein Zehntel Doe und steckt in Sojuflaschen und in Reismaßen.',
    note: 'Ein Hop sind 180 mL. Die 360-mL-Sojuflasche sind genau zwei Hop.',
    from: 'Hop', to: 'mL',
  },
  'bushel-l': {
    title: 'Bushel in Liter', desc: 'Rechnet Bushel in Liter um',
    long: 'Das Bushel ist das Maß, in dem in den USA Getreide gehandelt wird. Notierungen für Mais und Soja gelten pro Bushel.',
    note: 'Ein Bushel sind 35,24 L. Weil es ein Volumenmaß ist, hängt das Gewicht am Korn: Mais wiegt rund 25,4 kg pro Bushel.',
    from: 'Bushel', to: 'L',
  },

  /* ───────── 넓이 ───────── */
  'pyeong-m2': {
    title: 'Pyeong (평) in m²', desc: 'Rechnet das koreanische Pyeong in Quadratmeter um',
    long: 'Das Pyeong ist die Einheit, in der in Korea über Wohnfläche gesprochen wird. Amtlich stehen m², im Gespräch bleibt es beim Pyeong.',
    note: 'Ein Pyeong sind 3,3058 m². Eine Wohnung "mit 84 m²" hat etwa 25 Pyeong. Das japanische Tsubo hat denselben Wert.',
    from: 'Pyeong', to: 'm²',
  },
  'm2-sqft': {
    title: 'm² in Quadratfuß', desc: 'Rechnet Quadratmeter und Quadratfuß um',
    long: 'Rechnet Quadratmeter in Quadratfuß und zurück. Immobilienanzeigen in den USA stehen in Quadratfuß.',
    note: 'Ein Quadratmeter sind 10,764 Quadratfuß. Eine Wohnung "mit 1.000 sq ft" hat etwa 93 m².',
  },
  'acre-m2': {
    title: 'Acre in m²', desc: 'Rechnet Acre und Quadratmeter um',
    long: 'Rechnet Acre in Quadratmeter und zurück. Höfe und Grundstücke im englischsprachigen Raum werden in Acre gemessen.',
    note: 'Ein Acre sind 4.047 m², etwas mehr als ein halbes Fußballfeld. Ein Hektar hat 2,47 Acre.',
  },
  'hectare-m2': {
    title: 'Hektar in m²', desc: 'Rechnet Hektar und Quadratmeter um',
    long: 'Rechnet Hektar in Quadratmeter und zurück. Der Hektar ist die internationale Einheit für Agrar- und Waldflächen.',
    note: 'Ein Hektar sind 10.000 m², also ein Quadrat von 100 mal 100 Metern.',
  },
  'danbo-m2': {
    title: 'Danbo (단보) in m²', desc: 'Rechnet das traditionelle koreanische Danbo in Quadratmeter um',
    long: 'Das Danbo ist die koreanische Einheit für Agrarflächen und entspricht 300 Pyeong. Reiserträge werden pro Danbo angegeben.',
    note: 'Ein Danbo sind 991,7 m², fast ein Zehntel Hektar. Zehn Danbo machen ein Jeongbo (정보).',
    from: 'Danbo', to: 'm²',
  },
  'majigi-pyeong': {
    title: 'Majigi (마지기) in Pyeong', desc: 'Rechnet das traditionelle koreanische Majigi in Pyeong um',
    long: 'Das Majigi ist die Fläche, die man mit einem Mal Saatgut bestellt, und ändert sich daher mit Region und Kultur.',
    note: 'Für Reisfelder rechnet man meist 200 Pyeong, in manchen Gegenden 150 und in anderen 300. Es ist ein Näherungsmaß.',
    from: 'Majigi', to: 'Pyeong',
  },
  'sqinch-cm2': {
    title: 'Quadratzoll in cm²', desc: 'Rechnet Quadratzoll in Quadratzentimeter um',
    long: 'Der Quadratzoll kommt bei Druckflächen, Kamerasensoren und Auflageflächen vor.',
    note: 'Ein Quadratzoll sind 6,4516 cm². Beim Quadrieren wird aus dem Faktor 2,54 der Faktor 6,45.',
    from: 'in²', to: 'cm²',
  },
  'sqyard-m2': {
    title: 'Quadratyard in m²', desc: 'Rechnet Quadratyard in Quadratmeter um',
    long: 'Das Quadratyard dient im englischsprachigen Raum für Teppich, Stoff und Gartenflächen.',
    note: 'Ein Quadratyard sind 0,8361 m², etwas weniger als ein Quadratmeter.',
    from: 'yd²', to: 'm²',
  },
  'sqmile-km2': {
    title: 'Quadratmeilen in km²', desc: 'Rechnet Quadratmeilen in Quadratkilometer um',
    long: 'Die Quadratmeile dient für Flächen von Städten und Counties und für die Ausdehnung von Waldbränden.',
    note: 'Eine Quadratmeile sind 2,59 km². Beim Quadrieren wird aus dem Faktor 1,609 der Faktor 2,59.',
    from: 'mi²', to: 'km²',
  },
  'are-m2': {
    title: 'Ar (a) in m²', desc: 'Rechnet Ar in Quadratmeter um',
    long: 'Das Ar ist ein Hundertstel Hektar und kommt in Grundbüchern und bei kleinen Parzellen vor.',
    note: 'Ein Ar sind exakt 100 m². Hundert Ar machen einen Hektar.',
    from: 'a', to: 'm²',
  },
  'mu-m2': {
    title: 'Chinesisches Mu (畝) in m²', desc: 'Rechnet das chinesische Mu in Quadratmeter um',
    long: 'Das Mu ist die chinesische Einheit für Agrarflächen und wird auf dem Land und in Statistiken täglich benutzt.',
    note: 'Ein Mu sind etwa 666,7 m². Fünfzehn Mu machen einen Hektar.',
    from: '畝', to: 'm²',
  },

  /* ───────── 온도 ───────── */
  'celsius-fahrenheit': {
    title: 'Celsius in Fahrenheit', desc: 'Rechnet Grad Celsius und Fahrenheit um',
    long: 'Rechnet Celsius in Fahrenheit und zurück. Wetterberichte und Backofentemperaturen in den USA stehen in Fahrenheit.',
    note: 'Die Formel ist °F = °C × 1,8 + 32. Es gibt einen Versatz von 32, Multiplizieren allein genügt nicht.',
    from: '°C', to: '°F',
  },
  'celsius-kelvin': {
    title: 'Celsius in Kelvin', desc: 'Rechnet Grad Celsius und Kelvin um',
    long: 'Rechnet Celsius in Kelvin und zurück. Physik und die Farbtemperatur von Leuchtmitteln arbeiten mit Kelvin.',
    note: 'K = °C + 273,15. Der absolute Nullpunkt (0 K) liegt bei −273,15 °C, darunter gibt es keine Temperatur.',
    from: '°C', to: 'K',
  },
  'fahrenheit-kelvin': {
    title: '°F in Kelvin', desc: 'Rechnet Grad Fahrenheit und Kelvin um',
    long: 'Rechnet Fahrenheit in Kelvin und zurück. Nötig, wenn du amerikanische Fachtexte in absoluten Einheiten liest.',
    note: 'Erst nach Celsius umrechnen, dann 273,15 addieren. Die Fahrenheit-Skala läuft 1,8-mal langsamer.',
    from: '°F', to: 'K',
  },
  'celsius-rankine': {
    title: '°C in Rankine (°R)', desc: 'Rechnet Grad Celsius und Rankine um',
    long: 'Die Rankine-Skala ist die absolute Skala mit Fahrenheit-Graden und kommt in der Thermodynamik und der amerikanischen Technik vor.',
    note: 'Der Nullpunkt von Rankine liegt beim absoluten Nullpunkt, die Gradschritte entsprechen Fahrenheit. 0 °C sind 491,67 °R.',
    from: '°C', to: '°R',
  },

  /* ───────── 속도 ───────── */
  'kmh-mph': {
    title: 'km/h in mph', desc: 'Rechnet Kilometer pro Stunde und Meilen pro Stunde um',
    long: 'Rechnet km/h in mph und zurück. Tempolimits in den USA und in Großbritannien stehen in mph.',
    note: '60 mph sind 96,6 km/h. Die "60" auf dem amerikanischen Tacho liegt nah an unseren 100 km/h.',
  },
  'ms-kmh': {
    title: 'm/s in km/h', desc: 'Rechnet Meter pro Sekunde und Kilometer pro Stunde um',
    long: 'Rechnet m/s in km/h und zurück. Windgeschwindigkeiten im Wetterbericht stehen in m/s.',
    note: 'Man multipliziert mit 3,6. Wind von 10 m/s sind 36 km/h — schon eine steife Brise.',
  },
  'knot-kmh': {
    title: 'Knoten in km/h', desc: 'Rechnet Knoten und Kilometer pro Stunde um',
    long: 'Rechnet Knoten in km/h und zurück. Schiffe, Flugzeuge und Sturmwarnungen arbeiten mit Knoten.',
    note: 'Ein Knoten sind 1,852 km/h, also eine Seemeile pro Stunde.',
  },
  'mach-kmh': {
    title: 'Mach in km/h', desc: 'Rechnet Mach-Zahlen und Kilometer pro Stunde um',
    long: 'Rechnet Mach in km/h und zurück. Die Geschwindigkeit von Kampfjets wird in Vielfachen der Schallgeschwindigkeit angegeben.',
    note: 'Gerechnet wird mit Mach 1 = 1.225 km/h auf Meereshöhe. In der Höhe ist die Luft kälter und die Schallgeschwindigkeit sinkt, der echte Wert ändert sich also.',
  },
  'mph-ms': {
    title: 'mph in m/s', desc: 'Rechnet Meilen pro Stunde und Meter pro Sekunde um',
    long: 'Rechnet mph in m/s und zurück. Nötig, wenn du Wind- oder Wurfgeschwindigkeiten aus verschiedenen Quellen vergleichst.',
    note: 'Eine mph sind 0,447 m/s. Ein Wurf mit 100 mph sind etwa 44,7 m/s.',
    from: 'mph', to: 'm/s',
  },
  'pace-kmh': {
    title: 'Lauftempo in km/h', desc: 'Rechnet Minuten pro Kilometer und km/h um',
    long: 'Rechnet das Tempo (min/km) in Geschwindigkeit (km/h) und zurück. Sportuhren zeigen Tempo, Laufbänder Geschwindigkeit.',
    note: 'Der Zusammenhang ist umgekehrt: 5 min/km sind 12 km/h, 6 min/km sind 10 km/h. Je kleiner das Tempo, desto höher die Geschwindigkeit.',
    from: 'min/km', to: 'km/h',
  },
  'fps-ms': {
    title: 'ft/s in m/s', desc: 'Rechnet Fuß pro Sekunde und Meter pro Sekunde um',
    long: 'Rechnet Fuß pro Sekunde in Meter pro Sekunde und zurück. Kommt bei Geschossgeschwindigkeiten und in amerikanischer Physik vor.',
    note: 'Ein Fuß pro Sekunde sind 0,3048 m/s. "1.000 ft/s" sind etwa 305 m/s.',
    from: 'ft/s', to: 'm/s',
  },

  /* ───────── 데이터 ───────── */
  'mb-gb': {
    title: 'MB in GB', desc: 'Rechnet Megabyte und Gigabyte um',
    long: 'Rechnet Megabyte in Gigabyte und zurück. Dateigrößen, Datenvolumen im Mobilfunk und Festplattenkapazitäten.',
    note: 'Hier gilt 1 GB = 1.000 MB (dezimal). Windows zählt mit 1.024, deshalb erscheint eine "1-TB"-Platte als 931 GB.',
  },
  'gb-tb': {
    title: 'GB in TB', desc: 'Rechnet Gigabyte und Terabyte um',
    long: 'Rechnet Gigabyte in Terabyte und zurück. Festplatten, SSDs und Cloud-Speicher.',
    note: '1 TB = 1.000 GB nach dem dezimalen Maßstab der Hersteller. Das Betriebssystem zählt mit 1.024 und zeigt weniger an.',
  },
  'mbps-mbs': {
    title: 'Mbps in MB/s', desc: 'Rechnet Leitungsgeschwindigkeit und Downloadgeschwindigkeit um',
    long: 'Rechnet Mbps in MB/s und zurück. Anbieter werben mit Bit pro Sekunde, Downloadmanager zeigen Byte pro Sekunde.',
    note: 'Man teilt durch 8: eine 100-Mbps-Leitung lädt mit höchstens etwa 12,5 MB/s. Das ist keine Täuschung, sondern eine andere Einheit.',
  },
  'kb-mb': {
    title: 'KB in MB', desc: 'Rechnet Kilobyte und Megabyte um',
    long: 'Rechnet Kilobyte in Megabyte und zurück. E-Mail-Anhänge, Bilder und Upload-Grenzen.',
    note: 'Hier gilt 1 MB = 1.000 KB. Binär sind es 1.024 KB, bei kleinen Dateien fällt der Unterschied kaum auf.',
  },
  'byte-bit': {
    title: 'Byte in Bit', desc: 'Rechnet Byte und Bit um',
    long: 'Rechnet Byte in Bit und zurück. Netzwerke werden in Bit gemessen, Speicher in Byte.',
    note: 'Ein Byte sind 8 Bit. Großes B heißt Byte, kleines b heißt Bit: Mbps und MBps sind nicht dasselbe.',
  },
  'tb-pb': {
    title: 'TB in PB', desc: 'Rechnet Terabyte und Petabyte um',
    long: 'Rechnet Terabyte in Petabyte und zurück. Kommt in Rechenzentren und bei Backup-Volumen vor.',
    note: '1 PB = 1.000 TB im dezimalen Maßstab. Ein Petabyte passt auf etwa tausend 1-TB-Platten.',
  },
  'kib-kb': {
    title: 'KiB in KB', desc: 'Rechnet Kibibyte und Kilobyte um',
    long: 'KiB ist die binäre Einheit (1.024 Byte), KB die dezimale (1.000 Byte). Daraus entsteht, dass System und Hersteller verschiedene Zahlen nennen.',
    note: '1 KiB = 1,024 KB. Hier sind es 2,4% Unterschied, der mit jeder Stufe wächst: bei TiB liegt er über 10%.',
    from: 'KiB', to: 'KB',
  },
  'mib-mb': {
    title: 'MiB in MB', desc: 'Rechnet Mebibyte und Megabyte um',
    long: 'MiB sind 1.048.576 Byte, MB sind 1.000.000. Linux und viele Werkzeuge zeigen MiB an, schreiben aber "MB".',
    note: '1 MiB = 1,049 MB. Ein Abbild "mit 700 MB" sind in Wirklichkeit meist 700 MiB, also 734 MB.',
    from: 'MiB', to: 'MB',
  },
  'gib-gb': {
    title: 'GiB in GB', desc: 'Rechnet Gibibyte und Gigabyte um',
    long: 'GiB ist die binäre Einheit, GB die dezimale. Genau daran liegt es, dass eine 1-TB-Platte als 931 GB erscheint.',
    note: '1 GiB = 1,074 GB, ein Unterschied von 7,4%. Die "931 GB", die Windows zeigt, sind eigentlich 931 GiB.',
    from: 'GiB', to: 'GB',
  },

  /* ───────── 에너지 ───────── */
  'kcal-kj': {
    title: 'Kalorien in Kilojoule', desc: 'Rechnet Kilokalorien und Kilojoule um',
    long: 'Rechnet Kilokalorien in Kilojoule und zurück. Nährwertangaben in Europa nennen beide Werte, in Australien nur kJ.',
    note: 'Eine kcal sind 4,184 kJ. Die "2.000 kcal" am Tag sind etwa 8.370 kJ.',
  },
  'kw-hp': {
    title: 'kW in PS', desc: 'Rechnet Kilowatt und Pferdestärken um',
    long: 'Rechnet Kilowatt in PS und zurück. Autoleistungen stehen in PS, bei Elektroautos in kW.',
    note: 'Gerechnet wird mit der metrischen Pferdestärke: 1 kW = 1,36 PS. Das britische hp ist 1,4% größer.',
  },
  'kwh-mj': {
    title: 'kWh in Megajoule', desc: 'Rechnet Kilowattstunden und Megajoule um',
    long: 'Rechnet kWh in MJ und zurück. Die Stromrechnung steht in kWh, physikalische Rechnungen in Joule.',
    note: 'Eine kWh sind 3,6 MJ. Es ist die Energie, 1.000 W eine Stunde lang zu halten.',
  },
  'joule-cal': {
    title: 'Joule in Kalorien', desc: 'Rechnet Joule und Kalorien um',
    long: 'Rechnet Joule in Kalorien und zurück. Physikaufgaben und Lebensmitteletiketten benennen dasselbe mit verschiedenen Einheiten.',
    note: 'Ein Joule sind 0,239 Kalorien. Die "Kalorie" auf Lebensmitteln ist eigentlich die Kilokalorie, tausendmal größer.',
  },
  'wh-joule': {
    title: 'Wh in Joule', desc: 'Rechnet Wattstunden und Joule um',
    long: 'Rechnet Wattstunden in Joule und zurück. Akkukapazitäten stehen in Wh, und die Grenzen der Fluggesellschaften ebenfalls.',
    note: 'Eine Wh sind 3.600 J. Fluggesellschaften erlauben im Handgepäck meist Akkus bis 100 Wh.',
    from: 'Wh', to: 'J',
  },
  'btu-kj': {
    title: 'BTU in kJ', desc: 'Rechnet BTU und Kilojoule um',
    long: 'Die BTU ist die Wärmeeinheit des englischen Systems und dient für die Leistung von Klimageräten und Heizkesseln.',
    note: 'Eine BTU sind 1,055 kJ. Ein Klimagerät "mit 12.000 BTU" entspricht einer Kältetonne, etwa 3,5 kW.',
    from: 'BTU', to: 'kJ',
  },
  'kcal-kwh': {
    title: 'kcal in kWh', desc: 'Rechnet Kilokalorien und Kilowattstunden um',
    long: 'Rechnet Kilokalorien in Kilowattstunden und zurück. Damit lässt sich die Energie im Essen mit dem Stromverbrauch vergleichen.',
    note: 'Eine kcal sind 0,00116 kWh. Die 2.000 kcal, die wir am Tag essen, sind nur 2,3 kWh — weniger als eine Waschmaschine.',
    from: 'kcal', to: 'kWh',
  },
  'therm-kwh': {
    title: 'Therm in kWh', desc: 'Rechnet Therm und Kilowattstunden um',
    long: 'Das Therm ist die Einheit, in der in den USA und in Großbritannien Gas abgerechnet wird. Damit vergleichst du Gas- und Stromrechnung.',
    note: 'Ein Therm sind 29,3 kWh, also 100.000 BTU. Ein Therm liefert weit mehr Energie als eine kWh Strom.',
    from: 'Therm', to: 'kWh',
  },

  /* ───────── 압력·기타 ───────── */
  'bar-psi': {
    title: 'bar in psi', desc: 'Rechnet bar und psi um',
    long: 'Rechnet bar in psi und zurück. Reifendruck und Manometer mischen beide Einheiten.',
    note: 'Ein bar sind 14,5 psi. Die empfohlenen 2,2 bar für einen Reifen sind etwa 32 psi.',
  },
  'hpa-mmhg': {
    title: 'hPa in mmHg', desc: 'Rechnet Hektopascal und Millimeter Quecksilbersäule um',
    long: 'Rechnet hPa in mmHg und zurück. Wetterberichte nennen hPa, der Blutdruck steht in mmHg.',
    note: 'Ein hPa sind 0,75 mmHg. Der normale Luftdruck von 1.013 hPa entspricht 760 mmHg.',
  },
  'mpg-kmpl': {
    title: 'mpg in km/L', desc: 'Rechnet Meilen pro Gallone und Kilometer pro Liter um',
    long: 'Rechnet amerikanische mpg in km/L und zurück. Nötig beim Lesen ausländischer Autotests.',
    note: 'Gerechnet wird mit der US-Gallone: 30 mpg sind etwa 12,8 km/L. Britische Angaben liegen rund 20% höher, prüf also die Quelle.',
  },
  'atm-kpa': {
    title: 'Atmosphären in kPa', desc: 'Rechnet Atmosphären und Kilopascal um',
    long: 'Die Atmosphäre ist der Druck auf Meereshöhe und wird beim Tauchen und in der Chemie benutzt.',
    note: 'Eine Atmosphäre sind 101,325 kPa. Unter Wasser kommt alle 10 m Tiefe eine Atmosphäre hinzu.',
    from: 'atm', to: 'kPa',
  },
  'psi-kpa': {
    title: 'psi in kPa', desc: 'Rechnet psi und Kilopascal um',
    long: 'Rechnet psi in Kilopascal und zurück. Autohandbücher und Druckluftwerkzeuge arbeiten mit psi.',
    note: 'Ein psi sind 6,895 kPa. Die 32 psi in einem Reifen sind etwa 220 kPa.',
    from: 'psi', to: 'kPa',
  },
  'torr-pa': {
    title: 'Torr in Pascal', desc: 'Rechnet Torr und Pascal um',
    long: 'Das Torr entspricht einem Millimeter Quecksilbersäule und dient in der Vakuumtechnik und im Labor.',
    note: 'Ein Torr sind 133,3 Pa. Der Luftdruck entspricht 760 Torr.',
    from: 'Torr', to: 'Pa',
  },
  'inhg-hpa': {
    title: 'inHg in hPa', desc: 'Rechnet Zoll Quecksilbersäule und Hektopascal um',
    long: 'Zoll Quecksilbersäule ist die Druckeinheit amerikanischer Wetterberichte und der Luftfahrt.',
    note: 'Ein Zoll Quecksilbersäule sind 33,86 hPa. Die Standard-Höhenmessereinstellung von 29,92 inHg entspricht 1.013 hPa.',
    from: 'inHg', to: 'hPa',
  },

  /* ───────── 시간 ───────── */
  'frame-sec': {
    title: 'Frames in Sekunden (30 fps)', desc: 'Rechnet Videoframes und Sekunden um',
    long: 'Rechnet Frames in Sekunden und zurück, bei 30 fps. Nützlich beim Lesen von Timecodes im Videoschnitt.',
    note: 'Bei 30 fps sind 90 Frames 3 Sekunden. Bei 24 oder 60 fps ändert sich die Rechnung, prüf also die fps des Materials.',
    from: 'Frames', to: 's',
  },
  'bpm-ms': {
    title: 'BPM in ms pro Schlag', desc: 'Rechnet Tempo und Länge eines Schlags um',
    long: 'Rechnet Schläge pro Minute in Millisekunden pro Schlag und zurück. Delay- und Reverbzeiten in der Musikproduktion werden in ms eingestellt.',
    note: 'Der Zusammenhang ist umgekehrt: 120 BPM sind 500 ms pro Schlag. Ein Viertel-Delay bei diesem Tempo stellst du auf 500 ms.',
    from: 'BPM', to: 'ms',
  },
  'ms-sec': {
    title: 'ms in Sekunden', desc: 'Rechnet Millisekunden und Sekunden um',
    long: 'Rechnet Millisekunden in Sekunden und zurück. Netzwerklatenz, Reaktionszeiten und Animationseinstellungen.',
    note: 'Eine Sekunde sind 1.000 ms. Ein Ping von 50 ms sind 0,05 Sekunden.',
    from: 'ms', to: 's',
  },

  /* ───────── 각도 ───────── */
  'degree-gradian': {
    title: 'Grad in Gon', desc: 'Rechnet Winkelgrad und Gon um',
    long: 'Das Gon teilt den rechten Winkel in 100 Teile und wird in der Vermessung und im europäischen Bauwesen benutzt.',
    note: '90 Grad sind 100 Gon. Der Taschenrechner hat dafür einen GRAD-Modus — sieht das Ergebnis falsch aus, prüf den Modus.',
    from: '°', to: 'gon',
  },
  'arcmin-degree': {
    title: 'Bogenminuten in Grad', desc: 'Rechnet Bogenminuten und Grad um',
    long: 'Die Bogenminute ist ein Sechzigstel Grad und wird in Astronomie, Optik und bei Koordinaten benutzt.',
    note: 'Eine Bogenminute ist 1/60 Grad. Der Mond von der Erde aus misst etwa 31 Bogenminuten.',
    from: '′', to: '°',
  },
  'mil-mm': {
    title: 'Mil in mm', desc: 'Rechnet Mil (thou) und Millimeter in beide Richtungen um',
    long: 'Ein Mil ist ein Tausendstel Zoll, also 0,0254 mm. US-Zeichnungen geben damit Leiterbahnbreiten, Folien- und Blechdicken sowie Schichtstärken an.',
    note: 'Es heißt auch thou — dieselbe Einheit. Der Name klingt nach Millimeter, doch ein Mil ist keine Vierzigstel davon.',
    from: 'mils', to: 'mm',
  },
  'angstrom-nm': {
    title: 'Ångström in Nanometer', desc: 'Rechnet Ångström und Nanometer in beide Richtungen um',
    long: 'Ein Ångström sind 0,1 Nanometer. Atomdurchmesser und Bindungslängen liegen meist zwischen einem und drei Ångström, weshalb Kristallographie und Spektroskopie darauf bauten.',
    note: 'Es ist keine SI-Einheit, Zeitschriften bevorzugen Nanometer oder Pikometer. Prüfen Sie, welche eine Angabe meint.',
    from: 'Å', to: 'nm',
  },
  'pennyweight-g': {
    title: 'Pennyweight in Gramm', desc: 'Rechnet das Pennyweight der Edelmetalle in Gramm um',
    long: 'Ein Pennyweight (dwt) sind 1,55517384 g, zwanzig davon ergeben eine Feinunze. Nordamerikanische Juweliere und Dentallegierungs-Händler rechnen noch damit.',
    note: 'Grundlage ist die Feinunze (31,1035 g), nicht die gewöhnliche Unze (28,35 g). Wer beides mischt, liegt um fast zehn Prozent daneben.',
    from: 'dwt', to: 'g',
  },
  'tola-g': {
    title: 'Tola in Gramm', desc: 'Rechnet die südasiatische Gold-Tola in Gramm um',
    long: 'Eine Tola sind 11,6638038 g, abgeleitet vom Gewicht einer alten indischen Silberrupie. Juweliere in Indien, Pakistan und Bangladesch bepreisen Gold noch danach.',
    note: 'Mancherorts rechnet man je nach Land und Epoche mit 11,34 g. Klären Sie den örtlichen Wert vor dem Handel.',
    from: 'tola', to: 'g',
  },
  'gill-ml': {
    title: 'Gill in Milliliter', desc: 'Rechnet das imperiale Gill in Milliliter um',
    long: 'Ein imperiales Gill sind 142,0653125 mL, also fünf Flüssigunzen. Es steht in alten Kochbüchern und in Schankmaßen; britische Pubs schenken noch danach aus.',
    note: 'Das US-Gill misst 118,29 mL — eine andere Menge. Prüfen Sie bei alten Rezepten, von welcher Seite des Atlantiks sie stammen.',
    from: 'gills', to: 'mL',
  },
  'impgallon-l': {
    title: 'Imperiale Gallone in Liter', desc: 'Rechnet die imperiale Gallone in Liter um',
    long: 'Eine imperiale Gallone sind genau 4,54609 L. In Großbritannien, Irland und Teilen der Karibik gebräuchlich, ist sie zwanzig Prozent größer als die US-Gallone mit 3,785 L.',
    note: 'Hier gehen Verbrauchsvergleiche am häufigsten schief. Meilen pro imperialer Gallone sehen stets besser aus, ohne dass das Auto sparsamer wäre.',
    from: 'gal', to: 'L',
  },
  'rood-m2': {
    title: 'Rood in Quadratmeter', desc: 'Rechnet das imperiale Rood in Quadratmeter um',
    long: 'Ein Rood sind 1011,7141056 m², exakt ein Viertel Acre. Alte britische Grundbücher führen Acre, Rood und Perch nebeneinander auf.',
    note: 'Dasselbe Wort bezeichnet auch ein Kruzifix, was alte Urkunden verwirrend macht. Nur im Flächenkontext gilt dieser Wert.',
    from: 'roods', to: 'm²',
  },
  'pace-mile-kmh': {
    title: 'Pace pro Meile in km/h', desc: 'Rechnet das Lauftempo pro Meile in Geschwindigkeit um',
    long: 'Wandelt Minuten pro Meile in Kilometer pro Stunde. Da eine Meile 1,609344 km misst, ergibt 96,56 geteilt durch die Pace das Tempo: acht Minuten pro Meile sind 12,07 km/h.',
    note: 'Hier wird geteilt, die Richtung dreht sich um. Eine kleinere Pace ist schneller, eine größere Geschwindigkeit ebenfalls.',
    from: 'min/mile', to: 'km/h',
  },
  'tib-tb': {
    title: 'TiB in TB', desc: 'Rechnet binäre Tebibyte und dezimale Terabyte um',
    long: 'Ein TiB sind zwei hoch vierzig Byte, ein TB zehn hoch zwölf — ein TiB entspricht also rund 1,0995 TB. Deshalb erscheint eine 4-TB-Platte als 3,64 TiB.',
    note: 'Es fehlt keine Kapazität, beide Seiten zählen nur anders. Windows beschriftet TiB als TB, macOS und Hersteller nutzen TB.',
    from: 'TiB', to: 'TB',
  },
  'btu-wh': {
    title: 'BTU in Wattstunden', desc: 'Rechnet die Wärmeeinheit BTU in Wattstunden um',
    long: 'Ein BTU sind etwa 0,293071 Wh. Nordamerika gibt Klimageräte und Kessel in BTU an; umgerechnet lässt sich die Leistung mit der Stromaufnahme vergleichen.',
    note: 'Das "BTU" einer Klimaanlage steht fast immer für BTU pro Stunde. Zwölftausend BTU/h ergeben eine Tonne Kälteleistung.',
    from: 'BTU', to: 'Wh',
  },

  /* ───────── 셋째 묶음 16종 ───────── */
  'chain-m': {
    title: 'Chain in Meter',
    desc: 'Die Vermesserkette in Meter umrechnen',
    long: 'Rechnet Chains in Meter und zurück. Die Einheit lebt in alten britischen und amerikanischen Grundbüchern weiter, in Eisenbahn-Meilensteinen und in der Länge eines Cricketfelds.',
    note: 'Ein Chain sind 66 Fuß, genau 20,1168 m. Zehn Chains ergeben ein Furlong und achtzig eine Meile — es ist das Lineal hinter der Meile.',
  },
  'rod-m': {
    title: 'Rod in Meter',
    desc: 'Die alte Vermessungsrute in Meter umrechnen',
    long: 'Rechnet Rods in Meter und zurück. Auch Pole oder Perch genannt, taucht die Einheit in alten englischen und amerikanischen Urkunden sowie bei Zaun- und Grabenlängen auf.',
    note: 'Ein Rod sind 16,5 Fuß, genau 5,0292 m. Vier Rods ergeben einen Chain, und ein Streifen von vier mal vierzig Rods ist genau ein Acre.',
  },
  'barleycorn-mm': {
    title: 'Barleycorn in Millimeter',
    desc: 'Die Schrittweite hinter britischen Schuhgrößen',
    long: 'Nach einem Gerstenkorn benannt, ist diese Einheit ein Drittel Zoll. Deshalb wachsen britische und amerikanische Schuhgrößen je Nummer um rund 8,47 mm.',
    note: 'Erwachsenengrößen beginnen bei zwölf Barleycorn (vier Zoll) und legen je Nummer eines zu. Größe 8 meint den Leisten, nicht die Länge deines Fußes.',
  },
  'parsec-lightyear': {
    title: 'Parsec in Lichtjahre',
    desc: 'Zwischen astronomischen Entfernungseinheiten umrechnen',
    long: 'Rechnet das Parsec der Fachliteratur in das Lichtjahr populärer Texte um. Ein Parsec ist die Entfernung, in der der Bahnradius der Erde eine Bogensekunde einnimmt.',
    note: 'Ein Parsec sind etwa 3,26 Lichtjahre. Proxima Centauri, der nächste Stern, steht bei 1,30 Parsec — 4,24 Lichtjahre entfernt.',
  },
  'slug-kg': {
    title: 'Slug in Kilogramm',
    desc: 'Die Masseneinheit der angelsächsischen Technik',
    long: 'Rechnet Slug in Kilogramm und zurück. Ein Slug ist die Masse, die ein Pfund-Kraft mit einem Fuß pro Sekundenquadrat beschleunigt; die US-Technik trennt damit Masse von Gewicht.',
    note: 'Ein Pfund ist ein Gewicht, ein Slug eine Masse. Ein Slug entspricht etwa 32,174 Pfund — dieselbe Zahl wie die Schwerkraft in Fuß je Sekundenquadrat.',
  },
  'quintal-kg': {
    title: 'Doppelzentner in Kilogramm',
    desc: 'Die 100-kg-Einheit des Getreidehandels',
    long: 'Rechnet Quintal in Kilogramm und zurück. Getreide und Dünger werden in Europa, Indien und Lateinamerika je Quintal gehandelt, wobei hundert Kilogramm eine Partie bilden.',
    note: 'Das metrische Quintal sind genau 100 kg. Der ähnlich klingende Hundredweight ist anders: 45,36 kg in den USA und 50,80 kg im Vereinigten Königreich.',
  },
  'peck-l': {
    title: 'Peck in Liter',
    desc: 'Ein Trockenmaß von einem Viertel Bushel',
    long: 'Rechnet Peck in Liter und zurück. Es ist die Korbgröße, in der Äpfel und Kartoffeln verkauft werden, und auf amerikanischen Bauernmärkten noch in Gebrauch.',
    note: 'Ein US-Trocken-Peck sind 8,81 L, vier Pecks ein Bushel. Der imperiale Peck misst 9,09 L, die Zahl weicht also ab.',
  },
  'dunam-m2': {
    title: 'Dunam in Quadratmeter',
    desc: 'Die Flächeneinheit des Nahen Ostens und des Balkans',
    long: 'Rechnet Dunam in Quadratmeter und zurück. Aus dem Osmanischen Reich übernommen, ist es bei Grundstücksgeschäften in Israel, der Türkei und auf dem Balkan bis heute die Arbeitseinheit.',
    note: 'Das metrische Dunam sind 1.000 m², ein Zehntel Hektar. Das ältere osmanische Dunam maß rund 919 m², alte Dokumente weichen also ab.',
  },
  'celsius-reaumur': {
    title: 'Celsius in Réaumur',
    desc: 'Grad Celsius in die Réaumur-Skala umrechnen',
    long: 'Rechnet Celsius in Réaumur und zurück. Die Skala setzt den Gefrierpunkt des Wassers auf 0 und den Siedepunkt auf 80 und hält sich in europäischen Käse- und Sirupvorschriften.',
    note: 'Celsius mal 0,8 ergibt Réaumur. Beide Skalen teilen den Nullpunkt, es braucht also keinen Summanden, nur die Multiplikation.',
  },
  'pib-tib': {
    title: 'PiB in TiB',
    desc: 'Pebibyte in Tebibyte umrechnen',
    long: 'Rechnet Pebibyte in Tebibyte und zurück. In diesen Zweierpotenz-Einheiten wird Rechenzentrumskapazität und Backup-Planung tatsächlich geschrieben.',
    note: 'Ein PiB sind 1.024 TiB. Hersteller nennen PB in Zehnerpotenzen, 1 PB ist also nur 0,888 PiB — mehr als zehn Prozent Unterschied.',
  },
  'toe-mwh': {
    title: 'Tonnen Öleinheiten in MWh',
    desc: 'Die Einheit der Energiestatistik in Strom umrechnen',
    long: 'Rechnet Tonnen Öleinheiten in Megawattstunden und zurück. Nationale Energiestatistiken bringen damit Kohle, Gas und Strom auf einen Maßstab.',
    note: 'Eine toe ist als 41,868 GJ definiert, also 11,63 MWh. Es ist eine festgelegte Rechengröße, nicht der Heizwert eines bestimmten Rohöls.',
  },
  'tnt-gj': {
    title: 'Tonnen TNT in Gigajoule',
    desc: 'Sprengkraft in Energie umrechnen',
    long: 'Rechnet Tonnen TNT-Äquivalent in Gigajoule und zurück. So werden Erdbebenenergie und Explosionsgröße verglichen, und das steht hinter Schlagzeilen wie „entspricht so vielen Tonnen TNT“.',
    note: 'Eine Tonne TNT ist als genau 4,184 GJ definiert. Das ist eine festgelegte Konvention, keine gemessene Detonationswärme.',
  },
  'ksi-mpa': {
    title: 'ksi in MPa',
    desc: 'Einheiten der Werkstofffestigkeit umrechnen',
    long: 'Rechnet ksi in Megapascal und zurück. US-Werkstoffnormen geben Zug- und Streckgrenze in ksi an, für den Vergleich mit internationalen Spezifikationen braucht es diese Umrechnung.',
    note: 'Ein ksi sind 1.000 psi, etwa 6,895 MPa. Die 800 MPa Zugfestigkeit einer Schraube der Güte 8.8 entsprechen rund 116 ksi.',
  },
  'footcandle-lux': {
    title: 'Footcandle in Lux',
    desc: 'Zwischen Beleuchtungsstärke-Einheiten umrechnen',
    long: 'Rechnet Footcandle in Lux und zurück. Amerikanische Beleuchtungsempfehlungen sind in Footcandle geschrieben, für den Abgleich mit internationalen Normen braucht es diesen Schritt.',
    note: 'Ein Footcandle sind etwa 10,76 Lux. Der Faktor ist schlicht das Verhältnis von Quadratfuß zu Quadratmeter.',
  },
  'mil-degree': {
    title: 'Strich in Grad',
    desc: 'Die militärische Winkeleinheit in Grad umrechnen',
    long: 'Rechnet Strich in Grad und zurück. Artillerie und Schießsport nutzen diese Einheit, die den Vollkreis nach NATO-Konvention in 6.400 Teile teilt.',
    note: 'Ein rechter Winkel sind 1.600 Strich. Ein Strich deckt auf tausend Meter etwa einen Meter ab, was Entfernung und Breite im Kopf verbindet.',
  },
  'sidereal-day-hour': {
    title: 'Sterntag in Stunden',
    desc: 'Wie lang ein an den Sternen gemessener Tag ist',
    long: 'Rechnet den Sterntag in Stunden um. So lange braucht die Erde für eine Umdrehung relativ zu den Sternen — etwa vier Minuten weniger als die 24 Stunden, die wir nach der Sonne führen.',
    note: 'Die Erde bewegt sich beim Drehen auch auf ihrer Bahn, muss sich also etwas weiterdrehen, bis die Sonne wieder gleich steht. Diese 3 Minuten 56 Sekunden täglich ergeben im Jahr genau einen Tag.',
    from: 'Sterntag', to: 'Stunden',
  },

  /* ───────── 넷째 묶음 12종 ───────── */
  'radian-degree': {
    title: 'Radiant in Grad',
    desc: 'Rechnet Radiant und Grad in beide Richtungen um',
    long: 'Rechnet Radiant in Grad und zurück. Mathematik, Physik und jede Programmiersprache rechnen Trigonometrie im Bogenmaß, während Menschen Winkel in Grad angeben — deshalb wechselt man ständig zwischen beiden.',
    note: 'Ein Radiant ist Bogenlänge geteilt durch Radius und trägt daher keine Einheit. Genau darum liest SIN() in der Tabelle und math.sin() in Python die 30 als 30 Radiant und nicht als 30 Grad — der häufigste Fehler in jeder Tabelle mit Trigonometrie.',
  },
  'minute-hour': {
    title: 'Minuten in Stunden',
    desc: 'Rechnet Minuten in Dezimalstunden um',
    long: 'Rechnet Minuten in Stunden und zurück. Nötig überall, wo Zeit abgerechnet oder erfasst wird: Stundenzettel, Stundenlohn, Videolänge, Parkgebühren und Mieten.',
    note: 'Das Ergebnis ist eine Dezimalstunde. Eine Stunde 45 Minuten sind 1,75 Stunden und nicht 1,45 — wer 1,45 in den Stundenzettel schreibt, verliert 18 Minuten. Das ist der Klassiker in der Lohnabrechnung.',
    from: 'min', to: 'h',
  },
  'day-hour': {
    title: 'Tage in Stunden',
    desc: 'Rechnet eine Anzahl Tage in Stunden um',
    long: 'Rechnet Tage in Stunden und zurück. Praktisch für Lieferzeiten, Einnahmeabstände von Medikamenten, Serverlaufzeiten und Gerätemieten, wo Tage und Stunden im gleichen Plan stehen.',
    note: 'Ein Tag hat nicht immer 24 Stunden. Mit Sommerzeit hat der Umstellungstag im Frühjahr 23 und der im Herbst 25 Stunden — ein Flug oder Termin über dieses Wochenende gerechnet liegt eine Stunde daneben.',
    from: 'Tage', to: 'Stunden',
  },
  'week-day': {
    title: 'Wochen in Tage',
    desc: 'Rechnet Wochen in eine Anzahl Tage um',
    long: 'Rechnet Wochen in Tage und zurück. Schwangerschaftswochen, Projektpläne, Kündigungsfristen und Sparlaufzeiten werden in Wochen gezählt, müssen aber im Kalender landen.',
    note: '"Innerhalb von zwei Wochen" im Vertrag sind 14 Kalendertage, aber nur 10 Werktage. Steht nichts dabei, gelten Kalendertage — und danach zu planen ist die sichere Seite.',
    from: 'Wochen', to: 'Tage',
  },
  'rpm-hz': {
    title: 'U/min in Hertz',
    desc: 'Rechnet Umdrehungen pro Minute in Frequenz um',
    long: 'Rechnet Umdrehungen pro Minute in Hertz und zurück. Motoren, Lüfter und Bohrmaschinen sind in U/min angegeben, Schwingungsanalyse und Frequenzumrichter werden dagegen in Hertz eingestellt.',
    note: 'Netzfrequenz und Wellendrehzahl sind nicht dasselbe. Ein vierpoliger Motor läuft bei 50 Hz synchron mit 1.500 U/min — 120 × Frequenz ÷ Polzahl. Für die Winkelgeschwindigkeit in rad/s multipliziert man die Hertz hier mit 2π.',
    from: 'U/min',
  },
  'tsp-tbsp': {
    title: 'Teelöffel in Esslöffel',
    desc: 'Die beiden Löffelmaße aus Rezepten',
    long: 'Rechnet Teelöffel in Esslöffel und zurück. Für den Fall, dass nur ein Messlöffel zur Hand ist, oder wenn ein Rezept halbiert oder verdoppelt wird.',
    note: 'In US- und koreanischen Maßen sind ein Esslöffel genau drei Teelöffel. Nur der australische Esslöffel hat 20 mL, also vier Teelöffel — ein australisches Rezept mit 3:1 umgerechnet bleibt 25 % zu knapp.',
    from: 'TL', to: 'EL',
  },
  'oz-lb': {
    title: 'Unzen in Pfund',
    desc: 'Rechnet Unzen und Pfund in beide Richtungen um',
    long: 'Rechnet Unzen in Pfund und zurück. Amerikanische Lebensmittelverpackungen, Portotabellen und Geburtsgewichte ("7 lb 6 oz") benutzen beide Einheiten nebeneinander.',
    note: 'Das Handelspfund (avoirdupois) hat 16 Unzen. Die Feinunze für Gold und Silber ist mit 31,10 g schwerer, und ein Troy-Pfund hat nur 12 davon — Barrengewichte durch 16 zu teilen ergibt Unsinn.',
  },
  'newton-kgf': {
    title: 'Newton in Kilopond (kgf)',
    desc: 'Rechnet Newton in Kilogrammkraft um',
    long: 'Rechnet Newton in Kilogrammkraft um, in Deutschland als Kilopond bekannt. Normen geben Kräfte in Newton an, doch auf koreanischen und japanischen Typenschildern, Federwaagen und Zugprüfmaschinen steht weiter kgf.',
    note: 'Ein kgf ist auf die Normfallbeschleunigung 9,80665 m/s² festgelegt und ändert sich daher nicht mit dem Ort. Aber kg ist eine Masse und kgf eine Kraft: in einer Tabelle vermischt, wird die Lastrechnung falsch, ohne falsch auszusehen.',
    to: 'kp',
  },
  'mpg-l100km': {
    title: 'mpg in L/100 km',
    desc: 'US-Verbrauch in die europäische Schreibweise',
    long: 'Rechnet amerikanische Meilen pro Gallone in Liter pro 100 km um. Beide Zahlen laufen gegenläufig, gleiche mpg-Schritte sind also nicht gleiche Spritmengen: 20 auf 25 mpg spart 2,35 L/100 km, 40 auf 45 mpg nur noch 0,65.',
    note: 'Die Konstante 235,215 ist die US-Gallone von 3,785411784 L mal 100, geteilt durch die 1,609344 km einer Meile. Für die imperiale Gallone gilt 282,481 — britische Zeitschriftenwerte fallen hier also rund 20 % zu niedrig aus.',
  },
  'l100km-kmpl': {
    title: 'L/100 km in km/L',
    desc: 'Rechnet Verbrauch in Kilometer je Liter um',
    long: 'Rechnet Liter pro 100 km in Kilometer pro Liter um. Beides ist metrisch, doch Zähler und Nenner sind getauscht — eine Prospektangabe muss also erst umgedreht werden, bevor sie neben einem km/L-Wert stehen kann.',
    note: 'Die ganze Rechnung ist 100 geteilt durch den Wert, deshalb funktioniert derselbe Schritt in beide Richtungen. Am sparsamen Ende zählt ein Liter viel mehr: 4 auf 3 geht von 25 auf 33 km/L, 9 auf 8 nur von 11 auf 12,5.',
  },
  'nm-ftlb': {
    title: 'N·m in ft·lb',
    desc: 'Rechnet zwischen Drehmomenteinheiten um',
    long: 'Rechnet Drehmoment zwischen Newtonmeter und Foot-Pound um. In den USA gekaufte Drehmomentschlüssel und Werkstatthandbücher sind in ft·lb skaliert, internationale Angaben und metrisches Werkzeug in N·m.',
    note: 'ft·lb und lb·ft sind dieselbe Einheit in zwei Schreibweisen. Kleine Momente stehen stattdessen in in·lb, einem Zwölftel eines ft·lb — eine Fahrrad- oder Elektronikangabe als ft·lb gelesen zieht die Schraube zwölffach an.',
  },
  'cfm-m3h': {
    title: 'CFM in m³/h',
    desc: 'Rechnet Luftmengen-Einheiten um',
    long: 'Rechnet Kubikfuß pro Minute in Kubikmeter pro Stunde um. Amerikanische und taiwanische Hersteller geben Lüfter, Dunstabzugshauben, Luftreiniger und PC-Lüfter in CFM an, Lüftungspläne dagegen in m³/h.',
    note: 'CFM ist ein Volumenstrom und sagt nichts über den Druck. Zwei Lüfter mit gleichem CFM verhalten sich hinter einem Filter oder einem langen Kanal völlig anders — die Luftmenge ist nur zusammen mit dem statischen Druck aussagekräftig.',
  },
};

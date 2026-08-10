import type { FormulaText } from '../formula/types.ts';

/**
 * Deutsche Texte der 48 Handarbeits-Rechner (/craft).
 *
 * Hier stehen nur Titel, Kurzbeschreibung, Fließtext und Hinweis. Gerechnet wird
 * ausschließlich in lib/craft/*.ts — dieselbe Trennung wie bei lib/rate-l10n.
 *
 * Ein Begriff, ein Wort: Maschenprobe (nicht Maschendichte), Nahtzugabe, Einfassung,
 * Überfettung, Duftölanteil. Dieselben Wörter stehen in TERMS und DESC von
 * lib/formula/l10n/de.ts, damit Label und Text auf einer Seite zusammenpassen.
 *
 * Zahlen bleiben so, wie sie im Original durchgerechnet sind (500 g bei 8 % = 40 g),
 * damit der Text nachprüfbar bleibt; Dezimalkomma nach deutscher Schreibweise.
 */
export const CRAFT_DE: Record<string, FormulaText> = {
  /* ───────── Stricken und Häkeln ───────── */
  'yarn-needed': {
    title: 'Wollverbrauch berechnen',
    desc: 'Aus dem Gewicht einer Maschenprobe die Wolle für das fertige Teil.',
    long: 'Stricke ein Quadrat von 10 cm und wieg es: daraus ergibt sich, wie viele Gramm auf einen Quadratzentimeter gehen. Multipliziert mit der Fläche des fertigen Teils steht die Wollmenge da. Die Angabe in der Anleitung gilt für die Maschenprobe der Anleitung und geht daneben, sobald deine davon abweicht.',
    note: 'Rechne rund 15 % Zugabe ein. Ärmel, Halsblenden und das Zusammennähen fressen mehr, als die glatte Fläche vermuten lässt, und ist eine Farbpartie ausverkauft, findest du denselben Ton nicht wieder.',
  },
  'yarn-skeins': {
    title: 'Wie viele Knäuel Wolle?',
    desc: 'Aus der nötigen Länge und der Lauflänge je Knäuel die Zahl der Knäuel.',
    long: 'Ein halbes Knäuel gibt es im Laden nicht, also wird aufgerundet. Wichtig ist die Reihenfolge: erst die Zugabe aufschlagen, dann aufrunden — rundest du zuerst, verschwindet ein wirklich fehlendes Knäuel aus dem Ergebnis.',
    note: 'Die Lauflänge auf der Banderole ist ein Nennwert. Zwei Knäuel mit gleichem Gewicht können sich um mehrere Meter unterscheiden, deshalb reicht die genau passende Zahl in den letzten Reihen oft nicht.',
  },
  'gauge-stitches': {
    title: 'Maschenanschlag aus der Maschenprobe',
    desc: 'Aus Maschenprobe und Wunschbreite die Zahl der Anschlagmaschen.',
    long: '22 Maschen auf 10 cm sind 2,2 Maschen pro Zentimeter; multipliziere sie mit der Breite, die du willst. Läuft das Muster über eine feste Zahl von Maschen, runde auf das nächste Vielfache davon.',
    note: 'Miss die Maschenprobe erst nach dem Waschen und Spannen. Die Breite direkt von der Nadel ändert sich, sobald die Wolle nass war.',
  },
  'gauge-convert': {
    title: 'Maschenprobe umrechnen',
    desc: 'Neue Maschenzahl, wenn deine Maschenprobe von der Anleitung abweicht.',
    long: 'Verlangt eine Anleitung mit 22 Maschen auf 10 cm einen Anschlag von 110 Maschen und du strickst 20, wird dein Teil breiter als gedacht. Skalierst du die Maschenzahl mit dem Verhältnis der beiden Proben, stimmt die Breite wieder.',
    note: 'Damit passt die Breite, die Länge nicht. Die Reihen rechnest du getrennt aus deiner Reihenprobe.',
  },
  'yarn-weight-length': {
    title: 'Wolle: Gewicht in Meter umrechnen',
    desc: 'Aus dem Gewicht des Restknäuels die verbleibende Länge.',
    long: 'Lauflänge und Gewicht auf der Banderole legen die Meter pro Gramm fest. Leg den Rest auf die Waage, und du weißt, was noch da ist — und mit dem Verbrauch einer Reihe auch, wie viele Reihen das noch trägt.',
    note: 'Zieh Papphülse oder Banderole ab, wenn das Knäuel noch aufgewickelt ist. Fünf Gramm Fehler verschieben die Antwort um etwa 20 Meter.',
  },
  'wpi-weight': {
    title: 'WPI: Garnstärke bestimmen',
    desc: 'Aus den Wickeln pro Zoll die Nummer der Garnstärke.',
    long: 'Wickle das Garn Wicklung an Wicklung auf ein Lineal, bis ein Zoll voll ist: diese Zahl ist der WPI-Wert, und er lässt sich auf die üblichen Stärkenummern übertragen. So ordnest du ein Garn ohne Banderole oder einen Rest ein — rund 12 WPI sind meist Worsted, also Nummer 4.',
    note: 'Wickelst du unter Zug, steigt der WPI-Wert und das Garn erscheint dünner, als es ist. Leg die Wicklungen nur aneinander, ohne sie zu quetschen.',
  },
  'hat-cast-on': {
    title: 'Mütze: Maschen anschlagen',
    desc: 'Anschlag für eine Mütze aus Kopfumfang und negativer Mehrweite.',
    long: 'Eine Mütze muss kleiner ausfallen als der Kopf, sonst rutscht sie hoch. Etwa 10 % vom gemessenen Umfang abzuziehen ist der übliche Anfang, ein sehr dehnbares Rippenmuster verträgt mehr.',
    note: 'Runde auf ein Vielfaches des Mustersatzes. Ein 2×2-Rippenmuster braucht ein Vielfaches von vier, sonst trifft die Runde am Übergang nicht auf sich selbst.',
  },
  'sleeve-decrease': {
    title: 'Abnahmen am Ärmel verteilen',
    desc: 'Abstand der Abnahmen aus Anfangs- und Endmaschen und der Reihenzahl.',
    long: 'Eine Abnahmerunde nimmt an jeder Seite eine Masche weg, es gehen also zwei Maschen auf einmal. Die Hälfte der Differenz ist die Zahl der Abnahmerunden, und die Reihen geteilt durch diese Zahl ergeben den Abstand.',
    note: 'Geht es nicht glatt auf, leg die übrigen Reihen oben an die Achsel. Ungleiche Abstände fallen am Bündchen am stärksten auf.',
  },

  /* ───────── Nähen und Stoff ───────── */
  'fabric-yardage': {
    title: 'Stoffverbrauch berechnen',
    desc: 'Wie viel Stoff du kaufen musst — aus Teilegröße, Stückzahl und Stoffbreite.',
    long: 'Stoff kommt in fester Breite, deshalb steht zuerst fest, wie viele Teile quer nebeneinander passen. Ein 40 cm breites Teil passt auf 110 cm Stoff zweimal, die übrigen 30 cm sind Verschnitt: sechs Teile brauchen drei Reihen, die Länge ist also 3 × 50 = 150 cm. Passen drei nebeneinander, kosten die gleichen sechs Teile nur 100 cm.',
    note: 'Ist ein Teil breiter als der Stoff, rechnet die Formel mit einem Teil je Reihe; in Wirklichkeit musst du stückeln oder den Zuschnitt drehen. Stoffe mit gerichtetem Muster lassen sich nicht drehen und brauchen mehr als diesen Wert.',
  },
  'fabric-pieces': {
    title: 'Zuschnitt: Teile aus dem Stoff',
    desc: 'Wie viele gleiche Teile aus dem Stoff herauskommen, den du schon hast.',
    long: 'Quer über die Breite gehen ⌊110 ÷ 40⌋ = 2, über die Länge ⌊200 ÷ 50⌋ = 4 Reihen, also acht Teile. Beide Divisionen runden ab, und genau deshalb zählt der Reststreifen von 30 cm nicht mit — kleinere Teile darin unterzubringen ist eine eigene Rechnung.',
    note: 'Gib Zuschnittmaße ein, in denen die Nahtzugabe schon steckt. Rechnest du mit Fertigmaßen, steigt die Stückzahl, aber es bleibt nichts zum Nähen. Ungewaschener Stoff verliert außerdem erst noch sein Einlaufen.',
  },
  'seam-allowance': {
    title: 'Nahtzugabe: Zuschnittmaß berechnen',
    desc: 'Vom Fertigmaß und der Nahtzugabe zum Maß, das du zuschneidest.',
    long: 'Die Zugabe liegt an beiden gegenüberliegenden Kanten, jede Richtung wächst also um das Doppelte. Ein Fertigmaß von 40 × 50 cm wird bei 1 cm Zugabe auf 42 × 52 cm zugeschnitten. Rechnest du sie nur einmal, fällt das Teil 2 cm zu klein aus.',
    note: 'Wie breit die Zugabe ist, hängt von der Tradition ab: 1 cm in koreanischen und japanischen Schnitten, 5/8 Zoll (1,6 cm) in amerikanischen, 1/4 Zoll (0,6 cm) beim Patchwork. Ein doppelt eingeschlagener Saum braucht zusätzlich die doppelte Umschlagbreite.',
  },
  'bias-binding': {
    title: 'Schrägband berechnen (Endlosband)',
    desc: 'Größe des Stoffquadrats, aus dem eine bestimmte Länge Schrägband wird.',
    long: 'Schrägband läuft im 45°-Winkel, du kannst es also nicht einfach lang von der Bahn ziehen: du schneidest ein Quadrat diagonal und setzt es zusammen oder wickelst es zu einem Schlauch und schneidest endlos. Was die Länge wirklich festlegt, ist eine Fläche — 300 cm × 4 cm = 1.200 cm², plus 10 % für Nähte und Begradigen, also √1.320 ≈ 36,3 cm im Quadrat.',
    note: 'Ein doppelt gefalztes Band mit 1 cm Fertigbreite wird vierfach so breit geschnitten, also 4 cm. Gibst du die Fertigbreite ein, bleibt nichts zum Einschlagen. Jersey dehnt sich von sich aus und braucht kaum je ein schräg geschnittenes Band.',
  },
  'gather-ratio': {
    title: 'Kräuselweite für Rüschen',
    desc: 'Wie lang der Stoff sein muss, damit eine Kante gekräuselt aufgeht.',
    long: 'Der Kräuselfaktor sagt, wie viele Fertigmaße du zuschneidest, bevor du zusammenziehst. Das Doppelte einer 60 cm langen Kante heißt 120 cm schneiden und auf 60 cm kräuseln, 60 cm verschwinden also in den Falten. Feine Stoffe tragen 2,5 bis 3, schwere hören bei etwa 1,5 auf — derselbe Faktor wirkt je nach Stoff völlig anders.',
    note: 'Leg den Faktor vor dem Zuschneiden fest: am Kräuselfaden ziehen macht den Stoff nicht länger. Rüschen und Volants rechnen genauso, meist mit 2 oder mehr.',
  },
  'elastic-length': {
    title: 'Gummiband: Länge berechnen',
    desc: 'Wie lang du Gummiband schneidest — aus Körpermaß und Dehnung.',
    long: 'Gummiband wird kürzer geschnitten als die Stelle, die es halten soll. Zieh von 76 cm Taille 10 % ab, das sind 68,4 cm, gib 2,5 cm zum Übereinandernähen der Enden dazu und schneide 70,9 cm. Der fertige Ring muss sich dann um 11,1 % (10 ÷ 90) dehnen, um auf 76 cm zu kommen — das ist die Dehnung, die du dem Gummi wirklich abverlangst.',
    note: 'Über etwa 30 % Dehnung geht es noch an, hinterlässt aber den ganzen Tag Druckstellen. Die Rückstellkraft schwankt stark von Sorte zu Sorte, deshalb schlägt es jede Formel, das Band um den Körper zu legen und die bequeme Länge zu suchen.',
  },
  'fabric-shrinkage': {
    title: 'Stoff-Einlauf und Zugabe berechnen',
    desc: 'Einlaufquote und der Stoff, den du deshalb zusätzlich kaufst.',
    long: 'Miss eine lange Strecke, nicht 10 cm. Kommen aus 100 cm nach der Wäsche 96, läuft der Stoff um 4 % ein. Damit nach dem Waschen 200 cm übrig bleiben, brauchst du 200 ÷ 0,96 = 208,3 cm, 8,3 cm gehen also in die Wäsche. Rechnest du stattdessen 4 % obendrauf, kommst du auf 208 cm und liegst knapp darunter — richtig ist teilen, nicht addieren.',
    note: 'Baumwolle und Leinen verlieren beim ersten Waschen 3 bis 10 %, Denim mehr. Die Breite läuft ebenfalls ein, prüf das getrennt, wenn ein Teil quer nur eben so passt. Wäschst du den Stoff vor dem Zuschneiden, erledigt sich die Rechnung von selbst.',
  },
  'pattern-scale': {
    title: 'Schnittmuster vergrößern oder verkleinern',
    desc: 'Neues Maß, wenn du ein gedrucktes Schnittmuster skalierst.',
    long: 'Längen wachsen mit dem Prozentsatz, der Stoffverbrauch mit seinem Quadrat. Eine Linie von 20 cm wird bei 120 % zu 24 cm, die Fläche desselben Teils aber zu 144 % — deshalb geht bei einem leicht vergrößerten Schnitt der Stoff aus. Der Zoom im Druckdialog ist genau dieselben 120 %.',
    note: 'Schalte beim Drucken die Anpassung an die Seitengröße aus und tipp den Maßstab selbst ein, dann miss das Testquadrat auf dem Bogen nach, bevor du etwas zuschneidest. Nahtzugaben bleiben auf ihrer ursprünglichen Breite, sie werden nicht mitskaliert.',
  },

  /* ───────── Quilten und Sticken ───────── */
  'quilt-binding': {
    title: 'Quilt-Einfassung berechnen',
    desc: 'Länge der Einfassung und die Zahl der Streifen für einen Quilt.',
    long: 'Der Umfang ist 2 × (150 + 200) = 700 cm. Dazu kommt an jeder der vier Ecken eine Streifenbreite (6,4 × 4 = 25,6 cm) und 25 cm für die diagonalen Nähte und den Überlapp am Schluss, insgesamt 750,6 cm. Die Streifen werden quer über den Stoff geschnitten, und mit 2 cm abgeschnittener Webkante läuft jeder 105 cm — daher acht Streifen.',
    note: 'Ein 2,5 Zoll (6,4 cm) breiter Streifen, doppelt gefaltet und mit 1/4-Zoll-Naht angesetzt, wird etwa 1 cm breit. Setz die Streifen im 45°-Winkel zusammen; gerade Nähte stapeln sich dick und stauchen an den Ecken.',
  },
  'quilt-backing': {
    title: 'Quilt-Rückseite: Stoffbedarf',
    desc: 'Stofflänge für die Rückseite aus Quiltmaß, Überstand und Stoffbreite.',
    long: 'Die drei Lagen verschieben sich beim Quilten, deshalb wird die Rückseite an allen Seiten größer zugeschnitten. Bei 10 cm je Seite brauchst du 170 × 220 cm, und 170 cm liegen über der nutzbaren Breite (107 − 2 = 105 cm), also müssen zwei Längen zusammengenäht werden: 220 × 2 = 440 cm zu kaufen.',
    note: 'Schneide die Webkanten ab, bevor du nähst — sie sind dichter gewebt und ziehen die Naht zu einem Wulst. Longarm-Quilter verlangen oft 10 cm oder mehr je Seite, frag also vorher nach. Extrabreiter Rückseitenstoff ab 240 cm spart die Naht ganz.',
  },
  'quilt-batting': {
    title: 'Volumenvlies für den Quilt',
    desc: 'Zuschnittmaß und Fläche des Vlieses aus Quiltmaß und Überstand.',
    long: 'Vlies braucht weniger Überstand als die Rückseite. Bei 5 cm je Seite sind das 160 × 210 cm, eine Fläche von 3,36 m². Schneidest du es so groß wie die Rückseite, legt sich der Überschuss in dicke Falten und hängt sich unter den Nähfuß.',
    note: 'Vlies wird in Größen verkauft, deren Namen in Zoll festgelegt sind — Crib, Twin, Queen. Von der Rolle lassen sich Reste verbinden: Kanten stumpf aneinanderlegen statt überlappen und mit Zickzack fassen, dann bleibt die Dicke gleichmäßig. Baumwollvlies läuft in der Wäsche 3 bis 5 % ein.',
  },
  'quilt-blocks': {
    title: 'Quilt-Blöcke aufteilen',
    desc: 'Blöcke in Breite und Länge und insgesamt für ein bestimmtes Quiltmaß.',
    long: '150 ÷ 25 = 6 in der Breite und 200 ÷ 25 = 8 in der Länge, also 48 Blöcke. Geht es nicht glatt auf, nimm die ganzen Blöcke und füll den Rest mit Zwischenstreifen (Sashing) oder Bordüren — eine Bordüre anzupassen ist viel leichter, als jeden Block umzurechnen.',
    note: 'Die Blockgröße hier ist das Fertigmaß. Ein fertig 25 cm großer Block wird mit je 0,6 cm auf 26,2 cm zugeschnitten, und diese Zugabe verschwindet in jeder Naht. Zwölf Zoll (30,5 cm) ist die verbreitetste Blockgröße.',
  },
  'hst-squares': {
    title: 'HST-Quadrate zuschneiden',
    desc: 'Welche Ausgangsquadrate ein fertiges Halbquadrat-Dreieck braucht.',
    long: 'Zwei Quadrate, an der Diagonale zusammengenäht und auseinandergeschnitten, geben zwei HST. Dieses Quadrat muss das Fertigmaß, die beiden seitlichen Zugaben (0,6 × 2 = 1,2 cm) und die diagonale Naht (√2 × 0,6 ≈ 0,85 cm) tragen, also 12,05 cm. Setz die Zugabe auf genau 1/4 Zoll (0,64 cm), und die Antwort wird Fertigmaß + 7/8 Zoll (2,2 cm) — die Regel, die Patchworkerinnen im Kopf haben.',
    note: 'Etwas großzügiger schneiden und danach zurechttrimmen ist besser als exakt schneiden. Die Diagonale liegt im schrägen Fadenlauf und dehnt sich beim Hantieren, exakt zugeschnitten fällt der Block deshalb zu klein aus. Trimm die genähte Einheit auf 11,2 cm — Fertigmaß plus zwei Zugaben — und der Block passt.',
  },
  'aida-size': {
    title: 'Kreuzstich: Motivgröße berechnen',
    desc: 'Fertige Motivgröße aus den Stichzahlen der Vorlage und dem Stoffcount.',
    long: 'Der Count ist die Zahl der Stiche auf einem Zoll. Auf 14 Count ist ein Stich 2,54 ÷ 14 = 0,18 cm groß, 100 Stiche in der Breite sind also 18,1 cm (7,1 Zoll) und 140 in der Höhe 25,4 cm (10 Zoll). Dieselbe Vorlage auf 18 Count schrumpft auf 14,1 × 19,8 cm.',
    note: 'Leinen und Evenweave werden meist über zwei Fäden gestickt, gib dort den halben Count ein — 28 Count Leinen wird so groß wie 14 Count Aida. Steht der Rahmen schon fest, passt du die Größe leichter über den Stoffcount an, als die Vorlage neu zu zeichnen.',
  },
  'aida-fabric': {
    title: 'Kreuzstich: Stoffgröße berechnen',
    desc: 'Zuschnittmaß des Stoffs aus der fertigen Motivgröße und dem Rand.',
    long: 'Der Stoff wird rundherum mit Rand geschnitten. Bei 8 cm je Seite braucht ein Motiv von 18 × 25 cm ein Stück von 34 × 41 cm. Dieser Rand ist das, was beim Rahmen nach hinten umgeschlagen wird — sparst du ihn ein, bleibt nichts, was du über die Platte spannen kannst.',
    note: 'Für den Rahmen 7,5 cm (3 Zoll) je Seite, nie unter 5 cm. Im Stickrahmen brauchst du noch mehr, weil der Stoff über den Ring hinausreichen muss. Aida franst von der Schnittkante her schnell aus — sichere sie sofort mit Zickzack oder Klebeband.',
  },
  'floss-length': {
    title: 'Stickgarn-Verbrauch berechnen',
    desc: 'Länge des Stickgarns aus Stichzahl, Fäden und Stoffcount.',
    long: 'Auf 14 Count sitzt jeder Stich in einem Quadrat von 0,18 cm, und ein Kreuz sind zwei seiner Diagonalen — 0,51 cm. Das Wandern auf der Rückseite und das Vernähen von Anfang und Ende kosten etwa noch einmal so viel, rechne also mit rund 1,03 cm pro Stich und Faden. Zwei Fäden über 1.000 Stiche sind 20,5 m.',
    note: 'Ein DMC-Strang hat sechs Fäden von 8 m, einfach gerechnet 48 m, und deckt mit zwei Fäden etwa 2.300 Stiche. Weite Sprünge auf der Rückseite und häufige Farbwechsel verbrauchen deutlich mehr, rechne also zu, wenn eine Farbe über die ganze Vorlage verstreut liegt.',
  },

  /* ───────── Kerzen ───────── */
  'wax-weight': {
    title: 'Kerzenwachs-Rechner',
    desc: 'Vom Volumen des Gefäßes zum Gewicht des Wachses, das du schmilzt.',
    long: 'Füll das Gefäß mit Wasser und wieg es: das gibt das Volumen in Millilitern. Wachs ist leichter als Wasser, dasselbe Volumen wiegt also weniger — Soja liegt bei etwa 0,9 g/cm³.',
    note: 'Nicht bis zum Rand füllen. Das obere Zehntel bleibt frei für den Docht und den Duft, und Soja sinkt beim Erstarren gern ein: ein zweiter Guss zum Auffüllen ist normal.',
  },
  'wax-multi': {
    title: 'Wachsmenge für mehrere Kerzen',
    desc: 'Das gesamte Wachs für eine Reihe gleicher Gefäße.',
    long: 'Nimm das Gewicht für ein Gefäß und multipliziere es mit der Stückzahl. Die Rechnung geht davon aus, dass du zu neun Zehnteln füllst.',
    note: 'Schmilz etwa 5 % mehr. Im Gießkännchen bleibt immer etwas hängen, und wenn es bei der letzten Kerze fehlt, musst du für diese eine noch einmal ansetzen.',
  },
  'fragrance-load': {
    title: 'Duftöl-Anteil für Kerzen',
    desc: 'Aus Wachsgewicht und Duftölanteil die Gramm Duftöl.',
    long: 'Der Duftölanteil ist ein Prozentsatz des Wachses, nicht der fertigen Kerze. Acht Prozent von 500 g sind 40 g Öl, der Ansatz wiegt damit 540 g. Jedes Wachs hat eine Obergrenze, die es binden kann; darüber liegt das Öl auf der Oberfläche statt im Wachs.',
    note: 'Wieg Duftöl ab, statt es in Millilitern zu messen — seine Dichte ist nicht die von Wasser, über das Volumen liegst du mehrere Prozent daneben. Halte dich an die Eingießtemperatur des Wachses, nicht an die des Öls.',
  },
  'fragrance-percent': {
    title: 'Duftöl-Anteil rückwärts',
    desc: 'Aus dem eingerührten Öl den tatsächlichen Anteil zurückrechnen.',
    long: 'Praktisch, wenn du ein Rezept aufschreibst oder nachsehen willst, auf welchen Prozentsatz der Rest einer Flasche hinausgelaufen ist. Manche Hersteller beziehen den Anteil auf den gesamten Ansatz, dieselbe Zahl bedeutet dann eine andere Menge — hier ist sie auf das Wachs bezogen.',
    note: 'Über der angegebenen Höchstmenge des Wachses schwitzt das Öl an der Oberfläche aus oder verstopft den Docht. Den Prozentsatz zu erhöhen ist selten die Lösung für eine Kerze, die zu schwach duftet.',
  },
  'candle-burn-time': {
    title: 'Brenndauer einer Kerze',
    desc: 'Brennstunden aus Wachsgewicht und Verbrauch pro Stunde.',
    long: 'Lass die Kerze einmal brennen und wieg sie davor und danach: das ergibt den Verbrauch in Gramm pro Stunde. Das Wachs geteilt durch diesen Wert sind die restlichen Stunden. Die Dochtstärke bestimmt den Verbrauch, dasselbe Wachs brennt mit dickerem Docht schneller weg.',
    note: 'Brenn nicht länger als etwa vier Stunden auf einmal. Darüber überhitzt das Wachs und am Docht setzt sich Ruß ab. Beim ersten Brennen lohnt es sich zu warten, bis die ganze Oberfläche geschmolzen ist.',
  },
  'container-volume': {
    title: 'Kerzenglas: Volumen berechnen',
    desc: 'Nutzbares Volumen und Wachsgewicht aus Durchmesser und Höhe des Gefäßes.',
    long: 'Bei einem geraden Glas genügen Innendurchmesser und Innenhöhe. Mit Wasser zu messen bleibt genauer, aber so kommst du zum Wert, bevor die Gefäße geliefert sind.',
    note: 'Ein nach unten schmaler werdendes Glas fasst weniger als dieser Wert. Bei einem eckigen Gefäß überschätzt die Kantenlänge als Durchmesser das Volumen — das prüf mit Wasser.',
  },
  'melt-pour-batch': {
    title: 'Gießmasse für Formen berechnen',
    desc: 'Wie viel Basis du für einen Satz Formen schmelzen musst.',
    long: 'Gieß- und Schmelzbasen sind meist etwas dichter als Wasser, deshalb steht der Vorgabewert bei 1,05. Fünf Prozent kommen für das dazu, was im Kännchen und im Topf zurückbleibt.',
    note: 'Übrige Basis lässt sich wieder einschmelzen, zu viel kostet also nichts. Zu wenig lässt die letzte Form halb voll — und das kostet.',
  },
  'wax-cost-per-candle': {
    title: 'Materialkosten pro Kerze',
    desc: 'Wachspreis und Zubehör zu den Materialkosten einer Kerze.',
    long: 'Wachs kauft man im Kilo und verbraucht es im Gramm. Bei 9.000 je Kilo trägt eine Kerze mit 180 g Wachs 1.620 an Wachskosten. Gefäß, Docht, Duftöl und Etikett gehören in das Feld für das Zubehör.',
    note: 'Material ist nur ein Teil der Kosten. Wenn du verkaufst, denk daran: misslungene Güsse, Verpackung, Porto und Plattformgebühren stehen hier nicht drin.',
  },

  /* ───────── Seife und Harz ───────── */
  'lye-naoh': {
    title: 'Seifenrechner: NaOH-Menge',
    desc: 'Aus Ölmenge und SAP-Wert das nötige Natriumhydroxid.',
    long: 'SAP-Werte werden in Milligramm Kaliumhydroxid je Gramm Öl veröffentlicht; für NaOH teilst du deshalb durch 1402,5 — das Molverhältnis von KOH mit 56,1 zu NaOH mit 40,0, umgerechnet von Milligramm auf Gramm. Olivenöl hat einen SAP-Wert von 190, 500 g brauchen bei 5 % Überfettung also 64 g NaOH. Der Wert gehört zum Öl, nicht zu Seife allgemein: dieser Rechner nimmt ein Öl auf einmal, ein gemischtes Rezept rechnest du Öl für Öl und addierst die Laugenmengen. Das Wasser steht als Ausgangspunkt mit dem doppelten Laugengewicht daneben.',
    note: 'Die Lauge kommt ins Wasser, nie das Wasser auf die Lauge — in der falschen Reihenfolge kocht es in Sekunden auf und spritzt. Trag Schutzbrille und Handschuhe und rühr in Edelstahl oder HDPE, niemals in Aluminium: das greift die Lauge an, und es entsteht Wasserstoff. Die Lösung heizt sich beim Zusammengeben von selbst auf 80 bis 90 °C, also kein Glas und kein dünnes Plastik. Zu wenig Lauge lässt ein weiches Stück zurück, das nie fest wird, zu viel eine ätzende Seife.',
  },
  'lye-koh': {
    title: 'Seifenrechner: KOH für Flüssigseife',
    desc: 'Kaliumhydroxid für Flüssigseife, Reinheit eingerechnet.',
    long: 'SAP-Werte sind schon in KOH angegeben, hier gibt es also kein 1402,5 — nur die 1000, die Milligramm in Gramm verwandelt. KOH-Flocken ziehen Wasser aus der Luft und werden meist mit 90 % Reinheit verkauft, der reine Bedarf muss also durch diese Reinheit geteilt werden, damit du das Gewicht bekommst, das wirklich auf die Waage kommt. 500 g Öl mit SAP 190, 3 % Überfettung und 90 % Reinheit ergeben 102 g. Der SAP-Wert gehört weiterhin zum Öl, Mischungen rechnest du einzeln und addierst sie.',
    note: 'Auch hier kommt die Lauge ins Wasser — umgekehrt kocht sie auf und spritzt. Schutzbrille, Handschuhe und ein Gefäß aus Edelstahl oder HDPE; Aluminium wird von Lauge angegriffen. KOH wird heißer als NaOH, die Spitzentemperatur liegt höher. Flüssigseife bleibt bei 0 bis 3 % Überfettung, weil unverseiftes Öl sich nicht löst und die fertige Seife trübt. Zu wenig Lauge und freies Öl schwimmt oben, zu viel und der pH-Wert steigt über das Brauchbare.',
  },
  'water-lye-ratio': {
    title: 'Wasser-Lauge-Verhältnis',
    desc: 'Aus Laugenmenge und Verhältnis Wasser zu Lauge die Wassermenge und die Konzentration.',
    long: 'Wasser trägt die Lauge nur in die Öle — an der Verseifung nimmt es nicht teil und verlässt die Seife wieder, während sie reift. Damit ist die Konzentration der Lösung die Zahl, auf die es ankommt: 2 : 1 ist eine 33-prozentige Lauge, 1,5 : 1 eine 40-prozentige. 65 g Lauge brauchen bei 2 : 1 130 g Wasser, mit 500 g Öl kommt der Ansatz auf 695 g.',
    note: 'Mehr Wasser gibt einen dünneren Seifenteig, der sich leichter marmorieren lässt, aber später aus der Form kommt und beim Reifen stärker schwindet. Eine stärkere Lösung heizt kräftiger auf, fang deshalb mit kaltem Wasser an. Ersetzt du Wasser durch Eis, zählt das Eis weiter zum Wassergewicht.',
  },
  'soap-batch-scale': {
    title: 'Seifenrezept umrechnen',
    desc: 'Öl, Lauge und Wasser eines Rezepts auf einen größeren oder kleineren Ansatz.',
    long: 'In einem Seifenrezept bewegt sich alles gemeinsam: das 1,5-Fache Öl heißt 1,5-fache Lauge und 1,5-faches Wasser. Am einfachsten holst du den Faktor aus dem Formvolumen — von einer Form mit 1.200 mL auf eine mit 1.800 mL sind es 1,5. Ein Rezept aus 500 g Öl, 65 g Lauge und 130 g Wasser wird mit 1,5 zu 750 g, 97,5 g und 195 g.',
    note: 'Rechne die Lauge nicht neu, sondern skaliere sie — solange die Öle dieselben sind, ist auch der SAP-Wert derselbe. Das Verhalten ändert sich aber: ein größerer Ansatz hält die Wärme länger und dickt schneller an, kräftige Farben oder Düfte beschleunigen das noch. Tauschst du ein Öl, ist nicht der Faktor, sondern der SAP-Wert neu zu rechnen.',
  },
  'resin-volume': {
    title: 'Epoxidharz-Rechner: Harzmenge',
    desc: 'Harzgewicht für eine rechteckige Form aus Maßen und Dichte.',
    long: 'Eine rechteckige Form ist einfach Breite × Tiefe × Höhe, und ein Kubikzentimeter ist ein Milliliter. Harz ist etwas schwerer als Wasser — Epoxid liegt bei etwa 1,1 g/cm³ —, eine Untersetzerform von 10 × 10 × 2 cm fasst also 200 mL und braucht 220 g. Bei einer runden Form quadrierst du den halben Durchmesser, multiplizierst mit π und dann mit der Tiefe. In beiden Fällen innen messen.',
    note: 'Misch 5 bis 10 % mehr an, als das Ergebnis sagt. Am Becher und am Rührstab bleibt mehr hängen als gedacht, und wer mitten im Guss nachmischen muss, sieht später die Linie, an der die zweite Portion auf die erste traf. Jedes Harz hat außerdem eine maximale Gießhöhe, meist 5 bis 10 mm: eine tiefe Form wird in Lagen gegossen, teil dieses Gewicht also durch die Zahl der Lagen.',
  },
  'resin-mix': {
    title: 'Epoxidharz: Mischverhältnis A zu B',
    desc: 'Ein Gesamtgewicht Harz in Komponente A und B aufteilen.',
    long: 'Ein Harz mit 2 : 1 teilt die Gesamtmenge in drei Teile — zwei Harz, einen Härter —, aus 220 g werden also 146,7 g A und 73,3 g B. Das Verhältnis hier ist ein Gewichtsverhältnis. Hersteller drucken regelmäßig beide auf die Flasche, 2 : 1 nach Volumen neben 100 : 45 nach Gewicht: auf der Waage gilt die Angabe nach Gewicht.',
    note: 'Falsch dosiertes Harz härtet nicht aus. Mehr Härter macht es nicht härter; es bleibt klebrig, oder die Wärme staut sich und es reißt. Nimm eine Waage, die 0,1 g anzeigt, und misch bei kleinen Güssen unter etwa 20 g bewusst etwas mehr an, weil der Wiegefehler dort schwerer wiegt als das Harz. Umgießen in einen zweiten Becher verschiebt das Verhältnis um alles, was im ersten bleibt.',
  },
  'resin-pigment': {
    title: 'Epoxidharz: Pigment dosieren',
    desc: 'Aus Harzgewicht und Pigmentanteil die Gramm Farbe.',
    long: 'Der Pigmentanteil bezieht sich auf die gemischte Gesamtmenge, Harz plus Härter. Drei Prozent von 220 g sind 6,6 g. Mica-Pulver deckt schon bei 1 bis 3 % kräftig, flüssige Farbstoffe färben mit ein paar Tropfen, also etwa einem halben Prozent — soll das Stück durchscheinend bleiben, bleib unter 0,5 %.',
    note: 'Zu viel Pigment stoppt die Aushärtung. Etwa 6 % der Gesamtmenge sind die praktische Grenze, darüber stört die Farbe die Reaktion und die Oberfläche bleibt klebrig. Gib die Farbe erst dazu, wenn A und B vollständig verbunden sind — färbst du vorher, siehst du nicht mehr, ob die beiden Komponenten wirklich gemischt sind. Wasserhaltige Farben wie Aquarell oder Acryl trüben das Harz und verzögern die Aushärtung.',
  },
  'silicone-mould': {
    title: 'Silikonform: Silikonmenge berechnen',
    desc: 'Das Modell vom Kastenvolumen abziehen und so das Silikon finden.',
    long: 'Das Silikon ist alles, was das Modell nicht füllt. Am verlässlichsten bekommst du das Volumen des Modells über die Verdrängung: leg es in einen randvollen Becher Wasser und miss, was überläuft. Ein Kasten mit 500 mL um ein Modell mit 120 mL braucht 380 mL Silikon, bei einer Dichte von 1,15 also 437 g. Miss den Kasten innen — Breite × Tiefe × Höhe in Zentimetern sind Milliliter.',
    note: 'Lass zwischen Modell und Wand mindestens einen Zentimeter Silikon. Dünne Wände lassen die Form aufklappen, das Harz läuft aus, und nach ein paar Güssen reißt sie. Silikon wird ebenfalls aus zwei Komponenten gemischt: schick dieses Gewicht durch den Rechner für das Mischverhältnis und gib 5 % für das dazu, was im Becher bleibt — ein Silikonguss, der auf halber Höhe fortgesetzt wird, spaltet sich an der Nahtstelle.',
  },

  /* ───────── Perlen und Verpackung ───────── */
  'bead-count': {
    title: 'Perlenanzahl für eine Kette',
    desc: 'Wie viele Perlen eine Kette füllen — aus Länge und Perlendurchmesser.',
    long: 'Eine Perle nimmt auf dem Faden ihren eigenen Durchmesser ein, die Kettenlänge geteilt durch den Durchmesser ist also die Anzahl. Auf 45 cm gehen 56 Perlen von 8 mm, das füllt 44,8 cm. Sitzen Zwischenteile oder Knoten dazwischen, trag den Abstand in das Feld für die Zugabe ein — der Abstand von Perle zu Perle wird dann Durchmesser plus Zugabe.',
    note: 'Die Division rundet ab: halbe Perlen gibt es nicht, und die letzten Millimeter landen beim Verschluss. Zieh vorher 1 bis 2 cm für Verschluss und Klemmperlen von der Länge ab. Angegebene Durchmesser sind Nennmaße, und Naturstein schwankt von Perle zu Perle, rechne also damit, dass es am Ende eine oder zwei mehr oder weniger sind.',
  },
  'bead-weight': {
    title: 'Perlengewicht berechnen',
    desc: 'Die Zahl der Perlen mit dem Gewicht einer Perle multiplizieren.',
    long: 'Sobald du weißt, was eine Perle wiegt, bleibt eine Multiplikation: runde Glasperlen mit 8 mm liegen bei etwa 0,6 g, 100 davon sind also 60 g. Eine einzelne Perle zeigt die Küchenwaage als 0,0 g, wieg deshalb zwanzig und teil durch zwanzig — so kommst du genau an das Gewicht je Perle. Die zweite Zeile zeigt, wie viele Perlen in einem 100-g-Beutel stecken.',
    note: 'Perlen werden meist nach Gewicht statt nach Stückzahl verkauft, das Beutelgewicht in Perlen zurückzurechnen ist also der einzige Weg zu wissen, ob es für das Muster reicht. Dieselben 8 mm können zwischen Glas, Acryl und Metall um das Dreifache auseinanderliegen, wieg beim Materialwechsel neu. Im Beutelgewicht stecken außerdem Staub und Bruch.',
  },
  'wire-length-wrap': {
    title: 'Drahtlänge fürs Wickeln',
    desc: 'Wie viel Draht eine bestimmte Zahl Windungen um einen Dorn braucht.',
    long: 'Um einen Dorn oder eine Perle gewickelter Draht folgt einem Kreis, den seine eigene Mittellinie zieht, und dessen Durchmesser ist Dorn plus Draht. Fünf Windungen mit 0,8 mm Draht auf einem 8-mm-Dorn brauchen 138 mm. Der gewickelte Abschnitt ist Windungen × Drahtstärke hoch, hier 4 mm — der Wert, den du beim Anpassen einer Öse prüfst.',
    note: 'Schneide an beiden Enden 2 bis 3 cm mehr ab. Ohne ein Stück zum Greifen mit der Zange kannst du die letzte Windung nicht festziehen, und beim Festziehen dehnt sich der Draht ein wenig. Kräftiger Draht ab 0,8 mm (20 Gauge) lässt sich mit der Hand kaum sauber wickeln, echte Spiralen fallen deshalb lockerer aus als die Rechnung.',
  },
  'jump-ring': {
    title: 'Biegeringe berechnen',
    desc: 'Aus Dorn- und Drahtdurchmesser die Zahl der Ringe und den Draht je Ring.',
    long: 'Ein Biegering ist ein Kreis, und der Durchmesser seiner Mittellinie ist Dorn plus Draht. Ein 6-mm-Dorn mit 1 mm Draht braucht 22 mm je Ring, aus einem Meter Draht werden also 45. Als Spirale gewickelt ist sie Ringanzahl × Drahtstärke lang — 45 Ringe sind eine 45 mm lange Spirale, und daran entscheidest du, wie lang der Dorn sein muss, wenn du erst wickelst und dann schneidest.',
    note: 'Dorn geteilt durch Drahtstärke ist das Seitenverhältnis, kurz AR. Unter etwa 4 lässt sich der Ring nicht mehr sauber schließen, und Chainmaille-Muster geben ein AR vor: eine der beiden Stärken allein zu ändern zerlegt das Geflecht. Jeder Schnitt kostet zusätzlich die Breite des Sägeblatts, die echte Ausbeute liegt einen oder zwei Ringe darunter.',
  },
  'macrame-cord': {
    title: 'Makramee: Garnlänge berechnen',
    desc: 'Schnurlänge je Strang und insgesamt aus der geknoteten Strecke.',
    long: 'Knoten fressen Schnur. Für Kreuzknoten gilt die Regel vom Vierfachen der fertigen Länge, eine geknotete Strecke von 30 cm heißt also 120 cm je Schnur; acht Schnüre kommen auf 9,6 m. Eine Schnur, die über einen Ring gelegt wird, verliert die Hälfte an die Faltung — die schneidest du achtfach.',
    note: 'Der Faktor hängt am Knoten: vier beim Kreuzknoten, sechs und mehr bei der Spirale, bis zu acht bei dichten Mustern. Dickere Schnur frisst beim gleichen Knoten mehr, ein kurzes Probestück zu knoten und nachzumessen ist der verlässliche Weg zum Faktor. Zu kurze Schnur lässt sich mitten im Stück nicht anstückeln — du fängst neu an.',
  },
  'ribbon-length': {
    title: 'Geschenkband: Länge berechnen',
    desc: 'Band für eine Kreuzschleife aus Kartonmaßen und Zugabe für die Schleife.',
    long: 'Ein Kreuz führt zweimal um den Karton — einmal quer, einmal längs — und auf jeder Runde zählt die Höhe zweimal. Ein Karton von 20 × 15 × 8 cm braucht 102 cm für die beiden Runden, plus 30 cm für die Schleife, also 132 cm.',
    note: 'Die Zugabe für die Schleife entscheidet die Antwort: eine von Hand gebundene Schleife will 25 bis 35 cm, eine große Dekoschleife über 60 cm. Schmales Band bindet kleiner und braucht weniger. Satin franst an der Schnittkante, lass also einen Zentimeter, um sie schräg nachzuschneiden.',
  },
  'giftwrap-size': {
    title: 'Geschenkpapier: Größe berechnen',
    desc: 'Welches Blatt ein Karton braucht, Überlappung eingerechnet.',
    long: 'Eine Richtung muss ganz um den Karton herum, sie ist also (Breite + Höhe) × 2 plus die Überlappung — bei einem Querschnitt von 20 × 8 cm sind das 59 cm. Die andere Richtung ist die Tiefe plus genug zum Einschlagen an beiden Enden, etwa drei Viertel der Höhe je Seite, also Tiefe plus 1,5 × Höhe: 30 cm. Diese beiden Zahlen sind das Blatt, das du zuschneidest.',
    note: 'Geschenkpapier kommt auf Rollen mit fester Breite, meist um 70 cm. Liegt das kleinere Maß über der Rollenbreite, musst du den Karton drehen oder zwei Bahnen zusammensetzen. Gerichtete Muster lassen sich nicht drehen, prüf die Rollenbreite also vor dem Kauf. Genau auf Kante geschnitten sieht schlechter aus, als 2 cm zum Umschlagen zu lassen.',
  },
  'clay-weight': {
    title: 'Modelliermasse: Menge berechnen',
    desc: 'Volumen und Dichte der Masse in das Gewicht umrechnen, das du kaufst.',
    long: 'Modelliert wird nach Volumen, gekauft nach Gewicht. Polymer Clay liegt bei etwa 1,7 g/cm³, ein Stück von 60 cm³ braucht also 102 g — zwei der üblichen 57-g-Blöcke. Lufttrocknende Masse ist leichter, 1,2 bis 1,5, dasselbe Volumen wiegt also weniger, aber sie verliert beim Trocknen Wasser und schwindet um über 10 %, was du von Anfang an einrechnen musst.',
    note: 'Ein Kern aus Alufolie senkt das Gewicht der Masse um mehr als die Hälfte — und dicker Polymer Clay härtet innen nicht gleichmäßig durch, er reißt beim Abkühlen. Große Stücke bekommen einen Kern, damit sie nicht reißen, nicht nur zum Sparen. Blockgewichte unterscheiden sich je Marke: Fimo 57 g, Fimo Professional 85 g.',
  },

  /* ───────── Stricken: Länge, Größe, Garntausch ───────── */
  'row-gauge-length': {
    title: 'Reihenprobe: Reihen berechnen',
    desc: 'Aus der Reihenprobe und der Wunschlänge die Zahl der Reihen.',
    long: '28 Reihen auf 10 cm sind 2,8 pro Zentimeter, 60 cm sind also 168 Reihen — genau 21 Rapporte eines 8-Reihen-Musters. Verlangst du 63 cm, kommen 176,4 heraus; Reihen lassen sich nicht teilen, also 176, und die messen 62,9 cm. Der Millimeter fällt nicht auf, der zerbrochene Rapport schon.',
    note: 'Die Reihenprobe weicht stärker ab als die Maschenprobe. Glatt rechts und Alpaka längen sich unter dem eigenen Gewicht, häng die gespannte Maschenprobe also auf, bevor du misst — das kommt dem fertigen Teil näher.',
  },
  'yarn-substitute': {
    title: 'Alternativgarn: Knäuel umrechnen',
    desc: 'Wie viele Knäuel eines Ersatzgarns eine Anleitung braucht.',
    long: 'Beim Garntausch stimmst du die Länge ab, nicht das Gewicht. Eine Anleitung mit acht 50-g-Knäueln eines Garns von 400 m je 100 g verlangt 1.600 m. Ein Ersatzgarn mit 320 m je 100 g trägt nur 160 m im Knäuel, du brauchst also zehn — kaufst du dieselben acht, fehlen 320 m.',
    note: 'Gleiche Länge heißt nicht gleiche Dicke. Zwei Garne mit denselben Metern je 100 g fallen völlig anders, sobald eines Alpaka und das andere Baumwolle ist: stricke mit dem Alternativgarn erst eine Maschenprobe. Hat es eine andere Knäuelgröße, teile die Gesamtmeter von oben direkt durch die Zahl auf seiner Banderole.',
  },
  'sweater-ease': {
    title: 'Mehrweite für Pullover berechnen',
    desc: 'Fertiger Umfang und Maschenzahl aus Brustumfang und Mehrweite.',
    long: 'Die Größe eines Kleidungsstücks ist Körpermaß plus Mehrweite, nicht das Körpermaß. Acht Prozent auf 96 cm Brustumfang ergeben einen fertigen Umfang von 103,7 cm, bei 22 Maschen auf 10 cm sind das 228 Maschen. Setz die Mehrweite auf −5 %, und es werden 91,2 cm, also anliegend — Maschenware dehnt sich, negative Mehrweite ist deshalb eine echte Wahl.',
    note: 'Die Größentabelle einer Anleitung nennt meist den fertigen Umfang, nicht den Körper, für den er gedacht ist. Wer beides vermischt, liegt eine ganze Größe daneben. Mehrweite fällt außerdem je Stelle anders aus: ein Pullover mit 8 cm an der Brust will am Oberarm selten mehr als 4 cm.',
  },
  'sock-cast-on': {
    title: 'Sockenanschlag berechnen',
    desc: 'Anschlagmaschen für Socken aus Fußumfang, Maschenprobe und negativer Mehrweite.',
    long: 'Zieh 10 % von 22 cm Fußumfang ab, und du strickst auf 19,8 cm — bei 30 Maschen auf 10 cm sind das 59,4 Maschen. Runde auf 60, ein Vielfaches von vier. Die Vier zählt doppelt: ein 2×2-Rippenmuster wiederholt sich über vier Maschen, und Fußrücken und Sohle müssen sich genau halbieren (30 und 30), damit Fersenwand und Zwickel symmetrisch werden.',
    note: 'Negative Mehrweite ist bei Socken keine Option. Strickst du auf den gemessenen Umfang, legt sich die Socke unter dem Fuß in Falten und rutscht von der Ferse. Miss die Maschenprobe außerdem in Runden — dasselbe Garn auf denselben Nadeln gibt flach gestrickt eine andere Zahl.',
  },
  'stripe-repeat': {
    title: 'Streifenrapport berechnen',
    desc: 'Wie viele ganze Streifenrapporte hineingehen und wie viele Reihen übrig bleiben.',
    long: '160 Reihen mit einem 12-Reihen-Rapport geben 13 Rapporte (156 Reihen) und 4 Restreihen. Entscheidend ist, wohin diese 4 Reihen gehen. Verteilst du sie einzeln, wird ein Streifen sichtbar dicker als die übrigen. Setz sie gesammelt dorthin, wo schon etwas anderes unterbricht — direkt über das Bündchen oder unter die Achsel — und niemand findet sie.',
    note: 'Eine ungerade Reihenzahl je Rapport lässt einen zweifarbigen Streifen jedes Mal am anderen Ende beginnen und zwingt dich, das Garn abzuschneiden. Bleibt der Rapport gerade, kannst du die ruhende Farbe am Rand mitführen, und die Zahl der zu vernähenden Fäden halbiert sich.',
  },
  'colorwork-yardage': {
    title: 'Garnmenge für Farbmuster aufteilen',
    desc: 'Eine gesamte Garnmenge in Gramm je Farbe aufteilen.',
    long: 'Ein Teil, das 400 g frisst, teilt sich bei 70 % Hauptfarbe in 280 g und 120 g. Den Prozentsatz holst du aus der Strickschrift: zähl die Kästchen jeder Farbe in einem Rapport, und das ist das Verhältnis, solange das Muster läuft. Glatte Flächen und Bündchen gehen vollständig auf die Hauptfarbe.',
    note: 'Die Nebenfarbe landet selten auf dem Wert der Strickschrift. Auf der Rückseite mitgeführte Fäden brauchen mehr Länge als die Maschen auf der Vorderseite, und das Garn, das du als dominante Farbe hältst, macht etwas größere Maschen und reicht weniger weit. Kauf ein Knäuel Kontrastfarbe zusätzlich — eine ausverkaufte Färbepartie nachzukaufen ist der Engpass, der sich am schlechtesten beheben lässt.',
  },
  'yarn-per-row': {
    title: 'Garnverbrauch pro Reihe',
    desc: 'Meter Garn, die eine Reihe frisst, und wie viele Reihen der Rest noch trägt.',
    long: 'Eine Banderole mit 200 m je 50 g bedeutet 4 m je Gramm. Hat eine 12-g-Maschenprobe 40 Reihen gebraucht, sind 48 m in 40 Reihen gegangen, eine Reihe ist also 1,2 m. Die 60 g Rest sind 240 m und tragen weitere 200 Reihen. Am genauesten wird es, wenn du das angefangene Teil wiegst, zehn Reihen strickst und noch einmal wiegst — dann stimmt die Maschenzahl je Reihe schon mit der Wirklichkeit.',
    note: 'Die Meter je Reihe wachsen mit den Maschen dieser Reihe. Überträgst du 1,2 m aus einer 40-Maschen-Probe direkt auf einen Körper mit 200 Maschen, liegst du um das Fünffache darunter — multipliziere mit dem Verhältnis der Maschenzahlen. Anschlag, Nähte und Versäubern stecken nicht in diesem Wert.',
  },
  'blanket-size': {
    title: 'Deckengröße berechnen',
    desc: 'Deckenmaße und Anschlagmaschen aus Matratzengröße und Überhang.',
    long: 'Eine Decke wird nicht so groß wie die Matratze, sondern wie die Matratze plus dem Überhang an den Seiten. Die Breite nimmt den Überhang zweimal, an jeder Seite einmal; die Länge nur einmal, am Fußende, weil die Oberkante vor den Kissen endet. Auf einem Bett von 150 × 200 cm mit 25 cm Überhang sind das 200 × 225 cm, und bei 16 Maschen auf 10 cm ein Anschlag von 320 Maschen.',
    note: '200 cm Maschen zu halten braucht ein Rundnadelseil von 100 cm oder mehr, und sobald das fertige Stück ein Kilo überschreitet, längt es sich unter dem eigenen Gewicht — miss die Maschenprobe mit diesem Gewicht im Kopf. Babydecken kommen stattdessen von den Maßen des Beistellbetts oder der Babyschale: dort darf nichts überhängen.',
  },

  /* ───────── Nähen: Verschlüsse, Falten, Saum ───────── */
  'zipper-length': {
    title: 'Reißverschlusslänge berechnen',
    desc: 'Welche Reißverschlussgröße eine Öffnung braucht, aufgerundet auf eine erhältliche.',
    long: 'Eine Öffnung von 22 cm plus 2 cm Zugabe oben und unten braucht 24 cm — und einen Reißverschluss mit 24 cm verkauft niemand. Die metrischen Größen springen in Schritten von 10 · 12 · 15 · 18 · 20 · 23 · 25 · 30 · 35 · 40 · 45 · 50 · 55 · 60 · 70 · 80 · 90 cm, du kaufst also den mit 25. Läden, die in Zoll verkaufen, führen 4 · 5 · 7 · 9 · 12 · 14 · 16 · 18 · 20 · 22 · 24 Zoll.',
    note: 'Die angegebene Länge misst die Zahnreihe, die der Schieber durchläuft, nicht das Band, das an beiden Enden darüber hinausgeht. Lang kaufen und kürzen geht nur bei Spiralreißverschlüssen: schneide die Zähne eines Metall- oder Vislon-Verschlusses ab, und der Schieber springt heraus — bei einem teilbaren Verschluss lässt sich das untere Ende gar nicht anfassen.',
  },
  'buttonhole-spacing': {
    title: 'Knopflochabstand berechnen',
    desc: 'Gleichmäßiger Abstand der Knopflöcher auf einer Knopfleiste.',
    long: 'Auf einer Knopfleiste von 60 cm mit je 2 cm frei an den Enden belegen die Knopflöcher 56 cm. Sechs Knöpfe teilen diese Strecke durch fünf, nicht durch sechs: das erste und das letzte Loch sitzen an den Enden, es gibt also nur fünf Zwischenräume. Das sind 56 ÷ 5 = 11,2 cm. Teilst du stattdessen durch sechs, kommen 9,3 cm heraus, und das letzte Loch bleibt weit vor dem Ende hängen.',
    note: 'Bei einer Bluse setzt du zuerst ein Knopfloch auf die stärkste Stelle der Brust und verteilst die übrigen von dort — gleichmäßige Teilung allein lässt genau diesen Punkt zwischen zwei Löchern, und dort klafft der Verschluss. Das Loch selbst muss außerdem so lang sein wie Knopfdurchmesser plus Knopfdicke.',
  },
  'pleat-fabric': {
    title: 'Stoff für Falten berechnen',
    desc: 'Stoffbreite für eine gefaltete Bahn aus Fertigbreite und den Falten.',
    long: 'Gerechnet wird in Messerfalten. Eine Messerfalte verbraucht das Dreifache ihrer Tiefe, aber eines dieser drei ist die sichtbare Fläche, die in der Fertigbreite schon steckt — zusätzlich musst du also je Falte die doppelte Tiefe zugeben. Eine fertige Bahn von 50 cm mit zehn Falten von 4 cm wird auf 50 + 10 × 8 = 130 cm zugeschnitten. Legst du sie so dicht, dass die sichtbare Fläche der Tiefe entspricht, passen 12,5 Falten hinein und der Stoff ist mit 150 cm genau das Dreifache der Fertigbreite: daher kommt der Satz, Messerfalten bräuchten dreimal die Tiefe. Kellerfalten legen sich nach beiden Seiten und nehmen bei gleicher Tiefe das Vierfache.',
    note: 'Falten werden gefaltet in die Bundnaht gesteppt, dort stapeln sich also drei Lagen Stoff. In Denim oder Tweed musst du Tiefe oder Anzahl verringern, bevor die Nadel durchgeht. Bei bedrucktem Stoff stimm die Tiefe auf den Musterrapport ab, sonst zerschneiden die Falten das Muster.',
  },
  'hem-allowance': {
    title: 'Saumzugabe berechnen',
    desc: 'Zuschnittlänge aus Fertiglänge, Saumbreite und der Zahl der Umschläge.',
    long: 'Die Zahl der Umschläge ist die Zahl der Male, die der Stoff ausgegeben wird. Ein doppelter Umschlag (2) legt dieselbe Breite zweimal nach oben, um die Schnittkante einzuschließen: eine Fertiglänge von 70 cm mit 2 cm Saum wird auf 70 + 2 × 2 = 74 cm zugeschnitten. Versäuberst du die Kante und schlägst nur einmal um (1), genügen 72 cm. Anders als bei der Nahtzugabe sitzt ein Saum nur an einem Ende, hier wird also nichts für die Gegenkante verdoppelt.',
    note: 'Bei einem gerundeten Saum hat der Überschuss keinen Platz, sobald der Umschlag tief wird: innen legt sich der Stoff in Wellen. Halte den Saum eines A-Linien-Rocks unter 1 cm oder fass ihn mit Schrägband ein. Maschenware will das Gegenteil — einen tiefen Saum und Zwillingsnadel oder Zickzack, damit die Naht mitgeht.',
  },
  'dart-intake': {
    title: 'Abnäher berechnen',
    desc: 'Wie viel jeder Abnäher aufnimmt — aus der Differenz zweier Umfänge.',
    long: 'Die 20 cm zwischen 96 cm Brust- und 76 cm Taillenumfang müssen die Abnäher schlucken. Vier davon — zwei vorn, zwei hinten — nehmen je 5 cm, und weil ein Abnäher zu beiden Seiten seiner Mittellinie aufgeht, wird jeder Schenkel 2,5 cm nach außen angezeichnet. Diese 2,5 cm sind die Linie, die du wirklich auf das Schnittteil zeichnest.',
    note: '20 cm auf vier Abnäher zu teilen heißt nicht vier gleiche Abnäher. Die stärker gewölbte Seite nimmt mehr, 6 cm vorn und 4 cm hinten ist die übliche Aufteilung. Sobald ein einzelner Abnäher etwa 4 cm überschreitet, beult seine Spitze — dann helfen zwei kleinere nebeneinander.',
  },
  'fabric-nap-layout': {
    title: 'Stoff mit Strichrichtung berechnen',
    desc: 'Stofflänge, wenn alle Teile in dieselbe Richtung liegen müssen.',
    long: 'Samt, Cord, aufgeraute Stoffe und einseitig gerichtete Drucke brauchen alle Teile gleich ausgerichtet, sonst wechselt die Farbe von Teil zu Teil. Sechs Teile von 40 × 50 cm stehend auf 110 cm Stoff passen zwei nebeneinander in drei Reihen, also 150 cm. Quer gelegt passen ebenfalls zwei nebeneinander (110 ÷ 50) in drei Reihen, aber jede Reihe ist nur 40 cm lang, also genügen 120 cm — und diese 30 cm kann ein Stoff mit Strichrichtung nicht für sich beanspruchen. Der Rechner für den Stoffverbrauch geht davon aus, dass du Teile drehen darfst, und nennt deshalb weniger.',
    note: 'Samt wirkt dunkler, wenn der Strich nach oben läuft, und heller, wenn er nach unten läuft; beides ist in Ordnung, solange das ganze Teil sich einig ist. Ein großer, sich wiederholender Druck kostet noch mehr, weil jedes Teil bis zu einen ganzen Rapport zusätzliche Länge braucht, damit das Muster in den Nähten trifft.',
  },
  'sewing-thread-length': {
    title: 'Nähgarnlänge berechnen',
    desc: 'Wie viel Nähgarn eine Naht frisst und wie viele Spulen das sind.',
    long: 'Beim Geradstich verschlingen sich Ober- und Unterfaden im Stoff, es geht also weit mehr Garn hinein, als die Naht lang ist. Beim Faktor 2,5 nimmt eine Naht von 200 cm 500 cm, also 5 m. Feiner zu nähen ändert diese Summe kaum, denn doppelt so viele Stiche verbrauchen je halb so viel Garn. Was die Stichdichte (200 × 4 = 800 Stiche) wirklich festlegt, ist die Festigkeit der Naht und die Zahl der Löcher im Stoff.',
    note: 'Der Faktor steigt mit der Dicke. Dünner Stoff im Geradstich liegt bei etwa 2,5, mehrere Lagen Denim über 3, und eine 4-Faden-Overlock läuft mit dem 12- bis 18-Fachen der Nahtlänge, weil ihr Garn den Stoff außen umschlingt statt innen zu verschlingen. Auch die Meterangabe auf der Spule ist ein Nennwert, und die letzten Meter sind oft zu locker gewickelt, um sie zu vernähen.',
  },
  'sticker-sheet-yield': {
    title: 'Etiketten pro Bogen berechnen',
    desc: 'Wie viele Etiketten auf einen Bogen passen, beide Ausrichtungen verglichen.',
    long: 'Auf A4 (21 × 29,7 cm) lässt ein Rand von 0,5 cm rundherum 20 × 28,7 cm zum Arbeiten. Setzt du Etiketten von 5 × 3 cm mit 0,2 cm Abstand, ergibt das quer (20 + 0,2) ÷ (5 + 0,2) = 3,88 → 3 und längs (28,7 + 0,2) ÷ (3 + 0,2) = 9,03 → 9, also 27 Etiketten. Ein Abstand wird vor dem Teilen addiert, weil drei Etiketten nur zwei Zwischenräume haben. Dreh die Etiketten um 90°, und es werden 6 quer und 5 längs — 30 Etiketten, drei mehr. Zähl beide Richtungen, bevor du den Bogen anlegst.',
    note: 'Echte Druckerränder unterscheiden sich je Modell und sind an der Einzugskante breiter, ein Rand von null schneidet also stillschweigend die letzte Reihe ab — druck erst einen Testbogen. Schneidet ein Plotter zu, lass mindestens 0,2 cm Abstand für den Klingenweg und schlag die Beschnittzugabe auf das Etikettenmaß, denn die Schnittlinie liegt etwas außerhalb des Etiketts.',
  },

  /* ───────── Quilten: Zwischenstreifen, Bordüren, Precuts ───────── */
  'quilt-sashing': {
    title: 'Quilt-Zwischenstreifen berechnen',
    desc: 'Gesamtlänge der Zwischenstreifen und der Stoff aus Blockanordnung und Streifenbreite.',
    long: 'Vier Blöcke quer, fünf längs, Blöcke von 25 cm mit 6 cm Zwischenstreifen ergeben eine fertige Breite von 4 × 25 + 5 × 6 = 130 cm. Zwischenstreifen (Sashing) gehen als zwei Sorten Teile hinein: die kurzen zwischen den Blöcken kommen auf 5 Reihen × 5 × 25 cm = 625 cm, die langen Bahnen zwischen den Reihen und an Ober- und Unterkante auf 6 × 130 cm = 780 cm, zusammen also 1.405 cm. Ein Stoff von 107 cm gibt nach dem Abschneiden der Webkante 105 cm her, das sind 14 Streifen und 14 × 6 = 84 cm Stoff zu kaufen.',
    note: 'Die eingegebene Streifenbreite ist die Fertigbreite. Damit 6 cm stehen bleiben, schneide 7,2 cm — zwei Nähte von 1/4 Zoll. Alle kurzen Teile müssen gleich lang sein, und diese Länge ist das Zuschnittmaß des Blocks, nicht sein Fertigmaß, weil die Nahtzugabe an der Blockkante noch da ist.',
  },
  'quilt-border': {
    title: 'Quilt-Bordüre berechnen',
    desc: 'Streifenlängen und Stoff für eine oder zwei Bordüren um einen Quilt.',
    long: 'Auf einem Quilt von 150 × 200 cm braucht eine Bordüre von 6 cm zwei Seitenstreifen von 200 cm und zwei Streifen für oben und unten von 150 + 12 = 162 cm, weil die Seiten schon angesetzt sind — zusammen 724 cm. Eine zweite Bordüre von 10 cm läuft um die nun 162 × 212 cm große Fläche: Seiten von 212 und oben und unten je 182, weitere 788 cm, insgesamt 1.512 cm. Der Quilt endet bei 182 × 232 cm.',
    note: 'Schneidest du die äußere Bordüre auf das Maß ohne die innere, fehlt an jeder Ecke die Breite der inneren Bordüre. Gerechnet wird in der Reihenfolge Seiten zuerst; setzt du oben und unten zuerst an, tausch Breite und Länge. Der Stoff ist mit der Fertigbreite plus zwei Nähten von 1/4 Zoll (1,2 cm) gerechnet — sind die beiden Bordüren aus verschiedenen Stoffen, teile die Streifenzahl auf.',
  },
  'fat-quarter-yield': {
    title: 'Fat Quarter: Zuschnitte berechnen',
    desc: 'Wie viele Teile einer bestimmten Größe aus einem Fat Quarter kommen.',
    long: 'Ein Fat Quarter ist ein geviertelter Yard — 18 × 22 Zoll, etwa 50 × 55 cm. Schneidest du Quadrate von 4,5 Zoll (11,4 cm), gehen vier quer und vier längs, also 16 Quadrate, und 671 cm² bleiben übrig. Ist das Teil nicht quadratisch, kann Drehen mehr hergeben, deshalb werden beide Ausrichtungen gezählt und die bessere angezeigt.',
    note: 'Gib das Zuschnittmaß ein, nicht das Fertigmaß; mit Fertigmaßen fehlt die Nahtzugabe und die Ausbeute fällt zu hoch aus. Fat Quarters werden oft schief geschnitten verkauft, rechne also etwa 1 cm einer Kante als unbrauchbar — passt die Aufteilung nur knapp, kauf ein zweites.',
  },
  'jelly-roll-yield': {
    title: 'Jelly Roll: Quiltgröße berechnen',
    desc: 'Nutzbare Fläche und Fertigmaß aus einer Rolle vorgeschnittener Streifen.',
    long: 'Eine Jelly Roll sind 40 Streifen von 2,5 Zoll (6,4 cm), quer über eine Breite von 42 Zoll (107 cm) geschnitten. Beim Zusammennähen geht an jeder langen Kante 1/4 Zoll verloren, ein Streifen bleibt also 5,2 cm breit und 105,8 cm lang. Nebeneinandergesetzt ergeben 40 davon 208 × 105,8 cm — eine Fläche von 2,2 m².',
    note: 'Einfach aneinandergenäht geben die Streifen eine kurze, breite Bahn von 208 cm. Für ein Bettmaß teilst du sie und setzt sie neu zusammen (104 × 211 cm) oder nähst einen langen Streifensatz und schneidest ihn quer. Je schmaler der Streifen, desto mehr fressen die Nähte: 19 % bei 6,4 cm, 32 % bei 3,8 cm (1,5 Zoll).',
  },
  'mitred-corner': {
    title: 'Gehrungsecke für Bordüren berechnen',
    desc: 'Zuschnittlänge jedes Bordürenstreifens und wo der 45°-Schnitt liegt.',
    long: 'Eine Gehrungsecke ist die Stelle, an der zwei Bordüren wie ein Bilderrahmen im 45°-Winkel zusammentreffen. Damit diese Diagonale entsteht, muss der Streifen an jedem Ende um die Bordürenbreite über die Quiltkante hinausreichen, plus 5 cm Sicherheit. An einer Seite von 150 cm mit 15 cm Bordüre schneidest du 150 + 2 × 20 = 190 cm, markierst 20 cm von jedem Ende und nähst nur zwischen den Markierungen. Die zu schneidende Diagonale misst 15 × √2 = 21,2 cm.',
    note: 'Bis an die Streifenenden durchzunähen macht die Ecke unmöglich zu falten. Näh nur zwischen den beiden Markierungen und verriegle an beiden. Die Diagonale liegt im schrägen Fadenlauf und dehnt sich unter dem Bügeleisen, füg die beiden Streifen also erst im 45°-Winkel zusammen und schneide den Überschuss danach ab — vorher geschnitten lässt sich nicht zurücknehmen.',
  },
  'floss-skeins': {
    title: 'Stickgarn: Stränge berechnen',
    desc: 'Wie viele Stränge du für eine bestimmte Garnlänge kaufen musst.',
    long: 'Ein Strang sind sechs Fäden von 8 m, aufgezogen also 48 m Einzelfaden. Sechzig Meter Bedarf plus 10 % Reserve sind 66 m; geteilt durch 48 ergibt das 1,4, aufgerundet zwei Stränge, mit 30 m Rest für die nächste Vorlage.',
    note: 'Gib die Länge als Einzelfaden ein. Mit zwei Fäden zu sticken verbraucht die doppelte Länge dessen, was du abziehst, nicht die abgezogene Länge. Willst du eine Farbe später nachkaufen, prüf die Färbepartie — dieselbe Nummer aus einer anderen Partie verschiebt sich leicht, und in einer großen ausgefüllten Fläche sieht man den Übergang.',
  },
  'hoop-size': {
    title: 'Stickrahmen: Größe berechnen',
    desc: 'Der kleinste Rahmendurchmesser, in den Motiv und Arbeitsrand passen.',
    long: 'Ein Stickrahmen ist rund und ein Motiv rechteckig, hineinpassen muss also weder die Breite noch die Höhe, sondern die Diagonale. Ein Motiv von 18 × 25 cm mit 2 cm Arbeitsrand wird 22 × 29 cm, und die Diagonale ist √(22² + 29²) = 36,4 cm, also 14,3 Zoll. Wer einen Rahmen mit 8 Zoll (20 cm) wählt, weil das Motiv nur 22 cm breit ist, hat einen Teil davon außerhalb des Rings.',
    note: 'Der Stoff muss den Rahmen an jeder Seite um mindestens 8 cm überragen, damit an der Schraube etwas zu greifen ist. Große Motive arbeitet man meist, indem man den Rahmen umsetzt, statt einen größeren zu kaufen — doch über fertige Stiche geklemmt drückt der Ring sie platt und lässt eine Spur; ein Roll- oder Keilrahmen vermeidet das.',
  },
  'thread-count-convert': {
    title: 'Evenweave: Count umrechnen',
    desc: 'Tatsächliche Stiche pro Zoll und Fertiggröße, wenn du über mehrere Fäden stickst.',
    long: 'Der Count sind Fäden pro Zoll. Aida bündelt seine Fäden zu vier, ein Stich deckt dort einen Block, Leinen und Evenweave werden dagegen normalerweise über zwei Fäden gestickt. Über zwei Fäden gearbeitet ergeben 28 Count tatsächlich 14 Stiche pro Zoll, eine Vorlage von 100 × 140 Stichen wird also 18,1 × 25,4 cm groß — genauso groß wie auf 14-Count-Aida. Der Maßstab von 200 % heißt, dass das Motiv doppelt so groß wird wie über einen Faden gestickt.',
    note: 'Ob die „28 Count“ einer Anleitung schon tatsächliche 14 meinen, unterscheidet sich von Entwerferin zu Entwerferin; eine Fertiggröße, die halb oder doppelt herauskommt, hat fast immer hier ihre Ursache. Über einen Faden zu sticken (Petit Point) macht winzige Stiche, die die Augen ermüden, und Rückstichlinien wandern schräg, weil das Gewebe sie zieht.',
  },

  /* ───────── Kerzen: Nachguss, Farbe, Mischung, Preis ───────── */
  'wax-topup': {
    title: 'Zweiter Guss: Wachs berechnen',
    desc: 'Menge für den Nachguss und das Wachs, das du insgesamt schmilzt.',
    long: 'Soja sinkt beim Erstarren rund um den Docht ein und lässt ein Loch in der Oberfläche. Ein erster Guss von 180 g mit 10 % Schwund braucht 18 g zum Auffüllen, schmilz also von Anfang an 198 g. Wie stark es schwindet, hängt vom Wachs, vom Gefäß und davon ab, wie schnell es abkühlt — dasselbe Wachs verhält sich in Glas anders als in einer Dose.',
    note: 'Gieß nach, wenn die erste Schicht erstarrt ist, und zwar 5 bis 10 °C kühler als beim ersten Mal. Heiß gegossenes Wachs schmilzt die Schicht darunter wieder an und sinkt erneut ein. Den Rest im Topf wieder aufzuheizen treibt den Duft aus, es ist also besser, die Menge für den zweiten Guss getrennt beiseitezustellen.',
  },
  'candle-dye-load': {
    title: 'Kerzenfarbe dosieren',
    desc: 'Farbmenge aus Wachsgewicht und Farbanteil, mit dem Gesamtanteil der Zusätze.',
    long: 'Farbe liegt normalerweise bei 0,1 bis 1 % des Wachsgewichts. Ein halbes Prozent von 500 g sind 2,5 g — ein fingernagelgroßes Stück eines Farbblocks. Kommen 8 % Duftöl dazu, trägt das Wachs insgesamt 8,5 %, und mit dieser Summe ist die vom Hersteller angegebene Höchstmenge zu vergleichen.',
    note: 'Farbe und Duftöl teilen sich denselben Platz im Wachs. Die Farbe zu vertiefen, während das Duftöl schon am Maximum liegt, lässt Öl an der Oberfläche ausschwitzen oder verstopft den Docht. Nimm keine Wachsmalstifte — ihre Pigmentteilchen lösen sich nicht und ersticken den Docht. Gefärbtes Wachs wird beim Erstarren einen Ton heller, beurteile die Farbe also kalt, nicht flüssig.',
  },
  'wax-blend': {
    title: 'Wachse mischen: Verhältnis berechnen',
    desc: 'Ein Gesamtgewicht Wachs im gewählten Verhältnis auf zwei Wachse aufteilen.',
    long: 'Ein hartes mit einem weichen Wachs zu mischen stimmt die Eigenschaften ab. Ein Kilo im Verhältnis 7 : 3 sind 700 g A und 300 g B. Gibst du 10 bis 30 % Paraffin oder Bienenwachs in ein Container-Soja, wird die Oberfläche glatter und der Duft hält länger, doch Bienenwachs hebt den Schmelzpunkt, was meist eine Dochtstärke mehr bedeutet.',
    note: 'Eine Mischung liegt zwischen ihren beiden Wachsen, auch wenn Werte wie der Schmelzpunkt nicht linear mitgehen. Steht das Verhältnis, gieß eine Kerze, lass sie zwei Tage reifen und brenn sie ab — jede Änderung der Mischung braucht einen neuen Dochttest. Soja und Paraffin erstarren unterschiedlich schnell, an der Grenze kann es also fleckig werden.',
  },
  'layer-pour': {
    title: 'Schichtkerze: Wachs je Schicht',
    desc: 'Wachs je Schicht und je Kerze für einen Guss in mehreren Schichten.',
    long: 'Ein Gefäß mit 200 mL zu 90 % gefüllt hält 180 mL, also 162 g Wachs. Auf drei Schichten verteilt sind das je 60 mL und 54 g. Für ungleiche Schichten nimm diesen Wert und leg je Schicht ein Verhältnis darauf — eine dickere untere Schicht setzt das optische Gewicht nach unten und wirkt ruhiger.',
    note: 'Gieß die nächste Schicht, wenn die Oberfläche darunter so weit erstarrt ist, dass ein Finger keine Spur hinterlässt. Auf eine weiche Schicht gegossen verlaufen die Farben; auf eine ganz kalte gegossen verbinden sich die Schichten nicht und spalten beim Brennen. Unterschiedliche Düfte je Schicht sind eine schlechte Idee — der Brand wärmt die Schichten darunter mit und mischt sie ohnehin.',
  },
  'container-fill-height': {
    title: 'Kerze: Füllhöhe berechnen',
    desc: 'Wie hoch ein Wachsgewicht in einem Gefäß mit bekanntem Innendurchmesser steht.',
    long: '180 g durch eine Dichte von 0,9 geteilt ergeben 200 mL, und ein Innendurchmesser von 7 cm hat eine Grundfläche von 38,5 cm², das Wachs steht also 5,2 cm hoch. Diese Höhe vor dem Gießen zu kennen ist der Weg, um zu prüfen, ob der Dochtteller bedeckt ist und die Füllung unter der Oberkante des Etiketts bleibt.',
    note: 'Dochtteller sind 3 bis 6 mm dick; steht das Wachs flacher, liegt der Teller frei und leitet die letzte Hitze in den Glasboden. Ein sich nach unten verjüngendes Gefäß füllt höher als dieser Wert, und wer bei einem eckigen Gefäß eine Kantenlänge statt eines Durchmessers eingibt, liest zu niedrig. Setz das Etikett unter die Wachslinie — ein Etikett oberhalb der Oberfläche löst sich, wenn die Kerze warm wird.',
  },
  'fragrance-max': {
    title: 'Höchsten Duftölanteil berechnen',
    desc: 'Die Duftölgrenze eines Wachses und der Spielraum, den dein geplanter Anteil lässt.',
    long: 'Gibt das Wachs 10 % als Höchstmenge an, können 500 g davon 50 g Öl tragen. Mit 8 % geplant kommen 40 g hinein, und 10 g Spielraum bleiben. Dieser Spielraum ist nicht dem Duftöl allein vorbehalten — Farbe und alle weiteren Zusätze teilen sich dieselbe Menge.',
    note: 'Ein negativer Spielraum heißt, die Grenze ist schon überschritten. Öl darüber bindet nicht: es schwitzt aus der erstarrten Oberfläche oder sammelt sich am Boden, und es zieht in den Docht und gibt eine übergroße Flamme. Riecht die Kerze auch an der Höchstmenge schwach, liegt die Antwort beim Öl, bei der Eingießtemperatur oder bei der Reifezeit statt beim Prozentsatz — Soja braucht ein bis zwei Wochen, bis der Duft trägt.',
  },
  'candle-price': {
    title: 'Kerzenpreis kalkulieren',
    desc: 'Verkaufspreis aus einer Zielmarge, und die Marge, die ein gewählter Preis wirklich gibt.',
    long: 'Die Marge wird am Verkaufspreis gemessen. Um auf Materialkosten von 4.000 60 % zu behalten, ist der Preis 4.000 ÷ (1 − 0,6) = 10.000. Stattdessen 60 % auf die Kosten zu legen ergibt 6.400, und das ist eine Marge von 37,5 %, nicht von 60 %. Für 9.000 verkauft bleiben 5.000 Gewinn und eine Marge von 55,6 %.',
    note: 'In dieser Zahl steckt nur Material. Misslungene Güsse, Verpackung und Füllmaterial, Porto, Plattformgebühren (üblich 3 bis 10 % vom Preis) und die Stunden für Fotos und Etiketten liegen alle außerhalb. Verkaufst du auch im Großhandel, muss der Großhandelspreis mindestens das Doppelte dieser Materialkosten sein, damit der Verkaufspreis im Laden hält.',
  },
  'candles-from-wax': {
    title: 'Wie viele Kerzen aus dem Wachs?',
    desc: 'Wie viele Kerzen einer bestimmten Größe eine Menge Wachs ergibt.',
    long: 'Nimm einen Beutel mit 5 kg, verlier 5 % an Topf und Gießkännchen, und 4.750 g werden wirklich gegossen. Bei 180 g je Stück sind das 26 Kerzen mit 70 g Rest. Nimm die 70 g in den nächsten Ansatz oder gieß sie als Wachsmelt — etwas weniger als eine Kerze bleibt jedes Mal übrig.',
    note: 'Duftöl steckt nicht in dieser Zählung. Es kommt auf das Wachsgewicht obendrauf, verringert die Zahl der Kerzen also nicht, kostet aber getrennt. Der Verlustanteil hängt von der Ansatzgröße ab: 5 % sind großzügig, wenn du 5 kg auf einmal schmilzt, doch zehnmal 500 g lassen denselben Rest zehnmal zurück und drücken über 10 %.',
  },

  /* ───────── Seife und Harz: Mischungen, Wasser, Reifezeit ───────── */
  'multi-oil-lye': {
    title: 'Seifenrechner für mehrere Öle',
    desc: 'Drei Öle mit eigenem SAP-Wert eingeben und die Laugenmenge der Mischung erhalten.',
    long: 'Ein gemischtes Rezept muss Öl für Öl gerechnet und dann addiert werden, denn der SAP-Wert gehört zum Öl und nicht zu Seife allgemein — nimm jeden Wert aus den Daten dieses Öls, ob Lieferantenblatt oder Standardtabelle. Olive mit 300 g (SAP 190), Kokos mit 150 g (SAP 258) und Rizinus mit 50 g (SAP 180) ergeben 300 × 190 + 150 × 258 + 50 × 180 = 104.700; geteilt durch 1402,5 sind das 74,7 g NaOH, und 5 % Überfettung abgezogen bleiben 70,9 g. Der daneben angezeigte SAP-Wert der Mischung, hier 209,4, ist das nach Gewicht gewichtete Mittel: mit ihm behandelst du diese Mischung später wie ein einzelnes Öl. Tausch ein Öl, und dieser Wert verschiebt sich, die Laugenmenge ist also neu zu rechnen.',
    note: 'Die Lauge kommt ins Wasser, nie das Wasser auf die Lauge — in der falschen Reihenfolge kocht es in Sekunden auf und spritzt. Trag Schutzbrille und Handschuhe und rühr in Edelstahl oder HDPE, niemals in Aluminium: das greift die Lauge an, und es entsteht Wasserstoff. Die Lösung heizt sich beim Zusammengeben von selbst auf 80 bis 90 °C, also kein Glas und kein dünnes Plastik. Ein einziges falsch getipptes Ölgewicht verschiebt die Lauge: zu wenig lässt ein weiches Stück zurück, das nie fest wird, zu viel eine ätzende Seife. Setz das Gewicht eines nicht benutzten Öls auf null — ein stehen gebliebener SAP-Wert allein ändert nichts.',
  },
  'water-discount': {
    title: 'Wasserreduktion für Seife berechnen',
    desc: 'Einen Prozentsatz von der vollen Wassermenge abziehen und Wassergewicht samt Konzentration der Laugenlösung sehen.',
    long: 'Wasser nimmt an der Verseifung nicht teil: es trägt die Lauge in die Öle und verlässt die Seife wieder, während sie reift. Es zu reduzieren heißt deshalb nicht, Material zu sparen, sondern die Laugenlösung stärker zu machen. 71 g Lauge bei 2 : 1 sind 142 g Wasser, eine Lösung von 33 %. Zieh 20 % ab, und es sind 113,6 g Wasser bei 38,5 %. Eine stärkere Lösung bringt weniger Wasser in den Seifenteig, der Trace kommt also merklich früher — weniger Zeit zum Marmorieren, dafür fest genug, um innerhalb eines Tages aus der Form zu kommen, kürzere Reifezeit und weniger Schwund. Deshalb passt eine Reduktion zu einfarbigen Stücken und eiligen Ansätzen, während ein aufwendiger Swirl die Reduktion bei null oder zusätzliches Wasser will.',
    note: 'Etwa 50 % sind die praktische Obergrenze: stärker löst sich die Lauge nicht vollständig, und die Körner landen im Stück. Je größer die Reduktion, desto höher heizt die Lösung auf, fang also mit kaltem Wasser an — und halte die Reihenfolge ein, Lauge ins Wasser, sonst kocht es auf und spritzt. Schutzbrille, Handschuhe und ein Gefäß aus Edelstahl oder HDPE, niemals Aluminium. Weniger Wasser ändert die Laugenmenge nie. Kürz die Lauge mit dem Wasser mit, und du bekommst ein weiches Stück, das nicht fest wird; wieg Lauge versehentlich in das Wasserfeld, und du bekommst ein ätzendes.',
  },
  'soap-mold-fill': {
    title: 'Seifenform: Füllmenge berechnen',
    desc: 'Aus Formvolumen und Dichte des Seifenteigs den Ansatz und das Öl darin.',
    long: 'Formen werden in Volumen gemessen, Rezepte in Gewicht, und die Dichte des Seifenteigs verbindet beides — Seifenteig läuft etwas leichter als Wasser, 0,9 bis 1,0 g/cm³, hier steht 0,95 als Vorgabe. Eine Form mit 1.200 mL hält also etwa 1.140 g Teig. Daraus das Öl zurückzulesen braucht eine Annahme: die Lauge ist ein fester Anteil des Ölgewichts (voreingestellt 13,5 %, ein realistischer Wert für verbreitete Mischungen) und das Wasser ein Vielfaches der Lauge (voreingestellt 2×). Der Teig ist dann 1 + 0,135 + 0,27 = 1,405-mal das Öl, also 1.140 ÷ 1,405 = 811 g Öl, 109,5 g Lauge und 219 g Wasser. Den echten Laugenanteil legt deine Ölmischung fest, trag also, sobald sie steht, ihren Wert Lauge ÷ Öl aus dem Seifenrechner für mehrere Öle in dieses Feld ein. Miss die Form mit Wasser, und rechne damit, dass eine Silikonform etwa 5 % mehr aufnimmt als die Rechnung sagt, weil sich die Wände unter dem Teig nach außen wölben.',
    note: 'Füll nicht bis zum Rand. Teig steigt, wenn er sich erhitzt, und ein Ansatz, der über die Kante geliert, erstarrt als Pfütze um die Form — lass 1 bis 1,5 cm Luft. Gießt du zu wenig, werden die Stücke flach und brechen beim Schneiden. Die Dichte bewegt sich mit dem Rezept: harte Öle wie Kokos machen sie schwerer, aufgeschlagener Teig ist deutlich leichter. Sobald du eine Form einmal gegossen hast, notier ihr Teiggewicht geteilt durch ihr Volumen und nimm diesen Wert — dein eigener schlägt jede Vorgabe.',
  },
  'soap-cure-progress': {
    title: 'Seife: Reifezeit berechnen',
    desc: 'Tage seit der Herstellung gegen eine Ziel-Reifezeit ergeben den Fortschritt und die Resttage.',
    long: 'Reifen ist Wasserverlust, nicht Verseifung. Die Reaktion selbst ist meist in 24 bis 48 Stunden beendet, der Block ist ab dann also Seife, aber weich und kurzlebig, weil das eingerührte Wasser noch da ist. Über vier bis sechs Wochen verdunstet es, das Stück wird hart und der Schaum feiner und langlebiger. Gegen ein Ziel von 42 Tagen steht Tag 14 bei 33 % mit 28 Tagen Rest. Das Ziel ist eine Marke, keine Frist — Stücke werden über 100 % hinaus besser, und eine olivenlastige Kastilienseife ist nach zwei bis drei Monaten sichtbar besser, nach sechs noch besser. Wer es genau verfolgen will, nimmt die Waage: ein Stück wiegen, notieren und alle paar Tage nachwiegen; sinkt das Gewicht nicht mehr, ist das Wasser draußen, typischerweise 5 bis 10 % unter dem Anfangswert.',
    note: 'Dieser Prozentsatz zählt Tage und weiß nichts über deinen Raum. In einem feuchten Sommer sinkt das Gewicht weit über Tag 42 hinaus, in trockener Winterluft ist es früher fertig. Stell die Stücke mit Abstand auf die Kante in ein luftiges Regal — gestapelt oder in einer Kiste laufen nur die Tage, das Wasser bleibt. Einwickeln in Folie oder Plastik gehört hinter die Reifezeit, nicht hinein. Und ein Stück, das weich ist, weil die Lauge fehlte, wird nie hart: Reifen behebt Feuchtigkeit, kein falsch gewogenes Rezept.',
  },
  'resin-coverage': {
    title: 'Epoxidharz: Verbrauch je Fläche',
    desc: 'Harzvolumen und -gewicht, um eine Fläche in einer bestimmten Dicke zu beschichten.',
    long: 'Beschichten ist Fläche mal Dicke, und die einzige Falle sind die Einheiten: Quadratzentimeter mit Millimetern multipliziert müssen durch 10 geteilt werden, um bei Kubikzentimetern zu landen, und die sind Milliliter. Ein Tablett von 60 × 60 cm, also 3.600 cm², braucht bei 3 mm 1.080 mL, bei einer Dichte von 1,1 also 1.188 g. Breite Flächen wie Tischplatten werden selten tiefer als etwa 3 mm auf einmal gegossen, die Dicke wird also in Lagen geteilt — gib die Dicke einer Lage ein und wiederhol den Guss, statt jedes Mal neu zu rechnen. Selbstverlaufendes Harz gleicht sich auf einer waagerechten Fläche selbst aus, doch ein halbes Grad Neigung macht die tiefe Kante dick und die hohe dünn: eine Wasserwaage zählt hier mehr als die Rechnung.',
    note: 'Rechne mit dem, was abläuft. Eine Fläche ohne Kante — eine Tischplatte, die Außenseite eines Tabletts — verliert Harz über den Rand, plan also 10 bis 20 % über dem Wert ein und kleb einen Damm oder stell etwas darunter. Misch immer 5 bis 10 % mehr an für das, was am Becher und am Rührstab bleibt. Die ganze Tiefe auf einmal zu gießen bündelt die Wärme, und die Schicht wird gelb oder reißt, halte dich also an die maximale Gießhöhe auf der Flasche. Saugende Oberflächen wie rohes Holz trinken die erste Lage, versiegle sie also mit einer dünnen Schicht vor der eigentlichen.',
  },
  'resin-doming': {
    title: 'Epoxidharz-Kuppel berechnen',
    desc: 'Das Harz für einen gewölbten Guss aus Durchmesser und Kuppelhöhe.',
    long: 'Eine Kuppel ist ein Ausschnitt einer Kugel, kein Zylinder, Durchmesser mal Höhe überschätzt sie also deutlich. Die richtige Formel ist πh(3a² + h²)/6, mit a als Radius. Ein Rohling von 25 mm, 3 mm hoch gewölbt, hält 750 mm³, also 0,75 mL; zehn davon sind 7,5 mL oder 8,3 g bei 1,1 g/cm³. Eine natürliche Kuppel liegt bei etwa 8 bis 12 % des Durchmessers — 2 bis 3 mm auf einem Stück von 25 mm — und darüber hinaus scheitert es, denn die Oberflächenspannung ist die Annahme unter dieser Rechnung. Harz baut seine eigene Linse dort, wo du es hinsetzt, und diese Höhe legen Viskosität und Oberflächenspannung fest, nicht die Arithmetik. Nimm das Ergebnis als „wie viel Harz eine Kuppel dieser Höhe enthält“, füll dann bis zum Rand und setz die letzten Tropfen nach Augenmaß.',
    note: 'Kuppeln laufen. Ohne Kante am Rand kriecht das Harz über die Seite, erstarrt auf der Rückseite, und es abzuschleifen dauert länger als ein neuer Guss — kleb die Unterseite ab oder nimm eine Fassung mit Rand. Niedrigviskoses Harz für Flutschichten verläuft einfach, statt eine Kuppel zu bilden, so wenig du auch nimmst. Lass die Mischung etwa eine halbe Stunde stehen, dann steigen die meisten Bläschen von selbst; über die restlichen fährst du kurz mit dem Brenner, denn ihn stehen zu lassen dellt die Oberfläche.',
  },
  'resin-cups': {
    title: 'Epoxidharz auf Farbbecher aufteilen',
    desc: 'Ein Gesamtgewicht Harz auf Becher verteilen, je Farbe einen, gleichmäßig oder mit größerer Grundfarbe.',
    long: 'In mehreren Farben zu arbeiten heißt, das Harz in Becher zu teilen, und die Reihenfolge zählt: erst A und B vollständig verbinden, dann aufteilen. 220 g auf drei Farben sind je 73,3 g; gibst du der Grundfarbe einen Anteil von 40 %, werden es 88 g und je 66 g für die beiden anderen. Bleibt der Hauptanteil bei null, wird gleichmäßig geteilt. Gleichmäßig ist in der Praxis selten — der Hintergrund nimmt meist mehr als die Hälfte, während ein Akzent nur ein paar Gramm braucht —, den Grundanteil zuerst festzulegen und den Rest zu teilen entspricht also dem, wie Stücke wirklich gegossen werden. Misch einen Becher mehr an, als du brauchst: eine trüb gewordene Farbe lässt sich nicht rückgängig machen, und ein paar Gramm klares Harz in Reserve sind das, was sie rettet.',
    note: 'Verbinde jeden Becher vollständig, bevor Pigment hineinkommt. Färbst du zuerst, siehst du nicht, ob A und B wirklich zusammengekommen sind, und ein untergemischter Becher bleibt für sich klebrig. Die Zeit fürs Umfüllen geht ebenfalls von der Topfzeit ab: bei sechs Bechern wird der letzte schon dicker, misch bei vielen Farben also in zwei Runden statt in einer. Jedes Umfüllen lässt 1 bis 2 g an der Becherwand, es kommt also etwas weniger in die Form, als die Zahlen sagen. Kleine Becher haben schmale Böden und wackeln auf der Waage — stell den Becher ab, tarier und füll einen nach dem anderen.',
  },
  'silicone-ratio': {
    title: 'Silikon A : B berechnen',
    desc: 'Ein Gesamtgewicht Silikon nach Gewicht in Komponente A und B teilen.',
    long: 'Das Verhältnis hängt davon ab, welche Silikonfamilie du hast. Platinvernetzendes (additionsvernetzendes) Silikon ist meist 1 : 1, die Gesamtmenge wird also einfach halbiert; zinnvernetzendes (kondensationsvernetzendes) Silikon nimmt eine kleine Katalysatormenge, typisch 10 : 1 oder 100 : 5, was 20 : 1 ist. 500 g bei 10 : 1 sind 454,5 g A und 45,5 g B, der Katalysator liegt bei 9,1 % des Ansatzes. Dieselben 500 g bei 1 : 1 sind je 250 g und ein Katalysatoranteil von 50 % — eine völlig andere Einwaage, weshalb Halbieren ohne Blick auf die Dose der klassische Fehler ist. Das hier sind Gewichtsverhältnisse; viele Produkte drucken auch ein Volumenverhältnis auf, nimm auf der Waage also die Angabe nach Gewicht. Die Rechnung ist dieselbe wie beim Mischverhältnis für Harz, aber Silikon verzeiht kleine Ansätze viel schlechter, weil der Katalysator so stark auf einer Seite liegt.',
    note: 'Wenn die Katalysatorseite nur 45 g wiegt, ist ein Gramm daneben schon ein Fehler von 2 % — nimm eine Waage, die 0,1 g anzeigt, und dosier Komponente B nie nach Augenmaß. Zu wenig Katalysator, und die Form bleibt innen klebrig und lässt sich nicht entformen; zu viel, und der Ansatz zieht an, bevor du fertig gegossen hast. Platinvernetzendes Silikon ist außerdem empfindlich gegen Verunreinigung: schwefelhaltiger Ton, Latexhandschuhe oder ein Becher, in dem zinnvernetzendes Silikon war, hinterlassen eine dauerhaft unvernetzte Stelle — prüf also eine unauffällige Ecke, wenn du dem Modell nicht traust. Misch die beiden Familien niemals. Wieg auch hier 5 % mehr ab: in zwei Güssen gegossenes Silikon spaltet sich an der Naht.',
  },

  /* ───────── Schmuck und Versand ───────── */
  'necklace-length': {
    title: 'Halskettenlänge berechnen',
    desc: 'Aus fertiger Kettenlänge und Perlendurchmesser die Perlenzahl und den Anteil des Verschlusses.',
    long: 'Halsketten haben Namen für ihre Längen: Choker 40 cm, Prinzess 45 cm, Matinee 55 cm, Opera 75 cm, Sautoir 105 cm. Ein Choker muss den Hals trotzdem passieren, meist 33 bis 35 cm, während eine Prinzess auf dem Schlüsselbein liegt und eine Matinee unter der Brust. Steht das Ziel, ist der Rest Subtraktion: bei einer Kette von 45 cm nehmen Verschluss und Klemmperlen 20 mm, es bleiben 430 mm für Perlen, runde Perlen von 8 mm ergeben also 53 Stück und fertige 44,4 cm. Lässt du die Subtraktion weg, teilst 450 durch 8 und ziehst 56 Perlen auf, schließt die Kette bei 46,8 cm — über der gewünschten Länge. Der Wert für den Draht daneben ist das Ziel plus 10 cm, die Enden, die du an beiden Seiten durch die Klemmperlen zurückführst.',
    note: 'Die Zahl rundet ab; die übrigen Millimeter sammeln sich am Verschluss, und halbe Perlen gibt es nicht. Aufgedruckte Durchmesser sind Nennmaße, und Naturstein schwankt je Perle um einen halben Millimeter, rechne also mit einer oder zwei Perlen Abweichung — leg zehn Perlen an ein Lineal, und du hast den echten Durchmesser. Der Anteil des Verschlusses schwankt mehr als alles andere: ein kleiner Karabiner sind 10 mm, eine Magnet-Kugelschließe oder eine mit Verlängerungskette über 40 mm. Ketten hängen zudem unter dem eigenen Gewicht nach vorn und wirken vorn etwas länger, nimm im Zweifel einen Zentimeter vom Ziel ab.',
  },
  'bracelet-size': {
    title: 'Armbandgröße berechnen',
    desc: 'Zum Handgelenkumfang die Zugabe rechnen und Fadenlänge samt Perlenzahl erhalten.',
    long: 'Ein Armband lässt sich nicht auf das nackte Handgelenkmaß bauen, denn der Faden läuft außen um die Perlen und nicht an der Haut — je größer die Perle, desto größer der wirksame Umfang. Übliche Zugabe sind 1 bis 1,5 cm bei einem Armband auf Gummifaden und 1,5 bis 2 cm bei einem mit Verschluss, denn ein Verschluss muss um das Handgelenk schwingen und lässt sich ohne Spiel nicht schließen. Ein Handgelenk von 16 cm plus 1,5 cm ergibt 17,5 cm Länge, die bei 8 mm 21 Perlen hält. Bei einem Armband mit Verschluss nimm die Verschlusslänge — meist 10 bis 15 mm — von den Perlen und nicht von der Länge, du ziehst also etwa zwei weniger auf. Gummifaden hat keinen Verschluss, dort füllen Perlen die ganze Länge. Der Wert für die Schnur ist die Länge plus 8 cm, die Enden für Knoten und Nachziehen.',
    note: 'Gummifaden reißt häufiger, als sich der Knoten löst. Nimm 0,8 mm oder stärker und dehne ihn vor dem Aufziehen ein paar Mal an den Enden, sonst wird das Armband binnen Tagen locker. Knote zweimal einen Chirurgenknoten, gib einen Tropfen Kleber dazu und zieh den Knoten in ein Perlenloch. Rau gebohrte Steine und Metallperlen sägen den Faden durch, die gehören auf einen Faden mit Verschluss. Handgelenke schwellen im Tagesverlauf um bis zu einen halben Zentimeter, plan für ein Geschenk also großzügig.',
  },
  'chain-links': {
    title: 'Kettenglieder berechnen',
    desc: 'Wie viele Glieder eine Kettenlänge braucht und welche Länge ganze Glieder wirklich ergeben.',
    long: 'Eine Kette lässt sich nur an einem Glied trennen. Für 45 cm mit Gliedern von 7 mm sind 450 ÷ 7 = 64,3, du nimmst also 64 Glieder — und 64 Glieder messen 44,8 cm. Genau 45 cm zu treffen ist unmöglich; die Wahl steht zwischen 44,8 cm und 45,5 cm bei 65 Gliedern. Miss die Gliedlänge, indem du die Kette an ein Lineal legst, zehn Glieder zählst und durch zehn teilst: an einem einzelnen Glied gemessen wächst ein Fehler von 0,5 mm mal 64 zu 3 cm. Auch die Kleinteile fressen Länge — ein Verschluss plus zwei Biegeringe sind meist 15 bis 20 mm, zieh das von der Fertiglänge ab, bevor du hier rechnest. Bei gleichmäßigen Ketten wie Anker- und Kordelkette passt die Rechnung direkt; bei einem Wechselmuster wie Figaro trag die Länge eines vollen Rapports ein, etwa ein langes plus drei kurze Glieder.',
    note: 'Steht die Trennstelle fest, zählt, wie du trennst: manche Glieder öffnen und schließen sich wieder, andere müssen durchgeschnitten werden. Gelötete Ketten brauchen einen Seitenschneider, und das aufgeschnittene Glied ist Abfall, die echte Länge fällt also um ein Glied kürzer aus. Trägt die Kette einen schweren Anhänger, zählt die Drahtstärke mehr als die Zahl der Glieder — ein leichtes Glied biegt sich unter Last auf und der Anhänger ist weg. Müssen zwei Ketten gleich sein, wie bei Ohrringen, leg sie nebeneinander und zähl Glieder, statt jede mit dem Maßband zu messen, das sich jedes Mal anders dehnt.',
  },
  'earring-wire': {
    title: 'Ohrring-Draht berechnen',
    desc: 'Draht je Ohrring und je Paar aus Creolendurchmesser, Windungen und Zugabe für die Öse.',
    long: 'Eine Windung um einen Ring ist Durchmesser × π. Eine Creole von 20 mm sind 62,8 mm, zwei überlappende Windungen also 125,7 mm, und mit 15 mm Zugabe für die Öse sind das 140,7 mm je Ohrring und 281,3 mm für das Paar. Die Zugabe deckt das Formen der Öse, an der der Ohrhaken hängt, und das Abschließen des Endes: eine einfache Rundzangenöse braucht 8 bis 10 mm, eine umwickelte 20 bis 25 mm. Windungen gehen in halben Schritten — 1,5 Windungen geben eine Creole mit halber Überlappung, die von vorn als doppelte Linie wirkt. Für einen Anhänger statt einer Creole trag seine Breite als Durchmesser und 1 als Windung ein, dann kommt ein einzelner Umfang heraus. Der eigentliche Zweck dieser Rechnung ist die Gleichheit: getrennt gemessen und geschnitten liegen die beiden Ohrringe 1 bis 2 mm auseinander, und das sieht man von vorn. Schneide die Länge für das Paar, falte sie in der Mitte und schneide einmal.',
    note: 'Spar an der Zugabe, und du kannst das Stück nicht abschließen. Ohne ein Ende zum Greifen lässt sich die Öse nicht zuziehen, und der Draht längt sich beim Zuziehen leicht, die echte Länge liegt also über der Rechnung. Kräftiger Draht ab 0,8 mm (20 Gauge) lässt sich in der Hand nicht rund biegen und muss über einen Dorn gewickelt werden, wodurch die Creole Dorn plus Drahtstärke misst und größer wird als berechnet. Was durch das Ohr geht, sollte Chirurgenstahl, Titan oder Feinsilber sein; nickelhaltiger Basteldraht bleibt am Ring der Creole. Rechne je Schnitt einen Millimeter für das Verfeilen der Enden dazu.',
  },
  'bubble-wrap': {
    title: 'Luftpolsterfolie berechnen',
    desc: 'Wie viel Luftpolsterfolie ein Karton braucht — aus seinen Maßen und der Zahl der Lagen.',
    long: 'Luftpolsterfolie wird nach Rolle verkauft, die Antwort muss also eine Länge sein — was die Menge bestimmt, ist die Oberfläche des Kartons. Ein Karton von 20 × 15 × 8 cm hat 2 × (20×15 + 20×8 + 15×8) = 1.160 cm² Oberfläche. Zweimal gewickelt und 15 % für Überlappung und die Falten an den Ecken dazu ergibt 2.668 cm², von einer Rolle mit 50 cm Breite also 53 cm — 0,53 m. Diese 15 % sind die Zugabe, auf der die Rechnung beruht: die Enden müssen sich überlappen, damit das Klebeband hält, und Ecken verbrauchen mehr als eine flache Fläche. Die Zahl der Lagen bestimmt der Inhalt: eine für Unzerbrechliches, drei oder mehr für Glas, Keramik und Elektronik, plus eine zusätzliche Runde um Ecken und Griffe. Für eine Serie von 100 Paketen multiplizier die Länge mit 100 und teil durch die Rollenlänge — eine Rolle mit 50 cm Breite hat meist 50 m.',
    note: 'Ist die Rolle schmaler als der Karton, hilft die richtige Rechnung beim Wickeln nicht: die Rolle muss die kürzere Seite überspannen — hier die 15 cm Tiefe oder die 8 cm Höhe —, prüf also die Breite vor dem Kauf. Wickle die Noppen nach innen; nach außen werden sie nie zusammengedrückt und platzen einfach, und die Polsterung ist weg. Denk außerdem daran, dass der Inhalt sich im Karton nicht bewegen soll: gut gewickelt und trotzdem Hohlräume gelassen bringt wenig. Wo nach Volumengewicht abgerechnet wird, treibt jede zusätzliche Lage die Frachtkosten — brauchst du drei Lagen, nimm besser eine Kartongröße mehr.',
  },
  'tissue-paper': {
    title: 'Seidenpapier: Größe berechnen',
    desc: 'Das Seidenpapier für einen Karton bemessen und die Blätter für eine Serie zählen.',
    long: 'Seidenpapier legt den Karton aus: es deckt den Boden, steigt beide Wände hoch und schlägt oben über den Inhalt. Eine Seite ist deshalb die Kartonbreite plus zweimal die Höhe, für die beiden Wände, plus etwa 5 cm zum Überlappen — bei einem Karton von 20 × 15 × 8 cm sind das 20 + 16 + 5 = 41 cm und in der anderen Richtung 15 + 16 + 5 = 36 cm. Das Standardblatt, das 41 × 36 cm deckt, ist 50 × 70 cm, die verbreitetste Größe; halbiert wird es 35 × 50 cm und ist für diesen Karton knapp zu kurz. Genau das entscheidet diese Rechnung: ganze Blätter nehmen oder zuschneiden. Zwei Blätter je Paket sind normal — eines quer zum Einwickeln, eines darüber oder zerknüllt als Füllung. Zehn Pakete sind 20 Blätter, eine Packung mit 100 Blättern reicht also für fünf solche Serien.',
    note: 'Kräftig gefärbtes Seidenpapier blutet aus. Feuchte Hände oder ein feuchtes Lager übertragen den Farbstoff auf hellen Inhalt, nimm für Saugendes wie Kleidung, Seife oder Kerzen also säurefreies Weiß. Seidenpapier ist auch keine Polsterung: es präsentiert das Stück und verhindert Scheuern, nimmt aber keinen Stoß auf, Zerbrechliches bekommt also erst Luftpolsterfolie und darüber Seidenpapier. Papier mit Laufrichtung reißt an der Falz, wenn du quer zur Faser faltest, falte deshalb ein Blatt, bevor du einen Stapel schneidest. Und miss innen — mit Außenmaßen fällt das Blatt um die Wandstärke zu kurz aus.',
  },
  'ribbon-bow': {
    title: 'Schleife: Bandlänge berechnen',
    desc: 'Das Band, das die Schleife selbst braucht — aus Schlaufen, Schlaufenlänge und Enden.',
    long: 'Jede Schlaufe geht hinaus und kommt zurück, sie frisst also die doppelte eigene Länge. Sechs Schlaufen von 6 cm sind 72 cm, zwei Bandenden von 12 cm kommen mit 24 cm dazu, und 5 cm zum Abbinden der Mitte bringen es auf 101 cm. Die fertige Schleife ist etwa doppelt so breit wie die Schlaufenlänge — hier 12 cm — und rund ein Drittel der Kartonbreite sieht richtig aus. Die Zahl der Schlaufen bestimmt den Charakter: zwei sind eine einfach gebundene Schleife, sechs schichten sich auf, und über zehn wirkt es als runde Pompon-Blüte. Dieses Werkzeug deckt nur die Schleife. Das Band um den Karton rechnet der Rechner für Geschenkband, 2 × (Breite + Höhe) + 2 × (Tiefe + Höhe) für die Kreuzschleife — addier beide Werte, wenn ein Stück Band umwickelt und bindet, oder nimm nur diesen, wenn du die Schleife getrennt machst und ansetzt.',
    note: 'Die Bandbreite entscheidet, wie die Schleife wirkt. Ab 25 mm stehen die Schlaufen, und eine Schlaufe von 6 cm sieht großzügig aus; bei 6 mm hängt dieselbe Schlaufe schlaff, dünnes Band braucht also mehr Schlaufen, um zu füllen. Band mit Drahtkante hält seine Form, einfaches sinkt zusammen, sobald du die Mitte zuziehst, und die Schleife wirkt kleiner als die Zahlen. Gewebtes Band wie Satin franst an der Schnittkante, schneide also schräg oder versiegle das Ende kurz mit Feuer und lass einen Zentimeter dafür. Und die eine Schleife, die misslingt, steckt nicht in der Rechnung — kauf 20 bis 30 % mehr, wenn du eine Form zum ersten Mal versuchst.',
  },
  'mailer-size': {
    title: 'Versandtasche: Größe berechnen',
    desc: 'Eine Folien- oder Polstertasche nach Breite, Länge und Dicke des Inhalts bemessen.',
    long: 'Eine Versandtasche ist ein flacher Schlauch, die Dicke des Inhalts geht also von der Breite ab. Der Umfang des Schlauchs ist zweimal seine Breite, und der Inhalt braucht 2 × (Breite + Dicke), die Tasche muss also mindestens so breit sein wie die Breite des Inhalts plus einmal seine Dicke. Rechne 2 cm dazu, um das Stück hinein- und herauszubekommen: ein 25 cm breiter und 4 cm dicker Gegenstand will eine Tasche von 31 cm. Die Länge geht genauso, Länge plus Dicke plus Zugabe, und dann 4 cm für die Klebelasche, also 40 cm — die Lasche schlägt um, dort kann kein Inhalt sitzen. Die Antwort lautet also „31 × 40 cm oder größer“, und du kaufst die nächstgrößere Lagergröße, etwa 32 × 45 cm. Miss Zusammendrückbares wie Kleidung in gepresstem Zustand. Achte auch darauf, wie der Lieferant Größen angibt: manche nennen das Innenmaß, andere das Außenmaß samt Lasche, und ein Außenmaß muss vor dem Vergleich um die Lasche gekürzt werden.',
    note: 'Versandtaschen polstern nicht. Selbst eine mit Luftpolsterfutter hält nur Scheuern und Druck ab, Zerbrechliches gehört in einen Karton. Spar an der Zugabe, und der Inhalt rutscht in die Klebelasche, die Naht bindet nicht richtig und die Tasche geht unterwegs auf — nimm eine Größe mehr, statt die Zugabe zu kürzen. Zu groß ist ein eigenes Problem: das Stück rutscht, Ecken stoßen an, und der Überschuss klappt über das Etikett, wo der Scanner es nicht lesen kann. Ein dickes Stück hineinzuzwingen dehnt die Folie, bis sie an einer Ecke aufreißt, ab etwa 5 cm Dicke nimm also einen Karton. Die Taschengröße hilft beim Volumengewicht, doch rechne die Fracht nach den Regeln deines eigenen Versenders.',
  },
};

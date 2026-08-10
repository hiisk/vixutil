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
};

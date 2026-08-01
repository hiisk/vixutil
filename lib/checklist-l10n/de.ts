import type { Checklist } from '../types.ts';

/** 독일어 체크리스트 — id는 [[lib/checklist-en.ts]]와 같다. */
export const CHECKLISTS_DE: Checklist[] = [
  {
    slug: 'moving',
    title: 'Umzugs-Checkliste',
    desc: 'Vom Mietvertrag bis zur ersten Woche in der neuen Wohnung',
    icon: '📦',
    category: 'Wohnen & Alltag',
    sections: [
      {
        title: 'Behörden & Papierkram', icon: '📋',
        items: [
          { id: 'm01', text: 'Angebote von mindestens drei Umzugsfirmen einholen', note: '2–3 Wochen vorher buchen bringt die besten Preise' },
          { id: 'm02', text: 'Umzugstermin festlegen und verbindlich buchen' },
          { id: 'm03', text: 'Dem Vermieter schriftlich kündigen', note: 'Kündigungsfrist im Mietvertrag prüfen' },
          { id: 'm04', text: 'Adresse bei Bank, Arbeitgeber und Behörden ändern' },
          { id: 'm05', text: 'Nachsendeauftrag einrichten' },
          { id: 'm06', text: 'Termin und Weg der Kautionsrückzahlung vereinbaren' },
          { id: 'm07', text: 'Die alte Wohnung vor der Schlüsselübergabe fotografieren', note: 'Fotos mit Datum beenden Streit um die Kaution' },
        ],
      },
      {
        title: 'Packen', icon: '📦',
        items: [
          { id: 'm08', text: 'Kartons, Klebeband und Polstermaterial besorgen', note: 'Supermärkte geben Kartons oft umsonst ab' },
          { id: 'm09', text: 'Verkaufen, spenden oder entsorgen, was nicht mitkommt' },
          { id: 'm10', text: 'Dokumente und Wertsachen in eine Kiste, die du selbst trägst' },
          { id: 'm11', text: 'Möbel zerlegen und die Schrauben zum jeweiligen Teil in Beutel packen' },
          { id: 'm12', text: 'Jeden Karton mit Inhalt und Zielzimmer beschriften' },
          { id: 'm13', text: 'Kühl- und Gefrierschrank leer essen', note: 'Eine Woche vorher mit dem Gefriergut anfangen' },
          { id: 'm14', text: 'Waschmaschine abpumpen und Transportsicherungen einsetzen' },
          { id: 'm15', text: 'Tasche für die erste Nacht: Bettzeug, Handtücher, Ladegeräte, Wasserkocher' },
        ],
      },
      {
        title: 'Die neue Wohnung', icon: '🏠',
        items: [
          { id: 'm16', text: 'Zustand von Böden, Wänden und Einbauten prüfen' },
          { id: 'm17', text: 'Prüfen, ob Wasser, Strom und Gas angemeldet sind' },
          { id: 'm18', text: 'Internetumzug oder Neuanschluss beauftragen', note: 'Mindestens eine Woche vorher — die Termine sind schnell weg' },
          { id: 'm19', text: 'Schloss oder Türcode wechseln' },
          { id: 'm20', text: 'Zählerstände am ersten Tag ablesen' },
          { id: 'm21', text: 'Vorhandene Schäden vor dem Auspacken fotografieren' },
        ],
      },
      {
        title: 'Nach dem Einzug', icon: '✅',
        items: [
          { id: 'm22', text: 'Beim Einwohnermeldeamt ummelden' },
          { id: 'm23', text: 'Haupthahn, Sicherungskasten und Abfuhrtag herausfinden' },
          { id: 'm24', text: 'Führerschein und Fahrzeugpapiere aktualisieren' },
          { id: 'm25', text: 'Rauch- und CO-Melder testen' },
          { id: 'm26', text: 'Bei den Nachbarn vorstellen' },
        ],
      },
    ],
  },
  {
    slug: 'travel-abroad',
    title: 'Checkliste für Auslandsreisen',
    desc: 'Dokumente, Geld, Gepäck und das, was alle vergessen',
    icon: '✈️',
    category: 'Reisen',
    sections: [
      {
        title: 'Vor dem Buchen', icon: '🗓️',
        items: [
          { id: 't01', text: 'Ablaufdatum des Reisepasses prüfen', note: 'Viele Länder verlangen sechs Monate Gültigkeit ab Einreise' },
          { id: 't02', text: 'Prüfen, ob ein Visum oder eine Einreisegenehmigung nötig ist' },
          { id: 't03', text: 'Vorgeschriebene und empfohlene Impfungen prüfen' },
          { id: 't04', text: 'Die Reisehinweise des Auswärtigen Amts für das Land lesen' },
          { id: 't05', text: 'Reiseversicherung mit medizinischer Deckung abschließen' },
        ],
      },
      {
        title: 'Geld & Dokumente', icon: '💳',
        items: [
          { id: 't06', text: 'Der Bank die Reise melden oder prüfen, ob die Karte im Ausland funktioniert' },
          { id: 't07', text: 'Eine zweite Karte getrennt von der ersten mitnehmen' },
          { id: 't08', text: 'Etwas Bargeld der Landeswährung für die Ankunft dabeihaben' },
          { id: 't09', text: 'Kopien von Pass, Versicherung und Buchungen offline speichern', note: 'Ein Foto im Handy plus ein Ausdruck' },
          { id: 't10', text: 'Auslandsgebühren prüfen, bevor du dich auf die Karte verlässt' },
        ],
      },
      {
        title: 'Gepäck', icon: '🎒',
        items: [
          { id: 't11', text: 'Freigepäck für jeden Streckenabschnitt prüfen' },
          { id: 't12', text: 'Medikamente in Originalverpackung ins Handgepäck' },
          { id: 't13', text: 'Passenden Steckeradapter und eine Powerbank einpacken', note: 'Powerbanks müssen ins Handgepäck' },
          { id: 't14', text: 'Flüssigkeiten unter dem Kabinenlimit in einem durchsichtigen Beutel' },
          { id: 't15', text: 'Eine Garnitur Kleidung zum Wechseln ins Handgepäck' },
        ],
      },
      {
        title: 'Am Tag davor', icon: '⏰',
        items: [
          { id: 't16', text: 'Online einchecken und die Bordkarte herunterladen' },
          { id: 't17', text: 'Anfahrt zum Flughafen und Dauer bestätigen' },
          { id: 't18', text: 'Offline-Karten und ein Übersetzungspaket laden' },
          { id: 't19', text: 'Abwesenheitsnotiz setzen und jemandem die Reiseroute geben' },
          { id: 't20', text: 'Kühlschrank leeren, Müll rausbringen, Geräte vom Netz nehmen' },
        ],
      },
    ],
  },
  {
    slug: 'job-interview',
    title: 'Checkliste fürs Vorstellungsgespräch',
    desc: 'Recherche, Vorbereitung und Nachfassen, die wirklich etwas bewirken',
    icon: '💼',
    category: 'Arbeit & Karriere',
    sections: [
      {
        title: 'Recherche', icon: '🔍',
        items: [
          { id: 'j01', text: 'Die Stellenanzeige noch einmal lesen und jede Anforderung markieren' },
          { id: 'j02', text: 'Zu jeder Anforderung ein konkretes Beispiel vorbereiten', note: 'Situation, was du getan hast, was sich geändert hat' },
          { id: 'j03', text: 'Aktuelle Nachrichten, Produkt und öffentliche Zahlen der Firma lesen' },
          { id: 'j04', text: 'Nachsehen, wer das Gespräch führt und woran diese Person arbeitet' },
          { id: 'j05', text: 'Drei Fragen aufschreiben, die dich wirklich interessieren' },
        ],
      },
      {
        title: 'Vorbereitung', icon: '📝',
        items: [
          { id: 'j06', text: 'Die zweiminütige Selbstvorstellung laut üben' },
          { id: 'j07', text: 'Eine ehrliche Antwort für die größte Lücke im Lebenslauf vorbereiten' },
          { id: 'j08', text: 'Gehaltsspanne kennen und die Zahl, die du nicht unterschreitest' },
          { id: 'j09', text: 'Videolink, Kamera, Mikrofon und Licht testen', note: 'Am Tag davor, nicht fünf Minuten vorher' },
          { id: 'j10', text: 'Weg planen und 30 Minuten Puffer einrechnen' },
        ],
      },
      {
        title: 'Am Tag', icon: '🎯',
        items: [
          { id: 'j11', text: 'Ausgedruckte Lebensläufe und Arbeitsproben mitnehmen' },
          { id: 'j12', text: 'Früh genug da sein, um sich zu setzen und durchzuatmen' },
          { id: 'j13', text: 'Lieber nachfragen als die Frage zu erraten' },
          { id: 'j14', text: 'Notizen machen — das wirkt nicht unhöflich, sondern interessiert' },
          { id: 'j15', text: 'Nach dem nächsten Schritt und dem Zeitplan fragen' },
        ],
      },
      {
        title: 'Danach', icon: '✉️',
        items: [
          { id: 'j16', text: 'Innerhalb von 24 Stunden eine kurze Dankesnachricht schicken' },
          { id: 'j17', text: 'Die Fragen notieren, bei denen du gestockt hast, solange sie frisch sind' },
          { id: 'j18', text: 'Einmal nachfassen, wenn die genannte Frist verstreicht' },
        ],
      },
    ],
  },
  {
    slug: 'remote-work',
    title: 'Checkliste fürs Homeoffice',
    desc: 'Ein Arbeitsplatz, eine Routine und Grenzen, die halten',
    icon: '🏡',
    category: 'Arbeit & Karriere',
    sections: [
      {
        title: 'Der Arbeitsplatz', icon: '🪑',
        items: [
          { id: 'r01', text: 'Den Bildschirm auf Augenhöhe bringen', note: 'Ein Bücherstapel tut es genauso wie ein Ständer' },
          { id: 'r02', text: 'Stuhlhöhe so, dass die Füße flach stehen und die Ellbogen bei etwa 90° sind' },
          { id: 'r03', text: 'Licht hinter die Kamera stellen, nicht hinter dich' },
          { id: 'r04', text: 'Am Laptop eine externe Tastatur und Maus benutzen' },
          { id: 'r05', text: 'Das Mikrofon testen — Ton zählt mehr als Bild' },
          { id: 'r06', text: 'Per Kabel verbinden oder nah am Router sitzen' },
        ],
      },
      {
        title: 'Routine', icon: '⏰',
        items: [
          { id: 'r07', text: 'Feste Anfangs- und Schlusszeit setzen und aufschreiben' },
          { id: 'r08', text: 'Einen Ersatz für den Arbeitsweg behalten — ein Spaziergang davor und danach' },
          { id: 'r09', text: 'Fokuszeit im Kalender blocken, damit sie nicht weggefressen wird' },
          { id: 'r10', text: 'Richtig Mittag essen, weg vom Schreibtisch' },
          { id: 'r11', text: 'Einmal bei Tageslicht nach draußen gehen' },
        ],
      },
      {
        title: 'Zusammenarbeit', icon: '💬',
        items: [
          { id: 'r12', text: 'Im Team vereinbaren, wie schnell Antworten erwartet werden' },
          { id: 'r13', text: 'Fortschritt übermäßig teilen — Sichtbarkeit ersetzt das Gesehenwerden' },
          { id: 'r14', text: 'Arbeitszeiten in Kalender und Status eintragen' },
          { id: 'r15', text: 'Benachrichtigungen außerhalb dieser Zeiten ausschalten' },
        ],
      },
    ],
  },
  {
    slug: 'gym-start',
    title: 'Checkliste für den Trainingsstart',
    desc: 'Der erste Monat, ohne Verletzung und ohne Abbruch',
    icon: '💪',
    category: 'Gesundheit & Fitness',
    sections: [
      {
        title: 'Vor dem Start', icon: '📋',
        items: [
          { id: 'g01', text: 'Festlegen, wie viele Tage pro Woche wirklich machbar sind', note: 'Zwei Tage, die du durchhältst, schlagen fünf, die du aufgibst' },
          { id: 'g02', text: 'Ein Studio wählen, an dem du ohnehin vorbeikommst — Entfernung killt die Regelmäßigkeit' },
          { id: 'g03', text: 'Vertragslaufzeit und Kündigungsbedingungen prüfen' },
          { id: 'g04', text: 'Bei Herz-, Gelenk- oder Blutdruckproblemen vorher zum Arzt' },
          { id: 'g05', text: 'Startfoto und Maße nehmen, nicht nur das Gewicht' },
        ],
      },
      {
        title: 'Ausrüstung', icon: '👟',
        items: [
          { id: 'g06', text: 'Trainingsschuhe mit flacher, stabiler Sohle' },
          { id: 'g07', text: 'Kleidung, in der du dich bewegen kannst und wohlfühlst' },
          { id: 'g08', text: 'Trinkflasche und ein kleines Handtuch' },
          { id: 'g09', text: 'Schloss für den Spind' },
        ],
      },
      {
        title: 'Der erste Monat', icon: '🏋️',
        items: [
          { id: 'g10', text: 'Technik vor Gewicht — eine Einweisung oder Stunde buchen' },
          { id: 'g11', text: 'Leichter anfangen, als das Ego will', note: 'Vier Tage Muskelkater heißt: zu viel gewollt' },
          { id: 'g12', text: 'Jede Einheit notieren — was, wie viel, wie es sich anfühlte' },
          { id: 'g13', text: 'Fünf Minuten aufwärmen, danach dehnen' },
          { id: 'g14', text: 'Zwischen harten Einheiten mindestens einen ganzen Tag Pause' },
          { id: 'g15', text: 'Genug Eiweiß essen und genug schlafen — dort passiert die Veränderung' },
        ],
      },
    ],
  },
  {
    slug: 'online-security',
    title: 'Checkliste für Online-Sicherheit',
    desc: 'Die Konto-Hygiene, die einen schlechten Tag wirklich verhindert',
    icon: '🔐',
    category: 'Digital',
    sections: [
      {
        title: 'Passwörter', icon: '🔑',
        items: [
          { id: 's01', text: 'Einen Passwortmanager installieren und alles von ihm erzeugen lassen' },
          { id: 's02', text: 'Jedes Passwort ändern, das auf mehr als einer Seite benutzt wird', note: 'Mehrfachnutzung macht aus einem Leck zehn' },
          { id: 's03', text: 'Das E-Mail-Passwort zum stärksten machen, das du hast' },
          { id: 's04', text: 'Deine Adressen bei einem Leck-Benachrichtigungsdienst prüfen' },
        ],
      },
      {
        title: 'Zwei Faktoren', icon: '📱',
        items: [
          { id: 's05', text: 'Zwei-Faktor für E-Mail, Bank und Cloud-Speicher einschalten' },
          { id: 's06', text: 'Lieber eine Authenticator-App als SMS', note: 'SIM-Swapping hebelt SMS-Codes aus' },
          { id: 's07', text: 'Die Wiederherstellungscodes offline aufbewahren' },
          { id: 's08', text: 'Ein zweites Gerät registrieren, damit ein verlorenes Handy dich nicht aussperrt' },
        ],
      },
      {
        title: 'Geräte & Konten', icon: '💻',
        items: [
          { id: 's09', text: 'Automatische Updates für Betriebssystem und Browser einschalten' },
          { id: 's10', text: 'Festplattenverschlüsselung und Bildschirmsperre aktivieren' },
          { id: 's11', text: 'Prüfen, welche Apps Zugriff auf dein Google-/Apple-Konto haben' },
          { id: 's12', text: 'Alte Geräte und Sitzungen entfernen, die du nicht mehr nutzt' },
          { id: 's13', text: 'Geräteortung und Fernlöschung einrichten' },
        ],
      },
      {
        title: 'Gewohnheiten', icon: '🧠',
        items: [
          { id: 's14', text: 'Die Adresse selbst eintippen, wenn es um Geld geht' },
          { id: 's15', text: 'Dringlichkeit in einer Nachricht als das Warnzeichen nehmen, das sie meist ist' },
          { id: 's16', text: 'Sichern an einen Ort, den der Rechner nicht von allein erreicht', note: 'Ransomware verschlüsselt auch angeschlossene Laufwerke' },
        ],
      },
    ],
  },
  {
    slug: 'new-laptop',
    title: 'Checkliste für einen neuen Rechner',
    desc: 'Einmal richtig einrichten statt einen Monat lang nachbessern',
    icon: '💻',
    category: 'Digital',
    sections: [
      {
        title: 'Die erste Stunde', icon: '⚡',
        items: [
          { id: 'n01', text: 'Vor allem anderen alle Systemupdates einspielen' },
          { id: 'n02', text: 'Wenn möglich ein Konto ohne Administratorrechte für den Alltag anlegen' },
          { id: 'n03', text: 'Festplattenverschlüsselung einschalten' },
          { id: 'n04', text: 'Bildschirmsperre mit kurzer Wartezeit einstellen' },
          { id: 'n05', text: 'Zuerst im Passwortmanager anmelden — alles andere braucht ihn' },
        ],
      },
      {
        title: 'Umzug der Daten', icon: '📁',
        items: [
          { id: 'n06', text: 'Das Backup des alten Rechners prüfen, bevor irgendetwas gelöscht wird' },
          { id: 'n07', text: 'Dateien bewusst übertragen statt das Chaos zu klonen' },
          { id: 'n08', text: 'Den alten Rechner bei lizenzierter Software abmelden' },
          { id: 'n09', text: 'Browser-Lesezeichen und lokale App-Daten exportieren' },
        ],
      },
      {
        title: 'Einrichtung', icon: '⚙️',
        items: [
          { id: 'n10', text: 'Nur installieren, was du auf dem alten Rechner wirklich benutzt hast' },
          { id: 'n11', text: 'Cloud-Sync für Dokumente einrichten' },
          { id: 'n12', text: 'Automatische Backups einrichten und eine Wiederherstellung testen', note: 'Ein nie zurückgespieltes Backup ist eine Vermutung' },
          { id: 'n13', text: 'Skalierung, Tastaturwiederholung und Trackpad nach Geschmack einstellen' },
          { id: 'n14', text: 'Seriennummer notieren und die Garantie registrieren' },
        ],
      },
    ],
  },
  {
    slug: 'camping',
    title: 'Camping-Checkliste',
    desc: 'Unterkunft, Wärme, Essen und die Kleinigkeiten, die alles verderben',
    icon: '🏕️',
    category: 'Reisen',
    sections: [
      {
        title: 'Schlafen & Unterkunft', icon: '⛺',
        items: [
          { id: 'c01', text: 'Das Zelt vorher einmal zu Hause aufbauen', note: 'Die fehlende Stange findest du besser im Garten als in der Dämmerung' },
          { id: 'c02', text: 'Schlafsack passend zur tatsächlichen Nachttemperatur' },
          { id: 'c03', text: 'Isomatte — die Kälte kommt von unten' },
          { id: 'c04', text: 'Heringe, Abspannleinen und ein Hammer' },
          { id: 'c05', text: 'Plane oder Unterlegplane fürs Zelt' },
        ],
      },
      {
        title: 'Kochen & Wasser', icon: '🍳',
        items: [
          { id: 'c06', text: 'Kocher, Brennstoff und Feuerzeug plus Streichhölzer als Reserve' },
          { id: 'c07', text: 'Topf, Becher, Teller, Besteck, scharfes Messer' },
          { id: 'c08', text: 'Wasserkanister und eine Möglichkeit zum Aufbereiten, falls nötig' },
          { id: 'c09', text: 'Kühlbox und Kühlakkus für die ersten zwei Tage' },
          { id: 'c10', text: 'Müllbeutel — alles, was du mitbringst, nimmst du wieder mit' },
        ],
      },
      {
        title: 'Kleidung & Sicherheit', icon: '🧥',
        items: [
          { id: 'c11', text: 'Zwiebellook, dazu eine warme Schicht mehr als gedacht' },
          { id: 'c12', text: 'Regenjacke, egal was die Vorhersage sagt' },
          { id: 'c13', text: 'Stirnlampe und Ersatzbatterien' },
          { id: 'c14', text: 'Erste-Hilfe-Set, Schmerzmittel und persönliche Medikamente' },
          { id: 'c15', text: 'Powerbank und eine Offline-Karte', note: 'Geh davon aus, dass es am Platz keinen Empfang gibt' },
          { id: 'c16', text: 'Jemandem sagen, wohin du fährst und wann du zurück bist' },
        ],
      },
    ],
  },
  {
    slug: 'sleep-better',
    title: 'Checkliste für besseren Schlaf',
    desc: 'Die Änderungen, für die es tatsächlich Belege gibt',
    icon: '😴',
    category: 'Gesundheit & Fitness',
    sections: [
      {
        title: 'Zeiten', icon: '⏰',
        items: [
          { id: 'b01', text: 'Jeden Tag zur selben Zeit aufstehen, auch am Wochenende', note: 'Die Aufstehzeit verankert den Rhythmus stärker als die Schlafenszeit' },
          { id: 'b02', text: 'Innerhalb einer Stunde nach dem Aufwachen Tageslicht tanken' },
          { id: 'b03', text: 'Koffein 8–10 Stunden vor dem Schlafen weglassen' },
          { id: 'b04', text: 'Nickerchen unter 30 Minuten und vor dem späten Nachmittag' },
        ],
      },
      {
        title: 'Umgebung', icon: '🛏️',
        items: [
          { id: 'b05', text: 'Das Zimmer richtig dunkel machen' },
          { id: 'b06', text: 'Kühl halten — etwa 18 °C passen den meisten' },
          { id: 'b07', text: 'Das Ladegerät fürs Handy außer Reichweite legen' },
          { id: 'b08', text: 'Das Bett nur zum Schlafen nutzen, nicht zum Arbeiten' },
        ],
      },
      {
        title: 'Vor dem Schlafen', icon: '🌙',
        items: [
          { id: 'b09', text: 'Eine Stunde vorher das Licht dimmen' },
          { id: 'b10', text: 'Alkohol nicht als Einschlafhilfe — er zerstückelt die zweite Nachthälfte' },
          { id: 'b11', text: 'Die Liste für morgen aufschreiben, damit du sie nicht durchspielst' },
          { id: 'b12', text: 'Nach 20 Minuten Wachliegen aufstehen und bei wenig Licht etwas Langweiliges tun' },
        ],
      },
    ],
  },
  {
    slug: 'wedding',
    title: 'Checkliste für die Hochzeitsplanung',
    desc: 'Von zwölf Monaten vorher bis zum Tag selbst',
    icon: '💍',
    category: 'Feiern',
    sections: [
      {
        title: '12–9 Monate vorher', icon: '📅',
        items: [
          { id: 'w01', text: 'Gesamtbudget festlegen und klären, wer etwas beisteuert' },
          { id: 'w02', text: 'Gästeliste entwerfen — sie treibt jede weitere Ausgabe' },
          { id: 'w03', text: 'Location buchen und den Termin festmachen' },
          { id: 'w04', text: 'Trauredner oder Standesamt buchen' },
          { id: 'w05', text: 'Fotografin und Band oder DJ buchen', note: 'Die sind am weitesten im Voraus ausgebucht' },
        ],
      },
      {
        title: '9–3 Monate vorher', icon: '📋',
        items: [
          { id: 'w06', text: 'Kleidung bestellen und Anproben terminieren' },
          { id: 'w07', text: 'Catering bestätigen und eine Verkostung machen' },
          { id: 'w08', text: 'Einladungen verschicken und eine Rückmeldefrist setzen' },
          { id: 'w09', text: 'Die Formalitäten und eine mögliche Namensänderung klären' },
          { id: 'w10', text: 'Transport und Zimmerkontingente für die Gäste organisieren' },
        ],
      },
      {
        title: 'Der letzte Monat', icon: '⏳',
        items: [
          { id: 'w11', text: 'Endgültige Personenzahl ans Catering geben' },
          { id: 'w12', text: 'Den Ablaufplan schreiben und mit allen Dienstleistern teilen' },
          { id: 'w13', text: 'Jemandem Ringe, Papiere und Zahlungen anvertrauen' },
          { id: 'w14', text: 'Ankunftszeiten mit allen schriftlich bestätigen' },
          { id: 'w15', text: 'Einen Schlechtwetterplan machen, falls etwas draußen stattfindet' },
        ],
      },
      {
        title: 'Der Tag', icon: '💐',
        items: [
          { id: 'w16', text: 'Frühstücken — im Ernst, das wird vergessen' },
          { id: 'w17', text: 'Notfallset: Sicherheitsnadeln, Pflaster, Fleckenentferner, Schmerzmittel' },
          { id: 'w18', text: 'Das eigene Handy jemand anderem geben' },
          { id: 'w19', text: 'Euch tagsüber zehn Minuten zu zweit nehmen' },
        ],
      },
    ],
  },
  {
    slug: 'language-learning',
    title: 'Checkliste zum Sprachenlernen',
    desc: 'So aufsetzen, dass du in drei Monaten noch dabei bist',
    icon: '🗣️',
    category: 'Lernen',
    sections: [
      {
        title: 'Aufsetzen', icon: '🎯',
        items: [
          { id: 'l01', text: 'Aufschreiben, wofür — die konkrete Situation, die du meistern willst' },
          { id: 'l02', text: 'Ein tägliches Minimum wählen, das so klein ist, dass du es nie auslässt', note: 'Zehn ehrliche Minuten schlagen zweimal eine heroische Stunde' },
          { id: 'l03', text: 'Einen Hauptkurs wählen und aufhören, nach anderen zu suchen' },
          { id: 'l04', text: 'Das Lautsystem lernen, bevor du Vokabeln stapelst' },
        ],
      },
      {
        title: 'Tägliche Praxis', icon: '📚',
        items: [
          { id: 'l05', text: 'Vokabeln mit verteilter Wiederholung lernen' },
          { id: 'l06', text: 'Wörter in Wendungen lernen, nicht als isolierte Paare' },
          { id: 'l07', text: 'Jeden Tag etwas hören, notfalls nebenbei' },
          { id: 'l08', text: 'Ab der ersten Woche laut sprechen' },
          { id: 'l09', text: 'Eine laufende Liste der Wörter führen, die dir gefehlt haben' },
        ],
      },
      {
        title: 'Dranbleiben', icon: '🌱',
        items: [
          { id: 'l10', text: 'Regelmäßig eine Tandempartnerin oder eine Lehrkraft buchen' },
          { id: 'l11', text: 'Eine Sache, die du ohnehin konsumierst, auf die Sprache umstellen' },
          { id: 'l12', text: 'Tage am Stück zählen, nicht Stunden' },
          { id: 'l13', text: 'Mit einem Plateau auf Mittelstufe rechnen und dafür planen' },
        ],
      },
    ],
  },
  {
    slug: 'declutter',
    title: 'Ausmisten-Checkliste',
    desc: 'Ein Durchgang Raum für Raum, der nicht auf halber Strecke stecken bleibt',
    icon: '🧹',
    category: 'Wohnen & Alltag',
    sections: [
      {
        title: 'Vorbereitung', icon: '📦',
        items: [
          { id: 'd01', text: 'Vier Behälter aufstellen: behalten, spenden, verkaufen, wegwerfen' },
          { id: 'd02', text: 'Jetzt schon einen Termin für Spende oder Abholung ausmachen', note: 'Säcke, die im Flur stehen, werden wieder ausgepackt' },
          { id: 'd03', text: 'Mit einer Schublade anfangen, nicht mit dem ganzen Haus' },
          { id: 'd04', text: 'Wo möglich nach Kategorie statt nach Zimmer vorgehen' },
        ],
      },
      {
        title: 'Zimmer für Zimmer', icon: '🏠',
        items: [
          { id: 'd05', text: 'Kleiderschrank: alles, was ein Jahr lang nicht getragen wurde' },
          { id: 'd06', text: 'Küche: doppelte Utensilien und alles Abgelaufene' },
          { id: 'd07', text: 'Bad: alte Medikamente und tote Kosmetik' },
          { id: 'd08', text: 'Kabel und Ladegeräte, für die es nichts mehr zu laden gibt' },
          { id: 'd09', text: 'Papierkram: einscannen, was du brauchst, den Rest schreddern' },
          { id: 'd10', text: 'Die Schublade, in die alles geworfen wird' },
        ],
      },
      {
        title: 'So halten', icon: '✅',
        items: [
          { id: 'd11', text: 'Eins rein, eins raus bei Kleidung und Küchenkram' },
          { id: 'd12', text: 'Jeder Kategorie einen festen Platz geben' },
          { id: 'd13', text: 'Am Ende des Tages zehn Minuten aufräumen' },
          { id: 'd14', text: 'Bei nicht notwendigen Käufen 24 Stunden warten' },
        ],
      },
    ],
  },
];

export const CHECKLISTS_DE_MAP: Record<string, Checklist> = Object.fromEntries(
  CHECKLISTS_DE.map(c => [c.slug, c]),
);

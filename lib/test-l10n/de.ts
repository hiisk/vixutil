import type { Test } from '../types.ts';

/** 독일어 심리테스트 — 구조와 점수는 [[lib/test-en.ts]]와 같다. */
export const TESTS_DE: Test[] = [
  {
    slug: 'social-battery',
    title: 'Social-Battery-Test',
    desc: 'Wie schnell Menschen dich leeren — und was dich wirklich auflädt',
    icon: '🔋',
    category: 'Persönlichkeit',
    questions: [
      { q: 'Nach einem langen Tag unter Menschen willst du vor allem:', opts: [
        { text: 'Ganz allein sein', score: 0 }, { text: 'Stille Gesellschaft', score: 1 },
        { text: 'Etwas Ruhiges mit einer Freundin oder einem Freund', score: 2 }, { text: 'Dass der Abend weitergeht', score: 3 }] },
      { q: 'Eine spontane Einladung fällt auf einen freien Abend.', opts: [
        { text: 'Ich sage fast automatisch ab', score: 0 }, { text: 'Ich wäge es sorgfältig ab', score: 1 },
        { text: 'Ich sage meistens zu', score: 2 }, { text: 'Ich sage zu, bevor ich die Details lese', score: 3 }] },
      { q: 'In einem Gruppengespräch neigst du dazu:', opts: [
        { text: 'Zuzuhören und selten zu reden', score: 0 }, { text: 'Vor allem mit der Person neben mir zu reden', score: 1 },
        { text: 'Mühelos mitzumachen', score: 2 }, { text: 'Es am Ende zu führen', score: 3 }] },
      { q: 'Ein Wochenende ohne Pläne fühlt sich an:', opts: [
        { text: 'Wie das Beste, was passieren konnte', score: 0 }, { text: 'Gut, mit einer kleinen Verabredung', score: 1 },
        { text: 'Etwas leer', score: 2 }, { text: 'Als wäre etwas schiefgelaufen', score: 3 }] },
      { q: 'Arbeiten in einem vollen Großraumbüro:', opts: [
        { text: 'Zerstört meine Konzentration', score: 0 }, { text: 'Geht mit Kopfhörern', score: 1 },
        { text: 'Ist an den meisten Tagen in Ordnung', score: 2 }, { text: 'Hält meine Energie oben', score: 3 }] },
      { q: 'Du kommst auf eine Feier, auf der du eine Person kennst.', opts: [
        { text: 'Ich bleibe den ganzen Abend bei ihr', score: 0 }, { text: 'Ich lerne über sie ein paar Leute kennen', score: 1 },
        { text: 'Ich wandere herum und rede mit mehreren Gruppen', score: 2 }, { text: 'Am Ende kenne ich den halben Raum', score: 3 }] },
      { q: 'Das Telefon klingelt, unbekannte Nummer.', opts: [
        { text: 'Ich gehe nie ran', score: 0 }, { text: 'Ich lasse es klingeln und schaue später', score: 1 },
        { text: 'Ich gehe ran, wenn ich Zeit habe', score: 2 }, { text: 'Ich gehe sofort ran', score: 3 }] },
      { q: 'Wie findest du lange Reisen in einer Gruppe?', opts: [
        { text: 'Ich brauche mein eigenes Zimmer und meinen Rhythmus', score: 0 }, { text: 'Geht gut, mit Pausen für mich', score: 1 },
        { text: 'Ich mag sie', score: 2 }, { text: 'Je mehr Leute, desto besser', score: 3 }] },
      { q: 'Nach einem gelungenen Abend unter Leuten fühlst du dich:', opts: [
        { text: 'Leer, auch wenn es schön war', score: 0 }, { text: 'Zufrieden, aber bereit aufzuhören', score: 1 },
        { text: 'Noch eine Weile aufgedreht', score: 2 }, { text: 'Bereit, es morgen zu wiederholen', score: 3 }] },
      { q: 'Im Mittelpunkt zu stehen ist:', opts: [
        { text: 'Wirklich unangenehm', score: 0 }, { text: 'Kurz in Ordnung', score: 1 },
        { text: 'Im richtigen Raum angenehm', score: 2 }, { text: 'Da bin ich am meisten ich selbst', score: 3 }] },
    ],
    results: [
      { min: 0, max: 12, emoji: '🕯️', title: 'Lädt in der Tiefe', color: 'from-slate-500 to-slate-700',
        desc: 'Deine Batterie leert sich in Gesellschaft schnell und füllt sich nur allein. Das ist keine Schüchternheit, sondern echter Energieverbrauch — und je eher du die Woche danach planst, statt dich dafür zu entschuldigen, desto besser läuft sie. Trag die Erholung so in den Kalender ein, wie du einen Termin eintragen würdest.',
        traits: ['Braucht Alleinsein', 'Tiefer Fokus', 'Wählerisch', 'Beständig'] },
      { min: 13, max: 14, emoji: '🌙', title: 'Stille Reserve', color: 'from-indigo-500 to-violet-600',
        desc: 'Du kommst mit Gesellschaft gut zurecht, zahlst aber hinterher dafür. Kleine Runden und vertraute Gesichter kosten dich fast nichts, große und fremde sehr viel. Einen wirklich leeren Abend pro Woche zu schützen reicht meistens, um im Gleichgewicht zu bleiben.',
        traits: ['Kleine Gruppen', 'Erholt sich allein', 'Nachdenklich', 'Warm im Zweiergespräch'] },
      { min: 15, max: 17, emoji: '🌤️', title: 'Ausgeglichene Ladung', color: 'from-sky-500 to-blue-600',
        desc: 'Du wechselst ohne viel Reibung zwischen Gesellschaft und Alleinsein, und das ist ein echter Vorteil. Das Risiko ist, die Erschöpfung erst zu merken, wenn sie sich aufgebaut hat — frag dich vor dem vierten Abend in Folge, wie es dir geht, nicht danach.',
        traits: ['Anpassungsfähig', 'Gesellig', 'Selbstaufmerksam', 'Ausgeglichen'] },
      { min: 18, max: 30, emoji: '⚡', title: 'Läuft auf Menschen', color: 'from-amber-400 to-orange-500',
        desc: 'Deine Energie kommt von anderen, deshalb liest sich ein leerer Kalender als Problem und nicht als Pause. Es lohnt sich zu wissen, dass Alleinsein dir immer noch etwas gibt, was Gesellschaft nicht kann — schon eine kurze stille Strecke schärft meist alles andere.',
        traits: ['Lädt an Menschen', 'Knüpft schnell an', 'Ausdrucksstark', 'Spontan'] },
    ],
  },
  {
    slug: 'stress-style',
    title: 'Wie du mit Stress umgehst',
    desc: 'Deine Standardreaktion unter Druck — und was du damit machst',
    icon: '🌊',
    category: 'Wohlbefinden',
    questions: [
      { q: 'Eine Frist wird um eine Woche vorgezogen. Dein erster Schritt:', opts: [
        { text: 'Erstarren und es eine Weile anstarren', score: 0 }, { text: 'Flaues Gefühl, dann Aufgaben auflisten', score: 1 },
        { text: 'Sofort neu planen', score: 2 }, { text: 'Ein bisschen anspringen', score: 3 }] },
      { q: 'Unter Stress ist dein Schlaf:', opts: [
        { text: 'Komplett hinüber', score: 0 }, { text: 'Kürzer', score: 1 },
        { text: 'Ungefähr normal', score: 2 }, { text: 'Unberührt', score: 3 }] },
      { q: 'Unter Druck redest du mit anderen:', opts: [
        { text: 'Gar nicht — ich werde still', score: 0 }, { text: 'Erst, wenn es vorbei ist', score: 1 },
        { text: 'Mit einer Person meines Vertrauens', score: 2 }, { text: 'Offen, während es passiert', score: 3 }] },
      { q: 'Dein Körper unter Stress:', opts: [
        { text: 'Kopf, Magen, Verspannung — alles davon', score: 0 }, { text: 'Ein zuverlässiges Symptom', score: 1 },
        { text: 'Nur leichte Anspannung', score: 2 }, { text: 'Merkt es kaum', score: 3 }] },
      { q: 'Wenn etwas schiefgeht, neigst du dazu:', opts: [
        { text: 'Es tagelang wieder abzuspielen', score: 0 }, { text: 'Einen Abend daran zu hängen', score: 1 },
        { text: 'Die Lehre mitzunehmen und weiterzugehen', score: 2 }, { text: 'Fast sofort weiterzumachen', score: 3 }] },
      { q: 'Bei zu vielen Aufgaben:', opts: [
        { text: 'Mache ich keine davon', score: 0 }, { text: 'Fange ich mit der leichtesten an', score: 1 },
        { text: 'Ordne ich sie und beginne oben', score: 2 }, { text: 'Gebe ich ab oder streiche welche', score: 3 }] },
      { q: 'Kritik bei der Arbeit trifft dich:', opts: [
        { text: 'Sehr hart, und lange', score: 0 }, { text: 'Hart, dann verblasst es', score: 1 },
        { text: 'Als Information', score: 2 }, { text: 'Als etwas Nützliches', score: 3 }] },
      { q: 'Dein üblicher Stressabbau ist:', opts: [
        { text: 'Ich habe keinen', score: 0 }, { text: 'Scrollen oder naschen', score: 1 },
        { text: 'Spazieren, Sport, ein Bad', score: 2 }, { text: 'Etwas Geplantes und Regelmäßiges', score: 3 }] },
      { q: 'In einer echten Krise bist du:', opts: [
        { text: 'Der Mensch, der in Panik gerät', score: 0 }, { text: 'Zittrig, aber funktionsfähig', score: 1 },
        { text: 'Ruhig genug', score: 2 }, { text: 'Der ruhigste Mensch im Raum', score: 3 }] },
      { q: 'Wenn du auf deinen letzten harten Monat schaust:', opts: [
        { text: 'Ich trage ihn immer noch', score: 0 }, { text: 'Es hat lange gedauert, ihn abzuschütteln', score: 1 },
        { text: 'Ich habe mich ordentlich erholt', score: 2 }, { text: 'Ich bin besser daraus hervorgegangen', score: 3 }] },
    ],
    results: [
      { min: 0, max: 12, emoji: '🫧', title: 'Nimmt alles auf', color: 'from-blue-500 to-indigo-700',
        desc: 'Druck geht durch deine Abwehr hindurch und bleibt im Körper. Das ernst zu nehmen lohnt mehr, als sich durchzubeißen: Das Muster, in dem Stress als Schlafverlust und körperliche Symptome auftaucht, summiert sich. Ein konkretes Ventil und eine Person zum Erzählen ändern meist mehr als jede Menge Vorsatz.',
        traits: ['Sehr empfindsam', 'Trägt es nach innen', 'Braucht Erholung', 'Einfühlsam'] },
      { min: 13, max: 14, emoji: '🌧️', title: 'Steht es langsam durch', color: 'from-sky-500 to-blue-600',
        desc: 'Du kommst durch harte Phasen, aber sie kosten dich etwas, und die Erholung dauert länger, als dir lieb ist. Der nützliche Zug ist, es früher zu bemerken — der Moment einzugreifen ist, wenn sich der Schlaf zuerst verschiebt, nicht wenn sich schon alles gestapelt hat.',
        traits: ['Hält durch', 'Erholt sich langsam', 'Gewissenhaft', 'Still belastbar'] },
      { min: 15, max: 17, emoji: '⛅', title: 'Stabil unter Last', color: 'from-emerald-500 to-teal-600',
        desc: 'Du hältst Druck aus, ohne dass er dich entgleisen lässt, vor allem weil du weiterarbeitest, während du ihn spürst. Das Risiko ist anzunehmen, dass es dir gut geht, weil du noch funktionierst: Unter Stress produktiv zu sein ist nicht dasselbe wie unberührt zu sein.',
        traits: ['Praktisch', 'Gefasst', 'Erholt sich gut', 'Verlässlich'] },
      { min: 18, max: 30, emoji: '🗿', title: 'Ruhe im Sturm', color: 'from-slate-600 to-slate-800',
        desc: 'Du bleibst gleichmütig, wenn es schiefgeht, und deshalb wenden sich andere in der Krise an dich. Achtung: Menschen mit dieser Ruhe unterschätzen oft die summierte Last, und die Leute um sie herum hören auf zu fragen, ob alles in Ordnung ist.',
        traits: ['Unerschütterlich', 'Entscheidungsfreudig', 'Vertrauenswürdig', 'Wenig reaktiv'] },
    ],
  },
  {
    slug: 'decision-style',
    title: 'Wie du Entscheidungen triffst',
    desc: 'Bauchgefühl, Logik oder irgendwo dazwischen',
    icon: '🧭',
    category: 'Persönlichkeit',
    questions: [
      { q: 'Mit Freunden einen Ort zum Essen aussuchen:', opts: [
        { text: 'Ich lese vorher jede Bewertung', score: 0 }, { text: 'Ich schaue in ein paar rein', score: 1 },
        { text: 'Ich schlage etwas vor, das mir gefallen hat', score: 2 }, { text: 'Ich nehme, was gut aussieht', score: 3 }] },
      { q: 'Eine große Anschaffung — wie lange überlegst du?', opts: [
        { text: 'Wochen, mit Tabellen', score: 0 }, { text: 'Ein paar Tage', score: 1 },
        { text: 'Einen Tag oder zwei', score: 2 }, { text: 'Wenn es sich richtig anfühlt, kaufe ich', score: 3 }] },
      { q: 'Wenn du entschieden hast, kommst du darauf zurück?', opts: [
        { text: 'Ständig', score: 0 }, { text: 'Manchmal', score: 1 },
        { text: 'Selten', score: 2 }, { text: 'Nie — es ist erledigt', score: 3 }] },
      { q: 'Jemand fragt dich um Rat. Du:', opts: [
        { text: 'Stelle viele Rückfragen', score: 0 }, { text: 'Lege die Optionen aus', score: 1 },
        { text: 'Sage, was ich täte', score: 2 }, { text: 'Sage es sofort geradeheraus', score: 3 }] },
      { q: 'Zwei gute Optionen, kein klarer Sieger:', opts: [
        { text: 'Ich zögere, bis die Umstände entscheiden', score: 0 }, { text: 'Ich mache eine Liste', score: 1 },
        { text: 'Ich schlafe einmal darüber', score: 2 }, { text: 'Ich gehe nach Instinkt', score: 3 }] },
      { q: 'Wie oft bereust du Entscheidungen?', opts: [
        { text: 'Oft, und lange', score: 0 }, { text: 'Manchmal', score: 1 },
        { text: 'Selten', score: 2 }, { text: 'Fast nie', score: 3 }] },
      { q: 'In einer Besprechung, in der niemand entscheidet:', opts: [
        { text: 'Warte ich auf jemand anderen', score: 0 }, { text: 'Frage ich, was uns fehlt', score: 1 },
        { text: 'Schlage ich etwas vor', score: 2 }, { text: 'Entscheide ich es und wir gehen weiter', score: 3 }] },
      { q: 'Vertraust du dem ersten Eindruck von einem Menschen?', opts: [
        { text: 'Überhaupt nicht', score: 0 }, { text: 'Ein wenig', score: 1 },
        { text: 'Meistens', score: 2 }, { text: 'Fast vollständig', score: 3 }] },
      { q: 'Wenn neue Informationen deiner Wahl widersprechen:', opts: [
        { text: 'Fällt die ganze Entscheidung auseinander', score: 0 }, { text: 'Überdenke ich sie ernsthaft', score: 1 },
        { text: 'Passe ich an, wenn es zählt', score: 2 }, { text: 'Bleibe ich meist auf Kurs', score: 3 }] },
      { q: 'Deine schlimmste Falle beim Entscheiden ist:', opts: [
        { text: 'Nie zu entscheiden', score: 0 }, { text: 'Zu spät zu entscheiden', score: 1 },
        { text: 'Zu entscheiden, ohne eine Sache zu prüfen', score: 2 }, { text: 'So schnell zu entscheiden, dass kein Zurück bleibt', score: 3 }] },
    ],
    results: [
      { min: 0, max: 12, emoji: '🔍', title: 'Die abwägende Art', color: 'from-slate-500 to-slate-700',
        desc: 'Du willst das ganze Bild, bevor du dich festlegst — deine Entscheidungen sind gut begründet und langsam. Der Preis ist real: Optionen laufen ab, während du recherchierst, und die Unruhe einer offenen Entscheidung wiegt oft schwerer als das Risiko einer leicht falschen. Setz der Wahl selbst eine Frist, nicht nur dem Ergebnis.',
        traits: ['Gründlich', 'Risikobewusst', 'Analytisch', 'Legt sich langsam fest'] },
      { min: 13, max: 14, emoji: '⚖️', title: 'Die abwiegende Art', color: 'from-sky-500 to-indigo-600',
        desc: 'Du sammelst genug, um dir sicher zu sein, und entscheidest dann — eine gute Grundeinstellung. Achte auf das Muster, in dem die letzten 10 % der Recherche 90 % der Zeit fressen und nichts ändern.',
        traits: ['Ausgewogen', 'Bedacht', 'Praktisch', 'Vernünftig'] },
      { min: 15, max: 17, emoji: '🎯', title: 'Die entscheidende Art', color: 'from-emerald-500 to-teal-600',
        desc: 'Du bewegst dich schnell mit genug Informationen und schaust selten zurück, was dich in Räumen nützlich macht, in denen sonst niemand es ausspricht. Die eine Gewohnheit, die es zu behalten lohnt: Benenne die Annahme, auf die du wettest, damit du merkst, wenn sie sich als falsch erweist.',
        traits: ['Entschlossen', 'Selbstsicher', 'Vorwärtsgewandt', 'Wenig Reue'] },
      { min: 18, max: 30, emoji: '⚡', title: 'Die instinktive Art', color: 'from-amber-400 to-rose-500',
        desc: 'Du vertraust deinem Bauch und handelst schnell, was in beweglichen Lagen wirklich ein Vorteil ist. Bei den unumkehrbaren wird es zur Schwäche — die nützliche Regel lautet, genau bei den Entscheidungen langsamer zu werden, die du nicht rückgängig machen kannst, und bei allem anderen das Tempo zu halten.',
        traits: ['Schnell', 'Intuitiv', 'Handlungsorientiert', 'Entschlossen'] },
    ],
  },
  {
    slug: 'work-style',
    title: 'Dein Arbeitsstil',
    desc: 'Wie du tatsächlich Dinge fertig bekommst, nicht wie du meinst, dass es sein sollte',
    icon: '💼',
    category: 'Arbeit',
    questions: [
      { q: 'Deine beste Arbeit entsteht:', opts: [
        { text: 'In einem langen ungestörten Block', score: 0 }, { text: 'In zwei, drei konzentrierten Strecken', score: 1 },
        { text: 'In kürzeren Schüben über den Tag', score: 2 }, { text: 'Immer wenn etwas dringend ist', score: 3 }] },
      { q: 'Deine To-do-Liste ist:', opts: [
        { text: 'Detailliert und gepflegt', score: 0 }, { text: 'Eine grobe Liste, der ich meistens folge', score: 1 },
        { text: 'Ein paar Notizen', score: 2 }, { text: 'In meinem Kopf', score: 3 }] },
      { q: 'Ein großes Projekt kommt ohne Frist:', opts: [
        { text: 'Ich setze mir eine und halte sie', score: 0 }, { text: 'Ich setze mir eine und halte sie meistens', score: 1 },
        { text: 'Ich fange an, wenn ich bereit bin', score: 2 }, { text: 'Es wartet, bis etwas es erzwingt', score: 3 }] },
      { q: 'Wenn du feststeckst:', opts: [
        { text: 'Beiße ich mich weiter fest', score: 0 }, { text: 'Mache ich kurz Pause und komme zurück', score: 1 },
        { text: 'Wechsle ich zu einer anderen Aufgabe', score: 2 }, { text: 'Frage ich sofort jemanden', score: 3 }] },
      { q: 'Besprechungen in deiner Woche:', opts: [
        { text: 'Zerreißen mir den ganzen Tag', score: 0 }, { text: 'Sind erträglich, wenn sie gebündelt sind', score: 1 },
        { text: 'Sind ein normaler Teil davon', score: 2 }, { text: 'Sind der Ort, an dem ich am besten denke', score: 3 }] },
      { q: 'Du bevorzugst Arbeit, die:', opts: [
        { text: 'Tief und allein ist', score: 0 }, { text: 'Meist allein mit Abstimmungen ist', score: 1 },
        { text: 'Gemeinsam ist', score: 2 }, { text: 'Ständig im Gespräch stattfindet', score: 3 }] },
      { q: 'Dein Verhältnis zu Fristen:', opts: [
        { text: 'Ich bin weit vorher fertig', score: 0 }, { text: 'Ich bin bequem fertig', score: 1 },
        { text: 'Ich werde gerade rechtzeitig fertig', score: 2 }, { text: 'Ich arbeite am Rand am besten', score: 3 }] },
      { q: 'Eine Aufgabe, die dich langweilt:', opts: [
        { text: 'Mache ich zuerst, um sie loszuwerden', score: 0 }, { text: 'Trage ich mir ein', score: 1 },
        { text: 'Schiebe ich eine Weile', score: 2 }, { text: 'Bleibt auf unbestimmte Zeit liegen', score: 3 }] },
      { q: 'Rückmeldung zu unfertiger Arbeit:', opts: [
        { text: 'Ich würde lieber erst fertig werden', score: 0 }, { text: 'An ein paar Zwischenpunkten', score: 1 },
        { text: 'Ziemlich oft', score: 2 }, { text: 'Ständig, während ich arbeite', score: 3 }] },
      { q: 'Dein Arbeitsplatz:', opts: [
        { text: 'Muss aufgeräumt sein, damit ich anfange', score: 0 }, { text: 'Ist grob geordnet', score: 1 },
        { text: 'Ist bewohnt', score: 2 }, { text: 'Ist ein Chaos, das funktioniert', score: 3 }] },
    ],
    results: [
      { min: 0, max: 12, emoji: '🎯', title: 'Tiefarbeiterin oder Tiefarbeiter', color: 'from-indigo-500 to-violet-700',
        desc: 'Du leistest am meisten in langen, ruhigen Strecken und baust alles darum herum, um sie zu schützen. Das erzeugt echte Tiefe, macht dich aber anfällig für Unterbrechungen — die lohnende Investition ist, zwei oder drei Blöcke pro Woche kompromisslos zu verteidigen und beim Rest flexibel zu sein.',
        traits: ['Fokussiert', 'Strukturiert', 'Eigenständig', 'Unterbrechungsscheu'] },
      { min: 13, max: 14, emoji: '📋', title: 'Verlässliche Planung', color: 'from-sky-500 to-blue-600',
        desc: 'Du planst, teilst dir ein, und die Dinge landen, wenn du es gesagt hast. Diese Verlässlichkeit ist mehr wert, als die meisten denken. Prüfe nur gelegentlich, ob der Plan noch der Arbeit dient und nicht umgekehrt.',
        traits: ['Verlässlich', 'Organisiert', 'Gut eingeteilt', 'Beständig'] },
      { min: 15, max: 17, emoji: '🔄', title: 'Bewegliche Arbeitsweise', color: 'from-emerald-500 to-teal-600',
        desc: 'Du arbeitest in Schüben, wechselst mühelos und bleibst ansprechbar für alles, was aufkommt. Das passt gut zu schnellen Umfeldern. Zu beobachten ist, dass ständiges Wechseln sich produktiv anfühlt und zugleich wirklich schwere Probleme schwerer zu Ende bringen lässt.',
        traits: ['Anpassungsfähig', 'Ansprechbar', 'Kooperativ', 'Schnell'] },
      { min: 18, max: 30, emoji: '🔥', title: 'Läuft unter Druck', color: 'from-amber-400 to-rose-500',
        desc: 'Dringlichkeit schaltet dich ein, und direkt an der Frist lieferst du gut ab. Das funktioniert — bis zwei Fristen zusammenfallen. Sich frühere, kleinere Fristen zu bauen ist die übliche Lösung, und sie funktioniert besser als der Versuch, ein anderer Typ Mensch zu werden.',
        traits: ['Schnell unter Druck', 'Improvisiert', 'Energiegeladen', 'Von Fristen getrieben'] },
    ],
  },
  {
    slug: 'love-language',
    type: 'category',
    title: 'Wie du Zuneigung zeigst',
    desc: 'Wie du Fürsorge ausdrückst — und wie du sie bekommen möchtest',
    icon: '💝',
    category: 'Beziehungen',
    questions: [
      { q: 'Dein Gegenüber hatte einen furchtbaren Tag. Du:', opts: [
        { text: 'Sage genau, was ich an ihr oder ihm schätze', score: 0, k: 'words' },
        { text: 'Setze mich dazu, ohne viel zu sagen', score: 1, k: 'time' },
        { text: 'Nehme ihr oder ihm still etwas ab', score: 2, k: 'acts' },
        { text: 'Bringe etwas mit, das sie oder er mag', score: 3, k: 'gifts' }] },
      { q: 'Wobei fühlst du dich am meisten umsorgt?', opts: [
        { text: 'Wenn es laut ausgesprochen wird', score: 0, k: 'words' }, { text: 'Ungeteilte gemeinsame Zeit', score: 1, k: 'time' },
        { text: 'Wenn mir jemand etwas abnimmt', score: 2, k: 'acts' }, { text: 'Ein durchdachter Gegenstand', score: 3, k: 'gifts' }] },
      { q: 'Dein Instinkt an einem Jahrestag:', opts: [
        { text: 'Etwas schreiben', score: 0, k: 'words' }, { text: 'Einen ganzen Tag zusammen planen', score: 1, k: 'time' },
        { text: 'Etwas Praktisches erledigen, das gefehlt hat', score: 2, k: 'acts' }, { text: 'Das richtige Geschenk finden', score: 3, k: 'gifts' }] },
      { q: 'Was tut in einer Beziehung am meisten weh?', opts: [
        { text: 'Nie zu hören, dass es gut läuft', score: 0, k: 'words' }, { text: 'Körperlich da, aber abgelenkt', score: 1, k: 'time' },
        { text: 'Alles allein stemmen zu müssen', score: 2, k: 'acts' }, { text: 'An dem Tag vergessen zu werden, der zählte', score: 3, k: 'gifts' }] },
      { q: 'Eine Freundin oder ein Freund macht Schweres durch:', opts: [
        { text: 'Ich sage, was ich von ihr oder ihm halte', score: 0, k: 'words' }, { text: 'Ich mache einen Abend frei', score: 1, k: 'time' },
        { text: 'Ich regle etwas Praktisches', score: 2, k: 'acts' }, { text: 'Ich schicke etwas', score: 3, k: 'gifts' }] },
      { q: 'Du zeigst, dass du jemanden vermisst hast, indem du:', opts: [
        { text: 'Es direkt sagst', score: 0, k: 'words' }, { text: 'Sofort Zeit frei machst', score: 1, k: 'time' },
        { text: 'Etwas für die Person tust', score: 2, k: 'acts' }, { text: 'Etwas mitbringst', score: 3, k: 'gifts' }] },
      { q: 'Das Kompliment, das am tiefsten trifft:', opts: [
        { text: 'Etwas Konkretes darüber, wer ich bin', score: 0, k: 'words' }, { text: '„Ich will immer mehr Zeit mit dir“', score: 1, k: 'time' },
        { text: '„Du kümmerst dich immer um alles“', score: 2, k: 'acts' }, { text: '„Ich habe das gesehen und an dich gedacht“', score: 3, k: 'gifts' }] },
      { q: 'Was repariert einen Streit am schnellsten?', opts: [
        { text: 'Zu hören, was die Person weiter an mir schätzt', score: 0, k: 'words' }, { text: 'Sich richtig zusammenzusetzen und zu reden', score: 1, k: 'time' },
        { text: 'Dass sie etwas tut, das es zeigt', score: 2, k: 'acts' }, { text: 'Eine Geste, die sagt, dass sie darüber nachgedacht hat', score: 3, k: 'gifts' }] },
      { q: 'Dein Gegenüber ist einen Monat weg. Du:', opts: [
        { text: 'Schickst lange Nachrichten', score: 0, k: 'words' }, { text: 'Planst Anrufe eisern ein', score: 1, k: 'time' },
        { text: 'Regelst zu Hause alles, damit sie oder er sich nicht sorgen muss', score: 2, k: 'acts' }, { text: 'Schickst Dinge mit der Post', score: 3, k: 'gifts' }] },
      { q: 'Was würdest du zuerst vermissen?', opts: [
        { text: 'Zu hören, wie die Person fühlt', score: 0, k: 'words' }, { text: 'Echte gemeinsame Zeit', score: 1, k: 'time' },
        { text: 'Hilfe zu bekommen, ohne zu fragen', score: 2, k: 'acts' }, { text: 'Kleine durchdachte Überraschungen', score: 3, k: 'gifts' }] },
    ],
    results: [
      { min: 0, max: 0, k: 'words', emoji: '💬', title: 'Worte', color: 'from-sky-500 to-blue-600',
        desc: 'Du gibst und empfängst Zuneigung über das, was gesagt wird. Klar zu hören, was jemand an dir schätzt, trifft tiefer als jede Geste, und Schweigen liest sich als Distanz, auch wenn nichts ist. Es lohnt sich, das auszusprechen — Menschen, die Liebe anders zeigen, halten es oft für offensichtlich.',
        traits: ['Sprachlich', 'Direkt', 'Ausdrucksstark', 'Beruhigend'] },
      { min: 0, max: 0, k: 'time', emoji: '⏳', title: 'Zeit', color: 'from-violet-500 to-purple-600',
        desc: 'Aufmerksamkeit ist für dich die Währung. Jemand, der wirklich da ist, Handy weg, zählt mehr als alles, was gekauft oder gesagt werden könnte. Die Kehrseite: ein Gegenüber, das körperlich anwesend, aber abgelenkt ist, kommt als Abwesenheit an — das sollte man benennen, statt es übelzunehmen.',
        traits: ['Präsent', 'Aufmerksam', 'Geduldig', 'Auf Verbindung aus'] },
      { min: 0, max: 0, k: 'acts', emoji: '🛠️', title: 'Taten', color: 'from-emerald-500 to-teal-600',
        desc: 'Du zeigst Fürsorge, indem du Dinge tust, und du merkst es, wenn jemand still das erledigt, wovor dir graute. Deine Zuneigung kann für Menschen unsichtbar sein, die darauf warten, sie zu hören — deshalb lohnt es sich, es gelegentlich auch zu sagen und nicht nur zu tun.',
        traits: ['Praktisch', 'Zuverlässig', 'Aufmerksam', 'Zurückhaltend'] },
      { min: 0, max: 0, k: 'gifts', emoji: '🎁', title: 'Zeichen', color: 'from-rose-400 to-pink-600',
        desc: 'Für dich trägt ein Gegenstand den Gedanken dahinter — „ich habe das gesehen und an dich gedacht“ ist der ganze Punkt, nicht der Preis. Deshalb schmerzt es unverhältnismäßig, an einem Datum vergessen zu werden, das zählte. Das zu erklären lohnt mehr, als zu erwarten, dass es jemand errät.',
        traits: ['Aufmerksam', 'Symbolisch', 'Achtet auf Details', 'Bewahrt Erinnerungen'] },
    ],
  },
];

export const TESTS_DE_MAP: Record<string, Test> = Object.fromEntries(
  TESTS_DE.map(t => [t.slug, t]),
);

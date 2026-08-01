import type { DreamCopy } from './types.ts';

/** 독일어 꿈해몽 */
export const DE: DreamCopy = {
  categories: {
    Animals: 'Tiere', Body: 'Körper', Movement: 'Bewegung', Nature: 'Natur',
    Objects: 'Gegenstände', People: 'Menschen', Places: 'Orte', Situations: 'Situationen',
  },
  luck: { '2': 'Sehr gut', '1': 'Gut', '0': 'Neutral', '-1': 'Vorsicht', '-2': 'Warnung' },
  ui: {
    title: 'Traumdeutungs-Lexikon',
    lead: 'Zwanzig Traumsymbole, die über Kulturen hinweg auftauchen — und wie sie üblicherweise gelesen werden',
    search: 'Symbol suchen…',
    all: 'Alle',
    none: 'Zu dieser Suche gibt es nichts.',
    note: 'Traumdeutung hat keine wissenschaftliche Grundlage. Hier steht, wie diese Symbole überliefert gelesen werden und in welchen Situationen sie berichtet werden — keine Vorhersage.',
  },
  entries: {
    falling: {
      keyword: 'Fallen', summary: 'Irgendwo im Wachleben entgleitet die Kontrolle',
      detail: [
        'Fallträume tauchen meist auf, wenn dir etwas aus der Hand gleitet — eine Stelle, eine Beziehung, eine Entscheidung, die dir abgenommen wurde.',
        'Entscheidend ist, was auf dem Weg nach unten passiert. Sicher zu landen oder vor dem Aufprall aufzuwachen wird gelesen als: die Lage ist überstehbar.',
        'Sie gehören zu den häufigsten Träumen überhaupt und häufen sich in Zeiten der Veränderung, statt irgendetwas vorherzusagen.',
      ],
    },
    teeth: {
      keyword: 'Zahnverlust', summary: 'Sorge darum, wie du gesehen wirst',
      detail: [
        'Ausfallende Zähne sind weltweit einer der meistberichteten Träume und hängen meist mit Sorgen um Aussehen, Älterwerden oder die eigene Wirkung zusammen.',
        'Er erscheint oft vor etwas, wo du bewertet wirst — eine Präsentation, ein Gespräch, eine erste Begegnung.',
        'Manche Überlieferungen lesen ihn als Nachricht aus der Familie. Die Angst-Lesart ist die häufigere und passt meist besser.',
      ],
    },
    flying: {
      keyword: 'Fliegen', summary: 'Freiheit — oder der Wunsch danach',
      detail: [
        'Flugträume werden als Gefühl der Befreiung gelesen: von einer Bindung, einer Rolle oder einer Phase, die schwer war.',
        'Leicht und hoch zu fliegen ist die positive Form. Sich mühsam oben zu halten oder gar nicht abzuheben, deutet auf etwas, das dich noch festhält.',
        'Berichtet wird davon häufig während oder direkt nach dem Ende einer schwierigen Strecke.',
      ],
    },
    chased: {
      keyword: 'Verfolgt werden', summary: 'Etwas, dem du ausweichst',
      detail: [
        'Verfolgt zu werden wird meist als Vermeidung gelesen — ein Gespräch, eine Entscheidung oder ein Gefühl, vor dem du davonläufst.',
        'Was dich verfolgt, zählt weniger als die Tatsache, dass du rennst. Sich im Traum umzudrehen wird oft als der Punkt berichtet, an dem sich etwas verschiebt.',
        'Diese Träume kehren wieder, solange das Vermiedene ungeklärt bleibt, und hören meist auf, sobald es angegangen wird.',
      ],
    },
    water: {
      keyword: 'Wasser', summary: 'Der Zustand deiner Gefühle',
      detail: [
        'Wasser wird als Gefühl gelesen, und sein Zustand ist die Deutung. Klares, ruhiges Wasser heißt: es ist gesetzt; trübes oder aufgewühltes: eher nicht.',
        'Tiefes Wasser wird oft mit etwas verbunden, das du noch nicht ganz angesehen hast. Dich darin wohlzufühlen ist ein gutes Zeichen.',
        'Überschwemmung erscheint besonders dann, wenn sich Gefühl schneller angesammelt hat, als es verarbeitet werden konnte.',
      ],
    },
    snake: {
      keyword: 'Schlange', summary: 'Verwandlung — oder eine verborgene Sorge',
      detail: [
        'Schlangen tragen zwei Lesarten zugleich: Erneuerung, weil sie sich häuten, und Bedrohung, weil sie Schlangen sind. Welche gilt, hängt vom Gefühl im Traum ab.',
        'Eine ruhige Schlange wird meist als bereits laufende Veränderung gelesen. Eine bedrohliche deutet auf etwas, das du ahnst, aber nicht benannt hast.',
        'In mehreren Überlieferungen zählt die Farbe — goldene oder weiße Schlangen werden deutlich positiver gelesen als dunkle.',
      ],
    },
    house: {
      keyword: 'Ein Haus', summary: 'Du selbst, in Bauform',
      detail: [
        'Ein Haus im Traum wird gemeinhin als das Selbst gelesen, wobei jeder Raum für einen anderen Teil deines Lebens steht.',
        'Einen Raum zu finden, von dem du nichts wusstest, ist eine der meistberichteten Varianten und gilt als das Entdecken ungenutzter Fähigkeit.',
        'Ein verfallenes Haus deutet eher auf etwas Vernachlässigtes als auf das Gebäude selbst.',
      ],
    },
    death: {
      keyword: 'Tod', summary: 'Ein Ende, keine Vorhersage',
      detail: [
        'Todesträume werden fast durchweg als Enden und Übergänge gelesen, nicht als wörtliche Warnungen.',
        'Vom eigenen Tod zu träumen gilt meist als das Schließen einer Phase — eine Stelle, eine Beziehung, eine Version von dir.',
        'Diese Träume häufen sich bei echten Lebensveränderungen; deshalb wirken sie bedeutsam, obwohl die wörtliche Lesart nicht die nützliche ist.',
      ],
    },
    baby: {
      keyword: 'Ein Baby', summary: 'Etwas Neues beginnt',
      detail: [
        'Babys werden als Anfänge gelesen — ein Vorhaben, eine Beziehung, eine Version deines Lebens, die gerade beginnt.',
        'Das Baby mühelos zu versorgen ist die positive Form. Es zu verlieren oder zu vergessen deutet auf etwas Neues, dem du zu wenig Aufmerksamkeit gibst.',
        'Sie sind häufig in Zeiten wirklich neuer Verantwortung, ob Kinder im Spiel sind oder nicht.',
      ],
    },
    money: {
      keyword: 'Geld', summary: 'Wert und Selbstwert',
      detail: [
        'Geld im Traum handelt weniger von tatsächlichen Finanzen als davon, wie viel du dir selbst wert bist.',
        'Geld zu finden wird damit verbunden, etwas zu erkennen, das du längst hattest. Es zu verlieren deutet auf das Gefühl, unterschätzt zu werden.',
        'Die Überlieferungen gehen hier stark auseinander, deshalb ist das Gefühl im Traum ein besserer Wegweiser als jede feste Bedeutung.',
      ],
    },
    exam: {
      keyword: 'Eine Prüfung', summary: 'Sich geprüft oder unvorbereitet fühlen',
      detail: [
        'Prüfungsträume — unvorbereitet, zu spät, im falschen Raum — gehören zu den häufigsten Angstträumen und halten oft Jahrzehnte nach der Schulzeit an.',
        'Sie erscheinen typischerweise vor etwas, wo du beurteilt wirst, nicht vor tatsächlichen Prüfungen.',
        'Die wiederkehrende Fassung passt meist auf eine konkrete Lage, in der du dich bewertet fühlst.',
      ],
    },
    naked: {
      keyword: 'Nackt in der Öffentlichkeit', summary: 'Angst, so gesehen zu werden, wie du bist',
      detail: [
        'In der Öffentlichkeit entblößt zu sein wird als Verletzlichkeit gelesen — die Sorge, dass etwas an dir sichtbar wird, bevor du bereit bist.',
        'Dass im Traum niemand reagiert, ist ein häufiges Detail und wird meist gelesen als: die Angst ist größer als die Wirklichkeit.',
        'Solche Träume erscheinen oft vor etwas wirklich Exponierendem: ein neuer Job, ein Vortrag, eine Beziehung, die ernst wird.',
      ],
    },
    fire: {
      keyword: 'Feuer', summary: 'Intensität — schöpferisch oder zerstörerisch',
      detail: [
        'Feuer trägt beide Lesarten: Leidenschaft und Antrieb auf der einen Seite, Zerstörung und Zorn auf der anderen.',
        'Ein kontrolliertes Feuer wird positiv gelesen — Energie, die eingesetzt wird. Ein unkontrolliertes deutet auf etwas, das dir davonläuft.',
        'In mehreren Überlieferungen wird Feuer eigens mit Wohlstand und rascher Veränderung verbunden.',
      ],
    },
    lost: {
      keyword: 'Sich verirren', summary: 'Unsicherheit über die Richtung',
      detail: [
        'Sich zu verirren wird als Unsicherheit darüber gelesen, wohin du unterwegs bist — beruflich oder im Leben überhaupt.',
        'Vertraute Orte, die fremd geworden sind, sind eine häufige Variante und deuten meist auf eine Lage, die sich unter dir verändert hat.',
        'Im Traum den Weg zu finden wird häufiger als Wendepunkt berichtet denn nicht.',
      ],
    },
    cat: {
      keyword: 'Eine Katze', summary: 'Eigenständigkeit — und was du für dich behältst',
      detail: [
        'Katzen werden meist als Eigenständigkeit und Intuition gelesen, manchmal als die Teile von dir, die du für dich behältst.',
        'Eine zutrauliche Katze wird positiv gelesen. Eine aggressive wird oft mit einer Beziehung verbunden, in der etwas unausgesprochen ist.',
        'Bei Katzen gehen die Überlieferungen weiter auseinander als bei fast jedem anderen Tier.',
      ],
    },
    bird: {
      keyword: 'Vögel', summary: 'Nachrichten — oder der Wunsch, anderswo zu sein',
      detail: [
        'Vögel werden weithin als Botschaften und als Freiheit gelesen, je nachdem, ob sie ankommen oder fortziehen.',
        'Ein Vogel im Käfig ist ein starkes, überlieferungsübergreifend gleichbleibendes Bild — etwas in dir, das nicht herausgelassen wird.',
        'Schwärme werden oft mit eintreffenden Nachrichten verbunden, manchmal aus der Ferne.',
      ],
    },
    mountain: {
      keyword: 'Ein Berg', summary: 'Ein Hindernis — oder ein Ziel',
      detail: [
        'Berge werden als etwas Großes vor dir gelesen — das kann ein Hindernis oder ein Ziel sein, oft beides.',
        'Das Steigen ist die positive Form. Am Fuß zu stehen und nicht anfangen zu können, deutet auf etwas, das sich unerreichbar anfühlt.',
        'Den Gipfel zu erreichen ist eines der über Überlieferungen hinweg beständig positivsten Traumbilder.',
      ],
    },
    mirror: {
      keyword: 'Ein Spiegel', summary: 'Wie du dich selbst siehst',
      detail: [
        'Spiegel werden als Selbstwahrnehmung gelesen — wie du dich siehst, nicht wie andere dich sehen.',
        'Ein verzerrtes oder unklares Spiegelbild wird meist mit Unsicherheit über Identität oder Richtung verbunden.',
        'Zerbrochene Spiegel tragen den Aberglauben vom Unglück; in der Traumdeutung deuten sie häufiger auf ein gesprungenes Selbstbild als auf Missgeschick.',
      ],
    },
    rain: {
      keyword: 'Regen', summary: 'Lösung — und was danach kommt',
      detail: [
        'Regen wird als Lösung und Reinigung gelesen — er erscheint meist nach einer emotional schweren Zeit, nicht davor.',
        'Sanfter Regen wird positiv gelesen. Ein Sturm deutet auf etwas, das noch offen ist.',
        'Ob du im Trockenen stehst oder im Regen — an diesem Detail hängen die meisten Deutungen.',
      ],
    },
    road: {
      keyword: 'Eine Straße', summary: 'Der Weg, auf dem du bist',
      detail: [
        'Straßen werden als Lebensrichtung gelesen, Gabelungen stehen für Entscheidungen, die du siehst, aber vielleicht aufschiebst.',
        'Eine freie Straße voraus ist schlicht positiv. Eine blockierte oder endende deutet auf einen Plan, der überdacht werden will.',
        'Wer mit dir unterwegs ist, ist oft das aufschlussreichere Detail.',
      ],
    },
  },
};

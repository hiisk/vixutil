import type { MatchCopy } from './types.ts';

/** 독일어 궁합 문구 */
export const DE: MatchCopy = {
  zodiac: {
    yukhap: {
      label: 'Perfektes Paar (Sechs Harmonien)', headline: 'Die Kombination, die sich anzieht',
      reason: 'Im chinesischen Tierkreis bilden diese beiden ein Sechs-Harmonien-Paar — die klassische Verbindung, in der jeder deckt, was dem anderen fehlt.',
      love: 'Die Anziehung stellt sich leicht ein, und Zusammensein fühlt sich selbstverständlich an. Ihr findet ohne Anstrengung zueinander.',
      advice: 'Wenn es so gut passt, hält man es schnell für gegeben. Getragen wird es von den kleinen, beständigen Gesten.',
    },
    samhap: {
      label: 'Sehr gute Verbindung (Drei Harmonien)', headline: 'Aus demselben Trio — ihr versteht euch einfach',
      reason: 'Diese beiden gehören zur selben Drei-Harmonien-Gruppe, einem Trio, das traditionell als von Haus aus gleichgesinnt gilt.',
      love: 'Eure Werte decken sich, was das auf lange Sicht gut trägt. Am Ende ist es so unkompliziert wie unter Freunden.',
      advice: 'Je leichter die Bindung, desto mehr zählen die Umgangsformen. Lass Vertrautheit nicht zu Unaufmerksamkeit werden.',
    },
    same: {
      label: 'Spiegelbild', headline: 'Ähnlich genug, um leicht zu sein — und um zu kollidieren',
      reason: 'Gleiches Zeichen, also laufen eure Temperamente ähnlich. Ihr versteht einander gut und stolpert über dieselben Dinge.',
      love: 'Es wird viele Momente geben, in denen nichts gesagt werden muss. Nur teilt ihr womöglich denselben blinden Fleck.',
      advice: 'Genießt das Gemeinsame und vereinbart, euch dort zu decken, wo ihr beide schwach seid.',
    },
    neutral: {
      label: 'Solide Verbindung', headline: 'Gut, solange ihr euch auf halbem Weg trefft',
      reason: 'Hier gibt es keine besondere überlieferte Beziehung — dort liegen die meisten Paare. Es kommt darauf an, wie ihr miteinander umgeht.',
      love: 'Kann zuerst unscheinbar wirken und dann wachsen. Es vertieft sich, wenn ihr mit Zuneigung nicht geizt.',
      advice: 'Sagt laut, was ihr erwartet. Das Tempo aneinander anzupassen ist die ganze Sache.',
    },
    clash: {
      label: 'Braucht Arbeit', headline: 'Gegenüberliegende Zeichen — Reibung kommt von selbst',
      reason: 'Diese stehen sich im Tierkreis direkt gegenüber, ein Kollisionspaar. Es wird holpern, aber aus dem Unterschied lässt sich viel lernen.',
      love: 'Am Anfang kann es Reibereien geben. Nehmt die Unterschiede an, und ihr werdet ein Paar, das einander wachsen lässt.',
      advice: 'Der Schlüssel ist, „anders" nicht als „falsch" zu lesen. Ein Schritt von jedem, und aus Kollision wird Chemie.',
    },
  },
  star: {
    'same-element': {
      label: 'Perfektes Paar (gleiches Element)', headline: 'Dieselbe Wellenlänge — das Reden geht leicht',
      reason: 'Beide Zeichen teilen ein Element, also nehmt ihr die Welt gleich auf und versteht euch schnell.',
      love: 'Die Schnittmenge ist groß und das Gespräch fließt. Es läuft bequem, mit wenig Reibung.',
      advice: 'So viel Ähnlichkeit kann in Bequemlichkeit kippen. Schafft absichtlich neue gemeinsame Erlebnisse.',
    },
    complement: {
      label: 'Sehr gute Verbindung (ergänzende Elemente)', headline: 'Ihr hebt einander',
      reason: 'Diese Elemente ergänzen sich (Feuer↔Luft, Erde↔Wasser) — jedes liefert, woran es dem anderen fehlt.',
      love: 'Eine Seite bringt die Wärme, die andere die Ruhe. Ihr seid füreinander Anregung und Erholung zugleich.',
      advice: 'Der Unterschied ist der Reiz. Genieß die Art des anderen, statt sie ändern zu wollen.',
    },
    'same-sign': {
      label: 'Spiegelbild', headline: 'Ähnlich genug, um leicht zu sein — Schwachstellen inklusive',
      reason: 'Gleiches Zeichen, gleiches Temperament. Bequem, aber ihr teilt womöglich denselben blinden Fleck und müsst euch decken.',
      love: 'Geschmack und Rhythmus passen, also ist es von Anfang an leicht. Nur seid ihr vielleicht an denselben Stellen ungeschickt.',
      advice: 'Genießt das Gemeinsame und klärt vorher, wer übernimmt, was keinem von euch liegt.',
    },
    challenge: {
      label: 'Braucht Arbeit', headline: 'Verschiedene Elemente — ihr müsst euch in der Mitte treffen',
      reason: 'Verschiedene Elemente können anfangs schaben. Aber je weiter ihr auseinander startet, desto mehr gibt es voneinander zu lernen.',
      love: 'Am Anfang kann es reiben. Achtet den Unterschied, und daraus wird die Art Beziehung, die hält.',
      advice: 'Lies „anders" nicht als „falsch". Geht aufeinander zu, und aus Reibung wird Chemie.',
    },
  },
  mbti: {
    best: {
      label: 'Perfektes Paar', headline: 'Ihr seht die Dinge gleich und ergänzt euch',
      reason: '',
      love: 'Werte und Gespräch stimmen überein, also ist es ruhig und aufregend zugleich. Ihr werdet füreinander der Ort zum Landen.',
      advice: 'Wenn es so gut passt, hält man es schnell für gegeben. Getragen wird es von den kleinen, beständigen Gesten.',
    },
    good: {
      label: 'Gute Verbindung', headline: 'Das Gespräch kommt von allein',
      reason: '',
      love: 'Ihr überschneidet euch an vielen Stellen, was das Reden vergnüglich macht. Die Unterschiede wirken erfrischend statt anstrengend.',
      advice: 'Genießt die Überschneidung und nehmt die Unterschiede an, statt sie zu redigieren.',
    },
    ok: {
      label: 'Solide Verbindung', headline: 'Gut genug, wenn ihr euch auf halbem Weg trefft',
      reason: '',
      love: 'Am Anfang braucht es etwas Abstimmung, dann wächst es, je mehr ihr voneinander erfahrt.',
      advice: 'Sagt eure Erwartungen klar, dann sinken die Missverständnisse. Das Tempo anzugleichen ist die ganze Sache.',
    },
    work: {
      label: 'Braucht Arbeit', headline: 'Verschieden genug, dass es viel zu lernen gibt',
      reason: '',
      love: 'Viele Unterschiede, also rechne anfangs mit Reibereien. Achtet sie, und ihr wachst gemeinsam.',
      advice: 'Lies es als „anders", nicht als „falsch". Geht aufeinander zu, und aus Reibung wird Chemie.',
    },
  },
  axis: {
    nsSame: 'Ihr nehmt die Welt gleich auf (N/S), darum kommt das Gespräch an',
    nsDiff: 'Ihr nehmt die Welt unterschiedlich auf (N/S), darum können die Perspektiven auseinandergehen',
    tfSame: 'Auch eure Entscheidungsgrundlage (T/F) ähnelt sich, was Entscheidungen glättet',
    tfDiff: 'Eure Entscheidungsgrundlage (T/F) unterscheidet sich, das reibt, schafft aber auch Ausgleich',
    eiDiff: 'Eure Energie läuft in entgegengesetzte Richtungen (E/I), so füllt ihr euch den Rhythmus wieder auf',
    jpDiff: 'Ihr lebt unterschiedlich (J/P) und mischt Beweglichkeit mit Planung',
    join: '. ', end: '.',
  },
  blood: {
    'A-A': {
      label: 'Ruhig und beständig', headline: 'Zwei Menschen, die einander leicht lesen',
      reason: 'Ihr seid beide aufmerksam und rücksichtsvoll, also merkt ihr schnell, wie es dem anderen geht. Es läuft glatt, ohne große Konflikte.',
      love: 'Eine behutsame Romanze, die mit der Zeit tiefer wird. Sie hält, wenn ihr mit Zuneigung nicht geizt.',
      advice: 'Ihr schluckt beide gern hinunter. Sagt, was wehgetan hat, wenn es passiert, statt es zu sammeln.',
    },
    'A-B': {
      label: 'Gegensätze ziehen sich an', headline: 'Angezogen von dem, was der andere hat',
      reason: 'Das sorgfältige A und das freie B sind ziemlich verschiedene Menschen. Anfangs wirkt dieser Unterschied wie ein frischer Sog.',
      love: 'Einer bringt die Planung, der andere die Spontaneität — Langeweile kommt selten auf.',
      advice: 'Es geht gut, wenn A die Freiheit von B nicht als Bedrohung liest und B die Fürsorge von A nicht als Nörgeln.',
    },
    'A-O': {
      label: 'Tragfähige Verbindung', headline: 'Das gelassene 0 schafft Raum für das sorgfältige A',
      reason: 'Das großzügige 0 legt sich bequem um das detailverliebte A. Jeder deckt, woran es dem anderen fehlt.',
      love: '0 geht voran, A achtet auf die Details, und daraus wird etwas Stabiles.',
      advice: '0 sollte die kleinen Signale von A nicht übersehen; A darf sich ruhig etwas mehr anlehnen.',
    },
    'A-AB': {
      label: 'Still im Einklang', headline: 'Zwei empfindsame Menschen, die einander verstehen',
      reason: 'Ihr seid beide feinfühlig und nach innen gewandt, also erkennt ihr, was der andere wirklich empfindet.',
      love: 'Eine ruhige Romanze mit vielen Momenten, die keiner Erklärung bedürfen.',
      advice: 'Es geht leichter, wenn A die schwerer greifbare Seite von AB nicht überanalysiert.',
    },
    'B-B': {
      label: 'Freie Geister', headline: 'Zwei Menschen, die den Raum des anderen achten',
      reason: 'Ihr habt beide ein starkes Selbst und mögt es nicht, festgelegt zu werden. Erkennt die Welt des anderen an, dann bleibt es angenehm.',
      love: 'Eine entspannte Romanze, in der jeder sein Ding macht und ihr trotzdem zurückkommt.',
      advice: 'Genießt die Freiheit, aber sprecht weiter aus, was ist, damit daraus keine Gleichgültigkeit wird.',
    },
    'B-O': {
      label: 'Viel Energie', headline: 'Zusammensein macht schlicht Spaß',
      reason: 'Das freie B und das gesellige 0 halten die Stimmung lebendig. Ihr spielt gut zusammen und redet leicht.',
      love: 'Ein aktives Paar, das lieber etwas unternimmt, als still zu sitzen.',
      advice: 'Ihr drückt beide kräftig, also wird es manchmal krachen. Ein Schritt von jedem, und ihr seid ein starkes Gespann.',
    },
    'B-AB': {
      label: 'Funkensprühend', headline: 'Zwei Originale, denen die Ideen nicht ausgehen',
      reason: 'Das freie B und das erfinderische AB spielen sich Bälle zu. Ihr findet die Eigenheiten des anderen unterhaltsam.',
      love: 'Eine unverwechselbare Beziehung, ganz nach euren eigenen Regeln.',
      advice: 'Ihr könnt beide wankelmütig sein, also nagelt die Pläne fest, auf die es wirklich ankommt.',
    },
    'O-O': {
      label: 'Klartext', headline: 'Ehrlich, warm und schnell wieder darüber hinweg',
      reason: 'Ihr seid beide weitherzig und direkt, nichts köchelt nach. Ihr sagt es, und dann ist es vorbei.',
      love: 'Direkt auszusprechen heißt weniger Missverständnisse — und keine halben Sachen.',
      advice: 'Keiner von euch verliert gern. Lasst die Stolzduelle weg, und ihr seid ein verlässliches Paar.',
    },
    'O-AB': {
      label: 'Ergänzend', headline: 'Wärme und klarer Kopf zusammen',
      reason: 'Das gesellige 0 und das sachliche AB füllen die Lücken des jeweils anderen. Die Balance trägt gut.',
      love: 'Die Wärme von 0 und der kühle Kopf von AB geben euch Stabilität und Anregung zugleich.',
      advice: 'Es hält, solange 0 das Abstandsbedürfnis von AB nicht persönlich nimmt.',
    },
    'AB-AB': {
      label: 'Ungewöhnlich im Einklang', headline: 'Zwei Ungewöhnliche, die einander erkennen',
      reason: 'Ihr seid beide eigen und schwer vorhersehbar — für andere mag das anstrengend sein, ihr zwei folgt einander mühelos.',
      love: 'Eine Beziehung, die auf einem Code läuft, den nur ihr beide lest.',
      advice: 'Ihr könnt beide emotional schwanken. Räumt Missverständnisse oft aus, in ganz normalen Worten.',
    },
  },
  ui: {
    pickBoth: 'Wähl beide Seiten, um das Ergebnis zu sehen',
    you: 'Du', partner: 'Die andere Person',
    score: 'Übereinstimmung',
    why: 'Warum',
    love: 'In einer Beziehung',
    advice: 'Rat',
    reset: 'Von vorn',
    disclaimer: 'Die Übereinstimmung hier folgt überlieferten Regeln und ist Unterhaltung. Was eine Beziehung wirklich entscheidet, ist, wie zwei Menschen miteinander umgehen.',
  },
};

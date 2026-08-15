import type { TopicCopy } from './types.ts';

/* Deutsch. Außerhalb des Hanja-Raums wird das System als "Vier Säulen des Schicksals"
   oder "BaZi" gesucht — beides steht in Titeln und Leads. Fachwörter folgen
   lib/saju-l10n/de.ts: Autoritätsstern (官星), Quellenstern (印星), Vermögensstern (財星). */
export const DE: TopicCopy = {
  title: {
    love: 'BaZi Liebesdeutung',
    job: 'BaZi Berufsdeutung',
    career: 'BaZi Jobwechsel-Deutung',
    promotion: 'BaZi Beförderungsdeutung',
    money: 'BaZi Vermögensdeutung',
    health: 'BaZi Gesundheitsdeutung',
    study: 'BaZi Lern- und Prüfungsdeutung',
  },
  lead: {
    love: 'Liest in den Vier Säulen des Schicksals (BaZi) den Ehepalast (Tageszweig), den Partnerstern und die Pfirsichblüte (桃花殺) und zeigt, auf welchem Weg die Liebe zu dir findet.',
    job: 'Liest die Autoritätssterne (官星), die Quellensterne (印星) und deinen Monatszweig — den Berufspalast — und zeigt, welche Art von Organisation zu deinen Vier Säulen des Schicksals passt.',
    career: 'Liest das Reisende Pferd (驛馬) und die Wendepunkte deiner Glückssäulen und zeigt, ob dieses Jahr im BaZi eines zum Wechseln oder eines zum Bleiben ist.',
    promotion: 'Liest die Rechte Autorität (正官) und den Kreis Autorität-Quelle (官印相生) und zeigt, wie sich in den Vier Säulen des Schicksals (BaZi) Rang innerhalb einer Organisation öffnet.',
    money: 'Liest die Vermögenssterne (財星) und den Kreis Hervorbringung-nährt-Vermögen (食傷生財) und zeigt, wo im BaZi Geld hereinkommt und wo es abfließt.',
    health: 'Liest Übermaß und Mangel über die fünf Elemente der Vier Säulen des Schicksals (BaZi) und zeigt, welcher Teil des Körpers zuerst müde wird.',
    study: 'Liest die Quellensterne (印星) und den Literaturstern (文昌貴人) und zeigt, wie Lernen und Prüfungen in deinem BaZi laufen.',
  },
  terms: {
    spouseSeat: 'Ehepalast (Tageszweig)',
    careerSeat: 'Berufspalast (Monatszweig)',
    authStar: 'Autoritätsstern (官星)',
    wealthStar: 'Vermögensstern (財星)',
    resourceStar: 'Quellenstern (印星)',
    authCount: 'Autoritätssterne',
    wealthCount: 'Vermögenssterne',
    resourceCount: 'Quellensterne',
    selfCount: 'Selbst-Gruppe (比劫)',
    peach: 'Pfirsichblüte (桃花殺)',
    yongma: 'Reisendes Pferd (驛馬殺)',
    daewoonNow: 'Aktuelle Glückssäule (大運)',
    gwanIn: 'Kreis Autorität-Quelle (官印相生)',
    sanggwan: 'Aufbegehren gegen die Autorität (傷官見官)',
    siksangSaengJae: 'Hervorbringung nährt Vermögen (食傷生財)',
    munchang: 'Literaturstern (文昌貴人)',
    missingEl: 'Fehlendes Element',
    dominantEl: 'Stärkstes Element',
    missingCount: 'Fehlende Elemente',
    strength: 'Stärke des Tagesherrn',
  },
  faqCommon: [
    {
      q: 'Ist diese BaZi-Deutung wirklich kostenlos?',
      a: 'Ja. Es gibt keine Anmeldung, keinen Login und keinen Bezahlschritt. Das ganze Chart wird in deinem Browser berechnet, und deine Geburtsdaten und dein Name gehen nie an einen Server.',
    },
    {
      q: 'Was, wenn ich meine Geburtszeit nicht kenne?',
      a: 'Du kannst das Chart trotzdem lesen. Lass die Uhrzeit leer, dann wird es aus drei Säulen — Jahr, Monat und Tag — statt aus vieren gestellt. Die Stundensäule steht für Partnerschaft, Kinder und die späteren Jahre, deshalb wird die Deutung mit einer Uhrzeit genauer. Gibst du eine an, wird sie vor dem Setzen der Säule auf die echte Sonnenzeit und auf die historische Sommerzeit korrigiert.',
    },
  ],
  faqTopic: {
    love: {
      q: 'Woran liest ein BaZi-Chart die Liebe ab?',
      a: 'Am Tageszweig — dem Ehepalast — und am Partnerstern. Bei einer Frau markiert der Autoritätsstern (官星) den Partner, bei einem Mann der Vermögensstern (財星). Die Pfirsichblüte (桃花殺) steht für die Anziehung, die zuerst auffällt. Diese Seite liest die Liebesdeutung einer einzelnen Person; zwei Charts miteinander abzugleichen ist eine eigene Partnerdeutung.',
    },
    job: {
      q: 'Kann ein BaZi-Chart sagen, welcher Beruf zu mir passt?',
      a: 'Es zeigt die Art von Arbeit, die passt, nicht einen bestimmten Arbeitgeber. Ein starker Autoritätsstern (官星) kommt dort gut voran, wo Regeln und Rang klar sind; ein starker Hervorbringungsstern (食傷) dort, wo Ausdruck und Erfindung der Punkt sind. Der Monatszweig wird als Berufspalast gelesen und beschreibt das Arbeitsumfeld um dich herum.',
    },
    career: {
      q: 'Sagt BaZi, wann ich den Job wechseln sollte?',
      a: 'Es liest den Zeitpunkt, nicht das Ergebnis. Das Reisende Pferd (驛馬殺) markiert ein Chart, das sich durch Bewegung löst, und das Jahr, in dem eine Glückssäule (大運) umschlägt, ist der strukturelle Wendepunkt. Diese Seite zeigt deine aktuelle Glückssäule neben der Frage, ob das Reisende Pferd vorhanden ist — abwägen musst du das gegen deine tatsächliche Vorbereitung.',
    },
    promotion: {
      q: 'Worin unterscheidet sich Beförderung vom Beruf im BaZi?',
      a: 'Es werden andere Zeichen gelesen. Welche Arbeit zu dir passt, entscheiden Hervorbringungs- und Vermögensstern; ob sich über dir Rang öffnet, entscheidet die Rechte Autorität (正官). Tritt ein Quellenstern hinzu und bildet den Kreis Autorität-Quelle (官印相生), kommt der Posten durch Ernennung statt durch Drängen. Im umgekehrten Fall, 傷官見官, trifft das Aufbegehrende Talent die Autorität, und über Jahre aufgebautes Ansehen kann auseinanderfallen.',
    },
    money: {
      q: 'Heißt ein fehlender Vermögensstern, dass ich nichts verdienen kann?',
      a: 'Nein. Es heißt, dass Geld auf einem anderen Weg zu dir kommt. Nährt der Hervorbringungsstern den Vermögensstern — die Konstellation 食傷生財 —, wird Können unmittelbar zu Einkommen. Ohne Vermögensstern ist der bessere Weg, Wissen und Fertigkeit in Wert zu verwandeln. Eine schwere Selbst-Gruppe (比劫) bedeutet, dass hereinkommendes Geld auch wieder hinausgeht, und damit wird der Umgang damit entscheidend.',
    },
    health: {
      q: 'Kann ein BaZi-Chart eine Krankheit diagnostizieren?',
      a: 'Nein, und so sollte es nie benutzt werden. Die Gesundheitsdeutung schaut auf das Ungleichgewicht der fünf Elemente — welches Element fehlt und welches im Übermaß da ist — und nennt die traditionell zugeordneten Organe, um zu zeigen, wo du dich am ehesten übernimmst. Wenn sich etwas nicht richtig anfühlt, geh zu einer Ärztin oder einem Arzt.',
    },
    study: {
      q: 'Worauf schaut BaZi bei Lernen und Prüfungen?',
      a: 'Die Quellensterne (印星) sind die Wurzel des Lernens. Die Direkte Quelle (正印) passt zum geduldigen Ansammeln, die Indirekte Quelle (偏印) nimmt schnell und seitwärts auf. Darüber steht der Literaturstern (文昌貴人), den dein Tagesherr festlegt und der als Glücksstern für Schrift, Prüfungen und Urkunden gilt. Ob du eine Prüfung bestehst, entscheidet allerdings die Vorbereitung und nicht das Chart.',
    },
  },
  ui: {
    empty: 'Gib Geburtsdatum und Geschlecht ein, um dieses eine Thema für sich zu lesen.',
    evidence: 'Was dein Chart hier zeigt',
    reading: 'Deutung',
    background: 'Worauf diese Deutung schaut',
    yes: 'Vorhanden',
    no: 'Nicht vorhanden',
    none: 'Entfällt',
    strong: 'Stark (身强)',
    weak: 'Schwach (身弱)',
    countOf: '{n}',
    nameLabel: 'Name (optional)',
    namePh: 'z. B. Anna',
    nameNote: 'Dein Name bleibt in diesem Browser. Er steht nie in der Adresse und geht nie an einen Server.',
    metaTitle: 'Kostenlose {topic} — Vier Säulen des Schicksals',
    metaDescSuffix: 'Kostenlos, ohne Anmeldung, im Browser berechnet.',
    titleOf: '{topic} von {name}',
    introLead: 'In deinem Chart: {term} — {value}. Lies alles Weitere von dieser Stelle aus.',
    otherTopics: 'Andere Themen',
    backToAll: 'Die vollständige Chart-Deutung ansehen',
  },
};

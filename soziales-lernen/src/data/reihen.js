// Reihen = thematische Stränge, die sich spiralförmig durch die Klassen ziehen.
// Ein Modul gehört immer zu genau einer Reihe.

export const REIHEN = [
  {
    id: 'koerpersprache',
    name: 'Körpersprache',
    farbe: 'moos',
    kurz: 'Der Körper spricht — lesen, wirken, bewusst einsetzen.',
    beschreibung:
      'Körpersprache ist kein einzelner Workshop — es ist ein Thema mit mehreren Dimensionen, das sich spiralförmig durch alle Klassen zieht. Jede Dimension verdient eigene Module, jeweils entwicklungsgerecht aufgebaut.',
    dimensionen: [
      {
        nr: 1,
        name: 'Erkennen',
        frage: 'Was zeigt mir der Körper des anderen?',
        text: 'Gefühle lesen, bevor jemand etwas sagt. Mimik, Haltung, Geste. Das ist Empathie-Fundament.',
        einstieg: 'Klasse 1',
        vertiefung: 'Klasse 2',
      },
      {
        nr: 2,
        name: 'Wirkung',
        frage: 'Was sendet mein eigener Körper?',
        text: 'Was sagen meine Haltung, mein Blick, meine Nähe — auch ungewollt? Wenn Körper und Worte nicht übereinstimmen, glauben andere dem Körper.',
        einstieg: 'Klasse 2',
        vertiefung: 'Klasse 3',
      },
      {
        nr: 3,
        name: 'Bewusstes Einsetzen',
        frage: 'Ich kann wählen wie mein Körper spricht.',
        text: 'Körpersprache als aktives Werkzeug: in Konflikten, beim Helfen, beim Grenzen zeigen. Nicht Manipulation — sondern Klarheit.',
        einstieg: 'Klasse 3',
        vertiefung: 'Klasse 4',
      },
    ],
    klassen: [
      { klasse: 1, schwerpunkt: 'Erkennen (außen + innen)', leitfrage: 'Was sagt der Körper — bei mir und bei anderen?' },
      { klasse: 2, schwerpunkt: 'Wirkung + unbewusste Signale', leitfrage: 'Was sende ich, ohne es zu wollen?' },
      { klasse: 3, schwerpunkt: 'Körper in Konflikten', leitfrage: 'Was passiert mit meinem Körper wenn ich wütend bin — und was hilft?' },
      { klasse: 4, schwerpunkt: 'Bewusstes Einsetzen', leitfrage: 'Wie zeige ich Grenzen, Offenheit, Stärke — ohne Worte?' },
    ],
    hinweis:
      'Nicht jede Klasse braucht alle Dimensionen. Das Thema wächst mit — immer neue Ebene, nie Wiederholung.',
    ankerSpirale: [
      { klasse: 1, anker: '„Eng oder weit?“' },
      { klasse: 2, anker: '„Was sendest du gerade?“' },
      { klasse: 3, anker: '„Boden – Atem – Hand“' },
      { klasse: 4, anker: '„Welchen Körper bringst du mit?“' },
    ],
  },
  {
    id: 'gfk',
    name: 'GFK — Gefühle & Bedürfnisse',
    farbe: 'mohn',
    kurz: 'Gefühle benennen, Bedürfnisse erkennen, ohne Vorwurf sprechen.',
    beschreibung:
      'Gewaltfreie Kommunikation als Grundreihe: Gefühle bekommen Namen, Bedürfnisse werden sichtbar, Bitten ersetzen Vorwürfe.',
    dimensionen: [],
    klassen: [],
    hinweis: '',
    ankerSpirale: [],
  },
  {
    id: 'ausschluss',
    name: 'Ausschluss & Dazugehören',
    farbe: 'sand',
    kurz: 'Wer gehört dazu — und was macht Ausschluss mit einem?',
    beschreibung: 'Dazugehören, Ausgrenzung erkennen, Verantwortung in der Gruppe.',
    dimensionen: [],
    klassen: [],
    hinweis: '',
    ankerSpirale: [],
  },
  {
    id: 'beleidigungen',
    name: 'Beleidigungen',
    farbe: 'sand',
    kurz: 'Wörter die wehtun — und was man damit macht.',
    beschreibung: 'Wirkung von Worten, Grenzen setzen, Reparatur nach Verletzung.',
    dimensionen: [],
    klassen: [],
    hinweis: '',
    ankerSpirale: [],
  },
  {
    id: 'kompetenz',
    name: 'Kompetenz (Fachkraft)',
    farbe: 'ink',
    kurz: 'Eigenständige Dokumente für die Fachkraft — kein Kinder-Workshop.',
    beschreibung:
      'Fachliche Begleitdokumente: eigene Haltung, Präsenz, Classroom Management. Nicht Teil der Kinder-Reihen.',
    dimensionen: [],
    klassen: [],
    hinweis: '',
    ankerSpirale: [],
  },
]

export function getReihe(id) {
  return REIHEN.find((r) => r.id === id) || null
}

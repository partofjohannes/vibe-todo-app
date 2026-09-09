// Körpersprache — Klasse 1, Modul 1: Was der Körper sagt
// Quelle: Koerpersprache_Klasse1_Modul1_Was_der_Koerper_sagt.md (Version 1.2, Juli 2026)

const modul = {
  id: 'koerpersprache-k1-m1',
  datei: 'Koerpersprache_Klasse1_Modul1_Was_der_Koerper_sagt.md',
  reiheId: 'koerpersprache',
  klasse: 1,
  modulNr: 1,
  titel: 'Was der Körper sagt',
  untertitel: 'Klasse 1, Modul 1',
  status: 'entwurf',
  version: '1.2',
  stand: 'Juli 2026',
  typ: 'Aufbauend (Klasse 1–4) — erster Einstieg',
  vorwissen: 'Steht für sich allein — kein Vorwissen nötig',
  erfasst: true,

  kernsatz: 'Dein Körper spricht — auch wenn du nichts sagst.',

  warum: [
    'Kinder in Klasse 1 lernen gerade: Gefühle haben Namen. Sie können „wütend“ sagen, „traurig“, „froh“. Das ist ein großer Schritt.',
    'Aber Gefühle kommen nicht zuerst als Wort. Sie kommen zuerst im Körper.',
    'Enger Bauch vor dem Test. Schultern die hochziehen wenn jemand schimpft. Ein Lächeln das von selbst kommt wenn die beste Freundin reinkommt. Der Körper weiß es — oft bevor der Kopf es benennt.',
    'Dieser Workshop macht das sichtbar: Körpersprache ist keine Geheimsprache. Sie ist die erste Sprache. Und man kann sie lesen lernen — bei sich selbst und bei anderen.',
    'Das ist keine Kommunikationskurs-Technik. Das ist Empathie-Fundament: Wer den Körper des anderen lesen kann, muss nicht erst warten bis jemand redet.',
  ],

  ziele: [
    'Kinder erleben: Der Körper zeigt Gefühle — auch ohne Worte',
    'Kinder können: Ein Gefühl am Körper erkennen (bei sich und bei anderen)',
    'Kinder verstehen: Wie ich dastehe, wie ich schaue, wie ich mich halte — das sagen anderen etwas',
    'Erste Idee: Ich kann selbst wählen wie mein Körper „spricht“ — das verändert manchmal sogar wie ich mich fühle',
  ],

  rahmen: {
    dauer: 45,
    gruppe: 'Eine Klasse, ca. 20–25 Kinder; Phasen im Stuhlkreis und im Raum',
    raum: 'Bewegungsraum oder freier Platz — Kinder brauchen Platz um sich zu zeigen',
    material:
      'Keine zwingenden Materialien — optional Gefühlskarten aus GFK Modul 1, Spiegel (ein kleiner pro Tisch oder ein großer an der Wand)',
    lehrkraft:
      'Macht mit — zeigt bei „Zeig mal“ und in der Körper-Forscher-Runde die eigenen Antworten. Kein Disziplinieren nebenbei; wenn etwas kippt, übernimmt die Fachkraft. Nach dem Workshop trägt die Lehrkraft den Anker weiter (siehe „Anker für den Alltag“).',
  },

  ablauf: [
    {
      nr: 1,
      titel: 'Einstieg — „Zeig mal“',
      minuten: 5,
      kurz: 'Gefühlswörter rufen, Kinder zeigen sie mit dem Körper.',
      schritte: [
        { typ: 'anweisung', text: 'Kinder sitzen im Kreis. Keine Erklärung vorweg.' },
        {
          typ: 'sprechtext',
          text: 'Ich sage ein Wort — und ihr zeigt es mir. Nicht mit dem Mund. Nur mit dem Körper.',
        },
        {
          typ: 'karten',
          text: 'Nacheinander rufen:',
          items: ['froh', 'müde', 'aufgeregt', 'traurig', 'wütend'],
        },
        {
          typ: 'anweisung',
          text: 'Kinder zeigen. Du schaust. Keine Bewertung, kein Kommentar — einfach beobachten.',
        },
        { typ: 'sprechtext', text: 'Wie habt ihr das gemacht? Woran erkennt man das?' },
        {
          typ: 'anweisung',
          text: 'Kinder benennen selbst: Schultern, Gesicht, Haltung, Hände. Du sammelst an der Tafel oder sagst es laut zurück.',
        },
      ],
    },
    {
      nr: 2,
      titel: 'Rate-Spiel — „Was sagt dieser Körper?“',
      minuten: 10,
      kurz: 'Kontrast vormachen, Kinder raten. Dann tauschen.',
      schritte: [
        { typ: 'anweisung', text: 'Kontrast-Runde: Du machst vor — mit dem ganzen Körper, ohne Worte.' },
        {
          typ: 'liste',
          text: 'Zwei Versionen zeigen:',
          items: [
            'Jemand der gelangweilt ist — hängende Schultern, Blick weg, leise seufzen.',
            'Jemand der gespannt zuhört — Körper leicht vorne, Blick direkt, ruhig.',
          ],
        },
        { typ: 'anweisung', text: 'Kinder raten was sie sehen.' },
        { typ: 'sprechtext', text: 'Was war anders? Was habt ihr bemerkt?' },
        {
          typ: 'anweisung',
          text: 'Dann tauschen: Zwei Kinder kommen freiwillig in die Mitte. Ein Gefühl zeigen — die anderen raten.',
        },
        {
          typ: 'wichtig',
          text: 'Nie ein Kind in eine unangenehme Situation bringen. Wenn niemand will — du machst weiter vor, andere raten.',
        },
      ],
    },
    {
      nr: 3,
      titel: 'Die Körper-Forscher — „Wie bin ich gerade?“',
      minuten: 10,
      kurz: 'Geführte Fragen, die der Körper beantwortet — nicht der Mund.',
      schritte: [
        {
          typ: 'hinweis',
          text: 'Nicht still hineinspüren — Klasse 1 braucht Fragen, die der Körper beantworten kann. Alle stehen auf.',
        },
        {
          typ: 'sprechtext',
          text: 'Wir sind jetzt Körper-Forscher. Ich stelle Fragen — und euer Körper antwortet. Nicht der Mund.',
        },
        { typ: 'hinweis', text: 'Geführte Runde, jede Frage mit Probieren:' },
        {
          typ: 'sprechtext',
          text: 'Macht mal beide Hände zu Fäusten. Fest. — Und jetzt wieder auf. Was war schöner?',
        },
        {
          typ: 'sprechtext',
          text: 'Wie ist dein Bauch gerade — eng wie eine Faust oder weit wie ein Luftballon? Zeig es mit deinen Händen.',
          zusatz: 'Hände eng zusammen oder weit auseinander',
        },
        {
          typ: 'sprechtext',
          text: 'Wo sind deine Schultern — oben bei den Ohren oder unten? Probier beide. Wo wohnen sie gerade?',
        },
        {
          typ: 'sprechtext',
          text: 'Und deine Füße — wollen sie rennen oder stehen sie gern?',
          zusatz: 'Wer rennen will, läuft auf der Stelle',
        },
        {
          typ: 'sprechtext',
          text: 'Schau kurz in dein Gesicht. Was macht es gerade — ganz von alleine?',
          zusatz: 'Optional, nur mit Spiegel',
          optional: true,
        },
        { typ: 'sprechtext', text: 'Wer mag sagen, was sein Körper geantwortet hat?' },
        {
          typ: 'hinweis',
          text: 'Nicht einfordern. Wer nichts sagen will, zeigt es nur mit den Händen — eng oder weit. So haben alle geantwortet, auch ohne Worte.',
        },
      ],
    },
    {
      nr: 4,
      titel: 'Der Unterschied — eine Situation, zwei Körper',
      minuten: 10,
      kurz: 'Dieselbe Situation, zwei Haltungen. Was macht das mit dem anderen?',
      schritte: [
        { typ: 'anweisung', text: 'Du erzählst eine kurze Situation:' },
        { typ: 'sprechtext', text: 'Stellt euch vor: Ihr geht in die Pause. Euer Freund steht alleine da.' },
        { typ: 'anweisung', text: 'Du zeigst — mit dem Körper — zwei Versionen wie man hingeht:' },
        {
          typ: 'liste',
          text: '',
          items: [
            'Version 1: Körper zugeklappt, Blick weg, zögerlich, Hände in den Taschen.',
            'Version 2: Offener Schritt, Blick direkt, leicht lächeln, hingehen.',
          ],
        },
        {
          typ: 'sprechtext',
          text: 'Was denkst du — wie fühlt sich das für den anderen an? Was ist der Unterschied?',
        },
        { typ: 'anweisung', text: 'Kurze Runde. Kinder kommentieren.' },
        {
          typ: 'anweisung',
          text: 'Dann eine freiwillige Zweier-Übung: Ein Kind geht auf ein anderes zu — einmal so, einmal anders. Die Klasse beobachtet.',
        },
      ],
    },
    {
      nr: 5,
      titel: 'Abschluss — „Mein Körper kann wählen“',
      minuten: 10,
      kurz: 'Haltung verändert Gefühl. Landung und Kinder-Echo.',
      schritte: [
        {
          typ: 'sprechtext',
          text: 'Hier ist etwas Interessantes. Wenn ich mich klein mache — Schultern rein, Kopf runter — fühle ich mich oft auch kleiner innen drin. Und wenn ich aufrecht dastehe und atme... probiert mal.',
        },
        {
          typ: 'anweisung',
          text: 'Kurze gemeinsame Übung: alle stehen auf, Schultern hoch — kurze Pause — Schultern runter und zurück. Einatmen. Ausatmen.',
        },
        {
          typ: 'sprechtext',
          text: 'Habt ihr das gespürt? Der Körper und das Gefühl sprechen miteinander. Ich kann nicht aus jedem Gefühl rausspringen — aber ich kann meinem Körper manchmal einen kleinen Hinweis geben.',
        },
        {
          typ: 'anweisung',
          text: 'Abschlussrunde: Jedes Kind zeigt mit dem Körper wie es jetzt gerade ist — kein Wort, nur eine Haltung. Wer mag, erklärt kurz.',
        },
        {
          typ: 'landung',
          text: 'Nach der letzten Haltung einen Moment Stille. Dann ein Satz, ruhig gesprochen:',
          spruch: 'Euer Körper hat heute die ganze Zeit geredet. Ab jetzt könnt ihr ihn hören.',
          nachsatz: 'Danach nichts mehr erklären.',
        },
        {
          typ: 'echo',
          text: 'Kinder-Echo (2 Min) — ohne Worte, passend zum Thema:',
          spruch: 'Zeigt mit den Händen — eng oder weit: Wie war das heute für euch?',
          nachsatz: 'Wer mag, sagt ein Wort dazu. Was auffällt, wandert in „Ideen für nächste Version“.',
        },
      ],
    },
  ],

  schwierigeMomente: [
    {
      situation: 'Kinder kichern oder spielen den Clown',
      umgang:
        'Das gehört dazu — Körpersprache ist nah und komisch gleichzeitig. Kurz mitlachen, dann zurück:',
      spruch: 'Gut, das war die Spaß-Version. Zeig nochmal die echte.',
    },
    {
      situation: 'Ein Kind will gar nicht mitmachen',
      umgang:
        'Nie drängen. Bei der Rate-Runde reicht zuschauen. Bei der Spiegel-Übung: Augen schließen ist genug. Kein Kind muss sich zeigen.',
      spruch: '',
    },
    {
      situation: 'Kinder machen sich über jemandes „Vorführung“ lustig',
      umgang: 'Direkt und ruhig — und danach zum Kind: „Danke, das war mutig.“',
      spruch: 'Wir schauen hier — wir lachen nicht über jemanden. Das ist nicht die Regel hier.',
    },
    {
      situation: 'Kinder wollen wissen ob man Körpersprache „faken“ kann',
      umgang: 'Ja — das kann man. Und das ist eine echte Frage.',
      spruch:
        'Manchmal hilft faken sogar ein bisschen. Aber meistens merkt man es trotzdem — weil der Rest des Körpers mitmuss.',
    },
    {
      situation: 'Die Klasse ist zu aufgedreht für die Stille-Phasen',
      umgang:
        'Stille-Phase kürzen oder ganz weglassen. Die Bewegungsphasen sind der Kern — der Rest passt sich an.',
      spruch: '',
    },
  ],

  alternativen: [
    {
      id: 'kurz',
      name: 'Kurzversion',
      wenn: 'Wenn weniger Zeit ist (unter 30 Minuten)',
      dann: 'Phasen 1, 2 und 5 — das reicht. Einstieg zeigen / Rate-Spiel / kurzer Körper-kann-wählen-Abschluss.',
      phasen: [1, 2, 5],
    },
    {
      id: 'sitzend',
      name: 'Im Sitzen',
      wenn: 'Wenn kein Bewegungsraum da ist',
      dann: 'Alles im Sitzen: Gefühle nur mit Gesicht und Oberkörper zeigen. Hände, Schultern, Blick reichen. Die Körper-Runde am Ende: alle sitzen, zeigen eine Haltung auf dem Stuhl.',
      phasen: null,
    },
    {
      id: 'kleingruppe',
      name: 'Kleingruppe',
      wenn: 'Wenn die Gruppe sehr klein ist (Fördergruppe, 3–6 Kinder)',
      dann: 'Kein Rate-Spiel in der Mitte — stattdessen gegenseitig: ein Kind zeigt, ein anderes beschreibt was es sieht. Intimer, direkter, oft tiefer.',
      phasen: null,
    },
    {
      id: 'gfk',
      name: 'Mit GFK-Bezug',
      wenn: 'Wenn die Klasse GFK Modul 1 kennt',
      dann: 'Explizite Verbindung: „Ihr erinnert euch an das Wetter-Ritual? Heute schauen wir nicht was du sagst — sondern was dein Körper schon längst gezeigt hat.“ Die Gefühlskarten aus Modul 1 können als Vorlage dienen: Kinder stellen die Karte mit dem Körper nach.',
      phasen: null,
    },
    {
      id: 'konflikte',
      name: 'Konflikt-Fokus',
      wenn: 'Wenn das Thema Konflikte aktuell ist',
      dann: 'Phase 4 (Situation mit zwei Körpern) verlängern — mehr Situationen durchspielen: auf jemanden zugehen der weint / jemanden der alleine ist / jemanden der gerade Streit hatte. Körpersprache als Brücken-Werkzeug.',
      phasen: null,
    },
  ],

  verbindungen: [
    {
      richtung: 'weiter',
      ziel: 'Koerpersprache_Klasse2_Modul1_Was_ich_sende.md',
      modulId: 'koerpersprache-k2-m1',
      text: 'Vertiefung: Was sende ich unbewusst? Wann passt mein Körper nicht zu meinen Worten?',
    },
    {
      richtung: 'quer',
      ziel: 'GFK_Klasse1_Modul1_Gefuehle.md',
      modulId: 'gfk-k1-m1',
      text: 'Gefühle zeigen sich zuerst im Körper; dieser Workshop macht das Fundament von Modul 1 physisch erfahrbar',
    },
    {
      richtung: 'quer',
      ziel: 'GFK_Klasse1_Modul2_Beduerfnisse.md',
      modulId: 'gfk-k1-m2',
      text: 'Körpersprache zeigt oft das Bedürfnis bevor man es benennen kann',
    },
    {
      richtung: 'quer',
      ziel: 'Ausschluss_Klasse1_Modul1_Dazugehoeren.md',
      modulId: 'ausschluss-k1-m1',
      text: 'Ausschluss wird zuerst am Körper spürbar: der leere Stuhl, das Weggehen, das Nicht-Anschauen',
    },
    {
      richtung: 'quer',
      ziel: 'Beleidigungen_Klasse1_Modul1_Woerter_die_wehtun.md',
      modulId: 'beleidigungen-k1-m1',
      text: 'Beleidigungen treffen den Körper — der Workshop macht das wörtlich',
    },
    {
      richtung: 'weiter',
      ziel: 'Kompetenz/Classroom_Management_Kurs.md',
      modulId: null,
      text: 'Körpersprache als Führungsmittel für die Fachkraft selbst: Nähe statt Lautstärke, Blick, Haltung',
    },
    {
      richtung: 'weiter',
      ziel: 'Kompetenz/Koerpersprache_Fachkraft.md',
      modulId: 'kompetenz-koerpersprache-fachkraft',
      text: 'Eigenständiges Begleitdokument für die Fachkraft: wenn dieser Workshop stattfindet, ist die eigene Körpersprache das stärkste Demonstrationsmittel. Stand, Augenhöhe, Stille, drei Anker (Boden/Atem/Hand) — alles direkt einsetzbar im Ablauf. Steht für sich, kein Vorwissen aus dem Workshop nötig.',
    },
  ],

  anker: {
    geste: {
      name: 'Die Geste: „Eng oder weit?“',
      text: 'Hände eng zusammen oder weit auseinander — die Antwort ohne Mund, die die Kinder aus der Körper-Forscher-Runde kennen. Im Alltag genügt die Frage: „Wie ist dein Bauch gerade — eng oder weit?“ Alle können gleichzeitig antworten, keiner muss reden.',
    },
    briefing:
      'Die Kinder haben heute gelernt, dass der Körper Gefühle zeigt — und können mit den Händen antworten: eng oder weit. Fragen Sie in unruhigen oder stillen Momenten einfach: „Eng oder weit?“ — alle zeigen es gleichzeitig, ohne Worte. Wenn Sie selbst mitzeigen, wirkt es doppelt.',
  },

  material: {
    selbst: [
      {
        name: 'Gefühlskarten',
        text: 'aus GFK Modul 1 übernehmen oder neu ausdrucken — für die Spiegel-Übung als Vorlage',
      },
      {
        name: 'Situationskarten für Phase 4',
        text: '3–4 kurze Situationen auf Zettel schreiben (als Ergänzung wenn mehr Durchgänge gewünscht)',
      },
    ],
    frei: [
      {
        name: 'Bilderbuch-Tipp: „Der Gesichter-Macher“',
        text: 'diverse Verlage — über Mimik und Gefühle, direkt als Einstieg nutzbar',
      },
      {
        name: 'Fotos: unsplash.com',
        text: 'Bilder von Körperhaltungen ohne Gesicht; Kinder raten das Gefühl nur aus der Haltung',
      },
    ],
    bezahlt: [
      {
        name: 'Mimik-Karten Set',
        text: 'Verlag an der Ruhr, ~15 € — hochwertige Fotos, langlebig, viele Folge-Workshops nutzbar',
      },
      {
        name: '„Körpersprache für Kinder“',
        text: 'verschiedene Verlage, ~12 € — illustriert, Klasse 1–4',
      },
    ],
    digital: [
      {
        name: 'Canva',
        text: 'Körpersprache-Plakat für das Klassenzimmer — „So sieht mein Körper aus wenn...“ mit Zeichnungen/Fotos',
      },
      {
        name: 'Kamera-Idee',
        text: 'Kinder fotografieren gegenseitig eine Haltung (ohne Gesicht) — digitale Raterunde',
      },
    ],
    checkliste: [
      { text: 'Freier Bewegungsraum oder umgestellte Tische', optional: false },
      { text: 'Spiegel (klein, pro Tisch)', optional: true },
      { text: 'Gefühlskarten (aus GFK Modul 1)', optional: true },
      { text: 'Situationskarten (selbst geschrieben)', optional: true },
    ],
  },

  ideen: [
    '„Freeze“-Spiel als Variante: Musik läuft, bei Stopp einfrieren — Klasse errät das Gefühl der eingefrorenen Haltung',
    'Pantomime-Runde: Kinder spielen eine kurze Szene nur mit Körper, ohne Worte — andere raten',
    'Körpersprache-Plakat als Klassenprodukt: „So sieht ... aus“ mit Kinderzeichnungen oder Fotos',
  ],

  systemHinweis:
    'Typ Aufbauend — dieses Dokument ist Modul 1 einer eigenen Reihe. Die drei Dimensionen (Erkennen / Wirkung / Bewusstes Einsetzen) entfalten sich über Klasse 1–4. Klasse 2 als nächster logischer Schritt: unbewusste Signale, Widerspruch Körper/Worte. Kompetenz-Dokument für Johannes (Körpersprache im Workshop und in Gesprächen) ist eigenständiger Ast — nicht Teil der Kinder-Reihe.',

  naechstePruefung: 'Nach erstem Einsatz',
}

export default modul

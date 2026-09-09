// Module, die im Dokumentenbestand referenziert, aber noch nicht in die App
// übertragen sind. Sie machen die Struktur der Reihen sichtbar — ihr Inhalt
// steht bewusst nicht hier, damit nichts erfunden wird.
//
// status: 'vorhanden' = Dokument existiert bereits, nur noch nicht erfasst
//         'geplant'   = Dokument ist angekündigt, aber noch nicht geschrieben

const stub = (o) => ({ erfasst: false, modulNr: 1, ...o })

const module = [
  stub({
    id: 'koerpersprache-k2-m1',
    datei: 'Koerpersprache_Klasse2_Modul1_Was_ich_sende.md',
    reiheId: 'koerpersprache',
    klasse: 2,
    titel: 'Was ich sende',
    status: 'vorhanden',
    stand: 'erstellt 16. April 2026',
    kernsatz:
      'Unbewusste Signale: wenn Körper und Worte nicht übereinstimmen, glauben andere dem Körper.',
  }),
  stub({
    id: 'koerpersprache-k3-m1',
    datei: 'Koerpersprache_Klasse3_Modul1_Koerper_im_Konflikt.md',
    reiheId: 'koerpersprache',
    klasse: 3,
    titel: 'Körper im Konflikt',
    status: 'vorhanden',
    stand: 'erstellt 29. April 2026',
    kernsatz: 'Was passiert mit meinem Körper wenn ich wütend bin? Was hilft?',
  }),
  stub({
    id: 'koerpersprache-k4-m1',
    datei: 'Koerpersprache_Klasse4_Modul1_Grenzen_zeigen.md',
    reiheId: 'koerpersprache',
    klasse: 4,
    titel: 'Grenzen zeigen',
    status: 'geplant',
    stand: '',
    kernsatz:
      'Körpersprache als bewusstes Werkzeug: Grenzen, Offenheit, Stärke ohne Worte.',
  }),
  stub({
    id: 'gfk-k1-m1',
    datei: 'GFK_Klasse1_Modul1_Gefuehle.md',
    reiheId: 'gfk',
    klasse: 1,
    titel: 'Gefühle',
    status: 'vorhanden',
    stand: '',
    kernsatz: 'Gefühle haben Namen — und man darf sie sagen.',
  }),
  stub({
    id: 'gfk-k1-m2',
    datei: 'GFK_Klasse1_Modul2_Beduerfnisse.md',
    reiheId: 'gfk',
    klasse: 1,
    modulNr: 2,
    titel: 'Bedürfnisse',
    status: 'vorhanden',
    stand: '',
    kernsatz: 'Hinter jedem Gefühl steckt ein Bedürfnis.',
  }),
  stub({
    id: 'ausschluss-k1-m1',
    datei: 'Ausschluss_Klasse1_Modul1_Dazugehoeren.md',
    reiheId: 'ausschluss',
    klasse: 1,
    titel: 'Dazugehören',
    status: 'vorhanden',
    stand: '',
    kernsatz: 'Ausschluss wird zuerst am Körper spürbar.',
  }),
  stub({
    id: 'beleidigungen-k1-m1',
    datei: 'Beleidigungen_Klasse1_Modul1_Woerter_die_wehtun.md',
    reiheId: 'beleidigungen',
    klasse: 1,
    titel: 'Wörter die wehtun',
    status: 'vorhanden',
    stand: '',
    kernsatz: 'Beleidigungen treffen den Körper — wörtlich.',
  }),
  stub({
    id: 'kompetenz-koerpersprache-fachkraft',
    datei: 'Kompetenz/Koerpersprache_Fachkraft.md',
    reiheId: 'kompetenz',
    klasse: null,
    titel: 'Körpersprache für die Fachkraft',
    status: 'vorhanden',
    stand: 'erstellt 26. April 2026',
    kernsatz:
      'Stand, Augenhöhe, Stille, drei Anker (Boden/Atem/Hand) — im Workshop und im Gespräch.',
  }),
  stub({
    id: 'kompetenz-classroom-management',
    datei: 'Kompetenz/Classroom_Management_Kurs.md',
    reiheId: 'kompetenz',
    klasse: null,
    titel: 'Classroom Management',
    status: 'vorhanden',
    stand: '',
    kernsatz: 'Nähe statt Lautstärke, Blick, Haltung.',
  }),
]

export default module

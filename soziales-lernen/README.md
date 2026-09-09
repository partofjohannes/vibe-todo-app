# Soziales Lernen — Workshop-Bibliothek

Eine Bibliothek für Workshops der Grundschulsozialarbeit: Module durchsuchen,
vorbereiten und mit Timer durchführen. Läuft im Browser auf Handy, Tablet und
Laptop — ohne Server, ohne Konto.

## Was die App kann

**Bibliothek** — Alle Module mit Filter nach Reihe, Klasse und Verfügbarkeit.
Suche über Titel, Kernsatz und Dateinamen.

**Reihen-Ansicht** — Wie ein Thema über die Klassen wächst: die Dimensionen,
die Schwerpunkte pro Klasse, die Anker-Spirale.

**Modul-Ansicht** — Das vollständige Workshop-Dokument: Warum, Ziele, Rahmen,
Ablauf mit aufklappbaren Phasen, schwierige Momente, methodische Alternativen,
Anker für den Alltag, Material und Verbindungen zu anderen Modulen.

**Durchführung** — Der Modus für die 45 Minuten selbst:

- Vorbereitung mit Material-Checkliste
- Phase für Phase, ein Bildschirm pro Phase
- Timer je Phase mit Ampel (grün / gelb ab 80 % / rot bei Überschreitung) und Gesamtzeit
- Sprechtexte groß und serif gesetzt — auf einen Blick als „das lese ich vor“ erkennbar
- Schwierige Momente jederzeit über einen Knopf erreichbar. Was zur laufenden
  Phase passt, steht oben — der Rest bleibt darunter erreichbar
- Situationskarten für Phase 4 als durchblätterbares Deck, statt Zettel zu schreiben
- Methodische Varianten sind kombinierbar und greifen wirklich in den Ablauf ein:
  Phasenfilter, Zeitvorgaben und Anpassungen, die genau in der Phase erscheinen,
  in der sie gelten

**Nachbereitung** — Direkt nach dem Workshop das Lehrkraft-Briefing zum Kopieren,
damit der Anker weitergetragen wird. Danach Kinder-Echo und Beobachtungen
festhalten.

**Rückfluss ins Dokument** — Die Notizen erscheinen beim Modul unter „Deine
Durchführungen“ und lassen sich als Markdown-Block exportieren, der sich direkt
in die `.md`-Datei einfügen lässt — Beobachtungen schon als Checkliste für
„Ideen für nächste Version“. Steht ein Modul auf `ENTWURF` mit „Nächste
Überprüfung: nach erstem Einsatz“, weist die App nach der ersten Durchführung
darauf hin.

## Starten

### Ohne alles: die Einzeldatei

`Workshop-Bibliothek.html` im Projektordner ist die vollständige App in einer
einzigen Datei — Doppelklick genügt. Kein Node, kein Terminal, kein Server, kein
Internet. Alles ist eingebettet, die Datei lädt beim Öffnen nichts nach.

Sie ist ein Schnappschuss des Codes: nach Änderungen neu erzeugen mit

```bash
npm run build:einzeldatei
```

Notizen liegen dabei im localStorage des Browsers, nicht in der Datei — ein
anderer Browser oder gelöschte Browserdaten heißt: keine Notizen mehr.

### Mit Node

```bash
npm install
npm run dev              # Entwicklung, http://localhost:5173
npm run dev -- --host    # zusätzlich im lokalen Netz, z. B. fürs Tablet
npm run build            # Produktionsbuild nach dist/
npm run preview          # Build lokal ansehen
npm run build:einzeldatei  # Workshop-Bibliothek.html neu erzeugen
```

## Im Netz veröffentlichen

`.github/workflows/pages.yml` baut die App bei jedem Push auf `main` und stellt
sie auf GitHub Pages bereit:

    https://partofjohannes.github.io/vibe-todo-app/

Einmalig nötig: im Repository unter **Settings → Pages** als Source
**GitHub Actions** wählen. Der Workflow setzt `VITE_BASE=/vibe-todo-app/`,
weil die App dort in einem Unterordner liegt; lokal bleibt die Basis `/`.

## Inhalte pflegen

Workshop-Inhalte liegen als Daten in `src/data/`, nicht im Code:

- `src/data/reihen.js` — die thematischen Stränge (Körpersprache, GFK, …) mit
  Dimensionen, Klassen-Schwerpunkten und Anker-Spirale
- `src/data/module/` — ein Modul pro Datei
- `src/data/index.js` — führt alles zusammen

Ein neues Modul: Datei in `src/data/module/` anlegen, in `src/data/index.js`
importieren und in `MODULE` eintragen. Die Struktur zeigt
`koerpersprache-k1-m1.js` — Schritte im Ablauf tragen einen Typ, der über die
Darstellung entscheidet:

| Typ | Darstellung |
|---|---|
| `sprechtext` | Vorlesekarte, serif, mit „Vorlesen“-Marke |
| `anweisung` | Fließtext — was du tust |
| `hinweis` | Grauer Kasten |
| `wichtig` | Roter Kasten mit Warnzeichen |
| `karten` | Große Wortkarten (z. B. die Gefühlswörter) |
| `liste` | Nummerierte Karten |
| `landung` | Hervorgehobener Abschluss-Satz |
| `echo` | Kinder-Echo am Ende |
| `situationskarten` | Kartendeck aus `modul.situationskarten` |

### Varianten

Jede Alternative in `alternativen` kann drei Dinge tun, einzeln oder zusammen:

- `phasen: [1, 2, 5]` — beschränkt den Ablauf auf diese Phasen
- `phasenZeit: { 4: 15 }` — überschreibt die Planzeit einer Phase
- `anpassungen: { 3: { text, quelle } }` — Text, der im Durchführungs-Modus in
  genau dieser Phase erscheint

Varianten sind kombinierbar; Phasenfilter schneiden sich, Anpassungen sammeln
sich. `quelle` unterscheidet `'dokument'` (steht so im Modul) von
`'abgeleitet'` (folgt zwingend aus der Anweisung, ist dort aber nicht
ausformuliert) — abgeleitete Anpassungen sind in der App als solche markiert.

### Situationskarten

`modul.situationskarten` speist jeden Schritt vom Typ `situationskarten`. Karten
mit `herkunft: 'vorschlag'` stehen noch nicht im Dokument und sind in der App
sichtbar so gekennzeichnet — beim nächsten Übertragen also prüfen oder streichen.

Module, deren Dokument existiert, die aber noch nicht übertragen sind, stehen
als Kurzeintrag in `src/data/module/angekuendigt.js`. Sie erscheinen in der
Bibliothek als „Noch nicht erfasst“ — die App erfindet keine Workshop-Inhalte.

## Daten

Durchführungen und Notizen liegen im `localStorage` des Geräts
(Schlüssel `soziales_lernen_durchfuehrungen`). Nichts wird übertragen. Wer die
Daten sichern will, sollte sie exportieren, bevor er Browserdaten löscht.

## Erster Inhalt

`Koerpersprache_Klasse1_Modul1_Was_der_Koerper_sagt.md` (Version 1.2, Juli 2026)
ist vollständig übertragen. Neun weitere Module aus dessen Verbindungen sind als
Kurzeinträge angelegt.

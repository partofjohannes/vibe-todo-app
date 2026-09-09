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
- Sprechtexte groß und serif gesetzt — auf einen Blick als „das lese ich vor" erkennbar
- Schwierige Momente jederzeit über einen Knopf erreichbar, nicht drei Menüs tief
- Methodische Varianten verkürzen den Ablauf: die Kurzversion fährt nur die
  Phasen 1, 2 und 5 (25 statt 45 Minuten)

**Nachbereitung** — Nach dem Workshop Kinder-Echo und Beobachtungen festhalten.
Die Notizen erscheinen später beim Modul unter „Deine Durchführungen" und
speisen die Ideen für die nächste Version.

## Starten

```bash
npm install
npm run dev      # Entwicklung
npm run build    # Produktionsbuild nach dist/
npm run preview  # Build lokal ansehen
```

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
| `sprechtext` | Vorlesekarte, serif, mit „Vorlesen"-Marke |
| `anweisung` | Fließtext — was du tust |
| `hinweis` | Grauer Kasten |
| `wichtig` | Roter Kasten mit Warnzeichen |
| `karten` | Große Wortkarten (z. B. die Gefühlswörter) |
| `liste` | Nummerierte Karten |
| `landung` | Hervorgehobener Abschluss-Satz |
| `echo` | Kinder-Echo am Ende |

Module, deren Dokument existiert, die aber noch nicht übertragen sind, stehen
als Kurzeintrag in `src/data/module/angekuendigt.js`. Sie erscheinen in der
Bibliothek als „Noch nicht erfasst" — die App erfindet keine Workshop-Inhalte.

## Daten

Durchführungen und Notizen liegen im `localStorage` des Geräts
(Schlüssel `soziales_lernen_durchfuehrungen`). Nichts wird übertragen. Wer die
Daten sichern will, sollte sie exportieren, bevor er Browserdaten löscht.

## Erster Inhalt

`Koerpersprache_Klasse1_Modul1_Was_der_Koerper_sagt.md` (Version 1.2, Juli 2026)
ist vollständig übertragen. Neun weitere Module aus dessen Verbindungen sind als
Kurzeinträge angelegt.

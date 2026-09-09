// Fügt JS und CSS aus dem Build direkt in die HTML-Datei ein, sodass eine
// einzige Datei entsteht, die ohne Server und ohne Internet läuft.

import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const ordner = 'dist-einzeldatei'
const ziel = 'Workshop-Bibliothek.html'

const lies = (datei) => {
  const pfad = join(ordner, datei)
  if (!existsSync(pfad)) throw new Error(`${pfad} fehlt — lief der Build durch?`)
  return readFileSync(pfad, 'utf8')
}

let html = lies('index.html')
const js = lies('app.js')
const css = lies('app.css')

// Verweise auf die externen Dateien durch deren Inhalt ersetzen.
// Ersetzungs-FUNKTION statt String: sonst deutet replace $-Zeichen im
// minifizierten Code als Sondermuster und zerlegt die Ausgabe.
html = html.replace(
  /\s*<link rel="stylesheet"[^>]*app\.css[^>]*>/,
  () => `\n    <style>\n${css}\n    </style>`
)
// Das Skript muss ans Ende des Body: als Modul war es automatisch
// aufgeschoben, inline läuft es sofort — und fände #root noch nicht vor.
html = html.replace(/\s*<script[^>]*src="[^"]*app\.js"[^>]*><\/script>/, '')
html = html.replace('</body>', () => `  <script>\n${js}\n    </script>\n  </body>`)

if (html.includes('app.js') || html.includes('app.css')) {
  throw new Error('Es sind noch externe Verweise übrig — die Datei wäre nicht eigenständig.')
}

writeFileSync(ziel, html)
const groesse = (Buffer.byteLength(html) / 1024).toFixed(0)
console.log(`${ziel} geschrieben — ${groesse} kB, keine externen Dateien.`)

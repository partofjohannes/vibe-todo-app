// Rückfluss ins Dokument: Das Modul sagt selbst, dass Beobachtungen in
// "Ideen für nächste Version" wandern sollen. Diese Funktion baut den
// Markdown-Block, der sich direkt in die .md-Datei einfügen lässt.

import { formatDatum } from './zeit'

export function baueMarkdown(modul, durchfuehrungen) {
  if (!durchfuehrungen.length) return ''

  const zeilen = [`## Durchführungen — ${modul.titel}`, '']

  durchfuehrungen.forEach((d) => {
    const kopf = [formatDatum(d.datum)]
    if (d.gruppe) kopf.push(d.gruppe)
    kopf.push(`${d.dauerMin} Min`)
    if (d.varianten?.length) kopf.push(d.varianten.join(', '))

    zeilen.push(`### ${kopf.join(' · ')}`)
    if (d.echo) zeilen.push(`**Kinder-Echo:** ${d.echo}`)
    if (d.aufgefallen) zeilen.push(`**Aufgefallen:** ${d.aufgefallen}`)
    if (!d.echo && !d.aufgefallen) zeilen.push('*Keine Notiz.*')
    zeilen.push('')
  })

  const beobachtungen = durchfuehrungen.filter((d) => d.aufgefallen)
  if (beobachtungen.length) {
    zeilen.push('### Kandidaten für „Ideen für nächste Version“', '')
    beobachtungen.forEach((d) => {
      zeilen.push(`- [ ] ${d.aufgefallen} *(${formatDatum(d.datum)})*`)
    })
    zeilen.push('')
  }

  return zeilen.join('\n')
}

export async function inZwischenablage(text) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (fehler) {
    console.error('Kopieren fehlgeschlagen:', fehler)
    return false
  }
}

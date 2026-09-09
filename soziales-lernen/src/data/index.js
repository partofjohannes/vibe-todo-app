import koerperspracheK1M1 from './module/koerpersprache-k1-m1'
import angekuendigt from './module/angekuendigt'
import { REIHEN, getReihe } from './reihen'

// Vollständig erfasste Module zuerst, danach die angekündigten.
export const MODULE = [koerperspracheK1M1, ...angekuendigt]

export { REIHEN, getReihe }

export function getModul(id) {
  return MODULE.find((m) => m.id === id) || null
}

export function getModuleDerReihe(reiheId) {
  return MODULE.filter((m) => m.reiheId === reiheId).sort(
    (a, b) => (a.klasse ?? 99) - (b.klasse ?? 99) || a.modulNr - b.modulNr
  )
}

// Baut den Ablauf für eine Auswahl an Varianten zusammen.
// Varianten sind kombinierbar: Phasenfilter schneiden sich, Anpassungen
// sammeln sich pro Phase, Zeitvorgaben überschreiben die Planzeit.
export function baueAblauf(modul, varianten = []) {
  if (!modul?.ablauf) return []

  const aktive = (modul.alternativen || []).filter((a) => varianten.includes(a.id))

  let phasen = modul.ablauf
  aktive.forEach((a) => {
    if (a.phasen) phasen = phasen.filter((p) => a.phasen.includes(p.nr))
  })

  return phasen.map((phase) => {
    const anpassungen = aktive.flatMap((a) => {
      const eintrag = a.anpassungen?.[phase.nr]
      return eintrag ? [{ variante: a.name, ...eintrag }] : []
    })

    // Letzte gesetzte Zeitvorgabe gewinnt; ohne Vorgabe bleibt die Planzeit
    const minuten = aktive.reduce(
      (wert, a) => (a.phasenZeit?.[phase.nr] != null ? a.phasenZeit[phase.nr] : wert),
      phase.minuten
    )

    // Kartendecks liegen am Modul, nicht am Schritt — hier einsetzen
    const schritte = phase.schritte.map((schritt) =>
      schritt.typ === 'situationskarten'
        ? { ...schritt, karten: modul.situationskarten || [] }
        : schritt
    )

    return { ...phase, minuten, planMinuten: phase.minuten, anpassungen, schritte }
  })
}

// Schwierige Momente, die zu einer Phase passen — der Rest bleibt erreichbar.
export function teileMomente(momente = [], phasenNr) {
  if (phasenNr == null) return { passend: [], weitere: momente }
  const passend = momente.filter((m) => m.phasen?.includes(phasenNr))
  const weitere = momente.filter((m) => !m.phasen?.includes(phasenNr))
  return { passend, weitere }
}

export function gesamtDauer(phasen) {
  return phasen.reduce((summe, p) => summe + p.minuten, 0)
}

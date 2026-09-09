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

// Phasen eines Moduls, gefiltert nach einer gewählten Variante.
export function getPhasen(modul, variante) {
  if (!modul?.ablauf) return []
  const alt = modul.alternativen?.find((a) => a.id === variante)
  if (alt?.phasen) return modul.ablauf.filter((p) => alt.phasen.includes(p.nr))
  return modul.ablauf
}

export function gesamtDauer(phasen) {
  return phasen.reduce((summe, p) => summe + p.minuten, 0)
}

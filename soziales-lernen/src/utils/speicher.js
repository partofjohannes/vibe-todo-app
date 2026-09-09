// LocalStorage: Durchführungen und Notizen der Fachkraft.
// Nichts verlässt das Gerät — die App braucht keinen Server.

const KEY = 'soziales_lernen_durchfuehrungen'

export function ladeDurchfuehrungen() {
  try {
    const roh = localStorage.getItem(KEY)
    return roh ? JSON.parse(roh) : []
  } catch (fehler) {
    console.error('Durchführungen konnten nicht geladen werden:', fehler)
    return []
  }
}

export function speichereDurchfuehrung(eintrag) {
  const alle = ladeDurchfuehrungen()
  const neu = [{ id: String(Date.now()), ...eintrag }, ...alle]
  try {
    localStorage.setItem(KEY, JSON.stringify(neu))
  } catch (fehler) {
    console.error('Durchführung konnte nicht gespeichert werden:', fehler)
  }
  return neu
}

export function loescheDurchfuehrung(id) {
  const neu = ladeDurchfuehrungen().filter((d) => d.id !== id)
  try {
    localStorage.setItem(KEY, JSON.stringify(neu))
  } catch (fehler) {
    console.error('Durchführung konnte nicht gelöscht werden:', fehler)
  }
  return neu
}

export function durchfuehrungenFuerModul(modulId) {
  return ladeDurchfuehrungen().filter((d) => d.modulId === modulId)
}

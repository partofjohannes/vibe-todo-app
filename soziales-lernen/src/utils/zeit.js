export function formatMinSek(sekunden) {
  const s = Math.max(0, Math.floor(sekunden))
  const min = Math.floor(s / 60)
  const rest = s % 60
  return `${min}:${String(rest).padStart(2, '0')}`
}

export function formatDatum(iso) {
  try {
    return new Date(iso).toLocaleDateString('de-DE', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })
  } catch {
    return iso
  }
}

// Ampel für den Phasen-Timer: wie weit ist die geplante Zeit verbraucht?
export function zeitStatus(verbrauchtSek, geplantMin) {
  const geplantSek = geplantMin * 60
  if (verbrauchtSek > geplantSek) return 'drueber'
  if (verbrauchtSek > geplantSek * 0.8) return 'knapp'
  return 'gut'
}

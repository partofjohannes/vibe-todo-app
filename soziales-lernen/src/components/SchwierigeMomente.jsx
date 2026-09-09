import { teileMomente } from '../data'

// Overlay im Durchführungs-Modus: wenn etwas kippt, muss der Satz in
// zwei Sekunden auf dem Bildschirm sein — nicht drei Menüs tief.
// Was zur laufenden Phase passt, steht oben; der Rest bleibt erreichbar.

export default function SchwierigeMomente({ momente, phasenNr, offen, onSchliessen }) {
  if (!offen) return null
  const { passend, weitere } = teileMomente(momente, phasenNr)

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-ink-900/40 p-0 sm:items-center sm:p-4">
      <div className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-sand-50 p-5 shadow-xl sm:rounded-3xl">
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 className="text-lg font-semibold text-ink-900">Mögliche schwierige Momente</h2>
          <button
            type="button"
            onClick={onSchliessen}
            className="shrink-0 rounded-full bg-white px-4 py-2 text-sm text-ink-700 shadow-sm transition hover:text-moos-600"
          >
            Schließen
          </button>
        </div>

        {passend.length > 0 && (
          <>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-moos-600">
              Kommt in Phase {phasenNr} am ehesten vor
            </h3>
            <div className="mb-5 space-y-3">
              {passend.map((moment, i) => (
                <Moment key={i} moment={moment} hervorgehoben />
              ))}
            </div>
          </>
        )}

        {weitere.length > 0 && (
          <>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-ink-500">
              {passend.length > 0 ? 'Weitere' : 'Alle Momente'}
            </h3>
            <div className="space-y-3">
              {weitere.map((moment, i) => (
                <Moment key={i} moment={moment} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function Moment({ moment, hervorgehoben = false }) {
  return (
    <div
      className={`rounded-2xl p-4 shadow-sm ${
        hervorgehoben ? 'border border-moos-100 bg-white' : 'bg-white/70'
      }`}
    >
      <h4 className="font-semibold text-ink-900">{moment.situation}</h4>
      <p className="mt-1 text-sm leading-relaxed text-ink-700">{moment.umgang}</p>
      {moment.spruch && (
        <p className="sprechtext mt-3 border-l-4 border-moos-400 pl-4 text-lg leading-relaxed text-ink-900">
          „{moment.spruch}“
        </p>
      )}
    </div>
  )
}

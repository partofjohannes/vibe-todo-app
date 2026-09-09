// Overlay im Durchführungs-Modus: wenn etwas kippt, muss der Satz in
// zwei Sekunden auf dem Bildschirm sein — nicht drei Menüs tief.

export default function SchwierigeMomente({ momente, offen, onSchliessen }) {
  if (!offen) return null

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-ink-900/40 p-0 sm:items-center sm:p-4">
      <div className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-sand-50 p-5 shadow-xl sm:rounded-3xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-ink-900">Mögliche schwierige Momente</h2>
          <button
            type="button"
            onClick={onSchliessen}
            className="rounded-full bg-white px-4 py-2 text-sm text-ink-700 shadow-sm transition hover:text-moos-600"
          >
            Schließen
          </button>
        </div>

        <div className="space-y-3">
          {momente.map((moment, i) => (
            <div key={i} className="rounded-2xl bg-white p-4 shadow-sm">
              <h3 className="font-semibold text-ink-900">{moment.situation}</h3>
              <p className="mt-1 text-sm leading-relaxed text-ink-700">{moment.umgang}</p>
              {moment.spruch && (
                <p className="sprechtext mt-3 border-l-4 border-moos-400 pl-4 text-lg leading-relaxed text-ink-900">
                  „{moment.spruch}“
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

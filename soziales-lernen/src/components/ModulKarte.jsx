const STATUS_STIL = {
  entwurf: { text: 'Entwurf', klasse: 'bg-mohn-50 text-mohn-700 border-mohn-200' },
  erprobt: { text: 'Erprobt', klasse: 'bg-moos-50 text-moos-800 border-moos-100' },
  vorhanden: { text: 'Noch nicht erfasst', klasse: 'bg-sand-100 text-ink-500 border-sand-200' },
  geplant: { text: 'Geplant', klasse: 'bg-sand-50 text-ink-500 border-sand-200' },
}

export default function ModulKarte({ modul, reihe, durchfuehrungen = 0, onOeffnen }) {
  const status = STATUS_STIL[modul.status] || STATUS_STIL.geplant
  const offen = modul.erfasst

  return (
    <button
      type="button"
      onClick={() => onOeffnen(modul)}
      className={`group w-full rounded-2xl border p-5 text-left transition ${
        offen
          ? 'border-sand-200 bg-white shadow-sm hover:border-moos-400 hover:shadow-md'
          : 'border-dashed border-sand-300 bg-sand-50 hover:border-ink-500'
      }`}
    >
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-moos-50 px-2.5 py-0.5 text-xs font-semibold text-moos-800">
          {reihe?.name || 'Ohne Reihe'}
        </span>
        {modul.klasse != null && (
          <span className="rounded-full bg-sand-100 px-2.5 py-0.5 text-xs font-medium text-ink-700">
            Klasse {modul.klasse}
          </span>
        )}
        <span className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${status.klasse}`}>
          {status.text}
        </span>
      </div>

      <h3 className={`text-lg font-semibold ${offen ? 'text-ink-900' : 'text-ink-500'}`}>
        {modul.titel}
      </h3>

      {modul.kernsatz && (
        <p className="mt-1 text-sm leading-relaxed text-ink-700">{modul.kernsatz}</p>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-500">
        {modul.rahmen?.dauer && <span>⏱ {modul.rahmen.dauer} Min</span>}
        {modul.ablauf && <span>▸ {modul.ablauf.length} Phasen</span>}
        {durchfuehrungen > 0 && (
          <span className="font-medium text-moos-600">
            ✓ {durchfuehrungen}× durchgeführt
          </span>
        )}
        {!offen && <span className="italic">nur als Dokument vorhanden</span>}
      </div>
    </button>
  )
}

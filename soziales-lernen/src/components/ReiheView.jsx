import ModulKarte from './ModulKarte'
import { getReihe, getModuleDerReihe } from '../data'

export default function ReiheView({ reiheId, onModulOeffnen, onZurueck }) {
  const reihe = getReihe(reiheId)
  if (!reihe) return null
  const module = getModuleDerReihe(reiheId)

  return (
    <div className="mx-auto max-w-4xl px-4 py-6">
      <button
        type="button"
        onClick={onZurueck}
        className="mb-6 text-sm text-ink-500 transition hover:text-moos-600"
      >
        ← Zur Bibliothek
      </button>

      <h1 className="text-3xl font-semibold text-ink-900">{reihe.name}</h1>
      <p className="mt-2 max-w-2xl leading-relaxed text-ink-700">{reihe.beschreibung}</p>

      {reihe.dimensionen.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-ink-500">
            Die {reihe.dimensionen.length} Dimensionen
          </h2>
          <div className="space-y-3">
            {reihe.dimensionen.map((d) => (
              <div key={d.nr} className="rounded-2xl border border-sand-200 bg-white p-5 shadow-sm">
                <div className="flex items-baseline gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-moos-600 text-sm font-semibold text-white">
                    {d.nr}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-ink-900">
                      {d.name}
                      <span className="ml-2 font-normal text-ink-500">— {d.frage}</span>
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink-700">{d.text}</p>
                    <p className="mt-2 text-xs text-moos-600">
                      Einstieg: {d.einstieg} · Vertiefung: {d.vertiefung}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {reihe.klassen.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-ink-500">
            Wie die Klassen es bekommen
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-sand-200 bg-white shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-sand-200 bg-sand-50 text-xs uppercase tracking-wider text-ink-500">
                <tr>
                  <th className="px-4 py-3">Klasse</th>
                  <th className="px-4 py-3">Schwerpunkt</th>
                  <th className="px-4 py-3">Leitfrage</th>
                </tr>
              </thead>
              <tbody>
                {reihe.klassen.map((k) => (
                  <tr key={k.klasse} className="border-b border-sand-100 last:border-0">
                    <td className="px-4 py-3 font-semibold text-moos-600">{k.klasse}</td>
                    <td className="px-4 py-3 text-ink-900">{k.schwerpunkt}</td>
                    <td className="px-4 py-3 text-ink-700">{k.leitfrage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {reihe.hinweis && <p className="mt-3 text-sm italic text-ink-500">{reihe.hinweis}</p>}
        </section>
      )}

      {reihe.ankerSpirale.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-ink-500">
            Anker-Spirale der Reihe
          </h2>
          <div className="flex flex-wrap items-center gap-2">
            {reihe.ankerSpirale.map((a, i) => (
              <div key={a.klasse} className="flex items-center gap-2">
                <div className="rounded-2xl border border-sand-200 bg-white px-4 py-3 shadow-sm">
                  <div className="text-xs font-semibold text-moos-600">Klasse {a.klasse}</div>
                  <div className="sprechtext text-ink-900">{a.anker}</div>
                </div>
                {i < reihe.ankerSpirale.length - 1 && (
                  <span aria-hidden="true" className="text-ink-500">
                    →
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="mt-10">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-ink-500">
          Module dieser Reihe ({module.length})
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {module.map((m) => (
            <ModulKarte key={m.id} modul={m} reihe={reihe} onOeffnen={onModulOeffnen} />
          ))}
        </div>
      </section>
    </div>
  )
}

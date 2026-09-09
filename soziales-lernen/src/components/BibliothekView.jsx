import { useMemo, useState } from 'react'
import ModulKarte from './ModulKarte'
import { MODULE, REIHEN, getReihe } from '../data'

const KLASSEN = [1, 2, 3, 4]

export default function BibliothekView({ durchfuehrungen, onModulOeffnen, onReiheOeffnen }) {
  const [suche, setSuche] = useState('')
  const [reiheFilter, setReiheFilter] = useState(null)
  const [klasseFilter, setKlasseFilter] = useState(null)
  const [nurErfasste, setNurErfasste] = useState(false)

  const zaehlung = useMemo(() => {
    const map = {}
    durchfuehrungen.forEach((d) => {
      map[d.modulId] = (map[d.modulId] || 0) + 1
    })
    return map
  }, [durchfuehrungen])

  const gefiltert = useMemo(() => {
    const begriff = suche.trim().toLowerCase()
    return MODULE.filter((m) => {
      if (reiheFilter && m.reiheId !== reiheFilter) return false
      if (klasseFilter && m.klasse !== klasseFilter) return false
      if (nurErfasste && !m.erfasst) return false
      if (!begriff) return true
      const heuhaufen = [m.titel, m.kernsatz, getReihe(m.reiheId)?.name, m.datei]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
      return heuhaufen.includes(begriff)
    })
  }, [suche, reiheFilter, klasseFilter, nurErfasste])

  const erfasste = gefiltert.filter((m) => m.erfasst)
  const offene = gefiltert.filter((m) => !m.erfasst)

  return (
    <div className="mx-auto max-w-5xl px-4 py-6">
      <div className="mb-6">
        <input
          type="search"
          value={suche}
          onChange={(e) => setSuche(e.target.value)}
          placeholder="Suchen — Titel, Thema, Dateiname…"
          className="w-full rounded-2xl border border-sand-200 bg-white px-5 py-3 text-base text-ink-900 shadow-sm outline-none placeholder:text-ink-500/60 focus:border-moos-400"
        />
      </div>

      <div className="mb-6 space-y-3">
        <Filterzeile label="Reihe">
          <FilterChip aktiv={!reiheFilter} onClick={() => setReiheFilter(null)}>
            Alle
          </FilterChip>
          {REIHEN.map((r) => (
            <FilterChip
              key={r.id}
              aktiv={reiheFilter === r.id}
              onClick={() => setReiheFilter(reiheFilter === r.id ? null : r.id)}
            >
              {r.name}
            </FilterChip>
          ))}
        </Filterzeile>

        <Filterzeile label="Klasse">
          <FilterChip aktiv={!klasseFilter} onClick={() => setKlasseFilter(null)}>
            Alle
          </FilterChip>
          {KLASSEN.map((k) => (
            <FilterChip
              key={k}
              aktiv={klasseFilter === k}
              onClick={() => setKlasseFilter(klasseFilter === k ? null : k)}
            >
              Klasse {k}
            </FilterChip>
          ))}
          <FilterChip aktiv={nurErfasste} onClick={() => setNurErfasste(!nurErfasste)}>
            Nur durchführbare
          </FilterChip>
        </Filterzeile>
      </div>

      {reiheFilter && (
        <button
          type="button"
          onClick={() => onReiheOeffnen(reiheFilter)}
          className="mb-6 w-full rounded-2xl border border-moos-100 bg-moos-50 px-5 py-3 text-left text-sm text-moos-800 transition hover:border-moos-400"
        >
          <span className="font-semibold">{getReihe(reiheFilter)?.name}</span> — wie das Thema über
          die Klassen wächst ansehen →
        </button>
      )}

      {gefiltert.length === 0 && (
        <p className="rounded-2xl border border-dashed border-sand-300 px-5 py-10 text-center text-ink-500">
          Nichts gefunden. Andere Filter probieren?
        </p>
      )}

      {erfasste.length > 0 && (
        <section className="mb-10">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-ink-500">
            Durchführbar ({erfasste.length})
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {erfasste.map((m) => (
              <ModulKarte
                key={m.id}
                modul={m}
                reihe={getReihe(m.reiheId)}
                durchfuehrungen={zaehlung[m.id] || 0}
                onOeffnen={onModulOeffnen}
              />
            ))}
          </div>
        </section>
      )}

      {offene.length > 0 && (
        <section>
          <h2 className="mb-1 text-sm font-semibold uppercase tracking-wider text-ink-500">
            Im Bestand, noch nicht erfasst ({offene.length})
          </h2>
          <p className="mb-3 text-sm text-ink-500">
            Diese Module sind in den Dokumenten verlinkt. Ihr Inhalt steht bewusst noch nicht in der
            App — er wird übertragen, nicht erfunden.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            {offene.map((m) => (
              <ModulKarte
                key={m.id}
                modul={m}
                reihe={getReihe(m.reiheId)}
                durchfuehrungen={zaehlung[m.id] || 0}
                onOeffnen={onModulOeffnen}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

function Filterzeile({ label, children }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="w-14 shrink-0 text-xs font-semibold uppercase tracking-wider text-ink-500">
        {label}
      </span>
      {children}
    </div>
  )
}

function FilterChip({ aktiv, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3 py-1.5 text-sm transition ${
        aktiv
          ? 'border-moos-600 bg-moos-600 text-white'
          : 'border-sand-200 bg-white text-ink-700 hover:border-moos-400'
      }`}
    >
      {children}
    </button>
  )
}

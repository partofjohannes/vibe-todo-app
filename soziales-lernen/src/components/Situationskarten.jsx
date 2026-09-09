import { useState } from 'react'

// Kartendeck für Phase 4. Eine Karte zur Zeit — was du gerade erzählst,
// steht groß da; blättern gibt den nächsten Durchgang.

export default function Situationskarten({ karten = [], gross = false }) {
  const [index, setIndex] = useState(0)
  const [uebersicht, setUebersicht] = useState(false)

  if (karten.length === 0) return null
  const karte = karten[index]
  const vorschlag = karte.herkunft === 'vorschlag'

  return (
    <div className="animate-einblenden">
      <div className="rounded-2xl border-l-4 border-moos-400 bg-white px-5 py-5 shadow-sm">
        <div className="mb-2 flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-moos-600">
          <span aria-hidden="true">🃏</span>
          <span>
            Situation {index + 1} von {karten.length}
          </span>
          {vorschlag && (
            <span className="rounded-full bg-mohn-50 px-2 py-0.5 text-[10px] font-medium normal-case tracking-normal text-mohn-700">
              Vorschlag — nicht im Dokument
            </span>
          )}
          {!vorschlag && karte.quelle && (
            <span className="rounded-full bg-sand-100 px-2 py-0.5 text-[10px] font-medium normal-case tracking-normal text-ink-500">
              {karte.quelle}
            </span>
          )}
        </div>

        <p
          className={`sprechtext text-ink-900 ${
            gross ? 'text-2xl leading-relaxed md:text-3xl' : 'text-lg leading-relaxed'
          }`}
        >
          „{karte.text}“
        </p>

        {karte.hinweis && (
          <p className={`mt-3 text-ink-500 ${gross ? 'text-base' : 'text-sm'}`}>{karte.hinweis}</p>
        )}

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setIndex((i) => (i - 1 + karten.length) % karten.length)}
            className="rounded-full border border-sand-300 px-3 py-1.5 text-sm text-ink-700 transition hover:border-moos-400"
          >
            ← Zurück
          </button>
          <button
            type="button"
            onClick={() => setIndex((i) => (i + 1) % karten.length)}
            className="rounded-full border border-moos-400 bg-moos-50 px-4 py-1.5 text-sm font-medium text-moos-800 transition hover:bg-moos-100"
          >
            Nächste Situation →
          </button>
          <button
            type="button"
            onClick={() => setUebersicht(!uebersicht)}
            className="ml-auto text-sm text-ink-500 transition hover:text-moos-600"
          >
            {uebersicht ? 'Übersicht schließen' : 'Alle ansehen'}
          </button>
        </div>

        <div className="mt-3 flex gap-1">
          {karten.map((k, i) => (
            <button
              key={k.id}
              type="button"
              aria-label={`Situation ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 flex-1 rounded-full transition ${
                i === index ? 'bg-moos-600' : 'bg-sand-200 hover:bg-sand-300'
              }`}
            />
          ))}
        </div>
      </div>

      {uebersicht && (
        <ul className="mt-2 space-y-1">
          {karten.map((k, i) => (
            <li key={k.id}>
              <button
                type="button"
                onClick={() => {
                  setIndex(i)
                  setUebersicht(false)
                }}
                className={`w-full rounded-xl px-4 py-2 text-left text-sm transition ${
                  i === index ? 'bg-moos-50 text-moos-800' : 'bg-white text-ink-700 hover:bg-sand-100'
                }`}
              >
                <span className="mr-2 text-ink-500">{i + 1}.</span>
                {k.text}
                {k.herkunft === 'vorschlag' && (
                  <span className="ml-2 text-xs text-mohn-700">· Vorschlag</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

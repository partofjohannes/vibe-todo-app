import { useEffect, useMemo, useRef, useState } from 'react'
import SchrittBlock from './SchrittBlock'
import SchwierigeMomente from './SchwierigeMomente'
import { getModul, getPhasen, gesamtDauer } from '../data'
import { formatMinSek, zeitStatus } from '../utils/zeit'

const AMPEL = {
  gut: 'text-moos-600',
  knapp: 'text-mohn-500',
  drueber: 'text-mohn-700',
}

export default function DurchfuehrungView({ modulId, variante, onBeenden, onAbbrechen }) {
  const modul = getModul(modulId)
  const phasen = useMemo(() => getPhasen(modul, variante), [modul, variante])

  const [abschnitt, setAbschnitt] = useState('vorbereitung')
  const [index, setIndex] = useState(0)
  const [abgehakt, setAbgehakt] = useState({})
  const [momenteOffen, setMomenteOffen] = useState(false)
  const [jetzt, setJetzt] = useState(Date.now())

  const startGesamt = useRef(null)
  const startPhase = useRef(null)

  // Sekundentakt nur solange der Workshop wirklich läuft
  useEffect(() => {
    if (abschnitt !== 'phase') return undefined
    const timer = setInterval(() => setJetzt(Date.now()), 1000)
    return () => clearInterval(timer)
  }, [abschnitt])

  if (!modul) return null

  const phase = phasen[index]
  const gesamtGeplant = gesamtDauer(phasen)
  const gesamtSek = startGesamt.current ? (jetzt - startGesamt.current) / 1000 : 0
  const phaseSek = startPhase.current ? (jetzt - startPhase.current) / 1000 : 0

  function starten() {
    const nun = Date.now()
    startGesamt.current = nun
    startPhase.current = nun
    setJetzt(nun)
    setAbschnitt('phase')
  }

  function weiter() {
    if (index < phasen.length - 1) {
      setIndex(index + 1)
      startPhase.current = Date.now()
      setJetzt(Date.now())
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      setAbschnitt('nachbereitung')
    }
  }

  function zurueck() {
    if (index === 0) return
    setIndex(index - 1)
    startPhase.current = Date.now()
    setJetzt(Date.now())
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (abschnitt === 'vorbereitung') {
    return (
      <Vorbereitung
        modul={modul}
        phasen={phasen}
        variante={variante}
        abgehakt={abgehakt}
        setAbgehakt={setAbgehakt}
        onStarten={starten}
        onAbbrechen={onAbbrechen}
      />
    )
  }

  if (abschnitt === 'nachbereitung') {
    return (
      <Nachbereitung
        modul={modul}
        variante={variante}
        dauerMin={Math.max(1, Math.round(gesamtSek / 60))}
        onSpeichern={onBeenden}
        onVerwerfen={onAbbrechen}
      />
    )
  }

  const status = zeitStatus(phaseSek, phase.minuten)

  return (
    <div className="min-h-screen pb-40">
      <header className="sticky top-0 z-20 border-b border-sand-200 bg-sand-50/95 backdrop-blur">
        <div className="mx-auto max-w-3xl px-4 py-3">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onAbbrechen}
              className="shrink-0 text-sm text-ink-500 transition hover:text-mohn-500"
            >
              Abbrechen
            </button>
            <div className="min-w-0 flex-1 text-center text-sm text-ink-500">
              Phase {index + 1} von {phasen.length}
            </div>
            <div className="shrink-0 text-right">
              <div className={`font-mono text-lg font-semibold ${AMPEL[status]}`}>
                {formatMinSek(phaseSek)}
              </div>
              <div className="text-[10px] text-ink-500">von {phase.minuten}:00</div>
            </div>
          </div>
          <div className="mt-2 flex gap-1">
            {phasen.map((p, i) => (
              <div
                key={p.nr}
                className={`h-1.5 flex-1 rounded-full ${
                  i < index ? 'bg-moos-400' : i === index ? 'bg-moos-600' : 'bg-sand-200'
                }`}
              />
            ))}
          </div>
          <div className="mt-1 text-center text-[11px] text-ink-500">
            gesamt {formatMinSek(gesamtSek)} / {gesamtGeplant}:00
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-6">
        <div className="mb-6">
          <div className="text-sm font-semibold uppercase tracking-wider text-moos-600">
            Phase {phase.nr} · {phase.minuten} Minuten
          </div>
          <h1 className="mt-1 text-2xl font-semibold leading-tight text-ink-900 md:text-3xl">
            {phase.titel}
          </h1>
          <p className="mt-1 text-ink-500">{phase.kurz}</p>
        </div>

        <div className="space-y-5">
          {phase.schritte.map((schritt, i) => (
            <SchrittBlock key={i} schritt={schritt} gross />
          ))}
        </div>
      </main>

      <SchwierigeMomente
        momente={modul.schwierigeMomente}
        offen={momenteOffen}
        onSchliessen={() => setMomenteOffen(false)}
      />

      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-sand-200 bg-sand-50/95 px-4 py-3 pb-safe backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center gap-3">
          <button
            type="button"
            onClick={zurueck}
            disabled={index === 0}
            className="shrink-0 rounded-full border border-sand-300 bg-white px-4 py-3 text-sm text-ink-700 transition hover:border-moos-400 disabled:opacity-40"
          >
            ← Zurück
          </button>
          <button
            type="button"
            onClick={() => setMomenteOffen(true)}
            className="shrink-0 rounded-full border border-mohn-200 bg-mohn-50 px-4 py-3 text-sm font-medium text-mohn-700 transition hover:border-mohn-500"
          >
            🆘 Schwierige Momente
          </button>
          <button
            type="button"
            onClick={weiter}
            className="min-w-0 flex-1 rounded-full bg-moos-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-moos-800"
          >
            {index < phasen.length - 1 ? 'Nächste Phase →' : 'Workshop abschließen'}
          </button>
        </div>
      </div>
    </div>
  )
}

function Vorbereitung({ modul, phasen, variante, abgehakt, setAbgehakt, onStarten, onAbbrechen }) {
  const alt = modul.alternativen.find((a) => a.id === variante)
  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <button
        type="button"
        onClick={onAbbrechen}
        className="mb-6 text-sm text-ink-500 transition hover:text-moos-600"
      >
        ← Zurück zum Modul
      </button>

      <h1 className="text-2xl font-semibold text-ink-900">Bereit für „{modul.titel}“?</h1>
      <p className="mt-2 text-ink-700">
        {phasen.length} Phasen · {gesamtDauer(phasen)} Minuten
        {alt && <span className="text-moos-600"> · {alt.name}</span>}
      </p>

      <section className="mt-8">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-ink-500">
          Checkliste
        </h2>
        <div className="space-y-2">
          {modul.material.checkliste.map((eintrag, i) => (
            <label
              key={i}
              className="flex cursor-pointer items-center gap-3 rounded-xl border border-sand-200 bg-white px-4 py-3 shadow-sm transition hover:border-moos-400"
            >
              <input
                type="checkbox"
                checked={Boolean(abgehakt[i])}
                onChange={() => setAbgehakt({ ...abgehakt, [i]: !abgehakt[i] })}
                className="h-5 w-5 shrink-0 accent-moos-600"
              />
              <span className={`text-sm ${abgehakt[i] ? 'text-ink-500 line-through' : 'text-ink-900'}`}>
                {eintrag.text}
                {eintrag.optional && <span className="ml-2 text-xs text-ink-500">(optional)</span>}
              </span>
            </label>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-2xl bg-sand-100 p-5">
        <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-ink-500">
          Rolle der Lehrkraft
        </h2>
        <p className="text-sm leading-relaxed text-ink-700">{modul.rahmen.lehrkraft}</p>
      </section>

      <button
        type="button"
        onClick={onStarten}
        className="mt-8 w-full rounded-full bg-moos-600 px-6 py-4 text-lg font-semibold text-white shadow-sm transition hover:bg-moos-800"
      >
        Los geht's — Timer starten
      </button>
    </div>
  )
}

function Nachbereitung({ modul, variante, dauerMin, onSpeichern, onVerwerfen }) {
  const [gruppe, setGruppe] = useState('')
  const [echo, setEcho] = useState('')
  const [aufgefallen, setAufgefallen] = useState('')

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="rounded-2xl border border-moos-100 bg-moos-50 p-6 text-center">
        <div className="text-4xl" aria-hidden="true">
          🕊️
        </div>
        <h1 className="mt-3 text-2xl font-semibold text-ink-900">Workshop beendet</h1>
        <p className="mt-1 text-ink-700">
          {modul.titel} · {dauerMin} Minuten
        </p>
      </div>

      <p className="mt-6 text-sm leading-relaxed text-ink-700">
        Das Kinder-Echo festhalten, solange es frisch ist. Was auffällt, wandert später in „Ideen für
        nächste Version“.
      </p>

      <div className="mt-6 space-y-4">
        <Eingabe label="Gruppe / Klasse" wert={gruppe} setWert={setGruppe} platzhalter="z. B. 1b" />
        <Textfeld
          label="Kinder-Echo — eng oder weit?"
          wert={echo}
          setWert={setEcho}
          platzhalter="Wie war es für die Kinder? Was haben sie gezeigt?"
        />
        <Textfeld
          label="Was ist dir aufgefallen?"
          wert={aufgefallen}
          setWert={setAufgefallen}
          platzhalter="Was lief anders als geplant? Was nächstes Mal ändern?"
        />
      </div>

      <div className="mt-8 flex gap-3">
        <button
          type="button"
          onClick={onVerwerfen}
          className="rounded-full border border-sand-300 bg-white px-5 py-3 text-sm text-ink-700 transition hover:border-mohn-500"
        >
          Ohne Notiz beenden
        </button>
        <button
          type="button"
          onClick={() =>
            onSpeichern({
              modulId: modul.id,
              datum: new Date().toISOString(),
              variante,
              dauerMin,
              gruppe: gruppe.trim(),
              echo: echo.trim(),
              aufgefallen: aufgefallen.trim(),
            })
          }
          className="flex-1 rounded-full bg-moos-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-moos-800"
        >
          Durchführung speichern
        </button>
      </div>
    </div>
  )
}

function Eingabe({ label, wert, setWert, platzhalter }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-ink-900">{label}</span>
      <input
        type="text"
        value={wert}
        onChange={(e) => setWert(e.target.value)}
        placeholder={platzhalter}
        className="w-full rounded-xl border border-sand-200 bg-white px-4 py-3 text-ink-900 outline-none placeholder:text-ink-500/60 focus:border-moos-400"
      />
    </label>
  )
}

function Textfeld({ label, wert, setWert, platzhalter }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-ink-900">{label}</span>
      <textarea
        value={wert}
        onChange={(e) => setWert(e.target.value)}
        placeholder={platzhalter}
        rows={3}
        className="w-full resize-y rounded-xl border border-sand-200 bg-white px-4 py-3 text-ink-900 outline-none placeholder:text-ink-500/60 focus:border-moos-400"
      />
    </label>
  )
}

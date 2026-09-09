import { useState } from 'react'
import SchrittBlock from './SchrittBlock'
import { getReihe, getModul, getPhasen, gesamtDauer } from '../data'
import { formatDatum } from '../utils/zeit'

export default function ModulView({
  modulId,
  durchfuehrungen,
  onStarten,
  onModulOeffnen,
  onReiheOeffnen,
  onZurueck,
  onDurchfuehrungLoeschen,
}) {
  const modul = getModul(modulId)
  const [variante, setVariante] = useState('voll')
  const [offenePhase, setOffenePhase] = useState(null)

  if (!modul) return null
  const reihe = getReihe(modul.reiheId)

  if (!modul.erfasst) return <NichtErfasst modul={modul} reihe={reihe} onZurueck={onZurueck} />

  const phasen = getPhasen(modul, variante)
  const dauer = gesamtDauer(phasen)
  const eigene = durchfuehrungen.filter((d) => d.modulId === modul.id)

  return (
    <div className="mx-auto max-w-3xl px-4 pb-32 pt-6">
      <button
        type="button"
        onClick={onZurueck}
        className="mb-6 text-sm text-ink-500 transition hover:text-moos-600"
      >
        ← Zur Bibliothek
      </button>

      <div className="mb-3 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => onReiheOeffnen(modul.reiheId)}
          className="rounded-full bg-moos-50 px-2.5 py-0.5 text-xs font-semibold text-moos-800 transition hover:bg-moos-100"
        >
          {reihe?.name} ↗
        </button>
        <span className="rounded-full bg-sand-100 px-2.5 py-0.5 text-xs font-medium text-ink-700">
          Klasse {modul.klasse} · Modul {modul.modulNr}
        </span>
        <span className="rounded-full border border-mohn-200 bg-mohn-50 px-2.5 py-0.5 text-xs font-medium text-mohn-700">
          {modul.status === 'entwurf' ? 'Entwurf' : 'Erprobt'}
        </span>
        <span className="text-xs text-ink-500">
          Version {modul.version} · {modul.stand}
        </span>
      </div>

      <h1 className="text-3xl font-semibold leading-tight text-ink-900 md:text-4xl">
        {modul.titel}
      </h1>
      <p className="sprechtext mt-4 rounded-2xl border-l-4 border-moos-400 bg-white px-5 py-4 text-xl leading-relaxed text-ink-900 shadow-sm">
        {modul.kernsatz}
      </p>
      <p className="mt-3 text-sm text-ink-500">{modul.vorwissen}</p>

      <Abschnitt titel="Warum dieser Workshop">
        <div className="space-y-3">
          {modul.warum.map((absatz, i) => (
            <p key={i} className="leading-relaxed text-ink-700">
              {absatz}
            </p>
          ))}
        </div>
      </Abschnitt>

      <Abschnitt titel="Ziele">
        <ul className="space-y-2">
          {modul.ziele.map((ziel, i) => (
            <li key={i} className="flex gap-3 leading-relaxed text-ink-700">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-moos-400" />
              {ziel}
            </li>
          ))}
        </ul>
      </Abschnitt>

      <Abschnitt titel="Rahmen">
        <dl className="grid gap-3 sm:grid-cols-2">
          <Feld label="Dauer" wert={`${modul.rahmen.dauer} Minuten`} />
          <Feld label="Gruppe" wert={modul.rahmen.gruppe} />
          <Feld label="Raum" wert={modul.rahmen.raum} />
          <Feld label="Material" wert={modul.rahmen.material} />
          <div className="sm:col-span-2">
            <Feld label="Rolle der Lehrkraft" wert={modul.rahmen.lehrkraft} />
          </div>
        </dl>
      </Abschnitt>

      <Abschnitt titel={`Ablauf — ${phasen.length} Phasen, ${dauer} Minuten`}>
        <div className="space-y-2">
          {phasen.map((phase) => {
            const offen = offenePhase === phase.nr
            return (
              <div
                key={phase.nr}
                className="overflow-hidden rounded-2xl border border-sand-200 bg-white shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => setOffenePhase(offen ? null : phase.nr)}
                  className="flex w-full items-center gap-4 px-5 py-4 text-left transition hover:bg-sand-50"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-moos-600 text-sm font-semibold text-white">
                    {phase.nr}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold text-ink-900">{phase.titel}</span>
                    <span className="block text-sm text-ink-500">{phase.kurz}</span>
                  </span>
                  <span className="shrink-0 text-sm text-ink-500">{phase.minuten} Min</span>
                  <span aria-hidden="true" className="shrink-0 text-ink-500">
                    {offen ? '▾' : '▸'}
                  </span>
                </button>
                {offen && (
                  <div className="space-y-4 border-t border-sand-100 bg-sand-50 px-5 py-5">
                    {phase.schritte.map((schritt, i) => (
                      <SchrittBlock key={i} schritt={schritt} />
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </Abschnitt>

      <Abschnitt titel="Mögliche schwierige Momente">
        <div className="space-y-3">
          {modul.schwierigeMomente.map((moment, i) => (
            <div key={i} className="rounded-2xl border border-sand-200 bg-white p-5 shadow-sm">
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
      </Abschnitt>

      <Abschnitt titel="Methodische Alternativen">
        <div className="space-y-3">
          {modul.alternativen.map((alt) => (
            <div key={alt.id} className="rounded-2xl bg-sand-100 p-5">
              <h3 className="font-semibold text-ink-900">{alt.wenn}</h3>
              <p className="mt-1 text-sm leading-relaxed text-ink-700">{alt.dann}</p>
              {alt.phasen && (
                <button
                  type="button"
                  onClick={() => setVariante(variante === alt.id ? 'voll' : alt.id)}
                  className={`mt-3 rounded-full border px-3 py-1.5 text-sm transition ${
                    variante === alt.id
                      ? 'border-moos-600 bg-moos-600 text-white'
                      : 'border-sand-300 bg-white text-ink-700 hover:border-moos-400'
                  }`}
                >
                  {variante === alt.id ? '✓ Diese Variante aktiv' : 'Diese Variante wählen'}
                </button>
              )}
            </div>
          ))}
        </div>
      </Abschnitt>

      <Abschnitt titel="Anker für den Alltag">
        <div className="rounded-2xl border border-moos-100 bg-moos-50 p-5">
          <h3 className="font-semibold text-moos-800">{modul.anker.geste.name}</h3>
          <p className="mt-1 text-sm leading-relaxed text-ink-700">{modul.anker.geste.text}</p>
        </div>
        <div className="mt-3 rounded-2xl border border-sand-200 bg-white p-5 shadow-sm">
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-ink-500">
            Lehrkraft-Briefing (3 Sätze)
          </h3>
          <p className="sprechtext leading-relaxed text-ink-900">„{modul.anker.briefing}“</p>
          <button
            type="button"
            onClick={() => navigator.clipboard?.writeText(modul.anker.briefing)}
            className="mt-3 rounded-full border border-sand-300 px-3 py-1.5 text-sm text-ink-700 transition hover:border-moos-400"
          >
            Briefing kopieren
          </button>
        </div>
      </Abschnitt>

      <Abschnitt titel="Material">
        <Materialgruppe titel="🛠 Selbst erstellen (kostenlos)" eintraege={modul.material.selbst} />
        <Materialgruppe titel="🌐 Freie Ressourcen" eintraege={modul.material.frei} />
        <Materialgruppe titel="💳 Bewährte bezahlte Materialien" eintraege={modul.material.bezahlt} />
        <Materialgruppe titel="📱 Digital" eintraege={modul.material.digital} />
      </Abschnitt>

      <Abschnitt titel="Verbindungen">
        <div className="space-y-2">
          {modul.verbindungen.map((v, i) => {
            const zielModul = v.modulId ? getModul(v.modulId) : null
            const klickbar = Boolean(zielModul)
            return (
              <div
                key={i}
                onClick={klickbar ? () => onModulOeffnen(zielModul) : undefined}
                role={klickbar ? 'button' : undefined}
                tabIndex={klickbar ? 0 : undefined}
                onKeyDown={
                  klickbar
                    ? (e) => e.key === 'Enter' && onModulOeffnen(zielModul)
                    : undefined
                }
                className={`rounded-2xl border border-sand-200 bg-white p-4 shadow-sm ${
                  klickbar ? 'cursor-pointer transition hover:border-moos-400' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <span aria-hidden="true" className="text-moos-600">
                    {v.richtung === 'weiter' ? '→' : '↔'}
                  </span>
                  <div className="min-w-0">
                    <div className="break-words font-medium text-ink-900">
                      {zielModul ? zielModul.titel : v.ziel}
                    </div>
                    <p className="mt-0.5 text-sm leading-relaxed text-ink-700">{v.text}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </Abschnitt>

      <Abschnitt titel="Ideen für nächste Version">
        <ul className="space-y-2">
          {modul.ideen.map((idee, i) => (
            <li key={i} className="flex gap-3 text-sm leading-relaxed text-ink-700">
              <span className="text-ink-500">☐</span>
              {idee}
            </li>
          ))}
        </ul>
      </Abschnitt>

      {eigene.length > 0 && (
        <Abschnitt titel={`Deine Durchführungen (${eigene.length})`}>
          <div className="space-y-3">
            {eigene.map((d) => (
              <div key={d.id} className="rounded-2xl border border-sand-200 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="font-medium text-ink-900">
                      {formatDatum(d.datum)}
                      {d.gruppe && <span className="text-ink-500"> · {d.gruppe}</span>}
                    </div>
                    <div className="text-xs text-ink-500">
                      {d.dauerMin} Min gelaufen
                      {d.variante && d.variante !== 'voll' && ` · Variante: ${d.variante}`}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => onDurchfuehrungLoeschen(d.id)}
                    className="shrink-0 text-xs text-ink-500 transition hover:text-mohn-500"
                  >
                    Löschen
                  </button>
                </div>
                {d.echo && (
                  <p className="mt-3 text-sm text-ink-700">
                    <span className="font-semibold">Kinder-Echo:</span> {d.echo}
                  </p>
                )}
                {d.aufgefallen && (
                  <p className="mt-2 text-sm text-ink-700">
                    <span className="font-semibold">Aufgefallen:</span> {d.aufgefallen}
                  </p>
                )}
              </div>
            ))}
          </div>
        </Abschnitt>
      )}

      <p className="mt-10 rounded-2xl bg-sand-100 px-5 py-4 text-xs leading-relaxed text-ink-500">
        <span className="font-semibold">System-Hinweis:</span> {modul.systemHinweis}
        <br />
        <span className="mt-2 block">
          Nächste Überprüfung: {modul.naechstePruefung} · Quelle: {modul.datei}
        </span>
      </p>

      <div className="fixed inset-x-0 bottom-0 border-t border-sand-200 bg-sand-50/95 px-4 py-3 pb-safe backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center gap-3">
          <div className="min-w-0 flex-1 text-sm text-ink-700">
            <span className="font-semibold">{phasen.length} Phasen</span> · {dauer} Min
            {variante !== 'voll' && (
              <span className="ml-2 rounded-full bg-moos-600 px-2 py-0.5 text-xs text-white">
                {modul.alternativen.find((a) => a.id === variante)?.name}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={() => onStarten(modul.id, variante)}
            className="shrink-0 rounded-full bg-moos-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-moos-800"
          >
            Workshop starten →
          </button>
        </div>
      </div>
    </div>
  )
}

function NichtErfasst({ modul, reihe, onZurueck }) {
  return (
    <div className="mx-auto max-w-2xl px-4 py-6">
      <button
        type="button"
        onClick={onZurueck}
        className="mb-6 text-sm text-ink-500 transition hover:text-moos-600"
      >
        ← Zur Bibliothek
      </button>
      <h1 className="text-3xl font-semibold text-ink-900">{modul.titel}</h1>
      <p className="mt-2 text-ink-700">{modul.kernsatz}</p>
      <div className="mt-8 rounded-2xl border border-dashed border-sand-300 bg-sand-50 p-6">
        <h2 className="font-semibold text-ink-900">
          {modul.status === 'geplant' ? 'Noch nicht geschrieben' : 'Noch nicht in die App übertragen'}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-ink-700">
          {modul.status === 'geplant'
            ? 'Dieses Modul ist in der Reihe angekündigt, aber noch nicht ausgearbeitet.'
            : 'Das Dokument existiert bereits im Bestand. Der Inhalt wird hier eingetragen, sobald er übertragen ist — die App erfindet keine Workshop-Inhalte.'}
        </p>
        <dl className="mt-4 space-y-1 text-sm text-ink-500">
          <div>
            <span className="font-medium">Reihe:</span> {reihe?.name}
          </div>
          {modul.klasse != null && (
            <div>
              <span className="font-medium">Klasse:</span> {modul.klasse}
            </div>
          )}
          <div className="break-all">
            <span className="font-medium">Datei:</span> {modul.datei}
          </div>
          {modul.stand && (
            <div>
              <span className="font-medium">Stand:</span> {modul.stand}
            </div>
          )}
        </dl>
      </div>
    </div>
  )
}

function Abschnitt({ titel, children }) {
  return (
    <section className="mt-10">
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-ink-500">{titel}</h2>
      {children}
    </section>
  )
}

function Feld({ label, wert }) {
  return (
    <div className="rounded-xl bg-white p-4 shadow-sm">
      <dt className="text-xs font-semibold uppercase tracking-wider text-ink-500">{label}</dt>
      <dd className="mt-1 text-sm leading-relaxed text-ink-900">{wert}</dd>
    </div>
  )
}

function Materialgruppe({ titel, eintraege }) {
  if (!eintraege?.length) return null
  return (
    <div className="mb-4">
      <h3 className="mb-2 text-sm font-semibold text-ink-900">{titel}</h3>
      <ul className="space-y-2">
        {eintraege.map((e, i) => (
          <li key={i} className="rounded-xl bg-white px-4 py-3 text-sm shadow-sm">
            <span className="font-medium text-ink-900">{e.name}</span>
            <span className="text-ink-700"> — {e.text}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

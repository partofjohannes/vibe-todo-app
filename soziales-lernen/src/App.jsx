import { useEffect, useState } from 'react'
import BibliothekView from './components/BibliothekView'
import ReiheView from './components/ReiheView'
import ModulView from './components/ModulView'
import DurchfuehrungView from './components/DurchfuehrungView'
import {
  ladeDurchfuehrungen,
  speichereDurchfuehrung,
  loescheDurchfuehrung,
} from './utils/speicher'

const START = { name: 'bibliothek' }

export default function App() {
  const [ansicht, setAnsicht] = useState(START)
  const [verlauf, setVerlauf] = useState([])
  const [durchfuehrungen, setDurchfuehrungen] = useState(() => ladeDurchfuehrungen())

  // Nach jedem Ansichtswechsel oben anfangen
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [ansicht])

  function oeffne(neu) {
    setVerlauf((v) => [...v, ansicht])
    setAnsicht(neu)
  }

  function zurueck() {
    setVerlauf((v) => {
      if (v.length === 0) {
        setAnsicht(START)
        return v
      }
      setAnsicht(v[v.length - 1])
      return v.slice(0, -1)
    })
  }

  function zurBibliothek() {
    setVerlauf([])
    setAnsicht(START)
  }

  function durchfuehrungSpeichern(eintrag) {
    setDurchfuehrungen(speichereDurchfuehrung(eintrag))
    setVerlauf([])
    setAnsicht({ name: 'modul', modulId: eintrag.modulId })
  }

  const imWorkshop = ansicht.name === 'durchfuehrung'

  return (
    <div className="min-h-screen bg-sand-50">
      {!imWorkshop && (
        <header className="border-b border-sand-200 bg-white">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
            <button
              type="button"
              onClick={zurBibliothek}
              className="text-left"
            >
              <div className="text-lg font-semibold text-ink-900">Soziales Lernen</div>
              <div className="text-xs text-ink-500">Workshop-Bibliothek für die Grundschule</div>
            </button>
            {durchfuehrungen.length > 0 && (
              <div className="text-right text-xs text-ink-500">
                <div className="font-semibold text-moos-600">{durchfuehrungen.length}</div>
                <div>Durchführungen</div>
              </div>
            )}
          </div>
        </header>
      )}

      {ansicht.name === 'bibliothek' && (
        <BibliothekView
          durchfuehrungen={durchfuehrungen}
          onModulOeffnen={(m) => oeffne({ name: 'modul', modulId: m.id })}
          onReiheOeffnen={(id) => oeffne({ name: 'reihe', reiheId: id })}
        />
      )}

      {ansicht.name === 'reihe' && (
        <ReiheView
          reiheId={ansicht.reiheId}
          onModulOeffnen={(m) => oeffne({ name: 'modul', modulId: m.id })}
          onZurueck={zurueck}
        />
      )}

      {ansicht.name === 'modul' && (
        <ModulView
          modulId={ansicht.modulId}
          durchfuehrungen={durchfuehrungen}
          onStarten={(modulId, variante) =>
            oeffne({ name: 'durchfuehrung', modulId, variante })
          }
          onModulOeffnen={(m) => oeffne({ name: 'modul', modulId: m.id })}
          onReiheOeffnen={(id) => oeffne({ name: 'reihe', reiheId: id })}
          onZurueck={zurueck}
          onDurchfuehrungLoeschen={(id) => setDurchfuehrungen(loescheDurchfuehrung(id))}
        />
      )}

      {imWorkshop && (
        <DurchfuehrungView
          modulId={ansicht.modulId}
          variante={ansicht.variante}
          onBeenden={durchfuehrungSpeichern}
          onAbbrechen={zurueck}
        />
      )}
    </div>
  )
}

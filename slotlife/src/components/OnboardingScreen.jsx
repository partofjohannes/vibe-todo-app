import { useState } from 'react'
import { DEFAULT_CONFIG } from '../utils/config'

export default function OnboardingScreen({ onComplete }) {
  const [step, setStep] = useState(1)
  const [config, setConfig] = useState({
    persons: [...DEFAULT_CONFIG.persons],
    slotTimes: JSON.parse(JSON.stringify(DEFAULT_CONFIG.slotTimes)),
  })

  const handlePersonChange = (index, value) => {
    const newPersons = [...config.persons]
    const oldName = newPersons[index]
    const newName = value || DEFAULT_CONFIG.persons[index]
    newPersons[index] = newName
    
    // Aktualisiere auch slotTimes
    const newSlotTimes = { ...config.slotTimes }
    if (oldName !== newName && newSlotTimes[oldName]) {
      newSlotTimes[newName] = newSlotTimes[oldName]
      delete newSlotTimes[oldName]
    }
    
    setConfig({ ...config, persons: newPersons, slotTimes: newSlotTimes })
  }

  const handleComplete = () => {
    onComplete(config)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
        {step === 1 && (
          <div className="text-center animate-fade-in">
            <div className="text-6xl mb-6">👋</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Willkommen bei SlotLife!
            </h1>
            <p className="text-gray-600 mb-8">
              Dein Familien Task-Manager mit Time-Boxing
            </p>
            <button
              onClick={() => setStep(2)}
              className="w-full py-4 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 active:scale-95 transition-all min-h-[56px] text-lg"
            >
              Los geht's! →
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Wer seid ihr?
            </h2>
            <p className="text-gray-600 mb-6 text-sm">
              Gib die Namen eurer Familienmitglieder ein:
            </p>
            
            <div className="space-y-4 mb-8">
              {config.persons.map((person, index) => (
                <div key={index}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Person {index + 1}
                  </label>
                  <input
                    type="text"
                    value={person}
                    onChange={(e) => handlePersonChange(index, e.target.value)}
                    placeholder={DEFAULT_CONFIG.persons[index]}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-400 text-base min-h-[56px]"
                  />
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-300 min-h-[56px]"
              >
                ← Zurück
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex-1 py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 min-h-[56px]"
              >
                Weiter →
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Fast fertig!
            </h2>
            <p className="text-gray-600 mb-6 text-sm">
              Die Standard-Zeitfenster sind bereits konfiguriert:
            </p>
            
            <div className="space-y-3 mb-8 max-h-96 overflow-y-auto">
              {config.persons.map((person, index) => {
                const times = config.slotTimes[person] || {}
                return (
                  <div key={index} className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <div className="font-semibold text-gray-900 mb-2">{person}</div>
                    <div className="text-sm text-gray-600 space-y-1">
                      {times.weekday && (
                        <div>Mo-Fr: {times.weekday.start} - {times.weekday.end}</div>
                      )}
                      {times.saturday && (
                        <div>Sa: {times.saturday.start} - {times.saturday.end}</div>
                      )}
                      {times.sunday && (
                        <div>So: {times.sunday.start} - {times.sunday.end}</div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            <p className="text-xs text-gray-500 mb-4 text-center">
              Du kannst die Zeiten später in den Einstellungen ändern
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(2)}
                className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-300 min-h-[56px]"
              >
                ← Zurück
              </button>
              <button
                onClick={handleComplete}
                className="flex-1 py-3 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 min-h-[56px]"
              >
                Fertig! 🎉
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}



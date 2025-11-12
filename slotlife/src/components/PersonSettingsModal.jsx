import { useState, useEffect } from 'react'
import { getPersonNames, updatePersonNames } from '../utils/config'

export default function PersonSettingsModal({ onClose, onSave }) {
  const [persons, setPersons] = useState(() => getPersonNames())

  const handleSave = () => {
    const success = updatePersonNames(persons)
    if (success) {
      onSave(persons)
      alert('Namen gespeichert! App wird neu geladen...')
      window.location.reload()
    } else {
      alert('Fehler beim Speichern')
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
      <div className="bg-white dark:bg-gray-800 w-full rounded-t-3xl p-6 max-w-md mx-auto max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            👥 Namen ändern
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-3xl w-12 h-12 flex items-center justify-center min-w-[48px] min-h-[48px]"
          >
            ×
          </button>
        </div>

        <div className="space-y-4 mb-6">
          {persons.map((person, index) => (
            <div key={index}>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Person {index + 1}
              </label>
              <input
                type="text"
                value={person}
                onChange={(e) => {
                  const newPersons = [...persons]
                  newPersons[index] = e.target.value || `Person ${index + 1}`
                  setPersons(newPersons)
                }}
                className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-blue-400 text-base min-h-[56px] dark:bg-gray-700 dark:text-white"
              />
            </div>
          ))}
        </div>

        <button
          onClick={handleSave}
          className="w-full py-4 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 active:scale-95 transition-all min-h-[56px]"
        >
          Speichern & Neu laden
        </button>
      </div>
    </div>
  )
}



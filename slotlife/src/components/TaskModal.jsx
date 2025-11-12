import { useState, useEffect } from 'react'
import { getBestMatch, formatMatchSuggestion } from '../utils/autoSuggest'

const DURATION_OPTIONS = [5, 15, 30, 60]
const PERSON_OPTIONS = ['Marie', 'Johannes', 'Emil', 'Egal']

export default function TaskModal({ task, onSave, onClose, preSelectedSlotId, allSlots = [] }) {
  const [title, setTitle] = useState(task?.title || '')
  const [duration, setDuration] = useState(task?.duration || 15)
  const [person, setPerson] = useState(task?.person || 'Egal')
  const [suggestedSlot, setSuggestedSlot] = useState(null)
  const [autoAssign, setAutoAssign] = useState(false)

  useEffect(() => {
    if (task) {
      setTitle(task.title)
      setDuration(task.duration)
      setPerson(task.person)
    } else {
      setSuggestedSlot(null)
      setAutoAssign(false)
    }
  }, [task])

  useEffect(() => {
    // Auto-Suggest bei Änderungen
    if (title.trim() && !task) {
      const tempTask = { title, duration, person, slotId: null }
      const match = getBestMatch(tempTask, allSlots)
      if (match) {
        const suggestion = formatMatchSuggestion(match)
        setSuggestedSlot(suggestion)
      } else {
        setSuggestedSlot(null)
      }
    }
  }, [title, duration, person, allSlots, task])

  const handleSave = () => {
    if (title.trim()) {
      let slotId = preSelectedSlotId || task?.slotId || null
      
      // Auto-Assign wenn Vorschlag angenommen
      if (autoAssign && suggestedSlot) {
        slotId = suggestedSlot.slot.id
      }
      
      onSave({
        title: title.trim(),
        duration,
        person,
        slotId,
      })
    }
  }

  const handleAcceptSuggestion = () => {
    setAutoAssign(true)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end z-50" onClick={onClose}>
      <div
        className="bg-white dark:bg-gray-800 w-full rounded-t-3xl p-6 max-w-md mx-auto max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {task ? 'Task bearbeiten' : 'Neuer Task'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-2xl w-10 h-10 flex items-center justify-center"
          >
            ×
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Aufgabe
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Was ist zu tun?"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base dark:bg-gray-700 dark:text-white"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Dauer
            </label>
            <div className="grid grid-cols-4 gap-2">
              {DURATION_OPTIONS.map(opt => (
                <button
                  key={opt}
                  onClick={() => setDuration(opt)}
                  className={`
                    py-3 px-2 rounded-xl font-medium transition-colors min-h-[44px]
                    ${duration === opt
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }
                  `}
                >
                  {opt} Min
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Person
            </label>
            <div className="grid grid-cols-2 gap-2">
              {PERSON_OPTIONS.map(opt => (
                <button
                  key={opt}
                  onClick={() => setPerson(opt)}
                  className={`
                    py-3 px-4 rounded-xl font-medium transition-colors min-h-[44px]
                    ${person === opt
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }
                  `}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Auto-Suggest */}
          {!task && suggestedSlot && (
            <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-xl">
              <p className="text-sm font-medium text-blue-900 mb-2">
                💡 Vorschlag: {suggestedSlot.text}
              </p>
              {!autoAssign ? (
                <button
                  onClick={handleAcceptSuggestion}
                  className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 min-h-[44px] mb-2"
                >
                  Annehmen
                </button>
              ) : (
                <p className="text-xs text-blue-700">✓ Wird automatisch zugewiesen</p>
              )}
            </div>
          )}

          {!task && !suggestedSlot && title.trim() && (
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl">
              <p className="text-sm text-gray-600">
                ⚠️ Kein passender Slot gefunden
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Task wird in Inbox gespeichert
              </p>
            </div>
          )}

          <button
            onClick={handleSave}
            disabled={!title.trim()}
            className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:text-gray-500 text-white font-semibold py-4 px-6 rounded-xl shadow-lg active:scale-95 transition-transform duration-150 min-h-[44px]"
          >
            Speichern
          </button>
        </div>
      </div>
    </div>
  )
}


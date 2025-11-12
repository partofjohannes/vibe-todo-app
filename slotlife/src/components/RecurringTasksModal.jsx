import { useState, useEffect } from 'react'

const DAYS = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']
const PERSONS = ['Marie', 'Johannes', 'Emil']
const DURATIONS = [5, 15, 30, 60]

export default function RecurringTasksModal({ onClose }) {
  const [templates, setTemplates] = useState(() => {
    const saved = localStorage.getItem('recurringTasks')
    return saved ? JSON.parse(saved) : []
  })

  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    day: 'Mo',
    time: '19:00',
    duration: 15,
    person: 'Marie',
  })

  const handleSave = () => {
    if (formData.title.trim()) {
      const newTemplate = {
        id: Date.now().toString(),
        ...formData,
      }
      const updated = [...templates, newTemplate]
      setTemplates(updated)
      localStorage.setItem('recurringTasks', JSON.stringify(updated))
      setFormData({ title: '', day: 'Mo', time: '19:00', duration: 15, person: 'Marie' })
      setShowForm(false)
    }
  }

  const handleDelete = (id) => {
    const updated = templates.filter(t => t.id !== id)
    setTemplates(updated)
    localStorage.setItem('recurringTasks', JSON.stringify(updated))
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
      <div className="bg-white w-full rounded-t-3xl p-6 max-w-md mx-auto max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">🔁 Wiederkehrende Aufgaben</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl w-10 h-10 flex items-center justify-center"
          >
            ×
          </button>
        </div>

        {!showForm ? (
          <>
            <div className="mb-4">
              <button
                onClick={() => setShowForm(true)}
                className="w-full py-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 min-h-[44px]"
              >
                + Neue wiederkehrende Aufgabe
              </button>
            </div>

            {templates.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <p>Keine wiederkehrenden Aufgaben</p>
              </div>
            ) : (
              <div className="space-y-3">
                {templates.map(template => (
                  <div
                    key={template.id}
                    className="p-4 bg-gray-50 rounded-xl border border-gray-200"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">{template.title}</div>
                        <div className="text-sm text-gray-500 mt-1">
                          {template.day} {template.time} • {template.duration} Min • {template.person}
                        </div>
                      </div>
                      <button
                        onClick={() => handleDelete(template.id)}
                        className="text-red-500 hover:text-red-700 ml-2 min-w-[44px] min-h-[44px]"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Aufgabe
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="z.B. Küche aufräumen"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[44px]"
                autoFocus
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Wochentag
              </label>
              <div className="grid grid-cols-7 gap-2">
                {DAYS.map(day => (
                  <button
                    key={day}
                    onClick={() => setFormData({ ...formData, day })}
                    className={`py-2 px-1 rounded-lg font-medium text-sm min-h-[44px] ${
                      formData.day === day
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Zeit
              </label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[44px]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dauer (Min)
              </label>
              <div className="grid grid-cols-4 gap-2">
                {DURATIONS.map(d => (
                  <button
                    key={d}
                    onClick={() => setFormData({ ...formData, duration: d })}
                    className={`py-2 px-1 rounded-lg font-medium text-sm min-h-[44px] ${
                      formData.duration === d
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Person
              </label>
              <div className="grid grid-cols-3 gap-2">
                {PERSONS.map(p => (
                  <button
                    key={p}
                    onClick={() => setFormData({ ...formData, person: p })}
                    className={`py-3 px-2 rounded-lg font-medium text-sm min-h-[44px] ${
                      formData.person === p
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleSave}
                disabled={!formData.title.trim()}
                className="flex-1 py-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 disabled:bg-gray-300 min-h-[44px]"
              >
                Speichern
              </button>
              <button
                onClick={() => {
                  setShowForm(false)
                  setFormData({ title: '', day: 'Mo', time: '19:00', duration: 15, person: 'Marie' })
                }}
                className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-300 min-h-[44px]"
              >
                Abbrechen
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}



import { useState } from 'react'
import TaskCard from './TaskCard'

const PERSON_FILTERS = [
  { id: 'all', label: 'Alle' },
  { id: 'Marie', label: 'Marie' },
  { id: 'Johannes', label: 'Johannes' },
  { id: 'Emil', label: 'Emil' },
]

export default function InboxView({
  inboxTasks,
  selectedTaskForSlot,
  onToggleComplete,
  onDeleteTask,
  onEditTask,
  onSelectTaskForSlot,
  onCancelSlotSelection,
}) {
  const [filter, setFilter] = useState('all')

  // Sortiere Tasks: Person, dann Zeit
  const sortedTasks = [...inboxTasks].sort((a, b) => {
    // Person-Sortierung (Marie < Johannes < Emil < Egal)
    const personOrder = { 'Marie': 1, 'Johannes': 2, 'Emil': 3, 'Egal': 4 }
    const personDiff = (personOrder[a.person] || 99) - (personOrder[b.person] || 99)
    if (personDiff !== 0) return personDiff
    
    // Dann nach Zeit (längere zuerst)
    return b.duration - a.duration
  })

  // Filter anwenden
  const filteredTasks = filter === 'all'
    ? sortedTasks
    : sortedTasks.filter(task => task.person === filter)

  if (inboxTasks.length === 0) {
    return (
      <div className="px-4 pt-4 pb-24 max-w-md mx-auto min-h-screen flex items-center justify-center animate-fade-in">
        <div className="text-center py-8">
          <div className="text-6xl mb-4 animate-pulse-slow">📭</div>
          <p className="text-gray-500 text-lg mb-2 font-medium">Inbox ist leer</p>
          <p className="text-gray-400 text-sm mb-4">
            Erstelle einen neuen Task über den "+ Task" Button
          </p>
          <p className="text-gray-300 text-xs">
            Oder verwende den Quick-Input in der Heute-Ansicht
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="px-4 pt-4 pb-24 max-w-md mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          📥 Inbox ({inboxTasks.length} offen)
        </h1>

        {/* Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {PERSON_FILTERS.map(filterOption => (
            <button
              key={filterOption.id}
              onClick={() => setFilter(filterOption.id)}
              className={`
                px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap min-h-[44px]
                transition-colors
                ${filter === filterOption.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
              `}
            >
              {filterOption.label}
            </button>
          ))}
        </div>
      </div>

      {selectedTaskForSlot && (
        <div className="mb-4 p-4 bg-blue-50 border-2 border-blue-300 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <div className="flex-1">
              <p className="text-sm font-medium text-blue-900 mb-1">
                Task auswählen: <strong>{selectedTaskForSlot.title}</strong>
              </p>
              <p className="text-xs text-blue-700">
                Tappe auf einen Slot in der Woche oder Heute-Ansicht
              </p>
            </div>
            <button
              onClick={onCancelSlotSelection}
              className="ml-2 px-3 py-1 bg-blue-200 text-blue-800 rounded-lg text-sm font-medium min-h-[44px] hover:bg-blue-300"
            >
              Abbrechen
            </button>
          </div>
        </div>
      )}

      {filteredTasks.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          <p>Keine Tasks für diesen Filter</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredTasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              selectedTaskForSlot={selectedTaskForSlot}
              onToggleComplete={onToggleComplete}
              onDeleteTask={onDeleteTask}
              onEditTask={onEditTask}
              onSelectTaskForSlot={onSelectTaskForSlot}
            />
          ))}
        </div>
      )}
    </div>
  )
}


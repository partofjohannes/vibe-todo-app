import { useState } from 'react'
import TaskCard from './TaskCard'

export default function SlotTaskModal({
  slot,
  inboxTasks,
  onAssignTask,
  onClose,
  onCreateNew,
}) {
  // Filtere Tasks die in Slot passen
  const fittingTasks = inboxTasks.filter(task => {
    const slotUsed = slot.tasks.reduce((sum, t) => sum + t.duration, 0)
    const slotFree = slot.duration - slotUsed
    return task.duration <= slotFree && 
           (task.person === slot.person || task.person === 'Egal')
  })

  const [selectedTask, setSelectedTask] = useState(null)

  const handleAssign = (task) => {
    onAssignTask(task)
    setSelectedTask(null)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end z-50" onClick={onClose}>
      <div
        className="bg-white w-full rounded-t-3xl p-6 max-w-md mx-auto max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Task zu Slot hinzufügen
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {slot.startTime} - {slot.endTime} ({slot.person})
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl w-10 h-10 flex items-center justify-center"
          >
            ×
          </button>
        </div>

        <div className="mb-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            AUS INBOX WÄHLEN:
          </h3>
          
          {fittingTasks.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <p className="mb-2">Keine passenden Tasks in der Inbox</p>
              <p className="text-xs">Tasks müssen in die Slot-Zeit passen</p>
            </div>
          ) : (
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {fittingTasks.map(task => {
                const slotUsed = slot.tasks.reduce((sum, t) => sum + t.duration, 0)
                const slotFree = slot.duration - slotUsed
                const fits = task.duration <= slotFree
                
                return (
                  <div
                    key={task.id}
                    onClick={() => handleAssign(task)}
                    className={`
                      p-3 rounded-lg border-2 cursor-pointer transition-all
                      ${fits 
                        ? 'border-gray-200 bg-gray-50 hover:border-blue-400 hover:bg-blue-50 active:scale-[0.98]' 
                        : 'border-gray-100 bg-gray-50 opacity-50 cursor-not-allowed'
                      }
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">
                          • {task.title}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {task.duration} Min | {task.person}
                          {fits && (
                            <span className="text-green-600 ml-2">
                              ✓ Passt (Noch {slotFree} Min frei)
                            </span>
                          )}
                        </div>
                      </div>
                      {fits && (
                        <div className="text-blue-500 ml-2">→</div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        <button
          onClick={() => {
            onClose()
            onCreateNew()
          }}
          className="w-full py-3 bg-blue-100 text-blue-700 rounded-lg font-medium hover:bg-blue-200 transition-colors min-h-[44px] mt-4"
        >
          Oder neue Task...
        </button>
      </div>
    </div>
  )
}



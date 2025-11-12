import TaskItem from './TaskItem'
import PersonColorBar from './PersonColorBar'

export default function SlotDetailModal({
  slot,
  onClose,
  onToggleComplete,
  onDeleteTask,
  onEditTask,
  onAddTask,
}) {
  const totalTaskDuration = slot.tasks.reduce((sum, task) => sum + task.duration, 0)
  const remainingTime = slot.duration - totalTaskDuration
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end z-50" onClick={onClose}>
      <div
        className="bg-white w-full rounded-t-3xl p-6 max-w-md mx-auto max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <PersonColorBar person={slot.person} className="h-8 rounded" />
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {slot.day || 'Slot'} - {slot.person}
              </h2>
              <p className="text-sm text-gray-500">
                {slot.startTime} - {slot.endTime} ({slot.duration} Min)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl w-10 h-10 flex items-center justify-center"
          >
            ×
          </button>
        </div>
        
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-600">
            <strong>{totalTaskDuration}/{slot.duration} Min belegt</strong>
            {remainingTime > 0 && (
              <span className="text-gray-500"> • Noch {remainingTime} Min frei</span>
            )}
          </div>
        </div>
        
        <div className="space-y-2 mb-4">
          {slot.tasks.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <p className="mb-2">Keine Tasks in diesem Slot</p>
              <button
                onClick={onAddTask}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 min-h-[44px]"
              >
                + Task hinzufügen
              </button>
            </div>
          ) : (
            slot.tasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onToggleComplete={onToggleComplete}
                onDeleteTask={onDeleteTask}
                onEditTask={onEditTask}
                isInSlot={true}
                showActions={true}
              />
            ))
          )}
        </div>
        
        {slot.tasks.length > 0 && (
          <button
            onClick={onAddTask}
            className="w-full py-3 bg-blue-100 text-blue-700 rounded-lg font-medium hover:bg-blue-200 min-h-[44px]"
          >
            + Task hinzufügen
          </button>
        )}
      </div>
    </div>
  )
}



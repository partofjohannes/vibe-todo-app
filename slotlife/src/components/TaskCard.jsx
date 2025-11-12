import PersonColorBar from './PersonColorBar'

export default function TaskCard({
  task,
  selectedTaskForSlot,
  onToggleComplete,
  onDeleteTask,
  onEditTask,
  onSelectTaskForSlot,
}) {
  const isSelected = selectedTaskForSlot?.id === task.id

  const handleInSlotClick = () => {
    if (!task.completed && !isSelected) {
      onSelectTaskForSlot(task)
    }
  }

  const handleCardClick = () => {
    if (!task.completed && !isSelected) {
      onEditTask(task)
    }
  }

  return (
    <div
      onClick={handleCardClick}
      className={`
        bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border-2 transition-all duration-200
        ${isSelected ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' : 'border-gray-200 dark:border-gray-700'}
        ${task.completed ? 'opacity-60' : ''}
        ${!task.completed && !isSelected ? 'cursor-pointer active:scale-[0.98]' : ''}
        flex gap-3
      `}
    >
      <PersonColorBar person={task.person} className="rounded-l-lg" />
      
      <div className="flex-1 min-w-0">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className={`
            text-base font-medium mb-1 flex items-center gap-2
            ${task.completed ? 'line-through text-gray-400 dark:text-gray-500' : 'text-gray-900 dark:text-white'}
          `}>
            <span>•</span>
            {task.isRecurring && (
              <span className="text-blue-500 text-sm" title="Wiederkehrende Aufgabe">
                🔄
              </span>
            )}
            <span>{task.title}</span>
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2">
            <span>{task.duration} Min</span>
            <span>|</span>
            <span>{task.person}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
        {!task.completed && (
          <button
            onClick={handleInSlotClick}
            disabled={isSelected}
            className={`
              flex-1 py-2 px-3 rounded-lg font-medium text-sm transition-colors min-h-[44px]
              ${isSelected 
                ? 'bg-blue-500 text-white cursor-default' 
                : 'bg-blue-100 text-blue-700 hover:bg-blue-200 active:bg-blue-300'
              }
            `}
          >
            {isSelected ? 'Slot auswählen...' : 'In Slot'}
          </button>
        )}
        <button
          onClick={() => onToggleComplete(task.id)}
          className={`
            py-2 px-3 rounded-lg font-medium text-sm transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center
            ${task.completed 
              ? 'bg-green-100 text-green-700 hover:bg-green-200' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }
          `}
          aria-label="Abhaken"
        >
          ✓
        </button>
        <button
          onClick={() => onDeleteTask(task.id)}
          className="py-2 px-3 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 font-medium text-sm transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Löschen"
        >
          ×
        </button>
      </div>
      </div>
    </div>
  )
}


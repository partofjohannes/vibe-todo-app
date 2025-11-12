import { useState } from 'react'
import PersonColorBar from './PersonColorBar'

export default function TaskItem({
  task,
  onToggleComplete,
  onDeleteTask,
  onEditTask,
  isInSlot = false,
  showActions = true,
}) {
  const [lastClickTime, setLastClickTime] = useState(0)

  const handleClick = () => {
    if (!task.completed) {
      const now = Date.now()
      if (now - lastClickTime < 300) {
        // Doppelklick erkannt - sofort bearbeiten
        onEditTask(task)
      } else {
        // Einfacher Klick - bearbeiten
        onEditTask(task)
      }
      setLastClickTime(now)
    }
  }

  return (
    <div
      className={`
        flex items-start gap-2 p-2 rounded-lg transition-colors
        ${task.completed ? 'bg-green-50 dark:bg-green-900/30 text-gray-500 dark:text-gray-400' : 'bg-gray-50 dark:bg-gray-700'}
        ${!task.completed && !isInSlot ? 'hover:bg-gray-100 dark:hover:bg-gray-600 active:bg-gray-200 dark:active:bg-gray-500' : ''}
        ${!task.completed && !isInSlot ? 'cursor-pointer' : ''}
        min-h-[44px]
      `}
      onClick={handleClick}
    >
      <PersonColorBar person={task.person} className="mt-1" />
      <div className="flex-1 flex items-center gap-2 min-w-0">
        <span className={`
          text-lg leading-none mt-0.5
          ${task.completed ? 'text-green-600' : 'text-gray-400'}
        `}>
          {task.completed ? '✓' : '○'}
        </span>
        {task.isRecurring && (
          <span className="text-blue-500 text-sm" title="Wiederkehrende Aufgabe">
            🔄
          </span>
        )}
        <span className={`
          flex-1 text-sm text-gray-900 dark:text-white
          ${task.completed ? 'line-through' : ''}
        `}>
          {task.title}
        </span>
      </div>

      {showActions && (
        <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onToggleComplete(task.id)
            }}
            className={`
              p-2 rounded-lg transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center
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
            onClick={(e) => {
              e.stopPropagation()
              onDeleteTask(task.id)
            }}
            className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Löschen"
          >
            ×
          </button>
        </div>
      )}
    </div>
  )
}


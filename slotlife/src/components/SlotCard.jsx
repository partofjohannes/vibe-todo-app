import { useEffect } from 'react'
import TaskItem from './TaskItem'
import PersonColorBar from './PersonColorBar'

export default function SlotCard({
  slot,
  selectedTaskForSlot,
  onToggleComplete,
  onDeleteTask,
  onEditTask,
  onAssignToSlot,
  onAddTaskToSlot,
  isSelectingSlot,
}) {
  const totalTaskDuration = (slot.tasks || []).reduce((sum, task) => sum + task.duration, 0)
  const remainingTime = slot.duration - totalTaskDuration
  const hasRemainingTime = remainingTime > 0
  const fillStatus = `${totalTaskDuration}/${slot.duration} Min belegt`
  
  // Debug: Zeige Slot-Info
  useEffect(() => {
    console.log(`🟦 SlotCard ${slot.id}:`, { 
      person: slot.person, 
      tasksCount: slot.tasks?.length || 0,
      tasks: slot.tasks?.map(t => ({ id: t.id, title: t.title }))
    })
  }, [slot])

  const handleSlotClick = () => {
    if (isSelectingSlot && selectedTaskForSlot) {
      onAssignToSlot(selectedTaskForSlot)
    }
  }

  const isEmpty = slot.tasks.length === 0
  const isHighlighted = isSelectingSlot && selectedTaskForSlot

  return (
    <div
      onClick={handleSlotClick}
      className={`
        bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border-2 transition-all duration-200
        ${isHighlighted ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' : 'border-gray-200 dark:border-gray-700'}
        ${isSelectingSlot ? 'cursor-pointer active:scale-[0.98]' : ''}
        flex gap-3
      `}
    >
      <PersonColorBar person={slot.person} className="rounded-l-lg" />
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-900 dark:text-white">
              {slot.startTime} - {slot.endTime}
            </span>
          </div>
          <span className="text-sm font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded-full">
            {slot.person}
          </span>
        </div>
        
        <div className="text-xs text-gray-500 dark:text-gray-400 mb-3">
          {fillStatus}
        </div>

      {isEmpty && !isSelectingSlot ? (
        <button
          onClick={(e) => {
            e.stopPropagation()
            onAddTaskToSlot()
          }}
          className="w-full py-3 text-gray-400 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:text-blue-400 transition-colors text-sm min-h-[44px]"
        >
          + Task hinzufügen
        </button>
      ) : (
        <>
          <div className="space-y-2 mb-3">
            {slot.tasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onToggleComplete={onToggleComplete}
                onDeleteTask={onDeleteTask}
                onEditTask={onEditTask}
                isInSlot={true}
                showActions={true}
              />
            ))}
          </div>

          {hasRemainingTime && (
            <>
              <div className="text-sm text-gray-500 flex items-center gap-1 pt-2 border-t border-gray-100 mb-2">
                <span>+</span>
                <span>Noch {remainingTime} Min frei</span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onAddTaskToSlot()
                }}
                className="w-full py-2 px-3 text-sm text-blue-600 border-2 border-dashed border-blue-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors min-h-[44px]"
              >
                + Weitere Task hinzufügen
              </button>
            </>
          )}

          {!hasRemainingTime && remainingTime === 0 && slot.tasks.length > 0 && (
            <div className="text-sm text-gray-500 pt-2 border-t border-gray-100">
              ✓ Slot voll
            </div>
          )}

          {remainingTime < 0 && (
            <div className="text-sm text-red-600 font-medium pt-2 border-t border-red-100 bg-red-50 rounded p-2">
              ⚠️ Slot überfüllt! ({Math.abs(remainingTime)} Min zu viel)
            </div>
          )}
        </>
      )}

        {isSelectingSlot && (
          <div className="mt-3 pt-3 border-t border-blue-200 text-sm text-blue-600 font-medium">
            Tap hier um Task zuzuweisen →
          </div>
        )}
      </div>
    </div>
  )
}


import PersonColorBar from './PersonColorBar'

export default function WeekSlotCard({ slot, onClick, isSelectingSlot, isHighlighted }) {
  const totalTaskDuration = slot.tasks.reduce((sum, task) => sum + task.duration, 0)
  const fillStatus = `${totalTaskDuration}/${slot.duration} Min`
  const isFull = totalTaskDuration >= slot.duration
  
  return (
    <div
      onClick={onClick}
      className={`
        bg-white dark:bg-gray-800 rounded-xl p-3 shadow-sm border-2 transition-all duration-200
        ${isHighlighted ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' : 'border-gray-200 dark:border-gray-700'}
        ${isSelectingSlot ? 'cursor-pointer active:scale-[0.98]' : 'cursor-pointer'}
        flex gap-2
      `}
    >
      <PersonColorBar person={slot.person} className="rounded-l-lg" />
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm text-gray-900 dark:text-white">
              {slot.startTime} - {slot.endTime}
            </span>
          </div>
          <span className="text-xs font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-2 py-0.5 rounded-full">
            {slot.person}
          </span>
        </div>
        
        <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
          {fillStatus}
        </div>
        
        {slot.tasks.length > 0 && (
          <div className="text-xs text-gray-600 dark:text-gray-300">
            {slot.tasks.length} Task{slot.tasks.length > 1 ? 's' : ''}
          </div>
        )}
        
        {slot.tasks.length === 0 && (
          <div className="text-xs text-gray-400 dark:text-gray-500">
            + Task zuweisen
          </div>
        )}
      </div>
    </div>
  )
}


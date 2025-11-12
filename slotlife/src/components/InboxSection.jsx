import TaskCard from './TaskCard'

export default function InboxSection({
  tasks,
  completedTasks,
  selectedTaskForSlot,
  onToggleComplete,
  onDeleteTask,
  onEditTask,
  onSelectTaskForSlot,
  onCancelSlotSelection,
}) {
  const allOpenTasks = [...tasks, ...completedTasks]
  const openCount = tasks.length

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        📥 Inbox ({openCount} offen)
      </h2>

      {selectedTaskForSlot && (
        <div className="mb-4 p-4 bg-blue-50 border-2 border-blue-300 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <div className="flex-1">
              <p className="text-sm font-medium text-blue-900 mb-1">
                Task auswählen: <strong>{selectedTaskForSlot.title}</strong>
              </p>
              <p className="text-xs text-blue-700">
                Tappe auf einen Slot, um den Task zuzuweisen
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

      {allOpenTasks.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          <p>Keine Tasks in der Inbox</p>
        </div>
      ) : (
        <div className="space-y-3">
          {allOpenTasks.map(task => (
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



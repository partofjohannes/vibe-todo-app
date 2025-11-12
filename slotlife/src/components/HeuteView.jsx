import SlotCard from './SlotCard'
import InboxSection from './InboxSection'
import QuickInput from './QuickInput'
import SlotTaskModal from './SlotTaskModal'
import { useState, useEffect } from 'react'

export default function HeuteView({
  dateString,
  slots,
  inboxTasks,
  completedTasks,
  selectedTaskForSlot,
  onToggleComplete,
  onDeleteTask,
  onEditTask,
  onAssignToSlot,
  onSelectTaskForSlot,
  onCancelSlotSelection,
  onAddTaskToSlot,
  onQuickSave,
  isActive = false,
  onAddTaskToSlotDirect,
}) {
  const [shouldAutoFocus, setShouldAutoFocus] = useState(false)
  const [selectedSlotForTask, setSelectedSlotForTask] = useState(null)

  useEffect(() => {
    // Auto-Focus beim Tab-Wechsel
    if (isActive) {
      const timer = setTimeout(() => {
        setShouldAutoFocus(true)
        setTimeout(() => setShouldAutoFocus(false), 200)
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [isActive])

  const handleSlotAddClick = (slotId) => {
    const slot = slots.find(s => s.id === slotId)
    if (slot) {
      setSelectedSlotForTask(slot)
    }
  }

  const handleAssignTaskToSlot = (task) => {
    if (selectedSlotForTask) {
      onAssignToSlot(selectedSlotForTask.id, task)
      setSelectedSlotForTask(null)
    }
  }

  const handleCreateNewForSlot = () => {
    if (selectedSlotForTask) {
      onAddTaskToSlotDirect(selectedSlotForTask.id)
      setSelectedSlotForTask(null)
    }
  }

  return (
    <div className="px-4 pt-4 pb-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        Heute - {dateString}
      </h1>

      {/* Quick-Input ganz oben */}
      <QuickInput onSave={onQuickSave} autoFocus={shouldAutoFocus} />

      {slots.length === 0 ? (
        <div className="text-center py-12 text-gray-400 mb-8 animate-fade-in">
          <div className="text-5xl mb-4">📅</div>
          <p className="text-lg font-medium mb-2">Keine Slots für heute</p>
          <p className="text-sm">Erstelle Tasks oder schaue in der Wochenansicht</p>
        </div>
      ) : (
        <div className="space-y-4 mb-8">
          {slots.map(slot => (
            <SlotCard
              key={slot.id}
              slot={slot}
              selectedTaskForSlot={selectedTaskForSlot}
              onToggleComplete={onToggleComplete}
              onDeleteTask={onDeleteTask}
              onEditTask={onEditTask}
              onAssignToSlot={(task) => onAssignToSlot(slot.id, task)}
              onAddTaskToSlot={() => handleSlotAddClick(slot.id)}
              isSelectingSlot={!!selectedTaskForSlot}
            />
          ))}
        </div>
      )}

      {inboxTasks.length > 0 && (
        <InboxSection
        tasks={inboxTasks}
        completedTasks={completedTasks}
        selectedTaskForSlot={selectedTaskForSlot}
        onToggleComplete={onToggleComplete}
        onDeleteTask={onDeleteTask}
        onEditTask={onEditTask}
        onSelectTaskForSlot={onSelectTaskForSlot}
        onCancelSlotSelection={onCancelSlotSelection}
      />
      )}

      {selectedSlotForTask && (
        <SlotTaskModal
          slot={selectedSlotForTask}
          inboxTasks={inboxTasks}
          onAssignTask={handleAssignTaskToSlot}
          onClose={() => setSelectedSlotForTask(null)}
          onCreateNew={handleCreateNewForSlot}
        />
      )}
    </div>
  )
}


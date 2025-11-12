import { useState } from 'react'
import WeekSlotCard from './WeekSlotCard'
import SlotDetailModal from './SlotDetailModal'
import { generateSlotsForWeek, formatSlotDate } from '../utils/slotGenerator'

export default function WocheView({
  allSlots,
  onToggleComplete,
  onDeleteTask,
  onEditTask,
  onAssignToSlot,
  onAddTaskToSlot,
  selectedTaskForSlot,
  onCancelSlotSelection,
}) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  // Start der Woche (Montag)
  const weekStart = new Date(today)
  const dayOfWeek = weekStart.getDay()
  const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek
  weekStart.setDate(today.getDate() + diff)
  
  const weekDays = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']
  const weekSlots = generateSlotsForWeek(weekStart)
  
  // Merge mit bestehenden Slots (Tasks zuweisen)
  const mergedSlots = weekSlots.map(weekSlot => {
    const existingSlot = allSlots.find(s => 
      s.date && weekSlot.date &&
      new Date(s.date).getTime() === new Date(weekSlot.date).getTime() &&
      s.person === weekSlot.person &&
      s.startTime === weekSlot.startTime
    )
    return existingSlot || weekSlot
  })
  
  const [selectedSlot, setSelectedSlot] = useState(null)
  
  // Gruppiere Slots nach Tag
  const slotsByDay = {}
  mergedSlots.forEach(slot => {
    const dayKey = slot.day || formatSlotDate(slot.date)
    if (!slotsByDay[dayKey]) {
      slotsByDay[dayKey] = []
    }
    slotsByDay[dayKey].push(slot)
  })
  
  const handleSlotClick = (slot) => {
    if (selectedTaskForSlot) {
      // Wenn Task zur Zuweisung ausgewählt, zuweisen
      console.log('🟡 WocheView: Assigning task to slot', slot.id, selectedTaskForSlot)
      onAssignToSlot(slot.id, selectedTaskForSlot)
    } else {
      // Sonst Details zeigen
      setSelectedSlot(slot)
    }
  }
  
  return (
    <div className="px-4 pt-4 pb-24 max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Woche
      </h1>
      
      <div className="space-y-6">
        {weekDays.map(day => {
          const daySlots = slotsByDay[day] || []
          if (daySlots.length === 0) return null
          
          return (
            <div key={day} className="mb-6">
              <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3 sticky top-0 bg-gray-50 dark:bg-gray-900 py-1 z-10">
                {day}
              </h2>
              <div className="space-y-3">
                {daySlots.map(slot => (
                  <WeekSlotCard
                    key={slot.id}
                    slot={slot}
                    onClick={() => handleSlotClick(slot)}
                    isSelectingSlot={!!selectedTaskForSlot}
                    isHighlighted={selectedTaskForSlot && selectedTaskForSlot.person === slot.person}
                  />
                ))}
              </div>
            </div>
          )
        })}
      </div>
      
      {selectedSlot && !selectedTaskForSlot && (
        <SlotDetailModal
          slot={selectedSlot}
          onClose={() => setSelectedSlot(null)}
          onToggleComplete={onToggleComplete}
          onDeleteTask={onDeleteTask}
          onEditTask={onEditTask}
          onAddTask={() => {
            onAddTaskToSlot(selectedSlot.id)
            setSelectedSlot(null)
          }}
        />
      )}
      
      {selectedTaskForSlot && (
        <div className="fixed bottom-20 left-4 right-4 max-w-md mx-auto p-4 bg-blue-50 border-2 border-blue-300 rounded-xl z-30">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-blue-900 mb-1">
                Task auswählen: <strong>{selectedTaskForSlot.title}</strong>
              </p>
              <p className="text-xs text-blue-700">
                Tappe auf einen Slot oben
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
    </div>
  )
}


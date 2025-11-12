import { useState, useMemo, useEffect } from 'react'
import HeuteView from './components/HeuteView'
import WocheView from './components/WocheView'
import InboxView from './components/InboxView'
import TabNavigation from './components/TabNavigation'
import TaskModal from './components/TaskModal'
import SettingsMenu from './components/SettingsMenu'
import EmilView from './components/EmilView'
import { getTodayDateString, getSlotsForToday } from './utils/dateUtils'
import { generateSlotsForWeek } from './utils/slotGenerator'
import { initNotifications, updateSlotsForNotification } from './utils/notifications'
import { populateRecurringTasks, checkWeeklyReset } from './utils/recurringTasks'
import { loadTasks, saveTasks } from './utils/storage'
import { isSetupComplete, completeSetup } from './utils/config'
import { initTheme } from './utils/theme'
import OnboardingScreen from './components/OnboardingScreen'

function App() {
  const [activeTab, setActiveTab] = useState('heute')
  const [showSettings, setShowSettings] = useState(false)
  const [setupComplete, setSetupComplete] = useState(() => isSetupComplete())
  const isEmilMode = localStorage.getItem('emilMode') === 'true'

  // Initialize theme
  useEffect(() => {
    initTheme()
  }, [])
  
  // Load tasks from localStorage on mount
  const [tasks, setTasks] = useState(() => {
    console.log('🚀 Initializing tasks from localStorage')
    return loadTasks()
  })

  // Generiere Wochen-Slots
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  const weekStart = new Date(today)
  const dayOfWeek = weekStart.getDay()
  const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek
  weekStart.setDate(today.getDate() + diff)
  
  const baseWeekSlots = useMemo(() => generateSlotsForWeek(weekStart), [weekStart])
  
  // Merge mit Tasks - initialisiere Slots mit Tasks
  const [allSlots, setAllSlots] = useState(() => {
    return baseWeekSlots.map(slot => {
      const slotTasks = tasks.filter(task => task.slotId === slot.id)
      return { ...slot, tasks: slotTasks }
    })
  })
  
  // Aktualisiere Slots wenn baseWeekSlots sich ändert
  useEffect(() => {
    setAllSlots(baseWeekSlots.map(slot => {
      const slotTasks = tasks.filter(task => task.slotId === slot.id)
      return { ...slot, tasks: slotTasks }
    }))
  }, [baseWeekSlots])

  // Populate recurring tasks on mount and when slots change
  useEffect(() => {
    checkWeeklyReset()
    
    const recurring = populateRecurringTasks(allSlots, tasks)
    if (recurring.length > 0) {
      recurring.forEach(task => {
        setTasks(prev => {
          // Prüfe ob Task schon existiert
          const exists = prev.some(t => 
            t.slotId === task.slotId &&
            t.title === task.title &&
            !t.completed &&
            t.isRecurring
          )
          return exists ? prev : [...prev, task]
        })
        
        setAllSlots(prev => prev.map(slot => {
          if (slot.id === task.slotId) {
            // Prüfe ob Task schon im Slot ist
            const taskExists = slot.tasks.some(t => t.id === task.id || (t.title === task.title && t.isRecurring))
            if (!taskExists) {
              return { ...slot, tasks: [...slot.tasks, task] }
            }
          }
          return slot
        }))
      })
    }
  }, [allSlots.length]) // Run when slots are initialized
  
  // Aktualisiere Tasks in Slots wenn tasks sich ändert
  // MERGE: Überschreibe nicht, sondern synchronisiere nur
  useEffect(() => {
    console.log('🟢 useEffect tasks changed. Tasks:', tasks.filter(t => t.slotId).map(t => ({ id: t.id, title: t.title, slotId: t.slotId })))
    
    // Save to localStorage
    saveTasks(tasks)
    
    setAllSlots(prevSlots => {
      const updated = prevSlots.map(slot => {
        // Hole alle Tasks die diesem Slot zugeordnet sind
        const tasksForSlot = tasks.filter(task => task.slotId === slot.id)
        console.log(`🟢 Slot ${slot.id}: tasks from state:`, tasksForSlot.map(t => ({ id: t.id, title: t.title })))
        return { ...slot, tasks: tasksForSlot }
      })
      console.log('🟢 Updated slots:', updated.map(s => ({ id: s.id, person: s.person, tasksCount: s.tasks.length })))
      return updated
    })
  }, [tasks])

  // Heute-Slots aus allSlots filtern
  const todaySlots = useMemo(() => {
    return allSlots.filter(slot => {
      if (!slot.date) return false
      const slotDate = new Date(slot.date)
      slotDate.setHours(0, 0, 0, 0)
      const todayDate = new Date(today)
      todayDate.setHours(0, 0, 0, 0)
      return slotDate.getTime() === todayDate.getTime()
    })
  }, [allSlots, today])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [selectedTaskForSlot, setSelectedTaskForSlot] = useState(null)

  const inboxTasks = tasks.filter(task => !task.slotId && !task.completed)
  const completedTasks = tasks.filter(task => task.completed && !task.slotId)

  const handleCreateTask = (taskData) => {
    const newTask = {
      id: Date.now().toString(),
      ...taskData,
      completed: false,
      slotId: taskData.slotId || null,
    }
    
    if (taskData.slotId) {
      // Task direkt in Slot
      setAllSlots(slots => slots.map(slot => 
        slot.id === taskData.slotId 
          ? { ...slot, tasks: [...slot.tasks, newTask] }
          : slot
      ))
    } else {
      // Task in Inbox
      setTasks([...tasks, newTask])
    }
  }

  const handleUpdateTask = (taskId, updates) => {
    // Update in tasks
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, ...updates } : task
    ))
    
    // Update in slots
    setAllSlots(slots => slots.map(slot => ({
      ...slot,
      tasks: slot.tasks.map(task => 
        task.id === taskId ? { ...task, ...updates } : task
      )
    })))
  }

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId))
    setAllSlots(slots => slots.map(slot => ({
      ...slot,
      tasks: slot.tasks.filter(task => task.id !== taskId)
    })))
  }

  const handleToggleComplete = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ))
    
    setAllSlots(slots => slots.map(slot => ({
      ...slot,
      tasks: slot.tasks.map(task => 
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    })))
  }

  const handleAssignToSlot = (slotId, task) => {
    console.log('🔵 handleAssignToSlot called:', { slotId, task, allSlotsLength: allSlots.length })
    
    // Task mit slotId aktualisieren (bleibt in tasks für Konsistenz)
    const updatedTask = { ...task, slotId }
    setTasks(tasks.map(t => t.id === task.id ? updatedTask : t))
    
    // Task zum Slot hinzufügen
    setAllSlots(prevSlots => {
      console.log('🔵 Updating slots. Current slots:', prevSlots.map(s => ({ id: s.id, person: s.person, tasksCount: s.tasks.length })))
      const updatedSlots = prevSlots.map(slot => {
        if (slot.id === slotId) {
          // Prüfe ob Task schon im Slot ist
          const taskExists = slot.tasks.some(t => t.id === task.id)
          if (!taskExists) {
            console.log('✅ Adding task to slot:', slotId, updatedTask)
            return { ...slot, tasks: [...slot.tasks, updatedTask] }
          } else {
            console.log('⚠️ Task already in slot')
            return slot
          }
        }
        return slot
      })
      console.log('🔵 Updated slots:', updatedSlots.map(s => ({ id: s.id, person: s.person, tasksCount: s.tasks.length })))
      return updatedSlots
    })
    
    setSelectedTaskForSlot(null)
  }

  const handleSelectTaskForSlot = (task) => {
    setSelectedTaskForSlot(task)
  }

  const handleCancelSlotSelection = () => {
    setSelectedTaskForSlot(null)
  }

  const handleEditTask = (task) => {
    setEditingTask(task)
    setIsModalOpen(true)
  }

  const handleSaveTask = (taskData) => {
    if (editingTask) {
      handleUpdateTask(editingTask.id, taskData)
      
      // Wenn slotId geändert wurde
      if (taskData.slotId !== editingTask.slotId) {
        // Aus altem Slot entfernen
        if (editingTask.slotId) {
          setAllSlots(slots => slots.map(slot => 
            slot.id === editingTask.slotId
              ? { ...slot, tasks: slot.tasks.filter(t => t.id !== editingTask.id) }
              : slot
          ))
        }
        
        // Zu neuem Slot hinzufügen oder Inbox
        if (taskData.slotId) {
          setAllSlots(slots => slots.map(slot => 
            slot.id === taskData.slotId
              ? { ...slot, tasks: [...slot.tasks, { ...editingTask, ...taskData }] }
              : slot
          ))
          setTasks(tasks.filter(t => t.id !== editingTask.id))
        } else {
          setTasks(tasks.map(t => 
            t.id === editingTask.id ? { ...t, ...taskData } : t
          ))
        }
      }
      
      setEditingTask(null)
    } else {
      handleCreateTask(taskData)
    }
    setIsModalOpen(false)
    setSelectedTaskForSlot(null)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingTask(null)
    setSelectedTaskForSlot(null)
  }

  // Alle Slots für Auto-Suggest (alle Slots der Woche)
  const allSlotsForSuggest = useMemo(() => allSlots, [allSlots])

  // Onboarding bei erstem Start
  if (!setupComplete) {
    return (
      <OnboardingScreen
        onComplete={(config) => {
          completeSetup(config)
          setSetupComplete(true)
        }}
      />
    )
  }

  // Emil-Mode: Zeige vereinfachte Ansicht
  if (isEmilMode) {
    return (
      <EmilView
        slots={todaySlots}
        tasks={tasks.filter(t => t.person === 'Emil' || (t.slotId && allSlots.find(s => s.id === t.slotId)?.person === 'Emil'))}
        onToggleComplete={handleToggleComplete}
        onDeleteTask={handleDeleteTask}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-24">
      {/* Settings Button */}
      <button
        onClick={() => setShowSettings(true)}
        className="fixed top-4 right-4 w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center text-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors z-30"
      >
        ⚙️
      </button>
      <div className={`
        transition-opacity duration-300
        ${activeTab === 'heute' ? 'block' : 'hidden'}
      `}>
        <HeuteView
          dateString={getTodayDateString()}
          slots={todaySlots}
          inboxTasks={inboxTasks}
          completedTasks={completedTasks}
          selectedTaskForSlot={selectedTaskForSlot}
          onToggleComplete={handleToggleComplete}
          onDeleteTask={handleDeleteTask}
          onEditTask={handleEditTask}
          onAssignToSlot={handleAssignToSlot}
          onSelectTaskForSlot={handleSelectTaskForSlot}
          onCancelSlotSelection={handleCancelSlotSelection}
          onAddTaskToSlot={(slotId) => {
            setSelectedTaskForSlot({ slotId })
            setIsModalOpen(true)
          }}
          onAddTaskToSlotDirect={(slotId) => {
            setSelectedTaskForSlot({ slotId })
            setIsModalOpen(true)
          }}
          onQuickSave={handleCreateTask}
          isActive={activeTab === 'heute'}
        />
      </div>

      <div className={`
        transition-opacity duration-300
        ${activeTab === 'woche' ? 'block' : 'hidden'}
      `}>
        <WocheView
          allSlots={allSlots}
          onToggleComplete={handleToggleComplete}
          onDeleteTask={handleDeleteTask}
          onEditTask={handleEditTask}
          onAssignToSlot={handleAssignToSlot}
          onAddTaskToSlot={(slotId) => {
            setSelectedTaskForSlot({ slotId })
            setIsModalOpen(true)
          }}
          selectedTaskForSlot={selectedTaskForSlot}
          onCancelSlotSelection={handleCancelSlotSelection}
        />
      </div>

      <div className={`
        transition-opacity duration-300
        ${activeTab === 'inbox' ? 'block' : 'hidden'}
      `}>
        <InboxView
          inboxTasks={inboxTasks}
          selectedTaskForSlot={selectedTaskForSlot}
          onToggleComplete={handleToggleComplete}
          onDeleteTask={handleDeleteTask}
          onEditTask={handleEditTask}
          onSelectTaskForSlot={handleSelectTaskForSlot}
          onCancelSlotSelection={handleCancelSlotSelection}
        />
      </div>
      
      <button
        onClick={() => {
          setEditingTask(null)
          setSelectedTaskForSlot(null)
          setIsModalOpen(true)
        }}
        className="fixed bottom-20 right-4 left-4 max-w-md mx-auto bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-500 text-white font-semibold py-4 px-6 rounded-xl shadow-lg active:scale-95 transition-transform duration-150 min-h-[44px] z-10"
      >
        + Task
      </button>

      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      {isModalOpen && (
        <TaskModal
          task={editingTask}
          onSave={handleSaveTask}
          onClose={handleCloseModal}
          preSelectedSlotId={selectedTaskForSlot?.slotId}
          allSlots={allSlotsForSuggest}
        />
      )}

      {showSettings && (
        <SettingsMenu
          onClose={() => setShowSettings(false)}
          allTasks={tasks}
          allSlots={allSlots}
        />
      )}
    </div>
  )
}

export default App

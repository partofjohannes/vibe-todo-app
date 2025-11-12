// LocalStorage Management für Tasks und Slots

const STORAGE_KEYS = {
  TASKS: 'slotlife_tasks',
  LAST_SAVE: 'slotlife_last_save',
}

// Dummy-Daten
const DUMMY_TASKS = [
  {
    id: '1',
    title: 'Retoure Amazon',
    duration: 15,
    person: 'Egal',
    completed: false,
    slotId: null,
  },
  {
    id: '2',
    title: 'Einkaufsliste schreiben',
    duration: 5,
    person: 'Marie',
    completed: false,
    slotId: null,
  },
  {
    id: '3',
    title: 'Steuererklärung vorbereiten',
    duration: 60,
    person: 'Johannes',
    completed: false,
    slotId: null,
  },
  {
    id: '4',
    title: 'Kita anrufen',
    duration: 15,
    person: 'Egal',
    completed: false,
    slotId: null,
  },
]

export function loadTasks() {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.TASKS)
    console.log('📦 Loading tasks from localStorage:', stored ? 'Found' : 'Empty')
    
    if (stored) {
      const tasks = JSON.parse(stored)
      console.log('📦 Loaded tasks:', tasks.length)
      return tasks
    }
    
    console.log('📦 Using dummy data')
    return DUMMY_TASKS
  } catch (error) {
    console.error('❌ Error loading tasks:', error)
    return DUMMY_TASKS
  }
}

export function saveTasks(tasks) {
  try {
    const json = JSON.stringify(tasks)
    localStorage.setItem(STORAGE_KEYS.TASKS, json)
    localStorage.setItem(STORAGE_KEYS.LAST_SAVE, new Date().toISOString())
    console.log('💾 Saved tasks:', tasks.length)
    return true
  } catch (error) {
    console.error('❌ Error saving tasks:', error)
    return false
  }
}

export function clearStorage() {
  try {
    localStorage.removeItem(STORAGE_KEYS.TASKS)
    localStorage.removeItem(STORAGE_KEYS.LAST_SAVE)
    console.log('🗑️ Storage cleared')
    return true
  } catch (error) {
    console.error('❌ Error clearing storage:', error)
    return false
  }
}

export function getLastSave() {
  try {
    const lastSave = localStorage.getItem(STORAGE_KEYS.LAST_SAVE)
    return lastSave ? new Date(lastSave) : null
  } catch (error) {
    return null
  }
}



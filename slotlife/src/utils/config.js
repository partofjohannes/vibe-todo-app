// App Configuration & Settings

const CONFIG_KEYS = {
  SETUP_COMPLETE: 'slotlife_setup_complete',
  PERSON_NAMES: 'slotlife_person_names',
  SLOT_TIMES: 'slotlife_slot_times',
  DARK_MODE: 'slotlife_dark_mode',
}

// Default Configuration
export const DEFAULT_CONFIG = {
  persons: ['Marie', 'Johannes', 'Emil'],
  slotTimes: {
    Marie: {
      weekday: { start: '19:00', end: '19:30', duration: 30 },
      saturday: { start: '10:00', end: '11:00', duration: 60 },
    },
    Johannes: {
      weekday: { start: '19:30', end: '20:00', duration: 30 },
      sunday: { start: '10:00', end: '11:00', duration: 60 },
    },
    Emil: {
      saturday: { start: '14:00', end: '14:20', duration: 20 },
    },
  },
}

export function isSetupComplete() {
  return localStorage.getItem(CONFIG_KEYS.SETUP_COMPLETE) === 'true'
}

export function completeSetup(config) {
  try {
    localStorage.setItem(CONFIG_KEYS.SETUP_COMPLETE, 'true')
    localStorage.setItem(CONFIG_KEYS.PERSON_NAMES, JSON.stringify(config.persons))
    localStorage.setItem(CONFIG_KEYS.SLOT_TIMES, JSON.stringify(config.slotTimes))
    console.log('✅ Setup completed:', config)
    return true
  } catch (error) {
    console.error('❌ Error saving setup:', error)
    return false
  }
}

export function getPersonNames() {
  try {
    const stored = localStorage.getItem(CONFIG_KEYS.PERSON_NAMES)
    return stored ? JSON.parse(stored) : DEFAULT_CONFIG.persons
  } catch (error) {
    return DEFAULT_CONFIG.persons
  }
}

export function getSlotTimes() {
  try {
    const stored = localStorage.getItem(CONFIG_KEYS.SLOT_TIMES)
    return stored ? JSON.parse(stored) : DEFAULT_CONFIG.slotTimes
  } catch (error) {
    return DEFAULT_CONFIG.slotTimes
  }
}

export function updatePersonNames(names) {
  try {
    localStorage.setItem(CONFIG_KEYS.PERSON_NAMES, JSON.stringify(names))
    return true
  } catch (error) {
    return false
  }
}

export function updateSlotTimes(times) {
  try {
    localStorage.setItem(CONFIG_KEYS.SLOT_TIMES, JSON.stringify(times))
    return true
  } catch (error) {
    return false
  }
}

export function isDarkMode() {
  try {
    const stored = localStorage.getItem(CONFIG_KEYS.DARK_MODE)
    if (stored !== null) {
      return stored === 'true'
    }
    // System preference detection
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  } catch (error) {
    return false
  }
}

export function setDarkMode(enabled) {
  try {
    localStorage.setItem(CONFIG_KEYS.DARK_MODE, enabled.toString())
    return true
  } catch (error) {
    return false
  }
}

export function resetAllSettings() {
  try {
    Object.values(CONFIG_KEYS).forEach(key => {
      localStorage.removeItem(key)
    })
    return true
  } catch (error) {
    return false
  }
}



// Notification System für Slot-Erinnerungen

let notificationCheckInterval = null

export function initNotifications() {
  if (!('Notification' in window)) {
    return
  }

  if (Notification.permission === 'granted') {
    startNotificationChecker()
  }
}

export function requestNotificationPermission() {
  if (!('Notification' in window)) {
    return Promise.resolve(false)
  }

  return Notification.requestPermission().then(permission => {
    if (permission === 'granted') {
      startNotificationChecker()
      return true
    }
    return false
  })
}

function startNotificationChecker() {
  if (notificationCheckInterval) {
    clearInterval(notificationCheckInterval)
  }

  // Prüfe alle Minute ob ein Slot in 10 Minuten startet
  notificationCheckInterval = setInterval(() => {
    checkUpcomingSlots()
  }, 60000) // Jede Minute

  // Initial check
  checkUpcomingSlots()
}

let allSlotsForNotification = []

export function updateSlotsForNotification(slots) {
  allSlotsForNotification = slots
  checkUpcomingSlots()
}

function checkUpcomingSlots() {
  const enabled = localStorage.getItem('notificationsEnabled') === 'true'
  if (!enabled || !('Notification' in window) || Notification.permission !== 'granted') {
    return
  }

  const now = new Date()
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  allSlotsForNotification.forEach(slot => {
    if (!slot.date || !slot.startTime) return
    
    const slotDate = new Date(slot.date)
    slotDate.setHours(0, 0, 0, 0)
    
    // Nur heutige Slots prüfen
    if (slotDate.getTime() !== today.getTime()) return
    
    const [hours, minutes] = slot.startTime.split(':').map(Number)
    const slotStart = new Date(slotDate)
    slotStart.setHours(hours, minutes, 0, 0)
    
    const diffMs = slotStart.getTime() - now.getTime()
    const diffMinutes = diffMs / (1000 * 60)
    
    // Wenn Slot in 8-12 Minuten startet, sende Notification
    if (diffMinutes >= 8 && diffMinutes <= 12) {
      const notificationKey = `slot-notif-${slot.id}-${slotStart.toISOString()}`
      const lastSent = localStorage.getItem(notificationKey)
      
      if (!lastSent || now.getTime() - parseInt(lastSent) > 5 * 60 * 1000) {
        const taskNames = slot.tasks.length > 0 
          ? slot.tasks.map(t => t.title).join(', ')
          : 'Keine Tasks'
        
        new Notification(`SlotLife: ${slot.person}'s Slot`, {
          body: `${slot.startTime} - ${slot.endTime}: ${taskNames}`,
          icon: '/vite.svg',
          tag: notificationKey,
          requireInteraction: false,
        })

        localStorage.setItem(notificationKey, now.getTime().toString())
      }
    }
  })
}

export function checkSlotForNotification(slot, allSlots) {
  const enabled = localStorage.getItem('notificationsEnabled') === 'true'
  if (!enabled || !slot.date || !slot.startTime) return

  const now = new Date()
  const slotDate = new Date(slot.date)
  const [hours, minutes] = slot.startTime.split(':').map(Number)
  slotDate.setHours(hours, minutes, 0, 0)

  const diffMs = slotDate.getTime() - now.getTime()
  const diffMinutes = diffMs / (1000 * 60)

  // Wenn Slot in 8-12 Minuten startet, sende Notification
  if (diffMinutes >= 8 && diffMinutes <= 12) {
    const notificationKey = `slot-notif-${slot.id}-${slotDate.toISOString()}`
    const lastSent = localStorage.getItem(notificationKey)

    if (!lastSent || now.getTime() - parseInt(lastSent) > 5 * 60 * 1000) {
      new Notification(`SlotLife: ${slot.person}`, {
        body: `${slot.startTime} - ${slot.endTime}: ${slot.person}'s Slot startet gleich!`,
        icon: '/vite.svg',
        tag: notificationKey,
      })

      localStorage.setItem(notificationKey, now.getTime().toString())
    }
  }
}

export function stopNotifications() {
  if (notificationCheckInterval) {
    clearInterval(notificationCheckInterval)
    notificationCheckInterval = null
  }
}


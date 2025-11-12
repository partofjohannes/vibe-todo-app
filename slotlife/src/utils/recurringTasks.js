// Recurring Tasks Auto-Population

export function populateRecurringTasks(allSlots, tasks) {
  const templates = JSON.parse(localStorage.getItem('recurringTasks') || '[]')
  if (templates.length === 0) return []

  const today = new Date()
  const dayOfWeek = today.getDay()
  const dayNames = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa']
  const todayName = dayNames[dayOfWeek]

  const newTasks = []

  templates.forEach(template => {
    if (template.day === todayName) {
      // Finde passenden Slot
      const slot = allSlots.find(s => {
        if (!s.date) return false
        const slotDate = new Date(s.date)
        slotDate.setHours(0, 0, 0, 0)
        const todayDate = new Date(today)
        todayDate.setHours(0, 0, 0, 0)
        
        const dateMatches = slotDate.getTime() === todayDate.getTime()
        const personMatches = s.person === template.person
        const timeMatches = s.startTime === template.time || 
                          Math.abs(parseInt(s.startTime.split(':')[0]) - parseInt(template.time.split(':')[0])) <= 1
        
        return dateMatches && personMatches && timeMatches
      })

      if (slot) {
        // Prüfe ob Task schon existiert (heute, gleicher Titel, gleicher Slot)
        const exists = tasks.some(t => 
          t.slotId === slot.id &&
          t.title === template.title &&
          !t.completed
        )

        if (!exists) {
          // Prüfe ob Platz im Slot
          const slotUsed = slot.tasks.reduce((sum, t) => sum + t.duration, 0)
          if (slotUsed + template.duration <= slot.duration) {
            newTasks.push({
              id: `recurring-${template.id}-${Date.now()}`,
              title: template.title,
              duration: template.duration,
              person: template.person,
              completed: false,
              slotId: slot.id,
              isRecurring: true,
            })
          }
        }
      }
    }
  })

  return newTasks
}

export function checkWeeklyReset() {
  const lastReset = localStorage.getItem('lastWeeklyReset')
  const today = new Date()
  const dayOfWeek = today.getDay()
  
  // Wenn Montag und noch nicht zurückgesetzt
  if (dayOfWeek === 1 && lastReset) {
    const lastResetDate = new Date(lastReset)
    const daysDiff = Math.floor((today.getTime() - lastResetDate.getTime()) / (1000 * 60 * 60 * 24))
    
    if (daysDiff >= 7) {
      // Neue Woche - alle Recurring Tasks werden beim nächsten Tag-Check wieder eingefügt
      localStorage.setItem('lastWeeklyReset', today.toISOString())
      return true
    }
  } else if (dayOfWeek === 1 && !lastReset) {
    localStorage.setItem('lastWeeklyReset', today.toISOString())
  }
  
  return false
}



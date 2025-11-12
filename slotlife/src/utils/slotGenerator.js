// Slot-Generierung basierend auf Regeln

export function generateSlotsForWeek(startDate) {
  const slots = []
  const weekDays = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa']
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(startDate)
    date.setDate(startDate.getDate() + i)
    const dayOfWeek = date.getDay()
    const dayName = weekDays[dayOfWeek]
    
    // MARIE: Mo-Fr: 19:00-19:30 (30 Min), Sa: 10:00-11:00 (60 Min)
    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      slots.push({
        id: `slot-marie-${i}`,
        person: 'Marie',
        day: dayName,
        dayIndex: i,
        date: new Date(date),
        startTime: '19:00',
        endTime: '19:30',
        duration: 30,
        tasks: []
      })
    } else if (dayOfWeek === 6) { // Samstag
      slots.push({
        id: `slot-marie-${i}`,
        person: 'Marie',
        day: dayName,
        dayIndex: i,
        date: new Date(date),
        startTime: '10:00',
        endTime: '11:00',
        duration: 60,
        tasks: []
      })
    }
    
    // JOHANNES: Mo-Fr: 19:30-20:00 (30 Min), So: 10:00-11:00 (60 Min)
    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      slots.push({
        id: `slot-johannes-${i}`,
        person: 'Johannes',
        day: dayName,
        dayIndex: i,
        date: new Date(date),
        startTime: '19:30',
        endTime: '20:00',
        duration: 30,
        tasks: []
      })
    } else if (dayOfWeek === 0) { // Sonntag
      slots.push({
        id: `slot-johannes-${i}`,
        person: 'Johannes',
        day: dayName,
        dayIndex: i,
        date: new Date(date),
        startTime: '10:00',
        endTime: '11:00',
        duration: 60,
        tasks: []
      })
    }
    
    // EMIL: Sa: 14:00-14:20 (20 Min)
    if (dayOfWeek === 6) { // Samstag
      slots.push({
        id: `slot-emil-${i}`,
        person: 'Emil',
        day: dayName,
        dayIndex: i,
        date: new Date(date),
        startTime: '14:00',
        endTime: '14:20',
        duration: 20,
        tasks: []
      })
    }
  }
  
  return slots
}

export function getSlotsForToday(weekSlots) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  return weekSlots.filter(slot => {
    const slotDate = new Date(slot.date)
    slotDate.setHours(0, 0, 0, 0)
    return slotDate.getTime() === today.getTime()
  })
}

export function formatSlotDate(date) {
  const days = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa']
  const day = days[date.getDay()]
  const dayNum = date.getDate()
  const month = date.getMonth() + 1
  return `${day} ${dayNum}.${month}`
}



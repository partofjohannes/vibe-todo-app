export function getTodayDateString() {
  const today = new Date()
  const days = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa']
  const months = [
    'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
    'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
  ]
  
  const dayName = days[today.getDay()]
  const day = today.getDate()
  const month = months[today.getMonth()]
  
  return `${dayName}, ${day}. ${month}`
}

export function getSlotsForToday(slots) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  return slots.filter(slot => {
    if (!slot.date) return false
    const slotDate = new Date(slot.date)
    slotDate.setHours(0, 0, 0, 0)
    return slotDate.getTime() === today.getTime()
  })
}


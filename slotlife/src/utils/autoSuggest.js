// Auto-Suggest: Finde passende Slots für einen Task

export function findMatchingSlots(task, allSlots) {
  const matches = []
  
  // Wenn Person "Egal" ist, suche in allen Slots
  // Sonst nur in Slots der Person
  const relevantSlots = task.person === 'Egal' 
    ? allSlots 
    : allSlots.filter(slot => slot.person === task.person)
  
  for (const slot of relevantSlots) {
    const usedDuration = slot.tasks.reduce((sum, t) => sum + t.duration, 0)
    const freeDuration = slot.duration - usedDuration
    
    // Passt der Task in den Slot?
    if (freeDuration >= task.duration) {
      matches.push({
        slot,
        freeDuration,
        matchScore: calculateMatchScore(task, slot, freeDuration)
      })
    }
  }
  
  // Sortiere nach Match-Score (besserer Match zuerst)
  matches.sort((a, b) => b.matchScore - a.matchScore)
  
  return matches
}

function calculateMatchScore(task, slot, freeDuration) {
  let score = 0
  
  // Person-Match ist wichtig
  if (task.person === slot.person && task.person !== 'Egal') {
    score += 100
  }
  
  // Exakte Passung ist besser
  if (freeDuration === task.duration) {
    score += 50
  }
  
  // Wenig Restzeit ist besser als viel
  const restTime = freeDuration - task.duration
  score += Math.max(0, 30 - restTime)
  
  // Heutige Slots bevorzugen
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const slotDate = new Date(slot.date)
  slotDate.setHours(0, 0, 0, 0)
  if (slotDate.getTime() === today.getTime()) {
    score += 20
  }
  
  return score
}

export function getBestMatch(task, allSlots) {
  const matches = findMatchingSlots(task, allSlots)
  return matches.length > 0 ? matches[0] : null
}

export function formatMatchSuggestion(match) {
  if (!match) return null
  
  const slot = match.slot
  const dateStr = formatSlotDate(slot.date)
  return {
    text: `Passt in: ${slot.day} ${slot.startTime} ${slot.person}`,
    slot: slot
  }
}

function formatSlotDate(date) {
  const days = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa']
  return days[date.getDay()]
}



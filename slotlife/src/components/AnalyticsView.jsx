export default function AnalyticsView({ onClose, allTasks, allSlots }) {
  // Berechne Stats für diese Woche
  const today = new Date()
  const weekStart = new Date(today)
  const dayOfWeek = weekStart.getDay()
  const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek
  weekStart.setDate(today.getDate() + diff)
  weekStart.setHours(0, 0, 0, 0)
  
  const weekEnd = new Date(weekStart)
  weekEnd.setDate(weekStart.getDate() + 7)

  // Filtere Tasks dieser Woche
  const weekTasks = allTasks.filter(task => {
    if (!task.slotId) return false
    const slot = allSlots.find(s => s.id === task.slotId)
    if (!slot || !slot.date) return false
    
    const slotDate = new Date(slot.date)
    slotDate.setHours(0, 0, 0, 0)
    return slotDate >= weekStart && slotDate < weekEnd
  })

  const stats = {
    Marie: { tasks: 0, hours: 0 },
    Johannes: { tasks: 0, hours: 0 },
    Emil: { tasks: 0, hours: 0 },
  }

  weekTasks.forEach(task => {
    if (stats[task.person]) {
      stats[task.person].tasks++
      stats[task.person].hours += task.duration / 60
    }
  })

  const totalTasks = Object.values(stats).reduce((sum, s) => sum + s.tasks, 0)
  const totalHours = Object.values(stats).reduce((sum, s) => sum + s.hours, 0)
  const avgTasks = totalTasks / 3
  const avgHours = totalHours / 3

  const isFair = () => {
    const deviations = Object.values(stats).map(s => 
      Math.abs(s.tasks - avgTasks) + Math.abs(s.hours - avgHours)
    )
    return deviations.reduce((sum, d) => sum + d, 0) / deviations.length < 2
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
      <div className="bg-white w-full rounded-t-3xl p-6 max-w-md mx-auto max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">📊 Diese Woche</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl w-10 h-10 flex items-center justify-center"
          >
            ×
          </button>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-gray-900">Gesamt</span>
              <span className="text-sm text-gray-600">
                {totalTasks} Tasks • {totalHours.toFixed(1)} Std
              </span>
            </div>
            <div className="text-xs text-gray-500">
              Ø {avgTasks.toFixed(1)} Tasks / Person
            </div>
          </div>

          {['Marie', 'Johannes', 'Emil'].map(person => {
            const personStats = stats[person]
            const taskPercent = totalTasks > 0 ? (personStats.tasks / totalTasks) * 100 : 0
            const hourPercent = totalHours > 0 ? (personStats.hours / totalHours) * 100 : 0

            return (
              <div key={person} className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="font-semibold text-gray-900">{person}</div>
                    <div className="text-sm text-gray-500">
                      {personStats.tasks} Tasks • {personStats.hours.toFixed(1)} Std
                    </div>
                  </div>
                  {personStats.tasks >= avgTasks && (
                    <span className="text-green-600 font-semibold">✓</span>
                  )}
                </div>
                
                <div className="space-y-1">
                  <div className="text-xs text-gray-600 mb-1">Tasks-Verteilung:</div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all"
                      style={{ width: `${taskPercent}%` }}
                    />
                  </div>
                </div>
              </div>
            )
          })}

          <div className="p-4 bg-gray-100 rounded-xl border-2 border-gray-300">
            <div className="flex items-center justify-center gap-2">
              <span className="text-2xl">⚖️</span>
              <div>
                <div className="font-semibold text-gray-900">
                  {isFair() ? 'Fair verteilt!' : 'Ungleich verteilt'}
                </div>
                <div className="text-xs text-gray-500">
                  {isFair() 
                    ? 'Die Aufgaben sind ausgewogen' 
                    : 'Versuche die Aufgaben gleichmäßiger zu verteilen'
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}



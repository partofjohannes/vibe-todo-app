import { useState } from 'react'

export default function EmilView({ slots, tasks, onToggleComplete, onDeleteTask }) {
  const [showSticker, setShowSticker] = useState(false)

  const handleComplete = (taskId) => {
    onToggleComplete(taskId)
    setShowSticker(true)
    setTimeout(() => setShowSticker(false), 2000)
  }

  const emilTasks = tasks.filter(t => 
    !t.completed && 
    (t.person === 'Emil' || slots.find(s => s.id === t.slotId)?.person === 'Emil')
  )

  const completedTasks = tasks.filter(t => 
    t.completed && 
    (t.person === 'Emil' || slots.find(s => s.id === t.slotId)?.person === 'Emil')
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 pb-24">
      <div className="px-4 pt-8 pb-6 max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">👋</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Hallo Emil!
          </h1>
          <p className="text-lg text-gray-600">
            Deine Aufgaben heute
          </p>
        </div>

        {emilTasks.length === 0 && completedTasks.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎉</div>
            <p className="text-xl font-semibold text-gray-700 mb-2">
              Super!
            </p>
            <p className="text-gray-500">
              Du hast heute keine Aufgaben!
            </p>
          </div>
        ) : (
          <>
            {emilTasks.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Zu erledigen:
                </h2>
                <div className="space-y-3">
                  {emilTasks.map(task => (
                    <button
                      key={task.id}
                      onClick={() => handleComplete(task.id)}
                      className="w-full p-6 bg-white rounded-2xl shadow-lg border-4 border-yellow-400 active:scale-95 transition-transform"
                    >
                      <div className="text-2xl font-bold text-gray-900 mb-2">
                        {task.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            {task.duration} Minuten
                          </div>
                          <div className="mt-4 text-4xl">✨</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {completedTasks.length > 0 && (
                  <div className="mb-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">
                      Erledigt! 🎉
                    </h2>
                    <div className="space-y-3">
                      {completedTasks.map(task => (
                        <div
                          key={task.id}
                          className="w-full p-6 bg-green-100 rounded-2xl border-4 border-green-400 opacity-60"
                        >
                          <div className="text-xl font-bold text-gray-700 line-through mb-1">
                            {task.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            ✓ Fertig!
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

        {showSticker && (
          <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
            <div className="text-8xl animate-bounce">
              🎉
            </div>
          </div>
        )}
      </div>

      {/* Back Button */}
      <button
        onClick={() => {
          localStorage.setItem('emilMode', 'false')
          window.location.reload()
        }}
        className="fixed top-4 left-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-xl hover:bg-gray-50 transition-colors z-30"
      >
        ←
      </button>
    </div>
  )
}


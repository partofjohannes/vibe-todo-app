import { useState } from 'react'
import RecurringTasksModal from './RecurringTasksModal'
import AnalyticsView from './AnalyticsView'
import PersonSettingsModal from './PersonSettingsModal'
import { toggleDarkMode, isDarkModeEnabled } from '../utils/theme'

export default function SettingsMenu({ 
  onClose,
  allTasks,
  allSlots,
}) {
  const [showRecurring, setShowRecurring] = useState(false)
  const [showAnalytics, setShowAnalytics] = useState(false)
  const [showPersonSettings, setShowPersonSettings] = useState(false)
  const [darkMode, setDarkMode] = useState(() => isDarkModeEnabled())

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose} />
      <div className="fixed inset-0 md:inset-auto md:bottom-0 md:left-0 md:right-0 bg-white dark:bg-gray-800 md:rounded-t-3xl p-6 max-w-md mx-auto z-50 overflow-y-auto">
        <div className="flex items-center justify-between mb-6 sticky top-0 bg-white dark:bg-gray-800 pb-2 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">⚙️ Einstellungen</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 active:text-gray-800 text-3xl w-12 h-12 flex items-center justify-center -mr-2 min-w-[48px] min-h-[48px]"
            aria-label="Schließen"
          >
            ×
          </button>
        </div>

        <div className="space-y-3 pb-6">
          <button
            onClick={() => setShowPersonSettings(true)}
            className="w-full p-4 bg-gray-50 dark:bg-gray-700 rounded-xl text-left hover:bg-gray-100 dark:hover:bg-gray-600 active:bg-gray-200 dark:active:bg-gray-500 transition-colors min-h-[72px]"
          >
            <div className="font-semibold text-gray-900 dark:text-white mb-1">
              👥 Namen ändern
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Familienmitglieder umbenennen
            </div>
          </button>

          <button
            onClick={() => {
              const newMode = toggleDarkMode()
              setDarkMode(newMode)
            }}
            className="w-full p-4 bg-gray-50 dark:bg-gray-700 rounded-xl text-left hover:bg-gray-100 dark:hover:bg-gray-600 active:bg-gray-200 dark:active:bg-gray-500 transition-colors min-h-[72px]"
          >
            <div className="font-semibold text-gray-900 dark:text-white mb-1">
              {darkMode ? '☀️' : '🌙'} {darkMode ? 'Light Mode' : 'Dark Mode'}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {darkMode ? 'Hell anzeigen' : 'Dunkel anzeigen'}
            </div>
          </button>

          <button
            onClick={() => setShowRecurring(true)}
            className="w-full p-4 bg-gray-50 dark:bg-gray-700 rounded-xl text-left hover:bg-gray-100 dark:hover:bg-gray-600 active:bg-gray-200 dark:active:bg-gray-500 transition-colors min-h-[72px]"
          >
            <div className="font-semibold text-gray-900 dark:text-white mb-1">
              🔁 Wiederkehrende Aufgaben
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Templates für wöchentliche Routinen
            </div>
          </button>

          <button
            onClick={() => setShowAnalytics(true)}
            className="w-full p-4 bg-gray-50 dark:bg-gray-700 rounded-xl text-left hover:bg-gray-100 dark:hover:bg-gray-600 active:bg-gray-200 dark:active:bg-gray-500 transition-colors min-h-[72px]"
          >
            <div className="font-semibold text-gray-900 dark:text-white mb-1">
              📊 Diese Woche
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Übersicht & Fairness
            </div>
          </button>

          <button
            onClick={() => {
              // Emil-Mode toggle
              const current = localStorage.getItem('emilMode') === 'true'
              localStorage.setItem('emilMode', (!current).toString())
              window.location.reload()
            }}
            className="w-full p-4 bg-gray-50 dark:bg-gray-700 rounded-xl text-left hover:bg-gray-100 dark:hover:bg-gray-600 active:bg-gray-200 dark:active:bg-gray-500 transition-colors min-h-[72px]"
          >
            <div className="font-semibold text-gray-900 dark:text-white mb-1">
              🎨 Emil-Ansicht
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {localStorage.getItem('emilMode') === 'true' ? 'Aktiviert' : 'Deaktiviert'}
            </div>
          </button>

          <button
            onClick={async () => {
              if (!('Notification' in window)) {
                alert('Benachrichtigungen werden von Ihrem Browser nicht unterstützt.')
                return
              }
              
              try {
                let permission = Notification.permission
                
                if (permission === 'default') {
                  permission = await Notification.requestPermission()
                }
                
                if (permission === 'granted') {
                  const current = localStorage.getItem('notificationsEnabled') === 'true'
                  localStorage.setItem('notificationsEnabled', (!current).toString())
                  alert(`Benachrichtigungen ${!current ? 'aktiviert ✓' : 'deaktiviert'}`)
                  
                  if (!current) {
                    // Test-Notification
                    new Notification('SlotLife', {
                      body: 'Benachrichtigungen sind jetzt aktiviert!',
                      icon: '/vite.svg',
                    })
                  }
                } else if (permission === 'denied') {
                  alert('Berechtigung wurde verweigert. Bitte in den Browser-Einstellungen aktivieren.')
                }
              } catch (error) {
                console.error('Notification error:', error)
                alert('Fehler beim Aktivieren der Benachrichtigungen.')
              }
            }}
            className="w-full p-4 bg-gray-50 rounded-xl text-left hover:bg-gray-100 active:bg-gray-200 transition-colors min-h-[72px]"
          >
            <div className="font-semibold text-gray-900 dark:text-white mb-1">
              🔔 Erinnerungen
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {typeof Notification !== 'undefined' && localStorage.getItem('notificationsEnabled') === 'true' && Notification.permission === 'granted'
                ? '10 Min vorher (aktiviert)'
                : typeof Notification !== 'undefined' && Notification.permission === 'denied'
                ? 'Berechtigung fehlt'
                : 'Nicht aktiviert'}
            </div>
          </button>
          
          <button
            onClick={() => {
              if (confirm('Alle Daten löschen und App zurücksetzen?')) {
                localStorage.clear()
                window.location.reload()
              }
            }}
            className="w-full p-4 bg-red-50 dark:bg-red-900/30 rounded-xl text-left hover:bg-red-100 dark:hover:bg-red-900/50 active:bg-red-200 dark:active:bg-red-900/70 transition-colors min-h-[72px] border-2 border-red-200 dark:border-red-800"
          >
            <div className="font-semibold text-red-700 dark:text-red-400 mb-1">
              🗑️ Daten löschen
            </div>
            <div className="text-sm text-red-600 dark:text-red-500">
              Alle Tasks und Einstellungen zurücksetzen
            </div>
          </button>
        </div>
      </div>

      {showRecurring && (
        <RecurringTasksModal
          onClose={() => setShowRecurring(false)}
        />
      )}

      {showAnalytics && (
        <AnalyticsView
          onClose={() => setShowAnalytics(false)}
          allTasks={allTasks}
          allSlots={allSlots}
        />
      )}

      {showPersonSettings && (
        <PersonSettingsModal
          onClose={() => setShowPersonSettings(false)}
          onSave={() => setShowPersonSettings(false)}
        />
      )}
    </>
  )
}


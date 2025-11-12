export default function TabNavigation({ activeTab, onTabChange }) {
  const tabs = [
    { id: 'heute', label: 'Heute', icon: '📅' },
    { id: 'woche', label: 'Woche', icon: '📆' },
    { id: 'inbox', label: 'Inbox', icon: '📥' },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 z-20 pb-safe">
      <div className="flex max-w-md mx-auto">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              flex-1 flex flex-col items-center justify-center py-2 px-3 min-h-[56px]
              transition-colors duration-200
              ${activeTab === tab.id
                ? 'text-blue-500 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }
            `}
          >
            <span className="text-xl mb-0.5">{tab.icon}</span>
            <span className="text-xs font-medium">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}


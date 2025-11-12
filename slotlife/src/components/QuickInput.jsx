import { useState, useRef, useEffect } from 'react'

export default function QuickInput({ onSave, autoFocus = false }) {
  const [input, setInput] = useState('')
  const [saved, setSaved] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      // Kleine Verzögerung für bessere Kompatibilität
      const timer = setTimeout(() => {
        inputRef.current?.focus()
      }, 150)
      return () => clearTimeout(timer)
    }
  }, [autoFocus])

  useEffect(() => {
    if (saved) {
      const timer = setTimeout(() => setSaved(false), 500)
      return () => clearTimeout(timer)
    }
  }, [saved])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input.trim()) {
      onSave({
        title: input.trim(),
        duration: 15,
        person: 'Egal',
        slotId: null,
      })
      setInput('')
      setSaved(true)
      // Focus bleibt im Feld
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus()
        }
      }, 10)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <div className="relative mb-4">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Was steht an? (Enter zum Speichern)"
            className={`
              w-full px-4 py-4 text-base rounded-xl border-2 transition-all duration-200
              focus:outline-none focus:ring-0 min-h-[56px]
              dark:text-white
              ${saved 
                ? 'border-green-400 bg-green-50 dark:bg-green-900/30' 
                : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 focus:border-blue-400 focus:bg-blue-50 dark:focus:bg-blue-900/30'
              }
            `}
          />
          
          {/* Visuelles Feedback - Grüner Blitz */}
          {saved && (
            <div className="absolute inset-0 bg-green-400 bg-opacity-20 rounded-xl animate-pulse pointer-events-none" />
          )}
          
          <button
            type="submit"
            disabled={!input.trim()}
            className={`
              absolute right-2 top-1/2 -translate-y-1/2
              px-4 py-2 rounded-lg font-semibold text-white
              transition-all duration-150 min-h-[44px] min-w-[44px]
              active:scale-95
              ${input.trim()
                ? 'bg-blue-500 hover:bg-blue-600 shadow-md'
                : 'bg-gray-300 cursor-not-allowed'
              }
            `}
            aria-label="Speichern"
          >
            +
          </button>
        </div>
      </form>
    </div>
  )
}


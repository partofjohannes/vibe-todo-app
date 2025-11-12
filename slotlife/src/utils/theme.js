// Dark Mode Theme System

export function initTheme() {
  const darkMode = localStorage.getItem('slotlife_dark_mode')
  
  if (darkMode === 'true') {
    document.documentElement.classList.add('dark')
  } else if (darkMode === 'false') {
    document.documentElement.classList.remove('dark')
  } else {
    // System preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark')
    }
  }
}

export function toggleDarkMode() {
  const isDark = document.documentElement.classList.contains('dark')
  
  if (isDark) {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('slotlife_dark_mode', 'false')
  } else {
    document.documentElement.classList.add('dark')
    localStorage.setItem('slotlife_dark_mode', 'true')
  }
  
  return !isDark
}

export function isDarkModeEnabled() {
  return document.documentElement.classList.contains('dark')
}



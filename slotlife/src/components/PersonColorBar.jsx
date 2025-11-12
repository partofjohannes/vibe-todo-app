// Visueller Person-Code als farbiger Streifen

export function getPersonColor(person) {
  switch (person) {
    case 'Marie':
      return 'bg-green-500'
    case 'Johannes':
      return 'bg-blue-500'
    case 'Emil':
      return 'bg-yellow-500'
    case 'Egal':
    default:
      return 'bg-gray-400'
  }
}

export default function PersonColorBar({ person, className = '' }) {
  return (
    <div className={`w-1 h-full ${getPersonColor(person)} ${className}`} />
  )
}



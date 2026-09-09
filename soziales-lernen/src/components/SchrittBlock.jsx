// Ein einzelner Schritt im Ablauf. Der Typ entscheidet, wie er aussieht —
// Sprechtexte müssen auf einen Blick als "das lese ich vor" erkennbar sein.

function Sprechtext({ text, zusatz, optional, gross }) {
  return (
    <div className="animate-einblenden">
      <div
        className={`relative rounded-2xl border-l-4 border-moos-400 bg-white px-5 shadow-sm ${
          gross ? 'py-6' : 'py-4'
        }`}
      >
        <div className="mb-1 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-moos-600">
          <span aria-hidden="true">💬</span>
          <span>Vorlesen</span>
          {optional && (
            <span className="rounded-full bg-sand-100 px-2 py-0.5 text-[10px] font-medium normal-case tracking-normal text-ink-500">
              optional
            </span>
          )}
        </div>
        <p
          className={`sprechtext text-ink-900 ${
            gross ? 'text-2xl leading-relaxed md:text-3xl' : 'text-lg leading-relaxed'
          }`}
        >
          „{text}“
        </p>
        {zusatz && (
          <p className={`mt-2 text-ink-500 ${gross ? 'text-base' : 'text-sm'}`}>({zusatz})</p>
        )}
      </div>
    </div>
  )
}

function Anweisung({ text, gross }) {
  return (
    <p className={`text-ink-700 ${gross ? 'text-xl leading-relaxed' : 'text-base leading-relaxed'}`}>
      {text}
    </p>
  )
}

function Hinweis({ text, gross }) {
  return (
    <div className="flex gap-3 rounded-xl bg-sand-100 px-4 py-3">
      <span aria-hidden="true" className="text-ink-500">
        ℹ️
      </span>
      <p className={`text-ink-700 ${gross ? 'text-lg leading-relaxed' : 'text-sm leading-relaxed'}`}>
        {text}
      </p>
    </div>
  )
}

function Wichtig({ text, gross }) {
  return (
    <div className="flex gap-3 rounded-xl border border-mohn-200 bg-mohn-50 px-4 py-3">
      <span aria-hidden="true">⚠️</span>
      <p
        className={`font-medium text-mohn-700 ${
          gross ? 'text-lg leading-relaxed' : 'text-sm leading-relaxed'
        }`}
      >
        {text}
      </p>
    </div>
  )
}

function Karten({ text, items, gross }) {
  return (
    <div>
      {text && (
        <p className={`mb-3 text-ink-700 ${gross ? 'text-xl' : 'text-base'}`}>{text}</p>
      )}
      <div className="flex flex-wrap gap-2">
        {items.map((wort) => (
          <span
            key={wort}
            className={`sprechtext rounded-2xl bg-moos-600 px-5 text-white shadow-sm ${
              gross ? 'py-3 text-3xl md:text-4xl' : 'py-2 text-lg'
            }`}
          >
            {wort}
          </span>
        ))}
      </div>
    </div>
  )
}

function Liste({ text, items, gross }) {
  return (
    <div>
      {text && <p className={`mb-2 text-ink-700 ${gross ? 'text-xl' : 'text-base'}`}>{text}</p>}
      <ul className="space-y-2">
        {items.map((eintrag, i) => (
          <li
            key={i}
            className={`flex gap-3 rounded-xl bg-white px-4 py-3 shadow-sm ${
              gross ? 'text-lg' : 'text-sm'
            }`}
          >
            <span className="font-semibold text-moos-600">{i + 1}</span>
            <span className="text-ink-700">{eintrag}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Besonders({ schritt, gross, label, icon }) {
  return (
    <div className="rounded-2xl border-2 border-dashed border-moos-400 bg-moos-50 px-5 py-4">
      <div className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-moos-800">
        <span aria-hidden="true">{icon}</span>
        <span>{label}</span>
      </div>
      <p className={`text-ink-700 ${gross ? 'text-lg' : 'text-sm'}`}>{schritt.text}</p>
      {schritt.spruch && (
        <p
          className={`sprechtext mt-3 text-ink-900 ${
            gross ? 'text-2xl leading-relaxed md:text-3xl' : 'text-lg leading-relaxed'
          }`}
        >
          „{schritt.spruch}“
        </p>
      )}
      {schritt.nachsatz && (
        <p className={`mt-3 text-ink-500 ${gross ? 'text-base' : 'text-sm'}`}>{schritt.nachsatz}</p>
      )}
    </div>
  )
}

export default function SchrittBlock({ schritt, gross = false }) {
  switch (schritt.typ) {
    case 'sprechtext':
      return (
        <Sprechtext
          text={schritt.text}
          zusatz={schritt.zusatz}
          optional={schritt.optional}
          gross={gross}
        />
      )
    case 'hinweis':
      return <Hinweis text={schritt.text} gross={gross} />
    case 'wichtig':
      return <Wichtig text={schritt.text} gross={gross} />
    case 'karten':
      return <Karten text={schritt.text} items={schritt.items} gross={gross} />
    case 'liste':
      return <Liste text={schritt.text} items={schritt.items} gross={gross} />
    case 'landung':
      return <Besonders schritt={schritt} gross={gross} label="Landung" icon="🕊️" />
    case 'echo':
      return <Besonders schritt={schritt} gross={gross} label="Kinder-Echo" icon="🔄" />
    case 'anweisung':
    default:
      return <Anweisung text={schritt.text} gross={gross} />
  }
}

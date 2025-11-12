# SlotLife - Familien Task Manager

Ein mobiler, familienfreundlicher Task-Manager mit Time-Boxing für React + Vite.

## ✨ Features

### 📅 Heute-View
- **Quick-Input**: Sofort Tasks erstellen (Enter zum Speichern)
- **Zeit-Slots**: Zeigt heutige Slots mit zugewiesenen Tasks
- **Restzeit-Anzeige**: "Noch X Min frei" mit [+] Button
- **Inbox**: Ungeplante Tasks unterhalb der Slots

### 📆 Wochenansicht
- **Automatische Slot-Generierung**: 
  - Marie: Mo-Fr 19:00-19:30, Sa 10:00-11:00
  - Johannes: Mo-Fr 19:30-20:00, So 10:00-11:00
  - Emil: Sa 14:00-14:20
- **Fill-Status**: "X/Y Min belegt"
- **Detail-Modal**: Tap Slot für Details & Tasks

### 📥 Inbox-View
- **Sortierung**: Nach Person, dann Zeit
- **Filter**: [Alle] [Marie] [Johannes] [Emil]
- **Quick-Actions**: Zuweisen, Abhaken, Löschen

### 🔁 Wiederkehrende Tasks
- **Templates**: Wöchentliche Routinen definieren
- **Auto-Population**: Werden automatisch in Slots eingefügt
- **Kennzeichnung**: 🔄 Icon bei Recurring Tasks
- **Wöchentliches Reset**: Jeden Montag neue Woche

### 🤖 Auto-Suggest
- **Smart-Matching**: Analysiert Person, Zeit & freie Slots
- **Vorschlag**: "Passt in: Do 19:00 Marie"
- **Annehmen/Ablehnen**: User entscheidet

### 🔔 Erinnerungen
- **10 Min vorher**: Browser-Notification vor Slot-Start
- **Opt-in**: Nur wenn User Berechtigung erteilt

### 📊 Analytics
- **Diese Woche**: Übersicht Tasks & Stunden pro Person
- **Fairness-Check**: ⚖️ Indikator für ausgewogene Verteilung

### 🎨 Emil-Mode
- **Vereinfachte Ansicht**: Große, bunte Buttons
- **Nur Emil's Tasks**: Fokussierte Darstellung
- **Sticker-Feedback**: 🎉 bei Task-Erledigung

### 💾 Persistenz
- **LocalStorage**: Tasks bleiben nach Reload erhalten
- **Auto-Save**: Änderungen werden sofort gespeichert
- **Daten-Reset**: Option in Settings

### 🎨 Design
- **Mobile-First**: Optimiert für Smartphone
- **Person-Codes**: Farbige Streifen (Grün/Blau/Gelb/Grau)
- **Smooth Animations**: fadeIn, slideIn, pulse
- **Touch-Optimiert**: Min 44px Touch-Targets
- **Empty States**: Hilfreiche Texte mit Emojis

## 🚀 Setup

1. Dependencies installieren:
```bash
npm install
```

2. Development Server starten:
```bash
npm run dev
```

3. Im Browser öffnen (normalerweise http://localhost:5173)

## 📦 Build

```bash
npm run build
```

## 🛠 Technologie-Stack

- **React 18**: UI Framework
- **Vite**: Build Tool & Dev Server
- **Tailwind CSS**: Styling
- **LocalStorage**: Persistenz
- **Notifications API**: Erinnerungen

## 📱 Mobile-Optimierungen

- Fullscreen Settings-Modal auf Mobile
- Safe Area Support (iPhone)
- Große Touch-Targets (min 44px)
- Scroll-fähige Modals
- Ein-Hand-bedienbar

## 🐛 Fixed Bugs

### LocalStorage
- ✅ Tasks gehen nicht mehr bei Reload verloren
- ✅ Dummy-Daten nur beim ersten Start
- ✅ Auto-Save bei State-Changes

### Settings-Modal
- ✅ Mobile-optimiert (Fullscreen)
- ✅ Touch-optimierte Buttons (min 72px)
- ✅ Scroll-fähig
- ✅ Close-Button gut erreichbar

### Recurring Tasks
- ✅ 🔄 Icon zur Kennzeichnung
- ✅ Sichtbar in allen Views
- ✅ Abhaken funktioniert

## 📝 Usage

### Quick-Capture
1. Tippe auf Heute-View
2. Input-Feld ist auto-fokussiert
3. Task-Name eingeben, Enter drücken
4. Task landet in Inbox (15 Min, Egal)

### Task zuweisen
1. Task in Inbox antippen → "In Slot"
2. Slot in Woche oder Heute antippen
3. Task wird zugewiesen

### Recurring Tasks
1. Settings → Wiederkehrende Aufgaben
2. Template erstellen (Tag, Zeit, Person, Dauer)
3. Werden automatisch eingefügt

### Analytics
1. Settings → Diese Woche
2. Übersicht Tasks & Stunden
3. Fairness-Check

## 🎯 Production-Ready

- ✅ Build erfolgreich
- ✅ Keine Linter-Errors
- ✅ LocalStorage funktioniert
- ✅ Mobile-optimiert
- ✅ Alle Features implementiert

## 👥 Familie

- **Marie**: Grüner Streifen
- **Johannes**: Blauer Streifen
- **Emil**: Gelber Streifen
- **Egal**: Grauer Streifen

---

Made with ❤️ for busy families

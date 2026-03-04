import { useState } from 'react'
import Button from './components/Button'
import './App.css'

function App() {
  const [dark, setDark] = useState(false)

  const toggleDark = () => {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
  }

  return (
    <div className="min-h-screen transition-colors duration-300 bg-white dark:bg-primary-1">
      <Button label="Toggle Dark" color="gray-100" onClick={toggleDark} />
    </div>
  )
}

export default App

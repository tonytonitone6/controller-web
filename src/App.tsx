import { useState } from 'react'
import './App.css'

function App() {
  const [dark, setDark] = useState(false)

  return (
    <div className={`min-h-screen transition-colors duration-300 ${dark ? 'bg-primary-1' : 'bg-white'}`}>
      <button
        onClick={() => setDark(prev => !prev)}
        className="m-4 px-4 py-2 rounded bg-gray-200 text-black"
      >
        {dark ? 'Light mode' : 'Dark mode'}
      </button>
    </div>
  )
}

export default App

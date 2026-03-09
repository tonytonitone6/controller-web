// import { useState } from 'react'
import Label from '@component/Label/Label';
// import { Icon } from '@component/Icon';
import './App.css';

function App() {
  // const [dark, setDark] = useState(false)

  // const toggleDark = () => {
  //   const next = !dark
  //   setDark(next)
  //   document.documentElement.classList.toggle('dark', next)
  // }

  return (
    <div className="min-h-screen transition-colors duration-300 bg-white dark:bg-primary-1">
      <Label colorScheme="outline">Label</Label>
    </div>
  );
}

export default App;

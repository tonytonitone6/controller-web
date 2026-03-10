import { useState } from 'react'
// import Label from '@/components/Label/Label';
import { Icon } from '@/components/Icon';
import Button from '@/components/Button/Button';
import Tab from '@/components/Tab/Tab';
import './App.css';

function App() {
  const [dark, setDark] = useState(false)

  // const toggleDark = () => {
  //   const next = !dark
  //   setDark(next)
  //   document.documentElement.classList.toggle('dark', next)
  // }

  return (
    <div className="min-h-screen transition-colors duration-300 bg-white dark:bg-primary-1">
      {/* <Label colorScheme="outline">Label</Label> */}
      {/* <Button variant="primary" size='md'>
        Button
      </Button>
      <Button variant="secondary" size='md'>Button</Button>
      <Button variant="destructive" size='md' disabled>
        Button
      </Button> */}
      <Tab variant="focus">Tab</Tab>
    </div>
  );
}

export default App;

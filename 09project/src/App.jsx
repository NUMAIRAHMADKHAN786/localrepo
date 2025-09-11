import { useEffect, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Card from './component/card';
import Theme from './component/Theme';
import { ThemeProvider } from './Context/theme';
function App() {
  // const [count, setCount] = useState(0)
const [themeMode, setThemeMode] = useState("light");
const darkTheme = () => setThemeMode("dark");
const lightTheme = () => setThemeMode("light");

useEffect(() => {
  document.querySelector("html").classList.remove("dark", "light");
  document.querySelector("html").classList.add(themeMode)}, [themeMode]);


  return (
   
<themeProvider value={{
  themeMode,lightTheme, darkTheme
}}>
<div className="flex flex-wrap min-h-screen items-center">
                <div className="w-full">
                    <div className="w-full max-w-sm mx-auto flex justify-end mb-4">
                        <Theme/>
                    </div>

                    <div className="w-full max-w-sm mx-auto">
                       <Card/>
                    </div>
                </div>
            </div>
</themeProvider>

  )
}

export default App

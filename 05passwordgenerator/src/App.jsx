import { useCallback, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length, setLength] = useState(12)
 const [numberAllowed,setNumberAllowed] = useState(false)
 const [charAllowed,setcharAllowed] = useState(false)
 const [password,setPassword] = useState(" ")
 const passwordGenerator = useCallback(() => {
  let pass =""
  let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
  if (numberAllowed) str += "0123456789"
  if (charAllowed) str += "!@#$%^&*"
  for (let i = 1; i <= length; i++) {
    let char =Math.floor(Math.random() * str.length+ 1)
    pass += str.charAt(char)
   
}
   setPassword(pass)
  } ,[length, numberAllowed, charAllowed, setPassword])
  
  return (
    <div className="App">
      <h1>Password Generator</h1>
      <div>
        <label>Length: </label>
        <input
          type="number"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
        />
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={numberAllowed}
            onChange={(e) => setNumberAllowed(e.target.checked)}
          />
          Include Numbers
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={charAllowed}
            onChange={(e) => setcharAllowed(e.target.checked)}
          />
          Include Special Characters
        </label>
      </div>
      <button onClick={passwordGenerator}>Generate Password</button>
      <p>{password}</p>
      </div>
      
  )
}

export default App

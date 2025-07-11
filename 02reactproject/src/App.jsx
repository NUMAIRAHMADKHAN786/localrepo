import {  useState } from 'react'
//  import reactLogo from './assets/react.svg'
//  import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [counter, setCounter] = useState(15)
//  let counter=15
 const addValue=()=>{
  console.log('Button clicked', counter);
  setCounter(counter+1)
    // counter=counter+1
 }
  const removeValue=()=>{
    // 
    setCounter(counter-1)
    console.log('Button clicked', counter);
    
  }
  return (
    <>
     <h1>Chai aur react </h1>
     <h2>Counter Value:{counter}</h2>
      <button onClick={addValue}>Increment{counter}</button>
      <br />
      <button onClick={removeValue}>Decrement{counter}</button>
    </>
  )
}

export default App

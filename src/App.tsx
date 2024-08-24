import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { initializeApp } from 'firebase/app'

const firebaseConfig = {
    apiKey: "AIzaSyAQoBjqsQbm-0Zw7sCxpEtb8sgj31hXWnQ",
    authDomain: "fir-9-c149d.firebaseapp.com",
    projectId: "fir-9-c149d",
    storageBucket: "fir-9-c149d.appspot.com",
    messagingSenderId: "315942202177",
    appId: "1:315942202177:web:77217bd16604c570470fc0",
    measurementId: "G-7Q0BDL0GH8"
};

function initFireBase() {
  initializeApp(firebaseConfig)
}

function App() {

  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App

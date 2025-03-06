import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex justify-center">
        <a href="https://vite.dev" target="_blank" className="m-4">
          <img src={viteLogo} className="h-24 w-auto" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" className="m-4">
          <img src={reactLogo} className="h-24 w-auto" alt="React logo" />
        </a>
      </div>
      <h1 className="text-6xl font-bold text-center">Vite + React</h1>
      <div className="card p-4 md:p-6">
        <button
          onClick={() => setCount((count) => count + 1)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          count is {count}
        </button>
        <p className="mt-4">
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs mt-4 text-center">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App

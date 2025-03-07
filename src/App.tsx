import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import About from './components/About/About'
import LanguageSwitcher from './components/LanguageSwitcher'
import { useTranslation } from 'react-i18next'

function App() {
  const [count, setCount] = useState(0)
  const { t } = useTranslation()

  return (
    <>
      <div className="container mx-auto p-4 md:p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex">
            <a href="https://vite.dev" target="_blank" className="m-4">
              <img src={viteLogo} className="h-24 w-auto" alt="Vite logo" />
            </a>
            <a href="https://react.dev" target="_blank" className="m-4">
              <img src={reactLogo} className="h-24 w-auto" alt="React logo" />
            </a>
          </div>
          <LanguageSwitcher />
        </div>
        <h1 className="text-6xl font-bold text-center">Vite + React</h1>
        <div className="card p-4 md:p-6">
          <button
            onClick={() => setCount((count) => count + 1)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {t('home.greeting')} {count}
          </button>
          <p className="mt-4">
            {t('home.description')}
          </p>
        </div>
        <p className="read-the-docs mt-4 text-center">
          {t('footer.designed')} Dorianmav
        </p>
      </div>
      
      {/* Added About component */}
      <About />
    </>
  )
}

export default App

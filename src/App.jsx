import { useState, useEffect } from 'react'
import './App.css'

function App() {

  const [seguir, setSeguir] = useState(false)
  const [posicion, setPosicion] = useState({ x: 0, y: 0 })

  /* usamos el useEffect para cada vez que "seguir" cambie de valor */
  useEffect(() => {

    const seguirCursor = (event) => {
      const {clientX, clientY} = event
      setPosicion({ x: clientX, y: clientY })
    }

    if (seguir) {
      window.addEventListener('pointermove', seguirCursor)
    }else {
      setPosicion({ x: 0, y: 0 })
    }

    // cleanup:
    // -> cuando el componente se desmonta
    // -> cuando cambian las dependencias, antes de ejecutar
    //    el efecto de nuevo
    return () => { // cleanup method
      window.removeEventListener('pointermove', seguirCursor)
    }
  }, [seguir])


  return (
    <>
      <main>
        <div style={{
          position: 'absolute',
          backgroundColor: 'aqua',
          border: '5px solid #fff',
          borderRadius: '50%',
          opacity: 0.8,
          pointerEvents: 'none',
          left: -25,
          top: -25,
          width: 50,
          height: 50,
          transform: `translate(${posicion.x}px,${posicion.y}px)`
        }}
        />
        <button onClick={() => setSeguir(!seguir)}>{seguir ? "DETENER" : "SEGUIR"}</button>
      </main>
    </>
  )
}

export default App

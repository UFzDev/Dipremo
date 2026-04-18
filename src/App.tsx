import { useState } from 'react'
import { connectToESP, type ESPData, type ConnectionStatus, STATUS } from './lib/connection'
import Connection from './components/Connection/Connection'
import Dashboard from './components/Dashboard/Dashboard'

function App() {
  const [status, setStatus] = useState<ConnectionStatus>(STATUS.DISCONNECTED)
  const [data, setData] = useState<ESPData | null>(null)
  const [cleanup, setCleanup] = useState<(() => void) | null>(null)

  const handleConnect = () => {
    setStatus(STATUS.CONNECTING)
    const close = connectToESP(setData, setStatus)
    setCleanup(() => close)
  }

  const handleDisconnect = () => {
    if (cleanup) cleanup()
    setStatus(STATUS.DISCONNECTED)
    setData(null)
  }

  const handleSetup = () => {
    setStatus(STATUS.CONNECTED)
  }
  
  if (status === STATUS.CONNECTED) {
    return <Dashboard data={data} onDisconnect={handleDisconnect} />
  }

  return <Connection status={status} onConnect={handleConnect} onSetup={handleSetup} />
}

export default App

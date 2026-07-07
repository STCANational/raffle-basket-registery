
import './App.css'
import MainLayout from './layouts/MainLayout';
import USBasketMap from './components/USBasketMap';
import { useState } from 'react';

function App() {
  const [timestamp, setTimestamp] = useState(Date.now());
  const [isLoading, setIsLoading] = useState(true);


  const handleRefresh = () => {
    setIsLoading(true);
    setTimestamp(Date.now());
  }

  return (
    <>
      <MainLayout>
        <button onClick={() => handleRefresh()}>
          Refresh Chart
        </button>
        <USBasketMap
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          timestamp={timestamp}
        />
      </MainLayout>
    </>
  )
}

export default App

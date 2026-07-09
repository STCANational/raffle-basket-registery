
import './App.css'
import MainLayout from './layouts/MainLayout';
import USBasketMap from './components/USBasketMap';
import { useState } from 'react';

function App() {
  const [timestamp, setTimestamp] = useState(Date.now());
  const [isLoading, setIsLoading] = useState(true);
  const [listRefreshTrigger, setListRefreshTrigger] = useState(0);

  const handleMapRefresh = () => {
    setIsLoading(true);
    setTimestamp(Date.now());
  }
  const handleListRefresh = () => {
    setListRefreshTrigger(prev => prev + 1);
  }

  return (
    <>
      <MainLayout>
        <USBasketMap
          isMapLoading={isLoading}
          setIsMapLoading={setIsLoading}
          mapTimestamp={timestamp}
        />
      </MainLayout>
    </>
  )
}

export default App

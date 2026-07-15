
import './App.css'
import MainLayout from './layouts/MainLayout';
import USBasketMap from './components/USBasketMap';
import { useState, useEffect } from 'react';

function App() {
  const [timestamp, setTimestamp] = useState(Date.now());
  const [isLoading, setIsLoading] = useState(true);
  const [listRefreshTrigger, setListRefreshTrigger] = useState(0);

  const [formData, setFormData] = useState<FormData[]>([]);
  const [claimedStates, setClaimedStates] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isListLoading, setIsListLoading] = useState<boolean>(true);

  useEffect(() => {
    const abortController = new AbortController();
    // Paste your Google Apps Script Web App URL here
    const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbyvz1Cgafcu6Wd3h_QVx6EQrr121inQbwVn20HCjejJ2L1C04Q094KWcp2Ji76JQBPp/exec';
    setIsListLoading(true);
    fetch(WEB_APP_URL)
      .then((response) => {

        if (!response.ok) throw new Error('Network response failed');
        return response.json(); // Simply parse as JSON directly
      })
      .then((data: FormData[]) => {
        console.log(data);
        setFormData(data);
        setIsListLoading(false);
      })
      .catch((err: Error) => {
        setError(err.message);
        setIsListLoading(false);
      });
    return () => {
      abortController.abort();
    }
  }, [listRefreshTrigger]);

  const handleListRefresh = () => {
    setListRefreshTrigger(prev => prev + 1);
  }

  return (
    <>
      <MainLayout>
        <button onClick={handleListRefresh}>Refresh List</button>

        {JSON.stringify(formData, null, 2)}
      </MainLayout>
    </>
  )
}

export default App

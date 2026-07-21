
import './App.css'
import USMap from './components/USMap';
import MainLayout from './layouts/MainLayout';
import { useState, useEffect } from 'react';
import {getAbbFromName} from './utils/stateHelpers';
import type { ClaimedStates } from './utils/states';
import { StateGridList } from './components/StateGridList';

interface apiData {
  timestamp: Date;
  name: string;
  state: string;
  phoneNumber: string;
  email: string;
}

function App() {
  const [listRefreshTrigger, setListRefreshTrigger] = useState(0);

  const [formData, setFormData] = useState<apiData[]>([]);
  const [claimedStates, setClaimedStates] = useState<ClaimedStates>();
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
      .then((data: apiData[]) => {
        console.log(data);
        setClaimedStates(Object.fromEntries(data.map(d => [getAbbFromName(d.state), d.name])))
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

  return (
    <>
      <MainLayout>
        <USMap claimedStates={claimedStates??{}} isLoading={isListLoading} unclaimedStateClicked={(s) => alert(s)}/>
        <StateGridList claimedStates={claimedStates??{}} isLoading={isListLoading} onClaimState={alert}/>

      </MainLayout>
    </>
  )
}  






export default App


import './App.css'
import USMap from './components/USMap';
import MainLayout from './layouts/MainLayout';
import { useState, useEffect, useRef } from 'react';
import {getAbbFromName, getNameFromAbb} from './utils/stateHelpers';
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

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  

  const [selectedState, setSelectedState] = useState<string>();
  const [formData, setFormData] = useState<apiData[]>([]);
  const [claimedStates, setClaimedStates] = useState<ClaimedStates>();
  const [error, setError] = useState<string | null>(null);
  const [isListLoading, setIsListLoading] = useState<boolean>(true);

// The external Google Form URL
  const GOOGLE_FORM_URL = `https://docs.google.com/forms/d/e/1FAIpQLSedqU760n7S09k2JISmjtSCP27bKgto6jG65exxXFcsJXh8fg/viewform?usp=pp_url&entry.1994255220=Gift+Basket&entry.1557665149=${selectedState}`;

  const openModal = (selectedState:string): void => {
    setSelectedState(selectedState);
    setIsOpen(true);
    dialogRef.current?.showModal();
  };

  const closeModal = (): void => {
    setIsOpen(false);
    setSelectedState(undefined);
    dialogRef.current?.close();
  };

  const handleConfirmClaim = (): void => {
    // Navigates the user to the Google Form in the same tab
    window.location.href = GOOGLE_FORM_URL;
    
    // ALTERNATIVE: Open in a new tab instead
    // window.open(GOOGLE_FORM_URL, '_blank', 'noopener,noreferrer');
    
    closeModal();
  };

  const handleSelectState = (stateKey: string): void => {
    const stateName = getNameFromAbb(stateKey);
    if (stateName) {
        openModal(stateName)
    }
  }

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
        <USMap claimedStates={claimedStates??{}} isLoading={isListLoading} unclaimedStateClicked={handleSelectState}/>
        <StateGridList claimedStates={claimedStates??{}} isLoading={isListLoading} onClaimState={handleSelectState}/>
      </MainLayout>

      <dialog 
        ref={dialogRef} 
        onClose={closeModal}
        style={{
          padding: '24px',
          borderRadius: '8px',
          border: '1px solid #ccc',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          maxWidth: '400px'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ margin: 0 }}>Confirm Action</h3>
          <p style={{ margin: 0, color: 'var(--text)' }}>
            Would you like to claim the state of {selectedState}? You will be redirected to a Google Form to complete your application.
          </p>
          
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
            <button 
              type="button" 
              onClick={closeModal} 
              style={{ padding: '8px 16px', cursor: 'pointer' }}
            >
              Cancel
            </button>
            <button 
              type="button" 
              onClick={handleConfirmClaim} 
              style={{ 
                padding: '8px 16px', 
                backgroundColor: '#0070f3', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px',
                cursor: 'pointer' 
              }}
            >
              Yes, Claim State
            </button>
          </div>
        </div>
      </dialog>

    </>
  )
}  






export default App

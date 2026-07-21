// StateGridList.tsx
import React from 'react';
import { type ClaimedStates, ALL_STATES } from '../utils/states';

interface StateGridListProps {
  claimedStates: ClaimedStates;
  onClaimState: (stateCode: string) => void;
  isLoading: boolean; // 1. Add loading state controller prop
}

export const StateGridList: React.FC<StateGridListProps> = ({ 
  claimedStates, 
  onClaimState, 
  isLoading 
}) => {
  return (
    // 2. Parent wrapper container must be relative
    <div style={{ position: 'relative', minHeight: '200px' }}>
      
      {/* 3. Grid Container displaying columns */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: '12px',
        padding: '16px',
        // Optional style tweak: visually dim background grid during load
        opacity: isLoading ? 0.6 : 1,
        pointerEvents: isLoading ? 'none' : 'auto',
        transition: 'opacity 0.2s ease-in-out'
      }}>
        {ALL_STATES.map((state) => {
          const claimantName = claimedStates[state.code];
          const isClaimed = !!claimantName;

          return (
            <div 
              key={state.code}
              style={{
                border: '1px solid #ddd',
                borderRadius: '6px',
                padding: '12px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                backgroundColor: isClaimed ? '#f9f9f9' : '#fff',
                minHeight: '80px'
              }}
            >
              <div>
                <strong style={{ fontSize: '14px' }}>{state.name}</strong>
                <span style={{ color: '#777', fontSize: '12px', marginLeft: '6px' }}>
                  ({state.code})
                </span>
              </div>

              <div style={{ marginTop: '8px' }}>
                {isClaimed ? (
                  <span style={{ 
                    fontSize: '13px', 
                    color: '#2e7d32', 
                    fontWeight: 'bold',
                    display: 'block',
                    backgroundColor: '#e8f5e9',
                    padding: '4px 8px',
                    borderRadius: '4px'
                  }}>
                    👤 {claimantName}
                  </span>
                ) : (
                  <button 
                    onClick={() => onClaimState(state.code)}
                    disabled={isLoading} // Safety lock against extra executions
                    style={{
                      width: '100%',
                      padding: '6px 10px',
                      backgroundColor: '#0070f3',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: isLoading ? 'not-allowed' : 'pointer',
                      fontSize: '12px',
                      fontWeight: '500'
                    }}
                  >
                    Claim State
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. Full Grid Overlay Element */}
      {isLoading && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.75)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 10,
          borderRadius: '8px'
        }}>
          {/* Visual Loader - CSS inline spin indicator */}
          <div style={{
            width: '40px',
            height: '40px',
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #0070f3',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }} />
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
          <p style={{ marginTop: '12px', fontWeight: '500', color: '#333' }}>
            Updating records...
          </p>
        </div>
      )}
    </div>
  );
};

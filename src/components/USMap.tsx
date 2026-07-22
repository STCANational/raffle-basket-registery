import React from 'react'
import { USAMap, StateNames, type USAStateAbbreviation } from '@mirawision/usa-map-react';
import { getAbbFromName, getNameFromAbb } from '../utils/stateHelpers';
import type { ClaimedStates } from '../utils/states';

const claimedStateColor: string = 'red';


interface StateTextRenderProps {
    enabled: boolean;
    render: (state: string) => string;
}

interface StateProps {
    fill?: string;
    stroke?: string;
    onClick?: (state: string) => void,

    label?: StateTextRenderProps;
    tooltip?: StateTextRenderProps;
}


type CustomeStateType = { [key: string]: StateProps }


interface USMapProps {
    claimedStates: ClaimedStates,
    isLoading: boolean,
    unclaimedStateClicked: (stateAbb: string) => void
}

const getCustomStatesStyles = (claimedStates: ClaimedStates) => Object.fromEntries(
    Object.entries(claimedStates).map(([key, value]) => [key, {
        fill: claimedStateColor,
        tooltip: {
            enabled: true,
            render: () => `${getNameFromAbb(key)} - Claimed by: ${value}`
        },
        onClick: () => { },
    } as StateProps])
);

const USMap: React.FC<USMapProps> = ({ claimedStates, isLoading, unclaimedStateClicked }) => {

    return (
        <div style={{ position: 'relative' }}>
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
                        Loading Map...
                    </p>
                </div>
            )}
            <USAMap
                defaultState={{ fill: 'green', onClick: (stateAbb) => unclaimedStateClicked(stateAbb) }}
                customStates={getCustomStatesStyles(claimedStates)}
            />
        </div>

    );

}

export default USMap

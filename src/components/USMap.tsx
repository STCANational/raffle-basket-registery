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


type CustomeStateType ={ [key: string]: StateProps } 


interface USMapProps {
    claimedStates: ClaimedStates,
    isLoading: boolean,
    unclaimedStateClicked: (stateAbb: string) => void
}

const getCustomStatesStyles = (claimedStates: ClaimedStates) =>  Object.fromEntries(
    Object.entries(claimedStates).map(([key, value]) => [key, {
        fill: claimedStateColor,
        tooltip: {
            enabled: true,
            render: () =>  `${getNameFromAbb(key)} - Claimed by: ${value}`
        },
        onClick: () => {},
    } as StateProps ]) 
);

const USMap: React.FC<USMapProps> = ({ claimedStates, isLoading, unclaimedStateClicked }) => {

    return (
        <div style={{position: 'relative'}}>
                 {isLoading && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'not-allowed',
          borderRadius: '4px'
        }}>
          {/* Replace with your preferred SVG spinner or loader text */}
          <span style={{ fontSize: '12px', color: 'black' }}>Map Loading...</span>
        </div>
      )}
            <USAMap
                defaultState={{fill: 'green', onClick: (stateAbb) => unclaimedStateClicked(stateAbb)}}
                customStates={getCustomStatesStyles(claimedStates)}
            />
        </div>
       
    );

}

export default USMap

import React from 'react'
import { USAMap, StateNames, type USAStateAbbreviation }  from '@mirawision/usa-map-react';
import {getAbbreviationByStateName} from '../utils/stateHelpers';

const defaultStateColor: string = '18D61B';
const claimedStateColor: string = 'FF0000';


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





export class ClaimedState {
    
    static GetCustomStates(states: ClaimedState[]): {[key:string]: StateProps} 
    {
        return states.reduce((acc, state) => {
            const stateAbb = getAbbreviationByStateName(state.stateName);

            if (stateAbb) {
                acc[stateAbb] = {fill: claimedStateColor};  
            }
            return acc
        }, {} as {[key: string]: StateProps})
    }

    constructor(stateAbbriviation: USAStateAbbreviation, user: string) {
        this.stateAbbriviation = stateAbbriviation;
        this.user = user;
    }

    stateAbbriviation: USAStateAbbreviation
    user: string;

    get stateName(): string {
        return  StateNames[this.stateAbbriviation];
    }
}

interface USMapProps {
    claimedStates: ClaimedState[]
}


const USMap: React.FC<USMapProps> = ({claimedStates}) => {
    const customStates = ClaimedState.GetCustomStates(claimedStates);


    return (
        <div>
            <USAMap
                customStates={customStates}
            />
        </div>
    );

}

export default USMap

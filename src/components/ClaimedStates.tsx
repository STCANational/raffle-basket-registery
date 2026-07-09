import React, { useEffect, useState } from 'react';

interface ClaimedStatesProps {
    listRefreshTrigger: number;
}

interface FormData {
    timestamp: string;
    name: string;
    state: string;
    phoneNumber: string;
    email: string;
}


const ClaimedStates: React.FC<ClaimedStatesProps> = ({ listRefreshTrigger }) => {
    const [formData, setFormData] = useState<FormData[]>([]);
    const [claimedStates, setClaimedStates] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isListLoading, setIsListLoading] = useState<boolean>(true);


    useEffect(() => {
        // Paste your Google Apps Script Web App URL here
        const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbyvz1Cgafcu6Wd3h_QVx6EQrr121inQbwVn20HCjejJ2L1C04Q094KWcp2Ji76JQBPp/exec';
        setIsListLoading(true);
        fetch(WEB_APP_URL)
            .then((response) => {
                if (!response.ok) throw new Error('Network response failed');
                return response.json(); // Simply parse as JSON directly
            })
            .then((data: FormData[]) => {
                setFormData(data);
                setIsListLoading(false);
            })
            .catch((err: Error) => {
                setError(err.message);
                setIsListLoading(false);
            });
    }, [listRefreshTrigger]);

    return (
        <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>




        </div>
    )




}


export default ClaimedStates;
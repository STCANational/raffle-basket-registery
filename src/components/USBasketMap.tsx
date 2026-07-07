import react, { useState, } from 'react';

interface UsBasketMapProps {
    timestamp: number;
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
}

const USBasketMap: React.FC<UsBasketMapProps> = ({ timestamp, isLoading, setIsLoading }) => {

    const spreadsheetId = "1baXJFsgB95YNYyTMVN2eHMf22n95cNab65Q-zHlenaY";
    const chartGid = "697065170"; // Paste your specific gid here

    const liveUrl = `https://docs.google.com/spreadsheets/d/1baXJFsgB95YNYyTMVN2eHMf22n95cNab65Q-zHlenaY/?gid=${chartGid}&rm=minimal`;
    const mapUrl: string = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRIsuzFtGRPqXMghdVCcWKj62l5z2u5yrKu1kKEuS14PwxDsSlu-FbLUHGZVyFusw-98EfgiqewiLAh/pubchart?oid=844443049&amp;format=interactive";
    return (
        // 1. Outer Layout Centerer
        <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>

            {/* 2. CLIPPING WINDOW: This box sets the final clean size you actually see */}
            <div style={{
                position: "relative",
                width: "600px",          // The exact visible width you want
                height: "375px",         // The exact visible height you want
                overflow: "hidden",      // 👈 CRITICAL: This chops off anything outside this box
                borderRadius: "8px",
                border: "1px solid #e2e8f0", // Clean modern border around just the chart
                boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)"
            }}>

                {/* Loading Overlay (Stays perfectly bounded inside the clipping window) */}
                {isLoading && (
                    <div style={{
                        position: "absolute",
                        top: 0, left: 0, width: "100%", height: "100%",
                        backgroundColor: "rgba(255, 255, 255, 0.95)",
                        display: "flex", justifyContent: "center", alignItems: "center",
                        zIndex: 10, fontFamily: "sans-serif", color: "#4a5568"
                    }}>
                        <div>⚡ Connecting real-time data stream...</div>
                    </div>
                )}

                {/* 3. THE IFRAME: We make it bigger and shift it to hide Google's UI panels */}
                <iframe
                    src={`${liveUrl}&cacheBust=${timestamp}`}
                    style={{
                        // We expand the iframe dimensions relative to the parent container
                        width: "calc(100% + 20px)",   // Adds extra width to push side borders off-screen
                        height: "calc(100% + 75px)",  // Adds extra height to swallow the top header and bottom tabs

                        // Negative margins push the unwanted Google bars out of the clipping view
                        marginTop: "-38px",           // 👈 Shakes the top header toolbar completely off-screen
                        marginLeft: "-10px",          // 👈 Centers the grid canvas by hiding left sidebar lines

                        border: "none"
                    }}
                    title="Trimmed Realtime Chart"
                    onLoad={() => setIsLoading(false)}
                />

            </div>
        </div>
    )
};

export default USBasketMap;
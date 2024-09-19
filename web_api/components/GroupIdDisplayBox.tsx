import React from "react"
import "../app/globals.css"

interface GroupIdDisplayBoxProps {
    groupdId? :number; 
}

export const GroupIdDisplayBox :React.FC<GroupIdDisplayBoxProps> = ({groupdId} :GroupIdDisplayBoxProps) => {
    // render 
    return (
        (typeof groupdId === "undefined")
        ? <div className="group-id-display-box">
            <p>Group assignment in progress...</p>
        </div>
        : <div className="group-id-display-box">
            <h2>{`Your group: `}</h2>
            <h1>{`${groupdId+1}`}</h1>
        </div>
    );
}; 
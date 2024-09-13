import React, { useState } from "react"
import { Grouping } from "@/firebase"
import "../app/globals.css"

interface GroupingDisplayBoxProps {
    grouping :Grouping;
}

export const GroupingDisplayBox :React.FC<GroupingDisplayBoxProps> = ({grouping} :GroupingDisplayBoxProps) => {
    let [participantAssignment, setParticipantAssignment] = useState<{[key :number]: number}>({}); 

    

    return (
        <div className="grouping-display-box">
            {/* name */}
            {
                grouping.name === undefined
                ? <p>(no name)</p>
                : <p>{grouping.name}</p>
            }
            {/* description */}
            {
                grouping.description === undefined
                ? <p></p>
                : <p>{grouping.description}</p>
            }
            {/* number of groups */}
            <p>{`${grouping.numGroups} groups`}</p>
            {/* participant assignment */}
            <div>
                {
                    Array.from({length: grouping.numGroups}, (_, groupId) => {
                        let nParticipants = (
                            participantAssignment[groupId] === undefined
                            ? 0
                            : participantAssignment[groupId]
                        ); 
                        return (<p>{`group ${groupId+1}: ${nParticipants}`}</p>);
                    })
                }
            </div>
        </div>
    );
}; 
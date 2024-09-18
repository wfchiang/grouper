import React, { useState } from "react"
import { Grouping, Participant, getParticipantByGroupingId } from "@/firebase"
// import { CallForParticipants } from "./CallForParticipants";
import "../app/globals.css"

interface GroupingDisplayBoxProps {
    grouping :Grouping;
}

export const GroupingDisplayBox :React.FC<GroupingDisplayBoxProps> = ({grouping} :GroupingDisplayBoxProps) => {
    const [participantAssignment, setParticipantAssignment] = useState<{[key :number]: number}>({}); 

    // let httpProtocol = window.location.protocol!; 
    // let httpHost = window.location.host!; 

    // get the participant assignment
    getParticipantByGroupingId(grouping.id!)
    .then((participants :Participant[]) => {
        const newParticipantAssignment :{[key :number]: number} = {}; 
        for (let i = 0 ; i < grouping.numGroups ; i++) {
            newParticipantAssignment[i] = 0; 
        }
        for (let j = 0 ; j < participants.length ; j++) {
            const assignGroupId :number = participants[j].assignedGroupId!; 
            newParticipantAssignment[assignGroupId] = newParticipantAssignment[assignGroupId] + 1; 
        }
        setParticipantAssignment(newParticipantAssignment); 
    });

    // render 
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
                        const nParticipants = (
                            participantAssignment[groupId] === undefined
                            ? 0
                            : participantAssignment[groupId]
                        ); 
                        return (<p>{`group ${groupId+1}: ${nParticipants}`}</p>);
                    })
                }
            </div>
            {/* call for participants */}
            <a href={`/call-for-participants?groupingId=${grouping.id}`}>Call for Participants</a>
        </div>
    );
}; 
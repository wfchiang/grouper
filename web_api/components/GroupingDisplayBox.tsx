import React, { useState } from "react"
import { Grouping, Participant, getParticipantByGroupingId } from "@/firebase"
// import { CallForParticipants } from "./CallForParticipants";
import "../app/globals.css"

interface GroupingDisplayBoxProps {
    grouping :Grouping;
}

export const GroupingDisplayBox :React.FC<GroupingDisplayBoxProps> = ({grouping} :GroupingDisplayBoxProps) => {
    let [participantAssignment, setParticipantAssignment] = useState<{[key :number]: number}>({}); 

    let httpProtocol = window.location.protocol!; 
    let httpHost = window.location.host!; 

    // get the participant assignment
    getParticipantByGroupingId(grouping.id!)
    .then((participants :Participant[]) => {
        let newParticipantAssignment :{[key :number]: number} = {}; 
        for (let i = 0 ; i < grouping.numGroups ; i++) {
            newParticipantAssignment[i] = 0; 
        }
        for (let j = 0 ; j < participants.length ; j++) {
            let assignGroupId :number = participants[j].assignedGroupId!; 
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
                        let nParticipants = (
                            participantAssignment[groupId] === undefined
                            ? 0
                            : participantAssignment[groupId]
                        ); 
                        return (<p>{`group ${groupId+1}: ${nParticipants}`}</p>);
                    })
                }
            </div>
            {/* call for participants */}
            <p>{`${httpProtocol}`}</p>
            <p>{`${httpHost}`}</p>
            <a href={`/call-for-participants?groupingId=${grouping.id}`}>Call for Participants</a>
            {/* <CallForParticipants groupingId={grouping.id!}></CallForParticipants> */}
        </div>
    );
}; 
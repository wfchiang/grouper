import React, { useState } from "react"
import { Grouping, Participant, deleteGroupingById, deleteParticipantsByGroupingId, getParticipantByGroupingId } from "@/firebase"
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

    // delete the grouping 
    const deleteGrouping = () => {
        deleteParticipantsByGroupingId(grouping.id!)
        .then(() => {
            deleteGroupingById(grouping.id!)
            .then(() => {});
        });
    }; 

    // render 
    return (
        <div className="grouping-display-box">
            <div className="grouping-display-box-info">
                {/* name */}
                {
                    grouping.name === undefined
                    ? <p>(no name)</p>
                    : <h2>{grouping.name}</h2>
                }
                {/* description */}
                {
                    grouping.description === undefined
                    ? <p></p>
                    : <p>{grouping.description}</p>
                }
            </div>
            <div className="group-id-display-box-assignment">
                {/* number of groups */}
                <h2>{`${grouping.numGroups} groups`}</h2>
                {/* participant assignment */}
                {
                    Array.from({length: grouping.numGroups}, (_, groupId) => {
                        const nParticipants = (
                            participantAssignment[groupId] === undefined
                            ? 0
                            : participantAssignment[groupId]
                        ); 
                        return (<p>{`group ${groupId+1}: ${nParticipants}`}&emsp;</p>);
                    })
                }
            </div>
            <div className="group-id-display-box-actions"> 
                {/* call for participants */}
                <button className="default-button">
                    <a 
                        href={`/call-for-participants?groupingId=${grouping.id}`}
                        target="_blank"
                    >
                    Call for Participants
                    </a>
                </button>
                <button className="default-button" onClick={deleteGrouping}>Delete</button>
            </div>
        </div>
    );
}; 
import { useState } from 'react';
import { Organizer, Grouping, getGroupingsByOrganizerEmail } from '@/firebase';
import { GroupingDisplayBox } from './GroupingDisplayBox';
import "../app/globals.css"

interface GroupingListProps {
    organizer :Organizer; 
}

export const GroupingList :React.FC<GroupingListProps> = ({organizer} :GroupingListProps) => {
    let [groupings, setGroupings] = useState<Grouping[]>([]); 

    // Get the groupings 
    getGroupingsByOrganizerEmail(organizer.email!)
    .then((acquiredGroupings :Grouping[]) => {
        setGroupings(acquiredGroupings);
    }); 

    // Render the list of Groupings
    return (
        <div className="grouping-list">
            {
                groupings.map((grouping, groupingIdx) => {
                    return (<GroupingDisplayBox grouping={grouping}></GroupingDisplayBox>); 
                })
            }
        </div>
    ); 
}; 

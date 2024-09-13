import { Organizer, Grouping, getGroupingsByOrganizerEmail } from '@/firebase';
import { useState } from 'react';

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
        <div>
            {
                groupings.map((grouping, groupingIdx) => {
                    return (<div>{grouping.id}</div>); 
                })
            }
            {/* <h2>Sign in to create your grouping</h2>
            {
                organizer.email === undefined
                ? <GoogleSignInButton setOrganizer={setOrganizer}/>
                : <UserProfilePanel organizer={organizer}></UserProfilePanel>
            } */}
        </div>
    ); 
}; 

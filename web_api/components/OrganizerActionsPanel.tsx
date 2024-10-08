import { Organizer } from '@/firebase';
import "../app/globals.css"

interface OrganizerActionsPanelProps {
    organizer :Organizer; 
}

export const OrganizerActionsPanel :React.FC<OrganizerActionsPanelProps> = ({organizer} :OrganizerActionsPanelProps) => {
    // Render the list of Groupings
    return (
        <div className="organizer-actions-panel">
            <button className="default-button">
                <a href={`/create-grouping?organizerEmail=${organizer.email}`}>New Grouping</a>
            </button>
        </div>
    ); 
}; 

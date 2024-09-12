'use client';

import { Organizer } from '@/firebase';
import { GoogleSignInButton } from './GoogleSignInButton';
import { UserProfilePanel } from './UserProfilePanel';

interface AuthPanelProps {
    organizer :Organizer; 
    setOrganizer :(organizer :Organizer) => void; 
}

export const AuthPanel :React.FC<AuthPanelProps> = ({organizer, setOrganizer} :AuthPanelProps) => {
    console.log(`AuthPanel: ${JSON.stringify(organizer)}`); 

    return (
        <div>
            <h2>Sign in to create your grouping</h2>
            {
                organizer.email === undefined
                ? <GoogleSignInButton setOrganizer={setOrganizer}/>
                : <UserProfilePanel organizer={organizer}></UserProfilePanel>
            }
        </div>
    ); 
}; 

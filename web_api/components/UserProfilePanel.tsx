'use client';

import { Organizer } from '@/firebase';
import Image from "next/image"; 
import "../app/globals.css"; 

interface UserProfilePanelProps {
    organizer :Organizer
}

export const UserProfilePanel :React.FC<UserProfilePanelProps> = (props :UserProfilePanelProps) => {
    console.log(`Displaying organizer: ${JSON.stringify(props.organizer)}`); 

    return (
        <div className="user-profile-panel">
            {/* user name */}
            {
                props.organizer.name === undefined
                ? <p>{"Welcome! My friend!"}</p>
                : <p>Welcome!&emsp;{props.organizer.name}</p>
            }
            {/* user photo */}
            {
                props.organizer.photoURL === undefined
                ? <div></div> 
                : <Image src={props.organizer.photoURL} alt="" width={50} height={50}></Image>
            }
            {/* user email */}
            {/* <p>{props.organizer.email}</p> */}
        </div>
    ); 
}; 

'use client';

import { useState } from 'react';
import { Organizer } from '@/firebase';
import { GoogleSignInButton } from './GoogleSignInButton';
import { UserProfilePanel } from './UserProfilePanel';
import "../app/globals.css"

export const AUTH_MODE_LOGIN = "login"; 
export const AUTH_MODE_CREATE_ORGANIZER = "create-organizer"; 

interface AuthPanelProps {
    organizer :Organizer; 
    setOrganizer :(organizer :Organizer) => void; 
}

export const AuthPanel :React.FC<AuthPanelProps> = ({organizer, setOrganizer} :AuthPanelProps) => {
    const [authMode, setAutoMode] = useState<string>("login"); 

    return (
        <div className="auth-panel">
            <h2>Sign in to create your grouping</h2>
            {
                organizer.email === undefined
                ? <GoogleSignInButton setPerson={setOrganizer} validateAgaintOrganizer={true} sessionStorageKey={"grouper-organizer"}/>
                : <UserProfilePanel organizer={organizer}></UserProfilePanel>
            }
        </div>
    ); 
}; 

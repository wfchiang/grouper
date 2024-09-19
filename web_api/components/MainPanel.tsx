'use client';

import React, { useState } from 'react';
import { Organizer } from '@/firebase';
import { AuthPanel } from './AuthPanel';
import { UserProfilePanel } from './UserProfilePanel';
import { GroupingList } from './GroupingList';
import { OrganizerActionsPanel } from './OrganizerActionsPanel';

export const MainPanel :React.FC = () => {
    const [organizer, setOrganizer] = useState<Organizer>(
        sessionStorage.getItem("grouper-organizer") === null
        ? {} 
        : JSON.parse(sessionStorage.getItem("grouper-organizer") as string) as Organizer
    ); 

    return (
        organizer.email === undefined
        ? <AuthPanel organizer={organizer} setOrganizer={setOrganizer}></AuthPanel>
        : <div>
            <UserProfilePanel organizer={organizer}></UserProfilePanel>
            <OrganizerActionsPanel organizer={organizer}></OrganizerActionsPanel>
            <GroupingList organizer={organizer}></GroupingList>
        </div>
    ); 
}; 
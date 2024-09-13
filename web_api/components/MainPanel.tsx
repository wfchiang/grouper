'use client';

import React, { useState } from 'react';
import { Organizer } from '@/firebase';
import { AuthPanel } from './AuthPanel';
import { UserProfilePanel } from './UserProfilePanel';
import { GroupingList } from './GroupingList';

export const MainPanel :React.FC = () => {
    const [organizer, setOrganizer] = useState<Organizer>({}); 

    return (
        organizer.email === undefined
        ? <AuthPanel organizer={organizer} setOrganizer={setOrganizer}></AuthPanel>
        : <div>
            <UserProfilePanel organizer={organizer}></UserProfilePanel>
            <GroupingList organizer={organizer}></GroupingList>
        </div>
    ); 
}; 
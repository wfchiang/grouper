
import { useState } from 'react';
import { useRouter } from 'next/router';
import { GoogleSignInButton } from '@/components/GoogleSignInButton';
import "../../app/globals.css"
import { Participant } from '@/firebase';

export default function ParticipateGroupingPage () {
    const router = useRouter(); 
    const { query } = router; 
    let groupingId = query.groupingId! as string; 

    const [participant, setParticipant] = useState<Participant>({groupingId: groupingId} as Participant); 

    return (
        <div>
          {
            participant.email === undefined 
            ? <div>
              <GoogleSignInButton setPerson={setParticipant} validateAgaintOrganizer={false}></GoogleSignInButton>
            </div>
            : <div>{`GroupingId: ${groupingId} with email ${participant.email}`}</div>
          }
        </div>
    ); 
}
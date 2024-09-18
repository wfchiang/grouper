import { useState } from 'react';
import { useRouter } from 'next/router';
import { GoogleSignInButton } from '@/components/GoogleSignInButton';
import { GroupIdDisplayBox } from '@/components/GroupIdDisplayBox';
import { Participant, Person, addParticipant } from '@/firebase';
import "../../app/globals.css"

export default function ParticipateGroupingPage () {
    const [participant, setParticipant] = useState<Participant>({}); 

    const router = useRouter(); 
    const { query } = router; 
    const groupingId = query.groupingId! as string; 
    
    const participateGrouping = (person :Person) => {
      // add the participant 
      addParticipant({...person, groupingId} as Participant)
      .then((assignedGroupId :number) => {
        let updatedParticipant = {...person, groupingId, assignedGroupId}; 
        console.log(`setting participant... ${JSON.stringify(updatedParticipant)}`); 
        setParticipant(updatedParticipant);
      }); 
    }; 

    return (
        <div>
          {
            participant.email === undefined 
            ? <div className="auth-panel">
              <GoogleSignInButton setPerson={participateGrouping} validateAgaintOrganizer={false}/>
            </div>
            : <GroupIdDisplayBox groupdId={participant.assignedGroupId}/>
          }
        </div>
    ); 
}
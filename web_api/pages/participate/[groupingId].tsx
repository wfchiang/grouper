import { useState } from 'react';
import { useRouter } from 'next/router';
import { GoogleSignInButton } from '@/components/GoogleSignInButton';
import { GroupIdDisplayBox } from '@/components/GroupIdDisplayBox';
import { Participant, Person, addParticipant } from '@/firebase';
import "../../app/globals.css"

export default function ParticipateGroupingPage () {
    const [manualInputEmail, setManualInputEmail] = useState<string>(""); 
    const [participant, setParticipant] = useState<Participant>({}); 

    const router = useRouter(); 
    const { query } = router; 
    const groupingId = query.groupingId! as string; 
    
    const participateGrouping = (person :Person) => {
      // add the participant 
      addParticipant({...person, groupingId} as Participant)
      .then((assignedGroupId :number) => {
        const updatedParticipant = {...person, groupingId, assignedGroupId}; 
        console.log(`setting participant... ${JSON.stringify(updatedParticipant)}`); 
        setParticipant(updatedParticipant);
      }); 
    }; 

    const participateByManualInputEmail = () => {
      // check parameters
      if (manualInputEmail.trim() === "") {
        throw new Error("Cannot sign in with an empty email..."); 
      }

      // participate grouping
      participateGrouping({
        email: manualInputEmail
      } as Person); 
    }; 

    return (
        <div>
          {
            participant.email === undefined 
            ? <div className="auth-panel">
              <div className="manual-email-input">
                <input 
                  type="text" 
                  value={manualInputEmail} 
                  onChange={(e) => {setManualInputEmail(e.target.value)}}/>
                <button className="default-button" onClick={participateByManualInputEmail}>Sign in with Email</button>
              </div>
              <p>---- or ----</p>
              <GoogleSignInButton setPerson={participateGrouping} validateAgaintOrganizer={false}/>
            </div>
            : <GroupIdDisplayBox groupdId={participant.assignedGroupId}/>
          }
        </div>
    ); 
}
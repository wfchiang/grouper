'use client'; 

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { addGrouping, Grouping, MAX_GROUPING_SIZE, Organizer } from '@/firebase';
import { Timestamp } from 'firebase/firestore';
import "../app/globals.css"

export default function CreateGrouping () {
    const router = useRouter(); 
    const [inputName, setInputName] = useState<string>(""); 
    const [inputDescription, setInputDescription] = useState<string>(""); 
    const [inputNumGroups, setInputNumGroups] = useState<string>(""); 
    const [organizerEmail, setOrganizerEmail] = useState<string>(""); 

    useEffect(() => {
        if (typeof window !== "undefined") {
            const params = new URLSearchParams(window.location.search!);
            const givenOrganizerEmail = params.get("organizerEmail") as string; 
            setOrganizerEmail(givenOrganizerEmail); 
        }
    }, []); 

    const createNewGrouping = () => {
        // Validate the parameters 
        if (inputName.trim() === "") {
            throw new Error("Cannot create a grouping with an empty name"); 
        }
        
        const intInputNumGroups = parseInt(inputNumGroups); 
        if (intInputNumGroups <= 0) {
            throw new Error(`Invalid number of groups: ${inputNumGroups}`); 
        }

        if (organizerEmail.trim() === "") {
            throw new Error("Organizer email is missed..."); 
        }

        // Add new grouping into firebase 
        addGrouping({
            name: inputName.trim(), 
            description: inputDescription.trim(), 
            organizerEmail: organizerEmail.trim(), 
            numGroups: intInputNumGroups, 
            createdAt: Timestamp.now(), 
            maxSize: MAX_GROUPING_SIZE
        } as Grouping)
        .then(() => {
            router.push("/"); 
        });
    }; 
    
    return (
        <div>
            <h2>Grouping Information</h2>
            <table><tbody>
                <tr>
                    <td><p>Name*:</p></td>
                    <td>
                        <input
                            type="text"
                            value={inputName}
                            onChange={(e) => setInputName(e.target.value)}
                        />
                    </td>
                </tr>
                <tr>
                    <td><p>Description:</p></td>
                    <td>
                        <input 
                            type="text"
                            value={inputDescription}
                            onChange={(e) => setInputDescription(e.target.value)}
                        />
                    </td>
                </tr>
                <tr>
                    <td><p>Number of groups*:</p></td>
                    <td>
                        <input 
                            type="text"
                            value={inputNumGroups}
                            onChange={(e) => setInputNumGroups(e.target.value)}
                        />
                    </td>
                </tr>
            </tbody></table>
            <button onClick={createNewGrouping}>Create</button>
        </div>
    ); 
}
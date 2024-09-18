'use client';

import React from 'react';
import Image from "next/image"
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"; 
import { Person, Organizer, app as firebaseApp, getOrganizer } from '../firebase';

interface GoogleSignInButtonProps {
    setPerson :(person: Person) => void; 
    validateAgaintOrganizer :boolean;
}

export const GoogleSignInButton :React.FC<GoogleSignInButtonProps> = ({setPerson, validateAgaintOrganizer} :GoogleSignInButtonProps) => {
    const signInWithGoogle = async () => {
        try {
            // Acquire the user credential and save it 
            const result = await signInWithPopup(
                getAuth(firebaseApp), 
                new GoogleAuthProvider()
            );
        
            const user = result.user;
            // console.log('User Info:', JSON.stringify(user));

            const organizer = (
                validateAgaintOrganizer
                ? await getOrganizer(user.email!)
                : undefined
            ); 
            if (!validateAgaintOrganizer || organizer !== undefined) {
                setPerson({
                    name: (user.displayName == null ? undefined : user.displayName), 
                    email: (user.email == null ? undefined : user.email), 
                    photoURL: (user.photoURL == null ? undefined : user.photoURL) 
                }); 
            }
            
        } catch (error) {
            console.error('Error during sign-in:', error);
        }
    };

    return (
        <button onClick={signInWithGoogle}>
            <Image src="/images/google-sign-in.svg" alt="Sign in with Google" width={200} height={50}></Image>
        </button>
    ); 
}; 

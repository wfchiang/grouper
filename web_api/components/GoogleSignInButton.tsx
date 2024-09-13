'use client';

import React from 'react';
import Image from "next/image"
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"; 
import {  Organizer, app as firebaseApp, getOrganizer } from '../firebase';

interface GoogleSignInButtonProps {
    setOrganizer :(organizer :Organizer) => void; 
}

export const GoogleSignInButton :React.FC<GoogleSignInButtonProps> = ({setOrganizer} :GoogleSignInButtonProps) => {
    const signInWithGoogle = async () => {
        try {
            // Acquire the user credential and save it 
            const result = await signInWithPopup(
                getAuth(firebaseApp), 
                new GoogleAuthProvider()
            );
        
            const user = result.user;
            // console.log('User Info:', JSON.stringify(user));

            const organizer = await getOrganizer(user.email!); 
            if (organizer !== undefined) {
                setOrganizer({
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

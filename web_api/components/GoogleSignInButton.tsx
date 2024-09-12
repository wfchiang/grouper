'use client';

import React from 'react';
import Image from "next/image"
import { signInWithGoogle } from '../firebase';

// const SignInButton: React.FC = () => {
//   return (
//     <button></button>
//     // <button onClick={signInWithGoogle}>
//     //   Sign in with Google
//     // </button>
//   );
// };

const GoogleSignInButton :React.FC = () => {
    return (
        <button onClick={signInWithGoogle}>
            <Image src="/images/google-sign-in.svg" alt="Sign in with Google" width={200} height={50}></Image>
        </button>
    ); 
}; 

export default GoogleSignInButton;

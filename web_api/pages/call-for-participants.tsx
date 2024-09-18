'use client'; 

import { useEffect, useState } from 'react';
import { useQRCode } from 'next-qrcode';
import "../app/globals.css"

export default function CallForParticipantsPage () {
    const [participatingUrl, setParticipatingUrl] = useState<string>(''); 

    useEffect(() => {
      if (typeof window !== "undefined") {
        const protocol = window.location.protocol!; 
        const host = window.location.host!; 
        const params = new URLSearchParams(window.location.search!);
        const groupingId = params.get("groupingId"); 
        setParticipatingUrl(`${protocol}://${host}/participate/${groupingId}`); 
      }
    }, []); 
    
    const { Canvas } = useQRCode(); 

    return (
        <div>
            {
              participatingUrl === ""
              ? <p>QR code generating...</p>
              : <div>
                <p>{`Participating URL: ${participatingUrl}`}</p>
                <Canvas
                  text={participatingUrl}
                />
              </div>
            }
            
        </div>
    ); 
}
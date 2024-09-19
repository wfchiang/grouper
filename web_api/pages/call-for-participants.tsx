'use client'; 

import { useEffect, useState } from 'react';
import { useQRCode } from 'next-qrcode';
import "../app/globals.css"

export default function CallForParticipantsPage () {
    const [participatingUrl, setParticipatingUrl] = useState<string>(''); 
    const [relatedParticipatingUrl, setRelativeParticipatingUrl] = useState<string>(''); 

    useEffect(() => {
      if (typeof window !== "undefined") {
        const protocol = window.location.protocol!; 
        const host = window.location.host!; 
        const params = new URLSearchParams(window.location.search!);
        const groupingId = params.get("groupingId"); 
        const relUrl = `/participate/${groupingId}`; 
        setRelativeParticipatingUrl(relUrl); 
        setParticipatingUrl(`${protocol}://${host}${relUrl}`); 
      }
    }, []); 
    
    const { Canvas } = useQRCode(); 

    return (
      participatingUrl === ""
      ? <div className="call-for-participants">
        <p>QR code generating...</p>
      </div>
      : <div className="call-for-participants">
        <h2>Join Grouping with QR Code</h2>
        <Canvas
          text={participatingUrl}
        />
        <a href={relatedParticipatingUrl}>{participatingUrl}</a>
      </div>
    ); 
}
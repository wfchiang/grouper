import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { useQRCode } from 'next-qrcode';
import "../app/globals.css"

interface CallForParticipantsPageProps {
    protocol: string;
    host: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  const protocol = req.headers['x-forwarded-proto'] || 'http';
  const host = req.headers['host'] || 'localhost';

  return {
    props: {
      protocol,
      host
    },
  };
};

export default function CallForParticipantsPage ({protocol, host} :CallForParticipantsPageProps) {
    const router = useRouter(); 
    const { query } = router; 
    const groupingId = query.groupingId! as string; 
    
    const participatingUrl = `${protocol}://${host}/participate/${groupingId}`;
    
    const { Canvas } = useQRCode(); 

    return (
        <div>
            <Canvas
              text={participatingUrl}
            />
        </div>
    ); 
}
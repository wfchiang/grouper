import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
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
    let groupingId = query.groupingId! as string; 
    

    let participatingUrl = `${protocol}://${host}/participate/${groupingId}`;
    return (
        <div>
            <p>{participatingUrl}</p>
        </div>
    ); 
}
import { NextApiRequest, NextApiResponse } from 'next';
import { Participant, getParticipant } from "../../firebase"

export default async function handler(req :NextApiRequest, res :NextApiResponse) {
  // Check the payload 
  const { email, groupingId } = req.query;  // ..body; 

  const participant = await getParticipant({email, groupingId} as Participant); 
  
  res.status(200).json({ participant }); 
}

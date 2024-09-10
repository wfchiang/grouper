import { NextApiRequest, NextApiResponse } from 'next';
import { Participant, addParticipant } from "../../firebase"

export default async function handler(req :NextApiRequest, res :NextApiResponse) {
  // Check the payload 
  const { email, groupingId } = req.query;  // ..body; 

  await addParticipant({email, groupingId} as Participant); 
  
  res.status(200).json({ message: "added" }); 
}

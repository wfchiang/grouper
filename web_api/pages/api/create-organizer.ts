import { NextApiRequest, NextApiResponse } from 'next';
import { Organizer, addOrganizer } from "../../firebase"

export default async function handler(req :NextApiRequest, res :NextApiResponse) {
  // Accept POST only 
  // if (req.method !== 'POST') {
  //   res.status(405).json({ message: `Method ${req.method} not allowed` });
  //   return;
  // }

  // Check the payload 
  const { name, email } = req.query;  // ..body; 

  await addOrganizer({name, email} as Organizer); 
  
  res.status(200).json({ message: "created" }); 
}

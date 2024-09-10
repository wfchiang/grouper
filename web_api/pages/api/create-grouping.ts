import { NextApiRequest, NextApiResponse } from 'next';
import { Grouping, addGrouping, getOrganizer } from "../../firebase"

export default async function handler(req :NextApiRequest, res :NextApiResponse) {
  // Check the payload 
  const { name, description, organizerEmail, numGroups } = req.query;  // ..body; 

  const organizer = await getOrganizer(organizerEmail as string); 
  if (organizer == undefined) {
    const errorMessage = `Organizer not found (${organizerEmail})`; 
    res.status(500).json({ message: errorMessage }); 
    throw new Error(errorMessage); 
  }

  await addGrouping({
    name, 
    description, 
    organizerEmail, 
    numGroups: parseInt(numGroups as string) 
  } as Grouping); 
  
  res.status(200).json({ message: "created" }); 
}

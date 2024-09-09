import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req :NextApiRequest, res :NextApiResponse) {
  // Accept POST only 
  if (req.method !== 'POST') {
    res.status(405).json({ message: `Method ${req.method} not allowed` });
    return;
  }

  // Check the payload 
  const { name, email } = req.body; 

  res.status(200).json({ message: `Got email ${email} of ${name}` });
}
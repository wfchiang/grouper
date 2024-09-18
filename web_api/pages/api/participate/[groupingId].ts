import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const defaultHttpProtocol = "https"; 
  const { groupingId, email } = req.query; // Path variable and query parameter

  let httpProtocol = req.headers['x-forwarded-proto'];
  if (httpProtocol !== "http" && httpProtocol !== "https") {
    httpProtocol = defaultHttpProtocol; 
  }

  let httpHost = req.headers.host!; 
  // let httpPort = req.socket.localPort; 

  if (typeof groupingId === 'string' && typeof email === 'string') {
    res.status(200).json({ message: `Host: ${req.headers.host}:${req.socket.localPort} Path variable: ${groupingId}, Query parameter: ${email}` });
  } else {
    res.status(400).json({ error: 'Invalid request' });
  }
}

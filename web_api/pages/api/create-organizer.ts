import { NextApiRequest, NextApiResponse } from 'next';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase"

export default async function handler(req :NextApiRequest, res :NextApiResponse) {
  // Accept POST only 
  // if (req.method !== 'POST') {
  //   res.status(405).json({ message: `Method ${req.method} not allowed` });
  //   return;
  // }

  // Check the payload 
  const { name, email } = req.query;  // ..body; 

  const querySnapshot = await getDocs(collection(db, "organizer"));
  const organizers = querySnapshot.docs.map(doc => doc.data());

  res.status(200).json({ message: `Got email ${email} of ${name} of project ${process.env.FIREBASE_PROJECT_ID} -- ${JSON.stringify(organizers)}` });
}


// pages/api/getOrganizers.ts
// import type { NextApiRequest, NextApiResponse } from 'next';
// import { collection, getDocs } from "firebase/firestore";
// import { db } from '../../firebase';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const querySnapshot = await getDocs(collection(db, "organizer"));
//   const organizers = querySnapshot.docs.map(doc => doc.data());
//   res.status(200).json(organizers);
// }


// pages/api/addOrganizer.ts
// import type { NextApiRequest, NextApiResponse } from 'next';
// import { collection, addDoc } from "firebase/firestore";
// import { db } from '../../firebase';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const { name, email } = req.body;
//   try {
//     const docRef = await addDoc(collection(db, "organizer"), {
//       name,
//       email
//     });
//     res.status(200).json({ id: docRef.id });
//   } catch (e) {
//     res.status(500).json({ error: "Error adding document" });
//   }
// }


// pages/index.tsx
// import { useEffect, useState } from 'react';

// const Home = () => {
//   const [organizers, setOrganizers] = useState([]);

//   useEffect(() => {
//     fetch('/api/getOrganizers')
//       .then(response => response.json())
//       .then(data => setOrganizers(data));
//   }, []);

//   return (
//     <div>
//       <h1>Organizers</h1>
//       <ul>
//         {organizers.map((organizer, index) => (
//           <li key={index}>{organizer.name} - {organizer.email}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Home;

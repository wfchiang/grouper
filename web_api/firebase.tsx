// firebase.ts
import { v4 as uuidv4 } from 'uuid';
import { initializeApp } from "firebase/app";
import { Timestamp, collection, query, getCountFromServer, where, getFirestore, getDocs, addDoc } from "firebase/firestore";

/* 
Some constants 
*/ 
export const COLLECTION_ORGANIZER = "grouper-organizer"; 
export const COLLECTION_GROUPING = "grouper-grouping"; 
export const COLLECTION_PARTICIPANT = "grouper-participant"; 

export const MAX_GROUPING_SIZE = 1000; 
export const MAX_GROUPINGS_PER_ORGANIZER = 3; 

/* 
Establish Firestore connection 
*/ 
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID, 
};

export const app = initializeApp(firebaseConfig);
let db = getFirestore(app);

/* 
Data interfaces
*/ 
export interface Person {
  id? :string; 
  name? :string; 
  email? :string;
  photoURL? :string; 
} 

export interface Organizer extends Person {
  createdAt? :Timestamp; 
  ownedGroupings? :number;
  maxOwnedGroupings? :number; 
}

export interface Grouping {
  id? :string; 
  name :string; 
  description :string; 
  organizerEmail :string; 
  numGroups :number; 
  createdAt? :Timestamp; 
  maxSize? :number; 
}

export interface Participant extends Person {
  groupingId? :string; 
  assignedGroupId? :number; 
  createdAt? :Timestamp;  
}

/*
Assertion functions 
*/
export function assertValidGrouping (grouping :Grouping) {
  if (grouping.numGroups <= 0) {
    throw new Error(`Invalid numGroups: ${grouping.numGroups}`); 
  }
}

export function assertValidOrganizer (organizer :Organizer) {
  if (typeof(organizer.email) !== "string" || organizer.email!.trim() === "") {
    throw new Error("Organizer's email missed"); 
  }
}

/* 
Querying functions
*/ 
export async function getOrganizer (email :string) :Promise<Organizer | undefined> {
  const querySnapshot = await getDocs(query(
    collection(db, COLLECTION_ORGANIZER), 
    where("email", "==", email)
  )); 
  const organizers = querySnapshot.docs.map(doc => (doc.data() as Organizer));

  if (organizers.length > 1) {
    throw new Error(`Duplicated organizers on email ${email}...`); 
  }

  if (organizers.length == 0) { 
    return undefined; 
  }
  else {
    return organizers[0]; 
  }
} 

export async function getGroupingById (id :string) :Promise<Grouping | undefined> {
  const querySnapshot = await getDocs(query(
    collection(db, COLLECTION_GROUPING), 
    where("id", "==", id)
  ));
  const groupings = querySnapshot.docs.map(doc => (doc.data() as Grouping)); 
  
  if (groupings.length > 1) {
    throw new Error(`Duplicated grouping on id ${id}`); 
  }

  if (groupings.length == 0) {
    return undefined; 
  }
  else {
    return groupings[0]; 
  }
}

export async function getGroupingsByOrganizerEmail (email :string) :Promise<Grouping[]> {
  const querySnapshot = await getDocs(query(
    collection(db, COLLECTION_GROUPING), 
    where("organizerEmail", "==", email)
  ));
  const groupings = querySnapshot.docs.map(doc => (doc.data() as Grouping)); 
  return groupings; 
}

export async function getParticipant (participant :Participant) :Promise<Participant | undefined> {
  const querySnapshot = await getDocs(query(
    collection(db, COLLECTION_PARTICIPANT), 
    where("groupingId", "==", participant.groupingId), 
    where("email", "==", participant.email)
  ));
  const participants = querySnapshot.docs.map(doc => (doc.data() as Participant)); 
  
  if (participants.length > 1) {
    throw new Error(`Duplicated participants: ${JSON.stringify(participant)}`); 
  }

  if (participants.length == 0) {
    return undefined; 
  }
  else {
    return participants[0]; 
  }
}

export async function getParticipantByGroupingId (groupingId :string) :Promise<Participant[]> {
  const querySnapshot = await getDocs(query(
    collection(db, COLLECTION_PARTICIPANT), 
    where("groupingId", "==", groupingId), 
  ));
  const participants = querySnapshot.docs.map(doc => (doc.data() as Participant)); 

  return participants; 
}

/* 
Addition functions 
*/ 
export async function addOrganizer (organizer :Organizer) {
  if (organizer.id === undefined) {
    organizer.id = uuidv4(); 
  }
  organizer.createdAt = Timestamp.now(); 

  const existingOrganizer = await getOrganizer(organizer.email!); 
  if (existingOrganizer === undefined) {
    await addDoc(
      collection(db, COLLECTION_ORGANIZER), 
      organizer
    ); 
  }
}

export async function addGrouping (grouping :Grouping) {
  assertValidGrouping(grouping); 

  if (grouping.id === undefined) {
    grouping.id = uuidv4(); 
  }
  grouping.createdAt = Timestamp.now(); 
  
  const existingGrouping = await getGroupingById(grouping.id as string);
  if (existingGrouping === undefined) {
    await addDoc(
      collection(db, COLLECTION_GROUPING), 
      grouping
    )
  } 
}

export async function addParticipant (participant :Participant) :Promise<number> {
  const existingParticipant = await getParticipant(participant); 
  if (existingParticipant === undefined) {
    // Check the grouping exists
    const grouping = (await getGroupingById(participant.groupingId!))!;
    assertValidGrouping(grouping); 

    // Set the timestamp 
    participant.createdAt = Timestamp.now(); 

    // count the current number of participants 
    const countSnapshot = await getCountFromServer(query(
      collection(db, COLLECTION_PARTICIPANT), 
      where("groupingId", "==", participant.groupingId)
    )); 
    const numAllParticipants = countSnapshot.data().count; 

    const assignedGroupId = numAllParticipants % grouping.numGroups; 

    // add the participant 
    participant.assignedGroupId = assignedGroupId;
    
    await addDoc(
      collection(db, COLLECTION_PARTICIPANT), 
      participant
    );

    // return 
    return assignedGroupId; 
  } 
  else {
    return existingParticipant.assignedGroupId!; 
  }
}

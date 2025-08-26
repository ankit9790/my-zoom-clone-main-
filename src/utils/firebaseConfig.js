import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase project configuration object
const firebaseConfig = {
  apiKey: "AIzaSyASec5H18QAwphCHxpR17rcRK2XpPcAbMg",
  authDomain: "my-zoom-clone-f8ab8.firebaseapp.com",
  projectId: "my-zoom-clone-f8ab8",
  storageBucket: "my-zoom-clone-f8ab8.appspot.com",
  messagingSenderId: "795515047409",
  appId: "1:795515047409:web:3f7ff4766e2b89ca5d32f4",
  measurementId: "G-VWPBR1NSLL"
};

// Initialize Firebase app with config
const app = initializeApp(firebaseConfig);

// Export Firebase authentication instance
export const firebaseAuth = getAuth(app);
// Export Firestore database instance
export const firebaseDB = getFirestore(app);
// Firestore collection references for users, meetings, chats
export const usersRef = collection(firebaseDB, "users");
export const meetingsRef = collection(firebaseDB, "meetings");
export const chatsRef = collection(firebaseDB, "chats");
// Function to get messages collection reference for a specific chat
export const messagesRef = (chatId) => collection(firebaseDB, "chats", chatId, "messages");

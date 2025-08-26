import { getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAppSelector } from "../app/hooks";
import { usersRef } from "../utils/firebaseConfig";

/**
 * Custom React hook to fetch users from Firestore excluding the current user.
 * Returns an array of user objects with an added 'label' property for UI display.
 */
function useFetchUsers() {
  // State to hold the list of users
  const [users, setUsers] = useState([]);
  // Get current user ID from Redux store
  const uid = useAppSelector((zoomApp) => zoomApp.auth.userInfo?.uid);

  // Effect to fetch users when uid changes
  useEffect(() => {
    if (uid) {
      const getUser = async () => {
        // Query users collection excluding current user by uid
        const firestoreQuery = query(usersRef, where("uid", "!=", uid));
        const data = await getDocs(firestoreQuery);
        const firebaseUsers = [];

        // Map Firestore documents to user objects with label property
        data.forEach((user) => {
          const userData = user.data();
          firebaseUsers.push({
            ...userData,
            label: userData.name, // label used for UI components like dropdowns
          });
        });
        // Update state with fetched users
        setUsers(firebaseUsers);
      };
      getUser();
    }
  }, [uid]);
  // Return users array as a single element array for destructuring convenience
  return [users];
}

export default useFetchUsers;

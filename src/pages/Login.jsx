import {
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
  EuiImage,
  EuiPanel,
  EuiProvider,
  EuiSpacer,
  EuiText,
  EuiTextColor,
} from "@elastic/eui";
import logo from "../assets/logo.png";
import animation from "../assets/animation.gif";
import React from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  sendEmailVerification,
} from "firebase/auth";
import { firebaseAuth, firebaseDB, usersRef } from "../utils/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { setUser } from "../app/slices/AuthSlice";
import { collection, query, where, addDoc, getDocs } from "firebase/firestore";

// Login page component for user authentication
function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Function to handle login with Google OAuth
  const login = async () => {
    try {
      const provider = new GoogleAuthProvider();
      // Sign in with popup using Google provider
      const result = await signInWithPopup(firebaseAuth, provider);
      const { displayName, email, uid } = result.user;

      if (email) {
        // Query Firestore to check if user already exists
        const firestoreQuery = query(usersRef, where("uid", "==", uid));
        const fetchedUser = await getDocs(firestoreQuery);
        // If user does not exist, add to Firestore users collection
        if (fetchedUser.docs.length === 0) {
          await addDoc(collection(firebaseDB, "users"), {
            uid,
            name: displayName,
            email,
          });
        }
        // Update Redux store with user info
        dispatch(setUser({ 
          uid, 
          email, 
          name: displayName,
          emailVerified: result.user.emailVerified 
        }));

        // If email is verified, navigate to home page
        if (result.user.emailVerified) {
          navigate("/");
        } else {
          // Send email verification and sign out user
          await sendEmailVerification(result.user);
          alert("A verification email has been sent. Please verify your email before logging in.");
          await firebaseAuth.signOut();
        }
      }
    } catch (error) {
      // Log any login errors
      console.error("Login failed:", error);
    }
  };

  return (
    // Elastic UI provider with dark mode
    <EuiProvider colorMode="dark">
      {/* Centered flex container for login panel */}
      <EuiFlexGroup
        justifyContent="center"
        alignItems="center"
        style={{ width: "100vw", height: "100vh" }}
      >
        <EuiFlexItem grow={false}>
          <EuiPanel paddingSize="xl">
            <EuiFlexGroup justifyContent="center" alignItems="center">
              <EuiFlexItem>
                {/* Animated logo image */}
                <EuiImage src={animation} alt="logo" />
              </EuiFlexItem>
              <EuiFlexItem>
                {/* Static logo image */}
                <EuiImage src={logo} alt="logo" size="230px" />
                <EuiSpacer size="xs" />
                {/* Tagline text */}
                <EuiText textAlign="center" grow={false}>
                  <h3>
                    <EuiTextColor>One Platform to</EuiTextColor>
                    <EuiTextColor color="#0b5cff"> connect</EuiTextColor>
                  </h3>
                </EuiText>
                <EuiSpacer size="l" />
                {/* Google login button */}
                <EuiButton fill onClick={login}>
                  Login with Google
                </EuiButton>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiPanel>
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiProvider>
  );
}

export default Login;

import { createContext, useContext, useEffect, useState } from "react";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onIdTokenChanged
} from "firebase/auth";
import { auth, db } from "../config/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setAuthenticated] = useState(undefined);

 useEffect(() => {
  const unsub = onIdTokenChanged(auth, async (currentUser) => {
    if (currentUser) {
      setAuthenticated(true);
      setUser(currentUser);
      try {
        const idToken = await currentUser.getIdToken();
        console.log('ID Token:', idToken);
      } catch (error) {
        console.error('Error getting ID Token:', error);
      }
    } else {
      setAuthenticated(false);
      setUser(null);
    }
  });

  return () => unsub();
}, []);

  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (e) {
      let msg = e.message;
      if (msg.includes("(auth/user-not-found)")) msg = "User not found";
      else if (msg.includes("(auth/wrong-password)")) msg = "Wrong password";
      else if (msg.includes("(auth/invalid-email)")) msg = "Invalid email";
      else if (msg.includes("(auth/invalid-credential)")) msg = "Invalid credentials";
      else msg = "Something went wrong. Please try again.";
      return { success: false, msg };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      return { success: true };
    } catch (e) {
      return { success: false, msg: e.message };
    }
  };

  const register = async (email, password, userName) => {
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", response.user.uid), {
        userName,
        userId: response.user.uid,
      });
      return { success: true, data: response.user };
    } catch (e) {
      let msg = e.message;
      if (msg.includes("(auth/invalid-email)")) msg = "Invalid email";
      else if (msg.includes("(auth/email-already-in-use)")) msg = "Email already in use";
      else msg = "Registration failed";
      return { success: false, msg };
    }
  };

const sendOtp = async (phone) => {
  try {
    const recaptcha = new RecaptchaVerifier(auth, 'recaptcha', {})
    const confirmation = await signInWithPhoneNumber(auth, phone, recaptcha);
    return { success: true, confirmation };
  } catch (err) {
    console.error(err);
    return { success: false, msg: err.message };
  }
}

const verifyOtp = async (confirmation, code) => {
  try {
    const result = await confirmation.confirm(code);
    return { success: true, data: result.user };
  } catch (error) {
    console.error(error);
    return { success: false, msg: "Invalid OTP" };
  }
};
  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, register, logout, sendOtp, verifyOtp }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error("useAuth must be wrapped inside AuthContextProvider");
  }
  return value;
};

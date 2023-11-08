import { db } from "../firebase/config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { useEffect, useState } from "react";

export const useAuthentication = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  //cleanup
  const [cancelled, setCancelled] = useState(false);
  const auth = getAuth();

  const checkIfIsCancelled = () => {
    if (cancelled) return;
  };

  // register
  const createUser = async (data) => {
    checkIfIsCancelled();
    setError(null);
    setLoading(true);
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      await updateProfile(user, { displayName: data.displayName });

      setLoading(false);

      return user;
    } catch (error) {
      console.log(error.message);
      console.log(typeof error.message);

      let sysErrorMessage;

      if (error.message.includes("Password")) {
        sysErrorMessage = "A senha deve conter pelo menos 6 caracteres";
      } else if (error.message.includes("email-already")) {
        sysErrorMessage = "E-mail já cadastrado";
      } else {
        sysErrorMessage = "Ocorreu um erro, por favor tente mais tarde";
      }
      setError(sysErrorMessage);
    }
  };

  // signout

  const logout = () => {
    checkIfIsCancelled();
    signOut(auth);
  };

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { auth, createUser, error, loading, logout };
};

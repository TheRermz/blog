import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/config";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const initState = {
  loading: null,
  error: null,
};

const insertReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "SUCCESS":
      return {
        ...state,
        loading: false,
        error: null,
      };
    case "ERROR":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export const useInsertDocument = (docCollection) => {
  const [response, dispatch] = useReducer(insertReducer, initState);

  checkCancelledBeforeDispatch({ type: "LOADING" });

  // deal with memory leak

  const [cancelled, setCancelled] = useState(false);

  const checkCancelledBeforeDispatch = (action) => {
    if (!cancelled) dispatch(action);
  };

  const insertDocument = async (doc) => {
    try {
      const newDoc = {
        ...doc,
        createdAt: Timestamp.now(),
      };
      const insertDoc = await addDoc(collection(db, docCollection), newDoc);
      checkCancelledBeforeDispatch({ type: "SUCCESS", payload: insertDoc });
    } catch (error) {
      console.log(error.message);
      checkCancelledBeforeDispatch({ type: "ERROR", payload: error.message });
    }
  };

  useEffect(() => {
    return () => {
      setCancelled(true);
    };
  }, []);

  return { insertDocument, response };
};

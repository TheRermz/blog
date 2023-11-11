import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/config";
import { doc, deleteDoc } from "firebase/firestore";

const initState = {
  loading: null,
  error: null,
};

const delReducer = (state, action) => {
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

export const useDeleteDocument = (docCollection) => {
  const [response, dispatch] = useReducer(delReducer, initState);

  // deal with memory leak

  const [cancelled, setCancelled] = useState(false);

  const checkCancelledBeforeDispatch = (action) => {
    if (!cancelled) dispatch(action);
  };
  const delDoc = async (id) => {
    checkCancelledBeforeDispatch({ type: "LOADING" });
    try {
      const deletedDoc = await deleteDoc(doc(db, docCollection, id));
      checkCancelledBeforeDispatch({ type: "SUCCESS", payload: deletedDoc });
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

  return { delDoc, response };
};

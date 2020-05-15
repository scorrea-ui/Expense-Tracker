import React, { createContext, useReducer, useEffect } from "react";
import AppReducer from "./AppReducer";

/*
  Set an initialState of transactions
*/

const initialState = {
  transactions: [],
};

//  CreateContext
export const globalContext = createContext(initialState);

/*
  useReducer accepts a reducer ( switch ) and and initialState which is set to transactions
*/
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState, () => {
    const transactions = localStorage.getItem("transactions");
    return transactions
      ? { transactions: JSON.parse(transactions) }
      : initialState;
  });

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(state.transactions));
  }, [state.transactions]);

  // Actions
  const deleteTransaction = (id) =>
    dispatch({
      type: "DELETE_TRANSACTION",
      payload: id,
    });

  const AddTransaction = (transaction) =>
    dispatch({
      type: "ADD_TRANSACTION",
      payload: transaction,
    });

  return (
    /*
      globalContext accepts a kind of store which we are passing in as a prop ( value )
    */
    <globalContext.Provider
      value={{
        transactions: state.transactions,
        deleteTransaction,
        AddTransaction,
      }}
    >
      {children}
    </globalContext.Provider>
  );
};

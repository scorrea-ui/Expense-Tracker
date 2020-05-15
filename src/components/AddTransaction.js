import React, { useState, useContext } from "react";
import { globalContext } from "../context/GlobalState";

const AddTransaction = () => {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState(0);
  const { AddTransaction } = useContext(globalContext);

  const generateId = () => {
    return Math.floor(Math.random() * 100000000);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const newTransaction = {
      id: generateId(),
      text,
      amount: parseInt(amount),
    };

    AddTransaction(newTransaction);
  };

  return (
    <div>
      <h3>Add new transaction</h3>
      <form onSubmit={onSubmit}>
        <div className='htmlForm-control'>
          <label htmlFor='text'>Text</label>
          <input
            type='text'
            value={text}
            onChange={(e) => setText(e.target.value)}
            id='text'
            placeholder='Enter text...'
          />
        </div>
        <div className='htmlForm-control'>
          <label htmlFor='amount'>
            Amount <br />
            (negative - expense, positive - income)
          </label>
          <input
            type='number'
            id='amount'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder='Enter amount...'
          />
        </div>
        <button className='btn'>Add transaction</button>
      </form>
    </div>
  );
};

export default AddTransaction;

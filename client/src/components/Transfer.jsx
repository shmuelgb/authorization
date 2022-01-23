import React, { useState } from "react";
import Axios from "axios";
import domain from "../utils";

export default function Transfer() {
  const [id, setId] = useState();
  const [idTo, setIdTo] = useState();
  const [amount, setAmount] = useState();

  const handleSend = async () => {
    try {
      const { data } = await Axios.patch(`${domain}/api/users/${id}`, {
        action: "transfer",
        amount: amount,
        to: idTo,
      });
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="transfer action">
      <h2>Transfer money</h2>
      <label htmlFor="id">from:</label>
      <input
        name="id"
        type="Number"
        value={id}
        placeholder="id"
        onChange={(e) => setId(e.target.value)}
      />
      <label htmlFor="idTo">to:</label>
      <input
        name="idTo"
        type="Number"
        value={idTo}
        placeholder="id"
        onChange={(e) => setIdTo(e.target.value)}
      />
      <label htmlFor="amount">Enter user amount</label>
      <input
        name="amount"
        type="Number"
        value={amount}
        placeholder="amount"
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handleSend}>Send!</button>
    </div>
  );
}

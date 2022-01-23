import React, { useState } from "react";
// test

export default function Update({ updateFn, action }) {
  const [id, setId] = useState("");
  const [amount, setAmount] = useState("");

  const handleSend = () => {
    updateFn(id, action, amount);
  };
  return (
    <div className="update">
      <label htmlFor="id">Enter user id</label>
      <input
        name="id"
        type="Number"
        value={id}
        placeholder="id"
        onChange={(e) => setId(e.target.value)}
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

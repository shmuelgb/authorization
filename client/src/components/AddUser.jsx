import React, { useState } from "react";
import Axios from "axios";
import domain from "../utils";

export default function AddUser() {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [cash, setCash] = useState("");
  const [credit, setCredit] = useState("");

  const handleSubmit = async () => {
    try {
      const newUser = {
        user_id: id,
        name: name,
        cash: cash,
        credit: credit,
      };
      const userRes = await Axios.post(`${domain}/api/users`, newUser);
      console.log("User added", userRes.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="add-user">
      <h3>Add A new user:</h3>
      <label htmlFor="id">Add user id</label>
      <input
        name="id"
        type="Number"
        value={id}
        placeholder="please provide an id"
        onChange={(e) => setId(e.target.value)}
      />
      <label htmlFor="name">Add user name</label>
      <input
        name="name"
        type="text"
        value={name}
        placeholder="please provide a name"
        onChange={(e) => setName(e.target.value)}
      />
      <label htmlFor="cash">Add user's initial cash value</label>
      <input
        name="cash"
        type="Number"
        value={cash}
        placeholder="optional"
        onChange={(e) => setCash(e.target.value)}
      />
      <label htmlFor="cash">Add user's initial credit value</label>
      <input
        name="credit"
        type="Number"
        value={credit}
        placeholder="optional"
        onChange={(e) => setCredit(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

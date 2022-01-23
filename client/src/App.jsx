import React from "react";
import AddUser from "./components/AddUser";
import Update from "./components/Update";
import Transfer from "./components/Transfer";
import DisplayUsers from "./components/DisplayUsers";
import "./App.css";
import axios from "axios";
import domain from "./utils";

function App() {
  const handleUpdate = async (id, action, amount) => {
    try {
      const { data } = await axios.patch(`${domain}/api/users/${id}`, {
        action: action,
        amount: amount,
      });
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
      <div className="main">
        <AddUser />
        <div className="actions">
          <h2>Actions</h2>
          <div className="action">
            <h3>Deposit</h3>
            <Update updateFn={handleUpdate} action="deposit" />
          </div>
          <div className="action">
            <h3>Withdraw</h3>
            <Update updateFn={handleUpdate} action="withdraw" />
          </div>
          <div className="action">
            <h3>Update credit</h3>
            <Update updateFn={handleUpdate} action="update_credit" />
          </div>
          <Transfer />
        </div>
      </div>
      <DisplayUsers />
    </div>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import domain from "../utils";
import User from "./User";
import Axios from "axios";

export default function DisplayUsers() {
  const [data, setData] = useState();
  const [user, setUser] = useState();
  const [id, setId] = useState();
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await Axios.get(`${domain}/api/users`);
      setData(data);
    };
    fetchData();
  }, [refresh]);

  const renderUsers = () => {
    return data.map((user) => {
      return <User key={user.user_id} user={user} />;
    });
  };

  const getUserData = async () => {
    const { data } = await Axios.get(`${domain}/api/users/${id}`);
    setUser(data);
  };

  return (
    <div className="DisplayUsers">
      <div className="all-users">
        <h2>Display Users</h2>
        <button onClick={() => setRefresh(!refresh)}>Refresh</button>
        {data && renderUsers()}
      </div>
      <div className="query">
        <h2>Get user info by ID</h2>
        <input
          type="number"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="ID"
        />
        <button onClick={getUserData}>Search</button>
        {user && <User user={user} />}
      </div>
    </div>
  );
}

import React from "react";

export default function User({ user }) {
  return (
    <div className="user">
      <ul>
        <li>User ID: {user.user_id}</li>
        <li>User Name: {user.name}</li>
        <li>User Cash: {user.cash}</li>
        <li>User Credit: {user.credit}</li>
      </ul>
    </div>
  );
}

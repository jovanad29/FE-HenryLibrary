import React from "react";
import { useSelector } from "react-redux";

function DataUser(id) {
  const { email, displayName } = useSelector((state) => state);

  return (
    <div>
      <p>Nombre: {displayName}</p>
      <p>Email: {email}</p>
    </div>
  )
}

export default DataUser;

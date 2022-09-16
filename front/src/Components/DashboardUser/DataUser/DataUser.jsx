import React from "react";
import { useSelector } from "react-redux";

function DataUser(id) {
  const { email, displayName, address } = useSelector((state) => state);

 

  return (
    <div>
   {/* Nombre:   <input value={} /> {displayName} */}
      <p>Email: {email}</p>
      <p>Direccion: {address}</p>
    </div>
  )
}

export default DataUser;

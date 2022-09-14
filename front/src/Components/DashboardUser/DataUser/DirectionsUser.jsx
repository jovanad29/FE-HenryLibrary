import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDirectionsUser } from "../../../actions/directionsUserActions.js";

function DirectionsUser(id) {
  const dispatch = useDispatch();
  const { uid, allUsers, directionsUser } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getDirectionsUser(uid));
  }, [dispatch, uid]);

  return(
      <>
  {
    allUsers?.map((u) => {
      return (
        <div key={u.uid}>        
          <p>Direccion: {u.address? u.address : "Ingrese su Direccion"}  </p>
        <hr/>
        </div>
      )
    })
  }
  </>
)
}

export default DirectionsUser;
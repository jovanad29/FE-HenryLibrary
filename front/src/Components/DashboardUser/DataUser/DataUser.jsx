import { border } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserById } from "../../../actions/dataUserIdActions";

function DataUser(id) {
  const dispatch = useDispatch();
  const { uid, allUsers } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getUserById(uid));
  }, [dispatch, uid]);

  return (
    <>
      {allUsers?.map((u) => {
        return (
          <div key={u.uid}>
            <p>Nombre: {u.nameUser}</p>
            <p>Email: {u.email}</p>
            <hr/>
          </div>
        );
      })}
    </>
  );
}

export default DataUser;

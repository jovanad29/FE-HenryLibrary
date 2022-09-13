import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserView from "./UserView";
import { getAllUsers } from "../../actions/dashboardActions";

function Dashboard() {
  const dispatch = useDispatch();
  const { allUsers } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <div>
      <UserView usuarios={allUsers} />
    </div>
  );
}

export default Dashboard;

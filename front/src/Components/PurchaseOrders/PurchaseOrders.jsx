import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllCartDB } from "../../actions/index.js";

import NavBar from "../NavBar/NavBar.jsx";
import NavBar2 from "../NavBar2/NavBar2.jsx";
import Footer from "../Footer/Footer.jsx";

export default function PurchaseOrders() {
  const dispatch = useDispatch();  
    const history = useHistory();
    const { status, displayName, uid } = useSelector((state) => state);
    //traer del estado allCartByUser
    const { allCartByUser } = useSelector((state) => state);
    //despachar la accion getAllCartDB
    useEffect(() => {
        dispatch(getAllCartDB(uid));
    }, [dispatch]);

console.log(allCartByUser)
  return (
    <div>PurchaseOrders
        <NavBar />
        <div>
            {/* aca va el map de allCartByUser */}
            {allCartByUser}

        </div>
        {/* <Footer /> */}
    </div>
  )
}

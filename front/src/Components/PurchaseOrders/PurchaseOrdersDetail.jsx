import React, { useState, useEffect,  useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getCartDB } from "../../actions/index.js";

import NavBar from "../NavBar/NavBar.jsx";

export default function PurchaseOrdersDetail() {
    const dispatch = useDispatch();
    const history = useHistory();
    const {
        status,
        uid,
        cartByUser,
    } = useSelector((state) => state);
    const isAuthenticated = useMemo(() => status === "authenticated", [status]);
    const [order, setOrder] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [date, setDate] = useState("");
    const [totalPrice, setTotalPrice] = useState(0);
    
  return (
    <div>PurchaseOrdersDetail</div>
  )
}

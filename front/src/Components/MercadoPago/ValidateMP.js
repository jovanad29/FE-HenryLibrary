import React from "react";
import { useDispatch } from "react-redux";
import { Redirect, useLocation } from "react-router-dom";
import { setPayment } from "../../reducer/checkoutSlice";

function ValidateMP() {
  const dispatch = useDispatch();
  function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
  }
  let query = useQuery();
  let status = query.get("status");
  let mpID = query.get("payment_id");
  dispatch(
    setPayment({
      mpID,
      status,
    })
  );
  return (
    <Redirect
      to={
        status === "approved"
          ? "/checkout/success"
          : status === "in_process"
          ? "/checkout/pending"
          : "/checkout/rejected"
      }
    />
  );
}

export default ValidateMP;

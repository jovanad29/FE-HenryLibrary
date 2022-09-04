// import React from 'react'

export const checkearCarritoLocal = () => {
    const localItems = JSON.parse(localStorage.getItem("guestCartBooks"));
    if (localItems) {
        // setGuestCartBooks(localItems);
    }
    const localTotal = JSON.parse(localStorage.getItem("total"));
    if (localTotal) {
        // setTotal(localTotal);
    }

    console.log(localItems, localTotal);
    // return localItems;
};

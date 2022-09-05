// import React from 'react'

export const checkLocalShoppingBookExist = () => {
    const localItems = JSON.parse(localStorage.getItem("guestCartBooks"));
    const localTotal = JSON.parse(localStorage.getItem("total"));

    //Aca debe llamar a a la funcion del back para guardar el carrito en la db
    if (localItems?.length) {
        // dispatch
        console.log(localItems, localTotal);
        localStorage.setItem("guestCartBooks", JSON.stringify([]));
    }
};

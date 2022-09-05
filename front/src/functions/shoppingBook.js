

export const checkLocalShoppingBookExist = () => {
    const localItems = JSON.parse(localStorage.getItem("guestCartBooks"));
    const localTotal = JSON.parse(localStorage.getItem("total"));

    if (localItems?.length) {
        console.log(localItems, localTotal);
        return localItems;
    }
    return false;
};



export const checkLocalShoppingBookExist = () => {
    const localItems = JSON.parse(localStorage.getItem("guestCartBooks"));
    const localTotal = JSON.parse(localStorage.getItem("total"));

    if (localItems?.length) {
        return localItems;
    }
    return false;
};

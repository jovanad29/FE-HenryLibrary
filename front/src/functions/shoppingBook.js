

export const checkLocalShoppingBookExist = () => {
    const localItems = JSON.parse(localStorage.getItem("guestCartBooks"));

    if (localItems?.length) {
        return localItems;
    }
    return false;
};

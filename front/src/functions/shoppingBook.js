// import { useDispatch, useSelector } from "react-redux";
// import { saveLocalCartToDB } from "../actions";

export const checkLocalShoppingBookExist = () => {
    // const dispatch = useDispatch();
    // const { uid } = useSelector((state) => state);

    const localItems = JSON.parse(localStorage.getItem("guestCartBooks"));
    const localTotal = JSON.parse(localStorage.getItem("total"));

    if (localItems?.length) {
        //dispatch(saveLocalCartToDB(uid, localItems));

        console.log(localItems, localTotal);
        return localItems;
    }
    return false;
};

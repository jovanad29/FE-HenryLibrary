import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";

import { FirebaseAuth } from "../firebase/config";
import {
    login,
    logout,
    createOrFindUser,
    getUserInfo,
    saveLocalCartToDB,
} from "../actions";
import { checkLocalShoppingBookExist } from "../functions/shoppingBook";

export const useCheckAuth = () => {
    const { status } = useSelector((state) => state);
    const dispatch = useDispatch();

    useEffect(() => {
        onAuthStateChanged(FirebaseAuth, async (user) => {
            if (!user) return dispatch(logout());

            const { uid, email, displayName, photoURL } = user;
            const { displayName: nameUser, photoURL: profilePic } = user;
            dispatch(
                createOrFindUser({
                    uid,
                    email,
                    nameUser,
                    profilePic,
                })
            );
            dispatch(login({ uid, email, displayName, photoURL }));
            
            const localCart = checkLocalShoppingBookExist();
            localCart && dispatch(saveLocalCartToDB(uid, localCart));
        });
    }, [dispatch]);

    return status;
};

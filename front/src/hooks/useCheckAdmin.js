import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const useCheckAdmin = () => {
    const { isAdmin } = useSelector((state) => state);
    const [roleAdmin, setRoleAdmin] = useState(false)
    
    useEffect(() => {
        setRoleAdmin(isAdmin)
    }, [isAdmin])

    return roleAdmin;
};
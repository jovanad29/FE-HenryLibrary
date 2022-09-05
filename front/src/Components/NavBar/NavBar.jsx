import React, { useEffect, useState, useMemo } from "react";
import { NavLink } from "react-router-dom";

//COMPONENTES
import SearchBar from "../SearchBar/SearchBar";
import Login from "../Login/Login";

//REACT ICONS
import { VscAccount } from "react-icons/vsc";
import { MdOutlineFavoriteBorder, MdOutlineFavorite } from "react-icons/md";
import { BsCart2 } from "react-icons/bs";

import styles from "./NavBar.module.css";
import banderaArgentina from "./arg.png";
import banderaEeuu from "./eeuu.png";
import { useDispatch, useSelector } from "react-redux";
import {
    getAllBooks,
    getAllFavorites,
    setSection,
    setPage,
    clearLoginError,
} from "../../actions";

export default function NavBar() {
    const dispatch = useDispatch();
    const { status, favorites } = useSelector((state) => state);
    const isAuthenticated = useMemo(() => status === "authenticated", [status]);

    const [loginModal, setLoginModal] = useState(false);

    function HandleOpenLogin() {
        dispatch(clearLoginError());
        loginModal === true ? setLoginModal(false) : setLoginModal(true);
    }

    useEffect(() => {
        dispatch(getAllBooks());
    }, [dispatch]);

    const handleOnFavorites = () => {
        if (favorites.length > 0) {
            dispatch(setSection("favoritos"));
            dispatch(getAllFavorites());
            dispatch(setPage(0));
        } else {
            dispatch(setSection("home"));
            dispatch(getAllBooks());
            dispatch(setPage(0));
        }
    };

    return (
        <nav className={styles.container}>
            <h1 className={styles.h1}>
                <NavLink to="/">Libreria</NavLink>
            </h1>

            <h2 className={styles.h1_1}>
                <NavLink to="/">HENRY</NavLink>
            </h2>

            <div className={styles.search}>
                <SearchBar />
            </div>

            <div className={styles.iconos}>
                {favorites.length === 0 ? (
                    <button onClick={handleOnFavorites}>
                        <MdOutlineFavoriteBorder
                            className={
                                isAuthenticated
                                    ? styles.iconoFav
                                    : styles.iconoNoFav
                            }
                            size="1.4rem"
                        />
                    </button>
                ) : (
                    <>
                    <button onClick={handleOnFavorites}>
                        <MdOutlineFavorite
                            className={
                                isAuthenticated
                                    ? styles.iconoFav
                                    : styles.iconoNoFav
                            }
                            size="1.4rem"
                        />
                    </button>
                    <h3 className={styles.cantidad}>{favorites.length}</h3>
                    </>
                )}

                <button onClick={() => HandleOpenLogin()}>
                    <VscAccount size="1.4rem" />
                </button>

                <NavLink to="/carrito">
                    <BsCart2 size="1.5rem" />
                </NavLink>
            </div>

            <div className={styles.banderas}>
                <button className={styles.bandera}>
                    <img src={banderaArgentina} alt="" />
                </button>

                <button className={styles.bandera}>
                    <img src={banderaEeuu} alt="" />
                </button>
            </div>
            {loginModal && <Login HandleOpenLogin={HandleOpenLogin} />}
        </nav>
    );
}
